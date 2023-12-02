import { Router } from "express";
import { Cliente_termos_controller } from "../controllers";
import { authorization } from "../middlewares";
const routes = Router();

routes.get('/', Cliente_termos_controller.getAllClienteTermos);

routes.get('/specific/:id', Cliente_termos_controller.getOneClienteTermos);

routes.get('/specificCliente/:id', Cliente_termos_controller.getOneClienteTermosByClienteId);

routes.get('/specificClienteTermo/:id', Cliente_termos_controller.getVerificaDataTermo);

routes.post('/create', Cliente_termos_controller.createClienteTermos)

routes.put('/modify/:uuid', Cliente_termos_controller.updateClienteTermos);

routes.delete('/delete/:id', authorization, Cliente_termos_controller.deleteClienteTermos);

export default routes;

