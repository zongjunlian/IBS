<template>
    <Select v-model="selectValue" multiple @on-change="change" filterable  v-bind:style="styleObject" label-in-value 
	:max-tag-count='maxCount' 
	:disabled="isDisabled" 
	:placeholder='tip'>
          <Option v-for="item in optionArr" :key="item.value" :value="item.value">{{ item.label }}</Option>
    </Select>
</template>
 
<script>
export default {
  name: 'MultiSelect',
  data () {
    return {
      selectValue: this.selectValueProp,
      optionArr: this.optionArrProp,
	  isDisabled:this.isDisabledProp,
	  tip:this.placeholderProp,//placeholder提示内容
      ALL_SELECT: 'ALL_SELECT',
      styleObject: {
        'width': this.widthProp + 'px'
      },
	  optionVal:[],//所有选项的value值,除全选
	  optionLabel:[],//所有选项的label值,除全选
	  maxCount:this.maxCountProp,
    }
  },
  props: {
    selectValueProp: {//选中的value
      type: Array,
      default: function () {
        return []
      }
    },
    optionArrProp: {//所有选项
      type: Array,
      default: function () {
        return []
      }
    },
    widthProp: {//自定义宽度
      type: Number,
      default: function () {
        return 100
      }
    },
	maxCountProp:{
		type: Number,
		default: function () {
		  return 5
		}
	},
	isDisabledProp:{
		type: Boolean,
		default:false
	},
	placeholderProp:{
		type: String,
		default:''
	},
  },
  watch: {
    optionArrProp () {
	let arr=[{label:'全选', value: 'ALL_SELECT'}];
	if(JSON.stringify(this.optionArrProp).indexOf(JSON.stringify(...arr))==-1){
		this.optionArr =[...arr,...this.optionArrProp] ;
	}else{
		this.optionArr =this.optionArrProp;
	}
	 this.getOptionArrVal();
	 this.getOptionArrLabel();
   },
   selectValueProp () {
   	 this.selectValue=this.selectValueProp;
   },
	maxCountProp () {
	 this.maxCount=this.maxCountProp;
	},
	isDisabledProp() {
	 this.isDisabled=this.isDisabledProp;
	},
	placeholderProp() {
	 this.tip=this.placeholderProp;
	}
  },
  mounted () {
	  
  },
  created(){
	  this.getOptionArrVal();
	  this.getOptionArrLabel();
	  let arr=[{label:'全选', value: 'ALL_SELECT'}];
	  if(this.optionArr && this.optionArr.length> 0 && JSON.stringify(this.optionArr).indexOf(JSON.stringify(...arr))==-1){
			this.optionArr.unshift({label:'全选', value: 'ALL_SELECT'})
		}
  },
  methods: {
    change (data) {
		var labelArr=[];
		var valueArr=[];
		data.map(item=>{
			labelArr.push(item.label);//选中的label
			valueArr.push(item.value)//选中的value
		})
		
		var arr=[];
		valueArr.map(item=>{
			if(item!=this.ALL_SELECT){
				arr.push(item) 
			}
		});
		if(valueArr.includes('ALL_SELECT')){//如果选了全选
			if(arr.join('')===this.optionVal.join('')){//如果除了全选之外的都选中
				this.selectValue=[];
				labelArr=[];
			}else{
				this.selectValue=this.optionVal;
				labelArr=this.optionLabel;
			}
		}else if(!valueArr.includes('ALL_SELECT')){
			
		}
		this.$emit("listenChange",this.selectValue,labelArr)
    },
	getOptionArrVal(){//得到所有选项的value值,除全选
		var arr=[];
		this.optionArr.map(item=>{
			if(item.value!=this.ALL_SELECT){
				arr.push(item.value) 
			}
		});
		this.optionVal=arr;
	},
	getOptionArrLabel(){//得到所有选项的label值,除全选
		var arr=[];
		this.optionArr.map(item=>{
			if(item.label!='全选'){
				arr.push(item.label)
			}
		})
		this.optionLabel=arr;
	}
  }
}
</script>
<style>
	.ivu-select-multiple .ivu-select-selection {
    /* height:32px;
    overflow:hidden; */
}
</style>
