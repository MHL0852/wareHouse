<template>
  <div class="map" id="map" ref="wareContainer">
    <div class="fullScreen" @click="clicks" ref="fullScreen">{{this.isFullScreen?"退出全屏":"全屏展示"}}</div>
    <div id="mapBody" ref="mapBody" :style="{width:'100%',height:'100%'}"></div>
    <div class="info">
      <ul class="top clearfix">
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
  import "@/../node_modules/echarts/map/js/province/shanghai.js"
  import "../../node_modules/echarts/map/js/china.js"
  import "@/../static/map/echarts.min"
  import {util} from "../API"
  import {baseUrl,wareListService,locationService} from '@/libs/constant'

  export default {
    name: "monitor-map",
    data() {
      return {
        isFullScreen:false,
        clicks:()=> {
          let href=window.location.href;
          window.open(href)
        },
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
            num: 0,
          },
          {
            color: "#10c6c7",
            text: "门店",
            num: 0,
          },
          {
            color: "#2375cb",
            text: "车",
            num: 0
          }
        ],
      }

    },
    components: {
      Information
    },
    methods: {
      init() {

        let tip =  window.self === window.top
        if(!tip){
          this.clicks=()=>{
            let href=window.location.href;
            window.open(href)
          }
        }else{
          this.clicks=this.fullScreen;
        }
      },
      fullScreen() {
        let element = document.documentElement;
        let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(this.$refs.wareContainer);
        } else if (typeof window.ActiveXObject !== "undefined") {
          let wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys("{F11}");
          }
        }
      },//全屏
      exitFullscreen() {
        let elem = document;
        if (elem.webkitCancelFullScreen) {
          elem.webkitCancelFullScreen();
        } else if (elem.mozCancelFullScreen) {
          elem.mozCancelFullScreen();
        } else if (elem.cancelFullScreen) {
          elem.cancelFullScreen();
        } else if (elem.exitFullscreen) {
          elem.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else {
          //浏览器不支持全屏API或已被禁用
        }
      },//退出全屏
      screenChange(){
        window.addEventListener("fullscreenchange", () => {
          this.isFullScreen = !this.isFullScreen;
          if(this.isFullScreen){
            this.clicks=this.exitFullscreen
          }else{
            this.clicks=this.fullScreen
          }
        },false);

        window.addEventListener("mozfullscreenchange", function () {
          this.isFullScreen = !this.isFullScreen;
          if(this.isFullScreen){
            this.clicks=this.exitFullscreen
          }else{
            this.clicks=this.fullScreen
          }
        }, false);

        window.addEventListener("webkitfullscreenchange",  ()=> {
          this.isFullScreen = !this.isFullScreen;
          if(this.isFullScreen){
            this.clicks=this.exitFullscreen
          }else{
            this.clicks=this.fullScreen
          }
        }, false);

        window.addEventListener("msfullscreenchange", function () {
          this.isFullScreen = !this.isFullScreen;
          if(this.isFullScreen){
            this.clicks=this.exitFullscreen
          }else{
            this.clicks=this.fullScreen
          }
        }, false);
      },
      getData() {
        let myChart = echarts.init(this.$refs.mapBody);
        window.addEventListener("resize", myChart.resize);
        let ware = [],
          shop = [],
          car = [];
        util(baseUrl, {
          params: {
            serviceName: locationService,
            method: 'findOrgLoc',
          }
        }).then(response => {
          let shops = JSON.parse(response.data.data.shop);
          let wares = JSON.parse(response.data.data.warehouse);
          shops.forEach(item => {
            if (item.longitude && item.latitude) {
              shop.push({
                name: item.name,
                value: [item.longitude, item.latitude, item.city, item.district],
                city: item.city,
                district: item.district,
                address: item.address
              })
            }
          })
          wares.forEach(item => {
            if (item.longitude && item.latitude) {
              ware.push({
                name: item.name,
                value: [item.longitude, item.latitude, item.city, item.district],
                city: item.city,
                district: item.district,
                address: item.address
              })
            }
          });
          !ware[0] ? ware = [
            {name: "一号仓", value: [122.111, 31.125, 200]},
            {name: "一号仓", value: [122.171, 31.025, 200]},
            {name: "一号仓", value: [121.323, 30.675, 200]},
            {name: "一号仓", value: [121.735, 31.425, 200]},
            {name: "一号仓", value: [121.134, 31.025, 200]},
            {name: "一号仓", value: [121.621, 30.625, 200]},
            {name: "一号仓", value: [121.331, 31.55, 200]}
          ] : null;//仓库数据
          !shop[0] ? shop = [
            {name: "一号店", value: [121.111, 31.025, 150]},
            {name: "一号店", value: [121.111, 31.325, 150]},
            {name: "一号店", value: [121.1223, 30.675, 150]},
            {name: "一号店", value: [121.3435, 30.825, 150]},
            {name: "一号店", value: [121.334, 30.925, 150]},
            {name: "一号店", value: [121.421, 31.325, 150]},
            {name: "一号店", value: [121.231, 31.25, 150]}
          ] : null;//店铺数据
          !car[0] ? car = [
            {name: "一号车", value: [122.111, 31.525, 100]},
            {name: "一号车", value: [122.111, 31.325, 100]},
            {name: "一号车", value: [121.1223, 31.675, 100]},
            {name: "一号车", value: [121.3435, 31.825, 100]},
            {name: "一号车", value: [121.334, 31.925, 100]},
            {name: "一号车", value: [121.421, 30.725, 100]},
            {name: "一号车", value: [121.631, 31.25, 100]}
          ] : null;//车辆数据
          this.typeData[0].num=ware.length;
          this.typeData[1].num=shop.length;
          this.typeData[2].num=car.length;
          this.typeD
          let option = {
            color: ["#f6f7f9", "#12dee9", "#2587f2"],//色盘
            geo: {
              map: '上海',
              left: "20%",
              right: "45%",
              roam: true,
              label: {
                emphasis: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
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
            tooltip: {
              formatter: (value) => {
                value = value.data;
                let  name=value.name?value.name:"";
                let city=value.city?value.city:"";
                let district=value.district?value.district:"";
                let address=value.address?value.address:"";
                return name + '\n' + city + '\n' + district + "\n" + address
              }
            },
            // visualMap: {  },
            series: [
              {
                name: "仓库",
                type: "effectScatter",
                coordinateSystem: 'geo',
                symbol: "diamond",
                symbolSize: 13,
                itemStyle: {
                  color: "#f6f7f9",
                  shadowColor: "#f6f7f9",
                  shadowBlur: "10"
                },

                data: ware,
              },
              {
                name: "门店",
                type: "effectScatter",
                coordinateSystem: 'geo',
                symbolSize: 10,
                itemStyle: {
                  color: "#12dee9",
                  shadowColor: "#12dee9",
                  shadowBlur: "10"
                },


                data: shop,
              },
              {
                name: "车",
                type: "scatter",
                coordinateSystem: 'geo',
                symbol: "rect",
                itemStyle: {
                  color: "#2587f2",
                  shadowColor: "2587f2",
                  shadowBlur: "10"
                },

                data: car,
              }
            ]
          };

          myChart.setOption(option);
        }, err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.init();
      this.screenChange();
      this.getData();
    },
  }
</script>

<style scoped>
  .map {
    display: flex;

    font-size: 0.18rem;
    width: 19.2rem;
    height: 9rem;
    background: #2a2c3b;
  }

  .fullScreen{
    position: fixed;
    right: 1%;
    top: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    line-height:20px;
    font-size: 18px;
    color: #fff;
    z-index: 200;
    background: #2a2d3b;
    opacity: 0.5;
  }

  .map .info {
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    width: 4.2rem;
    height: 5.5rem;
  }

  .map .info .top, .bottom {
    width: 4.2rem;
    background: #343643;
  }

  .map .info .top {
    height: 1.7rem;
    margin-bottom: 0.2rem;
  }

  .map .info .top {
    color: #fff;
    padding: 0.255rem 0.83rem 0;
    font-size: 0.2rem;
    font-weight: bold;
  }

  .map .info .type {
    line-height: 0.22rem;
    height: 0.22rem;
    margin-bottom: 0.275rem;
  }

  .map .info span {
    display: inline-block;
    float: left;
  }

  .map .info .num {
    width: 0.5rem;
    height: 0.22rem;
    line-height: 0.22rem;
    text-align: center;
    float: right;
  }

  .map .info .text {
    color: #adaeb0;
  }

  .map .info .tip {
    margin: 0.01rem 0.1rem 0.01rem 0;
    width: 0.35rem;
    height: 0.2rem;
    box-shadow: 0 0 1px 2px #000 inset;
  }

  .map .info .bottom {
    width: 4.2rem;
    height: 3.6rem;
  }
</style>
