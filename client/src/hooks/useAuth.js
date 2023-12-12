import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [cookies, setCookie] = useCookies(['token']);

  console.log(email);
  console.log(role);
  useEffect(() => {
    const token = cookies.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setIsAuthenticated(true);
        setEmail(decodedToken.email);
        setRole(decodedToken.role); 
        console.log(token); 
      }
    }
  }, []);

  const login = (token) => {
    handleVerify(token);
    setCookie('token', token);
  };

  const logout = () => {
    setCookie('token', '');
    setIsAuthenticated(false);
    setEmail(null);
    setRole(null); 
  };

  const handleVerify = (token) => {
    axios
      .get('http://localhost:3001/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          console.error('Token inválido');
          return;
        }

        setIsAuthenticated(true);
        setEmail(decodedToken.email);
        setRole(decodedToken.role); 
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return {
    isAuthenticated,
    email,
    role, 
    login,
    logout,
  };
}