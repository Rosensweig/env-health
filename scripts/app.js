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
	// data=JSON.parse(data);
	console.log(data);
	$(".display").html("<h3>Air quality for "+data.today[0].ReportingArea+", "+data.today[0].StateCode+" on "+data.today[0].DateObserved.trim()+":</h3>");
	$(".display").append('<div class="quality-'+data.today[0].Category.Number+'"><h4>Air Quality Index: '+data.today[0].AQI+" out of 500, " +data.today[0].Category.Name+'.</h4></div>');
	$(".display").append('<p>(Lower numbers represent cleaner air.)</p>')
}
