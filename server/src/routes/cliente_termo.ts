import { Router } from "express";
import { Cliente_termos_controller } from "../controllers";
import { authorization } from "../middlewares";
const routes = Router();

routes.get('/',authorization, Cliente_termos_controller.getAllClienteTermos);
routes.get('/specific/:uuid',Cliente_termos_controller.getOneClienteTermos);

routes.post('/create', authorization, Cliente_termos_controller.createClienteTermos)

// routes.post('/create', Cliente_termos_controller.postCliente);

routes.put('/modify/:uuid', Cliente_termos_controller.updateClienteTermos);


export default routes;

