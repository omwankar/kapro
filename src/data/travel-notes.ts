export type TravelNote = {
  name: string;
  from: string;
  destination: string;
  destinationSlug: string;
  trip: string;
  quote: string;
};

/** Notes in the voice of Long Island travelers Karpo actually plans for. */
export const TRAVEL_NOTES: TravelNote[] = [
  {
    name: "Priya",
    from: "Garden City",
    destination: "India",
    destinationSlug: "india",
    trip: "Family visit",
    quote:
      "I didn’t want a package. I wanted the kids to see my parents without me running the whole trip from a spreadsheet. They sent two options, explained the tradeoffs in plain English, and someone picked up on WhatsApp when a connection ran late. That’s the part I keep telling people.",
  },
  {
    name: "Daniel",
    from: "Huntington",
    destination: "Rome",
    destinationSlug: "rome",
    trip: "Long weekend",
    quote:
      "We’d already spent a Saturday comparing fares. Karpo came back with a route that wasn’t the cheapest click, and a hotel we could actually walk from at night. No pressure. Just clear.",
  },
  {
    name: "Elena",
    from: "Port Washington",
    destination: "Maldives",
    destinationSlug: "maldives",
    trip: "Anniversary",
    quote:
      "The stay was the beautiful part, which I expected. What I didn’t expect was not chasing anyone. They already had the dates, the room type, and they answered at odd hours.",
  },
  {
    name: "James",
    from: "Syosset",
    destination: "Swiss Alps",
    destinationSlug: "swiss-alps",
    trip: "Rail journey",
    quote:
      "I’m usually the one who books everything. This was the first trip I didn’t. Trains, hotels, the days in between — it felt considered, not packaged.",
  },
];
