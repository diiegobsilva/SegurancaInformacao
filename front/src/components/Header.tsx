import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/auth";

function Header() {
  const profile =  localStorage.getItem('profile')
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Navbar collapseOnSelect className="position-fixed w-100 top-0 background-header">
        <Container className="mb-2">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
            <Nav>
              <Nav.Link href="/">PIZZARIA SAKAUE</Nav.Link>
              <Nav.Link href="/perfil">Meu Perfil</Nav.Link>
              {profile === 'admin' ? 
                <Nav.Link href="/termo">Termos</Nav.Link>
              :  null}
              <Nav.Link onClick={logout} >Sair</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
