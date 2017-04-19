var apiKey = require('./../.env').apiKey;
var geoKey = require('./../.env').geoKey;

$( document ).ready(function() {
  $.getScript('http://maps.google.com/maps/api/js?key=' + apiKey);
  $('#locateUser').click(locateUser);
});

//google maps functions
function locateUser() {
  // If the browser supports the Geolocation API
  if (navigator.geolocation){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000 // 10 seconds
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}


function geolocationSuccess(position) {
  var responseArray = [];
  var latlongArray = [];
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom : 12,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });

  $.get("https://bikeindex.org/api/v3/search?location=" + userLatLng.lat() +',' + userLatLng.lng() + "&distance=10&stolenness=proximity")
  .then(function(response){
    response.bikes.forEach(function(bike) {
      responseArray.push(bike.stolen_location);
    });
    responseArray.forEach(function(location){
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + geoKey)
      .then(function(response) {
        console.log(response.results[0].geometry.location);
        latlongArray.push(response.results[0].geometry.location);
      })
      .then(function(response) {
        var markers = latlongArray.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        var markerCluster = new MarkerClusterer(mapObject, markers,
                  {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      })
    });
  });
}

function geolocationError(positionError) {
  alert(positionError);
}
