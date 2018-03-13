<template>
  <div class="topMiddle">
    <div class="ware contentLeft">
      <div class="content">
        <div class="pic">
          <img :src="cold.imgUrl" alt="">
        </div>
        <div class="text">
          <p class="title">{{cold.name}}</p>
          <i class="number">{{cold.value}}</i>
          <i class="unit">{{cold.unit}}</i>
        </div>
      </div>
    </div>
    <div class="ware contentRight">
      <div class="content">
        <div class="pic">
          <img :src="freeze.imgUrl" alt="">
        </div>
        <div class="text">
          <p class="title">{{freeze.name}}</p>
          <i class="number">{{freeze.value}}</i>
          <i class="unit">{{freeze.unit}}</i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "top-middle",
    props:["cold","freeze"],
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .topMiddle {
    display: inline-block;
    float: left;
    margin:.10rem;
    width: 3.26rem;
    height: 1.00rem;
  }

  .ware {
    position: relative;
    display: inline-block;
    width: 1.61rem;
    height: 1.00rem;
    background: #343743;
    float: left;
  }

  .contentLeft {
    border-right: 1px solid #2a2d3b
  }

  .contentRight {
    width: 1.62rem;
  }

  .content {
    position: absolute;
    width: 1.2rem;
    height: .60rem;
    margin: -.30rem 0 0 -.55rem;
    top: 50%;
    left: 50%;
  }

  .topMiddle .pic {
    margin: .10rem .1rem 0 0;
    width: .40rem;
    height: .40rem;
    display: inline-block;
    float: left;
  }

  .topMiddle .pic img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .topMiddle .text {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    font-size: .14rem;
    color: #9ca1b2;
    font-weight: bold;
    float: right;
  }

  .topMiddle .text .title {
    margin: 0;
  }

  .text .number {
    font-size: .28rem;
    color: #fff;
    font-weight: bold;
    margin-right:.05rem;
  }

  .contentRight {

  }

</style>
