'use client'

import { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components'
import { Product, ProductInCart, ValidSizes as Size } from '@/interfaces'
import { useCartStore } from '@/store/cart/cart-store'

interface Props {
    product: Product
}

export const AddToCart = ({product}: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)
  const [selectedSize, setSelectedSize] = useState<Size | undefined>()
  const [selectedCount, setSelectedCount] = useState<number>(1)
  const [post, setPost] = useState(false)

  const addToCart = () => {
    setPost(true)
    if(!selectedSize) return;

    const productCart: ProductInCart = {
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        quantity: selectedCount,
        size: selectedSize,
        image: product.images[0]
    }

    addProductToCart(productCart)
    setPost(false)
    setSelectedSize(undefined)
    setSelectedCount(1)
  }

  return (
    <>
        {
            post && !selectedSize && <p className="text-red-500 fade-in font-bold pt-2">Por favor selecciona una talla!</p>
        }
        {/* selector de tallas */}
        <SizeSelector selectedSize={selectedSize} availableSizes={product.sizes} onSizeChanged={setSelectedSize}  />

        {/* selector de cantidad */}
        <QuantitySelector quantity={selectedCount} onQuantityChanged={setSelectedCount} />

        {/* Boton de añadir al carrito */}
        <button onClick={addToCart} className="btn-primary my-5">Agregar al carrito</button>
    </>
    )
}
