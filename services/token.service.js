import Cookies from "universal-cookie";
import { graphql_request } from "../config/graphql-client";
import NavService from "../services/nav.service";

const VALIDATE_TOKEN = graphql_request.gql`
  query ValidateToken($token:String!) {
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
    if (!token)
      return {
        validateToken: {
          success: false,
        },
      };
    return graphql_request.client.request(VALIDATE_TOKEN, {
      token,
    });
  }

  async autenticatedToken(contexto) {
    const ssr = contexto.req ? true : false;
    const cookies = new Cookies(ssr ? contexto.req.headers.cookie : null);
    const token = cookies.get("token");

    // console.log("SSR: ", ssr, contexto.req.headers);

    const response = await this.checkAuthToken(token);
    if (!response.validateToken.success) {
      const navService = new NavService();
      this.borrarToken();
      navService.redirectUser("/login", contexto);
    }
  }
}

export default TokenService;
