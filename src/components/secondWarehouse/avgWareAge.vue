<template>
  <div class="analyze">
    <div class="top"><h4>库龄分析</h4></div>
    <div class="body">
      <div class="pie" id="charts">
        <div id="main" ref="analyzePie" style="width: 100%;height:3rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import {getLacation, util} from "../../API"

  export default {
    name: "avg-ware-age",
    props: ['msg'],
    mounted() {
      let myEchart = echarts.init(this.$refs.analyzePie);

      let option = {
        color:['#fff','#000','#fff'],
        tooltip: {
          formatter: "{b} : {c}天"
        },
        series: [
          {
            name: '平均库龄',
            type: 'gauge',
            radius:'90%',
            axisLine:{
              lineStyle: { // 属性lineStyle控制线条样式
                width: 16,
                color:[[0.2,'#9acb62'],[0.8,'#60c1dd'],[1,'#fd8761']]
              }
            },
            title:{
              color:'#fff',
              offsetCenter:[0,'-30%'],
            },
            axisLabel:{
              distance:2
            },
            splitLine:{
              // show:false
              length:15,
              lineStyle:{
                color:'#fff',
                width:0.3
              }
            },
            axisTick:{
              show:false
            },
            detail: {formatter: '{value}天'},
            data: [{value: 13, name: '平均库龄'}]
          }
        ]
      };
      myEchart.setOption(option)
    }
  }
</script>

<style scoped>
  .analyze {
    display: inline-block;
    margin:.10rem;
    padding:0;
    float:left;
    width: 4.29rem;
    height: 3.60rem;
    background: #343743;
  }

  .analyze .top {
    width: 100%;
    height: .50rem;
    font-size: .18rem;
    color: #fff;
    border-bottom: 1px solid #5b5f66
  }

  .analyze .top h4 {
    font-size:.18rem;
    height: .50rem;
    margin:0;
    padding-left: .20rem;
    line-height: .50rem;
  }

  .pie {
    width: 100%;
    height: 3.08rem;
  }
</style>
