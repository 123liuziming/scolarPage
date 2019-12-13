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
        props: ["coAuthors"],
        mounted() {
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
            let option = {
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "item",
                    formatter: function (params) {
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
                        symbolSize: 90,
                        zoomOnMouseWheel: false,
                        categories: [
                            /*{
                                name: "self",
                                itemStyle: {
                                    normal: {
                                        color: colorList[0]
                                    }
                                }
                            },
                            {
                                name: "others",
                                itemStyle: {
                                    normal: {
                                        color: colorList[1]
                                    }
                                }
                            }

                             */
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
                            repulsion: 4000
                        },
                        data: [
                            {
                                name: "Sandra S. Hargett",
                                draggable: true,
                                info: {
                                    university: "BUAA",
                                    age: 15
                                }
                            },

                        ],
                        links: [
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
            option.series[0].categories = [];
            for(let i = 0; i < colorList.length; i++){
                option.series[0].categories[i] = {};
                option.series[0].categories[i].name = i;
                option.series[0].categories[i].itemStyle = {};
                option.series[0].categories[i].itemStyle.normal = {};
                option.series[0].categories[i].itemStyle.normal.color = {};
                option.series[0].categories[i].itemStyle.normal.color = colorList[i % colorList.length]
            }
            console.log(option.series[0].categories);
            for(let i = 0; i < this.coAuthors.length; i++){
                option.series[0].data[i + 1] = {};
                option.series[0].data[i + 1]["name"] = this.coAuthors[i].scholarId;
                option.series[0].data[i + 1]["category"] = i;
                option.series[0].links[i] = {};
                option.series[0].links[i].source = 0;
                option.series[0].links[i].target = i + 1;
                //option.series.links[i].articles =
            }
            var chartObj = echarts.init(document.getElementById("relation"));
            chartObj.setOption(option);
            window.onresize = function () {
                chartObj.resize();
            };
        }
    };
</script>

<style scoped>
  @media (max-width: 1200px) {
    #relation {
      margin-left: 10vw;
      width: 30vw;
    }
  }
</style>
