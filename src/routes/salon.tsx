import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";

import heroInterior from "@/assets/hero-interior.jpg";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { CtaButton } from "@/components/site/Cta";
import { useBooking } from "@/components/site/BookingProvider";
import { Tilt3D } from "@/components/site/Tilt3D";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceCategories, services, salonFaqs } from "@/data/services";
import { team } from "@/data/team";

export const Route = createFileRoute("/salon")({
  head: () => ({
    meta: [
      { title: "Salon Services — Hair, Colour, Skin & Bridal | Blush Navsari" },
      {
        name: "description",
        content:
          "Haircuts, balayage, hair spa rituals, facials, makeup, nails and grooming in Navsari. Book a specialist by name at Blush Unisex Salon.",
      },
      { property: "og:title", content: "Salon Services at Blush, Navsari" },
      {
        property: "og:description",
        content: "Shape-led cutting, patient colour and diagnostic skin rituals in one unhurried room.",
      },
    ],
  }),
  component: SalonPage,
});

function SalonPage() {
  const { openBooking } = useBooking();
  const [category, setCategory] = useState<string>(serviceCategories[0]!.id);
  const filtered = services.filter((s) => s.category === category);

  return (
    <>
      <div className="relative min-h-[58vh] overflow-hidden bg-espresso">
        <img
          src={heroInterior}
          alt="Wide view of the salon styling lounge in warm daylight"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/90 to-espresso-deep/30" />
        <Container className="relative flex min-h-[58vh] flex-col justify-end pb-16 pt-28">
          <Reveal>
            <p className="eyebrow text-champagne">The Salon</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Considered beauty, never rushed"
            delay={0.1}
            className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1] text-ivory sm:text-6xl lg:text-7xl"
          />
        </Container>
      </div>

      <Section tone="ivory">
        <Container>
          <SectionHeading
            eyebrow="Categories"
            title="Eight signature disciplines"
            intro="Every service begins with a consultation, and every guest leaves with a plan for the next eight weeks."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.07} className="group">
                <Tilt3D>
                <button onClick={() => setCategory(s.id)} className="block w-full text-left">
                  <div className="overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-espresso">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                    From {s.from} · {s.duration} · {s.audience}
                  </p>
                </button>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading eyebrow="Menu" title="Services and pricing" />
          <div className="mt-10 flex flex-wrap gap-2">
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`border px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors ${
                  category === c.id
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso hover:border-espresso"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
          <div className="mt-12 divide-y divide-espresso/10 border-y border-espresso/10">
            {filtered.map((s) => (
              <div key={s.id} className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline">
                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl text-espresso">{s.name}</h3>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                    {s.duration} · {s.suitableFor}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  {s.addOns?.length ? (
                    <p className="mt-2 text-xs text-mocha">Add-ons: {s.addOns.join(", ")}</p>
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className="font-display text-2xl text-espresso">{s.price}</span>
                  <CtaButton
                    variant="ghost"
                    size="sm"
                    magnetic={false}
                    onClick={() => openBooking({ track: "salon", selectionId: s.id })}
                  >
                    Book
                  </CtaButton>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <SectionHeading eyebrow="The team" title="Book with someone by name" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 0.08} className="group">
                <div className="overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.alt}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl text-espresso">{m.name}</h3>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                  {m.role} · {m.experience}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                {m.bookable && (
                  <CtaButton
                    variant="ghost"
                    size="sm"
                    magnetic={false}
                    className="mt-3 px-0"
                    onClick={() => openBooking({ track: "salon", specialistId: m.id })}
                  >
                    Book with {m.name.split(" ")[0]}
                  </CtaButton>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Questions" title="Good to know before you arrive" />
          <Accordion type="single" collapsible className="w-full">
            {salonFaqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className="border-espresso/10">
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

      <Section tone="espresso" className="py-24">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <div className="flex gap-1 text-champagne">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ivory">
              Ready when you are.
            </h2>
          </div>
          <CtaButton variant="gold" size="lg" onClick={() => openBooking({ track: "salon" })}>
            Book an appointment
          </CtaButton>
        </Container>
      </Section>
    </>
  );
}
