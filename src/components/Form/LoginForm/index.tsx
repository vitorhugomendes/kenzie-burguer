import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './validations';

import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

import { UserContext } from '../../../providers/UserContext/UserContext';

import { iLoginFormData } from '../../../providers/UserContext/@types';

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginFormData>({ resolver: yupResolver(formSchema) });

  return (
    <StyledForm onSubmit={handleSubmit(userLogin)}>
      <Input
        label='Email'
        id='email'
        type='email'
        register={register('email')}
        error={errors?.email?.message}
      />
      <Input
        label='Senha'
        id='password'
        type='password'
        register={register('password')}
        error={errors?.password?.message}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
