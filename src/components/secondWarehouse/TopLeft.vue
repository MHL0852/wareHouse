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
    margin: .10rem;
    position: relative;
    width: 2.40rem;
    height: 1.00rem;
    background: #343743;
  }

  .topLeft .inner {
    position: absolute;
    width: 1.70rem;
    height: .60rem;
    margin: -.25rem 0 0 -.85rem;
    top: 50%;
    left: 50%;
  }

  .topLeft .pic {
    margin-top:.10rem;
    width: .42rem;
    height: .42rem;
    display: inline-block;
    float: left;
  }

  .topLeft .pic img {
    display: block;
    width: 100%;
    height:100%;
  }

  .topLeft .text {
    display: inline-block;
    font-size: .14rem;
    margin-right: .20rem;
    color: #9ca1b2;
    font-weight: bold;
    float: right;
  }

  .topLeft .text .title {
    color: #9ca1b2;
    margin:0;
  }

  .text .bottom .num{
    font-size:.28rem;
    color:#fff;
    font-weight: bold;
    margin-right:.05rem;
  }

</style>
