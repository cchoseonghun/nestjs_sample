let map = new naver.maps.Map('map');
let infowindow = new naver.maps.InfoWindow();

let myLocation;

window.addEventListener('DOMContentLoaded', () => {});

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

function setMyLocation(obj) {
  myLocation = obj;

  const location = new naver.maps.LatLng(
    myLocation.latitude || 37.5656,
    myLocation.longitude || 126.9769,
  );
  map.setCenter(location);
  map.setZoom(17);

  const marker = new naver.maps.Marker({
    position: location,
    map: map,
  });

  infowindow.open(marker, location);
}
