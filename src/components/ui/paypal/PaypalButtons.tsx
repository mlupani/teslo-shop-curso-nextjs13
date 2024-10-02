'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import { setTransactionId } from "@/actions/payments/update-order-transactionId";
import { paypalCheckPaymnent } from "@/actions/payments/paypal-check-payment";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButtons = ({orderId, amount}: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round((amount) * 100) / 100;

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toString(),
            currency_code: 'USD',
          }
        },
      ],
    });

    console.log({transactionId})

    const resp = await setTransactionId(orderId, transactionId);
    if(!resp.ok){
      throw new Error('Error setting transactionId');
    }

    return transactionId;
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('onApprove')
    const details = await actions.order?.capture();
    if(!details?.id) return;

    await paypalCheckPaymnent(details.id);
  }

  if(isPending){
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 w-full bg-gray-300 rounded"></div>
        <div className="h-11 w-full bg-gray-300 rounded mt-3"></div>
      </div>
    );
  }
  return (
    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
  )
}