var document = require("global/document");

module.exports = getJSONGlobal;

var globals;

/**
 * @function getJSONGlobal
 * @param {String} key key on globals to get
 * @param {Object} [opts] options object
 * @param {Function} [opts.parse = JSON.parse] parse function to run on the textContent, defaults to JSON.parse.
 *                                             available since v2.1.0
 */
function getJSONGlobal(key, opts) {
  opts = opts || {};
  opts.parse = opts.parse || JSON.parse;

    if (!globals) {
      var jsonGlobalsElement = document.getElementById('json-globals');
      globals = opts.parse(jsonGlobalsElement.textContent);
    }
    return globals[key];
}
