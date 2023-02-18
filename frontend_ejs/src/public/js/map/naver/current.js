let map = new naver.maps.Map('map');
let infowindow = new naver.maps.InfoWindow();

window.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
  } else {
    let center = map.getCenter();
    infowindow.setContent(
      '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>'
      );
    infowindow.open(map, center);
  }
});

function onSuccessGeolocation(position) {
  const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map.setCenter(location);
  map.setZoom(17);

  const marker = new naver.maps.Marker({
    position: location,
    map: map,
  });

  infowindow.open(marker, location);
  console.log('Coordinates: ' + location.toString());
}

function onErrorGeolocation() {
  let center = map.getCenter();

  infowindow.setContent('<div style="padding:20px;">' +
    '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>' + "latitude: " + center.lat() +
    "<br />longitude: " + center.lng() + '</div>');

  infowindow.open(map, center);
}