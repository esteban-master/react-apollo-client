import Router from "next/router";

class NavService {
  redirectUser(dest, ctx) {
    const res = ctx.res;
    if (res) {
      res.writeHead(302, { Location: dest });
      res.end();
    } else {
      Router.push(dest);
    }
  }
}

export default NavService;
