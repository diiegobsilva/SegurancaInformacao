import { Router } from "express";
import {TermosControllers} from "../controllers";
import { authorization } from "../middlewares";


const routes = Router();

routes.get('/', authorization, TermosControllers.getAllTermos);
routes.get('/termos/:id',  TermosControllers.getOneTermos);
routes.post('/create', authorization, TermosControllers.createTermos);



export default routes;