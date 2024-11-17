"use client"

import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const Search = () => {

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('')

  const createSearchUrl = () => {
    const params = new URLSearchParams(searchParams);
    params.set('search', search);
    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <input type="text" onKeyDown={(e) => e.key === 'Enter' && createSearchUrl()}  autoFocus onChange={(e) => setSearch(e.target.value)} placeholder="Buscar" className={`transition-all px-2 rounded-md `} />
  )
}
