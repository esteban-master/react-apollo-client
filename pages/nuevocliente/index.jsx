import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";
import FormNuevoCliente from "./FormNuevoCliente";

const NUEVO_CLIENTE = gql`
  mutation NewCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      nombre
      empresa
      email
      apellido
      id
      telefono
    }
  }
`;

const Nuevocliente = () => {
  const router = useRouter();
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    // Actualizando el cache del navegador, con los nuevos datos
    update(cache, { data: { nuevoCliente } }) {
      cache.modify({
        fields: {
          obtenerClientesVendedor(clientesExistentes = []) {
            const newClienteRef = cache.writeFragment({
              data: nuevoCliente,
              fragment: gql`
                fragment NuevoCliente on Cliente {
                  id
                  nombre
                  empresa
                  email
                  apellido
                }
              `,
            });
            return [...clientesExistentes, newClienteRef];
          },
        },
      });
    },
  });

  const handleSubmit = async (values) => {
    try {
      await nuevoCliente({
        variables: {
          input: { ...values },
        },
      });
      router.push("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout title="CRM | Nueva Cuenta">
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <FormNuevoCliente handleSubmit={handleSubmit} />
        </div>
      </div>
    </AppLayout>
  );
};
export default Nuevocliente;
