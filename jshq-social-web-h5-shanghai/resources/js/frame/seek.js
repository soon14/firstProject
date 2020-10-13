/**
 * 在线咨询通用引用
 * 只有pc页面会用到.h5暂时没有这个逻辑
 */
$(function(){
	// var aMiddindex = null;
	// $('.hrsloginpop-top1').find('li').mouseenter(function() {
	// 	$(this).addClass('middleactive').siblings().removeClass('middleactive');
	// 	aMiddindex = $(this).index();
	// 	$('.hrsloginpop-main1').find('div').eq(aMiddindex).show().siblings('div').hide();
	// })
	// $('.qqxb-flex-rightqy1,.qqxb-flex-right-click1').on("click", function () {
	// 	$('.hrsloginpop-box2').hide();
	// 	$('.hrsloginpop-box1').show();
	// 	$('.hrsloginpop-box1').find('ul').find('li').eq(0).addClass('middleactive').siblings().removeClass('middleactive');
	// 	$('.hrsloginpop-main1').find('div').eq(0).show().siblings('div').hide();
	// })
	// $('.hrsloginfixedrightclose').on("click", function () {
	// 	$(this).parent().parent().hide();
	// })
	// /*个人*/
	// $('.hrsloginpop-top2').find('li').mouseenter(function() {
	// 	$(this).addClass('middleactive').siblings().removeClass('middleactive');
	// 	aMiddindex = $(this).index();
	// 	$('.hrsloginpop-main2').find('div').eq(aMiddindex).show().siblings('div').hide();
	// })
	// $('.qqxb-flex-rightgr1').on("click", function (){
	// 	$('.hrsloginpop-box1').hide();
	// 	$('.hrsloginpop-box2').show();
	// 	$('.hrsloginpop-box2').find('ul').find('li').eq(0).addClass('middleactive').siblings().removeClass('middleactive');
	// 	$('.hrsloginpop-main2').find('div').eq(0).show().siblings('div').hide();
	// })
	// $('.hrsloginfixedrightclose').on("click", function () {
	// 	$(this).parent().parent().hide();
	// })
	/** h5页面由于一个页面有多个呼起,所以用class **/
	$('.begin-talk').on("click", function() {
		if ($('#nb_invite_wrap').length > 0) {
			$('#nb_invite_wrap').click();
		}
	});
	
	// $('.begin-talk').on("click", function() {
	// 	console.log(window.PP.isOpen());
	//     window.PP.open();
	//     var flag = setInterval(function(){
	//         if(window.PP.isOpen()){
	//             var html = "<div id='close-pp-message' style='cursor:pointer;z-index:2147483000!important;position:fixed!important;bottom:20px;right:20px;width:60px!important;height:60px!important;border-radius:50%!important;background:#286efa;background-color:rgb(79,176,232);opacity:1;transform:scale(1);'><div style='display:flex;align-items:center;justify-content:center;position:absolute;top:0;bottom:0;width:100%;opacity: 1;'><img style='margin:0!important;padding:0!important;width:26px!important;max-width:26px!important;min-width:26px!important;min-height:26px!important;max-height:26px!important;height:26px!important;' src='https://ppmessage.cn/ppcom/assets/img/icon-close.png' alt='close' ></div></div>";
	//             $('.Messenger').append(html);
	//             clearInterval(flag);
	//         }
	//     }, 300)
	// });
	// $('#pp-container').on("click","#close-pp-message", function() {
	//     window.PP.close();
	// });
})

// 企业咨询电话按钮
/*
document.getElementById("callBtn").onclick = function () {
	lxb.call(document.getElementById("telInput"));
};
*/
// 个人咨询电话按钮
/*
document.getElementById("callBtnMy").onclick = function () {
	lxb.call(document.getElementById("telInputMy"));
};
*/