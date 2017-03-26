appMain.controller('DashboardController', function($scope, $window) {
	var TAG = "DashboardController";

	// Create sign in listener
	if (CHECK_SIGNIN) {
		firebaseAuth.onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				log("User signed in");
				initDashboard();
			} else {
				// User is signed out.
				log("User signed out");
				goToHomePage();
			}
		});
	}

	var initDashboard = function() {
		var userId = firebaseAuth.currentUser.uid;

		firebaseDB.ref(userId + "/graphs").once('value').then(function(snapshot) {
			log("Read from DB:", TAG);
			var graphs = snapshot.val();
			log(graphs);

			if (!isNullOrEmpty(graphs)) {
				initGrid(graphs);
			}
		});
	}

	$scope.showPopup = function(gridSection) {
		$("#fade").addClass("active");
		$("#pop-up").addClass("active");
		$scope.selectedGridSection = gridSection;
	}

	// Receive broadcast emitted by PopupController
	$scope.$on('handleAddGraph', function(event, graphType, fileName, isUseSampleData, graphDownloadURL) {
		var gridSection = $scope.selectedGridSection;

		if (isNullOrEmpty(gridSection) || isNullOrEmpty(graphType) || isNullOrEmpty(fileName) || 
			isNullOrEmpty(isUseSampleData) || isNullOrEmpty(graphDownloadURL)) {
			log("NPE inside handleAddGraph", TAG);
			log(String.format(" gridSection:{0}\n graphType:{1}\n fileName:{2}\n isUseSampleData:{3}\n graphDownloadURL:{4}",
				gridSection, graphType, fileName, isUseSampleData, graphDownloadURL));
			return;
		}

		var graphData = {
			"section": gridSection,
			"type": graphType,
			"file": fileName,
			"sample": isUseSampleData
		}

		var userId = firebaseAuth.currentUser.uid;
		writeGraphDataToDB(userId, gridSection, graphData);

		addGraph(graphType, graphDownloadURL, gridSection);
	});

	// ----------------------------
	// ----- HELPER FUNCTIONS -----
	// ----------------------------

	function initGrid(graphs) {
		for (var i = 1; i <= 6; i++) {
			var graphObj = graphs[i];

			if (!isNullOrEmpty(graphObj) && !isNullOrEmpty(graphObj.graph)) {
				var graph = graphObj.graph;

				log("graph for section#" + i, TAG);
				log(graph);

				var graphType = graph.type;
				var fileName = graph.file;
				var gridSection = graph.section;
				var isSampleData = graph.sample;

				log(String.format(" Type:{0}\n File name:{1}\n Grid section:{2}\n Sample:{3}",
						graphType, fileName, gridSection, isSampleData));

				if (!isNullOrEmpty(graphType) && !isNullOrEmpty(fileName) && !isNullOrEmpty(gridSection) && !isNullOrEmpty(isSampleData)) {
					downloadGraph(graphType, fileName, gridSection, isSampleData);
				} 
				else {
					log("NPE inside initGrid", TAG);
				}
			}
		}
	}

	/* 
	* Gets file download url from firebase based on file name and calls addGraph on successful callback.
	* If isSampleData == true, example data url is used to call addGraph 
	*/
	function downloadGraph(graphType, fileName, gridSection, isSampleData) {
		if (isSampleData) {
			log("Downloading/Adding sample graph", TAG);
			var url = getExampleDataUrl(graphType);
			addGraph(graphType, url, gridSection);
			return;
		}

		var userId = firebaseAuth.currentUser.uid;
		var path = userId + "/" + fileName;
		log("Storage Path:" + path, TAG);

		firebaseStorage.ref(path).getDownloadURL().then(function(url) {
			log("Successfully retreived URL:", TAG);
			log(url);

			addGraph(graphType, url, gridSection);
		}).catch(function(error) {
			// Handle any errors
			log("Download URL failed", TAG);
			log(error);
		});
	}

	function addGraph(graphType, dataFilePath, gridSection) {
		log("Adding graph. Type:" + graphType + "  File path:" + dataFilePath, TAG);

		var gridSelector = "#graph" + gridSection;
		var svgSelector = gridSelector + "> svg";

		$(gridSelector).addClass("active");

		if (graphType === GraphType.BAR) {
			log("adding bar graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="bar-chart" width="600" height="300"></svg>')
			
			if (isSVGSelectorAdded(svgSelector)) {
				addBarChart(svgSelector, dataFilePath);
			}
		} 
		else if (graphType === GraphType.LINE) {
			log("adding line graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="line-chart" width="600" height="300"></svg>')

			if (isSVGSelectorAdded(svgSelector)) {
				addLineChart(svgSelector, dataFilePath);
			}
		} 
		else if (graphType === GraphType.PIE) {
			log("adding pie graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="pie-chart" width="300" height="300"></svg>')

			if (isSVGSelectorAdded(svgSelector)) {
				addPieChart(svgSelector, dataFilePath);
			}
		} 
		else if (graphType === GraphType.WATERFALL) {
			log("adding waterfall graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="waterfall-chart" width="600" height="300"></svg>')

			if (isSVGSelectorAdded(svgSelector)) {
				addWaterfallChart(svgSelector, dataFilePath);
			}
		} 
		else {
			log("Unknown graph type", TAG);
		}
	}

	function writeGraphDataToDB(userId, sectionKey, graphData) {
		firebaseDB.ref(userId + "/graphs/" + sectionKey).set({
			graph:graphData
		});
	}

	function isSVGSelectorAdded(svgSelector) {
		log("SVG selector:", TAG);
		log($(svgSelector));	
		return !isNullOrEmpty($(svgSelector));
	}

	function goToHomePage() {
		$window.location.href = "index.html";
	}

});
