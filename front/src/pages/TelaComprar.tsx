import { useEffect } from "react";
import { useFormik } from "formik";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro, registrationSchema } from "../controllers";
import { URI } from "../enumerations/uri";
import React from "react";
import { initialValues } from "../types";
import pizza4 from "../images/pizza4.jpg";
import pizza5 from "../images/pizza5.jpg";
import pizza6 from "../images/pizza6.jpg";


function TelaComprar() {
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    initialErrors: { nome: "" },
    onSubmit: async (values) => {
      JSON.stringify(values, null, 2);
      await axios.post(URI.CRIAR_CLIENTE, formik.values);
      onClickLimpar();
    },
  });

  function onClickLimpar() {
    formik.resetForm();
  }

  function onClickEnviar() {
    if (!formik.isValid) {
      avisoErro();
    } else {
      formik.submitForm();
      avisoConcluido();
    }
  }

  return (
    <form>
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">Comprar</h1>
        <div className="text-gray-500 fs-6 font-padrao-titulo mb-5" style={{ letterSpacing: 0 }}>Preencha os campos para realizar sua Compra!</div>
      </div>

      <div className="row">
        <div>
          <div className="menu-column">
            <div className="menu-item-card">
            </div>
            <div className="menu-item-card">
              <div className="menu-item-image-comprar">
                <img src={pizza5} alt="Calabresa e Brócolis" />
                <div className="item-details">
                  <h3 className="item-name">Brócolis e Queijo Provolone</h3>
                  <div className="quantity-controls">
                  </div>
                </div>
                <p className="item-description">Brócolis, Queijo Provolone e Queijo Minas</p>
              </div>
            </div>
            <div className="menu-item-card">
              <div className="menu-item-image-comprar">
                <img src={pizza6} alt="Calabresa" />
                <div className="item-details">
                  <h3 className="item-name">Calabresa</h3>
                  <div className="quantity-controls">
                  </div>
                </div>
                <p className="item-description">Calabresa, Cebola e Tomate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-4">
        <a href="/cadastro">Cadastrar</a>

        <button type="button" className="btn btn-form" onClick={onClickEnviar} disabled={formik.isSubmitting}>
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

export default TelaComprar;
