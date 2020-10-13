$(function () {
    $(".code-close").on("click", function () {
        $(".CR_code").hide();
    });
    $(".share-show").on("click", function () {
        $(".CR_code").show();
    });
    if(navigator.userAgent.indexOf("QQXBUA")>=0){
        $("#top-b").hide();
        $(".share-wachat").hide();
        $(".news-about").hide();
        $('.space-line').hide();
    }else{
        $('.footer-fix').show();
    }
})

// $(".get-hiddened").on("click", function () {
//     $(this).hide();
//     $(".locution-main-box").addClass("locuqu-hidden");
//     $(".locuqu-der").addClass("locuqu-hidden-text");
//     $(".get-opened").show();
//     $('html,body').animate({
//         scrollTop: 0
//     }, 500);
// });
// $(".get-opened").on("click", function () {
//     $(this).hide();
//     $(".locution-main-box").removeClass("locuqu-hidden");
//     $(".locuqu-der").removeClass("locuqu-hidden-text")
//     $(".get-hiddened").show();
// });