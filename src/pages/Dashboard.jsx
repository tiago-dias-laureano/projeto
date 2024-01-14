import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

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
        }
      });
    });
  }, []);

  function removeToken() {
    localStorage.removeItem("kenzietoken");
    navigate("/");
  }
  return (
    <div className="bg-gray-4 vh ">
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
          <h2 className="h2-white">Que pena! Estamos em desenvolvimento :(</h2>
          <p className="p-white">
            Nossa aplicação está em desenvolvimento, em breve teremos novidades
          </p>
        </div>
      </div>
    </div>
  );
}
