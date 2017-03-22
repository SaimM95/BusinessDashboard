function showPopup(graphNumber) {
	$("#fade").addClass("active");
	$("#pop-up").addClass("active");
	$("#pop-up").attr("data-graphnum", graphNumber);
}

function hidePopup() {
	$("#fade").removeClass("active");
	$("#pop-up").removeClass("active");
}

function addGraph() {
	hidePopup();
	var graphNumber = $("#pop-up").data().graphnum;
	$("#graph" + graphNumber).addClass("active");
}