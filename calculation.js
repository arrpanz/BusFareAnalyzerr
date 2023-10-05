//changes
function calculateFare(distanceInKilometers) {
    // Define your fare calculation logic here
    const baseFare = 5; 
    const farePerKilometer = 2; 

    // Calculate the fare based on the distance
    const fare = baseFare + farePerKilometer * distanceInKilometers;

    return fare;
}
if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
    // Calculate the distance
    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    // Calculate the fare based on the distance
    const fare = calculateFare(distance);

    // Display the fare on your web page
    const fareOutput = document.getElementById('fareOutput');
    distanceOutput.textContent = `Fare: $${fare.toFixed(2)}`;
} else {
    alert('Invalid latitude or longitude values.');
}