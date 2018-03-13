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
            <i class="temperatureUnit">℃</i>
            <i class="temperatureNum">{{msg.wareAbout.temperature}}</i>
          </div>
        </div>
        <div class="isPie" id="isPie">
          <div id="mainPie" ref="mainPie" :style="{width:'100%',height:'1.20rem'}"></div>
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
      return {
        full:"无参数",
        cur:0,
        a:null,
      }
    },
    computed:{
      ratio(){
        let {full,cur}=this.msg.wareAbout;
        return Math.round(cur/full<0?0:(cur/full<1?cur/full*100:100));
      }
    },
    updated(){
      let myChart = echarts.init(this.$refs.mainPie);
      myChart.setOption({
        color:["#5ec1dc","#344456"],
        series: [{
          radius: ["63%", '83%'],
          name: '销量',
          type: 'pie',
          data: [
            {
              value:this.cur
            },
            {
              value:this.full-this.cur
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
      },true);
    },
    mounted(){
      this.full=this.msg.wareAbout.full;
      this.cur=this.msg.wareAbout.cur;
      this.cur>this.full?this.cur=this.full:null;
      let myChart = echarts.init(this.$refs.mainPie);
      myChart.setOption({
        color:["#5ec1dc","#344456"],
        series: [{
          radius: ["63%", '83%'],
          name: '销量',
          type: 'pie',
          data: [
            {
              value:this.cur
            },
            {
              value:this.full-this.cur
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
      },true);
      window.addEventListener("resize",myChart.resize())
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
    height: 2.09rem !important;
    background: #3E414D;
    border-bottom: 1px #2a2d3b solid;
    top: 0
  }

  .coldStorage ul {
    width: 8.81rem;
    height: 100%;
  }

  .coldStorage, .pie {
    display: inline-block;
    border-right: 1px #2a2d3b solid;
    float: left;
    width: 2.66rem;
    height: 100%;
    background: #3E414D;
  }

  .coldStorage .pie .overPie{
    width: 100%;
    height: .50rem;
  }

  .coldStorage .overPieName{
    display: inline-block;
    float:left;
    width: 50%;
    height: 100%;
  }

  .coldStorage .overPieName img{
    float: left;
    width: .40rem;
    height: .40rem;
    margin: .04rem 0 0 .12rem;
  }

  .coldStorage .overPieName i{
    float: left;
    line-height: .50rem;
    color:#9ca1b2;
    font-size:.14rem;
  }

  .coldStorage .temperature{
    display: inline-block;
    float:right;
    line-height: .50rem;
    padding-right: .20rem;
    width: 50%;
    height: 100%;
    text-align: right;
  }

  .coldStorage .temperature i{
    float: right;

    display: inline-block;
    line-height: .50rem;
    color:#9ca1b2;
    font-size:.14rem;
    padding:.02rem;

  }

  .coldStorage .temperature .temperatureNum{
    text-align: right;
    font-size:.30rem;
    padding-right: .05rem;
    color:#fff;
  }

  .coldStorage .temperature .temperatureUnit{
    line-height: .3rem;
    padding-top:.18rem

  }

  .coldStorage .isPie{
    position: relative;
    height: 1.20rem;
    width: 100%;
  }

  .coldStorage .isPie .middleValue{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -.15rem 0 0 -.32rem;
    width: .70rem;
    height: .30rem;
    line-height: .30rem;
    text-align: center;
  }

  .isPie .middleValue .text{
    float: left;
    display: inline-block;
    line-height: .30rem;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: .24rem;
    color:#fff;
    font-weight: bold;

  }

  .coldStorage .underPie{
    text-align: center;
    width: 100%;
    font-size: .14rem;
    color:#9ca1b2;
  }

  .coldStorage .indent {
    display: inline-block;
    float: left;
    height: 100%;
    width: 2.05rem;
    border-right: 1px #2a2d3b solid;
    background: #343743;
    font-size: .14rem;
    font-weight: bold;
    color: #9ca1b2;
  }

  .indent .warePic {
    width: .52rem;
    height: .52rem;
    margin: .40rem 0 0 .75rem
  }

  .indent .wareText {
    margin: .15rem auto .10rem;
    text-align: center;
  }

  .indent .wareText .wareNum {
    margin-right:.05rem;
    font-size: .30rem;
    color: #fff;
  }

  .indent .wareText_bottom {
    text-align: center;
  }

</style>
