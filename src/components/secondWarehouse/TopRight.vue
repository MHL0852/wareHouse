<template>
<div class="topRight">
<div class="inner clearfix">
  <div class="pic"><img :src="msg.imgUrl" alt=""></div>
  <div class="text">
    <p class="title">{{msg.title}}</p>
    <div class="leftText">
      <i class="num">{{msg.num1}}</i>
      <i class="unit">{{msg.unit1}}</i>
    </div>
    <div class="line"></div>
    <div class="rightText">
      <i class="num">{{msg.num2}}</i>
      <i class="unit">{{msg.unit2}}</i>
    </div>
  </div>
</div>
</div>
</template>

<script>
    export default {
        name: "top-right",
      props:["msg"],
      data(){
          return{
          }
      }
    }
</script>

<style scoped>
.topRight{
  display: inline-block;
  float: left;
  margin:.10rem;
  width: 3.25rem;
  height: 1.00rem;
  position: relative;
  background: #343743;
  font-weight: bold;
}
  .topRight .inner{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -.30rem 0 0 -1.30rem;
    height: .60rem;
    width: 2.60rem;
  }

.topRight .inner .pic{
  width: .40rem;
  height: .40rem;
  margin: .10rem .20rem 0 0 ;
  display: inline-block;
  float: left;
}
.inner .pic img{
  display: block;
  width: 100%;
  height: 100%;
}
  .inner .text{
    color:#9ca1b2;
    font-size: .14rem;
  }
.inner .text .title{
  margin:0
}

.inner .text .leftText,.rightText{
  display: inline-block;
  float:left;
}

.inner .text .line{
  display: inline-block;
  float: left;
  margin:0 .15rem;
  width:1px;
  height: .40rem;
  background: linear-gradient(to bottom,#343743,#9ca1b2,#343743);
}

.inner .text .num{
  font-size:.28rem;
  color:#fff;
  font-weight: bold;
  margin-right: .10rem;
}



</style>
