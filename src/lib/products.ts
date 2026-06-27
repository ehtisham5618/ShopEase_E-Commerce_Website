// ============================================================
// products.ts — ShopEase Product Catalog
// All products for the store with id, name, category, price,
// image (picsum.photos), description, and optional rating.
// ============================================================

export interface Product {
  id: number;
  name: string;
  category: "Electronics" | "Clothing" | "Accessories";
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
}

// ── Product Data ─────────────────────────────────────────────
export const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "ProSound Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    image: "https://loremflickr.com/400/300/headphones,product?lock=1",
    description:
      "Experience crystal-clear audio with our flagship wireless headphones. Features 40-hour battery life, active noise cancellation, and premium comfort ear cushions for all-day listening.",
    rating: 4.8,
    reviews: 2340,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "UltraView 4K Smart TV",
    category: "Electronics",
    price: 749.99,
    image: "https://loremflickr.com/400/300/smarttv,television?lock=2",
    description:
      "Immerse yourself in stunning 4K HDR visuals on our 55-inch Smart TV. Powered by our blazing-fast processor and built-in streaming apps, it's the centerpiece your living room deserves.",
    rating: 4.7,
    reviews: 1820,
    badge: "New",
  },
  {
    id: 3,
    name: "SwiftCharge Laptop Pro",
    category: "Electronics",
    price: 1099.99,
    image: "https://loremflickr.com/400/300/laptop,macbook?lock=3",
    description:
      "Power through any task with the SwiftCharge Laptop Pro — featuring an Intel Core i7, 16GB RAM, 512GB SSD, and a stunning 14-inch IPS display that's ready for work and play.",
    rating: 4.9,
    reviews: 987,
    badge: "Top Rated",
  },
  {
    id: 4,
    name: "SpeedShot Gaming Mouse",
    category: "Electronics",
    price: 59.99,
    image: "https://loremflickr.com/400/300/mouse,gaming?lock=4",
    description:
      "Dominate every game with 25,600 DPI precision, 7 programmable buttons, and RGB lighting. Ergonomic design built for marathon gaming sessions without the strain.",
    rating: 4.6,
    reviews: 4120,
  },
  {
    id: 5,
    name: "PocketCam 4K Action Camera",
    category: "Electronics",
    price: 249.99,
    image: "https://loremflickr.com/400/300/camera,gopro?lock=5",
    description:
      "Capture your greatest adventures in stunning 4K at 60fps. Waterproof to 30m, image stabilized, and packed into a shirt-pocket form factor that goes anywhere you do.",
    rating: 4.5,
    reviews: 763,
  },

  // Clothing
  {
    id: 6,
    name: "Urban Flex Jogger Pants",
    category: "Clothing",
    price: 54.99,
    image: "https://loremflickr.com/400/300/joggers,pants?lock=6",
    description:
      "The perfect blend of style and function. Our tapered joggers feature moisture-wicking fabric, a comfortable elastic waistband, and deep pockets for all your essentials.",
    rating: 4.7,
    reviews: 3210,
    badge: "Best Seller",
  },
  {
    id: 7,
    name: "CloudSoft Hoodie",
    category: "Clothing",
    price: 79.99,
    image: "https://loremflickr.com/400/300/hoodie,sweatshirt?lock=7",
    description:
      "Wrapped in ultra-soft French terry cotton, this relaxed-fit hoodie is your go-to for cozy weekends. Features a kangaroo pocket, adjustable drawstrings, and a brushed interior.",
    rating: 4.8,
    reviews: 2890,
  },
  {
    id: 8,
    name: "Summit Trek Jacket",
    category: "Clothing",
    price: 149.99,
    image: "https://loremflickr.com/400/300/jacket,coat?lock=8",
    description:
      "Face any weather in this windproof, water-resistant shell jacket. Lightweight enough to pack into its own pocket, durable enough for serious mountain conditions.",
    rating: 4.6,
    reviews: 1450,
    badge: "New",
  },
  {
    id: 9,
    name: "Essential Slim Fit T-Shirt",
    category: "Clothing",
    price: 29.99,
    image: "https://loremflickr.com/400/300/tshirt,tee?lock=9",
    description:
      "The wardrobe staple refined. Made from 100% Supima cotton, this slim-fit tee offers a superior hand feel, holds its shape wash after wash, and comes in 12 versatile colors.",
    rating: 4.5,
    reviews: 5670,
  },

  // Accessories
  {
    id: 10,
    name: "Chrono Titanium Watch",
    category: "Accessories",
    price: 299.99,
    image: "https://loremflickr.com/400/300/watch,rolex?lock=10",
    description:
      "A masterpiece of precision engineering. This automatic-movement titanium watch features a sapphire crystal face, 100m water resistance, and a refined design that transcends trends.",
    rating: 4.9,
    reviews: 892,
    badge: "Premium",
  },
  {
    id: 11,
    name: "LeatherCraft Bifold Wallet",
    category: "Accessories",
    price: 44.99,
    image: "https://loremflickr.com/400/300/wallet,leather?lock=11",
    description:
      "Handcrafted from full-grain vegetable-tanned leather, this slim bifold wallet holds 8 cards and cash while developing a rich, unique patina over years of use.",
    rating: 4.7,
    reviews: 3400,
  },
  {
    id: 12,
    name: "VoyageMax Backpack",
    category: "Accessories",
    price: 89.99,
    image: "https://loremflickr.com/400/300/backpack,bag?lock=12",
    description:
      "The ultimate everyday carry. This 30L backpack features a padded 15.6-inch laptop sleeve, hidden anti-theft pocket, USB charging port passthrough, and weatherproof 900D polyester.",
    rating: 4.8,
    reviews: 2150,
    badge: "Best Seller",
  },
  {
    id: 13,
    name: "PolarPro Sunglasses",
    category: "Accessories",
    price: 119.99,
    image: "https://loremflickr.com/400/300/sunglasses,shades?lock=13",
    description:
      "Polarized UV400 lenses eliminate glare and protect your eyes in style. Lightweight titanium frames, spring hinges, and scratch-resistant lenses built for everyday adventure.",
    rating: 4.6,
    reviews: 1890,
  },
  {
    id: 14,
    name: "SmartTrack Fitness Band",
    category: "Electronics",
    price: 49.99,
    image: "https://loremflickr.com/400/300/smartwatch,fitness?lock=14",
    description:
      "Track your health 24/7 with heart rate monitoring, sleep tracking, step counting, and 15 workout modes. 10-day battery life, IP68 waterproof, and syncs seamlessly with your phone.",
    rating: 4.4,
    reviews: 6230,
  },
];

// ── Helper Utilities ─────────────────────────────────────────

/** Get a single product by id */
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Get products by category */
export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category);
}

/** Get featured products (first 6) */
export function getFeaturedProducts(): Product[] {
  return products.slice(0, 6);
}
