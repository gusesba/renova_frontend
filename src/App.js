import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import Sells from "./pages/Sells";
import Product from "./pages/Product";

function App() {
  return (
    <div style={{ height: "92vh" }}>
      <Topbar />
      <div style={{ height: "100%", display: "flex" }}>
        <Sidebar />
        <BrowserRouter>
          <Routes>
            <Route path="/products" exact element={<Products />} />
            <Route path="/sells" exact element={<Sells />} />
            <Route path="/clients" exact element={<Clients />} />
            <Route path="/client/:id" exact element={<Client />} />
            <Route path="/product/:id" exact element={<Product />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
