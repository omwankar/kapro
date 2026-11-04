from pathlib import Path

p = Path("src/data/services.ts")
text = p.read_text(encoding="utf-8")
replacements = [
    ("Icon: Route,", "icon: \"route\","),
    ("Icon: BadgeCheck,", "icon: \"badge-check\","),
    ("Icon: HeartHandshake,", "icon: \"heart-handshake\","),
    ("Icon: Headphones,", "icon: \"headphones\","),
    ("Icon: Hotel,", "icon: \"hotel\","),
    ("Icon: Sparkles,", "icon: \"sparkles\","),
    ("Icon: Compass,", "icon: \"compass\","),
    ("Icon: ClipboardCheck,", "icon: \"clipboard-check\","),
    ("Icon: ShieldCheck,", "icon: \"shield-check\","),
    ("Icon: Ship,", "icon: \"ship\","),
    ("Icon: Car,", "icon: \"car\","),
    ("Icon: MapPinned,", "icon: \"map-pinned\","),
    ("Icon: FileCheck2,", "icon: \"file-check\","),
]
for a, b in replacements:
    text = text.replace(a, b)

old_nav = '''export const SERVICES_NAV = SERVICE_SLUGS.map((slug) => {
  const s = SERVICES_CONTENT[slug];
  return {
    slug: s.slug,
    title: s.title,
    line: s.line,
    img: s.img,
    href: servicePath(s.slug),
    Icon:
      slug === "flights"
        ? Plane
        : slug === "hotels"
          ? Hotel
          : slug === "vacations"
            ? Compass
            : slug === "cruises"
              ? Ship
              : slug === "cars"
                ? Car
                : FileCheck2,
  };
});'''

new_nav = '''export const SERVICES_NAV = SERVICE_SLUGS.map((slug) => {
  const s = SERVICES_CONTENT[slug];
  return {
    slug: s.slug,
    title: s.title,
    line: s.line,
    img: s.img,
    href: servicePath(s.slug),
  };
});'''

if old_nav not in text:
    raise SystemExit("SERVICES_NAV block not found")
text = text.replace(old_nav, new_nav)

# drop unused heroAccent fields if present
import re
text = re.sub(r'\n\s*heroAccent: "[^"]+",', "", text)

p.write_text(text, encoding="utf-8")
print("ok", text.count('icon: "'), "icons")
