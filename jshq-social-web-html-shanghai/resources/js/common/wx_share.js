$(document).ready(function () {
    var title = document.getElementsByTagName('title')[0].innerText;
    var meta = document.getElementsByTagName('meta');
    var imgUrl = $('[name="shareImg"]').attr('content') || 'https://www.qinqinxiaobao.com/resources/images/common/ICapp.png';
    var imgFront = 'https://img.qinqinxiaobao.com/';
    var share_desc = '';
    var imageUrl = '';
    if (imgUrl.indexOf('http') != -1) {
        imageUrl = imgFront + imgUrl;
    } else {
        imageUrl = imgUrl;
    }
    for(i in meta){
        if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){
            share_desc = meta[i].content;
        }
    }
    wx.config({
        debug : false,
        jsApiList : [
            'onMenuShareTimeline', //分享到朋友圈
            'onMenuShareAppMessage', //分享给朋友
        ]
    });
    wx.ready(function() {
        var shareData = {
            title : title,
            desc : share_desc,
            link : location.href,
            imgUrl : imageUrl,
            success:function(){

            }
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
    });
})