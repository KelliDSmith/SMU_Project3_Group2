$(document).ready(function() {
    //alert("Page Loaded");
    getData();
});

function getData() {
    console.log("getting data")
    d3.csv("/data/dog_clean.csv",function(data){
        // for(let i = 0;i<data.length;i++){
        //     console.log(data[i].breed);
        console.log(data)
        }
    );



    // let url = "../static/acc_data.json";

    // // AJAX
    // $.ajax({
    //     type: "GET",
    //     url: url,
    //     contentType: "application/json",
    //     dataType: "json",
    //     success: function(data) {

    //         //console.log(data);
    //         vis_1 (data);
    //     },
    //     error: function(data) {
    //         console.log("YOU BROKE IT!!");
    //     },
    //     complete: function(data) {
    //         console.log("Request finished");
    //     }
    // });
}

function vis_1 (data) {
    let curr_id = $("#animalFilter").val();
    let curr_data = data.filter(x => x.animal_type === curr_id);
    console.log(curr_data);
}