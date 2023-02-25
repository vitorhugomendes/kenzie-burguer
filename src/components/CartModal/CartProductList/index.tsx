import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext/CartContext';

const CartProductList = () => {
  const { cart, cartTotal, cartClear } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {cart.map((product) => (
          <CartProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            img={product.img}
            name={product.name}
            price={product.price}
          />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {cartTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => {
          cartClear();
        }}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
