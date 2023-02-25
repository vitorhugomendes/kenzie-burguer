import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { iCartContext, iCartContextProps } from './@types';
import { iProduct } from '../UserContext/@types';

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartContextProps) => {
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState<iProduct[]>([]);

  const cartTotal = cart.reduce((total, product) => total + product.price, 0);

  const cartClear = () => {
    setCart([]);
    toast.info('Carrinho esvaziado');
  };

  const cartRemoveProduct = (product: iProduct) => {
    const newCart = cart.filter((cartProduct) => product.id !== cartProduct.id);
    setCart(newCart);
    toast.info('Produto retirado do carrinho');
  };

  return (
    <CartContext.Provider
      value={{
        cartModal,
        setCartModal,
        cart,
        setCart,
        cartTotal,
        cartClear,
        cartRemoveProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
