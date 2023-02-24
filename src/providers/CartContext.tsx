import { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';

interface iCartContextProps {
  children: React.ReactNode;
}

interface iCartContext {
  cartModal: boolean;
}

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartContextProps) => {
  const { products } = useContext(UserContext);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState();

  return (
    <CartContext.Provider value={{ cartModal }}>
      {children}
    </CartContext.Provider>
  );
};
