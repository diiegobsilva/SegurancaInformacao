import { Container, Table } from "react-bootstrap";
import { format } from "date-fns";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface Termo {
  id: number;
  itemTermos: { [key: string]: string };
  data: string;
}

function Termo() {
  const [termos, setTermos] = useState<Termo[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [termosTemporarios, setTermosTemporarios] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const recoveredToken = localStorage.getItem('token');
    axios.get('/termos/', {
      headers: {
        'authorization': `Bearer ${recoveredToken}`
      }
    })
      .then((response) => {
        setTermos(response.data);

        // Inicializar termos temporários como um objeto vazio
        setTermosTemporarios({});
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);

  const handleAddList = () => {
    setTermosTemporarios((prevTemporarios) => ({
      ...prevTemporarios,
      [titulo]: descricao,
    }));

    setTitulo("");
    setDescricao("");
  };

  const handleSalvar = async () => {
    try {
      const recoveredToken = localStorage.getItem('token');

      const response = await axios.post('/termos/create', {
        itemTermos: termosTemporarios,
      }, {
        headers: {
          'authorization': `Bearer ${recoveredToken}`
        }
      });

      const updatedTermos = [...termos, response.data];
      setTermos(updatedTermos);

      // Limpar os termos temporários após salvar
      setTermosTemporarios({});

      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar termo:', error);
    }
  };

  const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(event.target.value);
  };

  function renderizarTermos(itemTermos: { [key: string]: string }) {
    return Object.keys(itemTermos).map((termName) => (
      <li key={termName}>
        <strong>{termName}:</strong> {itemTermos[termName]}
      </li>
    ));
  }

  return (
    <div>
      <label className="labelArea">Últimas Versões:</label>
      <Container>
        <Container className="table-container">
          <Table className="custom-table">
            <thead>
              <tr>
                <th className="text-center">Versão</th>
                <th className="text-center">Data de Edição</th>
                <th className="text-center">Termos</th>
              </tr>
            </thead>
            <tbody>
              {termos.map((termo) => (
                <tr key={termo.id}>
                  <td className="text-center">{termo.id}</td>
                  <td className="text-center">{format(new Date(termo.data), "yyyy-MM-dd HH:mm:ss")}</td>
                  <td className="text-center">
                    <ul>
                      {renderizarTermos(termo.itemTermos)}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <div>
          <input
            type="text"
            className="textTitulo"
            placeholder="Titulo"
            onChange={handleTituloChange}
            value={titulo}
          />

          <textarea
            className="textArea"
            placeholder="Descrição"
            onChange={handleDescricaoChange}
            value={descricao}
          />

          {/* Exibir termos temporários */}
          <div>
          <h2>................................................................................................................................................................</h2>
            <ul>
              {renderizarTermos(termosTemporarios)}
            </ul>
          </div>
        </div>

        <div className="button-container">
          <button type="button" className="custom-button" onClick={handleAddList}> + </button>
          <button type="button" className="custom-button" onClick={handleSalvar}> Salvar </button>
        </div>
      </Container>
    </div>
  );
}

export default Termo;
