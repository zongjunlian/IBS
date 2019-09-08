import Vue from 'vue'
import metering from "../../../../css/metering.less";
import {
	FormatDate,
	dateToStringByD
} from "../../../../utils/validate.js";
import {
	log
} from "util";
import meteringJS from "@/api/request/metering.js";
import $ from "jquery";
export default {
	name: "metering",
	data() {
		let that = this
		return {
			areaData: [ //建筑区域
			],
			historyColumns: [{
					title: '序号',
					type: 'index',
					width: 60,
					align: 'center'
				},
				{
					title: '理论标定日期',
					key: 'conventionDate',
					align: 'center'
				},
				{
					title: '实际标定日期',
					key: 'actualDate',
					align: 'center',
					render: (h, params) => {
						if (params.row.actualDate == null) {
							return h("div", [
								h(
									"span", {}, '')
							]);
						}
						var myDate = new Date();
						var now = myDate.valueOf(); //毫秒数
						var time = new Date(params.row.actualDate).valueOf();

						if (time < now) {
							//逾期
							return h("div", [
								h("imgButton", {
									props: {
										type: "定位"
									},
									style: {
										marginRight: "5px"
									},
									on: {
										click: () => {}
									}
								}),
								h(
									"span", {
										style: {
											color: "red"
										}
									},
									params.row.actualDate
								)
							]);
						} else if (time - now <= 24 * 60 * 60 * 1000 * 7) {
							//接近标定期限 前七天
							return h(
								"span", {
									style: {
										color: "red"
									}
								},
								params.row.actualDate
							);
						} else if (time - now > 24 * 60 * 60 * 1000 * 7) {
							return h("div", [h("span", {}, params.row.actualDate)]);
						}
					}
				}
			],
			countList: {},
			pinpai: '',
			currentId: '',
			isVirtualAdd: '',
			subentry: '',
			subItemList: [],
			addCollectorId: '', //添加modal中采集器id
			meter_txt1: '', //
			meter_id1: '', //
			meterIds1: '', //
			meter_txt: '', //虚拟表--name公式
			meter_id: '', //虚拟表--id公式
			meterIds: '', //虚拟表--id逗号相隔
			meterId: '',
			visible: false,
			title: '计量仪表',
			isDel: false,
			dateArr: [{
					id: 1,
					name: '年'
				},
				{
					id: 2,
					name: '月'
				},
				{
					id: 3,
					name: '日'
				}
			],
			//树形控件
			data2: [],
			isNewBuild: false,
			isVirtual: '',
			conventionDate: '', //标定起始日期
			conventionEndDate: '', //标定结束日期
			pageSize: 10,
			dataCount: 0,
			currentPage: 1,
			xuniModal: false,
			addModal: false,
			addModalLarge: false,
			detailModal: false,
			showdetail: true,
			addTitle: "添加计量仪表",
			isElectric: true,
			dataTypes: [],
			dataUnits: [],
			buildTypes: [],
			yibiaoTypes: [],
			cycleArr: [],
			historyArr: [],
			detailInfo: {},
			type: "",
			formInline: {
				nature: "",
				name: "",
				num: "",
				pinpai1: "",
				pinpai2: "",
				czDate: '',
				buid: [],
				area: [],
				subItem: "",
				collector: "",
				dataType: "",
				dataUnit: "",
				blbhxs: "",
				xszdyz: "",
				ybbdzq: "",
				cycleType: '',
				zxbdrq: '',
			},
			formInlineLarge: {
				type: ""
			},
			ruleInline: {
				name: [{
					required: true,
					type: "string",
					message: "请输入仪表名称",
					trigger: "blur"
				}],
				num: [{
					required: true,
					type: "string",
					message: "请输入仪表编号",
					trigger: "blur"
				}],
				pinpai1: [{
					required: true,
					type: "string",
					message: "请输入仪表品牌",
					trigger: "blur"
				}],
				czDate: [{
					required: true,
					message: "请选择初装日期",
					trigger: "change",
					type: 'date',
				}],
				buid: [{
					required: true,
					type: "array",
					message: "请选择所属建筑(区域)",
					trigger: "change"
				}],
				// area: [{
				// 	required: true,
				// 	type: "array",
				// 	message: "请选择计量区域",
				// 	trigger: "change"
				// }],
				subItem: [{
					required: true,
					type: "number",
					message: "请选择计量分项",
					trigger: "change"
				}],
				dataType: [{
					required: true,
					type: "string",
					message: "请选择数据类型",
					trigger: "change"
				}],
				nature: [{
					required: true,
					type: "string",
					message: "请选择表计性质",
					trigger: "change"
				}],
				blbhxs: [{
					required: true,
					type: "number",
					message: "请输入比例变换系数：",
					trigger: "blur"
				}],
				ybbdzq: [{
					required: true,
					type: "number",
					message: "请输入仪表标定周期：",
					trigger: "blur"
				}],
				cycleType: [{
					required: true,
					type: "number",
					message: "请选择仪表标定周期：",
					trigger: "change"
				}],
			},
			columns: [{
					title: "序号",
					type: "index",
					align: "center"
				},
				{
					title: "仪表名称",
					key: "name",
					align: "center"
				},
				{
					title: "仪表编号",
					key: "code",
					align: "center"
				},
				{
					title: "所属建筑",
					key: "bname",
					align: "center"
				},
				{
					title: "计量区域",
					key: "pname",
					align: "center"
				},
				{
					title: "计量分项",
					key: "sname",
					align: "center",
				},
				{
					title: "表计性质",
					key: "isVirtual",
					align: "center",
					render: (h, params) => {
						return h('div', [
							h('span', {
								props: {
									type: 'text',
									size: 'small'
								}
							}, params.row.isVirtual == 0 ? '虚拟仪表' : '真实仪表'),

						]);
					},
					filters: [{
							label: "真实仪表",
							value: 1
						},
						{
							label: "虚拟仪表",
							value: 0
						}
					],
					filterMultiple: false,
					filterRemote: function(value, key,column) {
						that.isVirtual = value[0];
						that.changePage(1)
					}
					// filterMethod(value, row) {
					// 	this.isVirtual = value;
					// 	// this.changePage(1);
					// 	if (value == 1) {
					// 		return row.isVirtual === 1;
					// 	} else if (value == 0) {
					// 		return row.isVirtual === 0;
					// 	}
					// }
				},
				{
					title: "所属采集器",
					key: "ccode",
					align: "center",
				},
				{
					title: "最新标定日期",
					key: "conventionDate",
					align: "center",
					render: (h, params) => {
						
						if (params.row.conventionDate == null) {
							return h("div", [
								h(
									"span", {}, '')
							]);
						}
						var myDate = new Date();
						var now = myDate.valueOf(); //毫秒数
						var time = new Date(params.row.conventionDate).valueOf();
						
						if (time < now) {
							//逾期
							return h("div", [
								h("imgButton", {
									props: {
										type: "定位"
									},
									style: {
										marginRight: "5px"
									},
									on: {
										click: () => {}
									}
								}),
								h(
									"span", {
										style: {
											color: "red"
										}
									},
									params.row.conventionDate
								)
							]);
						} else if (time - now <= 24 * 60 * 60 * 1000 * 7) {
							//接近标定期限 前一天
							return h(
								"span", {
									style: {
										color: "red"
									}
								},
								params.row.conventionDate
							);
						} else if (time - now > 24 * 60 * 60 * 1000 * 7) {
							return h("div", [h("span", {}, params.row.conventionDate)]);
						}
					},
					filters: [{
							label: "标定提醒",
							value: 1
						},
						{
							label: "逾期未标定",
							value: 2
						}
					],
					filterMultiple: false,
					filterRemote: function(value, key,column) {
						if(value[0]==1){//标定提醒
							var mm = new Date(FormatDate(new Date())).valueOf() + 24 * 60 * 60 * 1000 * 7; //当前时间的毫秒数加7天的毫秒数 即距现在时间七天后的毫秒数
							that.conventionEndDate= FormatDate(new Date(mm));
							that.conventionDate =FormatDate(new Date());
							that.changePage(1);
						}else if(value[0]==2){//逾期未标定
							that.conventionDate ='';
							that.conventionEndDate=FormatDate(new Date());
							that.changePage(1);
						}else if(value.length==0){
							that.conventionDate='';
							that.conventionEndDate='';
							that.changePage(1);
						}
						
					}
				},
				{
					title: "管理操作",
					key: "111111111",
					align: "center",
					render: (h, params) => {
						return h("div", [
							h("imgButton", {
								props: {
									type: "修改"
								},
								nativeOn: {
									click: () => {
										this.getRange();//所属建筑(区域)
										this.resetBtn("formInline");
										this.addModal = true;
										this.addTitle = "修改计量仪表";
										this.meterId = params.row.id;
										this.isNewBuild = false; //隐藏新建品牌输入框
										// 回显--start
										//所属建筑(区域)回显
										meteringJS.searchBuildAreaList({
												buildAreaId: params.row.pid
											})
											.then((res) => {
												this.formInline.buid = res;
											})
											.catch((err) => {
												this.$Message.error('所属建筑(区域)回显失败')
											})

										this.formInline.name = params.row.name;
										this.formInline.num = params.row.code;
										this.formInline.dataUnit = params.row.dataUnit;
										this.formInline.blbhxs = params.row.coefficient;
										this.formInline.xszdyz = params.row.maxValue;
										this.formInline.czDate = params.row.insertDate; //初装日期

										this.formInline.pinpai1 = params.row.brand; //仪表品牌
										this.pinpai = params.row.brand;

										this.formInline.ybbdzq = params.row.conventionDateNum;
										this.formInline.cycleType = params.row.conventionDateType;
										this.formInline.zxbdrq = params.row.conventionDate; //最新标定日期	

										this.formInline.collector = params.row.ccode;

										this.buildChangeAdd(this.formInline.buid);

										this.collectors.map(item => {
											if (item.id == params.row.collectorId) {
												this.formInline.collector = item.id;
												this.addCollectorId = item.id;
											}
										})
										this.dataTypes.map(item => {
											if (item.id == params.row.dataType) {
												this.formInline.dataType = item.id;
											}
										})
										//计量分项
										this.subItemList.map(item => {
											if (item.id == params.row.subentry) {
												this.formInline.subItem = item.id;
											}
										})
										if (this.isElectric === true && params.row.isVirtual == 0) {
											this.formInline.nature = '0';
											this.isVirtualAdd = 0;
											//虚拟表树

											this.buildIdAdd = params.row.bid;
											this.searchIbsMeterTree();

											//回显 虚拟表内容
											meteringJS.searchIbsMeterVirtual({
													meterId: params.row.id
												})
												.then((res) => {
													if (res.data == null || res.data == []) {
														console.log('空');
													} else {
														this.meter_txt1 = res.data.showInfo;
														this.meter_txt = res.data.showInfo;
														this.meter_id1 = res.data.formula; //1+2-3
														this.meter_id = res.data.formula; //1+2-3
														this.meterIds = res.data.meterIds.split(','); //,1,2,3,
														this.meterIds = this.meterIds.filter(item => item != "")
														this.meterIds = this.meterIds.join(',')
														this.meterIds1 = this.meterIds

													}

												})
												.catch((err) => {
													this.$Message.error('查询当前虚拟表失败1')
												})

										} else if (params.row.isVirtual == 1) {
											this.formInline.nature = '1';
											this.isVirtualAdd = 1;
										}
										// 回显--end 
									}
								}
							}),
							h("imgButton", {
								props: {
									type: "删除"
								},
								nativeOn: {
									click: () => {
										this.visible = true;
										this.currentId = params.row.id;
									}
								}
							}),
							h("imgButton", {
								props: {
									type: "查看"
								},
								nativeOn: {
									click: () => {
										this.detailModal = true;
										this.showdetail = true;
										this.detailInfo = {};
										this.meterId = params.row.id;
										//根据主键查询当前仪表信息
										meteringJS.searchIbsMeterById({
												id: params.row.id
											})
											.then((res) => {
												this.detailInfo = res;
												//将后台返回的id转换为对应内容
												if (res.meterType === 1) {
													this.detailInfo.meterType = '电计量仪表'
												}
												if (res.meterType === 2) {
													this.detailInfo.meterType = '水计量仪表'
												}
												if (res.meterType === 3) {
													this.detailInfo.meterType = '燃气计量仪表'
												}
												if (res.meterType === 4) {
													this.detailInfo.meterType = '热计量仪表'
												}
												if (res.isVirtual === 0) {
													this.detailInfo.isVirtual = '虚拟仪表'
												}
												if (res.isVirtual === 1) {
													this.detailInfo.isVirtual = '真实仪表'
												}

												this.detailInfo.collectorId = params.row.ccode;
												this.detailInfo.buildAreaId1 = params.row.bname;
												this.detailInfo.buildAreaId = params.row.pname;
												//计量分项
												this.subItemList.map(item => {
													if (item.id == res.subentry) {
														this.detailInfo.subentry = item.title;
														return
													}
												})
												if (typeof(this.detailInfo.subentry) === 'number') {
													this.detailInfo.subentry = '';
												}
												// 仪表标定周期
												if (res.conventionDateType === 1) {
													this.detailInfo.conventionDateType = '年'
												}
												if (res.conventionDateType === 2) {
													this.detailInfo.conventionDateType = '月'
												}
												if (res.conventionDateType === 3) {
													this.detailInfo.conventionDateType = '日'
												}
												// 数据类型
												this.dataTypes.map(item => {
													if (item.id == res.dataType) {
														this.detailInfo.dataType = item.name;
													}
													return
												})
												//计量区域       
												this.areaData.map(item => {
													if (item.id == res.buildAreaId) {
														this.detailInfo.buildAreaId = item.name;
													}
													return
												})



											})
											.catch((err) => {
												this.$Message.error('查询当前仪表信息失败')
											})
									}
								}
							})
						]);
					}
				}
			],
			columns1: [{
					title: "序号",
					type: "index",
					align: "center"
				},
				{
					title: "仪表名称",
					key: "name",
					align: "center"
				},
				{
					title: "仪表编号",
					key: "code",
					align: "center"
				},
				{
					title: "所属建筑",
					key: "bname",
					align: "center"
				},
				{
					title: "计量区域",
					key: "pname",
					align: "center"
				},
				{
					title: "所属采集器",
					key: "ccode",
					align: "center",
				},
				{
					title: "最新标定日期",
					key: "conventionDate",
					align: "center",
					render: (h, params) => {
						if (params.row.conventionDate == null) {
							return h("div", [
								h(
									"span", {}, '')
							]);
						}
						var myDate = new Date();
						var now = myDate.valueOf(); //毫秒数
						var time = new Date(params.row.conventionDate).valueOf();

						if (time < now) {
							//逾期
							return h("div", [
								h("imgButton", {
									props: {
										type: "定位"
									},
									style: {
										marginRight: "5px"
									},
									on: {
										click: () => {}
									}
								}),
								h(
									"span", {
										style: {
											color: "red"
										}
									},
									params.row.conventionDate
								)
							]);
						} else if (time - now <= 24 * 60 * 60 * 1000 * 7) {
							//接近标定期限 前一天
							return h(
								"span", {
									style: {
										color: "red"
									}
								},
								params.row.conventionDate
							);
						} else if (time - now > 24 * 60 * 60 * 1000 * 7) {
							return h("div", [h("span", {}, params.row.conventionDate)]);
						}
					},
					filters: [{
							label: "标定提醒",
							value: 1
						},
						{
							label: "逾期未标定",
							value: 2
						}
					],
					filterMultiple: false,
					filterMethod(value, row) {
						if (value === 1) {
							//标定提醒
							this.conventionDate = FormatDate(new Date());
							var mm = new Date(FormatDate(new Date())).valueOf() + 24 * 60 * 60 * 1000 * 7; //当前时间的毫秒数加7天的毫秒数 即距现在时间七天后的毫秒数
							this.conventionEndDate = FormatDate(new Date(mm));

							if (
								new Date(row.conventionDate).valueOf() >
								new Date(FormatDate(new Date())).valueOf()
							) {
								return (
									new Date(row.conventionDate).valueOf() -
									new Date(FormatDate(new Date())).valueOf() <
									24 * 60 * 60 * 1000 * 7
								); //-FormatDate 将某一个中国标准时间转化成2018-05-02格式
							}
						} else if (value === 2) {
							//逾期未标定
							this.conventionEndDate = FormatDate(new Date());
							if (row.conventionDate) {
								return new Date(row.conventionDate).valueOf() < new Date().valueOf();
							}
						}
					}
				},
				{
					title: "管理操作",
					key: "111111111",
					align: "center",
					render: (h, params) => {
						return h("div", [
							h("imgButton", {
								props: {
									type: "修改"
								},
								nativeOn: {
									click: () => {

										this.resetBtn("formInline");
										this.addModal = true;
										this.addTitle = "修改计量仪表";
										this.meterId = params.row.id;
										this.isNewBuild = false; //隐藏新建品牌输入框
										// 回显--start
										//所属建筑(区域)回显
										meteringJS.searchBuildAreaList({
												buildAreaId: params.row.pid
											})
											.then((res) => {
												this.formInline.buid = res;
											})
											.catch((err) => {
												this.$Message.error('所属建筑(区域)回显失败')
											})

										this.formInline.name = params.row.name;
										this.formInline.num = params.row.code;
										this.formInline.dataUnit = params.row.dataUnit;
										this.formInline.blbhxs = params.row.coefficient;
										this.formInline.xszdyz = params.row.maxValue;
										this.formInline.czDate = params.row.insertDate; //初装日期

										this.formInline.pinpai1 = params.row.brand;
										this.pinpai = params.row.brand;

										this.formInline.ybbdzq = params.row.conventionDateNum;
										this.formInline.cycleType = params.row.conventionDateType;
										this.formInline.zxbdrq = params.row.conventionDate; //最新标定日期	

										this.formInline.collector = params.row.ccode;

										this.buildChangeAdd(this.formInline.buid);

										this.collectors.map(item => {
											if (item.id == params.row.collectorId) {
												this.formInline.collector = item.id;
												this.addCollectorId = item.id;
											}
										})
										this.dataTypes.map(item => {
											if (item.id == params.row.dataType) {
												this.formInline.dataType = item.id;
											}
										})
										//计量分项
										this.subItemList.map(item => {
											if (item.id == params.row.subentry) {
												this.formInline.subItem = item.id;
											}
										})
										if (this.isElectric === true && params.row.isVirtual == 0) {
											this.formInline.nature = '0';
											this.isVirtualAdd = 0;
											//虚拟表树

											this.buildIdAdd = params.row.bid;
											this.searchIbsMeterTree();

											//回显 虚拟表内容
											meteringJS.searchIbsMeterVirtual({
													meterId: params.row.id
												})
												.then((res) => {
													if (res.data == null || res.data == []) {
														console.log('空');
													} else {
														this.meter_txt1 = res.data.showInfo;
														this.meter_txt = res.data.showInfo;
														this.meter_id1 = res.data.formula; //1+2-3
														this.meter_id = res.data.formula; //1+2-3
														this.meterIds = res.data.meterIds.split(','); //,1,2,3,
														this.meterIds = this.meterIds.filter(item => item != "")
														this.meterIds = this.meterIds.join(',')
														this.meterIds1 = this.meterIds
													}
												})
												.catch((err) => {
													this.$Message.error('查询当前虚拟表失败1')
												})

										} else if (params.row.isVirtual == 1) {
											this.formInline.nature = '1';
											this.isVirtualAdd = 1;
										}
										// 回显--end 
									}
								}
							}),
							h("imgButton", {
								props: {
									type: "删除"
								},
								nativeOn: {
									click: () => {
										this.visible = true;
										this.currentId = params.row.id;
									}
								}
							}),
							h("imgButton", {
								props: {
									type: "查看"
								},
								nativeOn: {
									click: () => {
										this.detailModal = true;
										this.showdetail = true;
										this.detailInfo = {};
										this.meterId = params.row.id;
										//根据主键查询当前仪表信息
										meteringJS.searchIbsMeterById({
												id: params.row.id
											})
											.then((res) => {
												this.detailInfo = res;
												//将后台返回的id转换为对应内容
												if (res.meterType === 1) {
													this.detailInfo.meterType = '电计量仪表'
												}
												if (res.meterType === 2) {
													this.detailInfo.meterType = '水计量仪表'
												}
												if (res.meterType === 3) {
													this.detailInfo.meterType = '燃气计量仪表'
												}
												if (res.meterType === 4) {
													this.detailInfo.meterType = '热计量仪表'
												}
												if (res.isVirtual === 0) {
													this.detailInfo.isVirtual = '虚拟仪表'
												}
												if (res.isVirtual === 1) {
													this.detailInfo.isVirtual = '真实仪表'
												}

												this.detailInfo.collectorId = params.row.ccode;
												this.detailInfo.buildAreaId1 = params.row.bname;
												this.detailInfo.buildAreaId = params.row.pname;
												//计量分项
												this.subItemList.map(item => {
													if (item.id == res.subentry) {
														this.detailInfo.subentry = item.title;
														return
													}
												})
												if (typeof(this.detailInfo.subentry) === 'number') {
													this.detailInfo.subentry = '';
												}
												// 仪表标定周期
												if (res.conventionDateType === 1) {
													this.detailInfo.conventionDateType = '年'
												}
												if (res.conventionDateType === 2) {
													this.detailInfo.conventionDateType = '月'
												}
												if (res.conventionDateType === 3) {
													this.detailInfo.conventionDateType = '日'
												}
												// 数据类型
												this.dataTypes.map(item => {
													if (item.id == res.dataType) {
														this.detailInfo.dataType = item.name;
													}
													return
												})
												//计量区域       
												this.areaData.map(item => {
													if (item.id == res.buildAreaId) {
														this.detailInfo.buildAreaId = item.name;
													}
													return
												})
											})
											.catch((err) => {
												this.$Message.error('查询当前仪表信息失败')
											})
									}
								}
							})
						]);
					}
				}
			],
			tabs: [],
			build: "",
			buildIdAdd: '',
			collector: "",
			collectorId: '',
			meterType: "",
			collectors: [],
			meterTypes: [{
					id: 1,
					name: '电计量仪表'
				},
				{
					id: 2,
					name: '水计量仪表'
				},
				{
					id: 3,
					name: '燃气计量仪表'
				},
				{
					id: 4,
					name: '热计量仪表'
				}
			],
			meterData: []
		};
	},
	created() {
		this.changeTab(0);
		this.searchIbsMeterType1();
		this.searchCollectorList(); //查询采集器编号
		this.searchIbsSubentry(); //分项
		this.getSearchBrandList(); //获取仪表品牌列表
		this.searchBuildingList(); //获取建筑列表
	},
	mounted() {
		this.tabs = [{
				icon: "ios-flash",
				label: "电计量仪表",
				data: this.columns
			},
			{
				icon: "ios-water",
				label: "水计量仪表",
				data: this.columns1
			},
			{
				icon: "ios-flame",
				label: "燃气计量仪表",
				data: this.columns1
			},
			{
				icon: "ios-thermometer",
				label: "热计量仪表",
				data: this.columns1
			}
		]


	},
	computed: {
		currentDate() {
			return dateToStringByD(new Date())
		},
		getDataUnit() {
			return this.formInline.dataUnit;
		}
	},
	methods: {
		//获取统计范围
		getRange () {
		  meteringJS.searchAllBuildingArea({
		  }).then((res) => {
		    this.buildTypes = res
			console.log('this.buildTypes',this.buildTypes);
		  }).catch((err) =>{
			  this.$Message.error('获取统计范围失败');
		  })
		},
		//虚拟仪表点击事件
		virtualClick() {
			if (this.formInline.buid) {
				this.xuniModal = true;
				this.data2 = [];
				this.searchIbsMeterTree(); //获取虚拟仪表列表
			}
		},
		//表计性质 Change
		natureChange(data) {
			if (data === '0') { //虚拟仪表
				this.isVirtualAdd = 0;
				if (this.formInline.buid === '' || this.formInline.buid === undefined) {
					this.$Message.info('请选择所属建筑');
				} else {
					this.xuniModal = true;
					this.data2 = [];
					this.searchIbsMeterTree(); //获取虚拟仪表列表
				}

			} else if (data === '1') {
				this.isVirtualAdd = 1
			}
		},
		areaChange(value, selectedData) {
			console.log(value)
		},
		//数量
		searchIbsMeterCount() {
			meteringJS.searchIbsMeterCount({
					meterType: this.type,
					buildId: this.build,
					collectorId: this.collector
				})
				.then((res) => {
					this.countList = res;
				})
				.catch((err) => {
					this.$Message.error('获取虚拟仪表树失败')
				})
		},
		//虚拟仪表modal点击确定
		confirmMeter() {
			this.xuniModal = false;
			if (this.addTitle == '添加计量仪表') { //添加
				if (this.meter_txt.charAt(this.meter_txt.length - 1) === '+' || this.meter_txt.charAt(this.meter_txt.length - 1) ===
					'-') { //判断最后一位是否有多余的+ -
					this.meter_txt = this.meter_txt.substring(0, this.meter_txt.length - 1);
					this.meter_id = this.meter_id.substring(0, this.meter_id.length - 1);
				}

			} else if (this.addModal == '修改计量仪表') { //修改

			}
		},
		//虚拟仪表modal点击取消
		cancelMeter() {
			this.xuniModal = false;
			if (this.addTitle == '添加计量仪表') { //添加
				this.meter_txt = '';
				this.meter_id = '';
				this.meterIds = '';
			} else if (this.addTitle == '修改计量仪表') { //修改
				this.meter_txt = this.meter_txt1;
				this.meter_id = this.meter_id1;
				this.meterIds = this.meterIds1;
			}
		},
		getTree(tree = []) {
			let arr = [];
			if (!!tree && tree.length !== 0) {
				tree.forEach(item => {
					let obj = {};
					obj.title = item.name;
					obj.id = item.id; // 其他你想要添加的属性
					obj.expand = true;
					obj.selected = false;
					if (item.ibsCollector && item.ibsCollector.length !== 0) {
						obj.children = this.getTree(item.ibsCollector); // 递归调用
					}
					if (item.ibsMeter && item.ibsMeter.length !== 0) {
						obj.children = this.getTree(item.ibsMeter); // 递归调用
					}
					arr.push(obj);
					console.log('obj',obj);
				});
			}
			this.data2 = arr;
			console.log('arr',arr);
			return arr;

		},
		//虚拟仪表
		searchIbsMeterTree() {
			meteringJS.searchIbsMeterTree({
					buildId: this.buildIdAdd
				})
				.then((res) => {
					if (res.length != 0) {
						this.getTree(res);
					} else if (res.length == 0) {
						console.log('数据为空');
					}

				})
				.catch((err) => {
					this.$Message.error('获取虚拟仪表树失败')
				})
		},
		showTimePanel(refName) {
			// 此处的onSelectionModeChange方法，就是同点击 选择时间 按钮后触发的方法
			this.$refs[refName].onSelectionModeChange('time');
		},
		showTimePanel1(refName) {
			this.$refs[refName].onSelectionModeChange('time');
		},
		//删除
		deleteF() {
			meteringJS.removeIbsMeter({
					id: this.currentId
				})
				.then((res) => {
					this.$Message.success('删除成功');
					this.changePage(1);
				})
				.catch((err) => {
					this.$Message.error({
						content: err.description,
						duration: 5
					});
				})
		},
		subItemChange(data) {
			this.subentry = data;
		},
		//分项查询（根据code条件）
		searchIbsSubentry() {
			meteringJS.searchIbsSubentry({
					code: '01000'
				})
				.then((res) => {
					this.subItemList = res[0].children;
				})
				.catch((err) => {
					this.$Message.error('获取分项失败')
				})
		},
		//添加modal中采集器change事件
		addChangeCollector(data) {
			this.addCollectorId = data;
		},
		//查询采集器编号
		searchCollectorList() {
			meteringJS.searchCollectorList({})
				.then((res) => {
					this.collectors = res;
				})
				.catch((err) => {
					this.$Message.error('分页查询仪表信息失败')
				})
		},
		//分页查询仪表信息
		changePage(page) {
			this.currentPage = page;
			meteringJS.searchIbsMeterListByPage({
					meterType: this.type, //仪表类型：1：电计量仪表；2：水计量仪表；3：燃气计量仪表；4：热计量仪表
					pageCurrent: this.currentPage,
					pageSize: this.pageSize,
					collectorId: this.collectorId, //所属采集器
					isVirtual: this.isVirtual, //是否是虚拟表  0：是；1：不是
					conventionDate: this.conventionDate, //标定起始日期
					conventionEndDate: this.conventionEndDate, //标定结束日期
					buildId: this.build, //建筑id
					//subentry: this.subentry //按分项查询(暂不用)
				})
				.then((res) => {
					this.meterData = res.records;
					this.dataCount = res.total
				})
				.catch((err) => {
					this.$Message.error('分页查询仪表信息失败')
				})
		},
		add() {
			if (this.meter_txt != '') {
				if (this.meter_txt.charAt(this.meter_txt.length - 1) != '+' && this.meter_txt.charAt(this.meter_txt.length - 1) !=
					'-') {
					this.meter_txt = this.meter_txt + '+';
					this.meter_id = this.meter_id + '+';
				}
			}
		},
		reduce() {
			if (this.meter_txt != '') {
				if (this.meter_txt.charAt(this.meter_txt.length - 1) != '+' && this.meter_txt.charAt(this.meter_txt.length - 1) !=
					'-') {
					this.meter_txt = this.meter_txt + '-';
					this.meter_id = this.meter_id + '-';

				}
			}
		},
		deleteMeter() {
			this.meter_txt = '';
			this.meter_id = '';
			this.meterIds = '';
		},
		choice() {
			//console.log("tree.data", this.$refs.tree.data);
			if (this.$refs.tree.getSelectedNodes().length != 0 && !this.$refs.tree.getSelectedNodes()[0].hasOwnProperty(
					"children")) {
				if (this.meter_txt === '') {
					this.meter_txt = this.meter_txt + this.$refs.tree.getSelectedNodes()[0].title;
					this.meter_id = this.meter_id + this.$refs.tree.getSelectedNodes()[0].id;
					this.meterIds = this.meterIds + this.$refs.tree.getSelectedNodes()[0].id;
				} else if (this.meter_txt != '') {
					if (this.meter_txt.charAt(this.meter_txt.length - 1) === '+' || this.meter_txt.charAt(this.meter_txt.length - 1) ===
						'-') {
						this.meter_txt = this.meter_txt + this.$refs.tree.getSelectedNodes()[0].title;
						this.meter_id = this.meter_id + this.$refs.tree.getSelectedNodes()[0].id;
						this.meterIds = this.meterIds + ',' + this.$refs.tree.getSelectedNodes()[0].id;
					}
				}
			}
		},

		//数据类型点击事件
		selectDataType(date) {
			for (var i = 0; i < this.dataUnits.length; i++) {
				if (this.dataUnits[i].id === date) {
					this.formInline.dataUnit = this.dataUnits[i].unit;
				}
			}
		},
		//数据类型change事件
		getDataType(date) {
			for (var i = 0; i < this.dataUnits.length; i++) {
				if (this.dataUnits[i].id === date) {
					this.formInline.dataUnit = this.dataUnits[i].unit;
				}
			}
		},
		//添加modal--建筑列表change事件
		buildChangeAdd(value,selectedData) {
			//根据建筑id获取建筑区域列表
			// this.areaData = [];
			// this.formInline.area = [];
			// this.buildIdAdd = date;
			// if (date != undefined) {
			// 	meteringJS.searchBuildingAreaList({
			// 			buildingId: date
			// 		})
			// 		.then((res) => {
			// 			this.areaData = res;
			// 			this.data2 = [];
			// 			this.searchIbsMeterTree(); //获取虚拟仪表列表
			// 		})
			// 		.catch((err) => {
			// 			this.$Message.error('根据建筑id获取建筑区域列表失败')
			// 		})
			// }
		},
		//获取建筑列表
		searchBuildingList() {
			meteringJS.searchBuildingList({})
				.then((res) => {
					this.buildTypes = res;
				})
				.catch((err) => {
					this.$Message.error('获取建筑列表失败')
				})
		},
		//仪表品牌change事件
		pinpaiChange(date) {
			if (date === '新建') {
				this.isNewBuild = true;
				this.formInline.pinpai2 = '';
			} else {
				this.isNewBuild = false;
			}
		},
		//获取仪表品牌列表
		getSearchBrandList() {
			this.cycleArr = [];
			meteringJS.searchBrandList({
					meterType: this.type
				})
				.then((res) => {
					if (res != null) {
						this.cycleArr = res;
					}
					this.cycleArr.unshift({
						"id": null,
						"name": null,
						"code": null,
						"collectorId": null,
						"parent": null,
						"meterType": null,
						"description": null,
						"dataType": null,
						"dataUnit": null,
						"subentry": null,
						"coefficient": null,
						"maxValue": null,
						"state": null,
						"insertDate": null,
						"isVirtual": null,
						"brand": "新建",
						"conventionDateNum": null,
						"conventionDateType": null,
						"conventionDate": null
					})
				})
				.catch((err) => {
					this.$Message.error('获取仪表品牌列表失败')
				})
		},

		//查询当前仪表类型
		searchIbsMeterType1(parentId) {
			meteringJS.searchIbsMeterType({})
				.then((res) => {
					this.yibiaoTypes = res;
				})
				.catch((err) => {
					this.$Message.error('查询当前仪表类型失败')
				})
		},
		//查询当前仪表类型下的数据类型
		searchIbsMeterType(parentId) {
			meteringJS.searchIbsMeterType({
					parentId: parentId
				})
				.then((res) => {
					this.dataTypes = [];
					for (var i = 0; i < res.length; i++) {
						var obj = {};
						var obj1 = {};
						obj.id = res[i].id + '';
						obj.name = res[i].name;

						obj1.id = res[i].id + '';
						obj1.unit = res[i].unit;
						this.dataTypes.push(obj);
						this.dataUnits.push(obj1);
					}
				})
				.catch((err) => {
					this.$Message.error('查询当前仪表类型失败')
				})
		},
		//添加计量仪表--提交
		submitBtn(name) {
			this.formInline.czDate = new Date(this.formInline.czDate)
			this.$refs[name].validate(valid => {
				if (valid) {
					if (this.addTitle == "添加计量仪表") { //添加modal--提交
						if (this.formInline.pinpai1 === '新建') {
							this.pinpai = this.formInline.pinpai2

						} else {
							this.pinpai = this.formInline.pinpai1
						}
						if (this.formInline.czDate) { //初装日期
							this.formInline.czDate = FormatDate(this.formInline.czDate)
						} else {
							this.formInline.czDate = ''
						}
						if (this.formInline.zxbdrq) { //标定时间
							this.formInline.zxbdrq = FormatDate(this.formInline.zxbdrq)
						} else {
							this.formInline.zxbdrq = ''
						}
						if (this.isElectric === true && this.isVirtualAdd == 0) { //虚拟表
							if (this.meterIds == '') {
								this.$Message.info('请选择虚拟电表参数')
								return
							}
						}
						if (this.isElectric === false) {
							this.isVirtualAdd = '';
						}
						meteringJS.addIbsMeter({
								name: this.formInline.name, //仪表名称
								code: this.formInline.num, //仪表编码
								collectorId: this.addCollectorId, //采集器id
								meterType: this.type,
								dataType: this.formInline.dataType, //数据类型
								dataUnit: this.formInline.dataUnit,
								subentry: this.formInline.subItem, //分项id
								coefficient: this.formInline.blbhxs, //比例变换系数
								maxValue: this.formInline.xszdyz, //最大阈值
								insertDate: this.formInline.czDate, //初装日期
								isVirtual: this.isVirtualAdd,
								brand: this.pinpai, //仪表品牌
								conventionDateNum: this.formInline.ybbdzq, //仪表标定周期 第一个输入框
								conventionDateType: this.formInline.cycleType, //仪表标定周期  计数类型  1：年  2：月  3：日
								conventionDate: this.formInline.zxbdrq, //标定时间
								buildAreaId: this.formInline.buid[this.formInline.buid.length - 1], //建筑区域id
								formula: this.meter_id, //如果是虚拟表，此项不可为空 id公式  12+13+14
								showInfo: this.meter_txt, //如果是虚拟表，此项不可为空 name公式   仪表005+测试仪表1+测试仪表1
								meterIds: this.meterIds //如果是虚拟表，此项不可为空  id字符串  12,13,14

							})
							.then((res) => {
								this.$Message.success('添加计量仪表成功');
								this.addModal = false;
								this.changePage(1);
								this.getSearchBrandList(); //仪表品牌列表
								this.isNewBuild = false; //隐藏新建品牌输入框
								this.formInline.pinpai2 = '';
							})
							.catch((err) => {
								this.$Message.error('添加计量仪表失败')
							})
					} else if (this.addTitle == "修改计量仪表") { //修改modal--提交
						if (this.formInline.pinpai1 === '新建') {
							this.pinpai = this.formInline.pinpai2
						} else {
							this.pinpai = this.formInline.pinpai1
						}
						if (this.formInline.czDate) { //初装日期
							this.formInline.czDate = FormatDate(this.formInline.czDate)
						} else {
							this.formInline.czDate = ''
						}
						if (this.formInline.zxbdrq) { //标定时间
							this.formInline.zxbdrq = FormatDate(this.formInline.zxbdrq)
						} else {
							this.formInline.zxbdrq = ''
						}
						if (this.isElectric === true && this.isVirtualAdd == 0) { //虚拟表=虚拟仪表
							if (this.meterIds == '') {
								this.$Message.info('请选择虚拟电表参数')
								return
							}
						}
						if (this.isElectric === true && this.isVirtualAdd == 1) { //虚拟表=真实仪表
							this.meter_id = '';
							this.meter_txt = '';
							this.meterIds = '';
						}
						meteringJS.updateIbsMeter({
								id: this.meterId,
								name: this.formInline.name, //仪表名称
								code: this.formInline.num, //仪表编码
								collectorId: this.addCollectorId, //采集器id
								meterType: this.type,
								dataType: this.formInline.dataType, //数据类型
								dataUnit: this.formInline.dataUnit,
								subentry: this.formInline.subItem, //分项id
								coefficient: this.formInline.blbhxs, //比例变换系数
								maxValue: this.formInline.xszdyz, //最大阈值
								insertDate: this.formInline.czDate, //初装日期
								isVirtual: this.isVirtualAdd,
								brand: this.pinpai, //仪表品牌
								conventionDateNum: this.formInline.ybbdzq, //仪表标定周期 第一个输入框
								conventionDateType: this.formInline.cycleType, //仪表标定周期  计数类型  1：年  2：月  3：日
								conventionDate: this.formInline.zxbdrq, //标定时间
								buildAreaId: this.formInline.buid[this.formInline.buid.length - 1], //建筑区域id
								formula: this.meter_id, //如果是虚拟表，此项不可为空 id公式  12+13+14
								showInfo: this.meter_txt, //如果是虚拟表，此项不可为空 name公式   仪表005+测试仪表1+测试仪表1
								meterIds: this.meterIds //如果是虚拟表，此项不可为空  id字符串  12,13,14
							})
							.then((res) => {
								this.$Message.success('修改计量仪表成功');
								this.addModal = false;
								this.changePage(1);
								this.getSearchBrandList(); //仪表品牌列表
								this.isNewBuild = false; //隐藏新建品牌输入框
								this.formInline.pinpai2 = '';
							})
							.catch((err) => {
								this.$Message.error('修改计量仪表失败')
							})
					}
				} else {
					//this.$Message.error('校验失败');
				}
			});
		},
		//添加计量仪表--重置
		resetBtn(name) {
			this.$refs[name].resetFields();
		},
		//批量添加计量仪表--提交
		submitBtnLarge(name) {
			this.$refs[name].validate(valid => {
				if (valid) {

				}
			});
		},
		//批量添加计量仪表--重置
		resetBtnLarge(name) {
			this.$refs[name].resetFields();
		},
		//添加计量仪表
		addMeter() {
			this.resetBtn("formInline");
			this.addModal = true;
			this.addTitle = "添加计量仪表";
			this.isNewBuild = false; //隐藏新建品牌输入框

			this.meter_id = '';
			this.meter_txt = '';
			this.meterIds = '';
			this.getRange();
		},
		//批量添加计量仪表
		addMeterBatch() {
			this.addModalLarge = true;
		},
		//历史标定记录-点击事件
		historyRecord() {
			this.showdetail = false;
			meteringJS.searchIbsMeterConventionHistory({
					meterId: this.meterId
				})
				.then((res) => {
					this.historyArr = res;
				})
				.catch((err) => {
					this.$Message.error('查询当前仪表标定时间历史纪录失败')
				})
		},
		//选择建筑
		changeBuild(data) {},
		//选择采集器
		changeCollector(data) {
			this.collectorId = data;
		},
		//选择仪表类型
		changeMeterType() {},
		//查询
		searchBtn() {
			this.changePage(1);
			this.searchIbsMeterCount();
		},
		//Tab切换
		changeTab(data) {
			switch (data) {
				case 0: //电
					this.type = 1;
					this.isElectric = true;
					this.searchIbsMeterType(1);
					this.changePage(1);
					this.searchIbsMeterCount();
					break;
				case 1: //水
					this.type = 2;
					this.isElectric = false;
					this.searchIbsMeterType(2);
					this.changePage(1);
					this.searchIbsMeterCount();
					break;
				case 2: //燃气
					this.type = 3;
					this.isElectric = false;
					this.searchIbsMeterType(3);
					this.changePage(1);
					this.searchIbsMeterCount();
					break;
				case 3: //热
					this.type = 4;
					this.isElectric = false;
					this.searchIbsMeterType(4);
					this.changePage(1);
					this.searchIbsMeterCount();
					break;
			}
		}
	}
}
