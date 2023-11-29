import { useEffect, useState } from "react";
import "../App.css";
import clsx from "clsx";
import axios from "axios";
import { avisoDeletar, avisoErroDeletar } from "../controllers/avisoConcluido";
import { Link, useNavigate } from "react-router-dom";

function Perfil() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [sexo, setSexo] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const carregarDadosDaLocalStorage = () => {
      const id = (localStorage.getItem("id") || "").replace(/['"]+/g, '');
      const emailLocal = (localStorage.getItem("email") || "").replace(/['"]+/g, '');
      const nomeLocal = (localStorage.getItem("nome") || "").replace(/['"]+/g, '');
      const telefoneLocal = (localStorage.getItem("telefone") || "").replace(/['"]+/g, '');
      const enderecoLocal = (localStorage.getItem("endereco") || "").replace(/['"]+/g, '');
      const sexoLocal = (localStorage.getItem("sexo") || "").replace(/['"]+/g, '');

      setUserId(id);
      setEmail(emailLocal);
      setNome(nomeLocal);
      setTelefone(telefoneLocal);
      setEndereco(enderecoLocal);
      setSexo(sexoLocal);
    };
    carregarDadosDaLocalStorage()
  }, []);

  console.log("foda se");
  console.log("foda se");
  console.log(userId);
  console.log(email);
  console.log(nome);
  console.log(endereco);
  console.log(telefone);
  console.log(sexo);


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

  const handleAtualiza = async () => {
    try {
      await axios.put(`/cliente/modify/${userId}`, { email: email, nome: nome, telefone: telefone, sexo: sexo, endereco: endereco});
      console.log('Cliente alterado uhuuuu: ');
    } catch (error) {
      console.error('Error updating client:', error);
    }
  }

  async function handleDeleteUser() {
    try {
      avisoDeletar().then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/cliente/delete/${userId}`).then(() => navigate('/login'));
        }
      })

    } catch (error) {
      console.error(error);
      avisoErroDeletar();
    }
  }


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
