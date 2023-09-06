import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ClienteEntity } from "../entity/Update"; // Certifique-se de importar a entidade correta
import * as bcrypt from "bcrypt"; // Importe o módulo bcrypt
import { ObjectId } from "mongodb"; // Importe o ObjectId

class UpdateController {

    public async get(req: Request, res: Response): Promise<Response>{
        try{
            const rep = AppDataSource.getRepository(ClienteEntity)
            const all = await rep.find()
            return res.json(all)
        }
        catch(err){
            return res.json(err)
        }
    }

    public async postCli(req: Request, res: Response): Promise<Response> {
        try{
            const { id, nome, email, sexo, telefone, endereco, password } = req.body;
            const rep = AppDataSource.getRepository(ClienteEntity);
            const insert = new ClienteEntity();
        
            
            insert.cli_id = id;
            insert.nome = nome;
            insert.email = email;
            insert.sexo = sexo;
            insert.telefone = telefone;
            insert.endereco = endereco;
            insert.password = password;
            insert.date = new Date();
        
            const save = await rep.save(insert);
            return res.json(save);
        }
        catch(err){
            return res.json(err)
        }
      }
}

export default new UpdateController();