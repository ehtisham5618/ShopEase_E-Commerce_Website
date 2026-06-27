import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../lib/products";
import { addToCart } from "../lib/cart";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product, 1);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${product.name} added to cart!`);
    }, 300);
  };

  return (
    <Link 
      to="/product/$id"
      params={{ id: product.id.toString() }}
      className="group flex flex-col bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay Add to Cart button (visible on hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hidden md:flex">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black font-medium px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-100"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center gap-1.5 mb-4 mt-auto">
          <div className="flex items-center text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-foreground ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price & Mobile CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="md:hidden bg-primary/10 text-primary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
