var curren_href = location.href;
var curren_protocol = location.protocol;
var curren_host = location.host;
var curren_pathname = location.pathname;
//console.info("curren_href:",curren_href);
//console.info("curren_protocol=",curren_protocol);
//console.info("curren_host:",curren_host);
//console.info("curren_pathname:",curren_pathname);
//手机标准
var mobile_1 = /AppleWebKit.*Mobile/i;
var mobile_2 = /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Nubia/;

//var pc_host = 'localhost:8096';
//var h5_host = 'localhost:8097';
var pc_host = 'www.qinqinxiaobao.com';
var h5_host = 'm.qinqinxiaobao.com';
//h5
if (mobile_1.test(navigator.userAgent) || (mobile_2.test(navigator.userAgent))) {
    //如果是h5端,但是当前不在手机页面
    //console.log(curren_host)
    if(curren_host==pc_host){
    	var url = curren_protocol + '//' + h5_host + curren_pathname;
    	window.location.href = url;
    }else{

    }
} else {
    //pc
    //如果是pc端.但是当前不在pc页面
    if (curren_host==h5_host) {
        //转到h5
        var url = curren_protocol + '//' + pc_host + curren_pathname;
        //console.info("url to h5:",url);
        window.location.href = url;
        //console.log(url);
    } else {
        //console.info("current pc,html pages");
    }
}









