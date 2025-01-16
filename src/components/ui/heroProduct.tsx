"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetHighlightProduct } from "@/utils/useQueryHooks";
import { title } from "process";

export default function HeroProduct() {
    const { data: hightlightProduct, isLoading, error } = useGetHighlightProduct();

    if (isLoading) {
        return <div>Carregando produto...</div>
    }

    if (error || !hightlightProduct) {
        return <div>Erro ao carregar produto</div>
    }

    console.log(hightlightProduct);

    return (
        <div className="flex flex-grow items-center justify-center">
            {/* Hero */}
            <div className="container py-24 lg:py-32 ">
                {/* Grid */}
                <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center ">
                    <div className="lg:col-span-3">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {hightlightProduct.title}
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            {hightlightProduct.description}
                        </p>
                        <div className="w-full  mt-5 lg:mt-8 flex flex-col sm:items-center gap-2 sm:flex-col sm:gap-3">
                            <div className="w-full flex gap-10  text-lg font-semibold">
                                <h2>Lance inicial: <span className="text-primary">${hightlightProduct.minimalPrice} </span></h2>
                                <h2>Preco Atual: <span className="text-primary">R${100}</span></h2>
                            </div>
                            <div className="w-full flex  gap-10 items-center ">
                                <Label className="sr-only">Search</Label>
                                <Input className="w-2/3" placeholder="Fazer um lance" type="number" />
                                <Button className="w-min">Fazer lance</Button>
                            </div>

                        </div>
                        {/* Brands */}
                    </div>
                    {/* End Col */}
                    <div className="lg:col-span-4 mt-10 lg:mt-0">
                        <img
                            className="w-full rounded-xl"
                            src={hightlightProduct.files[0]?.url}
                            alt="Image Description"
                        />
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
            {/* End Hero */}
        </div>
    );
}