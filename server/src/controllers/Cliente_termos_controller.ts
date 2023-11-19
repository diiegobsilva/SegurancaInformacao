import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { authAdmin } from "../middlewares";
import { userTermLog } from "../config/logger";
import { ClienteTermos } from "../entities/Cliente_Termos";

class ClienteTermosController {

  public async createClienteTermos(req: Request, res: Response): Promise<Response> {
    try {
        const { cliente, termos, termosAceitos } = req.body;

        // Resto do código para criar cliente_termos
        const newClienteTermos = new ClienteTermos();
        newClienteTermos.cliente = cliente;
        newClienteTermos.termos = termos;
        newClienteTermos.termosAceitos = termosAceitos;

        const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
        const createdClienteTermos = await clienteTermosRepository.save(newClienteTermos);

        const logMessage = `Created ClienteTermos: ${createdClienteTermos.id}, Cliente: ${createdClienteTermos.cliente.id}, Termos: ${createdClienteTermos.termos.id}`;
        userTermLog.info(logMessage);

        return res.status(201).json(createdClienteTermos);
    } catch (error) {
        const errorMessage = `Erro ao criar cliente_termos: ${error.message}`;
        console.error(errorMessage);
        userTermLog.error(errorMessage);

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

      // Verifique cada campo e atualize o cliente_termos
      if (termosAceitos !== undefined) {
        clienteTermos.termosAceitos = termosAceitos;
      }

      // Salve as alterações no cliente_termos
      const updatedClienteTermos = await clienteTermosRepository.save(clienteTermos);

      const logMessage = `ID-${Date()}-{ClienteTermos: ${clienteTermos.id}, TermosAceitos: ${termosAceitos}}`;
      userTermLog.info(logMessage);

      return res.json(updatedClienteTermos);
    } catch (error) {
      console.error('Erro ao atualizar cliente_termos:', error);
      return res.status(500).json({ error: 'Erro ao atualizar cliente_termos' });
    }
  }

  public async getAllClienteTermos(req: Request, res: Response): Promise<Response> {
    try {
      // Aplica a middleware authAdmin para proteger esta função
      authAdmin(req, res, async () => {
        const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
        const clienteTermos = await clienteTermosRepository.find();

        return res.json(clienteTermos);
      });
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);
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
        termosAceitos: clienteTermos.termosAceitos,
      };

      userTermLog.info(`ClienteTermos encontrado: ${clienteTermos.id}`);

      return res.json(formattedResponse);
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);
      userTermLog.error(`Erro ao buscar cliente_termos: ${error.message}`);
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

      // Antes de excluir, você pode adicionar lógica para verificar se a exclusão é permitida com base em regras de negócios.

      await clienteTermosRepository.remove(clienteTermos);

      userTermLog.info(`ClienteTermos excluído: ${clienteTermos.id}`);

      return res.status(204).send(); // Retorna 204 No Content após a exclusão bem-sucedida.
    } catch (error) {
      console.error('Erro ao excluir cliente_termos:', error);
      userTermLog.error(`Erro ao excluir cliente_termos: ${error.message}`);
      return res.status(500).json({ error: `Erro ao excluir cliente_termos: ${error.message}` });
    }
  }
}

export default new ClienteTermosController();
