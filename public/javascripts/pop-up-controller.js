appMain.controller("PopupController", function($scope) {
	var TAG = "PopupController";

	$scope.init = function() {
		// Get a reference to dashboard-controller.GraphType inside $scope (used to populate the Graph Types dropdown)
		$scope.GraphType = GraphType;
		$scope.fileName = "n/a";
		$scope.exampleDataUrl = "#";
	}

	$scope.add = function() {
		var selectedGraphType = $scope.type;

		if (isNullOrEmpty(selectedGraphType)) {
			log("No graph type selected", TAG);
			return;
		}

		var graphDownloadURL = $scope.graphDownloadURL;

		var isUseSampleData = document.getElementById("sample-data-checkbox").checked;
		log("use sample data:" + isUseSampleData, TAG);

		if (isUseSampleData) {
			graphDownloadURL = $scope.exampleDataUrl;
		}

		if (isNullOrEmpty(graphDownloadURL)) {
			log("No data file found", TAG);
			return;
		}

		// Emit message so it can be broadcasted by appMain.run() and received by DashboardController
		$scope.$emit('emitAddGraph', selectedGraphType, $scope.fileName, isUseSampleData, graphDownloadURL);

		$scope.hidePopup();
	}

	$("#graph-type").change(function() {
		$scope.type = $(this).val();
		log("selected graph type:" + $scope.type, TAG);

		if (!isNullOrEmpty($scope.type)) {
			$("#upload").show();
			$scope.exampleDataUrl = getExampleDataUrl($scope.type);
			$scope.$apply();
			log("Example data download url:" + $scope.exampleDataUrl, TAG);
		} else {
			$("#upload").hide();
		}
	})
	
	// Extracts name of file to be uploaded and shows it inside the input box for upload
	$('#upload').find("input[type='file']").change(function() {
		log("File object:", TAG);
		log($(this));

		// Only single file upload possible so files.length == 1
		var file = $(this)[0].files[0];

		if (isNullOrEmpty(file)) {
			log("No file found", TAG);
		} else {
			log("File name:" + file.name , TAG);
			$('#upload').find("input[type='text']").val(file.name);

			uploadFile(file);
		}
	});

	// ----------------------------
	// ----- HELPER FUNCTIONS -----
	// ----------------------------

	function uploadFile(file) {
		log("File to upload:", TAG);
		log(file);

		var selectedGraphType = $scope.type;

		if (isNullOrEmpty(selectedGraphType)) {
			log("No graph type selected", TAG);
			return;
		}

		var userId = firebaseAuth.currentUser.uid;
		var path = userId + "/" + file.name;
		var ref = firebaseStorageRef.child(path);
		var uploadTask = ref.put(file);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on('state_changed', function(snapshot){
		  // Observe state change events such as progress, pause, and resume
		  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		  var progressBar = $("#progress-bar .progress-bar");
		  progressBar.attr("aria-valuenow", progress);
		  progressBar.css("width", progress + "%");
		  progressBar.text(progress + "%");
		}, 
		function(error) {
		  // Handle unsuccessful uploads
		  log('File upload FAILED!', TAG);
		}, 
		function() {
		  // Handle successful uploads on complete
		  var downloadURL = uploadTask.snapshot.downloadURL;
		  log('File uploaded successfully! URL:' + downloadURL, TAG);
		  $scope.graphDownloadURL = downloadURL;
		  $scope.fileName = file.name;
		});
	}

	$scope.hidePopup = function() {
		$("#fade").removeClass("active");
		$("#pop-up").removeClass("active");
	}

});
