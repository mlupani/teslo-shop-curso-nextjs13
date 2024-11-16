"use client"

import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { setTransactionId } from "@/actions/payments/update-order-transactionId";
import { paypalCheckPaymnent } from "@/actions/payments/paypal-check-payment";
import { redirect } from "next/navigation";
import { submitPayment } from "@/actions/payments/mercado-pago-check-payments";
import { useCartStore } from "@/store/cart/cart-store";

interface Props {
  orderId: string;
  amount: number;
}

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN ?? '',
})

export const MercadoPagoButton = ({orderId, amount}: Props) => {

  //const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round((amount) * 100) / 100;

  const createReferencePay = async () => {
    await submitPayment({orderId, roundedAmount});
  };
  return (
    <button onClick={createReferencePay} className="w-full mb-10 h-10" >
      <img style={{objectFit: 'contain'}} src="/imgs/button-mercado-pago.png" alt="Mercado Pago" className="w-full" />
    </button>
  )
}