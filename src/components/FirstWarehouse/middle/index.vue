<template>
  <div class="wareMiddleContainer">
    <div class="wareMiddleTop">
      <img :src="msg.topImgUrl" alt="">
      <div class="wareMiddleText">
        <span class="grey">{{msg.topTitle}}</span><br/>
        <span class="num">{{formatValue(msg.topNum)}}</span>
        <span class="grey">{{msg.topUnit}}</span>
      </div>
    </div>
    <div class="wareMiddleBody">
      <div class="bodyTop">
        <img :src="msg.middleImgUrl" alt="">
        <div class="bodyTopText">
          <span class="grey">{{msg.middleTitle}}</span><br/>
          <span class="num">{{msg.middleNum}}</span>
          <span class="grey">{{msg.middleUnit}}</span>
        </div>
      </div>
      <div class="bodyLine"></div>
      <div class="bodyBottom">
        <span class="grey">已完成 :</span>
        <span class="num">{{msg.finished}}</span>
        <span class="grey">未完成 :</span>
        <span class="num">{{msg.unfinished}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['msg'],
    methods: {
      /*
      * 保留2位小数
      */
      formatValue(v){
        if(!v) return ''
        var val = parseFloat(v)
        return val.toFixed('2')
      }
    }
  }
</script>

<style scoped>
  .grey {
    color: #9ca1b2;
  }

  .num {
    color: #fff;
    max-width: 2rem;
    font-size: .28rem;
    font-weight: bold;
    margin-right: .05rem;
    display: inline-block;
  }

  .wareMiddleContainer {
    width: 100%;
    height: 100%;
    font-size: .14rem;
    color: #9ca1b2;
    background: #343743;
  }

  .wareMiddleContainer .wareMiddleTop {
    width: 100%;
    padding-top: .3rem;
    height: 1.20rem;
    text-align: center;
    background-color: #383b47;
    border-bottom: 1px solid #2a2d3b;
  }

  .wareMiddleContainer .wareMiddleText {
    vertical-align: middle;
    display: inline-block;
  }

  .wareMiddleContainer .wareMiddleText p {
    margin: 0;
    padding: 0;

  }

  .wareMiddleContainer .wareMiddleBody {
    width: 100%;
    text-align: center;
  }
  .wareMiddleContainer .wareMiddleBody .bodyTop{
    padding-top:.4rem;
    height: 1.94rem;
    width: 100%;
  }
  .wareMiddleContainer .wareMiddleBody .bodyTop .bodyTopText{
    margin-top:.1rem;
  }

  .wareMiddleContainer .wareMiddleBody .bodyLine{
    width: 80%;
    height: 1px;
    margin:0 auto;
    background: -webkit-linear-gradient(left, #343743 , #5d5e69, #343743);
    background: -o-linear-gradient(right, #343743 , #5d5e69, #343743);
    background: -moz-linear-gradient(right, #343743 , #5d5e69, #343743);
    background: linear-gradient(to right, #343743 , #5d5e69, #343743);
  }

  .wareMiddleContainer .wareMiddleBody .bodyBottom{
    height: 1rem;
    white-space: nowrap;
    line-height: 1rem;
  }

  .wareMiddleContainer .wareMiddleBody .bodyBottom span:nth-child(2){
    margin-right: .3rem;
  }
</style>
