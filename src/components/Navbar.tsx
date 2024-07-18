import Link from "next/link";



export default function Navbar(){
   return(
      <header className="shadow-sm ">
         <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
            <Link href={'/'} className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">Gist</span>
            </Link>
         </nav>
      </header>
   )
}