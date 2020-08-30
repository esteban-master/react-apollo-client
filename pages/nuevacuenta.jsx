import React, { useState } from "react";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { InputText } from "../components/InputText";
import * as Yup from "yup";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($usuario: UsuarioInput) {
    nuevoUsuario(usuario: $usuario) {
      nombre
      email
    }
  }
`;

const NuevaCuenta = () => {
  const router = useRouter();
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);
  const [mensaje, setMensaje] = useState(null);

  async function handleSubmit(values) {
    try {
      const { data } = await nuevoUsuario({
        variables: {
          usuario: { ...values },
        },
      });
      setMensaje(`Usuario ${data.nuevoUsuario.nombre}, creado exitosamente!`);
      setTimeout(
        () =>
          router.push(
            {
              pathname: "/login",
              query: { email: data.nuevoUsuario.email },
            },
            "/login"
          ),
        1500
      );
    } catch (error) {
      setMensaje(error.message);
      setTimeout(() => setMensaje(null), 3500);
    }
  }

  return (
    <>
      <AppLayout title="Sign Up | CRM ">
        {mensaje && (
          <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
            <p>{mensaje}</p>
          </div>
        )}

        <h1 className="text-center text-2xl text-white font-light">
          Crear Nueva Cuenta
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <Formik
              initialValues={{
                nombre: "",
                apellido: "",
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                nombre: Yup.string().required("El nombre es obligatorio"),
                apellido: Yup.string().required("El apellido es obligatorio"),
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
                      label="Nombre"
                      name="nombre"
                      id="nombre"
                      type="text"
                      placeholder="Nombre Usuario"
                    />
                  </div>
                  <div className="mb-4">
                    <InputText
                      label="Apellido"
                      name="apellido"
                      id="apellido"
                      type="text"
                      placeholder="Apellido Usuario"
                    />
                  </div>
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
                    Registrar
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

export default NuevaCuenta;
