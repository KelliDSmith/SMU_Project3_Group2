$(document).ready(function() {
    // alert("Page Loaded");
    getData2();
    
    $("#animalFilter").on("change",function() {
        getData2();
    });
    $("#yearFilter").on("change",function() {
        getData2();
    });
});

function getData2() {
    let url = "/data/breed_data.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            console.log(data);
            lucuschart (data);

        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}


function lucuschart (data) {
    let animal_type_filter = $("#animalFilter").val();
    let year_filter = $("#yearFilter").val();
    let curr_data = data.filter(x => x.animal_type === animal_type_filter & x.intake_year == year_filter);

    //find top 10 breeds
    let top_ten = curr_data.slice(0,5);
    let top_ten_sum = top_ten.map(x => x.count).reduce((a, b) => a + b, 0);
    console.log(top_ten);

    var data = [{
            values: top_ten.map(x => 100 * x.count/top_ten_sum),
            labels: top_ten.map(x => x.breed),
            type: 'pie',
            marker: {
                colors: ["#DB2763","#B0DB43","#12EAEA","#BCE7FD","#C492B1"]
              }
          }];
          
          var layout = {
            title: `<b>Top 10 Breeds in Shelters</b>`,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('pie', data, layout);
};

    // function lucuschart2 (data) {
    //     let animal_type_filter = $("#animalFilter").val();
    //     let year_filter = $("#yearFilter").val();
    //     let curr_data = data.filter(x => x.animal_type === animal_type_filter & x.intake_year == year_filter);
    
    //     //find top 10 breeds
    //     let top_ten = curr_data.slice(0,10);
    //     console.log(top_ten);

    //     // Radialize the colors
    //     Highcharts.setOptions({
    //         colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
    //             return {
    //                 radialGradient: {
    //                     cx: 0.5,
    //                     cy: 0.3,
    //                     r: 0.7
    //                     },
    //                 stops: [
    //                     [0, color],
    //                     [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
    //                     ]
    //                 };
    //         })
    //     });

    //     // Build the chart
    //     Highcharts.chart('container', {
    //         chart: {
    //             plotBackgroundColor: null,
    //             plotBorderWidth: null,
    //             plotShadow: false,
    //             type: 'pie'
    //         },
    //         title: {
    //             text: 'Top 10 Breeds'
    //         },
    //         tooltip: {
    //             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //         },
    //         accessibility: {
    //             point: {
    //                 valueSuffix: '%'
    //             }
    //         },
    //         plotOptions: {
    //             pie: {
    //                 allowPointSelect: true,
    //                 cursor: 'pointer',
    //                 dataLabels: {
    //                     enabled: true,
    //                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //                     connectorColor: 'silver'
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: 'Share',
    //             data: [
    //                 { name: top_ten.breed[0], y: top_ten.count[0] },
    //                 { name: top_ten.breed[1], y: top_ten.count[1] },
    //                 { name: top_ten.breed[2], y: top_ten.count[2] },
    //                 { name: top_ten.breed[3], y: top_ten.count[3] },
    //                 { name: top_ten.breed[4], y: top_ten.count[4] },
    //                 { name: top_ten.breed[5], y: top_ten.count[] },
    //             ]
    //         }]
    // });