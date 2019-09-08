<template>
  <div>
    <div style="width: 60%;margin-left: 15%;">
      <Form :model="formInline" :rules="ruleInline" ref='formInline' label-position="right" :label-width="140">
        <FormItem label="户号" prop='account'>
          <Input v-model="formInline.account" type="text" @on-blur='serachBtn'>
          </Input>
        </FormItem>
        <FormItem label="联系人" prop='contactPerson'> 
          <Input v-model="formInline.contactPerson" type="text"></Input>
        </FormItem>
        <FormItem label="联系人电话" prop='contactPersonPhone'>  
          <Input v-model="formInline.contactPersonPhone" type="text">
          </Input>
        </FormItem>
        <FormItem label="停机时间" prop='onOffTime'>  
          <DatePicker type="datetime" v-model='formInline.onOffTime' @on-change='changeTime'></DatePicker>
          </Input>
        </FormItem>
        <FormItem label="停复机类型" prop='type'>
          <Select v-model="formInline.type" placeholder='' clearable filterable>
            <Option :value='0'>{{'停机'}}</Option>
            <Option :value='1'>{{'复机'}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="报修内容" prop='content'>
          <Input v-model="formInline.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}">
          </Input>
        </FormItem> -->
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
        contactPerson: '',
        contactPersonPhone: '',
        onOffTime:'',
        type: ''
      },
      ruleInline: {
        account:[{required: true, type: 'string', message: '请输入户号', trigger: 'blur'}],
        contactPerson:[{required: true, type: 'string', message: '请输入联系人', trigger: 'blur'}],
        contactPersonPhone:[{required: true, type: 'string', message: '请输入联系人电话', trigger: 'blur'}],
        onOffTime:[{required: true, type: 'string', message: '请选择停复机时间', trigger: 'blur'}],
        type:[{required: true, type: 'number', message: '请选择停复机类型', trigger: 'change'}],
      },
    }
  },
  methods: {
    //一键补充
    serachBtn () {
      scene.searchAccountByName({
        account: this.formInline.account
      })
      .then((res) => {
        this.formInline = res
        this.accountId = res.id
      })
      .catch((err) => {
        this.$Message.error('当前账户不存在')
        this.formInline.contactPerson = ''
        this.formInline.contactPersonPhone=''
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          scene.addOnOffApply({
            accountId: this.accountId,
            onOffTime: this.formInline.onOffTime,
            type: this.formInline.type,
          })
          .then((res) => {
            this.$Message.success('现场停复机申报成功')
            this.handleReset('formInline')
          })
          .catch((err) => {
            this.$Message.error(err.description)
          })
        }
      })
    },
    changeTime (date)  {
      this.formInline.onOffTime = date
    },

    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less">

</style>
