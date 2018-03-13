<template>
  <div class="inventory">
    <div class="top">
      <h4>{{msg.title}}</h4>
    </div>
    <div class="body">
      <div id="charts">
        <div id="main" ref="inventoryLine" style="width: 8.35rem;height:3.49rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"

  export default {
    name: "sevenDay",
    props: ["msg"],
    mounted() {
      let {inventory, sum, colors} = this.msg;
      let myEchart = echarts.init(this.$refs.inventoryLine);
      myEchart.setOption(
        {
          color: colors,
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
            background:"#000",
            textStyle: {
              color: '#727483'
            }
          },
          xAxis:
            {
              name: '日期',
              nameLocation: "end",
              splitArea: {
                show: true
              },
              nameTextStyle: {
                color: "#333",
                fontSize: 14,
                verticalAlign: "bottom",

              },
              axisLabel: {
                color: "#a8a8a8",

              },
              type: 'category',
              boundaryGap:
                false,
              axisLine: {
                show: "true",
                lineStyle:
                  {
                    color: "#eeeeee",
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
              data: ['2.3', '2.11', '2.15', '2.19', '2.23', '2.27', '3.2']
            },
          yAxis: [
            {
              type: 'value',
              name: '单量',
              min: 0,
              max: 1500,
              splitNumber: 6,
              position: 'left',
              splitArea: {
                show: true
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#008acd"
                }
              },
              nameTextStyle: {
                color: "#333",
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
              name: '销售额',
              min: 0,
              max: 15000,
              splitNumber: 6,
              position: 'right',
              offset: 0,
              splitArea: {
                show: true
              },
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
                color: "#333",
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
              yAxisIndex: 1,
              data: inventory.value
            },
            {
              name: sum.name,
              type: 'line',
              symbol: "circle",
              areaStyle: {normal: {}},
              size: 6,
              yAxisIndex: 0,
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
    width: 8.35rem;
    height: 4.00rem;
    margin: 0 0 0 .20rem;
    display: inline-block;
    float: left;
    background: #fff;
  }

  .inventory .top {
    width: 100%;
    height: .50rem;
    border-bottom: 1px solid #e4e5e9
  }

  .inventory .top h4 {
    color:#555;
    font-size:.18rem;
    height: .50rem;
    margin: 0;
    padding-left: .20rem;
    line-height: .50rem;
  }
</style>
