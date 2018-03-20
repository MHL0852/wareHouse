<template>
  <div class="topMiddle">
    <div class="ware contentLeft">
      <div class="midContent">
        <div class="midPic">
          <img :src="cold.imgUrl" alt="">
        </div>
        <div class="midText">
          <p class="title">{{cold.name}}</p>
          <i class="number">{{cold.value}}</i>
          <i class="unit">{{cold.unit}}</i>
        </div>
      </div>
    </div>
    <div class="ware contentRight">
      <div class="midContent">
        <div class="midPic">
          <img :src="freeze.imgUrl" alt="">
        </div>
        <div class="midText">
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
    width: 1.51rem;
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

  .midContent {
    position: absolute;
    width:100%;
    overflow: hidden;
    height: .80rem;
    margin: -.40rem 0 0 0;
    text-align: center;
    top: 50%;
  }

  .topMiddle .midPic {
    position: absolute;
    top: 50%;
    left: .1rem;
    margin:-.2rem 0 0 0;
    width: .40rem;
    height: .40rem;
    display: inline-block;
  }

  .topMiddle .midPic img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .topMiddle .midText {
    position: absolute;
    top: 50%;
    left: .5rem;
    margin:-.3rem 0 0 0;
    display: inline-block;
    font-size: .14rem;
    color: #9ca1b2;
    font-weight: bold;
  }

  .topMiddle .midText .title {
    margin: 0;
  }

  .midText .number {
    font-size: .28rem;
    color: #fff;
    font-weight: bold;
    margin-right:.05rem;
  }

  .contentRight {

  }

</style>
