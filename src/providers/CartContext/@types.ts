export interface iCartContextProps {
  children: React.ReactNode;
}

export interface iCartContext {
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
}
