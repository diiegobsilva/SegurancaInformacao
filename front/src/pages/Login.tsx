
import axios from "axios";
import "../App.css";
import clsx from "clsx";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/auth";

function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function receberEmail(evento: any) {
    let entrada = evento.target.value;
    setEmail(entrada)
    console.log(email); 
}

function receberSenha(evento: any) {
    let entrada = evento.target.value;
    setSenha(entrada)
}

const handleSubmit = () => {
  login(email, senha)
};

  return (
    <form>
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">Login</h1>
        <div className="text-gray-500 fs-6 font-padrao-titulo mb-5" style={{ letterSpacing: 0 }}>Preencha os campos para realizar o login!</div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Email</label>
            <input
              placeholder="Email"
              type="text"
              autoComplete="off"
              className={clsx("form-control bg-transparent")} 
              onChange={receberEmail}
              />

            
          </div>
        </div>
        <div className="col-lg-6">
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Senha</label>
            <input
              placeholder="Senha"
              type="password"
              autoComplete="off"
              className={clsx( "form-control bg-transparent")}

              onChange={receberSenha}
              />
          
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-4">

        <button type="button" className="btn btn-form" onClick={() => navigate('/cadastro')}>
        Cadastrar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
          </svg>
        </button>
        <button type="button" className="btn btn-form" onClick={handleSubmit} >
          Entrar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
          </svg>
        </button>
      </div>

    </form>
  );
}

export default Login;
