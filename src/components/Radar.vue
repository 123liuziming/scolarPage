<template>
 <div id="radar" class="eChartContainer radar"> </div>
</template>

<script>
 // 引入基本模板
 import echarts from 'echarts/lib/echarts'
 // 引入雷达图组件
 import 'echarts/lib/chart/radar'
 // 引入提示框和图例组件
 import 'echarts/lib/component/tooltip'
 import 'echarts/lib/component/legend'
 export default {
  name: "radar-chart",
  mounted(){
   const option = { //创建图表配置数据
    tooltip: {},
    radar: {
     indicator: [{name: '体育', max: '100'}, {name: '数学', max: '100'}, {name: '化学', max: '100'}, {name: '劳动', max: '100'}, {name: '物理', max: '100'}],
     //设置位置
     center: ['50%', '50%'],
     //设置大小
     radius:80
    },
    series: [{
     type: 'radar',
     itemStyle: {normal: {areaStyle: {type: 'default'}}},
     data: [
      {
       value: [58,98,98,64,98],
       name: '各项得分',
       itemStyle: {normal: {color: "green"}}
      }
     ]
    }]
   }
   //初始化图表
   const chartObj = echarts.init(document.getElementById('radar'))
   chartObj.setOption(option)
  }
 }
</script>
<style scoped>
  .eChartContainer.radar {
    width: 20vw;
    height: 40vh;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInTop;
  }
  @media (max-width: 1200px) {
    .eChartContainer.radar{
      padding-bottom: 4vh;
    }
  }
</style>
