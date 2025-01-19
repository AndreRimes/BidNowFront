import NavBar from "@/components/sections/NavBar";
import Hero from "@/components/ui/Hero";
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



