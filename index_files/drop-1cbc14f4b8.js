/**
 * SnowGift -- 根据参数来生成随机下落的物品（背景动画）
 * 
 * 1. 目前生成动画的容器都在body
 * 
 * **/
function SnowGift(params) {
    this.NUM = 20; // 生成数量
    this.itemW = 18; // 个体的大小 单位px
    this.RandowW = 0; // 随机大小的范围
    // 随机的图片
    this.leftW = document.documentElement.clientWidth; // 狭路所占的宽度 默认与屏幕等宽
    // 以下两个参数控制图片的动画持续时间
    this.minSpeed = 2;  // 默认2
    this.maxSpeed = 10; // 默认10
    // 以下两个参数控制下落的动画持续时间
    this.minSpeed_drop = 20;  // 默认2
    this.maxSpeed_drop = 30; // 默认10
    // 以下两个参数控制动画延迟时间
    this.minSpeed_delay = 0;  // 默认2
    this.maxSpeed_delay = 1; // 默认10

    // 动画背景的高度
    this.MAXHEIGHT = 1000; // 单位px

    this.createTime = 2000; // 生成图片的速度

    this._tim = '';
}
SnowGift.prototype = {
    // 一次生成，循环动画
    init: function () {
        this.MAXHEIGHT = document.body.offsetHeight;
        this.dropHeightInit();
        var container = document.getElementsByTagName('body')[0];
        // 根据初始化配置的数量，生成下落的个体
        for (var i = 0; i < this.NUM; i++) {
            container.appendChild(this.createAGift());
        }
    },
    // 不断的生成和消失 -- 暂时不选用
    initBySpeed: function () {
        this.MAXHEIGHT = document.body.offsetHeight;
        // if(this.MAXHEIGHT >= 1500){
        //     this.minSpeed_drop = 45;  // 默认2
        //     this.maxSpeed_drop = 55; // 默认10
        // }
        // this.dropHeightInit();
        var container = document.getElementsByTagName('body')[0];
        var _that = this;
        container.appendChild(_that.createAGift());
        this._tim = setInterval(function () {
            container.appendChild(_that.createAGift());
            _that.judgeClean();
        }, this.createTime)
    },
    // 判断个体的消失 -- 暂时不选用
    judgeClean: function () {
        var _that = this;
        $('.dropItem').each(function (index, el) {
            $(el).on('animationend', function (event) {
                $(el).remove();
            })
        })
    },
    // 生成单个礼物的方法
    createAGift: function () {
        // 创建元素
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');
        // 随机图片
        image.src = this.GiftList[this.randomInteger(0, this.GiftList.length)];
        // 初始化个体在屏幕外的位置和大小
        leafDiv.style.top = "-10px";
        leafDiv.style.width = (Math.random() * (this.RandowW * 2) + (this.itemW - this.RandowW)) + 'px';
        leafDiv.style.height = (Math.random() * (this.RandowW * 2) + (this.itemW - this.RandowW)) + 'px';
        leafDiv.className = 'dropItem'
        leafDiv.style.left = this.pixelValue(this.randomInteger(0, this.leftW));
        // 随机css3动画类型
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
        leafDiv.style.webkitAnimationName = 'fade, drop';
        image.style.webkitAnimationName = spinAnimationName;
        // 随机动画持续的时间
        var fadeAndDropDuration = this.durationValue(this.randomFloat(this.minSpeed_drop, this.maxSpeed_drop));
        var spinDuration = this.durationValue(this.randomFloat(this.minSpeed, this.maxSpeed));
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        // 随机动画延迟
        var leafDelay = this.durationValue(this.randomFloat(this.minSpeed_delay, this.maxSpeed_delay));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

        image.style.webkitAnimationDuration = spinDuration;
        // 添加图片到容器
        leafDiv.appendChild(image);

        // 返回创建的个体
        return leafDiv;
    },
    // 根据最大高度  确定动画的高度
    dropHeightInit: function () {
        var linkIndex = 0;
        var styleLinks = document.styleSheets;
        for (var key in styleLinks) {
            var linkStr = styleLinks[key].href;
            if (typeof linkStr == 'string' && linkStr.indexOf('_style') > 0) {
                linkIndex = key;
            }
        }
        var styleRules = document.styleSheets[linkIndex].cssRules;
        for (var key in styleRules) {
            if (styleRules[key].type == 7 && styleRules[key].name == 'drop') {
                var ruleStr = styleRules[key].cssText;
                document.styleSheets[linkIndex].deleteRule(key);
                var newruleStr = ruleStr.replace('650', this.MAXHEIGHT);
                document.styleSheets[linkIndex].insertRule(newruleStr, key);
            }
        }
    },
    // 清楚动效
    closeGift: function () {
        $('#leafContainer').find('.dropItem').remove();
        clearInterval(this._tim);
    },
    /**
     * 数据处理的一些方法
     * **/
    randomInteger: function (low, high) {
        // 返回随机范围的整数
        return low + Math.floor(Math.random() * (high - low));
    },
    randomFloat: function (low, high) {
        // 返回随机范围的随机数
        return low + Math.random() * (high - low);
    },
    pixelValue: function (value) {
        // 返回带像素单位的值
        return value + 'px';
    },
    durationValue: function (value) {
        // 返回带时间单位的值
        return value + 's';
    }
};

// 根据路劲返回分类；
function rekey(el, obj) {
    for (var key in obj) {
        for (var a = 0; a < obj[key].length; a++) {
            for (var key2 in obj[key][a]) {
                if (obj[key][a][key2] == el) {
                    return key;
                }
            }

        }
    }
}
function reSecArr(el, obj) {
    var aa = [];
    for (var i = 0; i < obj[el].length; i++) {
        var smallObj = {};
        var _sObj = {};
        for (var key in obj[el][i]) {
            if (key == 'materialName') {
                smallObj.text = obj[el][i][key];
                _sObj.materialName = obj[el][i][key];
            }
            if (key == 'ossUrl') {
                _sObj.ossUrl = obj[el][i][key];
            }
        }
        smallObj.value = _sObj;
        aa.push(smallObj);
    }
    return aa;
}
// 根据路劲 序曲第二个索引
function reIndex(myItem, Arr) {
    for (var i = 0; i < Arr.length; i++) {
        // console.log('--' + myItem)
        if (Arr[i].ossUrl == myItem) {
            return i;
        }
    }
}


/**
 * 动效联动选择 -- 依赖picker.js
 * 
 * **/
function SnowPicker(pickerData) {
    this.flag = 'animateBtn'; // 触发选择器的元素 -- 绑定ID

    this.pickerDATA = pickerData;  // 传入需要选择的数据

    // 分级别存储到array
    this._class = []; // 存储分类
    this._item = []; // 存储个体
    this.selectedIndex = [0, 0]; // 默认选择的个体
    this.checked = [0, 0];   /* 已选选项 */
    this.noTip = '未选';

    this.title = '背景动效';
};
SnowPicker.prototype = {
    init: function (changeFn) {
        var _that = this;
        var nameEl = document.getElementById(this.flag);  // 选择音效的按钮
        if( this.pickerDATA != undefined ){
        	this.pickerDATA['无'] = [{ 'materialName': this.noTip, ossUrl: '' }];
        	this.creatListByObj(this.pickerDATA, this._class); // 生成种类数组
       	    this.creatListByArr(this.pickerDATA[this._class[this.selectedIndex[0]].text], this._item);
        }
        // 初始化
        if ($(nameEl).attr('data-am') == undefined || $(nameEl).attr('data-am') == '') {
            this.picker = new Picker({
                data: [this._class, this._item],
                selectedIndex: this.selectedIndex,
                title: this.title
            });
        } else {
            // 如果历史选择这保留
            var _checkClean = rekey($(nameEl).attr('data-am'), _that.pickerDATA);
            if (_checkClean == undefined || _checkClean == 'undefined') {
                this.picker = new Picker({
                    data: [this._class, this._item],
                    selectedIndex: this.selectedIndex,
                    title: this.title
                });
            } else {
                var firstArr = [];
                for (var key in this.pickerDATA) {
                    firstArr.push(key);
                }
                // 获取第一个值得索引
                for (var i = 0; i < firstArr.length; i++) {
                    if (firstArr[i] == rekey($(nameEl).attr('data-am'), _that.pickerDATA)) {
                        var firstIndex = (i + 1);
                    }
                }
                // 获取第二列渲染的数组
                var theKey = rekey($(nameEl).attr('data-am'), _that.pickerDATA);
                var theArr2 = reSecArr(theKey, _that.pickerDATA)
                // 获取第二个值得索引
                var aa = _that.pickerDATA[rekey($('#' + this.flag).attr('data-am'), _that.pickerDATA)];
                var bb = $(nameEl).attr('data-am');
                var secIndex = reIndex(bb, aa);
                this._item = theArr2;
                this.checked = [firstIndex, secIndex];
                this.picker = new Picker({
                    data: [this._class, this._item],
                    selectedIndex: [firstIndex, secIndex],
                    title: this.title
                });
            }
        }
        // 事件监听 -- 滚动切换 -- 切换切歌
        var _that = this;
        this.picker.on('picker.change', function (index, selectedIndex) {
            if (index === 0) {
                _that._item = []; // 当类别改变的时候 - 情况个体的数组
                _that.checked[0] = selectedIndex;
                _that.checked[1] = 0;
                _that.creatListByArr(_that.pickerDATA[_that._class[selectedIndex].text], _that._item);
                _that.picker.refillColumn(1, _that._item);
                _that.picker.scrollColumn(1, 0);
            }
            if (index === 1) {
                _that.checked[1] = selectedIndex;
            }
            var text1 = _that._class[_that.checked[0]].text;
            var text2 = _that._item[_that.checked[1]].value;
            // 优化，此处不再把数据渲染到dom,而是传入到方法的参数
            // $(nameEl).attr('data-am', text2.ossUrl);
            if (typeof changeFn == 'function') {
                changeFn(text2.ossUrl);
            }
        });
        // 事件监听 -- 确定选择 -- 关闭歌曲或者动效 -- 把数据保存在按钮
        this.picker.on('picker.select', function (selectedVal, selectedIndex) {
            var text1 = _that._class[selectedIndex[0]].text;
            var text2 = _that._item[selectedIndex[1]].value;
            $(nameEl).attr('data-am', text2.ossUrl);
            $(nameEl).attr('data-index', _that.checked);
            // 关闭效果
            if (_that.flag == 'animateBtn') {
                mySnow.closeGift(); // 清楚历史动效
            } else if (_that.flag == 'musicBtn') {
                myBgMusic.pause();
            }
        });
        // 事件监听 -- 取消选择 -- 关闭歌曲或者动效
        this.picker.on('picker.cancel', function (selectedVal, selectedIndex) {
            if (_that.flag == 'animateBtn') {
                mySnow.closeGift(); // 清楚历史动效
            } else if (_that.flag == 'musicBtn') {
                myBgMusic.pause();
            }
            // 回复初始选择
            // $(nameEl).attr('data-am', _that.historyChoose);
        });

        // 点击出现picker -- 如果选择的是初始的无 -- 则不播放效果 否则 播放按钮信息上的效果
        nameEl.addEventListener('click', function () {
            // 如果历史记录不为空 ，则记录到属性
            // 优化
            if (_that.flag == 'animateBtn') {
                var animateImgs = (_that._item[_that.checked[1]].value.ossUrl).split(',');
                mySnow.GiftList = animateImgs;
                if(animateImgs != ''){
                    mySnow.initBySpeed();
                }
            } else if (_that.flag == 'musicBtn') {
                var musLink = _that._item[_that.checked[1]].value.ossUrl;
                myBgMusic.src = _that._item[_that.checked[1]].value.ossUrl;
                myBgMusic.play();
            }
            _that.picker.show(); // 显示picker
        });
    },
    creatListByObj: function (obj, list) {
        for (var key in obj) {
            var temp = new Object();
            temp.text = key;
            if (key == '无') {
                list.unshift(temp)
            } else {
                list.push(temp);
            }
        }
    },
    creatListByArr: function (obj, list) {
        obj.forEach(function (item, index, arr) {
            var temp = new Object();
            temp.text = item.materialName;
            temp.value = item;
            list.push(temp);
        })
    }

}
