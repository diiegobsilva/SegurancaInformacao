import "../App.css";
import pizza5 from "../images/pizza5.jpg";
import pizza3 from "../images/pizza3.jpg";
import pizza2 from "../images/pizza2.jpg";

function TelaComprar() {



  const calculateTotal = (pizzas: any) => {
    let total = 0;
    for (const pizza of pizzas) {
      total += pizza.price;
    }
    return total;
  };

  return (
    <form>
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">Comprar</h1>
        <div className="text-gray-500 fs-6 font-padrao-titulo mb-5" style={{ letterSpacing: 0 }}>Preencha os campos para realizar sua Compra!</div>
      </div>

      <div className="d-flex">
        <div className="col-lg-4">
          <div className="menu-column">
                <img src={pizza3} alt="Brócolis e Queijo Provolone" />
                <p className="item-description"> Brócolis e Queijo Provolone</p>
                <h5 className="item-name">Preço: 35,00 R$</h5>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="menu-column">
                <img src={pizza5} alt="Calabresa e Brócolis" />
                <p className="item-description">Brócolis e Queijo Branco</p>
                <h5 className="item-name">Preço: 45,00 R$</h5>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="menu-column">
                <img src={pizza2} alt="Calabresa, Cebola e Tomates" />
                <p className="item-description">Calabresa, Cebola e Tomate</p>
                <h5 className="item-name">Preço: 45,00 R$</h5>
          </div>
        </div>
      </div>

      <div className="input-container">
        <div className="col-lg-6 total-input">
          <label>Total:</label>
          <input type="text" value={'125,00 R$'} readOnly />
        </div>
        <div className="col-lg-6 forma-pagamento-input">

          <div className="checkbox-container">
          <div className="form-pagamento-label">
            <label className="form-label">Forma de Pagamento:</label>
          </div>
            <label>
              <input type="checkbox" /> Cartão
            </label>
            <label>
              <input type="checkbox" /> Pix
            </label>
            <label>
              <input type="checkbox" /> Dinheiro
            </label>
          </div>
        </div>
        </div>
      <div className="button-container d-flex justify-content-center mt-4">
        <button type="button" className="buttonFinalizar" >Finalizar Compra</button>
     </div>
    </form>
  );
}

export default TelaComprar;
