import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TasksList from './components/TasksList';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Routes>
        <Route exact path='/' element={<TasksList/>} />
      </Routes>
      
    </div>
    </BrowserRouter>
      
  );
}

export default App;
