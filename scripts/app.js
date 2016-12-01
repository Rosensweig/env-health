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

	$("form").on("click", ".search", function(event) {
		event.preventDefault();
		var query = "02144";
		state.data = getData(query, displayData);
	});

});

function getData(query, callback) {
	/*
	var settings = {
		url: state.apis.airNow.BASE_URL,
		dataType: 'jsonp',
		crossDomain: true,
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
	console.log($.ajax(settings));
	console.log("end of getData function");
	*/
	//var params = {

		// data: makeQS({
		// 	format: "application/json",
		// 	zipCode: query,
		// 	distance: 25,
		// 	API_KEY: state.apis.airNow.API_KEY
		// });
        //  };
            var result = $.ajax({
                /* update API end point */
                url: state.apis.airNow.BASE_URL + query,
		success: callback,
                /*set the call type GET / POST*/
                type: "GET"
            })
            /* if the call is NOT successful show errors */
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
}




function makeQS(obj) {
	var params = [];
	for (var key in obj) {
		params.push(key + '=' + obj[key]);
	}
	return params.join('&');
}

function displayData(data) {
	console.log("Hello from displayData()");
	console.log(data);
}
