import fs from "node:fs";

const path = "src/data/trip-services.ts";
let s = fs.readFileSync(path, "utf8");

/** Insert span after key line for known fields per service block — simpler: replace field objects */
const spans = {
  // flights
  'key: "tripType"': 12,
  'key: "from"': 6,
  'key: "to"': 6,
  'key: "departureDate"': 6,
  'key: "returnDate"': 6,
  'key: "adults"': 4, // overridden per service later via more specific replaces
  'key: "children"': 4,
  'key: "infants"': 4,
  'key: "cabin"': 12,
  'key: "flexibleDates"': 6,
  'key: "directOnly"': 6,
  'key: "preferredAirline"': 12,
};

// Add span: N after each key line if not already present on next lines of object
s = s.replace(
  /(\{\s*\n\s*key: "([^"]+)",\n)(?![\s\S]{0,80}?span:)/g,
  (match, prefix, key) => {
    // default handled later
    return match;
  },
);

// Brute force: for each field key occurrence, if the object doesn't have span within 400 chars, inject after key line
s = s.replace(/(key: "([^"]+)",)(\n(?:(?!\n\s*\{)[\s\S]){0,350}?)(\n\s*\},)/g, (full, keyLine, key, body, end) => {
  if (/\bspan:\s*\d+/.test(body)) return full;
  return `${keyLine}\n        span: 12,${body}${end}`;
});

fs.writeFileSync(path, s);
console.log("spans injected as 12 default");
