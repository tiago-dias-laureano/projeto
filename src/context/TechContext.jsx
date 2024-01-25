import { createContext, useState } from "react";

const TechContext = createContext({});

export function TechProvider({ children }) {
  const [techs, setTechs] = useState([]);

  function createTech({ title, status }) {
    if (!title) return alert("Digite o nome da tecnologia");
    if (!status) return alert("Selecione o status da tecnologia");

    const token = localStorage.getItem("kenzietoken");

    fetch("https://kenziehub.herokuapp.com/users/techs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, status }),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
      window.location.reload();
    });
  }

  function editTech(tech, status) {
    if (!status) return alert("Selecione o novo status da tecnologia");

    const token = localStorage.getItem("kenzietoken");

    fetch(`https://kenziehub.herokuapp.com/users/techs/${tech.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
      window.location.reload();
    });
  }
  function deleteTech(techId) {
    const token = localStorage.getItem("kenzietoken");

    fetch(`https://kenziehub.herokuapp.com/users/techs/${techId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status.toString().startsWith("2")) {
        alert("Tecnologia deletada com sucesso");
      } else {
        alert("Erro ao deletar tecnologia");
      }
      window.location.reload();
    });
  }

  return (
    <TechContext.Provider
      value={{
        techs,
        setTechs,
        createTech,
        editTech,
        deleteTech,
      }}
    >
      {children}
    </TechContext.Provider>
  );
}

export default TechContext;
