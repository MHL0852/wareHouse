<template>
  <div class="warehouseDetail">
    <div class="navBox">
      <p class="navText">{{msg.name}}</p>
    </div>
    <div class="body">
      <TopPart :msg="topValue" v-if="flag"></TopPart>
      <ButtonPart :msg="bottomValue" v-if="flag"></ButtonPart>
    </div>
  </div>
</template>

<script>
  import TopPart from './TopPart'
  import ButtonPart from './ButtonPart'
  import {util} from "../../API"
  import moment from 'moment'

  let timer;

  export default {
    name: "part",
    props: ["msg"],
    data() {
      return {
        flag: false,
        name: '仓库1',
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
              imgUrl: "static/FirstWarehouse/ware_01.png",
              style: "待备货单量"
            },
            {
              num: 0,
              unit: '单',
              imgUrl: "static/FirstWarehouse/ware_03.png",
              style: "待发货单量"
            },
            {
              num: 0,
              unit: '单',
              imgUrl: "static/FirstWarehouse/ware_05.png",
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
              imgUrl: "static/FirstWarehouse/ware_02.png",
              style: "待备货件数"
            },
            {
              num: 0,
              unit: '件',
              imgUrl: "static/FirstWarehouse/ware_04.png",
              style: "待发货件量数"
            },
            {
              num: 0,
              unit: '件',
              imgUrl: "static/FirstWarehouse/ware_06.png",
              style: "今日已完成件量数"
            }
          ]
        }
      }
      //TODO 温度没数据
    },
    methods: {
      getData() {
        /**
        * 获取订单数据
        **/
        util("/vcloudwood-gateway/vcloudwood/gateway/query.v", {
          params: {
            serviceName: 'com.vtradex.wms.api.inventory.InventoryApi',
            method: 'warehouseMonitoringReport',
            wareHouseId:this.msg.id
          }
        }).then(
          response => {
          let data = response.data.data.data;
          data = JSON.parse(data);
            console.log(data);
            this.topValue.val[0].num = data.waitPickUpOrderNum || 0;
          this.topValue.val[1].num = data.waitSendOrderNum || 0;
          this.topValue.val[2].num = data.overOrderNumToday || 0;
          this.bottomValue.val[0].num = data.waitPickUpGoodsNum || 0;
          this.bottomValue.val[1].num = data.waitSendGoodsNum || 0;
          this.bottomValue.val[2].num = data.overGoodsNumToday || 0;
        },
          err => {
          console.log(err);
        });


        /**
        * 获取库存容积
        **/
        util("/vcloudwood-gateway/vcloudwood/gateway/query.v", {
          params: {
            serviceName: 'com.vtradex.wms.api.inventory.InventoryApi',
            method: 'warehouseInventoryMessageReport',
            wareHouseId:this.msg.id
          }
        }).then(
          response => {
          let data = response.data.data.data;
          data = data?JSON.parse(data):{
                "coldVolume": 0,
                "freezeVolume": 0,
                "coldVolumeTotal": 0,
                "freezeVolumeTotal": 0
            };
            this.topValue.wareAbout.cur = data.coldVolume  ;//冷藏库存
          this.bottomValue.wareAbout.cur = data.freezeVolume ;//冷冻库存
          this.topValue.wareAbout.full = data.coldVolumeTotal;//冷藏总容积
          this.bottomValue.wareAbout.full = data.freezeVolumeTotal;//冷冻总容积
          this.flag = true;
        },
          err => {
          console.log(err);
        });


        /**
        * 获取温度
        **/
        util("/vcloudwood-gateway/vcloudwood/gateway/query.v", {
          params: {
            serviceName: 'com.vtradex.wms.api.inventory.InventoryApi',
            wareHouseId:this.msg.id,
            method: 'getWarehouseTemperateById'
          }
        }).then(
          response => {
            let res = response.data.data.data?JSON.parse(response.data.data.data):{};
            this.topValue.wareAbout.temperature=isNaN(res.cold)?'-':res.cold;
            this.bottomValue.wareAbout.temperature=isNaN(res.freeze)?'-':res.freeze;

          },
          err => {
            console.log(err);
          });
      }
    },
    mounted() {
      this.getData();
      if(timer){
        clearInterval(timer)
      }
      timer=setInterval(()=>{
        this.getData()
      },120000);
    },
    components: {
      TopPart,
      ButtonPart
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
    flex-direction:column;
    justify-content:center;
    padding:0 .1rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
    letter-spacing: 4px;
    writing-mode: vertical-lr;
    writing-mode: tb-lr
  }

  .warehouseDetail .body {
    position: relative;
    float: right;
    display: inline-block;
    width: 8.81rem;
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
