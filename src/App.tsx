import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import routes from './routes';
import { AuthStoreProvider } from './stores/auth.store';
import HomePage from './pages/HomePage';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import { ThemeProvider, useTheme } from './stores/theme.store';

function AppRoutes() {
  const element = useRoutes(routes);
  const location = useLocation();
  const { theme } = useTheme();

  // ซ่อน Navbar ในหน้า 404
    const is404Page = !routes.some(route => 
    route.path === location.pathname || 
    (route.path?.includes(':') && location.pathname.match(route.path.replace(/:\w+/g, '[^/]+'))));
  
  const showNavbar = !is404Page;
  
  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme={theme}>
      {showNavbar && <Navbar />}
      <Suspense fallback={<HomePage />}>
        {element}
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthStoreProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthStoreProvider>
    </BrowserRouter>
  );
}

export default App;