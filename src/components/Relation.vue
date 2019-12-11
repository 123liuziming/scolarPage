<template>
  <div id="relation" class="eChartContainer relation"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Relation",
  data() {
    return {};
  },
  mounted() {
    const option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "item",
        formatter: function(params) {
          if (params.data.target) {
            return params.data.articles[0] + params.data.articles[1];
          } else {
            return (
              "<img src = " + '"https://source.unsplash.com/400x200/"' + ">"
            );
          }
        }
      },
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 18
          }
        }
      },
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 34,
          zoomOnMouseWheel: false,
          categories: [
            {
              name: "self",
              itemStyle: {
                normal: {
                  color: "#009800"
                }
              }
            },
            {
              name: "others",
              itemStyle: {
                normal: {
                  color: "#4592FF"
                }
              }
            }
          ],
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 10
              }
            }
          },
          force: {
            repulsion: 1000
          },
          data: [
            {
              name: "徐贱云",
              draggable: true,
              info: {
                university: "BUAA",
                age: 15
              }
            },
            {
              name: "冯可梁",
              info: "niubi",
              category: 0,
              draggable: true
            },
            {
              name: "邓志荣",
              category: 1,
              draggable: true
            },
            {
              name: "李荣庆",
              category: 1,
              draggable: true
            },
            {
              name: "郑志勇",
              category: 1,
              draggable: true
            },
            {
              name: "赵英杰",
              category: 1,
              draggable: true
            }
          ],
          links: [
            {
              source: 0,
              target: 1,
              value: "",
              lineStyle: {
                width: 5
              },
              articles: ["AI", "BI"]
            },
            {
              source: 0,
              target: 2,
              value: ""
            },
            {
              source: 0,
              target: 3,
              value: ""
            },
            {
              source: 0,
              target: 4,
              value: ""
            },
            {
              source: 0,
              target: 5,
              value: ""
            }
          ],
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 1,
              curveness: 0
            }
          }
        }
      ]
    };
    var chartObj = echarts.init(document.getElementById("relation"));
    chartObj.setOption(option);
    window.onresize = function() {
      chartObj.resize();
    };
  }
};
</script>

<style scoped>
</style>
