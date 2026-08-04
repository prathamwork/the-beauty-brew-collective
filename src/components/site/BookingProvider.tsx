import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BookingTrack = "salon" | "cafe" | "experience";

export type BookingPrefill = {
  track?: BookingTrack;
  selectionId?: string;
  specialistId?: string;
};

type BookingContextValue = {
  isOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
  isReservationOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openBooking = useCallback((next: BookingPrefill = {}) => {
    setPrefill(next);
    setIsOpen(true);
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({
      isOpen,
      prefill,
      openBooking,
      closeBooking: () => setIsOpen(false),
      isReservationOpen,
      openReservation: () => setIsReservationOpen(true),
      closeReservation: () => setIsReservationOpen(false),
    }),
    [isOpen, prefill, openBooking, isReservationOpen],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
