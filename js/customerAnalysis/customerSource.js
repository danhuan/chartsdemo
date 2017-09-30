//创建地图
var map = new AMap.Map('amapContainer', {
    zoom: 9
});
AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
    function(MarkerList, SimpleMarker, SimpleInfoWindow) {

        //即jQuery/Zepto
        var $ = MarkerList.utils.$;

        var defaultIconStyle = 'red', //默认的图标样式
            hoverIconStyle = 'green', //鼠标hover时的样式
            selectedIconStyle = 'purple' //选中时的图标样式
            ;

        var markerList = new MarkerList({
            map: map,
            //ListElement对应的父节点或者ID
            listContainer: "aoiTopList", //document.getElementById("myList"),
            //选中后显示

            //从数据中读取位置, 返回lngLat
            getPosition: function(item) {
                return [item.longitude, item.latitude];
            },
            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {

                return item.id;
            },
            getInfoWindow: function(data, context, recycledInfoWindow) {
                if (recycledInfoWindow) {
                    //存在可回收利用的infoWindow, 直接setContent返回
                    recycledInfoWindow.setContent(content);
                    return recycledInfoWindow;
                }
                return new  AMap.InfoWindow({
                    isCustom:true,
                    autoMove:true,
                    content: '<div class="aoi-info"><span class="close iconfont icon-guanbi"></span>'+'<div class="info-head">' +
                    '<div class="info-title"><span class="aoi-info-name">'+data.name+'</span></div>' +
                    '<div class="info-value"><span class="aoi-info-title">指数:</span><span class="aoi-info-value">'+data.value+'</span></div>' +
                    '</div>' +
                    '<div class="info-tags">' +
                    '<div class="info-tags-title">居民购物偏好</div>' +
                    '<div class="info-tag-row">' +
                    '<div class="info-tag-item"><span class="info-label">食品饮料</span><span>14.17%</span></div>' +
                    '<div class="info-tag-item"><span class="info-label">汽车</span><span>13.38%</span></div>' +
                    '</div>' +
                    '<div class="info-tag-row">' +
                    '<div class="info-tag-item"><span class="info-label">美容美妆</span><span>12.34%</span></div>' +
                    '<div class="info-tag-item"><span class="info-label">3C数码</span><span>11.96%</span></div>' +
                    '</div>' +
                    '<div class="info-tag-row">' +
                    '<div class="info-tag-item"><span class="info-label">家电</span><span>10.58%</span></div>' +
                    '<div class="info-tag-item"><span class="info-label">母婴用品</span><span>10.51%</span></div>' +
                    '</div>' +
                    '</div>'+'</div>',
                    //offset: new AMap.Pixel(0, -37)
                });
            },
            //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(data, context, recycledMarker) {

                var label =  context.index + 1;

                if (recycledMarker) {
                    recycledMarker.setIconLabel(label);
                    return;
                }

                return new SimpleMarker({
                    containerClassNames: 'my-marker',
                    iconStyle: defaultIconStyle,
                    iconLabel: label
                });
            },
            //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
            getListElement: function(data, context, recycledListElement) {

                var label = context.index +1;

                //使用模板创建
                var innerHTML = MarkerList.utils.template('<span>' +'<%- label %>. <%- data.name %>' +'</span><span class="aoi-top-value"><%- data.value %></span>'
                    , {
                    data: data,
                    label: label
                });

                if (recycledListElement) {
                    recycledListElement.innerHTML = innerHTML;
                    return recycledListElement;
                }

                return '<li class="aoi-top-list-item">' +
                    innerHTML +
                    '</li>';
            },
            //列表节点上监听的事件
            listElementEvents: ['click', 'mouseenter', 'mouseleave'],
            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],
            //makeSelectedEvents:false,
            selectedClassNames: 'selected',
            autoSetFitView: true
        });

        window.markerList = markerList;

        markerList.on('selectedChanged', function(event, info) {

            if (info.selected) {

                if (info.selected.marker) {
                    //更新为选中样式
                    info.selected.marker.setIconStyle(selectedIconStyle);
                }

                //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
                if (!info.sourceEventInfo.isListElementEvent) {

                    if (info.selected.listElement) {
                        scrollListElementIntoView($(info.selected.listElement));
                    }
                }
                $(info.selected.listElement).parent().children('li').removeClass('active');
                $(info.selected.listElement).addClass('active');


            }

            if (info.unSelected && info.unSelected.marker) {
                //更新为默认样式
                info.unSelected.marker.setIconStyle(defaultIconStyle);
            }
        });

        markerList.on('listElementMouseenter markerMouseover', function(event, record) {

            if (record && record.marker) {

                forcusMarker(record.marker);

                //this.openInfoWindowOnRecord(record);

                //非选中的id
                if (!this.isSelectedDataId(record.id)) {
                    //设置为hover样式
                    record.marker.setIconStyle(hoverIconStyle);
                    //this.closeInfoWindow();
                }
            }
        });

        markerList.on('listElementMouseleave markerMouseout', function(event, record) {

            if (record && record.marker) {

                if (!this.isSelectedDataId(record.id)) {
                    //恢复默认样式
                    record.marker.setIconStyle(defaultIconStyle);
                }
            }
        });

        //数据输出完成
        markerList.on('renderComplete', function(event, records) {


        });

         //markerList.on('*', function(type, event, res) {
         //    console.log(type, event, res);
         //});

        //加载数据
        function loadData(src, callback) {

            $.getJSON(src, function(data) {

                markerList._dataSrc = src;

                //渲染数据
                markerList.render(data);

                if (callback) {
                    callback(null, data);
                }
            });
        }


        var $btns = $('.ant-tabs-tab-active.ant-tabs-tab');
        loadData($btns.attr('data-path'));


        $('.ant-tabs-nav').on('click', '.ant-tabs-tab', function() {

            var dataPath = $(this).attr('data-path');
            loadData(dataPath);

            var inkLeft = $(this).position().left,
                intWidth = $(this).outerWidth();

            $('.ant-tabs-tab').removeClass('ant-tabs-tab-active');
            $(this).addClass('ant-tabs-tab-active');
            $('.ant-tabs-ink-bar').css({"transform":"translate3d("+inkLeft+"px, 0px, 0px)","width":""+intWidth+"px"});

        });



        function forcusMarker(marker) {
            marker.setTop(true);

            //不在地图视野内
            if (!(map.getBounds().contains(marker.getPosition()))) {

                //移动到中心
                map.setCenter(marker.getPosition());
            }
        }

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            );
        }

        function scrollListElementIntoView($listEle) {

            if (!isElementInViewport($listEle.get(0))) {
                $('#aoiTopList').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
            }

            //闪动一下
            $listEle
                .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                    function(e) {
                        $(this).removeClass('flash animated');
                    }).addClass('flash animated');
        }


    });
