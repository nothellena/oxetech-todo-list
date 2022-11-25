import React, { useState } from "react";
import "./styles.css";



export default function Check(props) {
  const [check, setCheck] = useState(false);

  

  return (
    <div className="check">
      <input type="checkbox" name="check" />
      <h4 key={props.key} >{props.input}</h4>
      <img src="/assets/lixeira.svg" alt="excluir" onClick={props.onHandleExcluir} />
    </div>
  );
}
