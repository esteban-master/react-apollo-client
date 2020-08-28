import "../styles/globals.css";
import { AuthProvider } from "../services/authcontext.service";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
