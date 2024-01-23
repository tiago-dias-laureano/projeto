import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import KenzieTitle from "../components/KenzieTitle";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Digite um email válido para prosseguir"),
  password: z.string().min(6, "Digite uma senha com no mínimo 6 caracteres"),
});

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const makeLogin = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("kenzietoken", res.data.token);
        return navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="bg-gray-4 vh flex">
      <KenzieTitle />

      <div className="card">
        <h3 className="card-title">Login</h3>
        <form className="form" onSubmit={handleSubmit(makeLogin)}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="Digite seu Email"
            className="input"
            {...register("email")}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <label htmlFor="password" className="label">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="input"
            {...register("password")}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <button type="submit" className="btn">
            Entrar
          </button>

          <a href="/register" className="a-link">
            Ainda não possui uma conta?
          </a>
        </form>

        <button className="btn-gray">
          <Link to="/register">Cadastre-se</Link>
        </button>
      </div>
    </div>
  );
}
