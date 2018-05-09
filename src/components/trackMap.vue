<template>
  <div class="track_map_wrapper">
    <div id="trackmap" v-on:click="globalClick"></div>
  </div>
</template>

<script>
import BMap from 'BMap';
import $ from 'jquery';
import {util} from "../API"
import {baseUrl, wareHouseService, vehicleService} from '@/libs/constant'

export default {
  data(){
    return {
      oMap: {},  // 地图对象
      vehicleData: [],  // 骑手数据
      receivePoint: []  // 收货点
    }
  },
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
      this.oMap = map
      map.centerAndZoom(new BMap.Point(121.487899486, 31.24916171), 14);
      map.enableScrollWheelZoom(true);

      const wareIcon = new BMap.Icon('static/trackMap/icon_qzc.png', new BMap.Size(30,32));
      const vehicleIcon = new BMap.Icon('static/trackMap/icon_qs.png', new BMap.Size(30,30));

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
        this.vehicleData = page;
        // console.log('骑手',page)

        page.forEach(function(item) {
          if(item.longitude && item.latitude){
            vPoint = new BMap.Point(item.longitude, item.latitude);
            pointArray.push(vPoint)
            vMarker = new BMap.Marker(vPoint);
            // vMarker = new BMap.Marker(vPoint, {icon: vehicleIcon});
            // map.addOverlay(vMarker);

            var mouseoverObj = {
              id: item.id,
              name: item.driverName,
              phone: item.driverPhone || '',
              gps: item.driverGpsNumber || '',
              orderList: item.orderList
            };
            var myCompOverlay = new ComplexCustomOverlay(vPoint, mouseoverObj);
            map.addOverlay(myCompOverlay);
          }
        }, this);

        timer = setTimeout(function(){
          map.setViewport(pointArray);
          clearTimeout(timer)
        }, 100)
      })

      // 骑手自定义覆盖物
      function ComplexCustomOverlay(point, mouseoverText){
        this._point = point;
        this._overText = mouseoverText;
      }

      ComplexCustomOverlay.prototype = new BMap.Overlay();
      ComplexCustomOverlay.prototype.initialize = function(map){
        var that = this;
        that._map = map;
        that.getTitle = function(){ return '' }

        var div = that._div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(that._point.lat);
        div.style.width = "34px";
        div.style.height = "34px";

        // 骑手图标
        var i_point = this.i_point = document.createElement("div");
        i_point.setAttribute("data-id", that._overText.id);
        i_point.className = "track_icon_point";
        i_point.style.position = "absolute";
        i_point.style.background = "url('static/trackMap/icon_qs.png') no-repeat";
        div.appendChild(i_point);

        // 弹窗
        var tipDialog = document.createElement("div");
        tipDialog.className = "dialog_wrapper";
        div.appendChild(tipDialog);

        // 头部信息
        var d_head = document.createElement("div");
        d_head.className = "dialog_head";
        tipDialog.appendChild(d_head);

        var d_head_name = document.createElement("h4");
        d_head.appendChild(d_head_name);
        d_head_name.appendChild(document.createTextNode(that._overText.name));

        var d_head_phone = document.createElement("p");
        d_head.appendChild(d_head_phone);
        d_head_phone.appendChild(document.createTextNode(that._overText.phone));

        var d_cont_gps = document.createElement("div");
        d_cont_gps.className = "dialog_cont_gps";
        tipDialog.appendChild(d_cont_gps);
        d_cont_gps.appendChild(document.createTextNode('gps：'+ that._overText.gps));

        // 主体信息
        var d_cont = document.createElement("div");
        d_cont.className = "dialog_cont";
        tipDialog.appendChild(d_cont);

        var len = that._overText.orderList.length;
        var d_cont_p, d_cont_span1, d_cont_span2, d_cont_span3;
        for(var i=0; i<len; i++){
          d_cont_p = document.createElement("p");
          d_cont_p.className = "dialog_cont_p";
          d_cont.appendChild(d_cont_p);

          d_cont_span1 = document.createElement("span");
          d_cont_span1.className = "d_cont_span1";
          d_cont_p.appendChild(d_cont_span1);
          d_cont_span1.appendChild(document.createTextNode(that._overText.orderList[i].orderId));

          d_cont_span2 = document.createElement("span");
          d_cont_span2.className = "d_cont_span2";
          d_cont_span2.title = that._overText.orderList[i].fromLocationName+'-'+that._overText.orderList[i].toLoationName;
          d_cont_p.appendChild(d_cont_span2);
          d_cont_span2.appendChild(document.createTextNode(that._overText.orderList[i].fromLocationName+'-'+that._overText.orderList[i].toLoationName));

          d_cont_span3 = document.createElement("span");
          d_cont_span3.className = "d_cont_span3";
          d_cont_p.appendChild(d_cont_span3);
          d_cont_span3.appendChild(document.createTextNode(getStatus(that._overText.orderList[i].status)));
        }

        div.onmouseover = function(){
          $(this).find('.dialog_wrapper').show()
        }
        div.onmouseout = function(){
          $(this).find('.dialog_wrapper').hide()
        }

        map.getPanes().labelPane.appendChild(div);
        return div;
      }

      ComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 20 + "px";
        this._div.style.top  = pixel.y - 24 + "px";
      }

      function getStatus(n){
        switch(n){
          case '1': return '待调度'; break;
          case '2': return '已调度'; break;
          case '3': return '在途'; break;
          case '4': return '已送达'; break;
        }
      }
    },
    /**
     * 骑手收货点
     */
    globalClick(e){
      var that = this;
      // 清空收货点
      var allOverlay = that.oMap.getOverlays();
      if(that.receivePoint.length>0){
        for (var i = 1; i < allOverlay.length -1; i++){
          if(allOverlay[i].getTitle() == "收货点"){
            that.oMap.removeOverlay(allOverlay[i]);
          }
        }
      }
  
      if(e.target.className == 'track_icon_point'){
        that.receivePoint = []
        const id = e.target.getAttribute("data-id");
        const receiveIcon = new BMap.Icon('static/trackMap/icon_s.png', new BMap.Size(48,50));
        const receiveDoneIcon = new BMap.Icon('static/trackMap/icon_s_done.png', new BMap.Size(48,50));

        that.vehicleData.forEach(function(item) {
          if(item.id == id){
            var receiveList = item.orderList;
            receiveList.forEach(function(element) {
              var point = new BMap.Point(element.longitude, element.latitude);
              var marker = new BMap.Marker(point, {icon: element.status=='4'?receiveDoneIcon:receiveIcon});
              that.receivePoint.push(point)
              that.oMap.addOverlay(marker);
              marker.setTitle('收货点');
            })

            var timer = setTimeout(function(){
              that.oMap.setViewport(that.receivePoint);
              clearTimeout(timer)
            }, 100)
          }
        })
      }
    }
  }
}
</script>

<style>
.track_map_wrapper, #trackmap { width: 100%; height: 100%; }
.track_map_wrapper * { margin: 0; padding: 0; font-size: 13px; }

.track_icon_point { width: 30px; height: 32px; top: 0; left: 0; cursor: pointer; overflow: hidden; }
.dialog_wrapper { position: absolute; top: 10px; left: 24px; width: 350px; background: #fff; box-shadow: 0 0 10px #ccc; border-radius: 2px; display: none; }
.dialog_wrapper .dialog_head { height: 36px; line-height: 36px; padding: 0 10px; color: #fff; background: #4e9537; }
.dialog_wrapper .dialog_head h4 { float: left; font-size: 13px; line-height: 36px; width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dialog_wrapper .dialog_head p { float: right; }

.dialog_wrapper .dialog_cont_gps { height: 36px; line-height: 36px; color: #4e9537; padding: 0 10px; border-bottom: 1px solid #d9ead7; }
.dialog_wrapper .dialog_cont { max-height: 200px; overflow-y: auto; padding: 10px; }
.dialog_wrapper .dialog_cont .dialog_cont_p { height: 24px; line-height: 24px; }
.dialog_wrapper .dialog_cont .dialog_cont_p span { float: left; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dialog_wrapper .dialog_cont .dialog_cont_p .d_cont_span1 { width: 22%; }
.dialog_wrapper .dialog_cont .dialog_cont_p .d_cont_span2 { width: 60%; }
.dialog_wrapper .dialog_cont .dialog_cont_p .d_cont_span3 { width: 18%; color: #4e9537; }
</style>

