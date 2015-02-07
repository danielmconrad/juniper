var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "worker_processes 1;\n\nevents {\n  worker_connections 1024;\n}\n\nhttp {\n  default_type application/octet-stream;\n  keepalive_timeout 65;\n  sendfile on;\n  server_names_hash_bucket_size 64;\n  types_hash_max_size 2048;\n\n  access_log "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/access.log;\n  error_log "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/error.log;\n\n  include "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/mime.types;\n  include "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/sites-available/*;\n}\n";
},"useData":true});