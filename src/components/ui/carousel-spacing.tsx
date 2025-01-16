import { Product } from "@/utils/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import ProductCard from "./productCard";

export default function CarouselSpacing({ products }: { products: Product[] }) {
  return (
    <Carousel>
      <CarouselContent className="-ml-2">
        {products.length > 0 ? (
          products.map((product, index) => (
            <CarouselItem key={index} className="pl-2 basis-1/5">
              <ProductCard product={product} />
            </CarouselItem>
          ))
        ) : (
          <div className="w-11/12 min-h-80 flex flex-grow items-center justify-center text-2xl font-bold">
            Nenhum produto encontrado
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}