<template>
  <div class="wareMiddleContainer">
    <div class="wareMiddleTop">
      <img :src="msg.topImgUrl" alt="">
      <div class="wareMiddleText">
        <span class="grey">当前总库存</span><br/>
        <span class="num">{{msg.topNum}}</span>
        <span class="grey">方</span>
      </div>
    </div>
    <div class="wareMiddleBody">
      <div class="bodyTop">
        <img :src="msg.middleImgUrl" alt="">
        <div class="bodyTopText">
          <span class="grey">预计入库</span><br/>
          <span class="num">{{msg.middleNUm}}</span>
          <span class="grey">方</span>
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

  }
</script>

<style scoped>
  .grey {
    color: #9ca1b2;
  }

  .num {
    font-size: .28rem;
    font-weight: bold;
    margin-right: .05rem;
    color: #fff;
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
