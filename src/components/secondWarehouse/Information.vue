<template>
  <div class="information">
    <div class="top">
      <h4>{{msg.title}}</h4>
    </div>
    <div class="body">
      <ul class="main">
        <li class="text clearfix" v-for="(val,index) in msg.msg" :key="index">
          <img :src="val.imgUrl" alt="">
          <span class="info">{{val.info}}</span>
          <span class="date">{{val.date}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "information",
    props: ["msg"]
  }
</script>

<style scoped>
  .information {
    display: inline-block;
    padding: 0;
    float: left;
    width: 420px;
    height: 100%;
    background: #343743;
    overflow: hidden;
  }

  .information .top {
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: #fff;
    border-bottom: 1px solid #5b5f66
  }

  .information .top h4 {
    height: 50px;
    margin: 0;
    padding-left: 20px;
    line-height: 50px;
  }

  .information .body {
    width: 100%;
  }

  .information .body .main {
    margin-top: 3px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .information .main .text {
    width: 100%;
    height: 34px;
    padding: 8px 20px 8px 20px;
    font-size: 14px;
    color: #fff;
  }

  .main .text img {
    float: left;
    width: 18px;
    height: 18px;
  }

  .main .text .info {
    display: inline-block;
    width: 200px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    margin-left: 10px;
    line-height: 18px;
    float: left;
  }

  .main .text .date {
    display: inline-block;;
    color: #9ca1b2;
    line-height: 18px;
    float: right;
  }
</style>
