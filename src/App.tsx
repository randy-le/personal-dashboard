import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Dashboard } from './dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Dashboard/>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
