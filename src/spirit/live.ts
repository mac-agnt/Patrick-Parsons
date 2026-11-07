import { eur, getSpirit, metrics } from "./store";

/* Overwrites the seeded KPI_DEFS and ASPECT_DEFS entries in place from the live store,
   so Home, the KPI band and Dashboard follow Sales/Bookings changes. */
export function applyLive(KPI: Record<string, any>, ASP: any[]) {
  const s = getSpirit(), m = metrics(s);
  const booked = s.book.filter(b => b.status === "Confirmed");
  const dates = [...new Set(s.slots.map(x => x.date))];
  const byDate = dates.map(d => [d, booked.filter(b => b.date === d).reduce((a, b) => a + b.value, 0)] as const);
  const k = (v: number) => (v === 0 ? "€0" : "€" + (v / 1000).toFixed(1) + "k");
  const prepDone = booked.reduce((a, b) => a + (s.prep[b.ref] ?? []).filter(Boolean).length, 0), prepAll = booked.length * 10;
  const agentN = s.enq.filter(e => e.source === "Travel agent").length;
  const stageN = (...st: string[]) => s.enq.filter(e => st.includes(e.stage)).length;
  const pct = (n: number, d: number) => (d ? Math.round(n / d * 100) + "%" : "0%");

  Object.assign(KPI.revenue, { value: eur(m.value), delta: `${m.bookings} bookings` });
  Object.assign(KPI.cash, { value: String(m.guests), delta: `${m.bookings} groups` });
  Object.assign(KPI.overdue, { value: `${m.unfilled} of ${m.slots}`, delta: m.util.toFixed(1) + "% used" });
  Object.assign(KPI.margin, { value: m.rate.toFixed(1) + "%", delta: `${m.conv} of ${m.total}` });
  Object.assign(KPI.jobs, { value: String(m.openCount), delta: eur(m.pipeline) });
  Object.assign(KPI.nps, { value: `${m.total - agentN} of ${m.total}`, delta: `agents ${agentN}` });
  Object.assign(KPI.pipeline, { value: eur(m.pipeline), delta: `${s.enq.filter(e => !["Confirmed", "Lost"].includes(e.stage) && e.value != null).length} priced` });
  Object.assign(KPI.utilisation, { value: pct(prepDone, prepAll), delta: `${prepDone}/${prepAll} items` });

  const set = (id: string, patch: any) => Object.assign(ASP.find(a => a.id === id) ?? {}, patch);
  const met = (a: any, i: number, v: string, d: string) => { a.metrics[i][1] = v; a.metrics[i][2] = d; };
  const ex = ASP.find(a => a.id === "executive");
  set("executive", {
    chart: byDate.map(([d, v]) => [d, v, k(v)]),
    split: [["Confirmed", String(m.filled), m.util.toFixed(1) + "%", 1], ["Unfilled", String(m.unfilled), (100 - m.util).toFixed(1) + "%", 0]],
    table: booked.map(b => [b.ref, b.client, b.date, eur(b.value)])
  });
  met(ex, 0, eur(m.value), `${m.bookings} bookings`); met(ex, 1, eur(m.pipeline), `${m.openCount} open`);
  met(ex, 2, String(m.guests), `${m.bookings} groups`); met(ex, 3, m.util.toFixed(1) + "%", `${m.filled} of ${m.slots}`);

  const sa = ASP.find(a => a.id === "sales");
  const src = ["Travel agent", "Organic / direct", "Referral", "Social"];
  set("sales", {
    funnel: [["Enquiries", String(m.total), "30 days", m.total], ["Beyond first contact", String(m.total - stageN("New Enquiry")), pct(m.total - stageN("New Enquiry"), m.total), m.total - stageN("New Enquiry")],
      ["Proposal sent or later", String(stageN("Proposal Sent", "Awaiting Decision", "Confirmed")), "", stageN("Proposal Sent", "Awaiting Decision", "Confirmed")], ["Confirmed", String(m.conv), m.rate.toFixed(1) + "% of enquiries", m.conv]],
    chart: [["Agents", agentN, String(agentN)], ["Organic", s.enq.filter(e => e.source === "Organic / direct").length, ""], ["Referral", s.enq.filter(e => e.source === "Referral").length, ""], ["Social", s.enq.filter(e => e.source === "Social").length, ""]]
      .map(r => [r[0], r[1], String(r[1])]),
    split: [["Direct channels", String(m.total - agentN), pct(m.total - agentN, m.total), 1], ["Travel agents", String(agentN), pct(agentN, m.total), 0]],
    table: src.map(x => [x, String(s.enq.filter(e => e.source === x).length), String(s.enq.filter(e => e.source === x && e.stage === "Confirmed").length), String(s.enq.filter(e => e.source === x && e.stage === "Lost").length)])
  });
  met(sa, 0, String(m.total), "30 days"); met(sa, 1, String(m.openCount), eur(m.pipeline)); met(sa, 2, m.rate.toFixed(1) + "%", `${m.conv} of ${m.total}`); met(sa, 3, String(m.lost), "closed");

  const oc = ASP.find(a => a.id === "occupancy");
  set("occupancy", {
    stacked: dates.map(d => { const sl = s.slots.filter(x => x.date === d); const b = sl.filter(x => x.status === "booked").length; return [d, [b, sl.length - b]]; }),
    split: [["Afternoon Tea", String(booked.filter(b => b.exp === "Afternoon Tea").length), "", 1], ["Whiskey Tasting", String(booked.filter(b => b.exp === "Whiskey Tasting").length), "", 0]],
    table: s.slots.filter(x => x.status !== "booked").slice(0, 6).map(x => [`${x.day} ${x.date}`, x.time, x.status === "hold" ? `Hold ${x.ref}` : "Open"])
  });
  met(oc, 1, String(m.filled), "slots"); met(oc, 2, String(m.unfilled), "slots"); met(oc, 3, m.util.toFixed(1) + "%", `${m.filled} of ${m.slots}`);

  const rv = ASP.find(a => a.id === "revenue");
  let run = 0;
  const cum = byDate.filter(([, v]) => v > 0).map(([d, v]) => { run += v; return [d, run, k(run)]; });
  const teaN = booked.filter(b => b.exp === "Afternoon Tea").reduce((a, b) => a + b.guests, 0), whN = booked.filter(b => b.exp === "Whiskey Tasting").reduce((a, b) => a + b.guests, 0);
  set("revenue", {
    chart: cum,
    split: [["Afternoon Tea", eur(m.tea), pct(m.tea, m.value), 1], ["Whiskey Tasting", eur(m.wh), pct(m.wh, m.value), 0]],
    table: [["Confirmed", String(m.bookings), eur(m.value), "Booked"], ["Plus priced pipeline", String(m.bookings + s.enq.filter(e => !["Confirmed", "Lost"].includes(e.stage) && e.value != null).length), eur(m.value + m.pipeline), "Hypothetical"], ["Fill every open slot at average", String(m.bookings + m.unfilled), "about " + eur(Math.round(m.value / Math.max(1, m.bookings) * (m.bookings + m.unfilled) / 1000) * 1000), "Projection"]]
  });
  met(rv, 0, eur(m.tea), `${teaN} guests`); met(rv, 1, eur(m.wh), `${whN} guests`); met(rv, 2, eur(Math.round(m.value / Math.max(1, m.bookings))), "per booking"); met(rv, 3, eur(m.pipeline), `${m.openCount} open`);

  const gu = ASP.find(a => a.id === "guest");
  set("guest", {
    rows: booked.map(b => { const n = (s.prep[b.ref] ?? []).filter(Boolean).length; return [`${b.ref} ${b.client}`, `${n} of 10`, n * 10]; }),
    chart: booked.map(b => [b.ref, (s.prep[b.ref] ?? []).filter(Boolean).length, String((s.prep[b.ref] ?? []).filter(Boolean).length)])
  });
  met(gu, 0, `${prepDone} of ${prepAll}`, "items");
}
