import * as Yup from 'yup'


const registrationSchema = Yup.object().shape({
    nome: Yup.string()
      .required('O nome  é obrigatório'),

    email: Yup.string()
      .required('O Email é obrigatório'),

    password: Yup.string()
      .required('A Senha é obrigatório'),

    endereco: Yup.string()
      .required('A Endereço é obrigatório'),

  })
  export default registrationSchema;
