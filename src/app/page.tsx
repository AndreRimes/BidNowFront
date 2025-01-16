import NavBar from "@/components/sections/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Hero from "@/components/ui/Hero";
import { getSession } from "@/utils/auth";
import ProductCard from "@/components/ui/productCard";
import Footer from "@/components/sections/Footer";
import ProductSection from "@/components/sections/ProductSection";

export default async function Home() {
  
  return (
    <div className="flex flex-col gap-1">
      <NavBar />
      <Hero />
      <ProductSection />
      <Footer />
    </div>
  );
}



