//showMap
function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.696443, lng: 85.324580},
    mapId: "1aea3bc268f46967",
    zoom: 13.3,
  });
}

//Show route between two places
function mapRequest(lat1, long1, lat2, long2) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.6999855, lng: 85.3278716 },
    mapId: "1aea3bc268f46967",
    zoom: 12,
  });
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

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
  });
}

//
//Clear latitude and longitude
function clearStuffs() {
  document.getElementById("latitude").textContent = '';
  document.getElementById("longitude").textContent = '';

  document.getElementById("latitude2").textContent = '';
  document.getElementById("longitude2").textContent = '';
}
