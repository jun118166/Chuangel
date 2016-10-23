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
	IU.util.checkPhone = function(phoneNum){
		if(!(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phoneNum))){
			return false;
		}
	};	
})();