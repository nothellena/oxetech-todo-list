import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function Check(props) {
  const [check, setCheck] = useState(props.status === "1");

  const handleCheck = () => {
    const data = new FormData();
    data.append("status", check ? 0 : 1);
    data.append("titulo", props.input);
    data.append("id_tarefa", props.id);

    api.put(`/tarefas/${props.id}/atualizar`, data)
      .then((res) => {
        setCheck(!check);
        console.log(res);
      })
      .catch((erro) => console.log(erro.message));
  };

  return (
    <div className="check">
      <label key={props.id}>
        <input type="checkbox" checked={check} onClick={handleCheck} />
        <span>{props.input}</span>
      </label>
      <img
        src="/assets/lixeira.svg"
        alt="excluir"
        onClick={props.onHandleExcluir}
      />
    </div>
  );
}
