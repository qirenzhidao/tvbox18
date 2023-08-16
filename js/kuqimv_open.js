import { load, _ } from "assets://js/lib/cat.js";

let key = "酷奇MV";
let HOST = "https://www.kuqimv.com";
let siteKey = "";
let siteType = 0;
const PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";

async function request(reqUrl, referer, mth, data, hd) {
    const headers = {
        "User-Agent": PC_UA,
    };
    if (referer) headers.referer = encodeURIComponent(referer);
    let res = await req(reqUrl, {
        method: mth || "get",
        headers: headers,
        data: data,
        postType: mth === "post" ? "form" : "",
    });
    return res.content;
}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;
}

async function home(filter) {
    var html = await request(HOST);
    var $ = load(html);
    var class_parse = $(".main > li > a[href*=play]");
    var classes = [];
    classes = _.map(class_parse, (cls) => {
        var typeId = cls.attribs["href"];
        typeId = typeId.substring(typeId.lastIndexOf("/") + 1).replace(".html", "");
        return {
            type_id: typeId,
            type_name: cls.children[0].data,
        };
    });
    var filterObj = {};
    return JSON.stringify({
        class: _.map(classes, (cls) => {
            cls.land = 1;
            cls.ratio = 1.78;
            return cls;
        }),
        filters: filterObj,
    });
}

async function homeVod() {
    var link = HOST + "/play/9_1.html";
    var html = await request(link);
    var $ = load(html);
    var items = $("div.mv_list > li");
    var videos = _.map(items, (it) => {
        var a = $(it).find("a:first")[0];
        var img = $(it).find("img:first")[0];
        var singer = $($(it).find("div.singer")[0]).text().trim();
        var remarks = $($(it).find("span.lei_03")[0]).text().trim();
        return {
            vod_id: a.attribs.href.replace(/.*?\/play\/(.*).html/g, "$1"),
            vod_name: a.attribs.title,
            vod_pic: img.attribs["src"],
            vod_remarks: "🎤" + singer + "｜" + remarks || "",
        };
    });
    return JSON.stringify({
        list: videos,
    });
}

async function category(tid, pg, filter, extend) {
    if (pg <= 0 || typeof pg == "undefined") pg = 1;
    var link = HOST + "/play/" + tid + "_" + pg + ".html";
    var html = await request(link);
    var $ = load(html);
    var items = $("div.mv_list > li");
    var videos = _.map(items, (it) => {
        var a = $(it).find("a:first")[0];
        var img = $(it).find("img:first")[0];
        var singer = $($(it).find("div.singer")[0]).text().trim();
        var remarks = $($(it).find("span.lei_03")[0]).text().trim();
        return {
            vod_id: a.attribs.href.replace(/.*?\/play\/(.*).html/g, "$1"),
            vod_name: a.attribs.title,
            vod_pic: img.attribs["src"],
            vod_remarks: "🎤" + singer + "｜" + remarks || "",
        };
    });
    var hasMore = $("div.lei_page > a:contains(下一页)").length > 0;
    var pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 24,
        total: 24 * pgCount,
        list: videos,
    });
}

async function detail(id) {
    var vod = {
        vod_id: id,
        vod_remarks: "",
    };
    var playlist = ["观看视频" + "$" + id];
    vod.vod_play_from = "道长在线";
    vod.vod_play_url = playlist.join("#");
    return JSON.stringify({
        list: [vod],
    });
}

async function play(flag, id, flags) {
    var link = HOST + "/skin/kuqimv/play.php";
    var ref = HOST + "/play/" + id + ".html";
    var pdata = { id: id };
    var playUrl = JSON.parse(await request(link, ref, "post", pdata)).url;
    var headers = {
        Referer: HOST,
    };
    return JSON.stringify({
        parse: 0,
        url: playUrl,
        header: headers,
    });
}

async function search(wd, quick, pg) {
    if (pg <= 0 || typeof pg == "undefined") pg = 1;
    let link = HOST + "/search.php?key=" + wd + "&pages=" + pg;
    var html = await request(link);
    var $ = load(html);
    var items = $("div.video_list > li");
    var videos = _.map(items, (it) => {
        var a = $(it).find("a:first")[0];
        var singer = $($(it).find("div.singer")[0]).text().trim();
        var remarks = $($(it).find("span.lei_04")[0]).text().trim();
        return {
            vod_id: a.attribs.href.replace(/.*?\/play\/(.*).html/g, "$1"),
            vod_name: a.attribs.title,
            vod_pic: "https://www.kuqimv.com/static/images/cover/singer.jpg",
            vod_remarks: "🎤" + singer + "｜" + remarks || "",
        };
    });
    var hasMore = $("div.lei_page > a:contains(>)").length > 0;
    var pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 20,
        total: 20 * pgCount,
        list: videos,
        land: 1,
        ratio: 1.78,
    });
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        search: search,
    };
}