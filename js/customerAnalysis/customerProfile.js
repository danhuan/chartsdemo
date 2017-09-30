$(function(){
    /*年龄柱形图 s*/
    var ageBarJson = {
        "title": "年龄",
        "type": ["18岁以下", "19-24岁", "25-34岁", "35-44岁", "45-54岁", "55岁以上"],
        "yAxisName":"（指数）",
        "data":  [30000, 140000, 260000, 120000, 42000, 15000]
    }
    charts.barChart2('ageBarChart',ageBarJson);
    /*年龄柱形图 e*/

    /*收入环形图s*/
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
    /*收入环形图e*/

    /*职业分布 扇形图s*/
    var professionJson = {
        seriesName:'职业分布',
        data:[
            {value:383420, name:'公司职员'},
            {value:58719, name:'服务人员'},
            {value:44488, name:'公务员'},
            {value:28608, name:'学生'},
            {value:19643, name:'科研人员'},
            {value:16953, name:'教职工'},
            {value:5647, name:'家庭主妇'}
        ]
    }
    charts.pie2('professionChart',professionJson);


    /*职业分布 扇形图e*/









});