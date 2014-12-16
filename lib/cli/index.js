var action, create, init, juniper, logger, node, options, restart, start, upstart, _ref,
  __slice = [].slice;

logger = require('../logger');

create = require('./create');

init = require('./init');

start = require('./start');

restart = require('./restart');

upstart = require('./upstart');

_ref = process.argv, node = _ref[0], juniper = _ref[1], action = _ref[2], options = 4 <= _ref.length ? __slice.call(_ref, 3) : [];

switch (action) {
  case 'create':
    create(options);
    break;
  case 'init':
    init(options);
    break;
  case 'start':
    start(options);
    break;
  case 'restart':
    restart(options);
    break;
  case 'upstart':
    upstart(options);
    break;
  default:
    logger.error("Could\'nt find action `" + action + "`");
}
