<template>
  <div>
    <div :class="[type === 'err' ? 'del-del-modal' : 'del-info-modal']" v-if="visible">
      <Row :gutter="16" style="background:#e2e2e2;margin: 5px 10px 0 10px">
        <Col span="20" class="mod-title"><img src='@/assets/images/img-button/del.png' width='20px' style='position:relative;top:4px;margin-right:6px'/>删除{{title}}</Col>
        <Col span="4"><Icon type="md-close" size="25" style="float:right" @click="handelChange"/></Col>
      </Row>
      <slot  class="mod-content"></slot>
    </div>
  </div>

</template>
<script>
export default {
  name: 'iModal',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
    },
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },

  methods: {
    handelChange() {
      this.$emit('change', !this.visible)
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
      padding: 3px;
      color: white;
      .mod-content-title {
        font-size: 25px;
        margin-bottom: 20px;
      }
      .mod-content-info {
        font-size: 16px;
        margin-bottom: 18px;
      }
      .mod-content-btn {
        font-size: 14px;
        margin-bottom: 16px;
      }
    }
  }
  .del-del-modal {
    .del-info-modal;
    background-image: url('../../assets/images/accountManage/dError.png');
  }
  .ft {
    text-indent: 2em;
  }
</style>