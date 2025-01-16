"use client"
import { useGetAllProducts, useGetHighlightProducts } from "@/utils/useQueryHooks";
import CarouselSpacing from "../ui/carousel-spacing"

export default function ProductSection() {
    const { data: allProducts, isLoading, error } = useGetAllProducts();
    const { data: highlightProducts, isLoading: isHighlightLoading, error: highlightError } = useGetHighlightProducts();

    if (isLoading || isHighlightLoading) {
        return <div>Carregando produtos...</div>
    }

    if (error || highlightError || !allProducts || !highlightProducts) {
        return <div>Erro ao carregar produtos</div>
    }


    return (
        <div id="products" className="flex flex-col items-center py-10 gap-20">
            <h1 className="w-full text-center text-5xl font-black">Produtos</h1>

            <div className="w-11/12">
                <h3 className="text-xl ">Produtos destaques: </h3>
                <CarouselSpacing products={highlightProducts} />
            </div>

            <div className="w-11/12">
                <h3 className="text-xl ">Produtos para voce: </h3>
                <CarouselSpacing products={allProducts} />
            </div>
        </div>
    )
}
