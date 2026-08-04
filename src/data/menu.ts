import cafeLatte from "@/assets/cafe-latte.jpg";
import cafeColdbrew from "@/assets/cafe-coldbrew.jpg";
import cafeMatcha from "@/assets/cafe-matcha.jpg";
import cafeTonic from "@/assets/cafe-tonic.jpg";
import cafeDessert from "@/assets/cafe-dessert.jpg";
import cafeCroissant from "@/assets/cafe-croissant.jpg";
import cafeTray from "@/assets/cafe-tray.jpg";
import cafeTea from "@/assets/cafe-tea.jpg";

export type Dietary = "Vegetarian" | "Vegan" | "Gluten-free" | "Contains nuts" | "Dairy-free option";

export type MenuCategory =
  | "signature-coffee"
  | "cold-brews"
  | "wellness"
  | "tea"
  | "desserts"
  | "light-bites"
  | "pairings";

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "signature-coffee", label: "Signature Coffee" },
  { id: "cold-brews", label: "Cold Brews" },
  { id: "wellness", label: "Wellness Drinks" },
  { id: "tea", label: "Artisanal Tea" },
  { id: "desserts", label: "Desserts" },
  { id: "light-bites", label: "Light Bites" },
  { id: "pairings", label: "Salon Pairings" },
];

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: string;
  dietary: Dietary[];
  image?: string;
  alt?: string;
  featured?: boolean;
};

/** Editable: the full café menu. */
export const menuItems: MenuItem[] = [
  {
    id: "m1",
    category: "signature-coffee",
    name: "Rose Vanilla Latte",
    description: "Single-origin espresso, steamed milk, rose water and Madagascan vanilla.",
    price: "₹ 320",
    dietary: ["Vegetarian", "Dairy-free option"],
    image: cafeLatte,
    alt: "Rose vanilla latte in a glass cup with a rose beside it",
    featured: true,
  },
  {
    id: "m2",
    category: "signature-coffee",
    name: "House Espresso",
    description: "A seasonal blend pulled short, with cocoa and dried fig in the finish.",
    price: "₹ 180",
    dietary: ["Vegan", "Gluten-free"],
  },
  {
    id: "m3",
    category: "signature-coffee",
    name: "Cortado",
    description: "Equal parts espresso and warm milk, poured to a velvet texture.",
    price: "₹ 240",
    dietary: ["Vegetarian", "Dairy-free option"],
  },
  {
    id: "m4",
    category: "signature-coffee",
    name: "Cardamom Flat White",
    description: "Green cardamom folded through microfoam over a double ristretto.",
    price: "₹ 300",
    dietary: ["Vegetarian"],
  },
  {
    id: "m5",
    category: "cold-brews",
    name: "Sea Salt Caramel Cold Brew",
    description: "Sixteen-hour cold brew with salted caramel cream cascading over ice.",
    price: "₹ 360",
    dietary: ["Vegetarian"],
    image: cafeColdbrew,
    alt: "Tall glass of sea salt caramel cold brew with cream poured over ice",
    featured: true,
  },
  {
    id: "m6",
    category: "cold-brews",
    name: "Black Cold Brew",
    description: "Clean, low-acid and unsweetened. Served over a single clear cube.",
    price: "₹ 280",
    dietary: ["Vegan", "Gluten-free"],
  },
  {
    id: "m7",
    category: "cold-brews",
    name: "Orange Blossom Tonic Coffee",
    description: "Espresso, tonic and orange blossom over ice — bright and lifted.",
    price: "₹ 340",
    dietary: ["Vegan", "Dairy-free option"],
  },
  {
    id: "m8",
    category: "wellness",
    name: "Matcha Cloud",
    description: "Ceremonial matcha under a slow-whipped milk cloud.",
    price: "₹ 380",
    dietary: ["Vegetarian", "Dairy-free option"],
    image: cafeMatcha,
    alt: "Matcha latte with a soft foam cloud in a handmade ceramic cup",
    featured: true,
  },
  {
    id: "m9",
    category: "wellness",
    name: "Beauty Berry Tonic",
    description: "Hibiscus, blackberry, rose and a squeeze of lime over crushed ice.",
    price: "₹ 340",
    dietary: ["Vegan", "Gluten-free"],
    image: cafeTonic,
    alt: "Berry wellness tonic in a stemmed glass garnished with dried rose",
    featured: true,
  },
  {
    id: "m10",
    category: "wellness",
    name: "Turmeric Golden Milk",
    description: "Turmeric, black pepper and jaggery in slow-warmed milk.",
    price: "₹ 300",
    dietary: ["Vegetarian", "Gluten-free", "Dairy-free option"],
  },
  {
    id: "m11",
    category: "tea",
    name: "First Flush Darjeeling",
    description: "Muscatel and stone fruit, brewed to order in a glass pot.",
    price: "₹ 260",
    dietary: ["Vegan", "Gluten-free"],
    image: cafeTea,
    alt: "Glass teapot of amber loose leaf tea beside two small ceramic cups",
  },
  {
    id: "m12",
    category: "tea",
    name: "Kashmiri Kahwa",
    description: "Saffron, green cardamom and slivered almond in green tea.",
    price: "₹ 280",
    dietary: ["Vegan", "Contains nuts"],
  },
  {
    id: "m13",
    category: "tea",
    name: "Chamomile & Lemon Verbena",
    description: "A caffeine-free infusion for the end of a long ritual.",
    price: "₹ 240",
    dietary: ["Vegan", "Gluten-free"],
  },
  {
    id: "m14",
    category: "desserts",
    name: "Dark Chocolate Tart",
    description: "Seventy-percent ganache in a cocoa shell, finished with gold leaf.",
    price: "₹ 420",
    dietary: ["Vegetarian"],
    image: cafeDessert,
    alt: "Dark chocolate tart finished with gold leaf on a small ivory plate",
    featured: true,
  },
  {
    id: "m15",
    category: "desserts",
    name: "Basque Cheesecake",
    description: "Burnished top, barely set centre, served at room temperature.",
    price: "₹ 380",
    dietary: ["Vegetarian"],
  },
  {
    id: "m16",
    category: "desserts",
    name: "Pistachio Financier",
    description: "Brown butter and pistachio, baked through the afternoon.",
    price: "₹ 260",
    dietary: ["Vegetarian", "Contains nuts"],
  },
  {
    id: "m17",
    category: "light-bites",
    name: "Truffle Croissant",
    description: "Laminated overnight, filled with truffle cream and aged cheese.",
    price: "₹ 340",
    dietary: ["Vegetarian"],
    image: cafeCroissant,
    alt: "Flaky truffle croissant on parchment beside a small ramekin",
    featured: true,
  },
  {
    id: "m18",
    category: "light-bites",
    name: "Avocado & Za'atar Toast",
    description: "Sourdough, smashed avocado, za'atar and preserved lemon.",
    price: "₹ 420",
    dietary: ["Vegan", "Dairy-free option"],
  },
  {
    id: "m19",
    category: "light-bites",
    name: "Garden Grain Bowl",
    description: "Herbed millet, roast vegetables, feta and a lemon dressing.",
    price: "₹ 460",
    dietary: ["Vegetarian", "Gluten-free"],
  },
  {
    id: "m20",
    category: "pairings",
    name: "Ritual Refreshment Tray",
    description: "A small coffee, a seasonal tonic and two petit fours, brought to your chair.",
    price: "₹ 520",
    dietary: ["Vegetarian"],
    image: cafeTray,
    alt: "Brass tray with a coffee, a berry tonic and petit fours on a marble table",
    featured: true,
  },
  {
    id: "m21",
    category: "pairings",
    name: "Colour Bar Pairing",
    description: "A long cold brew and a chilled towel, timed to your processing.",
    price: "₹ 380",
    dietary: ["Vegetarian", "Dairy-free option"],
  },
  {
    id: "m22",
    category: "pairings",
    name: "Bridal Morning Breakfast",
    description: "A private spread of pastries, fruit, coffee and fresh juice for two.",
    price: "₹ 1,600",
    dietary: ["Vegetarian", "Contains nuts"],
  },
];

export const featuredMenu = menuItems.filter((i) => i.featured);

export const cafeFaqs = [
  {
    q: "Can I visit the café without a salon appointment?",
    a: "Of course. The café keeps its own hours and welcomes guests who are simply here for coffee, work or conversation.",
  },
  {
    q: "Can I order to my salon chair?",
    a: "Yes. Anything on the menu can be brought to the styling lounge, colour bar or beauty suite while you are in service.",
  },
  {
    q: "Do you accommodate dietary requirements?",
    a: "Every item carries a dietary label, and most drinks can be made with oat or almond milk. Tell us at the counter and we will adjust where we can.",
  },
];
