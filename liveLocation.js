//        //Current Location
//        let latitude;
// let longitude;
// let marker;

//        const x = document.getElementById("currLoc");

//        function getLocation() {
//          if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(showPosition);
//          } else { 
//            currLoc.innerHTML = "Geolocation is not supported by this browser.";
//          }
//        }
       
//        function showPosition(position) {

//          currLoc.innerHTML = "Latitude: " + position.coords.latitude + 
//          "<br>Longitude: " + position.coords.longitude;
         
//        }
//       // Current Location Block Ends here
//       // https://softauthor.com/google-maps-api-realtime-tracking-javascript/

// new block 
let latitude;
let longitude;
let marker; // Declare a marker variable

//Current Location
const x = document.getElementById("currLoc");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    currLoc.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  currLoc.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

  // Create a marker on the live location
  if (!marker) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      mapId: "1aea3bc268f46967",
      zoom: 13.3,
    });

    marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "Live Location",
    });
  } else {
    // Update the marker position
    marker.setPosition({ lat: latitude, lng: longitude });
  }
}

// Call getLocation to get the user's current location
getLocation();

       



