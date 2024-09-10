'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/interfaces'

interface Props {
    product: Product
}

const ProductGridItem = ({product}: Props) => {

  const [image, setImage] = useState(product.images[0]);

  return (
    <div className='rounded-md overflow-hidden fade-in'>
        <Link href={`/product/${product.slug}`}>
            <Image
                src={`/products/${image}`}
                alt={product.title}
                width={500}
                height={500}
                className='w-full object-cover rounded'
                layout='responsive'
                onMouseEnter={() => setImage(product.images[1])}
                onMouseLeave={() => setImage(product.images[0])}
            />
        </Link>
        <div className='p-4 flex flex-col'>
            <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
                {product.title}
            </Link>
            <span className='font-bold'>${product.price}</span>
        </div>
    </div>
  )
}

export default ProductGridItem