import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { StyledNav } from './HeaderStyles';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    navigate(url)
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => handleNavigation("/")}>Cocktail Quiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"> 
            <Nav.Link href="">Quizzes</Nav.Link>
            <Nav.Link onClick={() => handleNavigation("/all-cocktails")}>All Cocktails</Nav.Link>
          </Nav>
          <StyledNav>
            <Nav.Link href="">Profile</Nav.Link>
            <Button variant="outline-primary">New Quiz</Button>
          </StyledNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header