import svcHairspa from "@/assets/svc-hairspa.jpg";
import svcFacial from "@/assets/svc-facial.jpg";
import svcBridal from "@/assets/svc-bridal.jpg";
import svcColour from "@/assets/svc-colour.jpg";
import interiorLounge from "@/assets/interior-lounge.jpg";
import cafeTray from "@/assets/cafe-tray.jpg";
import interiorBridal from "@/assets/interior-bridal.jpg";

export type Occasion = "Everyday" | "Celebration" | "Bridal" | "Gifting" | "Corporate";
export type Group = "Solo" | "Couple" | "Friends" | "Group";

export type Package = {
  id: string;
  name: string;
  tagline: string;
  includes: string[];
  duration: string;
  durationMinutes: number;
  price: string;
  priceValue: number;
  guests: Group;
  occasion: Occasion;
  salonCategory: string;
  image: string;
  alt: string;
  featured?: boolean;
};

/** Editable: combined salon + café signature experiences. */
export const packages: Package[] = [
  {
    id: "reset",
    name: "The Reset",
    tagline: "An hour and a half that resets the whole week.",
    includes: ["Scalp renewal hair spa", "Editorial blow-dry", "Signature coffee of your choice"],
    duration: "2 hrs",
    durationMinutes: 120,
    price: "₹ 3,200",
    priceValue: 3200,
    guests: "Solo",
    occasion: "Everyday",
    salonCategory: "hair-rituals",
    image: svcHairspa,
    alt: "Guest receiving a warm towel scalp ritual before a blow-dry",
    featured: true,
  },
  {
    id: "glow",
    name: "The Glow",
    tagline: "Skin first, styling second, unhurried throughout.",
    includes: ["Express clarity facial", "Hair styling", "Wellness drink of your choice"],
    duration: "2 hrs 15 min",
    durationMinutes: 135,
    price: "₹ 3,900",
    priceValue: 3900,
    guests: "Solo",
    occasion: "Everyday",
    salonCategory: "skin",
    image: svcFacial,
    alt: "Facial ritual table set with serum, rose water and folded towels",
    featured: true,
  },
  {
    id: "bridal-morning",
    name: "Bridal Morning",
    tagline: "The private, quiet start your morning deserves.",
    includes: [
      "Private bridal suite for five hours",
      "Bridal hair styling and makeup",
      "Breakfast service for the bride and one companion",
    ],
    duration: "5 hrs",
    durationMinutes: 300,
    price: "₹ 24,000",
    priceValue: 24000,
    guests: "Couple",
    occasion: "Bridal",
    salonCategory: "bridal",
    image: svcBridal,
    alt: "Bride with a soft chignon and veil photographed in warm morning light",
    featured: true,
  },
  {
    id: "coffee-colour",
    name: "Coffee & Colour",
    tagline: "A colour consultation paced to a proper pour.",
    includes: ["Colour consultation and application", "Gloss finish", "Curated beverage pairing"],
    duration: "3 hrs",
    durationMinutes: 180,
    price: "₹ 6,200",
    priceValue: 6200,
    guests: "Solo",
    occasion: "Everyday",
    salonCategory: "colour",
    image: svcColour,
    alt: "Warm caramel balayage result being reviewed at the colour bar",
    featured: true,
  },
  {
    id: "friends-ritual",
    name: "Friends' Ritual",
    tagline: "Book the lounge, bring the people you like.",
    includes: [
      "Grooming or styling for up to four guests",
      "Reserved café table for two hours",
      "A shared refreshment tray",
    ],
    duration: "3 hrs",
    durationMinutes: 180,
    price: "₹ 9,800",
    priceValue: 9800,
    guests: "Friends",
    occasion: "Celebration",
    salonCategory: "haircuts",
    image: interiorLounge,
    alt: "Social lounge with ivory sofas and marble tables in warm daylight",
    featured: true,
  },
  {
    id: "two-of-us",
    name: "The Two of Us",
    tagline: "Side-by-side chairs, one long conversation.",
    includes: ["Two styling services", "Two hand rituals", "A shared dessert and two coffees"],
    duration: "2 hrs 30 min",
    durationMinutes: 150,
    price: "₹ 7,400",
    priceValue: 7400,
    guests: "Couple",
    occasion: "Celebration",
    salonCategory: "haircuts",
    image: cafeTray,
    alt: "Brass tray with two beverages and petit fours on a marble table",
  },
  {
    id: "gift-hour",
    name: "The Gifted Hour",
    tagline: "A giftable card, redeemable across salon and café.",
    includes: ["Any single salon service up to ₹ 2,500", "Any beverage and dessert", "Presented in a linen envelope"],
    duration: "Flexible",
    durationMinutes: 90,
    price: "₹ 3,000",
    priceValue: 3000,
    guests: "Solo",
    occasion: "Gifting",
    salonCategory: "haircuts",
    image: svcFacial,
    alt: "Skincare and linen still life prepared as a gift experience",
  },
  {
    id: "celebration-suite",
    name: "The Celebration Suite",
    tagline: "The private room, for the morning that matters.",
    includes: [
      "Private suite for up to six guests",
      "Styling and makeup for the group",
      "Café service throughout",
    ],
    duration: "4 hrs",
    durationMinutes: 240,
    price: "₹ 22,000",
    priceValue: 22000,
    guests: "Group",
    occasion: "Celebration",
    salonCategory: "makeup",
    image: interiorBridal,
    alt: "Private bridal suite with draped curtains, arched mirror and velvet seating",
  },
  {
    id: "corporate-morning",
    name: "The Corporate Morning",
    tagline: "Grooming and coffee service for a visiting team.",
    includes: ["Grooming services for up to eight", "Reserved lounge", "Continuous coffee service"],
    duration: "4 hrs",
    durationMinutes: 240,
    price: "On enquiry",
    priceValue: 0,
    guests: "Group",
    occasion: "Corporate",
    salonCategory: "grooming",
    image: interiorLounge,
    alt: "Lounge seating arranged for a private group booking",
  },
];

export const featuredPackages = packages.filter((p) => p.featured);

export type Membership = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  perks: string[];
};

export const memberships: Membership[] = [
  {
    id: "circle",
    name: "The Circle",
    price: "₹ 12,000",
    cadence: "per year",
    perks: [
      "One signature service each month at member rates",
      "Complimentary beverage on every visit",
      "Priority booking on weekends",
    ],
  },
  {
    id: "atelier",
    name: "The Atelier",
    price: "₹ 28,000",
    cadence: "per year",
    perks: [
      "Two signature services each month",
      "Quarterly colour or skin consultation",
      "Two guest passes to the café lounge",
      "First access to seasonal menus and private evenings",
    ],
  },
];
