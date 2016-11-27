var state = {
	apis: {
		forestWatch: {
			BASE_URL: "http://api.globalforestwatch.org/forest-change"
		},
		airNow: {
			BASE_URL: "https://www.airnowapi.org/aq/observation/zipCode/current/",
			API_KEY: "48250217-9108-4158-BE74-6C44F69E19DF"
		}
	},
	data: null
};

$(document).ready(function() {

	$("form").on("click", ".search", function(event) {
		event.preventDefault();
		var query = "02144";
		state.data = getData(query, displayData);
	});

});

function getData(query, callback) {
	var settings = {
		url: state.apis.airNow.BASE_URL,
		dataType: 'json',
		type: 'GET',
		success: callback,
		processData: false,
		data: makeQS({
			format: "application/json",
			zipCode: query,
			distance: 25,
			API_KEY: state.apis.airNow.API_KEY
		})
	};
	$.ajax(settings);
}

function makeQS(obj) {
	var params = [];
	for (var key in obj) {
		params.push(key + '=' + obj[key]);
	}
	return params.join('&');
}

function displayData(data) {
	console.log(data);
}