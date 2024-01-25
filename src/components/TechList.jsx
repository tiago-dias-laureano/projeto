import { useContext } from "react";
import TechContext from "../context/TechContext";

import styles from "./TechList.module.css";
import TechCard from "./TechCard";

export default function TechList() {
  const { techs } = useContext(TechContext);

  return (
    <div className={styles.bgColorGray}>
      <div className={styles.card}>
        {techs
          ? techs.map((tech) => <TechCard key={tech.id} tech={tech} />)
          : "Nenhuma tecnologia cadastrada :("}
      </div>
    </div>
  );
}
