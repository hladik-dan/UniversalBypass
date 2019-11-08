let injected = false;

document.addEventListener("DOMContentLoaded", () => {
    if (injected) {
        return;
    }
    injected = true;

    let injectScript = document.createElement("script");
    injectScript.type = "text/javascript";
    injectScript.src = safari.extension.baseURI + "inject.js";
    document.body.appendChild(injectScript);

    let result = location.href.match(/https?:\/\/w*\.?(.*)\/(.*)/i);
    let domain = encodeURIComponent(result[1]);
    let path = encodeURIComponent(result[2]);

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState != 4
            || xmlHttpRequest.status != 200
            || xmlHttpRequest.response.length < 1) {
            return;
        }

        location.assign(xmlHttpRequest.responseText);
    };

    xmlHttpRequest.open("POST", "https://universal-bypass.org/crowd/query_v1", true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpRequest.send("domain=" + domain + "&path=" + path);
});
