import { notFound } from "next/navigation";
import { Category, initialData } from "@/seed/seed";
import ProductGrid from "@/components/ui/product-grid/ProductGrid";
import { Title } from "@/components";

interface Props {
  params: {
    id: Category;
  }
}

const products = initialData.products;

export default function CategoryPage({ params }: Props) {

  const { id } = params;
  const labels = {
    'kid': 'Niños',
    'women': 'Mujeres',
    'men': 'Hombres',
    'unisex': 'Todos'
  }
  if(!labels[id]){
    notFound();
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle={`Productos para ${labels[id]}`}
        className="mb-2"
      />
      <ProductGrid products={products.filter(prod => prod.gender === id)} />
    </>
  );
}