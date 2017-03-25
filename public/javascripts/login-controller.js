(function (app) {

	app.controller('LoginController', function($scope, $window) {
		var isDashboardOpened = false;

		$scope.init = function() {
			// $scope.email = 'asam@gmail.com'; 
			// $scope.password = 'hello123!@#'; 
		}

		// Create sign in listener
		if (CHECK_SIGNIN) {
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
					// displaySuccessMessage("Successfully signed in");
					hideMessage();
					
					if (isDashboardOpened == false) {
						openDashboardPage();
					}
				} else {
					// User is signed out.
					log("User signed out");
				}
			});
		}

		$scope.switchToSignUpMode = function () {
			log("triggered sign up mode");

			// Update sign in mode
			$scope.signInMode = SignInMode.SIGNING_UP;
		}

		$scope.signInUser = function (email, password) {
			log("triggered sign in");
			log("Email:" + email + " Password:" + password);

			if (isInvalidCredentials(email, password)) {
				return;
			}

			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				displayErrorMessage(error);
			});
		}

		$scope.createNewUser = function(email, password) {
			log("triggered sign up user");
			log("Email:" + email + " Password:" + password);

			if (isInvalidCredentials(email, password)) {
				return;
			}

			firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				displayErrorMessage(error);
			});
		}

		$scope.signOut = function() {
			firebaseAuth.signOut();
		}

		// ----------------------------
		// ----- HELPER FUNCTIONS -----
		// ----------------------------

		function openDashboardPage() {
			log("opening dashboard...")
			isDashboardOpened = true;
			$window.location.href = "dashboard.html";
		}

		function isInvalidCredentials(email, password) {
			if (email == null || email == undefined || email === "" || 
				password == null || password == undefined || password === "") {
				log("Email or password is empty");
				displayErrorMessageCustom("Email or password field is empty");
				return true;
			}
			return false;
		}

		function displayErrorMessageCustom(errorMessage) {
			$scope.message = errorMessage;

			showMessage(true);
		}

		function displayErrorMessage(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			elog(errorCode, errorMessage);

			$scope.message = errorMessage;
			$scope.$apply();

			showMessage(true);
		}

		function displaySuccessMessage(msg) {
			log(msg);
			$scope.message = msg;
			$scope.$apply();

			showMessage(false);
		}

		function showMessage(error) {
			var msgBox = $("#msg-box");

			if (error) {
				msgBox.removeClass("alert-success");
				msgBox.addClass("alert-danger");
			} else {
				msgBox.removeClass("alert-danger");
				msgBox.addClass("alert-success");
			}

			msgBox.slideDown();
		}

		function hideMessage() {
			$("#msg-box").slideUp();
		}

	});

})(appMain);
