import svcHaircut from "@/assets/svc-haircut.jpg";
import svcColour from "@/assets/svc-colour.jpg";
import svcHairspa from "@/assets/svc-hairspa.jpg";
import svcFacial from "@/assets/svc-facial.jpg";
import svcMakeup from "@/assets/svc-makeup.jpg";
import svcBridal from "@/assets/svc-bridal.jpg";
import svcNails from "@/assets/svc-nails.jpg";
import svcMen from "@/assets/svc-men.jpg";

export type ServiceCategory = {
  id: string;
  title: string;
  blurb: string;
  from: string;
  duration: string;
  image: string;
  alt: string;
  audience: "Women" | "Men" | "Everyone";
};

/** Editable: the eight signature salon categories shown across the site. */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "haircuts",
    title: "Haircuts & Styling",
    blurb: "Shape-led cutting and finishing tailored to how you actually wear your hair.",
    from: "₹ 900",
    duration: "45–75 min",
    image: svcHaircut,
    alt: "Stylist finishing a sharp glossy bob haircut in a warm ivory salon",
    audience: "Everyone",
  },
  {
    id: "colour",
    title: "Hair Colour",
    blurb: "Balayage, gloss and tonal correction built around your natural depth.",
    from: "₹ 2,400",
    duration: "90–180 min",
    image: svcColour,
    alt: "Warm caramel balayage colour result being checked at the colour bar",
    audience: "Everyone",
  },
  {
    id: "hair-rituals",
    title: "Hair Rituals & Spa",
    blurb: "Restorative scalp and bond therapies with a slow, unhurried finish.",
    from: "₹ 1,600",
    duration: "60–90 min",
    image: svcHairspa,
    alt: "Guest receiving a warm towel scalp ritual at the salon wash lounge",
    audience: "Everyone",
  },
  {
    id: "skin",
    title: "Skin & Facial Rituals",
    blurb: "Diagnostic-led facials for clarity, hydration and quiet luminosity.",
    from: "₹ 1,900",
    duration: "60–75 min",
    image: svcFacial,
    alt: "Skincare serum, rose water bowl and folded towels prepared for a facial ritual",
    audience: "Everyone",
  },
  {
    id: "makeup",
    title: "Makeup",
    blurb: "Editorial, evening and occasion artistry in skin-first finishes.",
    from: "₹ 2,200",
    duration: "45–90 min",
    image: svcMakeup,
    alt: "Close-up of soft bronze eye makeup being blended with a brush",
    audience: "Everyone",
  },
  {
    id: "bridal",
    title: "Bridal",
    blurb: "Trial, ceremony and reception artistry with a private suite and pacing.",
    from: "₹ 14,000",
    duration: "3–6 hrs",
    image: svcBridal,
    alt: "Bride with a soft chignon and delicate veil in warm ivory light",
    audience: "Everyone",
  },
  {
    id: "nails",
    title: "Nails",
    blurb: "Considered manicures and pedicures in a restrained neutral palette.",
    from: "₹ 700",
    duration: "40–75 min",
    image: svcNails,
    alt: "Row of neutral nude and blush nail lacquers on folded ivory linen",
    audience: "Everyone",
  },
  {
    id: "grooming",
    title: "Grooming for Men",
    blurb: "Precision cuts, beard architecture and skin care for the everyday.",
    from: "₹ 800",
    duration: "30–60 min",
    image: svcMen,
    alt: "Barber shaping a beard with a razor in a dark espresso-toned studio",
    audience: "Men",
  },
];

export type Service = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  suitableFor: string;
  addOns?: string[];
};

/** Editable: the full salon service menu. */
export const services: Service[] = [
  {
    id: "s1",
    category: "haircuts",
    name: "Signature Cut & Finish",
    description: "Consultation, precision cut and a finish styled to your routine.",
    price: "₹ 1,200",
    duration: "60 min",
    suitableFor: "All hair types and lengths",
    addOns: ["Bond treatment · ₹ 600", "Scalp ritual · ₹ 500"],
  },
  {
    id: "s2",
    category: "haircuts",
    name: "Editorial Blow-Dry",
    description: "Volume, glass-smooth or soft-wave finishing for evenings and shoots.",
    price: "₹ 900",
    duration: "45 min",
    suitableFor: "Shoulder length and longer",
    addOns: ["Gloss mist · ₹ 300"],
  },
  {
    id: "s3",
    category: "haircuts",
    name: "Restyle Consultation & Cut",
    description: "An extended session for a considered change in shape or length.",
    price: "₹ 1,800",
    duration: "90 min",
    suitableFor: "Guests planning a significant change",
  },
  {
    id: "s4",
    category: "colour",
    name: "Balayage",
    description: "Hand-painted dimension with a bespoke toner and gloss finish.",
    price: "₹ 5,400",
    duration: "180 min",
    suitableFor: "Natural or previously lightened hair",
    addOns: ["Bond builder · ₹ 900", "Deep gloss · ₹ 700"],
  },
  {
    id: "s5",
    category: "colour",
    name: "Root Refresh",
    description: "Seamless regrowth blending matched to your existing depth.",
    price: "₹ 2,400",
    duration: "90 min",
    suitableFor: "Coloured hair, every 4–6 weeks",
  },
  {
    id: "s6",
    category: "colour",
    name: "Tonal Gloss",
    description: "A translucent glaze for shine, tone correction and depth.",
    price: "₹ 1,800",
    duration: "45 min",
    suitableFor: "Colour maintenance between appointments",
  },
  {
    id: "s7",
    category: "hair-rituals",
    name: "Scalp Renewal Ritual",
    description: "Exfoliation, warm oil massage and a calming steam finish.",
    price: "₹ 1,600",
    duration: "60 min",
    suitableFor: "Dry, sensitive or congested scalps",
    addOns: ["Extended massage · ₹ 400"],
  },
  {
    id: "s8",
    category: "hair-rituals",
    name: "Bond Repair Therapy",
    description: "In-salon strengthening for hair recovering from lightening or heat.",
    price: "₹ 2,200",
    duration: "75 min",
    suitableFor: "Chemically treated hair",
  },
  {
    id: "s9",
    category: "skin",
    name: "Clarity Facial",
    description: "A deep cleanse and enzyme resurfacing for congested skin.",
    price: "₹ 1,900",
    duration: "60 min",
    suitableFor: "Combination and oily skin",
    addOns: ["LED finish · ₹ 600"],
  },
  {
    id: "s10",
    category: "skin",
    name: "Hydration Ritual",
    description: "Layered hydration with lymphatic massage and a cooling mask.",
    price: "₹ 2,400",
    duration: "75 min",
    suitableFor: "Dry and dehydrated skin",
  },
  {
    id: "s11",
    category: "makeup",
    name: "Occasion Makeup",
    description: "Skin-first artistry for celebrations, dinners and portraits.",
    price: "₹ 2,200",
    duration: "60 min",
    suitableFor: "All skin tones",
    addOns: ["Lashes · ₹ 500", "Hair styling · ₹ 900"],
  },
  {
    id: "s12",
    category: "makeup",
    name: "Editorial Makeup",
    description: "Directional artistry developed with you for shoots and campaigns.",
    price: "₹ 3,600",
    duration: "90 min",
    suitableFor: "Photography and film",
  },
  {
    id: "s13",
    category: "bridal",
    name: "Bridal Trial",
    description: "A full run-through of hair and makeup, documented for the day.",
    price: "₹ 4,500",
    duration: "150 min",
    suitableFor: "Brides, 4–8 weeks before the date",
  },
  {
    id: "s14",
    category: "bridal",
    name: "Bridal Morning",
    description: "Private suite, styling, artistry and a curated breakfast service.",
    price: "₹ 18,000",
    duration: "5 hrs",
    suitableFor: "Brides and one companion",
    addOns: ["Additional guest styling · ₹ 3,000"],
  },
  {
    id: "s15",
    category: "nails",
    name: "Signature Manicure",
    description: "Shaping, cuticle care and a lacquer or buffed natural finish.",
    price: "₹ 700",
    duration: "40 min",
    suitableFor: "Everyone",
    addOns: ["Gel finish · ₹ 500"],
  },
  {
    id: "s16",
    category: "nails",
    name: "Restorative Pedicure",
    description: "A warm soak, exfoliation and extended lower-leg massage.",
    price: "₹ 1,200",
    duration: "75 min",
    suitableFor: "Everyone",
  },
  {
    id: "s17",
    category: "grooming",
    name: "Precision Cut",
    description: "Scissor and clipper work shaped to your growth pattern.",
    price: "₹ 800",
    duration: "40 min",
    suitableFor: "Men, all hair types",
    addOns: ["Hot towel finish · ₹ 300"],
  },
  {
    id: "s18",
    category: "grooming",
    name: "Beard Architecture",
    description: "Line work, contouring and conditioning with a hot towel close.",
    price: "₹ 600",
    duration: "30 min",
    suitableFor: "Men",
  },
  {
    id: "s19",
    category: "grooming",
    name: "Men's Skin Reset",
    description: "A brisk, effective cleanse and hydration protocol.",
    price: "₹ 1,400",
    duration: "45 min",
    suitableFor: "Men, all skin types",
  },
  {
    id: "s20",
    category: "hair-rituals",
    name: "Keratin Smoothing",
    description: "A softening treatment that shortens your daily styling time.",
    price: "₹ 6,500",
    duration: "180 min",
    suitableFor: "Frizz-prone and wavy hair",
  },
];

export const salonFaqs = [
  {
    q: "Do I need to book in advance?",
    a: "We recommend booking three to five days ahead for cuts and colour, and two to three weeks ahead for bridal trials. Walk-ins are welcome for grooming and nails when a chair is free.",
  },
  {
    q: "Can I order from the café during my service?",
    a: "Yes. Your stylist will hand you the café list at the chair, and anything you order is brought to you during the service.",
  },
  {
    q: "Do you offer patch tests for colour?",
    a: "A patch test is required at least 48 hours before your first colour service with us. It takes five minutes and can be done any time we are open.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Appointments can be rescheduled or cancelled up to 24 hours before your slot at no charge. Bridal reservations follow a separate schedule confirmed in writing.",
  },
  {
    q: "Is the salon unisex?",
    a: "Yes. Blush is designed for everyone, with a dedicated grooming area and private rooms available on request.",
  },
];
