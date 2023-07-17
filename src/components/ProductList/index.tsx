import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { UserContext } from '../../providers/UserContext/UserContext';

const ProductList = () => {
  const { searchProducts } = useContext(UserContext);
  return (
    <StyledProductList>
      {searchProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
