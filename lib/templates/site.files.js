var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "  location ~* ^/"
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/(.*) {\n    proxy_set_header HOST "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + ";\n    proxy_pass $scheme://"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.process : depth0)) != null ? stack1.address : stack1), depth0))
    + ":"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.process : depth0)) != null ? stack1.port : stack1), depth0))
    + "/$1$is_args$args;\n  }\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "server {\n  listen "
    + escapeExpression(((helper = (helper = helpers.port || (depth0 != null ? depth0.port : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"port","hash":{},"data":data}) : helper)))
    + ";\n  server_name "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + ";\n  root "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.files : depth0)) != null ? stack1.root : stack1), depth0))
    + ";\n  index "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.files : depth0)) != null ? stack1.index : stack1), depth0))
    + ";\n\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.files : depth0)) != null ? stack1.redirects : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "}\n";
},"useData":true});