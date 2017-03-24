var LOGGING = true;
var appMain = angular.module('AppBody', []);

var SignInMode = {
	"SIGNED_IN" : "Sign Out",
	"SIGNED_OUT" : "Sign In",
	"SIGNING_IN" : "Sign In",
	"SIGNING_UP" : "Sign Up"
}

appMain.run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
    */
    $rootScope.$on('emitAddGraph', function(event, graphType, dataFilePath) {
        $rootScope.$broadcast('handleAddGraph', graphType, dataFilePath);
    });
});

function log(text, tag) {
	if (LOGGING) {
		if (isNullOrEmpty(tag)) {
			console.log(text);
		} else {
			console.log(tag + " - " + text);
		}
	}
}

function elog(code, msg) {
	if (LOGGING) {
		console.log("ERROR:");
		console.log(code + " - " + msg);
	}
}

function isNullOrEmpty(text) {
	return text == null || text == undefined || text === "";
}