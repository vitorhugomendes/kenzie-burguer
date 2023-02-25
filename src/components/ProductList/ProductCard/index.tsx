import { useContext } from 'react';
import { toast } from 'react-toastify';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { iProduct } from '../../../providers/UserContext/@types';
import { CartContext } from '../../../providers/CartContext/CartContext';

const ProductCard = ({ id, name, category, price, img }: iProduct) => {
  const { cart, setCart } = useContext(CartContext);

  const addProductToCart = (product: iProduct) => {
    const checkCart = cart.some((cartProduct) => id === cartProduct.id);

    if (checkCart) {
      toast.error('O produto já está no carrinho');
    } else {
      setCart([...cart, product]);
      toast.success('Produto adicionado no carrinho');
    }
  };

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
            addProductToCart({ id, name, category, price, img });
          }}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};
export default ProductCard;
