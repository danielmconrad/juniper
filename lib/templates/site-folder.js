module.exports = {"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  location ~* ^/"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + "/(.*) {\n    proxy_set_header HOST "
    + escapeExpression(((helper = (helper = helpers.serverName || (depth0 != null ? depth0.serverName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"serverName","hash":{},"data":data}) : helper)))
    + ";\n    proxy_pass http://"
    + escapeExpression(((helper = (helper = helpers.redirectIP || (depth0 != null ? depth0.redirectIP : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"redirectIP","hash":{},"data":data}) : helper)))
    + ":"
    + escapeExpression(((helper = (helper = helpers.redirectPort || (depth0 != null ? depth0.redirectPort : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"redirectPort","hash":{},"data":data}) : helper)))
    + "/$1$is_args$args;\n  }\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "server {\n  listen "
    + escapeExpression(((helper = (helper = helpers.listenPort || (depth0 != null ? depth0.listenPort : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"listenPort","hash":{},"data":data}) : helper)))
    + ";\n  server_name "
    + escapeExpression(((helper = (helper = helpers.serverName || (depth0 != null ? depth0.serverName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"serverName","hash":{},"data":data}) : helper)))
    + ";\n  root "
    + escapeExpression(((helper = (helper = helpers.rootFolder || (depth0 != null ? depth0.rootFolder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rootFolder","hash":{},"data":data}) : helper)))
    + ";\n  index "
    + escapeExpression(((helper = (helper = helpers.indexFile || (depth0 != null ? depth0.indexFile : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"indexFile","hash":{},"data":data}) : helper)))
    + ";\n\n  location / {\n    try_files $uri;\n  }\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.redirectSubFolder : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "}\n";
},"useData":true}