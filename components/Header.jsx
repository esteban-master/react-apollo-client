import React from "react";
import TokenService from "../services/token.service";
import Router from "next/router";
import { useAuth } from "../services/authcontext.service";

const Header = () => {
  const tokenService = new TokenService();
  const [user, userDispatch] = useAuth();

  const cerrarSesion = () => {
    userDispatch({
      type: "removeDetallesAutenticacion",
    });

    tokenService.borrarToken();
    Router.push("/login");
  };
  return (
    <div>
      <div className="flex justify-end">
        {user && (
          <>
            <p className="mr-2">{`${user.nombre} ${user.apellido}`}</p>
            <button
              onClick={cerrarSesion}
              className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
              type="button"
            >
              Cerrar sesion
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
