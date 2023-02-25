import { useContext } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';
import { UserContext } from '../../providers/UserContext/UserContext';
import { CartContext } from '../../providers/CartContext/CartContext';

const ShopPage = () => {
  const { loading } = useContext(UserContext);
  const { cartModal } = useContext(CartContext);
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
