import { UseFormRegister } from 'react-hook-form';
import { iLoginFormData } from '../LoginForm';
import { iRegisterFormData } from '../RegisterForm';

import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInputProps {
  label: string;
  id: 'email' | 'password' | 'name' | 'passwordConfirmation';
  type: string;
  register:
    | UseFormRegister<iLoginFormData>
    | UseFormRegister<iRegisterFormData>;
  error: string | undefined;
}

const Input = ({ label, id, type, register, error }: iInputProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} id={id} {...register(id)} />
    <StyledParagraph fontColor='red'>{error}</StyledParagraph>
  </fieldset>
);

export default Input;
