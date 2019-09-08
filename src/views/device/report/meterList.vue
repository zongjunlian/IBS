<template>
	<div>
		<Row>
			<Col span="4">
			<b class="fontSize mr10">{{'监测数据统计报表总数:'}}</b>
			<b class="bigFont1">{{dataCount}}</b>
			</Col>
			<Col span="15">
			<!-- <Select class="mr10" v-model="meter" style="width:200px" clearable>
				<Option v-for="item in meterList" :value="item.value" :key="item.value">{{ item.name }}</Option>
			</Select> -->
			<MultiSelect :selectValueProp="meterIds" :optionArrProp="meterList" :widthProp="280" :maxCountProp='2' :placeholderProp="'请选择监测仪表'"
			 @listenChange='meterChange' class='mr5'></MultiSelect>
			 <!-- 
			 * selectValueProp:选中的value数组;
			 *  optionArrProp:所有下拉选项数组;
			 * widthProp:组件宽度  ;
			 * maxCountProp:多选时最多显示多少个 tag;
			 * placeholderProp:placeholder的提示文字
			 * @listenChange:change事件.返回两个参数:selectValue,选中的value数组, labelArr:选中的label数组;
			 * -->
			<span class="mr10">日期</span>
			<DatePicker size="large" v-model="startTime" :editable="false" type="datetime" placeholder="" style="width: 200px" class="mr10"
			 format="yyyy-MM-dd HH:mm:ss" :options="startTimeOption" @on-change="alarmStartTime"></DatePicker>
			<span class="mr10">一</span>
			<DatePicker size="large" v-model="endTime" :editable="false" type="datetime" placeholder="" style="width: 200px" class="mr10"
			 format="yyyy-MM-dd HH:mm:ss" :options="endTimeOption" @on-change="alarmEndTime"></DatePicker>
			<imgButton class="mr10" type="按钮" name="查询" @click.native='pageChange(1)'></imgButton>
			</Col>
			<Col span="5">
			<span class="fr">
				<span class="clearfix pointer mr20 fl" @click="generateReport">
					<img class="fl" src='../../../assets/images/device/线上生成报表.png' alt="" style="margin-top: 6px;">
					<span class="fl fz14 fw700" style="margin-top: 10px;">【在线生成报表】</span>
				</span>
				<span class="clearfix pointer fl" @click="managerReport">
					<img class="fl" src='../../../assets/images/device/管理定期报表.png' alt="" style="margin-top: 6px;">
					<span class="fl fz14 fw700" style="margin-top: 10px;">【管理定期报表】</span>
				</span>
			</span>
			</Col>
		</Row>
		<Table :columns="columns" class="common-table" :data="terminalList" no-data-text="暂无数据" border></Table>

		<Row class="page-bottom">
			<Col span="12" class="page-text">当前显示<span class="pageColor">{{terminalList.length}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
			<Col span="8" :offset="4">
			<Page :total="dataCount" :page-size="pageSize" @on-change="pageChange" show-elevator :current="currentPage" class="common-page-style" />
			</Col>
		</Row>
		<!----删除-->
		<imodal v-model="visible" :title="modalTitle">
		  <div class="mod-content">
		    <p class="mod-content-title">系统提示：</p>
		    <p class="mod-content-info ft">
		      本次操作将导致当前报表被删除且不可恢复。
		    </p>
		    <span>
		      <p class="mod-content-info">&nbsp;</p>
		      <Button class="mod-content-btn delBtn" @click="visible = false">取消操作</Button>
		      <Button class="mod-content-btn delBtn" style='margin-right:8px;' @click="isDel = true,visible = false,deleteF()">确认删除</Button>
		    </span>
		  </div>
		</imodal>
		
		<!---添加设备-->
		<Modal :mask-closable="false" v-model="addModal" draggable @on-cancel="onCancel" width='1000' class='modal'>
			<div style="margin-top:30px">
				<Row>
					<Col span='20'>
					<img class='imgPosition' src='../../../assets/images/img-button/addReport.png' v-if='isadd'>
					<img class='imgPosition' src='../../../assets/images/img-button/edit.png' v-else>
					<span class='spanPosition'>{{title}}</span>
					</Col>
					<Col span='4'>
					<span>操作日期: {{nowDate}}</span>
					</Col>
				</Row>
				<Form ref="addForm" :model="addForm" :rules='ruleAddForm' :label-width='15'>
					<table border class='table' width='100%'>
						<tr>
							<td width='20%'>
								<label>统计报表名称</label>
							</td>
							<td width='80%' class='padding'>
								<FormItem prop="name" class='inline' label=' '>
									<Input type='text' v-model='addForm.name' placeholder=''></Input>
								</FormItem>
							</td>
						</tr>
						<tr>
							<td width='20%'>
								<label>计量仪表</label>
							</td>
							<td width='80%' class='padding'>
								<FormItem prop="jlyb" class='inline' label=' '  style='textAlign:left'>
									<Checkbox style='display:inline'
									  :indeterminate="indeterminate1"
									  :value="checkAll1"
									  @click.prevent.native="handleCheckAll1"
									  :disabled="isDisabled">全选
									</Checkbox>
									<CheckboxGroup style='display:inline' v-model="addForm.jlyb" @on-change='checkJlyb'>
										<Checkbox :label="item.value" v-for='item in checkGroup1' :disabled='isDisabled'>{{item.label}}</Checkbox>
									</CheckboxGroup>
								</FormItem>
							</td>
						</tr>
						<tr v-if="isadd">
							<td width='20%'>
								<label>统计日期</label>
							</td>
							<td width='80%' class="setReport">
								<FormItem prop="reportNature" class='inline fl ml10 mr20' label=' '>
									<Select v-model="addForm.reportNature" filterable @on-change='' clearable placeholder='' :disabled='isDisabled'>
										<Option v-for="item in reportNatures" :value="item.value" :key="item.value">{{item.name}}</Option>
									</Select>
								</FormItem>
								<FormItem prop="tongjiDate" class='inline fl' label=' '>
									<DatePicker type="datetimerange" v-model="addForm.tongjiDate" :disabled='isDisabled' style='width:300px;'></DatePicker>
								</FormItem>
							</td>
						</tr>
						<tr v-if="!isadd">
							<td width='20%'>
								<label>统计日期</label>
							</td>
							<td width='80%'>
						<tr>
							<td width='40%' style='border:0;padding:0 10px'>
								<FormItem prop="tongjiDate" class='inline' label=' '>
									<DatePicker type="datetimerange" v-model="addForm.tongjiDate" :disabled='isDisabled' style='width:100%;'></DatePicker>
								</FormItem>
							</td>
							<td width='28%' style='border-top:0;border-bottom:0'>
								<label>起始日期</label>
							</td>
							<td width='33%' class='padding' style='border:0'>
								<FormItem prop="datetime" class='inline' label=' '>
									<DatePicker type="datetime" v-model="addForm.date" :disabled='isDisabled'></DatePicker>
								</FormItem>
							</td>
						</tr>
						</td>
						</tr>
						<tr>
							<td width='20%'>
								<label>内容描述/备注</label>
							</td>
							<td width='80%' class='padding'>
								<FormItem prop="content" class='inline' label=' '>
									<Input type='textarea' v-model='addForm.content' :autosize="{minRows: 2,maxRows: 5}"></Input>
								</FormItem>
							</td>
						</tr>
						<tr>
							<td width='20%'>
								<label>统计内容</label>
							</td>
							<td width='80%' class='padding textCheck'>
								<FormItem prop="statics" class='inline' label=' ' style='textAlign:left'>
									<Checkbox style='display:inline'   :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll" :disabled='isDisabled'>全选</Checkbox>
									<CheckboxGroup v-model="addForm.statics" @on-change="checkAllGroupChange" style='display:inline'>
										<Checkbox :label="item.value" v-for='item in checkGroup'  :disabled='isDisabled'>{{item.label}}</Checkbox>
									</CheckboxGroup>
								</FormItem>
							</td>
						</tr>
						<tr>
							<td width='20%'>
								<label>统计范围</label>
							</td>
							<td width='80%' class='padding'>
								<FormItem prop='rank' class='inline' label=' '>
									<Cascader :data="ranks" v-model="addForm.rank" filterable clearable placeholder='' @on-change='rankChange'  :disabled='isDisabled'></Cascader>
								</FormItem>
							</td>
						</tr>
						<tr>
							<td width='20%'>
								<label>统计方式</label>
							</td>
							<td width='80%' class='padding' style='textAlign:left'>
								<FormItem prop='type' class='inline'>
									<RadioGroup v-model="addForm.type">
										<Radio label="0" :disabled='isDisabled'>按设备统计</Radio>
										<Radio label="1" :disabled='isDisabled'>按建筑统计</Radio>
									</RadioGroup>
								</FormItem>
							</td>
						</tr>
					</table>
				</Form>
			</div>
			<div slot="footer" style="margin:25px 0">
				<imgButton type="按钮" name="确定" @click.native="submitFrom('addForm')">确定</imgButton>
				<imgButton type="按钮" name="重置" @click.native="resetFrom('addForm')">重置</imgButton>
			</div>
		</Modal>

	</div>
</template>
<script>
	import meterApi from '@/api/request/teminalReport.js'
	import {
		FormatDate,
		dateToStringByD
	} from "@/utils/validate.js";
	import filter from '@/api/filter'
	export default {
		name: 'meterList',
		data() {
			return {
				nowDate:dateToStringByD(new Date()),
				isDisabled:false,
				meter: '',
				meterIds:[],
				meterList: [
					{
						value: 1,
						label: '电表'
					},
					{
						value: 2,
						label: '水表'
					},
					{
						value: 3,
						label: '燃气表'
					},
					{
						value: 4,
						label: '热计量仪表'
					}
				],
				visible: false,
				modalTitle: '监测数据统计报表',
				isDel: false,
				currentId:'',
				title: '',
				isadd: true,
				addModal: false,
				delMod: false,
				indeterminate: false,
				checkAll: false,
				indeterminate1: false,
				checkAll1: false,
				ranks: [],
				checkGroup: [
					{value: 'name',label:'设备名称'},
					{value: 'code',label:'设备编号'},
					{value: 'building',label:'所属建筑'},
					{value: 'brand',label:'计量区域'},
					{value: 'subtry1',label:'计量分项'},
					{value: 'subtry2',label:'耗能数据'},
					{value: 'subtry3',label:'能耗密度'},
					{value: 'subtry4',label:'费用'},
				],
				checkGroup1: [
					{value: 1,label:'电表'},
					{value: 2,label:'水表'},
					{value: 3,label:'燃气表'},
					{value: 4,label:'热计量仪表'},
				],
				reportNatures: [{
						name: '年度报表',
						value: 0
					},
					{
						name: '季度报表',
						value: 1
					},
					{
						name: '月度报表',
						value: 2
					},
					{
						name: '周报',
						value: 3
					},
					{
						name: '日报',
						value: 4
					}
				],
				addForm: {
					name: '',
					reportNature: '',
					tongjiDate: [],
					content: '',
					type: '',
					statics: [],
					staticsName:[],
					jlyb: [],
					jlybName:[],
					rank: [],
					rankName:[],
					date:''
				},
				ruleAddForm: {
					name: [{
						required: true,
						type: 'string',
						message: '请输入统计报表名称',
						trigger: 'blur'
					}],
					reportNature: [{
						required: true,
						type: 'number',
						message: '请选择统计报表性质',
						trigger: 'change'
					}],
					tongjiDate: [{
						required: true,
						type: 'array',
						message: '请选择统计时间',
						trigger: 'change'
					}],
					statics: [{
						required: true,
						type: 'array',
						message: '请选择统计内容',
						trigger: 'change'
					}],
					jlyb: [{
						required: true,
						type: 'array',
						message: '请选择计量仪表',
						trigger: 'change'
					}],
					rank: [{
						required: true,
						type: 'array',
						message: '请选择统计范围',
						trigger: 'change'
					}],
				},

				num: 2, //报表总数
				startTime: '',
				endTime: '',
				startTimeOption: {},
				endTimeOption: {},
				currentPage: 1,
				pageSize: 10,
				dataCount: 0,
				columns: [{
						title: "序号",
						type: "index",
						align: "center",
						width:100
					},
					{
						title: "报表名称",
						key: "name",
						align: "center",
						width:300
					},
					{
						title: "统计数据类型",
						key: "meterNames",
						align: "center",
						width:300
					},
					{
						title: "数据统计日期",
						key: "startDate",
						align: "center",
						render: (h, params) => {
							return h('div', [
								h('span', {
									props: {
										type: 'text',
										size: 'small'
									}
								},dateToStringByD(params.row.startDate)+' 一 '+dateToStringByD(params.row.endDate)),
						
							]);
						},
					},
					{
						title: "描述/备注",
						key: "description",
						align: "center"
					},
					{
						title: "报表性质",
						key: "features",
						align: "center",
						render: (h, params) => {
						  let features = params.row.features
						  if(features!==null){
						    let reportFeature
						    features === 0 ?  reportFeature = '在线生成' : reportFeature='定期报表'
						    const type = filter.filterAccount(features)
						    const color = type.color
						    return h('Tag', {
						      props: {
						        color: color,
						      },
						      nativeOn: {
						        click: () => {
						        }
						      }
						    },reportFeature)
						  }
						},
						// render: (h, params) => {
						// 	return h('div', [
						// 		h('span', {
						// 			props: {
						// 				type: 'text',
						// 				size: 'small'
						// 			}
						// 		}, params.row.features == 0 ? '在线生成' : '定期报表'),
						// 
						// 	]);
						// },
						filters: [{
								label: '在线生成',
								value: 0
							},
							{
								label: '定期报表',
								value: 1
							}
						],
						filterMultiple: false,
						filterMethod(value, row) {
							if (value === 0) {
								return row.features === 0
							} else if (value === 1) {
								return row.features === 1 //报表生成日期
							}
						}
					},
					{
						title: "报表生成日期",
						key: "createDate",
						align: "center",
						sortable: true
					},
					{
						title: "管理操作",
						key: "operation",
						align: "center",
						render: (h, params) => {
							return h(
								'div', [
									h(
										'imgButton', {
											props: {
												type: '修改'
											},
											nativeOn: {
												click: () => {
													this.addModal = true
													this.isadd = false
													this.title = '修改统计报表信息'
													this.resetFrom('addForm')
													this.getRange();
													this.currentId=params.row.id;
													//回显
													this.isDisabled=true;
													
													this.addForm.name=params.row.name;
													this.addForm.reportNature=params.row.timeType;
													this.addForm.features=0;
													this.addForm.tongjiDate=[params.row.startDate,params.row.endDate];
													this.addForm.date=params.row.startDate;
													
													this.addForm.content=params.row.description;
													this.addForm.type=params.row.way+'';
													this.addForm.statics=params.row.contentWord.split(',');
													let arr=[];
													params.row.meterIds.substring(1,params.row.meterIds.length-1).split(',').map(item=>{
														arr.push(item-0);
													})
													this.addForm.jlyb=arr;
													
													let arr1=[];
													params.row.rangeIds.substring(1,params.row.rangeIds.length-1).split(',').map(item=>{
														arr1.push(item-0);
													})
													this.addForm.rank=arr1;
													
													this.addForm.jlybName=params.row.meterNames.split(',');
													this.addForm.rankName=params.row.rangeNames.split(',');
													console.log(this.addForm);
													
													if(this.addForm.statics.length>0&&this.addForm.statics.length<this.checkGroup.length){
													  this.indeterminate = true
													  this.checkAll = false
													} else {
													  this.indeterminate = false
													  this.checkAll = true
													}
													if(this.addForm.jlyb.length>0&&this.addForm.jlyb.length<this.checkGroup1.length){
													  this.indeterminate1 = true
													  this.checkAll1 = false
													} else {
													  this.indeterminate1 = false
													  this.checkAll1 = true
													}
												},
											}
										}
									),
									h(
										'imgButton', {
											props: {
												type: '删除'
											},
											nativeOn: {
												click: () => {
													this.visible = true;
													this.currentId = params.row.id;
												}
											}
										}
									),
									h(
										'imgButton', {
											props: {
												type: '查看1',
												tag: '查看'
											},
											nativeOn: {
												click: () => {
													this.$router.push({
														name: 'meterReport'
													})
												}
											}
										}
									),
								]
							)
						}
					}
				],
				terminalList: []
			};
		},
		methods: {
			//下拉多选
			meterChange(value, label) {
				this.meterIds = value;
			},
			//删除
			deleteF() {
				meterApi.deleteIbsReportsById({
						id: this.currentId
					})
					.then((res) => {
						this.$Message.success('删除成功');
						this.pageChange(1);
					})
					.catch((err) => {
						this.$Message.error('删除失败');
					})
			},
			 //获取统计范围
			getRange () {
			  meterApi.searchAllBuildingArea({
			  }).then((res) => {
			    this.ranks = res
			  }).catch((err) =>{})
			},
			//统计范围change
			rankChange(value,selectedData){
				console.log(value,selectedData);
				this.addForm.rank=value;
				this.addForm.rankName=[];
				selectedData.map(item=>{
					this.addForm.rankName.push(item.label)
				})
			},
			generateReport() {
				this.addModal = true
				this.title = '报表自定义设置'
				this.isadd = true;
				this.resetFrom('addForm')
				this.getRange();
				this.isDisabled=false;
			},
			managerReport() {
				this.$router.push({
					name: 'meterTemplate'
				})
			},
			pageChange(Page) {
				this.currentPage = Page;
				meterApi.searchIbsReportsByPage({
						type:1,
						pageCurrent: this.currentPage,
						pageSize: this.pageSize,
						startDate:this.startTime,
						endDate:this.endTime,
						meterIds:this.meterIds.join(',')
					})
					.then((res) => {
						console.log(res);
						this.terminalList = res.records;
						this.dataCount = res.total;
						this.currentPage = res.current;
					})
					.catch((err) => {
						this.$Message.error('获取数据失败')
					})
			},
			alarmStartTime(startTime) {
				this.startTime = startTime;
				this.endTimeOption = {
					disabledDate(endTime) {
						return endTime && (endTime < new Date(startTime) || endTime > Date.now())
					}
				}
			},
			alarmEndTime(endTime) {
				this.endTime = endTime;
				this.startTimeOption = {
					disabledDate(startTime) {
						return startTime && (startTime > new Date(endTime) || startTime > Date.now())
					}
				}
			},
			//添加modal取消操作
			onCancel() {

			},
			
			//统计内容-----全选
			handleCheckAll() {
				if(!this.isDisabled){
					if (this.indeterminate) {
						this.checkAll = false
					} else {
						this.checkAll = !this.checkAll
					}
					this.indeterminate = false
					
					if (this.checkAll) {
						this.checkGroup.forEach(item => {
						  this.addForm.statics.push(item.value);
						  this.addForm.staticsName.push(item.value);
						})
					} else {
						this.addForm.statics = [];
						this.addForm.staticsName=[];
					}
				}
			},
			//统计内容--change事件
			checkAllGroupChange(data) {
				this.addForm.staticsName=[];
				this.addForm.staticsName = data;
				if (data.length === 10) {
					this.indeterminate = false;
					this.checkAll = true;
				} else if (data.length > 0) {
					this.indeterminate = true;
					this.checkAll = false;
				} else {
					this.indeterminate = false;
					this.checkAll = false;
				}
			},
			//计量仪表-----全选
			handleCheckAll1() {
				if(!this.isDisabled){
					if (this.indeterminate1) {
						this.checkAll1 = false
					} else {
						this.checkAll1 = !this.checkAll1
					}
					this.indeterminate1 = false
					
					if (this.checkAll1) {
						this.checkGroup1.forEach(item => {
						  this.addForm.jlyb.push(item.value);
						  this.addForm.jlybName.push(item.value);
						})
					} else {
						this.addForm.jlyb = [];
						this.addForm.jlybName=[];
					}
				}
			},
			//计量仪表 change事件
			checkJlyb(data) {
				this.addForm.jlybName=[];
				this.addForm.jlybName = data;
				if (data.length === 10) {
					this.indeterminate1 = false;
					this.checkAll1 = true;
				} else if (data.length > 0) {
					this.indeterminate1 = true;
					this.checkAll1 = false;
				} else {
					this.indeterminate1 = false;
					this.checkAll1 = false;
				}
			},
			//添加/修改提交
			submitFrom(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if(this.title=='报表自定义设置'){//添加
							meterApi.addIbsReports({
									name: this.addForm.name,
									type: 1,//报表类型 0：设备统计报表；1：仪表检测数据统计报表；2：末端设备用能统计报表
									startDate:FormatDate(this.addForm.tongjiDate[0]),
									endDate: FormatDate(this.addForm.tongjiDate[1]),
									description: this.addForm.content,
									features: 0,//报表性质：0：在线生成报表；2：定期报表
									timeType: this.addForm.reportNature-0,//定期类型：0:年度；1：季度；2：月度；3：周；4：日
									meterIds: this.addForm.jlyb.join(','),//计量仪表ids.......
									meterNames: this.addForm.jlybName.join(','),
									contentWord:this.addForm.staticsName.join(','),//统计内容数据库字段名......
									rangeIds: this.addForm.rank.join(','),//统计范围ids.........
									rangeNames: this.addForm.rankName.join(','),//统计范围names......
									way: this.addForm.type-0//统计方式：0:按设备统计；1：按建筑统计
							
								})
								.then((res) => {
									this.$Message.success('在线生成报表成功')
									this.addModal = false
									this.pageChange(1)
								})
								.catch((err) => {
									this.$Message.error('在线生成报表失败')
								})
						}else if(this.title=='修改统计报表信息'){//修改
							meterApi.updateIbsReportsById({
									id:this.currentId,
									name: this.addForm.name,
									description:this.addForm.content
								})
								.then((res) => {
									this.$Message.success('修改报表成功')
									this.addModal = false
									this.pageChange(1)
								})
								.catch((err) => {
									this.$Message.error('修改报表失败')
								})
						}
						
					}
				})

			},
			//添加/修改重置
			resetFrom(name) {
				this.$refs[name].resetFields()
				this.addForm.make = ''
				this.addForm.reportNature=''
				this.addForm.tongjiDate=[]
				this.indeterminate = false
				this.checkAll = false
				this.indeterminate1 = false
				this.checkAll1 = false
			},
		},
		created() {
			this.pageChange(1)

		},
		mounted() {
			this.alarmStartTime(this.startTime);
			this.alarmEndTime(this.endTime);
		},
		computed: {

		},
	}
</script>
<style lang='less' scoped>
	.common-table{
		height: calc(100vh - 280px);
	}
	.ivu-form-item {
		vertical-align: middle
	}

	.ivu-btn:focus {
		box-shadow: 0 0 0 2px rgba(45, 140, 240, .5)
	}

	.table {
		border-collapse: collapse;
		text-align: center;
		border-color: #ccc;
		border: 1px solid #f0f0f0;
		background: #fafafa
	}

	.padding {
		padding: 5px 10px
	}

	.inline {
		display: inline
	}

	.imgPosition {
		position: relative;
		bottom: 6px
	}

	.spanPosition {
		position: relative;
		bottom: 14px;
		left: 4px;
		font-weight: bold;
		color: #000;
		font-size: 14px
	}

	.border {
		box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.6)
	}

	.setReport {
		.ivu-form-item {
			margin:5px 10px;
		}
	}
</style>
