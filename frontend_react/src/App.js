import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './routes/List.js';
import MapGoogleDefault from './routes/map/google/MapGoogleDefault.js';
import MapNaverCurrent from './routes/map/naver/MapNaverCurrent.js';
import MapNaverDefault from './routes/map/naver/MapNaverDefault.js';
import MapNaverTarget from './routes/map/naver/MapNaverTarget.js';

function App() {
  useEffect(() => {
    initMapsAPIScript();
  }, []);

  return (
    <div className="App">
      <h1>Front-End with React</h1>
      <Routes>
        <Route path="/" element={<List />}></Route> :
        <Route path="/map/naver/default" element={<MapNaverDefault />}></Route>{' '}
        :<Route path="/map/naver/current" element={<MapNaverCurrent />}></Route>{' '}
        :<Route path="/map/naver/target" element={<MapNaverTarget />}></Route> :
        <Route
          path="/map/google/default"
          element={<MapGoogleDefault />}
        ></Route>{' '}
        :
      </Routes>
    </div>
  );

  function load(url, cb, err) {
    var element = document.createElement('script');
    var parent = 'body';
    var attr = 'src';

    element.async = true;
    element.onload = function () {
      cb();
    };
    element.onerror = function () {
      err();
    };
    element[attr] = url;
    document[parent].appendChild(element);
  }

  function initMapsAPIScript() {
    var clientId = process.env.REACT_APP_CLIENT_ID;
    var url = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + clientId;
    load(url, () => {
      console.log('init API script success');
    });
  }
}

export default App;
