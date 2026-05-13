"use server";

import { notFound, redirect } from "next/navigation";
import { isLeadStatus, updateLeadStatus } from "@/lib/leadsStore";

export async function setLeadStatusAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  if (!token || token !== process.env.LEADS_REGISTER_VIEW_TOKEN) {
    notFound();
  }
  const reference = String(formData.get("reference") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!reference || !isLeadStatus(status)) {
    redirect(`/programs/sof-lead-register?t=${encodeURIComponent(token)}`);
  }
  updateLeadStatus(reference, status);
  redirect(`/programs/sof-lead-register?t=${encodeURIComponent(token)}`);
}
