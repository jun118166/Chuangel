(function() {
	IU.namespace('IU.util');
	IU.util.init = function() {

	}
	IU.util.createCode = function() {
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
	};
	IU.util.checkPhone = function(phoneNum) {
		if(!(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phoneNum))) {
			return false;
		}
		return true;
	};
	IU.util.sendMsg = function(id, time) {
		var eventId = $(id);
		var flag = true;
		var timer = null;
		var tNow = time;
		eventId.click(function() {
			if(flag) {
				var uMobile = $("#txtMobile").val();
				var start = $("#SetColor").val();
				if(!IU.util.checkPhone(uMobile)) {
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
			}
			flag = false;
		});

		function setClass(eventId, start, class_name) {
			if(start == 1) {
				eventId.addClass('cxhq');
			} else {
				eventId.removeClass('cxhq');
			}

		}

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
	};
})();