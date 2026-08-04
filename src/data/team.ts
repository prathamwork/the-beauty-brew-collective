import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  specialisation: string;
  experience: string;
  bio: string;
  instagram: string;
  bookable: boolean;
  image: string;
  alt: string;
};

/** Editable: stylists, artists and café specialists. */
export const team: TeamMember[] = [
  {
    id: "aarohi",
    name: "Aarohi Desai",
    role: "Creative Director, Hair",
    specialisation: "Shape-led cutting and long-hair styling",
    experience: "12 years",
    bio: "Aarohi trained across Mumbai and London before returning to Navsari to open Blush. She cuts to the way hair falls rather than the way it photographs, and rarely lets a guest leave without a plan for the next eight weeks.",
    instagram: "https://instagram.com",
    bookable: true,
    image: team1,
    alt: "Portrait of Aarohi Desai, creative director for hair, in a black apron",
  },
  {
    id: "kabir",
    name: "Kabir Mehta",
    role: "Head of Colour",
    specialisation: "Balayage, correction and tonal work",
    experience: "9 years",
    bio: "Kabir is unusually patient with difficult colour histories. He plans lightening across sessions rather than forcing it into one, and his gloss formulas are the reason people come back from other cities.",
    instagram: "https://instagram.com",
    bookable: true,
    image: team2,
    alt: "Portrait of Kabir Mehta, head of colour, in a charcoal shirt",
  },
  {
    id: "mira",
    name: "Mira Shah",
    role: "Senior Makeup Artist",
    specialisation: "Bridal and editorial artistry",
    experience: "8 years",
    bio: "Mira works skin-first, building coverage only where it earns its place. She has led bridal mornings across Gujarat and keeps a running archive of every look she has created.",
    instagram: "https://instagram.com",
    bookable: true,
    image: team3,
    alt: "Portrait of Mira Shah, senior makeup artist, in a linen shirt",
  },
  {
    id: "dev",
    name: "Dev Patel",
    role: "Head Barista",
    specialisation: "Single-origin espresso and seasonal menus",
    experience: "6 years",
    bio: "Dev sources our beans directly from two estates in Chikmagalur and re-dials the grinder three times a day. He designed the salon pairings so a drink lands exactly when you need it.",
    instagram: "https://instagram.com",
    bookable: false,
    image: team4,
    alt: "Portrait of Dev Patel, head barista, standing at the coffee bar",
  },
];

export const bookableSpecialists = team.filter((t) => t.bookable);
