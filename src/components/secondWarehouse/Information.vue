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
    width: 4.2rem;
    height: 100%;
    background: #343743;
    overflow: hidden;
  }

  .information .top {
    width: 100%;
    height: 0.5rem;
    font-size: 0.18rem;
    color: #fff;
    border-bottom: 1px solid #5b5f66
  }

  .information .top h4 {
    font-size:0.18rem;
    height: 0.5rem;
    margin: 0;
    padding-left: 0.2rem;
    line-height: 0.5rem;
  }

  .information .body {
    width: 100%;
  }

  .information .body .main {
    margin-top:0.03rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .information .main .text {
    width: 100%;
    height: 0.34rem;
    padding: 0.08rem 0.2rem 0.08rem 0.2rem;
    font-size: 0.14rem;
    color: #fff;
  }

  .main .text img {
    float: left;
    width: 0.18rem;
    height: 0.18rem;
  }

  .main .text .info {
    display: inline-block;
    width: 2rem;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    margin-left: 0.1rem;
    line-height: 0.18rem;
    float: left;
  }

  .main .text .date {
    display: inline-block;;
    color: #9ca1b2;
    line-height: 0.18rem;
    float: right;
  }
</style>
