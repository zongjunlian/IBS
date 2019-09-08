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
				<img class="mr20" src='../../../../assets/images/device/仪表添加.png' alt="" @click="addMeter()">
				<img src='../../../../assets/images/device/仪表批量添加.png' alt="" @click="addMeterBatch()">
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
				<img class="mr5" src='../../../../assets/images/device/仪表添加.png' alt="">
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
							<label>所属建筑(区域)</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="buid" style='display:inline;' label=' '>
								<!-- <Select v-model.number="formInline.buid" clearable filterable @on-change='buildChangeAdd'>
									<Option v-for="item in buildTypes" :value="item.id" :key="item.id">{{item.name }}</Option>
								</Select> -->
								<Cascader :data="buildTypes" v-model="formInline.buid"  @on-change='buildChangeAdd'></Cascader>
							</FormItem>
						</td>
						<td>
							<label>计量设备</label>
						</td>
						<td style='textAlign:left;padding: 5px 10px'>
							<FormItem prop="area" style='display:inline;' label=' '>
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
				<img class="mr10" src='../../../../assets/images/device/仪表添加.png' alt="">
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
					<img class="mr10" src='../../../../assets/images/device/仪表查看.png' alt="">
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
					<img class="mr10" src='../../../../assets/images/device/仪表查看.png' alt="">
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
							<img src='../../../../assets/images/device/下降.png' class="ml10 fl pointer" style="margin-top: 17px;" alt="" @click="showdetail=true">
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
<script src='./metering.js'></script>

<style lang='less' scoped>
	@import './metering.less';
</style>
