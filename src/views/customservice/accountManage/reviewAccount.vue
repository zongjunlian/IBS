<template>
  <div>
    <Icon type="md-close" size="30" style="float:right;margin-right: 5%"  @click="close"/>
    <div style="text-align: center">
      <span style="color: red;font-size:20px">该账户于{{checkObj.creationTime}}对以下信息提出了变更申请</span>
    </div>
    <div style="width: 70%;margin-left: 15%;">
      <table class="tab-success-info">
        <td style="text-align:right;padding-left:280px">
          <tr>户号：</tr>
          <tr>服务申请单编号：</tr>
          <tr>申请性质：</tr>
          <tr>业务经办人：</tr>
          <tr>公司名称/户主姓名：</tr>
          <tr>入驻日期：</tr>
          <tr>联系电话：</tr>
          <tr>开通地址：</tr>
          <tr>证件类型：</tr>
          <tr onselectstart="return false" onselect="document.selection.empty()" style="color:transparent;" v-if="reviewObj.identityCardNumber">身份证：</tr>
          <tr onselectstart="return false" onselect="document.selection.empty()" style="color:transparent;" v-if="reviewObj.otherType">{{reviewObj.cardTypeDescription}}：</tr>
          <tr>使用类别：</tr>
          <tr>联系人：</tr>
          <tr>联系电话：</tr>
          <tr>邮箱：</tr>
          <tr>备注：</tr>
          <tr>账户绑定设备：</tr>
        </td>
        <td style="padding-left:50px">
          <tr class="bigFont1">{{reviewObj.account}}</tr>
          <tr>{{reviewObj.applyNum}}</tr>
          <tr>{{reviewObj.appalyType === 0 ? '企业' : '个人'}}</tr>
          <tr>{{reviewObj.operator}}</tr>
          <tr class="red-text">{{reviewObj.companyName}}</tr>
          <tr>{{reviewObj.settledTime}}</tr>
          <tr>{{reviewObj.phone}}</tr>
          <tr>{{reviewObj.address}}</tr>

          <tr class="red-text">营业执照  <Button @click="checkPhoto()">查看图片</Button></tr>
          <tr v-if="reviewObj.identityCardNumber" class="red-text">身份证  <Button @click="checkPhoto1()">查看图片</Button></tr>
          <!-- <tr class="red-text">营业执照{{`【税号 ${reviewObj.businessLicense === null ? '': reviewObj.businessLicense}】`}}<Button @click="checkPhoto()">查看图片</Button></tr>
          <tr v-if="reviewObj.identityCardNumber">身份证{{`【${reviewObj.identityCardNumber === null ? '' : reviewObj.identityCardNumber}】`}}<Button @click="checkPhoto1()">查看图片</Button></tr> -->
          <tr v-if="reviewObj.otherType">{{`${reviewObj.cardTypeDescription}【${reviewObj.otherType === null ? '' : reviewObj.otherType}】`}}</tr>
          <tr>{{useTypeS}}</tr>
          <tr>{{reviewObj.contactPerson}}</tr>
          <tr>{{reviewObj.contactPersonPhone}}</tr>
          <tr>{{reviewObj.email}}</tr>
          <tr>{{(reviewObj.remarks === '' || reviewObj.remarks === null) ? '————' : reviewObj.remarks}}</tr>
          <tr>{{reviewObj.items}}</tr>
        </td>
      </table>
      <div style='text-align: center;margin-top: 20px;'>
        <p class="publishTxt"> <span class="mr10">受理客服：</span> <strong class="mr30">xiantao05</strong> <span class="mr10">受理日期：</span> <strong>2019-05-08 15:20</strong> </p>
        <Button style="margin-top:10px" class="addSubmitBtn blueBtn mr10" type="primary" @click="handleSubmit()">同意变更</Button>
        <Button style="margin-top:10px" class="addResetBtn LightBlueBtn"  @click="handleReset()">驳回申请</Button>
      </div>
    </div>

    <Modal v-model="mod1" draggable scrollable footer-hide title="证件图" width=1600>
      <table style="width:100%;">
        <tr>
          <td style="width: 33%">
            <img :src="photoUrl1" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
          <td style="width: 33%" >
            <img :src="photoUrl2" style="max-width:500px;float: left;margin-left:20px">
          </td>
          <td style="width: 33%">
            <img :src="photoUrl3" style="max-width:500px;float: left;margin-left:20px">
          </td>
        </tr>
        <tr style="color: red">
          <td>本地证件号【税号{{reviewObj.businessLicense}}】</td>
          <td>上传原证件号【税号{{checkObj.beforeBusinessLicense}}】</td>
          <td>上传更改证件号【税号{{checkObj.newBusinessLicense}}】</td>
        </tr>
      </table>
    </Modal>

    <Modal v-model="mod2" draggable scrollable footer-hide title="证件图" width=1600>
      <table style="width:100%;">
        <tr>
          <td style="width: 33%">
            <img :src="photoUrl1" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
          <td style="width: 33%">
            <img :src="photoUrl2" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
          <td style="width: 33%">
            <img :src="photoUrl3" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
        </tr>
        <tr style="color: red">
          <td>本地证件正面</td>
          <td>上传证件正面</td>
          <td>更改证件正面</td>
        </tr>
        <tr>
          <td style="width: 33%">
            <img :src="photoUrl4" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
          <td style="width: 33%">
            <img :src="photoUrl5" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
          <td style="width: 33%">
            <img :src="photoUrl6" style="max-width:500px;float: left;margin-bottom:20px">
          </td>
        </tr>
        <tr style="color: red">
          <td>本地证件反面</td>
          <td>上传证件反面</td>
          <td>更改证件反面</td>
        </tr>
      </table>
    </Modal>

    <Modal :mask-closable="false" v-model="editModal" title="驳回理由" draggable scrollable footer-hide width="800">
			<Form :model="editForm" ref='editForm' :rules="ruleValidate" label-position="right" :label-width="100">
				<FormItem label="驳回理由" prop='theDescribe'>
					<Input v-model="editForm.theDescribe" type="textarea" :rows="4"/>
				</FormItem>
        <FormItem style='text-align: center;'>
					<p class="publishTxt">
						<span class="mr10">操作账号：</span>
						<strong class="mr30">{{123}}</strong>
						<span class="mr10">发布日期：</span>
						<strong>{{456}}</strong>
					</p>
					<Button class="addSubmitBtn blueBtn mr10" type="primary" @click="submitEdit('editForm')">提交</Button>
					<Button class="addResetBtn LightBlueBtn" @click.native="resetEdit('editForm')">重置</Button>
				</FormItem>
			</Form>
		</Modal>
  </div>
</template>

<script>
import accountApi from '@/api/request/accountList'
import axios from 'axios'
export default {
  data () {
    return {
      mod1: false,
      mod2: false,
      editModal: false,
      photoUrl1: '',
      photoUrl2: '',
      photoUrl3: '',
      photoUrl4: '',
      photoUrl5: '',
      photoUrl6: '',
      useTypeS: '',
      reviewObj: {},
      checkObj: {},

      editForm: {
        theDescribe: ''
      },

      ruleValidate: {
        theDescribe:  { required: true, type: 'string', message: '请输入驳回理由', trigger: 'blur' },
      }
    }
  },

  created () {
    this.getAccountInfo(this.$route.params.applyNum)//获取账户信息 
    this.getCheckInfo(this.$route.params.id)
  },

  methods: {
    //关闭当前页跳转至列表页
    close() {
      this.$router.push({path: '/accountList'})
    },

    checkPhoto() {
      this.mod1 = true
      this.photoUrl1 = `${axios.defaults.baseURL}${this.reviewObj.businessLicenseUrl}`
      this.photoUrl2 = `${axios.defaults.baseURL}${this.checkObj.beforeBusinessLicenseUrl}`
      this.photoUrl3 = `${axios.defaults.baseURL}${this.checkObj.newBusinessLicenseUrl}`
    },

    checkPhoto1() {
      this.mod2 = true
      this.photoUrl1 = `${axios.defaults.baseURL}${this.reviewObj.identityCardFrontUrl}`
      this.photoUrl2 = `${axios.defaults.baseURL}${this.checkObj.beofreIdentityCardFrontUrl}`
      this.photoUrl3 = `${axios.defaults.baseURL}${this.checkObj.beofreIdentityCardBackUrl}`
      this.photoUrl4 = `${axios.defaults.baseURL}${this.reviewObj.identityCardBackUrl}`
      this.photoUrl5 = `${axios.defaults.baseURL}${this.checkObj.newIdentityCardFrontUrl}`
      this.photoUrl6 = `${axios.defaults.baseURL}${this.checkObj.newIdentityCardBackUrl}`
    },

    getAccountInfo(num) {
      accountApi.getIbsAccountByApplyNum({
        applyNum: num
      }).then((res) => {
        console.log(res)
        if(res.data.useType === 1) {
          this.useTypeS = '公司'
        }else if(res.data.useType === 2) {
          this.useTypeS = '住宅'
        }else if(res.data.useType === 3) {
          this.useTypeS = '学校'
        }else if(res.data.useType === 4) {
          this.useTypeS = '酒店'
        }else if(res.data.useType === 5) {
          this.useTypeS = '商业'
        }else if(res.data.useType === 6) {
          this.useTypeS = res.data.useTypeDescription
        }
        this.reviewObj = res.data
      }).catch((err) => {})
    },

    getCheckInfo(id) {
      accountApi.searchTheUserAuditByAccountId({
        accountId: id
      }).then((res) => {
        console.log(res);
        this.checkObj = res.data
      }).catch((err) => {})
    },
    
    //同意变更
    handleSubmit() {
      accountApi.updateIbsAccountByAudit({
        accountId: this.$route.params.id
      }).then((res) => {
        console.log(res);
        if(res.status === 'success') {
          this.$Message.success('变更成功')
          this.close()
        }
      }).catch((err) => {})
    },

    //驳回申请
    handleReset() {
      this.editModal = true
    },

    submitEdit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          accountApi.updateTheUserAuditById({
            id: this.checkObj.id,
            theDescribe: this.editForm.theDescribe
          }).then((res) => {
            if(res.status === 'success') {
              this.$Message.success('驳回成功')
              this.close()
            }else{
              this.$Message.error('驳回失败')
            }
          }).catch((err) => {})
        }
      })
    },

    resetEdit(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less">
.tab-success-info{
  font-size: 20px;
  .red-text{
    color: red;
  }
}
</style>
