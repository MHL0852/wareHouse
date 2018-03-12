<template>
  <div class="coldStorage clearfix">
    <ul>
      <li class="pie">
        <div class="overPie clearfix">
          <div class="overPieName">
            <img :src="msg.wareAbout.imgUrl" alt="">
            <i>{{msg.wareAbout.wareName}}</i>
          </div>
          <div class="temperature">
            <i class="temperatureNum">{{msg.wareAbout.temperature}}</i>
            <i class="temperatureUnit">℃</i>
          </div>
        </div>
        <div class="isPie" id="isPie">
          <div id="mainPie" ref="mainPie" :style="{width:'100%',height:'120px'}"></div>
          <div class="middleValue">
            <span class="text">{{ratio}}%</span>
          </div>
        </div>
        <div class="underPie">
          <p>库满度</p>
        </div>
      </li>
      <li class="indent setout" v-for="(item,index) in msg.val" :key="index">
        <img :src="item.imgUrl" alt="" class="warePic">
        <div class="wareText">
          <i class="wareNum">{{item.num}}</i><i>{{item.unit}}</i>
        </div>
        <div class="wareText_bottom"><i>{{item.style}}</i></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "topPart",
    props:["msg"],
    data() {
      return {}
    },
    computed:{
      ratio(){
        let {full,cur}=this.msg.wareAbout;
        return Math.round(cur/full*100>100?100:(cur/full*100<0?0:cur/full*100));
      }
    },
    mounted(){
      let myChart = echarts.init(this.$refs.mainPie);
      myChart.setOption({
        color:["#5ec1dc","#344456"],
        series: [{
          radius: ["63%", '83%'],
          name: '销量',
          type: 'pie',
          data: [
            {
            value:'77'
          },
            {
              value:'23'
            }
          ],
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          }
        }]
      })
    },
    components: {}
  }
</script>

<style scoped>
  i {
    font-style: normal;
  }

  .coldStorage {
    position: absolute;
    left: 0;
    width: 100% !important;
    height: 209px !important;
    background: #3E414D;
    border-bottom: 1px #2a2d3b solid;
    top: 0
  }

  .coldStorage ul {
    width: 881px;
    height: 100%;
  }

  .coldStorage, .pie {
    display: inline-block;
    border-right: 1px #2a2d3b solid;
    float: left;
    width: 266px;
    height: 100%;
    background: #3E414D;
  }

  .coldStorage .pie .overPie{
    width: 100%;
    height: 50px;
  }

  .coldStorage .overPieName{
    display: inline-block;
    float:left;
    width: 50%;
    height: 100%;
  }

  .coldStorage .overPieName img{
    width: 40px;
    height: 40px;
    margin: 0 0 0 12px;
    /*vertical-align: -50%;*/
  }

  .coldStorage .overPieName i{
    line-height: 50px;
    color:#9ca1b2;
    font-size:14px;
  }

  .coldStorage .temperature{
    display: inline-block;
    float:right;
    line-height: 50px;
    padding-right: 20px;
    width: 50%;
    text-align: right;
  }

  .coldStorage .temperature i{
    line-height: 50px;
    color:#9ca1b2;
    font-size:14px;
    padding:2px

  }

  .coldStorage .temperature .temperatureNum{
    text-align: right;
    font-size:30px;
    color:#fff;
  }

  .coldStorage .isPie{
    position: relative;
    height: 120px;
    width: 100%;
  }

  .coldStorage .isPie .middleValue{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -32px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .isPie .middleValue .text{
    display: inline-block;
    line-height: 30px;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 24px;
    color:#fff;
    font-weight: bold;

  }

  .coldStorage .underPie{
    text-align: center;
    width: 100%;
  }

  .coldStorage .underPie{
    font-size: 14px;
    color:#9ca1b2;
  }

  .coldStorage .indent {
    display: inline-block;
    float: left;
    height: 100%;
    width: 205px;
    border-right: 1px #2a2d3b solid;
    background: #343743;
    font-size: 14px;
    font-weight: bold;
    color: #9ca1b2;
  }

  .indent .warePic {
    width: 52px;
    height: 52px;
    margin: 40px 0 0 75px
  }

  .indent .wareText {
    margin: 15px auto 10px;
    text-align: center;
  }

  .indent .wareText .wareNum {
    margin-right: 5px;
    font-size: 30px;
    color: #fff;
  }

  .indent .wareText_bottom {
    text-align: center;
  }

</style>
