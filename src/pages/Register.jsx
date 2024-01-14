import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    bio: "",
    contact: "",
    course_module: "Primeiro módulo (Introdução ao Frontend)",
  });

  const handleMakeRegister = (event) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirm_password === "" ||
      formData.bio === "" ||
      formData.contact === "" ||
      formData.course_module === ""
    ) {
      alert("Preencha todos os campos");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      alert("As senhas não coincidem");
    }

    fetch("https://kenziehub.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      response.json().then((data) => {
        if (data.status === "error") {
          alert(data.message);
          return;
        } else if (data.id) {
          return navigate("/");
        }
      });
    });
  };

  return (
    <div className="bg-gray-4 vh flex">
      <h1 className="login-title">Kenzie Hub</h1>

      <div className="card">
        <h3 className="card-title">Crie sua conta</h3>
        <p className="p">Rapido e grátis, vamos nessa</p>
        <form className="form" onSubmit={handleMakeRegister}>
          <label htmlFor="nome" className="label">
            Nome
          </label>
          <input
            type="text"
            placeholder="Digite seu nome"
            className="input"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="input"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />

          <label htmlFor="password" className="label">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="input"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />

          <label htmlFor="confirm-passowrd" className="label">
            Confirmar senha
          </label>
          <input
            type="password"
            placeholder="Digite novamente sua senha"
            className="input"
            required
            onChange={(e) =>
              setFormData({ ...formData, confirm_password: e.target.value })
            }
            value={formData.confirm_password}
          />

          <label htmlFor="nome" className="label">
            Bio
          </label>
          <input
            type="text"
            placeholder="Fale sobre você"
            className="input"
            required
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            value={formData.bio}
          />

          <label htmlFor="nome" className="label">
            Contato
          </label>
          <input
            type="text"
            placeholder="Opção de contato"
            className="input"
            required
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            value={formData.contact}
          />

          <label htmlFor="">Selecionar módulo</label>
          <select
            name=""
            id=""
            className="input"
            onChange={(e) =>
              setFormData({ ...formData, course_module: e.target.value })
            }
            value={formData.course_module}
          >
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
            <option value="Sexto Módulo - Frontend avançado">
              Sexto Módulo - Frontend avançado
            </option>
          </select>

          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
