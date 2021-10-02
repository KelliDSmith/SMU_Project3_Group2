$(document).ready(function() {
    //alert("Page Loaded");
    getData();
});

function getData() {
    let url = "../static/acc_data.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {

            //console.log(data);
            vis_1 (data);
        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

function vis_1 (data) {
    let curr_id = $("#animalFilter").val();
    let curr_data = data.filter(x => x.animal_type === curr_id);
    console.log(curr_data);
}