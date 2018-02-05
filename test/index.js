var test = require("tape")

var JSONGlobals = require("../index")

test("JSONGlobals is a function", function (assert) {
    assert.equal(typeof JSONGlobals, "function")
    assert.end()
})

test("Can globalify stuff", function (assert) {
    var html = JSONGlobals({
        plain: { name: "bob" },
        regex: /foo/,
        malicious: '</script>',
        date: new Date(1517857871957)
    })

    assert.equal(html,
      '<script id="json-globals" type="application/json">' +
      '{"plain":{"name":"bob"},"regex":/foo/,"malicious":"\\u003C\\u002Fscript\\u003E",' + 
      '"date":"2018-02-05T19:11:11.957Z"}' +
      '</script>'
    );

    assert.end()
})
