/** 百度商桥相关(在线咨询4h5) **/
/**
 * 修改此类或者引用此类,务必确认和添加
 * <meta name="baidu-hm-key" content="xxx">
 */
var _hmt = _hmt || [];
(function() {
	var meta = document.querySelector('meta[name="baidu-hm-key"]');
	var key = "ad64a5f0bb6fdedc85b8e48137e31544";
	// if(meta != null){
	// 	key = meta.getAttribute('content');
	// }else{
	// 	key = "ad64a5f0bb6fdedc85b8e48137e31544";
	// }
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + key;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
/** h5页面由于一个页面有多个呼起,所以用class **/
$(function(){
	var v = navigator.appVersion;
	var uc = v.split('UCBrowser/').length > 1  ? 1 : 0;
	if(uc){
		var u = navigator.userAgent;
		//var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if(isiOS){
			$(".begin-talk").click(function () {
				window.location.href = 'tel:4008929767';
			});
		}
	}

	$('.begin-talk').click(function() {
		//console.info("click");
		if ($('#nb_invite_ok').length > 0) {
		    $('#nb_invite_ok').click();
		}
	});
})
