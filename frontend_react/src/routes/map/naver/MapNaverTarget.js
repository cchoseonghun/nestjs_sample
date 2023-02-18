import { useEffect, useRef, useState } from 'react';

const MapNaverTarget = () => {
  const mapElement = useRef(null);
  const { naver } = window;

  const [myLocation, setMyLocation] = useState({});

  useEffect(() => {
    setMap();
  }, [myLocation]);

  return (
    <>
      <h1>Naver Map - Target Position</h1>
      <div ref={mapElement} style={{ minHeight: '400px' }} />
      <button className='btn btn-primary mt-3 me-1' onClick={() => {goTarget('판교역')}}>판교역</button>
      <button className='btn btn-primary mt-3 me-1' onClick={() => {goTarget('강남역')}}>강남역</button>
    </>
  );

  function goTarget(target) {
    let latitude, longitude;
    if (target === '판교역') {
      latitude= 37.394998;
      longitude= 127.11109;
    } else if (target === '강남역') {
      latitude= 37.498050;
      longitude= 127.027673;
    }
    setMyLocation({ latitude, longitude });
  }

  function setMap() {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(myLocation.latitude || 37.5656, myLocation.longitude || 126.9769);
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }
};

export default MapNaverTarget;
