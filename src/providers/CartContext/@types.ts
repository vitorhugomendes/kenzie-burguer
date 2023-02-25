import { iProduct } from '../UserContext/@types';

export interface iCartContextProps {
  children: React.ReactNode;
}

export interface iCartContext {
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  cart: iProduct[];
  setCart: React.Dispatch<React.SetStateAction<iProduct[]>>;
  cartTotal: number;
  cartClear: () => void;
  cartRemoveProduct: (product: iProduct) => void;
}
