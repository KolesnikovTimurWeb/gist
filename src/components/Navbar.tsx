import Link from "next/link";
import { Button } from "./ui/button";



export default function Navbar(){
   return(
      <header className="shadow-sm ">
         <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
            <Link href={'/'} className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">Gist</span>
            </Link>

            <Button asChild>
               <Link href={'/jobs/new'}>
                  Post a job
               </Link>
            </Button>
         </nav>
      </header>
   )
}