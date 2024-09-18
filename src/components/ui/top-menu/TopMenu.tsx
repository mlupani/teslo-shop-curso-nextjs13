'use client'

import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store/ui/ui-store"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {

  const { openSideMenu } = useUIStore(state => state)

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
            <Link className="m-2 p-2 rounded-md transition-all hover-bg-gray-100" href="/category/men">Hombres</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover-bg-gray-100" href="/category/women">Mujeres</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover-bg-gray-100" href="/category/kid">Niños</Link>
        </div>

        { /* Search, Cart, menu */ }
        <div className="flex items-center">
          <Link href="/search" className="m-2">
            <IoSearchOutline className="w-5 h-5" />
          </Link>

          <Link href="/cart" className="m-2">
            <div className="relative">
              <span className="absolute text-xs px-1 font-bold -top-2 -right-2 bg-blue-600 rounded-full text-white">3</span>
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