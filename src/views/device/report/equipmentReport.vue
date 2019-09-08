<template>
  <div>
    <div class="relative" style="margin-top: -10px;">
			<p class="text-center cBlack fz16 fw700">
				{{'2019年5月份园区风机盘管数据统计报表'}}
			</p>
			<p class="absolute" style="top: 0;right:10px">
				<b class="mr10 fz16 cLightBlue pointer" @click="">【保存】</b>
				<b class="mr10 fz16 cLightBlue pointer" @click="">【输出Excel】</b>
				<b class="fz16 cLightBlue pointer" @click="">【输出PDF】</b>
			</p>
		</div>
    <ul>
      <li>
				<span>统计设备:</span>
				<span class="cOrange ml5">电表、热计量仪表</span>
			</li>
			<li>
				<span>统计范围:</span>
				<span class="cOrange ml5">北区19#楼、25号楼、南区</span>
			</li>
			<li>
				<span>统计日期:</span>
				<span class="cOrange ml5">2019-05-01------2019-05-04</span>
			</li>
		</ul>
    <div class="floor" v-for="item in reportList">
      <p class="mt10">
        <span class="fr">
          <span class="mr20">
            <b>仪表总数:</b>
            <b class="cOrange fz16 ml10">{{item.num}}</b>
          </span>
        </span>
      </p>
			<span class="floorTit mt5">{{item.name}}</span>
			<Table class="mt5 floorTable" width="100%" height="300" border :columns="columns" :data="item.data"></Table>
		</div>
    <div class="mt10">
			<Input v-model="describe" :rows="4" type="textarea" placeholder="统计报表描述/备注:" />
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      describe: '',
      reportList: [
        {
          name: '电计量仪表',
          num: 2,
          data: [
            {
              a: '电表1',
              b: '001',
              c: '同方',
              d: 'A座',
              e: '1层',
              f: '照明',
              g: '在线',
              h: '2019-02-01',
              i: '2020-02-01'
            },
            {
              a: '电表2',
              b: '002',
              c: '同方',
              d: 'A座',
              e: '2层',
              f: '照明',
              g: '在线',
              h: '2019-02-01',
              i: '2020-02-01'
            },
          ]
        },
        {
          name: '热计量仪表',
          num: 2,
          data: [
            {
              a: '热计量01',
              b: '001',
              c: '同方',
              d: 'A座',
              e: '1层',
              f: '-',
              g: '在线',
              h: '2019-02-01',
              i: '-'
            },
            {
              a: '热计量02',
              b: '002',
              c: '同方',
              d: 'A座',
              e: '2层',
              f: '-',
              g: '在线',
              h: '2019-02-01',
              i: '-'
            },
          ]
        }
      ],

      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "设备名称",
          key: "a",
          align: "center"
        },
        {
          title: "设备编号",
          key: "b",
          align: "center"
        },
        {
          title: "品牌",
          key: "c",
          align: "center"
        },
        {
          title: "所属建筑",
          key: "d",
          align: "center"
        },
        {
          title: "计量区域",
          key: "e",
          align: "center"
        },
        {
          title: "计量分项",
          key: "f",
          align: "center"
        },
        {
          title: "设备状态",
          key: "g",
          align: "center"
        },
        {
          title: "初装日期",
          key: "h",
          align: "center"
        },
        {
          title: "最新标定记录",
          key: "i",
          align: "center"
        }
      ],
    }
  }
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
