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
		}
	]

	$scope.init = function() {
		initGrid(graphsList);
	}

	$scope.showPopup = function(gridSection) {
		$("#fade").addClass("active");
		$("#pop-up").addClass("active");
		$scope.selectedGridSection = gridSection;
	}

	// Receive broadcast emitted by PopupController
	$scope.$on('handleAddGraph', function(event, graphType, dataFilePath) {
		addGraph(graphType, dataFilePath);
	});

	// ----------------------------
	// ----- HELPER FUNCTIONS -----
	// ----------------------------

	function addGraph(graphType, dataFilePath) {
		log("Adding graph. Type:" + graphType + "  File path:" + dataFilePath, TAG);

		var gridSelector = "#graph" + $scope.selectedGridSection;

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
		log("Graphs List:");
		log(graphsList);
	}
});
