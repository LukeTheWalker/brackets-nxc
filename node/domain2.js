/*global require, exports */
(function () {
    "use strict";
    var domainName = "brackets-nxc-domain2"
        , fs = require("fs");

    function checkFile(path, callback) {
        //console.log(path);
        fs.stat(path, function (err, stat) {
            //console.log(stat);
            if (err == null) {
                callback(null, true); //file exists
            }
            else if (err.code == 'ENOENT') {
                callback(null, false);
                // file does not exist
            }
            else {
                callback(err.code, null);
                //console.log('Some other error: ', err.code);
            }
        });
    }
    exports.checkFile = checkFile;
    exports.init = function (domainManager) {
        if (!domainManager.hasDomain(domainName)) {
            domainManager.registerDomain(domainName, {
                major: 0
                , minor: 1
            });
        }
        domainManager.registerCommand(domainName, "checkFile", checkFile, true);
    };
}());