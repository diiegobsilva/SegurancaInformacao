import Header from "./components/Header";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";


import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import TelaComprar from "./pages/TelaComprar";
import { Private } from "./contexts/auth"; 
import Termo from "./pages/Termo";

function App() {
  return (
  
        <div className="bg-div">
          
          <Private><Header/></Private>
          
          <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
            <div className='container bg-light-opacity rounded mx-auto' style={{padding:"2rem"}}>
              <Routes>
                <Route path="/" element={<Private><Home /></Private>} />
                <Route path="/perfil" element={<Private><Perfil /></Private>} />
                <Route path="/comprar" element={<Private><TelaComprar /></Private>} />
                <Route path="/cadastro" element={<Cadastro/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/termo" element={<Termo />} />
              </Routes>
            </div>
          </div>
        </div>
    
  );
}

export default App;
