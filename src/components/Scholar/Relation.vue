<template>
  <div id="relation" class="eChartContainer relation"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "Relation",
        data() {
            return {
                tableData: [
                    {
                        date: "姓名",
                        name: ""
                    },
                    {
                        date: "H-index",
                        name: 0
                    },
                    {
                        date: "发表论文数",
                        name: 0
                    },
                    {
                        date: "引用总数",
                        name: 0
                    }
                ]
            };
        },
        props: ["coauthors"],
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
                    enterable:true,
                    formatter: function (params) {
                        if (params.data.target) {
                            let tmp = "";
                            let url = "";
                            for(let i = 0; i < params.data.articles.length; i++){
                                url = "'/article?id=" + params.data.articles[i] + "'";
                                tmp += "<div><a href=" + url + ">" + params.data.articles[i] + "</a></div>"
                            }
                            return tmp;
                        } else {
                            return `
                            <div style="display: flex"><img src="https://source.unsplash.com/400x200/" style="width: 120px; height: 120px;padding:5px">
                            <div style="padding-left: 5px; padding-top: 3px ">
                            <strong>
                            ${params.data.name}
                            </strong>

                            <div>
                            北京航空天大学
                            </div>
                            <div style="padding-top: 1px">H-index:1</div>
                            <div style="padding-top: 1px">发表论文数:1</div>
                            <div style="padding-top: 1px">引用总数:100000</div>
                           </div>
                           </div>

                            `
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
                                },
                                symbolSize: 100
                            },

                        ],
                        links: [],
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

            for (let i = 0; i < colorList.length; i++) {
                option.series[0].categories[i] = {};
                option.series[0].categories[i].name = i;
                option.series[0].categories[i].itemStyle = {};
                option.series[0].categories[i].itemStyle.normal = {};
                option.series[0].categories[i].itemStyle.normal.color = {};
                option.series[0].categories[i].itemStyle.normal.color = colorList[i % colorList.length]
            }
            console.log(option.series[0].categories);
            for (let i = 0; i < (this.coauthors.length <= 6 ? this.coauthors.length : 6 ); i++) {
                option.series[0].data[i + 1] = {};
                option.series[0].data[i + 1]["name"] = this.coauthors[i].scholarId;
                option.series[0].data[i + 1]["category"] = i;
                option.series[0].links[i] = {};
                option.series[0].links[i].source = 0;
                option.series[0].links[i].target = i + 1;
                option.series[0].links[i].articles = ["ddd", "ccc", "d11"];
                //option.series.links[i].articles =
            }
            var chartObj = echarts.init(document.getElementById("relation"));
            chartObj.setOption(option);
            window.addEventListener("resize", () => {
                chartObj.resize();
            });
        }
    };
</script>

<style scoped>
  @media (max-width: 1200px) {
    #relation {
      margin-left: 10vw;
      width: 70vw;
    }
  }
</style>
