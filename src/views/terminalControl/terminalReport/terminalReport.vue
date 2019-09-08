<template>
	<div>
		<div class="relative" style="margin-top: -10px;">
			<p class="text-center cBlack fz16 fw700">
				{{'2019年5月份园区风机盘管数据统计报表'}}
			</p>
			<p class="absolute" style="top: 0;right:10px">
				<b class="mr10 fz16 cLightBlue pointer" @click="saveBtn">【保存】</b>
				<b class="mr10 fz16 cLightBlue pointer" @click="outExcel">【输出Excel】</b>
				<b class="fz16 cLightBlue pointer" @click="outPDF">【输出PDF】</b>
			</p>
		</div>
		<ul>
			<li>
				<span>统计范围:</span>
				<span class="cOrange ml5">北区19#楼、25号楼、南区</span>
			</li>
			<li>
				<span>统计日期:</span>
				<span class="cOrange ml5">2019-05-03------2019-05-04</span>
			</li>
		</ul>
		<p class="mt10">
			<span class="fr">
				<span class="mr20">
					<b>末端设备总数:</b>
					<b class="cOrange fz16 ml10">{{totalList.num1}}</b>
				</span>
				<span class="mr20">
					<b>累计用冷量:</b>
					<b class="cOrange fz16 ml10">{{totalList.num2}}</b>
					<b class="ml10">kWh</b>
				</span>
				<span class="mr20">
					<b>费用总计:</b>
					<b class="cOrange fz16 ml10">{{totalList.num3}}</b>
					<b class="ml10">元</b>
				</span>
			</span>
		</p>
		<div class="floor" v-for="item in floorList">
			<span class="floorTit mt5">{{item.name}}</span>
			<Table class="mt5 floorTable" width="100%" :height="tableHeight" border :columns="columns" :data="item.data"></Table>
		</div>
		<div class="mt10">
			<Input v-model="describe" :rows="4" type="textarea" placeholder="统计报表描述/备注:" />
		</div>

	</div>
</template>

<script>
	//import anPush from '../../api/request/announcementPush'
	export default {
		name: 'meterReport',
		data() {
			return {
				tableHeight: 240,
				describe: '',
				floorList: [],
				totalList: {
					num1: 12,
					num2: 123,
					num3: 45
				},
				columns: [{
						title: '序号',
						key: 'name',
						width: 80,
						align: 'center',
						type: 'index',
						fixed: 'left'
					},
					{
						title: '设备名称',
						key: 'age',
						width: 150,
						align: 'center',
						fixed: 'left'
					},
					{
						title: '设备编号',
						key: 'province',
						width: 150,
						align: 'center',
						fixed: 'left'
					},
					{
						title: '所属建筑',
						key: 'city',
						width: 150,
						align: 'center',
						fixed: 'left'
					},
					{
						title: '计量区域',
						key: 'address',
						width: 150,
						align: 'center',
						fixed: 'left'
					},
					{
						title: '运行时间',
						key: 'zip',
						width: 1000,
						align: 'center',
						fixed: 'top',
						renderHeader: (h, params) => {
							// console.log(params);
							return h('div', [
								h('strong',params.column.title),
								h('span', {
									style: {
										display:'inline-block',
										padding:'0 3px',
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										background:'#74d77b',
										borderRadius:'3px',
										marginLeft:'10px',
									},
									domProps:{
												innerHTML:'低速' //自定义的列头的标题
											},
								}),
								h('span', {
									style: {
										display:'inline-block',
										padding:'0 3px',
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										background:'#97d1d5',
										borderRadius:'3px',
										marginLeft:'10px',
									},
									domProps:{
												innerHTML:'中速' //自定义的列头的标题
											},
								}),
								h('span', {
									style: {
										display:'inline-block',
										padding:'0 3px',
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										background:'#f7bb02',
										borderRadius:'3px',
										marginLeft:'10px',
									},
									domProps:{
												innerHTML:'高速' //自定义的列头的标题
											},
								}),
								
							]);
						},
						children: [],
					},
					{
						title: '折合冷量(kWh)',
						key: 'action',
						fixed: 'right',
						width: 100,
						align: 'center',
					},
					{
						title: '费用(元)',
						key: 'money',
						fixed: 'right',
						width: 100,
						align: 'center',
					}
				],
				data1: [{
						age: 18,
						address: '的看法决定离开房间',
						province: 'America',
						city: 'New York',
						money: 12,
						zip: 100000,
					},
					{
						age: 24,
						address: 'Washington, D.C. No. 1 Lake Park',
						province: 'America',
						city: 'Washington, D.C.',
						zip: 100000
					},
					{
						age: 30,
						address: 'Sydney No. 1 Lake Park',
						province: 'Australian',
						city: 'Sydney',
						zip: 100000
					},
					{
						age: 26,
						address: 'Ottawa No. 2 Lake Park',
						province: 'Canada',
						city: 'Ottawa',
						zip: 100000
					},
					{
						age: 18,
						address: 'New York No. 1 Lake Park',
						province: 'America',
						city: 'New York',
						zip: 100000
					},
					{
						age: 24,
						address: 'Washington, D.C. No. 1 Lake Park',
						province: 'America',
						city: 'Washington, D.C.',
						zip: 100000
					},
					{
						age: 30,
						address: 'Sydney No. 1 Lake Park',
						province: 'Australian',
						city: 'Sydney',
						zip: 100000
					}
				],
				data2: [{
						age: 18,
						address: 'dd',
						province: 'America',
						city: 'New York',
						zip: 100000,
					},
					{
						age: 24,
						address: 'Washington, D.C. No. 1 Lake Park',
						province: 'America',
						city: 'Washington, D.C.',
						zip: 100000
					},
					{
						age: 30,
						address: 'Sydney No. 1 Lake Park',
						province: 'Australian',
						city: 'Sydney',
						zip: 100000
					},
					{
						age: 26,
						address: 'Ottawa No. 2 Lake Park',
						province: 'Canada',
						city: 'Ottawa',
						zip: 100000
					},
					{
						age: 18,
						address: 'New York No. 1 Lake Park',
						province: 'America',
						city: 'New York',
						zip: 100000
					},
					{
						age: 24,
						address: 'Washington, D.C. No. 1 Lake Park',
						province: 'America',
						city: 'Washington, D.C.',
						zip: 100000
					},
					{
						age: 30,
						address: 'Sydney No. 1 Lake Park',
						province: 'Australian',
						city: 'Sydney',
						zip: 100000
					}
				]
			};
		},
		methods: {
			saveBtn() {

			},
			outExcel() {

			},
			outPDF() {

			},


		},
		created() {


		},
		mounted() {
			this.floorList = [{
					name: '北区19#楼',
					midu: 56.1,
					nenghao: 256112,
					data: this.data1
				},
				{
					name: '北区25#楼',
					midu: 516.1,
					nenghao: 25116112,
					data: this.data2
				}
			]
			// 根据后台获取数据动态展示 能耗数据 现在先写死
			for (let i = 0; i < 30; i++) {
				let obj = {
					title: '',
					key: '',
					align: 'center',
					width: 150,
					render: (h, params) => {
						return h('div', [
								h('span', {
									style: {
										display:'inline-block',
										padding:'0 3px',
										minWidth:'24px',
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										background:'#74d77b',
										borderRadius:'3px',
										marginLeft:'10px',
									},
									domProps:{
												innerHTML:params.index //自定义的列头的标题
											},
								}),
								h('span', {
									style: {
										display:'inline-block',
										padding:'0 3px',
										minWidth:'24px',
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										background:'#97d1d5',
										borderRadius:'3px',
										marginLeft:'10px',
									},
									domProps:{
												innerHTML:params.index //自定义的列头的标题
											},
								},),
								h('span', {
									style: {
										display:'inline-block',
										padding:'0 3px',
										minWidth:'24px',
										height:'24px',
										lineHeight:'24px',
										textAlign:'center',
										background:'#f7bb02',
										borderRadius:'3px',
										marginLeft:'10px',
									},
									domProps:{
												innerHTML:params.index //自定义的列头的标题
											},
								}),
								
							]);
					}
				};
				obj.title = i + 1 + '';
				obj.key = 'key' + i;
				this.columns[this.columns.length - 3].children.push(obj);
			}
			// 设置表格高度
			this.tableHeight = window.innerHeight - 690
		},
		computed: {

		},
	}
</script>
<style lang="less" scoped>
	.floorTit {
		background: #2ea0ad;
		border-radius: 5px;
		color: #fff;
		display: inline-block;
		width: 120px;
		height: 28px;
		line-height: 28px;
		text-align: center;
	}
</style>
