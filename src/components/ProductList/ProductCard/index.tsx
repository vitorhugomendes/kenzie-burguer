import { useContext } from 'react';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { iProductCard } from '../../../providers/CartContext/@types';
import { CartContext } from '../../../providers/CartContext/CartContext';

const ProductCard = ({ product }: iProductCard) => {
  const { name, category, price, img } = product;
  const {
    addProductToCart,
    productQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='content'>
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
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => {
            addProductToCart(product, productQuantity);
          }}
        >
          Adicionar
        </StyledButton>
        <button
          type='button'
          aria-label='Subtrair'
          onClick={() => decreaseQuantity()}
        >
          <AiFillMinusSquare size={24} />
        </button>
        <StyledTitle tag='h2' $fontSize='four'>
          {productQuantity}
        </StyledTitle>
        <button
          type='button'
          aria-label='Adicionar'
          onClick={() => increaseQuantity()}
        >
          <AiFillPlusSquare size={24} />
        </button>
      </div>
    </StyledProductCard>
  );
};
export default ProductCard;
