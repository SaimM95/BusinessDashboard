(function (app) {

	app.controller('LogoutController', function($scope, $window) {

		// Create sign in listener
		firebaseAuth.onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				log("User signed in");
			} else {
				// User is signed out.
				log("User signed out");
				goToHomePage();
			}
		});

		$scope.signOut = function() {
			log("signing out");
			firebaseAuth.signOut();
		}

		function goToHomePage() {
			$window.location.href = "index.html";
		}
	});

})(appMain);