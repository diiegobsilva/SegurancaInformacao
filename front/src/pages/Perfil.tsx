import { useEffect, useState } from "react";
import "../App.css";
import clsx from "clsx";
import axios from "axios";
import { avisoAtualizacaoTermo, avisoDeletar, avisoErroDeletar, avisoPerfilAlterada } from "../controllers/avisoConcluido";
import { Link, useNavigate } from "react-router-dom";
import { URITERMOS } from "../enumerations/uri";
import { Button, Modal } from "react-bootstrap";
import Termo from "./Termo";

function Perfil() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [sexo, setSexo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [cliente_termo, setCliente_termo] = useState("" as any);
  const [termoAceito, setTermoAceito] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [ultimoTermo, setUltimoTermo] = useState<Termo | null>(null);
  const [idTermo, setIdTermo] = useState('')
  const [termos, setTermos] = useState<Termo[]>([]);
  
  const navigate = useNavigate();


  useEffect(() => {
   
      const id = (localStorage.getItem("id") || "").replace(/['"]+/g, '');
      const emailLocal = (localStorage.getItem("email") || "").replace(/['"]+/g, '');
      const nomeLocal = (localStorage.getItem("nome") || "").replace(/['"]+/g, '');
      const telefoneLocal = (localStorage.getItem("telefone") || "").replace(/['"]+/g, '');
      const enderecoLocal = (localStorage.getItem("endereco") || "").replace(/['"]+/g, '');
      const sexoLocal = (localStorage.getItem("sexo") || "").replace(/['"]+/g, '');
  

      async function get(){
        try {
          const response = await axios.get(`http://localhost:3001/cliente_termo/specificCliente/${id}`);
          const { termosAceitos } = response.data;
          setCliente_termo(termosAceitos);
        } catch (error) {
          console.error(error);
        }
        const response = await axios.get(`${URITERMOS.CLIETE_TERMO_ATUALIZA}${id}`)
        console.log(response.data);
      
        if(response.data.atualizacao === true){ 
          avisoAtualizacaoTermo();
          setShowModal(true)
        }
        
     }

     get()
      setUserId(id);
      setEmail(emailLocal);
      setNome(nomeLocal);
      setTelefone(telefoneLocal);
      setEndereco(enderecoLocal);
      setSexo(sexoLocal);
  
      
   
  
    
  }, []);

  console.log(userId);
  console.log(email);
  console.log(nome);
  console.log(endereco);
  console.log(telefone);
  console.log(sexo);
  console.log(cliente_termo);
  
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleNomeChange = (event: any) => {
    setNome(event.target.value);
  };

  const handleTelefoneChange = (event: any) => {
    setTelefone(event.target.value);
  };

  const handleEnderecoChange = (event: any) => {
    console.log(event.target.value);
    
    setEndereco(event.target.value);
  };

  const handleSexoChange = (event: any) => {
    setSexo(event.target.value);
  };

  async function handleDeleteUser() {
    try {
      avisoDeletar().then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/cliente/delete/${userId}`).then(async () => {
            await axios.post('http://localhost:3002/cliente/create/', {id: userId}).then((res) => navigate('/login'))
          });
        }
      })
    } catch (error) {
      console.error(error);
      avisoErroDeletar();
    }
  }

  useEffect(() => {
    axios.get('/termos/')
      .then((response) => {
        setTermos(response.data);
  
        if (response.data.length > 0) {
          const ultimoTermo = response.data[response.data.length - 1];
          setUltimoTermo(ultimoTermo);
          setIdTermo(ultimoTermo.id)

        }
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);

  const handleOpenModal = () => {
    if (ultimoTermo) {
      setShowModal(true);
    }
  };
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleAceitarTermo = (termName: string) => {
      setCliente_termo((prevTermoAceito:any) => ({
        ...prevTermoAceito,
        [termName]: true,
      }));
      if(ultimoTermo && ultimoTermo.itemTermos){
        if (currentPage < Object.keys(ultimoTermo.itemTermos || {}).length - 1) {
          handleNextPage();
        }else{
          handleCloseModal()
        }
      }
   
    };
  
    const handleRecusarTermo = (termName: string) => {
      setCliente_termo((prevTermoAceito:any) => ({
        ...prevTermoAceito,
        [termName]: false,
      }));
      if(ultimoTermo && ultimoTermo.itemTermos){
        if (currentPage < Object.keys(ultimoTermo.itemTermos || {}).length - 1) {
          handleNextPage();
        }else{
          handleCloseModal()
        }
      }
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) =>
        Math.min(prevPage + 1, Object.keys(ultimoTermo?.itemTermos || {}).length - 1)
      );
    };
    
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };
    
    const handleChangePage = (index: React.SetStateAction<number>, termo: string) => {
      setCurrentPage(index);
    };
    
    const getColor = (index: any, termo: any) => {   
      console.log(cliente_termo[termo] === 'true');
       
      if(currentPage === index){
        return 'blue'
      }
      else if(cliente_termo[termo] === 'true' || cliente_termo[termo] === true  ){
        return "green" 
      }
      else if(cliente_termo[termo] === 'false' || cliente_termo[termo] === false ){
        return "red"
      }
      else{
        return 'gray'
      }
      // const termoAceitoPeloUsuario = cliente_termo[termo];      
      // if (termoAceitoPeloUsuario !== undefined) {
      //   return termoAceitoPeloUsuario ? 'green' : 'red';
      // }
      // const termoClienteStatus = cliente_termo && cliente_termo[termo];
      // console.log(cliente_termo);
      // console.log("VASCOOOOOOOOOOOOOO");
      
      
      // if (termoClienteStatus !== undefined) {
      //   return termoClienteStatus ? 'green' : 'red';
      // }
      // const termoUltimoTermo = ultimoTermo && ultimoTermo.itemTermos && ultimoTermo.itemTermos[termo];
      // if (termoUltimoTermo) {
      //   return 'gray';
      // }
      // return 'gray';
    };
    
    

console.log(termoAceito);

  console.log(cliente_termo);
  console.log(ultimoTermo);
  

  const handleAtualiza = async () => {

    try {
      await axios.put(`/cliente/modify/${userId}`, { email, nome, telefone, sexo, endereco }).then((res) => {

        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('nome', nome);
        localStorage.setItem('telefone', telefone);
        localStorage.setItem('endereco', endereco);
        localStorage.setItem('sexo', sexo);
      })
      
      await axios.post(URITERMOS.CRIAR_CLIENTE_TERMO, {
        cliente: userId,
        termos: idTermo,
        itemTermos: cliente_termo,
      });

      avisoPerfilAlterada()
      
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };
  
console.log("id do termo aqui" + idTermo);
console.log("id do user aqui" + userId);

  return (
    <>
      <form>
        <div className="text-center mb-4">
          <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">Meu Perfil</h1>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="fv-row mb-3">
              <label className="form-label fw-bolder text-dark fs-6">Email</label>
              <input
                placeholder="Email"
                type="text"
                autoComplete="off"
                className={clsx("form-control bg-transparent")}
                onChange={handleEmailChange}
                value={email}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fv-row mb-3">
              <label className="form-label fw-bolder text-dark fs-6">Nome</label>
              <input
                autoComplete="off"
                placeholder="Nome"
                type="text"
                className={clsx("form-control bg-transparent")}
                onChange={handleNomeChange}
                value={nome}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fv-row mb-4">
              <label className="form-label fw-bolder text-dark fs-6">Telefone</label>
              <input
                placeholder="Telefone"
                type="text"
                autoComplete="off"
                className={clsx("form-control bg-transparent")}
                onChange={handleTelefoneChange}
                value={telefone}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fv-row mb-3">
              <label className="form-label fw-bolder text-dark fs-6">Endereço</label>
              <input
                placeholder="Endereço"
                type="text"
                autoComplete="off"
                className={clsx("form-control bg-transparent")}
                onChange={handleEnderecoChange}
                value={endereco}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <select
              className="form-label fw-bolder text-dark form-control bg-transparent mt-4 "
              onChange={handleSexoChange}
              value={sexo}
            >
              <option value="" label="Selecione o sexo" disabled />
              <option value="masculino" label="Masculino" />
              <option value="feminino" label="Feminino" />
              <option value="outro" label="Outro" />
            </select>
          </div>
        </div>

        <div className="col-lg-9">
          <div style={{ display: "flex" }}>
            <>
            {ultimoTermo && ultimoTermo.itemTermos && (
              <Modal show={showModal} onHide={handleCloseModal} style={{}}>
                <Modal.Header closeButton>
                  <Modal.Title>Termo de Uso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {Object.entries(ultimoTermo.itemTermos)
                    .slice(currentPage, currentPage + 1)
                    .map(([termName, termValue]) => (
                      <div key={termName} style={{height: 500, overflowY: 'auto'}}>
                        <h1 style={{fontSize: 30}}>{termName}</h1>
                        <p style={{textAlign: 'justify', width: '100%'}}>{termValue}</p>
                      </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}

                    <div style={{ display: 'flex', gap: '10px', marginRight: 'auto' }}>
                      {Object.keys(ultimoTermo?.itemTermos || {}).map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: getColor(index, _),
                            cursor: 'pointer',
                          }}
                          onClick={() => handleChangePage(index, _)}
                        />
                      ))}
                    </div>

                  {/* </div> */}
                  <Button variant="success" onClick={() => {
                      handleAceitarTermo(Object.keys(ultimoTermo.itemTermos || {})[currentPage])
                  }}>
                    Aceitar
                  </Button>
                  <Button variant="danger" onClick={() => {
                      handleRecusarTermo(Object.keys(ultimoTermo.itemTermos || {})[currentPage])
                      
                  }}>
                    Recusar
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </>
            <label style={{fontSize:"18px", fontWeight: "bold", marginTop: "20px"}} onClick={handleOpenModal}> Concordo com os termos de uso e condições previstas para uso desse website. </label>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-4">
        <Link to={"/senha"}>
          <button type="button" className="btn btn-form" style={{ width: "120px", height: "16" }}>
            Alterar Senha
          </button>
        </Link>
          <button onClick={handleAtualiza} type="button" className="btn btn-form" style={{ width: "120px", height: "16" }} >
            Alterar
          </button>
          <button onClick={handleDeleteUser} type="button" className="btn btn-form" style={{ width: "120px", height: "16" }} >
            Excluir conta
          </button>
        </div>
      </form>
    </>
  );
}

export default Perfil;
