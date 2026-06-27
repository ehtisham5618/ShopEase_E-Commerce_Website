import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { getCart, getCartSubtotal, getCartTotal, SHIPPING_COST, clearCart, type CartItem } from "../lib/cart";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const items = getCart();
    if (items.length === 0 && !isSuccess) {
      navigate({ to: "/shop" });
    }
    setCartItems(items);
  }, [navigate, isSuccess]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal Code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    // Basic Payment Validation
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ""))) {
      newErrors.cardNumber = "Card must be 16 digits";
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = "Use MM/YY format";
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error for field when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[e.target.name];
        return newErr;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate({ to: "/" });
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg flex flex-col items-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for shopping with ShopEase. Your order has been successfully placed. You will be redirected to the homepage shortly.
        </p>
      </div>
    );
  }

  const subtotal = getCartSubtotal();
  const total = getCartTotal();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-1 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Shipping Information */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.name ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.email ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.phone ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.address ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="123 Main St, Apt 4B"
                  />
                  {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.city ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="New York"
                  />
                  {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.postalCode ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                      placeholder="10001"
                    />
                    {errors.postalCode && <p className="text-destructive text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.country ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                      placeholder="United States"
                    />
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>
              
              <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-3 mb-6 border border-primary/20">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">Credit / Debit Card</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                      className={`w-full p-3 pl-10 rounded-md border bg-background outline-none focus:ring-2 ${errors.cardNumber ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                      placeholder="0000 0000 0000 0000"
                    />
                    <CreditCard className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    maxLength={5}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.expiry ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <p className="text-destructive text-xs mt-1">{errors.expiry}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength={4}
                    className={`w-full p-3 rounded-md border bg-background outline-none focus:ring-2 ${errors.cvv ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'}`}
                    placeholder="123"
                  />
                  {errors.cvv && <p className="text-destructive text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Pay ${total.toFixed(2)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 shrink-0 order-1 lg:order-2">
          <div className="bg-muted/30 border border-border rounded-2xl p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden shrink-0 border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium line-clamp-1">{item.name}</div>
                    <div className="text-muted-foreground mt-1">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm mb-6 border-t pt-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${SHIPPING_COST.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
