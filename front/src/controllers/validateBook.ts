import * as Yup from 'yup'


const registrationSchema = Yup.object().shape({
  
  nome: Yup.string().required("O nome é obrigatório."),

  email: Yup.string().email("Formato de e-mail inválido.").required("O e-mail é obrigatório."),

  password: Yup.string().min(8, "A senha deve ter no mínimo 8 caracteres.").required("A senha é obrigatória."),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem.") 
    .required("A confirmação de senha é obrigatória."),

  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email")], "Os email não coincidem.") 
    .required("A confirmação de email é obrigatório."),
    
  endereco: Yup.string().required("O endereço é obrigatório."),

  telefone: Yup.string().required("O telefone é obrigatório."),

  sexo: Yup.string().required("Selecione o sexo."),
  
});

  export default registrationSchema;
