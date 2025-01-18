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
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Bid, Product, ProductStatus, userSession } from "@/utils/types"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ConfirmationModal } from "../ui/confirmation-modal"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { updateProductStatus } from "@/utils/api"
import { BuyerInfoModal } from "../ui/buyer-modal"


export default function ProductPage({ id, user }: { id: string, user: userSession | null }) {
  const { data: product, isLoading, error } = useGetProductById(id);

  const [bids, setBids] = useState(product ? product.bids : []);

  useEffect(() => {
    const socket = io('http://localhost:3334', {
      withCredentials: true,
    });
    socket.on('bidUpdate', (updatedBid: Bid) => {
      console.log('Updated bid received', updatedBid);
      setBids((prevBids) => [...prevBids, updatedBid]);
    });

    socket.on("error", (error) => {
      console.error("Error:", error);
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
   
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImage product={product}/>
      
      
        <div className="space-y-4 ">
          <ProductDescription product={product} />
        
        
          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <BidHistory bids={bids} minimalPrice={product.minimalPrice} />
              <Btns user={user} product={product} bids={bids} /> 
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



const ProductImage = ({ product }: { product: Product }) => {
  return (
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
  )
}


const ProductDescription = ({ product }: { product: Product }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
    </Card>
  )
}


export const BidHistory = ({ bids, minimalPrice }: { bids: Bid[], minimalPrice: number }) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Starting Price</p>
        <p className="text-lg font-semibold">R${minimalPrice}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Current Bid</p>
        <p className="text-lg font-semibold">
          R${bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: minimalPrice }).amount}
        </p>
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
    </>
  )
}


export const Btns = ({ user, product, bids }: { user: userSession | null, product: Product, bids: Bid[] }) => {
  const router = useRouter();
  const [bidAmount, setBidAmount] = useState<number>(product ? product.minimalPrice : 0);
  const { toast } = useToast();

  const placeBid = () => {
    const socket = io('http://localhost:3334', {
      withCredentials: true,
    });

    socket.emit('joinRoom', { productId: product.id });
    const max = bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: product.minimalPrice });
    if (bidAmount && bidAmount > product.minimalPrice && bidAmount > max.amount) {
      socket.emit('placeBid', { productId: product.id, amount: bidAmount });
    } else {
      toast({
        title: "Erro ao realizar a lance",
        description: "O valor da sua lance deve ser maior que o valor atual do produto",
      })
    }
    setBidAmount(0);
  };


  const handleSoldClick = () => {
    updateProductMutation({
      id: product.id,
      status: ProductStatus.SOLD,
    });
  }

  const queryClient = new QueryClient();
  const { mutate: updateProductMutation } = useMutation<Product, Error, { id: string, status: ProductStatus }>({
    mutationFn: ({ id, status }) => updateProductStatus(id, status),
    onSuccess: () => {
      toast({
        title: "Produto atualizado com sucesso",
        description: "Produto atualizado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["productById", product.id] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar produto",
        description: error.message,
      });
    }
  });

  const winningBid = product.bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: product.minimalPrice, user: { email: "", name: "", id: "" } });

  return (
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
                  <>
                    {
                      product.status === ProductStatus.ACTIVE ?
                        <>
                          <ConfirmationModal
                            itemName={product.title}
                            price={product.bids.reduce((maxBid, bid) => bid.amount > maxBid.amount ? bid : maxBid, { amount: product.minimalPrice }).amount}
                            onConfirm={() => handleSoldClick()}
                            onCancel={() => { }}
                            trigger={<Button>Vender o produto</Button>}
                          />
                        </>
                        :
                        <BuyerInfoModal
                          isBuyer={true}
                          buyerInfo={{
                            email: winningBid.user.email,
                            name: winningBid.user.name,
                          }}
                          trigger={<Button>Contacte o Comprardor</Button>}
                        />
                    }
                  </>
                  :
                  <>
                    {product.status === ProductStatus.ACTIVE ?
                      <>
                        <Input
                          type="number"
                          placeholder="Entre com o valor do seu lance"
                          onChange={(e) => setBidAmount(Number(e.target.value))}
                          value={bidAmount} />
                        <Button onClick={() => placeBid()}>Fazer Lance</Button>
                      </>
                      :
                      <>
                        {
                          winningBid.user.id === user.id ?
                            <BuyerInfoModal
                              isBuyer={false}
                              buyerInfo={{
                                email: product.user.email,
                                name: product.user.name,
                              }}
                              trigger={<Button>Contacte o Vendedor</Button>}
                            />
                            :
                            <div className="text-sm text-destructive">
                              Parece que esse produto foi vendido por outro comprador. Fique atento porque caso a compra
                              nao seja finalizado o vendedor pode botar esse produt o a venda denovo.
                            </div>
                        }
                      </>
                    }
                  </>
              }
            </>
          )
      }
    </div>
  )


}



