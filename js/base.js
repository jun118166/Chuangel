/*
 * 提供一些基础方法 与语言 结构相关性较大 与业务逻辑相关性较小 
 */

/*
 * 命名空间
 */
var IU = {};
IU.namespace = function(str) {
	var arr = str.split("."), o = IU;
	for (i = (arr[0] == "IU") ? 1 : 0; i < arr.length; i++) {
		o[arr[i]] = o[arr[i]] || {};
		o = o[arr[i]];
	}
}
function geturlparam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) {
		return decodeURI(r[2]);
	}
	return null; //返回参数值
}
function getData(param, success){
		
}