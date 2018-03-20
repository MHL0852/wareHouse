<template>
  <div class="back" ref="wareContainer">
    <div class="container">
      <div class="fullScreen" @click="clicks" ref="fullScreen">{{this.isFullScreen?"退出全屏":"全屏展示"}}</div>
      <div class="nav">
        <router-link :to="{name:'firstwarehouse'}">
          <div class="comeToFirst">
            <img :src="topData.backUrl" alt="">
          </div>
        </router-link>

        <TopLeft v-for="(data,index) in topData.allRepertory" :msg="data" :key="index+1000.2"></TopLeft>
        <TopMiddle :cold="topData.coldStorage" :freeze="topData.freeze"></TopMiddle>
        <TopRight v-for="(data,index) in topData.topRight" :msg="data" :key="index+100.1"></TopRight>
      </div>
      <div class="body clearfix">
        <div class="bodyLeft clearfix">
          <Analyze :msg="bodyData.analyze"></Analyze>
          <Temperature :data="bodyData.temperature"></Temperature>
          <Inventory :msg="bodyData.inventory"></Inventory>
          <div class="informationBox clearfix">
            <Information :msg="bodyData.information"></Information>
          </div>
        </div>
        <div class="bodyRight">
          <div class="on_off_box clearfix">
            <Information :msg="bodyData.on_off"></Information>
          </div>
          <div class="video">
            <div class="videoContent">
              <img :src="bodyData.videoUrl" alt="">
              <span>视频监控</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopLeft from './secondWarehouse/TopLeft'
  import TopMiddle from "./secondWarehouse/TopMiddle"
  import TopRight from "./secondWarehouse/TopRight"
  import Analyze from "./secondWarehouse/Analyze"
  import Temperature from "./secondWarehouse/temperature"
  import Inventory from "./secondWarehouse/Inventory"
  import Information from "./secondWarehouse/Information"
  import {getLacation} from "../API"

  let timer;

  export default {
    name: "second-warehouse",
    data() {

      return {
        isFullScreen:false,
        clicks:()=> {
          let element = window.parent.document.documentElement;
          let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
          if (requestMethod) {
            let myIframe=window.parent.document.getElementsByTagName("iframe")[0];
            requestMethod.call(myIframe);
          } else if (typeof window.ActiveXObject !== "undefined") {
            let wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
              wscript.SendKeys("{F11}");
            }
          }
        },
        topData: {//头部数据
          backUrl:"../../static/SecondWarehouse/fanhui.png",
          allRepertory: [
            {//总库存
              title: "当前库存总量",
              number: 8000,
              unit: "方",
              imgUrl: "../../../static/SecondWarehouse/ware_top1_01.png"
            },
            {//总库存
              title: "库满度",
              number: "30",
              unit: "%",
              imgUrl: "../../../static/SecondWarehouse/ware_top1_02.png"
            }
          ],
          coldStorage: {
            imgUrl: "../../../static/SecondWarehouse/ware_top1_03.png",
            name: "冷藏库温度",
            value: 5,
            unit: "℃"
          },
          freeze: {
            imgUrl: "../../../static/SecondWarehouse/ware_top1_04.png",
            name: "冷冻库温度",
            value: -10,
            unit: "℃"
          },
          topRight: [
            {
              title: "待备货量",
              imgUrl: "../../../static/SecondWarehouse/ware_top1_05.png",
              num1: 56,
              num2: 168,
              unit1: "单",
              unit2: '件'
            },
            {
              title: "待发货量",
              imgUrl: "../../../static/SecondWarehouse/ware_top1_06.png",
              num1: 57,
              num2: 168,
              unit1: "单",
              unit2: '件'
            },
            {
              title: "今日已完成货量",
              imgUrl: "../../../static/SecondWarehouse/ware_top1_05.png",
              num1: 98,
              num2: 768,
              unit1: "单",
              unit2: '件'
            }
          ],

        },
        bodyData: {//主体表格数据
          analyze: {//左上饼状图数据
            names: ['飞轮', '槲叶食品', '柯贤度', '活力食品', '飞鹤'],
            colors: ["#fe8563", "#9acb62", "#fad960", "#60c1dd", "#0085c5"],
            values: [12.5, 12.5, 10, 5, 60]
          },
          temperature: {//温度与电量监控数据
            title: "近24小时温度及电量监控",
            coldStorage: {
              name: "冷藏库温度",
              value: [12.0, 10.9, 13.0, 13.2, 12.6, 14.7, 9.6]
            },
            freeze: {
              name: "冷冻库温度",
              value: [0, 0.9, 2.0, 4.4, 2.7, 0.7, -0.5]
            },
            electric: {
              name: "电量",
              value: [4.6, 5.9, 6.0, 6.4, 8.7, 9.7, 8.5]
            }
          },
          inventory:
            {//库存量及库存金额监控
              title: "近24小时收库存量及库存金额监控",
              colors: ["#99ce63", '#ffe963'],
              inventory: {

                name: "库存量",
                value: [120.0, 210.9, 613.0, 1213.2, 712.6, 214.7, 119.6]
              },
              sum: {
                name: "库存金额",
                value: [0, 120.9, 322.0, 1224.4, 12222.7, 11210.7, 11120.5]
              },
            },
          information: {
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
          on_off: {
            title: "冷库开关门日志",
            msg: [
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_open.png"
              },
              {
                info: "冷藏库门",
                date: "2018-3-2 15:32:46",
                imgUrl: "../../../static/SecondWarehouse/ware_close.png"
              },

            ]
          },
          videoUrl: "../../../static/SecondWarehouse/ware_camera.png"
        }
      }
    },
    methods: {
      fullScreen() {
        let element = window.parent.document.documentElement;
        let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          let myIframe=window.parent.document.getElementsByTagName("iframe")[0];
          requestMethod.call(myIframe);
        } else if (typeof window.ActiveXObject !== "undefined") {
          let wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys("{F11}");
          }
        }
      },//全屏
      exitFullscreen(){
        let elem = window.parent.document;
        if(elem.webkitCancelFullScreen){
          elem.webkitCancelFullScreen();
        }else if(elem.mozCancelFullScreen){
          elem.mozCancelFullScreen();
        }else if(elem.cancelFullScreen){
          elem.cancelFullScreen();
        }else if(elem.exitFullscreen){
          elem.exitFullscreen();
        }else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }else{
          //浏览器不支持全屏API或已被禁用
        }
      },//退出全屏
      screenChange(){
        let element = window.parent.document.documentElement;
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

        element.addEventListener("webkitfullscreenchange",  ()=> {
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
        this.$http.get(`${getLacation}?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseMonitoringReport&wareHouseId=${this.$route.params.bid}`).then(response => {
          let res = JSON.parse(response.data.data.data);

          this.topData.topRight[0].num1 = res.waitPickUpOrderNum;
          this.topData.topRight[0].num2 = res.waitPickUpGoodsNum;

          this.topData.topRight[1].num1 = res.waitSendOrderNum;
          this.topData.topRight[1].num2 = res.waitSendGoodsNum;

          this.topData.topRight[2].num1 = res.overOrderNumToday;
          this.topData.topRight[2].num2 = res.overGoodsNumToday;
        }, err => {
          console.log(err);
        });

        this.$http.get(`${getLacation}?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseInventoryMessageReport&wareHouseId=${this.$route.params.bid}`).then(response => {
          let res = response.data.data.data?JSON.parse(response.data.data.data):{};

          let cur=(res.temperateVolume +res.coldVolume +res.freezeVolume)||0;
          let full=(res.temperateVolumeTotal  +res.coldVolumeTotal  +res.freezeVolumeTotal)||0;

          this.topData.allRepertory[0].number = cur;
          let ratio = cur / full < 1 ? cur / full * 100 : 100;
          ratio = ratio > 0 ? ratio : 0;
          this.topData.allRepertory[1].number = Math.round(ratio);
        }, err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.screenChange();
      this.getData();
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
        this.getData()
      }, 120000)
    },
    components: {
      TopLeft,
      TopMiddle,
      TopRight,
      Analyze,
      Temperature,
      Inventory,
      Information
    }
  }
</script>

<style scoped>
  .back {
    margin: 0 auto;
    padding: 0;
    width: 19.20rem;
    min-width: 1000px;
    height: 9.00rem;
    background: #2a2d3b;
  }
  .comeToFirst{
    width: .75rem;
    height: 1rem;
    margin:.1rem;
    background: #343743;
  }

  .fullScreen{
    position: fixed;
    right: 1%;
    top: 20px;
    width: 40px;
    height: 40px;
    line-height:20px;
    font-size: 18px;
    color: #fff;
    z-index: 200;
    background: #2a2d3b;
    opacity: 0.5;
  }

  .comeToFirst img{
    float: left;
    margin-top:.15rem;
    width: .7rem;
    height: .7rem;
    display: inline-block;
  }

  .back .container {
    padding: .09rem;
    margin: 0;
  }

  .back .container .nav {
    width: 19.01rem;
    height: 1.20rem;
  }

  .back .container .body {
    width: 19.00rem;
    height: 7.35rem;
  }

  .container .body .bodyLeft {
    width: 14.50rem;
    display: inline-block;
    float: left;
  }

  .container .body .bodyRight {
    width: 4.30rem;
    height: 6.25rem;
    display: inline-block;
    float: right;
    margin: .09rem;
  }

  .container .informationBox {
    display: inline-block;
    float: left;
    width: 4.20rem;
    height: 3.60rem;
    margin: .09rem;
  }

  .container .on_off_box {
    width: 4.29rem;
    height: 6.07rem;
    background: #343743;
  }

  .body .bodyRight .video {
    position: relative;
    background: #0085c5;
    width: 4.29rem;
    height: 1.06rem;
    margin-top: .24rem;
  }

  .body .video .videoContent {
    padding: 0 .09rem 0;
    display: block;
    height: .30rem;
    width: 2.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -.145rem 0 0 -1.1rem;
  }

  .video .videoContent img {
    display: inline-block;
    float: left;
  }

  .video .videoContent span {
    display: inline-block;
    float: left;
    margin-left:.2rem;
    line-height: .30rem;
    font-size: .28rem;
    color: #fff;
  }
</style>
