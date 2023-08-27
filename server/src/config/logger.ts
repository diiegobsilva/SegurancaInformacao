import { createLogger, transports, format, level } from "winston";

let data = new Date()
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = String(data.getFullYear()).padStart(2, '0');
let horas = String(data.getHours()).padStart(2,'0')
let minutos = String(data.getMinutes()).padStart(2, '0')
let segundos = String(data.getSeconds()).padStart(2 , '0')

const loggerDelete = createLogger({
    format: format.printf((info) => {
        return `[${info.level}]: [ ${dia}/${mes}/${ano}:${horas}:${minutos}:${segundos} ] - ${info.message}`
    }),
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({filename: '../server/logs/deleteuser.log', level: 'info'}),
    ]
})


const loggerUpdate = createLogger({
    format: format.printf((info) => {
        return `[${info.level}]: [ ${dia}/${mes}/${ano}:${horas}:${minutos}:${segundos} ] - ${info.message}`
    }),
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({filename: '../server/logs/updateuser.log', level: 'info'}),
    ]
})


export {loggerDelete, loggerUpdate}