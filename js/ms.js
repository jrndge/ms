   var bm_state = true,
	ms_type = 81,//秒杀形式     81：报名 82：砍价
	payType = 0; //支付方式     0线下支付 1线上支付
	
	
	
		var thisBScroll = new BScroll('.coupon-Pop_container', {
				scrollY: false,
				scrollX: true,
				click: true
			});
	
	$('#file').click(function () {
		$('#pics').click();
	});
	//拍照
	$('#to_camera').click(function () {
		$('#to_cameras').click();
	});
	$('#pics').change(function () {
		 $("#active_kj_banner").attr("src",URL.createObjectURL($(this)[0].files[0]));
		 $('#close_img_tab').click();
	});
	$('#to_cameras').change(function () {
		 $("#active_kj_banner").attr("src",URL.createObjectURL($(this)[0].files[0]));
		 $('#close_img_tab').click();
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
		$('#chose_img').animate({ bottom: '0rem' }, 200);
		$('#chose_img').css('z-index','101');
//		ImgShowOrHide($('#active_kj_banner'));
//		$('.industry_img_list').animate({ bottom: '-5rem' }, 200);
	});
	$('#close_img_tab').click(function () {
		$('#chose_img').animate({ bottom: '-3rem' }, 200);
		$('#chose_img').css('z-index','2');
		$('.bargain_btn').animate({ bottom: '0rem' }, 2000);
		    $('.bargain_btn').css('display','block');
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
	
	
//	var thisCoupon = new Coupon(); // 初始化优惠券创建组件对象
//	var thisTextMark = new TextMark(); // 初始化编辑组件对象
//	var thisBScroll = new BScroll('.coupon-Pop_container', {
//		scrollY: false,
//		scrollX: true,
//		click: true,
//	});
//
//	getAbleCouponList(1, 50); // 首次进入页面默认展示期限中的优惠券的前十条
	
	var thisTextMark = new TextMark(); // 初始化编辑组件对象
thisTextMark.isHandleShow('.textMark-item');
		// 添加文本
		$('#addConponText').click(function () {
			if ($('.textMarkIndex').length >= 6) {
				warns('最多添加6条');
				return;
			}
			thisTextMark.addTextMark('.textMark');
		});
		// 添加优惠券
		$('#addConponImg').click(function () {
			if ($('.textMarkCoupon').length >= 6) {
				warns('最多添加6条')
				return;
			}
			$('.layer_bj').show();
			$('.coupon-Pop_select').show().addClass('slideInUp');
			thisBScroll.refresh();
		});
		// 选中标识
		$('.coupon-Pop_scroll').on('click', '.couponItem', function () {
			$(this).find('.coupon-select').toggleClass('couponSelected');
		})
		// 取消
		$('#couponChanel').click(function () {
			$('.coupon-select').removeClass('couponSelected');
			$('.layer_bj').hide();
			$('.coupon-Pop_select').hide().removeClass('slideInUp');
		});
		// 确定
		$('#couponSure').click(function () {
			var _num = parseInt($('.couponSelected').length) + parseInt($('.textMarkCoupon').length);
			if (_num > 6) {
				warns('最多添加6条')
				return;
			}
			$('.couponSelected').each(function (index, el) {
				thisTextMark.addCouponMark('.textMark');
				$(el).removeClass('couponSelected').parents('.couponItem').clone(true).appendTo('.nowAddCoupon>.textMark_coupon');
			})
			$('.layer_bj').hide();
			$('.coupon-Pop_select').hide().removeClass('slideInUp');
		});
		// 向上向下删除的操作
		$('.textMark').on('click', '.tHandleBottom', function () {
			var changeObj = $(this).parents('.textMark-item');
			thisTextMark.goBottom(changeObj);
		})
		$('.textMark').on('click', '.tHandleTop', function () {
			var changeObj = $(this).parents('.textMark-item');
			thisTextMark.goTop(changeObj);
		})
		$('.textMark').on('click', '.tHandleDel', function () {
			var changeObj = $(this).parents('.textMark-item');
			thisTextMark.delMark(this);
		})
		// 输入字数限制
		$('.textMark').on('input', '.textMark_input', function () {
			var valLen = $(this).text().length;
			if (valLen > 50) {
				$(this).text($(this).text().slice(0, 49)); // 多余五十个字的时候，截取前五十个字
			}
		})
		
