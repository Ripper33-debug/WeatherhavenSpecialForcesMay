export const company = {
  name: "Weatherhaven Resource Inc.",
  shortName: "Weatherhaven",
  tagline:
    "Mission-specific deployable infrastructure—shelter, power, environmental, and camp integration composed from mission profile, environment, personnel, mobility, power, timeline, and sustainment needs.",
} as const;

/** Desktop hover + mobile accordion — Solutions */
export const navSolutionsItems = [
  {
    href: "/sof-solutions",
    label: "Special Operations",
    description: "SOF-focused deployable shelter systems",
  },
  {
    href: "/configurable-solutions",
    label: "Configurable Solutions",
    description: "Building blocks shaped around your program",
  },
] as const;

/** Desktop hover + mobile accordion — Resources */
export const navResourcesItems = [
  {
    href: "/resources",
    label: "Resources Library",
    description: "Technical documents and capability briefs",
  },
  {
    href: "/events",
    label: "Events & Briefings",
    description: "Upcoming demos and capability exchanges",
  },
] as const;

/** Top-level flat links between Solutions and Resources */
export const navFlatLinks = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/mission-solution-builder", label: "Mission Builder" },
] as const;

export const navContactLink = { href: "/contact", label: "Contact" } as const;

/** All leaf destinations for footers / sitemaps */
export const navFooterLeafLinks = [
  ...navSolutionsItems,
  ...navFlatLinks,
  ...navResourcesItems,
  navContactLink,
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
