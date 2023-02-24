import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { api } from '../services/api';
import { iLoginFormData } from '../components/Form/LoginForm';
import { iRegisterFormData } from '../components/Form/RegisterForm';

interface iUserContextProps {
  children: React.ReactNode;
}

interface iUserContext {
  userLogin: (formData: iLoginFormData) => void;
  userLogout: () => void;
  userRegister: (formData: iRegisterFormData) => void;
  products: iProduct[];
}

interface iResponseLoginRegister {
  accessToken: string;
  user: iUser;
}

interface iUser {
  email: string;
  name: string;
  id: number;
}

interface iProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface Error {
  message: string[];
  statusCode: number;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [products, setProducts] = useState<iProduct[]>([]);

  const userToken = localStorage.getItem('KenzieBurguer@TOKEN');

  const navigate = useNavigate();

  const userLogin = async (formData: iLoginFormData) => {
    try {
      const response = await api.post<iResponseLoginRegister>(
        '/login',
        formData
      );
      setUser(response.data.user);
      window.localStorage.setItem(
        'KenzieBurguer@TOKEN',
        response.data.accessToken
      );
      navigate('/shop');
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast.error(error.response?.data);
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
          const response = await api.get<iProduct[]>('/products', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          setProducts(response.data);
          navigate('/shop');
        } catch (err) {
          const error = err as AxiosError<Error>;
          toast.error(error.response?.data);
        }
      };

      userProducts();
    }
  }, []);

  const userRegister = async (formData: iRegisterFormData) => {
    try {
      const response = await api.post<iResponseLoginRegister>(
        '/users',
        formData
      );
      toast.success(
        'Usuário criado com sucesso, redirecionando para a tela de login'
      );
      navigate('/');
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast.error(error.response?.data);
    }
  };

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, userRegister, products }}
    >
      {children}
    </UserContext.Provider>
  );
};
