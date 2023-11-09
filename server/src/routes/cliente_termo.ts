import { Router } from "express";
import { Cliente_termos_controller } from "../controllers";
const routes = Router();

routes.get('/', Cliente_termos_controller.getAllClienteTermos);
routes.get('/specific/:uuid',Cliente_termos_controller.getOneClienteTermos);

routes.post('/create', Cliente_termos_controller.createClienteTermos)

// routes.post('/create', Cliente_termos_controller.postCliente);

routes.put('/modify/:uuid', Cliente_termos_controller.updateClienteTermos);

// routes.put('/modifypassword/:uuid', Cliente_termos_controller.putPassword);

// routes.delete('/delete/:uuid', Cliente_termos_controller.deleteCliente);

export default routes;

