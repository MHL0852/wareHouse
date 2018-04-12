<template>
  <div class="topLeft">
    <div class="inner">
      <div class="pic">
        <img :src="msg.imgUrl" alt="">
      </div>
      <ul class="text">
        <li class="top"><p class="title">{{msg.title}}</p></li>
        <li class="bottom"><i class="num">{{typeof (msg.number)==="number"?msg.number.toFixed(1):msg.number}}</i><i
          class="unit">{{msg.unit}}</i></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top-left",
    props: ["msg"],
    data() {
      return {}
    },
    components: {}
  }
</script>

<style scoped>
  .topLeft {
    display: inline-block;
    float: left;
    margin: .10rem;
    position: relative;
    width: 2.30rem;
    height: 1.00rem;
    background: #343743;
  }

  .topLeft .inner {
    font-size: 0;
    text-align: center;
    position: absolute;
    width: 100%;
    height: .60rem;
    margin: -.3rem 0 0 0;
    top: 50%;
    left: 0;
  }

  .topLeft .pic {
    /*float: left;*/
    vertical-align: middle;
    margin-left:.3rem;
    width: .42rem;
    height: .42rem;
    display: inline-block;
  }

  .topLeft .pic img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .topLeft .text {
    /*float:left;*/
    display: inline-block;
    vertical-align: middle;
    width: 1.45rem;
    font-size: .14rem;
    margin: 0 0 0 .1rem;
    color: #9ca1b2;
    font-weight: bold;
  }

  .topLeft .text .title {
    text-align: left;
    color: #9ca1b2;
    margin: 0;
  }

  .text .bottom .num {
    display: inline-block;
    max-width: 80%;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .28rem;
    color: #fff;
    font-weight: bold;
    margin-right: .05rem;
  }
  .text .bottom .unit{
    display: inline-block;
    margin:.18rem 0 0 0;
    float: left;
  }

</style>
