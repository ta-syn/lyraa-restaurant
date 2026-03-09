/**
 * Lyraa Restaurant Website Data
 * This file contains all the static content for the website.
 * No hardcoded data should be used in components.
 */

export const RESTAURANT = {
  name: "Lyraa",
  tagline: "Where Every Bite Tells a Story",
  description: "A fine dining experience crafted with passion, premium ingredients, and decades of culinary mastery. Located in the heart of the city.",
  established: "1998",
  address: "123 Golden Avenue, Dhaka, Bangladesh",
  phone: "+880 1700-000000",
  email: "hello@lyraa.com",
  openHours: {
    weekdays: "12:00 PM — 11:00 PM",
    weekends: "11:00 AM — 12:00 AM",
    closed: "Monday"
  },
  social: {
    instagram: "#",
    facebook: "#",
    twitter: "#"
  }
};

export const MENU_ITEMS = [
  // STARTERS (4 items)
  {
    id: 1,
    category: "Starters",
    name: "Truffle Arancini",
    description: "Crispy risotto balls with black truffle, aged parmesan, and herb aioli",
    price: "$18",
    image: "/images/menu/starter1.png",
    badge: "Chef's Pick",
    badgeColor: "#D4A853",
    isSpicy: false,
    isVeg: true
  },
  {
    id: 2,
    category: "Starters",
    name: "Seared Scallops",
    description: "Pan-seared Atlantic scallops with cauliflower purée and crispy capers",
    price: "$24",
    image: "/images/menu/starter2.png",
    badge: null,
    isSpicy: false,
    isVeg: false
  },
  {
    id: 3,
    category: "Starters",
    name: "Burrata Caprese",
    description: "Fresh burrata with heirloom tomatoes, basil oil, and aged balsamic reduction",
    price: "$16",
    image: "/images/menu/starter3.png",
    badge: "Popular",
    badgeColor: "#8B0000",
    isSpicy: false,
    isVeg: true
  },
  {
    id: 4,
    category: "Starters",
    name: "Wagyu Tartare",
    description: "Hand-cut wagyu beef with quail egg, capers, shallots, and Dijon mustard",
    price: "$32",
    image: "/images/menu/starter4.png",
    badge: "Premium",
    badgeColor: "#D4A853",
    isSpicy: false,
    isVeg: false
  },

  // MAIN COURSE (4 items)
  {
    id: 5,
    category: "Main Course",
    name: "Dry-Aged Ribeye",
    description: "28-day dry-aged ribeye with roasted bone marrow, truffle butter, and seasonal vegetables",
    price: "$68",
    image: "/images/menu/main1.png",
    badge: "Signature",
    badgeColor: "#D4A853",
    isSpicy: false,
    isVeg: false
  },
  {
    id: 6,
    category: "Main Course",
    name: "Lobster Thermidor",
    description: "Whole Maine lobster in classic cream sauce with gruyère gratin and fresh herbs",
    price: "$85",
    image: "/images/menu/main2.png",
    badge: "Best Seller",
    badgeColor: "#8B0000",
    isSpicy: false,
    isVeg: false
  },
  {
    id: 7,
    category: "Main Course",
    name: "Wild Mushroom Risotto",
    description: "Arborio rice with porcini, chanterelle, truffle oil, and aged parmesan reggiano",
    price: "$38",
    image: "/images/menu/main3.png",
    badge: null,
    isSpicy: false,
    isVeg: true
  },
  {
    id: 8,
    category: "Main Course",
    name: "Duck Confit",
    description: "Slow-cooked duck leg with cherry pink peppercorn, pommes sarladaises, and wilted greens",
    price: "$52",
    image: "/images/menu/main4.png",
    badge: "Chef's Pick",
    badgeColor: "#D4A853",
    isSpicy: false,
    isVeg: false
  },

  // DESSERTS (3 items)
  {
    id: 9,
    category: "Desserts",
    name: "Valrhona Chocolate Soufflé",
    description: "Warm dark chocolate soufflé with vanilla bean ice cream and gold dust",
    price: "$16",
    image: "/images/menu/dessert1.png",
    badge: "Must Try",
    badgeColor: "#D4A853",
    isSpicy: false,
    isVeg: true
  },
  {
    id: 10,
    category: "Desserts",
    name: "Crème Brûlée",
    description: "Classic vanilla bean custard with caramelized sugar crust and fresh berries",
    price: "$12",
    image: "/images/menu/dessert2.png",
    badge: null,
    isSpicy: false,
    isVeg: true
  },
  {
    id: 11,
    category: "Desserts",
    name: "Tiramisu Royale",
    description: "Deconstructed tiramisu with espresso gelée, mascarpone foam, and cocoa tuile",
    price: "$14",
    image: "/images/menu/dessert3.png",
    badge: "Popular",
    badgeColor: "#8B0000",
    isSpicy: false,
    isVeg: true
  },

  // DRINKS (3 items)
  {
    id: 12,
    category: "Drinks",
    name: "Lyraa Signature Cocktail",
    description: "House blend with aged whiskey, honey, lemon, and aromatic bitters",
    price: "$18",
    image: "/images/menu/drink1.png",
    badge: "Signature",
    badgeColor: "#D4A853",
    isSpicy: false,
    isVeg: true
  },
  {
    id: 13,
    category: "Drinks",
    name: "Fine Wine Selection",
    description: "Curated selection of old and new world wines from our award-winning cellar",
    price: "$24+",
    image: "/images/menu/drink2.png",
    badge: null,
    isSpicy: false,
    isVeg: true
  },
  {
    id: 14,
    category: "Drinks",
    name: "Artisan Coffee",
    description: "Single-origin pour-over coffee with house-made cream and chocolate",
    price: "$8",
    image: "/images/menu/drink3.png",
    badge: null,
    isSpicy: false,
    isVeg: true
  },
];

export const MENU_CATEGORIES = [
  "All", "Starters", "Main Course", "Desserts", "Drinks"
];

export const GALLERY = [
  { id: 1, src: "/images/gallery/food-1.png", alt: "Signature Ribeye", span: "large" },
  { id: 2, src: "/images/gallery/food-2.png", alt: "Lobster Dish", span: "normal" },
  { id: 3, src: "/images/gallery/food-3.png", alt: "Restaurant Interior", span: "normal" },
  { id: 4, src: "/images/gallery/food-4.png", alt: "Chocolate Soufflé", span: "normal" },
  { id: 5, src: "/images/gallery/food-5.png", alt: "Wine Collection", span: "normal" },
  { id: 6, src: "/images/gallery/food-6.png", alt: "Chef at Work", span: "large" },
  { id: 7, src: "/images/gallery/food-7.png", alt: "Table Setting", span: "normal" },
  { id: 8, src: "/images/gallery/food-8.png", alt: "Dessert Plating", span: "normal" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Alexandra Dubois",
    role: "Food Critic, Le Monde",
    avatar: "AD",
    avatarBg: "#D4A853",
    rating: 5,
    text: "Lyraa has redefined fine dining in the city. The dry-aged ribeye is simply transcendent — a masterpiece of flavor and technique. An unforgettable culinary journey.",
    date: "October 2024"
  },
  {
    id: 2,
    name: "James Wellington",
    role: "Regular Guest",
    avatar: "JW",
    avatarBg: "#8B4513",
    rating: 5,
    text: "We celebrated our anniversary here and it was perfect in every way. The ambiance, the service, the food — absolute perfection. Lyraa is our forever special occasion restaurant.",
    date: "November 2024"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Travel & Food Blogger",
    avatar: "PS",
    avatarBg: "#8B0000",
    rating: 5,
    text: "The lobster thermidor alone is worth the trip. Every dish tells a story. The sommelier's wine pairing made the evening truly special. This is world-class dining.",
    date: "December 2024"
  },
];

export const SPECIAL_OFFER = {
  title: "Chef's Tasting Menu",
  subtitle: "Limited Time Experience",
  description: "7-course culinary journey featuring our finest seasonal ingredients, paired with premium wines. A once-in-a-season experience crafted by Chef Marco.",
  originalPrice: "$180",
  offerPrice: "$120",
  discount: "33% OFF",
  includes: [
    "7 signature courses",
    "Wine pairing included",
    "Complimentary amuse-bouche",
    "Personalized menu card",
    "Chef's table option available"
  ],
  endDate: "2026-03-31T23:59:59",
  image: "/images/special-offer.png"
};

export const STATS = [
  { number: 28, suffix: "+", label: "Years of Excellence" },
  { number: 50000, suffix: "+", label: "Happy Guests" },
  { number: 120, suffix: "+", label: "Menu Items" },
  { number: 15, suffix: "", label: "Awards Won" },
];

export const CHEF = {
  name: "Chef Marco Rosetti",
  title: "Executive Chef & Founder",
  bio: "With 25 years of culinary mastery across Paris, Milan, and New York, Chef Marco brings his world-class expertise to every dish at Lyraa. His philosophy: only the finest ingredients, crafted with love.",
  image: "/images/about-chef.png",
  awards: ["Michelin Recommended 2023", "Best Chef Award 2022", "James Beard Nominee 2021"]
};
