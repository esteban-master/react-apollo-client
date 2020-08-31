import React from "react";
import { gql, useMutation } from "@apollo/client";

const DELETE_CLIENTE = gql`
  mutation EliminarCliente($id: ID!) {
    deleteCliente(id: $id)
  }
`;

const Cliente = ({ cliente }) => {
  const { id, nombre, apellido, email, empresa } = cliente;

  const [deleteCliente] = useMutation(DELETE_CLIENTE, {
    update(cache) {
      cache.modify({
        fields: {
          obtenerClientesVendedor(clientesExistentes, { readField }) {
            return clientesExistentes.filter(
              (clienteRef) => id !== readField("id", clienteRef)
            );
          },
        },
      });
    },
  });

  const eliminarCliente = async (id) => {
    // console.log("ELiminando... ", id);
    try {
      await deleteCliente({
        variables: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button onClick={() => eliminarCliente(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default Cliente;
