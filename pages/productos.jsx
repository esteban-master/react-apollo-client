import React from "react";
import TokenService from "../services/token.service";
import { graphql_request } from "../config/graphql-client";
import AppLayout from "../components/AppLayout";

const query = graphql_request.gql`
  query GET_PRODUCTOS {
    obtenerProductos {
      nombre
      id
      precio
      existencia
    }
  }
`;
const Productos = ({ productos }) => {
  console.log("Hola");
  console.log(productos);
  return (
    <AppLayout title="Productos">
      <div>
        <h1>PRODUCTOS LISTAS PREMIUM</h1>
        <ul>
          {productos.map((pro) => (
            <li key={pro.id}>{pro.nombre}</li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const tokenService = new TokenService();
  await tokenService.autenticatedToken(context);
  const data = await graphql_request.client.request(query);
  return {
    props: {
      productos: data.obtenerProductos,
    },
  };
}

export default Productos;
