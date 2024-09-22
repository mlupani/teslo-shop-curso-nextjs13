export const revalidate = 60;


import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import ProductGrid from "@/components/ui/product-grid/ProductGrid";
import { redirect } from "next/navigation";
//import { geistSans, titleFont } from "@/config/fonts";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams } :Props) {

  const page = searchParams.page ? +searchParams.page : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({page});

  if(!products.length){
    redirect('/');
  }

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

      <Pagination totalPages={totalPages}  />
    </>
  );
}
