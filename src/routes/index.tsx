import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { getFeaturedProducts } from "../lib/products";
import { ProductCard } from "../components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopEase | Premium E-Commerce" },
      { name: "description", content: "Shop the best electronics, clothing, and accessories." },
    ],
  }),
  component: Index,
});

function Index() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-muted pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-in slide-in-from-bottom-4">
            Welcome to ShopEase
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl animate-in slide-in-from-bottom-6">
            Elevate Your Everyday <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
              Style & Tech
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl animate-in slide-in-from-bottom-8">
            Discover our curated collection of premium electronics, stylish apparel, and handcrafted accessories designed for modern living.
          </p>
          <div className="flex gap-4 animate-in slide-in-from-bottom-10">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">On all orders over $50.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">100% secure checkout.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Always here to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked favorites from our collection.</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
