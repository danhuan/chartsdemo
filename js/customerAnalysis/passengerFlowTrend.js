$(function(){
    rolling("#yesterday",12239);//（id,num）数字递增并分割
    rolling("#beforeYesterday",10222);//（id,num）数字递增并分割
// 多折线图   例子:标签系数页面/品牌系数页面
    var JSON = {
        'title':'客流指数趋势',
        'legendData': ['客流指数'],
        'data': [
            ['2017.3.1', 150010],//依次为['时间','社交指数', '实体指数', '实体访客指数']
            ['2017.3.2', 151000],
            ['2017.3.3', 158000],
            ['2017.3.4', 166000],
            ['2017.3.5', 181000],
            ['2017.3.6', 110480],
            ['2017.3.7', 117476]
        ]
    }
    charts.mulLineChart("flowCharts", JSON);

});