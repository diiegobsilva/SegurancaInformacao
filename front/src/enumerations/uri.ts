import axios from "axios";

export enum URI {
    CRIAR_CLIENTE = "http://localhost:3001/cliente/create",
    ALTERA_CLIENTE = "http://localhost:3001/cliente/modify/",
    DELETE_CLIENTE = "http://localhost:3001/cliente/delete/",
    PEGAR_CLIENTE = "http://localhost:3001/cliente/historic",
    PEGAR_CLIENTE_ESPECIFICO = "http://localhost:3001/cliente/specific/",
    LOGIN_USER = "http://localhost:3001/cliente/login"
}


export const api = axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true
})