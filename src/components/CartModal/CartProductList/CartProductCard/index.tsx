import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { iProductCard } from '../../../../providers/CartContext/@types';
import { CartContext } from '../../../../providers/CartContext/CartContext';
import QuantityBox from '../../../QuantityBox';

const CartProductCard = ({ product }: iProductCard) => {
  const { id, img, name, quantity } = product;
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
        <QuantityBox
          quantity={quantity}
          id={id}
          toggleCartItemQuantity={toggleCartItemQuantity}
        />

        <button
          className='removeButton'
          type='button'
          aria-label='remove'
          onClick={() => removeProductFromCart(product)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
