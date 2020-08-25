import React from "react";
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
  return (
    <AppLayout title="Productos">
      <div>
        <h1>PRODUCTOS LISTAS</h1>
        <ul>
          {productos.map((pro) => (
            <li key={pro.id}>{pro.nombre}</li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export async function getStaticProps() {
  const data = await graphql_request.client.request(query);
  return {
    props: {
      productos: data.obtenerProductos,
    },
  };
}

export default Productos;
