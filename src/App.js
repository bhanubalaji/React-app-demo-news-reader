import './App.css';
import Routes from './shared/routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './context/context';

function App() {
  return (
    <StoreProvider>
    <Router>
      <Routes></Routes>
    </Router>
    </StoreProvider>

  );
}

export default App;
