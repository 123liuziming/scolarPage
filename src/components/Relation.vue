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
            return (
                params.data.articles[0] + params.data.articles[1]
            );
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
            fontSize: 12
          }
        }
      },
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 45,
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
                fontSize: 12
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
              },
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
            },
            {
              name: "王承军",
              category: 1,
              draggable: true
            },
            {
              name: "陈卫东",
              category: 1,
              draggable: true
            },
            {
              name: "邹劲松",
              category: 1,
              draggable: true
            },
            {
              name: "赵成",
              category: 1,
              draggable: true
            },
            {
              name: "陈现忠",
              category: 1,
              draggable: true
            },
            {
              name: "陶泳",
              category: 1,
              draggable: true
            },
            {
              name: "王德福",
              category: 1,
              draggable: true
            }
          ],
          links: [
            {
              source: 0,
              target: 1,
              value: "",
              lineStyle:{
                  width:5
              },
              articles:[
                  "AI",
                  "BI"
              ]
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
              source: 1,
              target: 2,
              value: ""
            },
            {
              source: 0,
              target: 5,
              value: ""
            },
            {
              source: 4,
              target: 5,
              value: ""
            },
            {
              source: 2,
              target: 8,
              value: ""
            },
            {
              source: 0,
              target: 12,
              value: ""
            },
            {
              source: 6,
              target: 11,
              value: ""
            },
            {
              source: 6,
              target: 3,
              value: ""
            },
            {
              source: 7,
              target: 5,
              value: ""
            },
            {
              source: 9,
              target: 10,
              value: ""
            },
            {
              source: 3,
              target: 10,
              value: ""
            },
            {
              source: 2,
              target: 11,
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
    const chartObj = echarts.init(document.getElementById("relation"));
    chartObj.setOption(option);
  }
};
</script>

<style scoped>
</style>
