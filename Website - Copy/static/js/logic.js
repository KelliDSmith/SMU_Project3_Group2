// geojson
var obj = ""

$(document).ready(function() {
    $.getJSON("/SMU_Project3_Group2/Website - Copy/static/js/geocode_data_animal.json", function(jsonData) {
        makeMap(jsonData);
        console.log(jsonData[0]);

    });

    // EVENT LISTENER
        $("#animalFilter").on("change",function() {
            makeMap();
        });
        $("#yearFilter").on("change",function() {
            makeMap();
        });




    // function mapFilter (data) {
    //     let animal_type_filter = $("#animalFilter").val();
    //     let year_filter = $("#yearFilter").val();
    //     let curr_data = data.filter(x => x.animal_type === animal_type_filter & x.intake_year == year_filter);
    // };


        function makeMap(data) {
            // init map HTML
            $("#mapcontainer").empty();
            $("#mapcontainer").append(`<div id="mapid"></div>`);
        };

    // Create the base layers.
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: 'pk.eyJ1IjoiYXJub2xkMzA2NSIsImEiOiJja3R3NjN0ZXEyaGV6MndvOTV1NWt2Mml2In0.mZyiY3Iped2RqWjifdVzqw'
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: 'pk.eyJ1IjoiYXJub2xkMzA2NSIsImEiOiJja3R3NjN0ZXEyaGV6MndvOTV1NWt2Mml2In0.mZyiY3Iped2RqWjifdVzqw'
    });

    // Create a baseMaps object to contain the streetmap and the darkmap.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer
    };

    // DO WORK AND CREATE THE OVERLAY LAYERS
    // Define arrays to hold the created  markers.


    
    var markers = L.markerClusterGroup();
    var heatArray = [];
    for (var i = 0; i < data.length; i++) {
        var latitude = data[i].latitude;
        var longitude = data[i].longitude;
        // console.log(latitude);
        // console.log(longitude);
        if(latitude){
            let marker = L.marker([latitude, longitude]);
            marker.bindPopup(`<h3>${data[i].breed}</h3><p>${data[i].color}</p><hr><p>${data[i].found_location}</p>`);
            markers.addLayer(marker);
            

            // add heat map data
            heatArray.push([latitude, longitude]);
        }
    };

    // Create layer groups for markers
    var heatLayer = L.heatLayer(heatArray, {
        radius: 15,
        blur: 10
    });



//     // Create an overlayMaps object to contain the "State Population" and "City Population" layers
    var overlayMaps = {
        "Heat Map": heatLayer,
        "Found Location": markers,
    };

//     // Modify the map so that it has the streetmap, states, and cities layers
    var myMap = L.map("mapcontainer", {
        center: [30.266666, -97.733330],
        zoom: 9,
        layers: [dark_layer, heatLayer]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
})