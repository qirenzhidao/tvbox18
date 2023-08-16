

function isSub(ext) {
    return ext == "srt" || ext == "ass" || ext == "ssa";
}

function getSize(size) {
    if (size <= 0) return "";
    if (size > 1024 * 1024 * 1024 * 1024.0) {
        size /= (1024 * 1024 * 1024 * 1024.0);
        return size.toFixed(2) + "TB";
    } else if (size > 1024 * 1024 * 1024.0) {
        size /= (1024 * 1024 * 1024.0);
        return size.toFixed(2) + "GB";
    } else if (size > 1024 * 1024.0) {
        size /= (1024 * 1024.0);
        return size.toFixed(2) + "MB";
    } else {
        size /= 1024.0;
        return size.toFixed(2) + "KB";
    }
}

function removeExt(text) {
    return text.indexOf('.') > -1 ? text.substring(0, text.lastIndexOf(".")) : text;
}

async function log(str) {
    console.debug(str);
}

function isVideoFormat(url) {
    var RULE = /http((?!http).){12,}?\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)\?.*|http((?!http).){12,}\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)|http((?!http).)*?video\/tos*/;
    if (url.indexOf("url=http") > -1 || url.indexOf(".js") > -1 || url.indexOf(".css") > -1 || url.indexOf(".html") > -1) {
        return false;
    }
    return RULE.test(url);
}

function jsonParse(input, json) {
    var jsonPlayData = JSON.parse(json);
    var url = jsonPlayData.url;
    if (url.startsWith("//")) {
        url = "https:" + url;
    }
    if (!url.startsWith("http")) {
        return null;
    }
    if (url === input) {
        if (!isVideoFormat(url)) {
            return null;
        }
    }
    var headers = {};
    var ua = jsonPlayData["user-agent"] || "";
    if (ua.trim().length > 0) {
        headers["User-Agent"] = " " + ua;
    }
    var referer = jsonPlayData.referer || "";
    if (referer.trim().length > 0) {
        headers["Referer"] = " " + referer;
    }
    var taskResult = {
        header: headers,
        url: url
    };
    return taskResult;
}

function debug(obj) {
    for (var a in obj) {
        if (typeof(obj[a]) == "object") {
            debug(obj[a]); //递归遍历
        } else {
            console.debug(a + "=" + obj[a]);
        }
    }
}

export { isSub, getSize, removeExt, log, isVideoFormat, jsonParse, debug};