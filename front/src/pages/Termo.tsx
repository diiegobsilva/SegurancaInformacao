import { Container, Table } from "react-bootstrap";
import { format } from "date-fns";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";


interface Termo {
  id: number;
  itemTermos: {
    Cookies: string;
    ColetaDeDados: string;
    TermosDeServico: string;
    PoliticaDePrivacidade: string;
  };
  data: string;
}

function Termo() {
  const [itemTermo, setItemTermo] = useState('');
  const [termos, setTermos] = useState<Termo[]>([]);

  const handleCreateTermo = async () => {
    try {
      const recoveredToken = localStorage.getItem('token')
      const response = await axios.post('/termos/create', {
        itemTermo:JSON.parse(itemTermo),
      },{
        headers:{
          'authorization': `Bearer ${recoveredToken}`
      }});

      const updatedTermos = [...termos, response.data];
      setTermos(updatedTermos);

      setItemTermo(response.data.itemTermo);
    } catch (error) {
      console.error('Erro ao criar termo:', error);
    }
  };

  useEffect(() => {
    const recoveredToken = localStorage.getItem('token');
    axios.get('/termos/', {
      headers: {
        'authorization': `Bearer ${recoveredToken}`
      }
    })
      .then((response) => {
        setTermos(response.data);

        if (response.data.length > 0) {
          const ultimoTermo = response.data[response.data.length - 1];
          setItemTermo(
            Object.entries(ultimoTermo.itemTermos)
              .map(([termName, termValue]) => `${termName}: ${termValue}`)
              .join('\n')
          );
        } else {
          setItemTermo('');
        }
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);
console.log(itemTermo);

  return (
    <div>
      <label className="labelArea">Últimas Versões:</label>
      <Container className="">
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
              {Array.isArray(termos) ? (
                termos.map((termo) => (
                  <tr key={termo.id}>
                    <td className="text-center">{termo.id}</td>
                    <td className="text-center">{format(new Date(termo.data), "yyyy-MM-dd HH:mm:ss")}</td>
                    <td className="text-center">
                      {Object.entries(termo.itemTermos).map(([termName, termValue]) => (
                        <div key={termName}>
                          <strong>{termName}:</strong> {termValue}
                        </div>
                      ))}
                    </td>
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
                value={itemTermo}
                onChange={(e) => setItemTermo(e.target.value)}
              />
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
