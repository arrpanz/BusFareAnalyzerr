//SHOW DISTANCE
function calculateDistance(lat1, lon1, lat2, lon2) {
    const fromLatLng = new google.maps.LatLng(lat1, lon1);
    const toLatLng = new google.maps.LatLng(lat2, lon2);
    
    // Use the Google Maps geometry library to compute distance
    const distance = google.maps.geometry.spherical.computeDistanceBetween(fromLatLng, toLatLng);
  
    return distance;
  }
  
  function getDistance() {
  
    // Extract latitude and longitude values from HTML elements
    const lat1 = parseFloat(document.getElementById('latitude').textContent);
    const lon1 = parseFloat(document.getElementById('longitude').textContent);
    const lat2 = parseFloat(document.getElementById('latitude2').textContent);
    const lon2 = parseFloat(document.getElementById('longitude2').textContent);
  
    // Check if the latitude and longitude values are valid numbers
    if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
        // Calculate the distance
        const distance = calculateDistance(lat1, lon1, lat2, lon2); //calls mathiko function
  
        // Display the distance on your web page
        const distanceOutput = document.getElementById('distanceOutput');
        distanceOutput.textContent = `Distance: ${(distance / 1000).toFixed(2)} kilometers`;
    } else {
        alert('Invalid latitude or longitude values.');
    }
  }
  

  //
  function CalcFare(fare){
console.log(calculateDistance(fare));
fare.textContent = `Distance: ${(distance / 1000).toFixed(2)} kilometers`;


  
  }





// function calculateFare(distanceInKilometers) {
//     // Define your fare calculation logic here
//     const baseFare = 5; 
//     const farePerKilometer = 2; 

//     // Calculate the fare based on the distance
//     const fare = baseFare + farePerKilometer * distanceInKilometers;

//     return fare;
// }
// if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
//     // Calculate the distance
//     const distance = calculateDistance(lat1, lon1, lat2, lon2);

//     // Calculate the fare based on the distance
//     const fare = calculateFare(distance);

//     // Display the fare on your web page
//     const fareOutput = document.getElementById('fareOutput');
//     distanceOutput.textContent = `Fare: $${fare.toFixed(2)}`;
// } else {
//     alert('Invalid latitude or longitude values.');
// }