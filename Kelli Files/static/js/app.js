$(document).ready(function() {
    // alert("Page Loaded");
    getData2();
    
    // $("#animalFilter").on("change",function() {
    //     getData();
    // });
    // $("#yearFilter").on("change",function() {
    //     getData();
    // });


});

function getData2() {
    let url = "geocode_data.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            console.log(data);

        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

// function getData() {
//     let url = "kellidata.json";

//     // AJAX
//     $.ajax({
//         type: "GET",
//         url: url,
//         contentType: "application/json",
//         dataType: "json",
//         success: function(data) {

//             console.log(data);
//             kellicharts (data);

//         },
//         error: function(data) {
//             console.log("YOU BROKE IT!!");
//         },
//         complete: function(data) {
//             console.log("Request finished");
//         }
//     });
// }

// function kellicharts (data) {
//     let animal_type_filter = $("#animalFilter").val();
//     let year_filter = $("#yearFilter").val();
//     let curr_data = data.filter(x => x.animal_type === animal_type_filter & x.intake_year == year_filter);

//     //Owner Surrender Chart
//     let owner_surrender = curr_data.filter(x=>x.intake_type === "Owner Surrender")
//     let surrender_sum = owner_surrender.map(x => x.count).reduce((a, b) => a + b, 0);
//     owner_surrender.sort((a, b) => b.count - a.count);

//     let trace1 = {
//         x: owner_surrender.map(x => x.outcome_type),
//         y: owner_surrender.map(x => 100 * x.count/surrender_sum),
//         // text: owner_surrender.outcome_type,
//         // name: "Owner Surrender",
//         type: 'bar',
//         marker: {
//             color: 'blue'
//         }
//     }

//     let traces = [trace1];

//     let layout = {
//         autosize: false,
//         width: 500,
//         height: 500,
//         // title: "Title Goes Here",
//         xaxis: {
//             title: `Owner Surrender (count: ${surrender_sum})`
//         },
//         yaxis: {
//             range: [0, 70],
//             tickfont: {
//                 size: 10,
//                 color: 'black',
//             }
//         }
//     };

//     Plotly.newPlot('bar2', traces, layout);

//     //Public Assist Chart
//     let pub_assist = curr_data.filter(x=>x.intake_type === "Public Assist");
//     let passist_sum = pub_assist.map(x => x.count).reduce((a, b) => a + b, 0);
//     pub_assist.sort((a, b) => b.count - a.count);

//     let trace2 = {
//         x: pub_assist.map(x => x.outcome_type),
//         y: pub_assist.map(x => 100 * x.count/passist_sum),
//         // text: owner_surrender.outcome_type,
//         // name: "Owner Surrender",
//         type: 'bar',
//         marker: {
//             color: 'purple'
//         }
//     }

//     let traces2 = [trace2];

//     let layout2 = {
//         autosize: false,
//         width: 500,
//         height: 500,
//         // title: "Title Goes Here",
//         xaxis: {
//             title: `Public Assist (count: ${passist_sum})`
//         },
//         yaxis: {
//             range: [0, 70],
//             tickfont: {
//                 size: 10,
//                 color: 'black',
//             }
//         }
//     };

//     Plotly.newPlot('bar1', traces2, layout2);

//     //Stray Char
//     let stray_data = curr_data.filter(x=>x.intake_type === "Stray");
//     let stray_sum = stray_data.map(x => x.count).reduce((a, b) => a + b, 0);
//     stray_data.sort((a, b) => b.count - a.count);

    
//     let trace3 = {
//         x: stray_data.map(x => x.outcome_type),
//         y: stray_data.map(x => 100 * x.count/stray_sum),
//         // text: owner_surrender.outcome_type,
//         // name: "Owner Surrender",
//         type: 'bar',
//         marker: {
//             color: 'orange'
//         }
//     }

//     let traces3 = [trace3];

//     let layout3 = {
//         autosize: false,
//         width: 500,
//         height: 500,
//         // title: "Title Goes Here",
//         xaxis: {
//             title: `Stray (count: ${stray_sum})`
//         },
//         yaxis: {
//             range: [0, 70],
//             tickfont: {
//                 size: 10,
//                 color: 'black',
//             }
//         }
//     };

//     Plotly.newPlot('bar3', traces3, layout3);
// }
