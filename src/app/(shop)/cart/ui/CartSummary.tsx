'use client'

import { useCartStore } from "@/store/cart/cart-store";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";

export const CartSummary = () => {
	const summaryInformation = useCartStore(store => store.getSummaryInformation());
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading...</p>;

	return (
		<div className="grid grid-cols-2">
			<span>Nº de productos</span>
			<span className="text-right">
                {summaryInformation.totalItems === 1 ? "1 producto" : `${summaryInformation.totalItems} productos`}
            </span>

			<span>Subtotal</span>
			<span className="text-right">
                {formatCurrency(summaryInformation.subTotal)}
            </span>

			<span>Inpuestos (15%)</span>
			<span className="text-right">
                {formatCurrency(summaryInformation.tax)}
            </span>

			<span className="mt-5 text-2xl">Total:</span>
			<span className="mt-5 text-2xl text-right">
                {formatCurrency(summaryInformation.total)}
            </span>
		</div>
	);
};
