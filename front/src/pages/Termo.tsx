import { Container, Table } from "react-bootstrap";
import "../App.css";

function Termo() {

  return (
    <div>
      <label className="labelArea">Ultima Versões: </label>
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
              <tr>
                <td className="text-center">teste</td>
                <td className="text-center">teste</td>
                <td className="text-center">teste</td>
                <td className="text-center">teste</td>
                <td className="text-center">teste</td>
                <td className="text-center">teste</td>
      
              </tr>
            </tbody>
          </Table>
        </Container>

      <div>
       <label className="labelArea"> Termos e Condições: </label>
        <textarea className="textArea"/>
      </div>
      <div  className="button-container"> 
        <button type="button"className="custom-button" >Salvar</button>
      </div>
     

      </Container>
    </div>
  );
}

export default Termo;
