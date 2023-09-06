import Header from "./components/Header";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import ListagemCliente from "./pages/Listagem";
import EditarCliente from "./pages/Editar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import TelaComprar from "./pages/TelaComprar";

function App() {

  return (
    <>
      <div className="bg-div">

        <Header /> 

        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
          
          <div className='container bg-light-opacity rounded mx-auto' style={{padding:"2rem"}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/listagem" element={<ListagemCliente />} />
                <Route path="editar/:id" element={<EditarCliente />} />
                <Route path="/comprar" element={<TelaComprar />} />
            </Routes>
          </div>
              
        </div>
        
      </div> 
    

    </>  
  );
}

export default App;



 
