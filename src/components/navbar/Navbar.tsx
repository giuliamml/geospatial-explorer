import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/constellr-logo.svg";
import styles from "./Navbar.module.css";

const NavbarComp = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className={styles.container}>
        <Navbar.Brand href="/">
          <img className={styles.logo} src={Logo} alt="Logo" />
        </Navbar.Brand>
        {/* <Nav className={styles.linksWrapper}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
          >
            Analytics
          </NavLink>
        </Nav> */}
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
