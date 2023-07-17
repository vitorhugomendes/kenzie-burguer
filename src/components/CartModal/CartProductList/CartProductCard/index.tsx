import { useContext, useRef } from 'react';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { iProductCard } from '../../../../providers/CartContext/@types';
import { CartContext } from '../../../../providers/CartContext/CartContext';

const CartProductCard = ({ product }: iProductCard) => {
  const { id, img, name, price, quantity } = product;
  const { toggleCartItemQuantity, removeProductFromCart } =
    useContext(CartContext);

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Subtrair'
          onClick={() => toggleCartItemQuantity(id, 'dec')}
        >
          <AiFillMinusSquare size={24} />
        </button>
        <span>{quantity}</span>
        <button
          type='button'
          aria-label='Adicionar'
          onClick={() => toggleCartItemQuantity(id, 'inc')}
        >
          <AiFillPlusSquare size={24} />
        </button>

        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeProductFromCart(product)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
