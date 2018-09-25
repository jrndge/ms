
/***************************************************************************
 * 
 * 优惠券模块方法
 * 
 * **************************************************************************************/


/**
 * 创建不同状态的优惠券的dom
 * 
 * 优惠券共活动领取页（3种）、核销（2种）、优惠券中心（1种）、选择优惠券（1种）共7种状态
 * ***/
var Coupon = function () {
    this.tip = 'create coupon'
}
Coupon.prototype = {
    /**
     * 创建活动页中优惠券（用户为领取）
     * 
     * @options.couponId: 优惠券id
     * @options.discount: 优惠金额
     * @options.condition: 优惠条件
     * @unescape(options.description): 使用说明
     * @options.startDate: 开始时间
     * @options.endDate: 结束时间
     * @options.usedNum : 使用数量
     * @options.occupiedNum : 领取数量
     * @options.totalNum: 优惠券总数
     * @options.parents: dom插入的容器
     * @options.circleChartId: 圆环dom的Id
     * 
     * **/
    couponForAct_unclaimed: function (options, type) {
        if (type == 'isChange') {
            if (options.occupiedNum === options.totalNum) {
                this.couponForAct_over(options);
                return;
            }
            if (options.num > 0) {
                this.couponForAct_receive(options);
                return;
            }
        }
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg1-647145ec15.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span>" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li>满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<div class='review-draw' id='" + options.circleChartId + "'></div>";
        domStr += "<div class='review-btn' style='top:40%;right:3.5%'>";
        domStr += "<img src='../images/coupon/btn2-3b768fcbdf.png' alt='' class='couponBtns'>";
        domStr += "</div>";
        // 有效时间
        domStr += "<div class='review-time'>" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";
        domStr += "</div>";
        domStr += '</li>';

        $(domStr).appendTo(options.parents); // 插入容器
        // 初始化圆环
        var couponWidth = $('.coupon-review_wrap').width();
        var remainNumPercent = Math.floor(options.occupiedNum / options.totalNum * 100);
        remainNumPercent = (options.occupiedNum != 0 && remainNumPercent < 1) ? 1 : remainNumPercent;
        remainNumPercent = (options.occupiedNum != options.totalNum && remainNumPercent > 99) ? 99 : remainNumPercent;
        $("#" + options.circleChartId).circleChart({
            value: remainNumPercent,
            text: '已抢</br><span class="circleChart-text_num">' + remainNumPercent + '%</span>',
            size: couponWidth / 5 || 5,
            widthRatio: 0.2, // 进度条宽度
            startAngle: 75, // 进度条起点
            color: "#fff", // 进度条颜色
            backgroundColor: "#a52804", // 进度条之外颜色
            background: true, // 是否显示进度条之外颜色
            animate: false, // 进度条动画
        });
    },
    /**
    * 创建活动页中优惠券（用户为已领取）
    * 
    * @options.couponId: 优惠券id
    * @options.discount: 优惠金额
    * @options.condition: 优惠条件
    * @unescape(options.description): 使用说明
    * @options.startDate: 开始时间
    * @options.endDate: 结束时间
    * @options.receiveNum: 个人已领取的数量
    * @options.parents: dom插入的容器
    * **/
     
    couponForAct_receive: function (options, type) {
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg1-647145ec15.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span>" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li>满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<ul class='review-round_user'>";
        domStr += "<li>已领取</li>";
        domStr += "<li>" + options.num + "张</li>";
        domStr += "</ul>";
        domStr += "<div class='review-btn' style='top:40%;right:3.5%'>";
        domStr += "<img src='../images/coupon/btn2-3b768fcbdf.png' alt='' class='couponBtns'>";
        domStr += "</div>";
        // 有效时间
        domStr += "<div class='review-time'>" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";
        domStr += "</div>";
        domStr += '</li>';
        if (type == 'domstr') {
            return domStr;
        } else {
            $(domStr).appendTo(options.parents); // 插入容器
        }
    },
    /**
     * 创建活动页中优惠券（优惠券已抢光）
     * 
     * @options.couponId: 优惠券id
     * @options.discount: 优惠金额
     * @options.condition: 优惠条件
     * @unescape(options.description): 使用说明
     * @options.startDate: 开始时间
     * @options.endDate: 结束时间
     * @options.parents: dom插入的容器
     * **/
    couponForAct_over: function (options, type) {
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg1-647145ec15.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span>" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li>满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<div class='review-round'>已抢光</div>";
        domStr += "<div class='review-btn review-btn_gray' style='top:40%;right:3.5%;'>";
        domStr += "<span>立即使用</span>";
        domStr += "</div>";
        // 有效时间
        domStr += "<div class='review-time'>" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";
        domStr += "</div>";
        domStr += '</li>';

        if (type == 'domstr') {
            return domStr;
        } else {
            $(domStr).appendTo(options.parents); // 插入容器
        }
    },

    /**
    * 核销页中优惠券（已过期）
    * 
    * @options.couponId: 优惠券id
    * @options.discount: 优惠金额
    * @options.condition: 优惠条件
    * @unescape(options.description): 使用说明
    * @options.startDate: 开始时间
    * @options.endDate: 结束时间
    * @options.parents: dom插入的容器
    * **/
    couponForHx_over: function (options) {
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg2-d168d2dfdf.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span>" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li>满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<div class='review-round'>已过期</div>";
        domStr += "<div class='review-btn review-btn_gray' style='top:40%;right:3.5%;'>";
        domStr += "<span>立即使用</span>";
        domStr += "</div>";
        // 有效时间
        domStr += "<div class='review-time'>" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";
        domStr += "</div>";
        domStr += '</li>';

        $(domStr).appendTo(options.parents); // 插入容器
    },

    /**
     * 核销页中优惠券（可核销）
     * 
     * @options.couponId: 优惠券id
     * @options.discount: 优惠金额
     * @options.condition: 优惠条件
     * @unescape(options.description): 使用说明
     * @options.startDate: 开始时间
     * @options.endDate: 结束时间
     * @options.parents: dom插入的容器
     * **/
    couponForHx_pass: function (options) {
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg1-647145ec15.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span>" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li>满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<div class='review-btn'>";
        domStr += "<div class='review-btn_class'>立即使用</div>";
        domStr += "</div>";
        // 有效时间
        domStr += "<div class='review-time'>" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";
        domStr += "</div>";
        domStr += '</li>';

        $(domStr).appendTo(options.parents); // 插入容器
    },

    /**
     * 优惠券中心（显示优惠券的使用状况）
     * 
     * @options.couponId: 优惠券id
     * @options.discount: 优惠金额
     * @options.condition: 优惠条件
     * @unescape(options.description): 使用说明
     * @options.startDate: 开始时间
     * @options.endDate: 结束时间
     * @options.usedNum : 使用数量
     * @options.occupiedNum : 领取数量
     * @options.totalNum: 优惠券总数
     * @options.parents: dom插入的容器
     * **/
    couponForCenter: function (options) {
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg1-647145ec15.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span>" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li>满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<ul class='review-status'>";
        domStr += "<li>";
        domStr += "<h4>已领取</h4>";
        domStr += "<p>";
        domStr += "<span class='review-status_warn'>" + options.occupiedNum + "</span>";
        domStr += "<i>/</i>";
        domStr += "<em class='review-status_total'>" + options.totalNum + "</em>";
        domStr += "</p>";
        domStr += "</li>";
        domStr += "<li>";
        domStr += "<h4>已使用</h4>";
        domStr += "<p>";
        domStr += "<span class='review-status_warn'>" + options.usedNum + "</span>";
        domStr += "<i>/</i>";
        domStr += "<em class='review-status_total'>" + options.occupiedNum + "</em>";
        domStr += "</p>";
        domStr += "</li>";
        domStr += "</ul>";
        // 有效时间
        domStr += "<div class='review-time'>" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";
        domStr += "</div>";
        domStr += '</li>';

        $(domStr).appendTo(options.parents); // 插入容器
    },

    /**
    * 选择优惠券
    * 
    * @options.couponId: 优惠券id
    * @options.discount: 优惠金额
    * @options.condition: 优惠条件
    * @unescape(options.description): 使用说明
    * @options.startDate: 开始时间
    * @options.endDate: 结束时间
    * @options.totalNum: 优惠券总数
    * @options.parents: dom插入的容器
    * @arrObj: 定向优惠券编辑页面 之前选中的优惠券ID
    * @bm_state: 定向优惠券编辑页面 是否有人领取优惠券
    * **/
    couponForSelect: function (options, arrObj, bm_state) {
        var domStr = "";
        domStr += '<li class="couponItem">';
        domStr += "<div class='coupon-review_wrap' data-id='" + options.couponId + "' data-seller='" + options.sellerId + "' data-couponInstanceId='" + options.couponInstanceId + "' data-personNum='" + options.personNum + "'>";
        // 背景图片
        domStr += "<img src='../images/coupon/bg1-647145ec15.png' alt='' class='coupon-reviewImg'>";
        // 券面金额
        domStr += "<div class='review-num'>";
        domStr += "<em>￥</em>";
        domStr += "<span class='discount' data=" + options.discount + ">" + options.discount + "</span>";
        domStr += "</div>";
        // 券面限制说明
        domStr += "<ul class='review-text'>";
        domStr += "<li>元代金券</li>";
        domStr += "<li class='condition' data=" + options.condition + ">满" + options.condition + "元可用</li>";
        domStr += "</ul>";
        // 使用说明
        domStr += "<ul class='review-desc'>";
        domStr += "<li class='review-desc_title'>使用说明：</li>";
        domStr += "<li class='review-desc_title description'>" + unescape(options.description) + "</li>";
        domStr += "</ul>";
        // 领取情况
        domStr += "<ul class='review-round_user' style='top:20%'>";
        domStr += "<li>库存</li>";
        domStr += "<li class='totalNum' total='" + options.totalNum + "' occupied='" + options.occupiedNum + "' >" + (options.totalNum - options.occupiedNum) + "张</li>";
        domStr += "</ul>";
        // 有效时间
        domStr += "<div class='review-time' startDate=" + options.startDate + " endDate=" + options.endDate + ">" + timeFormat(options.startDate) + "-" + timeFormat(options.endDate) + "</div>";

        if (arrObj) {
            for(var i = 0; i < arrObj.length; i++) {
                if (arrObj[i].couponId == options.couponId) {
                    domStr += "<i class='coupon-select couponSelected'><img src='../images/coupon/select-9e324fb08d.png'></i>"
                    $(domStr).find('.coupon-select').addClass('couponSelected');
                    if (bm_state) { // 如果已有人领取  则readonly
                        $(domStr).append('<div class="nums">' +
                        '<p class="nums_text">每人可领数量：</p>' +
                        '<input type="number" readonly="readonly" data-max=' + options.personNum + ' class="nums_input" value="' + arrObj[i].num + '">' +
                        '<p class="nums_text">张</p>' +
                        '<p class="nums_ps">该优惠券每人最多' + options.personNum + '张</p>' +
                        '</div>').appendTo('.nowAddCoupon'); // 插入容器
                        coupon_list.push(arrObj[i].couponId)
                    } else {
                        $(domStr).append('<div class="nums">' +
                        '<p class="nums_text">每人可领数量：</p>' +
                        '<input type="number" data-max=' + options.personNum + ' class="nums_input" value="' + arrObj[i].num + '">' +
                        '<p class="nums_text">张</p>' +
                        '<p class="nums_ps">该优惠券每人最多' + options.personNum + '张</p>' +
                        '</div>').appendTo('.nowAddCoupon'); // 插入容器
                        coupon_list.push(arrObj[i].couponId)
                    }
                    
                } else {
                    domStr += "<i class='coupon-select'><img src='../images/coupon/select-9e324fb08d.png'></i>"
                }
            }
        } else {
            domStr += "<i class='coupon-select'><img src='../images/coupon/select-9e324fb08d.png'></i>"
        }
        domStr += "</div>";
        domStr += '</li>';
        $('.nowAddCoupon .coupon-review_wrap').append('<span class="delete-coupon"></span>')
        $(domStr).appendTo(options.parents); // 插入容器
    },
}


/**
 * 时间序列化
 * ***/
function timeFormat(data) {
    return (new Date(data).getMonth() + 1) + '月' + (new Date(data).getDate()) + '日';
}
Date.prototype.toLocaleString = function () {
    var thisM = (this.getMonth() + 1) < 10 ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1);
    var thisD = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
    return this.getFullYear() + "-" + thisM + "-" + thisD;
};

/**
 * layer提示简写
 * **/
function warns(con) {
    layer.open({
        content: con
        , skin: 'msg'
        , time: 3 //3秒后自动关闭
    });
}

/**
 * 用于地图选点的url参数拼接
 * **/
function splitLinkToMap() {
    var urlObj = location.href; // 获取当前地址路径
    var originObj = location.origin + location.pathname; // 当前域名orgin
    var paramStr = location.search.substr(1); // url参数字符串
    // 获取参数
    var paramsArr = paramStr.split('&');
    var paramsObj = new Object();
    $(paramsArr).each(function (index, el) {
        var thisArrBySplitEl = el.split('=');
        paramsObj[thisArrBySplitEl[0]] = thisArrBySplitEl[1];
    })
    // 筛选参数
    var newParamsBySplit = originObj + '?';
    for (var key in paramsObj) {
        if (key != 'name' && key != 'latng' && key != 'addr' && key != 'city' && key != 'module') {
            newParamsBySplit += (key + '=' + escape(paramsObj[key]) + '&');
        }
    }
    return encodeURIComponent(newParamsBySplit.substr(0, newParamsBySplit.length - 1));
}

/**
 * 获取url中的参数
 * **/
function GetQueryStringByMap(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

/**
 * 创建优惠券
 * **/
function gainCouponData(type) {
    // 获取数据如果是为了保存优惠券，则堆数据的非空进行验证，否则则是为了地图选点，忽略堆表单非空等的验证
    if (type == 'create') {
        if ($('#reliefAmount').val() == '') {
            warns('减免金额不能为空');
            $('#reliefAmount').focus();
            return;
        } else if ($('#totalAmount').val() == '') {
            warns('使用门槛金额不能为空');
            $('#totalAmount').focus();
            return;
        } else if ($('#start_time').text() == '') {
            warns('开始时间不能为空');
            return;
        } else if ($('#end_time').text() == '') {
            warns('结束时间不能为空');
            return;
        } else if ($('#couponDescText').text() == '') {
            warns('使用说明不能为空');
            $('#couponDescText').focus();
            return;
        } else if ($('#numPerSon').val() == '') {
            warns('每人限领数量不能为空');
            $('#numPerSon').focus();
            return;
        } else if ($('#couponNum').val() === '') {
            warns('优惠券数量不能为空');
            $('#couponNum').focus();
            return;
        } else if ($('#storeName').val() == '') {
            warns('门店名称不能为空');
            $('#storeName').focus();
            return;
        } else if ($('#storeTel').val() == '') {
            warns('联系电话不能为空');
            $('#storeTel').focus();
            return;
        } else if ($('#storeAddress').text() == '' && $('#storeDesc').text() == '') {
            warns('请至少填写一个地址信息');
            return;
        }
    }
    var _params = {
        "discount": $('#reliefAmount').val(), // 减免金额
        "condition": $('#totalAmount').val(), // 使用门槛金额
        "startDate": $('#start_time').text(), // 开始时间
        "endDate": $('#end_time').text(), // 结束时间
        "totalNum": $('#couponNum').val(), // 优惠券数量
        "personNum": $('#numPerSon').val(), // 每人限领优惠券数量
        "description": escape($('#couponDescText').text()), // 使用说明
        // 门店信息
        "shopInfo": {
            "shopName": escape($('#storeName').val()), // 门店名称
            "marker": $('#storeAddress').attr('data-latng'), // 经纬度
            "address": escape($('#storeAddress').text()), // 地址
            "title": escape($('#storeAddress').attr('data-names')), // 地区名称
            "contacts": $('#storeTel').val(), // 联系电话
            "add": escape($('#storeDesc').text()), // 手写的详细地址
        }
    }
    if (type == 'create') {
        sessionStorage.setItem('couponDetail', JSON.stringify(_params));
        createCouponByAjax(_params)
    } else if (type == 'map') {
        sessionStorage.setItem('couponDetail', JSON.stringify(_params));
    } else if (type == 'updata') {
        sessionStorage.setItem('couponDetail', JSON.stringify(_params));
        upDataCouponByAjax(_params)
    }
}


/**
 * 根据已有数据，则把数据渲染到编辑页相应位置
 * **/
function renderEditPageByData(_data) {
    var renderData = JSON.parse(_data);
    if (renderData.discount != '') {
        $('#reliefAmount').val(renderData.discount); // 减免金额
        $('#pre_reliefAmount').text(renderData.discount); // 预览样式
    } else {
        $('#pre_reliefAmount').text('10'); // 预览样式
    }
    if (renderData.condition != '') {
        $('#totalAmount').val(renderData.condition); // 使用限制
        $('#pre_totalAmount').text('满' + renderData.condition + '元可用')
    } else {
        $('#pre_totalAmount').text('满100元可用')
    }
    if (renderData.startDate != '') {
        $('#start_time').text(new Date(renderData.startDate).toLocaleString()); // 开始时间
    }
    if (renderData.endDate != '') {
        $('#end_time').text(new Date(renderData.endDate).toLocaleString()); // 结束时间
    }
    if (renderData.totalNum != '') {
        $('#couponNum').val(renderData.totalNum); // 优惠券数量
    }
    if (renderData.personNum != '') {
        $('#numPerSon').val(renderData.personNum); // 每人限领优惠券数量
    }
    $('#couponDescText').text(unescape(renderData.description)); // 使用说明
    $('#pre_couponDescText').text(unescape(renderData.description));
    // 地址信息
    if (addrOfUrl != '' && latngOfUrl != '' && nameOfUrl != '') {
        $('#storeAddress').attr('data-latng', latngOfUrl); // 如果存在经纬度，则保存
        $('#storeAddress').text(addrOfUrl); // 如果存在经纬度，则保存
        $('#storeAddress').attr('data-names', nameOfUrl); // 如果存在经纬度，则保存
        $('#storeName').val(unescape(renderData.shopInfo.shopName)); // 门店名称
        $('#storeTel').val(renderData.shopInfo.contacts); // 联系方式
        if (!!renderData.shopInfo.add) {
            $('#storeDesc').text(unescape(renderData.shopInfo.add)); // 详细地址描述
        }
    } else {
        if (!!renderData.shopInfo) {
            $('#storeName').val(unescape(renderData.shopInfo.shopName)); // 门店名称
            $('#storeTel').val(renderData.shopInfo.contacts); // 联系方式
            if (!!renderData.shopInfo.marker) {
                $('#storeAddress').attr('data-latng', renderData.shopInfo.marker); // 如果存在经纬度，则保存
            }
            if (!!renderData.shopInfo.address) {
                $('#storeAddress').text(unescape(renderData.shopInfo.address)); // 如果存在经纬度，则保存
            }
            if (!!renderData.shopInfo.title) {
                $('#storeAddress').attr('data-names', unescape(renderData.shopInfo.title)); // 如果存在经纬度，则保存
            }
            if (!!renderData.shopInfo.add) {
                $('#storeDesc').text(unescape(renderData.shopInfo.add)); // 详细地址描述
            }
        }
    }
}

/**
 * 请求后台，新建优惠券
 * 
 * **/
function createCouponByAjax(datas) {
    $.ajax({
        url: globalUrl + '/seller/createCoupon.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: 'params={"data":' + encodeURIComponent(JSON.stringify(datas)) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                warns(result.result.message);
                setTimeout(function () {
                    sessionStorage.removeItem('couponDetail');
                    location.href = '../coupon/couponlist-b54db0e086.html';
                }, 1500);
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 请求后台，跟新优惠券
 * 
 * **/
function upDataCouponByAjax(datas) {
    datas.couponId = GetQueryStringByMap('couponId');
    $.ajax({
        url: globalUrl + '/seller/updateCoupon.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: 'params={"data":' + encodeURIComponent(JSON.stringify(datas)) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                warns(result.result.message);
                setTimeout(function () {
                    sessionStorage.removeItem('couponDetail');
                    location.href = '../coupon/couponlist-b54db0e086.html';
                }, 1500);
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else if (result.status == 202) {
                location.href = globalUrl + '/seller_center.htm';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 请求后台，获取门店信息
 * 
 * **/
function getShopDataByAjax() {
    $.ajax({
        url: globalUrl + '/seller/couponConf.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: '' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                console.log(result)
                if ($.isEmptyObject(result.result.data)) {
                    // 未填写门店信息
                    sessionStorage.setItem('noHasShopData', 1); // 当前用户是否填写门店信息
                    return
                } else {
                    sessionStorage.removeItem('noHasShopData');
                    // 填写了门店信息，则展示到对应位置
                    var renderData = result.result.data;
                    // 地址信息
                    $('#storeName').val(unescape(renderData.shopName)); // 门店名称
                    $('#storeTel').val(renderData.contacts); // 联系方式
                    if (!!renderData.marker) {
                        $('#storeAddress').attr('data-latng', renderData.marker); // 如果存在经纬度，则保存
                    }
                    if (!!renderData.address) {
                        $('#storeAddress').text(unescape(renderData.address)); // 如果存在经纬度，则保存
                    }
                    if (!!renderData.title) {
                        $('#storeAddress').attr('data-names', unescape(renderData.title)); // 如果存在经纬度，则保存
                    }
                    if (!!renderData.add) {
                        $('#storeDesc').text(unescape(renderData.add)); // 详细地址描述
                    }
                }
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 请求后台，获取优惠券列表信息（优惠券中心）
 * 
 * **/
function getCouponListByAjax(_type, _curPage, _pageSize) {
    var _params = {
        "curPage": _curPage,	// int	是	页码
        "pageSize": _pageSize, //int	是	每页数据数量
        "type": _type	// int	是	优惠券类型 0 未开始 1 期限中 2 已过期
    }
    $.ajax({
        url: globalUrl + '/seller/couponEntityList.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: 'params={"data":' + JSON.stringify(_params) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                $(result.result.data).each(function (index, el) {
                    el.parents = '.coupon-list';
                    coupon1.couponForCenter(el);
                });
                // 如果加载个数不足请求个数，则显示没有更多
                if (result.result.data.length == 0) {
                    $('.downLoadData').text('没有更多了').show();
                } else {
                    $('.downLoadData').text('加载更多').show();
                };
                // 判断是否列表超过一屏;隐藏提醒
                if ($('#coupon-list_scroll').height() < $('#couponListWrap').height()) {
                    $('.downLoadData').hide();
                }
                // 如果优惠券列表为空，则提示用户去新建优惠券
                if (_curPage == 1 && result.result.data.length == 0) {
                    $('.warnListBlank').show();
                }
                coupon_scroll.finishPullUp(); // 完成加载
                coupon_scroll.refresh();
                var _t = setTimeout(function () {
                    coupon_scroll.refresh();
                    clearTimeout(_t)
                }, 100)
                listPage++;
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 请求后台，获取优惠券列表信息（活动页）
 * 
 * **/
function getCouponListForActByAjax(_type, _curPage, _pageSize) {
    var _params = {
        "curPage": _curPage,	// int	是	页码
        "pageSize": _pageSize, //int	是	每页数据数量
        "type": _type	// int	是	优惠券类型 0 未开始 1 期限中 2 已过期
    }
    $.ajax({
        url: globalUrl + '/seller/couponEntityList.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: 'params={"data":' + JSON.stringify(_params) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                console.log(result)
                $(result.result.data).each(function (index, el) {
                    el.parents = '.coupon-Pop_scroll';
                    thisCoupon.couponForSelect(el);
                });
                var liW = $('.coupon-Pop_scroll>li').width();
                $('.coupon-Pop_scroll').css('width', liW * $('.coupon-Pop_scroll>li').length + 'px');
                thisBScroll.refresh();
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 请求后台，获取优惠券列表信息（活动页）
 * 
 * **/
function getAbleCouponList(_curPage, _pageSize, arrObj, bm_state) {
    var _params = {
        "curPage": _curPage,	// int	是	页码
        "pageSize": _pageSize, //int	是	每页数据数量
    }
    $.ajax({
        url: globalUrl + '/seller/getCouponList.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: 'params={"data":' + JSON.stringify(_params) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                $("#addConponImg").attr("data-ishavecoupon",result.result.data.couponNum !== 0 ? true : false);
                $("#addConponImg").attr("data-couponnum",result.result.data.couponList?result.result.data.couponList.length:0);
                $(result.result.data.couponList).each(function (index, el) {
                    el.parents = '.coupon-Pop_scroll';
                    thisCoupon.couponForSelect(el, arrObj, bm_state);
                });
                var liW = $('.coupon-Pop_scroll>.couponItem').width();
                $('.coupon-Pop_scroll').css('width', liW * $('.coupon-Pop_scroll>.couponItem').length + 'px');
                thisBScroll.refresh();
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 请求后台，获取核销优惠券二维码（优惠券中心）
 * 
 * **/
function getHxCouponImgByAjax() {
    $.ajax({
        url: globalUrl + '/seller/couponVerificationInfo.htm?v=' + new Date().getTime(),
        type: 'POST',
        data: '' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                $('.pop_bg').show();
                $('#couponHxImg').attr('src', result.result.data);
                $('.coupon-hx').show();
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/***********************
 * 
 * 活动页和图文分享编辑组件（添加，位置调整和删除）
 * 
 * ***********************************************/
var TextMark = function () {
    this.desc = 'for coupon edit';
}
TextMark.prototype = {
    addTextMark: function (_parents, con) {
        //获取以后文本的个数，用于编号
        var thisModuleIndex = parseInt($(_parents).children('.textMarkIndex').length) + 1;
        // 新建一个文本添加到内容编辑区域;textMarkIndex 类名用于记录需要序号的
        var domStr = "";
        domStr += "<li class='textMark-item textMarkIndex'>";
        domStr += "<div class='textMark_index'>" + thisModuleIndex + "</div>";
        if (con != undefined) {
            domStr += "<div class='textMark_input' contenteditable='true' placeholder='优惠内容（最多50个字）'>" + unescape(con) + "</div>";
        } else {
            domStr += "<div class='textMark_input' contenteditable='true' placeholder='优惠内容（最多50个字）'></div>";
        }
        // 操作按钮
        domStr += "<ul class='textMark_handle'>";
        domStr += "<li class='tHandleBottom'>";
        domStr += "<img src='index_files/bottom-5741e0b183.png' alt=''>";
        domStr += "<span>向下</span>";
        domStr += "</li>";
        domStr += "<li class='tHandleTop'>";
        domStr += "<img src='index_files/top-7c2a80f48f.png' alt=''>";
        domStr += "<span>向上</span>";
        domStr += "</li>";
        domStr += "<li class='tHandleDel'>";
        domStr += "<img src='index_files/del-81b221e3e9.png' alt=''>";
        domStr += "<span>删除</span>";
        domStr += "</li>";
        domStr += "</ul>";
        domStr += "</li>";
        // 插入
        $(domStr).appendTo(_parents);
        // 元素跟新后；判断按钮的展示状况
        this.isHandleShow('.textMark-item');
    },
    addCouponMark: function (_parents) {
        // 新建一个优惠券添加到内容编辑区域;textMarkCoupon 类名用于记录优惠券数量的
        $(_parents).find('.textMark-item').removeClass('nowAddCoupon');
        var domStr = "";
        domStr += "<li class='textMark-item textMarkCoupon nowAddCoupon'>";
        domStr += "<ul class='textMark_coupon'></ul>"; // 优惠券
        // 操作按钮
        domStr += "<ul class='textMark_handle'>";
        domStr += "<li class='tHandleBottom'>";
        domStr += "<img src='index_files/bottom-5741e0b183.png' alt=''>";
        domStr += "<span>向下</span>";
        domStr += "</li>";
        domStr += "<li class='tHandleTop'>";
        domStr += "<img src='index_files/top-7c2a80f48f.png' alt=''>";
        domStr += "<span>向上</span>";
        domStr += "</li>";
        domStr += "<li class='tHandleDel'>";
        domStr += "<img src='index_files/del-81b221e3e9.png' alt=''>";
        domStr += "<span>删除</span>";
        domStr += "</li>";
        domStr += "</ul>";

        domStr += "</li>";
        // 插入
        $(domStr).appendTo(_parents);
        // 元素跟新后；判断按钮的展示状况
        this.isHandleShow('.textMark-item');
    },
    goTop: function (obj) {
        // 插入元素之前
        $(obj).prev().before($(obj));
        // 元素跟新后；判断按钮的展示状况
        this.isHandleShow('.textMark-item');
        // 顺序改变，跟新序号展示
        this.orderTextIndex();
    },
    goBottom: function (obj) {
        // 插入元素之后
        $(obj).next().after($(obj));
        // 元素跟新后；判断按钮的展示状况
        this.isHandleShow('.textMark-item');
        // 顺序改变，跟新序号展示
        this.orderTextIndex();
    },
    delMark: function (obj) {
        // 删除元素
        $(obj).parents('.textMark-item').remove();
        // 元素跟新后；判断按钮的展示状况
        this.isHandleShow('.textMark-item');
        // 顺序改变，跟新序号展示
        this.orderTextIndex();
    },
    isHandleShow: function (box) {
        // 判断操作按钮的显示和隐藏
        $(box).find('.tHandleTop').show();
        $(box).find('.tHandleBottom').show();
        $(box).eq(0).find('.tHandleTop').hide(); // 第一个元素的向上按钮隐藏
        $(box).eq(-1).find('.tHandleBottom').hide(); // 最后一个元素的向下按钮隐藏
    },
    orderTextIndex: function () {
        // 元素顺序改变后，跟新序号
        $('.textMarkIndex').each(function (index, el) {
            $(el).children('.textMark_index').text(index + 1);
        })
    }
}



/**
 * 渲染活动页优惠样式
 * **/
var createActCouponList = function () {

}
createActCouponList.prototype = {
    renderText: function (_par, con) {
        var domStr = "";
        domStr += "<li class='coupon-content_text'>";
        domStr += "<div class='coupon-content_textNum'>";
        domStr += "<span>" + ($('.coupon-content_text').length + 1) + "</span>";
        domStr += "</div>";
        domStr += "<p class='coupon-content_textFont'>" + con + "</p>";
        domStr += "</li>";

        $(domStr).appendTo(_par);
    },
    renderCoupon: function (_par, _val, fun) {
        var domStr = "";
        $('.coupon-content_coupon').removeClass('nowAdd');
        domStr += "<li class='coupon-content_coupon nowAdd'></li>";
        $(domStr).appendTo(_par);
        fun(_val);
    },
    renderCouponById: function (_par, id, fun) {
        var domStr = "";
        $('.coupon-content_coupon').removeClass('nowAdd');
        domStr += "<li class='coupon-content_coupon nowAdd'></li>";
        $(domStr).appendTo(_par);
        getCouponDetailById(id, fun)
    }
}


/**
 * 根据id获取优惠券信息
 * 
 * ***/

function getCouponDetailById(id, fun, linkType) {
    var _params = {
        "couponId": id,	// 
    }
    var ajaxUrl = '';
    if (linkType == 'edit') {
        ajaxUrl = '/wx/seller/showCoupon.htm?v=';
    } else {
        ajaxUrl = '/wx/buyer/showCoupon.htm?v=';
    }
    $.ajax({
        // url: globalUrl + ajaxUrl + new Date().getTime(),
        url: window.location.origin + ajaxUrl + new Date().getTime(),
        type: 'POST',
        async: false,
        data: 'params={"data":' + JSON.stringify(_params) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                fun(result);
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 领取优惠券
 * 
 * ***/

function drawCouponById(id, _drawId, _drawType, _sellerId, fun) {
    var url_link
    var _params = {
        "sellerIds": _sellerId,
        "couponId": id,	// 
        "drawId": _drawId,
        "drawType": _drawType
    }
    /**/
    // if(selectmode===1)
    // {
    //     url_link = twCoupon+'/buyer/getCoupon.htm?v=' + new Date().getTime()
    // }
    // else{
    //     url_link = globalUrl + '/buyer/getCoupon.htm?v=' + new Date().getTime()
    // }
    /**/
    $.ajax({
        // url: globalUrl + '/buyer/getCoupon.htm?v=' + new Date().getTime(),
        url: window.location.origin+'/wx/buyer/getCoupon.htm?v=' + new Date().getTime(),
        type: 'POST',
        async: false,
        data: 'params={"data":' + JSON.stringify(_params) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                warns(result.result.message);
                // 回调 ，领取完成优惠券后，修改优惠券状态
                if (typeof fun == 'function') {
                    fun();
                }
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/**
 * 使用优惠券
 * 
 * ***/

function useCouponById(id, _couponInstanceID) {
    var _params = {
        "couponId": id,
        "couponInstanceId": _couponInstanceID,
    }
    $.ajax({
        url: globalUrl + '/buyer/applyCoupon.htm?v=' + new Date().getTime(),
        type: 'POST',
        async: false,
        data: 'params={"data":' + JSON.stringify(_params) + '}' + isDebug,
        success: function (result) {
            var result = JSON.parse(result);
            if (result.status == 200) {
                warns(result.result.message);
                setTimeout(function () {
                    location.reload();
                }, 1500)
            } else if (result.status == 700) {
                location.href = globalUrl + '/error.htm?code=700';
            } else if (result.status == 701) {
                location.href = globalUrl + '/error.htm?code=701';
            } else if (result.status == 702) {
                location.href = globalUrl + '/error.htm?code=702';
            } else {
                warns(result.result.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}