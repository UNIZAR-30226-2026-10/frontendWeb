import React from 'react'
import Link from 'next/link'

const BarraSuperior = () => {
  return (
    <nav className="flex h-full text-xl font-sans font-bold">
        <Link href="/" className="flex-1 pt-5 basis-xs flex justify-center text-white"> Jugar </Link>
        <Link href="/mazos" className="flex-1 pt-5 basis-xs border-l-4 flex justify-center border-yellow-400 text-white"> Mazos </Link>
        <Link href="/logros" className="flex-1 pt-5 basis-xs border-l-4 flex justify-center border-yellow-400 text-white"> Logros </Link>
        <Link href="/tienda" className="flex-1 pt-5 basis-xs border-l-4 flex justify-center border-yellow-400 text-white"> Tienda </Link>
        <Link href="/perfil" className="flex-1 pt-5 basis-xs border-l-4 flex justify-center border-yellow-400 text-white"> Perfil </Link>
    </nav>
  )
}

export default BarraSuperior