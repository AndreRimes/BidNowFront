import NavBar from "@/components/sections/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Hero from "@/components/ui/Hero";
import { getSession } from "@/utils/auth";
import ProductCard from "@/components/ui/productCard";
import Footer from "@/components/sections/Footer";

export default async function Home() {
  const userInfo = getSession();
  

  return (
    <div className="flex flex-col gap-1 ">
      <NavBar />
      <Hero />

      <div className="flex flex-col items-center py-10 gap-20">
        <h1 className="w-full text-center text-5xl font-black">Produtos</h1>

        <div className="w-11/12">
          <h3 className="text-xl ">Produtos destaques: </h3>
          <CarouselSpacing />
        </div>

        <div className="w-11/12">
          <h3 className="text-xl ">Produtos para voce: </h3>
          <CarouselSpacing />
        </div>
      </div>

      <Footer />
    </div>
  );
}


export function CarouselSpacing() {
  return (
    <Carousel >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 basis-1/5">
            <ProductCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
