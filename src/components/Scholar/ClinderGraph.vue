<template>
  <div>
    <div id="clinder" style="width: 100%;height:400px;clear:both"></div>
  </div>
</template>

    <script>
export default {
  name: "Bar",
  props: ["Data"],
  data() {
    return {
      option: {
        //标题配置信息
        title: {
          text: "学者研究兴趣指数",
          textStyle: {
            color: "#B03A5B",
            fontWeight: "bolder"
          },
          left: "center"
        },
        xAxis: {
          type: "category",
          data: "",
          itemStyle: {
            narmal: {
              color: "white"
            },
          },
          axisLabel: {
            //show: true,
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            },
            interval: 0,
            rotate:30
          }
        },
        grid: { // 控制图的大小，调整下面这些值就可以，
             x: 40,
             x2: 100,
             y2: 110,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
         },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 14 //更改坐标轴文字大小
            }
          }
        },
        series: [
          {
            data: "",
            type: "bar",
            barWidth: "70%",
            itemStyle: {
              normal: {
                //每根柱子颜色设置
                color: function(params) {
                  let colorList = [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3",
                    "#4BABDE",
                    "#FFDE76",
                    "#E43C59",
                    "#37A2DA"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            //柱状图上显示数据
            label: {
              show: "true",
              position: "top",
              color: "#FFF",
              fontWeight: "bolder",
              backgroundColor: "black",
              fontSize: "20"
            }
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.Data);
    this.option.xAxis.data = this.Data.map(dt => {
      return dt.t;
    });
    this.option.series[0].data = this.Data.map(dt => {
      return dt.w;
    });
    this.drawBar();
  },
  methods: {
    drawBar: function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("clinder"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
      window.onresize = function() {
      myChart.resize();
    };
    }
  }
};
</script>
    <style scoped>
</style>
