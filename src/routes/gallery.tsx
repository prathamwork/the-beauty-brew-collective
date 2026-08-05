import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import {
  galleryFilters,
  galleryImages,
  interiorSpaces,
  transformationFilters,
  transformations,
  type GalleryFilter,
  type TransformationFilter,
} from "@/data/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Transformations, Interiors & Café | Blush Navsari" },
      {
        name: "description",
        content:
          "Look inside Blush: hair and colour transformations, bridal mornings, the coffee bar and the interiors of our Navsari salon and café.",
      },
      { property: "og:title", content: "Gallery — Blush Salon & Café, Navsari" },
      {
        property: "og:description",
        content: "Transformations, bridal work, café signatures and the rooms they happen in.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<GalleryFilter | "all">("all");
  const [tFilter, setTFilter] = useState<TransformationFilter>("hair");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const images = filter === "all" ? galleryImages : galleryImages.filter((g) => g.filter === filter);
  const trans = transformations.filter((t) => t.filter === tFilter);

  return (
    <>
      <Section tone="ivory" className="pt-32">
        <Container>
          <Reveal>
            <p className="eyebrow text-mocha">Gallery</p>
          </Reveal>
          <RevealText
            as="h1"
            text="The work, and the rooms it happens in"
            delay={0.1}
            className="mt-5 max-w-3xl font-display text-[2.6rem] leading-[1.02] text-espresso sm:text-6xl lg:text-7xl"
          />

          <div className="mt-12 flex flex-wrap gap-2">
            {[{ id: "all" as const, label: "All" }, ...galleryFilters].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as GalleryFilter | "all")}
                className={cn(
                  "border px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors",
                  filter === f.id
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso hover:border-espresso",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {images.map((g) => (
              <button
                key={g.id}
                onClick={() => setLightbox({ src: g.src, alt: g.alt, caption: g.caption })}
                className="group block w-full break-inside-avoid text-left"
              >
                <div className="overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className={cn(
                      "w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105",
                      g.tall ? "aspect-[3/4]" : "aspect-[4/3]",
                    )}
                  />
                </div>
                <p className="mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-mocha">
                  {g.caption}
                </p>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading eyebrow="Before and after" title="Transformations, unretouched" />
          <div className="mt-10 flex flex-wrap gap-2">
            {transformationFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setTFilter(f.id)}
                className={cn(
                  "border px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors",
                  tFilter === f.id
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso hover:border-espresso",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {trans.map((t, i) => (
              <Reveal key={t.id} delay={(i % 2) * 0.08}>
                <div className="grid grid-cols-2 gap-1">
                  <figure>
                    <img src={t.before} alt={t.beforeAlt} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                    <figcaption className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-mocha">
                      Before
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={t.after} alt={t.afterAlt} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                    <figcaption className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-mocha">
                      After
                    </figcaption>
                  </figure>
                </div>
                <h3 className="mt-5 font-display text-2xl text-espresso">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <SectionHeading eyebrow="The space" title="Six rooms, one continuous idea" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {interiorSpaces.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.07} className="group">
                <div className="overflow-hidden">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-display text-2xl text-espresso">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso-deep/95 p-5"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close image"
              className="absolute right-6 top-6 text-ivory"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="max-h-[80vh] w-full object-contain" />
              <figcaption className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.22em] text-ivory/70">
                {lightbox.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
