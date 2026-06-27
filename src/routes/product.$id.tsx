import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, ShieldCheck, Truck } from "lucide-react";
import { getProductById } from "../lib/products";
import { addToCart } from "../lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProductById(Number(id));
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for doesn't exist or has been removed.</p>
        <Link 
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${quantity} x ${product.name} added to cart!`, {
        action: {
          label: "View Cart",
          onClick: () => navigate({ to: "/cart" })
        }
      });
    }, 400);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.category}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl overflow-hidden bg-muted relative aspect-square">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                {product.badge}
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-8">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-amber-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-base font-medium text-foreground ml-1.5">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground underline decoration-dotted underline-offset-4 cursor-pointer">
              {product.reviews} reviews
            </span>
          </div>

          <div className="text-3xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            {product.description}
          </p>

          <hr className="border-border mb-8" />

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-input rounded-md h-12 w-32 shrink-0">
              <button 
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center font-medium">
                {quantity}
              </div>
              <button 
                onClick={handleIncrement}
                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              {isAdding ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="bg-background p-2 rounded-full text-primary shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Free Delivery</h4>
                <p className="text-xs text-muted-foreground">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="bg-background p-2 rounded-full text-primary shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Secure Payment</h4>
                <p className="text-xs text-muted-foreground">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
