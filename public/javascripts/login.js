var firebaseAuth = firebase.auth();

(function (app) {

	app.controller('LoginController', function($scope) {

		$scope.init = function() {
			$scope.email = 'asam@gmail.com'; 
			$scope.password = 'hello123!@#'; 
			$scope.errorMessage = 'none';
			$scope.signInMode = SignInMode.SIGNED_OUT;
		}

		// Create sign in listener
		firebaseAuth.onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				var displayName = user.displayName;
				var email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
				
				log("User signed in");	
			} else {
				// User is signed out.
				log("User signed out");
			}
		});

		$scope.createNewUser = function (email, password) {
			log("triggered create new user");
			log("Email:" + email + " Password:" + password);

			// Update sign in mode
			$scope.signInMode = SignInMode.SIGNING_UP;

			$("#input-retype_password").fadeIn();
			$("#btn-create_new_user").fadeOut();
		}

		$scope.signInUser = function (email, password) {
			if ($scope.signInMode === SignInMode.SIGNING_UP) {
				signUpUser(email, password);
				return;
			}

			log("triggered sign in");
			log("Email:" + email + " Password:" + password);

			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMsg = error.message;
				elog(errorCode, errorMsg);

				$scope.errorMessage = errorMsg;
				$scope.$apply();
			});
		}

		function signUpUser(email, password) {
			log("triggered sign up user");
			log("Email:" + email + " Password:" + password);

			firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				elog(errorCode, errorMessage);

				$scope.errorMessage = errorMsg;
				$scope.$apply();
			});
		}

	});

})(appMain);
