import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { AiOutlineMenu, AiOutlineInstagram } from "react-icons/ai";
import { useGlobalContext } from "../context";

const Topbar = () => {
  const {
    setIsSidebarCollapsed,
    isSidebarCollapsed,
    pageName,
  } = useGlobalContext();
  return (
    <>
      <Navbar className="color-nav">
        <Container>
          <AiOutlineMenu
            className="collapse-sidebar-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <Navbar.Brand className="me-auto teste" href="#">
            Renova
          </Navbar.Brand>
          <h2 className="page-name">{pageName}</h2>
          <AiOutlineInstagram
            className="instagram"
            onClick={() => {
              window.open(
                "https://www.instagram.com/renova_sustentavel_curitiba/"
              );
            }}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default Topbar;
