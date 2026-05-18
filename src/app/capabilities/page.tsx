import type { Metadata } from "next";
import { CapabilitiesExplorer } from "@/components/capabilities/CapabilitiesExplorer";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Engineering-led capability across shelter systems, environmental control, power, flooring, C2 integration, medical, aviation support, and camp integration.",
};

export default function CapabilitiesPage() {
  return <CapabilitiesExplorer />;
}
