<template>
	<div>
		<div class="relative" style="margin-top: -10px;">
			<p class="text-center cBlack fz16 fw700">
				{{'2019年5月份园区点能耗及用冷量统计报表'}}
			</p>
			<p class="absolute" style="top: 0;right:10px">
				<b class="mr10 fz16 cLightBlue pointer" @click="saveBtn">【保存】</b>
				<b class="mr10 fz16 cLightBlue pointer" @click="outExcel">【输出Excel】</b>
				<b class="fz16 cLightBlue pointer" @click="outPDF">【输出PDF】</b>
			</p>
		</div>
		<ul>
			<li>
				<span>计量仪表:</span>
				<span class="cOrange ml5">电表、热计量仪表</span>
			</li>
			<li>
				<span>统计范围:</span>
				<span class="cOrange ml5">北区19#楼、25号楼、南区</span>
			</li>
			<li>
				<span>统计日期:</span>
				<span class="cOrange ml5">2019-05-03------2019-05-04</span>
			</li>
		</ul>
		<div class="floor" v-for="item in floorList">
			<p class="mt10">
				<span class="floorTit">{{item.name}}</span>
				<span class="fr">
					<span class="mr20">
						<b>总能耗:</b>
						<b class="cOrange fz16 ml10">{{item.nenghao}}</b>
						<b class="ml10">kWh</b>
					</span>
					<span class="mr20">
						<b>能耗密度:</b>
						<b class="cOrange fz16 ml10">{{item.midu}}</b>
						<b class="ml10">kWh/m²</b>
					</span>
				</span>
				
			</p>
			<!-- <Table class="mt5 floorTable" width="100%" border :columns="columns" :data="item.data"></Table> -->
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
				tableHeight:240,
				describe: '',
				floorList: [],
				columns: [
					{
						title: '序号',
						key: 'name',
						width: 80,
						align:'center',
						type: 'index',
						fixed: 'left'
					},
					{
						title: '设备名称',
						key: 'age',
						width: 150,
						align:'center',
						fixed: 'left'
					},
					{
						title: '设备编号',
						key: 'province',
						width: 150,
						align:'center',
						fixed: 'left'
					},
					{
						title: '所属建筑',
						key: 'city',
						width: 150,
						align:'center',
						fixed: 'left'
					},
					{
						title: '计量区域',
						key: 'address',
						width: 150,
						align:'center',
						fixed: 'left'
					},
					{
						title: '能耗数据(kWh)',
						key: 'zip',
						width: 1000,
						align:'center',
						fixed: 'top',
						children: []
					},
					{
						title: '平均能耗密度(kWh/m²)',
						key: 'action',
						fixed: 'right',
						width: 180,
						align:'center',
					}
				],
				data1: [{
						age: 18,
						address: '的看法决定离开房间',
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
				],
				data2: [{
						age: 18,
						address: 'dd',
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
				let obj={
					title: '',
					key: '',
					align: 'center',
					width: 80
				};
				obj.title=i+1+'';
				obj.key='key'+i;
				this.columns[this.columns.length-2].children.push(obj);
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

	// .floorTable{
	// 	height:200px;
	// }
</style>
