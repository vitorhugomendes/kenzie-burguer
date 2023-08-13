import { iProduct } from '../UserContext/@types';

export interface iCartContextProps {
  children: React.ReactNode;
}

export interface iCartContext {
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: iProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<iProduct[]>>;
  totalPrice: number;
  totalQuantities: number;
  productQuantity: number;
  toggleItemQuantity: (id: number, type: 'inc' | 'dec') => void;
  addProductToCart: (product: iProduct, quantity: number) => void;
  cartClear: () => void;
  toggleCartItemQuantity: (id: number, type: 'inc' | 'dec') => void;
  removeProductFromCart: (product: iProduct) => void;
}

export interface iProductCard {
  product: iProduct;
}
