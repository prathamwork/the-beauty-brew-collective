import svcHaircut from "@/assets/svc-haircut.jpg";
import svcColour from "@/assets/svc-colour.jpg";
import svcMakeup from "@/assets/svc-makeup.jpg";
import svcBridal from "@/assets/svc-bridal.jpg";
import svcMen from "@/assets/svc-men.jpg";
import svcNails from "@/assets/svc-nails.jpg";
import svcHairspa from "@/assets/svc-hairspa.jpg";
import splitSalon from "@/assets/split-salon.jpg";
import splitCafe from "@/assets/split-cafe.jpg";
import cafeLatte from "@/assets/cafe-latte.jpg";
import cafeColdbrew from "@/assets/cafe-coldbrew.jpg";
import cafeDessert from "@/assets/cafe-dessert.jpg";
import cafeTray from "@/assets/cafe-tray.jpg";
import cafeTea from "@/assets/cafe-tea.jpg";
import interiorStyling from "@/assets/interior-styling.jpg";
import interiorColourbar from "@/assets/interior-colourbar.jpg";
import interiorCoffeebar from "@/assets/interior-coffeebar.jpg";
import interiorLounge from "@/assets/interior-lounge.jpg";
import interiorBridal from "@/assets/interior-bridal.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import beforeColour from "@/assets/before-colour.jpg";
import philosophyMain from "@/assets/philosophy-main.jpg";

export type GalleryFilter = "salon" | "transformations" | "bridal" | "cafe" | "interiors" | "events";

export const galleryFilters: { id: GalleryFilter; label: string }[] = [
  { id: "salon", label: "Salon" },
  { id: "transformations", label: "Transformations" },
  { id: "bridal", label: "Bridal" },
  { id: "cafe", label: "Café" },
  { id: "interiors", label: "Interiors" },
  { id: "events", label: "Events" },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  filter: GalleryFilter;
  tall?: boolean;
};

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: svcHaircut, alt: "Glossy precision bob finished at the styling lounge", caption: "Precision bob", filter: "salon", tall: true },
  { id: "g2", src: interiorCoffeebar, alt: "Travertine and walnut coffee bar with pendant lighting", caption: "The Coffee Bar", filter: "interiors" },
  { id: "g3", src: svcColour, alt: "Warm caramel balayage with dimensional lengths", caption: "Caramel balayage", filter: "transformations", tall: true },
  { id: "g4", src: cafeLatte, alt: "Rose vanilla latte served in a glass cup", caption: "Rose Vanilla Latte", filter: "cafe" },
  { id: "g5", src: svcBridal, alt: "Bride with a soft chignon and a delicate veil", caption: "Bridal chignon", filter: "bridal", tall: true },
  { id: "g6", src: interiorStyling, alt: "Row of styling chairs facing brass framed mirrors", caption: "Styling Lounge", filter: "interiors" },
  { id: "g7", src: svcMakeup, alt: "Soft bronze eye makeup blended with a brush", caption: "Bronze eye", filter: "salon" },
  { id: "g8", src: cafeColdbrew, alt: "Sea salt caramel cold brew with cream over ice", caption: "Sea Salt Cold Brew", filter: "cafe", tall: true },
  { id: "g9", src: interiorColourbar, alt: "Colour bar with espresso cabinetry and tinted glass jars", caption: "The Colour Bar", filter: "interiors" },
  { id: "g10", src: svcMen, alt: "Beard architecture being shaped in the grooming studio", caption: "Beard architecture", filter: "salon", tall: true },
  { id: "g11", src: cafeDessert, alt: "Dark chocolate tart finished with gold leaf", caption: "Dark Chocolate Tart", filter: "cafe" },
  { id: "g12", src: interiorBridal, alt: "Private bridal suite with draped curtains and an arched mirror", caption: "Private Bridal Room", filter: "bridal" },
  { id: "g13", src: splitSalon, alt: "Guest with a glass-smooth blowout in the salon chair", caption: "Glass finish", filter: "transformations", tall: true },
  { id: "g14", src: cafeTray, alt: "Brass refreshment tray with coffee, tonic and petit fours", caption: "Ritual Tray", filter: "events" },
  { id: "g15", src: interiorLounge, alt: "Social lounge with ivory sofas and marble side tables", caption: "Social Lounge", filter: "interiors" },
  { id: "g16", src: svcNails, alt: "Neutral nude and blush nail lacquers on ivory linen", caption: "Neutral lacquers", filter: "salon" },
  { id: "g17", src: cafeTea, alt: "Glass teapot of amber loose leaf tea on white linen", caption: "Tea service", filter: "cafe", tall: true },
  { id: "g18", src: heroInterior, alt: "Wide view of the salon and café lounge in warm daylight", caption: "The room", filter: "interiors" },
  { id: "g19", src: svcHairspa, alt: "Warm towel scalp ritual at the wash lounge", caption: "Scalp ritual", filter: "salon" },
  { id: "g20", src: splitCafe, alt: "Latte and a small dessert on a marble café table", caption: "Afternoon service", filter: "events", tall: true },
  { id: "g21", src: philosophyMain, alt: "Guest resting with a coffee in the salon lounge", caption: "Unhurried", filter: "events" },
];

export type TransformationFilter = "hair" | "colour" | "makeup" | "bridal" | "grooming";

export const transformationFilters: { id: TransformationFilter; label: string }[] = [
  { id: "hair", label: "Hair" },
  { id: "colour", label: "Colour" },
  { id: "makeup", label: "Makeup" },
  { id: "bridal", label: "Bridal" },
  { id: "grooming", label: "Grooming" },
];

export type Transformation = {
  id: string;
  filter: TransformationFilter;
  title: string;
  note: string;
  before: string;
  beforeAlt: string;
  after: string;
  afterAlt: string;
};

export const transformations: Transformation[] = [
  {
    id: "tr1",
    filter: "colour",
    title: "Depth to dimensional caramel",
    note: "Two sessions, four weeks apart, with bond support throughout.",
    before: beforeColour,
    beforeAlt: "Guest with flat, untreated dark hair before a colour appointment",
    after: svcColour,
    afterAlt: "The same lengths after hand-painted caramel balayage and a gloss",
  },
  {
    id: "tr2",
    filter: "hair",
    title: "Long layers to a sharp bob",
    note: "A single restyle session with a glass-smooth finish.",
    before: beforeColour,
    beforeAlt: "Guest with long unstyled hair before a restyle appointment",
    after: svcHaircut,
    afterAlt: "The same guest after a precision bob cut and polished finish",
  },
  {
    id: "tr3",
    filter: "makeup",
    title: "Bare skin to bronze evening",
    note: "Skin-first base with a soft bronze eye and muted blush lip.",
    before: beforeColour,
    beforeAlt: "Guest with bare skin before an occasion makeup service",
    after: svcMakeup,
    afterAlt: "Close-up of the finished bronze eye and blush lip makeup",
  },
  {
    id: "tr4",
    filter: "bridal",
    title: "Bridal morning, start to ceremony",
    note: "Five hours in the private suite, paced around the breakfast service.",
    before: beforeColour,
    beforeAlt: "Bride before styling on the morning of the ceremony",
    after: svcBridal,
    afterAlt: "The finished bridal chignon and veil in warm morning light",
  },
  {
    id: "tr5",
    filter: "grooming",
    title: "Grown-out to architected",
    note: "Line work, contouring and a hot towel close.",
    before: beforeColour,
    beforeAlt: "Guest before a grooming appointment",
    after: svcMen,
    afterAlt: "The finished beard shape after line work and conditioning",
  },
];

export type InteriorSpace = { id: string; label: string; src: string; alt: string };

export const interiorSpaces: InteriorSpace[] = [
  { id: "styling", label: "Styling Lounge", src: interiorStyling, alt: "Styling lounge with black leather chairs facing brass mirrors" },
  { id: "colour", label: "Colour Bar", src: interiorColourbar, alt: "Colour bar with espresso cabinetry and rows of tinted jars" },
  { id: "beauty", label: "Beauty Suite", src: interiorBridal, alt: "Beauty suite with draped curtains and an arched vanity mirror" },
  { id: "coffee", label: "Coffee Bar", src: interiorCoffeebar, alt: "Coffee bar in travertine and dark walnut with pendant lights" },
  { id: "social", label: "Social Lounge", src: interiorLounge, alt: "Social lounge with ivory boucle sofas and marble tables" },
  { id: "bridal", label: "Private Bridal Room", src: heroInterior, alt: "Private room with arched windows and soft linen curtains" },
];
