import { Routes, Route } from 'react-router-dom';
import List from './routes/List.js';

function App() {
  return (
    <div className="App">
      <h1>Front-End with React</h1>
      <Routes>
        <Route path='/' element={ <List /> }></Route> : 
      </Routes>
    </div>
  );
  
}

export default App;
