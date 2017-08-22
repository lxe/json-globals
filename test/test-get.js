var test = require("tape");

// ensure we don't get any module from the cache, but to load it fresh every time
var proxyquire = require('proxyquire').noPreserveCache();

var TEXT_CONTENT = '{"foo": "bar"}';
function requireGet() {
  return proxyquire('../get', {
    'global/document': {
      getElementById: function getElementById(id) {
        return {
          textContent: TEXT_CONTENT
        };
      }
    }
  });
}

test("Default to using JSON.parse to deserialize global", function(assert) {
  var get = requireGet();

  assert.equal(get("foo"), "bar");

  assert.end();
});

test("Use opts.parse to deserialize global if it is passed", function(assert) {
  var get = requireGet();

  assert.equal(
    get("foo", {
      parse: function parse(textContent) {
        assert.equal(textContent, TEXT_CONTENT);
        return { foo: "baz" };
      }
    }),

    "baz"
  );

  assert.end();
});
