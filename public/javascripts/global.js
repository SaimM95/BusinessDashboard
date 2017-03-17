var LOGGING = true;
var appMain = angular.module('AppBody', []);
var SignInMode = {
	"SIGNED_IN" : "Sign Out",
	"SIGNED_OUT" : "Sign In",
	"SIGNING_IN" : "Sign In",
	"SIGNING_UP" : "Sign Up"
}

function log(text) {
	if (LOGGING) console.log(text);
}

function elog(code, msg) {
	if (LOGGING) {
		console.log("ERROR:");
		console.log(code + " - " + msg);
	}
}