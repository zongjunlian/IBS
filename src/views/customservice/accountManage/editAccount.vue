<template>
  <div class="edit-account-page">
    <Icon type="md-close" size="30" style="float:right;margin-right: 5%"  @click="close"/>
    <Tabs type="card">
      <TabPane label="账户信息">
        <div style="width: 70%;margin-left: 15%;">
          <Form :model="formInline" :rules="ruleInline" ref='formInline' label-position="right" :label-width="100">
            <input type="hidden" v-model="formInline.id">
            <FormItem label="户号" prop='account'>
              <Input v-model="formInline.account" type="text">
              </Input>
            </FormItem>
            <FormItem label="服务申请单编号" prop='applyNum'> 
              <span  class="bigFont1" v-model="formInline.applyNum">{{formInline.applyNum}}</span> 
            </FormItem>
            <FormItem label="申请性质" prop='appalyType'>
              <RadioGroup v-model="formInline.appalyType">
                <Radio :label="0">企业</Radio>
                <Radio :label="1" style="margin-left:20px;">个人</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="公司名称/户主姓名" prop='companyName'>
              <Input v-model="formInline.companyName" type="text">
              </Input>
            </FormItem>
            <FormItem label="入驻日期" prop='settledTime'>
              <Row>
                <DatePicker :editable='false' type="date" format="yyyy-MM-dd" v-model="formInline.settledTime"></DatePicker>
              </Row>
            </FormItem>
            <FormItem label="业务经办人" prop='operator'>
              <Input v-model="formInline.operator" type="text">
              </Input>
            </FormItem>
            <FormItem label="联系电话" prop='phone'>
              <Input v-model="formInline.phone" type="text">
              </Input>
            </FormItem>
            <FormItem label="开通地址" prop='address'>
              <Input v-model="formInline.address" type="text">
              </Input>
            </FormItem>
            <FormItem label="预警余额" prop='warningAmount'>
              <Input v-model="formInline.warningAmount" type="text">
              </Input>
            </FormItem>

            <FormItem label="证件类型" prop='documentType'>
              <!-- 营业执照 -->
              <Row>
                <Col span="3"><div><Checkbox label="营业执照"> <span>营业执照</span> </Checkbox></div></Col>
                <Col span="2">证件号码：</Col>
                <Col span="15"><Input v-model="formInline.businessLicense" type="text"></Input></Col>
                <Col span="2"><Button @click="checkPhoto(formInline.businessLicenseUrl)">查看图片</Button></Col>
                <Col span="3" :offset="5">
                  <FormItem>
                    <Upload 
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="before1"
                      action=""
                      v-model="file1">
                      <Button icon="ios-cloud-upload-outline">上传附件</Button>
                    </Upload>
                  </FormItem>
                </Col>
                <Col span="5" v-if="file1 !== ''"><span>{{file1.name}}</span><Icon type="md-close" size="15" @click="file1 = ''"/></Col>
              </Row>
              <!-- 身份证 -->
              <Row>
                <Col span="3"><div><Checkbox label="身份证"> <span>身份证</span> </Checkbox></div></Col>
                <Col span="2">证件号码：</Col>
                <Col span="15"><Input v-model="formInline.identityCardNumber" type="text"></Input></Col>
                <Col span="2"><Button @click="checkPhoto1(formInline.identityCardFrontUrl, formInline.identityCardBackUrl)">查看图片</Button></Col>
                <Col span="3" :offset="5">
                  <FormItem>
                    <Upload 
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="before2"
                      action=""
                      v-model="file2">
                      <Button icon="ios-cloud-upload-outline">正面上传</Button>
                    </Upload>
                  </FormItem>
                </Col>
                <Col span="5" v-if="file2 !== ''"><span>{{file2.name}}</span><Icon type="md-close" size="15" @click="file2 = ''"/></Col>
                <Col span="3">
                  <FormItem>
                    <Upload 
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="before3"
                      action=""
                      v-model="file3">
                      <Button icon="ios-cloud-upload-outline">反面上传</Button>
                    </Upload>
                  </FormItem>
                </Col>
                <Col span="5" v-if="file3 !== ''"><span>{{file3.name}}</span><Icon type="md-close" size="15" @click="file3 = ''"/></Col>
              </Row>
              <!-- 其它 -->
              <Row>
                <Col span="2"><Checkbox v-model="otherC">其他</Checkbox></Col>
                <Col span="4"><Input v-model="formInline.cardTypeDescription" v-if="otherC"></Input></Col>
                <Col span="2" :offset="1">证件号码：</Col>
                <Col span="15"><Input v-model="formInline.otherType" type="text"></Input></Col>
              </Row>
            </FormItem>

            <FormItem label="使用类别" prop='useType'>
              <RadioGroup v-model="formInline.useType">
                <Radio :label="1">公司</Radio>
                &nbsp;&nbsp;
                <Radio :label="2">住宅</Radio>
                &nbsp;&nbsp;
                <Radio :label="3">学校</Radio>
                &nbsp;&nbsp;
                <Radio :label="4">酒店</Radio>
                &nbsp;&nbsp;
                <Radio :label="5">商业</Radio>
                &nbsp;&nbsp;
                <Radio :label="6">
                  其他:
                  <Input v-model="formInline.useTypeDescription" v-if="formInline.useType === 6" style="margin-left:20px;"></Input>
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="联系人" prop='contactPerson'>
              <Row>
                <Col span="12">
                <Input v-model="formInline.contactPerson">
                </Input>
                </Col>
                <Col span="12" style="padding-left:10px;">
                <Checkbox v-model="coManager" @on-change="copyUserInfo">同经办人</Checkbox>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="联系电话" prop='contactPersonPhone'>
              <Input v-model="formInline.contactPersonPhone" type="text">
              </Input>
            </FormItem>
            <FormItem label="邮箱" prop='email'>
              <Input v-model="formInline.email" type="text">
              </Input>
            </FormItem>
            <FormItem label="备注" prop='remarks'>
              <Input v-model="formInline.remarks" type="textarea" :rows="4"/>
            </FormItem>
            <FormItem style='text-align: center;'>
              <p class="publishTxt"> <span class="mr10">受理客服：</span> <strong class="mr30">xiantao05</strong> <span class="mr10">受理日期：</span> <strong>2019-05-08 15:20</strong> </p>
              <Button class="addSubmitBtn blueBtn mr10" type="primary" @click="handleSubmit('formInline')">提交</Button>
              <Button class="addResetBtn LightBlueBtn"  @click="handleReset('formInline')">重置</Button>
            </FormItem>
          </Form>
        </div>
      </TabPane>
      <TabPane label="绑定设备">
        <Row>
          <Col span="14">
            <Form :model="formDev" :rules="ruleDev" ref='formDev' label-position="right" :label-width="100">
              <input type="hidden" v-model="formDev.id">
              <Row style="text-align:left;padding:20px;" class="bigFont1">账户：{{formInline.account}} </Row>
              <FormItem label="关联设备:" prop="itemIds">
                <Transfer :titles="transferTitle" :data="deviceList" filterable :filter-method="filterMethod" :target-keys="targetKeys" :render-format="renderF" :list-style="listStyle" :operations="['左移','右移']" @on-change="changeDevList"></Transfer>
                <Input v-show="false" v-model="formDev.itemIds" class="input-width"></Input>
              </FormItem>
              <Row style="padding:15px;">
                <Col >
                  <FormItem>
                    <p class="publishTxt"> <span class="mr10">受理客服：</span> <strong class="mr30">xiantao05</strong> <span class="mr10">受理日期：</span> <strong>2019-05-08 15:20</strong> </p>
                    <Button class="addSubmitBtn blueBtn mr10" type="primary" @click="handleSubmit('formDev')">提交</Button>
                    <Button class="addResetBtn LightBlueBtn"  @click="handleReset('formDev')">重置</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col span="10">
            <div class="bigFont1" style=";padding:20px;">当前设备状态</div>
            <Table :columns="columns" class="common-table" :data="data1" no-data-text="暂无数据"></Table>
            <Row class="page-bottom">
              <Col span="8" class="page-text">
              当前显示<span class="pageColor">{{(data1 && data1.length > 0) ? data1.length : 0}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录
              </Col>
              <Col span="16" >
              <Page :total="dataCount" :page-size="pageSize"  @on-change="pageChange"  show-elevator :current="currentPage" class="common-page-style"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>

    <Modal v-if="urlType === '1'" v-model="mod1" draggable scrollable footer-hide title="证件图" width=1240>
      <img :src="photoUrl" style="max-width:1200px;float: left;margin-bottom:20px">
    </Modal>

    <Modal v-if="urlType === '2'" v-model="mod1" draggable scrollable footer-hide title="证件图" width=1260>
      <table style="width:100%">
        <td style="width:50%"><img :src="photoUrl" style="max-width:600px"></td>
        <td style="width:50%"><img :src="photoUrl1" style="margin-left: 20px;max-width:600px"></td>
      </table>
    </Modal>
  </div>
</template>

<script>
import accountApi from '@/api/request/accountList'
import checkout from '@/api/checkout'
import { copyArray,FormatDate } from '@/api/util'
import filter from '@/api/filter'
import axios from 'axios'
export default {
  inject: ['reload'],
  data () {
    return {
      urlType: '1',
      mod1: false,
      copyAccount: {},
      transferTitle: ['未关联设备列表','已关联设备列表'],
      deviceList: [],
      targetKeys: [],
      copyTargetKeys: [],
      
      copyItemIds: '',

      photoUrl: '',
      photoUrl1: '',

      dataCount: 0,
      pageSize: 10,
      currentPage: 1,

      coManager: false,
      otherC: false,
      file1: '',
      file2: '',
      file3: '',

      copyFormInline: {},
      formInline: {
        id: '',
        account: '',
        appalyType: '',
        applyNum: '',
        companyName: '',
        settledTime: '',
        operator: '',
        phone: '',
        identityCardNumber: '',
        businessLicense: '',
        otherType: '',
        cardTypeDescription: '',
        address: '',
        useType: '',
        useTypeDescription: '',
        contactPerson: '',
        contactPersonPhone: '',
        email: '',
        remarks: '',
        warningAmount: '',
      },
      ruleInline: {
        account: [
          { required: true, type: 'string', message: '请输入户号，限英文、数字，最多输入10个字符', trigger: 'blur' },
          { max: 10, type: 'string', message: '最多输入10个字符', trigger: 'blur' },
          { validator: checkout.checkAccName, trigger: 'blur' }
        ],
        appalyType: [
          { required: true, type: 'number', message: '请选择', trigger: 'blur' },
        ],
        companyName: [
          { required: true, type: 'string', message: '请输入名称，限20个字', trigger: 'blur' },
          { max: 20, type: 'string', message: '最多输入20个字符', trigger: 'blur' },
        ],
        settledTime: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'blur' },
        ],
        operator: [
          { required: true, type: 'string', message: '请填写姓名', trigger: 'blur' },
          { max: 20, type: 'string', message: '最多输入20个字符', trigger: 'blur' },
        ],
        phone: [
          { required: true, type: 'string', message: '请输入联系电话', trigger: 'blur' },
          { validator: checkout.checkTelephone, trigger: 'blur' }
        ],
        address: [
          { required: true, type: 'string', message: '请输入地址', trigger: 'blur' },
          { max: 100, type: 'string', message: '最多输入100个字符', trigger: 'blur' },
        ],
        useType: [
          { required: true, type: 'number', message: '请选择使用类型', trigger: 'blur' },
        ],
        contactPerson: [
          { required: true, type: 'string', message: '请填写姓名', trigger: 'blur' },
          { max: 20, type: 'string', message: '最多输入20个字符', trigger: 'blur' },
        ],
        contactPersonPhone: [
          { required: true, type: 'string', message: '请输入联系电话', trigger: 'blur' },
          { validator: checkout.checkTelephone, trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'string', message: '请输入邮箱', trigger: 'blur' },
          { max: 50, type: 'string', message: '最多输入50个字符', trigger: 'blur' },
          { validator: checkout.checkEmail, trigger: 'blur' }
        ],
        remarks: [
          { max: 100, type: 'string', message: '最多输入100个字符', trigger: 'blur' },
        ],
        warningAmount: [
          { required: true, message: '请输入预警余额', trigger: 'blur' },
          { validator: checkout.checkDecimal, trigger: 'blur' },
          { max: 10, message: '最多输入10个字符', trigger: 'blur' },
        ]
      },

      formDev: {
        id: '',
        itemIds: '',
        ItemNames: '',
        account: '', 
      },
      ruleDev: {
        itemIds:  { required: true, type: 'string', message: '请关联设备', trigger: 'blur' },
      },

      listStyle: {
        width: '300px',
        height: '480px'
      },

      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "风机盘管编号",
          key: 'code',
          align: "center"
        },
        {
          title: "当前状态",
          align: "center",
          render: (h, params) => {
            let accountStatusId = this.$route.params.serviceType
            let serviceType
            let type = {display: '', color: ''}
            if(accountStatusId === '0' ) {
              serviceType = '未激活'
              type = {display: 'none', color: 'orange'}
            }else if(accountStatusId === '1') {
              serviceType = '正常'
              type = {display: 'none', color: 'green'}
            }else if(accountStatusId === '2') {
              serviceType = '检修中'
              type = {display: 'none', color: 'blue'}
            }else if(accountStatusId === '3') {
              serviceType = '自动停机'
              type = {display: 'none', color: 'yellow'}
            }else if(accountStatusId === '4') {
              serviceType = '主动停机'
              type = {display: 'block', color: 'default'}
            }else if(accountStatusId === '5') {
              serviceType = '销户'
              type = {display: 'block', color: 'red'}
            }else{
              serviceType = ''
            }
            let color = type.color
            return h('Tag', {
              props: {
                color: color,
              },
              nativeOn: {
                click: () => {
                }
              }
            },serviceType)
          }
        },
        {
          title: "最新统计日期",
          key: 'updateTime',
          align: "center"
        },
      ],
      listData: [],
      data1: [],
    }
  },

  created () {
    this.getAccountInfo(this.$route.params.applyNum)//获取账户信息    
    this.getAllDev(this.$route.params.id) //获取所有未绑定设备
    this.searchIbsItemConnect(this.$route.params.id)//获取已绑定设备
  },

  methods: {
    //关闭当前页跳转至列表页
    close() {
      this.$router.push({path: '/accountList'})
    },

    filterMethod(data, query) {
      return data.label.indexOf(query) > -1
    },

    checkPhoto(url) {
      this.urlType = '1'
      this.mod1 = true
      this.photoUrl = `${axios.defaults.baseURL}${url}`
    },

    checkPhoto1(url1, url2) {
      this.urlType = '2'
      this.mod1 = true
      this.photoUrl = `${axios.defaults.baseURL}${url1}`
      this.photoUrl1 = `${axios.defaults.baseURL}${url2}`
    },

    pageChange(page) {
      this.currentPage = page
      console.log('当前页码', this.currentPage);
      this.data1.splice(0, this.data1.length)
      for(let i = this.pageSize*(this.currentPage-1)+1; i<= ((this.listData.length > this.currentPage*this.pageSize)?(this.pageSize*this.currentPage) : (this.listData.length)) ;i ++) {
        this.data1.push(this.listData[i-1])
      }      
    },

    getAccountInfo(num) {
      accountApi.getIbsAccountByApplyNum({
        applyNum: num
      }).then((res) => {
        console.log(res)
        if(res.data.otherType === null || res.data.otherType === 'null') {
          res.data.otherType = ''
        }
        this.formInline = copyArray(res.data)
        this.copyFormInline = copyArray(res.data)
        this.formInline = copyArray(this.copyFormInline)
      }).catch((err) => {})
    },

    getAllDev (id) {
      accountApi.searchIbsItemConnectAndAll({
        accountId: id
      }).then((res) => {
        if(res.data) {
          this.deviceList = this.formateTransfer(res.data)
        }
      }).catch((err) => {})
    },

    formateTransfer(data) {
      let res = []
      data.forEach(i => {
        let a = {}
        a.key = i.id
        a.label = i.name
        if(this.$route.params.serviceType === '2'){
          a.disabled = true
        }
        res.push(a)
        a = {}
      });
      return res
    },

    searchIbsItemConnect(id) {
      accountApi.searchIbsItemConnect({
        accountId: id
      }).then((res) => {
        console.log('res', res);
        if(res.data) {
          this.listData = res.data
          this.dataCount = this.listData.length
          this.pageChange(1)
          this.targetKeys = copyArray(this.formateTargetKeys(res.data))
          this.formDev.itemIds = copyArray(this.targetKeys.join(','))
          this.copyTargetKeys = copyArray(this.formateTargetKeys(res.data))
        }
      }).catch((err) => {})
    },

    formateTargetKeys(data) {
      let res = []
      data.forEach(i => {
        res.push(i.id)
      })
      return res
    },

    renderF(item) {
      return item.label
    },

    //穿梭框数据改变时视图改变
    changeDevList(newKeys,direction, moveKeys) {     
      this.targetKeys = []
      this.targetKeys = newKeys  
      this.formDev.itemIds = this.targetKeys.join(',')      
      if(this.formDev.itemIds.length === 0) {
        this.formDev.itemIds = ''
      }
    },

    copyUserInfo() {
      if(this.coManager){
        this.formInline.contactPerson = this.formInline.operator
        this.formInline.contactPersonPhone = this.formInline.phone
      }else{
        this.formInline.contactPerson = ''
        this.formInline.contactPersonPhone = ''
      }
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(name === 'formInline') {
            if(this.formInline.settledTime) {
              this.formInline.settledTime = FormatDate(this.formInline.settledTime)
            }else{
              this.formInline.settledTime = ''
            }
            let formData = new FormData()
            formData.append('id', this.$route.params.id)
            formData.append('file1', this.file1)
            formData.append('file2', this.file2)
            formData.append('file3', this.file3)
            formData.append('account', this.formInline.account)
            formData.append('appalyType', this.formInline.appalyType)
            formData.append('companyName', this.formInline.companyName)
            formData.append('settledTime', this.formInline.settledTime)
            formData.append('operator', this.formInline.operator)
            formData.append('phone', this.formInline.phone)
            formData.append('address', this.formInline.address)
            formData.append('businessLicense', this.formInline.businessLicense)
            formData.append('identityCardNumber', this.formInline.identityCardNumber)
            formData.append('otherType', this.formInline.otherType)
            formData.append('cardTypeDescription', this.formInline.cardTypeDescription)
            formData.append('useType', this.formInline.useType)
            formData.append('useTypeDescription', this.formInline.useTypeDescription)
            formData.append('contactPerson', this.formInline.contactPerson)
            formData.append('contactPersonPhone', this.formInline.contactPersonPhone)
            formData.append('email', this.formInline.email)
            formData.append('remarks', this.formInline.remarks)
            formData.append('warningAmount', this.formInline.warningAmount)
            accountApi.updateIbsAccount(formData)
            .then((res) => {
              if(res.status === 'success') {
                this.$Message.success('用户信息修改成功！')
              }else{
                this.$Message.success('用户信息修改失败！')
              }
              this.reload()
            }).catch((err) => {})
          }else if(name === 'formDev') {
            if(this.$route.params.serviceType === '2') {
              this.$Message.info('当前账户处于欠费状态，无法进行设备操作！')
            }else{
              accountApi.updateIbsAccountItem({
                id: this.$route.params.id,
                itemIds: this.formDev.itemIds
              }).then((res) => {
                if(res.status === 'success') {
                  this.$Message.success('绑定设备修改成功！')
                  this.searchIbsItemConnect(this.$route.params.id)
                }else{
                  this.$Message.success('绑定设备未进行任何更改！')
                }
              }).catch((err) => {})
            }
          }
        }
        else{
          this.$Message.error('请完整填写红色标记内容再提交')
        }
      })
    },

    handleReset(name) {
      if(name === 'formInline') {
        this.formInline = copyArray(this.copyFormInline)
      }else if(name === 'formDev') {
        this.targetKeys = copyArray(this.copyTargetKeys)
        this.formDev.itemIds = this.targetKeys.join(',') 
      }
    },

    //图片上传格式错误
    handleFormatError () {
      this.$Message.error("文件格式错误")
    },

    //图片尺寸过大
    handleMaxSize () {
      this.$Message.error("图片尺寸过大，请选择4M以内图片")
    },

    //营业执照
    before1(file) {
      this.file1 = file
      return false
    },

    //身份证正面
    before2(file) {
      this.file2 = file
      return false
    },

    //身份证反面
    before3(file) {
      this.file3 = file
      return false
    }
  },
}
</script>

<style lang="less">
.edit-account-page {
  .ivu-form-item-error-tip{
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 6px;
  }
}
</style>
