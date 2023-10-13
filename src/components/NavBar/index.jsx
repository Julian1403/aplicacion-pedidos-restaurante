import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown'; no lo necesito
//debo importar navlink yo mismo:
import { NavLink } from 'react-router-dom';//esto es lo que reemplaza el href en react

function NavBarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="#home">Pedidos del restaurante de Janro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Dahboard</Nav.Link> */}
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/pedidos" className="nav-link">Pedidos</NavLink>
            <NavLink to="/productos" className="nav-link">Productos</NavLink>
            <NavLink to="/categorias" className="nav-link">Categorias</NavLink>
            {/* <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink> esto para hacer la navegacion interna entre rutas */}
    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;//exporto el NavBarcomponent