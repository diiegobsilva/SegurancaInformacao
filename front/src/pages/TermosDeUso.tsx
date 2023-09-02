import React, { useState } from "react";
import { Link } from "react-router-dom";

const TermosDeUso = () => {
  const [concordaComDados, setConcordaComDados] = useState(false);

  const handleConcordaComDadosChange = () => {
    setConcordaComDados(!concordaComDados);
  };

  return (
    <div>
      <h2>Termos de Uso e Consentimento de Dados</h2>
      <p>
        Ao prosseguir com o cadastro, você concorda em compartilhar informações sensíveis que incluem nome, email, telefone, endereço e sexo, com a "Pizzaria do Sakaue". Nós consideramos a proteção dos seus dados pessoais uma prioridade e nos comprometemos a tratá-los com o máximo cuidado e confidencialidade.
      </p>
      <p>
        Esses dados serão coletados e utilizados exclusivamente para fins de cadastro, comunicação e prestação dos nossos serviços. Eles não serão compartilhados com terceiros sem o seu consentimento expresso.
      </p>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="concordaComDados"
          checked={concordaComDados}
          onChange={handleConcordaComDadosChange}
        />
        <label className="form-check-label" htmlFor="concordaComDados">
          Eu li e concordo com o uso dos meus dados pessoais sensíveis conforme descrito acima.
        </label>
      </div>
      <p>
        {concordaComDados ? (
          <button className="btn btn-form">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Cadastrar
            </Link>
          </button>
        ) : (
          "Você precisa concordar com os termos acima para continuar."
        )}
      </p>
    </div>
  );
};

export default TermosDeUso;
