var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "server {\n  listen "
    + escapeExpression(((helper = (helper = helpers.port || (depth0 != null ? depth0.port : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"port","hash":{},"data":data}) : helper)))
    + ";\n  server_name "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + ";\n\n  location / {\n    proxy_set_header HOST $host;\n    proxy_pass $scheme://"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.process : depth0)) != null ? stack1.address : stack1), depth0))
    + ":"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.process : depth0)) != null ? stack1.port : stack1), depth0))
    + ";\n  }\n}\n";
},"useData":true});