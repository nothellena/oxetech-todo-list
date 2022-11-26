import React, { useState } from "react";
import "./styles.css";



export default function Check(props) {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(!check)
  }


  return (
    <div className="check">
      <label key={props.key}>
        <input type="checkbox" checked={check} onClick={handleCheck} />
        <span>{props.input}</span>
      </label>
      <img src="/assets/lixeira.svg" alt="excluir" onClick={props.onHandleExcluir} />
    </div>
  );
}

