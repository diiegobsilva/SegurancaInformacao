import React from "react";
import "../App.css";
import clsx from "clsx";

function Home() {
 
  const menuItems = [
    {
      name: "Pizza de Pepperoni",
      description: "Molho de tomate, queijo derretido e pepperoni.",
      price: "$12.99",
      imageUrl: "https://example.com/pizza-pepperoni.jpg", 
    },
    {
      name: "Pizza Vegetariana",
      description: "Molho de tomate, queijo, pimentão, cebola, cogumelos e azeitonas.",
      price: "$11.99",
      imageUrl: "https://example.com/pizza-vegetariana.jpg", 
    },

  ];

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="headline">Bem-vindo à Pizzaria Do Sakaue!</h1>
        <p className="subheadline">A melhor pizza da cidade, entregue na sua porta.</p>
      </header>

      <section className="special-pizza">

      </section>

      <section className="menu">
        <h2 className="section-title">Nosso Menu</h2>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div className="menu-item-card" key={index}>
              <div className="menu-item-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className="menu-item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <span className="item-price">{item.price}</span>
                <button className="order-button">Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact">

      </section>
    </div>
  );
}

export default Home;