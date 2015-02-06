var action, actionArgs, cliAction, juniper, logger, node, pack, _ref,
  __slice = [].slice;

logger = require('../utils').logger;

pack = require('../../package.json');

_ref = process.argv, node = _ref[0], juniper = _ref[1], action = _ref[2], actionArgs = 4 <= _ref.length ? __slice.call(_ref, 3) : [];

if (!actionArgs.length) {
  actionArgs = void 0;
}

if (action === 'create' || action === 'init' || action === 'install' || action === 'start' || action === 'stop' || action === 'restart' || action === 'remove' || action === 'update') {
  cliAction = require("./" + action);
  cliAction(actionArgs, null);
} else {
  switch (action) {
    case '-v':
      console.log("v" + pack.version);
      break;
    case '-h':
      console.log("\nUsage: juniper [action [options]]\n\nActions:\n\n  create <project>    Create a new folder and init it as a juniper project\n  init                Initalize project\n  install <siteName>  Install the dependencies of this project or site\n  start <siteName>    Start project or site\n  stop <siteName>     Stop project or site\n  restart <siteName>  Restart project or site\n  remove <siteName>   Remove all settings, stop all services for this project or site\n  update <siteName>   Stop, update, and restart project or site\n");
  }
}
