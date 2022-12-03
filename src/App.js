import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
import api from "./services/api";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    api
      .get("/tarefas")
      .then((res) => {
        setLista(JSON.parse(res.data.replace(/'/g, '"')));
      })
      .catch((erro) => console.log(erro.message));
  });

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdicionarClick = () => {
    if (input.length > 0) {
      const data = new FormData();
      data.append("titulo", input);
      data.append("status", 0);

      api
        .post("/tarefas/cadastrar", data)
        .then((res) => {
          setInput("");
          console.log(res.data.resposta);
        })
        .catch((erro) => console.log(erro.message));
    }
  };

  const handleAdicionarEnter = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      const data = new FormData();
      data.append("titulo", input);
      data.append("status", 0);

      api
        .post("/tarefas/cadastrar", data)
        .then((res) => {
          setInput("");
          console.log(res.data.resposta);
        })
        .catch((erro) => console.log(erro.message));
    }
  };

  const handleExcluir = (id_tarefa) => {
    api
      .delete(`/tarefas/${id_tarefa}/deletar`)
      .then((res) => {
        console.log(res.data.resposta);
        const remove = [...lista].filter(
          (todo) => todo.id_tarefa !== id_tarefa
        );
        setLista(remove);
      })
      .catch((erro) => console.log(erro.message));
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
          {lista.length > 0 ? (
            lista.map((li) => (
              <Checklist
                onHandleExcluir={() => handleExcluir(li.id_tarefa)}
                id={li.id_tarefa}
                input={li.titulo}
                status={li.status}
              />
            ))
          ) : (
            <h4>SEM TAREFAS!</h4>
          )}
        </div>
      </div>
    </div>
  );
}
