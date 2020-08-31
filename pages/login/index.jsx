import React, { useState, useEffect } from "react";
import TokenService from "../../services/token.service";
import { useAuth } from "../../services/authcontext.service";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";
import FormLogin from "./FormLogin";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
      usuario {
        nombre
        apellido
        email
      }
    }
  }
`;

const Login = () => {
  const tokenService = new TokenService();
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  const [mensaje, setMensaje] = useState(null);
  const [, authDispatch] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (router.query.tokenValid === "false") {
      tokenService.borrarToken();
      authDispatch({
        type: "removeDetallesAutenticacion",
      });
      setMensaje("Sesion expirada, inicia denuevo");
    }
  }, [router]);

  async function handleSubmit(values) {
    // console.log(values);
    try {
      setMensaje("Autenticando...");
      const { data } = await autenticarUsuario({
        variables: {
          input: { ...values },
        },
      });
      if (data.autenticarUsuario) {
        try {
          tokenService.guardarToken(data.autenticarUsuario.token);
          authDispatch({
            type: "setDetallesAutenticacion",
            payload: {
              ...data.autenticarUsuario.usuario,
            },
          });
          router.replace("/");
        } catch (error) {
          console.log("Erroor: ", error);
        }
      }
    } catch (error) {
      setMensaje(error.message);
      setTimeout(() => setMensaje(null), 3000);
    }
  }

  return (
    <>
      <AppLayout title="Login">
        {mensaje && (
          <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
            <p>{mensaje}</p>
          </div>
        )}

        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <FormLogin handleSubmit={handleSubmit} />
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
