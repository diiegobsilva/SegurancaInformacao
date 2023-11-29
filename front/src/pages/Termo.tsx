import { Container, Table } from "react-bootstrap";
import { format } from "date-fns";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";


interface Termo {
  id: number;
  itemTermos: string;
  data: string;
}

function Termo() {
  const [itemTermo, setItemTermo] = useState();
  const [termos, setTermos] = useState<Termo[]>([]);
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")

  const [listTermo, setListTermo] = useState<{ titulo: string; descricao: string }[]>([]);

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

        }
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);


  const handleAddList = () => {
    // Adiciona o novo termo ao objeto
    setListTermo(prevList => ({
      ...prevList,
      [titulo]: descricao,
    }));

    setTitulo("");
    setDescricao("");
  };
  console.log(listTermo);


  const handleSalvar = async () => {
    try {
      const recoveredToken = localStorage.getItem('token');

      const response = await axios.post('/termos/create', {
        itemTermos: listTermo,
      }, {
        headers: {
          'authorization': `Bearer ${recoveredToken}`
        }
      });

      const updatedTermos = [...termos, response.data];
      setTermos(updatedTermos);

      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar termo:', error);
    }
  };


  const handleTituloChange = (event: any) => {
    setTitulo(event.target.value);
  };
  const handleDescricaoChange = (event: any) => {
    setDescricao(event.target.value);
  };

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
              {
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
              }
            </tbody>
          </Table>
        </Container>

        <div>
          <input
            type="text"
            className="textTitulo"
            placeholder="Titulo"
            onChange={handleTituloChange}
            value={titulo} />

          <textarea
            className="textArea"
            placeholder="Descrição"
            onChange={handleDescricaoChange}
            value={descricao}
          />
        </div>

        <div className="button-container">
          <button type="button" className="custom-button" onClick={handleAddList}  > + </button>

          <button type="button" className="custom-button" onClick={handleSalvar} > Salvar </button>
        </div>


      </Container>
    </div>
  );
}

export default Termo;
