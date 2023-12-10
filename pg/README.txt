把zip文件解壓縮到安卓設備的/sdcard/tvbox/JS/目錄
複製lib/tokentemplate.json成爲lib/tokenm.json，并填寫必要的内容

特別警告：據傳阿里要求使用者不得使用多綫程加速方式使用阿里云盤資源，若并發鏈接數超過10有可能導致被限制訪問或封禁帳號的處理，所以下方綫程限制設置超過10所需承擔的風險請使用者自行斟酌。

阿里云盤用戶使用阿里云盤APP升級到5.0以上(訪問www.alipan.com升級），可以把自己當作阿里云盤的VIP用戶。也可以嘗試使用alist
openapi之外的其他第三方開發者提供的openapi接口來獲取解除限速的優待。黨使用其他第三方開發者的openapi接口時，修改配置文件中open_api_url的設置，要寫到他的完整地址，例如http://aliopenapi.test.com/access_token。並提前通過相應openapi提供方的網站獲取其專屬的opentoken（不可直接使用alist的opentoken）並填入open_token字段。
可以透过配置中的“阿里夸克配置”的視頻源來實現快捷方便的獲取32位token及opentoken的功能。在“阿里夸克配置”中掃過任何一個OpenToken后，會自動激活“轉存原畫”功能

提示：如果遇到極速GO原畫反復快速報錯，不一定是被封號，可嘗試殺掉播放器重啓，或重啓整個播放設備解決。
提示2：如果遇到“轉存原畫”速度被限制在2M左右，那麽請嘗試在阿里云盤APP裏退出登錄，然後重新登錄，然後刪除播放設備SD卡的TV目錄，在播放器上重新掃碼登錄。

tokenm.json格式説明：
{
"token":"這裏填寫阿里云盤的32位token，也可以不填寫，在播放阿里云盤内容時會彈出窗口，點擊QrCode，用阿里云盤app掃碼",
"open_token":"這裏填寫通過alist或其他openapi提供方申請的280位aliyun openapi token，也可以不寫，會自動隱藏轉存原畫",
"thread_limit":32, //這裏是阿里云盤的GO代理的并發協程數或java代理的并發綫程數，若遇到賬號被限制并發數，請將此數值改爲10
"is_vip":true, //是否是阿里云盤的VIP用戶，設置為true后，固定4綫程，不受thread_limit控制。如本設置項目不是true，則自動隱藏“轉存原畫”
"quark_thread_limit":32, //這裏是夸克網盤GO代理的并發協程數或java代理的并發綫程數，若遇到賬號被限制並發數，請將此數值改爲10
"quark_is_vip":false, //是否是夸克網盤的VIP用戶，設置為true后，固定10綫程，不受quark_thread_limit控制
"vod_flags":"4k|4kz|auto", //這裏是播放阿里雲的畫質選項，4k代表不轉存原畫（GO原畫），4kz代表轉存原畫,其他都代表預覽畫質,可選的預覽畫質包括qhd,fhd,hd,sd,ld，
"quark_flags":"4kz|auto", //這裏是播放夸克網盤的畫質選項，4kz代表轉存原畫（GO原畫），其他都代表轉碼畫質,可選的預覽畫質包括4k,2k,super,high,low,normal
"aliproxy":"這裏填寫外部的加速代理，用於在盒子性能不夠的情況下，使用外部的加速代理來加速播放，可以不填寫",
"proxy":"這裏填寫用於科學上網的地址，連接openapi或某些資源站可能會需要用到，可以不填寫",
"open_api_url":"https://api.xhofe.top/alist/ali_open/token", //這是alist的openapi接口地址，也可使用其他openapi提供商的地址。
"danmu":true,//是否全局開啓阿里云盤所有csp的彈幕支持，聚合類CSP仍需單獨設置，例如Wogg, Wobg
"quark_danmu":true,//是否全局開啓夸克網盤的所有csp的彈幕支持, 聚合類CSP仍需單獨設置，例如Wogg, Wobg
"quark_cookie":"這裏填寫通過https://pan.quark.cn網站獲取到的cookie，會很長，全數填入即可。"
}
