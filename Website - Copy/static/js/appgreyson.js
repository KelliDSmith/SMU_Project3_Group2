$(document).ready(function() {
    var type = $("#animalFilter").val();
    var year = $("#yearFilter").val();

    $("#animalFilter").on("change", function() {
        type = $("#animalFilter").val()
        runVisual(type, year);
    });
    $("#yearFilter").on("change", function() {
        year = $("#yearFilter").val()

        runVisual(type, year);
    });
    runVisual(type, year);
});


// function runVisual(type,year) {
//     if(type === "Dog"){
//         var url = "/SMU_Project3_Group2/Website - Copy/static/data/dog_clean_time.json";
//     }
//     else if(type === "Cat"){
//         var url = "/SMU_Project3_Group2/Website - Copy/static/data/cat_clean_time.json";
//     }
function runVisual(type, year) {
    if (type === "Dog") {
        var url = "/SMU_Project3_Group2/Website - Copy/static/data/dog_clean_time.json";
    } else if (type === "Cat") {
        var url = "/SMU_Project3_Group2/Website - Copy/static/data/cat_clean_time.json";
    }
    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            timeVisual(data, year, type);
        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
};


function timeVisual(data, year, type) {

    let intake_month_list = [];
    let count_list = [];
    for (let i = 0; i < 53; i++) {
        if (data.intake_year[i] == year) {
            intake_month_list.push(data.intake_month[i]);
            count_list.push(data.count[i]);
        }
    }
    var trace1 = {
        name: "",
        type: "scatter",
        mode: "lines",
        x: intake_month_list,
        y: count_list,
        line: {
            color: '#33658A'
        }
    }
    var trace2 = {
        name: "",
        type: 'bar',
        x: intake_month_list,
        y: count_list,
        color: '#000000'


    }
    var trace3 = {
        name: "",
        x: intake_month_list,
        y: count_list,
        type: "scatter",
        mode: "markers",
        marker: { size: 8, color: 'black' },
        text: [`${count_list[0]} ${type.toLowerCase()}s in shelter`, `${count_list[1]} ${type.toLowerCase()}s in shelter`, `${count_list[2]} ${type.toLowerCase()}s in shelter`, `${count_list[3]} ${type.toLowerCase()}s in shelter`, `${count_list[4]} ${type.toLowerCase()}s in shelter`, `${count_list[5]} ${type.toLowerCase()}s in shelter`, `${count_list[6]} ${type.toLowerCase()}s in shelter`, `${count_list[7]} ${type.toLowerCase()}s in shelter`, `${count_list[8]} ${type.toLowerCase()}s in shelter`, `${count_list[9]} ${type.toLowerCase()}s in shelter`, `${count_list[10]} ${type.toLowerCase()}s in shelter`, `${count_list[11]} ${type.toLowerCase()}s in shelter`],

    }

    let traces = [trace1, trace3];

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let layout = {
        title: {
            text: `<b>${type}'s in Shelters/Month in ${year}</b>`,
            font: {
                size: 20
            }
        },
        xaxis: {
            title: '<b>Months</b>',
            titlefont: {
                size: 18,
                color: 'black'
            },
            tickangle: 20,
            tickfont: {
                size: 18,
                color: 'black'
            },
            tickmode: 'array',
            tickvals: intake_month_list,
            ticktext: months
        },
        yaxis: {
            title: '<b># of Animals</b>',
            titlefont: {
                size: 18,
                color: 'black'
            },
        },
        tickfont: {
            size: 18,
            color: 'black'
        },
        showlegend: false,
        hovermode: 'closest'

    };
    Plotly.newPlot('time', traces, layout, { response: true });
};