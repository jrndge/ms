var tops_if = true;
var img_types = 0;
var img_types_this = '';
var data_prams = '';
var img_state = 1;
var headImgType = 1; //头图类型   1主题  2用户上传  3 头图列表
//图片width
var banner_w = $('body').width();
var devicePixelRatio = window.devicePixelRatio;
var banner_ww = Math.round(devicePixelRatio * banner_w);
var share_ww = Math.round(devicePixelRatio * 300);
var preview_type = true; // 判断预览是否通过
var web_debug = true;
var height = 0; //用于可添加的文本框自动拉伸监听
var ajax_date = '?v=' + new Date().getTime(); //接口时间戳
var to_pay_btn = true; //限制支付按钮多次触发   若为false则不实行支付功能
var ms_edit_state = true; //秒杀是否开始（用于时间插件）
var bargainRankingList_length = true; //排行榜是否继续加载
var fx_img_upload = '';
var browseId;
var tout_staut = [];
var browseStartTime = + new Date();

var is_mini = false;
var _forwardId = '';
var _buyId = '';

var _level = 1;
var _referBrowseId = 0;

var _hpcDataUrl = {
  time:'',
  uuid:'',
  sign:'',
  res:'',
  type:'',
  enrollId:'',
  content:'',
  payid:'',
  nowForwardId:'',
}

/**
 * url存在isAPp=y,则添加sessionStorage
 *
 * @param {string} url
 * @returns {array}
 */
function parseQueryString(url){
  var arr;
  var res = {};
  arr = url.split('?');
  arr.shift();
  var queryStr = arr.join('?');
  if (queryStr.trim().length == 0){
    return res;
  }
  //获取参数
  arr = queryStr.split('&');
  for (var i = 0; i <  arr.length; i++) {
    var itemArr = arr[i].split('=');
    var name = itemArr.shift();
    var value = itemArr.join('=');
    res[name] = value;
  }
  return res;
}
function setIsApp(){
  sessionStorage.setItem('isApp','y');
}
if(location.href.indexOf('edit') !== -1 && parseQueryString(location.href).isApp === 'y'){
  setIsApp();
}
// end

function createForwardId() {
  console.log("重新生成_forwardId");
  _forwardId = _buyId.toString() + new Date().getTime().toString();
  console.log("_forwardId",_forwardId);
}


// 是数推环境则添加stEnv=st
function setStEnv() {
  if(location.href.indexOf('edit') !== -1 && parseQueryString(location.href).stEnv === 'st'){
    sessionStorage.setItem('stEnv','st');
  }
  if(location.href.indexOf('preview') !== -1 && parseQueryString(location.href).stEnv === 'st'){
    sessionStorage.setItem('stEnv','st');
  }
}
setStEnv()
// end

//判断是否是ios
var navigators = '';
var ua = navigator.userAgent.toLowerCase();
if (/iphone|ipad|ipod/.test(ua)) {
	navigators = 'ios';
} else if (/android/.test(ua)) {
	navigators = 'android';
}

//图文秀专用链接域名
var ajaxurl = window.location.origin;

if ($('.banner_mb_tab_div').length && typeof BScroll !== "undefined") {
  var scroll_mb = new BScroll('.banner_mb_tab_div', {
    scrollX: true,
    scrollY: false,
    click: true
  })
}
var w = $('html').width()
$('html').append('<style>html{font-size:' + (100 * (w / 750)) + 'px !important;}</style>')
//IOS返回页面不刷新，导致会出现分享朋友圈
$(function () {
  if (app.isApp()) {
    $('#add_video, #add_videos, #add_videoss').hide()
    $('#add_text,  #add_pic, #add_texts, #add_textss, #add_pics, #add_picss').css('margin-left', '11%')
  }
	if ($('#banner_tips_person').length || $('#banner_tips_tel').length) {
		var _v_top = $('#banner_tips_tel').offset().top
		var _v_ratio = (parseInt($('html').css('font-size').replace('px', '')))/50
		//页面滑动时  个人中心以及联系商家随滚动而变化高度
		$(window).on('scroll', function (e) {
			var scr = $(window).scrollTop()
			if (scr + 38.5 * _v_ratio >= _v_top) {
				$('#banner_tips_person').addClass('fixed_f')
				$('#banner_tips_tel').addClass('fixed_s')
			} else {
				$('#banner_tips_person').removeClass('fixed_f')
				$('#banner_tips_tel').removeClass('fixed_s')
			}
		})
	}

  try {
    var isPageHide = false;
    window.addEventListener('pageshow', function () {
      if (isPageHide) {
        window.location.reload();
      }
    });
    window.addEventListener('pagehide', function () {
      isPageHide = true;
    });

  } catch (e) {}
})

//仿滚动条
if (location.href.indexOf('hz_zl') != -1) {}

function create_scroll_bar(el) {
  if ($(el).height() < $(el).find('li').height() * $(el).find('li').length) { //如果容器高度小于内部元素的总高度
  }
  $(el).scroll(function () {
    create_value(el)
  })
}

function create_value(el) {
  $(el).find('.style').remove()
  var mar = parseInt($(el).find('li').css('margin-bottom')) ? parseInt($(el).find('li').css('margin-bottom').replace('px', '')) : null
  if (!mar) return
  var per_t = $(el).scrollTop() / (($(el).find('li').height() + mar) * $(el).children('li').length) //获取当前scrollTop值相对于总体高度的百分比
  var per_h = $(el).height() / (($(el).find('li').height() + mar) * $(el).children('li').length)
  $(el).append("<div style='display: none' class='style'><style>.prev_list_kj>ul{--scrollbar-h: " + per_h * 100 + "%;--scrollbar-t: " + (parseInt($(el).scrollTop()) + parseInt($(el).height() * per_t)) + "px}</style></div>")
}
/**
 * 刘亚 -- 动效和音乐
 * **/
var firstBodyClickStart = true; // 点击音乐自动播放只能触发一次
var mdFlag = typeof SnowGift; // 判断是否引入SnowGift对象，来判断页面是否需要动销和音乐
var mySnow;
if (mdFlag !== "undefined") {
  mySnow = new SnowGift(); // 实例化动效对象
}
var myBgMusic = new Audio(); // 实例化音乐对象
if (mdFlag == 'function') {

  myBgMusic.loop = true;
  // 	实例化picker
  var AnimatePicker = new SnowPicker(); // 动效选择picker
  var MusicPicker = new SnowPicker(); // 音乐选择picker
  if ($('#animateBtn').attr('data-am') != '' && $('#animateBtn').attr('data-am')) {
    var dayaArr = reIndex($('#animateBtn').attr('data-am'), AnimatePicker.pickerDATA);
    for (var i = 0; i < AnimatePicker._class.length; i++) {
      if (AnimatePicker._class[i].text == reIndex2($('#animateBtn').attr('data-am'), AnimatePicker.pickerDATA)) {
        var _choose = [i, dayaArr];
        AnimatePicker.checked = _choose;
      };
    };
  }
  if ($('#musicBtn').attr('data-am') != '' && $('#musicBtn').attr('data-am')) {
    var dayaArr = reIndex($('#musicBtn').attr('data-am'), MusicPicker.pickerDATA);
    for (var i = 0; i < MusicPicker._class.length; i++) {
      if (MusicPicker._class[i].text == reIndex2($('#musicBtn').attr('data-am'), MusicPicker.pickerDATA)) {
        var _choose = [i, dayaArr];
        MusicPicker.checked = _choose;
      };
    };
  }
  AnimatePicker.flag = 'animateBtn';
  AnimatePicker.title = '背景动效';
  AnimatePicker.noTip = '无背景动效';
  MusicPicker.flag = 'musicBtn';
  MusicPicker.title = '背景音效';
  MusicPicker.noTip = '无背景音效';
}
/**************************************************/
// liuya
var devicePixelRatio = window.devicePixelRatio;
var bigImgW = banner_img_w + Math.ceil(parseInt($('html').css('font-size')) * 6.98 * 0.9 * devicePixelRatio);
var bigImgWs = gifW + Math.ceil(parseInt($('html').css('font-size')) * 6.98 * 0.9 * devicePixelRatio);
// var bigImgW = banner_img_w + Math.ceil($(window).width());
/*************************************************/

// 页面重定向的方法（当回退时间触发的时候，可以回退到#）
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}

//微信分享链接
function getWxShareUrl(wx_appid, pyq, activityId, referId, activityEnrollId, moduleId, type, payid, forwardId, level) {
  var redirectUrl;
  if (type == 'dsp') {
    redirectUrl = globalUrl + '/' + moduleId + '/' + encodeURIComponent('{\"activityId\":' + activityId + ',\"referId\":' + referId + ',\"level\":' + level + ',\"forwardId\":' + 
    ((forwardId == undefined || forwardId == 'undefined')?'null':forwardId)
     + ',\"enrollId\":' + activityEnrollId + ',\"referType\":' + pyq + '}') + '/wx_share.htm';
  } else if (type == 'tps') {
    redirectUrl = globalUrl + '/' + moduleId + '/' + encodeURIComponent('{\"activityId\":' + activityId + ',\"referId\":' + referId + ',\"level\":' + level + ',\"forwardId\":' + 
    ((forwardId == undefined || forwardId == 'undefined')?'null':forwardId)
     + ',\"activityEnrollId\":' + activityEnrollId + ',\"payId\":' + payid + ',\"referType\":' + pyq + '}') + '/wx_share.htm';
  } else {
    redirectUrl = ajaxurl + '/wx/' + moduleId + '/' + encodeURIComponent('{\"activityId\":' + activityId + ',\"referId\":' + referId + ',\"level\":' + level + ',\"forwardId\":' + 
    ((forwardId == undefined || forwardId == 'undefined')?'null':forwardId)
     + ',\"activityEnrollId\":' + activityEnrollId + ',\"referType\":' + pyq + '}') + '/wx_share.htm';
  };
  return redirectUrl;
}
//loading
function Loading(type) {
  if (type == 'start') {
    $('body').css('overflow-y', 'hidden');
    $('.loading').show();
  } else {
    $('body').css('overflow-y', 'auto');
    $('.loading').hide();
  }
};
//时间转换
function formatDate(now) {
  var now = new Date(now);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2) + " " + fixZero(hour, 2) + ":" + fixZero(minute, 2) + ":" + fixZero(second, 2);
}
//时间如果为单位数补0
function fixZero(num, length) {
  var str = "" + num;
  var len = str.length;
  var s = "";
  for (var i = length; i-- > len;) {
    s += "0";
  }
  return s + str;
}
//弹出显示隐藏图片上传选项
function ImgShowOrHide(type) {
	// if (tops_if == true) {
		if (type == true) {
			if (img_state == 1) {
				// $('body').css('overflow-y', 'hidden');
				$('#file').click()
				// $('.banner_img_tab_clk_bj').show();
				// $('.banner_img_tab_clk').animate({ bottom: '0rem' }, 200);
			} else {
				AjaxNullTips('图片正在上传请稍后操作');
			}
		} else {
			// $('body').css('overflow-y', 'auto');
			// $('.banner_img_tab_clk_bj').hide();
			// $('.banner_img_tab_clk').animate({ bottom: '-3rem' }, 200);
		};
	// }
	// tops_if = true;
};
//接口请求失败返回提示
function AjaxErrorTips() {
  layer.open({
    content: '请求失败',
    skin: 'msg',
    time: 3 //3秒后自动关闭
  });
};
//接口请求失败返回提示
function AjaxNullTips(tips) {
  layer.open({
    content: tips,
    skin: 'msg',
    time: 3 //3秒后自动关闭
  });
};
//判断连接内是否是腾讯或者优酷
function Urlckl(url) {
  if (url.indexOf('http://v.youku.com/') == -1) {
    if (url.indexOf('http://m.youku.com/') == -1) {
      if (url.indexOf('http://player.youku.com') == -1) {
        if (url.indexOf('v.qq.com/') == -1) {
          return url = false;
        } else {
          return url = true;
        }
      } else {
        return url = true;
      }
    } else {
      return url = true;
    }
  } else {
    return url = true;
  }
};
//上传文件接口
function ImgUpdata(thiss) {
  console.log(thiss)
  var file = $('#' + thiss.attr('id'))[0].files[0]; //获取图片资源
  var filename = file.name;
  var files_name = $('#' + thiss.attr('id')).val();
  files_name = files_name.replace(/.*(\/|\\)/, "");
  files_name = (/[.]/.exec(files_name)) ? /[^.]+$/.exec(files_name.toLowerCase()) : '';
  var file_width = 0,
    file_height = 0;
//提示图片格式不能为gif类型
    if(file.type=="image/gif"){
      AjaxNullTips("不能上传gif格式图片")
      // layer.open({
      //   content: "图片格式不能为gif类型",
      //   skin: 'msg',
      //   time: 3 //3秒后自动关闭
      // });
      return false;
    }
  if ($('#' + thiss.attr('id'))[0].files[0].size > 5 * 1024 * 1024) {
    AjaxNullTips('上传的图片不能大于5MB');
    return false;
  } else {
    //获取上传图片的尺寸（个别手机拍照的图片尺寸过大）
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      //加载图片获取图片真实宽度和高度
      var image = new Image();
      image.onload = function () {
        file_width = image.width;
        file_height = image.height;
        if (file_width < 4096 && file_height < 4096) {
          var img_date = (new Date()).getTime();
          var ossData = new FormData();
          ossData.append('OSSAccessKeyId', $('#aly_ossAccessKeyId').val());
          ossData.append('policy', $('#aly_policy').val());
          ossData.append('Signature', $('#aly_signature').val());
          ossData.append('key', $('#aly_key').val() + img_date + '.' + files_name[0]);
          ossData.append('success_action_status', 201); // 指定返回的状态码
          ossData.append('file', file, filename);

					img_state = 0;
					var dom_w = $('.banner').width();
					ImgShowOrHide(false);
					var url_img = $('#aly_url').val();
					$.ajax({
						url: url_img,
						data: ossData,
						processData: false,
						contentType: false,
						dataType: 'xml',
						type: 'POST',
						success: function (data) {
							console.log(data)
							img_state = 1;
							// $('.bargain_btn').animate({ bottom: '0rem' }, 200);
							var datas = $(data).find('PostResponse');
							var datas_url = datas.find('Location').text().replace(staticOssUrl, staticCdnUrl);
							console.log(img_types);
							if (img_types == 0) {
								$('#active_kj_banner').prop('src', datas_url);
								$('.industry_colse').attr('data', datas_url);
								$('.banner_mb_tab_clk').attr('data', datas_url);
								$('.banner').children('img').not('#active_kj_banner').remove();
								$('.industry_img_list').animate({ bottom: '-5rem' }, 200);
								$('.bargain_btn').show().animate({ bottom: '-1px' }, 200);
								$('#active_kj_banner')[0].onload = function () {
									$('.banner').css({ 'width': '100%', 'height': '100%' });
									$('#active_kj_banner').css('position', 'relative');
								};
								headImgType = 2;
							} else if (img_types == 1) {
								$('.img_upload_y').children('img').prop('src', datas_url);
								$('.img_upload_y').show();
								$('#bargain_describe_img').hide();
							} else if (img_types == 2) {
								img_types_this.children('.add_tab_pic_url').prop('src', datas_url).css('display', 'block');
								img_types_this.children('.add_tab_pic_content').hide();
								img_types_this.css({ 'height': 'auto', 'margin-bottom': '.7rem' });
							} else if (img_types == 3) {
								// 缩略图
								img_types_this.children('img').prop('src', datas_url).css({
									'width': '94%', 'maxHeight': '100%', height: 'auto', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'
								}).addClass('prizeNoMr');
								img_types_this.children('.upload-img_dec').hide();
								// img_types_this.css({'height':'auto','margin-bottom':'.7rem'});
							} else if (img_types == 4) {
								// 全覆盖
								img_types_this.children('img').prop('src', datas_url).css({
									'width': '100%', 'maxHeight': '100%', height: 'auto', margin: 0
								}).addClass('zk-imgType');
								img_types_this.find('span').hide();
							} else if (img_types == 5) {
								// 全覆盖
								img_types_this.parent().parent().children('img').prop('src', datas_url);
								// img_types_this.find('span').hide();
							} else if (img_types == 99) {
								// 投票商家版名单页上传图片
								$(img_types_this).siblings('.tp_img_div').prop('src', datas_url).show();
								img_types_this.hide();
							} else if (img_types == 6) {//多商品砍价图片上传
								dkj_img_this.children('div').css({ 'display': 'none' });
								dkj_img_this.css('margin-bottom', '.7rem');
								dkj_img_this.children('img').show().attr('src', datas_url);
								dkj_img_this.next().show();
							};
							img_types = 0;
							img_types_this = '';

              data_prams = {
                "url": datas_url,
              };
              $.ajax({
                type: "post",
                url: globalUrl + '/seller/uploadPicCallBack.htm',
                data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
                success: function (data) {
                  //						img_state = 1;
                },
                error: function () {
                  //						img_state = 1;
                  AjaxErrorTips();
                }
              });
            },
            error: function (res) {
              img_state = 1;
              AjaxErrorTips();
              img_types = 0;
              img_types_this = '';
            }
          })
        } else {
          AjaxNullTips('图片宽高不能超过4096');
        }
      };
      image.src = data;
    };
    reader.readAsDataURL(file);
  }
};

//判断是否显示“向上”，“向下”
function ShowAndHide() {
  var dom_elem_length = $('.add_content').find('.addstyle').length;
  if (dom_elem_length == 1) {
    $('.add_content').find('.addstyle').children('ul').addClass('del_margin');
    $('.add_content').find('.addstyle').children('ul').children('.top').hide();
    $('.add_content').find('.addstyle').children('ul').children('.bottom').hide();
  } else if (dom_elem_length == 2) {
    $('.add_content').find('.addstyle').children('ul').addClass('top_margin').removeClass('del_margin');
    $('.add_content').find('.addstyle').eq(0).children('ul').children('.top').show();
    $('.add_content').find('.addstyle').eq(0).children('ul').children('.bottom').hide();
    $('.add_content').find('.addstyle').eq(1).children('ul').children('.top').hide();
    $('.add_content').find('.addstyle').eq(1).children('ul').children('.bottom').show();
  } else if (dom_elem_length > 2) {
    $('.add_content').find('.addstyle').children('ul').children('li').show();
    $('.add_content').find('.addstyle').children('ul').removeClass('top_margin');
    $('.add_content').find('.addstyle').eq(0).children('ul').addClass('top_margin');
    $('.add_content').find('.addstyle').eq(dom_elem_length - 1).children('ul').addClass('top_margin');
    $('.add_content').find('.addstyle').eq(0).children('ul').children('.top').show();
    $('.add_content').find('.addstyle').eq(0).children('ul').children('.bottom').hide();
    $('.add_content').find('.addstyle').eq(dom_elem_length - 1).children('ul').children('.top').hide();
    $('.add_content').find('.addstyle').eq(dom_elem_length - 1).children('ul').children('.bottom').show();
  };
};


//商家介绍添加文本、图片、视频
//文本添加
function addIntroduce(type, state, imgMaxNum) {
  var imgMaxNum = imgMaxNum ? imgMaxNum : 5;
  if (state == 'add') {
    if (type == 'text') {
      $('.add_content').append('<div class="bargain_introduce_tab_text addstyle" id="texts' + height + '">' +
        '<textarea id="text' + height + '" class="bargain_introduce_tab_text_fous"></textarea>' +
        '<span style="cursor: pointer">请添加文本</span>' +
        '<ul class="mide_margin bargain_introduce_tab_add">' +
        '<li class="top" ><i></i><span>向下</span><em></em></li>' +
        '<li class="bottom" ><i></i><span>向上</span><em></em></li>' +
        '<li class="del" ><i></i><span>删除</span></li>' +
        '</ul>' +
        '</div>');
      makeExpandingAreas('text' + height);
      height++;
    } else if (type == 'image') {
      var add_pic_length = $('.add_content').find('.bargain_introduce_tab_pic').length;
      if (add_pic_length >= imgMaxNum) {
        AjaxNullTips('最多上传' + imgMaxNum + '张图片');
      } else {
        $('.add_content').append('<div class="bargain_introduce_tab_pic addstyle">' +
          '<div class="add_tab_pic_content">' +
          '<img src="index_files/add_pic_content-198319f166.png" />' +
          '<span>点击选择图片</span>' +
          '</div>' +
          '<img src="" class="add_tab_pic_url">' +
          '<ul class="mide_margin bargain_introduce_tab_add">' +
          '<li class="top" ><i></i><span>向下</span><em></em></li>' +
          '<li class="bottom" ><i></i><span>向上</span><em></em></li>' +
          '<li class="del" ><i></i><span>删除</span></li>' +
          '</ul>' +
          '</div>');
      }
    } else {
      var add_pic_length = $('.add_content').find('.bargain_introduce_tab_video').length;
      $('.add_content').append('<div class="bargain_introduce_tab_video addstyle">' +
        '<input class="add_tab_video_content" />' +
        '<span style="cursor: pointer">请输入视频网址（仅支持腾讯）</span>' +
        '<ul class="mide_margin bargain_introduce_tab_add">' +
        '<li class="top" ><i></i><span>向下</span><em></em></li>' +
        '<li class="bottom"><i></i><span>向上</span><em></em></li>' +
        '<li class="del"><i></i><span>删除</span></li>' +
        '</ul>' +
        '</div>');
    }
    ShowAndHide();
  } else {
    type.parent().parent().remove();
    ShowAndHide();
    event.stopPropagation();
  }
};

//商品描述判断是否显示“向上”，“向下”
function ShowAndHideForGoods() {
  var dom_elem_length = $('#goodsDesc').find('.addstyle').length;
  if (dom_elem_length == 1) {
    $('#goodsDesc').find('.addstyle').children('ul').addClass('del_margin');
    $('#goodsDesc').find('.addstyle').children('ul').children('.goodsTop').hide();
    $('#goodsDesc').find('.addstyle').children('ul').children('.goodsBottom').hide();
  } else if (dom_elem_length == 2) {
    $('#goodsDesc').find('.addstyle').children('ul').addClass('top_margin').removeClass('del_margin');
    $('#goodsDesc').find('.addstyle').eq(0).children('ul').children('.goodsTop').show();
    $('#goodsDesc').find('.addstyle').eq(0).children('ul').children('.goodsBottom').hide();
    $('#goodsDesc').find('.addstyle').eq(1).children('ul').children('.goodsTop').hide();
    $('#goodsDesc').find('.addstyle').eq(1).children('ul').children('.goodsBottom').show();
  } else if (dom_elem_length > 2) {
    $('#goodsDesc').find('.addstyle').children('ul').children('li').show();
    $('#goodsDesc').find('.addstyle').children('ul').removeClass('top_margin');
    $('#goodsDesc').find('.addstyle').eq(0).children('ul').addClass('top_margin');
    $('#goodsDesc').find('.addstyle').eq(dom_elem_length - 1).children('ul').addClass('top_margin');
    $('#goodsDesc').find('.addstyle').eq(0).children('ul').children('.goodsTop').show();
    $('#goodsDesc').find('.addstyle').eq(0).children('ul').children('.goodsBottom').hide();
    $('#goodsDesc').find('.addstyle').eq(dom_elem_length - 1).children('ul').children('.goodsTop').hide();
    $('#goodsDesc').find('.addstyle').eq(dom_elem_length - 1).children('ul').children('.goodsBottom').show();
  };
};

function addGoodsDesc(imgMaxNum) {
  var add_pic_length = $('#goodsDesc').find('.bargain_introduce_tab_pic').length;
  if (add_pic_length >= imgMaxNum) {
    AjaxNullTips('最多上传' + imgMaxNum + '张图片');
  } else {
    $('#bargain_describe_img').before('<div class="bargain_introduce_tab_pic addstyle addGoodsDescImg">' +
      '<div class="add_tab_pic_content">' +
      '<img src="index_files/add_pic_content-198319f166.png" />' +
      '<span>点击选择图片</span>' +
      '</div>' +
      '<img src="" class="add_tab_pic_url">' +
      '<ul class="mide_margin bargain_introduce_tab_add">' +
      '<li class="goodsTop" ><i></i><span>向下</span><em></em></li>' +
      '<li class="goodsBottom" ><i></i><span>向上</span><em></em></li>' +
      '<li class="goodsDel" ><i></i><span>删除</span></li>' +
      '</ul>' +
      '</div>');
    if ($('#goodsDesc').find('.bargain_introduce_tab_pic').length == imgMaxNum) {
      $('#bargain_describe_img').hide();
    }
    ShowAndHideForGoods();
  }
}
//商品介绍 - 图片删除
$('body').on('click', '.goodsDel', function (event) {
  $(this).parent().parent().remove();
  if ($('#goodsDesc').find('.bargain_introduce_tab_pic').length < 4) {
    $('#bargain_describe_img').show();
  }
  ShowAndHideForGoods();
  event.stopPropagation();
});
//商品介绍 - 向上
$('body').on('click', '.goodsTop', function (event) {
  var _this = $(this).parent().parent();
  if (!$(this).parent().parent().next().hasClass('img_upload')) {
    $(this).parent().parent().next().after(_this);
  }
  ShowAndHideForGoods();
  event.stopPropagation();
});
// 商品介绍 - 向下
$('body').on('click', '.goodsBottom', function (event) {
  var _this = $(this).parent().parent();
  if (!$(this).parent().parent().prev().hasClass('content_label_text')) {
    $(this).parent().parent().prev().before(_this);
  }
  ShowAndHideForGoods();
  event.stopPropagation();
});

//文本添加
$('#add_text').click(function () {
  addIntroduce('text', 'add');
});

//视频添加
$('#add_video').click(function () {
  addIntroduce('video', 'add');
});


//视频，文本，图片删除
$('.add_content').on('click', '.del', function (event) {
  addIntroduce($(this), 'del');
});


//向上
$('body').on('click', '.top', function (event) {
  var _this = $(this).parent().parent();
  $(this).parent().parent().next().after(_this);
  ShowAndHide();
  event.stopPropagation();
});
//向下
$('body').on('click', '.bottom', function (event) {
  var _this = $(this).parent().parent();
  $(this).parent().parent().prev().before(_this);
  ShowAndHide();
  event.stopPropagation();
});
//显示隐藏模板选择项
$('#change_mb').click(function () {
  /**
   * liuya -- 跟换模板的优化
   * **/
  scroll_mb.refresh();
  // 选中默认的居中显示
  var clientW = $(window).width();
  if ($('.banner_mb_tab_div>ul').width() > clientW && $('.banner_mb_tab_img_active').length != 0) {
    var active_left = $('.banner_mb_tab_img_active').find('img').offset().left; // 获取元素距离屏幕左侧的距离
    var activeImgW = $('.banner_mb_tab_img_active').find('img').width(); // 每个行业缩略图的宽度
    var disTanceHalfClient = active_left - (clientW / 2) + (activeImgW / 2); // 距离屏幕中间的距离
    var disTaceBoxClient = $('.banner_mb_tab_div>ul').offset().left; //滑动块距离屏幕的距离
    // 边界限制
    var animateW = disTaceBoxClient - disTanceHalfClient;
    animateW = animateW > 0 ? 0 : animateW;
    animateW = animateW < -($('.banner_mb_tab_div>ul').width() - clientW) ? -($('.banner_mb_tab_div>ul').width() - clientW) : animateW;
    scroll_mb.scrollTo(animateW, 0);
  }
  /***********************************************/
  $('body').css('overflow-y', 'hidden');
  $('.banner_mb_tab').animate({
    bottom: '0rem'
  }, 200);
  // $('.bargain_btn').hide();
  $('.industry_img_list').animate({
    bottom: '-5rem'
  }, 200);
});

$('.banner_mb_tab_clk').click(function () {
  $('body').css('overflow-y', 'auto');
  $('.banner_mb_tab').animate({
    bottom: '-3rem'
  }, 200);
  var data = $('.banner_mb_tab>div>ul').children('.banner_mb_tab_img_active').attr('data');
  if (location.href.indexOf('kj') != -1) {
    sessionStorage.setItem('preview_theme', data);
  } else if (location.href.indexOf('pt') != -1) {
    sessionStorage.setItem('pt_preview_theme', data);
  } else if (location.href.indexOf('bm') != -1) {
    sessionStorage.setItem('bm_preview_theme', data);
  } else if (location.href.indexOf('jl') != -1) {
    sessionStorage.setItem('jl_preview_theme', data);
  }
  $('.banner_mb_tab_qx').attr('data', data);
  $('.bargain_btn').show();
  $('.banner_mb_tab_clk').attr('data', '');
  headImgType = 1;
  $('.banner_mb_tab_clk').attr('data-typeid', JSON.parse(data).themeTypeId);
  $('.industry_colse').attr('data', JSON.parse(data).headImgUrl);
  $('.industry_img>li').removeClass('industry_img_active').hide();
  var industry_img_width = 0;
  for (var i = 0; i < $('.industry_img>li').length; i++) {
    var firstSelectImgId = $('.iundustry_text_list>li').eq(0).attr('data');
    if ($('.industry_img>li').eq(i).attr('data') == firstSelectImgId) {
      $('.industry_img>li').eq(i).show();
      industry_img_width++;
    };
  };
  $('.industry_img').css('width', 2.1 * industry_img_width + 'rem');
  $('.iundustry_text_list>li').removeClass('iundustry_text_list_active').eq(0).addClass('iundustry_text_list_active');

});


$('.banner_mb_tab_qx').click(function () {
  $('body').css('overflow-y', 'auto');
  $('.banner_mb_tab').animate({
    bottom: '-3rem'
  }, 200);
  var data = $(this).attr('data');
  TiggerThem(JSON.parse(data));
  // $('.banner').children('img').not('#active_kj_banner').remove();
  if ($('.banner_mb_tab_clk').attr('data') != '') {
    var banner_mb_tab_clk_data = $('.banner_mb_tab_clk').attr('data').split(',');
    for (var i = 0; i < banner_mb_tab_clk_data.length; i++) {
      if (i == 0) {
        $('#active_kj_banner').prop('src', banner_mb_tab_clk_data[i]);
        $('#active_kj_banner').css('position', 'relative');
      } else {
        $('#active_kj_banner').after('<img src="' + banner_mb_tab_clk_data[i] + '" />');
        $('#active_kj_banner').css('position', 'absolute');
      };
    };
  };
  $('.bargain_btn').show();
  $('.banner_mb_tab>div>ul>li').removeClass('banner_mb_tab_img_active');
  for (var i = 0; i < $('.banner_mb_tab>div>ul>li').length; i++) {
    var json_data = JSON.parse($('.banner_mb_tab>div>ul>li').eq(i).attr('data-type'));
    if ($('.banner_mb_tab_clk').attr('data-typeid') == json_data) {
      $('.banner_mb_tab>div>ul>li').eq(i).addClass('banner_mb_tab_img_active');
    };
  };
});

//关闭尾部提醒
$('.foot_to_c>i').click(function () {
  $('.foot_to_c').hide();
  $('.foot_to_c_pt_li').css('bottom', '0rem');
});

//切换模板
$(document).on('click', '.banner_mb_tab>div>ul>li', function () {
  $('.banner_mb_tab>div>ul>li').removeClass('banner_mb_tab_img_active');
  $(this).addClass('banner_mb_tab_img_active');

  TiggerThem(JSON.parse($(this).attr('data'))); //更换主题触发换色
  /**
   * liuya -- 更换模板的优化
   *  计算活动快的位置，和滚动区域的位置，是的选中的图片运动到屏幕中间
   * ***/
  var clientW = $(window).width();
  if ($('.banner_mb_tab_div>ul').width() > clientW) {
    var active_left = $('.banner_mb_tab_img_active').find('img').offset().left; // 获取元素距离屏幕左侧的距离
    var activeImgW = $('.banner_mb_tab_img_active').find('img').width(); // 每个行业缩略图的宽度
    var disTanceHalfClient = active_left - (clientW / 2) + (activeImgW / 2); // 距离屏幕中间的距离
    var disTaceBoxClient = $('.banner_mb_tab_div>ul').offset().left; //滑动块距离屏幕的距离
    // 边界限制
    var animateW = disTaceBoxClient - disTanceHalfClient;
    animateW = animateW > 0 ? 0 : animateW;
    animateW = animateW < -($('.banner_mb_tab_div>ul').width() - clientW) ? -($('.banner_mb_tab_div>ul').width() - clientW) : animateW;
    scroll_mb.scrollTo(animateW, 0);
  }
  /************************************/
});


//得到焦点时，隐藏提示
$(document).on('focus', '.add_tab_video_content', function () {
  $(this).next().hide();
});
$(document).on('focus', '.bargain_introduce_tab_text_fous', function () {
  $(this).next().hide();
});
$(document).on('blur', '.add_tab_video_content', function () {
  if ($(this).val() == '') {
    $(this).next().show();
  };
});
$(document).on('blur', '.bargain_introduce_tab_text_fous', function () {
  if ($(this).val() == '') {
    $(this).next().show();
  };
});

/**
 * liuya -- 解决点击文本框中间提示内容文本框未获取焦点的问题
 * ***/
$(document).on('click', '.bargain_introduce_tab_text>span', function () {
  $(this).siblings('textarea').focus();
});
$(document).on('click', '.bargain_introduce_tab_video>span', function () {
  $(this).siblings('input').focus();
});

//显示隐藏二维码
$(document).on('click', '#banner_tips_ewm', function () {
  if(sessionStorage.getItem('stEnv') === 'st'){
    return false;
  } else {
    $('.layer_fx_bj').show().animate({
      'top': '0rem'
    }, 500);
    $('.layer_fx_hs').hide();
    $('body').css('overflow-y', 'hidden');
    $('.layer_bj').show();
  }
})
	// 分享
	$(document).on('click', '#fx_fpy', function () {
		if (app.isApp()) {
			var title = $('body').attr('title')
			var descr = $('body').attr('descr')
			var img = $('body').attr('img')
			var data_url = $('body').attr('data_url')
			var a_id = $('body').attr('a_id')
      var e_id = $('body').attr('e_id')
      var r_id = $('body').attr('r_id')
      var m_id = $('body').attr('m_id')
      var type = $('body').attr('type')
      var payid = $('body').attr('payid')
      var level = $('body').attr('level')
      var time = _hipacTime;
      var miniParam = {
        data_url: data_url,
        title: title,
        descr: descr,
        img: img,
        a_id: a_id,
        e_id: e_id,
        r_id: r_id,
        m_id: m_id,
        type: type,
        globalUrl: globalUrl,
        level: level
      }
      if (payid) {
        miniParam.payid = payid
      }
      var params = encodeURIComponent(JSON.stringify(miniParam))
      if (window.LdbJsBridge) {
          if (sessionStorage.gmtCreated && (new Date(sessionStorage.gmtCreated).getTime() >= new Date(time).getTime())) {
            // try{
              window.LdbJsBridge.shareToMiniProgram(
                title, 
                descr, 
                data_url, 
                'pages/index/index?params=' + params, 
                img, 
                img, 
                _originId, 
                0)
            // } catch(e) {
				    //   window.LdbJsBridge.shareToWeChat(title, descr, img, data_url)
            // }
        } else {
				  window.LdbJsBridge.shareToWeChat(title, descr, img, data_url)
        }

			} else {
        if (sessionStorage.gmtCreated && (new Date(sessionStorage.gmtCreated.replace(/-/g, '/')).getTime() >= new Date(time.replace(/-/g, '/')).getTime())) {
          // try{
              window.webkit.messageHandlers.shareToMiniProgram.postMessage(
                { 
                  title: title,
                  description: descr,
                  thumbImage: img,
                  webpageUrlString: data_url,
                  viewPath: 'pages/index/index?params=' + params,
                  hdThumbImage: img,
                  userName: _originId,
                  versonType: 0
                }
              )
          // } catch(err) {
          //   window.webkit.messageHandlers.shareToWeChat.postMessage({title: title, descr: descr, thumImage: img, webpageUrl: data_url})
          // }
        } else {
          window.webkit.messageHandlers.shareToWeChat.postMessage({title: title, descr: descr, thumImage: img, webpageUrl: data_url})
        }
			}
		} else {
      $('.layer_fx_hs').show();
      if (is_mini) {
        $('.layer_fx_hs img').hide();
        $('.layer_fx_hs .xcx_fx').show();
      }
		}
  });
  // 分享到小程序回调函数
  function shareToMiniProgramResult(boolean) {
    if (boolean) {
      layer.open({
				content: '分享成功',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
    } else {
      layer.open({
				content: '分享失败',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
    }
  }
$(document).on('click', '#fx_pyq', function () {
  var activity_id = getUrlParam('activityId');
  if (is_mini) {
    getQrCodes(activity_id);
  } else {
    getQrCodes(activity_id);
    $('.layer_ewm').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
    $('.layer_fx_bj').animate({
      'top': '15rem'
    }, 500);
  }
})
$(document).on('click', '.layer_fx_bj>span', function () {
  $('.layer_fx_bj').animate({
    'top': '15rem'
  }, 500);
  $('body').css('overflow-y', 'auto');
  $('.layer_bj').hide();
})
$(document).on('click', '.layer_ewm>i', function () {
  $('body').css('overflow-y', 'auto');
  $('.layer_bj').hide();
  $('.layer_ewm').addClass('bounceOutRight');
})


//选择头图和行业
$(document).on('click', '.industry_img>li', function () {
  var _this = $(this);
  $('.industry_img>li').removeClass('industry_img_active');
  $(this).addClass('industry_img_active');
  $('.banner').children('img').not('#active_kj_banner').remove();
  var img_length = $(this).find('img').length;
  $('#new_img').prop('src', $(this).find('img').eq(0).prop('src'));
  $('#new_img')[0].onload = function () {
    var _banner_w = this.naturalWidth;
    var _banner_h = this.naturalHeight;
    if (location.href.indexOf('cj_jgg_cj') != -1) {
      $('.banner').css({
        'width': '100%'
      });
    } else {
      $('.banner').css({
        'width': _banner_w / 100 + 'rem',
        'height': _banner_h / 100 + 'rem'
      });
    }
    for (var i = 0; i < img_length; i++) {
      if (i == 0) {
        $('#active_kj_banner').prop('src', _this.find('img').eq(0).prop('src'));
        $('#active_kj_banner').css('position', 'relative');
      } else {
        $('#active_kj_banner').after('<img src="' + _this.children('img').eq(i).attr('src') + '" />');
        $('#active_kj_banner').css('position', 'absolute');
      }
    };
  };
  /**
   * liuya -- 更换行业图片优化
   * 计算活动快的位置，和滚动区域的位置，是的选中的图片运动到屏幕中间
   * **/
  var clientW = $(window).width();
  if ($('.industry_img').width() > clientW) {
    var active_left = $('.industry_img_active').find('img').offset().left; // 获取元素距离屏幕左侧的距离
    var activeImgW = $('.industry_img_active').find('img').width(); // 每个行业缩略图的宽度
    var disTanceHalfClient = active_left - (clientW / 2) + (activeImgW / 2); // 距离屏幕中间的距离
    var disTaceBoxClient = $('.industry_img').offset().left; //滑动块距离屏幕的距离
    // 边界限制
    var animateW = disTaceBoxClient - disTanceHalfClient;
    animateW = animateW > 0 ? 0 : animateW;
    animateW = animateW < -($('.industry_img').width() - clientW) ? -($('.industry_img').width() - clientW) : animateW;
    scroll_pic.scrollTo(animateW, 0);
  }
  /******************************************************/
});
$(document).on('click', '.iundustry_text_list>li', function () {
  $('.iundustry_text_list>li').removeClass('iundustry_text_list_active');
  $(this).addClass('iundustry_text_list_active');
  var this_id = $(this).attr('data');
  $('.industry_img>li').hide();
  var industry_img_width = $('.industry_img>li').length;
  for (var i = 0; i < $('.industry_img>li').length; i++) {
    if (this_id == $('.industry_img>li').eq(i).attr('data')) {
      $('.industry_img>li').eq(i).show();
      // industry_img_width ++;
    }
  };
  /**********刘亚 -- 对显示元素进行筛选 **********/
  $('.industry_img').find('li').each(function (index, el) {
    if ($(el).css('display') == 'none') {
      industry_img_width--;
    }
  })
  $('.industry_img').css('width', 2.1 * industry_img_width + 'rem');
  // 每当行业头图分类选择完成后，就重新计算一下dom初始化Bscrll对象
  scroll_pic.refresh();
  scroll_pic_class.refresh();
});
$('.industry_colse').click(function () {
  $('body').css({
    'overflow-x': 'hidden',
    'overflow-y': 'auto'
  });
  var _this_data = $(this).attr('data').split(',h');
  // $('.banner').children('img').not('#active_kj_banner').remove();
  for (var i = 0; i < _this_data.length; i++) {

    if (i == 0) {
      $('#active_kj_banner').prop('src', _this_data[0]);
      $('#active_kj_banner').css('position', 'relative');
    } else {
      $('#active_kj_banner').prop('src', _this_data[0]);
      $('#active_kj_banner').css('position', 'absolute');
      if (_this_data[i].indexOf('http') != -1) {
        $('#active_kj_banner').after('<img src="' + _this_data[i] + '" />');

      } else {
        $('#active_kj_banner').after('<img src="' + 'h' + _this_data[i] + '" />');

      }
    };
  };
  $('.industry_img_list').animate({
    bottom: '-5rem'
  }, 200);
  $('.bargain_btn').show();
  $('.industry_img>li').removeClass('industry_img_active').hide();
  $('.iundustry_text_list>li').removeClass('iundustry_text_list_active');
  var img_id = '';
  var img_no_id = 0;
  var img_yes_id = 0;
  for (var i = 0; i < $('.industry_img>li').length; i++) {
    if ($(this).attr('data').indexOf($('.industry_img>li').eq(i).children('img').prop('src')) != -1) {
      $('.industry_img>li').eq(i).addClass('industry_img_active');
      img_id = $('.industry_img>li').eq(i).attr('data');
    }
  };
  for (var i = 0; i < $('.industry_img>li').length; i++) {
    if ($('.industry_img>li').eq(i).attr('data') == img_id) {
      $('.industry_img>li').eq(i).show();
      img_yes_id++;
    } else {
      var firstSelectImgId = $('.iundustry_text_list>li').eq(0).attr('data');
      if ($('.industry_img>li').eq(i).attr('data') == firstSelectImgId && img_yes_id == 0) {
        $('.industry_img>li').eq(i).show();
        img_no_id++;
      }
    }
  }
  if (img_no_id != 0) {
    $('.industry_img').css('width', 2.1 * img_no_id + 'rem');
  } else {
    $('.industry_img').css('width', 2.1 * img_yes_id + 'rem');
  }
  for (var i = 0; i < $('.iundustry_text_list>li').length; i++) {
    if (img_id != '') {
      if (img_id == $('.iundustry_text_list>li').eq(i).attr('data')) {
        $('.iundustry_text_list>li').eq(i).addClass('iundustry_text_list_active');
      }
    } else {
      $('.iundustry_text_list>li').eq(0).addClass('iundustry_text_list_active');
    }
  };
});

$('.industry_clk').click(function () {
  var _img_src = [];
  for (var i = 0; i < $('.banner').children('img').length; i++) {
    _img_src.push($('.banner').children('img').eq(i).attr('src'));
  };
  $('.industry_colse').attr('data', _img_src);
  $('.industry_img_list').animate({
    bottom: '-5rem'
  }, 200);
  $('.banner_mb_tab_clk').attr('data', _img_src);
  $('.bargain_btn').show();
  $('body').css({
    'overflow-x': 'hidden',
    'overflow-y': 'auto'
  });
  headImgType = 3;
});



//回到顶部
function Topsrcoll() {
  $('body').scrollTo({
    toT: 0
  });
  $('body').css({
    'overflow-x': 'hidden',
    'overflow-y': 'auto'
  });
};
//回到底部
function Bottomsrcoll() {
  var h = $(document).height() - $(window).height();
  $(document).scrollTop(h);

};

//获取ulr参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

//腾讯视频链接解析
function getTxUrl(url) {
  var _new_url = '';
  if (url.indexOf('vid=') != -1) {
    _new_url = url.substr(url.lastIndexOf('vid=') + 4, 11);
  } else {
    _new_url = url.substr(url.lastIndexOf('.') - 11, 11);
  };
  return _new_url;
}


//返回顶部
function To_Top() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) { //当window的scrolltop距离大于1时，go to top按钮淡出，反之淡入

      $(".srcoll_top").animate({
        'opacity': '1'
      }, 50);
    } else {

      $(".srcoll_top").animate({
        'opacity': '0'
      }, 50);
    }
  });
  $('.srcoll_top').click(function () {
    $(".srcoll_top").animate({
      'opacity': '0'
    }, 500);
    $("html,body").scrollTo({
      toT: 0
    });
    return false;
  });
}
$.fn.scrollTo = function (options) {
  var defaults = {
    toT: 0, //滚动目标位置
    durTime: 500, //过渡动画时间
    delay: 30, //定时器时间
    callback: null //回调函数
  };
  var opts = $.extend(defaults, options),
    timer = null,
    _this = this,
    curTop = _this.scrollTop(), //滚动条当前的位置
    subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
    index = 0,
    dur = Math.round(opts.durTime / opts.delay),
    smoothScroll = function (t) {
      index++;
      var per = Math.round(subTop / dur);
      if (index >= dur) {
        _this.scrollTop(t);
        window.clearInterval(timer);
        if (opts.callback && typeof opts.callback == 'function') {
          opts.callback();
        }
        return;
      } else {
        _this.scrollTop(curTop + index * per);
      }
    };
  timer = window.setInterval(function () {
    smoothScroll(opts.toT);
  }, opts.delay);
  return _this;
};

//获取二维码
function getQrCodes(activityId) {
  if ($('.layer_ewm>img').attr('src') != '') {
    return false;
  };
  if (app.isApp()) {
    var resReferId = (getUrlParam('referId') != null && getUrlParam('referId') != 'null') ? getUrlParam('referId') : 0;
  } else {
    var resReferId = (getUrlParam('referId') != null && getUrlParam('referId') != 'null') ? getUrlParam('referId') : 0;
  }
  data_prams = {
    "activityId": activityId,
    "referId": resReferId,
    "level":_level?_level:1,
    "referBrowseId":_referBrowseId?_referBrowseId:0
  };
  $.ajax({
    type: "post",
    url: ajaxurl + '/wx/buyer/getQrCodePic.htm',
    data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
    success: function (data) {
      var datas = JSON.parse(data);
      $('.layer_ewm>img').prop('src', '');
      $('.layer_ewm_load').hide();
      $('.layer_ewm>img').prop('src', datas.result.data).show();
      // xcx
      if (is_mini) {
        $('.layer_ewm>img').hide();
        var arr = []
        arr.push(datas.result.data)
        wx.previewImage({
            current: datas.result.data, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
          })
      }
    },
    error: function () {
      AjaxErrorTips();
    }
  });
}


//切换主题触发换色(编辑)
function TiggerThem(data) {
  if (!data) {
    return;
  }
  if (data.themeData.titleFontSize == '20px') {
    data.themeData.titleFontSize = '.4rem';
  };
  if (data.themeData.smallTitleFontSize == '16px') {
    data.themeData.smallTitleFontSize = '.32rem';
  };
  if (data.themeData.backimg == undefined) {
    $('body').css('background', '');
    $('body').css('background-color', data.backColor);
  } else {
    $('body').css('background-color', '');
    $('body').css({
      'background-image': 'url(' + data.themeData.backimg + ')',
      'background-size': '100% auto',
      'background-repeat': 'repeat'
    });
  };
  if (data.themeData.inputBoxColor != undefined) {
    $('.title_text').css('border', '1px dashed ' + data.themeData.inputBoxColor + '');
    $('.time_style').css('border', '1px dashed ' + data.themeData.inputBoxColor + '');
    $('.ms_xs_input').css('border', '1px dashed ' + data.themeData.inputBoxColor + '');
    $('.ms_xs_input').css('border', '1px dashed ' + data.themeData.inputBoxColor + '');
  };
  if ($('#active_kj_banner').length != 0) {
    var _img_src = data.headImgUrl.split(',');
    $('.banner').children('img').not('#active_kj_banner').remove();
    for (var i = 0; i < _img_src.length; i++) {
      if (i == 0) {
        $('#active_kj_banner').prop('src', _img_src[i]);
        $('#active_kj_banner').css('position', 'relative');
      } else {
        $('#active_kj_banner').after('<img src="' + _img_src[i] + '" />');
        $('#active_kj_banner').css('position', 'absolute');
      };
    };
  }
  $('.kj_color').css('color', data.themeData.titleColor);
  $('.time_style').css('color', data.themeData.timeTitleColor);
  $('.ms_xs_input').css('color', data.themeData.timeTitleColor);
  $('.title_text').css('font-size', data.themeData.titleFontSize);
  $('.title_text').css('color', data.themeData.titleColor);
  $('.content_label').css({
    'color': data.themeData.smallTitleColor,
    'font-size': data.themeData.smallTitleFontSize,
  });
  if (!data.themeData.border.boxShadow) {
    if (data.themeData.border.shadow_width != '0') {
      $('.lab_content,.bargain_content,.bargain_introduce,.pt_content,#main_content').css({
        '-webkit-box-shadow': 'inset 0 0 ' + (data.themeData.border.shadow_width * 1 + 2 * 1) + 'px' + data.themeData.border.shadow_color,
        'box-shadow': 'inset 0 0 ' + (data.themeData.border.shadow_width * 1 + 2 * 1) + 'px' + data.themeData.border.shadow_color,
      });
    } else {
      $('.lab_content,.bargain_content,.bargain_introduce,#main_content').css({
        '-webkit-box-shadow': 'none',
        'box-shadow': 'none',
      });
    }
  }

  if (data.themeData.border.round != '0') {
    $('.lab_content,.bargain_content,.bargain_introduce,#main_content').css({
      'border-radius': data.themeData.border.round,
    });
  } else {
    $('.lab_content,.bargain_content,.bargain_introduce,#main_content').css({
      'border-radius': '0px',
    });
  }
  if (data.themeData.border.border_size != '0') {
    var borderstyle = "solid";
    if (data.themeData.border.borderStyle) {
      borderstyle = data.themeData.border.borderStyle;
    }
    var border = data.themeData.border.border_size + " " + borderstyle + " " + data.themeData.border.border_color;
    $('.lab_content,.bargain_content,.bargain_introduce,#main_content').css({
      'border': border
    });
  } else {
    $('.lab_content,.bargain_content,.bargain_introduce,#main_content').css({
      'border': 'none',
    });
  }
  $('.lab_content').css({
    'background-color': data.themeData.border.padding_color,
  });
  $('.bargain_content,#main_content').css({
    'background-color': data.themeData.border.padding_color,
  });
  $('.bargain_introduce').css({
    'background-color': data.themeData.border.padding_color,
  });

  $('.content_label_2>input').css({
    'width': '2rem',
    'color': data.themeData.smallTitleColor
  });
  $('.time_content').css('color', data.themeData.timeTitleColor);
  $('.content_label').css({
    'background': 'url(' + data.themeData.smallTitlePic + ') no-repeat'
  });
  $('.content_label_2').css({
    'background': 'url(' + data.themeData.smallTitlePic + ') no-repeat'
  });

  $('#new_img').prop('src', data.themeData.smallTitlePic);
  var imgSrc = $("#new_img").attr("src");
  var w = '';
  var h = '';
  document.getElementById("new_img").onload = function () {
    w = document.getElementById("new_img").naturalWidth;
    h = document.getElementById("new_img").naturalHeight;
    if (location.href.indexOf('gold_zl') != -1) {
      $('.content_label').css({
        'width': '94%',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
      $('.content_label_2').css({
        'width': '94%',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
    } else {
      $('.content_label').css({
        'width': (w / 150) + 'rem',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
      $('.content_label_2').css({
        'width': (w / 150) + 'rem',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
    }



    //活动标题三个位置对齐
    var imgH = h / 150;
    //最下面对齐的情况
    //上边距
    var bottom_martop = (0.5 - imgH) + "rem";
    //下移的位移
    var bottom_top = "0.7rem";

    //中间的情况
    //上边距
    var middle_martop = (0.5 - imgH / 2) + "rem";
    //下移的位移
    var middle_top = "0.5rem";

    //h为高度    margin-top: 0.5rem;
    //活动标题三个位置对齐
    data.themeData.titleVerticalAlign=data.themeData.titleVerticalAlign?data.themeData.titleVerticalAlign:"top";
    if (data.themeData.titleVerticalAlign) {
      switch (data.themeData.titleVerticalAlign) {
        case "top":
          $(".content_label_2,.content_label").css({
            "top": ".3rem",
            "z-index": "1"
          });

          $(".lab_content,.bargain_introduce").each(function (index, el) {
            if ($(el).hasClass('noHasTitle')) {
              console.log(1);
            } else {
              $(el).css("margin-top", ".32rem");
              $(el).css("padding-top", ".12rem");
            }
          });
          //秒杀
          //$(".bargain_content").css("padding-top",".3rem");
          //接龙
          //$("#main_content").css("padding-top",".3rem");

          $("#main_content_title").css("top", ".2rem");
          break;
        case "middle":
          $(".content_label_2,.content_label").css({
            "top": middle_top,
            "z-index": "1"
          });
          // $(".lab_content,.bargain_introduce").css("margin-top", middle_martop);
          // $(".lab_content,.bargain_introduce").css("padding-top", (imgH / 2) + "rem")
          $(".lab_content,.bargain_introduce").each(function (index, el) {
            if ($(el).hasClass('noHasTitle')) {
              console.log(1);
            } else {
              $(el).css("margin-top", middle_martop);
              $(el).css("padding-top", (imgH / 2) + "rem");
            }
          });
          //秒杀
          //$(".bargain_content").css("padding-top",".3rem");
          //接龙
          //$("#main_content").css("padding-top",".3rem");

          $("#main_content_title").css("top", ".2rem");
          break;

        case "bottom":
          $(".content_label_2,.content_label").css({
            "top": bottom_top,
            "z-index": "1"
          });
          // $(".lab_content,.bargain_introduce").css("margin-top", bottom_martop);
          // $(".lab_content,.bargain_introduce").css("padding-top", (imgH + 0.2) + "rem"); break;
          $(".lab_content,.bargain_introduce").each(function (index, el) {
            if ($(el).hasClass('noHasTitle')) {
              console.log(1);
            } else {
              $(el).css("margin-top", bottom_martop);
              $(el).css("padding-top", (imgH + 0.2) + "rem");
            }
          });
          //秒杀
          //$(".bargain_content").css("padding-top",".5rem");
          //接龙
          //$("#main_content").css("padding-top",".5rem");
          $("#main_content_title").css("top", ".2rem");
          break;
        default:
          ;
      }
      $(".dkj_content_add_lis").parent().css({
        "margin-top": ".25rem",
        "padding-top": ".12rem"
      })
    }
  };

  //添加阴影
  if (data.themeData.border.boxShadow) {
    var boxShadow = data.themeData.border.boxShadow.replace("outset", "");
    $(".lab_content,.bargain_introduce").css({
      "box-shadow": boxShadow
    });
  }
  //内容样式
  $(".lab_content,.bargain_introduce,.hz_content_style").css({
    "position": "relative"
  });




  //添加图片
  function imgicon(i) {
    var display = "";
    if (data.themeData.imgIcon[i - 1] == "") {
      display = "style='display:none'";
    }
    var src = '<img src="' + data.themeData.imgIcon[(i - 1)] + '"  class="imgicon' + i + '"' + display + '  />';
    return src;
  }
   //先删除图片  在添加图片
    $(".lab_content>img,.bargain_introduce>img").remove();
  if (data.themeData.imgIcon) {
    //再添加
    $(".lab_content,.bargain_introduce").prepend(imgicon(1) + imgicon(2) + imgicon(3) + imgicon(4));
    $(".lab_content>img,.bargain_introduce>img").css({
      "position": "absolute",
      "width": "auto",
      "margin": "0",
    });
    $(".lab_content>img.imgicon1,.bargain_introduce>img.imgicon1").css({
      "top": "0",
      "left": "0"
    });
    $(".lab_content>img.imgicon2,.bargain_introduce>img.imgicon2").css({
      "top": "0",
      "right": "0"
    });
    $(".lab_content>img.imgicon3,.bargain_introduce>img.imgicon3").css({
      "bottom": "0",
      "right": "0"
    });
    $(".lab_content>img.imgicon4,.bargain_introduce>img.imgicon4").css({
      "bottom": "0",
      "left": "0"
    });
    //底层
    $(".lab_content,.bargain_introduce").css("z-index", "0");
    //图片层
    $(".lab_content>img,.bargain_introduce>img").css("z-index", "1");
    //文字层
    //css中编写z-index:101

    $(".lab_content>img,.bargain_introduce>img").css({
      "transform": "scale(0.5)",
      "transform-origin": "right bottom"
    });
  }



  $('#themeId').val(data.themeId);

}
//切换主题触发换色（预览活动）
function TiggerThems(data, imgtype) {
  //得到预览数据
  var isAppPreviews=app.isApp()
  perviewGetdata(data,isAppPreviews);
  if (data.themeData.titleFontSize == '20px') {
    data.themeData.titleFontSize = '.4rem';
  };
  if (data.themeData.smallTitleFontSize == '16px') {
    data.themeData.smallTitleFontSize = '.32rem';
  }
  if (data.themeData.backimg == undefined) {
    $('body').css('background-color', data.backColor);
  } else {
    $('body').css({
      'background-image': 'url(' + data.themeData.backimg + ')',
      'background-size': '100% auto',
      'background-repeat': 'repeat'
    });
  };
  $('.settime>span').css({
    'background-image': 'url(' + data.themeData.timePic + ')',
    'background-size': '100% 100%',
    '-moz-background-size': '100% 100%',
    '-webkit-background-size': '100% 100%',
    '-o-background-size': '100% 100%',
    'background-repeat': 'no-repeat',
    // 'width': (data.themeData.timePicLong / 100) + 'rem',
    'width': '94%',
    'height': (data.themeData.timePicWide / 100) + 'rem',
    'line-height': (data.themeData.timePicWide / 100) + 'rem',
  });
  $('#kj_title,#kj_title_preview').css('color', data.themeData.titleColor);
  if ($('#kj_banner,#pt_banner').length == 0) {} else {
    if (imgtype == 2) {
      $('#kj_banner,#pt_banner').css('position', 'relative');
      $('.banner').css({
        'width': '100%',
        'height': '100%'
      });
    } else {
      var _img_src = data.headImgUrl.split(',');
      $('#kj_banner,#pt_banner').prop('src', _img_src[0]);
      $('#kj_banner,#pt_banner')[0].onload = function () {
        var _this_w = this.naturalWidth;
        var _this_h = this.naturalHeight;
        if (location.href.indexOf('cj_jgg_cj') != -1) {
          // $('.banner').css({ 'width': _this_w / 100 + 'rem'});
          $('.banner').css({
            'width': '100%'
          });
        } else {
          $('.banner').css({
            'width': _this_w / 100 + 'rem',
            'height': _this_h / 100 + 'rem'
          });
        }
      };
      for (var i = 0; i < _img_src.length; i++) {
        if (i > 0) {
          $('#kj_banner,#pt_banner').after('<img src="' + _img_src[i] + '" />');
        };
      };
    }
  }
  if (!data.themeData.border.boxShadow) {
    if (data.themeData.border.shadow_width != '0') {
      $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
        '-webkit-box-shadow': 'inset 0 0 ' + (data.themeData.border.shadow_width * 1 + 2 * 1) + 'px' + data.themeData.border.shadow_color,
        'box-shadow': 'inset 0 0 ' + (data.themeData.border.shadow_width * 1 + 2 * 1) + 'px' + data.themeData.border.shadow_color,
      });
    } else {
      $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
        '-webkit-box-shadow': 'none',
        'box-shadow': 'none',
      });
    }
  }
  if (data.themeData.border.round != '0') {
    $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
      'border-radius': data.themeData.border.round,
    });
  } else {
    $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
      'border-radius': '0px',
    });
  }
  if (data.themeData.border.border_size != '0') {
    var borderstyle = "solid";
    if (data.themeData.border.borderStyle) {
      borderstyle = data.themeData.border.borderStyle;
    }
    var border = data.themeData.border.border_size + " " + borderstyle + " " + data.themeData.border.border_color;
    if (location.href.indexOf('gold_zl') != -1) {
      $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
        'border': 'none',
      });
    } else {
      $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
        'border': border,
      });
    }
  } else {
    $('.content_kj_preview,.active_preview,.prev_list_kj,#main_content').css({
      'border': 'none',
    });
  };
  $('.content_kj_preview').css({
    'background-color': data.themeData.border.padding_color,
  });
  $('.active_preview,#main_content').css({
    'background-color': data.themeData.border.padding_color,
  });
  $('.prev_list_kj').css({
    'background-color': data.themeData.border.padding_color,
  });
  $('.active_preview_label,.active_preview_labels').css('color', data.themeData.smallTitleColor);
  if (location.href.indexOf('xx_zl') != -1) {
    $('.settime>span').css('color', '#313131');
  } else {
    $('.settime>span').css('color', data.themeData.timeTitleColor);
  };


  $('.active_preview_label').css('background', 'url(' + data.themeData.smallTitlePic + ') no-repeat');
  $('.active_preview_labels').css('background', 'url(' + data.themeData.smallTitlePic + ') no-repeat');
  $('#new_img').prop('src', data.themeData.smallTitlePic);
  var imgSrc = $("#new_img").attr("src");
  var w = '';
  var h = '';
  document.getElementById("new_img").onload = function () {
    w = document.getElementById("new_img").naturalWidth;
    h = document.getElementById("new_img").naturalHeight;
    if (location.href.indexOf('gold_zl') != -1) {
      $('.active_preview_label').css({
        'width': '94%',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
      $('.active_preview_labels').css({
        'width': '94%',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
    } else {
      $('.active_preview_label').css({
        'width': (w / 150) + 'rem',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
      $('.active_preview_labels').css({
        'width': (w / 150) + 'rem',
        'height': (h / 150) + 'rem',
        'line-height': (h / 150) + 'rem'
      });
    }



    //活动标题三个位置对齐
    var imgH = h / 150;
    //最下面对齐的情况
    //上边距
    var bottom_martop = (0.5 - imgH) + "rem";
    //下移的位移
    var bottom_top = "0.7rem";

    //中间的情况
    //上边距
    var middle_martop = (0.5 - imgH / 2) + "rem";
    //下移的位移
    var middle_top = "0.5rem";

    //h为高度    margin-top: 0.5rem;
    //活动标题三个位置对齐
    if (data.themeData.titleVerticalAlign) {
      switch (data.themeData.titleVerticalAlign) {
        case "top":
          break;
        case "middle":
          $(".active_preview_label,.active_preview_labels").css({
            "top": middle_top,
            "z-index": "1"
          });
          $(".active_preview,.content_kj_preview,.prev_list_kj").css("margin-top", middle_martop);
          $(".active_preview,.content_kj_preview,.prev_list_kj").css("padding-top", (imgH / 2) + "rem");
          break;
        case "bottom":
          $(".active_preview_label,.active_preview_labels").css({
            "top": bottom_top,
            "z-index": "1"
          });
          $(".active_preview,.content_kj_preview,.prev_list_kj").css("margin-top", bottom_martop);
          $(".active_preview,.content_kj_preview,.prev_list_kj").css("padding-top", (imgH + 0.2) + "rem");
          break;
        default:
          ;
      }
      $(".type_team").parent().css({
        "margin-top": ".5rem",
        "padding-top": "0"
      })

    }


    if (data.themeData.signUpColor || data.themeData.signUpPic) {
      var colorvalue = data.themeData.signUpPic ? "url(" + data.themeData.signUpPic + ")" : "linear-gradient(to top," + data.themeData.signUpColor + "," + data.themeData.signUpColor + ")";
      //我要报名按钮的样式  多商品的
      $(".dsp_pre_two>div").css("background-image", colorvalue);
      //其它我要报名样式
      $(".my_to_do_btn1").css("background-image", colorvalue); //预览
      //其他按钮样式
        $("#eight_btn1").css("background-image",colorvalue);
        $("#eight_btn2").css("background-image",colorvalue);
      //其它我要报名样式
      $(".my_to_do_btn").css("background-image", colorvalue);
      $('#layer_share, #layer_add').css('background-image', colorvalue);

      //修改css
      var style="<style> .dsp_pre_two>div{background-image:"+colorvalue+"}   </style>";
      $("body").prepend(style);
      //统一添加按钮背景样式
      $('.dsp_pre_two>div,.my_to_do_btn1,.my_to_do_btn,#layer_share, #layer_add').css({"background-size": "contain","background-position": "center","background-repeat": "no-repeat"});
    }
  }

  // if(data.themeData.priceBackgroundColor){
  //原价底价背景设
  //	$(".kj_mian_seven_bj").css("background-color",data.themeData.priceBackgroundColor);
  //}


  //添加阴影
  if (data.themeData.border.boxShadow) {
    var boxShadow = data.themeData.border.boxShadow.replace("outset", "");
    $(".active_preview,.content_kj_preview,.prev_list_kj").css({
      "box-shadow": boxShadow
    });
  }
  //内容样式
  $(".active_preview,.content_kj_preview,.prev_list_kj").css({
    "position": "relative"
  });
  //添加图片
  function imgicon(i) {
    var display = "";
    if (data.themeData.imgIcon[i - 1] == "") {
      display = "style='display:none'";
    }
    var src = '<img src="' + data.themeData.imgIcon[(i - 1)] + '"  class="imgicon' + i + '"' + display + '   />';
    return src;
  }
  if (data.themeData.imgIcon) {
    if (location.href.indexOf('jl_preview') != -1 && app.isApp()) {
      return
    }
    $(".active_preview,.content_kj_preview,.prev_list_kj").prepend(imgicon(1) + imgicon(2) + imgicon(3) + imgicon(4));
    $(".active_preview>img,.content_kj_preview>img,.prev_list_kj>img").css({
      "position": "absolute",
      "width": "auto",
      "margin": "0"
    });
    $(".active_preview>img.imgicon1,.content_kj_preview>img.imgicon1,.prev_list_kj>img.imgicon1").css({
      "top": "0",
      "left": "0"
    });
    $(".active_preview>img.imgicon2,.content_kj_preview>img.imgicon2,.prev_list_kj>img.imgicon2").css({
      "top": "0",
      "right": "0"
    });
    $(".active_preview>img.imgicon3,.content_kj_preview>img.imgicon3,.prev_list_kj>img.imgicon3").css({
      "bottom": "0",
      "right": "0"
    });
    $(".active_preview>img.imgicon4,.content_kj_preview>img.imgicon4,.prev_list_kj>img.imgicon4").css({
      "bottom": "0",
      "left": "0"
    });

    //底层
    $(".active_preview,.content_kj_preview,.prev_list_kj").css("z-index", "0");
    //图片层
    $(".active_preview>img,.content_kj_preview>img,.prev_list_kj>img").css("z-index", "1");
    //文字层
    //css中编写z-index:101
    //让图片缩小50%；
    $(".active_preview>img,.content_kj_preview>img,.prev_list_kj>img").css({
      "transform": "scale(0.5)",
      "transform-origin": "right bottom"
    });
  }

  //修改进度条样式
  if (data.themeData.speedProgress) {
    $(".ly-rate_top>img").attr("src", data.themeData.speedProgress);
  }
  if (data.themeData.speedProgressBack) {
    $(".ly-rate_bottom>img").attr("src", data.themeData.speedProgressBack);
  }


}
//获取注册手机号码
function getTelNum(text, num) {
  data_prams = {

  };
  $.ajax({
    type: "post",
    async: false,
    url: globalUrl + '/seller/account.htm',
    data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
    success: function (data) {
      var datas = JSON.parse(data);
      var res = datas.result.data;
      if (res.mobile == undefined || res.mobile == 'undefined') {
        var text_val = text.text().replace('13261273497', '');
        text.text(text_val);
        num.val('');
      } else {
        var text_val = text.text().replace('13261273497', res.mobile);
        text.text(text_val);
        num.val(res.mobile);
      }

    },
    error: function () {
      AjaxErrorTips();
    }
  });
}
//文本框自动拉伸高度
function makeExpandingArea(el) {
  var setStyle = function (el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
  var delayedResize = function (el) {
    window.setTimeout(function () {
      setStyle(el)
    }, 0);
  }

  try {
    if (el.addEventListener) {
      el.addEventListener('input', function () {
        setStyle(el)
      }, false);
      setStyle(el)
    } else if (el.attachEvent) {
      el.attachEvent('onpropertychange', function () {
        setStyle(el)
      });
      setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
      el.attachEvent("onkeydown", function () {
        var key = window.event.keyCode;
        if (key == 8 || key == 46) delayedResize(el);

      });
      el.attachEvent("oncut", function () {
        delayedResize(el);
      }); //处理粘贴
    }

  } catch (e) {

  }




}
//文本框自动拉伸高度
function makeExpandingAreas(el) {
  var setStyles = function (el) {
    if ($('#' + el + '').val() == '') {

    } else {
      $('#' + el + '')[0].style.height = 'auto';
      $('#' + el + '')[0].style.height = $('#' + el + '')[0].scrollHeight + 'px';
      if (!$('#' + el + '').hasClass('d_text')) {
        $('#' + el + '')[0].parentNode.style.height = $('#' + el + '')[0].scrollHeight + 20 + 'px';
      }

    }

  }
  var delayedResizes = function (el) {
    window.setTimeout(function () {
      setStyles($('#' + el + ''))
    }, 0);
  }



  try {
    if ($('#' + el + '')[0].addEventListener) {
      $('#' + el + '')[0].addEventListener('input', function () {
        setStyles(el)
      }, false);
      setStyles(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
      $('#' + el + '').attachEvent("onkeydown", function () {
        var key = window.event.keyCode;
        if (key == 8 || key == 46) delayedResizes(el);

      });
      $('#' + el + '').attachEvent("oncut", function () {
        delayedResizes($('#' + el + ''));
      }); //处理粘贴
    }

  } catch (e) {


  }





}
//判断是否安卓，对安卓键盘弹出保存按钮兼容稳难题
function MonitorAndroidKeyboard() {
  var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  $(window).on('resize', function () {

    var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (clientHeight > nowClientHeight) {
      $('.bargain_btn').hide();
      //				if ($(document).find($('.page_id1')).length != 0) {
      //					$('.cd_input_ru').animate({ 'bottom': '0rem' }, 300);
      //					$('.cd_bottom').hide();
      //					$('.cd_input_ru_text').focus();
      //				};
      $('.layer_tp_bm').css('top', '-2rem');
    } else {
      $('.bargain_btn').show();
      //				if ($(document).find($('.page_id1')).length != 0) {
      //					$('.cd_input_ru').animate({ 'bottom': '-3rem' }, 300);
      //					$('.cd_bottom').show();
      //					$(".cd_input_ru_text").off('input propertychange', function () {
      //						$('body').css('overflow-y', 'auto');
      //					});
      //				};
      $('.layer_tp_bm').css('top', '.5rem');
    }
  });
}

function MonitorAndroidKeyboards() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //		$('#main').on('focus', '.cd_input', function () {
    //			cd_input_id_andord = $(this).attr('id');
    //			setTimeout(function () {
    //				$('.cd_input_ru').animate({ 'bottom': '0rem' }, 300);
    //				$('.cd_bottom').hide();
    //				$('.cd_input_ru_text').focus();
    //			}, 300);
    //			$("#main").on("touchmove", function (event) {
    //
    //				event.preventDefault;
    //			}, false)
    //		});
    $('.cd_input_ru_text').blur(function () {
      setTimeout(function () {
        $('.cd_input_ru').animate({
          'bottom': '-3rem'
        }, 300);
        $('.cd_bottom').show();
      }, 300);
      $("#main").off("touchmove");
    })
  }
}
$(".cd_input_ru_text").on('input propertychange', function () {
  $('#' + cd_input_id_andord + '').text($('.cd_input_ru_text').val());
  $('#' + cd_input_id_andord + '').val($('.cd_input_ru_text').val());
  $('body').css('overflow-y', 'auto');
});
//关闭微信按钮（编辑页，预览页，详情页）
function ColseWxBotton() {
  var time, uuid, sign, content, success = false;
  var locations = encodeURIComponent(location);
  $.ajax({
    type: "POST",
    async: false, // 这里必须不能是异步
    url: globalUrl + '/getWxJsSign.htm',
    data: 'params={"data":{"currUrl":"' + locations + '"}}' + isDebug,
    success: function (res) {
      res = JSON.parse(res);
      if (res.status == '200') {
        success = true;
        time = res.result.data.wxJsSignDto.timestamp;
        uuid = res.result.data.wxJsSignDto.nonceStr;
        sign = res.result.data.wxJsSignDto.sign;
      } else {

      }
    },
    error: function (res) {

    }
  });
  if (success) {
    // 通过config接口注入权限验证配置
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端console.log出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: wx_appid, // 必填，公众号的唯一标识
      timestamp: time, // 必填，生成签名的时间戳
      nonceStr: uuid, // 必填，生成签名的随机串
      signature: sign, // 必填，签名，见附录1
      jsApiList: ['hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    // 通过ready接口处理成功验证
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: ['menuItem:share:email', 'menuItem:openWithSafari', 'menuItem:openWithQQBrowser', 'menuItem:readMode', 'menuItem:originPage', 'menuItem:delete', 'menuItem:editTag', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:editTag', 'menuItem:delete', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });
      Loading('end');
    });
    // 通过error接口处理失败验证
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
    // 判断当前客户端版本是否支持指定JS接口
    wx.checkJsApi({
      jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {

      }
    });
  }
};
//获取地理位置 调用微信地图
function getWxMap(map, tel) {
  map = JSON.parse(map)
  var maker = map.maker.split(',');
  var add = unescape(map.address) + unescape(map.add)
  var time, uuid, sign, content, success = false;
  var locations = encodeURIComponent(location);
  $.ajax({
    type: "POST",
    async: false, // 这里必须不能是异步
    url: globalUrl + '/getWxJsSign.htm',
    data: 'params={"data":{"currUrl":"' + locations + '"}}' + isDebug,
    success: function (res) {
      res = JSON.parse(res);
      if (res.status == '200') {
        success = true;
        time = res.result.data.wxJsSignDto.timestamp;
        uuid = res.result.data.wxJsSignDto.nonceStr;
        sign = res.result.data.wxJsSignDto.sign;
      }
    },
    error: function (res) {

    }
  });
  if (success) {
    // 通过config接口注入权限验证配置
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端console.log出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: wx_appid, // 必填，公众号的唯一标识
      timestamp: time, // 必填，生成签名的时间戳
      nonceStr: uuid, // 必填，生成签名的随机串
      signature: sign, // 必填，签名，见附录1
      jsApiList: ['openLocation', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    // 通过ready接口处理成功验证
    wx.ready(function () {
      wx.openLocation({
        latitude: Number(maker[0]), // 纬度，浮点数，范围为90 ~ -90
        longitude: Number(maker[1]), // 经度，浮点数，范围为180 ~ -180。
        name: '商家姓名:' + unescape(map.title) + ' 电话:' + tel, // 位置名
        address: add, // 地址详情说明
        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: 'tel://' +  tel,// 在查看位置界面底部显示的超链接,可点击跳转
      });
    });
    // 通过error接口处理失败验证
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
    // 判断当前客户端版本是否支持指定JS接口
    wx.checkJsApi({
      jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {

      }
    });
  }
};
var t1 = ''; //定时器
function PaymentSuccessfulTime(activityid, type) {
  var data_prams = {
    "activityId": activityid
  };
  $.ajax({
    type: "post",
    url: ajaxurl + '/wx/buyer/getWxPayState.htm',
    data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
    success: function (data) {
      var datas = JSON.parse(data);
      var res = datas.result.data;
      if (res == 1) {
        window.clearInterval(t1);
        if (type == 'hypt') {
          // var refer = getUrlParam('referId');
          var refer = getUrlParam('activityEnrollId');
          var str = 'activityEnrollId=' + refer;
          location.href = location.href.replace(str, 'activityEnrollId=0')
        } else {
          location = location;
        }
        Loading('end');
      } else if (res == 2) {
        window.clearInterval(t1);
        Loading('end');
        AjaxNullTips('支付失败');
      } else if (res == 4) {
        clearInterval(t1);
        Loading('end');
        AjaxNullTips('库存不足已退款');
        setTimeout(function () {
          location = location;
        }, 2000)

      };
    },
    error: function (res) {
      window.clearInterval(t1);
    }
  });
}
//判断是否支付成功
function PaymentSuccessful(activityid, type) {
  Loading('start');
  t1 = window.setInterval(PaymentSuccessfulTime(activityid, type), 1000);

}
//判断投票送礼支付是否成功
var t5 = ''; //定时器
function PaymentSuccessfulTime_tp(pay_id) {
  var data_prams = {
    "payId": pay_id,
  };
  $.ajax({
    type: "post",
    url: globalUrl + '/buyer/getTpWxPayState.htm',
    data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
    success: function (data) {
      Loading('end');
      var datas = JSON.parse(data);
      var res = datas.result.data;
      if (res == 1) {
        var num = Number($(gift_this).children('p').children('em').text());
        var nums = Number($(gift_this).next().children('p').children('em').text());
        window.clearInterval(t5);
        var gift_id = $('#tp_pay').attr('data');
        $(gift_this).children('p').children('em').text(num + parseInt($('.gift_list').find('.gift_list_active').children('em').text()) * $('.gift_number>input').val());
        $(gift_this).next().children('p').children('em').text(nums + parseInt($('.gift_list').find('.gift_list_active').children('em').text()) * $('.gift_number>input').val() * one_voe);
        var gif_num = $('#gif_numm').val();
        if (gift_id == 1) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '颗幸运星');
          $('.tx_content>img').attr('src', '../images/tp_img/1-f0d2f8f432.png');
        } else if (gift_id == 2) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '朵鲜花');
          $('.tx_content>img').attr('src', '../images/tp_img/2-d4dee851aa.png');
        } else if (gift_id == 3) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '个奖杯');
          $('.tx_content>img').attr('src', '../images/tp_img/3-fc6b7ef8bb.png');
        } else if (gift_id == 4) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '辆敞篷跑车');
          $('.tx_content>img').attr('src', '../images/tp_img/4-004df6a9a1.png');
        } else if (gift_id == 5) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '个礼花');
          $('.tx_content>img').attr('src', '../images/tp_img/5-3506f2e243.png');
        } else if (gift_id == 6) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '顶皇冠');
          $('.tx_content>img').attr('src', '../images/tp_img/6-4be5f50967.png');
        } else if (gift_id == 7) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '艘豪华游艇');
          $('.tx_content>img').attr('src', '../images/tp_img/7-9d322ba1fc.png');
        } else if (gift_id == 8) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '个热气球');
          $('.tx_content>img').attr('src', '../images/tp_img/8-e4964b86c3.png');
        } else if (gift_id == 9) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '架私人飞机');
          $('.tx_content>img').attr('src', '../images/tp_img/9-af2c95c03e.png');
        } else if (gift_id == 10) {
          $('.tx_content>p').text('你给' + $(gift_this).parent().prev().text() + '送了' + gif_num + '幢别墅');
          $('.tx_content>img').attr('src', '../images/tp_img/10-2dfaecfda5.png');
        };
        $('#containers').show();
        $('.tx_content>img').removeClass('tp_tx_active');
        $('.tx_content>img').addClass('tp_tx_active');
        $('.tx_tc>span').show();
        $('#tx_tc').show();
        Loading('end');
      } else if (res == 2) {
        window.clearInterval(t5);
        Loading('end');
        AjaxNullTips('支付失败');
      }
      if (activityEnrollIds == null || activityEnrollIds == 'null') {
        getWxShareContents_new(times, uuids, signs, ress, 'tps', 'null', '', pay_id,_forwardId);
      } else {
        getWxShareContents_new(times, uuids, signs, ress, 'tps', activityEnrollIds, '', pay_id,_forwardId);
      }
    },
    error: function (res) {
      Loading('end');
      window.clearInterval(t5);
    }
  });
}
//判断是否支付成功
function PaymentSuccessful_tp(activityid, pay_id) {
  Loading('start');
  t5 = window.setInterval("PaymentSuccessfulTime_tp(" + activityid + "," + pay_id + ")", 1000);
}
var t4 = ''; //定时器
function PaymentFriendsSuccessfulTimems(activityid) {
  var data_prams = {
    "activityId": activityid
  };
  $.ajax({
    type: "post",
    url: globalUrl + '/buyer/getMsWxPayState.htm',
    data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
    success: function (data) {
      var datas = JSON.parse(data);
      var res = datas.result.data;
      if (res == 1) {
        Loading('end');
        window.clearInterval(t4);
        $('body').css('overflow-y', 'hidden');
        $('#userDarwPrize').show().removeClass('bounceOutTop').addClass('animated bounceInTop');
      } else if (res == 2) {
        window.clearInterval(t4);
        AjaxNullTips('支付失败');
        Loading('end');
      } else if (res == 4) {
        window.clearInterval(t4);
        Loading('end');
        $('body').css('overflow-y', 'hidden');
        $('.com_mask').show();
        $('.pop_title').text('哎呀，还是晚了一步，商品已经被抢光，您的款项将通过微信退回，请注意查收。');
      };

      setTimeout(function () {
        location = location;
      }, 4000);
    },
    error: function (res) {
      Loading('end');
      window.clearInterval(t4);
    }
  });
}

//判断是否支付成功
function PaymentSuccessfulms(activityid) {
  Loading('start');
  t4 = window.setInterval("PaymentFriendsSuccessfulTimems(" + activityid + ")", 2000);

}
//跳转支付
$(document).on('click', '#btn3_cancel', function () {
  $('.com_mask').hide();
});
$('body').on('click', '#btn3_sure', function () {
  window.location.href = '../pay-97b49c8ce8.html';
});

//付费套餐 弹窗
function monkeyPop(type) {
  var domStr = "";
  domStr += "<div class='com_mask'>";
  domStr += "<div class='popBox com_center'>";
  domStr += "<div class='mokey_warn_box'>";
  if (type == 'isFirst') {
    domStr += "<img src='../wx/images/activity-img/mokey_talk-0098160534.png' class='popImg'>";
    domStr += "<div class='mokey_warn_con fr'>离发布活动仅差一步啦，只需1元即可体验哦！</div>";
  } else if (type == 'isDue') {
    domStr += "<img src='../images/activity-img/monkey-db5b170545.png' class='popImg imgPadding'>";
    domStr += "<div class='mokey_warn_con mokey_oneLine fr'>只恨时光太匆匆，套餐时限转瞬即逝，让我继续为您服务把</div>";
  }
  domStr += "</div>";
  domStr += "<div class='popBtn_box com_mid'>";
  domStr += "<div class='popBtn_item fl btn_type_1' id='btn3_cancel'>先逛逛</div>";
  if (type == 'isFirst') {
    domStr += "<div class='popBtn_item fr btn_type_2' id='btn3_sure'>去体验</div>";
  } else if (type == 'isDue') {
    domStr += "<div class='popBtn_item fr btn_type_2' id='btn3_sure'>去续费</div>";
  }
  domStr += "</div>";
  domStr += "</div>";
  domStr += "</div>";

  $(domStr).appendTo('body');
}

function BannerImgtype(res) {
  if (res.headImgType == 2) {
    var _this_data = res.headImg.split(',');
    if (_this_data[0].indexOf('.gif') != -1) {
      $('#kj_banner').prop('src', _this_data[0] + gifW + Math.ceil(banner_w * 3));
    } else {
      $('#kj_banner').prop('src', _this_data[0] + gifW + Math.ceil(banner_w * 3));
    };
    for (var j = 0; j < _this_data.length; j++) {
      if (j == 0) {

      } else {
        if (_this_data[j].indexOf('.gif') != -1) {
          $('#kj_banner').after('<img src="' + _this_data[j] + gifW + Math.ceil(banner_w * 3) + '" />');
        } else {
          $('#kj_banner').after('<img src="' + _this_data[j] + gifW + Math.ceil(banner_w * 3) + '" />');
        }
      };
    };
  } else if (res.headImgType == 3) {
    var _this_data = res.headImg.split(',');
    if (_this_data[0].indexOf('.gif') != -1) {
      $('#kj_banner').prop('src', _this_data[0] + gifW + Math.ceil(banner_w * 3));
    } else {
      $('#kj_banner').prop('src', _this_data[0] + gifW + Math.ceil(banner_w * 3));
    };
    for (var j = 0; j < _this_data.length; j++) {
      if (j == 0) {

      } else {
        if (_this_data[j].indexOf('.gif') != -1) {
          $('#kj_banner').after('<img src="' + _this_data[j] + gifW + Math.ceil(banner_w * 3) + '" />');
        } else {
          $('#kj_banner').after('<img src="' + _this_data[j] + gifW + Math.ceil(banner_w * 3) + '" />');
        }
      };
    };
  } else if (res.headImgType == 1) {
    var _this_data = res.headImg.split(',');
    if (_this_data[0].indexOf('.gif') != -1) {
      $('#kj_banner').prop('src', _this_data[0] + gifW + Math.ceil(banner_w * 3));
    } else {
      $('#kj_banner').prop('src', _this_data[0] + gifW + Math.ceil(banner_w * 3));
    };
    for (var j = 0; j < _this_data.length; j++) {
      if (j == 0) {

      } else {
        if (_this_data[j].indexOf('.gif') != -1) {
          $('#kj_banner').after('<img src="' + _this_data[j] + gifW + Math.ceil(banner_w * 3) + '" />');
        } else {
          $('#kj_banner').after('<img src="' + _this_data[j] + gifW + Math.ceil(banner_w * 3) + '" />');
        }
      };
    };
  }
}
//判断是否为金额
function isMoney(s) {
  var regu = /^[0-9]*(?:.[0-9]{1,2})?$/;
  var re = new RegExp(regu);
  if (re.test(s)) {
    return true;
  } else {
    return false;
  }
}
//判断商品数量是否为整数
function isInteger(obj) {
  return obj % 1 === 0
}
//监听页面是否滚动（若滚动，则隐藏按钮）
$(function () {
  winsrcoll();
});
var t2 = ''; //定时器
var win_top = '';

function wscroll() {
  if (win_top == $(window).scrollTop()) {
    $('.foot_to_c_pt_li').animate({
      "opacity": "1"
    }, 300);
  } else {
    $('.foot_to_c_pt_li').animate({
      "opacity": "0"
    }, 200);
  }
  win_top = $(window).scrollTop();
}

function winsrcoll() {
  var t2 = window.setInterval("wscroll()", 400);
}
/*
 * cms配置活动编辑页的催促购买的提示
 **/
function setPayWarnForEditPage() {
  $.ajax({
    url: globalUrl + '/seller/getOrederMealPushInfo.htm',
    type: 'POST',
    data: 'params={"reqNum":"201504061049338501234567","data":{"pageId":"' + cmsEditPagePayWarnId + '"}}' + isDebug,
    success: function (result) {
      var result = JSON.parse(result);
      if (result.status == 200 && result.result.data && !app.isStEnv()) {
        var domStr = '';
        domStr += '<div class="editPageCmsPayWarn">';
        domStr += '<a href = "../pay-97b49c8ce8.html">';
        domStr += '<p id="CmsPayWarnCon">' + result.result.data[0].content[0].title + '</p>';
        domStr += '<img src="../images/merImg2-423922a392.png" alt="">去购买</a></div >';
        $(domStr).appendTo('.bargain_btn');
      }
    }
  })
}
// 验证报名信息
function input_val() {
  for (var i = 0; i < $('.layer_information').children('input').length; i++) {
    if ($('.layer_information').children('input').eq(i).attr('data') == 1 || $('.layer_information').children('input').eq(i).attr('data') == 2) {
      if ($('.layer_information').children('input').eq(i).val() != '') {
        if ($('#inform_tel').val().length == 11) {
          var re = /^1[34578]\d{9}$/;
          if (re.test($('#inform_tel').val())) {} else {
            input_val_type = false;
          }
        } else {
          input_val_type = false;
        };
      } else {
        input_val_type = false;
      }
    }
  }
  if (input_val_type == true) {
    $('#information_clk').addClass('layer_information_div');
  } else {
    $('#information_clk').removeClass('layer_information_div');
  }
  input_val_type = true;
};
//zepto扩展prevAll 与nextAll 方法
$.fn.nextAll = function (selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) return $([]);
  while (el.nextElementSibling) {
    var next = el.nextElementSibling;
    if (selector) {
      if ($(next).is(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return $(nextEls);
};

function GetQueryStringByMap(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
// 联系商家
var addrOfUrl, latngOfUrl, nameOfUrl;
addrOfUrl = GetQueryStringByMap('addr') == null ? '' : GetQueryStringByMap('addr'); // 获取地址
latngOfUrl = GetQueryStringByMap('latng') == null ? '' : GetQueryStringByMap('latng'); //经纬度
nameOfUrl = GetQueryStringByMap('name') == null ? '' : GetQueryStringByMap('name'); //地址名称

function addMapPop(mapData, phone) {
  var mapData = JSON.parse(mapData);
  var domStr = '';
  // 此处对参数进行非空的检查和重置
  var realAddr = unescape(mapData.address) + unescape(mapData.add);
  if (!!mapData.maker && unescape(mapData.maker) != undefined && !!mapData.address && unescape(mapData.address) != undefined && !!mapData.title && unescape(mapData.title) != undefined) {
    domStr += "<div class='tencentMap'>";
  } else {
    domStr += "<div class='tencentMap' style='top:3.4rem'>";
  }
  if (!!mapData.maker && unescape(mapData.maker) != undefined) {
    domStr += "<div class='tencentMapCon'>";
  } else {
    domStr += "<div class='tencentMapCon' style='height:30px'>";
  }
  domStr += "<div class='toubu'>联系商家</div>";
  if (!!mapData.maker && unescape(mapData.maker) != undefined && !!mapData.address && unescape(mapData.address) != undefined && !!mapData.title && unescape(mapData.title) != undefined) {
    var mapTitle = unescape(mapData.title) == '我的位置' ? '商家位置' : unescape(mapData.title);
    var linkMap = 'https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:' + unescape(mapData.maker) + ';title:' + mapTitle + ';addr:' + unescape(mapData.address) + '&key=DEHBZ-ZEICX-PTA4R-7DDCS-GU6TS-Y4BCX&referer=myapp';
    domStr += "<iframe id='mapPage' width='100%' height='100%' frameborder=0 src='" + linkMap + "'></iframe >";
  }
  domStr += "</div>";
  domStr += "<ul class='userDataWrap'>";
  domStr += "<li>";
  domStr += "<img src='../images/new_img/wen-38ec2369f9.png' alt=''>";
  domStr += "<span id='map_name'>" + unescape(mapData.contacts) + "</span>";
  domStr += "</li>";
  domStr += "<li>";
  domStr += "<a href='tel: " + phone + "' id='map_tel'>";
  domStr += "<img src='../images/new_img/tel-b48d029f6e.png' alt=''>";
  domStr += "<span>" + phone + "</span>";
  domStr += "</a>";
  domStr += "</li>";
  if (!!realAddr && realAddr != undefined && realAddr != '') {
    domStr += "<li  style='line-height:0.44rem'>";
    domStr += "<img src='../images/new_img/pos-eb93b9012a.png' alt=''>";
    domStr += "<span>" + realAddr + "</span>";
    domStr += "</li>";
  }
  domStr += "</ul>";
  domStr += "<i class='MapCloseBtn'></i>";
  domStr += "</div>";
  $(domStr).appendTo('body');
}

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
$(document).on('click', '.MapCloseBtn', function () {
  $(this).parents('.tencentMap').remove();
  $('.layer_bj').hide();
})
$(document).on('click', '.edit_pos_icon', function () {
  // 点击删除地址选点的相关数据
  $(this).siblings('#consultation_addAds').text('');
  $(this).siblings('#consultation_addAds').removeAttr('data-maker');
  $(this).siblings('#consultation_addAds').removeAttr('data-title');
  addrOfUrl = "";
  latngOfUrl = "";
  nameOfUrl = "";
})
$(document).on('click', '.layer_bj', function () {
  if ($("#layer_landliness").css("display") != "none") {
    $("#layer_landliness").hide();
    $('.layer_bj').hide();
    $("body").css("overflow", "auto");
    $('.layer_modify_title').removeClass('bounceInRight').hide();
  }
  $('.layer_bj').hide();
  $('.layer_ewm').removeClass('bounceInRight').addClass('bounceOutRight').hide();
  $('.layer_modify_title').removeClass('bounceInRight').hide();
  $('.tencentMap').hide();
})
//***************************************************************源函数重构修改部分开始**************************************************************//

function getWxShareContents_new(time, uuid, sign, res, type, enrollId, content, payid,nowForwardId) {

  // 保存参数供海拍客使用
  _hpcDataUrl.time = time;
  _hpcDataUrl.uuid = uuid;
  _hpcDataUrl.sign = sign;
  _hpcDataUrl.res = res;
  _hpcDataUrl.type = type;
  _hpcDataUrl.enrollId = enrollId;
  _hpcDataUrl.content = content;
  _hpcDataUrl.payid = payid;
  _hpcDataUrl.nowForwardId = nowForwardId;

  var fx_appid = '';
  var resReferId = (getUrlParam('referId') != null && getUrlParam('referId') != 'null') ? getUrlParam('referId') : 0;
  var referType = (getUrlParam('referType') != null && getUrlParam('referType') != 'null') ? getUrlParam('referType') : 0;
  sessionStorage.resReferId = resReferId;
  sessionStorage.referType = referType;
  sessionStorage.enrollId = enrollId;
  fx_appid = res.appId;
  // 通过config接口注入权限验证配置
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端console.log出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: fx_appid, // 必填，公众号的唯一标识
    timestamp: time, // 必填，生成签名的时间戳
    nonceStr: uuid, // 必填，生成签名的随机串
    signature: sign, // 必填，签名，见附录1
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  if (res.shareImageUrl == undefined) {
    fx_img_upload = res.themeInfo.listImage + localImgW + share_ww;
  } else {
    fx_img_upload = res.shareImageUrl + localImgW + share_ww;
  };
  var url_share;
  var referId = (res.buyerId == undefined || res.buyerId == 'undefined') ? 'null' : res.buyerId;

  if (type == 'dsp') {
    url_share = getWxShareUrl(wx_appid, '1', res.activityId, referId, enrollId, res.themeInfo.templateId, type, '', nowForwardId, _level);
  } else if (type == 'tps') {
    url_share = getWxShareUrl(wx_appid, '1', res.activityId, referId, enrollId, res.themeInfo.templateId, type, payid, nowForwardId, _level);
  } else {
    url_share = getWxShareUrl(wx_appid, '1', res.activityId, referId, enrollId, res.themeInfo.templateId, type, '', nowForwardId, _level);
  };
  var url_share_pyq;
  if (type == 'dsp') {
    url_share_pyq = getWxShareUrl(wx_appid, '3', res.activityId, referId, enrollId, res.themeInfo.templateId, type, '', nowForwardId, _level);
  } else if (type == 'tps') {
    url_share_pyq = getWxShareUrl(wx_appid, '3', res.activityId, referId, enrollId, res.themeInfo.templateId, type, payid, nowForwardId, _level);
  } else {
    url_share_pyq = getWxShareUrl(wx_appid, '3', res.activityId, referId, enrollId, res.themeInfo.templateId, type, '', nowForwardId, _level);
  };
  $('body').attr({
    'title': unescape(res.title),
    'descr': content,
    'img': fx_img_upload,
    'data_url': url_share,
    'a_id': res.activityId,
    'e_id': enrollId,
    'r_id': referId,
    'm_id': res.themeInfo.templateId,
    'type': type,
    'level': _level
  })
  if (payid) {
    $('body').attr({'payid': payid})
  }
  // 通过ready接口处理成功验证
  wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接
    wx.onMenuShareAppMessage({
      title: unescape(res.title), // 分享标题
      desc: content, // 分享描述
      link: url_share, // 分享链接
      imgUrl: fx_img_upload, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        var ajaxurl = window.location.origin;
        if (enrollId == null || enrollId == 'null') {
          data_prams = {
            "activityId": res.activityId,
            "shareType": 8,
            "referId": resReferId,
            "referType": referType,
            "forwardId":nowForwardId,
            "referBrowseId":_referBrowseId,
            "level":_level
          };
        } else {
          data_prams = {
            "activityEnrollId": enrollId,
            "activityId": res.activityId,
            "shareType": 8,
            "referId": resReferId,
            "referType": referType,
            "forwardId":nowForwardId,
            "referBrowseId":_referBrowseId,
            "level":_level
          };
        };
        createForwardId();
        getWxShareContents_new(time, uuid, sign, res, type, enrollId, content, payid,_forwardId)
        $.ajax({
          type: "post",
          async: false,
          url: ajaxurl + '/wx/buyer/activity/share.htm' + ajax_date,
          data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
          success: function (data) {
            // history.go(0);
          },
          error: function () {
            AjaxErrorTips();
          }
        });
      },
      cancel: function () {

      }
    });
    wx.onMenuShareTimeline({
      title: unescape(res.title), // 分享标题
      link: url_share_pyq, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: fx_img_upload, // 分享图标
      success: function () {
        var ajaxurl = window.location.origin;
        if (enrollId == null || enrollId == 'null') {
          data_prams = {
            "activityId": res.activityId,
            "shareType": 9,
            "referId": resReferId,
            "referType": referType,
            "forwardId":nowForwardId,
            "referBrowseId":_referBrowseId,
            "level":_level
          };
        } else {
          data_prams = {
            "activityEnrollId": enrollId,
            "activityId": res.activityId,
            "shareType": 9,
            "referId": resReferId,
            "referType": referType,
            "forwardId":nowForwardId,
            "referBrowseId":_referBrowseId,
            "level":_level
          };
        };
        createForwardId();
        getWxShareContents_new(time, uuid, sign, res, type, enrollId, content, payid,_forwardId)
        $.ajax({
          type: "post",
          async: false,
          url: ajaxurl + '/wx/buyer/activity/share.htm' + ajax_date,
          data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
          success: function (data) {
            // history.go(0);
          },
          error: function (res) {
            AjaxErrorTips();
          }
        });
      },
      cancel: function () {

      }
    });
    wx.hideMenuItems({
      menuList: ['menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:editTag', 'menuItem:delete', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    Loading('end');
  });
  // 通过error接口处理失败验证
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
  // 判断当前客户端版本是否支持指定JS接口
  wx.checkJsApi({
    jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function (res) {

    }
  });
};


//获取主题
function getActivityTheme_new(templateId, themeId, templateConfId, sessionItem) {
  //模版id//主题id//音乐等参数//sessionItem   session主题键
  if (templateConfId == 0) {
    data_prams = {
      "templateId": templateId,
    };
  } else {
    data_prams = {
      "templateId": templateId,
      "templateConfId": templateConfId,
    };
  };
  //隐藏列表5-9模版
  function templateHideItem5_9() {
    $('.layer_modify_title_list>li:nth-child(n+6)').hide();
  }
  $.ajax({
    type: "post",
    async: false,
    url: globalUrl + '/seller/getTemplateConf.htm',
    data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
    success: function (data) {
      var datas = JSON.parse(data);
      var res = datas.result.data;
      if (datas.status == 200) {
        $('#aly_url').val(res.ossPostDto.url);
        $('#aly_ossAccessKeyId').val(res.ossPostDto.ossAccessKeyId);
        $('#aly_policy').val(res.ossPostDto.policy);
        $('#aly_signature').val(res.ossPostDto.signature);
        $('#aly_key').val(res.ossPostDto.key);
        $('.banner_mb_tab>div>ul').css('width', res.themeList.length * 1.72 + 'rem');
        var _this_mb = tpImgW + 154 * 3.5;
        for (var i = 0; i < res.themeList.length; i++) {
          var datass = JSON.stringify(res.themeList[i]);
          if (res.themeList[i].themeId == themeId) {
            $('.banner_mb_tab>div>ul').append("<li data-index='" + res.themeList[i].themeId + "' data-type='" + res.themeList[i].themeTypeId + "'  data='" + datass + "' class='banner_mb_tab_img_active'>" +
              "<img src='" + res.themeList[i].headImgUrl + _this_mb + "' /><span>" + res.themeList[i].themeType + "</span></li>");
            if (getUrlParam('activityId') == null && sessionStorage.getItem(sessionItem) == null || sessionStorage.getItem(sessionItem) == '') {
              TiggerThem(res.themeList[i]);
              $('.banner_mb_tab_qx').attr('data', JSON.stringify(res.themeList[i]));
              $('.banner_mb_tab_clk').attr('data-typeid', res.themeList[i].themeTypeId);
              if (res.themeList[i].headImgUrl != null) {
                var headimg_data = res.themeList[i].headImgUrl.split(',');
                var headimg_length = headimg_data.length;
                var headimg_arry = [];
                for (var j = 0; j < headimg_length; j++) {
                  headimg_arry.push(headimg_data[j] + localImgW + Math.ceil(banner_w * 3.5));
                };
                var head_img_str = headimg_arry.join(',');
              }
              $('.industry_colse').attr('data', head_img_str);
            };
            $('.layer_modify_title_list>li').remove();
            // liuya -- 增加一层非空判断，防止标题为配置的时候导致页面进不去
            if (!!res.templateTitleList) {
              for (var title_list of res.templateTitleList) {
                $('.layer_modify_title_list').append('<li data="' + title_list.title_id + '">' + title_list.title_name + '</li>');
              };
            }
            templateHideItem5_9();
          } else {
            $('.banner_mb_tab>div>ul').append("<li data-index='" + res.themeList[i].themeId + "' data-type='" + res.themeList[i].themeTypeId + "' data='" + datass + "'>" +
              "<img src='" + res.themeList[i].headImgUrl + _this_mb + "' /><span>" + res.themeList[i].themeType + "</span></li>");
          };
        };
        if (res.themeList.length <= 1) {
          $('#change_mb').hide();
        };
        if (res.industryList != undefined) {
          if (res.industryList.length <= 1) {
            $('.iundustry_text_list_bj').hide();
          } else {
            for (var list_name of res.industryList) {
              if (list_name.industry_id == 1) {
                $('.iundustry_text_list').append('<li class="iundustry_text_list_active" data="' + list_name.industry_id + '">' + list_name.industry + '</li>');
              } else {
                $('.iundustry_text_list').append('<li data="' + list_name.industry_id + '">' + list_name.industry + '</li>');
              }
            };
          };
        } else {
          $('.iundustry_text_list_bj').hide();
        };
        if (res.headImgList == undefined) {
          $('#change_img').hide();
        } else {
          for (var key of res.headImgList) {
            tout_staut.push(key.industryId);
            if (key.industryId == 1) {
              if (key.industryId == 8) {
                var img = key.ossUrl.split(";");
                var sm_img = '';
                img.forEach(function (e, i) {
                  sm_img += '<img style="overflow:hidden;position:absolute;width:100%;display:block;" src="' + e + gifW + Math.ceil(banner_w * 3.5) + '" />';
                });
                $('.industry_img').append('<li data="' + key.industryId + '" style="display:none;">' + sm_img + '</li>');
              } else {
                $('.industry_img').append('<li data="' + key.industryId + '"><img src="' + key.ossUrl + gifW + Math.ceil(banner_w * 3.5) + '" /></li>');
              }

            } else {
              if (key.industryId == 8) {
                var img = key.ossUrl.split(";");
                var sm_img = '';
                img.forEach(function (e, i) {
                  sm_img += '<img style="overflow:hidden;position:absolute;width:100%;display:block;" src="' + e + gifW + Math.ceil(banner_w * 3.5) + '" />';
                });
                $('.industry_img').append('<li data="' + key.industryId + '" style="display:none;">' + sm_img + '</li>');
              } else {
                $('.industry_img').append('<li data="' + key.industryId + '" style="display:none;"><img src="' + key.ossUrl + gifW + Math.ceil(banner_w * 3.5) + '" /></li>');
              };
            };
          };
        };
        if (tout_staut.length > 0) {
          var tout_id = Math.min.apply(null, tout_staut);
          if (tout_id != 1) {
            for (var i = 0; i < $('.industry_img>li').length; i++) {
              if ($('.industry_img>li').eq(i).attr('data') == tout_id) {
                $('.industry_img>li').eq(i).show();
              };
            };
            for (var i = 0; i < $('.iundustry_text_list>li').length; i++) {
              if ($('.iundustry_text_list>li').eq(i).attr('data') == tout_id) {
                $('.iundustry_text_list>li').eq(i).addClass('iundustry_text_list_active');
              }
            }
          }
        };
        /**
         * liuya -- 动效和音乐
         * 初始化数据
         * **/
        if (mdFlag == 'function') {
          AnimatePicker.pickerDATA = res.animationMap;
          MusicPicker.pickerDATA = res.musicMap;
        }
        /**************************************************/
        if (res.animationMap == undefined) {
          $('#animateBtn').hide();
        };
        if (res.musicMap == undefined) {
          $('#musicBtn').hide();
        };

        var childern_length = $('.industry_img').find('li').length;
        /**********刘亚 -- 对显示元素进行筛选 **********/
        $('.industry_img').find('li').each(function (index, el) {
          if ($(el).css('display') == 'none') {
            childern_length--;
          }
        })
        $('.industry_img').css('width', 2.1 * childern_length + 'rem');
        var list_childern_length = $('.iundustry_text_list').find('li').length;
        $('.iundustry_text_list_bj').css('width', banner_w + 'px');
        $('.iundustry_text_list').css('width', 1.09 * list_childern_length + 'rem');
      } else if (datas.status == 702) {
        window.location.href = globalUrl + '/error.htm?code=' + datas.status;
      } else if (datas.status == 700) {
        window.location.href = globalUrl + '/error.htm?code=' + datas.status;
      } else {
        AjaxNullTips(datas.result.message);
      }
    },
    error: function () {
      AjaxErrorTips();
    }
  });
};
/**
 * @liuya
 *
 * 请求后台，获取门店信息
 * **/
function getShopDataByAjaxForAct() {
  $.ajax({
    url: globalUrl + '/seller/couponConf.htm?v=' + new Date().getTime(),
    type: 'POST',
    async: false,
    data: '' + isDebug,
    success: function (result) {
      var result = JSON.parse(result);
      if (result.status == 200) {
        if ($.isEmptyObject(result.result.data)) {
          // 未填写门店信息
          $('.edit_pos_icon').hide();
          return
        } else {
          // 填写了门店信息，则展示到对应位置
          var renderData = result.result.data;
          // 地址信息
          $('#consultation_name').val(unescape(renderData.shopName)); // 门店名称
          $('#consultation_tel').val(renderData.contacts); // 联系方式
          if (!!renderData.marker) {
            $('#consultation_addAds').attr('data-maker', renderData.marker); // 如果存在经纬度，则保存
          }
          if (!!renderData.address) {
            $('#consultation_addAds').text(unescape(renderData.address)); // 如果存在经纬度，则保存
          }
          if (!!renderData.title) {
            $('#consultation_addAds').attr('data-title', unescape(renderData.title)); // 如果存在经纬度，则保存
          }
          if (!!renderData.add) {
            $('#consultation_detailsAds').text(unescape(renderData.add)); // 详细地址描述
          }
          $('.edit_pos_icon').show();
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
//***************************************************************源函数重构修改部分结束**************************************************************//

/**
 * js 获取cookies的值
 * **/
function getCookie(cookieName) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (cookieName == arr[0]) {
      return arr[1];
    }
  }
  return "";
}

// hipac 预览页分享点击事件弹窗
function popShareForHipac() {
  var domStr = '';
  domStr += '<div class="layer_fx_bj">';
  domStr += '<div class="layer_fx_hs">';
  domStr += '<img src="../images/fx_jt-c05c556c67.png" />';
  domStr += '<span>点击右上角分享给微信好友</span>';
  domStr += '</div>';
  domStr += '<img src="../images/fx-6e9d266836.png" />';
  domStr += '<div class="layer_fx_content">';
  domStr += '<div class="layer_fx_l_line"></div>';
  domStr += '<div>分享方式</div>';
  domStr += '<div class="layer_fx_r_line"></div>';
  domStr += '<div class="layer_fx_btn" id="fx_fpy">';
  domStr += '<img src="../images/wxhy-b7d554c8b4.png" style="margin-left: .2rem;" />';
  domStr += '<span>微信好友</span>';
  domStr += '</div>';
  domStr += '<div class="layer_fx_btn" style="float: right;" id="fx_pyq">';
  domStr += '<img src="../images/pyq-da93e37920.png" style="margin-right: .1rem;" />';
  domStr += '<span>朋友圈</span>';
  domStr += '</div>';
  domStr += '</div>';
  domStr += '<span>取消</span>';
  domStr += '</div>';

  $(domStr).appendTo('body');
}

// hipac 预览页海拍客改为不能点击联系商家

$(".breathe-btn").on("click", function (e) {
  if (document.URL.indexOf("preview") !== -1 && app.isApp()) {
    console.log("预览页面海拍客不能点");
    e.preventDefault();
    $(".text_no_unline").attr('href','###');
    e.stopImmediatePropagation();
  } else {
    console.log("不是海拍客的预览页面");
  }
})

// 添加优惠券状态判断

$("#addConponImg").click(function (e) {
  if (!JSON.parse($(this).attr("data-ishavecoupon"))) {
    e.stopImmediatePropagation();
    warns("请先去优惠券中心生成券")
  }
  if (JSON.parse($(this).attr("data-couponnum")) === 0) {
    e.stopImmediatePropagation();
    warns("当前无可用优惠券")
  }
})

// 判断页面是否在pc中打开
function isPc() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || /micromessenger/.test(navigator.userAgent.toLowerCase())) {
    return false;
  } else {
    return true;
  }
}

// 跳转预览
if (isPc() && sessionStorage.getItem("onlyPreview") && location.href.indexOf("edit") !== -1) {
  $(".loading").removeClass("loading").addClass("_loading");
  $(document).ajaxStop(function(){
    console.log("ajax执行完毕");
    $(".bargain_btn li:nth-of-type(1)").click();
  })
}
// 隐藏预览底部
function hideFooter(){
  if(isPc() && sessionStorage.getItem("onlyPreview") && location.href.indexOf("preview") !== -1){
    $(".bargain_btn").hide();
  }
}

hideFooter();

// 监听离开事件
function pageUnload() {
  if(isPc() && location.href.indexOf("preview") !== -1){
    $(window).on("beforeunload",function(){
      sessionStorage.removeItem("onlyPreview");
    })
  }
}
pageUnload();

//得到预览数据
function  perviewGetdata(res,isAppPreviews){
  //识别页面
  if(location.href.indexOf("preview")!=-1||isAppPreviews){
    //识别是重写页面
    var activityId= getUrlParam("activityId");
    var type= getUrlParam("type");
    if (type == 'copy') {
      return
    }


    //多商品砍价页面
    if(location.href.indexOf("/kj/d_")!=-1){
        try{
          var goodsLong=JSON.parse(sessionStorage.dsp).goodsList.length;
          $(".dsp_kj_list>li").each(function (i,item){
              if(i>=goodsLong){
                item.remove();
              }
            });
       }catch(err){
          $("#ranking_lists,#branking_lists_content").remove();
          $("#seller_info_detail").addClass("margin-b");
        }
    }
	if(!isAppPreviews){  //如果是海拍客   就不运行
		//非重新编辑页面
		if(!(activityId!="null"&&type=="null")){
			 window.onload=function(){
			  $(".prev_list_kj .list_text").remove();
			  $(".prev_list_kj").append("<p style='color: #313131;font-family: PingFangSC-Regular;font-size: .24rem;text-align: center; padding-bottom: .3rem;'  >已经到底了</p>");
			 }
		}
	}
   
    //重新编辑页面
    if((activityId!="null"&&type=="null")||isAppPreviews){
      //识别当前页面类型
     
     //配置当前页面
      var pageType="";
      var pageParmams={
        url:"/buyer/zlActivityEnter.htm",//请求链接
        data_prams:{//请求数据
          "activityId": activityId,
          "referId": 0,
          "activityEnrollId": 0,
          "currUrl": encodeURIComponent(location),
        }
      };

      //识别页面类型
      if(location.href.indexOf("/zl/")!=-1){//助力页面
          pageType="zl";
      }else if(location.href.indexOf("/kj/tp_preview")!=-1){//投票页面
        pageType="tp";
      }else if(location.href.indexOf("/kj/ms_preview")!=-1){// 秒杀区 
        pageType="ms";
      }else if(location.href.indexOf("/ac/cj_")!=-1||location.href.indexOf("/ac/bm_")!=-1||location.href.indexOf("/ac/jl_")!=-1){//抽奖页面  报名  接龙
        pageType="cj";
      }else if(location.href.indexOf("/kj/d_")!=-1){//多商品砍价区
        pageType="dkj";
      }else if(location.href.indexOf("/kj/")!=-1){//砍价页面 
        pageType="kj";
      }else if(location.href.indexOf("/ac/hypreview")!=-1){//好友拼团
        pageType="hy";
      }else if(location.href.indexOf("/ac/pt_preview")!=-1){//拼团
        pageType="pt";
      }
     //方法   

      //助力区
      function zlPangHangBang(id){
        window.onload = function(){
          $(".prev_list_kj").append("<p  class='list_text'></p>");
          getZlRankingLists(id, 30, 1);
          getZlRankingList(id);
        }
      }
      //投票区
      function tpDataRegion(id){
        window.onload = function(){
            $(document).unbind('click', '.tp_content_tab_one>ul>li,.tp_content_tab_two>ul>li');
            is_gift=false;
            $(".tp_content_tab_one").prepend("<ul></ul>");
            $(".tp_content_tab_one>p").removeClass("tp_nodata").addClass("list_text").text("已经到底了");
            getBargainRankingLists(id,20,1,"");

           var  data_prams = {
              "activityId": activityId,
              "referId":'0',
              "currUrl": encodeURIComponent(location),
              "referType":'0',
              "payId":"0",
              "level": getUrlParam('level')?getUrlParam('level'):0,
              "forwardId":getUrlParam('forwardId')?getUrlParam('forwardId'):0
            };
            console.log(data_prams);
            $.ajax({
              type: "post",
              url: globalUrl + '/buyer/tpActivity.htm' + ajax_date,
              data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
              success: function (data) {
                try{
                  var datas = JSON.parse(data);
                  var res = datas.result.data;
                  _buyId = res.buyerId;createForwardId();
                  _level = res.level?res.level:1;
                  _referBrowseId = res.referBrowseId?res.referBrowseId:0;
                  $('#participants').text(res.enrollNum);
                  $('#cumulative_votes').text(res.voteSumNum);
                }catch(err){
                  console.log(err);
                }
              

              }
            })



        }   
      }
      //抽奖区
      function cjDataRegion(id){
        window.onload = function(){
          $(".prev_list_kj").append("<p  class='list_text'></p>");
          getBargainRankingLists(id, 30, 1);
          getBargainRankingList(id);
        }
      }
      //砍价
      function kjDataRegion(id){
        window.onload = function(){
          $(".prev_list_kj").append("<p  class='list_text'></p>");
          getBargainRankingLists(id, 30, 1);
          getBargainRankingList(id);
        }
      }

      // 秒杀区 
      function msDataRegion(id){
        window.onload = function(){
          $(".prev_list_kj").append("<p  class='list_text'></p>");
          var  data_prams = {
            "activityId": activityId,
            "referId":'0',
            "currUrl": encodeURIComponent(location),
            "referType":'0',
            "payId":"0",
            "level": getUrlParam('level')?getUrlParam('level'):0,
            "forwardId":getUrlParam('forwardId')?getUrlParam('forwardId'):0
          };
          $.ajax({
            type: "post",
            url: globalUrl + '/buyer/msActivityEnter.htm' + ajax_date,
            data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
            success: function (data) {
              try{
                var datas = JSON.parse(data);
                var res = datas.result.data;
                _buyId = res.buyerId;createForwardId();
                _level = res.level?res.level:1;
                _referBrowseId = res.referBrowseId?res.referBrowseId:0;
                if (res.activityType == 81) {
                    if( res.msRankingList.length < 30 ){
                      bargainRankingList_length = false;
                       $('.list_text').text('已经到底了');
                    };
                    for (var i = 0; i < res.msRankingList.length; i++) {
                      var first_name = res.msRankingList[i].name.substring(0, 1);
                      var last_name = res.msRankingList[i].name.substring(res.msRankingList[i].name.length - (res.msRankingList[i].name.length - 2), res.msRankingList[i].name.length);
                      var fina_name = first_name + '*' + last_name;
                      $('.prev_list_kj>ul').append('<li>' +
                        '<ul>' +
                        '<li style="width:20% !important ;">' + res.msRankingList[i].ranking + '</li>' +
                        '<li style="width: 30% !important;">' + fina_name + '</li>' +
                        '<li style="width: 50% !important;">' + formatDate(res.msRankingList[i].date) + '</li>' +
                        '</ul>' +
                        '</li>');
                    };
                } else {
                   // 当前价格
                    $("#prev_list_kj_type").text("当前价格");
                    $("#ranking_lists").text("砍价排行榜");
                    if( res.msRankingList.length < 30 ){
                      bargainRankingList_length = false;
                       $('.list_text').text('已经到底了');
                    };
                    for (var i = 0; i < res.msRankingList.length; i++) {
                      var first_name = res.msRankingList[i].name.substring(0, 1);
                      var last_name = res.msRankingList[i].name.substring(res.msRankingList[i].name.length - (res.msRankingList[i].name.length - 2), res.msRankingList[i].name.length);
                      var fina_name = first_name + '*' + last_name;
                      $('.prev_list_kj>ul').append('<li>' +
                        '<ul>' +
                        '<li style="width:20% !important ;">' + res.msRankingList[i].ranking + '</li>' +
                        '<li style="width: 30% !important;">' + fina_name + '</li>' +
                        '<li style="width: 50% !important;">' + res.msRankingList[i].currentPrice + '</li>' +
                        '</ul>' +
                        '</li>');
                    };
                }
              }catch(err){
                console.log(err);
              }
            }
          })
        }
      }

      //好友拼团
      function hyDataRegion(id){
        window.onload=function(){
          var  data_prams = {
            "activityId": activityId,
            "referId":'0',
            "currUrl": encodeURIComponent(location),
            "referType":'0',
            "payId":"0",
            "level": getUrlParam('level')?getUrlParam('level'):0,
            "forwardId":getUrlParam('forwardId')?getUrlParam('forwardId'):0
          };
          $.ajax({
            type: "post",
            url: globalUrl + '/buyer/friendsPtActivity.htm' + ajax_date,
            data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
            success: function (data) {
              var datas = JSON.parse(data);
              var res = datas.result.data;
              _buyId = res.buyerId;createForwardId();
              _level = res.level?res.level:1;
              _referBrowseId = res.referBrowseId?res.referBrowseId:0;
              totalNum = res.teamType[res.teamType.length - 1].num
              // 其他团队信息，点击请求接口展示出参团的详细信息
              if (res.otherTeamList.length != 0) {
                $(".pt_nojion_team").css("display","block");
               
                if (res.otherTeamList.length != 0 && res.otherTeamList.length <= 5) {
                  $('.pt_nojion_list_opens').hide()
                } else if (res.otherTeamList.length != 0 && res.otherTeamList.length > 5) {
                  $('.pt_nojion_list_opens').show()
                }
                for (var i = 0; i < res.otherTeamList.length; i++) { // 循环输出满团信息
                  var _otherData = JSON.parse(res.otherTeamList[i].data)
                  if (res.isJoinOtherTeam == 1 && (totalNum > res.otherTeamList[i].memberNum) && res.isEnroll == 0) { // 可以加入其它团 且当前团人数未满
                   // var str = '<div class="go_group enough" data-groupId="' + res.otherTeamList[i].groupId + '">去凑团</div>'
				    var str="";
                  } else if (res.isJoinOtherTeam == 1 && (totalNum == res.otherTeamList[i].memberNum)) {  // 可以加入其它团 但当前团人数已满
                    var str = '<div class="go_group">团已满</div>'
                  } else {
                    var str = ''
                  }
                  $('.pt_nojion_team>ul').append('<li data-groupid="' + res.otherTeamList[i].groupId + '"  >' +
                    '<div>' +
                    '<span class="arrow"></span>' +
                    '<span class="">' + res.otherTeamList[i].name + '的团&nbsp;&nbsp;&nbsp;(<em>' + res.otherTeamList[i].memberNum + '</em>人参团)</span>' +
                    str +
                    '</div>' +
                    '<ul style="display:none;"></ul></li>');
                };
                if (res.otherTeamList.length > 5) {
                  $('.pt_nojion_team>ul>li:gt(4)').hide()
                }
              } 

              	// 如果活动已经报名，并且活动未满
              if (res.teamMemberList&&res.teamMemberList.length != 0) {
				   $(".pt_nojion_list").css("display","block");
                $('.pt_nojion_list').children('label').text('团员信息：');
                for (var i = 0; i < res.teamMemberList.length; i++) {//循环输出已参加人员列表
                  // var first_name = unescape(res.teamMemberList[i].name).substring(0, 1);
                  // var last_name = unescape(res.teamMemberList[i].name).substring(unescape(res.teamMemberList[i].name).length - (unescape(res.teamMemberList[i].name).length - 2), unescape(res.teamMemberList[i].name).length);
                  // var fina_name = first_name + '*' + last_name;
                  var fina_name = unescape(res.teamMemberList[i].name);
                  $('.pt_nojion_list>ul').append('<li>' +
                    '<span>' + fina_name + '</span>' +
                    '<span>' + formatDate(res.teamMemberList[i].date) + '<em>参团</em></span>' +
                    // '<span>当前价格:' + res.teamMemberList[i].price + '元</span>' +
                    '</li>');
                };
                if (res.teamMemberList.length <= 3) {
                  $('.pt_nojion_list_open').hide();
                } else {
                  $('.pt_nojion_list_open').show();
                }
              } 
              
            }
          });
        }
      }

      //拼团
      function  ptDataRegion(id){
        var  data_prams = {
          "activityId": activityId,
          "referId":'0',
          "currUrl": encodeURIComponent(location),
          "level": getUrlParam('level')?getUrlParam('level'):0,
          "forwardId":getUrlParam('forwardId')?getUrlParam('forwardId'):0
         
        };
        $.ajax({
          type: "post",
          url: globalUrl + '/buyer/ptActivity.htm' + ajax_date,
          data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
          success: function (data) {
            var datas = JSON.parse(data);
            var res = datas.result.data;
            _buyId = res.buyerId;createForwardId();
            _level = res.level?res.level:1;
            _referBrowseId = res.referBrowseId?res.referBrowseId:0;
           // $('.pt_nojion_list').children('label').text('你在这个团哦：');
            if (res.teamMemberList.length != 0) {
              $(".pt_nojion_list").css("display","block");
              for (var i = 0; i < res.teamMemberList.length; i++) {//循环输出已参加人员列表
                var first_name = unescape(res.teamMemberList[i].name).substring(0, 1);
                var last_name = unescape(res.teamMemberList[i].name).substring(unescape(res.teamMemberList[i].name).length - (unescape(res.teamMemberList[i].name).length - 2), unescape(res.teamMemberList[i].name).length);
                var fina_name = first_name + '*' + last_name;
                $('.pt_nojion_list>ul').append('<li>' +
                  '<span>' + fina_name + '</span>' +
                  '<span>' + formatDate(res.teamMemberList[i].date) + '<em>参团</em></span>' +
                  '<span>当前价格:' + res.teamMemberList[i].price + '元</span>' +
                  '</li>');
              };
              if (res.teamMemberList.length <= 3) {
                $('.pt_nojion_list_open').hide();
              } else {
                $('.pt_nojion_list_open').show();
              }
            }

            if (res.fullTeamList.length != 0) {
              $(".pt_nojion_team").css("display","block");
              for (var i = 0; i < res.fullTeamList.length; i++) {//循环输出满团信息
                $('.pt_nojion_team>ul').append('<li data-groupid="' + res.fullTeamList[i].groupId + '"  >' +
                  '<div>' +
                  '<span>此团已满<em>' + res.fullTeamList[i].memberNum + '</em>人</span><span>价格:<em>' + res.fullTeamList[i].price + '</em>元</span><span><em>' + formatDate(res.fullTeamList[i].fullTime) + '</em>满团<i></i></span>' +
                  '</div>' +
                  '<ul style="display:none;"></ul></li>');
              };
            }
          }
        });
      }
       //多商品砍价区
      function dkjDataRegion(id){
        window.onload=function(){
          getBargainRankingLists(id, 30, 1,1);
        }
      }

      //处理结果
      switch(pageType){
        case "zl":  zlPangHangBang(activityId); break;
        case "tp":  tpDataRegion(activityId); break;
        case "cj":  cjDataRegion(activityId); break;
        case "kj":  kjDataRegion(activityId); break;
        case "dkj": dkjDataRegion(activityId); break;
        case "ms": msDataRegion(activityId); break;
        case "hy": hyDataRegion(activityId); break;
        case "pt": ptDataRegion(activityId); break;
        default :;
      }
     
      /*
         //交互
      $.ajax({
        type: "post",
        url: globalUrl + pageParmams.url + ajax_date,
        data: 'params={"data":' + JSON.stringify(pageParmams.data_prams) + '}' + isDebug,
        success: function (data) {
          var datas = JSON.parse(data);
          var res = datas.result.data;
          bandData(res);
          bandtThings(res);
        }
      })
    */

    }



  }

};

// 数推环境隐藏优惠券
function hideConpon(){
  if(sessionStorage.getItem('stEnv') === 'st'){
    $('#addConponImg').hide();
  }
}
hideConpon();

// 数推环境分享禁用动画，个人中心隐藏
function hideShare(){
  if(sessionStorage.getItem('stEnv') === 'st'){
    $('.banner_left_tips').find('li').eq(1).attr('style','animation:inherit');
    $('#banner_tips_person').css('dispaly','none');
  }
}
hideShare();