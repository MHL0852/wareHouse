<template>
  <div class="information">
    <div class="top">
      <h4>{{msg.title}}</h4>
    </div>
    <div class="body">
      <ul class="main">
        <li class="text clearfix" v-for="(val,index) in msg.data" :key="index">
          <span class="index">{{index+1}}</span>
          <span class="info">{{val.goodsname}}</span>
          <span class="unit">{{val.unit||"箱"}}</span>
          <span class="num">{{val.sumprice}}</span>
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
    margin: 20px 0 20px 20px;
    padding: 0;
    float: left;
    width: 435px;
    height: 435px;
    background: #fff;
    overflow: hidden;
  }

  .information .top {
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: #555;
    border-bottom: 1px solid #eeeeee
  }

  .information .top h4 {
    height: 50px;
    margin: 0;
    padding-left: 20px;
    line-height: 50px;
  }

  .information .body {
    width: 100%;
    height: 384px;
    overflow: hidden;
  }

  .information .body .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .information li :nth-child(1){
    margin-right:10px ;
    text-align: center;
  }
  .information li :nth-child(2){
    width: 250px;
    text-align: left;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }


  .information li:nth-child(1) :nth-child(1){
    margin:10px 10px 10px 0 ;
    line-height: 18px;
    background-color: #d67b82;
    text-align: center;
    color:#fff
  }
  .information li:nth-child(2) :nth-child(1){
    margin:10px 10px 10px 0 ;
    line-height: 18px;
    background-color: #ffbb7f;
    text-align: center;
    color:#fff
  }
  .information li:nth-child(3) :nth-child(1){
    text-align: center;
    margin:10px 10px 10px 0 ;
    line-height: 18px;
    background-color: #b5a1de;
    color:#fff
  }

  .information .main .text {
    width: 100%;
    height: 38px;
    padding: 0 20px 0 20px;
    line-height: 38px;
    font-size: 14px;
    color: #676767;
  }

  .information .main span {
    line-height: 38px;
    text-align: center;

  }

  .main .text .index {
    display: inline-block;
    float: left;
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  .information .main .unit,.num{
    float: right;
  }

  .main .text .info {
    display: inline-block;;
    line-height: 38px;
  }

  .main .text .date {
    display: inline-block;;
    line-height: 18px;
    float: right;
  }
</style>
