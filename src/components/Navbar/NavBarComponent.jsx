import { configRuteFile } from "../../routes/configRuteFile";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { types } from "../../context/user/userReducer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user/userContext";
import OffcanvasComponent from "../Offcanvas/OffcanvasComponent";

import "./NavBarComponent.css";

export const NavBarComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user] = useContext(UserContext);
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.user) {
      const user = sessionStorage.getItem("user");

      if (user) {
        dispatch({
          type: types.setUserState,
          payload: JSON.parse(user),
        });
      }
    }
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary container-navbar">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={configRuteFile("logo.png")} alt="" width={75} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Link to="/ProductsList" className="nav-link">
                Productos en venta
              </Link>
              {!user?.user ? (
                <>
                  <Link to="/RegisterFormPage" className="nav-link">
                    Regístrate
                  </Link>
                  <Link to="/LoginFormPage" className="nav-link">
                    Inicia sesión
                  </Link>
                </>
              ) : (
                <></>
              )}
            </Nav>
            <Link to="/PerfilPage" className="nav-link">
              Perfil
            </Link>
            <OffcanvasComponent
              // eslint-disable-next-line no-undef
              handleShow={handleShow}
              // eslint-disable-next-line no-undef
              handleClose={handleClose}
              // eslint-disable-next-line no-undef
              show={show}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
