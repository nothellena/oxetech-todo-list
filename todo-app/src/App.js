import React, { useState } from "react";
import Checklist from "./components/Checklist";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [lista, setLista] = useState([]);
  const [id, setId] = useState(0)

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdicionarClick = () => {
    if(input.length > 0) {
      setLista([...lista, { id: id, titulo: input }]);
      setInput("");
      setId(id+1);
    }
  };
  const handleAdicionarEnter = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      setLista([...lista, { id: id, titulo: input }]);
      setInput("");
      setId(id+1)
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
            <Checklist onHandleExcluir={() => handleExcluir(li.id)} key={li.id} input={li.titulo} />
          )): <h4>SEM TAREFAS!</h4>}
        </div>
      </div>
    </div>
  );
}
