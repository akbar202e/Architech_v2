import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
const AdminRoutes = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const token = cookies.token;
  const role = jwtDecode(token).role;
  console.log('Token:', token);
  console.log('Role:', role);

  return token && role === 'admin' ? <Outlet /> : <Navigate to='/register' />;
};

export default AdminRoutes;