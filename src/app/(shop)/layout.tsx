import { TopMenu, Sidebar, Footer } from "@/components";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Shop',
    template: '%s - Teslo | shop',
  },
  description: 'Una tienda de productos',
}

export default  function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  return (
    <main className="min-h-screen">

      <TopMenu/>
      <Sidebar/>

      <div className="mx-0 sm:mx-10">
        { children }
      </div>

      <Footer />

    </main>
  );
}