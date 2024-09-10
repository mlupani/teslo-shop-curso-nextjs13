import { TopMenu, Sidebar } from "@/components";

export default function ShopLayout({
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

    </main>
  );
}