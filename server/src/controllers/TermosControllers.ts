import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Termos } from "../entities/Termos";

class TermosController {

    public async createTermos(req: Request, res: Response): Promise<Response> {
        try {
            
            const { obrigatorio, descricao } = req.body;
    
            
            const newTermos = new Termos();
            newTermos.obrigatorio = obrigatorio;
            newTermos.descricao = descricao;

            const termosRepository = AppDataSource.getRepository(Termos);
            const createdTermos = await termosRepository.save(newTermos);
    
            
            return res.status(201).json(createdTermos);
        } catch (error) {
            console.error('Erro ao criar termos:', error);
            return res.status(500).json({ error: 'Erro ao criar termos' });
        }
    }

    public async getAllTermos(req: Request, res: Response): Promise<Response> {
        try {
            const termoRepository = AppDataSource.getRepository(Termos);
            const termos = await termoRepository.find();
    
            return res.json(termos);
        } catch (error) {
            console.error('Erro ao buscar termos:', error);
            return res.status(500).json({ error: 'Erro ao buscar termos' });
        }
    }
    public async getOneTermos(req: Request, res: Response): Promise<Response> {
        try {
            const idTermos: any = req.params.id;
    
            if (!idTermos) {
                return res.status(400).json({ error: 'ID do termo não fornecido' });
            }
    
            const termosRepository = AppDataSource.getRepository(Termos);
            const termos = await termosRepository.findOne(idTermos);
    
            if (!termos) {
                return res.status(404).json({ error: 'Termos não encontrados' });
            }
    
            return res.json(termos);
        } catch (error) {
            console.error('Erro ao buscar termos:', error);
            return res.status(500).json({ error: 'Erro ao buscar termos' });
        }
    }
    


}
export default new TermosController();