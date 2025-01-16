import NavBar from "@/components/sections/NavBar";
import ProductPage from "@/components/sections/ProductPage";


export default function Product({ params }: { params: { id: string } }) {

    return (
        <div className="w-screen h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-grow items-center justify-center">
                <ProductPage id={params.id} />
            </div>
            
        </div>
    )
}