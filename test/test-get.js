var test = require("tape");

// ensure we don't get any module from the cache, but to load it fresh every time
var proxyquire = require("proxyquire").noPreserveCache();

test("It should be able to get globals", function(assert) {
  var get = proxyquire("../get", {
    "global/document": {
      getElementById: function getElementById(id) {
        assert.equal(id, "json-globals", "it should call document.getElementById('json-globals')");
        return {
          textContent: '{"foo": "bar"}'
        };
      }
    }
  });

  assert.equal(get("foo"), "bar");

  assert.end();
});
