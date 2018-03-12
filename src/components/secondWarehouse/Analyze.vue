<template>
  <div class="analyze">
    <div class="top"><h4>各货主库存分析</h4></div>
    <div class="body">
      <div class="pie" id="charts">
        <div id="main" ref="analyzePie" style="width: 400px;height:300px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "Analyze",
    props:["msg"],
    mounted() {
      let myEchart = echarts.init(this.$refs.analyzePie);

      this.$http.get(`http://192.168.1.98:8082/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseMonitoringPieChartReport&wareHouseId=${this.$route.params.bid}`).then(response => {
        let res=JSON.parse(response.data.data.data);
        let wareHouseVolumn=res[0].wareHouseVolumn;
        let names=[],
          values=[],
        data=[];
        res.forEach(item=>{
          names.push(item.sellerName);
          values.push(item.totalVolumn);
          wareHouseVolumn-=item.totalVolumn;
          data.push({
            "name":item.sellerName,
            "value":item.totalVolumn
          })
        });
        names.push("仓库空余");
        values.push(wareHouseVolumn);
        data.push({
          name:"仓库空余",
          value:wareHouseVolumn
        });

        myEchart.setOption({
          legend: {
            top:17,
            left:20,

            emphasis: {
              label: {
                show: true,
                formatter: "{b }\n{c}\r({d}%)",
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
            data: names
          },
          color: this.msg.colors,
          series: [
            {
              name: '库存分析',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{b}{d}%'
                  }
                },
                labelLine:{show:true}},
              data: data,
            }
          ]
        })
      }, err => {
        console.log(err);
      });



    }
  }
</script>

<style scoped>
  .analyze {
    display: inline-block;
    margin:10px;
    padding:0;
    float:left;
    width: 420px;
    height: 360px;
    background: #343743;
  }

  .analyze .top {
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: #fff;
    border-bottom: 1px solid #5b5f66
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
