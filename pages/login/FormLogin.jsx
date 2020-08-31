import React from "react";
import { Formik, Form } from "formik";
import { InputText } from "../../components/InputText";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAuth } from "../../services/authcontext.service";

const FormLogin = ({ handleSubmit }) => {
  const { query, push } = useRouter();
  const [user] = useAuth();
  return (
    <Formik
      initialValues={{
        email: query.email || user.email || "",
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
            className="bg-green-800 w-full mt-5 p-2 text-white uppercase hover:bg-green-700"
          >
            Iniciar Sesion
          </button>

          <button
            type="button"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
            onClick={() => push("/nuevacuenta")}
          >
            Registrar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormLogin;
