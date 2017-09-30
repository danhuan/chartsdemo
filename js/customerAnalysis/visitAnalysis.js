$(function () {

    /*
     生成嵌套环形图nestedRing(id, percnetNum, legend, color);
     id:嵌套环形的容器id
     percnetNum:百分比
     legend：图例名称  eg "新顾客"
     color:有两种取值red/blue，不传值默认为red
     */
    function nestedRing(id, percnetNum, legend, color) {
        var html = '<div class="inner">' +
            '<span class="num">' + percnetNum + '</span>' +
            '<div class="people">' +
            '<span class="up"></span>' +
            '<span class="down" style="width:' + percnetNum + ';"></span>' +
            '</div>' +
            '</div>' +
            '<div id="' + id + 'outer" style="-webkit-tap-highlight-color: transparent; user-select: none; background: transparent;width:100%;height: 100%"></div>' +
            '<span class="subtitle"><i></i>' + legend + '</span>';
        $('#' + id).html(html);
        charts.ringChartOne(id + "outer", percnetNum, color);
    }

    nestedRing("newChart", '60%', '新客户', 'red');//新顾客嵌套环形图
    nestedRing("oldChart", '57%', '老客户', 'blue');//老顾客嵌套环形图


    var visitBarJson = {
             "title": "平均到访指数",
             "type": ["1次", "2次", "3次", "4次", "5次", "5次以上"],
             "yAxisName":"（指数）",
             "data":  [220000, 70000, 40000, 30000, 20000, 35000]
         }
    charts.barChart2('visitBarChart',visitBarJson);





})