import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";

interface Props{
    title: any
    value: any
}

function RenderTermoExite(props: Props) {
  const [titulo, setTitulo] = useState(props.title);
  const [desc, setDesc] = useState(props.value);
  const { termosTemporarios, setTermosTemporarios } = useContext(AuthContext);

console.log(termosTemporarios);

  const handleAddList = () => {
    setTermosTemporarios((prevTemporarios:any) => ({
      ...prevTemporarios,
      [titulo]: desc,
    }));
  };
  const handleRemoverItem = () => {
    delete termosTemporarios[props.title || titulo]
    setTermosTemporarios((prevTemporarios:any) => ({
      ...prevTemporarios
    }));
    
  };

  return (
    <div>
      <input
        type="text"
        className="textTitulo"
        placeholder="Titulo"
        onChange={(e) => setTitulo(e.target.value)}
        defaultValue={titulo}
      />

      <textarea
        className="textArea"
        placeholder="Descrição"
        onChange={(e) => setDesc(e.target.value)}
        defaultValue={desc}
      />
      <button type="button" className="custom-button" onClick={handleAddList}> + </button>
      <button type="button" className="custom-button" onClick={handleRemoverItem}> Remover </button>
    </div>
  );
}

export { RenderTermoExite };