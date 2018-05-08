<template>
  <baidu-map class="map" center="上海" ak="onxNal5gtcEQlN0HcUG64j6R5LM7bOOG"  anchor="BMAP_ANCHOR_TOP_RIGHT"></baidu-map>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
  export default {
    components: {
      BaiduMap
    }
  }
</script>

<style>
  .map{
    width: 100%;
    height: 100%;
  }
</style>
