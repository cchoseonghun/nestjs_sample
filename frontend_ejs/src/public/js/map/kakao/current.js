let mapContainer = document.getElementById('map');
let mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude; // 위도
    let lon = position.coords.longitude; // 경도

    let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition);
  });
} else {
  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  let message = 'geolocation을 사용할수 없어요..';
  console.log(message);

  displayMarker(locPosition);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition) {
  let marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });
  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}
