"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {

  const handleClick = () => {
    const products = document.getElementById("products");
    if(!products) return;
    products.scrollIntoView({ behavior: "smooth" });
  }


  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-48 flex flex-col items-center justify-center">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="container py-10 lg:py-16 flex flex-col items-center justify-center">
            <div className="max-w-2xl text-center">
              {/* <p>Elevate your projects</p> */}
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Leiloe os seu items aksdljfalkdjflka
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  No Bidnow voce consegue leiloar seus produtos em tempo real, e comprar
                  produtos increveis de outros usuários.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Link href={"/auth/login"}>
                  <Button size={"lg"}>Login</Button>
                </Link>
                <Button onClick={() => handleClick()} size={"lg"} variant={"outline"}>
                  Ver Produtos
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}