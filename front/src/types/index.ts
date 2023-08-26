export const initialValues = {
    nome: "",
    email: "",
    endereco: "",
    sexo: "",
    telefone: "",
    password: "",
}

export interface Clientes {
    id: number;
    nome: string;
    email: string;
    password: string;
    telefone: string;
    sexo: string;
    endereco: string;   
}

