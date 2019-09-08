# ibs

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```
##封装好的删除弹出框
##删除分为两种,一种有按钮的:确认删除/取消按钮;一种没有按钮的
使用方法:
有按钮: <delModal name='风机盘管设备' type='有按钮'></delModal>
无按钮: <delModal name='风机盘管设备' type='无按钮'></delModal>
##name为可变值 如:'风机盘管设备','采集器信息','计量仪表信息'等
##有按钮的删除弹出框,按钮触发click事件的方法如下:
  #删除确定
  deleteBtn () {
    document.getElementById('delete').addEventListener('click',()=>{
      console.log('删除确定')
    });
  },
  #删除取消
  deleteCancel () {
    document.getElementById('cancel').addEventListener('click',()=>{
      console.log('删除取消')
    });
  },
#以上方法在删除的render里面调用即可
 this.$nextTick(()=> {
   if(this.delModal){ ##删除弹出框显示时调用
    this.deleteBtn()
    this.deleteCancel()
   }
 })

#新增自定义删除弹窗  
#使用方法：跟modal一样  
#slot： content 自定义内容  
#type：默认不传为感叹号背景 传err为哭脸背景  
样例：   
<imodal v-model="visible" :title="title">
  <div class="mod-content">
    <p class="mod-content-title">系统提示：</p>
    <p class="mod-content-info ft">本次操作将导致当前XXX信息被删除且不可恢复。</p>
    <br><br>
    <span>
      <Button class="mod-content-btn delBtn" @click="visible = false">取消操作</Button>
      <Button class="mod-content-btn delBtn" style='margin-right:8px;' @click="自定义删除事件">确认删除</Button>
    </span>
  </div>
</imodal>

#时间组件封装，将日期选取截止到当天，起始时间和结束时间都可选同一天，主要为了减少代码量和统一格式，方便修改
#初步封装，后期可根据需要自行修改
#使用方法：  <DateGroup type='date' :startTime.sync="beginTime" :endTime.sync="endTime"></DateGroup>
# type：              跟DatePicker一样
# :startTime.sync     起始时间变量，后边名字随意取
# :endTime.sync       结束时间变量，后边名字随意取


***
**`新增自定义select全选组件`    
使用说明:  
  * selectValueProp:选中的value数组;  
  * optionArrProp:所有下拉选项数组;  
  * widthProp:组件宽度;  
  * maxCountProp:多选时最多显示多少个tag;  
  * placeholderProp:placeholder的提示文字;  
  * @listenChange:change事件.返回两个参数:selectValue,选中的value数组, labelArr:选中的label数组;  
使用样例: 
``` 
<MultiSelect :selectValueProp="meterIds" 
:optionArrProp="meterList" 
:widthProp="280" 
:maxCountProp='2' 
:placeholderProp="'请选择监测仪表'"
@listenChange='meterChange' class='mr5'></MultiSelect>  
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
