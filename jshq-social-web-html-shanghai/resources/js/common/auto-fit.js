var curren_href = location.href;
var curren_protocol = location.protocol;
var curren_host = location.host;
var curren_pathname = location.pathname;
//console.info("curren_href:",curren_href);
//console.info("curren_protocol=",curren_protocol);
//console.info("curren_host:",curren_host);
console.info("curren_pathname:",curren_pathname);
//手机标准
var mobile_1 = /AppleWebKit.*Mobile/i;
var mobile_2 = /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Nubia/;
//h5
if (mobile_1.test(navigator.userAgent) || (mobile_2.test(navigator.userAgent))) {
    //如果是h5端,但是当前不在手机页面
    if (curren_href.indexOf("/m/") == -1) {
        //转到pc
        if (curren_pathname == '/') {
            var url = curren_protocol + '//' + curren_host + '/m' + '/index.html';
        } else {
            var url = curren_protocol + '//' + curren_host + '/m' + curren_pathname;
        }
        window.location.href = url;
        // console.log(url);
        // console.log(curren_pathname);
        //console.info("url to pc:",url);
        //window.location.href = url;
    } else {
    	//console.log(curren_pathname);
    	if(curren_href.indexOf("/m/index.html") != -1){
    		window.location.href = "http://m.qinqinxiaobao.com";
    	}else{
			var curren_pathname_1 = curren_pathname.replace("/m", "");
        	window.location.href = "http://m.qinqinxiaobao.com" + curren_pathname_1;
    	}

    }
} else {
    //pc
    //如果是pc端.但是当前不在pc页面
    if (curren_href.indexOf("/m/") >= 0) {
        //转到h5
        var url = curren_href.replace("/m/", "/");
        //console.info("url to h5:",url);
        window.location.href = url;
    } else {
        //console.info("current pc,html pages");
    }
}