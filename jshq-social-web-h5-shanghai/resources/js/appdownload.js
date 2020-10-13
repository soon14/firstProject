var qqxbUrl = "https://h5.hrs100.com/appDownLoad";
var qqxbDotNetApi = "base_sendIOSAppDownloadInfo";
var qqxbDotNetUrl = "https://api2.qinqinxiaobao.com/api.axd?api=";
$(function(){
    $('.ydc').on('click',function(){
        $('.ydc').hide();
    })
    //1：下载app
	if(getUrlParam("download")==1){
		location.href=qqxbUrl+'/qqxb';
	}else if(getUrlParam("download")==2){
		location.href=qqxbUrl+'/hrs100';
	}
})

//下载亲亲小保
function getQqxbDownUrl(){
	var appId = "905879095";
	var appName = "qqxb";
	var fromApp = "1";
	appDownload(appId,appName,fromApp,qqxbUrl);
}
//下载hrs
function getHrsDownUrl(){
	var appId = "1372653388";
	var appName = "hrs100";
	var fromApp = "2";
	appDownload(appId,appName,fromApp,qqxbUrl);
}
//下载app
function appDownload(appId,appName,fromApp,qqxbUrl){
	var userAgent = navigator.userAgent;
    var channel = getUrlParam("channel");
    //渠道下载
    if(channel != null){
    	//ios
    	if(!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
    		var md = new MobileDetect(userAgent);
     		iosAppDownload(fromApp,channel,md.os(),md.mobile(),appName);
    	}
    	//微信
    	if(userAgent.indexOf("MicroMessenger")>-1){
    		$('.ydc').show();
    	}
    	window.location = qqxbUrl+'/'+appName+'/'+channel;
    	return;
	}
    //微信下载
	if(userAgent.indexOf("MicroMessenger")>-1){
		if(!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
			window.open('https://itunes.apple.com/cn/app/id'+appId);
			return;
		}
		$('.ydc').show();
		window.history.pushState({},0,"?download="+fromApp);
        return;
    }
	//当前浏览器普通下载
	window.location = qqxbUrl+'/'+appName;
}

//ios 渠道下载
function iosAppDownload(fromApp,channel,os,model,appName){
	var adid = getUrlParam("adid") || "";
	//保存到cookie
	setCookie("adid",adid,1);
	setCookie("channel",channel,1);
	//生成时间戳
	var ts = Math.round(new Date().getTime()/1000).toString();
	var channel_sign = hexMD5(fromApp+channel+adid+ts);
	//生成随机数
	var random = Math.floor(Math.random()*(100+1));
	var deviceId = "HKDA"+hexMD5(ts+model+os+appName+random);
	execCoy(deviceId);
	$.ajax({
		url:getRequestUrl(qqxbDotNetApi,qqxbDotNetUrl),
		type:"post",
		async:false, 
		data:{
			fromApp:fromApp,//1-亲亲小保，2-HRS100
			channel:channel,//渠道码
			adid:adid,//广告位
			deviceId:deviceId,//设备信息
			ts:ts,//时间戳
			channel_sign:channel_sign//32位MD5
		},
		success:function(){
		}
	});
}
//解析url，获取参数
function getUrlParam(paramName){
	var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
    	return  unescape(r[2]); 
    }else{
    	return null;
    }
}
//写入到cookie
function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
//写入剪切板
function execCoy(text) {
    const input = document.createElement('INPUT');
    input.style.opacity  = 0;
    input.style.position = 'absolute';
    input.style.left = '-100000px';
    document.body.appendChild(input);
    input.value = text;
    input.select();
    input.setSelectionRange(0, text.length);
    document.execCommand('copy');
    document.body.removeChild(input);
    return true;
}