import React, { useState, useContext } from "react";

import styles from "./TechCard.module.css";
import EditTechModal from "../components/EditTechModal";

import TechContext from "../context/TechContext";

export default function TechCard({ tech }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { deleteTech } = useContext(TechContext);
  return (
    <>
      <div className={styles.item}>
        <div className={styles.name}>{tech.title}</div>

        <div className={styles.right}>
          <div className={styles.status}>{tech.status}</div>
          <div className="actions">
            <button
              onClick={() => setIsOpenModal(!isOpenModal)}
              className={styles.buttonEdit}
            >
              Editar
            </button>
            <button
              onClick={() => deleteTech(tech.id)}
              className={styles.buttonDelete}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      {isOpenModal && (
        <EditTechModal tech={tech} setIsOpenModal={setIsOpenModal} />
      )}
    </>
  );
}
