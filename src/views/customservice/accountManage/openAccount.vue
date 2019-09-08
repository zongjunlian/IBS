<template>
  <div class="open-account-page">
    <Icon type="md-close" size="30" style="float:right;margin-right: 5%"  @click="close"/>
    <div style="width: 70%;margin-left: 15%;">
      <!-- 进度条 -->
      <div class="progress">
        <div style="margin: 0 auto;width:800px;">
          <Row style="width:800px;margin: 0 auto;">
            <Col span='8' class="text-center">
            <img src="../../../assets/images/accountManage/p01_01.png" v-if="percent === 33">
            <img src="../../../assets/images/accountManage/p01_02.png" v-else>
            </Col>
            <Col span='8' class="text-center">
            <img src="../../../assets/images/accountManage/p02_01.png" v-if="percent === 66">
            <img src="../../../assets/images/accountManage/p02_02.png" v-else>
            </Col>
            <Col span='8' class="text-center">
            <img src="../../../assets/images/accountManage/p03_01.png" v-if="percent === 100">
            <img src="../../../assets/images/accountManage/p03_02.png" v-else>
            </Col>
          </Row>
          <!-- 进度条百分比 -->
          <Progress :percent="percent" status="active" hide-info/>
          <Row style="width:800px;margin: 0 auto;margin-top: 10px;margin-bottom:15px;">
            <Col span='8' class="text-center">
            账户信息登记
            </Col>
            <Col span='8' class="text-center">
            绑定设备
            </Col>
            <Col span='8' class="text-center">
            完成
            </Col>
          </Row>
        </div>
      </div>

      <!-- 用户添加 -->
      <Form :model="formInline" :rules="ruleInline" ref='formInline' label-position="right" :label-width="100" v-if="percent === 33">
        <FormItem label="户号" prop='account'>
          <Input v-model="formInline.account" type="text"> 
          </Input>
        </FormItem>
        <FormItem label="服务申请单编号" prop='applyNum'> 
          <span  class="bigFont1" v-model="formInline.applyNum">{{formInline.applyNum}}</span> 
        </FormItem>
        <FormItem label="申请性质" prop='appalyType'>
          <RadioGroup v-model="formInline.appalyType">
            <Radio label="0">企业</Radio>
            <Radio label="1" style="margin-left:20px;">个人</Radio>
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
            <Radio label="1">公司</Radio>
            &nbsp;&nbsp;
            <Radio label="2">住宅</Radio>
            &nbsp;&nbsp;
            <Radio label="3">学校</Radio>
            &nbsp;&nbsp;
            <Radio label="4">酒店</Radio>
            &nbsp;&nbsp;
            <Radio label="5">商业</Radio>
            &nbsp;&nbsp;
            <Radio label="6">
              其他:
              <Input v-model="formInline.useTypeDescription" v-if="formInline.useType === '6'" style="margin-left:20px;"></Input>
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

      <!-- 绑定设备 -->
      <Form :model="formDev" :rules="ruleDev" ref='formDev' label-position="right" :label-width="100" v-if="percent === 66">
        <input type="hidden" v-model="formDev.id">
        <Row style="text-align:center;padding:20px;" class="bigFont1">用户：{{formInline.account}} </Row>
        <FormItem label="关联设备:" prop="itemIds">
          <Transfer :titles="transferTitle" :data="deviceList" filterable :filter-method="filterMethod" :target-keys="targetKeys" :render-format="renderF" :list-style="listStyle" :operations="['左移','右移']" @on-change="changeDevList"></Transfer>
          <Input v-show="false" v-model="formDev.itemIds" class="input-width"></Input>
        </FormItem>
        <Row style="padding:15px;">
          <Col >
            <FormItem style='text-align: center;'>
              <p class="publishTxt"> <span class="mr10">受理客服：</span> <strong class="mr30">xiantao05</strong> <span class="mr10">受理日期：</span> <strong>2019-05-08 15:20</strong> </p>
              <Button class="addSubmitBtn blueBtn mr10" type="primary" @click="handleSubmit('formDev')">提交</Button>
              <Button class="addResetBtn LightBlueBtn"  @click="handleReset('formDev')">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div v-if="percent === 100">
        <Row>
          <Col span="8" style="text-align:right"><img src="../../../assets/images/accountManage/ok.png" alt="开户成功"></Col><Col span="12" :offset="1" style="font-size:18pt;color:#0d2b99;"> 开户成功！</Col>
        </Row>
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
              <tr onselectstart="return false" onselect="document.selection.empty()" style="color:transparent;" v-if="successObj.identityCardNumber">身份证：</tr>
              <tr onselectstart="return false" onselect="document.selection.empty()" style="color:transparent;" v-if="successObj.otherType">{{successObj.cardTypeDescription}}：</tr>
              <tr>使用类别：</tr>
              <tr>联系人：</tr>
              <tr>联系电话：</tr>
              <tr>邮箱：</tr>
              <tr>备注：</tr>
              <tr>账户绑定设备：</tr>
            </td>
            <td style="padding-left:50px">
              <tr class="bigFont1">{{successObj.account}}</tr>
              <tr>{{successObj.applyNum}}</tr>
              <tr>{{successObj.appalyType === 0 ? '企业' : '个人'}}</tr>
              <tr>{{successObj.operator}}</tr>
              <tr>{{successObj.companyName}}</tr>
              <tr>{{successObj.settledTime}}</tr>
              <tr>{{successObj.phone}}</tr>
              <tr>{{successObj.address}}</tr>

              <tr>营业执照{{`【税号 ${successObj.businessLicense === null ? '': successObj.businessLicense}】`}}</tr>
              <tr v-if="successObj.identityCardNumber">身份证{{`【${successObj.identityCardNumber === null ? '' : successObj.identityCardNumber}】`}}</tr>
              <tr v-if="successObj.otherType">{{`${successObj.cardTypeDescription}【${successObj.otherType === null ? '' : successObj.otherType}】`}}</tr>
              <tr>{{useTypeS}}</tr>
              <tr>{{successObj.contactPerson}}</tr>
              <tr>{{successObj.contactPersonPhone}}</tr>
              <tr>{{successObj.email}}</tr>
              <tr>{{successObj.remarks === '' ? '————' : successObj.remarks}}</tr>
              <tr>{{successObj.items}}</tr>
            </td>
          </table>
          <div style="font-size:20px;margin-top:50px" >
            <p class="publishTxt" style="float:left;margin-left:280px"> 请认真核对并确认以上信息！</p>
            <Button class="addSubmitBtn blueBtn mr10" style="float:left;margin-left:20px" type="primary" @click="close()">确认并打印</Button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkout from '@/api/checkout'
import openAccountApi from '@/api/request/accountList'
import { FormatDate } from '@/api/util'
export default {
  data () {
    const validAccount = (rule, value, callback) => {
      let _this = this
      openAccountApi.searchIbsAccountName({
        account: _this.formInline.account
      }).then((res) => {
        console.log('111', res);
        if(res.status === 'success'){
          callback()
        }
      }).catch((err) => {
        callback(new Error('户号重复，请更改'))
      })
    }
    return {
      coManager: false,
      otherC: false,
      percent: 33,
      useTypeS: '',
      file1: '',
      file2: '',
      file3: '',
      formNum: '',
      formInline: {
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
          { validator: validAccount, trigger: 'blur'},
          { validator: checkout.checkAccName, trigger: 'blur' },
        ],
        appalyType: [
          { required: true, type: 'string', message: '请选择', trigger: 'blur' },
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
          { required: true, type: 'string', message: '请选择使用类型', trigger: 'blur' },
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
        width: '380px',
        height: '480px'
      },
      transferTitle: ['未关联设备列表','已关联设备列表'],
      deviceList: [],
      targetKeys: [],

      successObj: {}
    }
  },

  created () {
    this.getApplyNum()
    this.getIbsAccountByApplyNum()
  },

  methods: {
    //关闭开户页跳转至列表页
    close() {
      this.$router.push({path: '/accountList'})
    },

    filterMethod(data, query) {
      return data.label.indexOf(query) > -1
    },

    //获取后台单号
    getApplyNum() {
      openAccountApi.getApplyNum()
      .then((res) => {
        if(res.status === 'success'){
          this.formInline.applyNum = res.data
          this.formNum = res.data
        }else{
          this.$Message.console.error('未获取到服务单编号');
        }
      }).catch((err) => {})
    },

    //checkBox复制事件
    copyUserInfo() {
      if(this.coManager){
        this.formInline.contactPerson = this.formInline.operator
        this.formInline.contactPersonPhone = this.formInline.phone
      }else{
        this.formInline.contactPerson = ''
        this.formInline.contactPersonPhone = ''
      }
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

    renderF(item) {
      return item.label
    },

    //提交按钮
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(name === 'formInline') {
            this.searchIbsItemNotConnect()
            this.percent = 66
          }else if(name === 'formDev') {
            this.addAccountInfo()
          }
        } else {
          this.$Message.error('请完整填写红色标记内容再提交表单');
        }
      })
    },

    addAccountInfo() {
      if(this.formInline.settledTime) {
        this.formInline.settledTime = FormatDate(this.formInline.settledTime)
      }else{
        this.formInline.settledTime = ''
      }
      let formData = new FormData()          
      formData.append('file1', this.file1)
      formData.append('file2', this.file2)
      formData.append('file3', this.file3)
      formData.append('account', this.formInline.account)
      formData.append('applyNum', this.formInline.applyNum)
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
      openAccountApi.addIbsAccount(formData).then((res) => {
        if(res.status === 'success') {
          this.formDev.id = res.data.id
          this.formDev.account = res.data.account
          this.addAccountDevice(this.formDev.id)
        }
      }).catch((err) => {})
    },

    addAccountDevice(id) {
      if(id) {
        openAccountApi.addIbsAccountItem({
          id: id,
          itemIds: this.formDev.itemIds,
          account: this.formDev.account,
        }).then((res) => {
          if(res.status === 'success') {
            this.percent = 100
            this.getIbsAccountByApplyNum(this.formNum)
            this.handleReset('formDev')
            this.handleReset('formInline')
          }
        }).catch((err) => {})
      }
    },

    //添加成功后回显数据
    getIbsAccountByApplyNum(num) {
      openAccountApi.getIbsAccountByApplyNum({
        applyNum: num
      }).then((res) => {
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
        this.successObj = res.data
      }).catch((err) => {})
    },

    //查询未绑定用户的设备
    searchIbsItemNotConnect() {
      openAccountApi.searchIbsItemNotConnect()
      .then((res) => {  
        this.deviceList = this.fromatTansf(res.data)        
      }).catch((err) => {})
    },

    //格式化穿梭框数据
    fromatTansf(data) {   
      let c = []
      let a = {}
      if(data !== undefined){
        data.forEach(i => { 
          a.key = i.id
          a.label = i.name      
          c.push(a)
          a = {}
        })
      }     
      return c
    },

    //重置按钮
    handleReset(name) {
      this.$refs[name].resetFields()
      if(name === 'formDev') {
        this.deviceList = []
        this.targetKeys = []
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
    },

    // checkAccountRepeat() {
    //   console.log('失去焦点');
      
    //   this.$Message.info('检查户号')
    // }
  },
}
</script>

<style lang="less">
.open-account-page {
  .text-right{
    text-align: right;
  }

  .tab-success-info{
    font-size: 20px;
  }
  .ivu-form-item-error-tip{
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 6px;
  } 
}
</style>
