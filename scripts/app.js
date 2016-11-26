var state = {
	apis: {
		forestWatch: {
			BASE_URL: "http://api.globalforestwatch.org/forest-change"
		},
		airNow: {
			BASE_URL: "http://www.airnowapi.org/aq/observation/zipCode/current/",
			API_KEY: "48250217-9108-4158-BE74-6C44F69E19DF"
		}
	},
	data: null
};

$(document).ready(function() {

	$("form").on("click", "button#submit", function(event) {
		$(this).preventDefault()
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
		data: {
			zipCode: query,
			distance: 25,
			API_KEY: state.apis.airNow.API_KEY
		}
	};
	$.ajax(settings);
}

function displayData(data) {
	console.log(data);
}