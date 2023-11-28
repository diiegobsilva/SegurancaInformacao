import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro, registrationSchema } from "../controllers";
import { URI } from "../enumerations/uri";
import React from "react";
import { initialValues } from "../types";
import clsx from "clsx";
import Swal, { SweetAlertCustomClass } from 'sweetalert2';
import { Button, Modal } from "react-bootstrap";


interface Termo {
  id: number;
  itemTermos: {
    Cookies: string;
    ColetaDeDados: string;
    TermosDeServico: string;
    PoliticaDePrivacidade: string;
  };
  data: string;
  versao: number
  profile: string
}

function Cadastro() {
  const [termos, setTermos] = useState<Termo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [respostas, setRespostas] = useState<{ [termoId: number]: { [parteIndex: string]: number } }>({});
  const [itemTermo, setItemTermo] = useState({
    Cookies: "",
    ColetaDeDados: "",
    TermosDeServico: "",
    PoliticaDePrivacidade: "",
  });


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

  function confirmarPassword(confirmPassword: string) {
    const { password } = formik.values;
    if (password !== confirmPassword) {
      formik.setFieldError("confirmPassword", "As senhas não coincidem.");
    } else {
      formik.setFieldError("confirmPassword", "");
    }
  }

  function confirmarEmail(confirmEmail: string) {
    const { email } = formik.values;
    if (email !== confirmEmail) {
      formik.setFieldError("confirmEmail", "As senhas não coincidem.");
    } else {
      formik.setFieldError("confirmEmail", "");
    }
  }


  function onClickEnviar() {
    if (!formik.isValid || formik.errors.confirmPassword) {
      avisoErro();
    } else {
      formik.submitForm();
      avisoConcluido();

    }
  }
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
          setItemTermo({
            Cookies: "",
            ColetaDeDados: "",
            TermosDeServico: "",
            PoliticaDePrivacidade: "",
          });
        }
      })
      .catch((error) => console.error('Erro ao buscar termos:', error));
  }, []);


  console.log(termos);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


const handleAceitar = (termoId: number, parte: string) => {
  const resposta = { termoId, parte, resposta: 1 };

};

const handleRecusar = (termoId: number, parte: string) => {
  const resposta = { termoId, parte, resposta: 0 };

};

// ...

const renderizarTermo = (itemTermo: any) => {
  return itemTermo.map((parte: any, index: any) => (
    <div key={index}>
      <p>{parte}</p>
      <button onClick={() => handleAceitar(itemTermo.id, parte)}>Aceitar</button>
      <button onClick={() => handleRecusar(itemTermo.id, parte)}>Recusar</button>
    </div>
  ));
};
  console.log(respostas);
  

  return (
    <form>
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">CADASTRAR CLIENTE</h1>
        <div className="text-gray-500 fs-6 font-padrao-titulo mb-5" style={{ letterSpacing: 0 }}>Preencha os campos para cadastrar um cliente!</div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          {/* begin::Form group Nome */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Nome</label>
            <input placeholder="Nome" type="text" autoComplete="off" {...formik.getFieldProps("nome")}
              onChange={formik.handleChange} value={formik.values.nome}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.nome && formik.errors.nome,
                },
                {
                  "is-valid":
                    formik.touched.nome &&
                    !formik.errors.nome,
                }
              )}
            />
            {formik.touched.nome && formik.errors.nome && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.nome}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group Nome */}
        </div>
        <div className="col-lg-3">
          {/* begin::Form group Livro */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Email</label>
            <input placeholder="Email" type="text" autoComplete="off" {...formik.getFieldProps("email")}
              onChange={formik.handleChange} value={formik.values.email}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.email && formik.errors.email,
                },
                {
                  "is-valid":
                    formik.touched.email &&
                    !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-3">
          <div className="fv-row mb-4">
            <label className="form-label fw-bolder text-dark fs-6">Confirmar Email</label>
            <input
              placeholder="Confirmar Email"
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("confirmEmail")}
              onChange={(e) => {
                formik.handleChange(e);
                confirmarPassword(e.target.value);
              }}
              value={formik.values.confirmEmail}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.confirmEmail && formik.errors.confirmEmail,
                },
                {
                  "is-valid": formik.touched.confirmEmail && !formik.errors.confirmEmail,
                }
              )}
            />
            {formik.touched.confirmEmail && formik.errors.confirmEmail && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.confirmEmail}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-3">
          <label className="form-label fw-bolder text-dark fs-6">Genero</label>
          <select className="form-label fw-bolder text-dark form-control" {...formik.getFieldProps("sexo")} >
            <option value="" label="Selecione o Genero" disabled />
            <option value="masculino" label="Masculino" />
            <option value="feminino" label="Feminino" />
            <option value="outro" label="Outro" />
          </select>
        </div>

        <div className="col-lg-3">
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Senha</label>
            <input placeholder="Senha" type="password" autoComplete="off" {...formik.getFieldProps("password")}
              onChange={formik.handleChange} value={formik.values.password}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password &&
                    !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-3">
          <div className="fv-row mb-4">
            <label className="form-label fw-bolder text-dark fs-6">Confirmar Senha</label>
            <input
              placeholder="Confirmar Senha"
              type="password"
              autoComplete="off"
              {...formik.getFieldProps("confirmPassword")}
              onChange={(e) => {
                formik.handleChange(e);
                confirmarPassword(e.target.value);
              }}
              value={formik.values.confirmPassword}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.confirmPassword && formik.errors.confirmPassword,
                },
                {
                  "is-valid": formik.touched.confirmPassword && !formik.errors.confirmPassword,
                }
              )}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.confirmPassword}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-3">
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Endereço</label>
            <input placeholder="Endereço" type="text" autoComplete="off" {...formik.getFieldProps("endereco")}
              onChange={formik.handleChange} value={formik.values.endereco}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.endereco && formik.errors.endereco,
                },
                {
                  "is-valid":
                    formik.touched.endereco &&
                    !formik.errors.endereco,
                }
              )}
            />
            {formik.touched.endereco && formik.errors.endereco && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.endereco}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="fv-row mb-4">
            <label className="form-label fw-bolder text-dark fs-6">Telefone</label>
            <input placeholder="Telefone" type="text" autoComplete="off" {...formik.getFieldProps("telefone")}
              onChange={formik.handleChange} value={formik.values.telefone}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.telefone && formik.errors.telefone,
                },
                {
                  "is-valid":
                    formik.touched.telefone &&
                    !formik.errors.telefone,
                }
              )}
            />
            {formik.touched.telefone && formik.errors.telefone && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.telefone}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-9">
          <div style={{ display: "flex" }}>

            <input
              type="checkbox"
              checked={formik.values.termo_dados === 1}
              onChange={(e) =>
                formik.setFieldValue("termo_dados", e.target.checked ? 1 : 0)
              }
              className={clsx(
                {
                  "is-invalid":
                    formik.touched.termo_dados && formik.errors.termo_dados,
                },
                {
                  "is-valid":
                    formik.touched.termo_dados && !formik.errors.termo_dados,
                }
              )}
            />

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} style={{}}>
              <Modal.Header closeButton>
                <Modal.Title>Termo de Uso</Modal.Title>
              </Modal.Header>


              <Modal.Body>
                {termos.slice(-1).map((termo) => (
                  <div key={termo.id}>
                    {renderizarTermo(termo)}
                  </div>
                ))}
              </Modal.Body>


              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>



            <label style={{ display: "flex", marginLeft: "15px" }} onClick={handleOpenModal}>
              Concordo com os termos de uso e condições previstas para uso desse website.
            </label>
            {formik.touched.termo_dados && formik.errors.termo_dados && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.termo_dados}</span>
                </div>
              </div>
            )}
          </div>
        </div>



      </div>






      {/* begin::Form group */}
      <div className="d-flex align-items-center justify-content-between mt-4">
        <button type="button" className="btn btn-form" onClick={onClickLimpar}>Limpar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-fill" viewBox="0 0 16 16">
            <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
          </svg>
        </button>



        <button type="button" className="btn btn-form" onClick={onClickEnviar} disabled={formik.isSubmitting}>
          Enviar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
          </svg>
        </button>

      </div>
      {/* end::Form group */}
    </form>
  );
}

export default Cadastro;
