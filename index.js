// Merged JavaScript code from index.html and index.js

// Initialize Google Maps

function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.696443, lng: 85.32458 },
    mapId: "1aea3bc268f46967",
    zoom: 13.3,
  });
}

// Show route function
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

// Calculation
function calculateFare(distance) {
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value;
  const fareOutput = document.getElementById("fare-container");
  const baseFare = 13;
  const farePerKilometer = 2;
  const distanceInKm = (distance / 1000).toFixed(2);
  const fare = baseFare + farePerKilometer * distanceInKm;
  if (userType === "student") {
    fareOutput.textContent = `Rs ${
      Math.round((fare - 0.45 * fare) * 100) / 100
    }`;
  } else if (userType === "senior") {
    fareOutput.textContent = `Rs ${
      Math.round((fare - 0.5 * fare) * 100) / 100
    }`;
  } else {
    fareOutput.textContent = `Rs ${Math.round(fare * 100) / 100}`;
  }
}

const trackLocation = ({ onSuccess, onError = () => {} }) => {
  if ("geolocation" in navigator === false) {
    return onError(new Error("Geolocation is not supported by your browser."));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
  });
};

// Show route between two places
function mapRequest(lat1, long1, lat2, long2) {
  const distanceOutput = document.getElementById("distanceOutput");

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

    const fromLatLng = new google.maps.LatLng(lat1, long1);
    const toLatLng = new google.maps.LatLng(lat2, long2);

    // Use the Google Maps geometry library to compute distance
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      fromLatLng,
      toLatLng
    );

    distanceOutput.innerText = `Distance: ${(distance / 1000).toFixed(2)} kms.`;
    calculateFare(distance);

    const initialPosition = { lat: Number(lat1), lng: Number(long1) };
    const marker = new google.maps.Marker({
      map: map,
      position: initialPosition,
      label: "🚘",
      zIndex: 999,
    });
    trackLocation({
      onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
        marker.setPosition({ lat, lng });
        console.log({ lat, lng });
      },
      onError: (err) =>
        alert(`Error: ${getPositionErrorMessage(err.code) || err.message}`),
    });
  });
}

// Clear user selections and data
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

// Initializing fromValue and toValue to get value from two source and destination location
let fromValue = document.getElementById("from").value;
let toValue = document.getElementById("to").value;

// Initializing global variables of two selectable form options
const selectFrom = document.getElementById("from");
const selectTo = document.getElementById("to");

// Listening if a value of the selectable form option has changed (if changed, initializes the latest selected value)
selectFrom.addEventListener("change", function handleChange(e) {
  fromValue = document.getElementById("from").value;
});

selectTo.addEventListener("change", function handleChange(e) {
  toValue = document.getElementById("to").value;
});

// Get Longitude and latitude of first place
function getLongitudeLatitude(placeName) {
  const geocoder = new google.maps.Geocoder();
  const latitudeOutput = document.getElementById("latitude");
  const longitudeOutput = document.getElementById("longitude");

  geocoder.geocode(
    {
      address: placeName, //geocoding request to the Google Maps API
    },
    function (results, status) {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        latitudeOutput.textContent = lat;
        longitudeOutput.textContent = lng;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }
  );
}

// Get Longitude and latitude of second place
function getLongitudeLatitude2(placeName) {
  const geocoder2 = new google.maps.Geocoder();
  const latitudeOutput2 = document.getElementById("latitude2");
  const longitudeOutput2 = document.getElementById("longitude2");

  geocoder2.geocode(
    {
      address: placeName,
    },
    function (results, status) {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat2 = location.lat();
        const lng2 = location.lng();

        latitudeOutput2.textContent = lat2;
        longitudeOutput2.textContent = lng2;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }
  );
}

function getLatLong() {
  const fromValue = document.getElementById("from").value;
  const toValue = document.getElementById("to").value;
  getLongitudeLatitude(fromValue);
  getLongitudeLatitude2(toValue);
}
