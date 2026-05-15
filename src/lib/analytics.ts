import { createClient } from "@/lib/supabase/client";

let sessionId: string | null = null;
let sessionStartTime = Date.now();
let currentPage = "";
let pageStartTime = Date.now();
let lastPageViewId: string | null = null;

async function updateLastPageTime() {
  if (!lastPageViewId) return;
  const supabase = createClient();
  const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);
  await supabase.from("page_views").update({ time_on_page_seconds: timeOnPage }).eq("id", lastPageViewId);
}

export async function startSession() {
  if (sessionId) return;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase
    .from("user_sessions")
    .insert({ user_id: user.id, email: user.email, started_at: new Date().toISOString() })
    .select()
    .single();

  if (data) {
    sessionId = data.id;
    sessionStartTime = Date.now();
  }
}

export async function endSession() {
  if (!sessionId) return;

  await updateLastPageTime();

  const supabase = createClient();
  const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
  await supabase
    .from("user_sessions")
    .update({ ended_at: new Date().toISOString(), duration_seconds: duration })
    .eq("id", sessionId);

  sessionId = null;
  lastPageViewId = null;
  currentPage = "";
}

export async function trackPageView(page: string, pageTitle: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !sessionId) return;

  if (currentPage && lastPageViewId) {
    await updateLastPageTime();
  }

  const { data } = await supabase
    .from("page_views")
    .insert({
      user_id: user.id,
      email: user.email,
      page,
      page_title: pageTitle,
      session_id: sessionId,
      visited_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (data) {
    lastPageViewId = data.id;
  }

  currentPage = page;
  pageStartTime = Date.now();
}

export async function trackEvent(eventType: string, eventLabel: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !sessionId) return;

  await supabase.from("user_events").insert({
    user_id: user.id,
    email: user.email,
    event_type: eventType,
    event_label: eventLabel,
    page: currentPage,
    session_id: sessionId,
    occurred_at: new Date().toISOString(),
  });
}
