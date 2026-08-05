import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import interiorBridal from "@/assets/interior-bridal.jpg";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { CtaAnchor, CtaButton } from "@/components/site/Cta";
import { useBooking } from "@/components/site/BookingProvider";
import { packages, memberships, type Occasion } from "@/data/packages";
import { presetLink } from "@/lib/whatsapp";

const occasions: (Occasion | "All")[] = [
  "All",
  "Everyday",
  "Celebration",
  "Bridal",
  "Gifting",
  "Corporate",
];

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Signature Experiences & Bridal Packages | Blush Navsari" },
      {
        name: "description",
        content:
          "Combined salon and café rituals in Navsari — everyday resets, celebration packages, bridal mornings, gifting and corporate bookings at Blush.",
      },
      { property: "og:title", content: "Signature Experiences at Blush, Navsari" },
      {
        property: "og:description",
        content: "Packages that treat the beverage as part of the service rather than an afterthought.",
      },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const { openBooking } = useBooking();
  const [occasion, setOccasion] = useState<Occasion | "All">("All");
  const list = occasion === "All" ? packages : packages.filter((p) => p.occasion === occasion);

  return (
    <>
      <div className="relative min-h-[58vh] overflow-hidden bg-espresso">
        <img
          src={interiorBridal}
          alt="Private bridal suite with draped curtains and an arched mirror"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/90 to-espresso-deep/30" />
        <Container className="relative flex min-h-[58vh] flex-col justify-end pb-16 pt-28">
          <Reveal>
            <p className="eyebrow text-champagne">Signature Experiences</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Rituals written as one afternoon"
            delay={0.1}
            className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1] text-ivory sm:text-6xl lg:text-7xl"
          />
        </Container>
      </div>

      <Section tone="ivory">
        <Container>
          <SectionHeading
            eyebrow="Packages"
            title="Choose by the occasion"
            intro="Each experience pairs salon time with something from the coffee bar, sequenced so nothing arrives at the wrong moment."
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {occasions.map((o) => (
              <button
                key={o}
                onClick={() => setOccasion(o)}
                className={`border px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors ${
                  occasion === o
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso hover:border-espresso"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08} className="group flex flex-col bg-ivory-soft">
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-mocha">
                    {p.occasion} · {p.guests}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-espresso">{p.name}</h3>
                  <p className="mt-2 text-sm italic text-mocha">{p.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-espresso/10 pt-5">
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                      {p.duration}
                    </span>
                    <span className="font-display text-2xl text-espresso">{p.price}</span>
                  </div>
                  <CtaButton
                    variant="outline"
                    magnetic={false}
                    className="mt-5 w-full"
                    onClick={() => openBooking({ track: "experience", selectionId: p.id })}
                  >
                    Book this experience
                  </CtaButton>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading
            eyebrow="Memberships"
            title="For the people who are here every month"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {memberships.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08} className="flex flex-col border border-espresso/12 p-8">
                <h3 className="font-display text-3xl text-espresso">{m.name}</h3>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                  {m.price} · {m.cadence}
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                  {m.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <CtaAnchor
                  variant="outline"
                  magnetic={false}
                  className="mt-7 w-full"
                  href={presetLink("package")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire
                </CtaAnchor>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="espresso" className="py-24">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-champagne">Bridal</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ivory">
              Private bridal mornings, planned months ahead.
            </h2>
          </div>
          <CtaAnchor variant="gold" size="lg" href={presetLink("bridal")} target="_blank" rel="noreferrer">
            Arrange a consultation
          </CtaAnchor>
        </Container>
      </Section>
    </>
  );
}
