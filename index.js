//GeoLocation
var x = document.getElementById("currentLocation");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;

  const marker = new google.maps.Marker({
    position: getLocation,
    map: map,
  });
  map.setCenter(getLocation);
}

// This is just a change

//showMap
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.6999855, lng: 85.3278716 },
    mapId: "1aea3bc268f46967",
    zoom: 13.2,
  });
}

//creating DirectionService function
var directionsService = new google.maps.DirectionsService();
//creating DirectionRenderer function
var directionsDisplay = new google.maps.DirectionsRenderer();
//binding direction
directionsDisplay.setMap(map);

function calcRoute() {
  //create request

  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, // WALKING , BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.metric,
  };
}
