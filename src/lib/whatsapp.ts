import { site } from "@/data/site";

export type EnquiryKind =
  | "salon-booking"
  | "cafe-reservation"
  | "package"
  | "bridal"
  | "general"
  | "careers"
  | "event";

/** Build a wa.me link with a professionally formatted, pre-filled message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const presetMessages: Record<EnquiryKind, string> = {
  "salon-booking": `Hello ${site.name}, I would like to enquire about a salon appointment. Please share availability.`,
  "cafe-reservation": `Hello ${site.name}, I would like to reserve a café table. Please confirm availability.`,
  package: `Hello ${site.name}, I would like to know more about your signature experience packages.`,
  bridal: `Hello ${site.name}, I would like to arrange a bridal consultation. Please share available dates.`,
  general: `Hello ${site.name}, I have an enquiry.`,
  careers: `Hello ${site.name}, I would like to enquire about career opportunities with your team.`,
  event: `Hello ${site.name}, I would like to enquire about a private or corporate event.`,
};

export function presetLink(kind: EnquiryKind) {
  return whatsappLink(presetMessages[kind]);
}

export type BookingSummary = {
  track: string;
  selection: string;
  specialist?: string;
  date?: string;
  time?: string;
  pairings?: string[];
  name: string;
  phone: string;
  email?: string;
  guests?: number;
  notes?: string;
  contactPreference?: string;
};

export function bookingMessage(b: BookingSummary) {
  const lines = [
    `Hello ${site.name}, I would like to enquire about ${b.selection}${
      b.date ? ` on ${b.date}` : ""
    }${b.time ? ` at ${b.time}` : ""}.`,
    "",
    `Type: ${b.track}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
  ];
  if (b.email) lines.push(`Email: ${b.email}`);
  if (b.specialist) lines.push(`Specialist: ${b.specialist}`);
  if (b.guests) lines.push(`Guests: ${b.guests}`);
  if (b.pairings?.length) lines.push(`Café pairing: ${b.pairings.join(", ")}`);
  if (b.contactPreference) lines.push(`Preferred contact: ${b.contactPreference}`);
  if (b.notes) lines.push(`Special requests: ${b.notes}`);
  lines.push("", "Please confirm availability.");
  return lines.join("\n");
}

export type ReservationSummary = {
  date: string;
  time: string;
  guests: number;
  seating: string;
  occasion?: string;
  notes?: string;
  name: string;
  phone: string;
  email?: string;
};

export function reservationMessage(r: ReservationSummary) {
  const lines = [
    `Hello ${site.name}, I would like to reserve a café table on ${r.date} at ${r.time}.`,
    "",
    `Name: ${r.name}`,
    `Phone: ${r.phone}`,
  ];
  if (r.email) lines.push(`Email: ${r.email}`);
  lines.push(`Guests: ${r.guests}`);
  lines.push(`Seating: ${r.seating}`);
  if (r.occasion) lines.push(`Occasion: ${r.occasion}`);
  if (r.notes) lines.push(`Special requests: ${r.notes}`);
  lines.push("", "Please confirm availability.");
  return lines.join("\n");
}
