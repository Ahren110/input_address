手机端选址组件
==============

基于高德地图接口的选址组件

使用说明
--------

申请高德key:

- `KEY1` 用于Web服务API
- `KEY2` 用于JavaScript API

引入基础文件:

.. code-block::

    ...
    <link href="http://cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" src="input_address.css">
    ...

    ...
    <script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.js"></script>
    <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=KEY1"></script>
    <script src="js/input_address.js"></script>
    ...

配置JS变量:

.. code-block::

    <script>
      $(function(){
        input_address.key = 'KEY2';
        input_address.address_name = '';
        input_address.address_address = '';
        input_address.address_longitude = '';
        input_address.address_latitude = '';
      });
    </script>

+--------------------+--------------------+------------+
| 参数名             | 作用               | 示例       |
+====================+====================+============+
| key                | 高德JavaScript API |            +
+--------------------+--------------------+------------+
| address_name       | 用来获取地址名     | .name      |
+--------------------+--------------------+------------+
| address_address    | 用来存储详细地址   | .address   |
+--------------------+--------------------+------------+
| address_longtitude | 用来存储经度       | .longitude |
+--------------------+--------------------+------------+
| address_latitude   | 用来存储维度       | .latitude  |
+--------------------+--------------------+------------+
