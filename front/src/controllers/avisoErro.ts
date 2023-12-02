import Swal from "sweetalert2";

function avisoErro() {
  Swal.fire({
    title: "Erro",
    text: "Preencha corretamente todos os campos antes de enviar!",
    icon: "error",
    confirmButtonColor: "#54C5CE",
  });
} 

function avisoErroDeletar() {
  Swal.fire({
    icon: "error",
    title: "Ocorreu um erro!",
    text: "Não foi possível excluir o chamado.",
  });
}

function avisoValidateTermo() {
  Swal.fire({
    icon: "error",
    title: "Ocorreu um erro!",
    text: "É necessario preencher todos os termos",
  });
}

function avisoErroLogin(){
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: 'Não foi possível realizar o login.',
  })
}
export { avisoErro, avisoErroDeletar, avisoErroLogin, avisoValidateTermo };