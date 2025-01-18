"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Product } from "@/utils/types";
import { useGetMyProducts } from "@/utils/useQueryHooks";




export default function MyProducts() {
    const {data: myProducts, isLoading, error} = useGetMyProducts();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error || !myProducts) {
        return <div>Erro ao carregar produtos</div>;
    }

    return (
        <div className="flex flex-col flex-grow gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
            <div className="flex flex-col flex-grow items-center ">
                <h2 className="text-3xl font-bold">Meus produtos a venda</h2>
                <div className="container mx-auto p-4 flex justify-end">
                    <Link href="/createProduct">
                        <Button variant={"outline"}>Adicionar produto</Button>
                    </Link>
                </div>
                <ProductGrid  products={myProducts} />
            </div>
        </div>
    )
}


function ProductGrid({ products }: { products: Product[] }) {

  return (
      <div className="container mx-auto p-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={product?.files[0]?.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="p-3 space-y-1.5">
                    <h2 className="text-base font-semibold truncate">{product.title}</h2>
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <p className="text-muted-foreground">Preço Inicial</p>
                        <p className="font-medium">${product.minimalPrice.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Preço Atual</p>
                        {/* <p className="font-medium text-primary">${product.currentPrice.toFixed(2)}</p> */}
                        <p className="font-medium text-primary">$100</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {/* <Badge variant="secondary">{product.bids} bids</Badge> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
  )
}