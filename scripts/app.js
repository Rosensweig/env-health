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

	$(".search").click(function(event) {
		event.preventDefault();
		var query = $(this).siblings(".location").val().match(/[0-9]{5}/) ? $(this).siblings(".location").val() : "02144";
		state.data = getData(query, displayData);
	});

	$(".location").keyup( function(event){
		if(event.which==13) {
			$(".search").trigger("click");
			return false;
		}
	});

});

function getData(query, callback) {
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
	$(".display").html('<canvas id="chart" width="400" height="400"></canvas>');
	var ctx = $("#chart");
	var dataSet = [dataPoint(data.today[0])];
	var firstYear = data.today[0].DateObserved.slice(0,4);
	if (data.year1.length) {
		dataSet.unshift(dataPoint(data.year1[0]));
		firstYear = data.year1[0].DateObserved.slice(0,4);
		if (data.year2.length) {
			dataSet.unshift(dataPoint(data.year2[0]));
			firstYear = data.year2[0].DateObserved.slice(0,4);
			if (data.year3.length) {
				dataSet.unshift(dataPoint(data.year3[0]));
				firstYear = data.year3[0].DateObserved.slice(0,4);
				if (data.year4.length) {
					dataSet.unshift(dataPoint(data.year4[0]));
					firstYear = data.year4[0].DateObserved.slice(0,4);
					if (data.year5.length) {
						dataSet.unshift(dataPoint(data.year5[0]));
						firstYear = data.year5[0].DateObserved.slice(0,4);
						if (data.year6.length) {
							dataSet.unshift(dataPoint(data.year6[0]));
							firstYear = data.year6[0].DateObserved.slice(0,4);
							if (data.year7.length) {
								dataSet.unshift(dataPoint(data.year7[0]));
								firstYear = data.year7[0].DateObserved.slice(0,4);
								if (data.year8.length) {
									dataSet.unshift(dataPoint(data.year8[0]));
									firstYear = data.year8[0].DateObserved.slice(0,4);
									if (data.year9.length) {
										dataSet.unshift(dataPoint(data.year9[0]));
										firstYear = data.year9[0].DateObserved.slice(0,4);
										if (data.year10.length) {
											dataSet.unshift(dataPoint(data.year10[0]));
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
	var month = parseMonth(data.today[0].DateObserved.slice(5,7));
	Chart.defaults.global.defaultFontColor = "black";
	var lineChart = new Chart(ctx, {
		type: 'line',
		data: {
			// labels: labels,
			datasets: [{
				label: "Ozone in "+data.today[0].ReportingArea+", "+data.today[0].StateCode+" on "+month+" "+data.today[0].DateObserved.slice(8).trim()+", years "+firstYear+"-"+data.today[0].DateObserved.slice(0,4),
				data: dataSet,
				fill: false, 
				borderWidth: 8,
				pointBorderWidth: 12,
				pointBackgroundColor: "black"
			}]
		},

		options: {
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
	point = {
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
			return ""
	}
}