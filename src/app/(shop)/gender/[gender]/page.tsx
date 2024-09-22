export const revalidate = 60;

import { notFound, redirect } from "next/navigation";
import ProductGrid from "@/components/ui/product-grid/ProductGrid";
import { Pagination, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: Gender;
  },
  searchParams: {
    page?: string;
  }
}

export default async function GenderPage({ params, searchParams }: Props) {

  const page = searchParams.page ? +searchParams.page : 1;

  const labels = {
    'kid': 'Niños',
    'women': 'Mujeres',
    'men': 'Hombres',
    'unisex': 'Todos'
  }
  if(!labels[params.gender]){
    notFound();
  }

  const { products, totalPages } = await getPaginatedProductsWithImages({page, gender: params.gender});

  if(!products.length){
    redirect('/gender/'+params.gender
    );
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle={`Productos para ${labels[params.gender]}`}
        className="mb-2"
      />
      <ProductGrid products={products.filter(prod => prod.gender === params.gender)} />

      <Pagination totalPages={totalPages}  />
    </>
  );
}