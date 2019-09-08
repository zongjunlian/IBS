<template>
  <div class="img-button">
    <!-- 图片按钮 -->
    <div v-if="type === '查看'" :title="tag === '' ? type : tag" class="img-btn watch-img"></div>
    <div v-if="type === '查看1'" :title="tag === '' ? type : tag" class="img-btn see-img"></div>

    <div v-if="type === '修改'" :title="tag === '' ? type : tag" class="img-btn edit-img"></div>
    <div v-if="type === '设置1'" :title="tag === '' ? type : tag" class="img-btn set1-img"></div> 
    <div v-if="type === '删除'" :title="tag === '' ? type : tag" class="img-btn del-img"></div>
    
    <div v-if="type === '注销'" :title="tag === '' ? type : tag"  class="img-btn logoff-img"></div>
    <div v-if="type === '保存'" :title="tag === '' ? type : tag"  class="img-btn save-img"></div>

    <div v-if="type === '添加'" :title="tag === '' ? type : tag"  class="big-img-btn add-img"></div>
    <div v-if="type === '批量添加'" :title="tag === '' ? type : tag"  class="big-img-btn batch-img"></div>
    <div v-if="type === '设置'" :title="tag === '' ? type : tag"  class="big-img-btn set-img"></div>
    <div v-if="type === '添加报表'" :title="tag === '' ? type : tag"  class="big-img-btn addReport-img"></div>
    
    <div v-if="type === '添加参数'" :title="tag === '' ? type : tag" class="big-img-btn addParams-img"></div>
    <div v-if="type === '添加公告'" :title="tag === '' ? type : tag" class="img-btn addAnn-img"></div>
    <div v-if="type === '隐藏公告'" :title="tag === '' ? type : tag" class="img-btn hideAnn-img"></div>
		<div v-if="type === '恢复公告'" :title="tag === '' ? type : tag" class="img-btn hidedAnn-img"></div>
    <div v-if="type === '打印'" :title="tag === '' ? type : tag" class="img-btn print-img"></div>
    <div v-if="type === '添加用户'" :title="tag === '' ? type : tag" class="big-img-btn addUser-img"></div>

    <div v-if="type === '小查看'" :title="tag === '' ? type : tag" class="small_btn small-watch-img"></div>

    <div v-if="type === '添加采集器'" :title="tag === '' ? type : tag" class="img-btn collector-add-img"></div>
    <div v-if="type === '修改采集器'" :title="tag === '' ? type : tag" class="img-btn collector-edt-img"></div>
    <div v-if="type === '仪表'" :title="tag === '' ? type : tag" class="img-btn meter-img"></div>
    <div v-if="type === '仪表查看'" :title="tag === '' ? type : tag" class="img-btn meter-check-img"></div>
    <div v-if="type === '仪表添加'" :title="tag === '' ? type : tag" class="img-btn meter-add-img"></div>
    <div v-if="type === '仪表批量添加'" :title="tag === '' ? type : tag" class="img-btn meter-addM-img"></div>

    <!-- 文字按钮 -->
    <div v-if="type === '按钮'" :title="tag === '' ? name : tag" class="ibtn">{{name}}</div><!--用于筛选按钮等-->
    <div v-if="type === '高级筛选'" :title="tag === '' ? name : tag" class="ibtn">{{name}}&nbsp;<Icon type="ios-arrow-down" /></div>
    <div v-if="type === '提交'" :title="tag === '' ? name : tag" class="ibtn-submit">{{name}}</div>
    <div v-if="type === '重置'" :title="tag === '' ? name : tag" class="ibtn-reset">{{name}}</div>

    <div v-if="type === '标题'" :title="tag === '' ? name : tag" class="title img-title">{{name}}</div>
		
		<div v-if="type === '定位'" :title="tag === '' ? type : tag" class="small_btn small-location-img"></div>
  </div>
</template>

<script>
export default {
  name: 'ImgButton',
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
    }
  }
}
</script>

<style lang="less" scoped>
  .img-button {
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
    .img-btn {
      width:25px;
      height:25px;
    }
    .big-img-btn {
      width:40px;
      height:40px
    }
    .big-img-btn:hover{
      transform: scale(0.9);
    }
    .img-btn:hover {
      transform: scale(0.9);
    }
    .small_btn {
      width:15px;
      height:15px;
    }
    .title{
      width:209px;
      // padding-left:10px;
      height:65px;
      color:#fff;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
    }
    .img-title {
      background: url('../../assets/images/img-button/title.png') no-repeat;
      background-size: cover;
    }
    .logoff-img {
      background: url('../../assets/images/img-button/logoff.png') no-repeat;
    }
    .save-img {
      background: url('../../assets/images/img-button/save.png') no-repeat;
    }
    .add-img {
      background: url('../../assets/images/device/addTerminal.png') no-repeat;
    }
    .batch-img {
      background: url('../../assets/images/device/importTerminal.png') no-repeat;
    }
    .set-img {
      background: url('../../assets/images/device/setTerminal.png') no-repeat;
    }
    .addReport-img {
      background: url('../../assets/images/img-button/addReport.png') no-repeat;
    }
    .set1-img {
      background: url('../../assets/images/img-button/set.png') no-repeat;
    }
    .small-watch-img {
      background: url('../../assets/images/img-button/small_watch.png') no-repeat;
      background-size: cover;
    }
		.small-location-img {
      background: url('../../assets/images/device/location.png') no-repeat;
      background-size: cover;
		}
    .watch-img {
      background: url('../../assets/images/img-button/watch.png') no-repeat;
    }
    .see-img {
      background: url('../../assets/images/img-button/see.png') no-repeat;
    }
    .edit-img {
      background: url('../../assets/images/img-button/edit.png') no-repeat;
    }
    .del-img {
      background: url('../../assets/images/img-button/del.png') no-repeat;
    }
    .addAnn-img {
      background: url('../../assets/images/img-button/addAnn.png') no-repeat;
      background-size: 99%;
    }
    .addParams-img {
      background: url('../../assets/images/img-button/paramsAdd.png') no-repeat;
      background-size: 80%;
    }
    .hideAnn-img {
      background: url('../../assets/images/img-button/hidedAnn.png') no-repeat;
      background-size: 99%;
    }
		.hidedAnn-img {
      background: url('../../assets/images/img-button/hideAnn2.png') no-repeat;
      background-size: 99%;
		}
    .print-img {
      background: url('../../assets/images/img-button/print.png') no-repeat;
      background-size: cover;
    }
    .addUser-img {
      background: url('../../assets/images/img-button/addUser.png') no-repeat;
      background-size: cover;
    }
    .collector-add-img {
      background: url('../../assets/images/img-button/collectorAdd.png') no-repeat;
      background-size: 99%;
    }
    .collector-edt-img {
      background: url('../../assets/images/img-button/collectorEdt.png') no-repeat;
      background-size: 99%;
    }
    .meter-img {
      background: url('../../assets/images/img-button/meter.png') no-repeat;
      background-size: 99%;
    }
    .meter-check-img {
      background: url('../../assets/images/img-button/meterCheck.png') no-repeat;
      background-size: 99%;
    }
    .meter-add-img {
      background: url('../../assets/images/img-button/meterAdd.png') no-repeat;
      background-size: 99%;
    }
    .meter-addM-img {
      background: url('../../assets/images/img-button/meterAddM.png') no-repeat;
      background-size: 99%;
    }

    .ibtn {
      width: auto;
      min-width: 80px;
      padding: 0 12px;
      font-size: 14px;
      height: 30px;
      line-height: 30px; 
      text-align: center;
      vertical-align: middle;
      color:#077aa9;
      background-color: #fefefe;
      border:1px solid #077aa9
    }
    .btn {
      width: auto;
      text-align: center;
      vertical-align: middle;
      min-width: 60px;
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      border-radius: 5px;
    }
    .ibtn-submit {
      .btn;
      color:#fefefe;
      background-color: #287ebb;
    }
    .ibtn-reset{
      .btn;
      color:#333;
      background-color: #d7e3f9;

    }
    // .ibtn-submit:hover {
    //   color:#077aa9;
    //   background-color: #fefefe;
    //   border:1px solid #077aa9
    // }
  }
</style>
