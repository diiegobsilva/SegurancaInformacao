import "../App.css";
import pizza1 from "../images/pizza1.jpg";
import pizza2 from "../images/pizza2.jpg";
import pizza3 from "../images/pizza3.jpg";
import pizza4 from "../images/pizza4.jpg";
import pizza5 from "../images/pizza5.jpg";
import pizza6 from "../images/pizza6.jpg";

function Home() {

  return (
    <div className="home-container">
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">CARDÁPIO</h1>
        <div style={{ letterSpacing: 0, fontSize: 18}}>Inicie o seu pedido escolhendo uma deliciosa pizza do nosso cardápio. Sinta-se à vontade!</div>
      </div>


      <div className="menu-items">
        <div className="menu-column">
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza1} alt="Brócolis e Queijo Branco" />
              <h3 className="item-name">Calabresa e Brócolis</h3>
              <p className="item-description">Calabresa, Queijo e Brócolis</p>
            </div>
            <div className="menu-item-image">
              <img src={pizza2} alt="Napolitana" />
              <h3 className="item-name">Napolitana</h3>
              <p className="item-description">Queijo e Pepperoni</p>
            </div>
            <div className="menu-item-image">
              <img src={pizza3} alt="Brócolis e Queijo Provolone" />
              <h3 className="item-name">Brócolis e Queijo Branco</h3>
              <p className="item-description">Brócolis e Queijo Branco</p>
            </div>
          </div>
        </div>

        <div className="menu-column">
          <div className="menu-item-card">
            <div className="menu-item-image">
              <img src={pizza4} alt="Clássica" />
              <h3 className="item-name">Clássica</h3>
              <p className="item-description">Queijo e Presunto</p>
            </div>
            <div className="menu-item-image">
              <img src={pizza5} alt="Calabresa e Brócolis" />
              <h3 className="item-name">Brócolis e Queijo Provolone</h3>
              <p className="item-description">Brócolis, Queijo Provolone e Queijo Minas</p>
            </div>
            <div className="menu-item-image">
              <img src={pizza6} alt="Calabresa" />
              <h3 className="item-name">Calabresa</h3>
              <p className="item-description">Calabresa, Cebola e Tomate</p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-form" >Comprar</button>
    </div>
  );
}

export default Home;