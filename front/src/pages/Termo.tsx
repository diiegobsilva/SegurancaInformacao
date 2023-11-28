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
  const [itemTermo, setItemTermo] = useState({
    Cookies: "",
    ColetaDeDados: "",
    TermosDeServico: "",
    PoliticaDePrivacidade: "",
  });

  const [termos, setTermos] = useState<Termo[]>([]);

  const handleCreateTermo = async () => {
    try {
      const recoveredToken = localStorage.getItem('token');
      const response = await axios.post('/termos/create', {
        itemTermos: itemTermo,  
      }, {
        headers: {
          'authorization': `Bearer ${recoveredToken}`
        }
      });
      const updatedTermos = [...termos, response.data];
      setTermos(updatedTermos);

      setItemTermo({
        Cookies: "",
        ColetaDeDados: "",
        TermosDeServico: "",
        PoliticaDePrivacidade: "",
      });
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
          setItemTermo(ultimoTermo.itemTermos);
        } else {
          setItemTermo({
            Cookies: "",
            ColetaDeDados: "",
            TermosDeServico: "",
            PoliticaDePrivacidade: "",
          });
        }
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);

  console.log(JSON.stringify(itemTermo));

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
                value={Object.values(itemTermo).join('\n')}
                onChange={(e) => {
                  // Pode precisar ajustar essa lógica conforme necessário
                  const values = e.target.value.split('\n');
                  setItemTermo({
                    Cookies: values[0] || "",
                    ColetaDeDados: values[1] || "",
                    TermosDeServico: values[2] || "",
                    PoliticaDePrivacidade: values[3] || "",
                  });
                }}
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
