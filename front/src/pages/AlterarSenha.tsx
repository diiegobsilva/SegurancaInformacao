import { useEffect, useState } from "react";
import "../App.css";
import clsx from "clsx";
import axios from "axios";
import { avisoErroAlterarSenha, avisoSenhaAlterada } from "../controllers/avisoConcluido";

function AlterarSenha() {
  const [novaSenha, setnovaSenha] = useState("");
  const [confirmacaoSenha, setconfirmacaoSenha] = useState("");

  console.log(novaSenha);
  console.log(confirmacaoSenha);

  const handlenovaSenhaChange = (event: any) => {
    setnovaSenha(event.target.value);
  };

  const handleconfirmacaoSenhaChange = (event: any) => {
    setconfirmacaoSenha(event.target.value);
  };

  const handleAtualiza = async () => {
    try {
      const id = localStorage.getItem("id");
      console.log(id);
      
      await axios.put(`/cliente/modifypassword/${id}`, { password: novaSenha}).then(() => {console.log('Senha Alterada: ');})
      .catch((error) => {console.log(error);
      }) 
      
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }

  const verificaSenha = () => {
    if (novaSenha === confirmacaoSenha) {
      handleAtualiza();
      avisoSenhaAlterada();
    } else {
      avisoErroAlterarSenha();
    }
  }
  
  return (
    <>
      <form>
        <div className="text-center mb-4">
          <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">Alteração de senha</h1>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="fv-row mb-3">
              <label className="form-label fw-bolder text-dark fs-6">Nova Senha:</label>
              <input
                placeholder="Insira a nova senha"
                type="text"
                autoComplete="off"
                className={clsx("form-control bg-transparent")}
                onChange={handlenovaSenhaChange}
                value={novaSenha}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fv-row mb-3">
              <label className="form-label fw-bolder text-dark fs-6">Confirmar Nova Senha:</label>
              <input
                placeholder="Confirme a nova senha"
                type="text"
                autoComplete="off"
                className={clsx("form-control bg-transparent")}
                onChange={handleconfirmacaoSenhaChange}
                value={confirmacaoSenha}
              />
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-4">
          <button onClick={verificaSenha} type="button" className="btn btn-form" style={{ width: "120px", height: "16" }} >
            Alterar Senha
          </button>
        </div>
      </form>
    </>
  );
}

export default AlterarSenha;
