import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  iUserContextProps,
  iUserContext,
  iResponseLoginRegister,
  iUser,
  iProduct,
  iLoginFormData,
  iRegisterFormData,
} from './@types';
import { api } from '../../services/api';

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [products, setProducts] = useState<iProduct[]>([]);
  const [search, setSearch] = useState('');

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
    } catch (error) {
      toast.error(error?.response?.data);
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
        } catch (error) {
          toast.error(error?.response?.data);
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
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const searchProducts = products.filter((product) =>
    search === ''
      ? true
      : product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, userRegister, products, searchProducts }}
    >
      {children}
    </UserContext.Provider>
  );
};
