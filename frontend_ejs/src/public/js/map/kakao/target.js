let container = document.getElementById('map');
let options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3
};

let map = new kakao.maps.Map(container, options);

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
  let locPosition = new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude);

  displayMarker(locPosition);
}

function displayMarker(locPosition) {
  let marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });
  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}