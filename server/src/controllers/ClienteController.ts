import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";
import { authAdmin, generateToken } from "../middlewares";
import { loggerDelete, loggerUpdate } from "../config/logger";
import cliente from "../routes/cliente";
import { info, error, warm } from "../postMongo";

class ClienteController {

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    // Verifica se foram fornecidos os parâmetros
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.json({ error: "E-mail e senha necessários" });
    }

    try {
      // Consulta o banco de dados para encontrar o usuário
      const usuario: any = await AppDataSource
        .getRepository(Cliente)
        .createQueryBuilder("cliente")
        .select()
        .addSelect('cliente.password')
        .where("cliente.email=:email", { email })
        .getOne();

      loggerUpdate.info("Sucesso");

      if (usuario && usuario.id) {
        const isPasswordValid = await usuario.compare(password);

        if (isPasswordValid) {
          // Cria um token codificando o objeto {id, email, profile}
          const token = await generateToken({ id: usuario.id, email: usuario.email, profile: usuario.profile });
          const infoLog =  await info()
          infoLog.insertOne({
            date: new Date(),
            message: "User login sucesso",
            idUser: usuario.id
          })
          return res.json({
            id: usuario.id,
            nome: usuario.nome,
            userEmail: usuario.email,
            sexo: usuario.sexo,
            telefone: usuario.telefone,
            endereco: usuario.endereco,
            profile: usuario.profile,
            token
          });
        } else {
          return res.status(400).json({ error: "Dados de login não conferem" });
        }
      } else {
        return res.status(400).json({ error: "Usuário não localizado" });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  public async putCliente(req: Request, res: Response): Promise<Response> {
    try {
      const createCliente = req.body;
      const idCliente: any = req.params.uuid;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const findCliente = await clienteRepository.findOneBy({ id: idCliente });
      if (!findCliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      loggerUpdate.info(`Cliente atualizado: ID ${idCliente}`);
      // Verifique cada campo e atualize o cliente
      if (createCliente.nome !== undefined) {
        findCliente.nome = createCliente.nome;
      }

      if (createCliente.email !== undefined) {
        findCliente.email = createCliente.email;
      }

      if (createCliente.sexo !== undefined) {
        findCliente.sexo = createCliente.sexo;
      }

      if (createCliente.telefone !== undefined) {
        findCliente.telefone = createCliente.telefone;
      }

      if (createCliente.endereco !== undefined) {
        findCliente.endereco = createCliente.endereco;
      }
      if (createCliente.profile !== undefined) {
        findCliente.profile = createCliente.profile;
      }

      // Salve as alterações no cliente
      const updatedCliente = await clienteRepository.save(findCliente);

      return res.json(updatedCliente);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);

      // Registre o erro no loggerDelete

      // loggerDelete.error(Erro ao atualizar cliente: ID ${idCliente}, Erro: ${error});

      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }


  public async putPassword(req: Request, res: Response): Promise<Response> {
    const { password } = req.body
    const id: any = req.params.uuid;
    const client: any = await AppDataSource.manager
      .getRepository(Cliente)
      .createQueryBuilder("cliente")
      .select()
      .addSelect('cliente.password')
      .where("cliente.id=:id", { id })
      .getOne();
    console.log();
    client.password = password

    const r = await AppDataSource.manager.save(Cliente, client)
    return res.json(r)
  }


  public async getHistoricCliente(req: Request, res: Response): Promise<Response> {
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const allCliente = await clienteRepository.find()
    console.log(allCliente)
    return res.json(allCliente)
  }

  public async getCliente(req: Request, res: Response): Promise<Response> {
    try {
      const idCliente: any = req.params.uuid;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const cliente = await clienteRepository.findOneBy({ id: idCliente });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const { nome, email, sexo, telefone, endereco, profile } = cliente;

      const clienteData = {
        id: idCliente,
        nome,
        email,
        sexo,
        telefone,
        endereco,
        profile
      };

      return res.json(clienteData);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }
  public async postCliente(req: Request, res: Response): Promise<Response> {
    const createCliente = req.body
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const insertCliente = new Cliente();
    insertCliente.nome = createCliente.nome
    insertCliente.email = createCliente.email
    insertCliente.sexo = createCliente.sexo
    insertCliente.endereco = createCliente.endereco
    insertCliente.telefone = createCliente.telefone
    insertCliente.profile = createCliente.profile
    insertCliente.password = createCliente.password


    const allCliente = await clienteRepository.save(insertCliente)
    return res.json(allCliente)
  }

  // public async putCliente(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const createCliente = req.body;
  //     const idCliente: any = req.params.uuid;
  //     const clienteRepository = AppDataSource.getRepository(Cliente);
  //     const findCliente = await clienteRepository.findOne(idCliente);

  //     if (!findCliente) {
  //       return res.status(404).json({ error: 'Cliente não encontrado' });
  //     }

  //     findCliente.nome = createCliente.nome;
  //     findCliente.sexo = createCliente.sexo;
  //     findCliente.telefone = createCliente.telefone;

  //     const updatedCliente = await clienteRepository.save(findCliente);

  //     return res.json(updatedCliente);
  //   } catch (error) {
  //     console.error('Erro ao atualizar cliente:', error);
  //     return res.status(500).json({ error: 'Erro ao atualizar cliente' });
  //   }
  // }



  public async deleteCliente(req: Request, res: Response): Promise<Response> {
    try{
      const userId: any = req.params.uuid
      const clienteRepository = AppDataSource.getRepository(Cliente)
      const findCliente = await clienteRepository.findOneBy({ id: userId })
      const allCliente = await clienteRepository.remove(findCliente)
      loggerDelete.info(`id: ${userId}`)
      return res.json(allCliente)
    }catch(err){
      return res.status(400).json(err)
    }
  }

}
export default new ClienteController();