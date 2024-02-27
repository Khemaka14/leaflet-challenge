

let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(queryUrl).then(function (data) {
    //Using the D3 function to get the data from the API
    L.geoJSON(data,{
        pointToLayer: function (feature, latlng) {
             return new L.circleMarker(latlng, {
                 radius: (feature.properties.mag)*5,
                 fillColor: getColor(feature.geometry.coordinates[2]),
                 color: "#000000",
                 weight: 1,
                 opacity: 1,
                 fillOpacity: 0.8,
                
             });
         },
         
         onEachFeature:onEachFeature
         }).addTo(myMap);

    console.log(data)
  });

// Creating the map object

let myMap = L.map("map", {
    center: [56.1304, -106.3468],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  //Function That determines the color of each marker based on depth 
  function getColor(depth){
  let color = "";
  if (depth > 90) {
    color = "#F96066";
  }
  else if (depth > 70) {
    color = "#F7A360";
  }
  else if (depth > 50) {
    color = "#F9B733";
  }
  else if (depth > 30) {
    color = "#F4DB25";
  }
  else if (depth > 10) {
    color = "#DBF421";
  }
  else {
    color = "#A6F61F";
  }
  return color
  }

  // Function which adds a popup to each marker
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
    <h4>Latitude: ${feature.geometry.coordinates[1]}</h4>
    <h4>Longitude: ${feature.geometry.coordinates[0]}</h4>
    <h4>Depth: ${feature.geometry.coordinates[2]}</h4>
    <h4>Magnitude: ${feature.properties.mag}</h4>`);
  }

  // A legend which shows the the corresponding depth based on color.
  var legend = L.control({position: "bottomright"});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [-10, 10, 30, 50, 70, 90]
          
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);



  
  
 
    