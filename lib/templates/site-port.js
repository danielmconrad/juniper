module.exports = {"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "upstream upstream_"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + " {\n  server "
    + escapeExpression(((helper = (helper = helpers.redirectIP || (depth0 != null ? depth0.redirectIP : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"redirectIP","hash":{},"data":data}) : helper)))
    + ":"
    + escapeExpression(((helper = (helper = helpers.redirectPort || (depth0 != null ? depth0.redirectPort : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"redirectPort","hash":{},"data":data}) : helper)))
    + ";\n}\n\nserver {\n  listen "
    + escapeExpression(((helper = (helper = helpers.listenPort || (depth0 != null ? depth0.listenPort : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"listenPort","hash":{},"data":data}) : helper)))
    + ";\n  server_name "
    + escapeExpression(((helper = (helper = helpers.serverName || (depth0 != null ? depth0.serverName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"serverName","hash":{},"data":data}) : helper)))
    + ";\n\n  location / {\n    proxy_pass $scheme://upstream_"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + ";\n    proxy_set_header Host $host;\n  }\n}\n";
},"useData":true}