import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/Cliente";
class ClienteController{
    public async getCli(req: Request, res: Response): Promise<Response> {
        const rep = AppDataSource.getRepository(Users)
        const all = await rep.find()
        return res.json(all)
    }

    public async postCli(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.body
            const rep = AppDataSource.getRepository(Users)
            const insert = new Users()
            insert.cli_id = Number(id)
            insert.date = new Date()
            const save = rep.save(insert)
            return res.json(save)
        }catch(err){
            return res.status(400).json(err)
        }
        
    }
}
export default new ClienteController()