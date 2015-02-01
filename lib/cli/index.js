var action, actionArgs, e, juniper, logger, node, _ref,
  __slice = [].slice;

logger = require('../utils').logger;

_ref = process.argv, node = _ref[0], juniper = _ref[1], action = _ref[2], actionArgs = 4 <= _ref.length ? __slice.call(_ref, 3) : [];

try {
  require("./" + action)(actionArgs);
} catch (_error) {
  e = _error;
  logger.error("Couldn\'t find action `" + action + "`");
  console.log(e);
}
