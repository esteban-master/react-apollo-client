import React, { useState } from "react";
import { graphql_request } from "../config/graphql-client";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import { Formik, Form } from "formik";
import { InputText } from "../components/InputText";
import * as Yup from "yup";

const AUTENTICAR_USUARIO = graphql_request.gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
      usuario {
        nombre
        apellido
      }
    }
  }
`;

const Login = () => {
  const [mensaje, setMensaje] = useState(null);
  const router = useRouter();

  async function handleSubmit(values) {
    try {
      setMensaje("Autenticando...");
      const data = await graphql_request.client.request(AUTENTICAR_USUARIO, {
        input: { ...values },
      });
      console.log("DATA GRAPHQL REQUEST: ", data);
      router.replace("/");
    } catch (error) {
      console.log(error.response.errors[0].message);
      setMensaje(error.response.errors[0].message);
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
            <Formik
              initialValues={{
                email: router.query.email || "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("El email no es valido")
                  .required("Email es obligatorio"),
                password: Yup.string()
                  .required("El password no puede ir vacio")
                  .min(4, "Minimo 4 caracteres"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="bg-white rounded shadow-md px-8 pt-6 pb-6 pb-8 mb-4">
                  <div className="mb-4">
                    <InputText
                      label="Email"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email Usuario"
                    />
                  </div>
                  <div className="mb-4">
                    <InputText
                      label="Password"
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Password Usuario"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
                  >
                    Iniciar Sesion
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
