<template>
	<div class="announcementPush">
		<div class="describe">
			<Row>
				<Col span="6">
				<span class="des_txt mr10">发布信息总数:</span>
				<span class="des_num">{{num}}</span>
				</Col>
				<Col span="16">
				<span class="mr10">发布日期</span>
				<DatePicker size="large" v-model="startTime" :editable="false" type="date" placeholder="" style="width: 200px"
				 class="mr10" format="yyyy-MM-dd" :options="startTimeOption" @on-change="alarmStartTime"></DatePicker>
				<span class="mr10">-</span>
				<DatePicker size="large" v-model="endTime" :editable="false" type="date" placeholder="" style="width: 200px" class="mr10"
				 format="yyyy-MM-dd" :options="endTimeOption" @on-change="alarmEndTime"></DatePicker>
				<imgButton class="mr10" type="按钮" name="查询" @click.native='changePage(1)'></imgButton>
				<imgButton type="高级筛选" name="高级筛选" @click.native='showDetail=!showDetail'></imgButton>
				</Col>
				<Col span="2">
				<imgButton type="添加公告" name="添加公告" @click.native='addNotice' class='fr'></imgButton>
				</Col>
			</Row>
			<div class="detailBox" v-show="showDetail">
				<Row>
					<Col span="5">
					<span class="mr20">公告标题： </span>
					<Input v-model="noticeTit" placeholder="" style="width: 200px" />
					</Col>
					<Col span="3">
					<span class="mr20">重要等级： </span>
					<Select v-model="importanceLevel" style="width:100px" clearable>
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
					<Col span="5">
					<span class="mr20">发布单位： </span>
					<Input v-model="publishiUnit" placeholder="" style="width: 200px" />
					</Col>
					<Col span="8">
					<span class="mr20">推送日期： </span>
					<DatePicker size="large" v-model="startTime1" :editable="false" type="date" placeholder="" style="width: 200px"
					 class="mr10" format="yyyy-MM-dd" :options="startTimeOption1" @on-change="alarmStartTime1"></DatePicker>
					<span class="mr10">-</span>
					<DatePicker size="large" v-model="endTime1" :editable="false" type="date" placeholder="" style="width: 200px"
					 class="mr10" format="yyyy-MM-dd" :options="endTimeOption1" @on-change="alarmEndTime1"></DatePicker>
					</Col>
					<Col span="3">
					<Button class="submitBtn blueBtn mr10" @click.native='changePage(1)'>提交</Button>
					<Button class="resetBtn grayBtn" @click.native='resetBtn()'>重置</Button>
					</Col>
				</Row>
			</div>
		</div>

		<div class="mt10 tabDemo tabDemo1" style="position: relative;">
			<Table border class="common-table" :columns="columns" :data="data" no-data-text="暂无数据" @on-row-click='SeeDetails'></Table>
			<Row class="page-bottom mt10">
				<Col span="12" class="page-text">当前显示<span class="pageColor">{{data.length}}</span>条记录,共<span class="pageColor">{{dataCount}}</span>条记录</Col>
				<Col span="8" :offset="4">
				<Page :total="dataCount" :current="currentPage" :page-size="pageSize" @on-change="changePage" show-elevator class="common-page-style" />
				</Col>
			</Row>
		</div>
		<!-- 添加弹出层 -->
		<Modal :mask-closable="false" v-model="noticeModal" :title="title" footer-hide width="1000" class-name="vc-modal">
			<Form :model="formRight" ref='formRight' :rules="ruleValidate" label-position="right" :label-width="100">
				<FormItem label="公告标题" prop='title'>
					<Input v-model="formRight.title" value=""></Input>
				</FormItem>
				<FormItem label="公告正文" prop='text'>
					<Input v-model="formRight.text" type="textarea" :rows="4" placeholder="" />
				</FormItem>
				<FormItem label="推送图片">
					<FormItem prop="file">
						<Row>
							<Col span="4">
							<Upload v-model="formRight.file" :multiple='true' :show-upload-list="true" :format="['jpg','jpeg','png','gif']"
							 :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="uploadError" :on-format-error="handleFormatError"
							 :action="actionUrl">
								<Button icon="ios-cloud-upload-outline">上传附件</Button>
							</Upload>
							</Col>
							<Col span="20">
							<!-- <span v-if="fileArr.length===0">未选择文件</span> -->
							<!-- 上传前的图片 -->
							<ul class="file-list" v-if="(isEdit===false &&fileArr.length!=0) || (isEdit===true && fileArr.length!=0)">
								<li v-for="(list,index) in idBefore" :key="index" style="float: left;list-style: none;position: relative;width:50px;height: 50px;margin-right: 20px;"
								 class="demo-upload-list">
									<img v-bind:src="list" style="width:50px;height: 50px;">
									<div class="demo-upload-list-cover">
										<Icon type="ios-trash-outline" @click.native="delFileList1(index)" style='position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%);'></Icon>
									</div>
								</li>
							</ul>
							<!-- 上传后的图片 -->
							<ul class="file-list" v-if="isEdit===true">
								<li v-for="(list,index) in uploadArr" :key="index" style="float: left;list-style: none;position: relative;width:50px;height: 50px;margin-right: 20px;"
								 class="demo-upload-list">
									<img v-bind:src="list" style="width:50px;height: 50px;">
									<div class="demo-upload-list-cover">
										<Icon type="ios-trash-outline" @click.native="delFileList2(index)" style='position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%);'></Icon>
									</div>
								</li>
							</ul>
							</Col>
						</Row>
					</FormItem>
				</FormItem>
				<FormItem label="推送URL" prop='url'>
					<Input v-model="formRight.url" value=""></Input>
				</FormItem>
				<FormItem label="重要等级" prop='level'>
					<Select v-model="formRight.level" style="width:100px">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="发布单位" prop='company'>
					<Input v-model="formRight.company" value=""></Input>
				</FormItem>
				<FormItem label="推送时间" prop="date">
					<Row>
						<Col span="6">
						<DatePicker :editable='false' type="datetime" v-model="formRight.date" ref="producetime" @on-change="showTimePanel('producetime')"
						 :disabled='disabled'></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="推送账户" prop='checkAllGroup'>
					<Row>
						<Col span='8'>
						<!-- <Select v-model="formRight.checkAllGroup" filterable multiple @on-change='accountChange'>
							<Option v-for="item in accountList" :value="item.id" :key="item.id">{{ item.account }}</Option>
						</Select> -->
						
						<!-- select选择器带全选功能 自定义组件: 使用方法及参数说明-->
						 <MultiSelect :selectValueProp="formRight.checkAllGroup" :optionArrProp="accountList" :widthProp="300" :maxCountProp='10'
						  @listenChange='accountChange'></MultiSelect>
						  <!-- 
						  * selectValueProp:选中的value数组;
						  *  optionArrProp:所以下拉选项数组,不包括全选,全选需自己添加到数组中 ;
						  * widthProp:组件宽度  ;
						  * maxCountProp:多选时最多显示多少个 tag;
						  * @listenChange:change事件.返回两个参数:selectValue,选中的value数组, labelArr:选中的label数组;
						  * -->
						</Col>
					</Row>
				</FormItem>
				<FormItem label="保存为模板" prop='mould' v-if='!isEdit'>
					<Checkbox v-model="formRight.mould"></Checkbox>
				</FormItem>
				<FormItem style='text-align: center;'>
					<p class="publishTxt" v-if="isEdit">
						<span class="mr10">操作账号：</span>
						<strong class="mr30">{{author}}</strong>
						<span class="mr10">发布日期：</span>
						<strong>{{formRight.pushTime}}</strong>
					</p>
					<Button class="addSubmitBtn blueBtn mr10" type="primary" @click="handleSubmit('formRight')">提交</Button>
					<Button class="addResetBtn LightBlueBtn" @click.native="addResetBtn()">重置</Button>
				</FormItem>
			</Form>
		</Modal>

		<!-- 详情弹出层 -->
		<Modal :mask-closable="false" v-model="detailModal" title="公告详细信息" footer-hide width="1000" class-name="vc-modal">
			<p class="text-center" style="font-size: 24px;">{{detailCon.title}}</p>
			<p class="text-center mt10">{{detailCon.author}} {{detailCon.dateTime}}</p>
			<p>
				{{detailCon.content}}
			</p>
		</Modal>


	</div>
</template>

<script>
	import {
		dateToStringByD,
		FormatDate
	} from '../../utils/validate.js'
	import {
		copyArray
	} from '@/api/util'
	import anPush from '../../api/request/announcementPush'
	import axios from 'axios'
	export default {
		name: 'announcementPush',
		data() {
			//验证 推送账户
			const validateAcount = (rule, value, callback) => {
				// 				console.log(rule)
				// 				console.log(value)
				// 				console.log(callback)
				// debugger;
				if (value.length === 0) {
					callback(new Error('此字段不能为空'));
				} else {
					callback();
				}
			};
			// 自定义验证 判断上传文件 fileList 的长度
			// 			const validateUpload = (rule, value, callback) => {
			// 				if (this.formRight.file === null) {
			// 					callback(new Error('请选择要上传的文件'))
			// 				} else {
			// 					callback()
			// 				}
			// 			};
			return {
				//推送账户
				indeterminate: false,
				checkAll: false,
				accountList: [],
				accountNameArr: [],
				accountIdArr: [],
				arr: [], //多选选中的数组-名字


				disabled: false, //日期是否禁用
				params: {},
				fileArr: [],
				idBefore: [],
				uploadArr: [], //修改公告时 回显的图片url数组
				uploadArrNew: [], //修改公告时 回显的图片url数组的克隆版
				imageUrl: [], //修改公告时 剩余的图片url数组
				deleteImageUrl: [], //修改公告时 删除的图片url数组

				isEdit: false,
				informationId: '',
				author: '', //操作账号
				num: 0, //公告信息总数
				detailCon: {}, //公告详情
				title: '发布公告',
				showDetail: false,
				noticeModal: false,
				detailModal: false,
				currentPage: 1,
				pageSize: 10,
				dataCount: 0,
				publishiUnit: '',
				importanceLevel: '',
				noticeTit: '',
				startTime: '',
				endTime: '',
				startTimeOption: {},
				endTimeOption: {},
				startTimeOption1: {},
				endTimeOption1: {},
				startTime1: '',
				endTime1: '',
				formRight: {
					title: '',
					text: '',
					file: null,
					url: '',
					level: '',
					company: '',
					date: '',
					checkAllGroup: [],
					mould: false,
					pushTime: '',
				},

				ruleValidate: {
					title: [{
						required: true,
						message: '此字段不能为空'
					}],
					text: [{
						required: true,
						message: '此字段不能为空'
					}],
					level: [{
						required: true,
						message: '此字段不能为空'
					}],
					company: [{
						required: true,
						message: '此字段不能为空'
					}],
					date: [{
						required: true,
						message: "此字段不能为空",
						trigger: "change",
						type: 'date',
					}],
					checkAllGroup: [{
						required: true,
						validator: validateAcount
					}]

				},
				cityList: [{
						value: '2',
						label: '紧急'
					},
					{
						value: '0',
						label: '普通'
					},
					{
						value: '1',
						label: '重要'
					}
				],
				columns: [{
						width: 100,
						type: 'index',
						title: '序号',
						key: 'id',
						align: "center",
					},
					{
						tooltip: true,
						title: '公告标题',
						key: 'title',
						align: "center",
					},
					{
						title: '设定推送时间',
						key: 'pushTime',
						align: "center",
					},
					{
						title: '重要等级',
						key: 'level',
						align: "center",
						render: (h, params) => {
							let type = params.row.level;
							switch (type) {
								case 0:
									return h('div', {}, '普通')
									break;
								case 1:
									return h('div', {}, '重要')
									break;
								case 2:
									return h('div', {}, '紧急')
									break;
							}
						}
					},
					{
						title: '推送范围',
						key: 'accounts',
						align: "center",
					},
					{
						title: '发布单位',
						key: 'publishPerson',
						align: "center",
					},
					{
						title: '发布日期',
						key: 'dateTime',
						align: "center",
					},
					{
						title: '操作',
						key: 'operation',
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
													event.stopPropagation();
													this.noticeModal = true;
													this.isEdit = true;
													this.title = '修改公告';
													this.getAcount();
													//重置
													this.handleReset('formRight');
													this.formRight.checkAllGroup = [];
													//回显
													this.uploadArr = [];
													this.uploadArrNew = [];
													this.imageUrl = [];
													this.deleteImageUrl = [];
													this.informationId = params.row.id;
													anPush.searchInformationById({
															informationId: params.row.id
														})
														.then((res) => {
															if (res.data !== null) {
																this.formRight.title = res.data.title;
																this.formRight.text = res.data.content;
																if (res.data.imageUrl != '' && res.data.imageUrl != null) {
																	for (var i = 0; i < res.data.imageUrl.split(',').length; i++) {
																		this.uploadArr.push(`${axios.defaults.baseURL}${res.data.imageUrl.split(',')[i]}`);
																	}
																	this.uploadArrNew = copyArray(res.data.imageUrl.split(','));
																}
																this.formRight.url = res.data.otherUrl;
																this.formRight.level = res.data.level + '';
																this.formRight.company = res.data.publishPerson;
																this.formRight.date = res.data.pushTime;
																this.author = res.data.author;
																this.formRight.pushTime = res.data.dateTime;
																this.formRight.checkAllGroup = [];
																for (var i = 0; i < res.data.pushAccountIds.split(',').length; i++) {
																	this.formRight.checkAllGroup.push(res.data.pushAccountIds.split(',')[i] - 0)
																}
															} else {
																console.log('数据为空');
															}
															// 															
														})
														.catch((err) => {
															this.$Message.error('修改回显失败')
														})
												}
											
											}
										}
									),
									h(
										'imgButton', {
											props: {
												type: params.row.hide === 0 ? '隐藏公告' : '恢复公告',
												title: params.row.hide === 0 ? '隐藏公告' : '恢复公告'
											},
											nativeOn: {
												click: (data) => {
													event.stopPropagation();

													if (data.target.className === 'img-btn hideAnn-img') {

														data.target.className = 'img-btn hidedAnn-img';
														data.target.title = '恢复公告';

														anPush.hideOrRecoverInformation({
																informationId: params.row.id,
																status: 1 //0：恢复；1：隐藏
															})
															.then((res) => {
																this.$Message.success('隐藏公告成功')
																this.changePage(this.currentPage)
															})
															.catch((err) => {
																this.$Message.error('隐藏公告失败')
															})
													} else {
														data.target.className = 'img-btn hideAnn-img';
														data.target.title = '隐藏公告';
														anPush.hideOrRecoverInformation({
																informationId: params.row.id,
																status: 0 //0：恢复；1：隐藏
															})
															.then((res) => {
																this.$Message.success('恢复公告成功')
																this.changePage(this.currentPage)
															})
															.catch((err) => {
																this.$Message.error('恢复公告失败')
															})
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
				data: [],
			};
		},
		methods: {
			accountChange(value, label) {
				this.formRight.checkAllGroup = value;
			},
			//上传之前
			beforeUpload(file) {
				console.log('上传之前')
				// 保存文件到总展示文件数据里
				this.fileArr.push(file);

				this.idBefore = [];
				for (var i = 0; i < this.fileArr.length; i++) {
					this.idBefore.push(window.URL.createObjectURL(this.fileArr[i]));
				}

				console.log(this.idBefore)
				// 保存文件到需要上传的文件数组里
				// this.uploadFile.push(file)

				return false;
			},
			//上传成功图片
			handleSuccess(res, file, fileList) {
				console.log('上传成功')
				console.log(res)
				console.log(file)
				console.log(fileList)
				this.$Message.info(res.msg);
				if (res.code == 200) {
					//this.excel_name = res.info.originalName;
				}
			},
			//上传失败
			uploadError(error, file) {
				console.log('上传失败')
				console.log(error)
				console.log(file)
				this.$Message.info(error);
			},
			//文件格式错误调用
			handleFormatError(file) {
				this.$Message.info("文件格式不正确,请上传图片格式文件");
			},
			//删除图片
			delFileList1(index) {
				this.fileArr.splice(index, 1);
				this.idBefore.splice(index, 1);
				console.log('删除图片' + 'this.fileArr')
				console.log(this.fileArr);
			},
			delFileList2(index) {
				this.uploadArr.splice(index, 1);
				this.imageUrl = this.uploadArr; //删除后剩余的图片 有http前缀
				this.deleteImageUrl.push(this.uploadArrNew[index]); //删除的图片 没有http前缀
				//删除http前缀
				let arr = [];
				this.imageUrl.forEach((item, index) => {
					console.log(item)
					let idx = item.indexOf("images");
					arr.push(item.substring(idx - 1, item.length))
				})
				this.imageUrl = arr;

				console.log('this.imageUrl');
				console.log(this.imageUrl);
				console.log('this.deleteImageUrl');
				console.log(this.deleteImageUrl);
			},
			//查询所有账户
			getAcount() {
				anPush.searchAllAccountIdAndName({})
					.then((res) => {
						// this.accountList = res;
						this.accountList=res.map(item=>{
							return {value:item.id, label:item.account}
						})
						// this.accountList.unshift({
						// 	label: "全选",
						// 	value: 'ALL_SELECT'
						// })
						// for (var i = 0; i < this.accountList.length; i++) {
						// 	this.accountNameArr.push(this.accountList[i].account);
						// 	this.accountIdArr.push(this.accountList[i].id);
						// }
					})
					.catch((err) => {
						this.$Message.error('获取账户失败')
					})
			},
			//查询公告数量
			getNum() {
				anPush.searchInformationAmount({})
					.then((res) => {
						this.num = res;
					})
					.catch((err) => {
						this.$Message.error('获取数据失败')
					})
			},
			//重置
			resetBtn() {
				this.noticeTit = '';
				this.importanceLevel = '';
				this.publishiUnit = '';
				this.startTime1 = '';
				this.endTime1 = '';
			},
			//添加公告重置
			addResetBtn() {
				this.handleReset('formRight');
				this.formRight.checkAllGroup = [];
			},
			//查看详情
			SeeDetails(data, index) {
				this.detailModal = true;
				anPush.searchInformationContent({
						informationId: data.id
					})
					.then((res) => {
						this.detailCon = res;
					})
					.catch((err) => {
						this.$Message.error('查询公告内容失败')
					})
			},
			changePage(Page) {
				this.currentPage = Page;
				anPush.searchInformationList({
						startDate: this.startTime,
						endDate: this.endTime,
						title: this.noticeTit,
						level: this.importanceLevel,
						publishPerson: this.publishiUnit,
						pushStartDate: this.startTime1,
						pushEndDate: this.endTime1,
						currentPage: this.currentPage,
						pageSize: this.pageSize
					})
					.then((res) => {
						this.data = res.informationList;
						this.dataCount = res.total;
						this.currentPage = res.current;
					})
					.catch((err) => {
						this.$Message.error('获取数据失败')
					})
			},
			//添加公告
			addNotice() {
				this.noticeModal = true;
				this.isEdit = false;
				this.title = '添加公告';
				this.getAcount();
				if (!this.formRight.mould) {
					this.handleReset('formRight');
					this.formRight.checkAllGroup = [];
				}
				this.fileArr = [];
				this.idBefore = [];

			},
			//添加/修改公告---提交
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if (this.isEdit === false) { //添加公告---提交
							// 创建上传文件用的formData
							let param = new FormData()
							param.append('hide', 0)
							param.append('title', this.formRight.title)
							param.append('content', this.formRight.text)
							if (this.fileArr.length === 1) {
								param.append('files', this.fileArr[0])
							}
							if (this.fileArr.length > 1) {
								for (var i = 0; i < this.fileArr.length; i++) {
									param.append("files", this.fileArr[i]); // 文件对象   
								}
							}
							param.append('otherUrl', this.formRight.url)
							param.append('level', this.formRight.level)
							param.append('publishPerson', this.formRight.company)

							param.append('pushTime', FormatDate(this.formRight.date))
							param.append('pushAccountIds', this.formRight.checkAllGroup.join(','))
							param.append('template', this.formRight.mould ? 1 : 0)
							param.append('author', this.author)
							param.append('dateTime', FormatDate(new Date()))
							this.params = param
							// 将FormData作为参数用axios上传，此处的axios经过封装
							anPush.addOrUpdateInformation(
									this.params
								)
								.then((res) => {
									this.$Message.success('添加公告成功')
									this.fileArr = []
									this.noticeModal = false;
									this.changePage(1);
								})
								.catch((err) => {
									this.$Message.error('添加公告失败')
								})
						} else { //修改公告---提交
							// 创建上传文件用的formData
							let param = new FormData()
							param.append('id', this.informationId)
							param.append('title', this.formRight.title)
							param.append('content', this.formRight.text)
							// debugger;
							if (this.deleteImageUrl.length === 0) { //如果没有删除图片
								param.append('imageUrl', this.uploadArrNew.join(','))
								param.append('deleteImageUrl', '')
							} else if (0 < this.deleteImageUrl.length < this.uploadArrNew.length) { //如果删除图片
								param.append('imageUrl', this.imageUrl.join(','))
								param.append('deleteImageUrl', this.deleteImageUrl.join(','))
							} else if (this.deleteImageUrl.length === this.uploadArrNew.length) { //如果全部删除图片
								this.imageUrl = [];
								param.append('imageUrl', '')
								param.append('deleteImageUrl', this.deleteImageUrl.join(','))
							}

							if (this.fileArr.length === 1) {
								param.append('files', this.fileArr[0])
							}
							if (this.fileArr.length > 1) {
								for (var i = 0; i < this.fileArr.length; i++) {
									param.append("files", this.fileArr[i]); // 文件对象   
								}
							}
							param.append('otherUrl', this.formRight.url)
							param.append('level', this.formRight.level)
							param.append('publishPerson', this.formRight.company)
							param.append('pushTime', dateToStringByD(this.formRight.date))
							param.append('pushAccountIds', this.formRight.checkAllGroup.join(','))
							param.append('template', this.formRight.mould ? 1 : 0)
							param.append('author', this.author)
							param.append('dateTime', dateToStringByD(new Date()))
							this.params = param
							// 将FormData作为参数用axios上传，此处的axios经过封装
							anPush.addOrUpdateInformation(
									this.params
								)
								.then((res) => {
									this.$Message.success('修改公告成功')
									this.fileArr = []
									this.noticeModal = false;
									this.changePage(this.currentPage);
								})
								.catch((err) => {
									this.$Message.error('修改公告失败')
								})
						}

					} else {
						if (this.isEdit === false) {
							this.$Message.error('添加公告失败');
						} else {
							this.$Message.error('修改公告失败');
						}

					}
				})

			},
			handleReset(name) {
				this.$refs[name].resetFields();
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
			alarmStartTime1(startTime1) {
				this.startTime1 = startTime1;
				this.endTimeOption1 = {
					disabledDate(endTime1) {
						return endTime1 && (endTime1 < new Date(startTime1) || endTime1 > Date.now())
					}
				}
			},
			alarmEndTime1(endTime1) {
				this.endTime1 = endTime1;
				this.startTimeOption1 = {
					disabledDate(startTime1) {
						return startTime1 && (startTime1 > new Date(endTime1) || startTime1 > Date.now())
					}
				}
			},
			showTimePanel(refName) {
				// 此处的onSelectionModeChange方法，就是同点击 选择时间 按钮后触发的方法
				this.$refs[refName].onSelectionModeChange('time');
			}
		},
		created() {
			this.changePage(1);
			this.getNum();
		},
		mounted() {
			this.alarmStartTime(this.startTime);
			this.alarmEndTime(this.endTime);
			this.alarmStartTime1(this.startTime);
			this.alarmEndTime1(this.endTime);
		},
		computed: {
			actionUrl() {
				return `${axios.defaults.baseURL}customer_service/notice_publish/addOrUpdateInformation`
			},
		},
	}
</script>

<style lang="less" scoped="scoped">
	.announcementPush {
		.common-table {
			height: calc(100vh - 300px);
		}
	}

	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}

	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}

	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}

	.pushBtn {
		width: 100%;
		border: none;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}


	.img-button .hideAnn-img {
		margin-top: 6px;
	}

	.pageColor {
		color: #077aa9;
		font-weight: bold;
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

	.detailBox {
		border: 2px solid #fff;
		border-radius: 3px;
		height: 80px;
		line-height: 80px;
		padding: 0 10px;
	}

	.grayBtn {
		background: #dfdfdf;
	}

	.grayBtn:hover {
		background: #dfdfdf;
		border-color: #dfdfdf;
		color: #515a6e;
	}

	.blueBtn {
		background: #1f90b0;
		color: #fff;
	}

	.blueBtn:hover {
		color: #fff;
		background: #1f90b0;
		border-color: #1f90b0;
	}

	.LightBlueBtn {
		background: #d6e2f9;
		border-color: #d6e2f9;
		color: #515a6e;
	}

	.LightBlueBtn:hover {
		background: #d6e2f9;
		border-color: #d6e2f9;
		color: #515a6e;
	}

	.simpleBtn,
	.simpleBtn:hover {
		color: #1f90b0;
		border-color: #1f90b0;
	}

	.publishTxt {
		display: inline-block;
		background: #d6e2f9;
		width: 460px;
		border: 1px solid #d6e2f9;
		border-radius: 3px;
		height: 35px;
		margin-right: 10px;
		text-align: center;
	}
</style>
