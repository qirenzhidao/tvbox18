var rule = {
    //title:'麦豆com',
    host:'https://www.ikanbot.com',
    //url:'/movie_bt_series/fyclass/page/fypage',
    //https://www.ikanbot.com/search?q=%E6%96%97%E7%BD%97%E5%A4%A7&p=2
    searchUrl:'/search?q=**&p=fypage',
    searchable:0,
    quickSearch:0,
    filterable:0,
    headers:{'User-Agent':'MOBILE_UA',},
    //class_name:'国产&港台&欧美&韩剧&日剧&泰剧&剧集&电影&动漫&综艺',
    //class_url:'guocanju&gangtai&en&hanju&riju&taiju&tv&movie&ac&zongyi',
	//cate_exclude:'留言|幸运码|更多播放线路|蚂蚁导航|迷历史',
	play_parse:true,
    //推荐:'.newindex&&ul&&li;img&&alt;img&&data-original;.jidi&&Text;a&&href',
    //一级:'.mrb&&ul&&li;img&&alt;img&&data-original;.jidi&&Text;a&&href',
    推荐:'', //这里可以为空，这样点播不会有内容
    一级:'', //一级的内容是推荐或者点播时候的一级匹配
    // 二级 title: 片名;类型
    // 二级 desc: 主要信息;年代;地区;演员;导演
    // 或者 {title:'',img:'',desc:'',content:'',tabs:'',lists:'',tab_text:'body&&Text',list_text:'body&&Text',list_url:'a&&href'} 同海阔dr二级
    二级:'js:try {VOD=[]; let html1=request(input);pdfh=jsp.pdfh;VOD.vod_id=pdfh(html1, "#current_id&&value");VOD.vod_name=pdfh(html1, "h2&&Text");VOD.vod_pic=pdfh(html1, "img&&data-src");VOD.vod_actor=pdfh(html1, ".celebrity&&Text");VOD.vod_area=pdfh(html1, ".country&&Text");VOD.vod_year=pdfh(html1, ".year&&Text");VOD.vod_remarks="";VOD.vod_director="";VOD.vod_content="";log(input);input="https://www.ikanbot.com/api/getResN?videoId="+input.split("/").pop()+"&mtype=2";let html=request(input);print(html);html=JSON.parse(html);let episodes=html.data.list; let playMap={};if (typeof play_url==="undefined"){var play_url=""}episodes.forEach(function(ep){let playurls=JSON.parse(ep["resData"]);playurls.forEach(function(playurl){let source=playurl["flag"];if (!playMap.hasOwnProperty(source)){playMap[source]=[]}playMap[source].append(playurl["url"])})});let playFrom=[];let playList=[];Object.keys(playMap).forEach(function(key){playFrom.append(key);playList.append(playMap[key])});let vod_play_from=playFrom.join("$$$");let vod_play_url=playList.join("$$$");VOD["vod_play_from"]=vod_play_from;VOD["vod_play_url"]=vod_play_url}catch (e){log("获取二级详情页发生错误:"+e.message)}',
    搜索:'div[class*=media-left];a&&img&&alt;a&&img&&src;;a&&href',//第三个是描述，一般显示更新或者完结
    //搜索:'.media-left;a&&img&&alt;a&&img&&src;;a&&href',//第三个是描述，一般显示更新或者完结
}