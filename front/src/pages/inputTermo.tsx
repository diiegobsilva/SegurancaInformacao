


function InputTermo (titulo:string,descricao:string, setTitulo:Function, setDescricao:Function) {

    return(
        <div>
            <input placeholder="Titulo" onChange={(e)=> {setTitulo(e)}} value={titulo}/>
            <textarea
            className="textArea"
            onChange={(e) => {setDescricao(e)}}
            value={descricao}
            />
      </div>
    )
}

export default InputTermo;