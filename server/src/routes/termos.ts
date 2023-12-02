import { Router } from "express";
import {TermosControllers} from "../controllers";
import { authorization } from "../middlewares";


const routes = Router();

routes.get('/', TermosControllers.getAllTermos);
// routes.get('/termos/:id',  TermosControllers.getOneTermos);
routes.post('/create',  TermosControllers.createTermos);
routes.put('/update/:id', authorization, TermosControllers.updateTermos);


export default routes;