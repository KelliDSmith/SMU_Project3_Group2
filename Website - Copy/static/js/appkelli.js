$(document).ready(function() {
    // alert("Page Loaded");
    getData();

    $("#animalFilter").on("change", function() {
        getData();
    });
    $("#yearFilter").on("change", function() {
        getData();
    });

});

function getData() {
    let url = "/SMU_Project3_Group2/Website - Copy/static/data/kellidata.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            console.log(data);
            kellicharts(data);

        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

function kellicharts(data) {
    let animal_type_filter = $("#animalFilter").val();
    let year_filter = $("#yearFilter").val();
    let curr_data = data.filter(x => x.animal_type === animal_type_filter & x.intake_year == year_filter);

    //Owner Surrender Chart
    let owner_surrender = curr_data.filter(x => x.intake_type === "Owner Surrender")
    let surrender_sum = owner_surrender.map(x => x.count).reduce((a, b) => a + b, 0);
    owner_surrender.sort((a, b) => b.count - a.count);

    let trace1 = {
        x: owner_surrender.map(x => x.outcome_type),
        y: owner_surrender.map(x => 100 * x.count / surrender_sum),
        type: 'bar',
        marker: {
            color: '#A57548'
        }
    }

    let traces = [trace1];

    let layout = {
        autosize: true,
        // width: 500,
        // height: 500,
        title: {
            text: `<b>Owner Surrender (count: ${surrender_sum})</b>`,
            font: {
                size: 18
            }
        },
        yaxis: {
            title: '<b>Percentage</b>',
            titlefont: {
                size: 18,
                color: 'black'
            },
            range: [0, 80],
            tickfont: {
                size: 16,
                color: 'black',
            },
        },
        xaxis: {
            title: '<b>Outcome Type</b>',
            tickangle: 20,
            titlefont: {
                size: 16,
                color: 'black'
            },
            tickfont: {
                size: 12
            }
        }
    };

    Plotly.newPlot('bar2', traces, layout);

    //Public Assist Chart
    let pub_assist = curr_data.filter(x => x.intake_type === "Public Assist");
    let passist_sum = pub_assist.map(x => x.count).reduce((a, b) => a + b, 0);
    pub_assist.sort((a, b) => b.count - a.count);

    let trace2 = {
        x: pub_assist.map(x => x.outcome_type),
        y: pub_assist.map(x => 100 * x.count / passist_sum),
        type: 'bar',
        marker: {
            color: '#33658A'
        }
    }

    let traces2 = [trace2];

    let layout2 = {
        autosize: true,
        // width: 500,
        // height: 500,
        title: {
            text: `<b>Public Assist (count: ${passist_sum})<b>`,
            font: {
                size: 18
            }
        },
        yaxis: {
            title: '<b>Percentage</b>',
            titlefont: {
                size: 16,
                color: 'black'
            },
            range: [0, 80],
            tickfont: {
                size: 16,
                color: 'black',
            },
        },
        xaxis: {
            title: '<b>Outcome Type</b>',
            tickangle: 20,
            titlefont: {
                size: 16,
                color: 'black'
            },
            tickfont: {
                size: 12
            }
        }
    };

    Plotly.newPlot('bar1', traces2, layout2);

    //Stray Char
    let stray_data = curr_data.filter(x => x.intake_type === "Stray");
    let stray_sum = stray_data.map(x => x.count).reduce((a, b) => a + b, 0);
    stray_data.sort((a, b) => b.count - a.count);


    let trace3 = {
        x: stray_data.map(x => x.outcome_type),
        y: stray_data.map(x => 100 * x.count / stray_sum),
        type: 'bar',
        marker: {
            color: '#F6AE2D'
        }
    }

    let traces3 = [trace3];

    let layout3 = {
        autosize: true,
        // width: 500,
        // height: 500,
        title: {
            text: `<b>Stray (count: ${stray_sum})</b>`,
            font: {
                size: 18
            }
        },
        yaxis: {
            title: '<b>Percentage</b>',
            titlefont: {
                size: 16,
                color: 'black'
            },
            range: [0, 80],
            tickfont: {
                size: 16,
                color: 'black',
            },
        },
        xaxis: {
            title: '<b>Outcome Type</b>',
            tickangle: 20,
            titlefont: {
                size: 16,
                color: 'black'
            },
            tickfont: {
                size: 12
            }
        }
    };

    Plotly.newPlot('bar3', traces3, layout3);
}