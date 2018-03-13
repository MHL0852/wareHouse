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
            imgUrl: "../../../static/FirstWarehouse/ware_07.png",
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
    methods: {
      getData() {
        this.$http.get(`https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseMonitoringReport&wareHouseId=${this.msg.id}`).then(response => {

          let data = response.data.data.data;
          data = JSON.parse(data);
          this.topValue.val[0].num = data.waitPickUpOrderNum;
          this.topValue.val[1].num = data.waitSendOrderNum;
          this.topValue.val[2].num = data.overOrderNumToday;
          this.bottomValue.val[0].num = data.waitPickUpGoodsNum;
          this.bottomValue.val[1].num = data.waitSendGoodsNum;
          this.bottomValue.val[2].num = data.overGoodsNumToday;
        }, err => {
          console.log(err);
        });

        this.$http.get(`https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseInventoryMessageReport&wareHouseId=${this.msg.id}`).then(response => {
          let data = response.data.data.data||
            JSON.stringify({"wareHouseId" : 0, "totalVolume" : 0, "existeVolume" : 0});
          data = JSON.parse(data);
          this.topValue.wareAbout.cur = data.existeVolume;//总库存
          this.bottomValue.wareAbout.cur = data.existeVolume;//TODO  只有总数据，没有冷冻冷藏分开的分数据
          this.topValue.wareAbout.full = data.totalVolume;//总容积
          this.bottomValue.wareAbout.full = data.totalVolume;
          this.flag = true;
        }, err => {
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
    height: 100%;
    color: #fff;
    font-size: .24rem;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    width: .50rem;
    background: #5d5e69;
  }

  .warehouseDetail .navBox .navText {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -.75rem 0 0 -.20rem;
    text-align: center;
    display: inline-block;
    width: .40rem;
    height: 1.80rem;
    overflow: hidden;
    vertical-align: middle;
  }

  .warehouseDetail .body {
    position: relative;
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
