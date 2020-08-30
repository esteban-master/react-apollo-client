import React from "react";
import { useQuery, gql } from "@apollo/client";
import TokenService from "../services/token.service";
import AppLayout from "../components/AppLayout";
import Link from "next/link";

const GET_CLIENTES_USUARIO = gql`
  query GET_CLIENTES_USUARIO {
    obtenerClientesVendedor {
      id
      nombre
      empresa
      email
      apellido
    }
  }
`;

const Clientes = () => {
  const { data, error, loading } = useQuery(GET_CLIENTES_USUARIO);
  console.log("data: ", data, error, loading);
  return (
    <AppLayout title="CRM | Clientes">
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

      <Link href="/nuevocliente">
        <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded tex-sm">
          Nuevo cliente
        </a>
      </Link>
      <br />
      {loading && <p>Cargando...</p>}
      {data && data.obtenerClientesVendedor.length !== 0 && !loading ? (
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cli) => (
              <tr key={cli.id}>
                <td className="border px-4 py-2">
                  {cli.nombre} {cli.apellido}
                </td>
                <td className="border px-4 py-2">{cli.empresa}</td>
                <td className="border px-4 py-2">{cli.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Sin clientes</p>
      )}
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const tokenService = new TokenService();
  await tokenService.autenticatedToken(context);
  return {
    props: {},
  };
}

export default Clientes;
