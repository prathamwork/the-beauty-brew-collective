import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CtaAnchor, CtaButton } from "@/components/site/Cta";
import { useBooking, type BookingTrack } from "@/components/site/BookingProvider";
import { services } from "@/data/services";
import { packages } from "@/data/packages";
import { bookableSpecialists } from "@/data/team";
import { menuItems } from "@/data/menu";
import { availableTimes, saveRequest } from "@/lib/requests";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";

const tracks: { id: BookingTrack; label: string; copy: string }[] = [
  { id: "salon", label: "Salon", copy: "A single service with a specialist of your choosing." },
  { id: "cafe", label: "Café", copy: "A table in the lounge, with or without an appointment." },
  { id: "experience", label: "Signature Experience", copy: "A combined salon and café ritual." },
];

const seatingOptions = ["Indoor table", "Lounge seating", "Coffee bar counter"];
const contactOptions = ["WhatsApp", "Phone call", "Email"];

type Errors = Partial<Record<"name" | "phone" | "email" | "guests", string>>;

const stepLabels = ["Type", "Selection", "Specialist", "Date", "Time", "Pairing", "Details", "Review"];

export function BookingDialog() {
  const { isOpen, closeBooking, prefill } = useBooking();
  const reduced = useReducedMotion();

  const [step, setStep] = useState(0);
  const [track, setTrack] = useState<BookingTrack>("salon");
  const [selectionIds, setSelectionIds] = useState<string[]>([]);
  const [specialistId, setSpecialistId] = useState<string>("none");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [pairings, setPairings] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("1");
  const [notes, setNotes] = useState("");
  const [contactPreference, setContactPreference] = useState("WhatsApp");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setConfirmed(null);
    setErrors({});
    setTrack(prefill.track ?? "salon");
    setSelectionIds(prefill.selectionId ? [prefill.selectionId] : []);
    setSpecialistId(prefill.specialistId ?? "none");
  }, [isOpen, prefill]);

  const options = useMemo(() => {
    if (track === "experience") return packages.map((p) => ({ id: p.id, label: p.name, meta: `${p.duration} · ${p.price}` }));
    if (track === "cafe") return seatingOptions.map((s) => ({ id: s, label: s, meta: "Café reservation" }));
    return services.map((s) => ({ id: s.id, label: s.name, meta: `${s.duration} · ${s.price}` }));
  }, [track]);

  const steps = useMemo(() => {
    const all = [0, 1, 2, 3, 4, 5, 6, 7];
    return track === "cafe" ? all.filter((s) => s !== 2) : all;
  }, [track]);

  const currentIndex = steps.indexOf(step);
  const times = availableTimes(date);
  const selectionLabel = selectionIds
    .map((id) => options.find((o) => o.id === id)?.label)
    .filter(Boolean)
    .join(", ");
  const specialistName =
    specialistId === "none" ? "No preference" : (bookableSpecialists.find((s) => s.id === specialistId)?.name ?? "No preference");

  const pairingOptions = menuItems.filter((m) => m.featured || m.category === "pairings");

  function validateDetails() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(phone.trim())) next.phone = "Please enter a reachable phone number.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid email address.";
    const g = Number(guests);
    if (!Number.isFinite(g) || g < 1 || g > 12) next.guests = "Between 1 and 12 guests.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const canAdvance = (() => {
    switch (step) {
      case 1:
        return selectionIds.length > 0;
      case 3:
        return Boolean(date);
      case 4:
        return Boolean(time);
      case 6:
        return name.trim() !== "" && phone.trim() !== "";
      default:
        return true;
    }
  })();

  function next() {
    if (step === 6 && !validateDetails()) return;
    const i = steps.indexOf(step);
    if (i < steps.length - 1) setStep(steps[i + 1]!);
  }

  function back() {
    const i = steps.indexOf(step);
    if (i > 0) setStep(steps[i - 1]!);
  }

  const summary = {
    track: track === "salon" ? "Salon appointment" : track === "cafe" ? "Café reservation" : "Signature experience",
    selection: selectionLabel,
    ...(track !== "cafe" ? { specialist: specialistName } : {}),
    ...(date ? { date: format(date, "EEEE d MMMM yyyy") } : {}),
    ...(time ? { time } : {}),
    ...(pairings.length ? { pairings } : {}),
    name,
    phone,
    ...(email ? { email } : {}),
    guests: Number(guests),
    ...(notes ? { notes } : {}),
    contactPreference,
  };

  async function submit() {
    if (!validateDetails()) {
      setStep(6);
      return;
    }
    setSubmitting(true);
    try {
      const record = await saveRequest("booking", summary);
      setConfirmed(record.id);
      if (typeof window !== "undefined") {
        window.open(whatsappLink(bookingMessage(summary)), "_blank", "noopener,noreferrer");
      }
      toast.success("Request received", {
        description: "We have opened WhatsApp with your request — just press send to confirm.",
      });
    } catch {
      toast.error("Something went wrong", { description: "Please try again, or reach us on WhatsApp." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent className="max-h-[92dvh] max-w-3xl overflow-y-auto rounded-none border-border bg-ivory-soft p-0 text-espresso sm:rounded-none">
        <DialogTitle className="sr-only">Book an experience</DialogTitle>
        <DialogDescription className="sr-only">
          A step-by-step form to request a salon appointment, café table or signature experience.
        </DialogDescription>

        {confirmed ? (
          <div className="px-6 py-16 text-center sm:px-14">
            <div className="mx-auto grid size-14 place-items-center rounded-full border border-champagne text-champagne">
              <Check className="size-6" aria-hidden />
            </div>
            <h2 className="mt-8 text-3xl sm:text-4xl">Your request is with us.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Reference <span className="text-espresso">{confirmed}</span>. Every enquiry is confirmed personally on
              WhatsApp — if the chat did not open automatically, tap below to send it.
            </p>
            <dl className="mx-auto mt-10 max-w-sm space-y-2 border-t border-border pt-6 text-left text-sm">
              <Row label="Type" value={summary.track} />
              <Row label="Selection" value={summary.selection} />
              {summary.date && <Row label="Date" value={summary.date} />}
              {summary.time && <Row label="Time" value={summary.time} />}
              <Row label="Name" value={summary.name} />
            </dl>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CtaAnchor
                variant="gold"
                href={whatsappLink(bookingMessage(summary))}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden /> Send on WhatsApp
              </CtaAnchor>
              <CtaButton variant="outline" onClick={closeBooking}>
                Close
              </CtaButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <header className="border-b border-border px-6 pb-6 pt-8 sm:px-10">
              <p className="eyebrow text-mocha">Reservations</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Book your experience</h2>
              <div className="mt-6 flex items-center gap-2" role="group" aria-label="Booking progress">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1">
                    <div className="h-px w-full bg-border">
                      <motion.div
                        className="h-px bg-champagne"
                        initial={false}
                        animate={{ scaleX: i <= currentIndex ? 1 : 0 }}
                        style={{ originX: 0 }}
                        transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                Step {currentIndex + 1} of {steps.length} — {stepLabels[step]}
              </p>
            </header>

            <div className="min-h-[320px] px-6 py-8 sm:px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 && (
                    <Field legend="What would you like to book?">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {tracks.map((t) => (
                          <Choice
                            key={t.id}
                            selected={track === t.id}
                            onClick={() => {
                              setTrack(t.id);
                              setSelectionIds([]);
                            }}
                            title={t.label}
                            meta={t.copy}
                          />
                        ))}
                      </div>
                    </Field>
                  )}

                  {step === 1 && (
                    <Field
                      legend={
                        track === "cafe"
                          ? "Choose your seating"
                          : track === "experience"
                            ? "Choose one or more experiences"
                            : "Choose one or more services"
                      }
                    >
                      <p className="-mt-3 mb-5 text-xs text-muted-foreground">
                        {track === "cafe"
                          ? "Select the seating you prefer."
                          : "Select as many as you like — tap again to remove."}
                        {selectionIds.length > 0 && (
                          <span className="ml-2 text-espresso">{selectionIds.length} selected</span>
                        )}
                      </p>
                      <div className="grid max-h-[340px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">

                        {options.map((o) => (
                          <Choice
                            key={o.id}
                            selected={selectionIds.includes(o.id)}
                            onClick={() =>
                              setSelectionIds((prev) =>
                                prev.includes(o.id) ? prev.filter((x) => x !== o.id) : [...prev, o.id],
                              )
                            }
                            title={o.label}
                            meta={o.meta}
                          />
                        ))}
                      </div>
                    </Field>
                  )}

                  {step === 2 && (
                    <Field legend="Choose your specialist">
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Choice
                          selected={specialistId === "none"}
                          onClick={() => setSpecialistId("none")}
                          title="No preference"
                          meta="We will match you with the right specialist."
                        />
                        {bookableSpecialists.map((s) => (
                          <Choice
                            key={s.id}
                            selected={specialistId === s.id}
                            onClick={() => setSpecialistId(s.id)}
                            title={s.name}
                            meta={s.role}
                          />
                        ))}
                      </div>
                    </Field>
                  )}

                  {step === 3 && (
                    <Field legend="Select a date">
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            setDate(d);
                            setTime("");
                          }}
                          disabled={{ before: new Date() }}
                          className={cn("pointer-events-auto border border-border bg-ivory p-3")}
                        />
                      </div>
                    </Field>
                  )}

                  {step === 4 && (
                    <Field legend={`Select a time${date ? ` on ${format(date, "d MMMM")}` : ""}`}>
                      {times.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No slots are listed for that date. Please choose another date or message us on WhatsApp.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {times.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTime(t)}
                              aria-pressed={time === t}
                              className={cn(
                                "min-h-11 border px-2 py-2 text-sm transition-colors",
                                time === t
                                  ? "border-espresso bg-espresso text-ivory-soft"
                                  : "border-border hover:border-espresso",
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                    </Field>
                  )}

                  {step === 5 && (
                    <Field legend="Add a café pairing (optional)">
                      <div className="grid gap-2 sm:grid-cols-2">
                        {pairingOptions.map((m) => {
                          const on = pairings.includes(m.name);
                          return (
                            <Choice
                              key={m.id}
                              selected={on}
                              onClick={() =>
                                setPairings((p) => (on ? p.filter((x) => x !== m.name) : [...p, m.name]))
                              }
                              title={m.name}
                              meta={`${m.price} · ${m.description}`}
                            />
                          );
                        })}
                      </div>
                    </Field>
                  )}

                  {step === 6 && (
                    <Field legend="Your details">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Labeled label="Full name" htmlFor="bk-name" error={errors.name}>
                          <Input
                            id="bk-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={80}
                            autoComplete="name"
                            aria-invalid={Boolean(errors.name)}
                            className="rounded-none border-border bg-ivory"
                          />
                        </Labeled>
                        <Labeled label="Phone number" htmlFor="bk-phone" error={errors.phone}>
                          <Input
                            id="bk-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            maxLength={20}
                            inputMode="tel"
                            autoComplete="tel"
                            aria-invalid={Boolean(errors.phone)}
                            className="rounded-none border-border bg-ivory"
                          />
                        </Labeled>
                        <Labeled label="Email (optional)" htmlFor="bk-email" error={errors.email}>
                          <Input
                            id="bk-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={120}
                            inputMode="email"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            className="rounded-none border-border bg-ivory"
                          />
                        </Labeled>
                        <Labeled label="Number of guests" htmlFor="bk-guests" error={errors.guests}>
                          <Input
                            id="bk-guests"
                            type="number"
                            min={1}
                            max={12}
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            aria-invalid={Boolean(errors.guests)}
                            className="rounded-none border-border bg-ivory"
                          />
                        </Labeled>
                        <Labeled label="Special requests" htmlFor="bk-notes" className="sm:col-span-2">
                          <Textarea
                            id="bk-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={500}
                            rows={3}
                            className="rounded-none border-border bg-ivory"
                          />
                        </Labeled>
                        <fieldset className="sm:col-span-2">
                          <legend className="eyebrow text-mocha">Preferred contact method</legend>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {contactOptions.map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => setContactPreference(c)}
                                aria-pressed={contactPreference === c}
                                className={cn(
                                  "min-h-11 border px-4 text-xs uppercase tracking-[0.16em] transition-colors",
                                  contactPreference === c
                                    ? "border-espresso bg-espresso text-ivory-soft"
                                    : "border-border hover:border-espresso",
                                )}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </Field>
                  )}

                  {step === 7 && (
                    <Field legend="Review your request">
                      <dl className="space-y-2 border-t border-border pt-5 text-sm">
                        <Row label="Type" value={summary.track} />
                        <Row label="Selection" value={summary.selection || "—"} />
                        {"specialist" in summary && <Row label="Specialist" value={specialistName} />}
                        <Row label="Date" value={summary.date ?? "—"} />
                        <Row label="Time" value={summary.time ?? "—"} />
                        <Row label="Café pairing" value={pairings.length ? pairings.join(", ") : "None"} />
                        <Row label="Name" value={name} />
                        <Row label="Phone" value={phone} />
                        {email && <Row label="Email" value={email} />}
                        <Row label="Guests" value={guests} />
                        <Row label="Preferred contact" value={contactPreference} />
                        {notes && <Row label="Special requests" value={notes} />}
                      </dl>
                    </Field>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-5 sm:px-10">
              <CtaButton variant="ghost" size="sm" onClick={back} disabled={currentIndex === 0} magnetic={false}>
                <ChevronLeft className="size-4" aria-hidden /> Back
              </CtaButton>
              {step === 7 ? (
                <CtaButton variant="solid" onClick={submit} disabled={submitting} magnetic={false}>
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden /> Sending
                    </>
                  ) : (
                    "Confirm request"
                  )}
                </CtaButton>
              ) : (
                <CtaButton variant="solid" onClick={next} disabled={!canAdvance} magnetic={false}>
                  Continue <ChevronRight className="size-4" aria-hidden />
                </CtaButton>
              )}
            </footer>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-6 text-2xl">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Choice({
  selected,
  onClick,
  title,
  meta,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  meta: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-11 border p-4 text-left transition-colors",
        selected ? "border-espresso bg-espresso text-ivory-soft" : "border-border hover:border-espresso",
      )}
    >
      <span className="block text-sm font-medium">{title}</span>
      <span className={cn("mt-1 block text-xs leading-snug", selected ? "text-ivory/70" : "text-muted-foreground")}>
        {meta}
      </span>
    </button>
  );
}

function Labeled({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="eyebrow block text-mocha">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
