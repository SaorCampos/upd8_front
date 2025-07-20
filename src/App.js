import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';
import Button from './components/shared/Button';
import logo from './assets/img/logo.png';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="card mt-3 border border-dark">
          <div className="d-flex align-items-center p-3 justify-content-between">
            <img src={logo} className="img-fluid" alt="Logo" style={{ width: '50px', height: '50px' }} />
            <div className="ml-auto">
              <a href="/registrar">
                <Button
                  title="Registrar"
                  color="primary"
                />
              </a>
            </div>
          </div>

          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;