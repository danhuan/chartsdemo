$(function () {
    /*====设置'.ibox-size'地图块的高度,使其自适应窗口高度 s====*/
    var windowHeight = window.innerHeight;
    $('.ibox-size').height(windowHeight - 45);
    window.addEventListener('resize', function () {
        var windowHeight = window.innerHeight;
        $('.ibox-size').height(windowHeight - 45);
    });


    /*酒店介绍弹出框*/
    $('.intro-cover').click(function (event) {
        var event = event || window.event;
        var obj = event.srcElement ? event.srcElement : event.target;//兼容火狐

        if (obj === this) {
            $('.intro-cover').removeClass('active');
        }
    });
    $('.brand-intro button.close').click(function (event) {
        $('.intro-cover').removeClass('active');
    });


    /*======性别、年龄等 筛选条件查询 事件 s============*/
    $('.optionList input[type="checkbox"]').click(function () {
        var checkbox = $(this).parent();
        var checked = checkbox.hasClass('ant-checkbox-checked');
        if (checked) {//已勾选时
            $(this).parent().removeClass('ant-checkbox-checked');//不勾选checkbox
            var checkboxGroup = $(this).parents('.ant-checkbox-group').children('.ant-checkbox-group-item').has('.ant-checkbox-checked');
            if (checkboxGroup.length == 0) {//该组没有任何勾选
                $(this).parents('.optionList').children('.all').addClass('active');//不限
            }
            //console.log($(this).is(":checked"));
        }
        if (!checked) {//未勾选时
            $(this).parent().addClass('ant-checkbox-checked');//勾选checkbox
            $(this).parents('.optionList').children('.all').removeClass('active');
            //console.log($(this).is(":checked"));
        }
    });
    $('.optionList .all').click(function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).next('.ant-checkbox-group').children('.ant-checkbox-group-item').children('.ant-checkbox').removeClass('ant-checkbox-checked');
            $(this).next('.ant-checkbox-group').children('.ant-checkbox-group-item').children('.ant-checkbox').children('input[type="checkbox"]').attr("checked",false);
        }
    });
    /*======性别、年龄等 筛选条件查询 事件 e============*/

});

//判断建筑是否验收
function isAccept(buildId, buildName) {
    if (!buildId || buildId <= 0) {
        return;
    }
    var params = new Object();
    params.url = contextPath + '/web/base/build.do?action=getInfo';
    params.data = '&id=' + buildId;
    params.loading = false;
    params.callback = function (data) {
        if (data) {
            if (data.success) {
                //console.log(data.bean.isShow);
                if (data.bean && data.bean.isShow && data.bean.isShow == 1) {
                    var url = contextPath + '/web/base/map.do?action=indoorMap';
                    //打开新标签页
                    jQuery.mapout.form.childNewIframe(url, "&buildId=" + buildId + "&buildName=" + encodeURI(encodeURI(buildName)), buildName);
                } else {
                    msgtip.addTip("error", "建筑【" + buildName + "】图纸未验收");
                }
            } else {
                msgtip.addTip("error", data.message);
            }
        } else {
            msgtip.addTip("error", '未知异常！');
        }
    };
    jQuery.mapout.ajax.req(params);
}
/*======数字递增，加逗号s=======*/
/*实现数字每三位加逗号的方法*/
function formatNum(str) {
    var newStr = "";
    var count = 0;

    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        //str = newStr + ".00"; //自动补小数点后两位
        str = newStr;
        return str;
    }
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);

        return str;
    }
}

//数字滚动增加动画
//在一定的时间内 移动一定的距离
//当前的位置=移动的距离/所用的时间*已用的时间
//移动的距离=结束位置-起始位置
function rolling(ID, DATA) {
    var time = 1000;  //所用时间 1000毫秒（ 在1秒内 数值增加到d）;
    var outTime = 0;  //所消耗的时间
    var interTime = 30;
    var timer = setInterval(function () {
        outTime += interTime;
        if (outTime < time) {
            $(ID).html(parseInt(DATA / time * outTime));
        } else {
            var str = String(DATA);
            $(ID).html(formatNum(str));
            clearInterval(timer);
        }
    }, interTime);
}

/*======数字递增，加逗号e=======*/

