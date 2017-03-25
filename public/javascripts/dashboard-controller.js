var GraphType = {
	"BAR":"Bar Chart",
	"LINE":"Line Chart",
	"PIE":"Pie Chart",
	"WATERFALL":"Waterfall Chart"
}

appMain.controller('DashboardController', function($scope, $window) {
	var TAG = "DashboardController";

	var graphsList = [
		{
			"type": GraphType.BAR,
			"file": "data/bar-chart-ex.csv"
		},
		{},
		{
			"type": GraphType.PIE,
			"file": "data/pie-chart-ex.csv"
		},
		{
			"type": GraphType.LINE,
			"file": "data/line-chart-ex.csv"
		},
		{
			"type": GraphType.WATERFALL,
			"file": "data/waterfall-chart-ex.csv"
		},
		{}
	]

	$scope.init = function() {
		// initGrid(graphsList);
	}

	$scope.showPopup = function(gridSection) {
		$("#fade").addClass("active");
		$("#pop-up").addClass("active");
		$scope.selectedGridSection = gridSection;
	}

	// Receive broadcast emitted by PopupController
	$scope.$on('handleAddGraph', function(event, graphType, dataFilePath) {
		addGraph(graphType, dataFilePath, $scope.selectedGridSection);
	});

	// ----------------------------
	// ----- HELPER FUNCTIONS -----
	// ----------------------------

	function addGraph(graphType, dataFilePath, gridSection) {
		log("Adding graph. Type:" + graphType + "  File path:" + dataFilePath, TAG);

		var gridSelector = "#graph" + gridSection;

		$(gridSelector).addClass("active");

		if (graphType === GraphType.BAR) {
			log("adding bar graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="bar-chart" width="600" height="300"></svg>')
			addBarChart(gridSelector + "> svg", dataFilePath);
		} 
		else if (graphType === GraphType.LINE) {
			log("adding line graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="line-chart" width="600" height="300"></svg>')
			addLineChart(gridSelector + "> svg", dataFilePath);
		} 
		else if (graphType === GraphType.PIE) {
			log("adding pie graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="pie-chart" width="300" height="300"></svg>')
			addPieChart(gridSelector + "> svg", dataFilePath);
		} 
		else if (graphType === GraphType.WATERFALL) {
			log("adding waterfall graph - gridNumber:" + gridSelector);
			$(gridSelector).append('<svg class="waterfall-chart" width="600" height="300"></svg>')
			addWaterfallChart(gridSelector + "> svg", dataFilePath);
		} 
		else {
			log("Unknown graph type", TAG);
		}
	}

	function initGrid(graphsList) {
		listSize = graphsList.length;

		if (listSize > 6) {
			log("graphsList too long", TAG);
			return;
		}

		for (var i = 0; i < listSize; i++) {
			var graphType = graphsList[i].type;
			var dataFilePath = graphsList[i].file;

			if (!isNullOrEmpty(graphType) && !isNullOrEmpty(dataFilePath)) {
				addGraph(graphType, dataFilePath, i+1);
			}
		}
	}
});
