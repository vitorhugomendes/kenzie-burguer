import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { UserContext } from '../../providers/UserContext/UserContext';

const ProductList = () => {
  const { searchProducts } = useContext(UserContext);
  return (
    <StyledProductList>
      {searchProducts.map((product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          category={product.category}
          img={product.img}
          name={product.name}
          price={product.price}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
