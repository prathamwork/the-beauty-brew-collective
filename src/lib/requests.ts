/**
 * Local persistence for booking + reservation requests.
 *
 * This is deliberately isolated behind a tiny async API so that a Lovable Cloud
 * (Supabase) table, availability lookup, customer records and admin management
 * can replace the implementation later without touching any UI component.
 */

export type StoredRequest = {
  id: string;
  kind: "booking" | "reservation";
  createdAt: string;
  payload: Record<string, unknown>;
};

const KEY = "blush.requests.v1";

function read(): StoredRequest[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as StoredRequest[];
  } catch {
    return [];
  }
}

export async function saveRequest(
  kind: StoredRequest["kind"],
  payload: Record<string, unknown>,
): Promise<StoredRequest> {
  const record: StoredRequest = {
    id: `${kind}-${Date.now()}`,
    kind,
    createdAt: new Date().toISOString(),
    payload,
  };
  // Simulated network latency so loading states behave the same once a backend lands.
  await new Promise((r) => setTimeout(r, 650));
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify([record, ...read()].slice(0, 50)));
  }
  return record;
}

export function listRequests() {
  return read();
}

/** Placeholder availability source — swap for a live query later. */
export function availableTimes(date: Date | undefined): string[] {
  if (!date) return [];
  const day = date.getDay();
  const base = [
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];
  if (day === 0) return base.filter((t) => t < "18:00");
  if (day === 1) return base.filter((_, i) => i % 2 === 0);
  return base;
}
