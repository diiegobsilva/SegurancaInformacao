import { Container, Table } from "react-bootstrap";
import { format } from "date-fns";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface Termo {
  id: number;
  obrigatorio: string;
  descricao: string;
  data: string;
}

function Termo() {
  const [obrigatorio, setObrigatorio] = useState('true'); 
  const [descricao, setDescricao] = useState('');
  const [termos, setTermos] = useState<Termo[]>([]);

  const handleCreateTermo = async () => {
    try {
      const response = await axios.post('termos/create', {
        obrigatorio: obrigatorio === 'true', 
        descricao: descricao,
      });

      setObrigatorio('true');
      setDescricao('');

      console.log('Termo criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar termo:', error);
    }
  };

  useEffect(() => {
    axios.get('termos/termos')
      .then((response) => setTermos(response.data))
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);

  return (
    <div>
      <label className="labelArea">Últimas Versões:</label>
      <Container className="">
        <Container className="table-container">
          <Table className="custom-table">
            <thead>
              <tr>
                <th className="text-center">Ação</th>
                <th className="text-center">Versão</th>
                <th className="text-center">Obrigatório</th>
                <th className="text-center">Padrão</th>
                <th className="text-center">Data de Edição</th>
                <th className="text-center">Termos</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(termos) ? (
                termos.map((termo) => (
                  <tr key={termo.id}>
                    <td className="text-center">Ação</td>
                    <td className="text-center">Versão</td>
                    <td className="text-center">{termo.obrigatorio.toString()}</td>
                    <td className="text-center">Padrão</td>
                    <td className="text-center">
          {format(new Date(termo.data), "yyyy-MM-dd HH:mm:ss")} {/* Formata a data e hora */}
        </td>
                    <td className="text-center">{termo.descricao}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>Nenhum termo disponível.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
        <div>
          <label className="labelArea">Termos e Condições:</label>
          <textarea
            className="textArea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="col-lg-3">
          <label className="labelArea">Obrigatório:</label>
          <select className="form-label-teste  fw-bolder text-dark form-control">
            <option value="" label="Selecione" disabled />
            <option value="true" label="Sim" />
            <option value="false" label="Não" />
          </select>
        </div>


        <div className="button-container">
          <button
            type="button"
            className="custom-button"
            onClick={handleCreateTermo}
          >
            Salvar
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Termo;
