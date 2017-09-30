function Charts() {


}
var clickCount = 0;
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
    // 调用方法:  charts.barChart("main",buildingTypeJson,themeColor);
    barChart: function (ID, JSON, themeColor) {

        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var odata = JSON.data;
        var dataHasStyle = [];
        var themeColor = themeColor || ['#3fb1e3', '#6be6c1', '#626c91'];
        for (var i = 0; i < odata.length; i++) {
            dataHasStyle.push({
                value: odata[i],
                itemStyle: {
                    normal: {
                        color: themeColor[i % 3]
                    }
                }
            })
        }
        // 指定图表的配置项和数据
        var option = {
            //title: {
            //    text: JSON.title
            //},
            tooltip: {
                formatter: '{b}<br />{a}：{c} '
            },
            grid: {
                left: '0',
                right: '30',
                bottom: '10',
                top: '10',
                containLabel: true
            },
            //visualMap: {
            //    show: false,
            //    min : 0,
            //    max : 20,
            //    //calculable : true,
            //    color: ['#3fb1e3','#6be6c1','#626c91'],
            //    //y:'center',
            //},
            xAxis: {
                show: false,
                name: '数量',
                nameTextStyle: {
                    color: '#222',
                    fontWeight: 'bolder',
                    fontSize: '12'
                },
                nameLocation: 'end',
                type: 'value',
                position: 'top',
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#222'
                    },
                    interval: 0,
                    rotate: -60  //旋转角度
                },
                boundaryGap: ['0%', '10%'],
                axisLine: {
                    lineStyle: {
                        color: '#333',
                        width: '2'
                    }
                },
                axisTick: {
                    length: 8,
                    lineStyle: {
                        width: 2
                    }
                },
                splitLine: {show: false, lineStyle: {type: 'dashed'}}

            },
            yAxis: {
                name: '类型',
                nameTextStyle: {
                    color: '#366694',
                    fontWeight: 'bolder',
                    fontSize: '12'

                },
                nameLocation: 'end',
                nameGap: '5',
                data: JSON.type,
                axisLabel: {
                    textStyle: {
                        color: '#222'
                    },
                    interval: 0,
                    rotate: 0  //旋转角度
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#366694',
                        width: '2'
                    }
                },
                axisTick: {
                    length: 4,
                    lineStyle: {
                        width: 2
                    }
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
                barCategoryGap: '40%',
                barMinHeight: '3',
                barMaxWidth: '12',

                //itemStyle:{
                //    normal:{
                //        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                //        color:"#209e91"
                //    }
                //},
                data: dataHasStyle
                //animationDelay: function (idx) {
                //    return idx * 10;
                //}
            }]
            //animationEasing: 'elasticOut',
            //animationDelayUpdate: function (idx) {
            //    return idx * 5;
            //}
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        this.chartsResize(myChart);
    },


    /*
    * 柱形图2 横坐标为类型，纵坐标为数值，eg 平均到访次数、 年龄柱形图
     var ageBarJson = {
     "title": "年龄",
     "type": ["18岁以下", "19-24岁", "25-34岁", "35-44岁", "45-54岁", "55岁以上"],
     "yAxisName":"（指数）",
     "data":  [30000, 140000, 260000, 120000, 42000, 15000]
     }
     charts.barChart2('ageBarChart',ageBarJson);
    * */
    barChart2:function(ID, JSON) {

        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                formatter: function(item){
                    var html = '<div style="width:100px;text-align: center;background-color:#8a8acb;color:#fff"><p>'+item.name+'</p><p style="font-size: 18px">'+item.value+'</p></div>'
                    return html;
                },
                backgroundColor:'#8a8acb',
                borderColor:'#8a8acb',
                padding:[10,5]
            },
            yAxis: {
                name: JSON.yAxisName,
                nameTextStyle:{
                    color:'#ccc'
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    lineStyle:{
                        color: '#ddd'
                    }
                },
                axisLabel:{
                    textStyle: {
                        color:'#999'
                    }
                }

            },
            xAxis: {
                data: JSON.type,
                axisLine:{
                    show:true,
                    lineStyle: {
                        color: '#ccc',
                    }
                },
                axisTick:{
                    inside:true,
                },
                axisLabel:{
                    textStyle: {
                        color:'#999'
                    }
                }
            },
            legend: {
                data:[JSON.title],
                right:'10%'
            },
            series: [{
                name: JSON.title,
                type: 'bar',
                label: {
                    normal: {
                        position: 'top',
                        show: false
                    }
                },
                barCategoryGap: '40%',
                barMinHeight: '3',
                barMaxWidth: '25',
                itemStyle:{
                    normal:{
                        color:'#8a8acb'
                    },
                    emphasis:{
                        color:'#9999d2'
                    }
                },
                data: JSON.data
            }]
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
        var myChart = echarts.getInstanceByDom(document.getElementById(ID), 'walden');
        if (!myChart) {
            myChart = echarts.init(document.getElementById(ID), 'walden');
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID), 'walden');//新建echarts对象
        }
        var option = {
            //title: {
            //    text: JSON.title
            //},
            tooltip: {
                trigger: 'axis',
                confine: true
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
                    color: '#009933'
                }, {
                    gt: 100,
                    lte: 200,
                    color: '#336699'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#FF6600'
                }, {
                    gt: 300,
                    color: '#3FB1E3'
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
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3,
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowBlur: 10,
                        shadowOffsetY: 10
                    }
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
     * var JSON = {
        'title':'客流指数趋势',
        'legendData': ['客流指数'],
        'data': [
            ['2017.3.1', 150010],
            ['2017.3.2', 151000],
            ['2017.3.3', 158000],
            ['2017.3.4', 166000],
            ['2017.3.5', 181000],
            ['2017.3.6', 110480],
            ['2017.3.7', 117476]
        ]
    }
     charts.mulLineChart("flowCharts", JSON);
     */
    mulLineChart: function (ID, JSON) {
        var Array = JSON.data;
        var fitdata = [];
        var col = [];
        var serise = [];
        if (Array && Array.length > 0) {
            for (var j = 0; j < Array[0].length; j++) {
                for (var i = 0; i < Array.length; i++) {
                    col.push(Array[i][j]);
                }
                fitdata.push(col);
                col = [];
            }
            for (var z = 1; z < Array[0].length; z++) {
                serise.push({
                    name: JSON.legendData[z - 1],
                    type: 'line',
                    data: fitdata[z],
                    //symbol:JSON.symbol[z-1],
                    //symbolSize:8,
                    //smooth:true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            shadowColor: 'rgba(0,0,0,0.4)',
                            shadowBlur: 5,
                            shadowOffsetY: 5
                        }
                    }
                });
            }
        }
        var myChart = echarts.init(document.getElementById(ID));
        var option = {
            //title:{
            //    text:JSON.title,
            //    top:'8px',
            //    left:'20px',
            //    textStyle:{
            //        fontSize:14
            //    }
            //
            //},
            tooltip: {
                trigger: 'axis',
                confine: true
            },
            legend: {
                data: JSON.legendData,
                top: '5px',
                right: '20px',
                //height:'50px',
                //orient:'vertical'
            },
            grid: {
                left: '0px',
                right: '20px',
                bottom: '10px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: fitdata[0],
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: {
                name: '（指数）',
                show: true,
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            //color:JSON.color,
            series: serise
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        this.chartsResize(myChart);
    },


    /*环图 适应多种类别 显示百分比环图 嵌套环形图的外环
     var revenueJson = {
     seriesName:'收入范围',
     data:[
     {value:263004, name:'中产'},
     {value:65372, name:'富人'},
     {value:58839, name:'工薪一族'},
     {value:348, name:'富豪'}
     ]
     }
     charts.ringChartMul('revenueChart',revenueJson);
    * */

    ringChartMul:function (ID,JSON){
        var myChart = echarts.init(document.getElementById(ID));
        var option =  {
            color:['rgb(249, 126, 178)','rgb(136, 181, 255)','rgb(253, 169, 149)','rgb(138, 138, 203)'],
            //tooltip: {
            //    trigger: 'item',
            //    formatter: "{b}: {c} ({d}%)"
            //},
            //legend: {
            //    orient: 'vertical',
            //    x: 'left',
            //    data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
            //},
            label:{
                normal:{
                    formatter:"{b} : {d}%"
                },
                emphasis:{
                    formatter:"{b} : {d}%"
                }

            },
            series: [
                {
                    name:JSON.seriesName,
                    type:'pie',
                    radius: ['40%', '55%'],
                    data:JSON.data
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //窗口变化图表大小自适应
        this.chartsResize(myChart);

    },


    /*环图 只适应一种类别 显示百分比环图 嵌套环形图的外环*/
    ringChartOne: function (ID, percnetNum, color) {
        //百分数转小数
        function toPoint(percent) {
            var str = percent.replace("%", "");
            str = str / 100;
            return str;
        }
        var num = toPoint(percnetNum);
        var color = color || 'red';
        var theme = {//两种默认样式
            red: {
                data: {
                    normal: {
                        color: "#f97eb2"
                    },
                    emphasis: {
                        color: "#f97ecd"
                    }
                },
                bg: {
                    normal: {
                        color: "#feddea"
                    },
                    emphasis: {
                        color: "#feddea"
                    }
                }
            },
            blue: {
                data: {
                    normal: {
                        color: "#8fa4dd"
                    },
                    emphasis: {
                        color: "#7791d8"
                    }
                },
                bg: {
                    normal: {
                        color: "#cdd9f8"
                    },
                    emphasis: {
                        color: "#cdd9f8"
                    }
                }
            }

        }
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var option = {
            series: {
                name: '',
                type: 'pie',
                radius: ['55%', '75%'],
                hoverAnimation: false,
                legendHoverLink: false,
                clockwise: false,
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: num,
                        itemStyle: theme[color].data
                    },
                    {
                        value: (1 - num),
                        itemStyle: theme[color].bg,
                    },
                ]
            }

        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //窗口变化图表大小自适应
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
        var myChart = echarts.init(document.getElementById(ID), 'macarons');
        var option = {
            tooltip: {
                trigger: 'item',
                confine: true
            },
            visualMap: {
                min: JSON.visualMap.min,
                max: JSON.visualMap.max,
                left: 20,
                top: 20,
                text: ['高', '低'],
                calculable: true,
                //inRange: {
                //    color: ['rgba(3,4,5,0.4)', 'red'],
                //    symbolSize: [30, 100]
                //}
            },
            series: [{
                name: JSON.seriesName,
                type: 'map',
                mapType: 'china',
                roam: true,
                top: '15',
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
        myChart.on('click', function (params) {
            console.log(params);
            // 控制台打印数据的名称
            console.log(params.name);
        });
    },


    /**
     * 扇形图   eg人口统计页面
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
                confine: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [{
                name: JSON.seriesName,
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
     * 扇形图   eg职业分布 扇形图
     * @param ID
     * @param JSON

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
    pie2: function (ID, JSON,color) {

        var myChart = echarts.init(document.getElementById(ID));
        var option = {
            color: color || ['rgb(253, 169, 149)','rgb(101, 218, 235)','rgb(106, 163, 255)','rgb(166, 200, 255)','rgb(209, 234, 174)','rgb(138, 138, 203)','rgb(249, 126, 178)'],
            label:{
                normal:{
                    formatter:"{b} : {d}%"
                },
                emphasis:{
                    formatter:"{b} : {d}%"
                }

            },
            series: [{
                name: JSON.seriesName,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: JSON.data,
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
     * 热力图与百度地图扩展 eBaiduMap(ID, mapCenter, data)
     * @param ID
     * @param mapCenter
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
    eBaiduMap: function (ID, mapCenter, data) {
        var myChart = echarts.init(document.getElementById(ID));
        var app = {};

        app.title = '热力图与百度地图扩展';

        var points = [].concat.apply([], data.map(function (track) {
            return track.map(function (seg) {
                return seg.coord.concat([1]); //标注点的大小
            });
        }));
        //console.log(points);
        var option = {
            animation: false,
            bmap: {
                center: mapCenter,
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
        }
        myChart.setOption(option);
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        }

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 全国城市散点图
     ChinaScatterMap({
            ID:'ChinaScatterMap',
            data:data,
            seriesClick:function(strParams){
                var urlParams = "&regionId=" + regionId+ "&brandId=" + brandId+"&brandName=" + brandName +　'&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                jQuery.mapout.form.replace(url,urlParams);
            },
            tooltipClick:function(strParams,clickText){
                var urlParams = "&regionId=" + regionId+ "&brandId=" + brandId+"&brandName=" + brandName + '&categoryName=' + clickText +'&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                jQuery.mapout.form.replace(url,urlParams);
            }
        });
     var data = [
     { name: "海门市", value:[121.15, 31.89],cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'商场',value:204}, {name:'写字楼',value:204},{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204},{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}] },
     { name: "鄂尔多斯市",value:[109.781327, 39.608266],cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}] },
     { name: "招远市",value:[120.38, 37.35], cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}] },
     { name: "舟山市",value:[122.207216], cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}]},
     { name: "齐齐哈尔市",value:[123.97, 47.33],cityId:1,provinceId:1,countryId:1,items: [{name:'商场',value:204}, {name:'写字楼',value:204},{name:'地铁站',value:204}]}
     ];
     */
    ChinaScatterMap: function (p) {
        var defaults = {
            ID: '',
            data: '',
            seriesClick: function (strParams) {
            },//点击 地图上散点 时
            tooltipClick: function (strParams, clickText) {
            }//点击 弹出框上的建筑类型 时
        };

        var settings = $.extend({}, defaults, p);

        //计算总数
        $.each(settings.data, function (i, a) {
            if (a.items && a.items != 0) {
                var tatalNum = 0;
                $.each(a.items, function (i, a) {
                    tatalNum += a.value;
                });
                a.value[2] = tatalNum;
            }
        });


        var myChart = echarts.getInstanceByDom(document.getElementById(settings.ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(settings.ID));
        } else {
            echarts.dispose(myChart);//销毁
            $('.ibox').off('click', '.js-url-select');//解绑事件
            myChart = echarts.init(document.getElementById(settings.ID));//新建echarts对象
        }
        var strParams = [];
        var option = {
            backgroundColor: '#5A6C86',
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
                confine: true,
                enterable: true,
                //position: function (point) {
                //    return [point[0]+15, point[1]-30];
                //},
                formatter: function (params) {
                    strParams = params.data; //全局变量,给全局函数window.paramsPassing()传递
                    //根据数据类目seriseName判断tooltip显示
                    var arraySize = settings.data.length;
                    var items = params.data.items;
                    var html = '';
                    html += '<span class="cityname">' + params.data.name + '</span><br>数量：' + params.value[2];
                    //data有items时
                    if (items) {
                        html += '<br>包括：';
                        for (var i = 0; i < items.length; i++) {
                            html += items[i].value + '个<a class="js-url-select">' + items[i].name + '</a>';

                            if (i == (items.length - 1)) {
                                html += '。'
                            } else {
                                html += '，'
                            }
                            if (((i + 1) % 3) == 0) {
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
                data: settings.data,
                symbolSize: 16,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        position: 'inside'
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
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            var strParams = params.data;
            if (params.componentType === 'series') {
                //console.log(strParams);
                settings.seriesClick(strParams);

                //if(!settings.urlParams){
                //   settings.urlParams = '&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                //}else{
                //   settings.urlParams += '&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                //}
                //jQuery.mapout.form.replace(settings.url,settings.urlParams);
                //window.location = url+ '&cityname=' + encodeURIComponent(params.name);
            }
        });

        //传参数到跳转链接:城市\建筑类型\城市id\省份id\国家id
        $('.ibox').on('click', '.js-url-select', function () {
            var clickText = $(this).text();//被点击系列名
            //console.log(strParams);
            settings.tooltipClick(strParams, clickText);

            //if(!settings.urlParams){
            //    settings.urlParams = '&categoryName=' + clickText +'&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
            //}else{
            //    settings.urlParams += '&categoryName=' + clickText +'&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
            //}
            //jQuery.mapout.form.replace(settings.url,settings.urlParams);
            //window.location.href = url+ '&cityname=' + cityname + '&selectname=' + selectname;
        });

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
        if (!myChart) {
            myChart = echarts.init(document.getElementById(ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var app = {};
        option = null;

        myChart.setOption(option = {
            tooltip: {
                show: true,
                trigger: 'item',
                confine: true,
                enterable: true,
                position: function (point) {
                    return [point[0] + 15, point[1] - 30];
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
                bottom: 20,
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
        }
        ;

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * POI点显示到城市级别 buildingMapCity
     *  eg:buildingMapCity.html

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
     charts.buildingMapCity({
            ID : 'eBaiduMap',
            mapCenter:[116.46, 39.92],  //城市中心点坐标,为地图显示的中心坐标eg:　[116.46, 39.92]
            data : data,
            seriesClick:function(strParams){},//点击 地图上散点 时
            pagemode:true
        });
     */
    buildingMapCity: function (p) {
        var defaults = {
            ID: '',
            mapCenter: '',
            data: '',
            seriesClick: function (strParams) {
            },//点击 地图上散点 时
            pagemode: false//图例是否启用分页
        };

        var settings = $.extend({}, defaults, p);


        var series = []; // 设置series的属性
        var legendData = []; //设置图例
        var iconArray = {
            '公共服务': 'path://M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM22 8c1.105 0 2 1.343 2 3s-0.895 3-2 3-2-1.343-2-3 0.895-3 2-3zM10 8c1.105 0 2 1.343 2 3s-0.895 3-2 3-2-1.343-2-3 0.895-3 2-3zM16 28c-5.215 0-9.544-4.371-10-9.947 2.93 1.691 6.377 2.658 10 2.658s7.070-0.963 10-2.654c-0.455 5.576-4.785 9.942-10 9.942z',	//笑脸
            '图书馆': "path://M1002.35776 205.44s-54.53312-45.312-110.26944-69.16608C831.44192 107.20768 745.728 108.544 745.728 108.544s-60.40064-4.45952-122.30144 24.72448-107.58656 68.83328-107.58656 68.83328-63.15008-48.25088-118.95808-73.50784S260.54656 108.544 260.54656 108.544s-76.63616 3.8912-125.94176 26.05568c-49.31072 22.15936-94.59712 74.8544-94.59712 74.8544V889.088s69.7088-60.24704 111.27296-77.184 106.59328-16.37376 106.59328-16.37376 77.88544 9.33376 124.30336 28.06272c46.42304 18.7392 133.66272 88.21248 133.66272 88.21248s55.60832-59.25888 100.23936-81.53088c75.68896-39.09632 150.71232-33.41312 150.71232-33.41312s46.1056 2.01216 110.2592 26.06592c58.33216 21.87264 126.48448 67.49696 126.48448 67.49696l-1.1776-684.98432z",
            '汽车站': 'path://M1024 476.279467c0 0 0 33.4848 0 41.591467 0 72.362667 0 136.6528 0 136.6528 0 15.479467-12.100267 28.040533-27.016533 28.040533l-41.284267 0c0-56.610133-45.8752-102.5024-102.4512-102.5024s-102.4512 45.8752-102.4512 102.5024L290.304 682.564267c-0.017067-56.610133-45.8752-102.5024-102.468267-102.5024-56.558933 0-102.434133 45.8752-102.4512 102.5024L27.0336 682.564267c-14.916267 0-27.016533-12.544-27.016533-28.040533L0.017067 318.173867C0.017067 290.423467 17.988267 273.066667 44.100267 273.066667c0 0 811.3152 0 844.032 0s98.4576 43.281067 124.125867 101.870933C1025.655467 406.289067 1024 476.279467 1024 476.279467zM170.786133 324.317867 78.574933 324.317867c-15.086933 0-27.323733 12.219733-27.323733 27.306667l0 81.834667c0 15.086933 12.2368 27.2896 27.323733 27.2896l92.2112 0L170.786133 324.317867zM324.471467 324.317867l-119.534933 0 0 136.413867 119.534933 0L324.471467 324.317867zM477.610667 324.317867l-119.005867 0 0 136.413867 119.005867 0L477.610667 324.317867zM631.210667 324.317867l-119.005867 0 0 136.413867 119.005867 0L631.210667 324.317867zM784.896 324.317867l-119.534933 0 0 136.413867 119.534933 0L784.896 324.317867zM784.8448 524.919467c0-7.0144-7.645867-12.6976-17.083733-12.6976s-17.066667 5.6832-17.066667 12.6976l0 25.361067c0 7.0144 7.6288 12.6976 17.066667 12.6976s17.083733-5.6832 17.083733-12.6976L784.8448 524.919467zM966.024533 404.155733c-11.008-46.728533-71.3728-79.837867-88.1152-79.837867-41.0112 0-58.845867 0-58.845867 0l0 136.413867L971.741867 460.8C971.741867 460.8 974.848 441.719467 966.024533 404.155733zM187.835733 614.2464c37.717333 0 68.3008 30.600533 68.3008 68.352 0 37.7344-30.583467 68.334933-68.3008 68.334933-37.7344 0-68.3008-30.600533-68.3008-68.334933C119.534933 644.846933 150.101333 614.2464 187.835733 614.2464zM853.265067 614.2464c37.717333 0 68.3008 30.600533 68.3008 68.352 0 37.7344-30.583467 68.334933-68.3008 68.334933-37.7344 0-68.317867-30.600533-68.317867-68.334933C784.9472 644.846933 815.530667 614.2464 853.265067 614.2464z',//公交车
            '火车站': 'path://M898.56 513.536c-87.04 6.656-330.24 26.112-330.24 26.112-4.096-23.552 4.096-75.264 4.096-75.264 146.944 23.04 295.936 31.744 325.632 30.72l0.512-57.344c-163.84-8.704-304.64-104.448-304.64-104.448-78.336-60.928-167.936-47.616-167.936-47.616-35.84 1.536-71.68 13.824-100.352 38.4-38.4 32.256-73.216 75.776-102.912 117.76-35.328 49.664-50.176 103.424-19.968 160.768 9.728 18.432 22.528 35.328 35.84 50.176 3.072 3.584 14.336 18.944 19.456 18.944-23.04 12.8-57.344 32.768-87.04 54.272h68.608s44.544-29.184 89.6-52.736c29.696 0.512 63.488 1.024 91.648 2.048-19.456 12.8-60.928 39.424-91.648 64.512h68.096s128-82.432 233.984-100.864l-10.752 1.536c211.968-52.224 278.016-55.296 278.016-55.296v-71.68z m-641.536 12.288c-23.552 0-42.496-10.752-42.496-24.064s18.944-24.064 42.496-24.064 42.496 10.752 42.496 24.064-18.944 24.064-42.496 24.064zM377.856 396.8l-86.016-4.096s38.912-51.2 51.2-54.272l52.736 1.024-17.92 57.344z m38.4-55.808l74.24 2.048 0.512 57.856-89.088-3.072 14.336-56.832z m-2.56 160.768c0-13.312 18.944-24.064 42.496-24.064 23.552 0 42.496 10.752 42.496 24.064s-18.944 24.064-42.496 24.064c-23.552 0-42.496-10.752-42.496-24.064z',
            '地铁': "path://M154.315369 713.427545c0 86.390036 70.19612 156.665868 156.487026 156.665868L243.736527 937.235928V959.616766h536.526946v-22.380838l-67.065868-67.142515C799.489533 870.093413 869.684631 799.817581 869.684631 713.427545V243.42994C869.684631 86.764072 709.620758 64.383234 512 64.383234S154.315369 86.764072 154.315369 243.42994v469.997605z m357.684631 67.142515c-49.181637 0-89.421158-40.285509-89.421158-89.523353 0-49.237844 40.239521-89.523353 89.421158-89.523354s89.421158 40.285509 89.421158 89.523354c0 49.237844-40.239521 89.523353-89.421158 89.523353z m268.263473-313.331737h-536.526946v-223.808383h536.526946v223.808383z",
            '机场': 'path://M24 19.999l-5.713-5.713 13.713-10.286-4-4-17.141 6.858-5.397-5.397c-1.556-1.556-3.728-1.928-4.828-0.828s-0.727 3.273 0.828 4.828l5.396 5.396-6.858 17.143 4 4 10.287-13.715 5.713 5.713v7.999h4l2-6 6-2v-4l-7.999 0z',	//飞机
            '医院': "path://M924.540777 509.923712l0 461.82525L98.920964 971.748962 98.920964 509.923712 0.021489 509.923712l0-98.903567L528.074094 48.095391l495.365134 362.924753 0 98.903567L924.540777 509.923712 924.540777 509.923712zM511.732917 278.579763c-154.802692 0-280.367479 125.564787-280.367479 280.360316 0 154.807808 125.564787 281.228079 280.367479 281.228079C666.534586 840.168158 792.094256 714.603371 792.094256 559.801702 792.094256 405.005151 666.534586 278.579763 511.732917 278.579763L511.732917 278.579763zM561.609884 741.269707l-99.760075 0 0-132.446521L330.264912 608.823186l0-98.899474 132.446521 0L462.711434 377.48333l98.898451 0 0 132.441405 132.446521 0 0 98.899474-132.446521 0L561.609884 741.269707 561.609884 741.269707 561.609884 741.269707zM561.609884 741.269707",
            '博物馆': "path://M811.68 449.664c0-40.128-7.936-78.656-22.848-113.792-12.864-31.648-31.424-60.512-54.112-85.664l15.808-15.328c5.792-6.08 5.792-15.776-0.384-21.44-5.92-6.208-15.424-5.984-21.216 0L703.36 238.816l-0.288 0.416-0.576 0.32-28.576 28.736C631.2 231.04 575.136 208 514.016 208c-66.912 0-127.296 27.328-170.944 70.816l0 0.064c-43.776 43.744-70.752 104.128-70.752 170.752 0 61.408 22.656 117.536 60.448 159.904l-55.392 55.136c-5.728 6.016-5.728 15.552 0 21.568 5.984 6.016 15.936 6.016 21.568 0l15.328-15.552c25.184 22.624 54.112 40.992 85.728 54.368L400 724.8l0.16 0.256c27.904 11.328 57.696 18.624 88.672 21.312l0 4.192 0 46.624-96.736 0c-14.144 0-25.12 11.552-25.12 25.44 0 14.016 10.976 25.376 25.12 25.376l121.216 0 0.704 0 0.736 0 121.152 0c13.888 0 25.12-11.36 25.12-25.376 0-13.888-11.264-25.44-25.12-25.44l-96.736 0 0-46.624c0-1.44 0-2.624-0.352-4.192 30.912-2.304 60.8-9.888 88.064-21.056l0.96-0.256c36.48-15.264 68.928-37.376 96.832-64.8l-0.288 0c27.584-27.552 49.536-60.128 64.48-96.64C803.744 528.64 811.68 490.208 811.68 449.664zM760.928 552.064c-13.568 32.8-33.568 62.112-57.856 86.624-24.768 24.8-54.304 44.576-87.168 58.24l-0.384 0.384c-31.296 12.992-65.888 19.744-101.568 19.744-36.544 0-71.072-7.264-102.336-20.128-27.84-11.68-53.76-27.872-75.84-47.808l18.496-18.432c42.368 37.952 98.56 60.864 159.68 60.864 65.952 0 125.856-26.88 169.312-69.824l1.28-1.248c43.872-43.68 71.008-104 71.008-170.848 0-61.056-22.912-117.312-60.416-159.712l18.304-18.4c19.776 22.368 35.808 47.872 47.424 75.904 13.152 31.584 20.512 66.016 20.512 102.208C781.44 486.112 774.08 520.608 760.928 552.064z",
            '商场': 'path://M12 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3zM32 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3zM32 16v-12h-24c0-1.105-0.895-2-2-2h-6v2h4l1.502 12.877c-0.915 0.733-1.502 1.859-1.502 3.123 0 2.209 1.791 4 4 4h24v-2h-24c-1.105 0-2-0.895-2-2 0-0.007 0-0.014 0-0.020l26-3.98z',	//购物车
            '高校': "path://M1252.430769 370.215385c7.876923-39.384615-7.876923-70.892308-47.261538-86.646154L748.307692 23.630769c-70.892308-39.384615-157.538462-39.384615-236.307692 0L47.261538 291.446154c-23.630769 0-39.384615 23.630769-47.261538 39.384615-7.876923 39.384615 7.876923 70.892308 47.261538 86.646154L236.307692 527.753846V787.692308c0 102.4 0 236.307692 393.846154 236.307692 385.969231 0 393.846154-133.907692 393.846154-236.307692V527.753846l78.769231-47.261538V708.923077c0 47.261538 31.507692 78.769231 78.769231 78.769231s78.769231-31.507692 78.76923-78.769231V393.846154c0-7.876923 0-15.753846-7.876923-23.630769zM267.815385 315.076923l291.446153-141.784615c47.261538-23.630769 102.4-23.630769 141.784616 0L992.492308 315.076923c39.384615 23.630769 39.384615 55.138462 0 70.892308L701.046154 535.630769c-47.261538 23.630769-102.4 23.630769-141.784616 0L267.815385 393.846154c-39.384615-23.630769-39.384615-55.138462 0-78.769231zM630.153846 866.461538c-259.938462 0-236.307692-133.907692-236.307692-236.307692v-15.753846l118.153846 63.015385c70.892308 39.384615 157.538462 39.384615 236.307692 0l118.153846-63.015385V630.153846c0 102.4 23.630769 236.307692-236.307692 236.307692z",
            '酒店': "path://M817.161165 494.010277l-155.880233 0L661.280932 378.747113l74.687026 0L430.258301 69.260433 124.548644 378.747113l74.687026 0 0 521.05626c0 32.827663 26.610054 59.435671 59.435671 59.435671l105.117083 0 0-68.156286c0-24.518417 9.533121-44.393069 21.293979-44.393069l88.302115 0c11.759835 0 21.292955 19.874653 21.292955 44.393069l0 68.156286 59.423391 0 0.01228 0 263.048021 0c32.825616 0 59.435671-26.608008 59.435671-59.435671l0-346.358449C876.596835 520.622378 849.986781 494.010277 817.161165 494.010277zM398.503063 721.473849c0 21.88238-17.740036 39.623439-39.623439 39.623439l-26.792203 0c-21.883403 0-39.623439-17.742083-39.623439-39.623439l0-16.938788c0-21.88238 17.740036-39.623439 39.623439-39.623439l26.792203 0c21.883403 0 39.623439 17.742083 39.623439 39.623439L398.503063 721.473849zM398.503063 588.6968c0 21.88238-17.740036 39.623439-39.623439 39.623439l-26.792203 0c-21.883403 0-39.623439-17.742083-39.623439-39.623439l0-16.933671c0-21.886473 17.740036-39.623439 39.623439-39.623439l26.792203 0c21.883403 0 39.623439 17.736966 39.623439 39.623439L398.503063 588.6968zM398.503063 454.386838c0 21.886473-17.740036 39.623439-39.623439 39.623439l-26.792203 0c-21.883403 0-39.623439-17.736966-39.623439-39.623439l0-16.933671c0-21.88238 17.740036-39.623439 39.623439-39.623439l26.792203 0c21.883403 0 39.623439 17.742083 39.623439 39.623439L398.503063 454.386838zM563.637054 721.473849c0 21.88238-17.740036 39.623439-39.623439 39.623439l-26.79118 0c-21.884426 0-39.623439-17.742083-39.623439-39.623439l0-16.938788c0-21.88238 17.739013-39.623439 39.623439-39.623439l26.79118 0c21.883403 0 39.623439 17.742083 39.623439 39.623439L563.637054 721.473849zM563.637054 588.6968c0 21.88238-17.740036 39.623439-39.623439 39.623439l-26.79118 0c-21.884426 0-39.623439-17.742083-39.623439-39.623439l0-16.933671c0-21.886473 17.739013-39.623439 39.623439-39.623439l26.79118 0c21.883403 0 39.623439 17.736966 39.623439 39.623439L563.637054 588.6968zM563.637054 454.386838c0 21.886473-17.740036 39.623439-39.623439 39.623439l-26.79118 0c-21.884426 0-39.623439-17.736966-39.623439-39.623439l0-16.933671c0-21.88238 17.739013-39.623439 39.623439-39.623439l26.79118 0c21.883403 0 39.623439 17.742083 39.623439 39.623439L563.637054 454.386838zM798.643416 846.753133c0 10.946306-8.870018 19.812231-19.812231 19.812231l-36.82265 0c-10.942213 0-19.812231-8.865925-19.812231-19.812231l0-29.712719c0-10.946306 8.870018-19.812231 19.812231-19.812231l36.82265 0c10.942213 0 19.812231 8.865925 19.812231 19.812231L798.643416 846.753133zM798.643416 716.699102c0 10.94119-8.870018 19.812231-19.812231 19.812231l-36.82265 0c-10.942213 0-19.812231-8.871041-19.812231-19.812231l0-29.717835c0-10.94119 8.870018-19.811208 19.812231-19.811208l36.82265 0c10.942213 0 19.812231 8.871041 19.812231 19.811208L798.643416 716.699102zM798.643416 586.640977c0 10.946306-8.870018 19.812231-19.812231 19.812231l-36.82265 0c-10.942213 0-19.812231-8.865925-19.812231-19.812231l0-29.712719c0-10.945283 8.870018-19.812231 19.812231-19.812231l36.82265 0c10.942213 0 19.812231 8.865925 19.812231 19.812231L798.643416 586.640977z",
            '写字楼': "path://M1066.164706 1024H18.070588C8.101647 1024 0 1016.094118 0 1006.351059c0-9.758118 8.101647-17.664 18.070588-17.664h36.141177v-578.108235l469.835294-163.418353v741.526588h36.141176V0l469.835294 105.923765v882.763294h36.141177c9.968941 0 18.070588 7.905882 18.070588 17.664 0 9.743059-8.101647 17.648941-18.070588 17.648941zM271.058824 794.488471c0-9.758118-8.101647-17.664-18.070589-17.664H180.705882c-9.968941 0-18.070588 7.905882-18.070588 17.664v194.198588H271.058824V794.503529z m144.564705 0c0-9.758118-8.101647-17.664-18.070588-17.664h-72.282353c-9.968941 0-18.070588 7.905882-18.070588 17.664v194.198588h108.423529V794.503529z m325.270589-547.312942c0-9.743059-8.101647-17.664-18.070589-17.664h-36.141176c-9.968941 0-18.070588 7.920941-18.070588 17.664v35.312942c0 9.743059 8.101647 17.648941 18.070588 17.648941H722.823529c9.968941 0 18.070588-7.905882 18.070589-17.648941v-35.312942z m0 176.549647c0-9.743059-8.101647-17.648941-18.070589-17.648941h-36.141176c-9.968941 0-18.070588 7.905882-18.070588 17.648941v35.312942c0 9.743059 8.101647 17.648941 18.070588 17.648941H722.823529c9.968941 0 18.070588-7.905882 18.070589-17.648941v-35.312942z m0 176.549648c0-9.743059-8.101647-17.648941-18.070589-17.648942h-36.141176c-9.968941 0-18.070588 7.905882-18.070588 17.648942v35.312941c0 9.743059 8.101647 17.648941 18.070588 17.648941H722.823529c9.968941 0 18.070588-7.905882 18.070589-17.648941v-35.312941z m180.705882-353.099295c0-9.743059-8.101647-17.664-18.070588-17.664h-36.141177c-9.968941 0-18.070588 7.920941-18.070588 17.664v35.312942c0 9.743059 8.101647 17.648941 18.070588 17.648941H903.529412c9.968941 0 18.070588-7.905882 18.070588-17.648941v-35.312942z m0 176.549647c0-9.743059-8.101647-17.648941-18.070588-17.648941h-36.141177c-9.968941 0-18.070588 7.905882-18.070588 17.648941v35.312942c0 9.743059 8.101647 17.648941 18.070588 17.648941H903.529412c9.968941 0 18.070588-7.905882 18.070588-17.648941v-35.312942z m0 176.549648c0-9.743059-8.101647-17.648941-18.070588-17.648942h-36.141177c-9.968941 0-18.070588 7.905882-18.070588 17.648942v35.312941c0 9.743059 8.101647 17.648941 18.070588 17.648941H903.529412c9.968941 0 18.070588-7.905882 18.070588-17.648941v-35.312941z",
            '休闲娱乐场所': 'path://M728.744533 694.564267c2.142933 34.443733-25.041067 80.484267-33.968 130.040533-1.338667 7.44-18.0992 1.643733-19.0368 9.723733-0.936533 8.081067 13.077333 34.148267 13.9264 41.521067 0.848 7.44-21.223467 4.816-21.223467 4.816l-3.393067 5.614933-9.330133 0-5.959467-18.238933c0 0-44.189867-5.204267-45.885867 2.602667-1.696 7.806933-6.360533 1.7344-29.726933 15.636267-23.368533 13.899733-108.3296 9.563733-141.048533 7.008-15.466667-1.278933-39.278933-12.738133-54.388267-15.704533-16.805333-3.2192-24.2592 2.168533-27.1616 2.647467-5.534933 0.8672-18.389333-7.122133-21.245867-13.946667-2.856533-6.779733-23.412267-52.6368-11.895467-57.316267 11.493333-4.679467 51.821867-20.452267 53.5168-26.091733 1.7184-5.685333-11.828267-40.219733-21.825067-42.6848-10.021333-2.488533-26.402133-18.8768-32.9632-23.351467-6.360533-4.3616 1.072-14.129067-0.4256-23.922133-1.6064-10.2944-8.6592-18.6944-1.696-21.272533 13.524267-5.089067 43.162667-16.251733 87.931733-32.618667 15.6-5.685333 42.917333-0.821333 56.487467-6.071467 14.261333-5.479467 14.439467-20.999467 17.006933-26.066133 8.481067-16.938667-0.4256-26.091733 4.663467-46.085333 6.762667-26.477867 30.843733-47.3632 32.7616-71.902933 1.272533-16.069333-33.633067-72.770133-49.345067-78.8416-7.3216-2.832-34.2592-1.690667-57.7568-3.058133-26.8928-1.5744-50.459733-5.5488-55.213867-6.322133-8.948267-1.5072-56.3072-34.078933-56.3072-34.078933s1.7184 15.178667-4.24 19.973333c-5.959467 4.769067-4.017067-18.992-8.258133-13.146667-4.24 5.7984-4.263467 5.3408-7.253333 9.930667-2.968533 4.544 4.263467 23.442133 1.072 26.501333-3.191467 3.012267-4.5088-7.076267-4.5088-7.076267s-1.8528 8.5824-4.418133 4.885333c-2.545067-3.697067-4.442667-21.4112-4.442667-21.4112s-4.263467 15.7504-6.584533 11.390933c-2.343467-4.2912 2.789333-15.636267 2.789333-15.636267s19.952-37.959467 30.976-38.212267c11.0688-0.274133 60.7712 29.719467 99.000533 30.587733 38.2528 0.890667 36.5344-7.805867 80.2784-9.563733-8.056533-7.3728-8.078933-15.269333-7.655467-23.464533 0.445867-8.1952-13.1456-15.361067-13.568-41.771733-0.423467-26.410667 36.733867-34.9024 50.013867-34.788267 13.28 0.114133 22.8544 6.5056 26.448 13.626667 5.112533 9.950933 12.321067 11.253333 18.2784 12.576 4.352 0.9376-3.393067 8.674133-3.393067 8.674133l11.022933 16.938667c0 0 3.191467 6.299733-4.039467 9.586133-7.208533 3.2416-18.948267 5.569067-21.579733 6.368-2.654933 0.798933-4.129067 8.4 0.714667 14.0384 3.147733 3.697067 16.826667 22.804267 23.634133 13.899733 2.210133-2.875733 6.381867-12.919467 10.958933-25.701333 3.1232-8.674133 10.065067-17.485867 13.032533-27.322667 6.1152-19.973333 7.274667-40.448 6.605867-47.1136-0.96-9.083733-13.8144-54.464-28.9024-77.563733-5.112533-7.805867-28.389333-8.1952-30.308267-8.1024-4.954667 0.2048-19.4624 1.4848-20.064-3.538133-0.602667-5.089067 18.679467-3.972267 21.1136-5.5232 2.434133-1.550933-6.426667-12.8512-6.426667-12.8512s-10.757333 1.962667-11.850667-1.162667c-1.093333-3.104 8.280533-5.730133 8.280533-5.730133s-11.9392-12.1664-10.869333-17.1648c1.072-5.021867 17.518933 17.416533 24.2144 19.128533 8.702933 2.190933 26.536533 3.492267 35.886933 14.769067 25.218133 30.4736 49.210667 82.106667 50.148267 92.333867 0.736 8.3552-2.365867 34.512-5.333333 63.867733-3.079467 30.632533-15.712 50.445867-15.288533 64.734933 0.178133 6.551467 4.6432 11.3216 9.774933 20.864 7.208533 13.467733-7.655467 21.297067-8.926933 85.6448-0.535467 27.848533 6.829867 71.034667 6.829867 71.034667s14.417067-22.414933 28.433067-21.981867c14.016 0.4352 17.408-7.3728 39.077333-22.1408 21.693867-14.792533 15.288533-35.472 21.245867-47.3632 5.936-11.892267 20.8224-46.084267 32.2944-39.124267 11.473067 6.938667 43.764267 47.819733 48.005333 94.7296 4.24 46.952533-18.2112 44.715733-16.114133 70.578133 2.053333 25.883733-24.705067 64.279467-22.608 98.770133L728.744533 694.564267z',
            '展览馆': 'path://M694.903 506.985c20.428-5.681 46.414-13.53 79.254-24.057 265.925-85.355 232.689-416.203 232.689-416.203h-206.537v-41.616h-582.061v41.616h-206.497c0 0-33.554 332.020 232.729 416.203 32.598 10.315 58.465 17.994 78.906 23.654 40.34 49.095 89.934 83.926 144.362 95.995v297.93c-141.031 8.698-249.453 60.605-249.453 123.487h582.057c0-62.881-108.469-114.793-249.456-123.487v-297.93c54.221-12.067 103.773-46.695 144.003-95.591M800.311 204.349v-96.003h166.501c-0.567 82.642-22.106 276.18-205.379 334.957-10.434 3.328-19.757 6.252-28.599 9.023 42.115-71.983 67.517-160.676 67.517-247.973h-0.039zM257.008 443.255c-183.481-58.038-204.77-252.238-205.221-334.911h166.463v96.003c0 87.264 25.315 175.869 67.401 247.805-8.852-2.713-18.212-5.636-28.642-8.897M509.32 393.42l-128.5 89.507 45.353-149.934-124.731-94.787 156.498-3.127 51.38-147.98 51.422 147.98 156.455 3.127-124.723 94.787 45.307 149.934-128.458-89.507z'
        }
        for (var i = 0; i < settings.data.length; i++) {
            //var seriesJson = Array[i]; //整个系列Json数据
            var seriesName = settings.data[i].seriesName; //系列名
            var seriesData = settings.data[i].data; //系列数据
            //console.log(seriesName);
            var itemStyleColor = settings.data[i].itemStyleColor;
            // 设置series的属性
            series.push({
                name: seriesName,
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: seriesData,
                symbol: iconArray[seriesName],
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        //color: itemStyleColor,
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        borderWidth: 0.8
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        opacity: 1
                    }
                }
                //zlevel: i+1,
                //animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(settings.ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(settings.ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(settings.ID));//新建echarts对象
        }
        var app = {};

        var option = {
            tooltip: {
                show: true,
                trigger: 'item',
                enterable: true,
                confine: true,
                hideDelay: 1000,
                //position: function (point) {
                //    return [point[0]+15, point[1]-30];
                //},
                formatter: function (obj) {
                    var html = '';
                    var value = obj.value;
                    if (obj.name == obj.seriesName) {
                        html += obj.name;
                    } else {
                        html += obj.name + ' -- ' + obj.seriesName;
                    }
                    if (value[2] && value[2] != '') {
                        html += '<div style="border-top: 1px solid rgba(255,255,255,.3); font-size: 15px;padding-top: 7px;margin-top: 7px">' + value[2] + '</div>'
                    }
                    return html;
                },
                extraCssText: 'width:300px; white-space: normal !important;'
            },

            legend: {
                orient: 'vertical',
                right: 0,
                top: 0,
                //bottom:0,
                //left:0,
                //width:200,
                pagemode: settings.pagemode || false, //1.modify by danhuan ,只有orient: 'vertical'时才有效
                height: "100%",

                data: legendData,
                itemHeight: 18,
                itemWidth: 18,
                textStyle: {
                    fontWeight: 'bolder',
                    fontSize: 12,
                    color: '#fff'
                },
                inactiveColor: '#aaa',
                //padding: [20, 15],
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 5,
                zlevel: 100
            },
            series: series,
            //color:['#f16969','#60ace8','#f99e2b','#8192d6','#d9b3e6','#dcf7a1','#83fcd8','#90c156','#199475','#57427d','#ffe3fb','#58d2e8','#ffe957','#bdbd6a','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            color: ['#5AB1EF', '#2EC7C9', '#B6A2DE', '#990099', '#FFCC00', "#FFB980", '#FA9508', "#C23531", '#FF9999', "#FF0000", '#009933', '#336699', '#330099', '#00CCFF', '#05D6A7'],
            bmap: {
                center: settings.mapCenter,
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
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#ffffff"
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
                            "stylers": {
                                "lightness": 47,
                                "saturation": -100
                            }
                        }
                    ]
                    /* styleJson: [{
                     "featureType": "all",
                     "elementType": "all",
                     "stylers": {
                     "lightness": 47,
                     "saturation": -100
                     }
                     }, {
                     "featureType": "highway",
                     "elementType": "geometry.fill",
                     "stylers": {
                     "color": "#ffffff"
                     }
                     }, {
                     "featureType": "poi",
                     "elementType": "labels.icon",
                     "stylers": {
                     "visibility": "off"
                     }
                     }, {
                     "featureType": "road",
                     "elementType": "labels",
                     "stylers": {
                     "visibility": "off"
                     }
                     }]*/
                }
            }
        };
        myChart.setOption(option);
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            //bmap.addControl(new BMap.MapTypeControl({anchor:BMAP_ANCHOR_TOP_LEFT }));
        }
        ;

        //窗口变化图表大小自适应
        this.chartsResize(myChart);

        /*=====legend 的分页控制 事件=s===*/
        var PageEvent = function (i) {
            var percent = -i * 98 + '%';
            myChart.setOption({
                legend: {
                    top: percent
                }
            });
        };

        if (option.legend.pagemode) {
            $('body').on('click', '.js-prePage', function () {
                console.log(clickCount);
                if (clickCount > 0) {
                    clickCount = clickCount - 1;

                    PageEvent(clickCount);
                    $('.js-prePage img').attr({'src': '/mapout-web-visual/img/up-icon.png', 'title': '上一页'});

                    //$('.js-nextPage img').attr('src','/mapout-web-visual/img/down-icon.png');
                } else {
                    $('.js-prePage img').attr({'src': '/mapout-web-visual/img/up-disable.png', 'title': '已经是第一页'});
                }
            });
            $('body').on('click', '.js-nextPage', function () {
                clickCount = clickCount + 1;
                console.log(clickCount);
                PageEvent(clickCount);
                $('.js-prePage img').attr({'src': '/mapout-web-visual/img/up-icon.png', 'title': '上一页'});
            });
        }
        /*=====legend 的分页控制 事件=e===*/


        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            var strParams = params.data;
            if (params.componentType === 'series') {
                //console.log(strParams);
                settings.seriesClick(strParams);

                //if(!settings.urlParams){
                //   settings.urlParams = '&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                //}else{
                //   settings.urlParams += '&cityId='+strParams.cityId +'&provinceId='+strParams.provinceId+'&countryId='+strParams.countryId;
                //}
                //jQuery.mapout.form.replace(settings.url,settings.urlParams);
                //window.location = url+ '&cityname=' + encodeURIComponent(params.name);
            }
        });


    },


    /**
     * 学区房  eg:schoolRoomMap.html
     * charts.schoolRoomMap({
            ID:'eBaiduMap',
            mapCenter:[116.46, 39.92],
            data:data,
            seriesClick:function(params){
                var urlParams = '&name='+params.name;
                jQuery.mapout.form.replace(url,urlParams);
            }
        });
     * @param ID
     * @param mapCenter
     * @param data
     * @param url
     * @param urlParams
     */
    schoolRoomMap: function (p) {
        var defaults = {
            ID: '',
            mapCenter: '',
            data: '',
            seriesClick: function (Params) {
            },//点击 地图上散点 时
        };

        var settings = $.extend({}, defaults, p);


        var series = []; // 设置series的属性
        var legendData = []; //设置图例

        for (var i = 0; i < settings.data.length; i++) {
            var seriesJson = settings.data[i]; //整个系列Json数据
            var seriesName = settings.data[i].seriesName; //系列名
            var seriesData = settings.data[i].data; //系列数据
            var itemStyleColor = settings.data[i].itemStyleColor;
            // 设置series的属性
            series.push({
                name: seriesName,
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: seriesData,
                symbolSize: 9,
                itemStyle: {
                    normal: {
                        color: itemStyleColor,
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                zlevel: i,
                animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(settings.ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(settings.ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(settings.ID));//新建echarts对象
        }
        var app = {};


        var option = {
            tooltip: {
                show: true,
                trigger: 'item',
                enterable: true,
                confine: true,
                //position: function (point, params, dom) {
                //    return [point[0]+15, point[1]-30];
                //},
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
                bottom: 20,
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
                center: settings.mapCenter,
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
        }

        myChart.setOption(option);
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        }
        ;
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                settings.seriesClick(params);
                //if(!urlParams){
                //    urlParams = '&name='+params.name;
                //}else{
                //    urlParams += '&name='+params.name;
                //}
                //jQuery.mapout.form.replace(url,urlParams);
            }
        });

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
    },


    /**
     * 地铁房  eg:schoolRoomMap.html
     * charts.subwayRoomMap({
            ID:'eBaiduMap',
            mapCenter:[116.46, 39.92],
            data:data,
            seriesClick:function(params){
                var urlParams = '&name='+params.name;
                jQuery.mapout.form.replace(url,urlParams);
            }
        });
     * @param ID
     * @param mapCenter
     * @param data
     * @param url
     * @param urlParams
     */
    subwayRoomMap: function (p) {

        var defaults = {
            ID: '',
            mapCenter: '',
            data: '',
            seriesClick: function (Params) {
            },//点击 地图上散点 时
        };

        var settings = $.extend({}, defaults, p);


        var series = []; // 设置series的属性
        var legendData = []; //设置图例

        for (var i = 0; i < settings.data.length; i++) {
            //var seriesJson = Array[i]; //整个系列Json数据
            var seriesName = settings.data[i].seriesName; //系列名
            var seriesData = settings.data[i].data; //系列数据
            var itemStyleColor = settings.data[i].itemStyleColor;
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
                symbolSize: 9,
                itemStyle: {
                    normal: {
                        color: itemStyleColor,
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                zlevel: i,
                animationEasing: this.cubicIn
            });
            //图例
            legendData.push(seriesName);
        }


        var myChart = echarts.getInstanceByDom(document.getElementById(settings.ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(settings.ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(settings.ID));//新建echarts对象
        }
        //myChart.showLoading({
        //    text : "图表数据正在努力加载...",
        //    effect :'spin',//'spin' | ' bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
        //    zlevel:1000
        //});
        var app = {};

        var option = {
            tooltip: {
                show: true,
                trigger: 'item',
                enterable: true,
                confine: true,
                position: function (point, params, dom) {
                    return [point[0] + 15, point[1] - 30];
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
                bottom: 20,
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
                center: settings.mapCenter,
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
        };
        myChart.setOption(option);
        if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        }
        ;
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                settings.seriesClick(params);
                //if(!urlParams){
                //    urlParams = '&name='+params.name;
                //}else{
                //    urlParams += '&name='+params.name;
                //}
                //jQuery.mapout.form.replace(url,urlParams);
            }
        });

        //窗口变化图表大小自适应
        this.chartsResize(myChart);
        //myChart.hideLoading();
    },


    /**
     * 矩形树图   eg:品牌统计

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

     var p = {
            ID : 'rectTreeMap',
            data : 'diskData',
            seriesClick:function(Params){

            },//点击 最后一个节点 时，及没有子节点的矩形
        };
     charts.rectTreeMap(p);

     */
    rectTreeMap: function (p) {

        var defaults = {
            ID: '',
            data: '',
            seriesClick: function (Params) {

            },//点击 最后一个节点 时，及没有子节点的矩形
        };

        if (!p) {
            console.log("rectTreeMap(p)没有传入参数！");
            return false;
        }

        var settings = $.extend({}, defaults, p);


        var myChart = echarts.getInstanceByDom(document.getElementById(settings.ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(settings.ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(settings.ID));//新建echarts对象
        }
        var formatUtil = echarts.format;
        var option = {
            tooltip: {
                confine: true,
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
                width: '100%',
                height: '100%',
                leafDepth: '2',
                //visibleMin: 500,
                visibleMin: '400',
                label: {
                    show: true,
                    formatter: '{b}',
                    //textStyle:{
                    //    fontSize:16
                    //}
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                levels: [{
                    color: ['#9FA7E6', '#3fb1e3', '#6CE6C1', '#c4edab', '#00CCFF', '#FF6600', '#FFCC00'],
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                            gapWidth: 6
                        }
                    }
                }, {
                    colorSaturation: [0.4, 0.7],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.8,
                            gapWidth: 2,
                            borderWidth: 0
                        }
                    }
                }, {
                    colorSaturation: [0.4, 0.7],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 1
                        }
                    }
                },
                    {
                        colorSaturation: [0.4, 0.7],
                        itemStyle: {
                            normal: {
                                borderColorSaturation: 0.6,
                                gapWidth: 1
                            }
                        }
                    }],
                breadcrumb: {
                    left: 'left',
                    top: 'top',
                    height: 26
                },
                data: settings.data
            }]
        }
        myChart.setOption(option);
        //窗口变化图表大小自适应
        this.chartsResize(myChart);
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            if (params.componentType === 'series' && params.data) {
                if (!params.data.children || params.data.children.length == 0) {
                    settings.seriesClick(params);
                    //console.log(params.data);
                }
            }
        });


    },


    /**
     * 公交线路 busLinesMap(ID,mapCenter,data);
     * @param ID
     * @param mapCenter
     * @param data
     */
    busLinesMap: function (ID, mapCenter, data) {
        var myChart = echarts.getInstanceByDom(document.getElementById(ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(ID));
        } else {
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(ID));//新建echarts对象
        }
        var app = {};

        var hStep = 300 / (data.length - 1);
        var busLines = [].concat.apply([], data.map(function (busLine, idx) {
            var prevPt = [];
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

        var option = {

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
                center: mapCenter,
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
        };
        myChart.setOption(option);
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    },


    /**
     * 云词图
     var url = '/mapout-web-visual/page/poi/poiIndex.html';
     charts.wordcloud({
        ID:'chart3',
        data:wordclouddata,
        callback:function(param){
            window.location.href = url+ '?name=' + param.name ;
        }
     });
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
    wordcloud: function (p) {
        var defaults = {
            ID: '',
            data: '',
            callback: function (Param) {
            },//点击 地图上散点 时
        };

        var settings = $.extend({}, defaults, p);

        var myChart = echarts.getInstanceByDom(document.getElementById(settings.ID));
        if (!myChart) {
            myChart = echarts.init(document.getElementById(settings.ID));
        } else {
            myChart.clear();
            echarts.dispose(myChart);//销毁
            myChart = echarts.init(document.getElementById(settings.ID));//新建echarts对象
        }
        var option = {
            tooltip: {confine: true},
            series: [{
                type: 'wordCloud',
                gridSize: 12,
                sizeRange: [14, 34],
                //rotationRange: [-15,15],
                rotationRange: [-0, 0],
                shape: 'square',
                width: '98%',
                height: '95%',
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#666'
                    }
                },
                data: settings.data
            }]
        };
        myChart.setOption(option);
        myChart.on("click", function (param) {
            settings.callback(param);
            //console.log(param,url+ '&name=' + param.name);
            //window.location.href = url+ '?name=' + param.name ;
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
    MapWithBar: function (ID, data) {
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
            tooltip: {
                trigger: 'item',
                confine: true

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
            series: [
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
                        coordRange: [[119.72, 34.85], [119.68, 34.85], [119.5, 34.84], [119.19, 34.77], [118.76, 34.63], [118.6, 34.6], [118.46, 34.6], [118.33, 34.57], [118.05, 34.56], [117.6, 34.56], [117.41, 34.56], [117.25, 34.56], [117.11, 34.56], [117.02, 34.56], [117, 34.56], [116.94, 34.56], [116.94, 34.55], [116.9, 34.5], [116.88, 34.44], [116.88, 34.37], [116.88, 34.33], [116.88, 34.24], [116.92, 34.15], [116.98, 34.09], [117.05, 34.06], [117.19, 33.96], [117.29, 33.9], [117.43, 33.8], [117.49, 33.75], [117.54, 33.68], [117.6, 33.65], [117.62, 33.61], [117.64, 33.59], [117.68, 33.58], [117.7, 33.52], [117.74, 33.5], [117.74, 33.46], [117.8, 33.44], [117.82, 33.41], [117.86, 33.37], [117.9, 33.3], [117.9, 33.28], [117.9, 33.27], [118.09, 32.97], [118.21, 32.7], [118.29, 32.56], [118.31, 32.5], [118.35, 32.46], [118.35, 32.42], [118.35, 32.36], [118.35, 32.34], [118.37, 32.24], [118.37, 32.14], [118.37, 32.09], [118.44, 32.05], [118.46, 32.01], [118.54, 31.98], [118.6, 31.93], [118.68, 31.86], [118.72, 31.8], [118.74, 31.78], [118.76, 31.74], [118.78, 31.7], [118.82, 31.64], [118.82, 31.62], [118.86, 31.58], [118.86, 31.55], [118.88, 31.54], [118.88, 31.52], [118.9, 31.51], [118.91, 31.48], [118.93, 31.43], [118.95, 31.4], [118.97, 31.39], [118.97, 31.37], [118.97, 31.34], [118.97, 31.27], [118.97, 31.21], [118.97, 31.17], [118.97, 31.12], [118.97, 31.02], [118.97, 30.93], [118.97, 30.87], [118.97, 30.85], [118.95, 30.8], [118.95, 30.77], [118.95, 30.76], [118.93, 30.7], [118.91, 30.63], [118.91, 30.61], [118.91, 30.6], [118.9, 30.6], [118.88, 30.54], [118.88, 30.51], [118.86, 30.51], [118.86, 30.46], [118.72, 30.18], [118.68, 30.1], [118.66, 30.07], [118.62, 29.91], [118.56, 29.73], [118.52, 29.63], [118.48, 29.51], [118.44, 29.42], [118.44, 29.32], [118.43, 29.19], [118.43, 29.14], [118.43, 29.08], [118.44, 29.05], [118.46, 29.05], [118.6, 28.95], [118.64, 28.94], [119.07, 28.51], [119.25, 28.41], [119.36, 28.28], [119.46, 28.19], [119.54, 28.13], [119.66, 28.03], [119.78, 28], [119.87, 27.94], [120.03, 27.86], [120.17, 27.79], [120.23, 27.76], [120.3, 27.72], [120.42, 27.66], [120.52, 27.64], [120.58, 27.63], [120.64, 27.63], [120.77, 27.63], [120.89, 27.61], [120.97, 27.6], [121.07, 27.59], [121.15, 27.59], [121.28, 27.59], [121.38, 27.61], [121.56, 27.73], [121.73, 27.89], [122.03, 28.2], [122.3, 28.5], [122.46, 28.72], [122.5, 28.77], [122.54, 28.82], [122.56, 28.82], [122.58, 28.85], [122.6, 28.86], [122.61, 28.91], [122.71, 29.02], [122.73, 29.08], [122.93, 29.44], [122.99, 29.54], [123.03, 29.66], [123.05, 29.73], [123.16, 29.92], [123.24, 30.02], [123.28, 30.13], [123.32, 30.29], [123.36, 30.36], [123.36, 30.55], [123.36, 30.74], [123.36, 31.05], [123.36, 31.14], [123.36, 31.26], [123.38, 31.42], [123.46, 31.74], [123.48, 31.83], [123.48, 31.95], [123.46, 32.09], [123.34, 32.25], [123.22, 32.39], [123.12, 32.46], [123.07, 32.48], [123.05, 32.49], [122.97, 32.53], [122.91, 32.59], [122.83, 32.81], [122.77, 32.87], [122.71, 32.9], [122.56, 32.97], [122.38, 33.05], [122.3, 33.12], [122.26, 33.15], [122.22, 33.21], [122.22, 33.3], [122.22, 33.39], [122.18, 33.44], [122.07, 33.56], [121.99, 33.69], [121.89, 33.78], [121.69, 34.02], [121.66, 34.05], [121.64, 34.08]]
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
