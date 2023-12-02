import { Container, Table } from "react-bootstrap";
import { format } from "date-fns";
import "../App.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RenderTermoExite } from "../components/Termo";
import { AuthContext } from "../contexts/auth";


interface Termo {
  id: number;
  itemTermos: { [key: string]: string };
  data: string;
}

function Termo() {
  const [termos, setTermos] = useState<Termo[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ render, setRender ] = useState(null as any)
  const [novosItem, setNovosItem] = useState(null as any)
  const { termosTemporarios, setTermosTemporarios } = useContext(AuthContext);
console.log(novosItem);

  useEffect(() => {
    const recoveredToken = localStorage.getItem('token');
    axios.get('/termos/', {
      headers: {
        'authorization': `Bearer ${recoveredToken}`
      }
    })
      .then((response) => {
        setTermos(response.data);


        setTermosTemporarios({});
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);

  const handleAddList = () => {
    setTermosTemporarios((prevTemporarios:any) => ({
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
      })

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
      <div style={{textAlign: "justify", overflowY: 'auto'}} onClick={() => {setNovosItem([termName, itemTermos[termName]])}}>
        <h1 style={{fontSize: 30}}>{termName}</h1> 
        <p style={{textAlign: 'justify', width: '100%'}}>{itemTermos[termName]}</p>
      </div>
    ));
  }

  const handleTermoTemporarioClick = (termName: string, termValue: string) => {
    // Ao clicar em um termo temporário, define o termo clicado como o termo atual a ser editado
    setNovosItem([termName, termValue]);
    setTitulo(termName);
    setDescricao(termValue);
    // Remove o termo temporário clicado
    setTermosTemporarios((prevTemporarios: any) => {
      const { [termName]: termRemovido, ...novosTermos } = prevTemporarios;
      return novosTermos;
    });
  };
  const renderizarTermosTemporarios = (termosTemporarios: { [key: string]: string }) => {
    return Object.keys(termosTemporarios).map((termName) => (
      <div
        style={{ textAlign: "justify", overflowY: "auto", cursor: "pointer" }}
        key={termName}
        onClick={() => handleTermoTemporarioClick(termName, termosTemporarios[termName])}
      >
        <h1 style={{ fontSize: 30 }}>{termName}</h1>
        <p style={{ textAlign: "justify", width: "100%" }}>{termosTemporarios[termName]}</p>
      </div>
    ));
  };

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
                <tr key={termo.id} onClick={(e) => setRender(termo.itemTermos)}>
                  <td className="text-center">{termo.id}</td>
                  <td className="text-center">{format(new Date(termo.data), "yyyy-MM-dd HH:mm:ss")}</td>
                  <td >
                    <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                      {renderizarTermos(termo.itemTermos)}
                    </div>
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <div>
        {render && (
          Object.entries(render).map(([termName, termValue]) => (
            <RenderTermoExite key={termName} title={termName} value={termValue} />
          ))
        )}
      </div>
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


          <div>
          <hr className="linha"/>
            <ul>
              {renderizarTermosTemporarios(termosTemporarios)}
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
