import React, { useState, useEffect } from "react";
import Checklist from "./components/Checklist";
import api from "./services/api";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [lista, setLista] = useState([]);
  const [id_tarefa, setId_tarefa] = useState(null);

  useEffect(() => {
    api
      .get("/tarefas")
      .then((res) => {
        setLista(JSON.parse(res.data.replace(/'/g, '"')));
      })
      .catch((erro) => console.log(erro.message));
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdicionarClick = () => {

    if (input.length > 0) {
      const data = new FormData();
      data.append("id_tarefa", id_tarefa);
      data.append("titulo", input);
      data.append("status", 0);

      api.post("/tarefas/cadastrar", data)
        .then((res) => {
          setLista([...lista, { id_tarefa: id_tarefa, titulo: input }]);
          setInput("");
          setId_tarefa(id_tarefa + 1);

          console.log(res);
        })
        .catch((erro) => console.log(erro.message));
    }
  };

  const handleAdicionarEnter = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      const data = new FormData();
      data.append("id_tarefa", id_tarefa);
      data.append("titulo", input);
      data.append("status", 0);

      api.post("/tarefas/cadastrar", data)
        .then((res) => {
          setLista([...lista, { id_tarefa: id_tarefa, titulo: input }]);
          setInput("");
          setId_tarefa(id_tarefa + 1);

          console.log(res);
        })
        .catch((erro) => console.log(erro.message));
    }
  };

  const handleExcluir = (id_tarefa) => {
    api
      .delete(`/tarefas/${id_tarefa}/deletar`)
      .then((res) => {
        console.log(res);
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
