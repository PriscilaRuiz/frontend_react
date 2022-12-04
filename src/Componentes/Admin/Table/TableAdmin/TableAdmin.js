import React, { useState, useEffect } from "react";
import { Label } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getOrdersByTableApi } from "../../../../API/orders";
import { ORDER_STATUS } from "../../../../Utils/constans";
import { ReactComponent as IcTable } from "../../../../assets/table.svg"
import { usePayment } from "../../../../Hooks";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const { getPaymentByTable } = usePayment();

  //Mesas con pedidos pendientes
  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.PENDIENTE
      );
      setOrders(response);
    })();
  }, [reload]);

  //
  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.ENTREGADO
      );

      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
  }, [reload]);

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}

      {/* {pendingPayment && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )} */}

      <IcTable
        className={classNames({
          pendiente: size(orders) > 0,
          busy: tableBusy,
          // "pending-payment": pendingPayment,
        })}
      />
      <p>Mesa {table.number}</p>
    </Link>
  );
}
