export const company = {
  name: "Weatherhaven Resource Inc.",
  shortName: "Weatherhaven",
  tagline:
    "Mission-specific deployable infrastructure—shelter, power, environmental, and camp integration tailored to program requirements.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sof-solutions", label: "SOF Solutions" },
  { href: "/products", label: "Solutions" },
  { href: "/ai-configurator", label: "AI Configurator" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/ent-4943", label: "ENT 4943" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { href: "/sof-solutions", label: "Special Operations" },
      { href: "/products", label: "Mission packages & systems" },
      { href: "/capabilities", label: "Engineering & Field Support" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/ent-4943", label: "ENT 4943 deliverables" },
      { href: "/ai-configurator", label: "AI Configurator" },
      { href: "/request-access", label: "Request Access" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;
