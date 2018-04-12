<template>
  <div class="inventory">
    <div class="top">
      <h4>{{msg.title}}</h4>
    </div>
    <div class="body">
      <div id="charts">
        <div id="main" ref="inventoryLine" style="width: 9.88rem;height:3.10rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"

  export default {
    name: "temperature",
    props: ["msg"],
    mounted() {
      let {inventory, sum, colors} = this.msg;
      let myEchart = echarts.init(this.$refs.inventoryLine);
      window.addEventListener("resize",myEchart.resize);
      myEchart.setOption(
        {
          color: this.msg.colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            show: true
          },
          legend: {
            data: [inventory.name, sum.name],
            textStyle: {
              color: '#727483'
            }
          },
          xAxis:
            {
              name: '  时间',
              nameLocation: "end",
              nameTextStyle: {
                color: "#fff",
                fontSize: 14,
                align:'left',
                verticalAlign: "bottom",
              },
              axisLabel: {
                color: "#727483",
              },
              type: 'category',
              boundaryGap:
                false,
              axisLine: {
                show: "true",
                lineStyle:
                  {
                    color: "#178ebd",
                    width:
                      2,
                    type:
                      'solid',
                    opacity:
                      1,
                  }
              },
              axisTick: {
                show: true,
                alignWithLabel:
                  true
              },
              splitLine:{
                show:true,
                lineStyle:{
                  color:"#ddd"
                }
              },
              data: ['15:00', '19:00', '23:00', '3:00', '7:00', '11:00', '15:00']
            },
          yAxis: [
            {
              type: 'value',
              name: '库存(方)',
              min: 0,
              max: 1500,
              splitNumber: 6,
              position: 'left',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#008acd"
                }
              },
              nameTextStyle: {
                color: "#fff",
                fontSize: 14,
                verticalAlign: "bottom",

              },
              axisLabel: {
                color: "#727483",

              },
              splitLine:{
                show:true,
                lineStyle:{
                  color:"#ddd"
                }
              },
            },
            {
              type: 'value',
              name: '库存金额(元)',
              min: 0,
              max: 15000,
              splitNumber: 6,
              position: 'right',
              offset: 0,
              splitLine:{
                show:true,
                lineStyle:{
                  color:"#ddd"
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                onZero: true,
                lineStyle: {
                  color: "#008acd"
                }
              },
              nameTextStyle: {
                color: "#fff",
                fontSize: 14,
                verticalAlign: "bottom",

              },
              axisLabel: {
                color: "#727483",

              },
            }
          ],
          series: [
            {
              name: inventory.name,
              type: 'line',
              symbol: "rect",
              areaStyle: {normal: {}},
              size: 6,
              smooth: 0.3,
              data: inventory.value
            },
            {
              name: sum.name,
              type: 'line',
              symbol: "circle",
              areaStyle: {normal: {}},
              size: 6,
              yAxisIndex: 1,
              data: sum.value
            }
          ]
        }
      )
    }
  }

</script>

<style scoped>
  .inventory {
    width: 9.90rem;
    height: 3.60rem;
    margin: .10rem;
    display: inline-block;
    float: left;
    background: #343743;
  }

  .inventory .top {
    width: 100%;
    height: .50rem;
    font-size: .18rem;
    color: #fff;
    border-bottom: 1px solid #5b5f66
  }

  .inventory .top h4 {
    font-size:0.18rem;
    height: .50rem;
    margin: 0;
    padding-left: .20rem;
    line-height: .50rem;
  }
</style>
