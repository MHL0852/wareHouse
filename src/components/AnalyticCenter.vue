<template>
  <div class="analyticCenter">
    <div class="top clearfix">
      <h5>运营监控中心</h5>
      <TopModel v-for="(val,index) in topData" :msg="val" :key="index"></TopModel>
    </div>
    <div class="body clearfix">
      <SevenDay :msg="sevenDay"></SevenDay>
      <WareSurplus :msg="wareSurplus"></WareSurplus>
      <TopTen_month :msg="topTen_month"></TopTen_month>
      <UnitPrice :msg="unitPrice"></UnitPrice>
      <HotCargo v-for="(data,index) in hotCargodata" :msg="data" :key="index"></HotCargo>
    </div>
  </div>
</template>

<script>
  import TopModel from './AnalyticCenter/Topmodel'
  import SevenDay from "./AnalyticCenter/sevenDay"
  import WareSurplus from "./AnalyticCenter/WareSurplus"
  import TopTen_month from "./AnalyticCenter/TopTen_moth"
  import UnitPrice from "./AnalyticCenter/UnitPrice"
  import HotCargo from "./AnalyticCenter/HotCargo"

  export default {
    name: "analytic-center",
    mounted() {
      this.$http.get('https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.fee.server.api.FeeParentService&method=getSellerSalesAmount&type=1&sellerUnikey=d6106b0f9cb5a88a58bfa68807148d5a').then(response => {
        this.topData[0].number = JSON.parse(response.data.data.data).total
      }, err => {
        console.log(err);
      });
      this.$http.get('https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.fee.server.api.FeeParentService&method=getSellerSalesAmount&type=2&sellerUnikey=d6106b0f9cb5a88a58bfa68807148d5a').then(response => {
        this.topData[1].number = JSON.parse(response.data.data.data).total
      }, err => {
        console.log(err);
      });
      this.$http.get('https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.fee.server.api.FeeParentService&method=getSellerSalesAmount&type=3&sellerUnikey=d6106b0f9cb5a88a58bfa68807148d5a').then(response => {
        this.topData[4].number = JSON.parse(response.data.data.data).total
      }, err => {
        console.log(err);
      });
//TODO  头部模块第3/4/6/7个的数据没有

      this.$http.get('https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.fee.server.api.FeeParentService&method=getSellerHotGoods&sellerUnikey=d6106b0f9cb5a88a58bfa68807148d5a').then(response => {
        console.log(response, JSON.parse(response.data.data.data));
        this.hotCargodata[1].data = JSON.parse(response.data.data.data);
      }, err => {
        console.log(err);
      });//七日高消费产品

    },
    data() {
      return {
        topData: [
          {
            title: "昨日销售额",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_01.png"
          },
          {
            title: "本月销售额",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_02.png"
          },
          {
            title: "前置仓库存量",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_03.png"
          },
          {
            title: "最新客户数",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_04.png"
          },
          {
            title: "近七天平均客单价",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_05.png"
          },
          {
            title: "应付物流费",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_06.png"
          },
          {
            title: "代收货款",
            number: 12600,
            unit: "元",
            imgUrl: "../../../static/AnalyticCenter/center_07.png"
          }
        ],
        sevenDay: {//七日业务量趋势
          title: "近七日业务量趋势",
          colors: ['#b9a8df', "#2dc7c7",],
          inventory: {

            name: "销售额",
            value: [120.0, 310.9, 413.0, 1213.2, 7112.6, 5112.7, 2119.6]
          },
          sum: {
            name: "单量",
            value: [1250, 1120.9, 722.0, 524.4, 222.7, 110.7, 20.5]
          },
        },
        wareSurplus: {//右上饼状图数据
          names: ['武宁路二仓', '飞轮路一仓', '海河路仓', '哈高科仓', '花园街仓'],
          colors: ["#2ec8ca", "#b6a2df", "#5bb9f9", "#ffb880", "#d97a80"],
          values: [12.5, 12.5, 10, 5, 60]
        },
        topTen_month: {
          title: "本月前十客户消费额概况",
          company: ['美美', '凤梨', '的厚', '菲力', '凤梨', '汇源', '的厚']
        },
        unitPrice: {//近七天平均客单价走势
          title: "近七天平均客单价走势",
          unitPrice: {
            name: "客单价",
            date: ["周四", "周五", "周六", "周日", "周一", "周二", "周三"],
            value: [600.0, 520.9, 700.0, 823.2, 812.6, 914.7, 689.6]
          },
        },
        hotCargodata: [
          {
            title: "热卖商品TOP10(近七天)",
            data: [
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
            ]
          },
          {
            title: "高消费明星商品TOP10(近七天)",
            data: [
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
            ]
          },
          {
            title: "高频出售商品TOP10(近七天)",
            data: [
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                number: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600
                , unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
              {
                goodsname: "科尔沁冷冻牛肉500g",
                sumprice: 5600,
                unit: "箱"
              },
            ]
          }
        ]
      }
    },
    components: {
      TopModel,
      WareSurplus,
      SevenDay,
      TopTen_month,
      UnitPrice,
      HotCargo
    }
  }
</script>

<style scoped>

  .analyticCenter {
    margin: 0 auto;
    width: 1380px;
    background: #e4e5ea;
  }

  .analyticCenter .top {
    padding: 10px;
    height: 310px;
  }

  .analyticCenter .top h5 {
    margin: 0;
    line-height: 50px;
    font-size: 23px;
    color: #555555;
    padding-left: 10px;
  }

</style>
