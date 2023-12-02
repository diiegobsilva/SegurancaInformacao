import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro, registrationSchema } from "../controllers";
import { URI, URITERMOS } from "../enumerations/uri";
import React from "react";
import { initialValues } from "../types";
import clsx from "clsx";
import Swal, { SweetAlertCustomClass } from 'sweetalert2';
import { Button, Modal } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import { avisoValidateTermo } from "../controllers/avisoErro";



interface Termo {
  id: number;
  descricao: string;
  data: string;
  versao: number
  profile: string
  itemTermos?: { [key: string]: string };
}

function Cadastro() {
  const [termos, setTermos] = useState<Termo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [ultimoTermo, setUltimoTermo] = useState<Termo | null>(null);
  const [idTermo, setIdTermo] = useState('')

  const [termoAceito, setTermoAceito] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const termosAceitosJSON = Object.fromEntries(
    Object.entries(termoAceito).map(([key, value]) => [key, value ? "true" : "false"])
  );


  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    initialErrors: { nome: "" },
    onSubmit: async (values) => {
      try {
          const response1 = await axios.post(URI.CRIAR_CLIENTE, values);
          const idCliente = response1.data.id;
          await axios.post(URITERMOS.CRIAR_CLIENTE_TERMO, {
            cliente: idCliente,
            termos: idTermo,
            itemTermos: termosAceitosJSON,
          });
        
      } catch (error) {
        console.error("Erro ao criar cliente:", error);
        avisoErro();
      }
    },
  });

 console.log(termosAceitosJSON);
 

  
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
    if (Object.keys(termosAceitosJSON).length === 0) {
      avisoValidateTermo();
    } else {
      const quantidadeTitulosUltimoTermo = Object.keys(ultimoTermo?.itemTermos || {}).length;

      if (quantidadeTitulosUltimoTermo !== Object.keys(termosAceitosJSON).length) {
        avisoValidateTermo();
      } else {
        if (!formik.isValid || formik.errors.confirmPassword) {
          avisoErro();
        } else {
          formik.submitForm();
          avisoConcluido().then(() => navigate('/login'));
        }
      }
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
    setTermoAceito((prevTermoAceito) => ({
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
    setTermoAceito((prevTermoAceito) => ({
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleChangePage = (index: React.SetStateAction<number>, termo:string) => {
    if(termoAceito[termo] !== undefined){      
      setCurrentPage(index);
    }    
  };
  const getColor = (index:any, termo:string) => {
    if(currentPage === index){
      return 'blue'
    }
    else if(termoAceito[termo] === true ){
      return "green" 
    }
    else if(termoAceito[termo] === false){
      return "red"
    }
    else{
      return 'gray'
    }
  }
  

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


            <label style={{ display: "flex", marginLeft: "15px" }} onClick={handleOpenModal}> Concordo com os termos de uso e condições previstas para uso desse website. </label>
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
    </form>
  );
}

export default Cadastro;


