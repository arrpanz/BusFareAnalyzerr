//GeoLocation
var x = document.getElementById("currentLocation");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
 



//showMap
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat:27.67573106538192, lng:85.34534985238629 },
    zoom: 15,
  });

  
const marker = new google.maps.Marker({
    position: { lat:27.67421109577204, lng:85.32496542193951 },
    map: map,
});

}


//creating DirectionService function
var directionsService = new google.maps.DirectionsService();
//creating DirectionRenderer function
var directionsDisplay = new google.maps.DirectionsRenderer();
//binding direction
directionsDisplay.setMap(map);

function calcRoute(){
        //create request

    var request={
      origin: document.getElementById("from").value,
      destination: document.getElementById("to").value,
      travelMode: google.maps.TravelMode.DRIVING,// WALKING , BYCYCLING, TRANSIT
      unitSystem: google.maps.UnitSystem.metric
  }
  
  
}