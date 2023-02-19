let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5656, lng: 126.9769 },
    zoom: 17,
  });
}

window.initMap = initMap;