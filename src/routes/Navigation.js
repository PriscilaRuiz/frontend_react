import React from "react";
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";
import {Error404}  from "../Paginas"

console.log(routes)

export function Navigation() {
  return (
    <Router>
      <Routes>
        {map(routes, (route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          ))}
          {/* Mostramos la ruta y la pagina  */}
          <Route path="/Error404" element={<Error404/>}/>   
          <Route path="*" element={<Navigate to='/Error404'/>}/>
      </Routes>     
    </Router>
  );
}
