export type Testimonial = {
  id: string;
  name: string;
  service: string;
  rating: number;
  quote: string;
};

/** Editable: guest testimonials. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ishita R.",
    service: "Balayage & Coffee Pairing",
    rating: 5,
    quote:
      "Three hours passed without me once checking the time. Kabir talked me out of going lighter than my hair could take, and I am grateful he did.",
  },
  {
    id: "t2",
    name: "Rohan M.",
    service: "Precision Cut & Beard",
    rating: 5,
    quote:
      "I came for a haircut and ended up staying for a second cortado. It is the only place in Navsari where I do not feel rushed out of the chair.",
  },
  {
    id: "t3",
    name: "Priya & Anaya",
    service: "Friends' Ritual",
    rating: 5,
    quote:
      "We booked the lounge for a birthday. Everything arrived at the right moment and nobody had to organise anything on the day.",
  },
  {
    id: "t4",
    name: "Sneha K.",
    service: "Bridal Morning",
    rating: 5,
    quote:
      "The private suite meant my mother and I actually had breakfast together before the day started. Mira kept the whole morning calm.",
  },
  {
    id: "t5",
    name: "Devanshi P.",
    service: "Hydration Ritual",
    rating: 4,
    quote:
      "My skin held the result for close to three weeks. The matcha afterwards has quietly become part of my routine.",
  },
  {
    id: "t6",
    name: "Aditya S.",
    service: "Signature Coffee",
    rating: 5,
    quote:
      "I work from the café two mornings a week. The espresso is genuinely good, and nobody minds how long I sit.",
  },
];
