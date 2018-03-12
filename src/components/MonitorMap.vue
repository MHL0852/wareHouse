<template>
  <div class="map" id="map">
    <div id="mapBody" ref="mapBody" :style="{width:'100%',height:'100%'}"></div>
    <div class="info">
      <ul class="top">
        <li class="type clearfix" v-for="(val,index) in typeData" :key="index">
          <span :style="{backgroundColor:val.color}" class="tip"></span>
          <span class="text">{{val.text}}</span>
          <span class="num">{{val.num}}</span>
        </li>
      </ul>
      <div class="bottom">
        <Information :msg="informationData"></Information>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Information from './secondWarehouse/Information'
  import "../../node_modules/echarts/map/js/province/shanghai.js"
  import "../..//node_modules/echarts/map/js/china.js"
  import "../../static/map/echarts.min"

  export default {
    name: "monitor-map",
    data() {
      return {
        informationData: {
          title: "异常消息",
          msg: [
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },
            {
              info: "冷藏库门超时未关",
              date: "2018-3-2 15:32:46",
              imgUrl: "../../../static/SecondWarehouse/ware_error.png"
            },

          ]
        },
        typeData: [
          {
            color: "#d1d1d1",
            text: "仓库",
            num: 18,
          },
          {
            color: "#10c6c7",
            text: "门店",
            num: 160,
          },
          {
            color: "#2375cb",
            text: "车",
            num: 280
          }
        ]

      }

    },
    components: {
      Information
    },
    mounted() {
      let myChart = echarts.init(this.$refs.mapBody);
      let ware = [
        {name: "一号仓", value: [122.111, 31.125, 200]},
        {name: "一号仓", value: [122.171, 31.025, 200]},
        {name: "一号仓", value: [121.323, 30.675, 200]},
        {name: "一号仓", value: [121.735, 31.425, 200]},
        {name: "一号仓", value: [121.134, 31.025, 200]},
        {name: "一号仓", value: [121.621, 30.625, 200]},
        {name: "一号仓", value: [121.331, 31.55, 200]}
      ]
      let shop = [
        {name: "一号店", value: [121.111, 31.025, 150]},
        {name: "一号店", value: [122.111, 31.325, 150]},
        {name: "一号店", value: [121.1223, 30.675, 150]},
        {name: "一号店", value: [121.3435, 30.825, 150]},
        {name: "一号店", value: [121.334, 30.925, 150]},
        {name: "一号店", value: [121.121, 30.325, 150]},
        {name: "一号店", value: [120.631, 31.25, 150]}
      ];
      let car = [
        {name: "一号车", value: [122.111, 31.025, 100]},
        {name: "一号车", value: [122.111, 31.325, 100]},
        {name: "一号车", value: [121.1223, 31.675, 100]},
        {name: "一号车", value: [121.3435, 31.825, 100]},
        {name: "一号车", value: [121.334, 31.925, 100]},
        {name: "一号车", value: [121.421, 30.725, 100]},
        {name: "一号车", value: [121.631, 31.25, 100]}
      ];
      let option = {
        color: ["#f6f7f9", "#12dee9", "#2587f2"],
        geo: {
          map: '上海',
          roam:true,
          itemStyle: {
            normal: {
              color: "#2a2b3c",
              lineStyle: {
                color: "#608bea"
              },
              borderColor: "#608bea",
            },
            emphasis: {					// 高亮状态下的样式
              areaColor: '#343643',
            }
          }
        },
        background: "#2a2b3c",
        // visualMap: {  },
        series: [
          {
            name: "仓库",
            type: "scatter",
            coordinateSystem: 'geo',

            data: ware,
          },
          {
            name: "门店",
            type: "scatter",
            coordinateSystem: 'geo',

            data: shop,
          },
          {
            name: "车",
            type: "scatter",
            coordinateSystem: 'geo',

            data: car,
          }
        ]
      };

      myChart.setOption(option)
    },
  }
</script>

<style scoped>
  .map {
    width: 1920px;
    height: 900px;
    margin: auto;
    position: relative;
    background: #2a2c3b;
  }

  .map .info {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 420px;
    height: 550px;
  }

  .map .info .top, .bottom {
    width: 420px;
    background: #343643;
  }

  .map .info .top {
    height: 170px;
    margin-bottom: 20px;
  }

  .map .info .top {
    color: #fff;
    padding: 25.5px 83px 0;
    font-size: 20px;
    font-weight: bold;
  }

  .map .info .type {
    line-height: 22px;
    height: 22px;
    margin-bottom: 27.5px;
  }

  .map .info span {
    display: inline-block;
    float: left;
  }

  .map .info .num {
    width: 50px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    float: right;
  }

  .map .info .text {
    color: #adaeb0;
  }

  .map .info .tip {
    margin: 1px 10px 1px 0;
    width: 35px;
    height: 20px;
    box-shadow: 0 0 1px 2px #000 inset;
  }

  .map .info .bottom {
    width: 420px;
    height: 360px;
  }
</style>
