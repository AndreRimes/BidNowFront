"use client"
import { useGetTaggedProducts, useGetProductsWhereUserBid } from "@/utils/useQueryHooks";
import CarouselSpacing from "../ui/carousel-spacing";



export default function ProductSectionUser() {
    const { data: taggedProducts, isLoading, error } = useGetTaggedProducts();
    const {data: bidProducts, isLoading: isBidLoading, error: bidError} = useGetProductsWhereUserBid();
    
    if (isLoading || isBidLoading) {
        return <div>Carregando produtos...</div>
    }
    if (error || !taggedProducts  || bidError) {
        return <div>Erro ao carregar produtos</div>
    }

    return (
        <div className="flex flex-col items-center py-10 gap-20">
            <h1 className="w-full text-center text-5xl font-black">Produtos</h1>

            <div className="w-11/12">
                <h3 className="text-xl">Todos os Recomendados: </h3>
                <CarouselSpacing products={taggedProducts} />
            </div>

            <div className="w-11/12">
                <h3 className="text-xl ">Produtos que voce ja deu um lance: </h3>
                <CarouselSpacing products={bidProducts ? bidProducts : []} />
            </div>
        </div>
    )
}