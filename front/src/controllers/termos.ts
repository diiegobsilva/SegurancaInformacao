import Swal from "sweetalert2";

function TermoDados() {
  Swal.fire('Ao se cadastrar, você declara o seu CONSENTIMENTO para coletarmos, tratarmos e armazenarmos dados sobre você quando julgarmos adequados à prestação de nossos serviços, tais como: nome, endereço, gênero, e-mail, telefone e cookies.')
}

function TermoSms() {
  Swal.fire('Ao se cadastrar, você declara o seu CONSENTIMENTO para que utilizemos o seu telefone para fins de marketing, pelo qual ocorrerão as comunicações de envio de SMS contendo promoções e ações de marketing da pizzaria.')

}

function TermoEmail() {
  Swal.fire('Ao se cadastrar, você declara o seu CONSENTIMENTO para que utilizemos o seu e-mail para fins de marketing, pelo qual ocorrerão as comunicações de envio de E-mail contendo promoções e ações de marketing da pizzaria.')

}

function TermoCookies() {
  Swal.fire('Ao se cadastrar, você declara o seu CONSENTIMENTO para que possamos registrar dados de sua visita à plataforma através de cookies e outras tecnologias de rastreamento incluindo seu endereço IP e nome de domínio, a versão do seu navegador e do seu sistema operacional, dados de tráfego online, dados de localização, logs da web e outros dados de navegação. ')

}
export { TermoDados, TermoSms, TermoEmail, TermoCookies }