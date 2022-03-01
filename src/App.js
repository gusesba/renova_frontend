import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import Sells from "./pages/Sells";

function App() {
  return (
    <div style={{ height: "92vh" }}>
      <Topbar />
      <div style={{ height: "100%", display: "flex" }}>
        <Sidebar />
        <BrowserRouter>
          <Routes>
            <Route path="/products" exact element={<Products />} />
            <Route path="/clients" exact element={<Clients />} />
            <Route path="/sells" exact element={<Sells />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
