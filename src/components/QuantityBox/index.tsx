import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { StyledQuantityBox } from './style';
import { StyledParagraph } from '../../styles/typography';

interface iQuantityBox {
  quantity: number;
  id?: never;
  toggleItemQuantity: (type: 'inc' | 'dec') => void;
  toggleCartItemQuantity?: never;
}

interface iCartQuantityBox {
  quantity: number;
  id: number;
  toggleItemQuantity?: never;
  toggleCartItemQuantity: (id: number, type: 'inc' | 'dec') => void;
}

type QuantityBoxProps = iQuantityBox | iCartQuantityBox;

const QuantityBox = ({
  quantity,
  id,
  toggleItemQuantity,
  toggleCartItemQuantity,
}: QuantityBoxProps) => (
  <StyledQuantityBox>
    <button
      type='button'
      aria-label='minus'
      onClick={() =>
        toggleCartItemQuantity
          ? toggleCartItemQuantity(id, 'dec')
          : toggleItemQuantity('dec')
      }
    >
      <AiFillMinusSquare size={24} />
    </button>
    <StyledParagraph className='quantity'>{quantity}</StyledParagraph>
    <button
      type='button'
      aria-label='plus'
      onClick={() =>
        toggleCartItemQuantity
          ? toggleCartItemQuantity(id, 'inc')
          : toggleItemQuantity('inc')
      }
    >
      <AiFillPlusSquare size={24} />
    </button>
  </StyledQuantityBox>
);

export default QuantityBox;
