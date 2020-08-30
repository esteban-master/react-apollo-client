import Router from "next/router";

class NavService {
  redirectUser(dest, ctx) {
    const res = ctx.res;
    if (res) {
      res.setHeader("authorization", "Bearer ");
      res.writeHead(302, { Location: dest });
      res.end();
      return;
    } else {
      Router.push({ pathname: dest, query: { tokenValid: false } }, dest);
    }
  }
}

export default NavService;
