"use client";

import { endSession, initClickTracking, startSession, trackEvent, trackPageView } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const VIEWED_SECTIONS = new Set<string>();

function handleTrackedClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const link = target.closest("a, button");
  if (!link) return;

  const href = link.getAttribute("href") ?? "";
  const text = (link.textContent ?? "").replace(/\s+/g, " ").trim();

  if (href.includes("/request-access") || text.toLowerCase().includes("request access")) {
    void trackEvent("click", "Request Access button");
    return;
  }

  if (text.includes("Download Capabilities Brief")) {
    void trackEvent("click", "Download Capabilities Brief");
    return;
  }

  if (text.includes("Contact Defense Team")) {
    void trackEvent("click", "Contact Defense Team");
    return;
  }

  if (
    href.includes("/mission-solution-builder") ||
    text === "Mission Builder" ||
    text.includes("Mission Solution Builder")
  ) {
    void trackEvent("click", "Mission Builder");
    return;
  }

  if (text.includes("View Capabilities")) {
    void trackEvent("click", "View Capabilities");
    return;
  }

  if (href === "/sof-solutions" || text === "Special Operations") {
    void trackEvent("click", "SOF Solutions");
  }
}

function observeAnalyticsSections() {
  const configs: { key: string; selector: string; label: string }[] = [
    { key: "capabilities", selector: '[data-analytics-section="capabilities"]', label: "Capabilities section" },
    { key: "credibility", selector: '[data-analytics-section="credibility"]', label: "Credibility section" },
  ];

  const observers: IntersectionObserver[] = [];

  for (const { key, selector, label } of configs) {
    document.querySelectorAll(selector).forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting || VIEWED_SECTIONS.has(key)) return;
          VIEWED_SECTIONS.add(key);
          void trackEvent("view", label);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });
  }

  return () => observers.forEach((o) => o.disconnect());
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sessionStarted = useRef(false);
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (sessionStarted.current) return;
    sessionStarted.current = true;
    void startSession().then(() => initClickTracking());

    const onUnload = () => {
      void endSession();
    };
    window.addEventListener("beforeunload", onUnload);
    document.addEventListener("click", handleTrackedClick, true);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
      document.removeEventListener("click", handleTrackedClick, true);
      void endSession();
    };
  }, []);

  useEffect(() => {
    VIEWED_SECTIONS.clear();
    const cleanupSections = observeAnalyticsSections();
    void initClickTracking();
    return cleanupSections;
  }, [pathname]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const title = typeof document !== "undefined" ? document.title : pathname;
    void trackPageView(pathname, title);
  }, [pathname]);

  return <>{children}</>;
}
