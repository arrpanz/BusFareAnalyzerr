//showMap
function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.696443, lng: 85.324580},
    mapId: "1aea3bc268f46967",
    zoom: 13.3,
  });
}
//Calculation 




//////
//Show route between two places
function mapRequest(lat1, long1, lat2, long2) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.6999855, lng: 85.3278716 },
    mapId: "1aea3bc268f46967",
    zoom: 12,
  });
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const start = new google.maps.LatLng(lat1, long1);
  const end = new google.maps.LatLng(lat2, long2);

  const request = {
    origin: start,
    destination: end,
    travelMode: "DRIVING",
  };

  directionsService.route(request, function (response, status) {
    if (status === "OK") {
      directionsRenderer.setDirections(response);
    } else {
      console.error("Directions request failed:", status);
    }
    directionsRenderer.setMap(map);
  });
}

// **************************************** distance show ****************************************





//Clear latitude and longitude
function clearStuffs() {
  document.getElementById("latitude").textContent = '';
  document.getElementById("longitude").textContent = '';

  document.getElementById("latitude2").textContent = '';
  document.getElementById("longitude2").textContent = '';

  // Clear radio button selections
  var studentRadio = document.getElementById("student");
  var SeniorCitizenRadio = document.getElementById("SeniorCitizen");
  var NoneRadio = document.getElementById("None");

  studentRadio.checked = false;
  SeniorCitizenRadio.checked = false;
  NoneRadio.checked = false;

   // Clear select tag selection
   var selectElement = document.getElementById("from");
   selectElement.selectedIndex = 0;
   var selectElement = document.getElementById("to");
   selectElement.selectedIndex = 0; 

  
}
