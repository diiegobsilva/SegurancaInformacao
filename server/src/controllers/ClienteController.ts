import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";
import { generateToken } from "../middlewares";
import { loggerDelete, loggerUpdate } from "../config/logger";

class ClienteController {

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        //verifica se foram fornecidos os parâmetros
        if (!email || !password || email.trim() === "" || password.trim() === "") {
          return res.json({ error: "e-userEmail e senha necessários" });
        }
        // como a propriedade userPassword não está disponível para select {select: false},
        // então precisamos usar esta conulta para forçar incluir a propriedade 
        const usuario: any = await AppDataSource
          .getRepository(Cliente)
          .createQueryBuilder("cliente")
          .select()
          .addSelect('cliente.password')
          .where("cliente.email=:email", { email })
          .getOne();
          loggerUpdate.info("Sucesso")
        if (usuario && usuario.id) {
          console.log(usuario)
          const r = await usuario.compare(password);
          console.log(r)
          if (r) {
            // cria um token codificando o objeto {id,userEmail}
            const token = await generateToken({ id: usuario.id, email: usuario.email });
            // retorna o token para o cliente
            return res.json({
              id: usuario.id,
              nome: usuario.nome,
              userEmail: usuario.email,
              token
            });
          }
          return res.status(400).json({ error: "Dados de login não conferem" });
        }
        else {
          return res.status(400).json({ error: "Usuário não localizado" });
        }
      }
    

    public async getHistoricCliente (req: Request, res: Response) : Promise<Response> {
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

          const { nome, email, sexo, telefone, endereco } = cliente;

          const clienteData = {
              id: idCliente,
              nome,
              email,
              sexo,
              telefone,
              endereco,
          };

          return res.json(clienteData);
      } catch (error) {
          console.error('Erro ao buscar cliente:', error);
          return res.status(500).json({ error: 'Erro ao buscar cliente' });
      }
  }
    public async postCliente (req: Request, res: Response) : Promise<Response> {
        const createCliente = req.body
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const insertCliente = new Cliente();
        insertCliente.nome = createCliente.nome
        insertCliente.email = createCliente.email
        insertCliente.sexo = createCliente.sexo
        insertCliente.endereco = createCliente.endereco
        insertCliente.telefone = createCliente.telefone
        insertCliente.password = createCliente.password
     
        const allCliente = await clienteRepository.save(insertCliente)
        return res.json(allCliente)
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

        // Registre a alteração no loggerUpdate
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

        if (createCliente.password !== undefined) {
          // Lembre-se de que você pode optar por não atualizar a senha aqui por motivos de segurança
          findCliente.password = createCliente.password;
        }

        if (createCliente.telefone !== undefined) {
          findCliente.telefone = createCliente.telefone;
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
  
  

    public async deleteCliente (req: Request, res: Response) : Promise<Response> {
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const findCliente = await clienteRepository.findOneBy({id: idCliente})
        const allCliente = await clienteRepository.remove(findCliente)
        loggerDelete.info(`id: ${idCliente}`)
        return res.json(allCliente)
    }

}
export default new ClienteController();