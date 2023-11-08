import Header from "./components/Header";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";


import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import TelaComprar from "./pages/TelaComprar";
import { AuthContext, Private } from "./contexts/auth"; 
import Termo from "./pages/Termo";
import AlterarSenha from "./pages/AlterarSenha";
import { useContext } from "react";

function App() {
  const { authenticated } = useContext(AuthContext);
  return (
  
        <div className="bg-div">
          {authenticated === true ?  <Header/> : null}
          <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
            <div className='container bg-light-opacity rounded mx-auto' style={{padding:"2rem"}}>
              <Routes>
                <Route path="/cadastro" element={<Cadastro/>} />
                <Route path="/" element={<Private><Home /></Private>} />
                <Route path="/perfil" element={<Private><Perfil /></Private>} />
                <Route path="/comprar" element={<Private><TelaComprar /></Private>} />
                <Route path="/senha" element={<Private><AlterarSenha /></Private>} />
                <Route path="/login" element={<Login />} />
                <Route path="/termo" element={<Private><Termo /></Private>} />
              </Routes>
            </div>
          </div>
        </div>
    
  );
}

export default App;
