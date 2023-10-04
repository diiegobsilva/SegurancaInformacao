import "reflect-metadata"

import { Cliente } from "./entity/Cliente"
import { ClienteEntity } from "./entity/Update"
import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "mongodb", 
  url: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}.gyfwek9.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
  synchronize: true, 
  logging: true, 
  entities: ["src/entities/*.ts"], 
  subscribers: [],
  maxQueryExecutionTime: 2000,
  useUnifiedTopology: true
});


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!"); //sucesso na promessa
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });

export default AppDataSource;