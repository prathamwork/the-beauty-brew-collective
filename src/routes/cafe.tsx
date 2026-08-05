import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import heroEspresso from "@/assets/hero-espresso.jpg";
import interiorCoffeebar from "@/assets/interior-coffeebar.jpg";
import cafeTray from "@/assets/cafe-tray.jpg";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { CtaButton } from "@/components/site/Cta";
import { useBooking } from "@/components/site/BookingProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { menuCategories, menuItems, featuredMenu, cafeFaqs, type MenuCategory } from "@/data/menu";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "The Café — Single-Estate Coffee & Slow Afternoons | Blush Navsari" },
      {
        name: "description",
        content:
          "Speciality coffee, cold brews, matcha, teas and desserts in Navsari. Reserve a table at the Blush café or order to your salon chair.",
      },
      { property: "og:title", content: "The Café at Blush, Navsari" },
      {
        property: "og:description",
        content: "Beans from two Chikmagalur estates, roasted weekly and poured beside the colour bar.",
      },
    ],
  }),
  component: CafePage,
});

function CafePage() {
  const { openBooking } = useBooking();
  const [category, setCategory] = useState<MenuCategory>("signature-coffee");
  const items = menuItems.filter((m) => m.category === category);

  return (
    <>
      <div className="relative min-h-[58vh] overflow-hidden bg-espresso">
        <img
          src={heroEspresso}
          alt="Espresso being poured into a warm ceramic cup at the coffee bar"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/90 to-espresso-deep/30" />
        <Container className="relative flex min-h-[58vh] flex-col justify-end pb-16 pt-28">
          <Reveal>
            <p className="eyebrow text-champagne">The Café</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Coffee worth sitting down for"
            delay={0.1}
            className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1] text-ivory sm:text-6xl lg:text-7xl"
          />
        </Container>
      </div>

      <Section tone="ivory">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={interiorCoffeebar}
              alt="Travertine and walnut coffee bar with pendant lighting"
              className="h-[60vh] w-full object-cover"
            />
          </Reveal>
          <SectionHeading
            eyebrow="Sourcing"
            title="Two estates, visited every year"
            intro="Our beans come from two family estates in Chikmagalur, roasted in small weekly batches. Espresso is dialled in twice a day, and the filter changes with the season. If you want to know exactly what is in the hopper, ask — someone behind the bar will tell you far more than you asked for."
          />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading eyebrow="The menu" title="Everything we pour and plate" />
          <div className="mt-10 flex flex-wrap gap-2">
            {menuCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`border px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors ${
                  category === c.id
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso hover:border-espresso"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-x-14 gap-y-8 md:grid-cols-2">
            {items.map((m) => (
              <div key={m.id} className="border-b border-espresso/10 pb-7">
                <div className="flex items-baseline justify-between gap-5">
                  <h3 className="font-display text-2xl text-espresso">{m.name}</h3>
                  <span className="font-display text-xl text-mocha">{m.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                {m.dietary.length > 0 && (
                  <p className="mt-3 text-[0.6rem] uppercase tracking-[0.2em] text-mocha">
                    {m.dietary.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="espresso">
        <Container>
          <SectionHeading light eyebrow="Signatures" title="The ones people come back for" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMenu.slice(0, 8).map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 0.07} className="group">
                {m.image && (
                  <div className="overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.alt ?? m.name}
                      className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-ivory">{m.name}</h3>
                  <span className="text-sm text-champagne">{m.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Pairings"
            title="A drink timed to arrive mid-service"
            intro="Add a café pairing to any salon appointment and it will reach your chair at the right moment — not while your hands are wet, and not after you have left."
          />
          <Reveal delay={0.1}>
            <img
              src={cafeTray}
              alt="Brass refreshment tray with coffee, tonic and petit fours"
              className="h-[52vh] w-full object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Questions" title="Café notes" />
            <CtaButton
              variant="solid"
              className="mt-8"
              onClick={() => openBooking({ track: "cafe" })}
            >
              Reserve a table
            </CtaButton>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {cafeFaqs.map((f, i) => (
              <AccordionItem key={f.q} value={`c${i}`} className="border-espresso/10">
                <AccordionTrigger className="text-left font-display text-xl text-espresso hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </>
  );
}
