import NavBar from "@/components/sections/NavBar";
import ProductPage from "@/components/sections/ProductPage";
import { getSession } from "@/utils/auth";


export default function Product({ params }: { params: { id: string } }) {
    const user = getSession();

    return (
        <div className="w-screen h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-grow items-center justify-center">
                <ProductPage user={user} id={params.id} />
            </div>
            
        </div>
    )
}