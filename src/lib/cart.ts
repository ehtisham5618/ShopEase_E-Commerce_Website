// ============================================================
// cart.ts — ShopEase Cart Management
// All cart operations use localStorage under key "shopease_cart"
// Uses JSON.parse / JSON.stringify for safe serialization.
// ============================================================

import type { Product } from "./products";

// ── Types ────────────────────────────────────────────────────

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

// ── Constants ────────────────────────────────────────────────

const CART_KEY = "shopease_cart";
export const SHIPPING_COST = 5.0;

// ── Internal helpers ─────────────────────────────────────────

/** Safely read cart from localStorage */
function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Validate it is an array
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Safely write cart to localStorage */
function writeCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch custom event so React components can update
    window.dispatchEvent(new Event("cart-updated"));
  } catch (e) {
    console.error("ShopEase: Could not persist cart to localStorage:", e);
  }
}

// ── Public API ───────────────────────────────────────────────

/**
 * Get the full cart array from localStorage.
 */
export function getCart(): CartItem[] {
  return readCart();
}

/**
 * Get total number of items (sum of quantities) in cart.
 * Used to update the navbar badge.
 */
export function getCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get cart subtotal (sum of price × quantity for all items).
 */
export function getCartSubtotal(): number {
  return readCart().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

/**
 * Get cart total including flat shipping.
 * Returns 0 if cart is empty (no shipping charge on empty cart).
 */
export function getCartTotal(): number {
  const subtotal = getCartSubtotal();
  return subtotal > 0 ? subtotal + SHIPPING_COST : 0;
}

/**
 * Add a product to cart. If the product already exists, increment quantity.
 * @param product  — The product to add
 * @param quantity — How many to add (default 1)
 */
export function addToCart(product: Product, quantity = 1): void {
  const cart = readCart();
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex >= 0) {
    // Product already in cart — increase quantity
    cart[existingIndex].quantity += quantity;
  } else {
    // New product — add to cart
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      quantity,
    };
    cart.push(newItem);
  }

  writeCart(cart);
}

/**
 * Remove a product from cart entirely by product id.
 */
export function removeFromCart(productId: number): void {
  const cart = readCart().filter((item) => item.id !== productId);
  writeCart(cart);
}

/**
 * Update quantity for a specific cart item.
 * If quantity ≤ 0, the item is removed from the cart.
 */
export function updateQuantity(productId: number, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = readCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index >= 0) {
    cart[index].quantity = quantity;
    writeCart(cart);
  }
}

/**
 * Clear the entire cart.
 */
export function clearCart(): void {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error("ShopEase: Could not clear cart:", e);
  }
}
