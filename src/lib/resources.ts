export type ResourceDocType = "Capabilities Brief" | "Spec Sheet" | "Technical Drawing" | "Field Report";
export type ResourceClassification = "Unclassified" | "CUI";

export type ResourceDocument = {
  id: string;
  title: string;
  system: string;
  docType: ResourceDocType;
  classification: ResourceClassification;
  format: string;
  size: string;
  href: string;
};

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  {
    id: "1",
    title: "Weatherhaven SOF Capabilities Brief 2026",
    system: "Platform",
    docType: "Capabilities Brief",
    classification: "Unclassified",
    format: "PDF",
    size: "4.2 MB",
    href: "#",
  },
  {
    id: "2",
    title: "MWSS-C2 Technical Specification",
    system: "MWSS-C2",
    docType: "Spec Sheet",
    classification: "Unclassified",
    format: "PDF",
    size: "2.8 MB",
    href: "#",
  },
  {
    id: "3",
    title: "RADS-12 Rapid Deploy Configuration Guide",
    system: "RADS-12",
    docType: "Spec Sheet",
    classification: "Unclassified",
    format: "PDF",
    size: "1.9 MB",
    href: "#",
  },
  {
    id: "4",
    title: "Arctic Operations Shelter Guide",
    system: "ARCS-COLD",
    docType: "Field Report",
    classification: "Unclassified",
    format: "PDF",
    size: "3.1 MB",
    href: "#",
  },
  {
    id: "5",
    title: "ECU Selection & Sizing Reference",
    system: "Environmental",
    docType: "Technical Drawing",
    classification: "CUI",
    format: "PDF",
    size: "5.4 MB",
    href: "#",
  },
  {
    id: "6",
    title: "Camp Integration Planning Guide",
    system: "EFSS",
    docType: "Capabilities Brief",
    classification: "Unclassified",
    format: "PDF",
    size: "3.6 MB",
    href: "#",
  },
  {
    id: "7",
    title: "MWSS-MED Medical Shelter Specification",
    system: "MWSS-MED",
    docType: "Spec Sheet",
    classification: "Unclassified",
    format: "PDF",
    size: "2.4 MB",
    href: "#",
  },
  {
    id: "8",
    title: "Power Systems Integration Reference",
    system: "Power",
    docType: "Technical Drawing",
    classification: "CUI",
    format: "PDF",
    size: "4.0 MB",
    href: "#",
  },
];

export const RESOURCE_DOC_TYPES = ["All", "Capabilities Brief", "Spec Sheet", "Technical Drawing", "Field Report"] as const;
export const RESOURCE_CLASSIFICATIONS = ["All", "Unclassified", "CUI"] as const;
