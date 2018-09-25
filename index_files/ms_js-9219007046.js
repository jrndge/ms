//编辑获取原来的结束时间和商品数量
var old_endtime = '', old_goodnum = '';
//判断编辑时是否有报名
var bm_state = true,
	ms_type = 81,//秒杀形式     81：报名 82：砍价
	payType = 0; //支付方式     0线下支付 1线上支付
var to_pay_btn = true;
var activityEnrollIds = 'null';
//填写信息更新
var input_val_type = true;
var bm_layer_info = [];
var ints = '';
var _Coupon = new Coupon(); // 初始化优惠券创建组件对象
var ccurl = ''//个人中心网址前半部分
////////////////*********得到微信的分享标题*********////////////////

// 向父框架发送消息
function markSt() {
	console.log(location.href)
	window.parent.postMessage({
		from:'ldb',
		to:'st',
		fn:'jumpMatter',
		mes:'是否是数推'
	},'*');
	window.addEventListener('message',function(event){
		console.log('ldb',event);
	})
}

function getWXtext(res){
	var content="";
	if (res.pageState == 500 || res.pageState == 503) {
		content = '(' + res.enrollName + ')' + '正在参加限时秒杀活动，一起加入吧！';
	} else {
		content = '限时秒杀，疯狂购！名额有限，不要错过呦！';
	};
	return content;
}
////////////////****************///////////
$(function () {
	//个人中心点击
	$('#banner_tips_person').click(function () {
		location.href = ccurl + '/120/' + encodeURIComponent('{}') + '/wx_share.htm';
	});
	// 联系商家地址选点
	$('#consultation_addAds').click(function () {
		createPtActivity('map');
	});
	if (navigators == 'ios') {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = "../css/iphone-ff3fd48f97.css";
		document.getElementsByTagName("head")[0].appendChild(link);
	};
	//关闭秒杀成功弹窗
	$('#userDarwPrize').click(function () {
		$('body').css('overflow-y', 'auto');
		$('#userDarwPrize').addClass('bounceOutTop');
	});
	$('.cjCloseBtn').click(function () {
		$('body').css('overflow-y', 'auto');
		$('#userDarwPrize').addClass('bounceOutTop');
	});
	//关闭秒杀失败弹窗
	$('#btn2').click(function () {
		$('body').css('overflow-y', 'auto');
		$('.com_mask').hide();
	});
	$('.close_ewm').click(function () {
		$('body').css('overflow-y', 'auto');
		$('.com_mask').hide();
	});
	//秒杀限时设置
	$('#ms_xs').blur(function () {
		if (Number($(this).val()) != '') {
			if (Number($(this).val()) < 0) {
				$(this).val('');
				AjaxNullTips('秒杀限时不可小于0.01');
			} else {
				if (isInteger(Number($(this).val()))) {

				} else {
					$(this).val('');
					AjaxNullTips('秒杀限时不能为小数');
				}
			}
		} else {
			AjaxNullTips('请填写秒杀限时');
		}
	});
	//商品原价
	$('#ms_yj').blur(function () {
		if (Number($(this).val()) != '') {
			if (Number($(this).val()) < 0.01) {
				$(this).val('');
				AjaxNullTips('商品原价不可小于0.01');
			} else {
				if (isMoney(Number($(this).val()))) {

				} else {
					$(this).val('');
					AjaxNullTips('商品原价最多填写两位小数');
				}
			}
		} else {
			AjaxNullTips('请填写商品原价');
		}
	});
	//秒杀分数
	$('#ms_fs').blur(function () {
		if (Number($(this).val()) != '') {
			if (Number($(this).val()) <= 0) {
				$(this).val('');
			} else {
				if (isInteger(Number($(this).val()))) {

				} else {
					$(this).val('');
					AjaxNullTips('秒杀份数不能填写小数');
				}
			}
		} else {
			AjaxNullTips('请填写秒杀份数');
		}
	});
	//秒杀价
	$('#ms_msj').blur(function () {
		if (Number($(this).val()) != '') {
			if (Number($(this).val()) < 0.01) {
				$(this).val('');
				AjaxNullTips('秒杀价不可小于0.01');
			} else {
				if (isMoney(Number($(this).val()))) {

				} else {
					$(this).val('');
					AjaxNullTips('秒杀价最多填写两位小数');
				}
			}
		} else {
			AjaxNullTips('请填写秒杀价');
		}
	});
	//需砍价
	$('#ms_xkj').blur(function () {
		if (Number($(this).val()) != '') {
			if (Number($(this).val()) <= 0) {
				$(this).val('');
			} else {
				if (isInteger(Number($(this).val()))) {

				} else {
					$(this).val('');
					AjaxNullTips('需砍价不能填写小数');
				}
			}
		} else {
			AjaxNullTips('请填写需砍价');
		}
	});
	//砍价间隔
	$('#kj_jg').blur(function () {
		if (isInteger(Number($(this).val()))) {

		} else {
			$(this).val('');
			AjaxNullTips('间隔时间不能有小数');
		}
	});
	$('.jl_content_add_lis').on('blur', '.num', function () {
		if (Number($(this).val()) <= 0) {
			$(this).val('');
		} else {
			if (isInteger(Number($(this).val()))) {

			} else {
				$(this).val('');
				AjaxNullTips('人数不能填写小数');
			}
		}
	});
	$('.jl_content_add_lis').on('blur', '.successPrice', function () {
		if (Number($(this).val()) < Number($('#ms_yj').val())) {
			if (Number($(this).val()) != '') {
				if (Number($(this).val()) < 0.01) {
					$(this).val('');
					AjaxNullTips('价格不可小于0.01');
				} else {
					if (isMoney(Number($(this).val()))) {

					} else {
						$(this).val('');
						AjaxNullTips('价格最多填写两位小数');
					}
				}
			}
		} else {
			$(this).val('');
			AjaxNullTips('价格不能大于商品原价');
		}
	});
	//展开收起
	$('.pt_nojion_list_open').click(function () {
		if ($(this).text().indexOf('展开')) {
			$('.ms_list_ul').css('max-height', '1.2rem');
			$('.pt_nojion_list_open').html('展开<img src="../images/icon/open_pt_list-f2264a1c80.png" >');
		} else {
			$('.ms_list_ul').css('max-height', 'none');
			$('.pt_nojion_list_open').html('收回<img src="../images/icon/open_pt_list-f2264a1c80.png" style="-webkit-transform:rotate(180deg);transform:rotate(180deg);">');
		}
	});
	//报名，砍价切换
	$('.radios').click(function () {
		var radio_index = $(this).index();
		if (bm_state == false) {
			if ($(this).attr('data-name') == 'mannum') {
				AjaxNullTips('活动有报名者，不可修改秒杀形式');
			} else {
				AjaxNullTips('活动有报名者，不可修改费用');
			}
		} else {
			if ($(this).attr('data-name') == 'paynum') {
				var edit_bm_index = $('.bm_content>li').children('.radios_checked').index();
				if (edit_bm_index == 1) {
					$(this).parent().find('.radios').removeClass('radios_checked');
					$(this).parent().find('.radios').eq(1).addClass('radios_checked');
					$('#needPriceRules_span').show();
					$('#needPriceRules').show();
					payType = 1;
				} else {
					$(this).parent().find('.radios').removeClass('radios_checked');
					$(this).parent().find('.radios').eq(0).addClass('radios_checked');
					$('#needPriceRules_span').hide();
					$('#needPriceRules').hide();
					payType = 0;
				};
			} else {
				var edit_bm_indexs = $(this).attr('data-index');
				if (edit_bm_indexs == 1) { //砍价秒杀
					$(this).parent().parent().find('.radios').removeClass('radios_checked');
					$(this).parent().find('.radios').eq(0).addClass('radios_checked');
					$('.ms_bm_content').hide();
					$('#kj_ms').show();
					ms_type = 82;
					$('#get_rule_text').val('1、点击页面按钮“我要报名”参加活动。\n' +
						'2、秒杀开始前，砍到秒杀价即可获得秒杀资格。\n' +
						'3、报名者自己每**小时可以给自己砍价一次。别人可以帮忙砍价，（每个人/包括报名者）只能帮忙一次。\n' +
						'4、担心抢不到？可以邀请好友帮抢哦！人越多抢到的几率越大！\n' +
						'5、秒杀倒计时结束后准时开抢，记得提前做准备！\n' +
						'6、成功抢到秒杀商品的用户，马上联系商家领取吧！\n' +
						'7、活动最终解释权归商家所有，与来店吧无关。');
				} else { // 报名秒杀
					$('#ms_ul>li').parent().parent().find('.radios').removeClass('radios_checked');
					$(this).parent().find('.radios').eq(0).addClass('radios_checked');
					$('.ms_bm_content').show();
					$('#kj_ms').hide();
					ms_type = 81;
					$('#get_rule_text').val('秒杀价：报名人数越多，秒杀价格越低，如秒杀开始前未达到第一档，则无法达到秒杀要求。\n' +
						'1、点击“我要报名”获取秒杀资格。\n' +
						'2、将活动发送给好友一起参加，人越多秒杀价越低！\n' +
						'3、担心抢不到？可以邀请好友帮抢哦！人越多抢到的几率越大！\n' +
						'4、秒杀倒计时结束后准时开抢，记得提前做准备！\n' +
						'5、成功抢到秒杀商品的用户，马上联系商家领取吧！\n' +
						'6、活动最终解释权归商家所有，与来店吧无关。');
				};
			}
		}
	});
	//必填项选择
	$('.bm_lock').click(function () {
		if (bm_state == false) {
			AjaxNullTips('活动已有报名者，不可修改信息收集');
		} else {
			if ($(this).attr('class').indexOf('bm_lock_checked') != -1) {
				$(this).removeClass('bm_lock_checked');
			} else {
				$(this).addClass('bm_lock_checked');
			}
		}
	});
	//拼团删除规格  //需要
	$('.ms_bm_content').on('click', '.jl_content_add_lis>li>i', function () {
		var add_li_length = $('.jl_content_add_lis>li').find('i').length;
		if (bm_state) {
			if (add_li_length == 2) {
				$(this).parent().remove();
				$('.jl_content_add_lis').find('li').eq(0).find('i').hide();
			} else {
				$(this).parent().remove();
				$('#add_li_pt').show();
			};
			event.stopPropagation();
		}
	});
	//拼团增加规格    //需要
	$('#add_li_pt').click(function () {
		if (bm_state) {
			var add_li_length = $('.jl_content_add_lis').find('i').length;
			$('.jl_content_add_lis').find('li').eq(0).find('i').show();
			if (add_li_length == 5) {
				AjaxNullTips('最多5条规格');
				return false;
			} else if (add_li_length < 5) {
				var add_class = '';
				var class_name = $('.banner_mb_tab>div>ul').children('.banner_mb_tab_img_active').attr('data-index');
				$('.jl_content_add_lis').append('<li class="finah">' +
					'<span class="jl_content_span"><e class="all_tips" style="line-height: .25rem;">&lowast;</e>报名人数</span>' +
					'<input class="content_input pt_input_border num" type="number" value="" />' +
					'<span class="jl_content_add_li_span_2">人</span>' +
					'<span class="jl_content_add_li_span_3"><e class="all_tips" style="line-height: .25rem;">&lowast;</e>价格</span>' +
					'<input class="content_input pt_input_border successPrice" type="number" value="" />' +
					'<span class="jl_content_add_li_span_2">元</span>' +
					'<i></i>' +
					'</li>');
				if (add_li_length == 4) {
					$('#add_li_pt').hide();
				};
			}
		}
	});
	$('#needPriceRules').blur(function () {
		if (Number($('#needPriceRules').val()) < 0.01) {
			AjaxNullTips('费用必须大于0.01元');
			$('#needPriceRules').val('');
		} else {
			if (isMoney(Number($(this).val()))) {
				if (ms_type == 81) {
					if (Number($('#needPriceRules').val()) > Number($('.jl_content_add_lis>li').last().find('.successPrice').val())) {
						$(this).val('');
						AjaxNullTips('费用不能大于最后一档价格');
					}
				} else {
					if (Number($('#needPriceRules').val()) > Number($('.ms_msj').val())) {
						$(this).val('');
						AjaxNullTips('费用不能大于秒杀价');
					}
				}
			} else {
				$(this).val('');
				AjaxNullTips('费用最多填写两位小数');
			}
		};
	});
	//上传文件
	$('#file').click(function () {
		$('#pics').click();
	});
	//拍照
	$('#to_camera').click(function () {
		$('#to_cameras').click();
	});
	$('#pics').change(function () {
		ImgUpdata($(this));
	});
	$('#to_cameras').change(function () {
		ImgUpdata($(this));
	});
	$('.img_upload_y>em').click(function () {
		$(this).parent().prev().show();
		$(this).parent().hide();
	});
	
	$('#add_pic').click(function () {
		        addIntroduce('image', 'add', 6);
	});
	//显示隐藏图片上传选项
	$('#change_img').click(function () {
		img_types = 0;
		/**
		 * liuya -- 优化更换图片
		 *
		 *  计算活动快的位置，和滚动区域的位置，是的选中的图片运动到屏幕中间
		 * **/
		scroll_pic.refresh();
		scroll_pic_class.refresh();
		var clientW = $(window).width();
		if ($('.industry_img').width() > clientW && $('.industry_img_active').length != 0) {
			var active_left = $('.industry_img_active').find('img').offset().left; // 获取元素距离屏幕左侧的距离
			var activeImgW = $('.industry_img_active').find('img').width(); // 每个行业缩略图的宽度
			var disTanceHalfClient = active_left - (clientW / 2) + (activeImgW / 2);  // 距离屏幕中间的距离
			var disTaceBoxClient = $('.industry_img').offset().left; //滑动块距离屏幕的距离
			// 边界限制
			var animateW = disTaceBoxClient - disTanceHalfClient;
			animateW = animateW > 0 ? 0 : animateW;
			animateW = animateW < -($('.industry_img').width() - clientW) ? -($('.industry_img').width() - clientW) : animateW;
			// $('.industry_img').animate({
			// 	transform: 'translate(' + animateW + 'px,0)'
			// })
			scroll_pic.scrollTo(animateW, 0);
		}
		//***********************************************//
		$('body').css('overflow-y', 'hidden');
		$('.industry_img_list').animate({ bottom: '0rem' }, 200);
		$('.banner_mb_tab').animate({ bottom: '-5rem' }, 200);
	});
	$('.upload_img_industry').click(function () {
		if (img_state == 1) {
			if (navigators == 'android') {
				img_types = 0;
				ImgShowOrHide(true);
				// $('.industry_img_list').animate({ bottom: '-5rem' }, 200);
				// $('.bargain_btn').animate({ bottom: '-3rem' }, 200);
			} else {
				img_types = 0;
				$('#pics').val('');
				$('#pics').click();
			}
		} else {
			AjaxNullTips('图片正在上传请稍后操作');
		}
	});
	$('#close_img_tab').click(function () {
		img_types = 0;
		img_types_this = '';
		ImgShowOrHide(false);
		$('.bargain_btn').animate({ bottom: '0rem' }, 200);
	});
	$('#bargain_describe_img').click(function () {
		addGoodsDesc(4);
	});
	//监听input 框内容，（为实现是否确定按钮重置）
	$('.layer_information').find('#inform_tel').on('input propertychange', function () {
		var tel_val = $(this).val();
		if ($('#inform_name').val() != '') {
			if (tel_val.length == 11) {
				var re = /^1[34578]\d{9}$/;
				if (re.test(tel_val)) {
					$('#information_clk').addClass('layer_information_div');
				} else {
					AjaxNullTips('手机号码格式错误');
				}
			} else {
				$('#information_clk').removeClass('layer_information_div');
			};
		};
	});
	$('.layer_information').find('#inform_name').on('input propertychange', function () {
		var name_val = $(this).val();
		if (name_val.length > 0) {
			if ($('#inform_tel').val() != '') {
				if ($('#inform_tel').val().length == 11) {
					var re = /^1[34578]\d{9}$/;
					if (re.test($('#inform_tel').val())) {
						$('#information_clk').addClass('layer_information_div');
					} else {
						AjaxNullTips('手机号码格式错误');
					}
				};
			}
		} else {
			$('#information_clk').removeClass('layer_information_div');
		}
	});


	//弹出分享弹窗
	$('#layer_share').click(function () {
		if ($(this).text() != '活动已结束' && $(this).text() != '活动已下架' && $(this).text() != '活动未开始' && $(this).text() != '活动已满员') {
			$('.layer_fx_bj').show().animate({'top':'0rem'},500);
			$('.layer_fx_hs').hide();
			$('body').css('overflow-y', 'hidden');
			$('.layer_bj').show();
		}
	});
	$('.layer_i').click(function () {
		$('.layer_bj').hide();
		$('body').css('overflow-y', 'auto');
		$(this).parent().addClass('bounceOutRight').hide();
	});
	$('#share_btn').click(function () {
		$('.layer_bj').hide();
		$('body').css('overflow-y', 'auto');
		$('.layer_share_tips').addClass('bounceOutRight');
	});
	$('#layer_add').click(function () {
		if ($(this).text() != '活动已结束' && $(this).text() != '活动已下架' && $(this).text() != '活动未开始' && $(this).text() != '活动已满员') {
			if ($(this).text() == '砍一刀' && !$(this).hasClass('ms_foot_btn')) {
				Loading('start');
				data_prams = {
					"activityEnrollId": $('#activityEnrollId').val(),
					"referId": $('#referId').val(),
					"currUrl": encodeURIComponent(location),
				};
				var time, uuid, sign, success = false;
				$.ajax({
					type: "post",
					url: globalUrl + '/buyer/getMsBargainMoney.htm' + ajax_date,
					data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
					success: function (data) {
						Loading('end');
						var datas = JSON.parse(data);
						var res = datas.result.data;
						if (datas.status == 200) {
							if (res.activityEnrollId == undefined || res.activityEnrollId == 'undefined') {
								res.activityEnrollId = 'null';
							};
							activityEnrollIds = res.activityEnrollId;
							success = true;
							time = res.wxJsSignDto.timestamp;
							uuid = res.wxJsSignDto.nonceStr;
							sign = res.wxJsSignDto.sign;
							var content=getWXtext(res);
							getWxShareContents_new(time, uuid, sign, res, 'ms', activityEnrollIds,content,'',_forwardId);
							var date = res.endDate;
							date = date.substring(0, 19);
							date = date.replace(/-/g, '/');
							var activity_end_time = new Date(date).getTime() / 1000;
							var dates = res.startDate;
							dates = dates.substring(0, 19);
							dates = dates.replace(/-/g, '/');
							var activity_start_time = new Date(dates).getTime() / 1000;
							var timestamp_end_time = parseInt(new Date().getTime() / 1000);
							if (res.isSuccess == 1) {
								if (res.isBargin == 310) {
									$('.ms_kj_lock_bj_500>label').text(res.enrollName);
									$('#ms_xj_500').text(res.currentPrice);
									$('#ms_kd_500').text(res.barginPrice);
									$('#ykcs').text(res.bargainNum);
									$('#zgkjcs').text(res.needBargin);
									if (isInteger(res.successPrice)) {
										$('#kj_jg_500').text(parseInt(res.successPrice));

									} else {
										$('#kj_jg_500').text(res.successPrice);
									}
									$('.layer_bj').show();
									$('#layer_landliness').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
									$('body').css('overflow-y', 'hidden');
								} else if (res.isBargin == 316) {
									AjaxNullTips('已经砍到最低价');
								} else if (res.isBargin == 313) {
									AjaxNullTips('你已经帮TA砍过了');
								} else if (res.isBargin == 314) {
									AjaxNullTips('不可以帮自己重复砍价');
								}
								if (timestamp_end_time < activity_start_time) {
									$('#layer_add').addClass('ms_foot_btn');
									$('#layer_add').text('立即秒杀');
								} else if (activity_end_time > timestamp_end_time && timestamp_end_time > activity_start_time) {
									$('#layer_add').text('立即秒杀');
								}
							} else {
								if (res.isBargin == 310) {
									$('.ms_kj_lock_bj_500>label').text(res.enrollName);
									$('#ms_xj_500').text(res.currentPrice);
									$('#ms_kd_500').text(res.barginPrice);
									$('#ykcs').text(res.bargainNum);
									$('#zgkjcs').text(res.needBargin);
									if (isInteger(res.successPrice)) {
										$('#kj_jg_500').text(parseInt(res.successPrice));

									} else {
										$('#kj_jg_500').text(res.successPrice);
									}
									$('body').css('overflow-y', 'hidden');
									$('.layer_bj').show();
									$('#layer_landline').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
									$('#ues_name').text(res.enrollName);
									$('#layer_landline_num').html(res.barginPrice + '元');
									if (res.oneselfBarginTime == 0) {
										$('#layer_add').addClass('ms_foot_btn');
										$('#layer_add').text('立即秒杀');
									} else {
										$('#layer_add').addClass('ms_foot_btn');
										$('#layer_add').text('再砍一刀');
										$('.foot_to_c_pt_li>ul>span').show();
										SetTimes(res.bargainNextTime);
									}
								} else if (res.isBargin == 316) {
									AjaxNullTips('已经砍到最低价');
								} else if (res.isBargin == 313) {
									AjaxNullTips('你已经帮TA砍过了');
								} else if (res.isBargin == 314) {
									AjaxNullTips('不可以帮自己重复砍价');
								}
							};

							$('.banner_top').children('li').eq(0).children('i').text(res.visitNum);
							$('.banner_top').children('li').eq(1).children('i').text(res.shareNum);
							$('.banner_top').children('li').eq(2).children('i').text(res.enrollNum);
							$('.prev_list_kj>ul>li').remove();

							if (ms_type == 81) {
								if( res.length < 30 ){
									bargainRankingList_length = false;
									$('.list_text').text('已经到底了');
								};
								$('.prev_list_kj>ul').append('<li>' +
									'<ul>' +
										'<li style="width:20% !important ;" >排名</li>' +
										'<li style="width:30% !important ;">姓名</li>' +
										'<li style="width:50% !important ;">日期</li>' +
									'</ul>' +
									'</li>');
								for (var i = 0; i < res.length; i++) {
									var first_name = res[i].name.substring(0, 1);
									var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
									var fina_name = first_name + '*' + last_name;
									$('.prev_list_kj>ul').append('<li>' +
										'<ul>' +
										'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
										'<li style="width: 30% !important;">' + fina_name + '</li>' +
										'<li style="width: 50% !important;">' + formatDate(res[i].date) + '</li>' +
										'</ul>' +
										'</li>');
								};
							} else {
								if( res.length < 30 ){
									bargainRankingList_length = false;
									$('.list_text').text('已经到底了');
								};
								$('.prev_list_kj>ul').append('<li>' +
									'<ul>' +
										'<li style="width:20% !important ;" >排名</li>' +
										'<li style="width:30% !important ;">姓名</li>' +
										'<li style="width:50% !important ;">价格</li>' +
									'</ul>' +
									'</li>');
								for (var i = 0; i < res.length; i++) {
									var first_name = res[i].name.substring(0, 1);
									var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
									var fina_name = first_name + '*' + last_name;
									$('.prev_list_kj>ul').append('<li>' +
										'<ul>' +
										'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
										'<li style="width: 30% !important;">' + fina_name + '</li>' +
										'<li style="width: 50% !important;">' + res[i].currentPrice + '</li>' +
										'</ul>' +
										'</li>');
								};
							}
						} else if (datas.status == '001' || datas.status == '002' || datas.status == 400 || datas.status == 406) {
							Loading('end');
							AjaxNullTips(datas.result.message);
						} else if (datas.status == 701) {
							window.location.href = globalUrl + '/error.htm?code=' + datas.status;
						};
					},
					error: function () {
						Loading('end');
						AjaxErrorTips();
					}
				});
			} else if ($(this).text() == '我要报名' && !$(this).hasClass('ms_foot_btn')) {
				var ints = setInterval("input_val()", 200);
				$('.layer_information').find('.bm_add_input').remove();
				if (!!bm_layer_info) {
					for (var i = 2; i < bm_layer_info.length; i++) {
						$('#information_clk').before('<input type="text" data-name="' + unescape(bm_layer_info[i].collectName) + '" class="bm_add_input" data="' + unescape(bm_layer_info[i].collectType) + '"  placeholder="请输入' + unescape(bm_layer_info[i].collectName) + '" />');
					};
				}
				Topsrcoll();
				$('.layer_information').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
				$('.layer_bj').show();
				$('body').css('overflow-y', 'hidden');
			} else if ($(this).text() == '立即秒杀' && !$(this).hasClass('ms_foot_btn')) {

				if (!to_pay_btn) {
					return false;
				};
				to_pay_btn = false;
				var activityId = $('#activityEnrollId').val(),
					referId = $('#referI').val();
				if (referId == null || referId == 'null') {
					data_prams = {
						"activityEnrollId": activityId,
						"referId": 0,
					};
				} else {
					data_prams = {
						"activityId": activityId,
						"referId": referId,
					};
				};

				$.ajax({
					type: "post",
					url: globalUrl + '/buyer/msController.htm' + ajax_date,
					data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
					success: function (data) {
						var datas = JSON.parse(data);
						var res = datas.result.data;

						if (datas.status == 200) {
							if (payType == 1) {
								var appId = res.wxPayResponse.wxh5PayDto.appid;
								var timeStamp = res.wxPayResponse.wxh5PayDto.timeStamp;
								var nonceStr = res.wxPayResponse.wxh5PayDto.nonceStr;
								var packageval = res.wxPayResponse.wxh5PayDto.packageValue;
								var signType = res.wxPayResponse.wxh5PayDto.signType;
								var paySign = res.wxPayResponse.wxh5PayDto.paySign;
								if (is_mini) {
									// 在小程序
									var params = {
										timeStamp: timeStamp,
										nonceStr: nonceStr,
										prepay_id: packageval.slice(10),
										signType: signType,
										paySign: paySign
									}
									var path = '/pages/wxpay/wxpay?params=' + encodeURIComponent(JSON.stringify(params));
									wx.miniProgram.redirectTo({url: path})
								} else {
									if (typeof WeixinJSBridge == "undefined") {
										if (document.addEventListener) {
											document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
										} else if (document.attachEvent) {
											document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
											document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
										}
									} else {
										onBridgeReady(); // 执行
									}
								}
								function onBridgeReady() {
									WeixinJSBridge.invoke(
										'getBrandWCPayRequest', {
											"appId": appId,     //公众号名称，由商户传入
											"timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
											"nonceStr": nonceStr, //随机串
											"package": packageval,
											"signType": signType,         //微信签名方式：
											"paySign": paySign //微信签名
										},
										function (res) {
											if (res.err_msg == "get_brand_wcpay_request:ok") {
												to_pay_btn = true;
												PaymentSuccessfulms(getUrlParam('activityId'));
											} else {
												to_pay_btn = true;
											}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
										}
									);
								};
							} else {
								to_pay_btn = true;
								$('body').css('overflow-y', 'hidden');
								$('#userDarwPrize').show().removeClass('bounceOutTop').addClass('animated bounceInTop');
								setTimeout(function () {
									location = location;
								}, 3000);
							}
						} else if (datas.status == 507) {
							to_pay_btn = true;
							$('body').css('overflow-y', 'hidden');
							$('.com_mask').show();
							$('.pop_title').text('已经被抢光了，下次早点来哦！');
						} else {
							to_pay_btn = true;
							AjaxNullTips(datas.result.message);
							setTimeout(function () {
								location = location;
							}, 3000);
						}
					}
				});
			} else if ($(this).text() == '返回我的页面' && !$(this).hasClass('ms_foot_btn')) {
				var activityid = $(this).attr('data-activityid');
				var buyerActivityEnrollId = $(this).attr('data-buyeractivityenrollid');
				window.location.href = '../kj/ms-5a4b21b850.html?activityId=' + activityid + '&activityEnrollId=' + buyerActivityEnrollId;
			};
		};
	});







	$('.layer_information').on('click', '.layer_information_div', function () {
		if (!to_pay_btn) {
			return false;
		};
		to_pay_btn = false;
		var activityId = getUrlParam('activityId'),
			referId = getUrlParam('referId'),
			infoCollect = [];
		for (var i = 0; i < $('.layer_information').children('input').length; i++) {
			infoCollect.push({
				"collectName": $('.layer_information').children('input').eq(i).attr('data-name'),
				"collectValue": $('.layer_information').children('input').eq(i).val(),
				"collectType": $('.layer_information').children('input').eq(i).attr('data')
			});
		}
		if (referId == null || referId == 'null') {
			var data_prams = {
				"activityId": activityId,
				"referId": 0,
				"infoCollect": infoCollect,
				"currUrl": encodeURIComponent(location),
			};
		} else {
			var data_prams = {
				"activityId": activityId,
				"referId": referId,
				"infoCollect": infoCollect,
				"currUrl": encodeURIComponent(location),
			};
		};
		var time, uuid, sign, success = false;
		$.ajax({
			type: "post",
			url: globalUrl + '/buyer/enrollMsActivity.htm' + ajax_date,
			data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
			success: function (data) {
				var datas = JSON.parse(data);
				var res = datas.result.data;
				if (datas.status == 200) {
					if (res.activityEnrollId == undefined || res.activityEnrollId == 'undefined') {
						res.activityEnrollId = 'null';
					};
					activityEnrollIds = res.activityEnrollId;
					AjaxNullTips('报名成功');
					var date = res.endDate;
					date = date.substring(0, 19);
					date = date.replace(/-/g, '/');
					var activity_end_time = new Date(date).getTime() / 1000;
					var dates = res.startDate;
					dates = dates.substring(0, 19);
					dates = dates.replace(/-/g, '/');
					var activity_start_time = new Date(dates).getTime() / 1000;
					var timestamp_end_time = parseInt(new Date().getTime() / 1000);
					to_pay_btn = true;
					$('.layer_bj').hide();
					$('.layer_information').addClass('bounceOutRight').hide();
					var datas = JSON.parse(data);
					var res = datas.result.data;
					$('.ms_kj_lock_bj').hide();
					$('.ms_kj_lock_bj_500').show();
					$('body').css('overflow', 'auto');
					$('.banner_top').children('li').eq(0).children('i').text(res.visitNum);
					$('.banner_top').children('li').eq(1).children('i').text(res.shareNum);
					$('.banner_top').children('li').eq(2).children('i').text(res.enrollNum);
					var content=getWXtext(res);
					getWxShareContents_new(time, uuid, sign, res, 'ms', activityEnrollIds,content,'',_forwardId);
					if (res.activityType == 81) {
						ms_type = 81;
						$('.ms_bm_box>ul').find('li').remove();
						$('.ms_kj_prev').hide();
						$('#ranking_lists').text('报名进行时');
						$('#branking_lists_content>ul>li').eq(2).text('报名时间');
						var ss = '';
						for (var i of res.teamType) {
							if (res.enrollNum < i.num) {
								$('.ms_bm_box>ul').append('<li class="ms_bm_unlock">' +
									'<div class="ms_bm_lock_one">' +
									'<span>满</span>' +
									'<span style="padding-top: .1rem;"><em>' + i.num + '</em>人</span>' +
									'</div>' +
									'<div class="ms_bm_lock_two">' +
									'<i>&nbsp;</i>' +
									'<span>¥<em>' + i.successPrice + '</em>元</span>' +
									'</div>' +
									'</li>');
							} else {
								$('.ms_bm_box>ul').append('<li class="ms_bm_lock ">' +
									'<div class="ms_bm_lock_one">' +
									'<span>满</span>' +
									'<span style="padding-top: .1rem;"><em>' + i.num + '</em>人</span>' +
									'</div>' +
									'<div class="ms_bm_lock_two">' +
									'<i>&nbsp;</i>' +
									'<span>¥<em>' + i.successPrice + '</em>元</span>' +
									'</div>' +
									'</li>');
							}
							ss = i.num;
						};
						$('.ms_bm_box>ul>li.ms_bm_lock').last().find('i').text('当前秒杀价');
						$('.ms_bm_line').css('height', $('.ms_bm_box').height() + 'px');
						var ah = res.enrollNum / i.num * 100;
						if (ah > 100) {
							ah = 100;
						};
						$('.ms_bm_line_box').css('top', ah + '%');
						$('.ms_bm_line_bj').css('height', ah + 1 + '%');
						if (ah == 100) {
							var hh = $('.ms_bm_line_box').position().top;
							$('.ms_bm_line_box').css('top', hh - 12 + 'px');
						}
						if (activity_start_time > timestamp_end_time) {
							$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
						} else if (activity_start_time < timestamp_end_time < activity_end_time) {
							$('#layer_add').text('立即秒杀');
						}

						$('.prev_list_kj>ul>li').remove();

						if (ms_type == 81) {
							if( res.length < 30 ){
								bargainRankingList_length = false;
								$('.list_text').text('已经到底了');
							};
							$('.prev_list_kj>ul').append('<li>' +
								'<ul>' +
									'<li style="width:20% !important ;" >排名</li>' +
									'<li style="width:30% !important ;">姓名</li>' +
									'<li style="width:50% !important ;">日期</li>' +
								'</ul>' +
								'</li>');
							for (var i = 0; i < res.length; i++) {
								var first_name = res[i].name.substring(0, 1);
								var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
								var fina_name = first_name + '*' + last_name;
								$('.prev_list_kj>ul').append('<li>' +
									'<ul>' +
									'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
									'<li style="width: 30% !important;">' + fina_name + '</li>' +
									'<li style="width: 50% !important;">' + formatDate(res[i].date) + '</li>' +
									'</ul>' +
									'</li>');
							};
						} else {
							if( res.length < 30 ){
								bargainRankingList_length = false;
								$('.list_text').text('已经到底了');
							};
							$('.prev_list_kj>ul').append('<li>' +
								'<ul>' +
									'<li style="width:20% !important ;" >排名</li>' +
									'<li style="width:30% !important ;">姓名</li>' +
									'<li style="width:50% !important ;">价格</li>' +
								'</ul>' +
								'</li>');
							for (var i = 0; i < res.length; i++) {
								var first_name = res[i].name.substring(0, 1);
								var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
								var fina_name = first_name + '*' + last_name;
								$('.prev_list_kj>ul').append('<li>' +
									'<ul>' +
									'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
									'<li style="width: 30% !important;">' + fina_name + '</li>' +
									'<li style="width: 50% !important;">' + res[i].currentPrice + '</li>' +
									'</ul>' +
									'</li>');
							};
						}
					} else {
						ms_type = 82;
						if (res.isSuccess == 1) {
							if (res.isBargin == 310) {
								$('.ms_kj_lock_bj_500>label').text(res.enrollName);
								$('#ms_xj_500').text(res.currentPrice);
								$('#ms_kd_500').text(res.barginPrice);
								$('#ykcs').text(res.bargainNum);
								$('#zgkjcs').text(res.needBargin);
								if (isInteger(res.successPrice)) {
									$('#kj_jg_500').text(parseInt(res.successPrice));
								} else {
									$('#kj_jg_500').text(res.successPrice);
								}
								$('.layer_bj').show();
								$('#layer_landliness').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
								$('body').css('overflow-y', 'hidden');
							} else if (res.isBargin == 316) {
								AjaxNullTips('已经砍到最低价');
							} else if (res.isBargin == 313) {
								AjaxNullTips('你已经帮TA砍过了');
							} else if (res.isBargin == 314) {
								AjaxNullTips('不可以帮自己重复砍价');
							}
							if (timestamp_end_time < activity_start_time) {
								$('#layer_add').addClass('ms_foot_btn');
								$('#layer_add').text('立即秒杀');
							} else if (activity_end_time > timestamp_end_time && timestamp_end_time > activity_start_time) {
								$('#layer_add').text('立即秒杀');
							}
						} else {
							if (res.isBargin == 310) {
								$('.ms_kj_lock_bj_500>label').text(res.enrollName);
								$('#ms_xj_500').text(res.currentPrice);
								$('#ms_kd_500').text(res.barginPrice);
								$('#ykcs').text(res.bargainNum);
								$('#zgkjcs').text(res.needBargin);
								if (isInteger(res.successPrice)) {
									$('#kj_jg_500').text(parseInt(res.successPrice));

								} else {
									$('#kj_jg_500').text(res.successPrice);
								}
								$('body').css('overflow-y', 'hidden');
								$('.layer_bj').show();
								$('#layer_landline').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
								$('#ues_name').text(res.enrollName);
								$('#layer_landline_num').html(res.barginPrice + '元');
								if (res.oneselfBarginTime == 0) {
									$('#layer_add').addClass('ms_foot_btn');
									$('#layer_add').text('立即秒杀');
								} else {
									$('#layer_add').addClass('ms_foot_btn');
									$('#layer_add').text('再砍一刀');
									$('.foot_to_c_pt_li>ul>span').show();
									SetTimes(res.bargainNextTime);
								}
							} else if (res.isBargin == 316) {
								AjaxNullTips('已经砍到最低价');
							} else if (res.isBargin == 313) {
								AjaxNullTips('你已经帮TA砍过了');
							} else if (res.isBargin == 314) {
								AjaxNullTips('不可以帮自己重复砍价');
							}
						}
						$('.prev_list_kj>ul>li').remove();
						$('.prev_list_kj>ul').append('<li>' +
							'<ul>' +
							'<li style="width:20% !important ;">排名</li>' +
							'<li style="width:30% !important ;">姓名</li>' +
							'<li style="width:50% !important ;">当前价格</li>' +
							'</ul>' +
							'</li>');
						if (ms_type == 81) {
							if( res.length < 30 ){
								bargainRankingList_length = false;
								$('.list_text').text('已经到底了');
							};
							$('.prev_list_kj>ul').append('<li>' +
								'<ul>' +
									'<li style="width:20% !important ;" >排名</li>' +
									'<li style="width:30% !important ;">姓名</li>' +
									'<li style="width:50% !important ;">日期</li>' +
								'</ul>' +
								'</li>');
							for (var i = 0; i < res.length; i++) {
								var first_name = res[i].name.substring(0, 1);
								var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
								var fina_name = first_name + '*' + last_name;
								$('.prev_list_kj>ul').append('<li>' +
									'<ul>' +
									'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
									'<li style="width: 30% !important;">' + fina_name + '</li>' +
									'<li style="width: 50% !important;">' + formatDate(res[i].date) + '</li>' +
									'</ul>' +
									'</li>');
							};
						} else {
							if( res.length < 30 ){
								bargainRankingList_length = false;
								$('.list_text').text('已经到底了');
							};
							$('.prev_list_kj>ul').append('<li>' +
								'<ul>' +
									'<li style="width:20% !important ;" >排名</li>' +
									'<li style="width:30% !important ;">姓名</li>' +
									'<li style="width:50% !important ;">价格</li>' +
								'</ul>' +
								'</li>');
							for (var i = 0; i < res.length; i++) {
								var first_name = res[i].name.substring(0, 1);
								var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
								var fina_name = first_name + '*' + last_name;
								$('.prev_list_kj>ul').append('<li>' +
									'<ul>' +
									'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
									'<li style="width: 30% !important;">' + fina_name + '</li>' +
									'<li style="width: 50% !important;">' + res[i].currentPrice + '</li>' +
									'</ul>' +
									'</li>');
							};
						}
					}

				} else if (datas.status == 701) {
					window.location.href = globalUrl + '/error.htm?code=' + datas.status;
				} else {
					to_pay_btn = true;
					AjaxNullTips(datas.result.message);
				};
			},
			error: function () {
				to_pay_btn = true;
				AjaxErrorTips();
			}
		});
	});


	$(document).on('click', '.bargain_introduce_tab_pic', function () {
		if (img_state == 1) {
			if (navigators == 'android') {
				img_types = 2;
				img_types_this = $(this);
				ImgShowOrHide(true);
				// $('.bargain_btn').animate({ bottom: '-3rem' }, 200);
			} else {
				img_types = 2;
				img_types_this = $(this);
				$('#pics').val('');
				$('#pics').click();
			}
		} else {
			AjaxNullTips('图片正在上传请稍后操作');
		}
	});


	$('.landline_clkss').click(function () {
		$('body').css('overflow-y', 'auto');
		$('.layer_bj').hide();
		$('#layer_landliness').addClass('bounceOutRight');
	});
	$('.landline_clk').click(function () {
		$('body').css('overflow-y', 'auto');
		$('.layer_bj').hide();
		$('#layer_landline').addClass('bounceOutRight');
	});


	//拼团预览
	$('#pt_preview').click(function () {
		if (img_state == 1) {
			createPtActivity('preview');
			var activityId = getUrlParam('activityId');
			var type = getUrlParam('type');
			if (preview_type != false) {
				window.location.href = '../kj/ms_preview-134af8ab4e.html?activityId=' + activityId + '&type=' + type + '&from=edit';
			};
		} else {
			AjaxNullTips('图片正在上传请稍后保存');
		}
	});


	//拼团保存
	$('#pt_save').click(function () {
		if ($(this).text() == '保存') {
			if (img_state == 1) {
				$(this).text('保存中...');
				$('.loadings').show();
				if (getUrlParam('activityId') == null || getUrlParam('activityId') == null) {//知道是否有ID，判断是创建还是编辑
					createPtActivity('save');
				} else {
					if (getUrlParam('type') == "copy") {//知道收为copy，判断是否是复制进来
						createPtActivity('copy');
						return false;
					}
					createPtActivity('maker');
				};
			} else {
				AjaxNullTips('图片正在上传请稍后保存');
			}
		}


	});



	//预览页面的保存
	$('#pt_saves').click(function () {
		if ($(this).text() == '保存') {
			$(this).text('保存中...');
			$('.loadings').show();
			var url = '';
			var data_prams = sessionStorage.getItem('ms');
			if (getUrlParam('activityId') == null || getUrlParam('activityId') == 'null') {
				url = '/seller/createMsActivity.htm';
			} else {
				if (getUrlParam('type') == 'null' || getUrlParam('type') == null) {
					url = '/seller/updateMsActivity.htm';
					data_prams = JSON.parse(data_prams);
					data_prams['activityId'] = getUrlParam('activityId');
					data_prams = JSON.stringify(data_prams);
				} else {
					url = '/seller/createMsActivity.htm';
				}
			};
			$.ajax({
				type: 'post',
				url: globalUrl + url + ajax_date,
				data: 'params={"data":' + encodeURI(data_prams) + '}' + isDebug,
				success: function (data) {
					var datas = JSON.parse(data);
					if (datas.status == 200) {
						if (getUrlParam('activityId') != null) {
							if (sessionStorage.getItem(getUrlParam('activityId')) != null) {
								sessionStorage.removeItem(getUrlParam('activityId'));
							};
						};
						$('.loadings').hide();
						AjaxNullTips('保存成功');
						setTimeout(function () {
							$('.loadings').hide();
							$('#pt_saves').text('保存');
							sessionStorage.removeItem('hisPosData'); // 清楚我的活动列表的信息（记录离开时滚动的位置）
							// 数推环境跳转至素材页面
							if(sessionStorage.getItem('stEnv') === 'st'){
								markSt();
							} else {
								window.location.href = '../activity_list-36eef3226e.html';
							}
						}, 3000);
					} else if (datas.status == '002') {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('参数异常');
					} else if (datas.status == 400) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('活动信息异常');
					} else if (datas.status == 301) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('已有报名者，活动开始日期不可修改');
					} else if (datas.status == 302) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('活动已开始，不可修改信息');
					} else if (datas.status == 303) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('已有报名者，活动原价不可修改 ');
					} else if (datas.status == 304) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('已有报名者，活动预付价不可修改');
					} else if (datas.status == 305) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('已有报名者，商品数量不可减少');
					} else if (datas.status == 306) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('已有报名者，拼团参团信息不可修改');
					} else if (datas.status == 307) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('修改秒杀活动失败');
					} else if (datas.status == 403) {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						AjaxNullTips('活动已下架，不可修改');
					} else if (datas.status == '046') {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						monkeyPop('isFirst');
					} else if (datas.status == '047') {
						$('.loadings').hide();
						$('#pt_saves').text('保存');
						monkeyPop('isDue');
					} else if (datas.status == 700) {
						window.location.href = globalUrl + '/error.htm?code=' + datas.status;
					} else if (datas.status == 702) {
						window.location.href = globalUrl + '/error.htm?code=' + datas.status;
					};
				},
				error: function () {
					$('.loadings').hide();
					$('#pt_saves').text('保存');
					AjaxErrorTips();
				}
			});
		}
	})


	//创建秒杀活动
	function createPtActivity(type) {
		preview_type = true;
		var pt_banner = '',                 //banner url
			pt_title = escape($('#pt_title').val()),                        //标题
			pt_start_time = $('#end_time').text(),                 		//开始时间
			ms_xs = $('#ms_xs').val(),                                      //秒杀限时
			pt_original_price = $('#ms_yj').val(),         		            //原价
			ms_goodsnum = $('#ms_fs').val(),                                 //产品份数
			// ms_type,                                                        //秒杀形式
			pt_team_type = [],                                              //报名秒杀阶梯
			ms_kj_msj = $('#ms_msj').val(),                                 //砍价秒杀——秒杀价
			ms_kj_xkj = $('#ms_xkj').val(),                                 //砍价秒杀——需砍价
			ms_kj_kjjg = $('#kj_jg').val(),                                 //砍价秒杀——砍价间隔
			// payType,                                                        //支付方式 0 线下支付  1线上支付
			needPriceRules = $('#needPriceRules').val(),                    //支付金额
			enrollBenefit = escape($('#ms_content_textarea').val()),                //报名福利
			pt_description_text = escape($('#description_text').val()),     //商品描述（文字）
			// pt_description_img = $('#description_img').attr('src'), 		//商品描述（图片）
			jl_rule_text = escape($('#get_rule_text').val()),                       //活动规则
			pt_get_information_title = escape($('#get_information_title').val()),	//领取信息（标题）
			pt_get_information_text = escape($('#get_information_text').val()),     //领取信息（文字）
			pt_tel = $('#consultation_tel').val(),                          //咨询热线
			pt_themeid = $('#themeId').val(),                               //主题ID
			pt_introduce_content = [],
			addressInfo = {
				'maker': $('#consultation_addAds').attr('data-maker'),
				'address': escape($('#consultation_addAds').text()),
				'title': escape($('#consultation_addAds').attr('data-title')),
				'contacts': escape($('#consultation_name').val()),
				'add': escape($('#consultation_detailsAds').text()),
			},
			pt_introduce_title = $('#sellerIntroduceTitle').val(),
			/*************** 刘亚 -- 音乐和特效（创建活动的时候，保存所选参数） *************/
			ANIMATE = $('#animateBtn').attr('data-am'),
			MUSIC = $('#musicBtn').attr('data-am'),
			/*****************************************/
			//		    jl_enrollNum = $('#enrollNum').val(),
			bm_infoCollect = [], // 添加报名字段信息
			pt_templateTitleList = [];
		var banner_img_data = $('.banner_mb_tab>div>ul').children('.banner_mb_tab_img_active').attr('data');
		banner_img_data = JSON.parse(banner_img_data);
		var _banner_src = [];
		for( var i = 0 ; i < $('.banner').children('img').length ; i ++ ){
			var str = $('.banner').children('img').eq(i).attr('src');
			var m =str.length;
			var n = str.indexOf('?');
			if( n != -1 ){
				var j = str.substring(0,n);
				_banner_src.push(j);
			}else{
				_banner_src.push(str);
			};
		};
		pt_banner = _banner_src.join(',');
		// 新增商品描述多张照片
		var thisImgArr = [];
		$('.addGoodsDescImg').each(function (index, el) {
			if ($(el).children('.add_tab_pic_url').attr('src')) {
				thisImgArr.push($(el).children('.add_tab_pic_url').attr('src'));
			}
		})
		for (var i = 0; i < $('.bm_list_info>li').length; i++) {
			if ($('.bm_list_info>li').eq(i).children('input').val() != '') {
				if ($('.bm_list_info>li').eq(i).children('div').attr('class').indexOf('bm_lock_checked') != -1) {
					bm_infoCollect.push({
						"collectName": escape($('.bm_list_info>li').eq(i).children('input').val()),
						"collectType": 1,
					});
				} else {
					bm_infoCollect.push({
						"collectName": escape($('.bm_list_info>li').eq(i).children('input').val()),
						"collectType": 0,
					});
				}
			};
		};
		var pt_description_img = thisImgArr.join(',');	//商品描述（图片）
		if (ms_type == 81) {
			for (var i = 0; i < $('.jl_content_add_lis>li').length; i++) {
				if ($('.jl_content_add_lis>li').eq(i).children('.num').val() == '') {
					$('.loadings').hide();
					AjaxNullTips('规则设置错误(人数不能为空)');
					$('#pt_saves,#pt_save').text('保存');
					preview_type = false;
					return false;
				}
				if (i != 0) {
					if (Number($('.jl_content_add_lis>li').eq(i).children('.num').val()) <= Number($('.jl_content_add_lis>li').eq(i - 1).children('.num').val())) {
						$('.loadings').hide();
						AjaxNullTips('规则设置错误(从上到下，人数只能增多)');
						$('#pt_saves,#pt_save').text('保存');
						preview_type = false;
						return false;
					};
					if (Number($('.jl_content_add_lis>li').eq(i - 1).children('.successPrice').val()) == '' || Number($('.jl_content_add_lis>li').eq(i - 1).children('.successPrice').val()) == 0 || Number($('.jl_content_add_lis>li').eq(i).children('.successPrice').val()) == '' || Number($('.jl_content_add_lis>li').eq(i).children('.successPrice').val()) == 0) {
						if (Number($('.jl_content_add_lis>li').eq(i - 1).children('.successPrice').val()) < Number($('.jl_content_add_lis>li').eq(i).children('.successPrice').val())) {
							$('.loadings').hide();
							AjaxNullTips('规则设置错误(从上到下，价格不能增加)');
							$('#pt_saves,#pt_save').text('保存');
							preview_type = false;
							return false;
						}
					}

				}
				var successPrice = $('.jl_content_add_lis>li').eq(i).children('.successPrice').val();
				if ($('.jl_content_add_lis>li').eq(i).children('.successPrice').val() == '') {
					successPrice = 0;
				}
				pt_team_type.push({
					"num": $('.jl_content_add_lis>li').eq(i).children('.num').val(),
					"successPrice": successPrice,
					"describe": escape($('.jl_content_add_lis>li').eq(i).children('.jl_text_ms').val())
				});
			};
		} else {

		}

		for (var i = 0; i < $('.add_content').children('.addstyle').length; i++) {
			if ($('.add_content').children('.addstyle').eq(i).attr('class') == 'bargain_introduce_tab_pic addstyle') {
				if ($('.add_content').children('.addstyle').eq(i).children('.add_tab_pic_url').prop('src') != location) {
					pt_introduce_content.push({
						'type': 'image',
						'value': $('.add_content').children('.addstyle').eq(i).children('.add_tab_pic_url').prop('src')
					});
				}
			} else if ($('.add_content').children('.addstyle').eq(i).attr('class') == 'bargain_introduce_tab_text addstyle') {
				if ($('.add_content').children('.addstyle').eq(i).children('.bargain_introduce_tab_text_fous').val() != '') {
					pt_introduce_content.push({
						'type': 'text',
						'value': escape($('.add_content').children('.addstyle').eq(i).children('.bargain_introduce_tab_text_fous').val())
					});
				}
			} else if ($('.add_content').children('.addstyle').eq(i).attr('class') == 'bargain_introduce_tab_video addstyle') {
				var yes_no = '';
				if ($('.add_content').children('.addstyle').eq(i).children('.add_tab_video_content').val() != '') {
					yes_no = Urlckl($('.add_content').children('.addstyle').eq(i).children('.add_tab_video_content').val());
					if (!yes_no) {
						$('.loadings').hide();
						AjaxNullTips('请输入正确视频地址');
						$('#pt_saves,#pt_save').text('保存');
						preview_type = false;
						return false;
					};
					pt_introduce_content.push({
						'type': 'video',
						'value': encodeURIComponent($('.add_content').children('.addstyle').eq(i).children('.add_tab_video_content').val())
					});
				};
			};
		};
		for (var i = 0; i < $('.layer_modify_title_list>li').length; i++) {
			pt_templateTitleList.push({
				'title_id': $('.layer_modify_title_list>li').eq(i).attr('data'),
				'title_name': $('.layer_modify_title_list>li').eq(i).text()
			});
		};

			/**
		 * 收集优惠信息
		 * ***/
		var _couponInfo = {
			"title": escape($('#get_coupon_title').val()),
			"couponDetail": [],
		};
		$('.textMark>.textMark-item').each(function (index, el) {
			var thisItem = {};
			if ($(el).hasClass('textMarkIndex')) {
				thisItem = {
					type: 1,
					value: escape($(el).find('.textMark_input').text())
				}
			} else if ($(el).hasClass('textMarkCoupon')) {
				thisItem = {
					type: 2,
					value: $(el).find('.coupon-review_wrap').attr('data-id')
				}
			}
			_couponInfo.couponDetail.push(thisItem);
		});

		if (ms_kj_kjjg == '' || Number(ms_kj_kjjg) == 0) {
			ms_kj_kjjg = 0;
		};
		if (ms_type == 81) {
			if (payType == 0) {
				if( getUrlParam('templateConfId') == 0 ){
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"teamType": pt_team_type,
						"payType": payType,
						"themeId": pt_themeid,
						"activityRules": jl_rule_text,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                                  //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                     //领取信息
							"getInfoTitle": pt_get_information_title,   //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                           //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						}
					}
				}else{
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"teamType": pt_team_type,
						"payType": payType,
						"themeId": pt_themeid,
						"activityRules": jl_rule_text,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                                  //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                     //领取信息
							"getInfoTitle": pt_get_information_title,   //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                           //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						},
						"templateConfId":getUrlParam('templateConfId'),
					}
				}

			} else {
				if( getUrlParam('templateConfId') == 0 ){
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"teamType": pt_team_type,
						"payType": payType,
						"prepayPrice": needPriceRules,
						"themeId": pt_themeid,
						"activityRules": jl_rule_text,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                   //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                    //领取信息
							"getInfoTitle": pt_get_information_title,           //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                     //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						}
					}
				}else{
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"teamType": pt_team_type,
						"payType": payType,
						"prepayPrice": needPriceRules,
						"themeId": pt_themeid,
						"activityRules": jl_rule_text,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                   //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                    //领取信息
							"getInfoTitle": pt_get_information_title,           //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                     //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						},
						"templateConfId":getUrlParam('templateConfId'),
					}
				};

			}
		} else {
			if (payType == 0) {
				if( getUrlParam('templateConfId') == 0 ){
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"payType": payType,
						"successPrice": ms_kj_msj,
						"needBargin": ms_kj_xkj,
						"oneselfBarginTime": ms_kj_kjjg,
						"themeId": pt_themeid,
						"activityRules": jl_rule_text,
						"teamType": pt_team_type,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                   //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                    //领取信息
							"getInfoTitle": pt_get_information_title,           //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                     //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						}
					}
				}else{
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"payType": payType,
						"successPrice": ms_kj_msj,
						"needBargin": ms_kj_xkj,
						"oneselfBarginTime": ms_kj_kjjg,
						"themeId": pt_themeid,
						"activityRules": jl_rule_text,
						"teamType": pt_team_type,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                   //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                    //领取信息
							"getInfoTitle": pt_get_information_title,           //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                     //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						},
						"templateConfId":getUrlParam('templateConfId'),
					}
				};

			} else {
				if( getUrlParam('templateConfId') == 0 ){
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"payType": payType,
						"successPrice": ms_kj_msj,
						"themeId": pt_themeid,
						"needBargin": ms_kj_xkj,
						"oneselfBarginTime": ms_kj_kjjg,
						"activityRules": jl_rule_text,
						"teamType": pt_team_type,
						"prepayPrice": needPriceRules,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                   //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                    //领取信息
							"getInfoTitle": pt_get_information_title,           //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                     //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						}
					}
				}else{
					data_prams = {
						"headImg": pt_banner,
						"headImgType": headImgType,
						"title": pt_title,
						"startDate": pt_start_time + ':00',
						"goodsNum": ms_goodsnum,
						"originalPrice": pt_original_price,
						"contactPhone": pt_tel,
						"secKillTime": ms_xs,
						"activityType": ms_type,
						"payType": payType,
						"successPrice": ms_kj_msj,
						"themeId": pt_themeid,
						"needBargin": ms_kj_xkj,
						"oneselfBarginTime": ms_kj_kjjg,
						"activityRules": jl_rule_text,
						"teamType": pt_team_type,
						"prepayPrice": needPriceRules,
						"enrollBenefit": enrollBenefit,
						"infoCollect": bm_infoCollect,
						"addressInfo": addressInfo,
						/*************刘亚 -- 音乐和特效（保存到session）***************/
						"animation": ANIMATE,
						"music": MUSIC,
						/******************************/
						"couponInfo": _couponInfo, // 优惠券信息
						"goodsDesc": {                   //商品描述
							"goodsDescInfo": pt_description_text,
							"goodsDescPic": pt_description_img          //商品描述照片
						},
						"getInfo": {                                    //领取信息
							"getInfoTitle": pt_get_information_title,           //领取信息标题
							"getInfoDetail": pt_get_information_text
						},
						"sellerInfo": {                     //商家介绍
							"title": pt_introduce_title,          //商家介绍标题
							"sellerInfoDetail": pt_introduce_content
						},
						"templateConfId":getUrlParam('templateConfId'),
					}
				};

			}
		}

		if (type == "preview") {
			if (ms_type == 81) {
				if (payType == 1) {
					if (needPriceRules == '' || needPriceRules <= 0) {
						$('.loadings').hide();
						AjaxNullTips('线上预付不能小于0元');
						preview_type = false;
						$('#pt_saves,#pt_save').text('保存');
						return false;
					}
				}
				if (pt_team_type == '') {
					$('.loadings').hide();
					AjaxNullTips('产品规格不能为空');
					preview_type = false;
					$('#pt_saves,#pt_save').text('保存');
					return false;
				};
			} else {
				if (payType == 1) {
					if (needPriceRules == '' || needPriceRules <= 0) {
						$('.loadings').hide();
						AjaxNullTips('线上预付不能小于0元');
						preview_type = false;
						$('#pt_saves,#pt_save').text('保存');
						return false;
					};
				};
				if (successPrice == '' || successPrice <= 0) {
					$('.loadings').hide();
					AjaxNullTips('秒杀价不能小于0元');
					preview_type = false;
					$('#pt_saves,#pt_save').text('保存');
					return false;
				};

			};
			if (pt_title == '') {
				$('.loadings').hide();
				AjaxNullTips('活动标题不能为空');
				preview_type = false;
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if (pt_start_time == '') {
				$('.loadings').hide();
				AjaxNullTips('开始时间不能为空');
				preview_type = false;
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if (ms_xs == '') {
				$('.loadings').hide();
				AjaxNullTips('秒杀限时不能为空');
				$('#pt_saves,#pt_save').text('保存');
				preview_type = false;
				return false;
			} else if (pt_original_price == '' || pt_original_price <= 0) {
				$('.loadings').hide();
				AjaxNullTips('商品原价不能小于0');
				$('#pt_saves,#pt_save').text('保存');
				preview_type = false;
				return false;
			} else if (ms_goodsnum == '' || ms_goodsnum <= 0) {
				$('.loadings').hide();
				AjaxNullTips('商品份数不能小于0');
				$('#pt_saves,#pt_save').text('保存');
				preview_type = false;
				return false;
			} else if (pt_description_text == '' && pt_description_img == '') {
				$('.loadings').hide();
				AjaxNullTips('商品描述不能为空');
				preview_type = false;
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if (pt_tel == '') {
				$('.loadings').hide();
				AjaxNullTips('咨询不能为空');
				preview_type = false;
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if ($('#consultation_name').val() == '' && $('#consultation_name').length != 0) {
				$('.loadings').hide();
				AjaxNullTips('商家姓名不能为空');
				$('#pt_saves,#pt_save').text('保存');
				preview_type = false;
				return false;
			} ;
			if (payType == 1) {
				if (needPriceRules == '' || needPriceRules <= 0) {
					$('.loadings').hide();
					AjaxNullTips('预付金额不能小于0');
					preview_type = false;
					$('#pt_saves,#pt_save').text('保存');
					return false;
				}
			}
			console.log(payType);
			if (getUrlParam('activityId') == 'null' || getUrlParam('activityId') == null) {
			} else {
				sessionStorage.setItem(getUrlParam('activityId'), JSON.stringify(data_prams));
			}

			sessionStorage.setItem('ms', JSON.stringify(data_prams));
			sessionStorage.setItem('ms_list', JSON.stringify(pt_templateTitleList));
			for (var i = 0; i < $('.banner_mb_tab>div>ul>li').length; i++) {
				if ($('.banner_mb_tab>div>ul>li').eq(i).hasClass('banner_mb_tab_img_active')) {
					sessionStorage.setItem('ms_preview_theme', $('.banner_mb_tab>div>ul>li').eq(i).attr('data'));
				}
			}
		}else if(type == 'map'){
			if (getUrlParam('activityId') == 'null' || getUrlParam('activityId') == null) {
			} else {
				sessionStorage.setItem(getUrlParam('activityId'), JSON.stringify(data_prams));
			}

			sessionStorage.setItem('ms', JSON.stringify(data_prams));
			sessionStorage.setItem('ms_list', JSON.stringify(pt_templateTitleList));
			for (var i = 0; i < $('.banner_mb_tab>div>ul>li').length; i++) {
				if ($('.banner_mb_tab>div>ul>li').eq(i).hasClass('banner_mb_tab_img_active')) {
					sessionStorage.setItem('ms_preview_theme', $('.banner_mb_tab>div>ul>li').eq(i).attr('data'));
				}
			}
			location.href = 'https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=' + splitLinkToMap() + '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
		} else {
			if (ms_type == 81) {
				if (payType == 1) {
					if (needPriceRules == '' || needPriceRules <= 0) {
						$('.loadings').hide();
						AjaxNullTips('线上预付不能小于0元');
						preview_type = false;
						$('#pt_saves,#pt_save').text('保存');
						return false;
					} else if (pt_team_type == '') {
						$('.loadings').hide();
						AjaxNullTips('产品规格不能为空');
						$('#pt_saves,#pt_save').text('保存');
						return false;
					};
				}
			} else {
				if (payType == 1) {
					if (needPriceRules == '' || needPriceRules <= 0) {
						$('.loadings').hide();
						AjaxNullTips('线上预付不能小于0元');
						preview_type = false;
						$('#pt_saves,#pt_save').text('保存');
						return false;
					};
				};
				if (ms_kj_msj == '' || ms_kj_msj <= 0) {
					$('.loadings').hide();
					AjaxNullTips('秒杀价不能小于0元');
					preview_type = false;
					$('#pt_saves,#pt_save').text('保存');
					return false;
				};
				if (ms_kj_xkj == '' || ms_kj_xkj <= 0) {
					$('.loadings').hide();
					AjaxNullTips('砍价间隔不能小于0元');
					preview_type = false;
					$('#pt_saves,#pt_save').text('保存');
					return false;
				};
			};
			if (pt_title == '') {
				$('.loadings').hide();
				AjaxNullTips('活动标题不能为空');
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if (pt_start_time == '') {
				$('.loadings').hide();
				AjaxNullTips('开始时间不能为空');
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if (ms_xs == '') {
				$('.loadings').hide();
				AjaxNullTips('秒杀限时不能为空');
				$('#pt_saves,#pt_save').text('保存');
				preview_type = false;
				return false;
			} else if (pt_description_text == '' && pt_description_img == '') {
				$('.loadings').hide();
				AjaxNullTips('商品描述不能为空');
				$('#pt_saves,#pt_save').text('保存');
				return false;
			} else if ($('#consultation_name').val() == '' && $('#consultation_name').length != 0) {
				$('.loadings').hide();
				AjaxNullTips('商家姓名不能为空');
				$('#pt_saves,#pt_save').text('保存');
				preview_type = false;
				return false;
			}  else if (pt_tel == '') {
				$('.loadings').hide();
				AjaxNullTips('咨询不能为空');
				$('#pt_saves,#pt_save').text('保存');
				return false;
			}
			var url = '';
			if (type == "save") {
				url = '/seller/createMsActivity.htm';
			} else if (type == 'maker') {
				url = '/seller/updateMsActivity.htm';
				if (ms_type == 81) {
					if (payType == 0) {
						if( getUrlParam('templateConfId') == 0 ){
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"themeId": pt_themeid,
								"activityRules": jl_rule_text,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                                  //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                     //领取信息
									"getInfoTitle": pt_get_information_title,   //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                           //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
							}
						}else{
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"themeId": pt_themeid,
								"activityRules": jl_rule_text,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                                  //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                     //领取信息
									"getInfoTitle": pt_get_information_title,   //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                           //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
								"templateConfId":getUrlParam('templateConfId'),
							}
						};

					} else {
						if( getUrlParam('templateConfId') == 0 ){
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"prepayPrice": needPriceRules,
								"themeId": pt_themeid,
								"activityRules": jl_rule_text,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                   //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                    //领取信息
									"getInfoTitle": pt_get_information_title,           //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                     //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
							}
						}else{
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"prepayPrice": needPriceRules,
								"themeId": pt_themeid,
								"activityRules": jl_rule_text,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                   //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                    //领取信息
									"getInfoTitle": pt_get_information_title,           //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                     //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
								"templateConfId":getUrlParam('templateConfId'),
							}
						};

					}
				} else {
					if (payType == 0) {
						if( getUrlParam('templateConfId') == 0 ){
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"successPrice": ms_kj_msj,
								"themeId": pt_themeid,
								"needBargin": ms_kj_xkj,
								"oneselfBarginTime": ms_kj_kjjg,
								"activityRules": jl_rule_text,
								"teamType": pt_team_type,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                   //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                    //领取信息
									"getInfoTitle": pt_get_information_title,           //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                     //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
							}
						}else{
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"successPrice": ms_kj_msj,
								"themeId": pt_themeid,
								"needBargin": ms_kj_xkj,
								"oneselfBarginTime": ms_kj_kjjg,
								"activityRules": jl_rule_text,
								"teamType": pt_team_type,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                   //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                    //领取信息
									"getInfoTitle": pt_get_information_title,           //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                     //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
								"templateConfId":getUrlParam('templateConfId'),
							}
						};

					} else {
						if( getUrlParam('templateConfId') == 0 ){
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"themeId": pt_themeid,
								"successPrice": ms_kj_msj,
								"needBargin": ms_kj_xkj,
								"oneselfBarginTime": ms_kj_kjjg,
								"activityRules": jl_rule_text,
								"teamType": pt_team_type,
								"prepayPrice": needPriceRules,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                   //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                    //领取信息
									"getInfoTitle": pt_get_information_title,           //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                     //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
							}
						}else{
							data_prams = {
								"headImg": pt_banner,
								"headImgType": headImgType,
								"title": pt_title,
								"startDate": pt_start_time + ':00',
								"goodsNum": ms_goodsnum,
								"originalPrice": pt_original_price,
								"contactPhone": pt_tel,
								"secKillTime": ms_xs,
								"activityType": ms_type,
								"teamType": pt_team_type,
								"payType": payType,
								"themeId": pt_themeid,
								"successPrice": ms_kj_msj,
								"needBargin": ms_kj_xkj,
								"oneselfBarginTime": ms_kj_kjjg,
								"activityRules": jl_rule_text,
								"teamType": pt_team_type,
								"prepayPrice": needPriceRules,
								"enrollBenefit": enrollBenefit,
								"infoCollect": bm_infoCollect,
								"addressInfo": addressInfo,
								/*************刘亚 -- 音乐和特效（保存到session）***************/
								"animation": ANIMATE,
								"music": MUSIC,
								/******************************/
								"couponInfo": _couponInfo, // 优惠券信息
								"goodsDesc": {                   //商品描述
									"goodsDescInfo": pt_description_text,
									"goodsDescPic": pt_description_img          //商品描述照片
								},
								"getInfo": {                                    //领取信息
									"getInfoTitle": pt_get_information_title,           //领取信息标题
									"getInfoDetail": pt_get_information_text
								},
								"sellerInfo": {                     //商家介绍
									"title": pt_introduce_title,          //商家介绍标题
									"sellerInfoDetail": pt_introduce_content
								},
								"activityId": getUrlParam('activityId'),
								"templateConfId":getUrlParam('templateConfId'),
							}
						};

					}
				}
			} else if (type == 'copy') {
				url = '/seller/createMsActivity.htm';
				data_prams.exampleActivityId = getUrlParam('activityId');
				$.ajax({
					type: "post",
					url: globalUrl + url + ajax_date,
					data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
					success: function (data) {
						var datas = JSON.parse(data);
						if (datas.status == 200) {
							if (getUrlParam('activityId') != null) {
								if (sessionStorage.getItem(getUrlParam('activityId')) != null) {
									sessionStorage.removeItem(getUrlParam('activityId'));
								};
							};
							$('.loadings').hide();
							$('#pt_saves,#pt_save').text('保存');
							sessionStorage.removeItem('hisPosData'); // 清楚我的活动列表的信息（记录离开时滚动的位置）
							window.location.href = '../activity_list-36eef3226e.html';
						} else if (datas.status == '046') {
							$('.loadings').hide();
							$('#pt_saves,#pt_save').text('保存');
							monkeyPop('isFirst');
						} else if (datas.status == '047') {
							$('.loadings').hide();
							$('#pt_saves,#pt_save').text('保存');
							monkeyPop('isDue');
						} else if (datas.status == 700) {
							window.location.href = globalUrl + '/error.htm?code=' + datas.status;
						} else if (datas.status == 702) {
							window.location.href = globalUrl + '/error.htm?code=' + datas.status;
						} else if (datas.status == 202) {
							location.href = globalUrl + '/seller_center.htm';
						} else {
							$('.loadings').hide();
							$('#pt_saves,#pt_save').text('保存');
							AjaxNullTips(datas.result.message);
						}
					},
					error: function () {
						$('.loadings').hide();
						$('#pt_saves,#pt_save').text('保存');
						AjaxErrorTips();
					}
				});
				return false;
			}
			$.ajax({
				type: 'post',
				url: globalUrl + url + ajax_date,
				data: 'params={"data":' + encodeURI(JSON.stringify(data_prams)) + '}' + isDebug,
				success: function (data) {
					var datas = JSON.parse(data);
					if (datas.status == 200) {
						if (getUrlParam('activityId') != null) {
							if (sessionStorage.getItem(getUrlParam('activityId')) != null) {
								sessionStorage.removeItem(getUrlParam('activityId'));
							};
						};
						$('.loadings').hide();
						$('#pt_saves,#pt_save').text('保存');
						sessionStorage.removeItem('hisPosData'); // 清楚我的活动列表的信息（记录离开时滚动的位置）
						// 数推环境跳转至素材页面
						if(sessionStorage.getItem('stEnv') === 'st'){
							markSt();
						} else {
							window.location.href = '../activity_list-36eef3226e.html';
						}
					} else if (datas.status == 301) {
						$('.loadings').hide();
						AjaxNullTips('活动已下架不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 303) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，活动报名费用不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 305) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，活动原价不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 307) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，支付方式不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 306) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，商品数量不可减少');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 308) {
						$('.loadings').hide();
						AjaxNullTips('请确保每次砍价最小价格为0.01元');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 309) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，预付金额不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 310) {
						$('.loadings').hide();
						AjaxNullTips('秒杀已开始，秒杀限时不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 311) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，自己砍价时间间隔不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 312) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，秒杀价不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if ($('#consultation_name').val() == '' && $('#consultation_name').length != 0) {
						$('.loadings').hide();
						AjaxNullTips('商家姓名不能为空');
						$('#pt_saves,#pt_save').text('保存');
						preview_type = false;
						return false;
					} else if (datas.status == 313) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，需砍次数不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == 314 || datas.status == 315) {
						$('.loadings').hide();
						AjaxNullTips('已有报名者，不可修改');
						$('#pt_saves,#pt_save').text('保存');
					} else if (datas.status == '046') {
						$('.loadings').hide();
						$('#pt_saves,#pt_save').text('保存');
						monkeyPop('isFirst');
					} else if (datas.status == '047') {
						$('.loadings').hide();
						$('#pt_saves,#pt_save').text('保存');
						monkeyPop('isDue');
					} else if (datas.status == 700) {
						window.location.href = globalUrl + '/error.htm?code=' + datas.status;
					} else if (datas.status == 702) {
						window.location.href = globalUrl + '/error.htm?code=' + datas.status;
					} else if (datas.status == 202) {
						location.href = globalUrl + '/seller_center.htm';
					} else {
						$('.loadings').hide();
						AjaxNullTips(datas.result.message);
						$('#pt_saves,#pt_save').text('保存');
					}
				},
				error: function () {
					$('.loadings').hide();
					$('#pt_saves,#pt_save').text('保存');
					AjaxErrorTips();
				}
			});
		}
	};
	//返回
	$('#go_histoy').click(function () {
		history.go(-1);
	});


	//更换标题
	$('.modify_title').click(function () {
		/***
		 * liuya -- pc兼容
		 *
		 * 更换标题弹窗优化 -- pc可以滚动
		 * **/
		  $('#layer_modify_clk').attr('data',$('.title_text').val());
		if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			console.log('nopc');
		} else {
			console.log($(window).scrollTop())
			$('.layer_modify_title').css({
				position: 'absolute',
				top: ($(window).scrollTop() + 100) + "px"
			})
		}
		$('.layer_modify_title').show().removeClass('bounceOutRight').addClass('animated bounceInRight');;
		$('.layer_bj').show();
		$('body').css('overflow-y', 'hidden');
		var tilte_textss = $('#kj_title').val();
		for (var i = 0; i < $('.layer_modify_title_list>li').length; i++) {
			if (tilte_textss == $('.layer_modify_title_list>li').eq(i).text()) {
				$('.layer_modify_title_list>li').eq(i).addClass('layer_modify_title_list_active');
				$('.layer_modify_clk').attr('data', $('.layer_modify_title_list>li').eq(i).text());
				if (i < 5) {
					$('.layer_modify_title_list>li').eq(0).show();
					$('.layer_modify_title_list>li').eq(1).show();
					$('.layer_modify_title_list>li').eq(2).show();
					$('.layer_modify_title_list>li').eq(3).show();
					$('.layer_modify_title_list>li').eq(4).show();
					$('.layer_modify_title_list>li').eq(5).hide();
					$('.layer_modify_title_list>li').eq(6).hide();
					$('.layer_modify_title_list>li').eq(7).hide();
					$('.layer_modify_title_list>li').eq(8).hide();
					$('.layer_modify_title_list>li').eq(9).hide();
				} else {
					$('.layer_modify_title_list>li').eq(0).hide();
					$('.layer_modify_title_list>li').eq(1).hide();
					$('.layer_modify_title_list>li').eq(2).hide();
					$('.layer_modify_title_list>li').eq(3).hide();
					$('.layer_modify_title_list>li').eq(4).hide();
					$('.layer_modify_title_list>li').eq(5).show();
					$('.layer_modify_title_list>li').eq(6).show();
					$('.layer_modify_title_list>li').eq(7).show();
					$('.layer_modify_title_list>li').eq(8).show();
					$('.layer_modify_title_list>li').eq(9).show();
				}
			};
		}
	});
	$('#layer_modify_close').click(function () {
		$('.layer_bj').hide();
		$('.layer_modify_title').addClass('bounceOutRight');
		$('body').css('overflow-y', 'auto');
	});
	$('#layer_modify_clk').click(function () {
		$('.layer_bj').hide();
		$('.layer_modify_title').addClass('bounceOutRight');
		$('body').css('overflow-y', 'auto');
		$('#pt_title').val($(this).attr('data'));
	});
	$('.layer_modify_title_list').on('click', 'li', function () {
		$('.layer_modify_title_list>li').removeClass('layer_modify_title_list_active');
		$(this).addClass('layer_modify_title_list_active');
		$('#layer_modify_clk').attr('data', $(this).text());
	});
	$('#layer_modify_other').click(function () {
		if ($('.layer_modify_title_list>li').eq(0).css('display') == 'none') {
			$('.layer_modify_title_list>li').eq(0).show();
			$('.layer_modify_title_list>li').eq(1).show();
			$('.layer_modify_title_list>li').eq(2).show();
			$('.layer_modify_title_list>li').eq(3).show();
			$('.layer_modify_title_list>li').eq(4).show();
			$('.layer_modify_title_list>li').eq(5).hide();
			$('.layer_modify_title_list>li').eq(6).hide();
			$('.layer_modify_title_list>li').eq(7).hide();
			$('.layer_modify_title_list>li').eq(8).hide();
			$('.layer_modify_title_list>li').eq(9).hide();
		} else {
			$('.layer_modify_title_list>li').eq(0).hide();
			$('.layer_modify_title_list>li').eq(1).hide();
			$('.layer_modify_title_list>li').eq(2).hide();
			$('.layer_modify_title_list>li').eq(3).hide();
			$('.layer_modify_title_list>li').eq(4).hide();
			$('.layer_modify_title_list>li').eq(5).show();
			$('.layer_modify_title_list>li').eq(6).show();
			$('.layer_modify_title_list>li').eq(7).show();
			$('.layer_modify_title_list>li').eq(8).show();
			$('.layer_modify_title_list>li').eq(9).show();
		}
	});
});


$('#banner_tips_complaint').click(function () {
	var activityId = getUrlParam('activityId');
	window.location.href = '../complain-149e7c51cc.html?activityId=' + activityId;
});


//拼团预览
function PtPreview(data) {
	var datas = JSON.parse(data);
	if (!!datas.addressInfo) {
		$('.breathe-btn').attr('data-map', JSON.stringify(datas.addressInfo));
		$('.breathe-btn').attr('data-tel', datas.contactPhone);
		$('.breathe-btn').on('click', function () {
			// $('.layer_bj').show();
			var mapData = $('.breathe-btn').attr('data-map');
			var telData = $('.breathe-btn').attr('data-tel');
			// addMapPop(mapData, telData);
			if (is_mini && JSON.parse(mapData).maker && JSON.parse(mapData).address) {
				getWxMap(mapData, telData)
			} else {
				$('.layer_bj').show();
				addMapPop(mapData, telData);
			}
		});
	} else {
		$('.text_no_unline').prop('href', 'tel://' + datas.contactPhone);
	}
	console.log(datas);
	if (datas.headImg != '') {
		var _img_src = datas.headImg.split(',');
		for( var i = 0 ; i < _img_src.length ; i ++  ){
			if( i == 0 ){
				$('#pt_banner').prop('src', _img_src[i]);
				if( datas.headImgType == 2 || datas.headImgType == 1 ){
					$('#pt_banner').css('position','relative');
				};
				$('#pt_banner')[0].onload = function(){
					var _this_w = this.naturalWidth;
					var _this_h = this.naturalHeight;
					if( datas.headImgType  == 3 ){
						$('.banner').css({'width':_this_w/100+'rem','height':_this_h/100+'rem'});
					};
				};
			}else{
				$('#pt_banner').after('<img src="'+ _img_src[i] +'" />');
			};
		};
	};
	if (datas.title != '') {
		$('#kj_title').text(unescape(datas.title));
	};
	console.log(datas.payType)
	if (datas.activityType == 81) {
		$('.ms_kj_prev').hide();
		if (datas.teamType != '') {
			for (var i of datas.teamType) {
				$('.ms_bm_box>ul').append('<li class="ms_bm_unlock">' +
					'<div class="ms_bm_lock_one">' +
					'<span>满</span>' +
					'<span style="padding-top: .1rem;"><em>' + i.num + '</em>人</span>' +
					'</div>' +
					'<div class="ms_bm_lock_two">' +
					'<i>&nbsp;</i>' +
					'<span>¥<em>' + i.successPrice + '</em>元</span>' +
					'</div>' +
					'</li>');
			};
			$('.ms_bm_box>ul>li.ms_bm_lock').last().find('i').text('当前秒杀价');
			$('.ms_bm_line').css('height', $('.ms_bm_box').height() + 'px');
		}
		if (datas.payType == 0) {
			$('.ms_g_time').show();
			$('.ms_g_time').children('em').text(datas.startDate.substr(0, 16));
			$('.ms_g_time>span').eq(0).hide();
			$('.ms_g_time>span').eq(1).text('开抢');
		} else {
			$('.ms_g_time').show();
			$('.ms_g_time').children('em').text(datas.prepayPrice);
		};
	} else {
		$('.ms_bm_prev').hide();
		if (datas.payType == 0) {
			$('.ms_g_time').show();
			$('.ms_g_time').children('em').text(datas.startDate.substr(0, 16));
			$('.ms_g_time>span').eq(0).hide();
			$('.ms_g_time>span').eq(1).text('开抢');
		} else {
			$('.ms_g_time').show();
			$('.ms_g_time').children('em').text((datas.startDate).substr(0, 16));
		};
		$('.ms_kj_lock_one').find('em').text(datas.needBargin);
		$('.ms_kj_lock_two').find('em').text(datas.successPrice);
		$("#prev_list_kj_type").text("当前价格");
        $("#ranking_lists").text("砍价排行榜");

	};
	if (datas.enrollBenefit == '') {
		$('.ms_fl').hide();
	} else {
		$('.ms_fl_text').html(unescape(datas.enrollBenefit).replace(/\r?\n/g, "<br/>"));
	};

	if (datas.goodsNum != '0') {
		$('.goodnum').text(datas.goodsNum);
	};
	$('.originalPrice').text(datas.originalPrice);
	if (datas.goodsDesc.goodsDescInfo != '') {
		$('#goods_desc_info').html(unescape(datas.goodsDesc.goodsDescInfo).replace(/\r?\n/g, "<br/>"));
	} else {
		$('#goods_desc_info').hide();
	};
	if (datas.goodsDesc.goodsDescPic != '') {
		// $('#goods_desc_pic').show();
		// $('#goods_desc_pic').prop('src',datas.goodsDesc.goodsDescPic);
		var numImgArr = datas.goodsDesc.goodsDescPic.split(',');
		$(numImgArr).each(function (index, el) {
			$('<img src="' + el + '">').appendTo('.addNumImgGoodsImg');
		})
	} else {
		$('#goods_desc_pic').hide();
	};
	if (datas.activityRules != '') {
		var str = unescape(datas.activityRules).replace(/\r?\n/g, "<br/>");
		$('#get_rule_detail>p').html(str);
	};
	if (datas.getInfo.getInfoTitle != '') {
		$('#get_info_title').text(unescape(datas.getInfo.getInfoTitle));
	} else {
		$('#get_info_title').hide();
		$('#get_info_detail').hide();
	};
	if (datas.getInfo.getInfoDetail != '') {
		var str = unescape(datas.getInfo.getInfoDetail).replace(/\r?\n/g, "<br/>");
		$('#get_info_detail>p').html(str);
	};
	if (datas.sellerInfo.title != '') {
		$('#seller_info_title').text(unescape(datas.sellerInfo.title));
	} else {
		$('#seller_info_title').parent().hide();
		$('#seller_info_content').hide();
		$('#get_info_detail').addClass('margin-b');
	};
	if (datas.sellerInfo.sellerInfoDetail != '') {
		for (var i = 0; i < datas.sellerInfo.sellerInfoDetail.length; i++) {
			if (datas.sellerInfo.sellerInfoDetail[i].type == 'text') {
				if (datas.sellerInfo.sellerInfoDetail[i].value != '') {
					var str = unescape(datas.sellerInfo.sellerInfoDetail[i].value).replace(/\r?\n/g, "<br/>");
					$('#seller_info_content').append('<p>' + str + '</p>');
				}
			} else if (datas.sellerInfo.sellerInfoDetail[i].type == 'image') {
				if (datas.sellerInfo.sellerInfoDetail[i].value != '') {
					$('#seller_info_content').append('<img src="' + datas.sellerInfo.sellerInfoDetail[i].value + '"/>');
				}
			} else if (datas.sellerInfo.sellerInfoDetail[i].type == 'video') {
				var temp = getTxUrl(decodeURIComponent(datas.sellerInfo.sellerInfoDetail[i].value));
				temp = 'https://v.qq.com/iframe/player.html?vid=' + temp ;
				$('#seller_info_content').append('<iframe width="100%" height="100%" src="' + temp + '" frameborder=0 "allowfullscreen"></iframe>');
			}
		};
	} else {
		$('#seller_info_content').hide();
		$('#seller_info_title').parent().hide();
		$('#get_info_detail').addClass('margin-b');
	};


	//砍价预览
	/**
	 * liuya - 优惠券预览样式
	 * ***/
	if (!!datas.couponInfo) {
		var textNum = 0;
		var couponNum = 0;
		var _createActCouponList = new createActCouponList();
		if(datas.couponInfo.title){
			$('#coupon_decs_title').text(unescape(datas.couponInfo.title));
		}
		$(datas.couponInfo.couponDetail).each(function (index, el) {
			if (el.type == 1 && el.value != '') {
				textNum++;
				_createActCouponList.renderText('.coupon-content_list', unescape(el.value));
			}
			if (el.type == 2) {
				couponNum++;
				_createActCouponList.renderCouponById('.nowAdd', el.value, function (result) {
					result.result.data.parents = '.coupon-content_list';
					result.result.data.circleChartId = 'circleChartId' + parseInt(Math.random() * 10000);
					_Coupon.couponForAct_unclaimed(result.result.data);
				});
				// var thisCData = res[el.value];
				// _createActCouponList.renderCoupon('.nowAdd', thisCData, function (result) {
				// 	result.parents = '.coupon-content_list';
				// 	result.circleChartId = 'circleChartId' + parseInt(Math.random() * 10000);
				// 	_Coupon.couponForAct_unclaimed(result, 'isChange');
				// });
			}
		})
		if (textNum == 0 && couponNum == 0) {
			$('#coupon_decs_title').hide();
			$('#coupon_preview').hide();
		}
	}else{
		$('#coupon_decs_title').hide();
		$('#coupon_preview').hide();
	}

	if (datas.startDate != '') {
		//活动结束
		var date = datas.startDate;
		date = date.substring(0, 19);
		date = date.replace(/-/g, '/');
		var activity_end_time = new Date(date).getTime() / 1000;
		var dates = datas.startDate;
		dates = dates.substring(0, 19);
		dates = dates.replace(/-/g, '/');
		var activity_start_time = new Date(dates).getTime() / 1000;
		var timestamp_end_time = parseInt(new Date().getTime() / 1000);
		if (activity_start_time > timestamp_end_time) {
			SetTimeStart(datas.startDate);
			$('#xg_timer').text('开始');
		} else {
			$('#xg_timer').text('结束');
		};

	} else {
		$('.settime').hide();
	};
	/**************************刘亚 - 音乐和特效(活动预览页)*******************************/
	var _music = datas.music;
	var _animate = datas.animation;
	if (_animate != '' && _animate != 'null' && _animate != undefined) {
		// 如果动画不为空
		var animateImgs = _animate.split(',');
		mySnow.GiftList = animateImgs;
		mySnow.initBySpeed();
	} else {
		$('#animateControlBtn').hide();
	}
	if (_music != '' && _music != 'null' && _music != undefined) {
		myBgMusic.src = _music;
	} else {
		$('#musicControlBtn').hide();
	}
	/********************************************************************/

	Loading('end');
};

//砍价获取砍价排行榜
function getBargainRankingList(id) {
	var timers = '';
	var limit = 30;
	var page = 1;
	$('.prev_list_kj>ul').scroll(function () {
		// if (!bargainRankingList_length) {
  //           $('.list_text').text('已经到底了');
		// } else {
  //           $('.list_text').text('下拉加载更多');
		// }
		//当时滚动条离底部60px时开始加载下一页的内容
		if (($('.prev_list_kj>ul').height() + $('.prev_list_kj>ul').scrollTop() + 20) >= $('.prev_list_kj>ul>li').height() * $('.prev_list_kj>ul>li').length && bargainRankingList_length == true) {
            $('.list_text').text('加载中');
			clearTimeout(timers);
			timers = setTimeout(function () {
				page++;
				getBargainRankingLists(id, limit, page);
			}, 300);
		}
	});
};
function getBargainRankingLists(id, limit, page) {
	var data_prams = [];
	data_prams = {
		"activityId": id,
		"curPage": page,
		"limit": limit
	};
	$.ajax({
		type: "post",
		url: globalUrl + '/buyer/getMsRankingList.htm' + ajax_date,
		data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
		success: function (data) {
			var datas = JSON.parse(data);
			var res = datas.result.data;
			if (datas.status == 200) {
				if (ms_type == 81) {
					if (res.length < 30) {
	            		bargainRankingList_length = false
	           			$('.list_text').text('已经到底了');
	            	}  else {
	           			$('.list_text').text('下拉加载更多');
					}
					for (var i = 0; i < res.length; i++) {
						var first_name = res[i].name.substring(0, 1);
						var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
						var fina_name = first_name + '*' + last_name;
						$('.prev_list_kj>ul').append('<li>' +
							'<ul>' +
							'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
							'<li style="width: 30% !important;">' + fina_name + '</li>' +
							'<li style="width: 50% !important;">' + formatDate(res[i].date) + '</li>' +
							'</ul>' +
							'</li>');
					};
				} else {
					if (res.length < 30) {
	            		bargainRankingList_length = false
	           			$('.list_text').text('已经到底了');
	            	}  else {
	           			$('.list_text').text('下拉加载更多');
					}
					for (var i = 0; i < res.length; i++) {
						var first_name = res[i].name.substring(0, 1);
						var last_name = res[i].name.substring(res[i].name.length - (res[i].name.length - 2), res[i].name.length);
						var fina_name = first_name + '*' + last_name;
						$('.prev_list_kj>ul').append('<li>' +
							'<ul>' +
							'<li style="width:20% !important ;">' + res[i].ranking + '</li>' +
							'<li style="width: 30% !important;">' + fina_name + '</li>' +
							'<li style="width: 50% !important;">' + res[i].currentPrice + '</li>' +
							'</ul>' +
							'</li>');
					};
				}


			} else if (datas.status == 405 && page == 1) {
				$('.list_text').text('暂无数据');
				bargainRankingList_length = false;
			} else {
				$('.list_text').text('已经到底了');
				bargainRankingList_length = false;
			};
		},
		error: function () {
			AjaxErrorTips();
		}
	});
};



//预览返回编辑
function PreviewBackToEdit(data) {
	var datas = JSON.parse(data);
	if (!datas) {
		return false;
	};
	var sess_theme_data = '';
	if (sessionStorage.getItem('ms_preview_theme') != '' && sessionStorage.getItem('ms_preview_theme') != null) {
		sess_theme_data = JSON.parse(sessionStorage.getItem('ms_preview_theme'));

	} else {
		sess_theme_data = datas.themedata;
	};
	TiggerThem(sess_theme_data);
	if (datas.headImg != '') {
	if( datas.headImgType == 2 || datas.headImgType == 1 ){
			$('#active_kj_banner').css('position','relative');
		};
		var _this_imgsrc = datas.headImg.split(',');
		for( var i = 0 ; i < _this_imgsrc.length; i++ ){
			if( i == 0 ){
				$('#active_kj_banner').prop('src', _this_imgsrc[i]);
				$('#active_kj_banner')[0].onload = function(){
					var _this_w = this.naturalWidth;
					var _this_h = this.naturalHeight;
					if( datas.headImgType != 2 && datas.headImgType != 1 ){
						$('.banner').css({'width':_this_w/100+'rem','height':_this_h/100+'rem'});
					};
				};
				$('#active_kj_banner').css('position','relative');
			}else{
				$('#active_kj_banner').after('<img src="'+_this_imgsrc[i]+'" />');
				$('#active_kj_banner').css('position','absolute');
			};
		};
	};
	if (datas.title != '') {
		$('#pt_title').val(unescape(datas.title));
	};
	if (datas.startDate != '') {
		$('#end_time').text(datas.startDate.substring(0, 16));
	};
	$('#ms_xs').val(datas.secKillTime);
	$('#ms_yj').val(datas.originalPrice);
	$('#ms_fs').val(datas.goodsNum);
	if (datas.goodsDesc.goodsDescInfo != '') {
		$('#description_text').val(unescape(datas.goodsDesc.goodsDescInfo));
	};
	if (datas.goodsDesc.goodsDescPic != '') {
		// $('#bargain_describe_img').hide();
		// $('.img_upload_y').show();
		// $('#description_img').prop('src',datas.goodsDesc.goodsDescPic);
		var numImgArr = datas.goodsDesc.goodsDescPic.split(',');
		$(numImgArr).each(function (index, el) {
			$('#bargain_describe_img').before('<div class="bargain_introduce_tab_pic addstyle addGoodsDescImg" style="height: auto; margin-bottom: 0.7rem;"><div class="add_tab_pic_content" style="display: none;"><img src="../images/icon/add_pic_content-198319f166.png"><span>点击选择图片</span></div><img src="' + el + '" class="add_tab_pic_url" style="display: block;"><ul class="mide_margin bargain_introduce_tab_add"><li class="goodsTop"><i></i><span>向下</span><em></em></li><li class="goodsBottom"><i></i><span>向上</span><em></em></li><li class="goodsDel"><i></i><span>删除</span></li></ul></div>');
		})
	} else {
		$('.img_upload_y').hide();
	};
	headImgType = datas.headImgType;
	if (datas.infoCollect != '' && !!datas.infoCollect) {
		$('.bm_list_info>li>input').val('');
		for (var i = 0; i < datas.infoCollect.length; i++) {
			$('.bm_list_info>li').eq(i).children('input').val(unescape(datas.infoCollect[i].collectName));
			if (datas.infoCollect[i].collectType == 1) {
				$('.bm_list_info>li').eq(i).children('div').addClass('bm_lock_checked');
			} else {
				$('.bm_list_info>li').eq(i).children('div').removeClass('bm_lock_checked');
			}
		};
	};
	// 记录地址选择信息
	if (!!datas.addressInfo) {
		if (latngOfUrl) {
			$('#consultation_addAds').attr('data-maker', latngOfUrl);
		} else {
			$('#consultation_addAds').attr('data-maker', datas.addressInfo.maker);
		}
		if (addrOfUrl) {
			$('#consultation_addAds').text(addrOfUrl);
		} else {
			$('#consultation_addAds').text(unescape(datas.addressInfo.address));
		}
		if (nameOfUrl) {
			$('#consultation_addAds').attr('data-title', nameOfUrl);
		} else {
			$('#consultation_addAds').attr('data-title', unescape(datas.addressInfo.title));
		}

		if (datas.addressInfo.add != '' && datas.addressInfo.add != undefined) {
			$('#consultation_detailsAds').text(unescape(datas.addressInfo.add));
		}

		$('#consultation_name').val(unescape(datas.addressInfo.contacts));
		var hisLink = document.referrer.indexOf('3gimg.qq.com');
		if (hisLink != -1) {
			// $('#consultation_addAds').focus();
			$("html, body").animate({
				scrollTop: $("#consultation_addAds").offset().top
			}, { duration: 500, easing: "swing" });
		}
	}
	/**
	 * liuya -- 优惠券
	 *
	 * **/
	if (!!datas.couponInfo) {
		datas.couponInfo = typeof datas.couponInfo == 'string' ? JSON.parse(datas.couponInfo) : datas.couponInfo;
		$('#get_coupon_title').val(unescape(datas.couponInfo.title));
		$('.textMark>.textMark-item').remove();
		$(datas.couponInfo.couponDetail).each(function (index, el) {
			if (el.type == 1) {
				thisTextMark.addTextMark('.textMark', el.value);
			} else if (el.type == 2) {
				thisTextMark.addCouponMark('.textMark');
				getCouponDetailById(el.value, function (result) {
					result.result.data.parents = '.nowAddCoupon>.textMark_coupon';
					thisCoupon.couponForSelect(result.result.data);
				})
			}
		})
	}

	if (datas.getInfo.getInfoTitle != '') {
		$('#get_information_title').val(unescape(datas.getInfo.getInfoTitle));
	};
	if (datas.getInfo.getInfoDetail != '') {
		$('#get_information_text').val(unescape(datas.getInfo.getInfoDetail));
	};
	if (datas.sellerInfo.title != '') {
		$('#introduce_title').val(unescape(datas.sellerInfo.title));
	};
	if (datas.activityType == 81) {
		$('#ms_ul>li').find('.radios').removeClass('radios_checked');
		$('#ms_ul>li').eq(0).find('.radios').addClass('radios_checked');
		for (var i = 0; i < datas.teamType.length; i++) {
			if (i == 0) {
				$('.jl_content_add_lis>li').children('.num').val(datas.teamType[0].num);
				$('.jl_content_add_lis>li').children('.successPrice').val(datas.teamType[0].successPrice);
			} else {

				$('.jl_content_add_lis').append('<li class="finah">' +
					'<span class="jl_content_span"><e class="all_tips" style="line-height: .25rem;">&lowast;</e>报名人数</span>' +
					'<input class="content_input pt_input_border num" type="number" value="' + datas.teamType[i].num + '" />' +
					'<span class="jl_content_add_li_span_2">人</span>' +
					'<span class="jl_content_add_li_span_3"><e class="all_tips" style="line-height: .25rem;">&lowast;</e>价格</span>' +
					'<input class="content_input pt_input_border successPrice" type="number" value="' + datas.teamType[i].successPrice + '" />' +
					'<span class="jl_content_add_li_span_2">元</span>' +
					'<i></i>' +
					'</li>');
				$('.finah').children('i').show();
			}
			if (i == 4) {
				$('#add_li_pt').hide();
			}
		};
		if (bm_state == false) {
			$('.ms_bm_content').find('.successPrice').attr('disabled', 'disabled');
			$('.ms_bm_content').find('.num').attr('disabled', 'disabled');
		}
		$('.ms_bm_content').show();
		$('#kj_ms').hide();
		ms_type = 81;
	} else {
		$('#ms_ul>li').find('.radios').removeClass('radios_checked');
		$('#ms_ul>li').eq(1).find('.radios').addClass('radios_checked');
		$('.ms_bm_content').hide();
		$('#kj_ms').show();
		$('#ms_msj').val(datas.successPrice);
		$('#ms_xkj').val(datas.needBargin);
		$('#kj_jg').val(datas.oneselfBarginTime);
		ms_type = 82;
	};
	if (datas.payType == 0) {
		$('.bm_content').find('.radios').removeClass('radios_checked');
		$('.bm_content').find('.radios').eq(0).addClass('radios_checked');
		$('#needPriceRules').val('');
		$('#needPriceRules').hide();
		$('#needPriceRules_span').hide();
		$('.bm_content').find('em').hide();
	} else {
		$('.bm_content').find('.radios').removeClass('radios_checked');
		$('.bm_content').find('.radios').eq(1).addClass('radios_checked');
		$('#needPriceRules').val(datas.prepayPrice);
		$('#needPriceRules').show();
		$('#needPriceRules_span').show();
		$('.bm_content').find('em').show();
	}
	$('#ms_content_textarea').val(unescape(datas.enrollBenefit));
	makeExpandingAreas('ms_content_textarea');
	for (var i = 0; i < datas.sellerInfo.sellerInfoDetail.length; i++) {
		if (datas.sellerInfo.sellerInfoDetail[i].type == 'text') {
			if (datas.sellerInfo.sellerInfoDetail[i].value != '') {
				$('.add_content').append('<div class="bargain_introduce_tab_text addstyle" id="texts' + height + '">' +
					'<textarea id="text' + height + '" class="bargain_introduce_tab_text_fous" >' + unescape(datas.sellerInfo.sellerInfoDetail[i].value) + '</textarea>' +
					'<span style="display:none;">请添加文本</span>' +
					'<ul class="mide_margin bargain_introduce_tab_add">' +
					'<li class="top" ><i></i><span>向下</span><em></em></li>' +
					'<li class="bottom" ><i></i><span>向上</span><em></em></li>' +
					'<li class="del" ><i></i><span>删除</span></li>' +
					'</ul>' +
					'</div>');
				$('#text' + height + '')[0].style.height = 'auto';
				$('#text' + height + '')[0].style.height = $('#text' + height + '')[0].scrollHeight + 'px';
				$('#texts' + height + '')[0].style.height = $('#text' + height + '')[0].scrollHeight + 20 + 'px';
				makeExpandingAreas('text' + height);
				height++;
			}
		} else if (datas.sellerInfo.sellerInfoDetail[i].type == 'image') {
			$('.add_content').append('<div class="bargain_introduce_tab_pic addstyle" style="height: auto;overflow: hidden;">' +
				'<div class="add_tab_pic_content" style="display:none;">' +
				'<img src="../images/icon/add_pic_content-198319f166.png" />' +
				'<span>点击选择图片</span>' +
				'</div>' +
				'<img src="' + datas.sellerInfo.sellerInfoDetail[i].value + '" class="add_tab_pic_url" style="display:block;">' +
				'<ul class="mide_margin bargain_introduce_tab_add">' +
				'<li class="top" ><i></i><span>向下</span><em></em></li>' +
				'<li class="bottom" ><i></i><span>向上</span><em></em></li>' +
				'<li class="del" ><i></i><span>删除</span></li>' +
				'</ul>' +
				'</div>');
		} else if (datas.sellerInfo.sellerInfoDetail[i].type == 'video') {
			$('.add_content').append('<div class="bargain_introduce_tab_video addstyle">' +
				'<input class="add_tab_video_content" value="' + decodeURIComponent(datas.sellerInfo.sellerInfoDetail[i].value) + '" />' +
				'<span style="display:none;">请输入视频网址（仅支持腾讯）</span>' +
				'<ul class="mide_margin bargain_introduce_tab_add">' +
				'<li class="top" ><i></i><span>向下</span><em></em></li>' +
				'<li class="bottom"><i></i><span>向上</span><em></em></li>' +
				'<li class="del"><i></i><span>删除</span></li>' +
				'</ul>' +
				'</div>');
		};
	};
	if (datas.activityRules != '') {
		$('#get_rule_text').val(unescape(datas.activityRules));
	}
	ShowAndHide();
	if (datas.contactPhone != '') {
		$('#consultation_tel').val(datas.contactPhone);
	};
	if (datas.contactPhone != '') {
		$('#tel_pt').text('确定给' + datas.contactPhone + '拨号吗？');
		$('.text_no_unline').prop('href', 'tel://' + datas.contactPhone);
	};
	if (getUrlParam('activityId') != null || getUrlParam('activityId') != 'null') {
		$('.banner_mb_tab_qx').attr('data', JSON.stringify(datas.themedata));
		if (datas.headImg == '') {
			$('.banner_mb_tab_clk').attr('data', datas.themedata.headImgUrl);
			$('.industry_colse').attr('data', datas.themedata.headImgUrl);
		} else {
			$('.banner_mb_tab_clk').attr('data', datas.headImg);
			$('.industry_colse').attr('data', datas.headImg);
		}
	} else {
		$('.banner_mb_tab_qx').attr('data', JSON.stringify(datas));
		$('.banner_mb_tab_clk').attr('data', datas.headImg);
		$('.industry_colse').attr('data', datas.headImg);
	}

	var list_data = sessionStorage.getItem('ms_list');
	if (list_data != null) {
		$('.layer_modify_title_list>li').remove();
		for (var lists of JSON.parse(list_data)) {
			$('.layer_modify_title_list').append('<li data="' + lists.title_id + '" >' + lists.title_name + '</li>');
		};
		$('.layer_modify_title_list>li').eq(5).hide();
		$('.layer_modify_title_list>li').eq(6).hide();
		$('.layer_modify_title_list>li').eq(7).hide();
		$('.layer_modify_title_list>li').eq(8).hide();
		$('.layer_modify_title_list>li').eq(9).hide();
	}
	makeExpandingArea(description_text);
	makeExpandingArea(get_information_text);
	makeExpandingArea(get_rule_text);
	var iom = $('#active_kj_banner').prop('src');
	var iom_id = '';
	for (var i = 0; i < $('.industry_img>li').length; i++) {
		if (iom == $('.industry_img>li').eq(i).children('img').prop('src')) {
			iom_id = $('.industry_img>li').eq(i).attr('data');
			$('.industry_img>li').hide();
			$('.industry_img>li').eq(i).show();
			$('.industry_img>li').eq(i).addClass('industry_img_active');
			for (var b = 0; b < $('.iundustry_text_list>li').length; b++) {
				if (iom_id == $('.iundustry_text_list>li').eq(b).attr('data')) {
					$('.iundustry_text_list>li').removeClass('iundustry_text_list_active');

					$('.iundustry_text_list>li').eq(b).addClass('iundustry_text_list_active');
				}
			}
		}
	}
	for (var i = 0; i < $('.industry_img>li').length; i++) {
		if (iom_id == $('.industry_img>li').eq(i).attr('data')) {
			$('.industry_img>li').eq(i).show();
		};
	}
	/**********************刘亚 -- 音乐和动效（预览返回编辑，保存数据）****************************/
	$('#animateBtn').attr('data-am', datas.animation);
	$('#musicBtn').attr('data-am', datas.music);
	/**********************************************************/
	Loading('end');
	ShowAndHideForGoods()
};


//秒杀预览_to_c
function PtPreview_To_C(activityId, referId) {
	Loading('start');
	var activityEnrollIdrk = 0;
	var referId = getUrlParam('referId');
	if (referId == null || referId == 'null') {
		referId = 0;
	};
	if (getUrlParam('activityEnrollId') == 'null' || getUrlParam('activityEnrollId') == null) {
		activityEnrollIdrk = 0;
	} else {
		activityEnrollIdrk = getUrlParam('activityEnrollId');
	}

	if( getUrlParam('referType') == null || getUrlParam('referType') == 'null' ){
		data_prams = {
			"activityId": activityId,
			"referId": referId,
			"activityEnrollId": activityEnrollIdrk,
			"currUrl": encodeURIComponent(location),
			"level": getUrlParam('level')?getUrlParam('level'):0,
			"forwardId":getUrlParam('forwardId')?getUrlParam('forwardId'):0
		};
	}else{
		data_prams = {
			"activityId": activityId,
			"referId": referId,
			"activityEnrollId": activityEnrollIdrk,
			"currUrl": encodeURIComponent(location),
			"referType":getUrlParam('referType'),
			"level": getUrlParam('level')?getUrlParam('level'):0,
			"forwardId":getUrlParam('forwardId')?getUrlParam('forwardId'):0
		};
	}

	var time, uuid, sign, success = false;
	$.ajax({
		type: "post",
		url: globalUrl + '/buyer/msActivityEnter.htm' + ajax_date,
		data: 'params={"data":' + JSON.stringify(data_prams) + '}' + isDebug,
		success: function (data) {
			var datas = JSON.parse(data);
			var res = datas.result.data;
			_buyId = res.buyerId;createForwardId();
			_level = res.level?res.level:1;
			_referBrowseId = res.referBrowseId?res.referBrowseId:0;
			ccurl = res.ccUrl;
			browseId = res.browseId;
			Loading('end');
			if (res.activityEnrollId == undefined) {
				activityEnrollIds = 'null';
			} else {
				activityEnrollIds = res.activityEnrollId;
			}
			if (res.buyerId == undefined) {
				var referIds = null;
			} else {
				var referIds = res.buyerId;
			}
			if (datas.status == 200) {
				// 修改底部配置
				if (res.sellerConfig) {
					var _data = JSON.parse(res.sellerConfig)
					if (_data.activityBottomConfig) {
						$(".foot_to_c").html(_data.activityBottomConfig).append("<i></i>")
					} else {
						$(".foot_to_c").hide()
						$('.foot_to_c_pt_li').addClass('foot_to_c_pt_li_down')
					}
				}

				success = true;
				time = res.wxJsSignDto.timestamp;
				uuid = res.wxJsSignDto.nonceStr;
				sign = res.wxJsSignDto.sign;
				var content=getWXtext(res);
				getWxShareContents_new(time, uuid, sign, res, 'ms', activityEnrollIds,content,'',_forwardId);
				$('#buyerid').val(res.buyerId);
				TiggerThems(res.themeInfo, res.headImgType);
				$("title").html(unescape(res.title));
				//活动结束
				var date = res.endDate;
				date = date.substring(0, 19);
				date = date.replace(/-/g, '/');
				var activity_end_time = new Date(date).getTime() / 1000;
				var dates = res.startDate;
				dates = dates.substring(0, 19);
				dates = dates.replace(/-/g, '/');
				var activity_start_time = new Date(dates).getTime() / 1000;
				var timestamp_end_time = parseInt(new Date().getTime() / 1000);
				if (activityEnrollIds == undefined || activityEnrollIds == 'undefined') {
					activityEnrollIds = 'null';
				};
				if (res.enrollName == undefined || res.enrollName == 'undefined') {
					res.enrollName = null;
				};
				if (!!res.infoCollect) {
					bm_layer_info = res.infoCollect;
				}

				if (!!res.addressInfo) {
					$('.breathe-btn').attr('data-map', JSON.stringify(res.addressInfo));
					$('.breathe-btn').attr('data-tel', res.contactPhone);

					$('.breathe-btn').on('click', function () {
						// $('.layer_bj').show();
						var mapData = $('.breathe-btn').attr('data-map');
						var telData = $('.breathe-btn').attr('data-tel');
						// addMapPop(mapData, telData);
						if (is_mini && JSON.parse(mapData).maker && JSON.parse(mapData).address) {
							getWxMap(mapData, telData)
						} else {
							$('.layer_bj').show();
							addMapPop(mapData, telData);
						}
					})
				} else {
					$('.text_no_unline').prop('href', 'tel://' + res.contactPhone);
				}

				$('.banner_top').children('li').eq(0).children('i').text(res.visitNum);
				$('.banner_top').children('li').eq(1).children('i').text(res.shareNum);
				$('.banner_top').children('li').eq(2).children('i').text(res.enrollNum);
				$('#activityEnrollId').val(activityEnrollIds);
				$('#referId').val(res.buyerId);
				/**
					 * liuya - 优惠券预览样式
					 * ***/
					if (!!res.couponInfo) {
						res.couponInfo = JSON.parse(res.couponInfo); // JSON化数据
						var textNum = 0;
						var couponNum = 0;
						var _createActCouponList = new createActCouponList();
						if(res.couponInfo.title){
							$('#coupon_decs_title').text(unescape(res.couponInfo.title));
						}
						$(res.couponInfo.couponDetail).each(function (index, el) {
							if (el.type == 1 && el.value != '') {
								textNum++;
								_createActCouponList.renderText('.coupon-content_list', unescape(el.value));
							}
							if (el.type == 2) {
								couponNum++;
								// console.log(res[el.value])
								var thisCData =res["couponId_"+el.value];
								_createActCouponList.renderCoupon('.nowAdd', thisCData, function (result) {
									result.parents = '.coupon-content_list';
									result.circleChartId = 'circleChartId' + parseInt(Math.random() * 10000);
									_Coupon.couponForAct_unclaimed(result, 'isChange');
								});
							}
						})
						if (textNum == 0 && couponNum == 0) {
							$('#coupon_decs_title').hide();
							$('#coupon_preview').hide();
						}
					}else{
						$('#coupon_decs_title').hide();
						$('#coupon_preview').hide();
					}


				if (res.activityType == 81) {
					$('.ms_kj_prev').hide();
					$('#ranking_lists').text('报名进行时');
					$('#branking_lists_content>ul>li>ul>li').eq(2).text('报名时间');
					var ss = '';
					var bs = 0;
					for (var i of res.teamType) {

						if (res.enrollNum < i.num) {
							$('.ms_bm_box>ul').append('<li class="ms_bm_unlock">' +
								'<div class="ms_bm_lock_one">' +
								'<span>满</span>' +
								'<span style="padding-top: .1rem;"><em>' + i.num + '</em>人</span>' +
								'</div>' +
								'<div class="ms_bm_lock_two">' +
								'<i>&nbsp;</i>' +
								'<span>¥<em>' + i.successPrice + '</em>元</span>' +
								'</div>' +
								'</li>');
						} else {
							$('.ms_bm_box>ul').append('<li class="ms_bm_lock ">' +
								'<div class="ms_bm_lock_one">' +
								'<span>满</span>' +
								'<span style="padding-top: .1rem;"><em>' + i.num + '</em>人</span>' +
								'</div>' +
								'<div class="ms_bm_lock_two">' +
								'<i>&nbsp;</i>' +
								'<span>¥<em>' + i.successPrice + '</em>元</span>' +
								'</div>' +
								'</li>');
						};
						ss = i.num;
						bs++;
					};

					if (res.msTag == 1) {
						$('.ms_bm_box>ul').find('.ms_bm_lock').last().find('i').remove();
						$('.ms_bm_box>ul').find('.ms_bm_lock').last().append('<img src="../images/ms/mscg-b35ba12a75.png" style="width: 1.42rem;height: 1.22rem;position: absolute;display: block;right: -.5rem;top: -.1rem;" />');
					}
					$('.ms_bm_box>ul>li.ms_bm_lock').last().find('i').text('当前秒杀价');
					$('.ms_bm_line').css('height', $('.ms_bm_box').height() + 'px');
					var ah = res.enrollNum / i.num * 100;
					if (ah > 100) {
						ah = 100;
					};
					$('.ms_bm_line_box').css('top', ah + '%');
					$('.ms_bm_line_bj').css('height', ah + '%');

					if (ah == 100) {
						var hh = $('.ms_bm_line_box').position().top;
						$('.ms_bm_line_box').css('top', hh - 12 + 'px');
					}
					if (bs == 1) {
						$('.ms_bm_line').css('background-color', 'transparent');
						$('.ms_bm_line_bj').hide();
						$('.ms_bm_line_box').hide();
					}
					if (res.pageState == 503) {
						if (activity_start_time > timestamp_end_time) {
							$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
						} else if (activity_start_time < timestamp_end_time < activity_end_time) {
							$('#layer_add').text('立即秒杀');
						}
					} else {
						if (activity_start_time > timestamp_end_time) {

						} else if (activity_start_time < timestamp_end_time < activity_end_time) {
							$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
						}
					};
					if (res.payType == 0) {
						payType = 0;
					} else {
						payType = 1;

					};
					if (activity_start_time > timestamp_end_time) {
						SetTime(res.startDate);
						$('#xg_timer').text('开始');
					} else if (activity_start_time < timestamp_end_time < activity_end_time) {
						SetTime(res.endDate);
						$('#xg_timer').text('结束');
					}
					if (res.msTag == 1) {
						$('#layer_add').addClass('ms_foot_btn');
					}
					ms_type = 81;
				} else {
					ms_type = 82;
					$('.ms_bm_prev').hide();
					$('.ms_g_time>em').text(res.startDate);
					$('.ms_kj_lock_one>span>em').text(res.needBargin);
					if (isInteger(res.successPrice)) {
						$('.ms_kj_lock_two>span>em').text(parseInt(res.successPrice));
					} else {
						$('.ms_kj_lock_two>span>em').text(res.successPrice);
					}

					if (res.pageState == 500) {//报名成功页面
						$('.ms_kj_lock_bj').hide();
						$('.ms_kj_lock_bj_500').show();
						$('.ms_kj_lock_bj_500>label').text(res.enrollName);
						$('#ms_xj_500').text(res.currentPrice);
						if (res.barginPrice == undefined) {
							$('#ms_kd_500').parent().hide();
						}
						$('#ms_kd_500').text(res.barginPrice);
						$('#ykcs').text(res.bargainNum);
						$('#zgkjcs').text(res.needBargin);
						if (isInteger(res.successPrice)) {
							$('#kj_jg_500').text(parseInt(res.successPrice));
						} else {
							$('#kj_jg_500').text(res.successPrice);
						}
						if (res.isSuccess == 1) {//砍价成功页面

							if (activity_start_time > timestamp_end_time) {
								$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
								$('.ms_kj_lock_bj_500').append('<span style="color: #e61c4c;font-size: .32rem;display: block;text-align: center;margin-top: .2rem;">恭喜！成功砍到秒杀价，记得按时来抢哦！</span>')

							} else if (activity_start_time < timestamp_end_time < activity_end_time) {
								$('#layer_add').text('立即秒杀');
							}
						} else {
							if (res.oneselfBarginTime == 0) {

								if (activity_start_time > timestamp_end_time) {
									//没有再砍一刀
									$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
								} else if (activity_start_time < timestamp_end_time < activity_end_time) {
									//没有再砍一刀
									$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
								}
							} else {
								if (activity_start_time > timestamp_end_time) {
									$('#layer_add').addClass('ms_foot_btn').text('砍一刀');
									$('.foot_to_c_pt_li>ul>span').show();
									SetTimes(res.bargainNextTime);
								} else if (activity_start_time < timestamp_end_time < activity_end_time) {
									//有再看一道
									$('#layer_add').addClass('ms_foot_btn').text('立即秒杀');
								}
							};
						};
					} else if (res.pageState == 501) {//未报名活动页面
						$('.ms_kj_lock_bj').show();
						$('.ms_kj_lock_bj_500').hide();
						if (activity_start_time < timestamp_end_time && timestamp_end_time < activity_end_time) {
							//活动页面
							$('#layer_add').text('我要报名');
						}
					} else if (res.pageState == 502) {//砍价页面
						$('.ms_kj_lock_bj').hide();
						$('.ms_kj_lock_bj_500').show();
						$('.ms_kj_lock_bj_500>label').text(res.enrollName);
						$('#ms_xj_500').text(res.currentPrice);
						$('#ms_kd_500').text(res.barginPrice);
						$('#ykcs').text(res.bargainNum);
						$('#zgkjcs').text(res.needBargin);

						if (isInteger(res.successPrice)) {
							$('#kj_jg_500').text(parseInt(res.successPrice));
						} else {
							$('#kj_jg_500').text(res.successPrice);
						}
						if (res.isSuccess == 1) {
							if (res.buyerActivityEnrollId == 0) {//自己未参加活动
								if (activity_start_time > timestamp_end_time) {
									//非该报名者看到的页面：

								} else if (activity_start_time < timestamp_end_time < activity_end_time) {
									//非该报名者看到的页面：
									$('#layer_add').addClass('ms_foot_btn');
								}
							} else {
								//参加活动的人显示这个按钮
								$('#layer_add').text('返回我的页面');
								$('#layer_add').attr("data-activityId", res.activityId);
								$('#layer_add').attr("data-buyerActivityEnrollId", res.buyerActivityEnrollId);
							};
							if (res.isBargin == 310) {
								$('.layer_bj').show();
								$('#layer_landliness').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
								$('body').css('overflow-y', 'hidden');

							} else if (res.isBargin == 316) {
								if (res.msTag != 1) {
									AjaxNullTips('已经砍到最低价');
								}
								$('#ms_kd_500').parent().hide();
							} else if (res.isBargin == 313) {
								if (res.msTag != 1) {
									AjaxNullTips('你已经帮TA砍过了');
								}
								$('#ms_kd_500').parent().hide();
							} else if (res.isBargin == 314) {
								if (res.msTag != 1) {
									AjaxNullTips('不可以帮自己重复砍价');
								}
								$('#ms_kd_500').parent().hide();
							} else if (res.isBargin == 312) {
								if (res.msTag != 1) {
									AjaxNullTips('砍价成功，已砍到底价');
								}
								$('#ms_kd_500').parent().hide();
							}
						} else {
							if (res.isBargin == 310) {//砍价弹出框动画效果
								//显示砍价动画效果
								$('body').css('overflow-y', 'hidden');
								$('.layer_bj').show();
								$('#layer_landline').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
								$('#ues_name').text(res.enrollName);
								$('#layer_landline_num').text(res.barginPrice + '元');
								if (res.buyerActivityEnrollId == 0) {//自己未参加活动
									//帮砍者未参加活动:
									if (activity_start_time > timestamp_end_time) {

									} else if (activity_start_time < timestamp_end_time < activity_end_time) {
										$('#layer_add').addClass('ms_foot_btn');
									}
								} else {
									//帮砍者已经参加了活动：
									$('#layer_add').text('返回我的页面');
									$('#layer_add').attr("data-activityId", res.activityId);
									$('#layer_add').attr("data-buyerActivityEnrollId", res.buyerActivityEnrollId);
								};
							} else if (res.isBargin == 311) {
								$('#ms_kd_500').parent().hide();
								if (res.msTag != 1) {
									AjaxNullTips('活动已下架，不可砍价');
								}
								//此活动已下架，不可砍价
							} else if (res.isBargin == 312) {
								$('#ms_kd_500').parent().hide();
								if (res.msTag != 1) {
									AjaxNullTips('此活动已开始，不可砍价');
								}
								//此活动已结束，不可砍价
							} else if (res.isBargin == 313) {
								$('#ms_kd_500').parent().hide();
								if (res.msTag != 1) {
									AjaxNullTips('你已经帮TA砍过了');
								}
								if (res.buyerActivityEnrollId == 0) {//自己未参加活动
									//帮砍者未参加活动:
									if (activity_start_time > timestamp_end_time) {

									} else if (activity_start_time < timestamp_end_time < activity_end_time) {
										$('#layer_add').addClass('ms_foot_btn');
									}
								} else {
									$('#layer_add').text('返回我的页面');
									$('#layer_add').attr("data-activityId", res.activityId);
									$('#layer_add').attr("data-buyerActivityEnrollId", res.buyerActivityEnrollId);
								};
							} else if (res.isBargin == 314) {
								$('#ms_kd_500').parent().hide();
								if (res.msTag != 1) {
									AjaxNullTips('不可以帮自己重复砍价');
								}
								//不可以帮自己重复砍价
							} else if (res.isBargin == 315) {
								$('#ms_kd_500').parent().hide();
								if (res.msTag != 1) {
									AjaxNullTips('没到达可砍价时间');
								}
								//没到达可砍价时间
							};
							//进入帮忙砍价页面
						}
					};


					if (res.payType == 0) {
						payType = 0;
					} else {
						payType = 1;
					};
					if (res.msTag == 1) {
						$('.ms_kj_lock_bj_500_box').append('<img style="position: absolute;width: 1.44rem;height: 1.22rem;display: block;right: -.5rem;top: -.2rem;" src="../images/ms/mscg-b35ba12a75.png" />');
						$('#layer_add').addClass('ms_foot_btn');
					}
				};


				if (activity_start_time > timestamp_end_time) {
					$('.ms_g_time').append('<em>' + res.startDate.substr(0, 16) + '</em><span>开抢</span>');
					$('.ms_g_time').show();

				} else {
					if (res.payType == 0) {
						$('.ms_g_time').show();
						$('.ms_g_time').append('<em>' + res.startDate.substr(0, 16) + '</em><span>开抢</span>');
					} else {
						$('.ms_g_time').append('<span>需预付</span><em>' + res.prepayPrice + '</em><span>元</span>');
					}
				}
				if (res.enrollBenefit != '') {
					$('.ms_fl_text').html(decodeURI(unescape(res.enrollBenefit)).replace(/\r?\n/g, "<br/>"));
				} else {
					$('.ms_fl').hide();
				}
				$('.originalPrice').text(res.originalPrice);
				$('.goodnum').text(res.goodsNum);
				if (timestamp_end_time < activity_start_time) {
					SetTime(res.startDate);
					$('#xg_timer').text('开始');
				} else if (activity_end_time > timestamp_end_time && timestamp_end_time > activity_start_time) {
					SetTime(res.endDate);
					$('#xg_timer').text('结束');
				};
				if (activity_end_time < timestamp_end_time) {
					$('#layer_add').addClass('ms_foot_btn').text('活动已结束');
					$('#layer_share').hide();
				};
				if (res.haveGood == 0) {
					if (res.msTag != 1) {
						AjaxNullTips('商品已经秒杀完了');
					}
					$('#layer_add').addClass('ms_foot_btn');
				}
				if (res.activityStatus == 0) {
					$('#layer_add').addClass('ms_foot_btn').text('活动已下架');
				}
				if (res.winningList != undefined && res.winningList.length != 0) {
					var str = ''
					for (var i of res.winningList) {
						var first_name = i.name.substring(0, 1);
						var last_name = i.name.substring(i.name.length - (i.name.length - 2), i.name.length);
						var fina_name = first_name + '*' + last_name;
						str += '<li>' +
							'<ul>' +
							'<li style="width:20%;" >' + i.ranking + '</li>' +
							'<li style="width:30%;">' + fina_name + '</li>' +
							'<li  style="width:50%;">' + formatDate(i.date) + '</li>' +
							'</ul>' +
							'</li>';
					};
					$('.ms_list_ul').append(str);
				} else {
					$('.ms_list').hide();
				};

				if ($('.ms_list_ul').children('li').length < 4) {
					$('.pt_nojion_list_open').hide();
				}
				if (res.goodsDesc.goodsDescInfo != '') {
					var str = unescape(res.goodsDesc.goodsDescInfo).replace(/\r?\n/g, "<br/>");
					$('#goods_desc').append("<p>" + str + "</p>");
				};
				if (res.goodsDesc.goodsDescPic != '') {
					// $('#goods_desc').append('<img src="'+ res.goodsDesc.goodsDescPic+banner_img_w+banner_ww+'" />');
					var numImgArr = res.goodsDesc.goodsDescPic.split(',');
					$(numImgArr).each(function (index, el) {
						if( el.indexOf('.gif') != -1 ){
							$('<img src="' + el + gifW + banner_ww + '" />').appendTo('#goods_desc');
						}else{
							$('<img src="' + el + banner_img_w + banner_ww + '" />').appendTo('#goods_desc');
						};
					})
				};
				var strs = unescape(res.activityRules).replace(/\r?\n/g, "<br/>");
				$('#get_rule_detail').append('<p>' + strs + '</p>');
				$('#get_info_title').text(unescape(res.getInfo.getInfoTitle));
				var info_deta = unescape(res.getInfo.getInfoDetail).replace(/\r?\n/g, "<br/>");
				if (info_deta != '') {
					$('#get_info_detail').append('<p>' + info_deta + '</p>');
				} else {
					$('#get_info_detail').hide();
					$('#get_info_title').hide();
				};
				$('#seller_info_title').text(unescape(res.sellerInfo.title));
				if (res.sellerInfo.sellerInfoDetail.length != 0) {
					for (var i = 0; i < res.sellerInfo.sellerInfoDetail.length; i++) {
						if (res.sellerInfo.sellerInfoDetail[i].type == 'text') {
							var str = unescape(res.sellerInfo.sellerInfoDetail[i].value).replace(/\r?\n/g, "<br/>");
							$('#seller_info_detail').append('<p>' + str + '</p>');
						} else if (res.sellerInfo.sellerInfoDetail[i].type == 'image') {
							if( res.sellerInfo.sellerInfoDetail[i].value.indexOf('.gif') != -1 ){
								$('#seller_info_detail').append('<img src="' + res.sellerInfo.sellerInfoDetail[i].value + gifW + banner_ww + '"/>');
							}else{
								$('#seller_info_detail').append('<img src="' + res.sellerInfo.sellerInfoDetail[i].value + banner_img_w + banner_ww + '"/>');
							};
						} else if (res.sellerInfo.sellerInfoDetail[i].type == 'video') {
							var temp = getTxUrl(decodeURIComponent(res.sellerInfo.sellerInfoDetail[i].value));
							temp = 'https://v.qq.com/iframe/player.html?vid=' + temp ;
							$('#seller_info_detail').append('<iframe width="100%" height="100%" src="' + temp + '" frameborder=0 "allowfullscreen"></iframe>');
						};
					};
				} else {
					$('#seller_info_detail').hide();
					$('#seller_info_title').parent().hide();
				}
				// $('.text_no_unline').prop('href', 'tel://' + res.contactPhone);
				BannerImgtype(res);
				$('#kj_title').text(unescape(res.title));
				//接入轮播
				if (res.bargainTurnList.length != 0) {
					if (res.bargainTurnList[0].name != '' && res.bargainTurnList[0].name != null) {
						for (var i = 0; i < res.bargainTurnList.length; i++) {
							var first_name = res.bargainTurnList[i].name.substring(0, 1);
							var last_name = res.bargainTurnList[i].name.substring(2, 3);
							var fina_name = first_name + '*' + last_name;
							if (res.bargainTurnList[i].name.length < 3) {
								$('.scroll_name>ul').append('<li><span>' + first_name + '*</span><span>' + formatDate(res.bargainTurnList[i].date) + '</span><span>' + res.bargainTurnList[i].info + '</span></li>');
							} else {
								$('.scroll_name>ul').append('<li><span>' + first_name + '*' + last_name + '</span><span>' + formatDate(res.bargainTurnList[i].date) + '</span><span>' + res.bargainTurnList[i].info + '</span></li>');
							}
						};
					}
				} else {
					$('.scroll_name').hide();
				}

				if (ms_type == 81) {
					if( res.msRankingList.length < 30 ){
						bargainRankingList_length = false;
						// $('.list_text').text('已经到底了');
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
					if( res.msRankingList.length < 30 ){
						bargainRankingList_length = false;
						// $('.list_text').text('已经到底了');
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



				// 缓存用户报名信息
				if (res.buyerName && res.buyerMobile) { // 如果存在缓存，则展示
					$('#inform_name').val(res.buyerName);
					$('#inform_tel').val(res.buyerMobile);
					$('#information_clk').addClass('layer_information_div');
				}
				/**************************刘亚 音乐和特效*******************************/
				var _music = res.music;
				var _animate = res.animation;
				if (_animate != '' && _animate != 'null' && _animate != undefined) {
					// 如果动画不为空
					var animateImgs = _animate.split(',');
					mySnow.GiftList = animateImgs;
					mySnow.initBySpeed();
				} else {
					$('#animateControlBtn').hide();
				}
				if (_music != '' && _music != 'null' && _music != undefined) {
					myBgMusic.src = _music;
				} else {
					$('#musicControlBtn').hide();
				}
				/********************************************************************/
			} else if (res.status == '001') {
				AjaxNullTips('系统异常');
			} else if (res.status == '002') {
				AjaxNullTips('参数异常');
			} else if (res.status == 400) {
				AjaxNullTips('活动信息异常');
			} else if (res.status == 401) {
				window.location.href = '../no_present_record-ec28e4864d.html';
			} else if (datas.status == 701) {
				window.location.href = globalUrl + '/error.htm?code=' + datas.status;
			} else {
				AjaxNullTips(datas.result.message);
			};
		},
		error: function (res) {
			Loading('end');
			AjaxErrorTips();
		}
	});
};



function AutoScroll() {
	$('.scroll_name').find("ul").animate({
		marginTop: ".3rem"
	},
		500,
		function () {
			$(this).css({
				marginTop: "0px"
			}).find("li").eq(0).appendTo(this);
		});
}
setInterval(AutoScroll, 3000);


var thisCoupon = new Coupon(); // 初始化优惠券创建组件对象
	var thisTextMark = new TextMark(); // 初始化编辑组件对象
	var thisBScroll = new BScroll('.coupon-Pop_container', {
		scrollY: false,
		scrollX: true,
		click: true,
	});

	getAbleCouponList(1, 50); // 首次进入页面默认展示期限中的优惠券的前十条