"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { trackEvent } from "@/lib/analytics";
import {
  CONFIGURATOR_STEPS,
  buildMissionProfile,
  saveMissionProfile,
  type EnvironmentId,
  type ForceSizeId,
  type MissionProfileSelections,
  type MissionTypeId,
  type MobilityId,
} from "@/lib/missionConfigurator";

type Props = {
  open: boolean;
  onClose: () => void;
};

type StepAnswers = Partial<{
  environment: { id: EnvironmentId; label: string };
  missionType: { id: MissionTypeId; label: string };
  forceSize: { id: ForceSizeId; label: string };
  mobility: { id: MobilityId; label: string };
}>;

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/50 hover:bg-white/[0.04]";

export function MissionConfigurator({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<StepAnswers>({});
  const [result, setResult] = useState<MissionProfileSelections | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      onClose();
      setStep(1);
      setAnswers({});
      setResult(null);
    }, 320);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = "hidden";
      void trackEvent("click", "Mission Configurator opened");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const advance = useCallback((nextStep: number, patch: StepAnswers, eventLabel: string) => {
    void trackEvent("click", eventLabel);
    setTransitioning(true);
    setAnswers((prev) => ({ ...prev, ...patch }));
    window.setTimeout(() => {
      setStep(nextStep);
      setTransitioning(false);
    }, 220);
  }, []);

  const handleSelect = (stepNum: number, optionId: string, label: string) => {
    if (stepNum === 1) {
      advance(2, { environment: { id: optionId as EnvironmentId, label } }, `Configurator Step 1 — ${label}`);
    } else if (stepNum === 2) {
      advance(3, { missionType: { id: optionId as MissionTypeId, label } }, `Configurator Step 2 — ${label}`);
    } else if (stepNum === 3) {
      advance(4, { forceSize: { id: optionId as ForceSizeId, label } }, `Configurator Step 3 — ${label}`);
    } else if (
      stepNum === 4 &&
      answers.environment &&
      answers.missionType &&
      answers.forceSize
    ) {
      void trackEvent("click", `Configurator Step 4 — ${label}`);
      const profile = buildMissionProfile(
        answers.environment.id,
        answers.environment.label,
        answers.missionType.id,
        answers.missionType.label,
        answers.forceSize.id,
        answers.forceSize.label,
        optionId as MobilityId,
        label,
      );
      saveMissionProfile(profile);
      setResult(profile);
      void trackEvent("click", `Configurator completed — ${profile.recommendedTitle}`);
      setStep(5);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setAnswers({});
    setResult(null);
  };

  if (!open && !visible) return null;

  const currentStep = CONFIGURATOR_STEPS[step - 1];
  const progressLabel = result ? "COMPLETE" : `${String(step).padStart(2, "0")} / 04`;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#080a0c] transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mission configurator"
    >
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-5 sm:px-8 lg:px-12">
        <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#c8a96e]">{progressLabel}</p>
        <button
          type="button"
          onClick={handleClose}
          className="flex p-2 text-[#8a9099] transition-colors hover:text-white"
          aria-label="Close configurator"
        >
          <IconX size={22} stroke={1.5} />
        </button>
      </header>

      <div
        className={`flex flex-1 flex-col overflow-y-auto px-4 py-10 transition-all duration-200 ease-out sm:px-8 lg:px-12 lg:py-16 ${
          transitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {result && step === 5 ? (
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center">
            <p className="wh-label">MISSION PROFILE</p>
            <h2 className="font-display mt-6 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
              Your Mission Profile
            </h2>
            <p className="font-display mt-4 text-lg font-medium leading-snug text-[#c8a96e] sm:text-xl">
              {result.recommendedTitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#8a9099] sm:text-base">
              {result.recommendedDescription}
            </p>

            <ul className="mt-10 space-y-3 border border-white/10 bg-black/40 p-6 sm:p-8">
              {[
                result.environmentLabel,
                result.missionTypeLabel,
                result.forceSizeLabel,
                result.mobilityLabel,
              ].map((label) => (
                <li key={label} className="flex items-start gap-3 text-sm">
                  <IconCheck className="mt-0.5 shrink-0 text-[#c8a96e]" size={18} stroke={2} aria-hidden />
                  <span className="text-white">{label}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-8 space-y-4 border-t border-white/[0.08] pt-8 text-sm">
              <div>
                <dt className="wh-label text-[#8a9099]">Estimated setup time</dt>
                <dd className="mt-2 text-white">{result.estimatedSetupTime}</dd>
              </div>
              <div>
                <dt className="wh-label text-[#8a9099]">Transport</dt>
                <dd className="mt-2 leading-relaxed text-[#8a9099]">{result.transportConfirmation}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/request-access"
                className={btnPrimary}
                onClick={() =>
                  void trackEvent("click", `Request This Configuration — ${result.recommendedTitle}`)
                }
              >
                Request This Configuration
              </Link>
              <button type="button" onClick={handleStartOver} className={btnGhost}>
                Start Over
              </button>
            </div>
            <p className="mt-6 text-center text-xs leading-relaxed text-[#8a9099] sm:text-left">
              A Weatherhaven engineer will contact you within 48 hours to discuss your specific requirements.
            </p>
          </div>
        ) : currentStep ? (
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
            <p className="wh-label">{currentStep.label}</p>
            <h2 className="font-display mt-6 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
              {currentStep.headline}
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {currentStep.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(currentStep.step, opt.id, opt.label)}
                  className="group relative flex items-start gap-4 border border-white/10 bg-black/30 p-5 text-left transition-[border-color,background-color] duration-200 hover:border-[rgba(200,169,110,0.5)] hover:bg-[rgba(200,169,110,0.05)]"
                >
                  <span className="mt-0.5 shrink-0 text-xl leading-none" aria-hidden>
                    {opt.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug text-white sm:text-base">
                      {opt.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-[#8a9099]">{opt.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}