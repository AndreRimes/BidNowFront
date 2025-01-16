import NavBar from "@/components/sections/NavBar";
import HeroProduct from "@/components/ui/heroProduct";
import ProductSectionUser from "@/components/sections/ProductSectionUser";
import Footer from "@/components/sections/Footer";


export default function UserDashboard() {
    

    return (
        <div className="flex flex-col gap-1">
            <NavBar />
            <HeroProduct />
            <ProductSectionUser />
            <Footer />
        </div>
    )

}


