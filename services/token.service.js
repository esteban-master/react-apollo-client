import Cookies from "universal-cookie";
import { client, gql } from "../config/apollo_client";
import NavService from "../services/nav.service";

const VALIDATE_TOKEN = gql`
  query ValidateToken($token: String!) {
    validateToken(token: $token) {
      success
    }
  }
`;

class TokenService {
  guardarToken(token) {
    const cookies = new Cookies();
    cookies.set("token", token, { path: "/" });
    return Promise.resolve();
  }

  borrarToken() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    return;
  }

  checkAuthToken(token) {
    return client.query({
      query: VALIDATE_TOKEN,
      variables: {
        token: token || "",
      },
    });
  }

  getToken() {
    const cookies = new Cookies();
    return cookies.get("token");
  }

  async autenticatedToken(contexto) {
    const ssr = contexto.req ? true : false;
    const cookies = new Cookies(ssr ? contexto.req.headers.cookie : null);
    const token = cookies.get("token");

    // console.log("SSR: ", ssr, contexto.req.headers);

    const { data } = await this.checkAuthToken(token);
    console.log("res: ", data);
    if (!data.validateToken.success) {
      const navService = new NavService();
      this.borrarToken();
      navService.redirectUser("/login", contexto);
    }
  }
}

export default TokenService;
