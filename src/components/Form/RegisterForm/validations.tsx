import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup.string().required('Insira um nome'),
  email: yup.string().required('Insira um e-mail').email('E-mail inválido'),
  password: yup.string().required('Insira uma senha'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirmação de senha deve ser igual a senha')
    .required('Confirmação de senha é obrigatória'),
});
