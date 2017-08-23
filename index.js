var serializeJavascript = require('serialize-javascript')

module.exports = JSONGlobals

function JSONGlobals(hash, value) {
    if (typeof hash === "string") {
        var key = hash
        hash = {}
        hash[key] = value
    }

    var payload = '<script id="json-globals" type="application/json">';
    payload += JSON.stringify(hash);
    payload += '</script>';

    return payload
}
