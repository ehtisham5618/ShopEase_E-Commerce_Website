import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { getCart, updateQuantity, removeFromCart, getCartSubtotal, getCartTotal, SHIPPING_COST, type CartItem } from "../lib/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Load cart data
  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you'll love.
        </p>
        <Link 
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:-translate-y-1"
        >
          Start Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  const subtotal = getCartSubtotal();
  const total = getCartTotal();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="border border-border rounded-2xl overflow-hidden bg-card">
            {/* Header (Desktop only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            {/* Items */}
            <div className="divide-y divide-border">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center">
                  
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <Link to={`/product/${item.id}`} className="shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
                      <Link to={`/product/${item.id}`} className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <div className="text-muted-foreground mt-1">${item.price.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Mobile Layout Container */}
                  <div className="col-span-1 md:col-span-6 grid grid-cols-3 gap-4 items-center mt-2 md:mt-0">
                    {/* Quantity Control */}
                    <div className="col-span-2 md:col-span-2 md:col-start-1 flex justify-start md:justify-center">
                      <div className="flex items-center border border-input rounded-md h-10 w-28 bg-background">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <div className="flex-1 text-center font-medium text-sm">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="col-span-1 md:col-span-1 font-bold text-right text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="hidden md:flex col-span-1 justify-end">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Mobile Remove Button */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="md:hidden w-full py-2 mt-2 text-sm font-medium text-destructive flex items-center justify-center gap-2 border border-destructive/20 rounded-md hover:bg-destructive/5"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-muted/30 border border-border rounded-2xl p-6 lg:p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping Estimate</span>
                <span className="font-medium">${SHIPPING_COST.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-right">Includes taxes if applicable</p>
            </div>

            <Link
              to="/checkout"
              className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-md"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="mt-6">
              <Link to="/shop" className="text-sm text-primary hover:underline flex items-center justify-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
