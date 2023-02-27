import { createContext, useState, useEffect } from 'react';
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
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<iProduct[]>([]);

  const userToken = localStorage.getItem('KenzieBurguer@TOKEN');

  const searchProducts = products.filter((product) =>
    search === ''
      ? true
      : product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
  );

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
    } catch (error: any) {
      toast.error(error?.response?.data);
    }
  };

  const userLogout = () => {
    window.localStorage.clear();
    setUser(null);
    navigate('/');
  };

  const userRegister = async (formData: iRegisterFormData) => {
    try {
      const response = await api.post<iResponseLoginRegister>(
        '/users',
        formData
      );
      toast.success(
        'Usuário criado com sucesso, redirecionado para a tela de login'
      );
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response.data);
    }
  };

  useEffect(() => {
    if (userToken) {
      navigate('/shop');
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userToken,
        userLogin,
        userLogout,
        userRegister,
        setSearch,
        products,
        setProducts,
        searchProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
