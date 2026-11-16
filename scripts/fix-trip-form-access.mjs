import fs from "node:fs";

const path = "src/components/trip-form.tsx";
let s = fs.readFileSync(path, "utf8");

const pairs = [
  [/values\.tripType/g, 'values["tripType"]'],
  [/values\.multiCityLegs/g, 'values["multiCityLegs"]'],
  [/values\.departureDate/g, 'values["departureDate"]'],
  [/values\.returnDate/g, 'values["returnDate"]'],
  [/values\.adults/g, 'values["adults"]'],
  [/values\.infants/g, 'values["infants"]'],
  [/values\.checkIn/g, 'values["checkIn"]'],
  [/values\.checkOut/g, 'values["checkOut"]'],
  [/values\.pickupDate/g, 'values["pickupDate"]'],
  [/values\.dropoffDate/g, 'values["dropoffDate"]'],
  [/serviceValues\.tripType/g, 'serviceValues["tripType"]'],
  [/serviceValues\.multiCityLegs/g, 'serviceValues["multiCityLegs"]'],
  [/next\.service\b/g, 'next["service"]'],
  [/next\.name\b/g, 'next["name"]'],
  [/next\.email\b/g, 'next["email"]'],
  [/next\.returnDate\b/g, 'next["returnDate"]'],
  [/next\.infants\b/g, 'next["infants"]'],
  [/next\.checkOut\b/g, 'next["checkOut"]'],
  [/next\.dropoffDate\b/g, 'next["dropoffDate"]'],
  [/next\.multiCityLegs\b/g, 'next["multiCityLegs"]'],
  [/errors\.service\b/g, 'errors["service"]'],
  [/errors\.name\b/g, 'errors["name"]'],
  [/errors\.email\b/g, 'errors["email"]'],
  [/delete next\.service/g, 'delete next["service"]'],
];

for (const [re, rep] of pairs) s = s.replace(re, rep);

s = s.replace(
  /error=\{errors\[field\.key\]\}/g,
  'error={errors[field.key] ?? undefined}',
);

s = s.replace(
  /if \(!shouldShowField\(field, serviceValues, serviceId\)\) return null;/g,
  'if (!serviceId || !shouldShowField(field, serviceValues, serviceId)) return null;',
);

fs.writeFileSync(path, s);
console.log("fixed");
