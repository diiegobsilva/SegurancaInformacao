import { Router } from "express";
import { UpdateController } from "../controllers";

const routes = Router()

routes.get("/clientes", UpdateController.get)
routes.post("/create", UpdateController.postCli)

export default routes;