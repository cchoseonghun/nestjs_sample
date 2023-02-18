import { useEffect, useRef } from 'react';

const MapNaverDefault = () => {
  const mapElement = useRef(null);
  const { naver } = window;

  useEffect(() => {
    setMap();
  }, []);

  return (
    <>
      <h1>Naver Map - Default</h1>
      <div ref={mapElement} style={{ minHeight: '400px' }} />
    </>
  );

  function setMap() {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }
};

export default MapNaverDefault;
