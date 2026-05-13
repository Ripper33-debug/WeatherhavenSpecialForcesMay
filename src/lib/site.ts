export const company = {
  name: "Weatherhaven Resource Inc.",
  shortName: "Weatherhaven",
  tagline:
    "Mission-specific deployable infrastructure—shelter, power, environmental, and camp integration composed from mission profile, environment, personnel, mobility, power, timeline, and sustainment needs.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sof-solutions", label: "SOF" },
  { href: "/configurable-solutions", label: "Configurable solutions" },
  { href: "/mission-solution-builder", label: "Mission Solution Builder" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { href: "/sof-solutions", label: "Special Operations" },
      { href: "/configurable-solutions", label: "Configurable solutions" },
      { href: "/capabilities", label: "Engineering & field support" },
    ],
  },
  {
    title: "Programs & tools",
    links: [
      { href: "/mission-solution-builder", label: "Mission Solution Builder" },
      { href: "/events", label: "Events & capability briefings" },
      { href: "/resources", label: "Resources library" },
      { href: "/request-access", label: "Request access" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;
