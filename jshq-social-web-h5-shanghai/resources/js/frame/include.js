//ppmessage init
window.ppSettings = {
    hide_launcher: true,
    page_mode:'CONVERSATION',
    app_uuid: 'c31f2fb4-912f-11ea-ac06-00163e0c79f6',
    server_url: 'https://ppmessage.cn'
}; (function() {
    var w = window,
    d = document;
    function l() {
        var a = d.createElement('script');
        a.type = 'text/javascript';
        a.async = !0;
        a.charset = 'utf-8';
        a.src = 'https://ppmessage.cn/ppcom/assets/shim/shim.js';
        var b = d.getElementsByTagName('script')[0];
        b.parentNode.insertBefore(a, b)
    }
    l();
})();