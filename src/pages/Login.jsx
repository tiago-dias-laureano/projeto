import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleMakeLogin = (event) => {
    event.preventDefault();
    if (formData.email === "" || formData.password === "") {
      alert("Preencha todos os campos");
      return;
    }

    fetch("https://kenziehub.herokuapp.com/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.status === "error") {
          alert(data.message);
          return;
        } else if (data.token) {
          localStorage.setItem("kenzietoken", data.token);
          return navigate("/dashboard");
        }
      });
    });
  };

  return (
    <div className="bg-gray-4 vh flex">
      <h1 className="login-title">Kenzie Hub</h1>

      <div className="card">
        <h3 className="card-title">Login</h3>
        <form className="form" onSubmit={handleMakeLogin}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="Digite seu Email"
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

          <button type="submit" className="btn">
            Entrar
          </button>

          <a href="http://" className="a-link">
            Ainda não possui uma conta?
          </a>
        </form>

        <button className="btn-gray">
          <Link to="register">Cadastre-se</Link>
        </button>
      </div>
    </div>
  );
}
