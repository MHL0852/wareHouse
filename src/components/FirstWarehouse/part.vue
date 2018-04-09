<template>
  <div class="warehouseDetail">
    <div class="navBox">
      <p class="navText">{{msg.name}}</p>
    </div>
    <div class="body">
      <div class="warehouseLeftPart clearfix">
        <TopPart :msg="warehouseLeftPart.topValue" v-if="flag"></TopPart>
        <ButtonPart :msg="warehouseLeftPart.bottomValue" v-if="flag"></ButtonPart>
      </div>
      <div class="warehouseMiddlePart clearfix">
        <MiddlePart :msg="warehouseMiddlePart"></MiddlePart>
      </div>
      <div class="warehouseRightPart clearfix">
        <MiddlePart :msg="warehouseRightPart"></MiddlePart>
      </div>
    </div>
  </div>
</template>

<script>
  import TopPart from './left/TopPart'
  import ButtonPart from './left/ButtonPart'
  import MiddlePart from './middle'
  import {util} from "../../API"

  let timer;

  export default {
    name: "part",
    props: ["msg"],
    data() {
      return {
        flag: false,
        name: '仓库1',
        warehouseLeftPart: {
          topValue: {
            wareAbout: {
              imgUrl: "static/FirstWarehouse/ware_07.png",
              full: 0,
              cur: 0,
              wareName: "冷藏库",
              temperature: 5
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
          bottomValue: {
            wareAbout: {
              wareName: "冷冻仓",
              temperature: -15,
              full: 0,
              cur: 0,
              imgUrl: "static/FirstWarehouse/ware_08.png"
            },
            val: [
              {
                num: 0,
                unit: '件',
                imgUrl: "@/../static/FirstWarehouse/ware_02.png",
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
        },
        warehouseMiddlePart: {
          topNum: 1000,
          topImgUrl: 'static/FirstWarehouse/ware_01.png',
          middleNUm: 168,
          middleImgUrl:'static/FirstWarehouse/ware_03.png',
          finished: 148,
          unfinished: 20
        },
        warehouseRightPart: {
          topNum: 13,
          topImgUrl: 'static/FirstWarehouse/ware_02.png',
          middleNUm: 176,
          middleImgUrl:'static/FirstWarehouse/ware_04.png',
          finished: 158,
          unfinished: 18
        }
      }
      //TODO 温度没数据
    },
    methods: {
      getData() {
        util("/vcloudwood-gateway/vcloudwood/gateway/query.v", {
          params: {
            serviceName: 'com.vtradex.wms.api.inventory.InventoryApi',
            method: 'warehouseMonitoringReport',
            wareHouseId: this.msg.id
          }
        }).then(response => {
          let data = response.data.data.data;
        data = JSON.parse(data);
        this.warehouseLeftPart.topValue.val[0].num = data.waitPickUpOrderNum;
        this.warehouseLeftPart.topValue.val[1].num = data.waitSendOrderNum;
        this.warehouseLeftPart.topValue.val[2].num = data.overOrderNumToday;
        this.warehouseLeftPart.bottomValue.val[0].num = data.waitPickUpGoodsNum;
        this.warehouseLeftPart.bottomValue.val[1].num = data.waitSendGoodsNum;
        this.warehouseLeftPart.bottomValue.val[2].num = data.overGoodsNumToday;
      }).catch(err => {
          console.log(err);
      });

        util("/vcloudwood-gateway/vcloudwood/gateway/query.v", {
          params: {
            serviceName: 'com.vtradex.wms.api.inventory.InventoryApi',
            method: 'warehouseInventoryMessageReport',
            wareHouseId: this.msg.id
          }
        }).then(response => {
          let data = response.data.data.data ||
            JSON.stringify({
              "wareHouseId": 0,
              "coldVolume": 0,
              "freezeVolume": 0,
              "coldVolumeTotal": 0,
              "freezeVolumeTotal": 0
            });
        data = JSON.parse(data);
        this.warehouseLeftPart.topValue.wareAbout.cur = data.coldVolume;//冷藏库存
        this.warehouseLeftPart.bottomValue.wareAbout.cur = data.freezeVolume;//冷冻库存
        this.warehouseLeftPart.topValue.wareAbout.full = data.coldVolumeTotal;//冷藏总容积
        this.warehouseLeftPart.bottomValue.wareAbout.full = data.freezeVolumeTotal;//冷冻总容积
        this.flag = true;
      }).catch(err => {
          console.log(err);
      });
      }
    },
    mounted() {
      this.getData();
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
          this.getData()
        },
        120000
      )
      ;
    },
    components: {
      TopPart,
      ButtonPart,
      MiddlePart
    }
  }

</script>

<style scoped>

  .warehouseDetail {
    display: inline-block;
    float: left;
    width: 9.31rem;
    height: 4.19rem;
    margin: .10rem .09rem .10rem .10rem;
  }

  .warehouseDetail .navBox {
    position: relative;
    display: inline-block;
    float: left;
    border-bottom: 1px solid #2a2d3b;
    height: 100%;
    color: #fff;
    font-size: .24rem;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    width: .50rem;
    background: #5d5e69;
  }

  .warehouseDetail .navBox .navText {
    margin: 0;
    text-align: center;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 .1rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .warehouseDetail .body {
    position: relative;
    float: right;
    display: inline-block;
    width: 8.81rem;
    height: 100%;
  }

  .warehouseDetail .body .warehouseLeftPart {
    float: left;
    width: 2.66rem;
    height: 100%;
    border-right: 1px solid #2a2d3b;
  }

  .warehouseDetail .body .warehouseMiddlePart {
    float: left;
    width: 3rem;
    height: 100%;
    border-right: 1px solid #2a2d3b;
  }

  .warehouseDetail .body .warehouseRightPart {
    float: left;
    width: 3rem;
    height: 100%;
  }

  .coldStorage ul {
    width: 8.81rem;
    height: 100%;
  }

  .freeze ul {
    width: 100%;
    height: 100%;
  }
</style>
