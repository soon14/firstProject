/** 百度商桥相关(在线咨询4html) **/
/**
 * 修改此类或者引用此类,务必确认和添加
 * <meta name="baidu-hm-key" content="xxx">
 */
var _hmt = _hmt || [];
(function() {
	var meta = document.querySelector('meta[name="baidu-hm-key"]');
	var key = "9448234ae2640d750ee95ac82fd619da";
	// if(meta != null){
	// 	key = meta.getAttribute('content');
	// }else{
	// 	key = "9448234ae2640d750ee95ac82fd619da";
	// }
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + key;
    //console.info(hm.src);
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
