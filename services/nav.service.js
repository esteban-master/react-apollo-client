import Router from "next/router";

class NavService {
  redirectUser(dest, ctx) {
    const res = ctx.res;
    if (res) {
      res.writeHead(302, { Location: dest + "?tokenValid=false" });
      res.end();
      return;
    } else {
      Router.push({ pathname: dest, query: { tokenValid: false } }, dest);
    }
  }
}

export default NavService;
