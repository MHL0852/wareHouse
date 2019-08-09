<template>
  <div class="track_map_wrapper">
    <div id="trackmap"></div>
  </div>
</template>

<script>
import BMap from 'BMap';
import $ from 'jquery';
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
      var wareData = [], vehicleData = [];
      var pointArray = [] // 仓库和骑手点总数据
      var wareLabelArray = [], vehicleLabelArray = []; // 仓库点label数据
      var wareMarkerArray = [], vehicleMarkerArray = []; // 仓库点marker数据
      var receivePoint = []; // 收货点、仓库、骑手相关
      var timer = null;

      map.centerAndZoom(new BMap.Point(121.487899486, 31.24916171), 10);
      map.enableScrollWheelZoom(true);

      const wareIcon = new BMap.Icon('static/trackMap/icon_zc.png', new BMap.Size(26,21)); // 总仓
      const preWareIcon = new BMap.Icon('static/trackMap/icon_qzc.png', new BMap.Size(26,28)); // 前置仓
      const vehicleIcon = new BMap.Icon('static/trackMap/icon_qs.png', new BMap.Size(30,30)); // 骑手
      const receiveIcon = new BMap.Icon('static/trackMap/icon_s.png', new BMap.Size(48,50)); // 收货点
      const receiveDoneIcon = new BMap.Icon('static/trackMap/icon_s_done.png', new BMap.Size(48,50)); // 已收货点

      map.addEventListener('click', function(e){
        if(!e.overlay){
          map.clearOverlays() // 清空收货点
          // 清空仓库弹层
          wareLabelArray.forEach(item => {
            item.setStyle({
              display: 'none'
            });
          })
          // 清空骑手弹层
          vehicleLabelArray.forEach(item => {
            item.setStyle({
              display: 'none'
            });
          })
        }
      });

      // 仓库
      util(baseUrl, {
        params: {
          serviceName: 'com.vtradex.order.api.WarehouseApi',
          method: 'findWarehouseList',
          onlineType: 1,
          type: 2
        }
      }).then(response => {
        wareData = JSON.parse(response.data.data.data)
        var wPoint = '', wMarker = '', wLabel;
        var wareType, wareAddress;
        // console.log('仓库', wareData)

        wareData.forEach(function(item) {
          if(item.longitude && item.latitude){
            wPoint = new BMap.Point(item.longitude, item.latitude);
            wMarker = new BMap.Marker(wPoint, {icon: item.type == '1' ? wareIcon : preWareIcon});
            wMarker.disableMassClear()
            pointArray.push(wPoint)
            wareMarkerArray.push(wMarker)
            map.addOverlay(wMarker);

            // 弹层
            wareType = item.type == '1' ? '总仓' : '前置仓'
            wareAddress = (item.locationProvince?item.locationProvince:'') + (item.locationCity?item.locationCity:'') + (item.locationDistrict?item.locationDistrict:'') + (item.locationAddress?item.locationAddress:'')
            wLabel = new BMap.Label('<div class="ware_detal">'
              + '<p>仓路类型：'+ wareType +'</p>'
              + '<p>仓库名称：'+ item.orgName +'</p>'
              + '<p>地址：'+ wareAddress +'</p>'
            + '</div>', { offset: new BMap.Size(34,-10) });
            wLabel.setStyle({
              display: 'none',
              border: 'none',
              background: 'none'
            });
            
            wareLabelArray.push(wLabel)
            wMarker.setLabel(wLabel);
            wMarker.setTitle(item.orgName);

            wareClickHandler(wMarker, wLabel);
          }
        }, this);

        // timer = setTimeout(function(){
        //   map.setViewport(pointArray);
        //   clearTimeout(timer)
        // }, 100)
      })

      // 仓库点击事件
      function wareClickHandler(marker, label){
        marker.addEventListener("click", function(e){
          wareLabelArray.forEach(item => {
            item.setStyle({
              display: 'none'
            });
          })
          wareMarkerArray.forEach(item => {
            item.setTop(false)
          })

          label.setStyle({
            display: 'block'
          });
          marker.setTop(true)
        });
      }

      // 骑手
      util(baseUrl, {
        params: {
          serviceName: vehicleService,
          method: 'getOnWayTrack'
        }
      }).then(response => {
        const data = response.data.data.page
        vehicleData = JSON.parse(data).result
        var vPoint = '', vMarker = '', vLabel, orderHtml = '';
        // console.log('骑手',vehicleData)

        vehicleData.forEach(function(item) {
          if(item.longitude && item.latitude){
            vPoint = new BMap.Point(item.longitude, item.latitude);
            vMarker = new BMap.Marker(vPoint, {icon: vehicleIcon});
            pointArray.push(vPoint)
            vMarker.disableMassClear()
            vehicleMarkerArray.push(vMarker)
            map.addOverlay(vMarker);

            // 骑手详情弹层
            item.orderList.forEach(element => {
              orderHtml += '<p class="dialog_cont_p">'
                orderHtml += '<span class="d_cont_span1">'+ element.orderId +'</span>'
                orderHtml += '<span class="d_cont_span2">'+ element.fromLocationName +'-'+ element.toLoationName +'</span>'
                orderHtml += '<span class="d_cont_span3">'+ getStatus(element.status) +'</span>'
              orderHtml += '</p>' 
            })

            vLabel = new BMap.Label('<div class="dialog_wrapper">'
              + '<div class="dialog_head">'
                + '<h4>'+ item.driverName +'</h4>'
                + '<p>'+ item.driverPhone +'</p>'
                + '<span class="dialog_close">关闭</span>'
              + '</div>'
              + '<div class="dialog_cont_gps">gps：'+ item.driverGpsNumber +'</div>'
                + '<div class="dialog_cont">'
                  + orderHtml      
                + '</div>'
              + '</div>', { offset: new BMap.Size(6, -10) });

            vLabel.setStyle({
              display: 'none',
              border: 'none',
              background: 'none'
            });
            
            vehicleLabelArray.push(vLabel)
            vMarker.setLabel(vLabel);
            vMarker.setTitle(item.driverName);

            vehicleClickHandler(item, vMarker, vLabel);
          }
        }, this);

        // timer = setTimeout(function(){
        //   map.setViewport(pointArray);
        //   clearTimeout(timer)
        // }, 100)
      })

      // 骑手点击事件
      function vehicleClickHandler(item, marker, label){
        marker.addEventListener("click", function(e){
          // console.log(item)
          wareLabelArray.forEach(item => {
            item.setStyle({
              display: 'none'
            });
          })
          vehicleLabelArray.forEach(item => {
            item.setStyle({
              display: 'none'
            });
          })
          wareMarkerArray.forEach(item => {
            item.setTop(false)
          })
          vehicleMarkerArray.forEach(item => {
            item.setTop(false)
          })

          label.setStyle({
            display: 'block'
          });

          var vvPoint = new BMap.Point(item.longitude, item.latitude);

          map.clearOverlays() // 清空收货点
          receivePoint = []  // 3点合一（收货点，仓库，骑手）
          var fromLocationName = [];
          receivePoint.push(vvPoint)

          item.orderList.forEach(function(element) {
            var gPoint = new BMap.Point(element.longitude, element.latitude);
            var gMarker = new BMap.Marker(gPoint, {icon: element.status=='4' ? receiveDoneIcon : receiveIcon});
            gMarker.setTitle(element.toLoationName);
            receivePoint.push(gPoint)
            map.addOverlay(gMarker);
            fromLocationName.push(element.fromLocationName)
            wareData.forEach(function(row, idx){
              if(row.orgName == element.fromLocationName){
                // console.log('123', row)
                receivePoint.push(new BMap.Point(row.longitude, row.latitude))
                var wareStar = new BMap.Marker(new BMap.Point(row.longitude, row.latitude), {
                  icon: new BMap.Symbol(BMap_Symbol_SHAPE_STAR, {
                    scale: 0.6,
                    fillColor: "red",
                    fillOpacity: 0.8,
                    anchor: new BMap.Size(0, -14)
                  })
                });
                wareStar.setTop(true)
                map.addOverlay(wareStar);
              }
            })
          })

          // timer = setTimeout(function(){
          //   map.setViewport(receivePoint);
          //   clearTimeout(timer)
          // }, 100)

          var vectorStar = new BMap.Marker(vvPoint, {
            icon: new BMap.Symbol(BMap_Symbol_SHAPE_STAR, {
              scale: 0.6,
              fillColor: "red",
              fillOpacity: 0.8,
              anchor: new BMap.Size(0, -14)
            })
          });
          vectorStar.setTop(true)
          map.addOverlay(vectorStar);

          // var marker = new BMap.Marker(new BMap.Point(item.longitude, item.latitude));  // 创建标注
          // map.addOverlay(marker);               // 将标注添加到地图中
          // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        });
      }

      $(document).delegate(".dialog_close","click",function(){
        vehicleLabelArray.forEach(item => {
          item.setStyle({
            display: 'none'
          });
        })
      });

      function getStatus(n){
        switch(n){
          case '1': return '待调度'; break;
          case '2': return '已调度'; break;
          case '3': return '在途'; break;
          case '4': return '已送达'; break;
        }
      }
    }
  }
}
</script>

<style>
.track_map_wrapper, #trackmap { width: 100%; height: 100%; }
.track_map_wrapper * { margin: 0; padding: 0; font-size: 13px; }

.track_icon_point { width: 30px; height: 32px; top: 0; left: 0; cursor: pointer; overflow: hidden; }
.dialog_wrapper { position: absolute; top: 10px; left: 24px; width: 350px; background: #fff; box-shadow: 0 0 10px #ccc; border-radius: 2px; }
.dialog_wrapper .dialog_head { height: 36px; line-height: 36px; padding: 0 10px; color: #fff; background: #4e9537; }
.dialog_wrapper .dialog_head h4 { float: left; font-size: 13px; line-height: 36px; width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dialog_wrapper .dialog_head p { float: right; margin-right: 36px; }
.dialog_wrapper .dialog_head .dialog_close { position: absolute; top: 0; right: 8px; }
.dialog_wrapper .dialog_head .dialog_close:hover { color: #ddd; }

.dialog_wrapper .dialog_cont_gps { height: 36px; line-height: 36px; color: #4e9537; padding: 0 10px; border-bottom: 1px solid #d9ead7; }
.dialog_wrapper .dialog_cont { max-height: 200px; overflow-y: auto; padding: 10px; }
.dialog_wrapper .dialog_cont .dialog_cont_p { height: 24px; line-height: 24px; }
.dialog_wrapper .dialog_cont .dialog_cont_p span { float: left; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dialog_wrapper .dialog_cont .dialog_cont_p .d_cont_span1 { width: 22%; }
.dialog_wrapper .dialog_cont .dialog_cont_p .d_cont_span2 { width: 60%; }
.dialog_wrapper .dialog_cont .dialog_cont_p .d_cont_span3 { width: 18%; color: #4e9537; }

.ware_detal { position: relative; width: 240px; padding: 4px 12px 10px; border-radius: 5px; box-shadow: 0 0 3px #ccc; background: #fff; }
.ware_detal:before { content: ''; width:0; height:0; overflow:hidden; font-size: 0; line-height: 0; border-width: 8px; border-style: solid; border-color: transparent #ddd transparent transparent; position: absolute; top: 12px; left: -16px; }
.ware_detal:after { content: ''; width:0; height:0; overflow:hidden; font-size: 0; line-height: 0; border-width: 7px; border-style: solid; border-color: transparent #fff transparent transparent; position: absolute; top: 13px; left: -14px; }
.ware_detal p { white-space: normal; line-height: 20px; margin-top: 6px; color: #666; }

</style>

