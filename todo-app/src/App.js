import React, { useState } from "react";
import Checklist from "./components/Checklist";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [lista, setLista] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdicionarClick = () => {
    if(input.length > 0) {
      setLista([...lista, { id: Math.floor(Math.random()*65536), titulo: input }]);
      setInput("");
    }
  };
  const handleAdicionarEnter = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      setLista([...lista, { id: Math.floor(Math.random()*65536), titulo: input }]);
      setInput("");
    }
  };

  const handleExcluir = (id) => {
    const remove = [...lista].filter(todo => todo.id !== id)

    setLista(remove)
  };

  return (
    <div className="container">
      <div className="content">
        <img
          className="logoImg"
          src="assets/logoOxetech.svg"
          alt="Logo do Oxetech"
        />
        <h1>TODO LIST</h1>
        <div className="adicionar">
          <input
            type="text"
            placeholder="Adicione afazer..."
            value={input}
            onChange={handleInput}
            onKeyPress={handleAdicionarEnter}
          />
          <img
            className="botao"
            src="assets/botaoAdicionar.svg"
            alt="Adicionar afazer"
            onClick={handleAdicionarClick}
           
          />
        </div>
        <div className="lista">
          { lista.length > 0? lista.map(li => (
            <Checklist onHandleExcluir={handleExcluir} key={li.id} input={li.titulo} />
          )): <h4>SEM AFAZERES</h4>}
        </div>
      </div>
    </div>
  );
}
