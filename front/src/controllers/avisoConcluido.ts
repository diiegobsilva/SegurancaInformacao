import Swal, { SweetAlertResult } from "sweetalert2";

function avisoConcluido(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Solicitação enviada com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

function avisoSenhaAlterada(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Senha alterada com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

function avisoPerfilAlterada(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Sucesso",
    text: "Perfil alterado com sucesso!",
    icon: "success",
    confirmButtonColor: "#54C5CE",
  });
}

async function avisoDeletar(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Deletar seu perfil?",
    text: "Essa ação não pode ser revertida",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, quero deletar",
  });
}

function avisoErroDeletar() {
  Swal.fire({
    icon: "error",
    title: "Ocorreu um erro!",
    text: "Não foi possível excluir.",
  });
}

function avisoAtualizacaoTermo() {
  Swal.fire({
    icon: "warning",
    title: "Atualização!",
    text: "Os termos foram atualizado!.",
  });
}

function avisoErroAlterarSenha() {
  Swal.fire({
    icon: "error",
    title: "Ocorreu um erro!",
    text: "A nova senha não bate com a confirmação feita.",
  });
}

export { avisoConcluido, avisoSenhaAlterada, avisoDeletar, avisoErroDeletar, avisoErroAlterarSenha, avisoAtualizacaoTermo, avisoPerfilAlterada};