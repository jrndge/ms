/*
 * lCalendar日期控件
 * 
 * 作者：黄磊
 * 
 * 邮箱：xfhxbb@yeah.net
 * 
 * Copyright 2016
 * 
 * 创建于：2016-01-08
 */
window.lCalendar = (function() {
	var MobileCalendar = function() {
		this.gearDate;
		this.minY = 1900;
		this.minM = 1,
			this.minD = 1,
			this.maxY = 2099,
			this.maxM = 12,
			this.maxD = 31
	}
	MobileCalendar.prototype = {
		init: function(params) {
			this.type = params.type;
			this.trigger = document.querySelector(params.trigger);
			if (this.trigger.getAttribute("data-lcalendar") != null) {
				var arr = this.trigger.getAttribute("data-lcalendar").split(',');
				var minArr = arr[0].split('-');
				this.minY = ~~minArr[0];
				this.minM = ~~minArr[1];
				this.minD = ~~minArr[2];
				var maxArr = arr[1].split('-');
				this.maxY = ~~maxArr[0];
				this.maxM = ~~maxArr[1];
				this.maxD = ~~maxArr[2];
			}
			this.bindEvent(this.type);
		},
		bindEvent: function(type) {
			var _self = this;
			//呼出日期+时间插件
			function popupDateTime(e) {
				if( _self.trigger.id == 'start_time' ){
        			if( old_endtime != '' ){
            			layer.open({
						    content: '活动已开始不可编辑开始时间'
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
					  	});
					  	return false;
			  		};
    			};
    			if( !ms_edit_state ){
    				layer.open({
					    content: '秒杀已开始不可修改时间'
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
				  	});
				  	return false;
    			};
				_self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDatetime";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>'+
                    '<div class="date_btn lcalendar_finish">确定</div>'+
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="datetime_roll">' +
                    '<div>' +
                    '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                    '<div class="date_grid">' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                    '<div class="date_grid">' +
                    '<div>时</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>分</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' + //date_roll
                    '</div>' + //date_roll_mask
                    '</div>';
                document.body.appendChild(_self.gearDate);
				dateTimeCtrlInit();
				 var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileDateTime);
                var date_dd = _self.gearDate.querySelector(".date_dd");
                var time_hh = _self.gearDate.querySelector(".time_hh");
                var time_mm = _self.gearDate.querySelector(".time_mm");
                date_dd.addEventListener('touchstart', gearTouchStart);
                time_hh.addEventListener('touchstart', gearTouchStart);
                time_mm.addEventListener('touchstart', gearTouchStart);
                date_dd.addEventListener('touchmove', gearTouchMove);
                time_hh.addEventListener('touchmove', gearTouchMove);
                time_mm.addEventListener('touchmove', gearTouchMove);
                date_dd.addEventListener('touchend', gearTouchEnd);
                time_hh.addEventListener('touchend', gearTouchEnd);
                time_mm.addEventListener('touchend', gearTouchEnd);
			}
			//初始化年月日时分插件默认值
			 function dateTimeCtrlInit() {
                var date = new Date();
                var dateArr = {
                    dd: date.getDate() - 1,
                    hh: date.getHours(),
                    mi: date.getMinutes()
                };
                if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-|\s|:)\d{1,4}/g);
                   
                   
					dateArr.dd = rs[2].replace(/-/g, "") - 1;
                    dateArr.hh = parseInt(rs[3].replace(/\s0?/g, ""));
                    dateArr.mi = parseInt(rs[4].replace(/:0?/g, ""));
                } else {
                   
                }

				
            	$('body').css('overflow-y','hidden');
//              _self.gearDate.querySelector(".date_dd").setAttribute("val", '0');
                _self.gearDate.querySelector(".date_dd").setAttribute("val", '0');
                setDateGearTooth();
                _self.gearDate.querySelector(".time_hh").setAttribute("val", dateArr.hh);
                _self.gearDate.querySelector(".time_mm").setAttribute("val", dateArr.mi);
                setTimeGearTooth();
            }
			//呼出时间插件
			function popupTime(e) {
				_self.gearDate = document.createElement("div");
				_self.gearDate.className = "gearDate";
				_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
					'<div class="date_btn_box">' +
					'<div class="date_btn lcalendar_cancel">取消</div>' +
					'<div class="date_btn lcalendar_finish">确定</div>' +
					'</div>' +
					'<div class="date_roll_mask">' +
					'<div class="time_roll">' +
					'<div>' +
					'<div class="gear date_dd" data-datetype="time_hh"></div>' +
					'<div class="date_grid">' +
					'<div>时</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear time_hh" data-datetype="time_mm"></div>' +
					'<div class="date_grid">' +
					'<div>分</div>' +
					'</div>' +
					'</div>' +
					'<div>' +
					'<div class="gear time_mm" data-datetype="time_ss"></div>' +
					'<div class="date_grid">' +
					'<div>秒</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>';
				document.body.appendChild(_self.gearDate);
				timeCtrlInit();
				var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
				lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
				var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
				lcalendar_finish.addEventListener('touchstart', finishMobileTime);
				var date_dd = _self.gearDate.querySelector(".date_dd");
				var time_mm = _self.gearDate.querySelector(".time_mm");
				var time_ss = _self.gearDate.querySelector(".time_ss");
				date_dd.addEventListener('touchstart', gearTouchStart);
				time_mm.addEventListener('touchstart', gearTouchStart);
				time_ss.addEventListener('touchstart', gearTouchStart);

				date_dd.addEventListener('touchmove', gearTouchMove);
				time_mm.addEventListener('touchmove', gearTouchMove);
				time_ss.addEventListener('touchmove', gearTouchMove);

				date_dd.addEventListener('touchend', gearTouchEnd);
				time_mm.addEventListener('touchend', gearTouchEnd);
				time_ss.addEventListener('touchend', gearTouchEnd);


			}

			//重置日期节点个数
            function setDateGearTooth() {
                var passY = _self.maxY - _self.minY + 1;
                var date_dd = _self.gearDate.querySelector(".date_dd");       
                if (date_dd && date_dd.getAttribute("val")) {
                    var itemStr = "";
 					function GetDateStr(AddDayCount) {  
					   var dd = new Date();  
					   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
					   var y = dd.getFullYear();  
					   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  

					  var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
					   var w = dd.getDay();
					   var ws = '';
					   switch (w){
					   	case 1:
					   		ws = '星期一';
					   		break;
						case 2:
					   		ws = '星期二';
					   		break;
					   	case 3:
					   		ws = '星期三';
					   		break;	
						case 4:
					   		ws = '星期四';
					   		break;
				   		case 5:
					   		ws = '星期五';
					   		break;
				   		case 6:
					   		ws = '星期六';
					   		break;
				   		case 0:
					   		ws = '星期日';
					   		break;
					   }
					   return y+"-"+m+"-"+d+"-"+ws;   
					}  
                    var datas = new Date(); 
                   
                    	for( var i=0; i < 730; i++ ){
                    		var GetDateStrs = GetDateStr(i);
                    		var GetDateStrss = GetDateStrs.substr(5,GetDateStrs.length -1);
                    		itemStr += "<div class='tooth' val='"+GetDateStrs+"'>"+GetDateStrss+"</div>";

                    	}
                   
                    date_dd.innerHTML = itemStr;
               		$('.date_dd').children('.tooth').eq(date_dd.getAttribute("val")).addClass('tooth_active');
                    date_dd.style["-webkit-transform"] = 'translate3d(0,' + (10 - 1* 2) + 'em,0)';
                    date_dd.setAttribute('top', 10 -  1* 2 + 'em');
                } else {
                    return;
                }
            }
			//重置时间节点个数
			function setTimeGearTooth() {
				var time_hh = _self.gearDate.querySelector(".time_hh");
				if (time_hh && time_hh.getAttribute("val")) {
					var i = "";
					var hhVal = parseInt(time_hh.getAttribute("val"));
					for (var g = 0; g <= 239; g++) {
						i += "<div class='tooth' val='"+ g%24 +"'>" + g%24 + "</div>";
					}
					time_hh.innerHTML = i;
					$('.time_hh').children('.tooth').eq(time_hh.getAttribute("val")).addClass('tooth_active');
					time_hh.style["-webkit-transform"] = 'translate3d(0,' + (8 - hhVal * 2) + 'em,0)';
					time_hh.setAttribute('top', 8 - hhVal * 2 + 'em');
				} else {
					return
				}
				var time_mm = _self.gearDate.querySelector(".time_mm");
				if (time_mm && time_mm.getAttribute("val")) {
					var i = "";
					var mmVal = parseInt(time_mm.getAttribute("val"));
					for (var g = 0; g <= 599; g++) {
						i += "<div class='tooth' val='"+ g%60 +"'>" + g%60 + "</div>";
					}
					time_mm.innerHTML = i;
					$('.time_mm').children('.tooth').eq(time_mm.getAttribute("val")).addClass('tooth_active');
					time_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
					time_mm.setAttribute('top', 8 - mmVal * 2 + 'em');
				} else {
					return
				}
				
				var time_ss = _self.gearDate.querySelector(".time_ss");
				if (time_ss && time_ss.getAttribute("val")) {
					var i = "";
					var mmVal = parseInt(time_ss.getAttribute("val"));
					for (var g = 0; g <= 59; g++) {
						i += "<div class='tooth'>" + g + "</div>";
					}
					time_ss.innerHTML = i;
					time_ss.style["-webkit-transform"] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
					time_ss.setAttribute('top', 8 - mmVal * 2 + 'em');
				} else {
					return
				}
			}
			//触摸开始
			function gearTouchStart(e) {
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				clearInterval(target["int_" + target.id]);
				target["old_" + target.id] = e.targetTouches[0].screenY;
				target["o_t_" + target.id] = (new Date()).getTime();
				var top = target.getAttribute('top');
				if (top) {
					target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
				} else {
					target["o_d_" + target.id] = 0;
				}
			}
			//手指移动
			function gearTouchMove(e) {
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				target["new_" + target.id] = e.targetTouches[0].screenY;
				target["n_t_" + target.id] = (new Date()).getTime();
				var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
				target["pos_" + target.id] = target["o_d_" + target.id] + f;
				target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
				target.setAttribute('top', target["pos_" + target.id] + 'em');
				var val = Math.abs(Math.round((target["pos_" + target.id]-8)/2));
				$(target).children('.tooth_active').removeClass('tooth_active');
				target.children[val].classList.add('tooth_active');
			}
			//离开屏幕
			function gearTouchEnd(e) {
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break;
					}
				}
				var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
				if (Math.abs(flag) <= 0.2) {
					target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
				} else {
					if (Math.abs(flag) <= 0.5) {
						target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
					} else {
						target["spd_" + target.id] = flag / 2;
					}
				}
				if (!target["pos_" + target.id]) {
					target["pos_" + target.id] = 0;
				}
				rollGear(target);
			}
			//缓动效果
			function rollGear(target) {
				var d = 0;
				var stopGear = false;
				var passY = _self.maxY - _self.minY + 1;
				clearInterval(target["int_" + target.id]);
				target["int_" + target.id] = setInterval(function() {
					var pos = target["pos_" + target.id];
					var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
					pos += speed;
					if (Math.abs(speed) > 0.1) {} else {
						speed = 0.1;
						var b = Math.round(pos / 2) * 2;
						if (Math.abs(pos - b) < 0.02) {
							stopGear = true;
						} else {
							if (pos > b) {
								pos -= speed
							} else {
								pos += speed
							}
						}
					}
					if (pos > 8) {
						pos = 8;
						stopGear = true;
					}
					switch (target.dataset.datetype) {
						case "date_yy":
							var minTop = 8 - (passY - 1) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_mm":
							var date_yy = _self.gearDate.querySelector(".date_yy");
							//得到年份的值
							var yyVal = parseInt(date_yy.getAttribute("val"));
							var maxM = 11;
							var minM = 0;
							//当年份到达最大值
							if (yyVal == passY - 1) {
								maxM = _self.maxM - 1;
							}
							//当年份到达最小值
							if (yyVal == 0) {
								minM = _self.minM - 1;
							}
							var minTop = 8 - (maxM - minM) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2 + minM;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_dd":
							if (pos < -1460) {
                                pos = -1460;
                                setDuration();
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                          
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
						case "time_hh":
							if (pos < -3800) {
								pos = -3800;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = (Math.abs(pos - 8) / 2)%24;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_mm":
							if (pos < -11000) {
								pos = -11000;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2%60;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "time_ss":
							if (pos < -110) {
								pos = -110;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						default:
					}
					target["pos_" + target.id] = pos;
					target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
					target.setAttribute('top', pos + 'em');
					var val = Math.abs(Math.round((pos-8)/2));
					$(target).children('.tooth_active').removeClass('tooth_active');
					target.children[val].classList.add('tooth_active');
					d++;
				}, 30);
			}
			//控制插件滚动后停留的值
			function setGear(target, val) {
				val = Math.round(val);
				if( $(target).hasClass('time_mm') && val== 60){
					val = 0;
				}
				target.setAttribute("val", val);
				if (/date/.test(target.dataset.datetype)) {
					setDateGearTooth();
				} else {
					setTimeGearTooth();
				}
			}
			//取消
			function closeMobileCalendar(e) {
				$('body').css('overflow-y','auto');
				e.preventDefault();
				var evt = new CustomEvent('input');
				_self.trigger.dispatchEvent(evt);
				document.body.removeChild(_self.gearDate);
			}
			
			//日期时间确认
			function finishMobileDateTime(e) {
				$('body').css('overflow-y','auto');
				var passY = _self.maxY - _self.minY + 1;
				
				var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val")));
				var data_text = $('.date_dd').find('.tooth').eq(date_dd).attr('val');
				var date_texts = data_text.substr(0,10);
				date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
				var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
				time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
				var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
				time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
				_self.trigger.innerHTML = date_texts + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
				if( _self.trigger.id == 'start_time' ){
					if( $('#end_time').text() !='' ){
						if( _self.trigger.innerHTML < $('#end_time').text() ){
							closeMobileCalendar(e);
						}else{
							_self.trigger.innerHTML =  '';
							layer.open({
							    content: '开始时间要小于结束时间'
							    ,skin: 'msg'
							    ,time: 2 //2秒后自动关闭
						  	});
						}
					}else{
						closeMobileCalendar(e);
					}
				}else{
					closeMobileCalendar(e);
				}
			}
			//时间确认
			_self.trigger.addEventListener('click', {
				
				"datetime": popupDateTime,
				
			}[type]);
		}
	}
	return MobileCalendar;
})()