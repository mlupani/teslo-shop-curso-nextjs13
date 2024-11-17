'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { useCartStore } from "@/store/cart/cart-store"
import { useUIStore } from "@/store/ui/ui-store"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const TopMenu = () => {

  const searchParams = useSearchParams();
  const { openSideMenu } = useUIStore(state => state)
  const totalItemsInCart = useCartStore(state => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [showSearch, setShowSearch] = useState(false)
  const pathName = usePathname();
  const router = useRouter();

  const createSearchUrl = () => {
    const params = new URLSearchParams(searchParams);
    params.set('search', search);
    router.push(`${pathName}?${params.toString()}`);
  }

  useEffect(() => {
    setLoaded(true);
  }, [])

  

  return (
    <nav className="flex px-5 justify-between items-center w-full">

        { /* Logo */ }
        <div>
            <Link href="/"> 
                <span className={titleFont.className + 'antialiased font-bold'}>Teslo</span>
                <span> | Shop</span>
            </Link>
        </div>

        { /* Menu */ }
        <div className="hidden sm:block">
            <Link className="m-2 p-2 rounded-md transition-all hover-bg-gray-100" href="/gender/men">Hombres</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover-bg-gray-100" href="/gender/women">Mujeres</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover-bg-gray-100" href="/gender/kid">Niños</Link>
        </div>

        { /* Search, Cart, menu */ }
        <div className="flex items-center">
          <div className="flex flex-row items-center justify-center">
            <button onClick={() => setShowSearch(!showSearch)} className="m-2">
              <IoSearchOutline className="w-5 h-5" />
            </button>
            {
              showSearch &&
                <input type="text" onKeyDown={(e) => e.key === 'Enter' && createSearchUrl()}  autoFocus onChange={(e) => setSearch(e.target.value)} placeholder="Buscar" className={`transition-all px-2 rounded-md `} />
            }
          </div>

          <Link href="/cart" className="m-2">
            <div className="relative">
              {
                (loaded && totalItemsInCart > 0) &&
                <span className="absolute text-xs px-1 font-bold -top-2 -right-2 bg-blue-600 rounded-full text-white fade-in">
                  { totalItemsInCart }
                </span>
              }
            </div>
            <IoCartOutline className="w-5 h-5" />
          </Link>

          <button onClick={openSideMenu} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
            Menú
          </button>

        </div>
    </nav>
  )
}