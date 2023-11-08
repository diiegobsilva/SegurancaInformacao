import { createLogger, transports, format, level } from "winston";
import { date } from "../utils/date";

const userTermLog = createLogger({
  format: format.printf((info) => {
    return `${info.message}`;
  }),
  transports: [
    new transports.Console(),
    new transports.File({ filename: '../server/logs/user_term_log.log' }),
  ],
});

const loggerDelete = createLogger({
    format: format.printf((info) => {
        return `[${info.level}]: ${date()} - ${info.message}`
    }),
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({filename: '../server/logs/deleteuser.log', level: 'info'}),
    ]
})


const loggerUpdate = createLogger({
    format: format.printf((info) => {
        return `[${info.level}]: ${date()} - ${info.message}`
    }),
    level: 'debug',
    transports: [
        new transports.Console(),
        new transports.File({filename: '../server/logs/updateuser.log', level: 'info'}),
    ]
})


export {loggerDelete, loggerUpdate, userTermLog}