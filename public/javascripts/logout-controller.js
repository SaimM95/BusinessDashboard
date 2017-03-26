(function (app) {

	app.controller('LogoutController', function($scope, $window) {

		// Create sign in listener
		if (CHECK_SIGNIN) {
			firebaseAuth.onAuthStateChanged(function(user) {
				if (user) {
					// User is signed in.
					log("User signed in");

					// Emit message so other controllers can handle post user login events by listening to the broadcast
					$scope.$emit('emitUserSignedIn', user);
				} else {
					// User is signed out.
					log("User signed out");
					goToHomePage();
				}
			});
		}

		$scope.init = function() {
			$scope.username = "";
		}

		// Recieve broadcast emitted by LogoutController
		$scope.$on('handlePostUserSignedIn', function(event, user) {
			$scope.username = user.email.split("@")[0];
			$scope.$apply();
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