import React, { useState } from "react";

interface Props{
    title: any
    value: any
}

function RenderTermoExite(props: Props) {
  const [titulo, setTitulo] = useState(props.title);
  const [desc, setDesc] = useState(props.value);

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
    </div>
  );
}

export { RenderTermoExite };