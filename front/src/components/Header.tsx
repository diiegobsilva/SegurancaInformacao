import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function Header() {
  return (
    <>
      <Navbar collapseOnSelect className="position-fixed w-100 top-0 background-header">
        <Container className="mb-2">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
            <Nav>
              <Nav.Link href="/">PIZZARIA SAKAUE</Nav.Link>
              <Nav.Link href="">Meu Perfil</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
