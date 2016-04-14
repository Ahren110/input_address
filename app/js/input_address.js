/*
 * @fileOverview input_address
 * @version 1.0
 *
 * @author Chen http://www.findchen.com
 * @see http://github.com/ChanMo/input_address
 *
 */

/*
 *
 * Changelog
 * $Date: 2016-01-11
 * $version: 1.0
 *
 */

/*
 * See (http://jquery.com/).
 * @name $
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

input_address = new Object();

/**
 * add html content to template, then show it
 * init address
 **/
function init_address(){
  var html = '\
  <div id="input_address_modal">\
    <div class="title">\
    <i onclick="close_modal()" class="fa fa-angle-left"></i>\
    <input type="text" class="search_name" onfocus="init_search()" onchange="search(this)" \
      placeholder="请输入想要搜索的位置名称"\
      >\
    <i onclick="init_map()" class="fa fa-remove hide"></i>\
    </div>\
    <div class="modal_current">\
      <div id="map"></div>\
    </div>\
    <div class="modal_search">\
    </div>\
    <ul></ul>\
  </div>';
  $("body").append(html);
  modal = $("#input_address_modal");
  modal.show();
  init_map();
}

/**
 * search
 */
function init_search(){
  modal.find(".modal_current").hide();
  modal.find(".modal_search").show();
  modal.find(".fa-remove").show();
  modal.find("ul").html('');
}

/**
 * let map div show
 * search div hidden
 */
function init_map(){
  modal.find(".modal_current").show();
  modal.find(".modal_search").hide();
  modal.find(".fa-remove").hide();
  modal.find("ul").html('');
  create_map();
}


/**
 * init create map
 */
function create_map(){
  var map, geolocation;
  map = new AMap.Map('map', {
    resizeEnable: true
  });
  map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      buttonOffset: new AMap.Pixel(10, 20),
      zoomToAccuracy: true,
      buttonPosition:'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', function(data){
      get_pois(data.position.getLng(), data.position.getLat());
    });
  });
  map.on('moveend', function(e){
    data = map.getCenter();
    get_pois(data.getLng(), data.getLat());
  });
}


/**
 * get location list
 * and show them
 * every li has longitude, latitude, city, and name
 */
function get_pois(longitude, latitude)
{
  modal.find("ul").html('');
  var url = 'http://restapi.amap.com/v3/geocode/regeo?key='+input_address.key+'&location='+longitude+','+latitude+'&batch=false&extensions=all';
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data){
      if(data.status){
        modal.data('current_city', data.regeocode.addressComponent.citycode);
        for(var i=0;i<data.regeocode.pois.length;i++){
          modal.find("ul").append('<li onclick="select_address(this)" data-longitude="'+longitude+'" data-latitude="'+latitude+'" data-city="'+data.regeocode.addressComponent.citycode+'"><i class="fa fa-map-marker"></i><div class="li-name">香格里拉</div><div class="li-address">'+data.regeocode.pois[i].businessarea+data.regeocode.pois[i].name+'</div></li>');
        }
      }
    }
  });
}


/**
 * search location
 */
function search(){
  modal.find("ul").html('');
  var search = modal.find(".search_name").val();
  var city = modal.data('current_city');
  var url = 'http://restapi.amap.com/v3/place/text?key='+input_address.key+'&keywords='+search+'&city='+city+'&citylimit=true&extensions=all';
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data){
      if(data.status){
        for(var i=0; i<data.count; i++){
          modal.find("ul").append('<li onclick="select_address(this)" data-longitude="'+data.pois[i].location.split(",")[0]+'" data-latitude="'+data.pois[i].location.split(",")[1]+'" data-city="'+data.pois[i].citycode+'"><i class="fa fa-map-marker"></i><div class="li-name">hhh</div><div class="li-address">'+data.pois[i].name+','+data.pois[i].address+'</div></li>');
        }
      }
    }
  });
}

/** select address **/
function select_address(e){
  $(input_address.address_name).val($(e).find(".li-name").html());
  $(input_address.address_address).val($(e).find(".li-address").html());
  $(input_address.address_longitude).val($(e).data('longitude'));
  $(input_address.address_latitude).val($(e).data('latitude'));
  close_modal();
}

function close_modal(){
  modal.remove();
}
