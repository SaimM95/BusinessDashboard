(function (app) {

	app.controller('LogoutController', function($scope, $window) {

		$scope.signOut = function() {
			log("signing out");
			firebaseAuth.signOut();
		}

	});

})(appMain);