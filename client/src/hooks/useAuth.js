import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [nama, setNama] = useState(null);
  const [hp, setHp] = useState(null);
  const [password, setPassword] = useState(null);
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        handleExpiredToken(); 
      } else {
        setIsAuthenticated(true);
        setEmail(decodedToken.email);
        setRole(decodedToken.role);

        axios
        .get('http://localhost:3001/getUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setNama(response.data.nama);
          setHp(response.data.hp);
          setPassword(response.data.password);
        })
        .catch((error) => {
          console.error(error.response.data);
        });
      }
    }
  }, []);

  const login = (token) => {
    handleVerify(token);
    setCookie('token', token);
  };

  const logout = () => {
    setCookie('token', '', {expires: new Date(0)});
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
          handleExpiredToken();
          return;
        }

        setIsAuthenticated(true);
        setEmail(decodedToken.email);
        setRole(decodedToken.role);
        setNama(decodedToken.nama);
        setHp(decodedToken.hp);
        setPassword(decodedToken.password);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const handleExpiredToken = () => {
    setCookie('token', '', {expires: new Date(0)});
    setIsAuthenticated(false);
    setEmail(null);
    setRole(null);
    navigate('/login');
    toast.warn('Sesi telah berakhir');
  };

  return {
    isAuthenticated,
    email,
    role,
    nama,
    hp,
    password,
    login,
    logout,
  };
}
