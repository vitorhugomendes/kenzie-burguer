import * as yup from 'yup';

export const formSchema = yup.object({
  email: yup.string().required('Insira um e-mail').email('E-mail inválido'),
  password: yup.string().required('Insira uma senha'),
});
