import { createAdminClient } from "@/lib/supabase/admin";

export type AnalyticsSession = {
  id: string;
  user_id: string;
  email: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
};

export type AnalyticsPageView = {
  id: string;
  user_id: string;
  email: string | null;
  page: string;
  page_title: string | null;
  session_id: string | null;
  visited_at: string;
  time_on_page_seconds: number | null;
};

export type AnalyticsEvent = {
  id: string;
  user_id: string;
  email: string | null;
  event_type: string;
  event_label: string;
  page: string | null;
  session_id: string | null;
  occurred_at: string;
};

export type ClickEvent = {
  id: string;
  user_id: string;
  email: string | null;
  session_id: string | null;
  page: string | null;
  element_type: string | null;
  element_text: string | null;
  element_id: string | null;
  element_class: string | null;
  href: string | null;
  x_position: number | null;
  y_position: number | null;
  clicked_at: string;
};

export type ClickSummary = {
  mostClickedElement: string;
  mostClickedPage: string;
  totalClicksThisSession: number;
  totalClicksAllTime: number;
};

export type TopClickedElement = {
  elementText: string;
  page: string;
  count: number;
};

export type UserAnalyticsDetail = {
  sessions: AnalyticsSession[];
  topPages: { page: string; pageTitle: string; visits: number; avgSeconds: number }[];
  events: AnalyticsEvent[];
  clicks: ClickEvent[];
  clickSummary: ClickSummary;
};

export type UserAnalyticsRow = {
  id: string;
  email: string;
  createdAt: string;
  lastLogin: string | null;
  totalSessions: number;
  totalPageViews: number;
  engagementScore: number;
  detail: UserAnalyticsDetail;
};

export type AdminAnalyticsSummary = {
  totalUsers: number;
  activeToday: number;
  totalPageViews: number;
  totalEvents: number;
};

export type AdminAnalyticsPayload = {
  summary: AdminAnalyticsSummary;
  topClickedElements: TopClickedElement[];
  users: UserAnalyticsRow[];
};

function buildClickSummary(userClicks: ClickEvent[], userSessions: AnalyticsSession[]): ClickSummary {
  const latestSessionId = userSessions[0]?.id ?? null;
  const sessionClicks = latestSessionId
    ? userClicks.filter((c) => c.session_id === latestSessionId)
    : [];

  const elementCounts = new Map<string, number>();
  const pageCounts = new Map<string, number>();

  for (const c of userClicks) {
    const label = c.element_text || "(no text)";
    elementCounts.set(label, (elementCounts.get(label) ?? 0) + 1);
    const page = c.page || "—";
    pageCounts.set(page, (pageCounts.get(page) ?? 0) + 1);
  }

  let mostClickedElement = "—";
  let mostClickedPage = "—";
  let maxEl = 0;
  let maxPage = 0;

  for (const [text, count] of elementCounts) {
    if (count > maxEl) {
      maxEl = count;
      mostClickedElement = text;
    }
  }
  for (const [page, count] of pageCounts) {
    if (count > maxPage) {
      maxPage = count;
      mostClickedPage = page;
    }
  }

  return {
    mostClickedElement,
    mostClickedPage,
    totalClicksThisSession: sessionClicks.length,
    totalClicksAllTime: userClicks.length,
  };
}

function buildTopClickedElements(allClicks: ClickEvent[]): TopClickedElement[] {
  const counts = new Map<string, { elementText: string; page: string; count: number }>();

  for (const c of allClicks) {
    const elementText = c.element_text || "(no text)";
    const page = c.page || "—";
    const key = `${elementText}::${page}`;
    const existing = counts.get(key) ?? { elementText, page, count: 0 };
    existing.count += 1;
    counts.set(key, existing);
  }

  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 10);
}

function computeEngagementScore(
  pageViews: AnalyticsPageView[],
  sessions: AnalyticsSession[],
  events: AnalyticsEvent[],
): number {
  const uniquePages = new Set(pageViews.map((p) => p.page)).size;
  const pagesScore = Math.min(uniquePages * 10, 60);

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentSessions = sessions.filter((s) => new Date(s.started_at).getTime() >= thirtyDaysAgo).length;
  const sessionScore = Math.min(recentSessions * 5, 20);

  const requestAccessClick = events.some((e) => e.event_label === "Request Access button");
  const requestScore = requestAccessClick ? 10 : 0;

  const missionBuilderVisit = pageViews.some((p) => p.page.includes("/mission-solution-builder"));
  const missionScore = missionBuilderVisit ? 10 : 0;

  return Math.min(100, pagesScore + sessionScore + requestScore + missionScore);
}

function buildTopPages(pageViews: AnalyticsPageView[]) {
  const byPage = new Map<string, { title: string; visits: number; totalSeconds: number; counted: number }>();

  for (const pv of pageViews) {
    const existing = byPage.get(pv.page) ?? {
      title: pv.page_title ?? pv.page,
      visits: 0,
      totalSeconds: 0,
      counted: 0,
    };
    existing.visits += 1;
    if (pv.time_on_page_seconds != null) {
      existing.totalSeconds += pv.time_on_page_seconds;
      existing.counted += 1;
    }
    byPage.set(pv.page, existing);
  }

  return [...byPage.entries()]
    .map(([page, v]) => ({
      page,
      pageTitle: v.title,
      visits: v.visits,
      avgSeconds: v.counted > 0 ? Math.round(v.totalSeconds / v.counted) : 0,
    }))
    .sort((a, b) => b.visits - a.visits);
}

export async function fetchAdminAnalytics(): Promise<AdminAnalyticsPayload> {
  const admin = createAdminClient();

  const [{ data: authData }, { data: sessions }, { data: pageViews }, { data: events }, { data: clicks }] =
    await Promise.all([
      admin.auth.admin.listUsers({ perPage: 1000 }),
      admin.from("user_sessions").select("*").order("started_at", { ascending: false }),
      admin.from("page_views").select("*").order("visited_at", { ascending: false }),
      admin.from("user_events").select("*").order("occurred_at", { ascending: false }),
      admin.from("click_events").select("*").order("clicked_at", { ascending: false }),
    ]);

  const allSessions = (sessions ?? []) as AnalyticsSession[];
  const allPageViews = (pageViews ?? []) as AnalyticsPageView[];
  const allEvents = (events ?? []) as AnalyticsEvent[];
  const allClicks = (clicks ?? []) as ClickEvent[];
  const authUsers = authData?.users ?? [];

  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const activeUserIds = new Set<string>();

  for (const s of allSessions) {
    if (new Date(s.started_at).getTime() >= oneDayAgo) {
      activeUserIds.add(s.user_id);
    }
  }
  for (const u of authUsers) {
    if (u.last_sign_in_at && new Date(u.last_sign_in_at).getTime() >= oneDayAgo) {
      activeUserIds.add(u.id);
    }
  }

  const users: UserAnalyticsRow[] = authUsers.map((u) => {
    const userSessions = allSessions.filter((s) => s.user_id === u.id);
    const userPageViews = allPageViews.filter((p) => p.user_id === u.id);
    const userEvents = allEvents.filter((e) => e.user_id === u.id);
    const userClicks = allClicks.filter((c) => c.user_id === u.id);

    const lastSession = userSessions[0];
    const lastLogin =
      u.last_sign_in_at ??
      lastSession?.started_at ??
      null;

    return {
      id: u.id,
      email: u.email ?? "—",
      createdAt: u.created_at ?? "",
      lastLogin,
      totalSessions: userSessions.length,
      totalPageViews: userPageViews.length,
      engagementScore: computeEngagementScore(userPageViews, userSessions, userEvents),
      detail: {
        sessions: userSessions.slice(0, 10),
        topPages: buildTopPages(userPageViews),
        events: userEvents.slice(0, 50),
        clicks: userClicks.slice(0, 50),
        clickSummary: buildClickSummary(userClicks, userSessions),
      },
    };
  });

  users.sort((a, b) => b.engagementScore - a.engagementScore);

  return {
    summary: {
      totalUsers: authUsers.length,
      activeToday: activeUserIds.size,
      totalPageViews: allPageViews.length,
      totalEvents: allEvents.length,
    },
    topClickedElements: buildTopClickedElements(allClicks),
    users,
  };
}
