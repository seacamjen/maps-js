//
// $(function(){
//   $("#locateBike").click(function(){
//     if (navigator.geolocation){
//       var positionOptions = {
//         enableHighAccuracy: true,
//         timeout: 10 * 1000 // 10 seconds
//       };
//       navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
//     }
//     else {
//       alert("Your browser doesn't support the Geolocation API");
//     }
//   });
// });
//
// function geolocationSuccess(position){
//   var currentLocation = {x: position.coords.latitude, y: position.coords.longitude};
//
//   $.get("https://bikeindex.org/api/v3/search?location=" + currentLocation.x +',' + currentLocation.y + "&distance=10&stolenness=proximity")
//   .then(function(response){
//
//   });
// }
//
// function geolocationError(positionError) {
//   alert(positionError);
// }
