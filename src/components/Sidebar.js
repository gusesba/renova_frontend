import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { useGlobalContext } from "../context";

const Sidebar = () => {
  const { isSidebarCollapsed } = useGlobalContext();
  return (
    <>
      <ProSidebar
        collapsedWidth="0px"
        collapsed={isSidebarCollapsed}
        style={{ backgroundColor: "#FFF" }}
        breakPoint="md"
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Renova
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              onClick={() => (window.location = "/products")}
              icon={<FaGem />}
            >
              Produtos
            </MenuItem>
            <MenuItem
              onClick={() => (window.location = "/clients")}
              icon={<FaGem />}
            >
              {" "}
              Clientes
            </MenuItem>
            <MenuItem
              onClick={() => (window.location = "/sells")}
              icon={<FaGem />}
            >
              {" "}
              Vendas
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <span>Renova</span>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
