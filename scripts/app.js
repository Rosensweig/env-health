var state = {
	apis: {
		forestWatch: {
			BASE_URL: "http://api.globalforestwatch.org/forest-change"
		},
		airNow: {
			BASE_URL: "https://arcane-ridge-20214.herokuapp.com/air/"
		}
	},
	data: null
};

$(document).ready(function() {

	$("form").submit(function(event) {
		event.preventDefault();
		var query = $(this).children(".location").val();
		if (query.match(/[0-9]{5}/) && query.length==5) {
			state.data = getData(query, displayData);
		}
		else {
			alert("Please enter a valid zip code: 5 numeric digits.");
		}
	});

	$(".fa-search").click(function() {$("form").trigger("submit")});

	$('.faq-btn').click(toggleFAQ);
	$('.close-btn').click(toggleFAQ);

	setBackground();

});

function getData(query, callback) {
	$(".loading").css({ "visibility" : "visible" });
    var result = $.ajax({
        url: state.apis.airNow.BASE_URL + query,
        dataType: 'json',
		success: callback,
        type: "GET"
    })
    /* if the call is NOT successful show errors */
    .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

function displayData(data) {
	console.log(data);
	$(".loading").css({ "visibility" : "hidden" });
	if (data.today.length==0) {
		alert("No data available for this zip code, or within 100 miles. Please make sure your zip code is correct, or try another area. Note: only United States data currently available.");
		return;
	}
	$(".display").removeClass("hidden");
	$(".faq").addClass("hidden");
	// $(".display").css({"background-image": "none"});
	$(".display").html('<canvas id="chart" width="400" height="400"></canvas>');
	var ctx = $("#chart");
	var sortedData = {};
	for (var i=0; i<data.today.length; i++) {
		var paramName = data.today[i].ParameterName.toLowerCase();
		if (paramName in sortedData) {
			sortedData[paramName].unshift(dataPoint(data.today[i]));
		}
		else {
			sortedData[paramName] = [dataPoint(data.today[i])]
		}
	}
	var firstYear = data.today[0].DateObserved.slice(0,4);
	if (data.year1.length) {
		for (var i=0; i<data.year1.length; i++) {
			var paramName = data.year1[i].ParameterName.toLowerCase();
			if (paramName in sortedData) {
				sortedData[paramName].unshift(dataPoint(data.year1[i]));
			}
			else {
				sortedData[paramName] = [dataPoint(data.year1[i])]
			}
		}
		firstYear = data.year1[0].DateObserved.slice(0,4);
		if (data.year2.length) {
			for (var i=0; i<data.year2.length; i++) {
				var paramName = data.year2[i].ParameterName.toLowerCase();
				if (paramName in sortedData) {
					sortedData[paramName].unshift(dataPoint(data.year2[i]));
				}
				else {
					sortedData[paramName] = [dataPoint(data.year2[i])]
				}
			}
			firstYear = data.year2[0].DateObserved.slice(0,4);
			if (data.year3.length) {
				for (var i=0; i<data.year3.length; i++) {
					var paramName = data.year3[i].ParameterName.toLowerCase();
					if (paramName in sortedData) {
						sortedData[paramName].unshift(dataPoint(data.year3[i]));
					}
					else {
						sortedData[paramName] = [dataPoint(data.year3[i])]
					}
				}
				firstYear = data.year3[0].DateObserved.slice(0,4);
				if (data.year4.length) {
					for (var i=0; i<data.year4.length; i++) {
						var paramName = data.year4[i].ParameterName.toLowerCase();
						if (paramName in sortedData) {
							sortedData[paramName].unshift(dataPoint(data.year4[i]));
						}
						else {
							sortedData[paramName] = [dataPoint(data.year4[i])]
						}
					}
					firstYear = data.year4[0].DateObserved.slice(0,4);
					if (data.year5.length) {
						for (var i=0; i<data.year5.length; i++) {
							var paramName = data.year5[i].ParameterName.toLowerCase();
							if (paramName in sortedData) {
								sortedData[paramName].unshift(dataPoint(data.year5[i]));
							}
							else {
								sortedData[paramName] = [dataPoint(data.year5[i])]
							}
						}
						firstYear = data.year5[0].DateObserved.slice(0,4);
						if (data.year6.length) {
							for (var i=0; i<data.year6.length; i++) {
								var paramName = data.year6[i].ParameterName.toLowerCase();
								if (paramName in sortedData) {
									sortedData[paramName].unshift(dataPoint(data.year6[i]));
								}
								else {
									sortedData[paramName] = [dataPoint(data.year6[i])]
								}
							}
							firstYear = data.year6[0].DateObserved.slice(0,4);
							if (data.year7.length) {
								for (var i=0; i<data.year7.length; i++) {
									var paramName = data.year7[i].ParameterName.toLowerCase();
									if (paramName in sortedData) {
										sortedData[paramName].unshift(dataPoint(data.year7[i]));
									}
									else {
										sortedData[paramName] = [dataPoint(data.year7[i])]
									}
								}
								firstYear = data.year7[0].DateObserved.slice(0,4);
								if (data.year8.length) {
									for (var i=0; i<data.year8.length; i++) {
										var paramName = data.year8[i].ParameterName.toLowerCase();
										if (paramName in sortedData) {
											sortedData[paramName].unshift(dataPoint(data.year8[i]));
										}
										else {
											sortedData[paramName] = [dataPoint(data.year8[i])]
										}
									}
									firstYear = data.year8[0].DateObserved.slice(0,4);
									if (data.year9.length) {
										for (var i=0; i<data.year9.length; i++) {
											var paramName = data.year9[i].ParameterName.toLowerCase();
											if (paramName in sortedData) {
												sortedData[paramName].unshift(dataPoint(data.year9[i]));
											}
											else {
												sortedData[paramName] = [dataPoint(data.year9[i])]
											}
										}
										firstYear = data.year9[0].DateObserved.slice(0,4);
										if (data.year10.length) {
											for (var i=0; i<data.year10.length; i++) {
												var paramName = data.year10[i].ParameterName.toLowerCase();
												if (paramName in sortedData) {
													sortedData[paramName].unshift(dataPoint(data.year10[i]));
												}
												else {
													sortedData[paramName] = [dataPoint(data.year10[i])]
												}
											}
											firstYear = data.year10[0].DateObserved.slice(0,4);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (sortedData["ozone"] && sortedData["o3"]) {
		sortedData["ozone"] = sortedData["ozone"].concat(sortedData["o3"]);
		delete sortedData["o3"];
	}
	var month = parseMonth(data.today[0].DateObserved.slice(5,7));
	var datasets = [];
	var colors = ["gray", "blue", "red", "green", "purple", "orange"];
	var i = 0;
	Object.keys(sortedData).forEach(function (key){
		datasets.push({
			label: key.charAt(0).toUpperCase()+key.slice(1),
			data: sortedData[key],
			fill: false,
			borderWidth: 7,
			pointBorderWidth: 8,
			borderColor: colors[i],
			pointBorderColor: "black"
		});
		i++;
	})
	Chart.defaults.global.defaultFontColor = "black";
	var lineChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: datasets
		},

		options: {
			title: {
				display: true,
				fontSize: 24,
				text: "Air Quality in "+data.today[0].ReportingArea+", "+data.today[0].StateCode+" on "+month+" "+data.today[0].DateObserved.slice(8).trim()+",\nYears "+firstYear+"-"+data.today[0].DateObserved.slice(0,4)
			},
			scales: {
				yAxes: [{
					ticks: {
						max: 100,
						beginAtZero: true
					},
					scaleLabel: {
						labelString: "Adjusted Air Quality Index",
						display: true,
						fontSize: 20,
						fontStyle: "bold"
					}
				}],
				xAxes: [{
					type: 'linear',
					position: 'bottom',
					ticks: {
						fixedStepSize: 1
					},
					scaleLabel: {
						labelString: "Year",
						display: true,
						fontSize: 20,
						fontStyle: "bold"
					}
				}]
			}
		}
	});
}

function adjustScale(AQI) {
	return 100-AQI;
}

function dataPoint(data) {
	var point = {
		x: Number(data.DateObserved.slice(0,4)),
		y: adjustScale(data.AQI)
	}
	return point;
}

function parseMonth(monthNumberString) {
	switch (monthNumberString) {
		case "01":
			return "January";
		case "02":
			return "February";
		case "03":
			return "March";
		case "04":
			return "April";
		case "05":
			return "May";
		case "06":
			return "June";
		case "07":
			return "July";
		case "08":
			return "August";
		case "09":
			return "September";
		case "10":
			return "October";
		case "11":
			return "November";
		case "12":
			return "December";
		default:
			return "";
	}
}

function setBackground(){
	var imageName = "images/TreePD" + ((Math.floor(Math.random() * 10) +1).toString()) + ".jpg";
	$("body").css( {"background-image" : "url("+imageName+")"} );
}

function toggleFAQ(){
	$(".faq").toggleClass("hidden");
	$(".display").toggleClass("hidden");
}