export interface iUserContextProps {
  children: React.ReactNode;
}

export interface iUserContext {
  userToken: string | null;
  userLogin: (formData: iLoginFormData) => Promise<void>;
  userLogout: () => void;
  userRegister: (formData: iRegisterFormData) => Promise<void>;
  products: iProduct[];
  searchProducts: iProduct[];
  setProducts: React.Dispatch<React.SetStateAction<iProduct[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface iResponseLoginRegister {
  accessToken: string;
  user: iUser;
}

export interface iUser {
  email: string;
  name: string;
  id: number;
}

export interface iProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface iLoginFormData {
  email: string;
  password: string;
}

export interface iRegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
