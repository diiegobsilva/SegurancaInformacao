import axios from "axios";

export enum URI {
    CRIAR_CLIENTE = "http://localhost:3001/cliente/create",
    ALTERA_CLIENTE = "http://localhost:3001/cliente/modify/",
    DELETE_CLIENTE = "http://localhost:3001/cliente/delete/",
    PEGAR_CLIENTE = "http://localhost:3001/cliente/historic",
    PEGAR_CLIENTE_ESPECIFICO = "http://localhost:3001/cliente/specific/",
    LOGIN_USER = "http://localhost:3001/cliente/login"
}

export enum URITERMOS {
    CRIAR_CLIENTE_TERMO = "http://localhost:3001/cliente_termo/create",
    PEGER_CLIENTE_TERMO = "http://localhost:3001/cliente_termo/specificCliente/:uuid",
    CLIETE_TERMO_ATUALIZA = "http://localhost:3001/cliente_termo/specificClienteTermo/"
}

export const api = axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true
})