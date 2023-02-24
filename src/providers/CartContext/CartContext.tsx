import { createContext, useContext, useState } from 'react';
import { iCartContext, iCartContextProps } from './@types';
import { UserContext } from '../UserContext/UserContext';
import { iProduct } from '../UserContext/@types';

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartContextProps) => {
  const { products } = useContext(UserContext);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState<iProduct[]>([]);

  return (
    <CartContext.Provider value={{ cartModal, setCartModal }}>
      {children}
    </CartContext.Provider>
  );
};
