var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "user www-data;\nworker_processes 4;\npid /run/nginx.pid;\n\nevents {\n  worker_connections 768;\n}\n\nhttp {\n\n  sendfile on;\n  tcp_nopush on;\n  tcp_nodelay on;\n  keepalive_timeout 65;\n  types_hash_max_size 2048;\n\n  server_names_hash_bucket_size 64;\n\n  include "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/mime.types;\n  default_type application/octet-stream;\n\n  access_log "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/access.log;\n  error_log "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/error.log;\n\n  gzip on;\n  gzip_disable \"msie6\";\n  gzip_vary on;\n  gzip_proxied any;\n  gzip_comp_level 6;\n  gzip_buffers 16 8k;\n  gzip_http_version 1.1;\n  gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;\n\n  include "
    + escapeExpression(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dir","hash":{},"data":data}) : helper)))
    + "/nginx/sites-available/*;\n}";
},"useData":true});