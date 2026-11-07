import { useSyncExternalStore } from "react";

/* Spirit of Birr: central mock-data layer. All figures are synthetic demo data.
   Reference demo date: Friday 6 November 2026. EUR. */

export const TEA = 130, WHISKEY = 80;
export type Exp = "Afternoon Tea" | "Whiskey Tasting" | "Programme concept";
export type Stage = "New Enquiry" | "Qualified" | "Proposal Sent" | "Awaiting Decision" | "Confirmed" | "Lost";
export const STAGES: Stage[] = ["New Enquiry", "Qualified", "Proposal Sent", "Awaiting Decision", "Confirmed", "Lost"];
export type Source = "Travel agent" | "Organic / direct" | "Referral" | "Social";

export type Enquiry = {
  ref: string; who: string; market: "Ireland" | "US" | "China"; exp: Exp; guests: number; value: number | null;
  date: string; slot?: string; source: Source; owner: string; last: string; next: string; stage: Stage;
  notes: string; lang: string; diet: string; quote: string | null; bookingRef?: string; tentative?: boolean;
};
export type Booking = {
  ref: string; client: string; date: string; time: string; exp: Exp; guests: number; value: number;
  host: string; team: string; status: "Confirmed" | "Completed"; note?: string;
};
export type Slot = { date: string; day: string; time: string; status: "open" | "booked" | "hold"; ref?: string };
export type Act = { t: string; text: string; kind: string };
export type Content = { id: string; title: string; channel: string; audience: string; status: string; date: string; owner: string; preview: string; approved: boolean };

const E = (ref: string, who: string, market: Enquiry["market"], exp: Exp, guests: number, date: string, source: Source,
  owner: string, stage: Stage, extra: Partial<Enquiry> = {}): Enquiry => ({
  ref, who, market, exp, guests, value: exp === "Afternoon Tea" ? guests * TEA : exp === "Whiskey Tasting" ? guests * WHISKEY : null,
  date, source, owner, last: "2 days ago", next: "Follow up", stage, notes: "", lang: "English", diet: "None noted", quote: null, ...extra });

const SALES = "Sales & Partnerships Coordinator (mock role)";
const initEnq: Enquiry[] = [
  E("E-2001", "Sarah Mitchell Group", "US", "Afternoon Tea", 12, "9 Nov", "Referral", "Patrick Parsons", "Confirmed", { bookingRef: "B-1041" }),
  E("E-2002", "Emerald Corporate Group", "Ireland", "Afternoon Tea", 16, "10 Nov", "Organic / direct", "Patrick Parsons", "Confirmed", { bookingRef: "B-1042" }),
  E("E-2003", "Chen Family Reunion", "China", "Afternoon Tea", 14, "12 Nov", "Referral", "Patrick Parsons", "Confirmed", { bookingRef: "B-1043", lang: "Mandarin welcome note", diet: "2 dietary requirements to confirm" }),
  E("E-2004", "Harper Ireland Journey", "US", "Afternoon Tea", 18, "13 Nov", "Travel agent", SALES, "Confirmed", { bookingRef: "B-1044" }),
  E("E-2005", "Dublin Cultural Society", "Ireland", "Whiskey Tasting", 20, "16 Nov", "Organic / direct", SALES, "Confirmed", { bookingRef: "B-1045" }),
  E("E-2006", "Pacific Heritage Travel", "US", "Whiskey Tasting", 19, "19 Nov", "Travel agent", SALES, "Confirmed", { bookingRef: "B-1046" }),
  E("E-2007", "Wild Atlantic Planners", "US", "Afternoon Tea", 8, "-", "Travel agent", SALES, "Lost", { notes: "Closed: chose an alternative venue." }),
  E("E-2008", "Murphy Retirement Party", "Ireland", "Afternoon Tea", 14, "-", "Social", SALES, "Lost", { notes: "Closed: date unavailable." }),
  E("E-2009", "Kavanagh Walking Club", "Ireland", "Whiskey Tasting", 11, "-", "Organic / direct", SALES, "Lost", { notes: "Closed: budget." }),
  E("E-2010", "Shamrock DMC", "US", "Afternoon Tea", 15, "-", "Travel agent", SALES, "Lost", { notes: "Closed: no reply after two follow-ups." }),
  E("E-2011", "Avery Brooks / US Travel Planner", "US", "Afternoon Tea", 16, "20 Nov", "Travel agent", SALES, "Awaiting Decision",
    { slot: "12:30", tentative: true, last: "Proposal sent 3 Nov", next: "Chase response by Mon 9 Nov", quote: "Q-2011 draft: 16 x €130 = €2,080" }),
  E("E-2012", "Li Wei / Dublin Chinese Alumni", "China", "Afternoon Tea", 20, "27 Nov", "Referral", "Patrick Parsons", "Qualified",
    { lang: "Mandarin requested", next: "Approve bilingual reply", last: "Yesterday" }),
  E("E-2013", "O'Rourke Family", "Ireland", "Afternoon Tea", 10, "TBC", "Organic / direct", SALES, "New Enquiry", { last: "Today", next: "Qualify dates" }),
  E("E-2014", "Boston Heritage Travel", "US", "Afternoon Tea", 18, "TBC", "Travel agent", SALES, "Proposal Sent",
    { last: "Proposal sent 30 Oct", next: "Follow-up due today", quote: "Q-2014: 18 x €130 = €2,340" }),
  E("E-2015", "Fiona Greene", "Ireland", "Whiskey Tasting", 12, "20 Nov", "Organic / direct", SALES, "Qualified",
    { slot: "12:30", tentative: true, next: "Propose alternative session", last: "4 Nov" }),
  E("E-2016", "Sino-Irish Summer Academy", "China", "Programme concept", 15, "TBC", "Social", "Patrick Parsons", "New Enquiry",
    { lang: "Mandarin", notes: "10-day programme concept. Unpriced; excluded from pipeline total." }),
  E("E-2017", "Harris Family", "Ireland", "Afternoon Tea", 10, "TBC", "Referral", SALES, "New Enquiry", { last: "Today" }),
  E("E-2018", "Celtic Luxury Tours", "US", "Whiskey Tasting", 19, "TBC", "Travel agent", SALES, "Qualified", { last: "5 Nov", next: "Send proposal" })
];

const B = (ref: string, client: string, date: string, time: string, exp: Exp, guests: number, host: string, team: string, status: Booking["status"] = "Confirmed", note = ""): Booking =>
  ({ ref, client, date, time, exp, guests, value: guests * (exp === "Whiskey Tasting" ? WHISKEY : TEA), host, team, status, note });
const initBookings: Booking[] = [
  B("B-1041", "Sarah Mitchell Group", "9 Nov", "12:30", "Afternoon Tea", 12, "Patrick Parsons", "Tina Ramirez, Mary Kinsella"),
  B("B-1042", "Emerald Corporate Group", "10 Nov", "12:30", "Afternoon Tea", 16, "Patrick Parsons", "Tina Ramirez, Mary Kinsella"),
  B("B-1043", "Chen Family Reunion", "12 Nov", "12:30", "Afternoon Tea", 14, "Patrick Parsons", "Tina Ramirez, Mary Kinsella, Conrad Bailey", "Confirmed", "2 dietary requirements to confirm. Mandarin welcome note requested."),
  B("B-1044", "Harper Ireland Journey", "13 Nov", "12:30", "Afternoon Tea", 18, "Patrick Parsons", "Tina Ramirez, Mary Kinsella"),
  B("B-1045", "Dublin Cultural Society", "16 Nov", "15:00", "Whiskey Tasting", 20, "Patrick Parsons", "John Callely, Mary Kinsella"),
  B("B-1046", "Pacific Heritage Travel", "19 Nov", "15:00", "Whiskey Tasting", 19, "Patrick Parsons", "John Callely, Mary Kinsella"),
  B("B-1035", "Ashford Travel Group", "22 Oct", "12:30", "Afternoon Tea", 12, "Patrick Parsons", "Tina Ramirez, Mary Kinsella", "Completed", "Feedback request awaiting approval. Referral invitation drafted, not sent.")
];

const DAYS: [string, string][] = [["9 Nov", "Mon"], ["10 Nov", "Tue"], ["12 Nov", "Thu"], ["13 Nov", "Fri"], ["16 Nov", "Mon"], ["17 Nov", "Tue"], ["19 Nov", "Thu"], ["20 Nov", "Fri"]];
const initSlots: Slot[] = DAYS.flatMap(([date, day]) => ["12:30", "15:00"].map(time => {
  const b = initBookings.find(x => x.status === "Confirmed" && x.date === date && x.time === time);
  return b ? { date, day, time, status: "booked" as const, ref: b.ref } : { date, day, time, status: "open" as const };
}));

export const PREP_ITEMS = ["Confirm guest numbers", "Confirm dietary requirements", "Confirm arrival time", "Assign host", "Assign culinary team",
  "Assign guide", "Confirm whiskey expert (if needed)", "Confirm optional activity arrangements", "Prepare guest welcome", "Mark venue ready"];

const initContent: Content[] = [
  { id: "c1", title: "Life inside Birr Castle", channel: "Instagram + Website", audience: "US heritage travellers", status: "Draft", date: "12 Nov", owner: "Patrick Parsons", preview: "A morning in the household, told by the family who live it.", approved: false },
  { id: "c2", title: "Generations of the Parsons family", channel: "Website", audience: "Irish heritage enthusiasts", status: "Review", date: "16 Nov", owner: "Marketing Coordinator (mock role)", preview: "From the 1620s to today: who held the house and why it stayed.", approved: false },
  { id: "c3", title: "The Great Telescope and the family's scientific legacy", channel: "LinkedIn + Website", audience: "Cultural and specialist groups", status: "Draft", date: "19 Nov", owner: "Patrick Parsons", preview: "How an Offaly estate built the largest telescope in the world.", approved: false },
  { id: "c4", title: "The people who worked at Birr", channel: "Instagram", audience: "Irish domestic", status: "Idea", date: "23 Nov", owner: "Conrad Bailey", preview: "Gardeners, cooks and stewards remembered by their descendants.", approved: false },
  { id: "c5", title: "Behind the scenes of a private afternoon tea", channel: "Instagram Reels", audience: "US travel advisers", status: "Review", date: "26 Nov", owner: "Tina Ramirez", preview: "From kitchen to table in ninety minutes.", approved: false },
  { id: "c6", title: "伯尔城堡的故事: 帕森斯家族 (Mandarin)", channel: "WeChat (draft only)", audience: "Chinese residents in Ireland", status: "Draft", date: "30 Nov", owner: "Patrick Parsons", preview: "Mandarin-language introduction to Spirit of Birr. Needs bilingual review.", approved: false }
];

type S = { enq: Enquiry[]; book: Booking[]; slots: Slot[]; prep: Record<string, boolean[]>; act: Act[]; content: Content[]; tasksDone: Record<string, boolean>; owners: Record<string, string> };
const prep0 = (n: number) => PREP_ITEMS.map((_, i) => i < n);
let state: S = {
  enq: initEnq, book: initBookings, slots: initSlots,
  prep: { "B-1041": prep0(8), "B-1042": prep0(6), "B-1043": [true, false, true, true, true, true, false, true, false, false], "B-1044": prep0(3), "B-1045": prep0(2), "B-1046": prep0(1) },
  act: [
    { t: "09:02", text: "Booking conflict detected: E-2011 and E-2015 both request Fri 20 Nov 12:30", kind: "Bookings" },
    { t: "08:40", text: "Ops Watchdog flagged 2 unconfirmed dietary requirements on B-1043", kind: "Agents" },
    { t: "Yesterday", text: "Quote Q-2014 sent to Boston Heritage Travel (follow-up due)", kind: "Sales" },
    { t: "Yesterday", text: "Booking request received from Li Wei (E-2012)", kind: "Sales" },
    { t: "Yesterday", text: "Referral message for B-1035 drafted, awaiting approval", kind: "Guest" }
  ],
  content: initContent, tasksDone: {}, owners: {}
};
const subs = new Set<() => void>();
const set = (fn: (s: S) => S) => { state = fn(state); subs.forEach(f => f()); };
export const useSpirit = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f); }; }, () => state);
const log = (s: S, text: string, kind: string): S => ({ ...s, act: [{ t: "Just now", text, kind }, ...s.act] });

/* ---- derived metrics (single source of truth) ---- */
export const metrics = (s: S) => {
  const up = s.book.filter(b => b.status === "Confirmed");
  const open = s.enq.filter(e => !["Confirmed", "Lost"].includes(e.stage));
  const total = s.enq.length, conv = s.enq.filter(e => e.stage === "Confirmed").length;
  return {
    bookings: up.length, guests: up.reduce((a, b) => a + b.guests, 0), value: up.reduce((a, b) => a + b.value, 0),
    tea: up.filter(b => b.exp === "Afternoon Tea").reduce((a, b) => a + b.value, 0), wh: up.filter(b => b.exp === "Whiskey Tasting").reduce((a, b) => a + b.value, 0),
    slots: s.slots.length, filled: s.slots.filter(x => x.status === "booked").length, holds: s.slots.filter(x => x.status === "hold").length,
    unfilled: s.slots.filter(x => x.status !== "booked").length, util: s.slots.filter(x => x.status === "booked").length / s.slots.length * 100,
    openCount: open.length, pipeline: open.reduce((a, e) => a + (e.value ?? 0), 0), total, conv, lost: s.enq.filter(e => e.stage === "Lost").length,
    rate: conv / total * 100
  };
};
export const eur = (n: number) => "€" + n.toLocaleString("en-IE");
export const conflicts = (s: S) => {
  const map: Record<string, Enquiry[]> = {};
  s.enq.filter(e => e.slot && !["Confirmed", "Lost"].includes(e.stage)).forEach(e => { (map[e.date + " " + e.slot] ||= []).push(e); });
  return Object.entries(map).filter(([, v]) => v.length > 1);
};
export const nextOpenSlot = (s: S, after?: string) => s.slots.find(x => x.status === "open" && x.date !== after);

/* ---- actions ---- */
export const act = {
  stage: (ref: string, stage: Stage) => set(s => log({ ...s, enq: s.enq.map(e => e.ref === ref ? { ...e, stage, last: "Just now" } : e) }, `${ref} moved to ${stage}`, "Sales")),
  owner: (ref: string, owner: string) => set(s => log({ ...s, enq: s.enq.map(e => e.ref === ref ? { ...e, owner } : e) }, `${ref} assigned to ${owner}`, "Sales")),
  quote: (ref: string) => set(s => { const e = s.enq.find(x => x.ref === ref)!; if (e.value == null) return s;
    return log({ ...s, enq: s.enq.map(x => x.ref === ref ? { ...x, quote: `Q-${ref.slice(2)} draft: ${x.guests} x €${x.value! / x.guests} = ${eur(x.value!)}`, stage: x.stage === "New Enquiry" ? "Qualified" : x.stage } : x) }, `Draft quote created for ${ref} (not sent)`, "Sales"); }),
  hold: (ref: string) => set(s => { const e = s.enq.find(x => x.ref === ref)!; const k = s.slots.find(x => x.date === e.date && x.time === e.slot);
    if (!k || k.status !== "open") return s;
    return log({ ...s, slots: s.slots.map(x => x === k ? { ...x, status: "hold", ref } : x) }, `Temporary hold placed on ${e.date} ${e.slot} for ${ref}`, "Bookings"); }),
  decline: (ref: string) => set(s => log({ ...s, enq: s.enq.map(e => e.ref === ref ? { ...e, stage: "Lost", tentative: false } : e), slots: s.slots.map(x => x.ref === ref && x.status === "hold" ? { date: x.date, day: x.day, time: x.time, status: "open" } : x) }, `${ref} declined`, "Bookings")),
  alternative: (ref: string) => set(s => { const e = s.enq.find(x => x.ref === ref)!; const n = nextOpenSlot(s, e.date); if (!n) return s;
    return log({ ...s, enq: s.enq.map(x => x.ref === ref ? { ...x, date: n.date, slot: n.time, next: `Alternative offered: ${n.date} ${n.time}`, last: "Just now" } : x) }, `${ref}: alternative session ${n.date} ${n.time} proposed (draft, needs approval)`, "Bookings"); }),
  convert: (ref: string): string => {
    const e = state.enq.find(x => x.ref === ref)!;
    if (e.value == null) return "Programme concept cannot be converted: it is unpriced and not bookable.";
    const slot = state.slots.find(x => x.date === e.date && x.time === (e.slot ?? "12:30"));
    if (!slot) return `${e.date} is outside standard availability (Mon, Tue, Thu, Fri). Propose an alternative.`;
    if (slot.status === "booked" || (slot.status === "hold" && slot.ref !== ref)) return `Conflict: ${e.date} ${slot.time} is ${slot.status === "hold" ? "held for " + slot.ref : "already booked"}. Propose an alternative.`;
    const n = 1047 + state.book.filter(b => b.ref > "B-1046" && b.ref < "B-2000").length, bref = "B-" + n;
    set(s => log({ ...s,
      enq: s.enq.map(x => x.ref === ref ? { ...x, stage: "Confirmed", bookingRef: bref, tentative: false } : x),
      book: [...s.book, { ref: bref, client: e.who, date: e.date, time: slot.time, exp: e.exp, guests: e.guests, value: e.value!, host: "Patrick Parsons", team: "Tina Ramirez, Mary Kinsella", status: "Confirmed" }],
      slots: s.slots.map(x => x === slot ? { ...x, status: "booked", ref: bref } : x), prep: { ...s.prep, [bref]: prep0(0) } },
      `${ref} converted to booking ${bref}: ${eur(e.value!)}. Prep checklist created.`, "Bookings"));
    return `Booking ${bref} confirmed. Capacity, revenue and prep updated.`;
  },
  prep: (ref: string, i: number) => set(s => ({ ...s, prep: { ...s.prep, [ref]: s.prep[ref].map((v, j) => j === i ? !v : v) } })),
  approveContent: (id: string) => set(s => log({ ...s, content: s.content.map(c => c.id === id ? { ...c, approved: true, status: "Approved" } : c) }, "Content approved (not published; no external posting)", "Marketing")),
  task: (id: string) => set(s => ({ ...s, tasksDone: { ...s.tasksDone, [id]: !s.tasksDone[id] } })),
  log: (text: string, kind: string) => set(s => log(s, text, kind))
};

export const getSpirit = () => state;
export const subscribeSpirit = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
