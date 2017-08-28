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
        date: new Date("2017-08-25T21:26:25.690Z"),
        func: function foo() {
            return 'bar';
        }
    })

    assert.equal(html,
      '<script id="json-globals" type="application/json">' +
      '{"plain":{"name":"bob"},"regex":{},"malicious":"\\u003C\\u002Fscript\\u003E","date":"2017-08-25T21:26:25.690Z"}' +
      '</script>'
    );

    assert.end()
})

// run other tests
require('./test-get')
