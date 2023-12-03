import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { authAdmin } from "../middlewares";
import { loggerNewTermo } from "../config/logger";
import { ClienteTermos } from "../entities/Cliente_Termos";
import { Termos } from "../entities/Termos";
import { info } from "../postMongo";

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

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: "Aceite dos termos feito com sucesso",
        clienteTermosId: createdClienteTermos.id,
        clientId: cliente,
        Termos: JSON.stringify(itemTermos)
      });

      const logMessage = `Created ClienteTermos: ${createdClienteTermos.id}, Cliente: ${cliente}, Termos: ${JSON.stringify(itemTermos)}`;
      loggerNewTermo.info({ message: logMessage, clienteTermosId: createdClienteTermos.id, clientId: cliente, Termos: JSON.stringify(itemTermos) });

      return res.status(201).json(createdClienteTermos);
    } catch (error) {
      const errorMessage = `Erro ao criar cliente_termos: ${error.message}`;
      console.error(errorMessage);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: errorMessage,
      });

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

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ClienteTermos não encontrado",
          clienteTermosId: idClienteTermos.id,
        })
      }

      if (termosAceitos !== undefined) {
        clienteTermos.itemTermos = termosAceitos;
      }

      const updatedClienteTermos = await clienteTermosRepository.save(clienteTermos);

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: "Atualização dos termos feita com sucesso",
        ClienteTermoslientId: idClienteTermos.id,
        Termos: JSON.stringify(termosAceitos),
      });

      const logMessage = `Updated ClienteTermos: ${clienteTermos.id}, TermosAceitos: ${termosAceitos}`;
      loggerNewTermo.info({ message: logMessage, clienteTermosId: clienteTermos.id, termsInfo: clienteTermos.termos });

      return res.json(updatedClienteTermos);
    } catch (error) {
      console.error('Erro ao atualizar cliente_termos:', error);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: "Erro ao atualizar cliente_termos:" + error,
      });

      loggerNewTermo.error({ message: `Erro ao atualizar cliente_termos: ${error.message}` });

      return res.status(500).json({ error: 'Erro ao atualizar cliente_termos' });
    }
  }

  public async getAllClienteTermos(req: Request, res: Response): Promise<Response> {
    try {
      authAdmin(req, res, async () => {
        const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
        const clienteTermos = await clienteTermosRepository.find();

        const infoLog = await info();
        await infoLog.insertOne({
          date: new Date(),
          message: "Lista de aceites recuperada com sucesso",
        });

        return res.json(clienteTermos);
      });
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: "Erro ao buscar cliente_termos:" + error,
      });

      loggerNewTermo.error({ message: `Erro ao buscar cliente_termos: ${error.message}` });

      return res.status(500).json({ error: 'Erro ao buscar cliente_termos' });
    }
  }

  public async getOneClienteTermos(req: Request, res: Response): Promise<Response | void> {
    try {
      const idClienteTermos: number = parseInt(req.params.id, 10);

      if (isNaN(idClienteTermos)) {
        return res.status(422).json({ error: 'ID do cliente_termos inválido' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ID do cliente_termos inválido",
        })
      }

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const clienteTermos = await clienteTermosRepository.findOne({
        where: { id: idClienteTermos },
        relations: ['cliente', 'termos'],
      });

      if (!clienteTermos) {
        return res.status(404).json({ error: 'ClienteTermos não encontrado' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ClienteTermos não encontrado",
        })
      }

      const formattedResponse = {
        id: clienteTermos.id,
        cliente: clienteTermos.cliente,
        termos: clienteTermos.termos,
        dataAssociacao: clienteTermos.dataAssociacao.toISOString(),
        dataAtualizacao: clienteTermos.dataAtualizacao.toISOString(),
        termosAceitos: clienteTermos.itemTermos,
      };

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: "Dados de aceite dos termos para o cliente feita com sucesso",
        id: clienteTermos.id,
        termos: JSON.stringify(clienteTermos.termos),
        dataAssociacao: clienteTermos.dataAssociacao.toISOString(),
        dataAtualizacao: clienteTermos.dataAtualizacao.toISOString(),
        termosAceitos: JSON.stringify(clienteTermos.itemTermos),
      });

      loggerNewTermo.info({ message: `ClienteTermos encontrado: ${clienteTermos.id}`, clienteTermosId: clienteTermos.id });

      return res.json(formattedResponse);
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: "Erro ao buscar cliente_termos:" + error,
      });

      loggerNewTermo.error({ message: `Erro ao buscar cliente_termos: ${error.message}` });

      return res.status(500).json({ error: `Erro ao buscar cliente_termos: ${error.message}` });
    }
  }


  public async getOneClienteTermosByClienteId(req: Request, res: Response): Promise<Response | void> {
    try {
      const idCliente: number = parseInt(req.params.id, 10);

      if (isNaN(idCliente)) {
        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ID do cliente inválido",
        })
        return res.status(422).json({ error: 'ID do cliente inválido' });
      }

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const clienteTermos = await clienteTermosRepository.findOne({
        where: { cliente: { id: idCliente } },
        relations: ['cliente', 'termos'],
        order: {
          dataAtualizacao: 'DESC',
        },

      });

      if (!clienteTermos) {

        return res.status(404).json({ error: 'ClienteTermos não encontrado para o ID do cliente fornecido' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ClienteTermos não encontrado para o ID do cliente fornecido",
        })
      }

      const formattedResponse = {
        id: clienteTermos.id,
        cliente: clienteTermos.cliente,
        termos: clienteTermos.termos,
        dataAssociacao: clienteTermos.dataAssociacao.toISOString(),
        dataAtualizacao: clienteTermos.dataAtualizacao.toISOString(),
        termosAceitos: clienteTermos.itemTermos,
      };

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: "Dados de aceite dos termos para o cliente recuperados com sucesso",
        id: clienteTermos.id,
        termos: JSON.stringify(clienteTermos.termos),
        dataAssociacao: clienteTermos.dataAssociacao.toISOString(),
        dataAtualizacao: clienteTermos.dataAtualizacao.toISOString(),
        termosAceitos: JSON.stringify(clienteTermos.itemTermos),
      });

      loggerNewTermo.info({ message: `ClienteTermos encontrado: ${clienteTermos.id}`, clienteTermosId: clienteTermos.id });

      return res.json(formattedResponse);
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: "Erro ao buscar cliente_termos:" + error,
      });

      loggerNewTermo.error({ message: `Erro ao buscar cliente_termos: ${error.message}` });

      return res.status(500).json({ error: `Erro ao buscar cliente_termos: ${error.message}` });
    }
  }

  public async getVerificaDataTermo(req: Request, res: Response): Promise<Response | void> {

    let idTermo = 0
    let idClieteTermo = 0

    try {
      const idCliente: number = parseInt(req.params.id, 10);
      if (isNaN(idCliente)) {

        return res.status(422).json({ error: 'ID do cliente inválido' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ID do cliente inválido",
        })
      }

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);

      const clienteTermos = await clienteTermosRepository.find({
        where: { cliente: { id: idCliente } },
        relations: ['cliente', 'termos'],
        order: {
          dataAtualizacao: 'DESC',
        },
        take: 1,
      });

      if (!clienteTermos || clienteTermos.length === 0) {

        return res.status(404).json({ error: 'ClienteTermos não encontrado para o ID do cliente fornecido' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ClienteTermos não encontrado para o ID do cliente fornecido",
        })
      }

      const termosRepository = AppDataSource.getRepository(Termos)

      const termos = await termosRepository.find({
        order: {
          data: 'DESC',
        },
        take: 1,
      });

      termos.forEach(element => {
        idTermo = element.id
      });
      clienteTermos.forEach(element => {
        idClieteTermo = element.termos.id
      });
      if (idClieteTermo < idTermo) {

        const infoLog = await info();
        await infoLog.insertOne({
          date: new Date(),
          message: "Operação de verificação de dado do termo bem-sucedida",
        });

        return res.json({ atualizacao: true });
      } else {

        const infoLog = await info();
        await infoLog.insertOne({
          date: new Date(),
          message: "Operação de verificação de dado do termo bem-sucedida",
        });

        return res.json({ atualizacao: false });
      }
    } catch (error) {
      console.error('Erro ao buscar cliente_termos:', error);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: "Erro ao buscar cliente_termos:" + error,
      })

      loggerNewTermo.error({ message: `Erro ao buscar cliente_termos: ${error.message}` });

      return res.status(500).json({ error: `Erro ao buscar cliente_termos: ${error.message}` });
    }
  }

  public async deleteClienteTermos(req: Request, res: Response): Promise<Response | void> {
    try {
      const idClienteTermos: number = parseInt(req.params.id, 10);

      if (isNaN(idClienteTermos)) {
        return res.status(422).json({ error: 'ID do cliente_termos inválido' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ID do cliente_termos inválido",
        })
      }

      const clienteTermosRepository = AppDataSource.getRepository(ClienteTermos);
      const clienteTermos = await clienteTermosRepository.findOne({
        where: { id: idClienteTermos },
        relations: ['cliente', 'termos'],
      });

      if (!clienteTermos) {
        return res.status(404).json({ error: 'ClienteTermos não encontrado' });

        const errorLog = await info();
        await errorLog.insertOne({
          date: new Date(),
          message: "ClienteTermos não encontrado",
        })
      }

      await clienteTermosRepository.remove(clienteTermos);

      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: "Cliente excluído com sucesso",
        id: clienteTermos.id,
      });

      loggerNewTermo.info({ message: `ClienteTermos excluído: ${clienteTermos.id}`, clienteTermosId: clienteTermos.id });

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir cliente_termos:', error);

      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: "Erro ao excluir cliente_termos:" + error,
      });

      loggerNewTermo.error({ message: `Erro ao excluir cliente_termos: ${error.message}` });

      return res.status(500).json({ error: `Erro ao excluir cliente_termos: ${error.message}` });
    }
  }
}

export default new ClienteTermosController();
