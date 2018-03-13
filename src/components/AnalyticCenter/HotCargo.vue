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
    margin: 0.2rem 0 0.2rem 0.2rem;
    padding: 0;
    float: left;
    width: 4.33rem;
    height: 4.35rem;
    background: #fff;
    overflow: hidden;
  }

  .information .top {
    width: 100%;
    height: .5rem;
    font-size: .18rem;
    color: #555;
    border-bottom: 1px solid #eeeeee
  }

  .information .top h4 {
    font-size:.18rem;
    height: .50rem;
    margin: 0;
    padding-left: .20rem;
    line-height: .50rem;
  }

  .information .body {
    width: 100%;
    height: 3.84rem;
    overflow: hidden;
  }

  .information .body .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .information li :nth-child(1){
    margin-right:.10rem ;
    text-align: center;
  }
  .information li :nth-child(2){
    width: 2.50rem;
    text-align: left;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }


  .information li:nth-child(1) :nth-child(1){
    margin:.10rem .10rem .10rem 0 ;
    line-height: .18rem;
    background-color: #d67b82;
    text-align: center;
    color:#fff
  }
  .information li:nth-child(2) :nth-child(1){
    margin:.10rem .10rem .10rem 0 ;
    line-height: .18rem;
    background-color: #ffbb7f;
    text-align: center;
    color:#fff
  }
  .information li:nth-child(3) :nth-child(1){
    text-align: center;
    margin:.10rem .10rem .10rem 0 ;
    line-height: .18rem;
    background-color: #b5a1de;
    color:#fff
  }

  .information .main .text {
    width: 100%;
    height: .38rem;
    padding: 0 .20rem 0 .20rem;
    line-height: .38rem;
    font-size: .14rem;
    color: #676767;
  }

  .information .main span {
    line-height: .38rem;
    text-align: center;

  }

  .main .text .index {
    display: inline-block;
    float: left;
    width: .18rem;
    height: .18rem;
    border-radius: 50%;
  }
  .information .main .unit,.num{
    float: right;
  }

  .main .text .info {
    display: inline-block;;
    line-height: .38rem;
  }

  .main .text .date {
    display: inline-block;;
    line-height: .18rem;
    float: right;
  }
</style>
