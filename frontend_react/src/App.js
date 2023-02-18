import { Routes, Route } from 'react-router-dom';
import List from './routes/List.js';
import MapGoogleDefault from './routes/map/google/MapGoogleDefault.js';
import MapNaverCurrent from './routes/map/naver/MapNaverCurrent.js';
import MapNaverDefault from './routes/map/naver/MapNaverDefault.js';
import MapNaverTarget from './routes/map/naver/MapNaverTarget.js';

function App() {
  return (
    <div className="App">
      <h1>Front-End with React</h1>
      <Routes>
        <Route path='/' element={ <List /> }></Route> : 

        <Route path='/map/naver/default' element={ <MapNaverDefault /> }></Route> : 
        <Route path='/map/naver/current' element={ <MapNaverCurrent /> }></Route> : 
        <Route path='/map/naver/target' element={ <MapNaverTarget /> }></Route> : 

        <Route path='/map/google/default' element={ <MapGoogleDefault /> }></Route> : 
      </Routes>
    </div>
  );
  
}

export default App;
