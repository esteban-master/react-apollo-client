import React from "react";
import { useQuery, gql } from "@apollo/client";
import AppLayout from "../components/AppLayout";

const GET_PRODUCTOS = gql`
  query GET_PRODUCTOS {
    obtenerProductos {
      nombre
      id
      precio
      existencia
    }
  }
`;
const Productos = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTOS);
  console.log(loading, data);
  return (
    <AppLayout title="CRM | Productos">
      <div>
        <h1>PRODUCTOS LISTAS PREMIUM</h1>
        {!loading && data.obtenerProductos.length > 0 ? (
          <ul>
            {data.obtenerProductos.map((pro) => (
              <li key={pro.id}>{pro.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>Sin productos</p>
        )}
      </div>
    </AppLayout>
  );
};

// export async function getServerSideProps(context) {
//   const tokenService = new TokenService();
//   await tokenService.autenticatedToken(context);
//   const data = await graphql_request.client.request(query);
//   return {
//     props: {
//       productos: data.obtenerProductos,
//     },
//   };
// }

export default Productos;
