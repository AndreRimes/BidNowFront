"use client";
import NavBar from "@/components/sections/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import blackScreen from "@/public/image.png";
import { LogOut } from "lucide-react";
import { logout } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


export default function Profile() {
    const { toast } = useToast();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast({
                title: "Sessão terminada com sucesso",
                description: "Você foi desconectado com sucesso",
            });
            router.push("/auth/login");
        },
        onError: (error) => {
            toast({
                title: "Erro ao desconectar",
                description: error.message,
            })
        }
    })

    return (
        <div className="flex flex-col gap-10 pb-10">
            {/* <NavBar /> */}

            <div className="w-full flex flex-col items-center gap-5">
                <h1 className="text-center text-5xl font-black">Meu Perfil</h1>
                <div className="flex flex-row flex-grow justify-between gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Meu nome</h2>
                        <h3 className="text-xl">Email: email@email.com</h3>
                        <h3 className="text-xl" >Senha: ******</h3>
                        <Button variant={"outline"}>Alterar Senha</Button>
                    </div>
                    <div>
                        <LogOut onClick={() => mutate()} className="text-primary" />
                    </div>
                </div>

     
                <div className="flex flex-col flex-grow gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
                    <div className="flex flex-col flex-grow items-center ">
                        <h2 className="text-3xl font-bold">Meus produtos a venda</h2>
                        <div className="container mx-auto p-4 flex justify-end">
                            <Button variant={"outline"}>Adicionar produto</Button>
                        </div>
                        <ProductGrid />
                    </div>
                </div>

                <div className="flex flex-col flex-grow gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
                    <div className="flex flex-col flex-grow items-center ">
                        <h2 className="text-3xl font-bold">Seus lances</h2>
                        <UserBidsGrid /> 
                    </div>
                </div>
            </div>
        </div>
    )
}


const products = [
  {
    id: 1,
    title: "Vintage Camera",
    image: blackScreen,
    initialPrice: 100,
    currentPrice: 150,
    bids: 5,
  },
  {
    id: 2,
    title: "Leather Backpack",
    image: blackScreen,
    initialPrice: 80,
    currentPrice: 95,
    bids: 3,
  },
  {
    id: 3,
    title: "Smartwatch",
    image: blackScreen,
    initialPrice: 200,
    currentPrice: 220,
    bids: 7,
  },

  {
    id: 3,
    title: "Smartwatch",
    image: blackScreen,
    initialPrice: 200,
    currentPrice: 220,
    bids: 7,
  },

  {
    id: 3,
    title: "Smartwatch",
    image: blackScreen,
    initialPrice: 200,
    currentPrice: 220,
    bids: 7,
  },

  {
    id: 3,
    title: "Smartwatch",
    image: blackScreen,
    initialPrice: 200,
    currentPrice: 220,
    bids: 7,
  },
]



export function ProductGrid() {
    return (
        <div className="container mx-auto p-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </AspectRatio>
                            <div className="p-3 space-y-1.5">
                                <h2 className="text-base font-semibold truncate">{product.title}</h2>
                                <div className="flex justify-between items-center text-xs">
                                    <div>
                                        <p className="text-muted-foreground">Initial Price</p>
                                        <p className="font-medium">${product.initialPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Current Price</p>
                                        <p className="font-medium text-primary">${product.currentPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Badge variant="secondary">{product.bids} bids</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
  )
}

const userBids = [
  {
    id: 1,
    title: "Vintage Camera",
    image: blackScreen,
    yourBid: 145,
    currentBid: 150,
    totalBids: 5,
    isWinning: false,
  },
  {
    id: 2,
    title: "Leather Backpack",
    image: blackScreen,
    yourBid: 95,
    currentBid: 95,
    totalBids: 3,
    isWinning: true,
  },
  {
    id: 3,
    title: "Smartwatch",
    image: blackScreen,
    yourBid: 210,
    currentBid: 220,
    totalBids: 7,
    isWinning: false,
  },
  {
    id: 4,
    title: "Wireless Earbuds",
    image: blackScreen,
    yourBid: 135,
    currentBid: 135,
    totalBids: 4,
    isWinning: true,
  },
]

export  function UserBidsGrid() {
  return (
    <div className="container mx-auto p-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userBids.map((bid) => (
          <Card key={bid.id} className="overflow-hidden">
            <CardContent className="p-0">
              <AspectRatio ratio={16/9}>
                <Image
                  src={bid.image}
                  alt={bid.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <div className="p-3 space-y-1.5">
                <div className="flex justify-between items-start">
                  <h2 className="text-base font-semibold truncate flex-1">{bid.title}</h2>
                  <Badge variant={bid.isWinning ? "default" : "secondary"} className="ml-2">
                    {bid.isWinning ? "Winning" : "Outbid"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <p className="text-muted-foreground">Your Bid</p>
                    <p className="font-medium">${bid.yourBid.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Current Bid</p>
                    <p className={`font-medium ${bid.currentBid > bid.yourBid ? 'text-destructive' : 'text-primary'}`}>
                      ${bid.currentBid.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {bid.totalBids} total bids
                  </Badge>
                  {bid.currentBid > bid.yourBid && (
                    <p className="text-xs text-destructive">
                      +${(bid.currentBid - bid.yourBid).toFixed(2)} to win
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}