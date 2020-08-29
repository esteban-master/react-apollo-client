import "../styles/globals.css";
import { AuthProvider } from "../services/authcontext.service";
import { ApolloProvider } from "@apollo/client";
import { client } from "../config/apollo_client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
