<template>
  <div>
      <MyCharts  :legend='legend' :data='xdata' :yAxis='yAxis' :series='series' type="lineBarOption"></MyCharts>
      <MyCharts  :legend='widthLegend'  :yAxis='widthyAxis' :series='widthSeries' type="widthBarOption"></MyCharts>
      <MyCharts  :legend='lineLegend'  :series='lineSeries' type="lineOption"></MyCharts>
      <MyCharts  :name='name' :series='pieData' :data='ringData' type="ringPieOption" ></MyCharts>
      <MyCharts  :series='roseData' :data='ringData' type="rosePieOption" ></MyCharts>
      <MyCharts  :series='normalData' type="normalPieOption"></MyCharts>
      <!---带光圈的饼图---->
      <MyCharts  :series='borderData' type="borderPieOption" :legend='borderlegend'></MyCharts>
      <!--折线堆叠图-->
      <MyCharts  type="lineStackOption" :legend='names' :colorGroup='colors' :data='data' :stackData='stackseries' :names='names' :symbols='symbols'></MyCharts>
      <!-- <WidthBarChart  :legend='widthLegend' :yAxis='widthyAxis' :series='widthSeries'></WidthBarChart> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      legend:['蒸发量','平均温度'],
      xdata:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      yAxis: [{
            type: 'value',
            name: '水量ml',
        },
        {
            type: 'value',
            name: '温度℃',
        },],
        series:[
          {
            name:'蒸发量',
            type:'bar',
            color:'#FF8051',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'平均温度',
            type:'line',
            color:'#a6c8db',
            yAxisIndex: 1,
            data:[1.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
        ],



        widthLegend: ['2011年'],
        widthyAxis:  ['巴西','印尼','美国','印度','中国','世界人口(万)'],
        widthSeries: [  {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        }],


        lineLegend: ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
        linexdata: ['周一','周二','周三','周四','周五','周六','周日'],
        lineSeries:[
            {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            symbolSize: 5,
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            smooth: true,
            symbol: 'Rect',
            symbolSize: 5,
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            symbol: 'diamond',
            symbolSize: 5,
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            smooth: true,
            symbol: 'triangle',
            symbolSize: 5,
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
        ],


        name: '访问来源',
        pieData: [ {
          value: 335,
          name: '直达'
        },
        {
            value: 679,
            name: '营销广告',
            selected: true
        }],
        ringData:[
          {
              value: 335,
              name: '直达'
          },
          {
              value: 310,
              name: '邮件营销'
          },
          {
              value: 234,
              name: '联盟广告'
          },
          {
              value: 135,
              name: '视频广告'
          },
          {
              value: 1048,
              name: '百度'
          },
        ],


        roseData: [{
            value: 10,
            name: '1星占比'
        }, {
            value: 30,
            name: '2星占比'
        }, {
            value: 53,
            name: '5星占比'
        }],


        normalData: [{value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}],
        borderlegend: ['1','2','3','4'],
        borderData: [
            {
                "name": "1",
                "value": 10
            }, {
                "name": "2",
                "value": 50
            }, {
                "name": "3",
                "value": 20
            }, {
                "name": "4",
                "value": 10
            }, ],


            

            names: ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
            stackseries: [[-120, -132, -101, -134, -90, -230, -210],[220, 182, 191, 234, 290, 330, 310],[150, 232, 201, 154, 190, 330, 410],[320, 332, 301, 334, 390, 330, 320],[820, 932, 901, 934, 1290, 1330, 1320]],
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            colors: ['rgba(47, 194, 91, 0.4)','rgba(233, 233, 57, 0.8)','rgba(100, 104, 211, 0.6)','rgba(140, 206, 251, 0.8)','rgba(246, 129, 86, 0.3)'],
            symbols: ['circle', 'rect', 'roundRect', 'triangle', 'diamond']
    }
  },
  mounted () {
     
  }
}

</script>
