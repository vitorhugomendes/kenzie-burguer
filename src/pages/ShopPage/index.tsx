import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { StyledShopPage } from './style';
import { StyledContainer } from '../../styles/grid';

import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { api } from '../../services/api';
import { iProduct } from '../../providers/UserContext/@types';
import { UserContext } from '../../providers/UserContext/UserContext';
import { CartContext } from '../../providers/CartContext/CartContext';

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const { userToken, setProducts } = useContext(UserContext);
  const { cartModal } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === null) {
      navigate('/');
    } else {
      const userProducts = async () => {
        try {
          setLoading(true);
          const response = await api.get<iProduct[]>('/products', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          setProducts(response.data);
        } catch (error: any) {
          toast.error(error?.response?.data);
        } finally {
          setLoading(false);
        }
      };
      userProducts();
    }
  }, []);

  return (
    <StyledShopPage>
      {cartModal === true ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          {loading === true ? (
            <div>
              <h1>Carregando...</h1>
            </div>
          ) : (
            <ProductList />
          )}
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
