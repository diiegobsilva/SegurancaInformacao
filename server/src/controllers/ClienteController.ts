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

    public async getCliente (req: Request, res: Response) : Promise<Response> {
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const allCliente = await clienteRepository.findOneBy({id: idCliente})
        return res.json(allCliente)
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

    public async putCliente (req: Request, res: Response) : Promise<Response> {
        const createCliente = req.body
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const findCliente = await clienteRepository.findOneBy({id: idCliente})
        findCliente.nome = createCliente.nome
        findCliente.email = createCliente.email
        findCliente.sexo = createCliente.sexo
        const allCliente = await clienteRepository.save(findCliente)
        return res.json(allCliente)
    }

    public async deleteCliente (req: Request, res: Response) : Promise<Response> {
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const findCliente = await clienteRepository.findOneBy({id: idCliente})
        const allCliente = await clienteRepository.remove(findCliente)
        loggerDelete.info("Sucesso")
        return res.json(allCliente)
    }

}
export default new ClienteController();