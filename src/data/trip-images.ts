import santoriniImg from "@/assets/journeys/santorini.webp";
import baliImg from "@/assets/journeys/bali_temple.webp";
import tokyoImg from "@/assets/journeys/tokyo_night.webp";
import alpsImg from "@/assets/journeys/swiss_alps_tall.webp";
import romeImg from "@/assets/journeys/rome_colosseum.webp";
import nycImg from "@/assets/journeys/new_york_dusk.webp";
import maldivesImg from "@/assets/journeys/maldives_resort.webp";
import parisImg from "@/assets/journeys/paris_seine.webp";
import dubaiImg from "@/assets/journeys/dubai_skyline.webp";
import amalfiImg from "@/assets/journeys/amalfi_coast.webp";
import kyotoImg from "@/assets/journeys/kyoto_fushimi.jpg";

export type TripImage = {
  src: string;
  label: string;
  /** When true, skip if the file 404s (optional /public assets). */
  optional?: boolean;
};

/** Local destinations first; optional /public/images/trips entries are filtered if missing. */
export const TRIP_IMAGES: TripImage[] = [
  { src: santoriniImg, label: "Santorini, Greece" },
  { src: baliImg, label: "Bali, Indonesia" },
  { src: tokyoImg, label: "Tokyo, Japan" },
  { src: alpsImg, label: "Swiss Alps, Switzerland" },
  { src: romeImg, label: "Rome, Italy" },
  { src: nycImg, label: "New York, USA" },
  { src: maldivesImg, label: "Maldives huts" },
  { src: parisImg, label: "Paris, France" },
  { src: dubaiImg, label: "Dubai, UAE" },
  { src: amalfiImg, label: "Amalfi, Italy" },
  { src: kyotoImg, label: "Kyoto, Japan" },
  { src: "/images/trips/paris.jpg", label: "Paris, France", optional: true },
  { src: "/images/trips/dubai.jpg", label: "Dubai, UAE", optional: true },
  { src: "/images/trips/maldives.jpg", label: "Maldives", optional: true },
  { src: "/images/trips/kyoto.jpg", label: "Kyoto, Japan", optional: true },
  { src: "/images/trips/amalfi.jpg", label: "Amalfi, Italy", optional: true },
  { src: "/images/trips/safari.jpg", label: "Safari", optional: true },
];

export function probeTripImage(entry: TripImage): Promise<TripImage | null> {
  if (!entry.optional) return Promise.resolve(entry);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(entry);
    img.onerror = () => resolve(null);
    img.src = entry.src;
  });
}

export async function resolveTripImages(
  list: TripImage[] = TRIP_IMAGES,
): Promise<TripImage[]> {
  const results = await Promise.all(list.map(probeTripImage));
  return results.filter((entry): entry is TripImage => Boolean(entry));
}
