import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { CartSummary } from "./ui/CartSummary";

export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          { /* Carrito */ }
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href={'/'} className="underline mb-5">
              Continuá comprando
            </Link>

          { /* Items */ }
          <ProductsInCart />

        </div>

        { /* Checkout - Resumen de orden */ }
        <div className="bg-white rounded-xl shadow-xl p-7 h-[300px] ">
          <h2 className="text-2xl mb-2">Resumen de orden</h2>
          <CartSummary/>

          <div>
            <Link className="flex btn-primary justify-center mt-5 mb-2 w-full" href={'/checkout/address'}>
              Checkout
            </Link>
          </div>

        </div>


        </div>

      </div>
    </div>
  );
}