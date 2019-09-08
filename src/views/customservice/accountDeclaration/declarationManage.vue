<template>
	<div class="declarationManage">
		<div class="describe">
			<p>
				<span class="des_txt mr10">故障申报总数:</span>
				<span class="des_num">{{num.allCount}}</span>
				<span class="des_txt" style="margin-left: 70px;">未处置申报信息:</span>
				<span class="des_num ml10">{{num.acount}}</span>
			</p>
		</div>
		<div class="mt10 tabDemo" style="position: relative;">
			<Badge :count="num.acount" type="warning" style='position: absolute;top:5px;left: 118px;'></Badge>
			<Badge :count="num.bcount" type="warning" style='position: absolute;top:5px;left: 268px;'></Badge>
			<Badge :count="num.ccount" type="warning" style='position: absolute;top:5px;left: 410px;'></Badge>
			<Tabs type="card" @on-click='tabClick'>
				<TabPane label="未处置申报">
					<Table border class="common-table" :columns="columns1" :data="data1" no-data-text="暂无数据" @on-row-click='rowClick'
					 style="margin-top: 1px;"></Table>
					<Row class="page-bottom mt10">
						<Col span="12" class="page-text">当前显示<span class="pageColor">{{data1.length}}</span>条记录,共<span class="pageColor">{{dataCount1}}</span>条记录</Col>
						<Col span="8" :offset="4">
						<Page :total="dataCount1" :current="currentPage1" :page-size="pageSize1" @on-change="changePage1" show-elevator
						 class="common-page-style" />
						</Col>
					</Row>
				</TabPane>
				<TabPane label="处置中申报">
					<Table class="common-table" border :columns="columns2" :data="data2" no-data-text="暂无数据" style="margin-top: 1px;"></Table>
					<Row class="page-bottom mt10">
						<Col span="12" class="page-text">当前显示<span class="pageColor">{{data2.length}}</span>条记录,共<span class="pageColor">{{dataCount2}}</span>条记录</Col>
						<Col span="8" :offset="4">
						<Page :total="dataCount2" :current="currentPage2" :page-size="pageSize2" @on-change="changePage2" show-elevator
						 class="common-page-style" />
						</Col>
					</Row>
				</TabPane>
				<TabPane label="已完成申报">
					<Table class="common-table" border :columns="columns3" :data="data3" no-data-text="暂无数据" style="margin-top: 1px;"></Table>
					<Row class="page-bottom mt10">
						<Col span="12" class="page-text">当前显示<span class="pageColor">{{data3.length}}</span>条记录,共<span class="pageColor">{{dataCount3}}</span>条记录</Col>
						<Col span="8" :offset="4">
						<Page :total="dataCount3" :current="currentPage3" :page-size="pageSize3" @on-change="changePage3" show-elevator
						 class="common-page-style" />
						</Col>
					</Row>
				</TabPane>
			</Tabs>
			<div style="position: absolute;right: 0;top:0">
				<Input v-model="keyWord" placeholder="关键词" style="width: 200px" class="mr20" />
				<span class="mr10">日期</span>
				<DatePicker size="large" v-model="startTime" :editable="false" type="date" placeholder="" style="width: 200px"
				 class="mr10" format="yyyy-MM-dd" :options="startTimeOption" @on-change="alarmStartTime"></DatePicker>
				<span class="mr10">-</span>

				<DatePicker size="large" v-model="endTime" :editable="false" type="date" placeholder="" style="width: 200px" class="mr10"
				 format="yyyy-MM-dd" :options="endTimeOption" @on-change="alarmEndTime"></DatePicker>
				<imgButton type="按钮" name="筛选" @click.native='search()'></imgButton>
			</div>
		</div>
		<!-- 查看详情弹出层 -->
		<Modal :mask-closable="false" v-model="showDetailModal" title="查看详情" footer-hide width="1000" class-name="vc-modal">
			<div class="progress">
				<div style="margin: 0 auto;width:600px;">
					<Row style="width:500px;margin: 0 auto;">
						<Col class="text-center" v-for="item in progressArr" style="width:20%;float: left;">
						<span :class="item"></span>
						</Col>
					</Row>
					<Progress :percent="100" status="active" hide-info stroke-color='#3da7db' />
					<Row style="width:500px;margin: 0 auto;margin-top: 10px;">
						<Col span='5' class="text-center" v-for="item in progressText" style="width:20%;float: left;">
						{{item}}
						</Col>
					</Row>
				</div>

			</div>
			<div class="tabDemo detaliTable mt20">
				<Tabs type="card" ref='detaliTab' :value=aa>
					<TabPane label="申报信息" name='申报信息' :disabled='disabled1'>
						<table cellpadding='0' cellspacing='0' width="100%" class="nativeTable mt5">
							<thead>
								<tr>
									<th>申报主题</th>
									<th colspan="5">{{detailInfo.applyTitle}}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>申报日期</td>
									<td>{{detailInfo.applyDate}}</td>
									<td>公司名称/户主名字</td>
									<td>张三</td>
									<td>申报人</td>
									<td>{{detailInfo.applicant}}</td>
								</tr>
								<tr>
									<td>申报类型</td>
									<td>{{detailInfo.applyType}}</td>
									<td>户号</td>
									<td>{{detailInfo.accountId}}</td>
									<td>申报人联系电话</td>
									<td>{{detailInfo.phone}}</td>
								</tr>
								<tr style="height: 100px;">
									<td>申报内容</td>
									<td colspan="5">{{detailInfo.applyContent}}</td>
								</tr>
								<tr>
									<td>维修地点</td>
									<td>{{detailInfo.applyContent}}</td>
									<td>联系人</td>
									<td>{{detailInfo.staff}}</td>
									<td>联系电话</td>
									<td>{{detailInfo.phone}}</td>
								</tr>
							</tbody>
						</table>
						<p class="text-center mt20">
							<Button v-if='isHandle' class="blueBtn" type="primary" @click="handle()" style="width:100px;">处置</Button>
							<Button v-else class="blueBtn" type="primary" style="width:100px;">已处置</Button>
						</p>
					</TabPane>
					<TabPane label="申报处置信息" name='申报处置信息' :disabled='disabled2'>
						<table cellpadding='0' cellspacing='0' width="100%" class="nativeTable mt5">
							<thead>
								<tr>
									<th colspan="6" style="text-align: center;"><img src="../../../assets/images/declarationManage/custom.png" alt=""
										 style="width: 24px;display: inline-block;vertical-align: middle;margin-right: 10px;">客服受理情况</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>申报受理日期</td>
									<td>2019-05-10 15:22</td>
									<td>受理客服</td>
									<td>{{detailInfo.staff}}</td>
									<td>处置结果</td>
									<td>{{detailInfo.processStatus==0?'未受理':detailInfo.processStatus==1?'派单中':detailInfo.processStatus==2?'维修中':detailInfo.processStatus==3?'代缴费':'已完成'}}</td>
								</tr>
								<tr>
									<td style="height: 100px;">备注</td>
									<td colspan="5">{{detailInfo.applyContent}}</td>
								</tr>
							</tbody>
						</table>

						<table cellpadding='0' cellspacing='0' width="100%" class="nativeTable mt10">
							<thead>
								<tr>
									<th colspan="6" style="text-align: center;"><img src="../../../assets/images/declarationManage/tool.png" alt=""
										 style="width: 24px;display: inline-block;vertical-align: middle;margin-right: 10px;">运维管理部门 </th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>受理日期 </td>
									<td>2019-05-10 15:22</td>
									<td>受理负责人</td>
									<td>{{detailInfo.staff}}</td>
									<td>处置结果</td>
									<td style="width:400px;">{{detailInfo.processStatus==0?'未受理':detailInfo.processStatus==1?'派单中':detailInfo.processStatus==2?'维修中':detailInfo.processStatus==3?'代缴费':'已完成'}}</td>
								</tr>
								<tr>
									<td>维修负责人 </td>
									<td>张山</td>
									<td>负责人联系电话</td>
									<td>13880005656</td>
									<td>预约维修日期</td>
									<td>2019-05-05 </td>
								</tr>
								<tr>
									<td>维修开始时间 </td>
									<td>2019-05-10 15:22</td>
									<td>维修结束时间</td>
									<td>2019-05-05 22:40</td>
									<td>维修结果</td>
									<td>解决</td>
								</tr>
								<tr style="height: 60px;">
									<td>维护内容 </td>
									<td colspan="5">清理出风口，更换故障机温控面板，调试送风量。</td>
								</tr>
								<tr style="height: 60px;">
									<td>问题诊断 </td>
									<td colspan="5">设备由于持续工作时间过长造成线路过热。</td>
								</tr>
								<tr style="height: 100px;">
									<td>收费项目及明细 </td>
									<td colspan="2">
										<p style="line-height: 28px;"><span style="display: inline-block;width:180px;">出风口清理</span> 150元/次 * 1 </p>
										<p style="line-height: 28px;"><span style="display: inline-block;width:180px;">温控面板更换</span> 100元/个 * 2 </p>
										<p style="line-height: 28px;"><span style="display: inline-block;width:180px;">上门维修费</span> 100元/次 *</p>
									</td>
									<td style="font-size: 16px;font-weight: 700;">缴费情况 </td>
									<td colspan="2">
										<Row>
											<Col span='8' style="margin-top: 36px;">
											<Input class="jfqkInput" v-model="detailInfo.repairFee" @on-blur="handleConfirm" style="font-weight: 700;" />
											<span>元</span>
											</Col>
											<Col span='12'>
											<span style="display: inline-block;width:142px;height: 87px;position: relative;margin-left: 20px;top: 8px;">
												<img style='position: absolute;top: 0;left: 0;' src="../../../assets/images/declarationManage/bg.png" alt="">
												<span style='position: absolute;top: 2px;left: 28px;font-size: 30px;font-weight: 700;color: #fff;line-height: 87px;'>已缴费</span>
											</span>
											</Col>
										</Row>
									</td>
								</tr>
							</tbody>
						</table>
					</TabPane>
					<TabPane label="评价与建议" name='评价与建议' :disabled='disabled3'>
						<table cellpadding='0' cellspacing='0' width="100%" class="nativeTable mt5">
							<thead>
								<tr>
									<th colspan="4" style="text-align: center;">对客服服务质量进行评价</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>评价等级</td>
									<td>
										<!-- <Rate show-text v-model="valueDisabled" /> -->
										<Rate show-text v-model="detailInfo.customerServiceEvaluate" @on-change='rateChange'>
											<span style="color: #f5a623">{{getTools}}</span>
										</Rate>
									</td>
									<td>评价日期</td>
									<td>2019-05-06 15:50</td>
								</tr>
								<tr>
									<td style="height: 100px;">意见/建议</td>
									<td colspan="3">
										<Input v-model="detailInfo.customerServiceEvaluateText" type="textarea" :rows="4" @on-blur='evaConfirm'/>
									</td>
								</tr>
							</tbody>
						</table>

						<table cellpadding='0' cellspacing='0' width="100%" class="nativeTable mt10">
							<thead>
								<tr>
									<th colspan="4" style="text-align: center;">对申报事件解决质量进行评价</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>评价等级</td>
									<td>
										<!-- <Rate disabled v-model="valueDisabled1" /> -->
										<Rate show-text v-model="detailInfo.repairServiceEvaluate" @on-change='rateChange1'>
											<span style="color: #f5a623">{{ getTools1}}</span>
										</Rate>
									</td>
									<td>评价日期</td>
									<td>2019-05-06 15:50</td>
								</tr>
								<tr>
									<td style="height: 100px;">意见/建议</td>
									<td colspan="3">
										<Input v-model="detailInfo.repairServiceEvaluateText" type="textarea" :rows="4"  @on-blur='evaConfirm'/>
									</td>
								</tr>
							</tbody>
						</table>

						<!-- <p class="text-center mt20">
							<Button class="blueBtn" type="primary" @click="evaConfirm()" style="width:100px;">提交</Button>
						</p> -->
					</TabPane>
				</Tabs>
			</div>
		</Modal>

	</div>
</template>

<script>
	import decManage from '../../../api/request/declarationManage'
	export default {
		name: 'declarationManage',
		data() {
			return {
				isHandle: true,
				disabled1: false,
				disabled2: false,
				disabled3: false,
				detailInfo: {
					"id": '',
					"applyDate": "",
					"applyType": "",
					"applyTitle": null,
					"phone": "",
					"staff": "",
					"applyContent": "",
					"processStatus": null,
					"accountId": null,
					"customerServiceEvaluate": null,
					"repairServiceEvaluate": null,
					"repairFee": 0,
					"acceptDate": null,
					"account": null,
					"feedbackRecord": null,
					"customerServiceEvaluateText": "",
					"repairServiceEvaluateText": "",
					"appointmentTime": null,
					"applicant": ""
				},
				dataId: '',
				progressArr: ['progress_finish', 'progress_finish', 'progress_finish', 'progress_finish', 'progress_finish'],
				progressText: ['未受理', '派单中', '维修中', '待缴费', '已完成'],
				getTools: '',
				getTools1: '',
				index: 0,
				num: {},
				startTime: '', //开始查询日期
				endTime: '', //结束查询日期
				startTimeOption: {},
				endTimeOption: {},
				valueDisabled: 0,
				valueDisabled1: 0,
				aa: '申报信息',
				keyWord: '',
				showDetailModal: false,

				currentPage1: 1,
				pageSize1: 10,
				dataCount1: 0,

				currentPage2: 1,
				pageSize2: 10,
				dataCount2: 0,

				currentPage3: 1,
				pageSize3: 10,
				dataCount3: 0,

				columns1: [{
						width: 100,
						type: 'index',
						title: '序号',
						key: 'id',
						align: "center",
					},
					{
						tooltip: true,
						title: '申报主题',
						key: 'applyTitle',
						align: "center",
					},
					{
						title: '业务类型',
						key: 'applyType',
						align: "center",
					},
					{
						title: '申报日期',
						key: 'applyDate',
						align: "center",
					},
					{
						title: '申报账户',
						key: 'account',
						align: "center",
					},
					{
						title: '联系人',
						key: 'applicant',
						align: "center",
					},
					{
						title: '联系电话',
						key: 'phone',
						align: "center",
					},
					{
						title: '管理操作',
						key: 'operation',
						align: "center",
						render: (h, params) => {
							return h(
								'div', [
									h(
										'imgButton', {
											props: {
												type: '查看'
											},
											nativeOn: {
												click: () => {
													// event.stopPropagation();
													// this.noticeModal = true
													event.stopPropagation();
													this.showDetailModal = true
													this.detailInfo = params.row;
													this.dataId = params.row.id;
													this.isHandle=true;
												}
											}
										}
									)
								]
							)
						}
					}
				],
				data1: [],
				columns2: [{
						width: 100,
						type: 'index',
						title: '序号',
						key: 'id',
						align: "center",
					},
					{
						tooltip: true,
						title: '申报主题',
						key: 'applyTitle',
						align: "center",
					},
					{
						title: '业务类型',
						key: 'applyType',
						align: "center",
					},
					{
						title: '申报日期',
						key: 'applyDate',
						align: "center",
					},
					{
						title: '申报账户',
						key: 'account',
						align: "center",
					},
					{
						title: '联系人',
						key: 'applicant',
						align: "center",
					},
					{
						title: '联系电话',
						key: 'phone',
						align: "center",
					},
					{
						title: '受理客服',
						key: 'staff',
						align: "center",
					},
					{
						title: '受理日期',
						key: 'acceptDate',
						align: "center",
					},
					{
						title: '处置进程',
						key: 'processStatus',
						align: "center",
						render: (h, params) => {
							let type = params.row.processStatus;
							switch (type) {
								case 0:
									return h('div', {
										style: {
											color: '#ff5400'
										}
									}, '未处置')
									break;
								case 1:
									return h('div', {
										style: {
											color: '#47bd44'
										}
									}, '派单中')
									break;
								case 2:
									return h('div', {
										style: {
											color: '#47bd44'
										}
									}, '维修中')
									break;
								case 3:
									return h('div', {
										style: {
											color: '#ff5400'
										}
									}, '待缴费')
									break;
							}
						}
					},
					{
						title: '管理操作',
						key: 'operation',
						align: "center",
						render: (h, params) => {
							return h(
								'div', [
									h(
										'imgButton', {
											props: {
												type: '查看'
											},
											nativeOn: {
												click: () => {
													event.stopPropagation();
													this.showDetailModal = true
													this.detailInfo = params.row;
													this.dataId = params.row.id
												}
											}
										}
									)
								]
							)
						}
					}
				],
				data2: [],
				columns3: [{
						width: 100,
						type: 'index',
						title: '序号',
						key: 'id',
						align: "center",
					},
					{
						tooltip: true,
						title: '申报主题',
						key: 'applyTitle',
						align: "center",
					},
					{
						title: '业务类型',
						key: 'applyType',
						align: "center",
					},
					{
						title: '申报日期',
						key: 'applyDate',
						align: "center",
					},
					{
						title: '申报账户',
						key: 'account',
						align: "center",
					},
					{
						title: '受理客服',
						key: 'staff',
						align: "center",
					},
					{
						title: '处置完成日期',
						key: 'acceptDate',
						align: "center",

					},
					{
						width: 200,
						title: '故障维护质量评价',
						key: 'repairServiceEvaluate',
						align: "center",
						render: (h, params) => {
							return h(
								'div', [
									h(
										'Rate', {
											props: {
												disabled: 'disabled',
												value: params.row.repairServiceEvaluate
											}
										}
									)
								]
							)
						}
					},
					{
						width: 200,
						title: '客户经理服务评价',
						key: 'customerServiceEvaluate',
						align: "center",
						render: (h, params) => {
							return h(
								'div', [
									h(
										'Rate', {
											props: {
												disabled: 'disabled',
												value: params.row.customerServiceEvaluate
											}
										}
									)
								]
							)
						}
					},
					{
						title: '管理操作',
						key: 'operation',
						align: "center",
						render: (h, params) => {
							return h(
								'div', [
									h(
										'imgButton', {
											props: {
												type: '查看'
											},
											nativeOn: {
												click: () => {
													event.stopPropagation();
													this.showDetailModal = true
													this.detailInfo = params.row;
													this.dataId = params.row.id;
													this.getTools='';
													this.getTools1 = '';
													switch (this.detailInfo.customerServiceEvaluate) {
														case 0:
															this.getTools = ''
															break;
														case 1:
															this.getTools = '非常不满意'
															break;
														case 2:
															this.getTools = '不满意'
															break;
														case 3:
															this.getTools = '一般'
															break;
														case 4:
															this.getTools = '满意'
															break;
														case 5:
															this.getTools = '非常满意'
															break;

													}
													switch (this.detailInfo.repairServiceEvaluate) {
														case 0:
															this.getTools1 = ''
															break;
														case 1:
															this.getTools1 = '非常不满意'
															break;
														case 2:
															this.getTools1 = '不满意'
															break;
														case 3:
															this.getTools1 = '一般'
															break;
														case 4:
															this.getTools1 = '满意'
															break;
														case 5:
															this.getTools1 = '非常满意'
															break;
													
													}
												}
											}
										}
									)
								]
							)
						}
					}
				],
				data3: [],

			};
		},
		methods: {
			//申报处置信息--点击确定事件
			handleConfirm() {
				decManage.updateIbsApplyById({
						id: this.dataId,
						repairFee: this.detailInfo.repairFee, //金额
					})
					.then((res) => {
						if (res.status == 'success') {
							this.$Message.success('修改金额成功')
							this.detailInfo = res.data;
						}
					})
					.catch((err) => {
						this.$Message.error('修改金额失败')
					})
			},
			//评价与建议--提交事件
			evaConfirm() {
				decManage.updateIbsApplyById({
						id: this.dataId,
						customerServiceEvaluateText: this.detailInfo.customerServiceEvaluateText, //客服评价
						repairServiceEvaluateText: this.detailInfo.repairServiceEvaluateText, //维修评价
						customerServiceEvaluate: this.detailInfo.customerServiceEvaluate, //客服评星0-5
						repairServiceEvaluate: this.detailInfo.repairServiceEvaluate //维修评星0-5
					})
					.then((res) => {
						if (res.status == 'success') {
							this.$Message.success('评价成功');
							// this.showDetailModal = false;
							this.detailInfo = res.data;
							this.changePage3(1);
						}
					})
					.catch((err) => {
						this.$Message.error('评价失败')
					})
			},
			//改变星级
			rateChange(rate) {
				switch (rate) {
					case 5:
						this.getTools = '非常满意'
						break;
					case 4:
						this.getTools = '满意'
						break;
					case 3:
						this.getTools = '一般'
						break;
					case 2:
						this.getTools = '不满意'
						break;
					case 1:
						this.getTools = '非常不满意'
						break;
				}
				this.evaConfirm();
			},
			rateChange1(rate) {
				switch (rate) {
					case 5:
						this.getTools1 = '非常满意'
						break;
					case 4:
						this.getTools1 = '满意'
						break;
					case 3:
						this.getTools1 = '一般'
						break;
					case 2:
						this.getTools1 = '不满意'
						break;
					case 1:
						this.getTools1 = '非常不满意'
						break;
				}
				this.evaConfirm();
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
			//筛选
			search() {
				switch (this.index) {
					case 0:
						this.changePage1(1);
						break;
					case 1:
						this.changePage2(1);
						break;
					case 2:
						this.changePage3(1);
						break;
				}
			},
			//处置
			handle() {
				decManage.updateIbsApplyById({
						id: this.dataId,
						processStatus: 1
					})
					.then((res) => {
						//this.num = res;
						if (res.status == 'success') {
							this.$Message.success('处置成功')
							this.isHandle = false;
							this.getNum(); //刷新数量
							this.changePage1(1);
						}
					})
					.catch((err) => {
						this.$Message.error('处置失败')
					})
			},
			tabClick(index) {
				// console.log(index)
				this.index = index;
				switch (index) {
					case 0:
						this.aa = '申报信息';
						this.keyWord = '';
						this.startTime = '';
						this.endTime = '';
						this.changePage1(1);
						this.progressArr = [];
						this.progressArr = ['progress_ing', 'progress_no', 'progress_no', 'progress_no', 'progress_no'];
						this.disabled1 = false;
						this.disabled2 = true;
						this.disabled3 = true;
						this.isHandle = true;
						break;
					case 1:
						this.aa = '申报处置信息';
						this.keyWord = '';
						this.startTime = '';
						this.endTime = '';
						this.changePage2(1);
						this.progressArr = [];
						this.progressArr = ['progress_finish', 'progress_ing', 'progress_no', 'progress_no', 'progress_no'];
						this.disabled1 = false;
						this.disabled2 = false;
						this.disabled3 = true;
						this.isHandle = false;
						break;
					case 2:
						this.aa = '评价与建议';
						this.keyWord = '';
						this.startTime = '';
						this.endTime = '';
						this.changePage3(1);
						this.progressArr = [];
						this.progressArr = ['progress_finish', 'progress_finish', 'progress_finish', 'progress_finish', 'progress_ing'];
						this.disabled1 = false;
						this.disabled2 = false;
						this.disabled3 = false;
						this.isHandle = false;
						break;
				}
				// console.log(this.$refs.detaliTab.value)
			},
			//账户申报列表各个状态数量
			getNum() {
				decManage.searchApplyNumByStatus({})
					.then((res) => {
						this.num = res;
					})
					.catch((err) => {
						this.$Message.error('获取各个状态数量数据失败')
					})
			},
			//查看详情
			rowClick(data, index) {
				console.log(data, index)
				this.dataId = data.id
			},
			//切换页面操作
			changePage1(Page) {
				this.currentPage1 = Page;
				decManage.searchIbsApplyBypage({
						pageCurrent: this.currentPage1, //当前页码
						pageSize: this.pageSize1,
						keyWord: this.keyWord,
						startDate: this.startTime,
						endDate: this.endTime,
						processStatus: 0
					})
					.then((res) => {
						this.data1 = res.records;
						this.dataCount1 = res.total;
						this.currentPage1 = res.current;
					})
					.catch((err) => {
						this.$Message.error('获取未处置申报列表数据失败')
					})
			},
			changePage2(Page) {
				this.currentPage2 = Page;
				decManage.searchIbsApplyBypage({
						pageCurrent: this.currentPage2, //当前页码
						pageSize: this.pageSize2,
						keyWord: this.keyWord,
						startDate: this.startTime,
						endDate: this.endTime,
						pStatus: '1,2,3'
					})
					.then((res) => {
						this.data2 = res.records;
						this.dataCount2 = res.total;
						this.currentPage2 = res.current;
					})
					.catch((err) => {
						this.$Message.error('获取处置中申报列表数据失败')
					})

			},
			changePage3(Page) {
				this.currentPage3 = Page;
				decManage.searchIbsApplyBypage({
						pageCurrent: this.currentPage3, //当前页码
						pageSize: this.pageSize3,
						keyWord: this.keyWord,
						startDate: this.startTime,
						endDate: this.endTime,
						processStatus: 4
					})
					.then((res) => {
						this.data3 = res.records;
						this.dataCount3 = res.total;
						this.currentPage3 = res.current;
					})
					.catch((err) => {
						this.$Message.error('获取已完成申报数据失败')
					})

			},
		},
		created() {
			this.changePage1(1);
			this.getNum();
			this.tabClick(0)
		},
		mounted() {
			this.alarmStartTime(this.startTime);
			this.alarmEndTime(this.endTime);
		}
	}
</script>

<style lang="less">
	.jfqkInput {
		.ivu-input {
			border: none;
			font-size: 34px;
		}
	}

	.declarationManage {
		.common-table {
			height: calc(100vh - 330px);
		}
	}

	.nativeTable {
		table-layout: fixed;

		tbody tr:hover {
			background: #ebf7ff;
		}

		th {
			background-color: #ddd;
			border-right: 1px solid #e8eaec;
			height: 40px;
			line-height: 40px;
			white-space: nowrap;
			overflow: hidden;
			text-align: center;
		}

		td {
			border-right: 1px solid #e8eaec;
			background-color: #fff;
			height: 40px;
			line-height: 40px;
			white-space: nowrap;
			overflow: hidden;
			text-align: center;
			border-bottom: 1px solid #e8eaec;
		}
	}

	.detaliTable {

		th:first-child,
		td:first-child {
			border-left: 1px solid #e8eaec;
		}

		th,
		td {
			text-align: left;
			padding-left: 18px;
			padding-right: 18px;

		}
	}

	.lineBar {
		width: 100%;
		height: 8px;
		background: #fff;
		margin-top: -22px;
	}

	.des_txt {
		font-size: 18px;
	}

	.des_num {
		color: #077aa9;
		font-size: 30px;
	}

	.describe {
		margin-top: 10px;
	}

	.tabDemo .ivu-tabs-tab {
		width: 145px;
		text-align: center;
	}

	.ivu-input-prefix i,
	.ivu-input-suffix i {
		color: #0e769c !important;
	}

	.progress_finish {
		display: inline-block;
		width: 26px;
		height: 30px;
		background: url('../../../assets/images/declarationManage/progress_finish.png') no-repeat;
		background-size: 20px;
	}

	.progress_ing {
		display: inline-block;
		width: 26px;
		height: 30px;
		background: url('../../../assets/images/declarationManage/progress_ing.png') no-repeat;
		background-size: 20px;
	}

	.progress_no {
		display: inline-block;
		width: 26px;
		height: 30px;
		background: url('../../../assets/images/declarationManage/progress_no.png') no-repeat;
		background-size: 20px;
	}
</style>
