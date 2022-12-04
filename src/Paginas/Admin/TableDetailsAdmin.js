import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { forEach, size } from "lodash";
import { HeaderPage, AddOrderForm } from "../../Componentes/Admin";
import { ModalBasic } from "../../Componentes/Common"
import { ListOrderAdmin, PaymentDetail } from "../../Componentes/Admin/TableDetalles";
import { useOrder, usePayment, useTable} from "../../Hooks";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  //Estados
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => getTable(id), [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  //Abrir y cerrar modal(formulario)
  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);


  // Crear el pago de la cuenta
  const onCreatePayment = async () => {
    const result = window.confirm(
      "¿Estas seguro de generar la cuenta de la mesa?"
    );

    if (result) {
      //Sumar la cuenta
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        "¿Pago con tarjeta pusa ACEPTAR con efectivo pusa CANCELAR"
      );
        // Generar datos de pago
      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2), //Cuenta con dos decimales
        paymentType: resultTypePayment ? "TARJETA" : "EFECTIVO",
        statusPayment: "PENDIENTE",
      };

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
    }
  };

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}

        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
        btnClick={openCloseModal}

        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar pedido"
      >
        {/* Detalles de la cuenta */}
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}
