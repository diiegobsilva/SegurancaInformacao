import cors = require("cors");
import { Router, Request, Response } from "express";

import cliente from "./cliente";
import termos from "./termos";
import cliente_termo from "./cliente_termo";

const routes = Router()

routes.use(cors());

routes.use("/cliente_termo", cliente_termo);
routes.use("/cliente", cliente);
routes.use("/termos", termos);

routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
