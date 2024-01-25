import styles from "./CreateTechModal.module.css";
import { useState, useContext } from "react";

import TechContext from "../context/TechContext";

export default function CreateTechModal({ setIsOpenModal }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Iniciante");

  const { createTech } = useContext(TechContext);

  return (
    <div className={styles.modal} id="modal">
      <h3 className={styles.header}>
        <div>Cadastrar tecnologia</div>

        <button className={styles.close} onClick={() => setIsOpenModal(false)}>
          X
        </button>
      </h3>
      <div className={styles.body}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className={styles.input}
          placeholder="Tecnologia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="status">Selecionar status</label>
        <select
          name="status"
          id="status"
          className={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>

        <button
          onClick={() => createTech({ title, status })}
          className={styles.button}
        >
          Cadastrar Tecnologia
        </button>
      </div>
    </div>
  );
}
