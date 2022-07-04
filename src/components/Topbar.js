import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { AiOutlineMenu, AiOutlineInstagram } from "react-icons/ai";
import { useGlobalContext } from "../context/context";

const Topbar = () => {
  const { setIsSidebarCollapsed, isSidebarCollapsed, pageName } =
    useGlobalContext();
  return (
    <>
      <Navbar className="color-nav     background-main-gray">
        <Container>
          <AiOutlineMenu
            className="collapse-sidebar-btn    cursor-pointer transition-fast expand-icon icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <Navbar.Brand className="me-auto" href="#">
            Renova
          </Navbar.Brand>
          <h2 className="page-name">{pageName}</h2>
          <AiOutlineInstagram
            className="instagram      cursor-pointer icon expand transition-fast"
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
