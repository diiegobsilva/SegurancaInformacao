export const initialValues = {
    nome: "",
    email: "",
    endereco: "",
    sexo: "",
    telefone: "",
    password: "",
    confirmPassword: "",
    confirmEmail: "",
    profile: "user"

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
    profile: string
}
