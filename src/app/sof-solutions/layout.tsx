import type { Metadata } from "next";
import "./sof-solutions.css";
import { SofNav } from "./_components/SofNav";
import { SofFooter } from "./_components/SofFooter";

export const metadata: Metadata = {
  title: "SOF Solutions",
  description:
    "Special operations deployable infrastructure—shelter, power, and environmental control composed from mission CONOPS for U.S. and allied SOF.",
};

export default function SofSolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sof-solutions-root">
      <SofNav />
      {children}
      <SofFooter />
    </div>
  );
}
