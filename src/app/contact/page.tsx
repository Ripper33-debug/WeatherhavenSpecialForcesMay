import type { Metadata } from "next";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { ContactEngineeringForm } from "@/components/contact/ContactEngineeringForm";

export const metadata: Metadata = {
  title: "Contact Engineering",
  description: "Engage the Weatherhaven SOF solutions engineering team about program requirements.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#080a0c] pt-16 text-white lg:pt-[4.25rem]">
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <HeroTopoCanvas />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-12 pb-10 sm:px-6 lg:px-12 lg:pb-14">
          <p className="wh-label text-[#c8a96e]">Engage the team</p>
          <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Talk to a Weatherhaven engineer.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[#8a9099]">
            Share your program requirement and a member of our SOF solutions team will respond within 48 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ContactEngineeringForm />
      </section>
    </main>
  );
}
