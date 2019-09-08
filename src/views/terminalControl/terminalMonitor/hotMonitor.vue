<template>
	<div style="position: relative;" class="hotMonitor">
		<div style="position: absolute;right: 0;top:0px;z-index: 2;">
			<Select v-model="model1" style="width:100px" class="mr20">
				<Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="请选择日期" style="width: 200px" class="mr20"></DatePicker>
			<imgButton type="按钮" name="查询" @click.native='searchBtn' class="mr20"></imgButton>
			<imgButton v-if='isBuild || isPlate' type="高级筛选" name="高级筛选" @click.native='search()'></imgButton>
		</div>
		<Tabs type="card" @on-click="changeTab" style='position: relative;'>
			<TabPane v-for="tab in tabs" :key="tab.key" :label="tab.label">
				<div class="line"></div>
				<div class="highSearch" v-show="highSearch" style='margin-top:10px;padding:20px'>
					<Row v-show="isBuildSearch">
						<Col span="8">
						<Transfer :data="data2" :target-keys="targetKeys2" filterable :filter-method="filterMethod" @on-change="handleChange2"></Transfer>
						</Col>
						<Col span="4" style="margin-top: 180px;">
						<imgButton type="提交" name="提交" @click.native="submitSearchBtn('formInline')"></imgButton>
						<imgButton type="重置" name="重置" class='ml10' @click.native="resetBtn('formInline')"></imgButton>
						</Col>
					</Row>
					<Row v-show="isPlateSearch">
						<Col span="22">
						<span>建筑名称:</span>
						<Select v-model="buildName" style="width:200px">
							<Option v-for="item in buildList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
						<span class="ml20">建筑区域:</span>
						<Select v-model="buildArea" style="width:200px">
							<Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
						<span class="ml20">账户名称:</span>
						<Input v-model="account" placeholder="请输入账户名称" style="width: 200px" />
						</Col>
						<Col span="1">
						<imgButton type="提交" name="提交" @click.native="submitSearchBtn2('formInline')"></imgButton>
						</Col>
						<Col span="1">
						<imgButton type="重置" name="重置" @click.native="resetBtn2('formInline')"></imgButton>
						</Col>
					</Row>
				</div>
				<Row class="statistics" v-show='isAllCount'>
					<Col span="5" v-for="item in staticData">
					<p class="fz12 cBlack fw700">{{item.title}}</p>
					<ul>
						<li>
							<span class="cBlue fz18 fw700">{{item.num}}</span>
							<span>{{item.unit}}</span>
						</li>
						<li>
							<span style="display: inline-block;width:90px;">环比:</span>
							<span>
								<img :src="item.url" alt="" width="10px">
								{{item.chain}}
							</span>
						</li>
						<li>
							<span style="display: inline-block;width:90px;">2018同比:</span>
							<span><img :src="item.url" alt="" width="10px">{{item.year}}</span>
						</li>
					</ul>
					</Col>
					<Col span="9">
					<p class="fz12 cBlack fw700">{{'累计运行时间'}}</p>
					<Row class="mt20">
						<Col span="8" v-for="item in runTimeData">
						<img :src="item.url" alt="" width="20px">
						<span class="fz18  fw700">{{item.count}}</span>
						<span>h</span>
						</Col>
					</Row>
					</Col>
				</Row>
				<div class="bgWhite mt10 mb10" style="padding: 20px 0;">
					<p v-show='isAllCount' class="fr mr20">
						<span class="fl mr10 fw700" style="line-height: 32px;">数据单位:</span>
						<Select v-model="model2" style="width:140px" class="fl">
							<Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</p>
					<!-- 总用量监测 -->
					<div class='mt30 echartsBox' v-show='isAllCount'>
						<MyCharts :legend='legend' :data='xdata' :yAxis='yAxis' :series='series' type="lineBarOption" :size="{width:'100%', height: '100%'}"></MyCharts>
					</div>
					<!-- 按建筑(区域)监测 ......-->
					<Row v-if='isBuild'>
						<Col span="12" class='echartsBox'>
							<MyCharts  :yAxis='widthyAxis1' :series='widthSeries1' type="widthBarOption" :size="{width:'100%', height: '100%'}"></MyCharts>
						</Col>
						<Col span="12"class='echartsBox'>
							<MyCharts  :yAxis='widthyAxis2' :series='widthSeries2' type="widthBarOption" :size="{width:'100%', height: '100%'}"></MyCharts>
						</Col>
					</Row>
					<!-- 按板换侧监测 -->
					<div v-if='isUser'class='echartsBox'>
						<MyCharts :legend='lineLegend1' :data='xdata1' :series='lineSeries1' :yAxis='yAxis1' type="lineOption" :size="{width:'100%', height: '100%'}"></MyCharts>
					</div>
					<!-- 按用户监测 .........-->
					<Row v-if='isPlate'>
						<Col span="12"class='echartsBox'>
							<MyCharts  :yAxis='widthyAxis3' :series='widthSeries3' type="widthBarOption" :size="{width:'100%', height: '100%'}"></MyCharts>
						</Col>
						<Col span="12"class='echartsBox'>
							<MyCharts :yAxis='widthyAxis4' :series='widthSeries4' type="widthBarOption" :size="{width:'100%', height: '100%'}"></MyCharts>
						</Col>
					</Row>
				</div>
				<Table :columns="tab.data" class="normal-table" :data="tab.hotData" no-data-text="暂无数据" style="marginTop:0" border></Table>
				<Row class="page-bottom">
					<Col span="12" class="page-text">当前显示<span class="pageColor">{{tab.hotData.length}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
					<Col span="8" :offset="4">
					<Page :total="dataCount" :page-size="pageSize" @on-change="changePage" show-elevator :current="currentPage" class="common-page-style" />
					</Col>
				</Row>
			</TabPane>
		</Tabs>
	</div>
</template>
<script>
	import userImg from '@/assets/images/user.png'
	import { FormatDate, dateToStringByD, copyArray} from '@/api/util.js'
	export default {
		name: 'hotMonitor',
		data() {
			return {
				isBuildSearch: false,
				isPlateSearch: false,
				buildName: '',
				buildArea: '',
				account: '',
				//穿梭框
				data2: this.getMockData(),
				targetKeys2: this.getTargetKeys(),

				highSearch: false,
				buildList: [],
				areaList: [],
				dateList: [{
						value: '1',
						label: '逐日'
					},
					{
						value: '2',
						label: '逐月'
					},
					{
						value: '3',
						label: '逐年'
					},
				],
				dataList: [{
						value: '1',
						label: '能耗（kWh'
					},
					{
						value: '2',
						label: '能耗密度（kWh/m2）'
					},
					{
						value: '3',
						label: '费用（元'
					},
				],
				model1: '',
				model2: '',
				tabs: [],
				isAllCount: true,
				isBuild: false,
				isUser: false,
				isPlate: false,
				pageSize: 5,
				dataCount: 0,
				currentPage: 1,
				columns1: [{
						title: "序号",
						type: "index",
						align: "center"
					},
					{
						title: "日期",
						key: "name",
						align: "center"
					},
					{
						title: "总用热量(kWh)",
						key: "code",
						align: "center"
					},
					{
						title: "单位平米能耗(kWh/㎡)",
						key: "bname",
						align: "center"
					},
					{
						title: "费用(元)",
						key: "pname",
						align: "center"
					},
					{
						title: "计量分项",
						key: "sname",
						align: "center",
					},
					{
						title: "累计运行时间(h)",
						key: "sname",
						align: "center",
						children: [{
								title: "高速",
								key: "sname",
								align: "center",
							},
							{
								title: "中速",
								key: "sname",
								align: "center",
							},
							{
								title: "低速",
								key: "sname",
								align: "center",
							},
						]
					},

				],
				columns2: [{
						title: "序号",
						type: "index",
						align: "center"
					},
					{
						title: "建筑名称",
						key: "name",
						align: "center"
					},
					{
						title: "总用热量(kWh)",
						key: "code",
						align: "center"
					},
					{
						title: "单位平米能耗(kWh/㎡)",
						key: "bname",
						align: "center"
					},
					{
						title: "费用(元)",
						key: "pname",
						align: "center"
					},
					{
						title: "计量分项",
						key: "sname",
						align: "center",
					},
					{
						title: "累计运行时间(h)",
						key: "sname",
						align: "center",
						children: [{
								title: "高速",
								key: "sname",
								align: "center",
							},
							{
								title: "中速",
								key: "sname",
								align: "center",
							},
							{
								title: "低速",
								key: "sname",
								align: "center",
							},
						]
					},

				],
				columns3: [{
						title: "序号",
						type: "index",
						align: "center"
					},
					{
						title: "板换设备名称",
						key: "name",
						align: "center"
					},
					{
						title: "设备编号",
						key: "code",
						align: "center"
					},
					{
						title: "关联建筑数量",
						key: "bname",
						align: "center"
					},
					{
						title: "总用热量",
						key: "pname",
						align: "center"
					},
					{
						title: "单位平米能耗(kWh/㎡)",
						key: "sname",
						align: "center",
					},
					{
						title: "费用(元)",
						key: "sname",
						align: "center",
					},

				],
				columns4: [{
						title: "序号",
						type: "index",
						align: "center"
					},
					{
						title: "末端用户名称",
						key: "name",
						align: "center",
						render: (h, params) => {
							return h('span', {
								style: {
									color: 'red',
								},
								nativeOn: {
									click: () => {}
								}
							}, params.row.name)
						}
					},
					{
						title: "所属建筑及建筑区域",
						key: "code",
						align: "center"
					},
					{
						title: "末端设备数量",
						key: "bname",
						align: "center"
					},
					{
						title: "总用热量(kWh)",
						key: "pname",
						align: "center"
					},
					{
						title: "单位平米能耗(kWh/㎡)",
						key: "sname",
						align: "center",
					},
					{
						title: "费用(元)",
						key: "feiyong",
						align: "center",
					},
					{
						title: "累计运行时间(h)",
						key: "sname",
						align: "center",
						children: [{
								title: "高速",
								key: "sname",
								align: "center",
							},
							{
								title: "中速",
								key: "sname",
								align: "center",
							},
							{
								title: "低速",
								key: "sname",
								align: "center",
							},
						]
					},

				],
				tableData1:[],
				tableData2:[],
				tableData3:[],
				tableData4:[],
				staticData: [{
						title: '总用热量',
						num: '98875.06',
						unit: 'kWh',
						chain: '1.2%',
						year: '1.2%',
						url: userImg
					},
					{
						title: '单位平米能耗',
						num: '98875.06',
						unit: 'kWh/㎡',
						chain: '1.2%',
						year: '1.2%',
						url: userImg
					},
					{
						title: '费用',
						num: '98875.06',
						unit: '元',
						chain: '1.2%',
						year: '1.2%',
						url: userImg
					}
				],
				runTimeData: [{
						count: 12312,
						url: userImg
					},
					{
						count: 1414,
						url: userImg
					},
					{
						count: 52525,
						url: userImg
					}
				],
				legend: ['用热量', '环比用热量', '2018年同期用热量', '平均温度'],
				xdata: ["2019-07-01","2019-07-03","2019-07-05","2019-07-07","2019-07-09","2019-07-11","2019-07-13","2019-07-15","2019-07-17","2019-07-19","2019-07-21","2019-07-23","2019-07-25","2019-07-27","2019-07-29","2019-08-01"],
				xdata1:[],
				yAxis: [{
						type: 'value',
						name: '电量(kWh)',
						 nameTextStyle: {
							color: '#5897c0',
						}
					},
					{
						type: 'value',
						name: '平均气温(℃)',
						nameTextStyle: {
							color: '#5897c0',
						}
					},
				],
				yAxis1: [],
				series: [{
						name: '用热量',
						type: 'bar',
						color: '#FF8051',
						data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,162.2, 32.6, 20.0, 6.4]
					},
					{
						name: '环比用热量',
						type: 'line',
						color: '#a6c8db',
						yAxisIndex: 1,
						data: [1.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,23.0, 16.5, 12.0, 6.2]
					},
					{
						name: '2018年同期用热量',
						type: 'line',
						color: '#880b8b',
						yAxisIndex: 1,
						data: [1.0, 1.2, 2.3, 3.5, 5.3, 9.2, 10.3, 20.4, 23.0, 17.5, 13.0, 7.2,20.4, 23.0, 17.5, 13.0, 7.2]
					},
					{
						name: '平均温度',
						type: 'line',
						color: '#a6c8db',
						yAxisIndex: 1,
						data: [1.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,23.0, 16.5, 12.0, 6.2]
					}
				],
				//按建筑(区域)监测 --图表
				widthyAxis1: ['南区19号楼', '二期3-05号楼', '二期10-08号楼', '北区健身房', '总和购物中心'],
				widthSeries1: [{
					type: 'bar',
					data: [18203, 23489, 29034, 104970, 131744]
				}],
				widthyAxis2: [],
				widthSeries2: [],
				widthyAxis3: [],
				widthSeries3: [],
				widthyAxis4: [],
				widthSeries4: [],
				//按板换侧监测--图表
				lineLegend1: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
				lineSeries1: [{
						name: '邮件营销',
						type: 'line',
						stack: '总量',
						smooth: true,
						symbol: 'circle',
						symbolSize: 5,
						data: [120000, 132000, 101000, 134000, 90000, 230000, 210000, 222000, 120000, 132000, 101000, 134000, 90000,
							230000, 90000, 110000
						]
					},
					{
						name: '联盟广告',
						type: 'line',
						stack: '总量',
						symbolSize: 5,
						data: [120000, 132000, 101000, 134000, 90000, 134000, 90000, 230000, 90000, 110000, 101000, 134000, 90000,
							230000, 90000, 220000
						]
					},
					{
						name: '视频广告',
						type: 'line',
						stack: '总量',
						smooth: true,
						symbol: 'Rect',
						symbolSize: 5,
						data: [120000, 132000, 101000, 134000, 90000, 230000, 210000, 222000, 120000, 132000, 101000, 120000, 132000,
							101000, 134000, 330000
						]
					},
					{
						name: '直接访问',
						type: 'line',
						stack: '总量',
						symbol: 'diamond',
						symbolSize: 5,
						data: [230000, 90000, 550000, 134000, 330000, 230000, 210000, 222000, 120000, 132000, 101000, 134000, 90000,
							230000, 90000, 440000
						]
					},
					{
						name: '搜索引擎',
						type: 'line',
						stack: '总量',
						smooth: true,
						symbol: 'triangle',
						symbolSize: 5,
						data: [120000, 132000, 101000, 134000, 134000, 330000, 210000, 222000, 120000, 132000, 101000, 134000, 90000,
							230000, 90000, 550000
						]
					},
					{
						name: "平均气温",
						type: "line",
						yAxisIndex: 1,
						symbol: "circle",
						symbolSize: 5,
						data: [1, 1, 3, 4, 2, 2, 2, 3, 1, 3, 2, 1, 3, 2, 2, 5]
					}
				],
			}

		},
		methods: {
			searchBtn() {
				this.changePage(1);
			},
			search() {
				this.highSearch = !this.highSearch;
				if (this.isBuild == true) {
					this.isPlateSearch = false;
					this.isBuildSearch = true;
				} else if (this.isPlate == true) {
					this.isPlateSearch = true;
					this.isBuildSearch = false;
				}
			},
			getMockData() {
				let mockData = [];
				for (let i = 1; i <= 20; i++) {
					mockData.push({
						key: i.toString(),
						label: 'Content ' + i,
						description: 'The desc of content  ' + i,
						disabled: Math.random() * 3 < 1
					});
				}
				return mockData;
			},
			getTargetKeys() {
				return this.getMockData()
					.filter(() => Math.random() * 2 > 1)
					.map(item => item.key);
			},
			handleChange2(newTargetKeys) {
				this.targetKeys2 = newTargetKeys;
			},
			filterMethod(data, query) {
				return data.label.indexOf(query) > -1;
			},
			//高级筛选--确定
			submitSearchBtn() {
				this.isBuild = false;
				this.isUser = true;
			},
			submitSearchBtn2() {
				this.isUser = true;
				this.isPlate = false;
			},
			//高级筛选--重置
			resetBtn() {
				// this.data2=[];
				// this.targetKeys2=[];
			},
			resetBtn2() {
				this.buildName = ''
				this.buildArea = ''
				this.account = ''
			},
			//分页
			changePage(page) {
				this.currentPage = page;
				// meteringJS.searchIbsMeterListByPage({
				// 		meterType: this.type, //仪表类型：1：电计量仪表；2：水计量仪表；3：燃气计量仪表；4：热计量仪表
				// 		pageCurrent: this.currentPage,
				// 		pageSize: this.pageSize,
				// 		collectorId: this.collectorId, //所属采集器
				// 		isVirtual: this.isVirtual, //是否是虚拟表  0：是；1：不是
				// 		conventionDate: this.conventionDate, //标定起始日期
				// 		conventionEndDate: this.conventionEndDate, //标定结束日期
				// 		buildId: this.build, //建筑id
				// 		//subentry: this.subentry //按分项查询(暂不用)
				// 	})
				// 	.then((res) => {
				// 		this.hotData = res.records;
				// 		this.dataCount = res.total
				// 	})
				// 	.catch((err) => {
				// 		this.$Message.error('分页查询仪表信息失败')
				// 	})
			},
			//Tab切换
			changeTab(data) {
				this.highSearch = false;
				switch (data) {
					case 0: //总用量监测
						this.isAllCount = true;
						this.isBuild = false;
						this.isUser = false;
						this.isPlate = false;

						break;
					case 1: //按建筑(区域)监测
						this.isAllCount = false;
						this.isBuild = true;
						this.isUser = false;
						this.isPlate = false;
						break;
					case 2: //按板换侧监测
						this.isAllCount = false;
						this.isBuild = false;
						this.isUser = true;
						this.isPlate = false;

						break;
					case 3: //按用户监测
						this.isAllCount = false;
						this.isBuild = false;
						this.isUser = false;
						this.isPlate = true;
						break;
				}

			}

		},
		mounted() {
			this.tabs = [{
					label: "总用量监测",
					data: this.columns1,
					hotData: this.tableData1,
				},
				{
					label: "按建筑(区域)监测",
					data: this.columns2,
					hotData: this.tableData2,
				},
				{
					label: "按板换侧监测",
					data: this.columns3,
					hotData: this.tableData3,
				},
				{
					label: "按用户监测",
					data: this.columns4,
					hotData: this.tableData4,
				}
			];
			this.xdata1=copyArray(this.xdata);
			this.yAxis1=copyArray(this.yAxis);
			this.widthyAxis2=copyArray(this.widthyAxis1);
			this.widthSeries2=copyArray(this.widthSeries1);
			this.widthyAxis3=copyArray(this.widthyAxis1);
			this.widthSeries3=copyArray(this.widthSeries1);
			this.widthyAxis4=copyArray(this.widthyAxis1);
			this.widthSeries4=copyArray(this.widthSeries1);
			
		},
	}
</script>
<style scoped="scoped" lang="less">
	.ivu-layout-header {
		z-index: 999;
	}

	.statistics {
		background: #e3e3e3;
		border-bottom: 1px solid #ccc;
	}

	.statistics>.ivu-col {
		padding: 10px 40px;
		border-right: 1px solid #ccc;
	}

	.line {
		height: 5px;
		background: #077aa9b3;
	}

	.normal-table {
		margin: 20px 0 10px;
		height: calc(100vh - 580px);
	}
	.echartsBox{
		height:300px;
	}
</style>
<style>
	.ivu-layout-header {
		z-index: 999 !important;
	}
</style>
