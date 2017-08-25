var serializeJavascript = require('serialize-javascript')

module.exports = JSONGlobals

function JSONGlobals(hash, value) {
    if (typeof hash === "string") {
        var key = hash
        hash = {}
        hash[key] = value
    }

    var payload = '<script id="json-globals" type="application/json">';

    // adding `isJSON` option makes it so that serializeJavascript behaves EXACTLY like `JSON.stringify` BUT sanitizes against XSS
    // dates are serialized as strings, regex are empty objects, and functions are undefined
    // @see https://github.com/yahoo/serialize-javascript/tree/2b1e4c78e3be3246390e2f723da70042cc4fcaf3#optionsisjson
    payload += serializeJavascript(hash, {isJSON: true});
    payload += '</script>';

    return payload
}
