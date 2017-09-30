function Charts() {
}

Charts.prototype = {
    /*====== Echarts 页面多图自适应办法chartsResize s========*/
    chartsResize: function (c) {
        window.addEventListener("resize", function () {
            c.resize();
        });
    },


    /*===初始动画的缓动效果函数===*/
    cubicIn: function (k) {
        return k * k * k;
    },



    /*var geoCoordMap = {
        "海门市": [121.15, 31.89],
        "鄂尔多斯市": [109.781327, 39.608266],
        "招远市": [120.38, 37.35]}
        */
    /*知道城市,获取城市坐标*/
    //cityGeoCoord: function (cityname) {
    //    return geoCoordMap[cityname];
    //},


    /*====柱形图barChart  纵坐标为类型,横坐标为值 例如:仪表板的建筑物分类统计f====*/
    // ID:放置图表的容器<div>id
    // JSON: eg:  注意type 和 data 数组要按顺序一一对应
    // var buildingTypeJson = {
    //     "title": "建筑物分类统计",
    //     "type": ["商场", "休闲娱乐场所", "公共服务", "写字楼", "医院", "博物馆"],
    //     "seriesName":"数量",
    //     "data":  [5, 20, 36, 10, 10, 100]
    // }
    // 调用方法:  charts.barChart("main",buildingTypeJson);
    barChart: function (ID, JSON) {
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        // 指定图表的配置项和数据
        var option = {
            //title: {
            //    text: JSON.title
            //},
            tooltip: {},
            grid: {
                left: '0',
                right: '40',
                bottom: '15',
                top: '15',
                containLabel: true
            },
            //visualMap: {
            //    show: false,
            //    min : 0,
            //    max : 20,
            //    calculable : true,
            //    color: ['#d94e5d','#eac736','#50a3ba'],
            //    y:'center',
            //},
            xAxis: {
                type: 'value',
                position:'top',
                axisLabel: {
                    interval: 0,
                    rotate: 30  //旋转角度
                },
                splitLine:{
                    show:false
                },
                splitArea:{
                    show:true,
                },
            },
            yAxis: {
                data: JSON.type,
                axisLabel: {
                    interval: 0,
                    rotate: 0  //旋转角度
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: JSON.seriesName,
                type: 'bar',
                label: {
                    normal: {
                        position: 'right',
                        show: true
                    }
                },
                itemStyle:{
                    normal:{
                        color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                    }
                },
                data: JSON.data,
                //animationDelay: function (idx) {
                //    return idx * 10;
                //}
            }],
            //animationEasing: 'elasticOut',
            //animationDelayUpdate: function (idx) {
            //    return idx * 5;
            //}
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        this.chartsResize(myChart);
    },


    /**折线图lineChart   例子:建筑活跃指数
     *ID:放置图表的容器<div>id
     JSON:  eg:
     var buildingActiveIndexJson = {
     "title": "建筑物活跃指数",
     "startValue": "2000-06-07",
     "endValue": "2000-06-24",
     "seriesName": "活跃指数",
     "dataArray": [
     ["2000-06-05", 116],
     ["2000-06-06", 129],
     ["2000-06-07", 135]
     ]
     }
     调用方法: charts.lineChart("chart4", buildingActiveIndexJson);
    ======*/
    lineChart: function (ID, JSON) {
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var option = {
            //title: {
            //    text: JSON.title
            //},
            tooltip: {
                trigger: 'axis',
                confine:true
            },
            grid: {
                left: '20px',
                right: '100px',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                data: JSON.dataArray.map(function (item) {
                    return item[0];
                })
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            dataZoom: [{
                startValue: JSON.startValue,
                endValue: JSON.endValue
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 0,
                right: 0,
                pieces: [{
                    gt: 0,
                    lte: 100,
                    color: '#096'
                }, {
                    gt: 100,
                    lte: 200,
                    color: '#ff9933'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#cc0033'
                }, {
                    gt: 300,
                    color: '#660099'
                }],
                outOfRange: {
                    color: '#fff'
                }
            },
            series: {
                name: JSON.seriesName,
                type: 'line',
                data: JSON.dataArray.map(function (item) {
                    return item[1];
                }),
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 100
                    }, {
                        yAxis: 200
                    }, {
                        yAxis: 300
                    }]
                }
            }
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },



    /**
     * 多折线图 mulLineChart(ID,JSON)
     * @param ID
     * @param JSON
     */
    mulLineChart: function (ID, JSON) {
        var Array = JSON.data;
        var fitdata = [];
        var col =[];
        var serise = [];
        if(Array && Array.length > 0){
	        for(var j = 0; j < Array[0].length; j++){
	            for (var i = 0; i < Array.length; i++) {
	                col.push(Array[i][j]);
	            }
	            fitdata.push(col);
	            col = [];
	        }
	        for(var z = 1; z < Array[0].length; z++){
	            serise.push({
	                name: JSON.legendData[z-1],
	                type: 'line',
	                data: fitdata[z],
	                symbol:JSON.symbol[z-1],
	                symbolSize:8
	            });
	        }
        }
        var myChart = echarts.init(document.getElementById(ID));
        var option = {
            title:{
                text:JSON.title,
                top:'8px',
                left:'20px'
            },
            tooltip: {
                trigger: 'axis',
                confine:true
            },
            legend: {
                data: JSON.legendData,
                top:'5px',
                right:'20px',
                height:'50px',
                orient:'vertical'
            },
            grid: {
                left: '20px',
                right: '20px',
                bottom: '10px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: fitdata[0]
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    show:false
                }
            },
            color:JSON.color,
            series: serise
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        this.chartsResize(myChart);
    },



    /**
     * 人口统计页面  地图
     * @param ID   放置地图的容器id
     * @param JSON
     * var json = {
             "seriesName": '人口数量',
             "seriesData": [
                 { name: '北京', value: 110 },
                 { name: '天津', value: 555 },
                 { name: '上海', value: 555 },
                 { name: '重庆', value: 555 },
                 { name: '香港', value: 555 },
                 { name: '澳门', value: 555 }
             ]
         }
     调用方法: charts.chinaMap('chinaMap',json);
     */
    chinaMap: function (ID, JSON) {
        var myChart = echarts.init(document.getElementById(ID));
        var option = {
            tooltip: {
                trigger: 'item',
                confine:true
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 20,
                top: 20,
                text: ['高', '低'],
                calculable: true
            },
            series: [{
                name: JSON.seriesName,
                type: 'map',
                mapType: 'china',
                roam: true,
                top:'15',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: JSON.seriesData
            }]
        };
        myChart.setOption(option);
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },



    /**
     * 饼图   eg人口统计页面
     * @param ID
     * @param JSON
     * 饼图   eg 人口统计页面==>人口数量对比
     var PopulationCompareJson = {
         "title": '人口数量对比',
         "seriesNane": '人口数量',
         "seriesData": [
             { value: 335, name: '广州市' },
             { value: 234, name: '惠州市' },
             { value: 135, name: '江门市' }
         ]
     }
     */
    pie: function (ID, JSON) {
        var myChart = echarts.init(document.getElementById(ID));
        var option = {
            title: {
                text: JSON.title,
                x: 5,
                y: 5
            },
            tooltip: {
                trigger: 'item',
                confine:true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [{
                name: JSON.seriesNane,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: JSON.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 热力图与百度地图扩展 eBaiduMap(ID, bmapCenter, data)
     * @param ID
     * @param bmapCenter
     * @param data
     * var datajson = [
     [{"coord": [120.14322240845, 30.236064370321], "elevation": 21},
      {"coord": [120.14322240845, 30.236064370321], "elevation": 21},
      {"coord": [120.14307598649, 30.236125905084], "elevation": 30.7}
     ],
     [{"coord": [120.14322240845, 30.236064370321], "elevation": 21},
     {"coord": [120.14322240845, 30.236064370321], "elevation": 21},
     {"coord": [120.14307598649, 30.236125905084], "elevation": 30.7}
     ]];
     */
    eBaiduMap: function (ID, bmapCenter, data) {
        var myChart = echarts.init(document.getElementById(ID));
        var app = {};
        option = null;
        app.title = '热力图与百度地图扩展';

        var points = [].concat.apply([], data.map(function (track) {
            return track.map(function (seg) {
                return seg.coord.concat([1]); //标注点的大小
            });
        }));
        //console.log(points);
        myChart.setOption(option = {
            animation: false,
            bmap: {
                center: bmapCenter,
                zoom: 12,
                roam: true,
                option: {enableMapClick: false},
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": {
                                "lightness": 20
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#f49935"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#d1e5ff"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#ffffff"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#999999"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#ffffff",
                                "weight": "8",
                                "lightness": 1,
                                "saturation": 16
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {}
                        }
                    ]
                }
            },
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: points,
                pointSize: 5,
                blurSize: 6
            }]
        });
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        }

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 全国城市散点图 ChinaScatterMap(ID, data,url,urlParams)
     * 建筑地理分布  全国散点图建筑采集纵览
     * @param ID
     * @param data
     * @param url
     * @param urlParams
     * @constructor
     * var data =  [
     { name: "海门市", value:[121.15, 31.89,512],cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'商场',value:204}, {name:'写字楼',value:204},{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204},{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}] },
     { name: "鄂尔多斯市",value:[109.781327, 39.608266,568],cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}] },
     { name: "招远市",value:[120.38, 37.35,684], cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}] },
     { name: "舟山市",value:[122.207216,444], cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}]},
     { name: "齐齐哈尔市",value:[123.97, 47.33,957],cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}]}
     ];
     */
    ChinaScatterMap: function (ID, data,url,urlParams) {
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            $('.ibox').off('click','.js-url-select');//解绑事件
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var strParams;
        var option = {
            backgroundColor: '#404a59',
            label: {
                //normal: {
                //    formatter: '{b}',
                //    position: 'right',
                //    show: true
                //},
                emphasis: {
                    show: false
                }
            },
            tooltip: {
                trigger: 'item',
                confine:true,
                enterable: true,
                //position: function (point) {
                //    return [point[0]+15, point[1]-30];
                //},
                formatter: function (params) {
                    strParams = params.data; //全局变量,给全局函数window.paramsPassing()传递
                    //根据数据类目seriseName判断tooltip显示
                    var arraySize = data.length;
                    var items = params.data.items;
                    var html = '';
                    html += '<span class="cityname">'+params.data.name+'</span><br>数量：' + params.value[2];
                    //data有items时
                    if(items){
                        html += '<br>包括：';
                        for (var i = 0; i < items.length; i++) {
                            html += items[i].value + '个<a class="js-url-select">'+items[i].name+'</a>';

                            if(i==(items.length-1)){
                                html += '。'
                            }else{
                                html += '，'
                            }
                            if(((i+1)%3)==0){
                                html += '<br/>';
                            }
                        }
                    }
                    return html;
                }
            },
            visualMap: {
                min: 0,
                max: 1000,
                calculable: true,
                inRange: {
                    color: ['#50a3ba', '#eac736', '#d94e5d']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [{
                name: '建筑数量',
                type: 'scatter',
                coordinateSystem: 'geo',
                //data: this.convertData(data.value),
                data: data,
                symbolSize: 16,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        position:'inside'
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            }]

        };
        myChart.setOption(option);
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            //console.log(params);
            var strParams = params.data;
            if (params.componentType === 'series') {
            	if(!urlParams){
            		urlParams = '&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                }else{
            		urlParams += '&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
            	}
            	jQuery.mapout.form.replace(url,urlParams);
                //window.location = url+ '&cityname=' + encodeURIComponent(params.name);
            }
        });

        //传参数到跳转链接:城市\建筑类型\城市id\省份id\国家id
        $('.ibox').on('click','.js-url-select',function(){
            var selectType = $(this).text();//被点击系列名
            if(!urlParams){
        		urlParams = '&categoryName=' + selectType +'&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
            }else{
        		urlParams += '&categoryName=' + selectType +'&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
        	}
            jQuery.mapout.form.replace(url,urlParams);
            //window.location.href = url+ '&cityname=' + cityname + '&selectname=' + selectname;
        });
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * POI点显示到国家级别
     * 建筑地理分布  地图 eg:brandMapCity.html(品牌地理分布/UNIQLO)
     * @param ID
     * @param Array  [JSON01, JSON02]
     * 商场
     var JSON01 = {
         'seriesName': '商场', //系列名
         'itemStyleColor':'purple', //系列标注点颜色
         'data': [{              //系列数据
             name: '海门',
             value: [121.15, 31.89, 9]
         }, {
             name: '鄂尔多斯',
             value: [109.781327, 39.608266, 12]
         }, {
             name: '招远',
             value: [120.38, 37.35, 12]
         }, s{
             name: '青岛',
             value: [120.33, 36.07, 30]
         }]
     }

     var array = [JSON01, JSON02, JSON03];//建筑地理分布  地图
     调用方法: charts.buildingMap('eBaiduMap', array);
     */
    buildingMap: function (ID, Array) {

        var series = []; // 设置series的属性
        var legendData = []; //设置图例

        for (var i = 0; i < Array.length; i++) {
            //var seriesJson = Array[i]; //整个系列Json数据
            var seriesName = Array[i].seriesName; //系列名
            var seriesData = Array[i].data; //系列数据
            var itemStyleColor = Array[i].itemStyleColor;
            // 设置series的属性
            series.push({
                name: seriesName,
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: seriesData,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    //normal: {
                    //    formatter: '{b}',
                    //    position: 'right',
                    //    show: true
                    //},
                    emphasis: {
                        show: false
                    }
                },
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: itemStyleColor,
                        borderColor: '#000',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 3
                    }
                },
                zlevel: i,
                animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var app = {};
        option = null;

        myChart.setOption(option = {
            tooltip: {
                show: true,
                trigger: 'item',
                confine:true,
                enterable: true,
                position: function (point) {
                    return [point[0]+15, point[1]-30];
                },
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 15px;padding-bottom: 7px;margin-bottom: 7px">' + obj.name + ' - ' + obj.seriesName + '</div>' + value[2];
                },
                extraCssText: 'width:300px; white-space: normal !important;'
            },

            legend: {
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom:20,
                data: legendData,
                // selected: {
                //     // 选中'系列1'
                //     '商场': true,
                //     // 不选中'系列2'
                //     '医院': false
                // },
                textStyle: {
                    fontWeight: 'bolder',
                    fontSize: 14
                },
                padding: [20, 15],
                backgroundColor: 'rgba(255, 255, 255, .7)',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                zlevel: 100
            },
            series: series,
            bmap: {
                center: [104.114129, 37.550339],
                zoom: 5,
                roam: true,
                option: {enableMapClick: false},
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": {
                                "lightness": 20
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#f49935"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#d1e5ff"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#ffffff"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#999999"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#ffffff",
                                "weight": "8",
                                "lightness": 1,
                                "saturation": 16
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {}
                        }
                    ]
                }

            }

        });
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        };

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * POI点显示到城市级别 buildingMapCity(ID, bmapCenter, data)
     *  eg:buildingMapCity.html
     * @param ID
     * @param bmapCenter   城市中心点坐标,为地图显示的中心坐标eg:　[116.46, 39.92]
     * @param data　　
     * //商场
     var buildingMapJson01 = {
        'seriesName': '商场', //系列名
        'itemStyleColor': '#e91e1e', //系列标注点颜色
        'data': [{ //系列数据
            name: '华润万家',
            value: [115.25, 39.26, '为您提供优质跨境商品，是您品质生活的好选择。'],
        }, {
            name: '好又多',
            value: [116.52, 39.60, '为您提供优质跨境商品，是您品质生活的好选择。'],
        }]
    　}
     var data = [buildingMapJson01, buildingMapJson02］;
     charts.buildingMapCity('eBaiduMap', [116.46, 39.92], data);
     */
    buildingMapCity: function (ID, bmapCenter, data) {

        var series = []; // 设置series的属性
        var legendData = []; //设置图例

        for (var i = 0; i < data.length; i++) {
            //var seriesJson = Array[i]; //整个系列Json数据
            var seriesName = data[i].seriesName; //系列名
            var seriesData = data[i].data; //系列数据
            var itemStyleColor = data[i].itemStyleColor;
            // 设置series的属性
            series.push({
                name: seriesName,
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: seriesData,
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        //color: itemStyleColor,
                        borderColor: '#000',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 3,
                        symbolSize: 30
                    }
                },
                zlevel: i+1,
                animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var app = {};
        option = null;

        myChart.setOption(option = {
            tooltip: {
                show: true,
                trigger: 'item',
                enterable: true,
                confine:true,
                //position: function (point) {
                //    return [point[0]+15, point[1]-30];
                //},
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 15px;padding-bottom: 7px;margin-bottom: 7px">' + obj.name + ' - ' + obj.seriesName + '</div>' + value[2];
                },
                extraCssText: 'width:300px; white-space: normal !important;'
            },

            legend: {
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom:20,
                data: legendData,
                textStyle: {
                    fontWeight: 'bolder',
                    fontSize: 14
                },
                padding: [20, 15],
                backgroundColor: 'rgba(255, 255, 255, .7)',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                zlevel: 100
            },
            series: series,
            color:['#f16969','#60ace8','#f99e2b','#8192d6','#d9b3e6','#dcf7a1','#83fcd8','#90c156','#199475','#57427d','#ffe3fb','#58d2e8','#ffe957','#bdbd6a','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            bmap: {
                center: bmapCenter,
                zoom: 12,
                roam: true,
                option: {enableMapClick: false},
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": {
                                "lightness": 20
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#f49935"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#d1e5ff"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#ffffff"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#999999"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#ffffff",
                                "weight": "8",
                                "lightness": 1,
                                "saturation": 16
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {}
                        }
                    ]
                }
            }
        });
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        };

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 学区房  eg:schoolRoomMap.html
     * @param ID
     * @param bmapCenter
     * @param data
     * @param url
     * @param urlParams
     */
    schoolRoomMap: function (ID, bmapCenter,data,url,urlParams) {

        var series = []; // 设置series的属性
        var legendData = []; //设置图例

        for (var i = 0; i < data.length; i++) {
            var seriesJson = data[i]; //整个系列Json数据
            var seriesName = data[i].seriesName; //系列名
            var seriesData = data[i].data; //系列数据
            var itemStyleColor = data[i].itemStyleColor;
            // 设置series的属性
            series.push({
                name: seriesName,
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: seriesData,
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        //color: itemStyleColor,
                        borderColor: '#000',
                        borderWidth: 2
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 3
                    }
                },
                zlevel: i,
                animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var app = {};
        option = null;

        myChart.setOption(option = {
            tooltip: {
                show: true,
                trigger: 'item',
                enterable: true,
                confine:true,
                position: function (point, params, dom) {
                    return [point[0]+15, point[1]-30];
                },
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.5); font-size: 15px;padding-bottom: 7px;margin-bottom: 7px">' + obj.name + ' - ' + obj.seriesName + '</div>' + value[2];
                },
                extraCssText: 'width:300px; white-space: normal !important;'
            },

            legend: {
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom:20,
                data: legendData,
                textStyle: {
                    fontWeight: 'bolder',
                    fontSize: 14
                },
                padding: [20, 15],
                backgroundColor: 'rgba(255, 255, 255, .7)',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                zlevel: 100,
            },
            series: series,
            bmap: {
                center: bmapCenter,
                zoom: 12,
                roam: true,
                option: {enableMapClick: false},
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": {
                                "lightness": 20
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#f49935"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#d1e5ff"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#ffffff"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#999999"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#ffffff",
                                "weight": "8",
                                "lightness": 1,
                                "saturation": 16
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {}
                        }
                    ]
                }
            }
        });
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        };
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                if(!urlParams){
                    urlParams = '&name='+params.name;
                }else{
                    urlParams += '&name='+params.name;
                }
                jQuery.mapout.form.replace(url,urlParams);
            }
        });

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 地铁房  eg:schoolRoomMap.html
     * @param ID
     * @param bmapCenter
     * @param data
     * @param url
     * @param urlParams
     */
    subwayRoomMap: function (ID, bmapCenter, data,url,urlParams) {

        var series = []; // 设置series的属性
        var legendData = []; //设置图例

        for (var i = 0; i < data.length; i++) {
            //var seriesJson = Array[i]; //整个系列Json数据
            var seriesName = data[i].seriesName; //系列名
            var seriesData = data[i].data; //系列数据
            var itemStyleColor = data[i].itemStyleColor;
            // 设置series的属性
            series.push({
                name: seriesName,
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: seriesData,
                //label: {
                //    normal: {
                //        formatter: '{b}',
                //        position: 'right',
                //        show: true
                //    },
                //    emphasis: {
                //        show: false
                //    }
                //},
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: itemStyleColor,
                        borderColor: '#000',
                        borderWidth: 2
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 3
                    }
                },
                zlevel: i,
                animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        //myChart.showLoading({
        //    text : "图表数据正在努力加载...",
        //    effect :'spin',//'spin' | ' bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
        //    zlevel:1000
        //});
        var app = {};
        option = null;

        myChart.setOption(option = {
            tooltip: {
                show: true,
                trigger: 'item',
                enterable: true,
                confine:true,
                position: function (point, params, dom) {
                    return [point[0]+15, point[1]-30];
                },
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.5); font-size: 15px;padding-bottom: 7px;margin-bottom: 7px">' + obj.name + ' - ' + obj.seriesName + '</div>' + value[2];
                },
                extraCssText: 'width:300px; white-space: normal !important;'
            },

            legend: {
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom:20,
                data: legendData,
                textStyle: {
                    fontWeight: 'bolder',
                    fontSize: 14
                },
                padding: [20, 15],
                backgroundColor: 'rgba(255, 255, 255, .7)',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                zlevel: 100
            },
            series: series,
            bmap: {
                center: bmapCenter,
                zoom: 12,
                roam: true,
                option: {enableMapClick: false},
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": {
                                "lightness": 20
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#f49935"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#d1e5ff"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#ffffff"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#999999"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#ffffff",
                                "weight": "8",
                                "lightness": 1,
                                "saturation": 16
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "weight": "4",
                                "visibility": "on"
                            }
                        }
                    ]
                }
            }
        });
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        };
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                if(!urlParams){
                    urlParams = '&name='+params.name;
                }else{
                    urlParams += '&name='+params.name;
                }
                jQuery.mapout.form.replace(url,urlParams);
            }
        });

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
        //myChart.hideLoading();
    },


    /**
     * 矩形树图   eg:品牌统计
     * @param ID 容器id
     * @param diskData
     * var diskData = [
     {
         "value": 40,
         "name": "Accessibility",
         "path": "Accessibility"
     },
     {
         "value": 180,
         "name": "Accounts",
         "path": "Accounts",
         "children": [
             {
                 "value": 76,
                 "name": "Access",
                 "path": "Accounts/Access",
                 "children": [
                     {
                         "value": 12,
                         "name": "DefaultAccessPlugin.bundle",
                         "path": "Accounts/Access/DefaultAccessPlugin.bundle"
                     },
                     {
                         "value": 28,
                         "name": "FacebookAccessPlugin.bundle",
                         "path": "Accounts/Access/FacebookAccessPlugin.bundle"
                     },
                     {
                         "value": 20,
                         "name": "LinkedInAccessPlugin.bundle",
                         "path": "Accounts/Access/LinkedInAccessPlugin.bundle"
                     },
                     {
                         "value": 16,
                         "name": "TencentWeiboAccessPlugin.bundle",
                         "path": "Accounts/Access/TencentWeiboAccessPlugin.bundle"
                     }
                 ]
             }
         ]
     }];
     */
    rectTreeMap: function (ID, diskData) {
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var formatUtil = echarts.format;
        myChart.setOption(option = {
            tooltip: {
                confine:true,
                formatter: function (info) {
                    var value = info.value;
                    var treePathInfo = info.treePathInfo;
                    var treePath = [];

                    for (var i = 1; i < treePathInfo.length; i++) {
                        treePath.push(treePathInfo[i].name);
                    }

                    return [
                        '<div>' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                        '品牌数量: ' + formatUtil.addCommas(value)
                    ].join('');
                }
            },

            series: [{
                name: '品牌数量',
                type: 'treemap',
                visibleMin: 300,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                levels: [{
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                            gapWidth: 5
                        }
                    }
                }, {
                    itemStyle: {
                        normal: {
                            gapWidth: 1
                        }
                    }
                }, {
                    colorSaturation: [0.35, 0.5],
                    itemStyle: {
                        normal: {
                            gapWidth: 1,
                            borderColorSaturation: 0.6
                        }
                    }
                }],
                data: diskData
            }]
        });
        //窗口变化图表大小自适应
        this.chartsResize(myChart);

    },


    /**
     * 公交线路 busLinesMap(ID,bmapCenter,data);
     * @param ID
     * @param bmapCenter
     * @param data
     */
    busLinesMap:function (ID,bmapCenter,data) {
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var app = {};
        var option = null;
        var hStep = 300 / (data.length - 1);
        var busLines = [].concat.apply([], data.map(function (busLine, idx) {
            var prevPt=[];
            var points = [];
            for (var i = 0; i < busLine.length; i += 2) {
                var pt = [busLine[i], busLine[i + 1]];
                if (i > 0) {
                    pt = [
                        prevPt[0] + pt[0],
                        prevPt[1] + pt[1]
                    ];
                }
                prevPt = pt;

                points.push([pt[0] / 1e4, pt[1] / 1e4]);
            }
            return {
                coords: points,
                lineStyle: {
                    normal: {
                        color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
                    }
                }
            };
        }));
        myChart.setOption(option = {

            series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: busLines,
                silent: true,
                lineStyle: {
                    normal: {
                        //color: '#c23531',
                        //color: 'rgb(200, 35, 45)',
                        opacity: 0.5,
                        width: 0.8
                    }
                },
                progressiveThreshold: 500,
                progressive: 200
            }, {
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: busLines,
                lineStyle: {
                    normal: {
                        width: 0
                    }
                },
                effect: {
                    constantSpeed: 20,
                    show: true,
                    trailLength: 0.1,
                    symbolSize: 1.5
                },
                zlevel: 1
            }],
            bmap: {
                center: bmapCenter,
                zoom: 11,
                roam: true,
                option: {enableMapClick: false},
                mapStyle: {
                    'styleJson': [
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#031628'
                            }
                        },
                        {
                            'featureType': 'land',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000102'
                            }
                        },
                        {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#0b3d51'
                            }
                        },
                        {
                            'featureType': 'local',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#08304b'
                            }
                        },
                        {
                            'featureType': 'subway',
                            'elementType': 'geometry',
                            'stylers': {
                                'lightness': -70
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#857f7f'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.stroke',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'green',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#062032'
                            }
                        },
                        {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#465b6c'
                            }
                        },
                        {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'label',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }
                    ]
                }
            }
        });
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    },


    /**
     * 云词图  wordcloud(ID,data)
     * @param ID
     * @param data
     * var data = [{
        name: 'Sam S Club',
        value: 10000,
        textStyle: {
            normal: {
                color: 'black'
            },
            emphasis: {
                color: 'red'
            }
        }
    }, {
        name: 'Macys',
        value: 6181
    }, {
        name: 'Amy Schumer',
        value: 4386
    }
     */
    wordcloud:function(ID,data,url){
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if(!myChart){
            myChart = echarts.init(document.getElementById(ID));
        }else{
            myChart.clear();
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var option = {
            tooltip: {confine:true},
            series: [{
                type: 'wordCloud',
                gridSize: 20,
                sizeRange: [12, 50],
                rotationRange: [-15,15],
                shape: 'circle',
                width:'95%',
                height:'95%',
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: data
            }]
        };
        myChart.setOption(option);
        myChart.on("click", function(param){
            //console.log(param,url+ '&name=' + param.name);
            window.location.href = url+ '?name=' + param.name ;
        });
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 地图和柱形图结合 MapWithBar(ID,data)
     * @param ID
     * @param data
     * var data =[
     { name: "海门市", value:[121.15, 31.89,100],cityId:1,provinceId:1,countryId:1},
     { name: "鄂尔多斯市",value:[109.781327, 39.608266,58],cityId:1,provinceId:1,countryId:1},
     { name: "招远市",value:[120.38, 37.35,84], cityId:1,provinceId:1,countryId:1},
     ];
     */
    MapWithBar:function(ID,data){
        var dom = document.getElementById(ID);
        var myChart = echarts.init(dom);
        var app = {};
        option = null;

        var convertedData = [
            data,
            data.sort(function (a, b) {
                return b.value[2] - a.value[2];
            }).slice(0, 6)
        ];

        var option = {
            backgroundColor: '#404a59',
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            title: [
                {
                    text: '全国主要城市 人均办公面积',
                    subtext: 'data from Mapout',
                    sublink: 'http://www.mapout.net',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                {
                    id: 'statistic',
                    right: 120,
                    top: 40,
                    width: 100,
                    textStyle: {
                        color: '#fff',
                        fontSize: 16
                    }
                }
            ],
            toolbox: {
                iconStyle: {
                    normal: {
                        borderColor: '#fff'
                    },
                    emphasis: {
                        borderColor: '#b1e4ff'
                    }
                }
            },
            brush: {
                outOfBrush: {
                    color: '#abc'
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                seriesIndex: [0, 1],
                throttleType: 'debounce',
                throttleDelay: 300,
                geoIndex: 0
            },
            geo: {
                map: 'china',
                left: '10',
                right: '35%',
                center: [117.98561551896913, 31.205000490896193],
                zoom: 2.5,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            tooltip : {
                trigger: 'item',
                confine:true

            },
            grid: {
                right: 40,
                top: 100,
                bottom: 40,
                width: '30%'
            },
            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {margin: 2, textStyle: {color: '#aaa'}},
            },
            yAxis: {
                type: 'category',
                name: 'TOP 20',
                nameGap: 16,
                axisLine: {show: false, lineStyle: {color: '#ddd'}},
                axisTick: {show: false, lineStyle: {color: '#ddd'}},
                axisLabel: {interval: 0, textStyle: {color: '#ddd'}},
                data: []
            },
            series : [
                {
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData[0],
                    symbolSize: function (val) {
                        return Math.max(val[2] / 10, 8);
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertedData[1],
                    symbolSize: function (val) {
                        return Math.max(val[2] / 10, 8);
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    id: 'bar',
                    zlevel: 2,
                    type: 'bar',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    },
                    data: []
                }
            ]
        };


        myChart.on('brushselected', renderBrushed);

        // myChart.setOption(option);

        setTimeout(function () {
            myChart.dispatchAction({
                type: 'brush',
                areas: [
                    {
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [[119.72,34.85],[119.68,34.85],[119.5,34.84],[119.19,34.77],[118.76,34.63],[118.6,34.6],[118.46,34.6],[118.33,34.57],[118.05,34.56],[117.6,34.56],[117.41,34.56],[117.25,34.56],[117.11,34.56],[117.02,34.56],[117,34.56],[116.94,34.56],[116.94,34.55],[116.9,34.5],[116.88,34.44],[116.88,34.37],[116.88,34.33],[116.88,34.24],[116.92,34.15],[116.98,34.09],[117.05,34.06],[117.19,33.96],[117.29,33.9],[117.43,33.8],[117.49,33.75],[117.54,33.68],[117.6,33.65],[117.62,33.61],[117.64,33.59],[117.68,33.58],[117.7,33.52],[117.74,33.5],[117.74,33.46],[117.8,33.44],[117.82,33.41],[117.86,33.37],[117.9,33.3],[117.9,33.28],[117.9,33.27],[118.09,32.97],[118.21,32.7],[118.29,32.56],[118.31,32.5],[118.35,32.46],[118.35,32.42],[118.35,32.36],[118.35,32.34],[118.37,32.24],[118.37,32.14],[118.37,32.09],[118.44,32.05],[118.46,32.01],[118.54,31.98],[118.6,31.93],[118.68,31.86],[118.72,31.8],[118.74,31.78],[118.76,31.74],[118.78,31.7],[118.82,31.64],[118.82,31.62],[118.86,31.58],[118.86,31.55],[118.88,31.54],[118.88,31.52],[118.9,31.51],[118.91,31.48],[118.93,31.43],[118.95,31.4],[118.97,31.39],[118.97,31.37],[118.97,31.34],[118.97,31.27],[118.97,31.21],[118.97,31.17],[118.97,31.12],[118.97,31.02],[118.97,30.93],[118.97,30.87],[118.97,30.85],[118.95,30.8],[118.95,30.77],[118.95,30.76],[118.93,30.7],[118.91,30.63],[118.91,30.61],[118.91,30.6],[118.9,30.6],[118.88,30.54],[118.88,30.51],[118.86,30.51],[118.86,30.46],[118.72,30.18],[118.68,30.1],[118.66,30.07],[118.62,29.91],[118.56,29.73],[118.52,29.63],[118.48,29.51],[118.44,29.42],[118.44,29.32],[118.43,29.19],[118.43,29.14],[118.43,29.08],[118.44,29.05],[118.46,29.05],[118.6,28.95],[118.64,28.94],[119.07,28.51],[119.25,28.41],[119.36,28.28],[119.46,28.19],[119.54,28.13],[119.66,28.03],[119.78,28],[119.87,27.94],[120.03,27.86],[120.17,27.79],[120.23,27.76],[120.3,27.72],[120.42,27.66],[120.52,27.64],[120.58,27.63],[120.64,27.63],[120.77,27.63],[120.89,27.61],[120.97,27.6],[121.07,27.59],[121.15,27.59],[121.28,27.59],[121.38,27.61],[121.56,27.73],[121.73,27.89],[122.03,28.2],[122.3,28.5],[122.46,28.72],[122.5,28.77],[122.54,28.82],[122.56,28.82],[122.58,28.85],[122.6,28.86],[122.61,28.91],[122.71,29.02],[122.73,29.08],[122.93,29.44],[122.99,29.54],[123.03,29.66],[123.05,29.73],[123.16,29.92],[123.24,30.02],[123.28,30.13],[123.32,30.29],[123.36,30.36],[123.36,30.55],[123.36,30.74],[123.36,31.05],[123.36,31.14],[123.36,31.26],[123.38,31.42],[123.46,31.74],[123.48,31.83],[123.48,31.95],[123.46,32.09],[123.34,32.25],[123.22,32.39],[123.12,32.46],[123.07,32.48],[123.05,32.49],[122.97,32.53],[122.91,32.59],[122.83,32.81],[122.77,32.87],[122.71,32.9],[122.56,32.97],[122.38,33.05],[122.3,33.12],[122.26,33.15],[122.22,33.21],[122.22,33.3],[122.22,33.39],[122.18,33.44],[122.07,33.56],[121.99,33.69],[121.89,33.78],[121.69,34.02],[121.66,34.05],[121.64,34.08]]
                    }
                ]
            });
        }, 0);


        function renderBrushed(params) {
            var mainSeries = params.batch[0].selected[0];

            var selectedItems = [];
            var categoryData = [];
            var barData = [];
            var maxBar = 30;
            var sum = 0;
            var count = 0;

            for (var i = 0; i < mainSeries.dataIndex.length; i++) {
                var rawIndex = mainSeries.dataIndex[i];
                var dataItem = convertedData[0][rawIndex];
                var pmValue = dataItem.value[2];

                sum += pmValue;
                count++;

                selectedItems.push(dataItem);
            }

            selectedItems.sort(function (a, b) {
                return a.value[2] - b.value[2];
            });

            for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
                categoryData.push(selectedItems[i].name);
                barData.push(selectedItems[i].value[2]);
            }

            this.setOption({
                yAxis: {
                    data: categoryData
                },
                xAxis: {
                    axisLabel: {show: !!count}
                },
                title: {
                    id: 'statistic',
                    text: count ? '平均: ' + (sum / count).toFixed(4) : ''
                },
                series: {
                    id: 'bar',
                    data: barData
                }
            });
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }


};
//生成FunManage类实例
var charts = null;
$(function () {
    charts = new Charts();
});
