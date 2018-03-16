<template>
  <div class="temperature">
    <div class="top">
      <h4>{{data.title}}</h4>
    </div>
    <div class="body">
      <div id="charts">
        <div id="main" ref="temperatureLine" style="width: 9.00rem;height:3.00rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "temperature",
    props:["data"],
    mounted() {
      let{coldStorage,freeze,electric}=this.data;
      let myEchart = echarts.init(this.$refs.temperatureLine);
      window.addEventListener("resize",myEchart.resize);
      myEchart.setOption(
        {
          color: ["#fd8560", "#9bcb64", "#2ec8cb"],

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '10%'
          },
          toolbox: {
            feature: {
              dataView: {show: false, readOnly: false},
              restore: {show: false},
              saveAsImage: {show: false}
            }
          },
          legend: {
            data:[coldStorage.name, freeze.name, electric.name],
            textStyle:{
              color:'#727483'
            }
          },
          xAxis:
            {
              name:'',
              type: 'category',
              boundaryGap:false,
              axisLine: {
                show:"false",
                lineStyle: {
                  color: "#727483",
                  width: 1,
                  type: 'dashed',
                  opacity: 1,
                }
              },
              nameTextStyle: {
                show:"false",
                color:"#fff",
                fontSize:14,
                verticalAlign:"bottom",

              },
              axisLabel: {
                color:"#727483",
                formatter: '{value}'
              },
              axisTick: {
                show:false,
                alignWithLabel: false
              },
              data: ['15:00','19:00','23:00','3:00','7:00','11:00','15:00']
            },
          yAxis: [
            {
              type: 'value',
              name: '温度',
              min: -5,
              max: 15,
              splitNumber:5,
              position: 'left',
              splitLine: {
                show: false,
                // type:'dashed'
              },
              axisTick:{
                show:false
              },
              axisLine: {
                lineStyle: {
                  color: "#008acd"
                }
              },
              nameTextStyle: {
                color:"#fff",
                fontSize:14,
                verticalAlign:"bottom",

              },
              axisLabel: {
                color:"#727483",
                formatter: '{value} ℃'
              }
            },
            {
              type: 'value',
              name: '电量',
              min: 0,
              max: 12,
              splitNumber:4,
              position: 'right',
              offset: 0,
              splitLine: {
                show: true,
                lineStyle:{
                  color:"#727483",
                  width:0.5,
                  type:"dashed",
                }
              },
              axisTick:{
                show:false
              },
              axisLine: {
                onZero:true,
                lineStyle: {
                  color: "#008acd"
                }
              },
              nameTextStyle: {
                color:"#fff",
                fontSize:14,
                verticalAlign:"bottom",

              },
              axisLabel: {
                color:"#727483",
                formatter: '{value} ℃'
              }
            }
          ],
          series: [
            {
              name:coldStorage.name,
              type:'line',
              symbol:"circle",
              size:6,
              smooth: 0.3,
              data:coldStorage.value
            },
            {
              name:freeze.name,
              type:'line',
              symbol:"diamond",
              size:6,
              data:freeze.value
            },
            {
              name:electric.name,
              type:'line',
              smooth: 0.3,
              size:6,
              yAxisIndex: 1,
              data:electric.value
            }
          ]
        }
      )
    }
  }
</script>

<style scoped>
  .temperature {
    display: inline-block;
    float: left;
    margin: .10rem;
    padding:0;
    width: 9.90rem;
    height: 3.60rem;
    background: #343743;
  }
  .temperature .top h4{
    color:#fff;
    font-size: .18rem;
    line-height: .50rem;
    margin:0;
    padding-left: .20rem;
  }
</style>
