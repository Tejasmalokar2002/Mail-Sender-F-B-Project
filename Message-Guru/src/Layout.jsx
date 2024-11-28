import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function Layout() {
  const location = useLocation(); 
  const hideNavbar = location.pathname === '/login' || location.pathname === '/createAccount';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default Layout;
