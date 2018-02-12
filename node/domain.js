/*global require, exports */
(function () {
    "use strict";
    var domainName = "brackets-nxc-domain1"
        , child_process = require("child_process");

    function execCmd(directory, command, callback) {
        //directory = directory.replace(" ", "\\ ");
        //console.log("exec " + command + " from " + directory);
        //directory = '"'+directory+'"';
        child_process.exec(command, {
            cwd: directory
        }, function (err, stdout, stderr) {
            //console.log("returned: " + stdout);
            if (err) {
                err = {
                    err: err
                    , stdout: stdout
                    , stderr: stderr
                };
            }
            callback(err, {
                stdout: stdout
                , stderr: stderr
            });
        });
    }
    exports.execCmd = execCmd;
    exports.init = function (domainManager) {
        if (!domainManager.hasDomain(domainName)) {
            domainManager.registerDomain(domainName, {
                major: 0
                , minor: 1
            });
        }
        domainManager.registerCommand(domainName, "execCmd", execCmd, true);
    };
}());