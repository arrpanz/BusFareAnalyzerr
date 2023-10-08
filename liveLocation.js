      //  //Current Location
      //  const x = document.getElementById("currLoc");

      //  function getLocation() {
      //    if (navigator.geolocation) {
      //      navigator.geolocation.getCurrentPosition(showPosition);
      //    } else { 
      //      currLoc.innerHTML = "Geolocation is not supported by this browser.";
      //    }
      //  }
       
      //  function showPosition(position) {
      //    currLoc.innerHTML = "Latitude: " + position.coords.latitude + 
      //    "<br>Longitude: " + position.coords.longitude;
         
      //  }
       //Current Location Block Ends here
       //https://softauthor.com/google-maps-api-realtime-tracking-javascript/


       
       const x = document.getElementById("currLoc");
       function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(updateUserPosition);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
      
      // Update the user's position and calculate route
      function updateUserPosition(position) {
        const userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
        // Update the marker's position or create a new marker if it doesn't exist
        if (!marker) {
          marker = new google.maps.Marker({
            map: map,
            position: userLatLng,
            label: "🚶‍♂️", // You can use any icon for the user's position
            zIndex: 2,
          });
        } else {
          marker.setPosition(userLatLng);
        }
      
        // Calculate the route to the destination
        calculateRoute(userLatLng);
      }
      
      // Calculate the route to the destination
      function calculateRoute(userLatLng) {
        const request = {
          origin: userLatLng,
          destination: destination,
          travelMode: "DRIVING",
        };
      
        directionsService.route(request, function (response, status) {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
      
            // Check if the user is close to the destination
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              userLatLng,
              destination
            );
      
            if (distance < 100) { // You can adjust this distance threshold as needed
              alert("You have reached your destination!");
            }
          } else {
            console.error("Directions request failed:", status);
          }
        });
      }
  