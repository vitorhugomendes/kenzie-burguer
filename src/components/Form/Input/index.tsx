import { UseFormRegister, FieldValues } from 'react-hook-form';

import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInputProps {
  label: string;
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
}

const Input = ({ label, id, type, register, error }: iInputProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} id={id} {...register(id)} />
    <StyledParagraph fontColor='red'>{error}</StyledParagraph>
  </fieldset>
);

export default Input;
