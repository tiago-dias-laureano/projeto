import { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Dashboard.module.css";

import TechContext from "../context/TechContext";

import TechList from "../components/TechList";
import CreateTechModal from "../components/CreateTechModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { setTechs } = useContext(TechContext);

  useEffect(() => {
    const token = localStorage.getItem("kenzietoken");
    if (!token) {
      return navigate("/");
    }

    fetch("https://kenziehub.herokuapp.com/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (data) {
          setProfile(data);
          setTechs(data.techs);
        }
      });
    });
  }, []);

  function removeToken() {
    localStorage.removeItem("kenzietoken");
    navigate("/");
  }

  return (
    <div className="bg-gray-4 vh">
      {isOpenModal && <CreateTechModal setIsOpenModal={setIsOpenModal} />}

      <div className="border-b">
        <div className="container flex-row">
          <h2 className="logo">Kenzie Hub</h2>

          <button className="logout-btn" onClick={removeToken}>
            Sair
          </button>
        </div>
      </div>

      <div className="border-b">
        <div className="container flex-row">
          <h2 className="h2-white">Olá, {profile.name}</h2>
          <p className="p-white">{profile.course_module}</p>
        </div>
      </div>

      <div className="border-b">
        <div className="container">
          <div className="flex-row">
            <h3 className="h2-white">Tecnologias</h3>
            <button
              className={styles.buttonMore}
              onClick={() => setIsOpenModal(!isOpenModal)}
            >
              +
            </button>
          </div>
          <TechList />
        </div>
      </div>
    </div>
  );
}
