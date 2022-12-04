import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken } from "../API/token";
import { useUser } from "../Hooks";

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
  });
  
  export function AuthProvider(props) {
    const { children } = props;
    const [auth, setAuth] = useState(undefined);
    const { getMe } = useUser();
  
    //Mantener la pagina una vez iniciada sesion
    useEffect(() => {
      (async () => {
        const token = getToken();
        if (token) {
          const me = await getMe(token);
          setAuth({ token, me });
        } else {
          setAuth(null);
        }
      })();
    }, []);
  
    const login = async (token) => {
        setToken(token);
        const me = await getMe(token);
        setAuth({ token, me });
    };
  
    //Cerrar sesion
    const logout = () => {
      if (auth) {
        // removeToken();
        setAuth(null);
      }
    };
  
    const valueContext = {
      auth,
      login,
      logout,
    };
  
    //Quitar la vista del login cuando se recarga la pagina
    if (auth === undefined) return null;
  
    return (
      <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    );
  }
  