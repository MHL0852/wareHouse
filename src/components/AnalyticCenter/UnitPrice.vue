<template>
  <div class="temperature">
    <div class="top">
      <h4>{{msg.title}}</h4>
    </div>
    <div class="body">
      <div id="charts">
        <div id="main" ref="temperatureLine" style="width: 6.60rem;height:3.29rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "UnitPrice",
    props:["msg"],
    data(){
return{

}
    },
    mounted() {
      let{unitPrice}=this.msg;
      let value=[];
      let myEchart = echarts.init(this.$refs.temperatureLine);
      this.$http.get('https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.fee.server.api.FeeParentService&method=getSellerPerDaySalesAmount&sellerUnikey=d6106b0f9cb5a88a58bfa68807148d5a').then(response => {
        value=JSON.parse(response.data.data.data).perDateCost;
        myEchart.setOption(
          {
            color: ["#b4a0dd"],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              right: '10%'
            },
            xAxis:
              {
                name:'时间',
                type: 'category',
                boundaryGap:false,
                splitArea: {
                  show: true
                },
                axisLine: {
                  show:"true",
                  lineStyle: {
                    color: "#0089cd",
                    width: 1,
                    type: 'solid',
                    opacity: 1,
                  }
                },
                nameTextStyle: {
                  show:"true",
                  color:"#333",
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
                data:unitPrice.date
              },
            yAxis: [
              {
                type: 'value',
                name: '客单价(元)',
                // min: 0,
                // max: 1200,
                // splitNumber:5,
                position: 'left',
                splitArea: {
                  show: true
                },
                splitLine: {
                  show: false,
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
                  color:"#333",
                  fontSize:14,
                  verticalAlign:"top",

                },
                axisLabel: {
                  color:"#727483",
                  formatter: '{value}'
                }
              }
            ],
            series: [
              {
                name:unitPrice.name,
                type:'line',
                symbol:"circle",
                size:6,
                smooth: 0.3,
                data:value
              }
            ]
          }
        )
      }, err => {
        console.log(err);
      });//七日客单价走势
    }
  }
</script>

<style scoped>
  .temperature {
    display: inline-block;
    float: left;
    margin: .20rem 0 0 .20rem;
    padding:0;
    width: 6.60rem;
    height: 3.80rem;
    background: #fff;
  }
  #noUse{
    /*display:none ;*/
  }
  .temperature .top h4{
    color:#555;
    font-size: .18rem;
    line-height: .50rem;
    margin:0;
    padding-left: .20rem;
    border-bottom: 1px solid #e4e5e9
  }
</style>
