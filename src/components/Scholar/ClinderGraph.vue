<template>
  <div>
    <div id="clinder" style="width: 100%;height:400px;clear:both;margin-top: 3vh"></div>
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
                            rotate: 30
                        }
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 35,
                        x2: 65,
                        y2: 130,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#c3dbff", //更改坐标轴文字颜色
                                fontSize: 14 //更改坐标轴文字大小
                            }
                        },
                        minInterval: 1
                    },
                    series: [
                        {
                            data: "",
                            type: "bar",
                            barWidth: "70%",
                            itemStyle: {
                                normal: {
                                    //每根柱子颜色设置
                                    color: function (params) {
                                        let colorList = [
                                            "#8B2323",
                                            "#c23531",
                                            "#E43C59",
                                            "#ca8622",
                                            "#d48265",
                                            "#8A2BE2",
                                            "#8B5742",
                                            "#8B864E",
                                            "#8B7500",
                                            "#FFDE76",
                                            "#228B22",
                                            "#7CCD7C",
                                            "#7CCD7C",
                                            "#7EC0EE",
                                            "#61a0a8",
                                            "#2f4554",
                                            "#191970",
                                            "#37A2DA",
                                            "#00E5EE",

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
            this.option.xAxis.data = this.Data.map((dt, index) => {
                if (index === 0)
                    return dt.t.substr(0, 10) + "...";
                else if (index === 1)
                    return dt.t.substr(0, 15) + "...";
                else if (dt.t.length >= 25)
                    return dt.t.substr(0, 25) + "...";
                else
                    return dt.t;
            });
            this.option.series[0].data = this.Data.map(dt => {
                return dt.w;
            });
            var myChart = this.$echarts.init(document.getElementById("clinder"));

            myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        }
    };
</script>
<style scoped>
</style>
