import { UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInputProps {
  label: string;
  id: 'email' | 'password' | 'name' | 'passwordConfirmation';
  type: string;
  register: UseFormRegisterReturn<string>;
  error: string | undefined;
}

const Input = ({ label, id, type, register, error }: iInputProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} id={id} {...register} />
    <StyledParagraph fontColor='red'>{error}</StyledParagraph>
  </fieldset>
);

export default Input;
