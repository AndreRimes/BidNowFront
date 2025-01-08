

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeroProduct() {
    return (
        <>
            {/* Hero */}
            <div className="container py-24 lg:py-32 ">
                {/* Grid */}
                <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center ">
                    <div className="lg:col-span-3">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Titulo de Produto destaque
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Descricao do produto em destaque
                        </p>
                        <div className="w-full  mt-5 lg:mt-8 flex flex-col sm:items-center gap-2 sm:flex-col sm:gap-3">
                            <div className="w-full flex gap-10  text-lg font-semibold">
                                <h2>Lance inicial: <span className="text-primary">$100,00 </span></h2>
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
                            src="https://placehold.co/700x540"
                            alt="Image Description"
                        />
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
            {/* End Hero */}
        </>
    );
}