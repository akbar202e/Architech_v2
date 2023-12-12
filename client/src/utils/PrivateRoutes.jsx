import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const token = cookies.token;
  const role = localStorage.getItem('role');
  return token ? <Outlet /> : <Navigate to='/register' />;
};

export default PrivateRoutes;
