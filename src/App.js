import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import { routes } from './config/routes';
import Button from './components/shared/Button';
import logo from './assets/img/logo.png';

function MainLayout() {
  const location = useLocation();
  // pega o primeiro segmento da URL como recurso
  const [resource] = location.pathname.split('/').filter(Boolean);
  // encontra a rota de “create” para esse recurso
  const createRoute = routes.find(
    r => r.resource === resource && r.type === 'create'
  );

  return (
    <div className="container">
      <div className="card mt-3 border border-dark">
        <div className="d-flex align-items-center p-3 justify-content-between">
          <img
            src={logo}
            className="img-fluid"
            alt="Logo"
            style={{ width: '50px', height: '50px' }}
          />
          <div className="ml-auto">
            {createRoute && (
              <Link to={`/${createRoute.path}`}>
                <Button title="Registrar" color="primary" />
              </Link>
            )}
          </div>
        </div>

        <Routes>
          {routes.map((route, idx) => (
            <Route
              key={idx}
              path={`/${route.path}`}
              element={route.component}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
