import React from "react";
import { Formik, Form } from "formik";
import { InputText } from "../components/InputText";
import * as Yup from "yup";

const FormNuevoCliente = ({ handleSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={{
          nombre: "",
          apellido: "",
          email: "",
          empresa: "",
          telefono: "",
        }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("El nombre es requerido"),
          apellido: Yup.string().required("El apellido es requerido"),
          empresa: Yup.string().required("La empresa es requerida"),
          telefono: Yup.string(),
          email: Yup.string()
            .email("El email no es valido")
            .required("Email es obligatorio"),
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
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <InputText
                label="Apellido"
                name="apellido"
                id="apellido"
                type="text"
                placeholder="Apellido"
              />
            </div>
            <div className="mb-4">
              <InputText
                label="Empresa"
                name="empresa"
                id="empresa"
                type="text"
                placeholder="Empresa"
              />
            </div>
            <div className="mb-4">
              <InputText
                label="Email"
                name="email"
                id="email"
                type="email"
                placeholder="Email "
              />
            </div>
            <div className="mb-4">
              <InputText
                label="Telefono"
                name="telefono"
                id="telefono"
                type="tel"
                placeholder="Telefono "
              />
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
            >
              Registrar Cliente
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormNuevoCliente;
