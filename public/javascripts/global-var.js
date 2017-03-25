var appMain = angular.module('AppBody', []);

appMain.run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
    */
    $rootScope.$on('emitAddGraph', function(event, graphType, dataFilePath) {
        $rootScope.$broadcast('handleAddGraph', graphType, dataFilePath);
    });
});

function log(text, tag) {
	if (DEV_MODE) {
		if (isNullOrEmpty(tag)) {
			console.log(text);
		} else {
			console.log(tag + " - " + text);
		}
	}
}

function elog(code, msg) {
	if (DEV_MODE) {
		console.log("ERROR:");
		console.log(code + " - " + msg);
	}
}

function isNullOrEmpty(text) {
	return text == null || text == undefined || text === "";
}

log(DEV_MODE, "DEV Mode");