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
    margin:10px;
    width: 326px;
    height: 100px;
  }

  .ware {
    position: relative;
    display: inline-block;
    width: 161px;
    height: 100px;
    background: #343743;
    float: left;
  }

  .contentLeft {
    border-right: 1px solid #2a2d3b
  }

  .contentRight {
    width: 162px;
  }

  .content {
    position: absolute;
    width: 115px;
    height: 60px;
    margin: -30px 0 0 -55px;
    top: 50%;
    left: 50%;
  }

  .topMiddle .pic {
    margin: 10px 5px 0 0;
    width: 40px;
    height: 40px;
    display: inline-block;
    float: left;
  }

  .topMiddle .pic img {
    width: 40px;
    height: 40px;
  }

  .topMiddle .text {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    font-size: 14px;
    color: #9ca1b2;
    font-weight: bold;
    float: right;
  }

  .topMiddle .text .title {
    margin: 0;
  }

  .text .number {
    font-size: 28px;
    color: #fff;
    font-weight: bold;
    margin-right: 5px;
  }

  .contentRight {

  }

</style>
