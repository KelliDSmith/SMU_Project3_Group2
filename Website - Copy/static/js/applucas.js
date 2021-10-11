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
    let url = "SMU_Project3_Group2/Website/data/breed_data.json";

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
                colors: ["#86BBD8","#33658A","#2F4858","#F6AE2D","#A57548"]
              },
            textinfo: "percent",
            textposition: "inside",
            hoverinfo: 'label+percent',
            automargin: true
          }];
          
          var layout = {
            autosize: true,
            // height: 400,
            // width: 400,
            annotations: {
                font: {
                    size: 20
                }
            },
            margin: {"t": 20, "b": 20, "l": 0, "r": 0},
            showlegend: true,
            legend: {
                font: {
                    size: 20
                },
            }
          };
          
          Plotly.newPlot('pie', data, layout);
};