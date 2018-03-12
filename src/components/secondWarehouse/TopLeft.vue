<template>
  <div class="topLeft">
    <div class="inner">
      <div class="pic">
        <img :src="msg.imgUrl" alt="">
      </div>
      <ul class="text">
        <li class="top"><p class="title">{{msg.title}}</p></li>
        <li class="bottom"><i class="num">{{msg.number}}</i><i class="unit">{{msg.unit}}</i></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top-left",
    props:["msg"],
    data() {
      return {

      }
    },
    components: {}
  }
</script>

<style scoped>
  .topLeft {
    display: inline-block;
    float:left;
    margin: 10px;
    position: relative;
    width: 240px;
    height: 100px;
    background: #343743;
  }

  .topLeft .inner {
    position: absolute;
    width: 170px;
    height: 60px;
    margin: -25px 0 0 -85px;
    top: 50%;
    left: 50%;
  }

  .topLeft .pic {
    margin-top:10px;
    width: 40px;
    height: 40px;
    display: inline-block;
    float: left;
  }

  .topLeft .pic img {
    width: 40px;
    height: 40px;
    margin: auto 0;
  }

  .topLeft .text {
    display: inline-block;
    font-size: 14px;
    margin-right: 20px;
    color: #9ca1b2;
    font-weight: bold;
    float: right;
  }

  .topLeft .text .title {
    color: #9ca1b2;
    margin:0;
  }

  .text .bottom .num{
    font-size:28px;
    color:#fff;
    font-weight: bold;
    margin-right: 5px;
  }

</style>
