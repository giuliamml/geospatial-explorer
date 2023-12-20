import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Logo from "../../assets/constellr-logo.svg";
import styles from "./Navbar.module.css";

const NavbarComp = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className={styles.container}>
        <Navbar.Brand href="/">
          <img className={styles.logo} src={Logo} alt="Logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
