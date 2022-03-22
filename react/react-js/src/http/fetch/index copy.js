function post(url, params, callback, headers, isWithoutToken = false, errorCallback) {

        console.log('post-请求接口:' + url);
        console.log('请求参数:' + JSON.stringify(params));
        if (!headers) {
            headers = {};
        }
        headers = Object.assign({
            'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON
            'Content-Type': 'application/json',
            "deviceKey": getDeviceId(),
            siteDomain: window.location.host,
            // siteId:0
        }, headers);
    
        if (!isWithoutToken) {
            headers['accessToken'] = localStorage.getItem('access_token');
        }
    
    
        let fetchOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params)
        };
    
        if (!!fetch && typeof fetch == "function") {
            fetch(url, fetchOptions).then((response) => response.json(), (error) => {
                return { code: "999999999", msg: "网络故障" }
            }).then((obj) => {
                msgTransform(obj);
    
                if (obj.code == 200) {
                    callback(obj.data);
                } else {
                    if (!!obj.msg) {
                        message.error(obj.msg);
                    }
                    if (!!errorCallback) {
                        errorCallback(obj)
                    }
                }
            })
    
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            for (var attrName in headers) {
                xhr.setRequestHeader(attrName, headers[attrName]);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    var res = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                    console.dir(res);
                    var obj = res;
                    msgTransform(obj);
                    if (obj.code == 200) {
                        callback(obj.data);
                    } else {
                        if (!!obj.msg) {
                            message.error(obj.msg);
                        }
                        if (!!errorCallback) {
                            errorCallback(obj)
                