/**
 * Central, editable brand + contact configuration.
 * Update the values here and they propagate across the whole site.
 */

export const site = {
  name: "Blush Unisex Salon",
  shortName: "Blush",
  initials: "B",
  tagline: "Beauty, Brewed Beautifully.",
  description:
    "A luxury salon and speciality café in Navsari — transformative beauty rituals, handcrafted beverages and beautifully unhurried moments.",
  city: "Navsari",
  address: {
    line1: "1st Floor, Sattva House, Lunsikui Road",
    line2: "Navsari, Gujarat 396445",
    mapQuery: "Lunsikui Road, Navsari, Gujarat 396445",
  },
  phone: "+91 98250 00000",
  phoneHref: "+919825000000",
  whatsapp: "919825000000", // digits only, with country code
  email: "hello@blushsalonandcafe.com",
  instagram: "@blush.salonandcafe",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  hours: [
    { days: "Monday – Thursday", salon: "10:00 – 20:00", cafe: "09:00 – 21:00" },
    { days: "Friday – Saturday", salon: "09:30 – 21:00", cafe: "08:30 – 22:00" },
    { days: "Sunday", salon: "10:00 – 19:00", cafe: "09:00 – 21:00" },
  ],
  parking: "Complimentary valet for salon guests. Street parking available along Lunsikui Road.",
} as const;

/** Rotating announcement bar messages — edit freely. */
export const announcements: string[] = [
  "Complimentary signature beverage with selected salon rituals.",
  "Now accepting appointments and café reservations.",
  "Bridal mornings open for the coming season.",
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Salon", to: "/salon" },
  { label: "Café", to: "/cafe" },
  { label: "Experiences", to: "/experiences" },
  { label: "Gallery", to: "/gallery" },
  { label: "Our Story", to: "/story" },
  { label: "Contact", to: "/contact" },
] as const;
