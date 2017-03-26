var GraphType = {
	"BAR":"Bar Chart",
	"LINE":"Line Chart",
	"PIE":"Pie Chart",
	"WATERFALL":"Waterfall Chart"
}

function getExampleData(graphType) {
	if (graphType === GraphType.BAR) {
		return "data/bar-chart-ex.csv";
	} 
	else if (graphType === GraphType.LINE) {
		return "data/line-chart-ex.csv";
	} 
	else if (graphType === GraphType.PIE) {
		return "data/pie-chart-ex.csv";
	} 
	else if (graphType === GraphType.WATERFALL) {
		return "data/waterfall-chart-ex.csv";
	}

	return "";
}