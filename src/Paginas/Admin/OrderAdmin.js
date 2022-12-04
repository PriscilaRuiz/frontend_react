import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TablesListAdmin } from "../../Componentes/Admin"
import { useTable } from "../../Hooks"

export function OrderAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => getTables(), []);

  return (
    <>
      <HeaderPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  );
}
