import { Router } from "express";
import { TermosControllers as TermosControllers} from "../controllers";


const routes = Router();

routes.get('/termos', TermosControllers.getAllTermos);
routes.get('/termos/:id',  TermosControllers.getOneTermos);
routes.post('/create', TermosControllers.createTermos);



export default routes;