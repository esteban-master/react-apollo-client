import React, { useReducer, useContext, useEffect } from "react";

export const AuthStateContext = React.createContext({});

const initialState = {
  nombre: "",
  email: "",
  apellido: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setDetallesAutenticacion":
      return {
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        email: action.payload.email,
      };
    case "removeDetallesAutenticacion":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  let localState = null;
  if (typeof localStorage !== "undefined" && localStorage.getItem("userInfo")) {
    localState = JSON.parse(localStorage.getItem("userInfo") || "");
  }

  const [state, dispatch] = useReducer(reducer, localState || initialState);

  if (typeof localStorage !== "undefined") {
    useEffect(() => {
      localStorage.setItem("userInfo", JSON.stringify(state));
    }, [state]);
  }

  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuth = () => useContext(AuthStateContext);
