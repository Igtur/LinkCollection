import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import 'materialize-css';

function App() {
  const routes = useRoutes(false);
  return (
    <Router>

    <div className="container">
      <h1>123</h1>
      {routes}
    </div>

     </Router>
  )
}

export default App;
