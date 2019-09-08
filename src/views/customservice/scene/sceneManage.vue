<template>
  <div>
    <div style="width: 60%;margin-left: 15%;">
      <Form :model="formInline" :rules="ruleInline" ref='formInline' label-position="right" :label-width="140">
        <FormItem label="户号" prop='account'>
          <Input v-model="formInline.account" type="text" @on-blur='serachBtn'>
          </Input>
        </FormItem>
        <FormItem label="公司名称/户主名称" prop='companyName'> 
          <Input v-model="formInline.companyName" type="text"></Input>
        </FormItem>
        <FormItem label="报修人" prop='applyer'>  
          <Input v-model="formInline.applyer" type="text">
          </Input>
        </FormItem>
        <FormItem label="报修人联系电话" prop='applyPhone'>  
          <Input v-model="formInline.applyPhone" type="text">
          </Input>
        </FormItem>
        <FormItem label="报修日期" prop='applyDate'>
          <DatePicker type="datetime" v-model='formInline.applyDate'></DatePicker>
        </FormItem>
        <FormItem label="报修内容" prop='content'>
          <Input v-model="formInline.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}">
          </Input>
        </FormItem>
        <FormItem style='text-align: center;'>
          <Button class="addSubmitBtn blueBtn mr10" type="primary" @click="handleSubmit('formInline')">提交</Button>
          <Button class="addResetBtn LightBlueBtn"  @click="handleReset('formInline')">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import scene from '../../../api/request/sceneManage'
export default {
  data () {
    return {
      accountId: '',
      formInline: {
        account: '',
        applyer: '',
        companyName: '',
        applyPhone: '',
        applyDate:'',
        content: ''
      },
      ruleInline: {
        account:[{required: true, type: 'string', message: '请输入户号', trigger: 'blur'}],
        applyer:[{required: true, type: 'string', message: '请输入报修人', trigger: 'blur'}],
        companyName:[{required: true, type: 'string', message: '请输入公司名称/户主名称', trigger: 'blur'}],
        applyPhone:[{required: true, type: 'string', message: '请输入报修人联系电话', trigger: 'blur'}],
        applyDate:[{required: true, type: 'date', message: '请输入报修日期', trigger: 'blur'}],
        content:[{required: true, type: 'string', message: '请输入报修内容', trigger: 'blur'}]
      },
    }
  },

  created () {
    this.formInline.applyDate = new Date()
  },
  methods: {
    //一键补充
    serachBtn () {
      scene.searchAccountByName({
        account: this.formInline.account
      })
      .then((res) => {
        this.formInline.companyName = res.companyName
        this.accountId = res.id
      })
      .catch((err) => {
        this.$Message.error('当前账户不存在')
        this.formInline.companyName = ''
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          scene.addIbsApply({
            accountId: this.accountId,
            Applicant: this.formInline.applyer,
            phone: this.formInline.applyPhone,
            applyContent: this.formInline.content
          })
          .then((res) => {
            this.$Message.success('现场申报成功')
            this.handleReset('formInline')
          })
          .catch((err) => {
            this.$Message.error('现场申报失败')
          })
        }
      })
    },

    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less">

</style>
