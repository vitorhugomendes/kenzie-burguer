import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { iProductCard } from '../../../providers/CartContext/@types';
import { CartContext } from '../../../providers/CartContext/CartContext';
import QuantityBox from '../../QuantityBox';

const ProductCard = ({ product }: iProductCard) => {
  const { name, category, price, img } = product;
  const { addProductToCart, productQuantity, toggleItemQuantity } =
    useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>
        <StyledParagraph className='price'>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
        <div className='buttonBox'>
          <StyledButton
            $buttonSize='medium'
            $buttonStyle='green'
            onClick={() => {
              addProductToCart(product, productQuantity);
            }}
          >
            Adicionar
          </StyledButton>
          <QuantityBox
            quantity={productQuantity}
            toggleItemQuantity={toggleItemQuantity}
          />
        </div>
      </div>
    </StyledProductCard>
  );
};
export default ProductCard;
