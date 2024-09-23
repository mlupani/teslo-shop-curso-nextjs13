export const revalidate = 600000; //7 dias aprox

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { titleFont } from "@/config/fonts";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug({slug});
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: ['/products/'+product?.images[1]],
    },
  }
}


export default async function ProductPage({params}: Props) {

  const {slug} = params;
  const product = await getProductBySlug({slug});

  if(!product)
    notFound();

  return (
    <div className="grid md:grid-cols-3 mt-5 mb-20 gap-3">

      {/* Desktop Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow images={product.images} title={product.title}  className="hidden md:block"/>
        <ProductMobileSlideShow images={product.images} title={product.title} className="block md:hidden" />
      </div>

      {/* Product Details */}
      <div className="col-span-1 px-5">

        <StockLabel slug={slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* selector de tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes}  />

        {/* selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/* Boton de añadir al carrito */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}