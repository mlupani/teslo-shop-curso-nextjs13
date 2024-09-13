import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    slug: string;
  }
}


export default function ProductPage({params}: Props) {

  const {slug} = params;
  const product = initialData.products.find((product) => product.slug === slug);

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