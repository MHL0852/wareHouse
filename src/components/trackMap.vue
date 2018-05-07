<template>
  <div class="track_map_wrapper">
    <div id="trackmap"></div>
  </div>
</template>

<script>
import BMap from 'BMap';
import {util} from "../API"
import {baseUrl, wareHouseService, vehicleService} from '@/libs/constant'

export default {
  mounted() {
    this.initMap();
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap(){
      var map = new BMap.Map("trackmap");
      var pointArray = []
      var timer = null;
      map.centerAndZoom(new BMap.Point(121.487899486, 31.24916171), 14);
      map.enableScrollWheelZoom(true);

      const wareIcon = new BMap.Icon('../../static/img/icon_qzc.png', new BMap.Size(30,32));
      const vehicleIcon = new BMap.Icon('../../static/img/icon_qs.png', new BMap.Size(30,30));

      // 仓库
      util(baseUrl, {
        params: {
          serviceName: wareHouseService,
          method: 'findOrgLoc'
        }
      }).then(response => {
        const data = response.data.data.warehouse
        const page = JSON.parse(data)
        var wPoint = ''
        var wMarker = ''

        page.forEach(function(item) {
          if(item.longitude && item.latitude){
            wPoint = new BMap.Point(item.longitude, item.latitude);
            wMarker = new BMap.Marker(wPoint, {icon: wareIcon});
            pointArray.push(wPoint)
            map.addOverlay(wMarker);
          }
        }, this);

        timer = setTimeout(function(){
          map.setViewport(pointArray);
          clearTimeout(timer)
        }, 100)
      })

      // 骑手
      util(baseUrl, {
        params: {
          serviceName: vehicleService,
          method: 'getOnWayTrack'
        }
      }).then(response => {
        const data = response.data.data.page
        const page = JSON.parse(data).result
        var vPoint = ''
        var vMarker = ''

        page.forEach(function(item) {
          if(item.longitude && item.latitude){
            vPoint = new BMap.Point(item.longitude, item.latitude);
            vMarker = new BMap.Marker(vPoint, {icon: vehicleIcon});
            pointArray.push(vPoint)
            map.addOverlay(vMarker);
          }
        }, this);

        timer = setTimeout(function(){
          map.setViewport(pointArray);
          clearTimeout(timer)
        }, 100)
      })
    }
  }
}
</script>
<style scoped>
.track_map_wrapper, #trackmap {
  width: 100%;
  height: 100%;
}
</style>

