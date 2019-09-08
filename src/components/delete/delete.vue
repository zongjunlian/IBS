<template>
  <div>
    <div v-if='type==="无按钮"' class="del-info-modal" v-show='visible.delModN'>
      <Row :gutter="16" style="background:#e2e2e2;margin: 5px 10px 0 10px">
        <Col span="20" class="mod-title"><img src='../../assets/images/img-button/del.png' width='20px' style='position:relative;top:4px;margin-right:6px'/>删除{{name}}</Col>
        <Col span="4"><Icon type="md-close" size="25" style="float:right" id='closeN' @click='onCancel'/></Col>
      </Row>
      <div class="mod-content">
        <p class="mod-content-title">系统提示:</p>
        <p class="mod-content-info">当前{{name}}已绑定设备,请在执行</p>
        <p class="mod-content-info">删除操作前释放关联账户。</p>
      </div>
    </div>

    <div v-if='type==="有按钮"' class="del-del-modal" v-show='visible.delModY'>
      <Row :gutter="16" style="background:#e2e2e2;margin: 5px 10px 0 10px">
        <Col span="20" class="mod-title"><img src='../../assets/images/img-button/del.png' style='position:relative;top:4px;margin-right:6px'><span>删除{{name}}</span></Col>
        <Col span="4"><Icon type="md-close" size="25" style="float:right" id='closeY' @click='onCancel'/></Col>
      </Row>
      <div class="mod-content">
        <p class="mod-content-title">系统提示：</p>
        <p class="mod-content-info">本次操作将导致当前{{name}}被删除</p>
        <span>
          <p class="mod-content-info">且不可恢复。</p>
          <Button class="mod-content-info delBtn" id='delete' @click='deleteBtn'>确认删除</Button>
          <Button class="mod-content-info delBtn" id='cancel' style='margin-right:8px;' @click='onCancel'>取消操作</Button>
        </span>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'DelModal',
  data () {
    return {
        visible: {
          delModN: this.delModel.delModN,
          delModY: this.delModel.delModY
        }
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    delModel: {
      type: Object,
      default: {}
    }
  },
  mounted () {
    this.visible = this.delModel
  },
  watch: {
    // delModel () {
    //   this.visible=this.delModel
    //   console.log(this.delModel.delModN,1111)
    // },
  },
  methods:{
    onCancel () {
      this.delModel.delModN = false
      this.delModel.delModY = false
    },
    deleteBtn () {
      this.$emit("deleteBtn",this.visible)
    }
  }
}
</script>
<style lang='less' scoped>
  .delBtn {
    float:right;
    margin-right:15px;
    margin-top:-40px;
    cursor:pointer;
    font-size: 12px;
    color:#333
  }
  .del-info-modal {
    position: fixed;
    top: 40%;
    left: 42%;
    width: 415px;
    height: 232px;
    background-image: url('../../assets/images/accountManage/dInfo.png');
    z-index: 5000;
    .mod-title {
      font-size: 16px;
      color:#333;
    }
    .mod-content {
      margin-left: 100px;
      margin-top: 25px;
      color: white;
      .mod-content-title {
        font-size: 25px;
        margin-bottom: 20px;
      }
      .mod-content-info {
        font-size: 16px;
        margin-bottom: 18px;
      }
    }
  }
  .del-del-modal {
    .del-info-modal;
    // background-image: url('../../assets/images/accountManage/dInfo.png');
  }
</style>