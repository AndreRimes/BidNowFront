import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import blackScreen from "../../public/image.png"
import { Product } from "@/utils/types";


export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={"/product/" + product.id}>
      <Card className="group relative space-y-4 overflow-hidden">
        <figure className="group-hover:opacity-90">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black">
            <HeartIcon className="size-4" />
          </Button>
          <Image
            className="aspect-square w-full"
            src={product?.files[0]?.url}
            width={300}
            height={500}
            alt={product.files[0]?.name}
          />
        </figure>
        <CardContent className="px-4 py-0">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg">
                <Link href={"/product/" + product.id}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              {/* <p className="text-sm text-muted-foreground">{product.category}</p> */}
            </div>
            <p className="text-lg font-semibold">{product.minimalPrice}</p>
          </div>
        </CardContent>
        <CardFooter className="p-0 border-t">
          <Button variant="ghost" className="w-full">
            <PlusIcon className="size-4 me-1" /> Fazer um lance
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
