(function(app) {
	app.controller("PopupController", function($scope) {
		$scope.init = function() {
			$scope.GraphType = {
				"BAR":"Bar Chart",
				"LINE":"Line Chart",
				"PIE":"Pie Chart",
				"WATERFALL":"Waterfall Chart"
			}
		}

		$scope.addGraph = function() {
			var selectedGraphNumber = $("#pop-up").attr("data-graphnum");
			var selectedGraphType = $("#graph-type").val();

			if (selectedGraphNumber == null || selectedGraphNumber == undefined ||
				selectedGraphType == null || selectedGraphType == undefined) {
				log("NPE inside addGraph()");
				return;
			}

			$("#graph" + selectedGraphNumber).addClass("active");
			log("selected graph type:" + selectedGraphType);

			var selector = "#graph" + selectedGraphNumber;

			if (selectedGraphType === $scope.GraphType.BAR) {
				log("bar graph selected - selector:" + selector);
				$(selector).append('<svg class="bar-chart" width="600" height="300"></svg>')
				addBarChart(selector + "> svg", "data/bar-chart-ex.csv");
			} 
			else if (selectedGraphType === $scope.GraphType.LINE) {
				log("line graph selected - selector:" + selector);
				$(selector).append('<svg class="line-chart" width="600" height="300"></svg>')
				addLineChart(selector + "> svg", "data/line-chart-ex.csv");
			} 
			else if (selectedGraphType === $scope.GraphType.PIE) {
				log("pie graph selected - selector:" + selector);
				$(selector).append('<svg class="pie-chart" width="300" height="300"></svg>')
				addPieChart(selector + "> svg", "data/pie-chart-ex.csv");
			} 
			else if (selectedGraphType === $scope.GraphType.WATERFALL) {
				log("waterfall graph selected - selector:" + selector);
				$(selector).append('<svg class="waterfall-chart" width="600" height="300"></svg>')
				addWaterfallChart(selector + "> svg", "data/waterfall-chart-ex.csv");
			} 
			else {
				log("ERROR! No graph selected");
			}

			hidePopup();
		}

		// ----------------------------
		// ----- HELPER FUNCTIONS -----
		// ----------------------------

		function hidePopup() {
			$("#fade").removeClass("active");
			$("#pop-up").removeClass("active");
		}
	});

})(appMain);