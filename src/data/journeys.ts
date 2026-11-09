import baliImg from "@/assets/journeys/bali_temple.webp";
import tokyoImg from "@/assets/journeys/tokyo_night.webp";
import alpsImg from "@/assets/journeys/swiss_alps_tall.webp";
import romeImg from "@/assets/journeys/rome_colosseum.webp";
import nycImg from "@/assets/journeys/new_york_dusk.webp";

export type JourneyMood =
  | "Featured"
  | "Romantic"
  | "Adventure"
  | "Culture"
  | "City lights";

export type Journey = {
  name: string;
  place: string;
  code: string;
  tagline: string;
  image: string;
  query: string;
  focus: string;
  accent: string;
  moods: JourneyMood[];
  highlights: [string, string, string];
  lat: number;
  lng: number;
};

export const JOURNEY_MOODS: JourneyMood[] = [
  "Featured",
  "Romantic",
  "Adventure",
  "Culture",
  "City lights",
];

export const ORIGIN = {
  name: "New York",
  code: "JFK",
  lat: 40.71,
  lng: -74.01,
} as const;

const ALL_JOURNEYS: Journey[] = [
  {
    name: "Bali",
    place: "Indonesia",
    code: "DPS",
    tagline: "Temples above the jungle canopy",
    image: baliImg,
    query: "Bali",
    focus: "50% 35%",
    accent: "#6F8F6A",
    moods: ["Romantic", "Adventure"],
    highlights: ["Water temples", "Rice terraces", "Sunset beaches"],
    lat: -8.34,
    lng: 115.09,
  },
  {
    name: "Tokyo",
    place: "Japan",
    code: "HND",
    tagline: "Neon nights, quiet shrines",
    image: tokyoImg,
    query: "Tokyo",
    focus: "50% 40%",
    accent: "#E0457B",
    moods: ["Culture", "City lights", "Featured"],
    highlights: ["Shibuya crossing", "Temples", "Ramen alleys"],
    lat: 35.68,
    lng: 139.69,
  },
  {
    name: "Swiss Alps",
    place: "Switzerland",
    code: "ZRH",
    tagline: "Rails through the high passes",
    image: alpsImg,
    query: "Swiss Alps",
    focus: "50% 45%",
    accent: "#E0A060",
    moods: ["Adventure", "Romantic", "Featured"],
    highlights: ["Scenic rail", "Alpine hikes", "Lake towns"],
    lat: 46.8,
    lng: 8.2,
  },
  {
    name: "Rome",
    place: "Italy",
    code: "FCO",
    tagline: "Stone, light, and late dinners",
    image: romeImg,
    query: "Rome",
    focus: "50% 40%",
    accent: "#D0884B",
    moods: ["Romantic", "Culture"],
    highlights: ["Colosseum", "Trastevere dinners", "Vatican"],
    lat: 41.9,
    lng: 12.5,
  },
  {
    name: "New York",
    place: "USA",
    code: "JFK",
    tagline: "Where it all began",
    image: nycImg,
    query: "New York",
    focus: "50% 35%",
    accent: "#2F4E8F",
    moods: ["City lights", "Featured"],
    highlights: ["Skyline views", "Broadway", "Central Park"],
    lat: 40.71,
    lng: -74.01,
  },
  {
    name: "Paris",
    place: "France",
    code: "CDG",
    tagline: "Evenings under the Eiffel Tower",
    image: "/images/journeys/paris.webp",
    query: "Paris",
    focus: "50% 30%",
    accent: "#C9A36B",
    moods: ["Romantic", "City lights", "Culture", "Featured"],
    highlights: ["Eiffel Tower", "Seine cruise", "Louvre"],
    lat: 48.86,
    lng: 2.35,
  },
  {
    name: "India",
    place: "Taj Mahal, Agra",
    code: "DEL",
    tagline: "Marble that glows at sunrise",
    image: "/images/journeys/india.webp",
    query: "India",
    focus: "50% 40%",
    accent: "#E9A98D",
    moods: ["Culture", "Featured"],
    highlights: ["Taj Mahal", "Old Delhi", "Jaipur palaces"],
    lat: 27.18,
    lng: 78.04,
  },
  {
    name: "Dubai",
    place: "UAE",
    code: "DXB",
    tagline: "Skylines above the desert",
    image: "/images/journeys/dubai.webp",
    query: "Dubai",
    focus: "50% 35%",
    accent: "#D98F6C",
    moods: ["City lights"],
    highlights: ["Burj Khalifa", "Desert safari", "Old souks"],
    lat: 25.2,
    lng: 55.27,
  },
  {
    name: "Maldives",
    place: "Maldives",
    code: "MLE",
    tagline: "Overwater and endlessly blue",
    image: "/images/journeys/maldives.webp",
    query: "Maldives",
    focus: "50% 50%",
    accent: "#2BB3C0",
    moods: ["Romantic", "Featured"],
    highlights: ["Overwater villas", "Snorkelling", "Sandbank dinners"],
    lat: 3.2,
    lng: 73.22,
  },
  {
    name: "Santorini",
    place: "Greece",
    code: "JTR",
    tagline: "Blue domes, golden sunsets",
    image: "/images/journeys/santorini.webp",
    query: "Santorini",
    focus: "50% 40%",
    accent: "#3B6FB6",
    moods: ["Romantic", "Featured"],
    highlights: ["Caldera sunsets", "Oia", "Wine tasting"],
    lat: 36.39,
    lng: 25.46,
  },
  {
    name: "London",
    place: "UK",
    code: "LHR",
    tagline: "Tower Bridge at blue hour",
    image: "/images/journeys/london.webp",
    query: "London",
    focus: "50% 35%",
    accent: "#6E7FA3",
    moods: ["City lights"],
    highlights: ["Tower Bridge", "West End", "Royal parks"],
    lat: 51.51,
    lng: -0.13,
  },
  {
    name: "Sydney",
    place: "Australia",
    code: "SYD",
    tagline: "Harbour lights and opera sails",
    image: "/images/journeys/sydney.webp",
    query: "Sydney",
    focus: "50% 45%",
    accent: "#3A86C8",
    moods: ["City lights", "Adventure"],
    highlights: ["Opera House", "Harbour ferries", "Bondi"],
    lat: -33.87,
    lng: 151.21,
  },
  {
    name: "Istanbul",
    place: "Turkey",
    code: "IST",
    tagline: "Where two continents meet",
    image: "/images/journeys/istanbul.webp",
    query: "Istanbul",
    focus: "50% 40%",
    accent: "#C26A4A",
    moods: ["Culture", "City lights"],
    highlights: ["Hagia Sophia", "Grand Bazaar", "Bosphorus cruise"],
    lat: 41.01,
    lng: 28.98,
  },
  {
    name: "Egypt",
    place: "Egypt",
    code: "CAI",
    tagline: "Pyramids at golden hour",
    image: "/images/journeys/egypt.webp",
    query: "Egypt",
    focus: "50% 45%",
    accent: "#D9A441",
    moods: ["Culture", "Adventure"],
    highlights: ["Pyramids", "Nile cruise", "Luxor temples"],
    lat: 29.98,
    lng: 31.13,
  },
  {
    name: "Peru",
    place: "Machu Picchu",
    code: "CUZ",
    tagline: "Above the clouds in the Andes",
    image: "/images/journeys/peru.webp",
    query: "Peru",
    focus: "50% 40%",
    accent: "#5E8F5A",
    moods: ["Adventure", "Culture"],
    highlights: ["Machu Picchu", "Sacred Valley", "Cusco"],
    lat: -13.16,
    lng: -72.55,
  },
  {
    name: "Thailand",
    place: "Thailand",
    code: "BKK",
    tagline: "Temples, tides and street food",
    image: "/images/journeys/thailand.webp",
    query: "Thailand",
    focus: "50% 40%",
    accent: "#2E9C8F",
    moods: ["Adventure"],
    highlights: ["Island hopping", "Temples", "Street food"],
    lat: 13.76,
    lng: 100.5,
  },
];

/** Skip entries whose image path is missing. */
export const JOURNEYS: Journey[] = ALL_JOURNEYS.filter((j) => Boolean(j.image));

export const JOURNEY_COUNT = JOURNEYS.length;

export function journeySlug(journey: Journey): string {
  return (journey.query || journey.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getJourneyBySlug(slug: string): Journey | undefined {
  return JOURNEYS.find((journey) => journeySlug(journey) === slug);
}

export function destinationPath(journey: Journey): string {
  return `/destinations/${journeySlug(journey)}`;
}

export function journeysForMood(mood: JourneyMood, limit = 7): Journey[] {
  return JOURNEYS.filter((j) => j.moods.includes(mood)).slice(0, limit);
}

export function moodContaining(code: string): JourneyMood {
  const journey = JOURNEYS.find((j) => j.code === code);
  if (!journey) return "Featured";
  if (journey.moods.includes("Featured")) return "Featured";
  return journey.moods[0] ?? "Featured";
}

export function contactHrefForJourney(journey: Journey): string {
  return `/contact?service=vacations&destination=${encodeURIComponent(journey.query)}`;
}
