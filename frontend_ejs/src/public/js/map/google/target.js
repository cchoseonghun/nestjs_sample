let map;

function goTarget(target) {
  let latitude, longitude;
  if (target === '판교역') {
    latitude = 37.394998;
    longitude = 127.11109;
  } else if (target === '강남역') {
    latitude = 37.49805;
    longitude = 127.027673;
  }
  setMyLocation({ latitude, longitude });
}

function setMyLocation(myLocation) {
  const pos = {
    lat: myLocation.latitude,
    lng: myLocation.longitude,
  };

  map.setCenter(pos);

  // 현재 위치 마커
  const marker = new google.maps.Marker({
    position: pos,
    map: map,
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5656, lng: 126.9769 },
    zoom: 17,
  });
}

window.initMap = initMap;