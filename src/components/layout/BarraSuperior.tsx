import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BarraSuperior = () => {
  return (
    <nav className="flex h-full font-sans font-bold bg-[#283F9F] shadow-2xl items-center">
        <Link href="/juego" className="flex-1 h-full flex flex-col justify-center items-center text-white hover:bg-white/10 transition-colors py-2 gap-1"> 
          <Image src="/menu/icono_menu_icon.png" alt="Jugar" width={48} height={48} className="object-contain drop-shadow-md h-12 w-12" />
          <span className="text-sm uppercase tracking-wider">Jugar</span> 
        </Link>
        <Link href="/juego/mazos" className="flex-1 h-full border-l-4 border-yellow-400 flex flex-col justify-center items-center text-white hover:bg-white/10 transition-colors py-2 gap-1"> 
          <Image src="/menu/icono_menu_mazos.png" alt="Mazos" width={48} height={48} className="object-contain drop-shadow-md h-12 w-12" />
          <span className="text-sm uppercase tracking-wider">Mazos</span> 
        </Link>
        <Link href="/juego/logros" className="flex-1 h-full border-l-4 border-yellow-400 flex flex-col justify-center items-center text-white hover:bg-white/10 transition-colors py-2 gap-1"> 
          <Image src="/menu/icono_menu_logros.png" alt="Logros" width={48} height={48} className="object-contain drop-shadow-md h-12 w-12" />
          <span className="text-sm uppercase tracking-wider">Logros</span> 
        </Link>
        <Link href="/juego/tienda" className="flex-1 h-full border-l-4 border-yellow-400 flex flex-col justify-center items-center text-white hover:bg-white/10 transition-colors py-2 gap-1"> 
          <Image src="/menu/icono_menu_tienda.png" alt="Tienda" width={48} height={48} className="object-contain drop-shadow-md h-12 w-12" />
          <span className="text-sm uppercase tracking-wider">Tienda</span> 
        </Link>
        <Link href="/juego/perfil" className="flex-1 h-full border-l-4 border-yellow-400 flex flex-col justify-center items-center text-white hover:bg-white/10 transition-colors py-2 gap-1"> 
          <Image src="/menu/icono_menu_perfil.png" alt="Perfil" width={48} height={48} className="object-contain drop-shadow-md h-12 w-12" />
          <span className="text-sm uppercase tracking-wider">Perfil</span> 
        </Link>
    </nav>
  )
}

export default BarraSuperior