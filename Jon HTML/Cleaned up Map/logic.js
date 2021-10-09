// geojson
var obj = ""

$(document).ready(function() {
    $.getJSON("geocode_data_animal.json", function(jsonData) {
        makeMap(jsonData);
        console.log(jsonData[0]);
      });

    // EVENT LISTENER
    
});



// function buildDropdown(data) {
//     let breed = global_data.names;  //extract the first name of 940 
    
//     for (let i = 0; i < names.length; i++) {
//         let name = names[i];
//         let html_option = `<option value="${name}">${name}</option>`;
//         $("#selDataset").append(html_option);
//     }
// };



function makeMap(data) {
    // init map HTML
    $("#mapcontainer").empty();
    $("#mapcontainer").append(`<div id="mapid"></div>`);

    // Create the base layers.
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
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
    }

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

    // var legend = L.control({ position: 'bottomright'});
    // legend.onAdd = function() {
    //     var div = l.DomUtil.create('div, info legend');

    //     let legend_html = `<i class="circle" style='background; #98ee00></i><span>"dog"</span></br>
    //     <i class="circle" style='background; #98ee00></i><span>"cat"</span></br>
    //     `
    //     div.innerHTML = legend_html;
    //     return div;
    // }
    // legend.addTo(myMap);

    //     function makeColor(depth) {
    //         let rtnColor = "#98ee00";

    //         if (depth == "dog"){
    //             rtnColor = "#ea2c2c";
    //         } else if (depth == "cat") {
    //                 rtnColor = "#ea822c";
    //             }
    //             return rtnColor;
    //         };
        
    


//     // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

