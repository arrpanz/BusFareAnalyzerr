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
         currLoc.innerHTML = "Latitude: " + position.coords.latitude + 
         "<br>Longitude: " + position.coords.longitude;
       }
       //Current Location Block Ends here
       
       //https://softauthor.com/google-maps-api-realtime-tracking-javascript/