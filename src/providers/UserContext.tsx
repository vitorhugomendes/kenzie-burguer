import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { iLoginFormData } from '../components/Form/LoginForm/types';

interface iUserContextProps {
  children: React.ReactNode;
}

interface iUser {
  email: string;
  name: string;
  id: number;
}

interface iUserContext {
  userLogin: (formData: iLoginFormData) => void;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {
  const [user, setUser] = useState<iUser | null>(null);

  const userToken = localStorage.getItem('KenzieBurguer@TOKEN');

  const navigate = useNavigate();

  const userLogin = async (formData: iLoginFormData) => {
    try {
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      window.localStorage.setItem(
        'KenzieBurguer@TOKEN',
        response.data.accessToken
      );
      navigate('/shop');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const userLogout = () => {
    window.localStorage.clear();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (!userToken) {
      userLogout();
    } else {
      const userProducts = async () => {
        try {
          const response = await api.get('/products', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          console.log(response.data);
          navigate('/shop');
        } catch (error) {
          console.log(error);
        }
      };

      userProducts();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
