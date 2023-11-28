import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { authAdmin } from "../middlewares";
import { loggerNewTermo } from "../config/logger";
import { ClienteTermos } from "../entities/Cliente_Termos";

class ClienteTermosController {

  public async createClienteTermos(req: Request, res: Response): Promise<Response> {
    try {
      const { cliente, termos, itemTermos } = req.body;

      const newClienteTermos = new ClienteTermos();
      newClienteTermos.cliente = cliente;
      newClienteTermos.termos = termos;
      newClienteTermos.itemTermos = itemTermos;

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const createdClienteTermos = await clienteTermosRepository.save(newClienteTermos);

      const logMessage = `Created ClienteTermos: ${createdClienteTermos.id}, Cliente: ${createdClienteTermos.cliente.id}, Termos: ${createdClienteTermos.termos.id}`;
      loggerNewTermo.info({ message: logMessage, clienteTermosId: createdClienteTermos.id, clientId: createdClienteTermos.cliente.id, termsInfo: createdClienteTermos.termos });

      return res.status(201).json(createdClienteTermos);
    } catch (error) {
      const errorMessage = `Erro ao criar cliente_termos: ${error.message}`;
      console.error(errorMessage);
      loggerNewTermo.error({ message: errorMessage });

      return res.status(500).json({ error: 'Erro ao criar cliente_termos' });
    }
  }

  public async updateClienteTermos(req: Request, res: Response): Promise<Response> {
    try {
      const { termosAceitos } = req.body;
      const idClienteTermos: any = req.params.id;

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const clienteTermos = await clienteTermosRepository.findOneBy({ id: idClienteTermos });

      if (!clienteTermos) {
        return res.status(404).json({ error: 'ClienteTermos não encontrado' });
      }

      if (termosAceitos !== undefined) {
        clienteTermos.itemTermos = termosAceitos;
      }

      const updatedClienteTermos = await clienteTermosRepository.save(clienteTermos);

      const logMessage = `Updated ClienteTermos: ${clienteTermos.id}, TermosAceitos: ${termosAceitos}`;
      loggerNewTermo.info({ message: logMessage, clienteTermosId: clienteTermos.id, termsInfo: clienteTermos.termos });

      return res.json(updatedClienteTermos);
    } catch (error) {
      console.error('Erro ao atualizar cliente_termos:', error);
      loggerNewTermo.error({ message: `Erro ao atualizar cliente_termos: ${error.message}` });
      return res.status(500).json({ error: 'Erro ao atualizar cliente_termos' });
    }
  }

  public async getAllClienteTermos(req: Request, res: Response): Promise<Response> {
    try {
      authAdmin(req, res, async () => {
        const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
        const clienteTermos = await clienteTermosRepository.find();

        return res.json(clienteTermos);
      });
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);
      loggerNewTermo.error({ message: `Erro ao buscar cliente_termos: ${error.message}` });
      return res.status(500).json({ error: 'Erro ao buscar cliente_termos' });
    }
  }

  public async getOneClienteTermos(req: Request, res: Response): Promise<Response | void> {
    try {
      const idClienteTermos: number = parseInt(req.params.id, 10);

      if (isNaN(idClienteTermos)) {
        return res.status(422).json({ error: 'ID do cliente_termos inválido' });
      }

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const clienteTermos = await clienteTermosRepository.findOne({
        where: { id: idClienteTermos },
        relations: ['cliente', 'termos'],
      });

      if (!clienteTermos) {
        return res.status(404).json({ error: 'ClienteTermos não encontrado' });
      }

      const formattedResponse = {
        id: clienteTermos.id,
        cliente: clienteTermos.cliente,
        termos: clienteTermos.termos,
        dataAssociacao: clienteTermos.dataAssociacao.toISOString(),
        dataAtualizacao: clienteTermos.dataAtualizacao.toISOString(),
        termosAceitos: clienteTermos.itemTermos,
      };

      loggerNewTermo.info({ message: `ClienteTermos encontrado: ${clienteTermos.id}`, clienteTermosId: clienteTermos.id });

      return res.json(formattedResponse);
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);
      loggerNewTermo.error({ message: `Erro ao buscar cliente_termos: ${error.message}` });
      return res.status(500).json({ error: `Erro ao buscar cliente_termos: ${error.message}` });
    }
  }

  public async deleteClienteTermos(req: Request, res: Response): Promise<Response | void> {
    try {
      const idClienteTermos: number = parseInt(req.params.id, 10);

      if (isNaN(idClienteTermos)) {
        return res.status(422).json({ error: 'ID do cliente_termos inválido' });
      }

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const clienteTermos = await clienteTermosRepository.findOne({
        where: { id: idClienteTermos },
        relations: ['cliente', 'termos'],
      });

      if (!clienteTermos) {
        return res.status(404).json({ error: 'ClienteTermos não encontrado' });
      }

      await clienteTermosRepository.remove(clienteTermos);

      loggerNewTermo.info({ message: `ClienteTermos excluído: ${clienteTermos.id}`, clienteTermosId: clienteTermos.id });

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir cliente_termos:', error);
      loggerNewTermo.error({ message: `Erro ao excluir cliente_termos: ${error.message}` });
      return res.status(500).json({ error: `Erro ao excluir cliente_termos: ${error.message}` });
    }
  }
}

export default new ClienteTermosController();
