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
      const response = await axios.post('/termos/create', {
        obrigatorio: obrigatorio,
        descricao: descricao,
      });

      const updatedTermos = [...termos, response.data];
      setTermos(updatedTermos);

      setDescricao('');
      setObrigatorio('');
    } catch (error) {
      console.error('Erro ao criar termo:', error);
    }
  };

  useEffect(() => {
    axios.get('/termos')
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
                <th className="text-center">Versão</th>
                <th className="text-center">Obrigatório</th>
                <th className="text-center">Data de Edição</th>
                <th className="text-center">Termos</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(termos) ? (
                termos.map((termo) => (
                  <tr key={termo.id}>
                    <td className="text-center">{termo.id}</td>
                    <td className="text-center">{termo.obrigatorio.toString()}</td>
                    <td className="text-center">{format(new Date(termo.data), "yyyy-MM-dd HH:mm:ss")}</td>
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
        {termos.length > 0 && (
          <>
            <div>
              <label className="labelArea">Termos e Condições:</label>
              <textarea
                className="textArea"
                value={descricao || termos[termos.length - 1].descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <label className="labelArea">Obrigatório:</label>
              <select
                className="form-label-teste fw-bolder text-dark form-control"
                value={obrigatorio || termos[termos.length - 1].obrigatorio}
                onChange={(e) => setObrigatorio(e.target.value)}
              >
                <option value="" label="Selecione" />
                <option value="true" label="Sim" />
                <option value="false" label="Não" />
              </select>
            </div>
          </>
        )}
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
