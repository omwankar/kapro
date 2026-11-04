import baliImg from "@/assets/journeys/bali_temple.webp";
import tokyoImg from "@/assets/journeys/tokyo_night.webp";
import alpsImg from "@/assets/journeys/swiss_alps_tall.webp";
import romeImg from "@/assets/journeys/rome_colosseum.webp";
import nycImg from "@/assets/journeys/new_york_dusk.webp";

export type Journey = {
  name: string;
  place: string;
  code: string;
  tagline: string;
  image: string;
  query: string;
  initials: string;
};

const ALL_JOURNEYS: Journey[] = [
  {
    name: "Bali",
    place: "Indonesia",
    code: "DPS",
    tagline: "Temples above the jungle canopy",
    image: baliImg,
    query: "Bali",
    initials: "ID",
  },
  {
    name: "Tokyo",
    place: "Japan",
    code: "HND",
    tagline: "Neon nights, quiet shrines",
    image: tokyoImg,
    query: "Tokyo",
    initials: "JP",
  },
  {
    name: "Swiss Alps",
    place: "Switzerland",
    code: "ZRH",
    tagline: "Rails through the high passes",
    image: alpsImg,
    query: "Swiss Alps",
    initials: "CH",
  },
  {
    name: "Rome",
    place: "Italy",
    code: "FCO",
    tagline: "Stone, light, and late dinners",
    image: romeImg,
    query: "Rome",
    initials: "IT",
  },
  {
    name: "New York",
    place: "USA",
    code: "JFK",
    tagline: "Where it all began",
    image: nycImg,
    query: "New York",
    initials: "US",
  },
  {
    name: "Paris",
    place: "France",
    code: "CDG",
    tagline: "Evenings under the Eiffel Tower",
    image: "/images/journeys/paris.webp",
    query: "Paris",
    initials: "FR",
  },
  {
    name: "India",
    place: "Taj Mahal, Agra",
    code: "DEL",
    tagline: "Marble that glows at sunrise",
    image: "/images/journeys/india.webp",
    query: "India",
    initials: "IN",
  },
  {
    name: "Dubai",
    place: "UAE",
    code: "DXB",
    tagline: "Skylines above the desert",
    image: "/images/journeys/dubai.webp",
    query: "Dubai",
    initials: "AE",
  },
  {
    name: "Maldives",
    place: "Maldives",
    code: "MLE",
    tagline: "Overwater and endlessly blue",
    image: "/images/journeys/maldives.webp",
    query: "Maldives",
    initials: "MV",
  },
  {
    name: "Santorini",
    place: "Greece",
    code: "JTR",
    tagline: "Blue domes, golden sunsets",
    image: "/images/journeys/santorini.webp",
    query: "Santorini",
    initials: "GR",
  },
  {
    name: "London",
    place: "UK",
    code: "LHR",
    tagline: "Tower Bridge at blue hour",
    image: "/images/journeys/london.webp",
    query: "London",
    initials: "UK",
  },
  {
    name: "Sydney",
    place: "Australia",
    code: "SYD",
    tagline: "Harbour lights and opera sails",
    image: "/images/journeys/sydney.webp",
    query: "Sydney",
    initials: "AU",
  },
  {
    name: "Istanbul",
    place: "Turkey",
    code: "IST",
    tagline: "Where two continents meet",
    image: "/images/journeys/istanbul.webp",
    query: "Istanbul",
    initials: "TR",
  },
  {
    name: "Egypt",
    place: "Egypt",
    code: "CAI",
    tagline: "Pyramids at golden hour",
    image: "/images/journeys/egypt.webp",
    query: "Egypt",
    initials: "EG",
  },
  {
    name: "Peru",
    place: "Machu Picchu",
    code: "CUZ",
    tagline: "Above the clouds in the Andes",
    image: "/images/journeys/peru.webp",
    query: "Peru",
    initials: "PE",
  },
  {
    name: "Thailand",
    place: "Thailand",
    code: "BKK",
    tagline: "Temples, tides and street food",
    image: "/images/journeys/thailand.webp",
    query: "Thailand",
    initials: "TH",
  },
];

/** Skip entries whose public image path is known-missing at build time. */
export const JOURNEYS: Journey[] = ALL_JOURNEYS;

export const JOURNEY_COUNT = JOURNEYS.length;
