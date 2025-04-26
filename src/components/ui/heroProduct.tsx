"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetHighlightProduct } from "@/utils/useQueryHooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { io } from "socket.io-client";

export default function HeroProduct() {
    const { data: hightlightProduct, isLoading, error } = useGetHighlightProduct();
    const [bidAmount, setBidAmount] = useState<number>(hightlightProduct ? hightlightProduct.minimalPrice : 0);
    const router = useRouter();

    if (isLoading) {
        return <div>Carregando produto...</div>
    }

    if (error || !hightlightProduct) {
        return <div>Erro ao carregar produto</div>
    }

    function handleClick() {
        const socket = io(`${process.env.NEXT_PUBLIC_BACK_URL}/ws`, {
            withCredentials: true,
        });


        if (!hightlightProduct) return;

        socket.emit('joinRoom', { productId: hightlightProduct.id });
        const max = hightlightProduct.bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: hightlightProduct.minimalPrice });
        if (bidAmount && bidAmount > hightlightProduct.minimalPrice && bidAmount > max.amount) {
            socket.emit('placeBid', { productId: hightlightProduct.id, amount: bidAmount });
        }
        router.push("/product/" + hightlightProduct.id);
    }

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
                                <h2>
                                    Preco Atual: <span className="text-primary">
                                        R${hightlightProduct.bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: hightlightProduct.minimalPrice }).amount}
                                    </span>
                                </h2>
                            </div>
                            <div className="w-full flex  gap-10 items-center ">
                                <Label className="sr-only">Search</Label>
                                <Input value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} className="w-2/3" placeholder="Fazer um lance" type="number" />
                                <Button onClick={() => handleClick()} className="w-min">Fazer lance</Button>
                            </div>

                        </div>
                        {/* Brands */}
                    </div>
                    {/* End Col */}
                    <div className="lg:col-span-4 mt-10 lg:mt-0">
                        <Image
                            width={300}
                            height={500}
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