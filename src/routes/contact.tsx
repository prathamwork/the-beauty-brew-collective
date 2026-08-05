import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Car } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { CtaAnchor, CtaButton } from "@/components/site/Cta";
import { useBooking } from "@/components/site/BookingProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/data/site";
import { generalFaqs } from "@/data/content";
import { presetLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — Blush Salon & Café, Lunsikui Road Navsari" },
      {
        name: "description",
        content:
          "Find Blush on Lunsikui Road, Navsari. Opening hours for the salon and café, parking, WhatsApp booking, phone and email.",
      },
      { property: "og:title", content: "Visit Blush Salon & Café in Navsari" },
      {
        property: "og:description",
        content: "Lunsikui Road, Navsari. Open seven days for salon appointments and café reservations.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { openBooking } = useBooking();

  return (
    <>
      <Section tone="ivory" className="pt-32">
        <Container>
          <Reveal>
            <p className="eyebrow text-mocha">Contact</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Come and find us"
            delay={0.1}
            className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1.02] text-espresso sm:text-6xl lg:text-7xl"
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            <Reveal className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-champagne" />
                <div>
                  <p className="eyebrow text-mocha">Address</p>
                  <p className="mt-2 text-sm leading-relaxed text-espresso">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-champagne" />
                <div>
                  <p className="eyebrow text-mocha">Phone</p>
                  <a href={`tel:${site.phoneHref}`} className="mt-2 block text-sm text-espresso">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-champagne" />
                <div>
                  <p className="eyebrow text-mocha">Email</p>
                  <a href={`mailto:${site.email}`} className="mt-2 block text-sm text-espresso">
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Car className="mt-1 h-4 w-4 shrink-0 text-champagne" />
                <div>
                  <p className="eyebrow text-mocha">Parking</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{site.parking}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <CtaButton onClick={() => openBooking()}>Book now</CtaButton>
                <CtaAnchor
                  variant="outline"
                  href={presetLink("general")}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp us
                </CtaAnchor>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2">
              <iframe
                title="Map showing Blush Unisex Salon on Lunsikui Road, Navsari"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`}
                loading="lazy"
                className="h-[60vh] w-full border border-espresso/10 grayscale"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Hours" title="Open seven days" />
            <div className="mt-10 divide-y divide-espresso/10 border-y border-espresso/10">
              {site.hours.map((h) => (
                <div key={h.days} className="flex items-start justify-between gap-6 py-5">
                  <p className="flex items-center gap-3 text-sm text-espresso">
                    <Clock className="h-3.5 w-3.5 text-champagne" />
                    {h.days}
                  </p>
                  <p className="text-right text-xs uppercase tracking-[0.16em] text-mocha">
                    Salon {h.salon}
                    <br />
                    Café {h.cafe}
                  </p>
                </div>
              ))}
            </div>
            <CtaAnchor
              variant="outline"
              className="mt-8"
              href={presetLink("event")}
              target="_blank"
              rel="noreferrer"
            >
              Private &amp; corporate events
            </CtaAnchor>
          </div>

          <div>
            <SectionHeading eyebrow="Questions" title="Before you visit" />
            <Accordion type="single" collapsible className="mt-8 w-full">
              {generalFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`g${i}`} className="border-espresso/10">
                  <AccordionTrigger className="text-left font-display text-xl text-espresso hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>
    </>
  );
}
