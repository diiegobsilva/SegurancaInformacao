/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

function EditarCliente() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [sexo, setSexo] = useState("");
  const [clientID, setClientID] = useState(""); // Set the client ID as needed

  async function handleUpdateClient() {
    const updatedClientData = {
      email,
      nome,
      telefone,
      endereco,
      sexo,
    };

    try {
      // Make a PUT request to your server to update the client
      const response = await axios.put(`/api/clientes/${clientID}`, updatedClientData);

      // Handle the response as needed
      console.log('Client updated:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error updating client:', error);
    }
  }

  return (
    <div>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setNome(e.target.value)}
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
                onChange={(e) => setTelefone(e.target.value)}
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
                onChange={(e) => setEndereco(e.target.value)}
                value={endereco}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <select
              className="form-label fw-bolder text-dark form-control bg-transparent mt-4"
              onChange={(e) => setSexo(e.target.value)}
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
          <button
            type="button"
            className="btn btn-form"
            style={{ width: "120px", height: "16px" }}
            onClick={handleUpdateClient}
          >
            Update Client
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarCliente;
