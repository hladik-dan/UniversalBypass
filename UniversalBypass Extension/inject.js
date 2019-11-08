const xmlHttpRequests = {
    "/links/go" : (_response) => {
        return _response.url;
    }
};

XMLHttpRequest.prototype.openOriginal = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(_method, _url, _async, _user, _password) {
    let xmlHttpRequest = xmlHttpRequests[_url];
    if (xmlHttpRequest) {
        this.addEventListener("readystatechange", () => {
            if (this.readyState != 4
                || this.status != 200
                || this.response.length < 1) {
                return;
            }

            let referer = location.href;
            let target = xmlHttpRequest(JSON.parse(this.response));

            contribute(referer, target);
        });
    }

    this.openOriginal(_method, _url, _async, _user, _password);
}

function contribute(_referer, _target) {
    let result = _referer.match(/https?:\/\/w*\.?(.*)\/(.*)/i);
    let domain = encodeURIComponent(result[1]);
    let path = encodeURIComponent(result[2]);
    let target = encodeURIComponent(_target);

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState != 4
            || xmlHttpRequest.status != 200) {
            return;
        }

        location.assign(_target);
    };

    xmlHttpRequest.open("POST", "https://universal-bypass.org/crowd/contribute_v1", true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.send("domain=" + domain + "&path=" + path + "&target=" + target);
}
