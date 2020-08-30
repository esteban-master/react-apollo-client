import React from "react";
import { Formik, Form } from "formik";
import { InputText } from "./InputText";
import * as Yup from "yup";
import { useRouter } from "next/router";

const FormLogin = ({ handleSubmit }) => {
  const { query } = useRouter();
  return (
    <Formik
      initialValues={{
        email: query.email || "next_cliente@gmail.com",
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
  );
};

export default FormLogin;
