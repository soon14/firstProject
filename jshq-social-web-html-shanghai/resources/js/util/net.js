var SECRETKEY = "QQXBldn833FFKSDJ";
var privateKey_pkcs1 = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgQCWgKEMNq4yRxV1x6e2ufRK8S23BbrrPHyFw9CZK7fJpYqreruQIWGdtC / j4x / KVvN6SnB4dzOLBaoM821OX6AgTpQIlyQdeYaykkj05dnvMC0tUwH2cOguEF4Sqk0EL3cAKQ3Ijb1U3pi + qdW4ivGym61xvkwFxviyWZV66zarkwIDAQABAoGAJUbx3M0UY2ag5Z3QqB0x6XgIOytjq009iIJCQhYGfR8QFD4fg + kIvR96tyaz4pGb19/ lMKlRrm72OiP3IHDl / 4kXmA7PUY4d3LoJTsXCrnJNQrPWD4DLs3iFpYWgymDqRFuVBv06OWjewXiEFDCybnlie6CahmL0q4EebYgIOTkCQQDRQQ3GvL0zOs6j  + 1lug6I4uHxn7t1RSBCqEB4G5HfU6vhL/ zxvYD4cIKPCOlKqVXp5fXeQk6gP5c0IGdl2vf7LAkEAuB + mtbKnAf6JcoRyCwIMs2S / KGU0IB53boj4KKSwsb / ffhg2ty36saekETWuRN8Rse5q8ExcFUmxMO7ZmYllWQJAAjGLYmzyEspoBiIJYvYwSiXs7 + 36FfMKca3vkqTseKfp6GoJiSVaIVNaRBv2Z + CzgviEu1hA58HB73bN58fAFwJBAKJ7e / iYIX1HDDA85Q8FzgN5gp + 5P5igijDHOodTXoJdmnKCF7brInIoSEbPomwwlkL47PIF0LUQhQdzoB83+ nECQDxZ8jh36Hq2iPp37yInXSoCEupGOWVroLqpiPuulxWZ  / vD6uIEyKVxYV2RQR / 0mMjYVgdrDoveJBkx1nDsD1+ A=-----END RSA PRIVATE KEY-----';
/**  成功 */
var errorCode_Success = 0;
/**  系统错误*/
var errorCode_SystemError100 = 100;
var loadTimeOut = 1000;
var isLoad = false;
var load;
/*
* type              请求的方式  默认为get
* url               发送请求的地址
* param             发送请求的参数
* dataType          返回JSON数据  默认为JSON格式数据
* callBack          请求的回调函数
*/
(function(){
    function AjaxRequest(opts){
        console.log('bbbbbbbbbbbbbbbb');
        this.type         = opts.type || "get";
        this.url          = opts.url;
        this.param        = opts.param || {};
        this.dataType     = opts.dataType || "json";
        this.callBack     = opts.callBack;
        this.doFail       = opts.doFail;
        this.complete     = opts.complete;
        this.showError    = opts.showError !== false;
        this.init();
    }

    AjaxRequest.prototype = {
        //初始化
        init: function(){
            this.sendRequest();
        },
        //发送请求
        sendRequest: function(){
            var self = this;
            var loadLastTime = localStorage.getItem('loadLastTime')
            var now = new Date().getTime()
            console.log(loadLastTime == 'null'|| loadLastTime == null || now - parseInt(loadLastTime) > loadTimeOut)
            if (loadLastTime == null || now - parseInt(loadLastTime) > loadTimeOut) {
                localStorage.setItem('loadLastTime', now)
                isLoad = true;
                load = $.load()
            }
            $.ajax({
                type: this.type,
                url: getRequestUrl(this.url),
                data: this.param,
                dataType: this.dataType,
                success: function(res){
                    // self.hideLoader();
                    if (res != null && res != "") {
                        if(typeof self.callBack == "function") {
                            if (Object.prototype.toString.call(self.callBack) === "[object Function]") {   //Object.prototype.toString.call方法--精确判断对象的类型
                                var errCode = parseInt(res.errcode);
                                console.log(self.showError)
                                console.log(typeof self.showError)
                                if (errCode == errorCode_Success) {
                                    //成功
                                    //解密 数据
                                    var encrypt_data = res.data;
                                    var decrypt_str = "";
                                    if (encrypt_data != null) {
                                        var decrypt_rsa = new RSAKey();
                                        decrypt_rsa = KEYUTIL.getKey(privateKey_pkcs1);
                                        for (var idx = 0; idx < encrypt_data.length; idx++) {
                                            var encStr = b64tohex(encrypt_data[idx])
                                            decrypt_str += decrypt_rsa.decrypt(encStr)
                                        }
                                    }
                                    var data = null;
                                    if (decrypt_str.length) {
                                        data = JSON.parse(decrypt_str);
                                    }
                                    res.data = data;
                                    self.callBack(res);
                                } else if (errCode == errorCode_SystemError100) {
                                    if (self.showError) {
                                        showShadow({ text: '系统繁忙，请稍后重试' })
                                    }
                                } else if (errCode == '26') {
                                    if (self.showError) {
                                        var errText = res.errmsg.substr(0, res.errmsg.length - 1).replace(/,/g, '，')
                                        showShadow({
                                            showCancle: true,
                                            cancleText: '取消',
                                            operateText: '去完善',
                                            text: '您的'+errText+'信息不完善',
                                            operateFunction: function () {
                                                console.log(self.param);
                                                window.location.href = '/html/agent/orderCreate/editEmployee-msg.html?employeeId=' + self.param.employeeId+'&returnBack=1';
                                            }
                                        })
                                    }
                                } else if (errCode == '12') {
                                    if (self.showError) {
                                        var errMsg = res.errmsg;
                                        showShadow({ text: errMsg })
                                    } else {
                                        self.doFail()
                                    }
                                } else if (errCode == '5') {
                                    if (self.showError) {
                                        showShadow({
                                            showCancle: true,
                                            cancleText: '取消',
                                            operateText: '去登录',
                                            text: '该手机号已注册',
                                            operateFunction: function () {
                                                console.log(self.param);
                                                window.location.href = '/html/agent/login/login.html'
                                            }
                                        })
                                    }
                                } else {
                                    if (self.showError) {
                                        var errMsg = res.errmsg;
                                        showShadow({ text: errMsg })
                                    } else {
                                        self.doFail()
                                    }
                                }

                            } else {
                                console.log("callBack is not a function");
                            }
                        }
                    }
                    if (isLoad == true) {
                        load.close()
                        isLoad = false
                    }
                },
                error: function (errMsg) {
                    if (typeof doFail == "function") {
                        if (isLoad == true) {
                            load.close()
                            isLoad = false
                        }
                        self.doFail();
                    }
                    console.log(errMsg);
                }
            });
        }
    };

    window.AjaxRequest = AjaxRequest;


    function AjaxRequestFile(opts){
        this.formData        = opts.formData;
        this.type         = opts.type || "get";
        this.url          = opts.url;
        this.isShowLoader = opts.isShowLoader || false;
        this.dataType     = opts.dataType || "json";
        this.callBack     = opts.callBack;
        this.doFail       = opts.doFail;
        this.complete     = opts.complete;
        this.init();
    }

    AjaxRequestFile.prototype = {
        //初始化
        init: function(){
            this.sendRequest();
        },
        //渲染loader
        showLoader: function(){
            // if(this.isShowLoader){
            //     var loader = '<div class="ajaxLoader"><div class="loader">加载中...</div></div>';
            //     $("body").append(loader);
            // }
        },
        //隐藏loader
        hideLoader: function(){
            // if(this.isShowLoader){
            //    $(".ajaxLoader").remove();
            // }
        },
        //发送请求
        sendRequest: function(){
            var self = this;
            var loadLastTime = localStorage.getItem('loadLastTime')
            var now = new Date().getTime()
            console.log(loadLastTime == 'null'|| loadLastTime == null || now - parseInt(loadLastTime) > loadTimeOut)
            if (loadLastTime == null || now - parseInt(loadLastTime) > loadTimeOut) {
                localStorage.setItem('loadLastTime', now)
                isLoad = true;
                load = $.load()
            }
            $.ajax({
                type: this.type,
                url: getRequestUrl(this.url),
                data: this.formData,
                dataType: this.dataType,
                processData: false,
                contentType: false,
                beforeSend: this.showLoader(),
                success: function(res){
                    // self.hideLoader();
                    if (res != null && res != "") {
                        if(typeof self.callBack == "function") {
                            if (Object.prototype.toString.call(self.callBack) === "[object Function]") {   //Object.prototype.toString.call方法--精确判断对象的类型
                                var errCode = parseInt(res.errcode);
                                if (errCode == errorCode_Success) {
                                    //成功
                                    //解密 数据
                                    var encrypt_data = res.data;
                                    var decrypt_str = "";
                                    if (encrypt_data != null) {
                                        var decrypt_rsa = new RSAKey();
                                        decrypt_rsa = KEYUTIL.getKey(privateKey_pkcs1);
                                        for (var idx = 0; idx < encrypt_data.length; idx++) {
                                            var encStr = b64tohex(encrypt_data[idx])
                                            decrypt_str += decrypt_rsa.decrypt(encStr)
                                        }
                                    }
                                    var data = null;
                                    if (decrypt_str.length) {
                                        data = JSON.parse(decrypt_str);
                                    }
                                    res.data = data;
                                    self.callBack(res);
                                } else if (errCode == errorCode_SystemError100) {
                                    showShadow({ text: '系统错误' })
                                } else if (errCode == '26') {
                                    console.log(res)
                                    showShadow({
                                        showCancle: true,
                                        cancleText: '取消',
                                        operateText: '去完善',
                                        text: '您的'+res.errmsg+'信息不完善',
                                        operateFunction: function () {
                                            console.log(self.param);
                                            window.location.href = '/html/agent/orderCreate/editEmployee-msg.html?employeeId=' + self.param.employeeId;
                                        }
                                    })
                                } else {
                                    console.log(res)
                                    var errMsg = res.errmsg;
                                    console.log(errMsg)
                                    // $('.service-dateBox').css({'display': 'hidden'})
                                    showShadow({ text: errMsg })
                                }

                            }else{
                                console.log("callBack is not a function");
                            }
                        }
                    }
                    if (isLoad == true) {
                        isLoad = false
                        load.close()
                    }
                },
                error: function (errMsg) {
                    if (typeof doFail == "function") {
                        if (isLoad == true) {
                            isLoad = false
                            load.close()
                        }
                        // self.hideLoader();
                        self.doFail();
                    }
                    alert('网络请求失败');
                    console.log(errMsg);
                }
            });
        }
    };

    window.AjaxRequestFile = AjaxRequestFile;
})();


/**
 * 得到URL地址
 */
function getRequestUrl(api,portUrl) {
    //前缀
    var prefixUrl = portUrl;
    //参数
    var av = "10";
    var v = "2.1";
    var imei = "";
    var imsi = "";

    //缓存
    var appInfo;
    //判断缓存是否存在
    if (!appInfo) {
        //时间戳
        var timestamp = Date.parse(new Date()) / 1000;
        //程序信息
        var appInfo = {};
        //手机型号
        appInfo["model"] = '';
        //操作系统版本
        appInfo["system"] = '';
        //时间戳
        appInfo["timestamp"] = String(timestamp);
    }
    var toSign = SECRETKEY + api + av + v + imei + imsi + timestamp;
    var sign = hexMD5(toSign);
    var requestUrl = prefixUrl + api + "&av=" + av + "&v=" + v + "&imei=" + imei + "&imsi=" + imsi + "&mb=" + appInfo.model + "&mv=" + appInfo.system + "&lat=&long=" + "&t=" + appInfo.timestamp + "&sign=" + sign;
    return encodeURI(requestUrl);
}