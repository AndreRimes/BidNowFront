import NavBar from "@/components/sections/NavBar";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { getSession } from "@/utils/auth";
import UserInfo from "@/components/sections/UserInfo";
import MyProducts from "@/components/sections/MyProducts";


export default function Profile() {
  const user = getSession();
  
  return (
    <div className="flex flex-col items-center gap-10 pb-10">
      <NavBar />
      <UserInfo user={user} />
      <MyProducts />
      


         {/* <div className="flex flex-col flex-grow gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
           <div className="flex flex-col flex-grow items-center ">
             <h2 className="text-3xl font-bold">Seus lances</h2>
             <UserBidsGrid />
           </div>
         </div> */}
       </div>
  )
}

// export function UserBidsGrid() {
//   return (
//     <div className="container mx-auto p-4 w-full">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {userBids.map((bid) => (
//           <Card key={bid.id} className="overflow-hidden">
//             <CardContent className="p-0">
//               <AspectRatio ratio={16 / 9}>
//                 <Image
//                   src={bid.image}
//                   alt={bid.title}
//                   fill
//                   className="object-cover"
//                 />
//               </AspectRatio>
//               <div className="p-3 space-y-1.5">
//                 <div className="flex justify-between items-start">
//                   <h2 className="text-base font-semibold truncate flex-1">{bid.title}</h2>
//                   <Badge variant={bid.isWinning ? "default" : "secondary"} className="ml-2">
//                     {bid.isWinning ? "Winning" : "Outbid"}
//                   </Badge>
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                   <div>
//                     <p className="text-muted-foreground">Your Bid</p>
//                     <p className="font-medium">${bid.yourBid.toFixed(2)}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-muted-foreground">Current Bid</p>
//                     <p className={`font-medium ${bid.currentBid > bid.yourBid ? 'text-destructive' : 'text-primary'}`}>
//                       ${bid.currentBid.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <Badge variant="outline" className="text-xs">
//                     {bid.totalBids} total bids
//                   </Badge>
//                   {bid.currentBid > bid.yourBid && (
//                     <p className="text-xs text-destructive">
//                       +${(bid.currentBid - bid.yourBid).toFixed(2)} to win
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }