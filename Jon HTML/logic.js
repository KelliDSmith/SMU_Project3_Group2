// geojson
var boroughs_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";

$(document).ready(function() {
    getDataAndMakeMap();

    // EVENT LISTENER
    $("#limit_filter").on("change", function() {
        getDataAndMakeMap();
    });
    $("#complaint_filter").on("change", function() {
        getDataAndMakeMap();
    });
});

function buildURL() {
    // Store the API query variables.
    var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
    // Add the dates in the ISO formats
    var date = "$where=created_date between '2016-01-01' and '2016-12-31'";
    // Add the complaint type.
    var complaint = `&complaint_type=${$("#complaint_filter").val()}`;
    // Add a limit.
    var limit = `&$limit=${$("#limit_filter").val()}`;
    // build URL
    var url = baseURL + date + complaint + limit;

    return (url);
}

function getDataAndMakeMap() {
    let url = buildURL();

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            // NESTED AJAX
            $.ajax({
                type: "GET",
                url: boroughs_url,
                contentType: "application/json",
                dataType: "json",
                success: function(bor_data) {
                    makeMap(data, bor_data);

                },
                error: function(data) {
                    console.log("YOU BROKE IT!!");
                },
                complete: function(data) {
                    console.log("Request finished");
                }
            });

        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

function makeMap(data, bor_data) {
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
    var rodentMarkers = L.markerClusterGroup();
    var heatArray = [];
    for (var i = 0; i < data.length; i++) {
        var location = data[i].location;

        if (location) {
            let marker = L.marker([location.coordinates[1], location.coordinates[0]]);
            marker.bindPopup("<h1>" + data[i].descriptor + "</h1> <hr> <h2>" + data[i].incident_address + "</h2>" + "<img src='https://static.wikia.nocookie.net/pixar/images/5/56/Ratatouille-remy2.jpg'>");
            rodentMarkers.addLayer(marker);

            // add heat map data
            heatArray.push([location.coordinates[1], location.coordinates[0]]);
        }
    }

    // Create layer groups for markers
    var heatLayer = L.heatLayer(heatArray, {
        radius: 50,
        blur: 10
    });

    // CREATE BOROUGHS LAYER
    // Creating a GeoJSON layer with the retrieved data
    let geoLayer = L.geoJson(bor_data, {
        // Passing in our style object
        style: function(feature) {
            return {
                color: "white",
                fillColor: chooseColor(feature.properties.borough),
                fillOpacity: 0.5,
                weight: 1.5
            };
        },
        // This is called on each feature.
        onEachFeature: function(feature, layer) {
            // Set the mouse events to change the map styling.
            layer.on({
                // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.9
                    });
                },
                // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.5
                    });
                },
                // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
                click: function(event) {
                    myMap.fitBounds(event.target.getBounds());
                }
            });

            // Giving each feature a popup with information that's relevant to it
            layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
        }
    });

    // Create an overlayMaps object to contain the "State Population" and "City Population" layers
    var overlayMaps = {
        "Rodent Markers": rodentMarkers,
        "Heat Map": heatLayer,
        "Boroughs": geoLayer
    };

    // Modify the map so that it has the streetmap, states, and cities layers
    var myMap = L.map("mapid", {
        center: [30.26759, -97.74299 ],
        zoom: 11,
        layers: [dark_layer, geoLayer, rodentMarkers]
    });

    // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}


// HELPER FUNCTION

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(borough) {
    let rtnColor = "";

    if (borough == "Brooklyn") {
        rtnColor = "yellow";
    } else if (borough == "Bronx") {
        rtnColor = "red";
    } else if (borough == "Manhattan") {
        rtnColor = "orange";
    } else if (borough == "Queens") {
        rtnColor = "green";
    } else if (borough == "Staten Island") {
        rtnColor = "purple";
    } else {
        rtnColor = "black";
    }

    return rtnColor;
}