export const company = {
  name: "Weatherhaven Resource Inc.",
  shortName: "Weatherhaven",
  tagline:
    "Mission-specific deployable infrastructure—shelter, power, environmental, and camp integration tailored to program requirements.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sof-solutions", label: "SOF" },
  { href: "/products", label: "Systems" },
  { href: "/ai-configurator", label: "Builder" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { href: "/sof-solutions", label: "Special Operations" },
      { href: "/products", label: "Configurable systems" },
      { href: "/capabilities", label: "Engineering & field support" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/ai-configurator", label: "Solution builder" },
      { href: "/request-access", label: "Request access" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;
