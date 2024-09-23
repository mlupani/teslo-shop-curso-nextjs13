'use client'

import { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";

interface Props {
  slug: string;
}

export const StockLabel = ({slug}:Props) => {

  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setStock(stock);
      setLoading(false);
    }
    getStock();
  }, [slug]);

  return (
    <>
      {
        loading ?
        <h1 className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-300 `}>
          &nbsp;
        </h1> :
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
            Stock: {stock}
        </h1>
      }
    </>
  )
}
