import cors = require("cors");
import { Router, Request, Response } from "express";

import cliente from "./cliente";
import update from "./update";

const routes = Router()

routes.use(cors());

routes.use("/cliente", cliente);
routes.use("/update", update)

routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;