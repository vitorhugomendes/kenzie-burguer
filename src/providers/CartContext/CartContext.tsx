import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { iCartContext, iCartContextProps } from './@types';
import { iProduct } from '../UserContext/@types';

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartContextProps) => {
  const [cartModal, setCartModal] = useState(false);
  const [cartItems, setCartItems] = useState<iProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);

  let foundProduct: iProduct;
  let index: number;

  const addProductToCart = (product: iProduct, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...product };
      newCartItem.quantity = quantity;

      setCartItems([...cartItems, { ...newCartItem }]);
    }
    toast.success(`${productQuantity} ${product.name} adicionado ao carrinho.`);
  };

  const removeProductFromCart = (product: iProduct) => {
    foundProduct = cartItems.find((item) => item.id === product.id)!;
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: number, type: 'inc' | 'dec') => {
    foundProduct = cartItems.find((item) => item.id === id)!;
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = cartItems.filter((item) => item.id !== id);

    if (type === 'inc') {
      foundProduct.quantity += 1;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (type === 'dec') {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
      setCartItems([
        ...newCartItems.slice(0, index),
        foundProduct,
        ...newCartItems.slice(index),
      ]);
    }
  };

  const toggleItemQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setProductQuantity((previousQuantity) => previousQuantity + 1);
    } else if (type === 'dec') {
      setProductQuantity((previousQuantity) => {
        if (previousQuantity - 1 < 1) {
          return 1;
        }
        return previousQuantity - 1;
      });
    }
  };

  const cartClear = () => {
    setCartItems([]);
    toast.info('Carrinho esvaziado');
  };

  return (
    <CartContext.Provider
      value={{
        cartModal,
        setCartModal,
        cartItems,
        setCartItems,
        totalPrice,
        totalQuantities,
        productQuantity,
        toggleItemQuantity,
        addProductToCart,
        cartClear,
        toggleCartItemQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
