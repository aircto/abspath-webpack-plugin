/*
   MIT License http://www.opensource.org/licenses/mit-license.php
   Author Yatharth Khatri @yatharthk
 */

var path = require("path");

function AbsolutePathProviderPlugin(resourceRegExp, newResource) {
  this.resourceRegExp = resourceRegExp;
  this.newResource = newResource;
}

module.exports = AbsolutePathProviderPlugin;
AbsolutePathProviderPlugin.prototype.apply = function(compiler) {
  var resourceRegExp = this.resourceRegExp;
  var newResource = this.newResource;
  var requestPathExtension;

  compiler.plugin("normal-module-factory", function(nmf) {
    nmf.plugin("before-resolve", function(result, callback) {
      if (!result) return callback();
      if (resourceRegExp.test(result.request)) {
        if (typeof newResource === "function") {
          throw new Error("new resource cannot be of type `function`");
        } else {
          var requestPath = result.request;
          requestPathExtension = requestPath.replace(resourceRegExp, "");
          result.request = path.join(newResource, requestPathExtension);
        }
      }

      return callback(null, result);
    });
  });
}
