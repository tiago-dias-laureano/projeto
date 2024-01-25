import styles from "./CreateTechModal.module.css";
import { useState, useContext } from "react";

import TechContext from "../context/TechContext";

export default function CreateTechModal({ setIsOpenModal, tech }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Iniciante");

  const { editTech } = useContext(TechContext);

  return (
    <div className={styles.modal} id="modal">
      <h3 className={styles.header}>
        <div>Tecnologia Detalhes</div>
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
          value={tech ? tech.title : title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />

        <label htmlFor="status">Selecionar status</label>
        <select
          name="status"
          id="status"
          className={styles.input}
          value={tech ? tech.status : status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>

        <button
          onClick={() => editTech(tech, status)}
          className={styles.button}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
