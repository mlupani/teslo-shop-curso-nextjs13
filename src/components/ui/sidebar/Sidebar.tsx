'use client'

import Link from "next/link"
import { useUIStore } from "@/store/ui/ui-store"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import clsx from "clsx"
import { logout } from "@/actions/auth/logout";
import { useSession } from "next-auth/react"

export const Sidebar = () => {

  const { isSideMenuOpen, closeSideMenu } = useUIStore(state => state)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user;

  const log_out = async () => {
    await logout();
    closeSideMenu();
    window.location.replace('/')
  }

  return (
    <div>
      { /* Background black */}
      {
        isSideMenuOpen &&
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"/>
      }

      { /* Blur */}
      {
        isSideMenuOpen &&
          <div onClick={closeSideMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"/>
      }

      { /* SideMenu */}
      <nav
        //TODO: efecto de slide
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen,
            }
          )
        }
      >
        <IoCloseOutline
          size={50}
          className="cursor-pointer absolute top-5 right-5" 
          onClick={closeSideMenu}
        />
        { /* Input busqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {
          isAuthenticated && (
            <>
            <Link onClick={closeSideMenu} href="/profile" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link onClick={closeSideMenu} href="/orders" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            </>
          )
        }

        {
          !isAuthenticated ?
            <Link onClick={closeSideMenu} href="/auth/login" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link> :
            <button onClick={log_out} className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
        }



        { /* Line separator */}

        {
          isAuthenticated && session?.user.role === 'admin' && (
            <>
              <div className="w-full h-px bg-gray-200 my-10"  />
              <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoShirtOutline size={30} />
                <span className="ml-3 text-xl">Products</span>
              </Link>

              <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <Link href="/" className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoPeopleOutline size={30} />
                <span className="ml-3 text-xl">Clientes</span>
              </Link>
            </>
          )
        }
        


      </nav>



    </div>
  )
}

export default Sidebar