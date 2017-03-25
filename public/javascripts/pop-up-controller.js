appMain.controller("PopupController", function($scope) {
	var TAG = "PopupController";

	$scope.init = function() {
		// Get a reference to dashboard-controller.GraphType inside $scope (used to populate the Graph Types dropdown)
		$scope.GraphType = GraphType;	
	}

	$scope.add = function() {
		var selectedGraphType = $("#graph-type").val();
		log("selected graph type:" + selectedGraphType, TAG);

		if (isNullOrEmpty(selectedGraphType)) {
			log("No graph type selected", TAG);
			return;
		}

		var dataFilePath = getExampleData(selectedGraphType);

		if (isNullOrEmpty(dataFilePath)) {
			log("Empty data file path", TAG);
			return;
		}

		// Emit message so it can be broadcasted by appMain.run() and received by DashboardController
		$scope.$emit('emitAddGraph', selectedGraphType, dataFilePath);

		hidePopup();
	}

	
	// Extracts name of file to be uploaded and shows it inside the input box for upload
	$('#upload').find("input[type='file']").change(function() {
		var filePath = $(this).val();

		if (isNullOrEmpty(filePath)) {
			log("NPE filepath", TAG);
		} else {
			var splitPath = filePath.split("\\");
			var fileName = splitPath[splitPath.length-1];
			log("Upload file:" + fileName , TAG);
			$('#upload').find("input[type='text']").val(fileName);
		}
	});

	// ----------------------------
	// ----- HELPER FUNCTIONS -----
	// ----------------------------

	function hidePopup() {
		$("#fade").removeClass("active");
		$("#pop-up").removeClass("active");
	}

	function getExampleData(graphType) {
		if (graphType === $scope.GraphType.BAR) {
			return "data/bar-chart-ex.csv";
		} 
		else if (graphType === $scope.GraphType.LINE) {
			return "data/line-chart-ex.csv";
		} 
		else if (graphType === $scope.GraphType.PIE) {
			return "data/pie-chart-ex.csv";
		} 
		else if (graphType === $scope.GraphType.WATERFALL) {
			return "data/waterfall-chart-ex.csv";
		}

		return "";
	}
});
