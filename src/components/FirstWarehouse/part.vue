<template>
  <div class="warehouseDetail">
    <div class="navBox">
      <p class="navText">{{msg.name}}</p>
    </div>
    <div class="body">
      <TopPart :msg="topValue"></TopPart>
      <ButtonPart :msg="bottomValue"></ButtonPart>
    </div>
  </div>
</template>

<script>
  import TopPart from './TopPart'
  import ButtonPart from './ButtonPart'
    export default {
        name: "part",
      props:["msg"],
      data(){
          return {
            name: '仓库1',
            topValue: {
              wareAbout:{
                imgUrl:"../../../static/FirstWarehouse/ware_07.png",
                full:100,
                cur:0,
                wareName:"冷藏库",
                temperature:5
              },
              val: [
                {
                  num: 0,
                  unit: '单',
                  imgUrl: "../../../static/FirstWarehouse/ware_01.png",
                  style: "待备货单量"
                },
                {
                  num: 0,
                  unit: '单',
                  imgUrl: "../../../static/FirstWarehouse/ware_03.png",
                  style: "待发货单量"
                },
                {
                  num: 0,
                  unit: '单',
                  imgUrl: "../../../static/FirstWarehouse/ware_05.png",
                  style: "今日已完成单量"
                }
              ]

            },
            bottomValue:{
              wareAbout: {
                wareName: "冷冻仓",
                temperature: -15,
                full:100,
                cur:100,
                imgUrl: "../../../static/FirstWarehouse/ware_08.png"
              },
              val: [
                {
                  num: 0,
                  unit: '件',
                  imgUrl: "../../../static/FirstWarehouse/ware_02.png",
                  style: "待备货件数"
                },
                {
                  num: 0,
                  unit: '件',
                  imgUrl: "../../../static/FirstWarehouse/ware_04.png",
                  style: "待发货件量数"
                },
                {
                  num: 0,
                  unit: '件',
                  imgUrl: "../../../static/FirstWarehouse/ware_06.png",
                  style: "今日已完成件量数"
                }
              ]
            }
          }
          //TODO 温度没数据
      },
      mounted(){
        this.$http.get(`http://192.168.1.98:8082/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseMonitoringReport&wareHouseId=${this.msg.id}`).then(response => {
          let data = JSON.parse(response.data.data.data);
          this.topValue.val[0].num=data.waitPickUpOrderNum;
          this.topValue.val[1].num=data.waitSendOrderNum;
          this.topValue.val[2].num=data.overOrderNumToday;
          this.bottomValue.val[0].num=data.waitPickUpGoodsNum;
          this.bottomValue.val[1].num=data.waitSendGoodsNum;
          this.bottomValue.val[2].num=data.overGoodsNumToday;
        }, err => {
          console.log(err);
        });
        this.$http.get(`http://192.168.1.98:8082/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseInventoryMessageReport&wareHouseId=${this.msg.id}`).then(response => {
let data=JSON.parse(response.data.data.data);
          this.topValue.wareAbout.cur=data.existeVolume;//总库存
          this.bottomValue.wareAbout.cur=data.existeVolume;//TODO  只有总数据，没有冷冻冷藏分开的分数据
          this.topValue.wareAbout.full=data.totalVolume;//总容积
          this.bottomValue.wareAbout.full=data.totalVolume;
        }, err => {
          console.log(err);
        });
      },
      components:{
        TopPart,
        ButtonPart
      }
    }

</script>

<style scoped>

   .warehouseDetail {
    display: inline-block;
    float: left;
    width: 931px;
    height: 419px;
    margin: 10px 9px 10px 10px;
  }

  .warehouseDetail .navBox {
    position: relative;
    display: inline-block;
    float: left;
    height: 100%;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    width: 50px;
    background: #5d5e69;
  }

  .warehouseDetail .navBox .navText {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -20px;
    text-align: center;
    display: inline-block;
    width: 40px;
    height: 180px;
    overflow: hidden;
    vertical-align: middle;
  }

  .warehouseDetail .body {
    position: relative;
    display: inline-block;
    width: 881px;
    height: 100%;
  }

  .coldStorage ul {
    width: 881px;
    height: 100%;
  }

  .freeze ul {
    width: 100%;
    height: 100%;
  }
</style>
