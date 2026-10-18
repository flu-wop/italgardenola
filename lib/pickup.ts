import { HOURS } from "./site-config";

export type PickupDay = { day: string; times: string[] };

/** Half-hour pickup slots derived from HOURS (which is itself marked CONFIRM). */
export function pickupSlots(): PickupDay[] {
  const parse = (t: string) => {
    const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return 0;
    return ((Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0)) * 60 + Number(m[2]);
  };
  const fmt = (min: number) => `${((Math.floor(min / 60) + 11) % 12) + 1}:${String(min % 60).padStart(2, "0")} ${min >= 720 ? "PM" : "AM"}`;
  return HOURS.filter((h) => /\d/.test(h.hours)).map((d) => {
    const [open, close] = d.hours.split(/[–-]/).map(parse);
    const times: string[] = [];
    for (let t = open; t < close; t += 30) times.push(fmt(t));
    return { day: d.day, times };
  });
}
