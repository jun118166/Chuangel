//var host = 'http://chuangelapi.shaoshengweb.cn/api/';
var host = 'http://localhost:3536/api/';

function getData(param, callback) {
	if($.isArray(param)) param = param.join('/');
	$.ajax({
		type: "get",
		url: host + param,
		async: false,
		success: function(res) {
			callback(res.data);
		}
	});
}

function postData(actionName, param, callback, isfull) {
	$.ajax({
		type: "post",
		url: host + actionName,
		data: param,
		async: false,
		success: function(res) {
			if(isfull) callback(res);
			else callback(res.data);
		}
	});
}
/*
 * 获取页面参数
 */
function geturlparam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) {
		return decodeURI(r[2]);
	}
	return null; //返回参数值
}
/*
 * 页面跳转
 */
function jump(url) {
	var isFullPath = url.indexOf('http') > -1;

	if(isFullPath) {
		location.href = url;
	} else {
		var pathname = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
		location.href = location.origin + pathname + url;
	}
};
/*
 * 生成页面验证码
 */
function createCode() {
	var code = "";
	var codeLength = 4; //验证码的长度
	var codeChars = new Array(2, 3, 4, 5, 6, 7, 8, 9,
		'a', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
	for(var i = 0; i < codeLength; i++) {
		var charNum = Math.floor(Math.random() * 52);
		code += codeChars[charNum];
	}
	return code;
}
/*
 * 校验手机号码格式
 */
function checkPhone(phoneNum) {
	if(!(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phoneNum))) return false;
	return true;
}
/*
 * 发送短信
 */
function sendMsg(id, time) {
	var eventId = $(id);
	var flag = true;
	var timer = null;
	var tNow = time;
	eventId.click(function() {
		if(flag) {
			var uMobile = $("#txtMobile").val();
			var start = $("#SetColor").val();
			if(!checkPhone(uMobile)) {
				$('.err_mobile').text('手机号为空或格式错误').show();
				$('.err_login_msg').text('手机号为空或格式错误').show();
				return false;
			} else {
				$('.err_mobile').hide();
			}
			if(start == 1) {
				setClass(eventId, 1, 'cxhq');
			} else {
				setClass(eventId, 1, 'cxfs');
				eventId.css('color', '#ff5000');
			}
			eventId.html(time + '秒重新获取');
			timer = setInterval(run, 1000); {
				eventId.css('color', '#b3b3b3');
				$('.err_imgcode').hide();
				$('.err_login_msg').hide();
			}
			getData('SMS/SendMsg?phone=' + uMobile, function(data) {
				console.log(data);
			});
		}
		flag = false;
	});

	function run() {
		var start = $("#SetColor").val();
		time--;
		eventId.html(time + '秒重新获取');
		if(time < 1) {
			flag = true;
			time = tNow;
			if(start == 1) {
				setClass(eventId, 2, 'cxhq');
			} else {
				//setClass(eventId, 2, 'cxfs');
				eventId.css('color', '#ff5000');
			}
			eventId.css('color', '#ff5000');
			eventId.html("获取验证码");
			clearInterval(timer);
		}
	}

	function setClass(eventId, start, class_name) {
		if(start == 1) {
			eventId.addClass('cxhq');
		} else {
			eventId.removeClass('cxhq');
		}
	}
};
/*
 * 获取状态名称
 */
function getstatus(i) {
	var s = '';
	switch(i) {
		case '0':
			s = '已取消';
			break;
		case '5':
			s = '创建成功';
			break;
		default:
			break;
	}
	return s;
}
/*
 * 获取状态图片
 */
function getstatusImg(i) {
	var img = 'createdorder';
	switch(i) {
		case '0':
			img = 'yiquxiao';
			break;
		default:
			break;
	}
	return img;
}
/*
 * 获取支付状态
 */
function getcost(i) {
	return i ? '未支付' : '已支付';
}
$(function() {
	var urls = ['login.html', 'index.html', 'usercenter.html', 'device.html', 'device-method.html', 'stepInfo.html','choice-phone.html'];
	var arry = location.href.split('/');
	var url = arry[arry.length - 1];
	if(url.indexOf('?') > 0) url = url.substr(0, url.indexOf('?'));
	if(urls.indexOf(url) < 0 && url) {
		var phoneNo = sessionStorage.getItem('phone');
		if(!phoneNo) jump('login.html');
	}
});