<template>
	<div class='metering'>
		<div>
			<Row>
				<Col span="4">
				<b class="fontSize">计量仪表总数：</b>
				<b class="bigFont1">{{countList.meterAllCount}}</b>
				</Col>
				<Col span="3" :offset="9" class="mr10">
				<Select v-model="build" @on-change='changeBuild' placeholder='建筑名称' clearable filterable>
					<Option v-for="item in buildTypes" :value="item.id" :key="item.id">{{item.name }}</Option>
				</Select>
				</Col>
				<Col span="3" class="mr10">
				<Select v-model="collector" @on-change='changeCollector' placeholder='采集器编号' clearable filterable>
					<Option v-for="item in collectors" :value="item.id" :key="item.key">{{ item.code}}</Option>
				</Select>
				</Col>
				<!-- <Col span="3" class="mr10">
				<Select v-model="meterType" @on-change='changeMeterType' placeholder='仪表类型' clearable filterable>
					<Option v-for="item in meterTypes" :value="item.id" :key="item.key">{{item.name }}</Option>
				</Select>
				</Col> -->
				<Col span="2">
				<imgButton type="按钮" name="查询" @click.native='searchBtn'></imgButton>
				</Col>
				<Col span='2'>
				<img class="mr20" src='../../../assets/images/device/仪表添加.png' alt="" @click="addMeter()">
				<img src='../../../assets/images/device/仪表批量添加.png' alt="" @click="addMeterBatch()">
				</Col>
			</Row>
		</div>

		<div style="margin-top:20px" class="relative">
			<div class="absolute" style="right: 0;top: 0;">
				<span class="fw700">{{type==1?'电表':type==2?'水表':type==3?'燃气表':'热表'}}总数：</span>
				<span class="cBlue fz18 mr20 fw700">{{countList.meterCurrentCount}}</span>
				<span class="mr10 fw700">仪表标定提醒：</span>
				<span class="cRed fz24 fw700">{{countList.meterOtherCount}}</span>
			</div>
			<Tabs type="card" @on-click="changeTab">
				<TabPane v-for="tab in tabs" :key="tab.key" :label="tab.label" :icon='tab.icon'>
					<Table :columns="tab.data" class="common-tabTable" :data="meterData" no-data-text="暂无数据" style="marginTop:0" border></Table>
					<Row class="page-bottom">
						<Col span="12" class="page-text">当前显示<span class="pageColor">{{meterData.length}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
						<Col span="8" :offset="4">
						<Page :total="dataCount" :page-size="pageSize" @on-change="changePage" show-elevator :current="currentPage" class="common-page-style" />
						</Col>
					</Row>
				</TabPane>
			</Tabs>
		</div>
		<!-- 添加计量仪表 -->
		<Modal :mask-closable="false" v-model="addModal" width="900" draggable title="" >
			<div style="margin-top: 30px;">
				<img class="mr5" src='../../../assets/images/device/仪表添加.png' alt="">
				<span class="spanPosition">{{addTitle}}</span>
				<span class="fr" style="margin-top: 15px;">
					<span class="mr10">操作日期:</span>
					<span>{{currentDate}}</span>
				</span>
			</div>
			<Form class="mt20" :model="formInline" :rules="ruleInline" ref="formInline" :label-width="15">
				<table cellpadding="0" cellspacing="0" class="localTable">
					<tr>
						<td width='15%'>
							<label>仪表类型</label>
						</td>
						<td width='35%' style='textAlign:left;<strong>padding: 5px 10px'>
							<!-- <FormItem prop="type" style='display:inline;' label=' '>
								<Select v-model="formInline.type" clearable filterable value='0'>
									<Option v-for="item in types" :value="item.value" :key="item.key">{{item.name }}</Option>
								</Select>
							</FormItem> -->
							<FormItem style='display:inline;' label=' '>
								<Select v-model="type" clearable filterable disabled>
									<Option v-for="item in yibiaoTypes" :value="item.id" :key="item.id">{{item.name }}</Option>
								</Select>
							</FormItem>
						</td>
						<td width='15%'>
							<label>所属采集器</label>
						</td>
						<td width='35%' style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="collector" style='display:inline;' label=' '>
								<Select v-model.number="formInline.collector" clearable filterable @on-change='addChangeCollector'>
									<Option v-for="item in collectors" :value="item.id" :key="item.id">{{item.code }}</Option>
								</Select>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<label>仪表名称</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="name" style='display:inline;' label=' '>
								<Input v-model="formInline.name" />
							</FormItem>
						</td>
						<td>
							<label>仪表编号</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>

							<FormItem prop="num" style='display:inline;' label=' '>
								<Input v-model="formInline.num" />
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<label>仪表品牌</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="pinpai1" style='display:inline;' label=' '>
								<Select v-model="formInline.pinpai1" clearable filterable class='fl' style="width:49%" @on-change='pinpaiChange'>
									<Option v-for="item in cycleArr" :value="item.brand" :key="item.brand">{{item.brand }}</Option>
								</Select>
								<Input v-if='isNewBuild' v-model="formInline.pinpai2" class="fr" style="width:49%" />
							</FormItem>

						</td>
						<td>
							<label>初装日期</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="czDate" style='display:inline;' label=' '>
								<DatePicker :editable='false' type="datetime" v-model="formInline.czDate"  style='width:100%;' ref="firstTime" @on-change="showTimePanel('firstTime')"></DatePicker>
								</Date-picker>  
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<label>所属建筑</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="buid" style='display:inline;' label=' '>
								<Select v-model.number="formInline.buid" clearable filterable @on-change='buildChangeAdd'>
									<Option v-for="item in buildTypes" :value="item.id" :key="item.id">{{item.name }}</Option>
								</Select>
							</FormItem>
						</td>
						<td>
							<label>计量区域</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="area" style='display:inline;' label=' '>
								<!-- <Select v-model.number="formInline.area" clearable filterable>
									<Option v-for="item in types" :value="item.id" :key="item.id">{{item.name }}</Option>
								</Select> -->
								<Cascader :data="areaData" v-model="formInline.area"  @on-change='areaChange'></Cascader>  <!--级联-->
							</FormItem>
						</td>
					</tr>
					<tr v-if="isElectric">
						<td>
							<label>计量分项</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="subItem" style='display:inline;' label=' '>
								<Select v-model.number="formInline.subItem" clearable filterable @on-change='subItemChange'>
									<Option v-for="item in subItemList" :value="item.id" :key="item.id">{{item.title }}</Option>
								</Select>
							</FormItem>
						</td>
						<td>
							<label>表计性质</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="nature" style='display:inline;' label=' '>
								<RadioGroup v-model="formInline.nature" @on-change='natureChange'>
									<Radio label="1">真实仪表</Radio>
									<Radio label="0" @click.native='virtualClick'>虚拟仪表</Radio>
								</RadioGroup>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<label>数据类型</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="dataType" style='display:inline;' label=' '>
								<Select v-model="formInline.dataType" clearable filterable on-change='getDataType'>
									<Option v-for="item in dataTypes" :value="item.id" :key="item.id" @click.native="selectDataType(item.id)">{{item.name }}</Option>
								</Select>
							</FormItem>
						</td>
						<td>
							<label>数据单位</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="dataUnit" style='display:inline;' label=' '>
								<span>{{getDataUnit}}</span>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<label>比例变换系数</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="blbhxs" style='display:inline;' label=' '>
								<Input v-model.number="formInline.blbhxs" />
							</FormItem>
						</td>
						<td>
							<label>小时最大阈值</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="xszdyz" style='display:inline;' label=' '>
								<Input v-model.number="formInline.xszdyz" />
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<label>仪表标定周期</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<Row>
								<Col span="12">
									<FormItem prop="ybbdzq" style='display:inline;' label=' '>
										<Input v-model.number="formInline.ybbdzq"/>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem prop="cycleType" style='display:inline;' label=' '>
										<Select v-model.number="formInline.cycleType" clearable filterable>
											<Option v-for="item in dateArr" :value="item.id" :key="item.id">{{item.name }}</Option>
										</Select>
									</FormItem>
								</Col>
							</Row>
						</td>
						<td>
							<label>最新标定日期</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="zxbdrq" style='display:inline;' label=' '>
								<DatePicker :editable='false' type="datetime" v-model="formInline.zxbdrq" style='width:100%;' @on-change="showTimePanel1('newTime')" ref="newTime"></DatePicker>
							</FormItem>
						</td>
					</tr>


				</table>

			</Form>

			<div slot="footer" style="margin:25px 0">
				<imgButton type="按钮" name="提交" @click.native="submitBtn('formInline')"></imgButton>
				<imgButton type="按钮" name="重置" @click.native="resetBtn('formInline')" ></imgButton><!-- v-show='this.addTitle == "修改计量仪表"?false:true' -->
			</div>
		</Modal>
		<!-- 批量添加计量仪表 -->
		<Modal :mask-closable="false" v-model="addModalLarge" width="500" draggable title="">
			<div style="margin-top: 30px;">
				<img class="mr10" src='../../../assets/images/device/仪表添加.png' alt="">
				<span class="spanPosition">批量添加计量仪表</span>
				<span class="fr" style="margin-top: 15px;">
					<span class="mr10">操作日期:</span>
					<span>{{currentDate}}</span>
				</span>
			</div>
			<Form class="mt20" :model="formInlineLarge" ref="formInlineLarge" :label-width="15">
				<table cellpadding="0" cellspacing="0" class="localTable">
					<tr>
						<td width='30%'>
							<label>仪表类型</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="type" label="" style='display:inline;'>
								<Select v-model="formInlineLarge.type" clearable filterable>
									<Option v-for="item in yibiaoTypes" :value="item.id" :key="item.id">{{item.name }}</Option>
								</Select>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td width='30%'>
							<label>批量导入</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="nature" label="" style='display:inline;'>
								<Upload action="" style='position:relative;top:4px'>
									<Button icon="ios-cloud-upload-outline">选择---</Button>
								</Upload>
							</FormItem>
						</td>
					</tr>

				</table>
			</Form>
			<div slot="footer" style="margin:25px 0">
				<imgButton type="按钮" name="提交" @click.native="submitBtnLarge('formInlineLarge')"></imgButton>
				<imgButton type="按钮" name="重置" @click.native="resetBtnLarge('formInlineLarge')"></imgButton>
			</div>
		</Modal>
		<!-- 查看计量仪表参数 -->
		<Modal :mask-closable="false" v-model="detailModal" width="900" draggable title="">
			<div v-show="showdetail">
				<div style="margin-top: 30px;">
					<img class="mr10" src='../../../assets/images/device/仪表查看.png' alt="">
					<span class="spanPosition">查看计量仪表参数</span>
					<!-- <span class="fr" style="margin-top: 10px;">
						<span class="mr10">当前计数:</span>
						<span class="fz18 cOrange">{{}}</span>kWh
					</span> -->
				</div>
				<table cellpadding="0" cellspacing="0" class="localTable ybTable">
					<tr>
						<td width="20%">仪表类型</td>
						<td>{{detailInfo.meterType}}</td>
						<td>所属采集器</td>
						<td>{{detailInfo.collectorId}}</td>
					</tr>
					<tr>
						<td>仪表名称</td>
						<td>{{detailInfo.name}}</td>
						<td>仪表编号</td>
						<td>{{detailInfo.code}}</td>
					</tr>
					<tr>
						<td>仪表品牌</td>
						<td>{{detailInfo.brand}}</td>
						<td>初装日期</td>
						<td>{{detailInfo.insertDate}}</td>
					</tr>
					<tr>
						<td>所属建筑</td>
						<td>{{detailInfo.buildAreaId1}}</td>
						<td>计量区域</td>
						<td>{{detailInfo.buildAreaId}}</td>
					</tr>
					<tr v-if="isElectric">
						<td>计量分项</td>
						<td>{{detailInfo.subentry}}</td>
						<td width="20%">表计性质</td>
						<td>{{detailInfo.isVirtual}}</td>
					</tr>
					<tr>
						<td>数据类型</td>
						<td>{{detailInfo.dataType}}</td>
						<td>数据单位</td>
						<td>{{detailInfo.dataUnit}}</td>
					</tr>
					<tr>
						<td>比例变换系数</td>
						<td>{{detailInfo.coefficient}}</td>
						<td>小时最大阈值</td>
						<td>{{detailInfo.maxValue}}</td>
					</tr>
					<tr>
						<td>仪表标定周期</td>
						<td>{{detailInfo.conventionDateNum+detailInfo.conventionDateType}}</td>
						<td>最新标定日期</td>
						<td>{{detailInfo.conventionDate}} <span @click="historyRecord()" class="pointer ml10 historyBtn">【历史标定记录】</span></td>
					</tr>
				</table>
			</div>
			<div v-show="!showdetail">
				<div style="margin-top: 30px;">
					<img class="mr10" src='../../../assets/images/device/仪表查看.png' alt="">
					<span class="spanPosition">查看计量仪表参数</span>
					<span class="fr" style="margin-top: 10px;">
						<span class="mr10">累计标定次数:</span>
						<span class="fz18 cOrange">{{historyArr.length}}</span>
					</span>
				</div>
				<div>
					<div style="background: rgba(7, 122, 169, 0.7);color: #fff;text-align: center;">
						<p style="display: inline-block;margin-top: 5px;height: 48px;line-height: 48px;" class="fz16">
							<span class="fl">仪表标定记录</span>
							<img src='../../../assets/images/device/下降.png' class="ml10 fl pointer" style="margin-top: 17px;" alt="" @click="showdetail=true">
						</p>
					</div>
					<Table :columns="historyColumns" :data="historyArr" border class="historyTable"></Table>
				</div>
			</div>
			<div slot="footer" style="margin:25px 0"></div>
		</Modal>

		<!----删除-->
		<imodal v-model="visible" :title="title">
		  <div class="mod-content">
		    <p class="mod-content-title">系统提示：</p>
		    <p class="mod-content-info ft">
		      本次操作将导致当前计量仪表信息被删除且不可恢复。
		    </p>
		    <span>
		      <p class="mod-content-info">&nbsp;</p>
		      <Button class="mod-content-btn delBtn" @click="visible = false">取消操作</Button>
		      <Button class="mod-content-btn delBtn" style='margin-right:8px;' @click="isDel = true,visible = false,deleteF()">确认删除</Button>
		    </span>
		  </div>
		</imodal>

		<!-- 虚拟电表参数 -->
		<Modal :mask-closable="false" v-model="xuniModal" width="900" draggable title="虚拟电表参数" class='xuniModal' :z-index=10001>
			<Row>
				<Col span="10" class="meterBox1" style="height: 470px;overflow-y: scroll;">
				<Tree :data="data2" ref="tree" @on-select-change="choice"></Tree>
				</Col>
				<Col span="4" class="meterBox2 text-center" style="height: 470px;vertical-align: middle;">
					<div style="margin-top: 180px;">
						<p><span class="optBtn add" @click='add'></span></p>
						<p><span class="optBtn reduce mt5" @click='reduce'></span></p>
						<p><span class="optBtn deleteMeter mt20" @click='deleteMeter'></span></p>
					</div>
				</Col>
				<Col span="10"  class="meterBox3">
					<Input v-model="meter_txt" type="textarea" :rows='21'/>
				</Col>
			</Row>
			<div slot="footer" style="margin:25px 0">
				<imgButton type="按钮" name="取消" @click.native="cancelMeter()"></imgButton>
				<imgButton type="按钮" name="确定" @click.native="confirmMeter()"></imgButton>
			</div>


		</Modal>
	</div>
</template>
<script>
import Vue from 'vue'
import {
	FormatDate,
	dateToStringByD
} from "../../../utils/validate.js";
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
				buid: "",
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
					type: "number",
					message: "请选择所属建筑",
					trigger: "change"
				}],
				area: [{
					required: true,
					type: "array",
					message: "请选择计量区域",
					trigger: "change"
				}],
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
// 					filterMethod(value, row) {
// 						if (value === 1) {
// 							//标定提醒
// 							this.conventionDate = FormatDate(new Date());
// 							var mm = new Date(FormatDate(new Date())).valueOf() + 24 * 60 * 60 * 1000 * 7; //当前时间的毫秒数加7天的毫秒数 即距现在时间七天后的毫秒数
// 							this.conventionEndDate = FormatDate(new Date(mm));
// 
// 							if (
// 								new Date(row.conventionDate).valueOf() >
// 								new Date(FormatDate(new Date())).valueOf()
// 							) {
// 								return (
// 									new Date(row.conventionDate).valueOf() -
// 									new Date(FormatDate(new Date())).valueOf() <
// 									24 * 60 * 60 * 1000 * 7
// 								); //-FormatDate 将某一个中国标准时间转化成2018-05-02格式
// 							}
// 						} else if (value === 2) {
// 							//逾期未标定
// 							this.conventionEndDate = FormatDate(new Date());
// 							if (row.conventionDate) {
// 								return new Date(row.conventionDate).valueOf() < new Date().valueOf();
// 							}
// 						}
// 					}
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
										//计量区域回显
										meteringJS.searchBuildAreaList({
												buildAreaId: params.row.pid
											})
											.then((res) => {
												this.formInline.area = res;
											})
											.catch((err) => {
												this.$Message.error('计量区域回显失败')
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

										this.formInline.buid = params.row.bid;
										this.buildChangeAdd(this.formInline.buid);

										// this.formInline.area = params.row.pid;//计量区域
										//this.formInline.area = [1,5];//计量区域   暂时写死

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
											// this.xuniModal = true;
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
										//计量区域回显
										meteringJS.searchBuildAreaList({
												buildAreaId: params.row.pid
											})
											.then((res) => {
												this.formInline.area = res;
											})
											.catch((err) => {
												this.$Message.error('计量区域回显失败')
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

										this.formInline.buid = params.row.bid;
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
											//this.xuniModal = true;
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
			//console.log(selectedData)
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
		buildChangeAdd(date) {
			//根据建筑id获取建筑区域列表
			this.areaData = [];
			this.formInline.area = [];
			this.buildIdAdd = date;
			if (date != undefined) {
				meteringJS.searchBuildingAreaList({
						buildingId: date
					})
					.then((res) => {
						this.areaData = res;
						this.data2 = [];
						this.searchIbsMeterTree(); //获取虚拟仪表列表
					})
					.catch((err) => {
						this.$Message.error('根据建筑id获取建筑区域列表失败')
					})
			}
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
								buildAreaId: this.formInline.area[this.formInline.area.length - 1], //建筑区域id
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
								buildAreaId: this.formInline.area[this.formInline.area.length - 1], //建筑区域id
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

</script>

<style lang='less' scoped>
	.optBtn{
		display: inline-block;
		width: 30px;
		height: 20px;
		cursor: pointer;
	}
	.add {
		background: url('../../../assets/images/device/add.png') no-repeat;
		background-size: 100%;
	}

	.reduce{
		background: url('../../../assets/images/device/reduce.png') no-repeat;
		background-size: 100%;
	}

	.deleteMeter {
		background: url('../../../assets/images/device/reset.png') no-repeat;
		background-size: 100%;
	}
	.add_active,.add:hover {
		background: url('../../../assets/images/device/add_active.png') no-repeat;
		background-size: 100%;
	}
	
	.reduce_active,.reduce:hover{
		background: url('../../../assets/images/device/reduce_active.png') no-repeat;
		background-size: 100%;
	}
	
	.deleteMeter_active,.deleteMeter:hover {
		background: url('../../../assets/images/device/reset_active.png') no-repeat;
		background-size: 100%;
	}

	.localTable {
		width: 100%;
	}

	.localTable td,
	.localTable th {
		border-right: 1px solid #e8eaec;
		border-bottom: 1px solid #e8eaec;
		background: #fafafa;
		min-width: 0;
		height: 48px;
		box-sizing: border-box;
		text-align: left;
		text-overflow: ellipsis;
		vertical-align: middle;
		padding-left: 18px;
		padding-right: 18px;
		text-overflow: ellipsis;
		white-space: normal;
		word-break: break-all;
		box-sizing: border-box;
	}

	.localTable tr td:first-child,
	.localTable tr th:first-child {
		border-left: 1px solid #e8eaec;
	}

	.localTable tr:first-child td,
	.localTable tr:first-child th {
		border-top: 1px solid #e8eaec;
	}

	.ybTable td,
	.ybTable th {
		height: 48px;
	}

	.historyBtn:hover {
		color: #017db0;
		font-weight: 700;
	}

	.spanPosition {
		position: relative;
		bottom: 3px;
		left: 4px;
		font-weight: bold;
		color: #000;
		font-size: 14px;
	}
	.metering .common-tabTable {
    margin: 20px 0 10px;
    height: calc(100vh - 325px);
}
.historyTable{
	.ivu-table{
		th{
			background-color: #fff!important;
		}
	} 
} 
</style>
