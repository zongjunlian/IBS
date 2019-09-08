<template>
  <div :style="size">
    <echarts :options="lineBarOption" ref="lineBarOption" v-if='type==="lineBarOption"'></echarts>
    <echarts :options="widthBarOption" ref="widthBarOption" v-if='type==="widthBarOption"'></echarts>
    <echarts :options="lineOption" ref="lineOption" v-if='type==="lineOption"'></echarts>
    <echarts :options="ringPieOption" ref="ringPieOption" v-if='type==="ringPieOption"'></echarts>
    <echarts :options="rosePieOption" ref="rosePieOption" v-if='type==="rosePieOption"'></echarts>
    <echarts :options="normalPieOption" ref="normalPieOption" v-if='type==="normalPieOption"'></echarts>
    <echarts :options="borderPieOption" ref="borderPieOption" v-if='type==="borderPieOption"'></echarts>
    <echarts :options="lineStackOption" ref="lineStackOption" v-if='type==="lineStackOption"'></echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      lineBarOption:{},
      widthBarOption: {},
      lineOption: {},
      ringPieOption: {},
      rosePieOption: {},
      normalPieOption: {},
      borderPieOption: {},
      lineStackOption:{}
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: Object,
      default: {
        width:'600px', height: '400px',
      }
    },
    name: {
      type: String,
      default: ''
    },
    legend: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    yAxis: {
      type: Array,
      default: () => []
    },
    series: {
      type: Array,
      default: () => []
    },
    colorGroup: {
      type: Array,
      default: () => []
    },
    names: {
      type: Array,
      default: () => []
    },
    stackData: {
      type: Array,
      default: () => []
    },
    symbols: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    // console.log(this.legend,2222)
    let colors = ['#9b92fe', '#7ba5c6', '#1f62ea', '#1990e9', '#49ddfc', '#6bdafe', '#39f381', '#e9e37c']
    //折柱混合图
    this.lineBarOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
      },
      legend: {
        data: this.legend
      },
      xAxis: [
        {
          type: 'category',
          data: this.data,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: this.yAxis,
      series:this.series
    },

    //横向柱状图
    this.widthBarOption = {
      title: {
        text: this.title,
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: this.legend
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01]
      },
      yAxis: {
          type: 'category',
          data: this.yAxis
      },
      series: this.series
    },
    this.lineOption = {
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: this.legend
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data
      },
      // yAxis: {
      //     type: 'value'
      // },
      yAxis: this.yAxis,
      series: this.series
    },

    //环饼图
    this.ringPieOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: this.name,
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '45%'],
            label: {
                show: false
            },
            color: colors,
            data: this.series,
            labelLine: {
              normal: {
                  show: true,
                  length: 5,
                  length2: 5
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside',
                  // formatter: '{b} \n ({d}%)'
                }
              }
            }
        },
        {
          name: this.name,
          type: 'pie',
          radius: ['64%', '85%'],
          color: colors,
          label: {
              show: false
          },
          data: this.data,
            labelLine: {
              normal: {
                  show: true,
                  length: 10,
                  length2: 10
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b}({d}%)'
                }
              }
            }
        }
      ]
    },

    //玫瑰饼图
    this.rosePieOption = {
      series: [{
          type: 'pie',
          radius: [30, '55%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          color: ['#959393', '#E61E24', '#FF9900', '#B6B33F', '#259C25' ],
          data:this.series,
          label: {
            normal: {
                textStyle: {
                    fontSize: 14
                },
            }
          },
          labelLine: {
              normal: {
                  smooth: true,
                  lineStyle: {
                      width: 2
                  }
              }
          },
          itemStyle: {
              normal: {
                  shadowBlur: 30,
                  shadowColor: 'rgba(0, 0, 0, 0.4)'
              }
          },
      }]
    },

    //普通饼图
    this.normalPieOption = {
    // tooltip : {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b} : {c} ({d}%)"
    // },
      series : [
          {
              name: this.name,
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.series,
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    },

    //带光圈的饼图
    this.borderPieOption = {
      grid: {
          bottom: 150,
          left: 100,
          right: '10%'
      },
      legend: {
          orient: 'vertical',
          top: "middle",
          right: "5%",
          textStyle: {
              color: '#666',
              fontSize: 25,

          },
          icon: 'roundRect',
          data: this.legend
      },
      series: [
        // 主要展示层的
        {
          radius: ['0%', '59%'],
          center: ['50%', '50%'],
          type: 'pie',
          label: {
            normal: {
              show: true,
            //  formatter: "{c}%",
              textStyle: {
                fontSize: 30,

              },
              position: 'outside'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: true
            }
          },
          name: "民警训练总量",
          data: this.series,
        },
        {
          name: '外边框',
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          center: ['50%', '50%'],
          radius: ['65%', '65%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 9,
            name: '',
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#e1e1e1'
              }
            }
          }]
        },
      ]
    },


    //折线堆叠图
    this.lineStackOption =  {
      // title: {
      //   text: '堆叠区域图'
      // },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data: this.legend
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : this.data
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : []
    }
    this.lineStackOption.series = []
    for(var i=0 ; i<this.stackData.length;i++){
      const series =  {
          name: 'a',
          type:'line',
          stack: '总量',
          symbolSize: 8,
          symbol: 'circle',
          areaStyle: {normal: {color:'#f00'}},
          lineStyle: {
          normal: {
            color:'#f00'
					}
          },
          itemStyle: {
            normal: {
              color: '#f00'
					},
          },
          data:[]
        }
      this.lineStackOption.series.push(series)
    }
    this.stackData.forEach((item,index) => {
      this.lineStackOption.series[index].data =item
    })
    this.names.forEach((item,index) => {
      this.lineStackOption.series[index].name = item
    })
    this.colorGroup.forEach((item,index) => {
      this.lineStackOption.series[index].areaStyle.normal.color = item
      this.lineStackOption.series[index].lineStyle.normal.color = item
      this.lineStackOption.series[index].itemStyle.normal.color = item
      // this.lineStackOption.series[0].itemStyle.normal.color = '#fff'
      // this.lineStackOption.series[index].borderColor = item
    })
    this.symbols.forEach((item,index) => {
      this.lineStackOption.series[index].symbol = item
    })
  }
}
</script>