import NavBar from "@/components/sections/NavBar";
import HeroProduct from "@/components/ui/heroProduct";
import ProductCard from "@/components/ui/productCard";
import { CarouselSpacing } from "../page";


export default function UserDashboard() {

    return (
        <div className="w-screen flex flex-col items-center">
            <NavBar />
            <HeroProduct />



            <div className="flex flex-col items-center py-10 gap-20">
                <h1 className="w-full text-center text-5xl font-black">Produtos</h1>

                <div className="w-11/12">
                    <h3 className="text-xl ">Produtos Recomendados: </h3>
                    <CarouselSpacing />
                </div>

                <div className="w-11/12">
                    <h3 className="text-xl ">Produtos que voce ja deu um lance: </h3>
                    <CarouselSpacing />
                </div>
            </div>

        </div>
    )

}


