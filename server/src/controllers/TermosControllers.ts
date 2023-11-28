import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Termos } from "../entities/Termos";
import { authAdmin, authorization } from "../middlewares";
import { userTermLog } from "../config/logger";

class TermosController {

  public async createTermos(req: Request, res: Response): Promise<Response> {
    try {
        const { itemTermos } = req.body;
        console.log(req.body);
        const newTermos = new Termos();
        newTermos.itemTermos = itemTermos;

        const termosRepository = AppDataSource.getRepository(Termos);
        const createdTermos = await termosRepository.save(newTermos);

        const logMessage = `Created Termos: ${createdTermos.id}, itemTermos: ${createdTermos.itemTermos}`;
        userTermLog.info(logMessage);

        return res.status(201).json(createdTermos);

    } catch (error) {
      const errorMessage = `Erro ao criar termos: ${error.message}`;
      console.error(errorMessage);
      userTermLog.error(errorMessage);

      return res.status(500).json({ error: 'Erro ao criar termos' });
    }
  }



      public async updateTermos(req: Request, res: Response): Promise<Response> {
        try {
          const { itemTermos } = req.body;
          const idTermo: any = req.params.id; // Suponha que você está passando o ID do termo como parâmetro na URL
      
          const termosRepository = AppDataSource.getRepository(Termos);
          const termo = await termosRepository.findOneBy({ id: idTermo });
      
          if (!termo) {
            return res.status(404).json({ error: 'Termo não encontrado' });
          }
      
          // Verifique cada campo e atualize o termo
      
          if (itemTermos !== undefined) {
            termo.itemTermos = itemTermos;
          }
      
          // Salve as alterações no termo
          const updatedTermo = await termosRepository.save(termo);

          const logMessage = `ID-${Date()}-{${termo.itemTermos}`;
          userTermLog.info(logMessage);
          
          return res.json(updatedTermo);
        } catch (error) {
          console.error('Erro ao atualizar termo:', error);
          return res.status(500).json({ error: 'Erro ao atualizar termo' });
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
            const termos = await termosRepository.findOneBy({ id: idTermos});
    
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