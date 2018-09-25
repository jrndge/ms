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
//判断是否是ios
var navigators = '';
var ua = navigator.userAgent.toLowerCase();
if (/iphone|ipad|ipod/.test(ua)) {
	navigators = 'ios';
} else if (/android/.test(ua)) {
	navigators = 'android';
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



function addGoodsDesc(imgMaxNum) {
  var add_pic_length = $('#goodsDesc').find('.bargain_introduce_tab_pic').length;
  if (add_pic_length >= imgMaxNum) {
    AjaxNullTips('最多上传' + imgMaxNum + '张图片');
  } else {
    $('#bargain_describe_img').before('<div class="bargain_introduce_tab_pic addstyle addGoodsDescImg" >' +
      '<div class="add_tab_pic_content">' +
      '<img src=""  class="add_tab_pic_content_img" alt=""/>' +
      '<img src="index_files/add_pic_content-198319f166.png" />' +
      '<span>点击选择图片</span>' +
      '</div>' +
    	'<div style="display:none; background:rgba(0,0,0,.8) ;z-index:100 ;position:fixed ;width:100%;height:100% ;left:0;top:0;"></div>'+
      '<div class="banner_img_tab_clk">'+
				'<ul style="width:100%">'+
				'<li >相册</li>'+
				'<li >拍照</li>'+
				'<li >取消</li>'+
				'<input  type="file" name="pics" style="display: none;">'+
				'<input  type="file" style="display: none;" capture="camera" accept="image/*">'+
				'</ul>'+
	  	'</div>'+
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


    $("#goodsDesc").on("click",".add_tab_pic_content",function(event){
    	    $('.bargain_btn').css('display','none');
          $($(this).next()).css('display','block');
    	    $($(this).next().next()).animate({ bottom: '0rem'  }, 200);
		      $($(this).next().next()).css('z-index','101');
		      $($(this).next().next()).css('left','0');
		      $('#leafContainer').css('overflow-y','hidden');
		      var id1=$(this);
		       //相册按钮
		      var id2=$(this).next().next().find('li:nth-child(1)');
		        //相机按钮
		      var id3=$(this).next().next().find('li:nth-child(2)');
		        //取消按钮
		      var id4=$(this).next().next().find('li:nth-child(3)');
		        //选择相册
		      var id5=$(this).next().next();
		        //相册输入
		      var id6=id4.next();
		        //相机输入
		      var id7=id6.next();
		      //遮罩层
		      var id8=$(this).next();
		       $(id6).change(function(){
    	    	       $(id1.children('img:nth-child(2)')).show();
    	    	       $(id1.children('img:nth-child(2)')).attr("src",URL.createObjectURL($(this)[0].files[0]));
		               $(id5).animate({ bottom: '-3rem'  }, 200);
		               $('.bargain_btn').css('display','block');
		               $(id8).css('display','none');
		               $('#leafContainer').css('overflow-y','auto');
		               
		               
    	    });
    	     $(id7).change(function(){
    	    	       $(id1.children('img:nth-child(2)')).show();
    	    	       $(id1.children('img:nth-child(2)')).attr("src",URL.createObjectURL($(this)[0].files[0]));
		               $(id5).animate({ bottom: '-3rem'  }, 200);
		               $('.bargain_btn').css('display','block');
		               $(id8).css('display','none');
		               $('#leafContainer').css('overflow-y','auto');
    	    });
    	    console.log("选择照片")
    	    $(id2).click(function(){
    	    	     console.log("相册");
    	    	     console.log("相册1");
    	    	     console.log($(this));
    	    	     console.log(id6);
    	    	     $(id6).click();
    	    	   
    	    });
    	    $(id3).click(function(){
    	    	   console.log("相机");
    	    	     $(id7).click();
    	    	   
    	    });
    	    $(id4).click(function(){
    	    	   console.log("取消");
    	    	    $(id5).animate({ bottom: '-3rem'  }, 200);
		            $('.bargain_btn').css('display','block');
		            $(id8).css('display','none');
		            $('#leafContainer').css('overflow-y','auto');
		            
		            
    	    });
    	   
    	   
     });

    $(".add_content").on("click",".add_tab_pic_content",function(event){
    	    $('.bargain_btn').css('display','none');
          $($(this).next()).css('display','block');
    	    $($(this).next().next()).animate({ bottom: '0rem'  }, 200);
		      $($(this).next().next()).css('z-index','101');
		      $($(this).next().next()).css('left','0');
		      $('#leafContainer').css('overflow-y','hidden');
		      var id1=$(this);
		       //相册按钮
		      var id2=$(this).next().next().find('li:nth-child(1)');
		        //相机按钮
		      var id3=$(this).next().next().find('li:nth-child(2)');
		        //取消按钮
		      var id4=$(this).next().next().find('li:nth-child(3)');
		        //选择相册
		      var id5=$(this).next().next();
		        //相册输入
		      var id6=id4.next();
		        //相机输入
		      var id7=id6.next();
		      //遮罩层
		      var id8=$(this).next();
		       $(id6).change(function(){
    	    	       $(id1.children('img:nth-child(2)')).show();
    	    	       $(id1.children('img:nth-child(2)')).attr("src",URL.createObjectURL($(this)[0].files[0]));
		               $(id5).animate({ bottom: '-3rem'  }, 200);
		               $('.bargain_btn').css('display','block');
		               $(id8).css('display','none');
		               $('#leafContainer').css('overflow-y','auto');
		               
		               
    	    });
    	     $(id7).change(function(){
    	    	       $(id1.children('img:nth-child(2)')).show();
    	    	       $(id1.children('img:nth-child(2)')).attr("src",URL.createObjectURL($(this)[0].files[0]));
		               $(id5).animate({ bottom: '-3rem'  }, 200);
		               $('.bargain_btn').css('display','block');
		               $(id8).css('display','none');
		               $('#leafContainer').css('overflow-y','auto');
    	    });
    	    console.log("选择照片")
    	    $(id2).click(function(){
    	    	     console.log("相册");
    	    	     console.log("相册1");
    	    	     console.log($(this));
    	    	     console.log(id6);
    	    	     $(id6).click();
    	    	   
    	    });
    	    $(id3).click(function(){
    	    	   console.log("相机");
    	    	     $(id7).click();
    	    	   
    	    });
    	    $(id4).click(function(){
    	    	   console.log("取消");
    	    	    $(id5).animate({ bottom: '-3rem'  }, 200);
		            $('.bargain_btn').css('display','block');
		            $(id8).css('display','none');
		            $('#leafContainer').css('overflow-y','auto');
		            
		            
    	    });
    	   
    	   
     });
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


$('#bargain_describe_img').click(function () {
		addGoodsDesc(4);
	});
	

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
          '<img src=""  class="add_tab_pic_content_img" alt=""/>' +
          
          '<img src="index_files/add_pic_content-198319f166.png" />' +

          '<span>点击选择图片</span>' +
          '</div>' +
          	'<div style="display:none; background:rgba(0,0,0,.8) ;z-index:100 ;position:fixed ;width:100%;height:100% ;left:0;top:0;"></div>'+
			      '<div class="banner_img_tab_clk">'+
							'<ul style="width:100%">'+
							'<li >相册</li>'+
							'<li >拍照</li>'+
							'<li >取消</li>'+
							'<input  type="file" name="pics" style="display: none;">'+
							'<input  type="file" style="display: none;" capture="camera" accept="image/*">'+
							'</ul>'+
	  			'</div>'+
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



//
////选择图片
//function chonse_img(el){
//	 $('.banner_img_tab_clk').animate({ bottom: '0rem' }, 200);
//}
//
//for(i=0; i<$('.add_tab_pic_content').length;i++){
//		$('.add_tab_pic_content').click(function(){
//		   console.log("选择图片")
//		   
//	  })
//}




//返回顶部

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
