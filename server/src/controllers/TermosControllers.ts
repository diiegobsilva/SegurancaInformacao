import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Termos } from "../entities/Termos";
import { authAdmin, authorization } from "../middlewares";
import { userTermLog } from "../config/logger";
import { info, error, warm } from "../postMongo";

class TermosController {

  public async createTermos(req: Request, res: Response): Promise<Response> {
    try {
      const { itemTermos } = req.body;
      console.log(req.body);

      const newTermos = new Termos();
      newTermos.itemTermos = itemTermos;

      const termosRepository = AppDataSource.getRepository(Termos);
      const createdTermos = await termosRepository.save(newTermos);

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: "Termo Criado com Sucesso",
        idTermo: createdTermos.itemTermos
      });

      return res.status(201).json(createdTermos);

    } catch (erro) {
      const errorMessage = `Erro ao criar termos: ${erro.message}`;
      console.error(errorMessage);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: errorMessage,
      });

      return res.status(500).json({ error: 'Erro ao criar termos' });
    }
  }

  public async updateTermos(req: Request, res: Response): Promise<Response> {
    try {
      const { itemTermos } = req.body;
      const idTermo: any = req.params.id;

      const termosRepository = AppDataSource.getRepository(Termos);
      const termo = await termosRepository.findOneBy({ id: idTermo });

      if (!termo) {
        return res.status(404).json({ error: 'Termo não encontrado' });

        const errorLog = await error();
        await errorLog.insertOne({
          date: new Date(),
          message: `Termo não encontrado - ID: ${idTermo}`
        })
      }

      if (itemTermos !== undefined) {
        termo.itemTermos = itemTermos;
      }

      const updatedTermo = await termosRepository.save(termo);

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: `Termo atualizado com sucesso - ID: ${updatedTermo.id}, Termos: ${JSON.stringify(itemTermos)}`
      });

      return res.json(updatedTermo);
    } catch (erro) {
      console.error('Erro ao atualizar termo:', erro);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: `Erro ao atualizar termo: ${erro.message}`
      });

      return res.status(500).json({ error: 'Erro ao atualizar termo' });
    }
  }

  public async getAllTermos(req: Request, res: Response): Promise<Response> {
    try {
      const termoRepository = AppDataSource.getRepository(Termos);
      const termos = await termoRepository.find();

      // Log successful retrieval of termos
      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: 'Termos recuperados com sucesso'
      });

      return res.json(termos);
    } catch (erro) {
      console.error('Erro ao buscar termos:', erro);

      // Log error in retrieving termos
      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: `Erro ao buscar termos: ${erro.message}`
      });

      return res.status(500).json({ error: 'Erro ao buscar termos' });
    }
  }


  // public async getOneTermos(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const idTermos: any = req.params.id;

  //     if (!idTermos) {
  //       return res.status(400).json({ error: 'ID do termo não fornecido' });
  //     }

  //     const termosRepository = AppDataSource.getRepository(Termos);
  //     const termos = await termosRepository.findOneBy({ id: idTermos });

  //     if (!termos) {
  //       return res.status(404).json({ error: 'Termos não encontrados' });
  //     }

  //     return res.json(termos);
  //   } catch (error) {
  //     console.error('Erro ao buscar termos:', error);
  //     return res.status(500).json({ error: 'Erro ao buscar termos' });
  //   }
  // }



}
export default new TermosController();