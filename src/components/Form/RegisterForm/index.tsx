import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './validations';

import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../providers/UserContext';

export interface iRegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterFormData>({ resolver: yupResolver(formSchema) });

  return (
    <StyledForm onSubmit={handleSubmit(userRegister)}>
      <Input
        label='Nome'
        id='name'
        type='text'
        register={register}
        error={errors?.name?.message}
      />
      <Input
        label='Email'
        id='email'
        type='email'
        register={register}
        error={errors?.email?.message}
      />
      <Input
        label='Senha'
        id='password'
        type='password'
        register={register}
        error={errors?.password?.message}
      />
      <Input
        label='Confirmar senha'
        id='passwordConfirmation'
        type='password'
        register={register}
        error={errors?.passwordConfirmation?.message}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
