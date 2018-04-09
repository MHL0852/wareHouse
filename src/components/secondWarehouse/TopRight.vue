<template>
  <div class="topRight">
    <div class="inner clearfix">
      <div class="pic">
        <img :src="msg.imgUrl" alt="">
        <p class="grey">{{msg.title}}</p>
      </div>

      <div class="text">
        <div class="left">
          <div class="wareDetailFinished">
            <span class="num">{{msg.wareDetailFinished.num1}}</span>
            <span class="grey">{{msg.wareDetailFinished.unit1}}</span>
            <i class="line"></i>
          </div>
          <div class="wareDetailUnfinished">
            <span class="num">{{msg.wareDetailUnfinished.num1}}</span>
            <span class="grey">{{msg.wareDetailUnfinished.unit1}}</span>
            <i class="line"></i>
          </div>
        </div>
        <div class="middle">
          <div class="wareDetailFinished">
            <span class="num">{{msg.wareDetailFinished.num2}}</span>
            <span class="grey">{{msg.wareDetailFinished.unit2}}</span>
            <i class="line"></i>
          </div>
          <div class="wareDetailUnfinished">
            <span class="num">{{msg.wareDetailUnfinished.num2}}</span>
            <span class="grey">{{msg.wareDetailUnfinished.unit2}}</span>
            <i class="line"></i>
          </div>
        </div>
        <div class="right">
          <div class="wareDetailFinished">
            <span class="num">{{msg.wareDetailFinished.num3}}</span>
            <span class="grey">{{msg.wareDetailFinished.unit3}}</span>
            <span class="tip" :style="{color:msg.color}">(已完成)</span>
          </div>
          <div class="wareDetailUnfinished">
            <span class="num">{{msg.wareDetailUnfinished.num3}}</span>
            <span class="grey">{{msg.wareDetailUnfinished.unit3}}</span>
            <span class="tip" :style="{color:msg.color}">(未完成)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top-right",
    props: ["msg"],
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .grey {
    font-size: .14rem;
    color: #9ca1b2;
    margin-right: .05rem;
  }

  .num {
    display: inline-block;
    min-width: .48rem;
    text-align: left;
    font-size: .26rem;
    font-weight: bold;
    margin-right: .05rem;
    color: #fff;
  }

  .line {
    display: inline-block;
    width: 1px;
    height: 50%;
    background: -webkit-linear-gradient(#343743, #5d5e69, #343743);
    background: -o-linear-gradient(#343743, #5d5e69, #343743);
    background: -moz-linear-gradient(#343743, #5d5e69, #343743);
    background: linear-gradient(#343743, #5d5e69, #343743);
  }

  .topRight {
    width: 4.06rem;
    height: 1rem;
    margin: .1rem;
    font-size: 0;
    background: #343743;
  }

  .topRight .inner {
    height: 100%;
  }

  .topRight .pic {
    width: .42rem;
    height: .72rem;
    margin-left: .2rem;
    display: inline-block;
    vertical-align: middle;
  }

  .topRight .pic img {
    width: .42rem;
    height: .42rem;
  }

  .topRight .pic .grey {
    width: .5rem;
    font-size: .15rem;
    margin: 0 0 0 -.03rem;
  }

  .topRight .text {
    width: 3.43rem;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .topRight .text .left, .middle, .right {
    text-align: right;
    width: .9rem;
    height: 100%;
    display: inline-block;
  }

  .topRight .text .left .num {
    min-width: .3rem;
  }

  .topRight .text .wareDetailFinished {
    margin-top: 3%;
    height: 40%;
    width: 100%;
  }

  .topRight .text .right {
    display: inline-block;
    height: 100%;
    width: 1.53rem;
    font-size: .14rem;
  }

  .text .right .grey {
    margin-right: 0;
  }

  .text .right .tip {
    margin-right: .05rem;
  }

  .topRight .text .wareDetailUnfinished {
    height: 40%;
    margin-bottom: 3%;
    width: 100%;
  }
</style>
