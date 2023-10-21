export const initialValues = {
    nome: "",
    email: "",
    endereco: "",
    sexo: "",
    telefone: "",
    password: "",
    confirmPassword: "",
    confirmEmail: "",
    termo_dados: 0,
    termo_sms: 0,
    termo_email: 0,
    termo_cookies: 0,
    price: 0
}


export interface Clientes {
    id: number;
    nome: string;
    email: string;
    password: string;
    telefone: string;
    sexo: string;
    endereco: string;   
    confirmPassword: string;
    confirmEmail: string;
    termo_dados: number;
    termo_sms: number,
    termo_email: number,
    termo_cookies: number,
}
