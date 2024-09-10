import { Title } from "@/components";
import ProductGrid from "@/components/ui/product-grid/ProductGrid";
import { initialData } from "@/seed/seed";

const products = initialData.products;

//import { geistSans, titleFont } from "@/config/fonts";
export default function Home() {
  return (
    <>
      {/*<h1 className={titleFont.className}>hola mundo (Fuente desde google)</h1>*/}
      {/*<h1 className={geistSans.className}>hola mundo (Fuente desde local)</h1>*/}
      {/*<h1 className={geistSans.className}>hola mundo</h1>*/}
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
