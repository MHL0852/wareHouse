<template>
  <div class="wareContainer" ref="wareContainer">
    <ul class="warehouseList clearfix">
      <li class="fullScreen clearfix" @click="clicks" ref="fullScreen">{{this.isFullScreen?"退出全屏":"全屏展示"}}</li>
      <router-link v-for="(itemWare,index) in wareList" :key="index" :to="{name:'wareDetail',params:{bid:itemWare.id}}"
                   tag="li">
        <Part :msg="itemWare"></Part>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import TopPart from './FirstWarehouse/left/TopPart'
  import ButtonPart from './FirstWarehouse/left/ButtonPart'
  import Part from "./FirstWarehouse/part"
  import {getLacation,util} from "../API/index"
  import {baseUrl,wareListService} from '../libs/constant'

  export default {
    name: "first-warehouse",
    data() {
      return {
        clicks() {
          let href=window.location.href;
          window.open(href)
        },
        isFullScreen: false,
        wareList: []
      }
    },
    methods: {
      init() {
        let isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        let tip = window.self === window.top;
        this.isFullScreen = isFullScreen? true: false;
        if (!tip) {
          this.clicks = () => {
            let href=window.location.href;
            window.open(href)
          }
        } else {
          if(this.isFullScreen){
            this.clicks=this.exitFullscreen
          }else{
            this.clicks=this.fullScreen
          }
        }
      },
      fullScreen() {
        let element = document.documentElement;
        let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(document.children[0]);
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
      getData() {
        util(baseUrl, {
          params: {
            serviceName: wareListService,
            method: 'warehouseReport',
            pageNumber: 1,
            pageSize: 4
          }
        }).then(response => {
          this.wareList = JSON.parse(response.data.data.page).result;
        }, err => {
          console.log(err);
        });
      },//获取数据
      screenChange() {
        window.addEventListener("fullscreenchange", () => {
          this.isFullScreen = document.fullscreenElement ? true : false;
          if (this.isFullScreen) {
            this.clicks = this.exitFullscreen
          } else {
            this.clicks = this.fullScreen
          }
        }, false);

        window.addEventListener("mozfullscreenchange", function () {
          this.isFullScreen = document.mozFullScreenElement ? true : false;
          if (this.isFullScreen) {
            this.clicks = this.exitFullscreen
          } else {
            this.clicks = this.fullScreen
          }
        }, false);

        window.addEventListener("webkitfullscreenchange", (e) => {
          this.isFullScreen = document.webkitFullscreenElement ? true : false;
          if (this.isFullScreen) {
            this.clicks = this.exitFullscreen
          } else {
            this.clicks = this.fullScreen
          }
        }, false);

        window.addEventListener("msfullscreenchange", function () {
          this.isFullScreen = document.msFullscreenElement ? true : false;
          if (this.isFullScreen) {
            this.clicks = this.exitFullscreen
          } else {
            this.clicks = this.fullScreen
          }
        }, false);
      }
    },
    mounted() {
      this.init();
      this.screenChange();
      this.getData()
    },
    components: {
      TopPart,
      ButtonPart,
      Part
    }
  }
</script>

<style scoped>
  html, body {
    width: 100%;
    height: 100%;
    margin: auto;
    background: #2a2d3b;
  }

  .wareContainer {
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*padding: 0;*/
    /*margin:-4.5rem 0 0 -9.6rem;*/

    display: flex;
    width: 19.2rem;
    height: 9rem;

    background: #2a2d3b;
  }

  .fullScreen {
    width: 40px;
    height: 40px;
    line-height: 20px;
    cursor: pointer;
    margin: -20px 0 0 -20px;
    position: absolute;
    font-size: 18px;
    color: #fff;
    z-index: 200;
    top: 50%;
    left: 50%;
    background: #2a2d3b;
    opacity: 0.5;
  }

  .fullScreen:-moz-full-screen {
    background: red;
  }

  .fullScreen:-webkit-full-screen {
    background: red;
  }

  .fullScreen:fullscreen {
    background: red;
  }

  .wareContainer .warehouseList {
    position: relative;
    width: 19.2rem;
    margin: auto;
    height: 9rem;
    overflow: hidden;
    padding: 0.1rem;
  }
</style>
