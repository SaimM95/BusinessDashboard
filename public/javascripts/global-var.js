var appMain = angular.module('AppBody', []);

appMain.run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
    */
    $rootScope.$on('emitAddGraph', function(event, graphType, fileName, isUseSampleData, graphDownloadURL) {
        $rootScope.$broadcast('handleAddGraph', graphType, fileName, isUseSampleData, graphDownloadURL);
    });
});

/*
** Javascript equivalent of String.format function in JAVA
*/
String.format = function(format) {
	var args = Array.prototype.slice.call(arguments, 1);
	return format.replace(/{(\d+)}/g, function(match, number) { 
		return typeof args[number] != 'undefined'
			? args[number] 
			: match;
	});
};

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