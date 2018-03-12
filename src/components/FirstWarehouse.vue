<template>
  <div class="wareContainer">
    <ul class="warehouseList clearfix">
        <router-link  v-for="(itemWare,index) in wareList" :key="index" :to="{name:'wareDetail',params:{bid:itemWare.id}}" tag="li">
          <Part  :msg="itemWare"></Part>
        </router-link>
    </ul>
  </div>
</template>

<script>
  import TopPart from './FirstWarehouse/TopPart'
  import ButtonPart from './FirstWarehouse/ButtonPart'
  import Part from"./FirstWarehouse/part"

  export default {
    name: "first-warehouse",
    data() {
      return {
        wareList: [
        ]
      }
    },
    mounted(){
      this.$http.get('http://192.168.1.98:8082/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseReport&pageNumber=1&pageSize=4').then(response => {
        this.wareList = JSON.parse(response.data.data.page).result;

      }, err => {
        console.log(err);
      });
    },
    components: {
      TopPart,
      ButtonPart,
      Part
    }
  }
</script>

<style scoped>
  .wareContainer {
    margin: 0 0;
    padding: 0;
    width: 1920px;
    height: 900px;
    background: #2a2d3b;
    box-sizing: content-box !important;
  }

  .wareContainer .warehouseList {
    width: 1920px;
    height: 900px;
    padding: 10px;
  }
</style>
