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
        props: ["coauthors", "selfinfo"],
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
                    alwaysShowContent:true,
                    formatter: function (params) {
                        if (params.data.target) {
                            let tmp = "";
                            let url = "";
                            for(let i = 0; i < params.data.articles.length; i++){
                                url = "'/article?ID=" + params.data.articlesid[i] + "'";
                                tmp += "<li><a href=" + url + ">" + (params.data.articles[i].length > 40 ? params.data.articles[i].substr(0, 35) + "..." : params.data.articles[i])  + "</a></li>"
                            }
                            return tmp;
                        } else {
                            return `
                            <div style="display: flex">
                            <div style="padding-left: 5px; padding-top: 3px ">
                            <h4>
                            <strong>
                            ${params.data.name}
                            </strong>
                            </h4>
                            <li>
                            ${params.data.org}
                            </li>
                            <li style="padding-top: 1px">H-index:${params.data.hindex}</li>
                            <li style="padding-top: 1px">发表论文数:${params.data.npubs}</li>
                            <li style="padding-top: 1px">引用总数:${params.data.ncitation}</li>
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
                                name: this.selfinfo.name,
                                org:this.selfinfo.orgs[0]? (this.selfinfo.orgs[0].length > 40 ? this.selfinfo.orgs[0].substr(0, 35) + "..." : this.selfinfo.orgs[0]) : "no search institute",
                                hindex:this.selfinfo.hIndex,
                                ncitation:this.selfinfo.nCitations,
                                npubs:this.selfinfo.nPubs,
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
            let len = this.coauthors.length;
            for (let i = 0; i < len; i++) {
                option.series[0].categories[i] = {};
                option.series[0].categories[i].name = i;
                option.series[0].categories[i].itemStyle = {};
                option.series[0].categories[i].itemStyle.normal = {};
                option.series[0].categories[i].itemStyle.normal.color = {};
                option.series[0].categories[i].itemStyle.normal.color = colorList[i % colorList.length]
            }
            //console.log(option.series[0].categories);
            for (let i = 0; i < len; i++) {
                if(this.coauthors[i].name){
                    option.series[0].data[i + 1] = {};
                    option.series[0].data[i + 1]["name"] = this.coauthors[i].name;
                    let str = !this.coauthors[i].orgs[0] ? "no search institute" : this.coauthors[i].orgs[0];
                    if(str.length > 40)
                        str = str.substr(0, 35) + "...";
                    option.series[0].data[i + 1]["org"] = str;
                    option.series[0].data[i + 1]["hindex"] = this.coauthors[i].h_index;
                    option.series[0].data[i + 1]["ncitation"] = this.coauthors[i].n_citation;
                    option.series[0].data[i + 1]["npubs"] = this.coauthors[i].n_pubs;
                    option.series[0].data[i + 1]["id"] = i;
                    option.series[0].data[i + 1]["symbolSize"] = 100 + 1.5 * this.coauthors[i].papers.length;
                    option.series[0].data[i + 1]["scid"] = this.coauthors[i].scholarId;
                    option.series[0].data[i + 1]["category"] = i + 1;
                    option.series[0].links[i] = {};
                    option.series[0].links[i].source = 0;
                    option.series[0].links[i].target = i + 1;
                    option.series[0].links[i].articles = this.coauthors[i].papers.map(item => item.title);
                    option.series[0].links[i].articlesid = this.coauthors[i].papers.map(item => item.paperId);
                }
            }
            let chartObj = echarts.init(document.getElementById("relation"));
            chartObj.setOption(option);
            let data=chartObj._model.option.series[0].data;
            chartObj.on("click", function (chartParam){
                window.location.href = "/main?ID=" + data[chartParam.dataIndex].scid;
            });
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
