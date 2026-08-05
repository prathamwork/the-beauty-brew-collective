import { createFileRoute } from "@tanstack/react-router";

import philosophyMain from "@/assets/philosophy-main.jpg";
import interiorLounge from "@/assets/interior-lounge.jpg";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { CtaAnchor, CtaLink } from "@/components/site/Cta";
import { storyTimeline, values } from "@/data/content";
import { team } from "@/data/team";
import { presetLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — How Blush Began | Salon & Café in Navsari" },
      {
        name: "description",
        content:
          "From a waiting room worth staying in to a salon and café designed as one room. The people, values and history behind Blush in Navsari.",
      },
      { property: "og:title", content: "Our Story — Blush Salon & Café" },
      {
        property: "og:description",
        content: "Hospitality first, beauty expertise second to none, and coffee sourced directly.",
      },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <>
      <div className="relative min-h-[58vh] overflow-hidden bg-espresso">
        <img
          src={interiorLounge}
          alt="Social lounge with ivory sofas and marble side tables"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/90 to-espresso-deep/30" />
        <Container className="relative flex min-h-[58vh] flex-col justify-end pb-16 pt-28">
          <Reveal>
            <p className="eyebrow text-champagne">Our Story</p>
          </Reveal>
          <RevealText
            as="h1"
            text="It began with the waiting"
            delay={0.1}
            className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1] text-ivory sm:text-6xl lg:text-7xl"
          />
        </Container>
      </div>

      <Section tone="ivory">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={philosophyMain}
              alt="Guest resting with a coffee in the salon lounge"
              className="h-[62vh] w-full object-cover"
            />
          </Reveal>
          <SectionHeading
            eyebrow="Founder"
            title="Aarohi Desai"
            intro="Twelve years across Mumbai and London taught her the craft. A hundred uncomfortable waiting rooms taught her the rest. Blush is what happens when the hospitality is designed with the same care as the haircut."
          />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading eyebrow="Timeline" title="Six years, four turning points" />
          <div className="mt-14 border-t border-espresso/12">
            {storyTimeline.map((s, i) => (
              <Reveal key={s.year} delay={i * 0.06}>
                <div className="grid gap-4 border-b border-espresso/12 py-10 md:grid-cols-12">
                  <p className="font-display text-4xl text-champagne md:col-span-2">{s.year}</p>
                  <h3 className="font-display text-3xl text-espresso md:col-span-4">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <SectionHeading eyebrow="Values" title="Six things we do not compromise on" />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.07}>
                <span className="block h-px w-10 bg-champagne" />
                <h3 className="mt-5 font-display text-2xl text-espresso">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading eyebrow="The team" title="Familiar faces, by design" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 0.07} className="group">
                <div className="overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.alt}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl text-espresso">{m.name}</h3>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-mocha">
                  {m.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.specialisation}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="espresso" className="py-24">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-champagne">Careers</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ivory">
              We hire slowly, and we keep people.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaAnchor variant="gold" href={presetLink("careers")} target="_blank" rel="noreferrer">
              Enquire about roles
            </CtaAnchor>
            <CtaLink variant="light" to="/contact">
              Visit us
            </CtaLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
