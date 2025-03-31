import { getSession } from "@/utils/auth";
import { Button } from "../ui/button";
import Link from "next/link";


export default function NavBar() {
  const userInfo = getSession();

  return (
    <nav className="flex items-center justify-between w-full h-16 bg-white px-4 py-2 shadow-md">
      <Link href={"/"}>
        <div className="w-12 h-12 bg-[#111111] rounded-xl flex items-center justify-center ">
          <h1 className=" text-white text-3xl font-bold">
            A
            <span className="text-primary">.</span>
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {userInfo ?(
          <>
            <Link href={"/profile"}>
              <Button variant={"outline"}>Meu Perfil</Button>
            </Link>
          </> 
        ): (
          <>
            <Link href={"/auth/login"}>
              <Button>Login</Button>
            </Link>
            <Link href={"/auth/signup"}>
              <Button variant={"outline"}>Cadastro</Button>
            </Link>
          </> 
        ) 
      }
      </div>
    </nav>
  )
}