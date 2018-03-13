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
    methods:{
      getData(){
        this.$http.get('https://gwt.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v?serviceName=com.vtradex.wms.api.inventory.InventoryApi&method=warehouseReport&pageNumber=1&pageSize=4').then(response => {
          console.log(JSON.parse(response.data.data.page).result);
          this.wareList = JSON.parse(response.data.data.page).result;
        }, err => {
          console.log(err);
        });
      }
    },
    mounted(){
      this.getData()
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
    width: 19.2rem;
    height: 9rem;
    background: #2a2d3b;
  }

  .wareContainer .warehouseList {
    width: 19.2rem;
    height: 9rem;
    padding: 0.1rem;
  }
</style>
