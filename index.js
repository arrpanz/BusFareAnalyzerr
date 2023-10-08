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
// function calculateFare(distance) {
//   const userType = document.querySelector(
//     'input[name="userType"]:checked'
//   ).value;
//   const baseFare = 13;
//   const prevPrice = 165;
//   const currPrice = 175;

//   const changeInPrice = ((currPrice-prevPrice)/currPrice);

//   const changeRate = (changeInPrice * 100).toFixed(2);
//   const distanceInKm = (distance / 1000).toFixed(2);
//   const fare = (baseFare + changeRate + distanceInKm);
//   if (userType === "student") {
//     return (fare - (0.45) * fare);
//   } else if (userType === "senior") {
//     return (fare - (0.50) * fare);
//   } else {
//     return fare;
//   }
// }

function calculateFare(distance) {
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value;
  const fareOutput = document.getElementById("fare-container");
  const baseFare = 13;
  const farePerKilometer = 2;
  const distanceInKm = (distance / 1000).toFixed(2);
  const fare = baseFare + (farePerKilometer * distanceInKm);
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

//Show route between two places
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
    // waypoints: [
    //   {
    //     location: new google.maps.LatLng(27.706112, 85.345665), // Specify the coordinates of the waypoint
    //     stopover: false, // Indicates that it's a stopover point
    //   },
    //   // Add more waypoints if needed
    // ],
  };

  directionsService.route(request, function (response, status) {
    if (status === "OK") {
      directionsRenderer.setDirections(response);
    } else {
      console.error("Directions request failed:", status);
    }
    directionsRenderer.setMap(map);
    //start
    const steps = response.routes[0].overview_path;
    console.log(steps);

    const marker = new google.maps.Marker({
      map: map,
      position: {
        lat:  latitude,
        lng:  longitude,
      },
      label: "🚘",
      zIndex: 1,
    });

    let i = 0;
    const interval = setInterval(function () {
      i++;
      if (i === steps.length) {
        clearInterval(interval);
        return;
      }

      marker.setPosition({
        lat: latitude,
        lng: longitude,
      });
    }, 1000);
    //yah samma
  });

  const fromLatLng = new google.maps.LatLng(lat1, long1);
  const toLatLng = new google.maps.LatLng(lat2, long2);

  // Use the Google Maps geometry library to compute distance
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    fromLatLng,
    toLatLng
  );

  console.log(distance);

  distanceOutput.innerText = `Distance: ${(distance / 1000).toFixed(2)} kms.`;
  calculateFare(distance);
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
