<template>
  <div class="topLeft">
    <div class="inner" v-for="data in msg">
      <div class="pic">
        <img :src="data.imgUrl" alt="">
      </div>
      <ul class="text">
        <li class="top"><p class="title">{{data.title}}</p></li>
        <li class="bottom"><i class="num">{{typeof (data.number)==="number"?data.number.toFixed(1):data.number}}</i><i
          class="unit">{{data.unit}}</i></li>
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
    margin: .10rem;
    position: relative;
    width: 6rem;
    height: 1.00rem;
    background: #343743;
    font-size:0;
  }

  .topLeft .inner {
    text-align: center;
    display: inline-block;
    padding-top:.2rem;
    width: 2rem;
    border-right: 1px solid #2a2d3b;
    height: 100%;
  }

  .topLeft .pic {
    width: .42rem;
    height: .42rem;
    vertical-align: middle;
    margin:0 .05rem 0 .25rem;
    display: inline-block !important;
  }

  .topLeft .pic img {
    width: 100%;
    height: 100%;
  }

  .topLeft .text {
    display: inline-block;
    vertical-align: middle;
    width: 1.15rem;
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

  .text .bottom{
    text-align: left;
  }

  .text .bottom .num {
    display: inline-block;
    vertical-align: middle;
    max-width: 80%;
    overflow: hidden;
    font-size: .28rem;
    color: #fff;
    font-weight: bold;
    margin-right: .05rem;
  }
  .text .bottom .unit{
    display: inline-block;
    vertical-align: -40%;
    font-size:.14rem;
  }

</style>
