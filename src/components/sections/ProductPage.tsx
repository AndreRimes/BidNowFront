'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useGetProductById } from "@/utils/useQueryHooks"
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Bid, userSession } from "@/utils/types"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "@/utils/api"


export default function ProductPage({ id, user }: { id: string, user: userSession | null }) {
  const { data: product, isLoading, error } = useGetProductById(id);
  const [bids, setBids] = useState(product ? product.bids : []);
  const [bidAmount, setBidAmount] = useState<number>(product ? product.minimalPrice : 0);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const {mutate:deleteMutate} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produto excluído com sucesso",
        description: "Produto excluído com sucesso",
      });
      router.push("/");
    },
  });


  useEffect(() => {
    const socket = io('http://localhost:3334', {
      withCredentials: true,
    });
    socket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    socket.on('bidUpdate', (updatedBid: Bid) => {
      console.log('Updated bid received', updatedBid);
      setBids((prevBids) => [...prevBids, updatedBid]);
    });

    socket.on("error", (error: any) => {
      console.error("Error:", error);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    socket.emit('joinRoom', { productId: id });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if(!product) return;
    setBids((prevBids) => [...prevBids, ...product.bids]);
  }, [product]);

 
  if (isLoading) {
    return <div>Carregando produto...</div>;
  }

  if (error || !product) {
    return <div>Erro ao carregar produto</div>;
  }

  const placeBid = () => {
    const socket = io('http://localhost:3334', {
      withCredentials: true,
    });

    socket.emit('joinRoom', { productId: id });
    const max = bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: product.minimalPrice });
    if (bidAmount && bidAmount > product.minimalPrice && bidAmount > max.amount) {
      socket.emit('placeBid', { productId: id, amount: bidAmount });
    } else {
      toast({
        title: "Erro ao realizar a lance",
        description: "O valor da sua lance deve ser maior que o valor atual do produto",
      })
    }
    setBidAmount(0);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {product.files.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[9/13] relative overflow-hidden rounded-lg">
                    <img 
                      src={img.url} 
                      alt={`Product image ${index + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <h2 className="text-2xl font-bold text-center">{product.title}</h2>
        </div>
      
        <div className="space-y-4">
          {product.user.id === user?.id && (
            <div className="flex items-center justify-center w-full ">
              <Button className = "w-1/4"variant={"destructive"} onClick={() => deleteMutate(product.id)}>
                Excluir
              </Button>
            </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
          </Card>
        
          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Starting Price</p>
                <p className="text-lg font-semibold">R${product.minimalPrice}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-lg font-semibold">
                  R${bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: product.minimalPrice }).amount}
                </p>
                <div className="flex flex-wrap justify py-1 gap-1">
                  {product.tags.map((tag, index) => (
                  <span key={index} className="mr-1 px-2 py-1 bg-primary rounded-lg text-white text-sm">
                    {tag.name}
                  </span>
                ))}
            </div>
              </div>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {[...bids].reverse().map((bid, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <p className="text-sm font-medium">{bid.user.name}</p>
                    <p className="text-sm text-muted-foreground">R${bid.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                      }).format(new Date(bid.createdAt))}
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center justify-center gap-2">
                {
                  !user ?
                    <>
                      <Button onClick={() => router.push("/auth/login")}>Fazer Lance</Button>
                    </>
                    : (
                      <>
                        {
                          product.user.id === user?.id ?
                            <Button>Vender o produto</Button>
                            :
                            <>
                              <Input
                                type="number"
                                placeholder="Entre com o valor do seu lance"
                                onChange={(e) => setBidAmount(Number(e.target.value))}
                                value={bidAmount} />
                              <Button onClick={() => placeBid()}>Fazer Lance</Button>
                            </>
                        }
                      </>
                    )
                } 
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

