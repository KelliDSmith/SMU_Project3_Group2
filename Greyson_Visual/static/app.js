$(document).ready(function() {
    getData();
});

// function getData() {
//     console.log("getting data")
//     d3.csv("/data/dog_clean.csv",function(data){
        
//         // // for(let i = 0;i<data.length;i++){
//         // //     console.log(data[i].breed);
//         // //console.log(data[0].breed)
//         // //let breeds = data.map(item => item.breed);
//         // //let breeds = [];
//         // //console.log(data.intake_datetime);
//         // timeVisual(data)
//         // 
//         console.log(data);
//         vis_1(data);
//     });
// }


function getData() {
    let url = "/data/dog_clean_time.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            //console.log(data);
            timeVisual(data);
        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}
function timeVisual(data) {
    //let curr_id = $("#animalFilter").val();
    //let curr_data = data.map(x => x.animal_type === curr_id);
    //console.log(data.intake_datetime);
     let intake_month_list = [];
     let count_list = [];
     let year = 2015;
     for(let i = 0;i<53;i++){
        if(data.intake_year[i] === year){
            intake_month_list.push(data.intake_month[i]);
            count_list.push(data.count[i]);
        }
     }
    //console.log(intake_datetime_list[0])
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "Test",
            x: intake_month_list,
            y: count_list
        }
        var trace2 = {
            type:'bar',
            x:intake_month_list,
            y:count_list
        }
        let traces = [trace1,trace2];

        let layout = {
            title: "Test"
        };
        Plotly.newPlot('bubble',traces,layout);
    }