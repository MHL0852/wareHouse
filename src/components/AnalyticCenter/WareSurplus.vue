<template>
  <div class="analyze">
    <div class="top"><h4>各货主库存分析</h4></div>
    <div class="body">
      <div class="pie" id="charts">
        <div id="main" ref="analyzePie" style="width: 485px;height:349px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "WareSurplus",
    props:["msg"],
    mounted() {
      let myEchart = echarts.init(this.$refs.analyzePie);
      myEchart.setOption({
        legend: {
          top:17,
          left:20,

          emphasis: {
            label: {
              show: true,
              formatter: "{b}\n{c} ({d}%)",
              position: 'center',
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
        },
          textStyle: {
            color: "#727581"
          },
          orient: 'vertical',
          data: this.msg.names
        },
        color: this.msg.colors,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '60%',
            center: ['50%', '55%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b}'
                }
              },
              labelLine:{show:true}},
            data: ((msg)=> {
              let {names,values}=msg;
              let arr=[];
              for (let i = 0; i < names.length; i++) {
               arr.push({value: values[i], name: names[i]},)
              }
              return arr
            })(this.msg) ,
          }
        ]
      })
    }
  }
</script>

<style scoped>
  .analyze {
    display: inline-block;
    margin:0 0 0 20px;
    padding:0;
    float:left;
    width: 485px;
    height: 400px;
    background: #fff;
  }

  .analyze .top {
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-bottom: 1px solid #e4e5e9
  }

  .analyze .top h4 {
    height: 50px;
    margin:0;
    padding-left: 20px;
    line-height: 50px;
  }

  .pie {
    border-top: 1px solid #5b5f66;
    width: 100%;
    height: 308px;
  }
</style>
