import React, { useEffect, useState } from 'react';
import "../App.css";
import pizza1 from "../images/pizza1.jpg";
import pizza2 from "../images/pizza2.jpg";
import pizza3 from "../images/pizza3.jpg";
import pizza4 from "../images/pizza4.jpg";
import pizza5 from "../images/pizza5.jpg";
import pizza6 from "../images/pizza6.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URITERMOS } from '../enumerations/uri';


interface PizzaQuantities {
  [key: string]: number;
}

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
      const id = (localStorage.getItem("id") || "").replace(/['"]+/g, '');
      async function get(){
        const response = await axios.get(`${URITERMOS.CLIETE_TERMO_ATUALIZA}${id}`)
        console.log(response.data);
      
        if(response.data.atualizacao === true){ 
          navigate('/perfil')
        }
     }
     
    get()
      
    },[])

  const [pizzaQuantities, setPizzaQuantities] = useState<PizzaQuantities>({
    pizza1: 0,
    pizza2: 0,
    pizza3: 0,
    pizza4: 0,
    pizza5: 0,
    pizza6: 0,
  });

  const aumentarQuantidade = (pizza: string) => {
    setPizzaQuantities(prevQuantities => ({
      ...prevQuantities,
      [pizza]: prevQuantities[pizza] + 1
    }));
  };

  const diminuirQuantidade = (pizza: string) => {
    if (pizzaQuantities[pizza] > 0) {
      setPizzaQuantities(prevQuantities => ({
        ...prevQuantities,
        [pizza]: prevQuantities[pizza] - 1
      }));
    }
  };

  return (
    <div className="home-container">
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">CARDÁPIO</h1>
        <div style={{ letterSpacing: 0, fontSize: 18 }}>Inicie o seu pedido escolhendo uma deliciosa pizza do nosso cardápio. Sinta-se à vontade!</div>
      </div>

      <div className="menu-items">
        <div className="menu-column">
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza1} alt="Calabresa e Brócolis" />
              <div className="item-details">
                <h3 className="item-name">Calabresa e Brócolis</h3>
                <div className="quantity-controls">
                  <button onClick={() => diminuirQuantidade('pizza1')}>-</button>
                  <span>{pizzaQuantities['pizza1']}</span>
                  <button onClick={() => aumentarQuantidade('pizza1')}>+</button>
                </div>
              </div>
              <p className="item-description">Calabresa, Queijo e Brócolis</p>
            </div>
          </div>
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza2} alt="Napolitana" />
              <div className="item-details">
                <h3 className="item-name">Napolitana</h3>
                <div className="quantity-controls">
                  <button onClick={() => diminuirQuantidade('pizza2')}>-</button>
                  <span>{pizzaQuantities['pizza2']}</span>
                  <button onClick={() => aumentarQuantidade('pizza2')}>+</button>
                </div>
              </div>
              <p className="item-description">Queijo e Pepperoni</p>
            </div>
          </div>
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza3} alt="Brócolis e Queijo Provolone" />
              <div className="item-details">
                <h3 className="item-name">Brócolis e Queijo Branco</h3>
                <div className="quantity-controls">
                  <button onClick={() => diminuirQuantidade('pizza3')}>-</button>
                  <span>{pizzaQuantities['pizza3']}</span>
                  <button onClick={() => aumentarQuantidade('pizza3')}>+</button>
                </div>
              </div>
              <p className="item-description">Brócolis e Queijo Branco</p>
            </div>
          </div>
        </div>

        <div className="menu-column">
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza4} alt="Clássica" />
              <div className="item-details">
                <h3 className="item-name">Clássica</h3>
                <div className="quantity-controls">
                  <button onClick={() => diminuirQuantidade('pizza4')}>-</button>
                  <span>{pizzaQuantities['pizza4']}</span>
                  <button onClick={() => aumentarQuantidade('pizza4')}>+</button>
                </div>
              </div>
              <p className="item-description">Queijo e Presunto</p>
            </div>
          </div>
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza5} alt="Calabresa e Brócolis" />
              <div className="item-details">
                <h3 className="item-name">Brócolis e Queijo Provolone</h3>
                <div className="quantity-controls">
                  <button onClick={() => diminuirQuantidade('pizza5')}>-</button>
                  <span>{pizzaQuantities['pizza5']}</span>
                  <button onClick={() => aumentarQuantidade('pizza5')}>+</button>
                </div>
              </div>
              <p className="item-description">Brócolis, Queijo Provolone e Queijo Minas</p>
            </div>
          </div>
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza6} alt="Calabresa" />
              <div className="item-details">
                <h3 className="item-name">Calabresa</h3>
                <div className="quantity-controls">
                  <button onClick={() => diminuirQuantidade('pizza6')}>-</button>
                  <span>{pizzaQuantities['pizza6']}</span>
                  <button onClick={() => aumentarQuantidade('pizza6')}>+</button>
                </div>
              </div>
              <p className="item-description">Calabresa, Cebola e Tomate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container d-flex justify-content-center mt-4">
        <button type="button" className="buttonHome" onClick={() => navigate('/comprar')} >Comprar</button>
     </div>
    </div>
  );
}

export default Home;