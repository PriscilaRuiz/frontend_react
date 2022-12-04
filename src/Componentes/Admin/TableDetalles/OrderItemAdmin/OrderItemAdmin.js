import React from "react";
import { Button, Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import { useOrder } from "../../../../Hooks";
import { ORDER_STATUS } from "../../../../Utils/constans";
import "moment/locale/es";
import "./OrderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { title, image } = order.product_data;
  const { checkDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        // Funcion para trabajar las clases con minusculas "toLowerCase"
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("HH:mm")}</span> {" - "}
        <span>{moment(order.created_at).startOf("secods").fromNow()}</span>
      </div>

      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDIENTE && (
        <Button primary onClick={onCheckDeliveredOrder}>
          Marcar entregado
        </Button>
      )}
    </div>
  );
}
