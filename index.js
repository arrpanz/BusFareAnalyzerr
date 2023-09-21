let map;

function initMap() {
 
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat:27.67573106538192, lng:85.34534985238629 },
    zoom: 15,
  });

  
const marker = new google.maps.Marker({
    position: { lat:27.67421109577204, lng:85.32496542193951 },
    map: map,
});

}

 