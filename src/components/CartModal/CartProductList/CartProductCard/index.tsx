import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { iProduct } from '../../../../providers/UserContext/@types';
import { CartContext } from '../../../../providers/CartContext/CartContext';

const CartProductCard = ({ id, img, category, name, price }: iProduct) => {
  const { cartRemoveProduct } = useContext(CartContext);

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
          aria-label='Remover'
          onClick={() => {
            cartRemoveProduct({ id, img, category, name, price });
          }}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};
export default CartProductCard;
