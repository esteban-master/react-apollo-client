import React from "react";
// import { useQuery, gql } from "@apollo/client";
import { client, gql } from "../config/apollo_client";
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
const Productos = ({ productos }) => {
  // const { loading, error, data } = useQuery(GET_PRODUCTOS);
  // console.log(loading, data);
  console.log("PRODUCTOS: ", productos);
  return (
    <AppLayout title="CRM | Productos">
      <div>
        <h1>PRODUCTOS LISTAS PREMIUM</h1>
        {productos.length > 0 ? (
          <ul>
            {productos.map((pro) => (
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

export async function getStaticProps(context) {
  const { data } = await client.query({
    query: GET_PRODUCTOS,
  });
  return {
    props: {
      productos: data.obtenerProductos,
    }, // will be passed to the page component as props
  };
}

export default Productos;
