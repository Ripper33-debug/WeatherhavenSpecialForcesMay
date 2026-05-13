export type LeadStatus = "New" | "Vetting" | "Contacted" | "Qualified" | "Follow-up Required";

export type LeadRecord = {
  reference: string;
  submittedAt: string;
  status: LeadStatus;
  name: string;
  organization: string;
  email: string;
  role: string;
  program: string | null;
  message: string | null;
};

const STATUSES: LeadStatus[] = [
  "New",
  "Vetting",
  "Contacted",
  "Qualified",
  "Follow-up Required",
];

export function isLeadStatus(s: string): s is LeadStatus {
  return (STATUSES as readonly string[]).includes(s);
}

type LeadStoreGlobal = typeof globalThis & { __wh_leads?: LeadRecord[] };

function store(): LeadRecord[] {
  const g = globalThis as LeadStoreGlobal;
  if (!g.__wh_leads) g.__wh_leads = [];
  return g.__wh_leads;
}

export function addLead(input: {
  reference: string;
  submittedAt: string;
  name: string;
  organization: string;
  email: string;
  role: string;
  program: string | null;
  message: string | null;
}): LeadRecord {
  const row: LeadRecord = { ...input, status: "New" };
  store().unshift(row);
  return row;
}

export function listLeads(): LeadRecord[] {
  return [...store()].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

export function updateLeadStatus(reference: string, status: string): LeadRecord | null {
  if (!isLeadStatus(status)) return null;
  const row = store().find((l) => l.reference === reference);
  if (!row) return null;
  row.status = status;
  return row;
}

export function getLeadStatuses(): readonly LeadStatus[] {
  return STATUSES;
}
