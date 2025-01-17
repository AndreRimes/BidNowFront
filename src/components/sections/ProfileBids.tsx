"use client"

import { Bid, Product, userSession } from "@/utils/types"
import { Card, CardContent } from "../ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { useGetProductsWhereUserBid } from "@/utils/useQueryHooks"
import Link from "next/link"


export default function ProfileBids({user}:{user: userSession | null}) {
    const { data: products, isLoading, error } = useGetProductsWhereUserBid();

    if (isLoading) {
        return <div>Carregando produtos...</div>
    }

    if (error || !products) {
        return <div>Erro ao carregar produtos</div>
    }

    return (
         <div className="flex flex-col flex-grow gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
           <div className="flex flex-col flex-grow items-center ">
             <h2 className="text-3xl font-bold">Seus lances</h2>
                <UserBidsGrid userId={user?.id || ""} products={products} />
           </div>
         </div>
    )

}

export function UserBidsGrid({ products, userId }: { products: Product[], userId: string }) {

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from(new Set(products)).map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
                <UserBidsGridItem product={product} userId={userId} />
            </Link>
        ))}
      </div>
    </div>
  )
}

export function UserBidsGridItem({ product, userId }: { product: Product, userId: string }) {

    const winningBid = product.bids.reduce((maxBid, bid) => {
        if (maxBid === null || maxBid.amount < bid.amount) return bid;
        return maxBid;
    }, null as Bid | null);

    const myBid = product.bids.reduce((maxBid, bid) => {
        if (bid.user.id === userId && (maxBid === null || bid.amount > maxBid.amount)) {
            return bid;
        }
        return maxBid;
    }, null as Bid | null);


    if (!myBid || !winningBid) {
        return <div>Nenhum lance encontrado</div>
    }

    return (
        <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={product.files[0]?.url}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />
                </AspectRatio>
                <div className="p-3 space-y-1.5">
                    <div className="flex justify-between items-start">
                        <h2 className="text-base font-semibold truncate flex-1">{product.title}</h2>
                        <Badge variant={userId == winningBid.user.id ? "default" : "secondary"} className="ml-2">
                            {userId == winningBid.user.id ? "Winning" : "Outbid"}
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <div>
                            <p className="text-muted-foreground">Seu lance</p>
                            <p className="font-medium">${myBid?.amount.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-muted-foreground">Maior lance</p>
                            <p className={`font-medium ${winningBid.user.id !== userId ? 'text-destructive' : 'text-primary'}`}>
                                ${myBid.amount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                            {product.bids.length} total bids
                        </Badge>
                        {winningBid.amount > myBid?.amount && winningBid.user.id !== userId && (
                            <p className="text-xs text-destructive">
                                +${(winningBid.amount - myBid.amount).toFixed(2)} para vencer.
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}