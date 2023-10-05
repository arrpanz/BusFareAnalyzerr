//showMap
function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.696443, lng: 85.32458 },
    mapId: "1aea3bc268f46967",
    zoom: 13.3,
  });
}

//Show route function
function getRoute() {
  const empt = document.getElementById("latitude").innerHTML;
  setTimeout(function () {
    if (empt == null || empt == "") {
      alert("Please get the longitude and latitude first.");
    } else {
      mapRequest(
        document.getElementById("latitude").textContent,
        document.getElementById("longitude").textContent,
        document.getElementById("latitude2").textContent,
        document.getElementById("longitude2").textContent
      );
    }
  }, 2000);
}
//Calculation
function calculateFare(distance) {
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value;
  const baseFare = 10;
  const farePerKilometer = 2;
  const distanceInKm = (distance / 1000).toFixed(2);
  const fare = baseFare + farePerKilometer * distanceInKm;
  if (userType === "student") {
    return fare - (45 / 100) * fare;
  } else if (userType === "senior") {
    return fare - (50 / 100) * fare;
  } else {
    return fare;
  }
}

//Show route between two places
function mapRequest(lat1, long1, lat2, long2) {
  const distanceOutput = document.getElementById("distanceOutput");
  const fareOutput = document.getElementById("fare-container");
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

  const fromLatLng = new google.maps.LatLng(lat1, long1);
  const toLatLng = new google.maps.LatLng(lat2, long2);

  // Use the Google Maps geometry library to compute distance
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    fromLatLng,
    toLatLng
  );

  distanceOutput.innerText = `Distance: ${(distance / 1000).toFixed(2)} kilometers`;
  fareOutput.innerText = `Rs ${calculateFare(distance)}`;
}



// CLEAR STUFF START HERE

function clearStuffs() {
  // Clear userType radio buttons
  const radioButtons = document.querySelectorAll('input[name="userType"]');
  for (const radioButton of radioButtons) {
    radioButton.checked = false;
  }

  // Clear "from" and "to" select elements
  document.getElementById("from").selectedIndex = 0;
  document.getElementById("to").selectedIndex = 0;

  // Clear latitude and longitude
  document.getElementById("latitude").textContent = "";
  document.getElementById("longitude").textContent = "";
  document.getElementById("latitude2").textContent = "";
  document.getElementById("longitude2").textContent = "";

  // Clear fare
  document.getElementById("fare-container").textContent = "";

  // Clear distance
  document.getElementById("distanceOutput").textContent = "";

  // Clear the map route
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.696443, lng: 85.32458 },
    mapId: "1aea3bc268f46967",
    zoom: 13.3,
  });
}

// CLEAR STUFF END HERE

