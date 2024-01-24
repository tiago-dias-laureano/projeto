import { useNavigate } from "react-router-dom";
import KenzieTitle from "../components/KenzieTitle";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import Input from "../components/Input";

const formSchema = z.object({
  email: z.string().email("Digite um email válido para prosseguir"),
  password: z.string().min(6, "Digite uma senha com no mínimo 6 caracteres"),
  confirm_password: z
    .string()
    .min(6, "Digite uma senha com no mínimo 6 caracteres"),
  name: z.string().min(3, "Digite um nome com no mínimo 3 caracteres"),
  bio: z.string().min(3, "Digite uma bio com no mínimo 3 caracteres"),
  contact: z.string().min(3, "Digite um contato com no mínimo 3 caracteres"),
  course_module: z
    .string()
    .min(3, "Digite um módulo com no mínimo 3 caracteres"),
});

export default function Register() {
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
      confirm_password: "",
      name: "",
      bio: "",
      contact: "",
      course_module: "Primeiro módulo (Introdução ao Frontend)",
    },
  });

  const makeRegister = (data) => {
    console.log(data);
    if (data.password !== data.confirm_password) {
      alert("As senhas não coincidem");
      return;
    }

    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((res) => {
        console.log(res.data);
        return navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="bg-gray-4 vh flex">
      <KenzieTitle />

      <div className="card">
        <h3 className="card-title">Crie sua conta</h3>
        <p className="p">Rapido e grátis, vamos nessa</p>
        <form className="form" onSubmit={handleSubmit(makeRegister)}>
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            register={register}
            type={"text"}
            zodName={"name"}
          />

          {errors.name && <span className="error">{errors.name.message}</span>}

          <Input
            label="Email"
            placeholder="Digite seu email"
            register={register}
            type={"email"}
            zodName={"email"}
          />

          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            register={register}
            type={"password"}
            zodName={"password"}
          />

          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <Input
            label="Confirmar senha"
            placeholder="Digite novamente sua senha"
            register={register}
            type={"password"}
            zodName={"confirm_password"}
          />

          {errors.confirm_password && (
            <span className="error">{errors.confirm_password.message}</span>
          )}

          <Input
            label="Bio"
            placeholder="Fale sobre você"
            register={register}
            type={"text"}
            zodName={"bio"}
          />

          {errors.bio && <span className="error">{errors.bio.message}</span>}

          <Input
            label="Contato"
            placeholder="Opção de contato"
            register={register}
            type={"text"}
            zodName={"contact"}
          />

          {errors.contact && (
            <span className="error">{errors.contact.message}</span>
          )}

          <label htmlFor="">Selecionar módulo</label>
          <select
            name=""
            id=""
            className="input"
            {...register("course_module")}
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
          {errors.course_module && (
            <span className="error">{errors.course_module.message}</span>
          )}

          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
