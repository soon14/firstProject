var cookie_name ="";
var ticket_index ="";
var imgFront = 'https://file.qinqinxiaobao.com/1/';
$(function() {
    $.ajax({
        url : "/ticket/config",
        type : "POST",
        async : false,
        cache : false,
        dataType : "json",
        complete : function() {
        },
        success : function(result) {
            if (result.status) {
                //console.log(result)
                cookie_name = result.data.cookie_key_name;
                ticket_index = result.data.login_validation_index;
            }
        },
        error : function(result) {
            console.info("系统繁忙,请稍后重试！");
        }
    });
    $.ajax({
        url : ticket_index+"/"+Math.floor(Math.random()*1000),
        dataType : "jsonp",
        type : "GET",
        data : {
            callback : 'jump'
        },
        success : function(data) {
            console.log(data);
        }
    });
    //
    $(".logout").on("click",function(){
        $.ajax({
            url : "/logout",
            type : "POST",
            async : false,
            dataType : "json",
            complete : function() {
            },
            success : function(result) {
                if (result.status) {
                    //登出清空状态
                    $('.admin-info-nologin').show();
                    $('.admin-info-login').hide();
                }else{
                }
            },
            error : function(result) {
                console.info("系统繁忙,请稍后重试！");
            }
        });
    })
    $('.person-info').on('click', function () {
        window.location.href = '/myIndex';
    })
})
function jump(data){
    console.log("jump,"+data);
    $.cookie(cookie_name, data, {expires:3, path: '/' });
    $.ajax({
        url : "/ticket/auth",
        type : "POST",
        cache : false,
        dataType : "json",
        complete : function() {
        },
        success : function(result) {
            console.log(result);
            if (result.status && result.data && result.data.user.accountCategory != 3) {
                $('.admin-info-nologin').hide();
                $('.admin-info-login').show();
                var headUrl = result.data.user.headPortrait01;
                if (headUrl.indexOf("http://") != -1 || headUrl.indexOf('https://') != -1) {
                    $('.login-head-img').attr('src', result.data.user.headPortrait01);
                } else {
                    $('.login-head-img').attr('src', imgFront + result.data.user.headPortrait01);
                }
               $('.login-user-name').text(result.data.user.accountName);
            }else{
                console.info("can't get login info")
            }
        },
        error : function(result) {
            console.info("系统繁忙,请稍后重试！");
        }
    });
}
function login(data){
    console.log("need login");
}