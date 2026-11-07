import { useState, type CSSProperties, type ReactNode } from "react";
import { STAGES, PREP_ITEMS, act, conflicts, eur, metrics, nextOpenSlot, useSpirit, type Enquiry, type Stage } from "../../spirit/store";

export const MODULES: Record<string, string[]> = {
  Sales: ["Overview", "Pipeline", "Enquiries", "Partners", "Guests"],
  Bookings: ["Calendar", "Upcoming", "Requests", "Capacity", "Conflicts"],
  Experiences: ["Catalogue", "Packages", "Itineraries", "Student Programmes"],
  Operations: ["Today", "Event Prep", "Team", "Service Standards"],
  Marketing: ["Overview", "Campaigns", "Content Studio", "SEO & GEO", "Market Segments", "Attribution"]
};

const card: CSSProperties = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-md,16px)", padding: 16, backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 var(--glass-highlight)" };
const CSS = `.sob-t tbody tr{transition:background .15s}.sob-t tbody tr:hover{background:var(--accent-faint)}.sob-b{transition:transform .15s var(--ease),border-color .15s,background .15s}.sob-b:hover:not(:disabled){border-color:var(--accent-line);transform:translateY(-1px)}.sob-k{transition:border-color .2s}.sob-k:hover{border-color:var(--accent-line)}
@media(max-width:700px){.sob-split{grid-template-columns:1fr !important}}`;
const th: CSSProperties = { textAlign: "left", fontSize: 10.5, letterSpacing: ".08em", color: "var(--dim)", fontWeight: 500, padding: "7px 10px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" };
const td: CSSProperties = { padding: "9px 10px", borderBottom: "1px solid var(--border)", fontSize: 12.5, color: "var(--body)", verticalAlign: "top" };

const Card = ({ title, children, style, right }: { title?: string; children: ReactNode; style?: CSSProperties; right?: ReactNode }) => (
  <div style={{ ...card, ...style }}>
    {title && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 2, borderRadius: 2, background: "linear-gradient(90deg,#D8B46B,transparent)" }} />{title}</div>{right}</div>}
    {children}
  </div>
);
const Btn = ({ children, onClick, primary, disabled }: { children: ReactNode; onClick?: () => void; primary?: boolean; disabled?: boolean }) => (
  <button className="sob-b" disabled={disabled} onClick={onClick} style={{ height: 28, padding: "0 12px", borderRadius: 999, cursor: disabled ? "default" : "pointer", fontSize: 12, whiteSpace: "nowrap", opacity: disabled ? .4 : 1,
    border: primary ? "none" : "1px solid var(--border-strong)", background: primary ? "var(--accent)" : "var(--surface-2)", color: primary ? "var(--on-accent)" : "var(--body)" }}>{children}</button>
);
const Pill = ({ children, tone }: { children: ReactNode; tone?: "ok" | "warn" | "bad" | "dim" }) => {
  const c = tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : tone === "bad" ? "var(--bad)" : "var(--dim)";
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, fontSize: 11, border: `1px solid color-mix(in srgb, ${c} 45%, transparent)`, background: `color-mix(in srgb, ${c} 12%, transparent)`, color: c, whiteSpace: "nowrap" }}>{children}</span>;
};
const Kpi = ({ label, value, hint, accent }: { label: string; value: string; hint?: string; accent?: boolean }) => (
  <div className="sob-k" style={{ ...card, padding: "14px 16px", background: accent ? "linear-gradient(160deg,rgba(168,40,58,.42),var(--surface) 72%)" : "linear-gradient(160deg,rgba(216,180,107,.07),var(--surface) 60%)", boxShadow: accent ? "inset 0 1px 0 rgba(216,180,107,.35),0 10px 28px rgba(141,16,33,.18)" : "inset 0 1px 0 rgba(255,235,205,.05)" }}>
    <div style={{ fontSize: 11, letterSpacing: ".06em", color: "var(--dim)", textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-.8px", color: "var(--ink)", marginTop: 4, lineHeight: 1.1 }}>{value}</div>
    {hint && <div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 5 }}>{hint}</div>}
  </div>
);
const Grid = ({ n, children, gap = 12 }: { n: number; children: ReactNode; gap?: number }) => (
  <div style={{ display: "grid", gridTemplateColumns: n >= 5 ? "repeat(auto-fit,minmax(92px,1fr))" : `repeat(auto-fit,minmax(${n === 3 ? 240 : 300}px,1fr))`, gap }}>{children}</div>
);
const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div style={{ overflowX: "auto" }}><table className="sob-t" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead><tr>{head.map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={td}>{c}</td>)}</tr>)}</tbody></table></div>
);
const Bar = ({ pct, color = "var(--accent)" }: { pct: number; color?: string }) => (
  <div style={{ height: 6, background: "var(--track)", borderRadius: 4 }}><div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: color, borderRadius: 4 }} /></div>
);
const Row = ({ label, value, pct }: { label: string; value: string; pct: number }) => (
  <div style={{ marginBottom: 9 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}><span>{label}</span><span style={{ color: "var(--ink)" }}>{value}</span></div><Bar pct={pct} /></div>
);
const Toast = ({ msg }: { msg: string }) => msg ? <div style={{ ...card, borderColor: "var(--accent-line)", color: "var(--ink)", fontSize: 12.5 }}>{msg}</div> : null;

const PALETTE = ["#D8B46B", "#c0405a", "#f0a24a", "#62dba0", "#8a7f97"];
const Donut = ({ data, centre, sub }: { data: [string, number][]; centre: string; sub: string }) => {
  const tot = data.reduce((a, d) => a + d[1], 0) || 1, R = 46, C = 2 * Math.PI * R; let off = 0;
  return (<div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
    <svg width="124" height="124" viewBox="0 0 124 124" style={{ flex: "none" }}>
      <circle cx="62" cy="62" r={R} fill="none" stroke="var(--track)" strokeWidth="13" />
      {data.map((d, i) => { const len = d[1] / tot * C, el = <circle key={d[0]} cx="62" cy="62" r={R} fill="none" stroke={PALETTE[i % PALETTE.length]} strokeWidth="13" strokeDasharray={`${Math.max(0, len - 2)} ${C}`} strokeDashoffset={-off} transform="rotate(-90 62 62)" style={{ transition: "stroke-dasharray .5s var(--ease)" }} />; off += len; return el; })}
      <text x="62" y="60" textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--ink)">{centre}</text>
      <text x="62" y="76" textAnchor="middle" fontSize="9.5" fill="var(--dim)">{sub}</text></svg>
    <div style={{ flex: 1, minWidth: 140, display: "grid", gap: 7 }}>{data.map((d, i) => (
      <div key={d[0]} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: PALETTE[i % PALETTE.length], flex: "none" }} /><span style={{ flex: 1, color: "var(--body)" }}>{d[0]}</span><b style={{ color: "var(--ink)" }}>{d[1]}</b><span style={{ color: "var(--faint)", width: 34, textAlign: "right" }}>{Math.round(d[1] / tot * 100)}%</span></div>))}</div></div>);
};
const Columns = ({ data, fmt = String, height = 110 }: { data: [string, number, string?][]; fmt?: (n: number) => string; height?: number }) => {
  const max = Math.max(1, ...data.map(d => d[1]));
  return (<div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: height + 52 }}>
    {data.map((d, i) => { const c = d[2] ?? PALETTE[i % PALETTE.length]; return (
      <div key={d[0]} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 5, height: "100%" }}>
        <span style={{ fontSize: 11, color: "var(--ink)" }}>{fmt(d[1])}</span>
        <div style={{ width: "100%", maxWidth: 48, height: Math.max(3, d[1] / max * height), borderRadius: "8px 8px 3px 3px", background: `linear-gradient(180deg,${c},color-mix(in srgb,${c} 30%,transparent))`, transition: "height .5s var(--ease)" }} />
        <span style={{ fontSize: 9.5, color: "var(--dim)", textAlign: "center", lineHeight: 1.2, maxWidth: "100%" }}>{d[0]}</span></div>); })}</div>);
};
const Gauge = ({ pct, label, sub }: { pct: number; label: string; sub: string }) => {
  const R = 50, C = 2 * Math.PI * R, p = Math.max(0, Math.min(100, pct)), c = p >= 80 ? "var(--ok)" : p >= 50 ? "var(--accent)" : "var(--warn)";
  return (<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <svg width="124" height="124" viewBox="0 0 124 124" style={{ flex: "none" }}>
      <circle cx="62" cy="62" r={R} fill="none" stroke="var(--track)" strokeWidth="11" />
      <circle cx="62" cy="62" r={R} fill="none" stroke={c} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${p / 100 * C} ${C}`} transform="rotate(-90 62 62)" style={{ transition: "stroke-dasharray .6s var(--ease)", filter: "drop-shadow(0 0 6px rgba(216,180,107,.35))" }} />
      <text x="62" y="68" textAnchor="middle" fontSize="24" fontWeight="600" fill="var(--ink)">{Math.round(p)}%</text></svg>
    <div><div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{label}</div><div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 3, lineHeight: 1.5 }}>{sub}</div></div></div>);
};
const Funnel = ({ rows }: { rows: { label: string; n: number; right: string; color: string }[] }) => {
  const max = Math.max(1, ...rows.map(r => r.n));
  return (<div style={{ display: "grid", gap: 7 }}>{rows.map(r => (
    <div key={r.label} style={{ display: "grid", gridTemplateColumns: "104px minmax(0,1fr) 84px", alignItems: "center", gap: 10, fontSize: 12 }}>
      <span style={{ color: "var(--body)" }}>{r.label}</span>
      <div style={{ height: 22, background: "var(--track)", borderRadius: 7, overflow: "hidden" }}><div style={{ width: `${Math.max(r.n ? 8 : 0, r.n / max * 100)}%`, height: "100%", borderRadius: 7, background: `linear-gradient(90deg,color-mix(in srgb,${r.color} 55%,transparent),${r.color})`, display: "flex", alignItems: "center", paddingLeft: 8, color: "#140a0d", fontWeight: 600, fontSize: 11, transition: "width .5s var(--ease)" }}>{r.n || ""}</div></div>
      <span style={{ textAlign: "right", color: "var(--ink)" }}>{r.right}</span></div>))}</div>);
};
const OWNERS = ["Patrick Parsons", "Sales & Partnerships Coordinator (mock role)"];
const stageTone = (s: Stage) => s === "Confirmed" ? "ok" : s === "Lost" ? "bad" : s === "New Enquiry" ? "dim" : "warn";
const initials = (n: string) => n.split(/\s+/).filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0]).join("").toUpperCase();
const Avatar = ({ name, size = 30 }: { name: string; size?: number }) => (
  <span style={{ width: size, height: size, borderRadius: "50%", flex: "none", display: "inline-grid", placeItems: "center", fontSize: size * .36, fontWeight: 600, color: "var(--ink)", background: "linear-gradient(150deg,rgba(141,16,33,.55),var(--surface-2))", border: "1px solid var(--accent-line)" }}>{initials(name)}</span>
);
const stageColor = (s: Stage) => s === "Confirmed" ? "var(--ok)" : s === "Lost" ? "var(--bad)" : s === "New Enquiry" ? "var(--dim)" : "var(--accent)";

function SalesPage({ tab, go }: { tab: string; go: (t: string) => void }) {
  const s = useSpirit(), m = metrics(s);
  const [sel, setSel] = useState("E-2014"), [mkt, setMkt] = useState("All"), [msg, setMsg] = useState(""), [draft, setDraft] = useState("");
  const src = ["Travel agent", "Organic / direct", "Referral", "Social"].map(k => [k, s.enq.filter(e => e.source === k).length] as const);
  if (tab === "Overview") return (<>
    <Grid n={5}><Kpi label="New enquiries (30d)" value={String(m.total)} hint="All synthetic" /><Kpi label="Open opportunities" value={String(m.openCount)} />
      <Kpi label="Priced pipeline" value={eur(m.pipeline)} hint="Unpriced concept excluded" accent /><Kpi label="Enquiry to booking" value={m.rate.toFixed(1) + "%"} hint={`${m.conv} of ${m.total}`} />
      <Kpi label="Quotes awaiting reply" value={String(s.enq.filter(e => e.quote && e.stage !== "Confirmed" && e.stage !== "Lost").length)} /></Grid>
    <Grid n={2}>
      <Card title="Lead sources"><Donut data={src.map(([k, n]) => [k, n] as [string, number])} centre={String(m.total)} sub="enquiries" /><div style={{ fontSize: 11, color: "var(--faint)", marginTop: 10 }}>Agent-driven {src[0][1]} of {m.total}. Direct channels {m.total - src[0][1]}.</div></Card>
      <Card title="High-priority follow-ups">{s.enq.filter(e => ["E-2014", "E-2011", "E-2012", "E-2015"].includes(e.ref) && e.stage !== "Confirmed").map(e => (
        <div key={e.ref} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 12.5 }}>
          <span><b style={{ color: "var(--ink)" }}>{e.who}</b><br /><span style={{ color: "var(--dim)" }}>{e.next}</span></span><Btn onClick={() => { setSel(e.ref); go("Enquiries"); }}>Open</Btn></div>))}</Card>
    </Grid>
    <Grid n={2}>
      <Card title="Pipeline by stage"><Funnel rows={STAGES.map(st => { const it = s.enq.filter(e => e.stage === st); return { label: st, n: it.length, right: eur(it.reduce((a, e) => a + (e.value ?? 0), 0)), color: stageColor(st) === "var(--dim)" ? "#8a7f97" : stageColor(st) }; })} /></Card>
      <Card title="Value by stage"><Columns data={STAGES.slice(0, 5).map(st => [st, s.enq.filter(e => e.stage === st).reduce((a, e) => a + (e.value ?? 0), 0), st === "Confirmed" ? "#62dba0" : st === "New Enquiry" ? "#8a7f97" : "#D8B46B"] as [string, number, string])} fmt={n => n ? "€" + (n / 1000).toFixed(1) + "k" : "€0"} /></Card></Grid>
    <Card title="Latest activity">{s.act.slice(0, 6).map((a, i) => <div key={i} style={{ fontSize: 12.5, padding: "6px 0", borderBottom: "1px solid var(--border)", display: "flex", gap: 12 }}><span style={{ color: "var(--faint)", minWidth: 70 }}>{a.t}</span><span style={{ flex: 1 }}>{a.text}</span><Pill>{a.kind}</Pill></div>)}</Card>
  </>);
  if (tab === "Pipeline") {
    const open = s.enq.filter(e => !["Confirmed", "Lost"].includes(e.stage));
    return (<>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 12, color: "var(--dim)" }}>
        <span><b style={{ color: "var(--ink)" }}>{open.length}</b> open</span>
        <span><b style={{ color: "var(--ink)" }}>{eur(m.pipeline)}</b> priced pipeline</span>
        <span><b style={{ color: "var(--ink)" }}>{eur(m.value)}</b> confirmed</span>
        <span>Advance moves a card one stage. Converting an enquiry on the Enquiries tab creates the booking.</span></div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${STAGES.length},minmax(215px,1fr))`, gap: 10, overflowX: "auto", paddingBottom: 6, alignItems: "start" }}>
        {STAGES.map((st, si) => { const items = s.enq.filter(e => e.stage === st), val = items.reduce((a, e) => a + (e.value ?? 0), 0); return (
          <div key={st} style={{ ...card, padding: 0, background: "var(--surface-faint)", overflow: "hidden", minWidth: 0 }}>
            <div style={{ height: 3, background: stageColor(st) }} />
            <div style={{ padding: "10px 12px 6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600 }}>{st}</span>
                <span style={{ fontSize: 11, color: "var(--dim)", padding: "1px 8px", borderRadius: 999, background: "var(--track)" }}>{items.length}</span></div>
              <div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 3 }}>{val ? eur(val) : "No priced value"}</div></div>
            <div style={{ padding: "4px 8px 10px", display: "grid", gap: 8 }}>
              {items.map(e => (<div key={e.ref} className="sob-k" style={{ ...card, padding: "11px 12px", fontSize: 11.5, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={e.who} size={26} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "var(--ink)", fontWeight: 500, fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.who}</div>
                    <div style={{ color: "var(--faint)", fontSize: 10.5 }}>{e.ref} · {e.source}</div></div></div>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-.4px", margin: "10px 0 6px", color: e.value != null ? "var(--ink)" : "var(--dim)" }}>{e.value != null ? eur(e.value) : "Unpriced"}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}><Pill>{e.market}</Pill><Pill>{e.guests} guests</Pill><Pill>{e.exp}</Pill></div>
                <div style={{ color: "var(--body)" }}>{e.date}{e.slot ? " · " + e.slot : ""}</div>
                <div style={{ color: "var(--warn)", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border)" }}>Next: {e.next}</div>
                <div style={{ color: "var(--faint)", marginTop: 3 }}>Last: {e.last} · {e.owner.includes("Patrick") ? "Patrick" : "Coordinator"}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" }}>
                  {si < 4 && <Btn primary onClick={() => act.stage(e.ref, STAGES[si + 1])}>Advance</Btn>}
                  <Btn onClick={() => { setSel(e.ref); go("Enquiries"); }}>Open</Btn></div>
              </div>))}
              {!items.length && <div style={{ fontSize: 11.5, color: "var(--faint)", padding: "10px 4px", textAlign: "center" }}>Nothing here</div>}
            </div>
          </div>); })}
      </div></>);
  }
  if (tab === "Enquiries") {
    const list = s.enq.filter(e => mkt === "All" || e.market === mkt), e = s.enq.find(x => x.ref === sel) as Enquiry;
    const cur = STAGES.indexOf(e.stage), lost = e.stage === "Lost";
    const facts: [string, ReactNode][] = [["Experience", e.exp], ["Guests", String(e.guests)], ["Value", e.value != null ? eur(e.value) : "Unpriced"],
      ["Preferred date", e.date + (e.slot ? " " + e.slot + " (tentative)" : "")], ["Language", e.lang], ["Dietary", e.diet], ["Source", e.source], ["Last contact", e.last], ["Quote", e.quote ?? "None yet"]];
    return (<div className="sob-split" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)", gap: 12, alignItems: "start" }}>
      <Card style={{ minWidth: 0 }} title="Enquiries" right={<div style={{ display: "flex", gap: 5 }}>{["All", "Ireland", "US", "China"].map(k => <Btn key={k} primary={mkt === k} onClick={() => setMkt(k)}>{k}</Btn>)}</div>}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 6, maxHeight: 520, overflowY: "auto", paddingRight: 4 }}>
          {list.map(x => { const on = x.ref === sel; return (
            <div key={x.ref} className="sob-k" onClick={() => { setSel(x.ref); setMsg(""); setDraft(""); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 14, cursor: "pointer", border: "1px solid " + (on ? "var(--accent-line)" : "var(--border)"), background: on ? "var(--accent-faint)" : "transparent" }}>
              <Avatar name={x.who} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "var(--ink)", fontSize: 12.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.who}</div>
                <div style={{ fontSize: 11, color: "var(--dim)" }}>{x.ref} · {x.market} · {x.guests} guests</div></div>
              <div style={{ textAlign: "right", display: "grid", gap: 4, justifyItems: "end" }}>
                <span style={{ fontSize: 12.5, color: x.value != null ? "var(--ink)" : "var(--dim)" }}>{x.value != null ? eur(x.value) : "Unpriced"}</span>
                <Pill tone={stageTone(x.stage)}>{x.stage}</Pill></div>
            </div>); })}
          {!list.length && <div style={{ color: "var(--dim)", fontSize: 12.5 }}>No enquiries in this market.</div>}
        </div></Card>
      <Card style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={e.who} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, color: "var(--ink)", fontWeight: 600, letterSpacing: "-.3px" }}>{e.who}</div>
            <div style={{ fontSize: 11.5, color: "var(--dim)" }}>{e.ref} · {e.market}</div></div>
          <Pill tone={stageTone(e.stage)}>{e.stage}</Pill></div>
        <div style={{ display: "flex", alignItems: "center", margin: "16px 2px 4px" }}>
          {STAGES.slice(0, 5).map((st, i) => { const done = !lost && i <= cur; return (
            <div key={st} title={st} style={{ display: "flex", alignItems: "center", flex: i < 4 ? 1 : "none" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", flex: "none", background: done ? "var(--accent)" : "var(--track)", boxShadow: i === cur && !lost ? "0 0 0 4px var(--accent-faint)" : "none" }} />
              {i < 4 && <span style={{ flex: 1, height: 2, background: !lost && i < cur ? "var(--accent)" : "var(--track)" }} />}</div>); })}</div>
        <div style={{ fontSize: 10.5, color: "var(--faint)", marginBottom: 12 }}>{lost ? "Closed as lost" : `Stage ${cur + 1} of 5`}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "10px 16px", padding: "12px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          {facts.map(([k, v]) => (<div key={k}><div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)" }}>{k}</div><div style={{ fontSize: 12.5, color: "var(--ink)", marginTop: 2 }}>{v}</div></div>))}</div>
        <div style={{ margin: "12px 0", padding: "10px 12px", borderRadius: 12, background: "var(--accent-faint)", border: "1px solid var(--accent-line)", fontSize: 12.5, color: "var(--ink)" }}>
          <span style={{ color: "var(--dim)" }}>Next step · </span>{e.next}<div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 3 }}>Owner: {e.owner}</div></div>
        {e.notes && <div style={{ fontSize: 12, color: "var(--body)", marginBottom: 12, lineHeight: 1.6 }}><span style={{ color: "var(--dim)" }}>Notes · </span>{e.notes}</div>}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <select value={e.owner} onChange={ev => act.owner(e.ref, ev.target.value)} style={{ height: 28, borderRadius: 999, background: "var(--surface-2)", color: "var(--body)", border: "1px solid var(--border-strong)", padding: "0 8px" }}>{OWNERS.map(o => <option key={o}>{o}</option>)}</select>
          <Btn onClick={() => { act.quote(e.ref); setMsg(e.value == null ? "Unpriced: no quote can be created." : "Draft quote created. Not sent; needs your approval."); }}>Create Quote</Btn>
          <Btn onClick={() => setDraft(`Draft follow-up to ${e.who} (draft only, requires approval):\n\n${e.lang.includes("Mandarin") ? "尊敬的客人，感谢您对 Spirit of Birr 的关注。(Mandarin version for bilingual review)\n\n" : ""}Dear ${e.who.split(" ")[0]}, thank you for your interest in a private ${e.exp.toLowerCase()} at Birr Castle for ${e.guests} guests. Patrick would be glad to host you. Could you confirm dates and any dietary needs?`)}>Preview AI follow-up</Btn>
          <Btn primary disabled={e.stage === "Confirmed" || e.stage === "Lost"} onClick={() => setMsg(act.convert(e.ref))}>Convert to booking</Btn></div>
        {msg && <div style={{ marginTop: 10 }}><Toast msg={msg} /></div>}
        {draft && <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.6, color: "var(--body)", fontFamily: "inherit", margin: "10px 0 0", padding: "10px 12px", borderRadius: 12, background: "var(--surface-faint)", border: "1px dashed var(--border-strong)" }}>{draft}</pre>}
        <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 12 }}>Proposed itinerary: 12:30 arrival and welcome, 12:45 heritage introduction, 13:15 private {e.exp.toLowerCase()}, 14:30 concludes (example only).</div>
      </Card></div>);
  }
  if (tab === "Partners") {
    const P = [["Boston Heritage Travel", "Luxury travel agent", 1, 2340, "E-2014 proposal sent"], ["Pacific Heritage Travel", "Luxury travel agent", 1, 1520, "B-1046 confirmed"], ["Harper Ireland Journey", "Luxury travel agent", 1, 2340, "B-1044 confirmed"],
      ["Celtic Luxury Tours", "Destination management", 1, 1520, "E-2018 qualified"], ["Ashford Travel Group", "Destination management", 1, 1560, "B-1035 completed"], ["Avery Brooks Travel", "Travel planner", 1, 2080, "E-2011 awaiting decision"]];
    return (<Card title="Partners (commission terms configurable, none verified)"><Table head={["Partner", "Type", "Referrals", "Booking value", "Latest", "Commission"]} rows={P.map(p => [p[0], p[1], p[2], eur(p[3] as number), p[4], "Configurable"])} /></Card>);
  }
  const G = [["Sarah Mitchell", "US", "B-1041", "Referral", "Prefers morning tea"], ["Chen Family", "China", "B-1043", "Referral", "Mandarin welcome; 2 dietary"], ["Ashford Travel Group", "US", "B-1035", "Travel agent", "Referral invite drafted"],
    ["Dublin Cultural Society", "Ireland", "B-1045", "Direct", "Whiskey interest"], ["Li Wei", "China", "E-2012 (open)", "Referral", "Mandarin communication"]];
  return <Card title="Guest CRM (role-based access applies)"><Table head={["Guest", "Market", "Bookings", "Source", "Preferences"]} rows={G} /></Card>;
}

function BookingsPage({ tab }: { tab: string }) {
  const s = useSpirit(), m = metrics(s), [msg, setMsg] = useState(""), [view, setView] = useState("Week");
  const cf = conflicts(s), reqs = s.enq.filter(e => e.slot && !["Confirmed", "Lost"].includes(e.stage));
  if (tab === "Calendar") return (<>
    <Card title="Mon 9 Nov to Fri 20 Nov (sessions 12:30 and 15:00)" right={<div style={{ display: "flex", gap: 5 }}>{["Day", "Week", "Month"].map(k => <Btn key={k} primary={view === k} onClick={() => setView(k)}>{k}</Btn>)}</div>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8 }}>
        {[...new Set(s.slots.map(x => x.date))].slice(0, view === "Day" ? 1 : 8).map(d => (<div key={d} style={{ ...card, padding: 8, background: "var(--surface-faint)" }}>
          <div style={{ fontSize: 12, color: "var(--ink)", marginBottom: 6 }}>{s.slots.find(x => x.date === d)!.day} {d}</div>
          {s.slots.filter(x => x.date === d).map(x => { const b = s.book.find(y => y.ref === x.ref);
            const hot = x.status === "open" && cf.some(([k]) => k === d + " " + x.time);
            return <div key={x.time} style={{ fontSize: 11.5, padding: 6, marginBottom: 5, borderRadius: 10, border: "1px solid " + (x.status === "booked" ? "var(--accent-line)" : hot ? "var(--warn)" : "var(--border)"), background: x.status === "booked" ? "var(--accent-faint)" : "none" }}>
              <b style={{ color: "var(--ink)" }}>{x.time}</b> {x.status === "booked" && b ? <>{b.client}<br /><span style={{ color: "var(--dim)" }}>{b.guests} guests · {b.exp}</span></> : x.status === "hold" ? <Pill tone="warn">Hold {x.ref}</Pill> : hot ? <Pill tone="warn">Contested</Pill> : <span style={{ color: "var(--faint)" }}>Open</span>}</div>; })}
        </div>))}</div></Card>
    <div style={{ fontSize: 11, color: "var(--faint)" }}>Demo assumption: Mon, Tue, Thu, Fri. Not verified operating hours.</div></>);
  if (tab === "Upcoming") return <Card title="Confirmed events"><Table head={["Ref", "Date", "Time", "Client", "Experience", "Guests", "Value", "Host", "Team", "Readiness"]}
    rows={s.book.filter(b => b.status === "Confirmed").map(b => { const p = s.prep[b.ref] ?? []; const n = p.filter(Boolean).length;
      return [b.ref, b.date, b.time, b.client, b.exp, b.guests, eur(b.value), "Patrick Parsons", b.team, <Pill key="r" tone={n === 10 ? "ok" : n >= 6 ? "warn" : "bad"}>{n}/10</Pill>]; })} />
    <div style={{ marginTop: 8, fontSize: 12.5, color: "var(--ink)" }}>{m.bookings} bookings · {m.guests} guests · {eur(m.value)}</div></Card>;
  if (tab === "Requests") return (<><Toast msg={msg} /><Card title="Booking requests"><Table head={["Ref", "Prospect", "Experience", "Guests", "Value", "Requested", "Actions"]}
    rows={reqs.map(e => [e.ref, e.who, e.exp, e.guests, eur(e.value ?? 0), `${e.date} ${e.slot}`,
      <div key="a" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}><Btn onClick={() => setMsg(act.convert(e.ref))}>Approve / Convert</Btn><Btn onClick={() => { act.alternative(e.ref); setMsg(`Alternative proposed for ${e.ref}`); }}>Propose Alternative</Btn><Btn onClick={() => { act.hold(e.ref); setMsg(`Temporary hold placed for ${e.ref}`); }}>Hold</Btn><Btn onClick={() => { act.decline(e.ref); setMsg(`${e.ref} declined`); }}>Decline</Btn></div>])} />
    {!reqs.length && <div style={{ color: "var(--dim)", fontSize: 12.5 }}>No pending slot requests.</div>}</Card></>);
  if (tab === "Capacity") return (<>
    <Grid n={5}><Kpi label="Bookable slots" value={String(m.slots)} hint="9 to 20 Nov" /><Kpi label="Confirmed" value={String(m.filled)} /><Kpi label="Unfilled" value={String(m.unfilled)} />
      <Kpi label="Utilisation" value={m.util.toFixed(1) + "%"} hint={`${m.filled}/${m.slots} slots`} /><Kpi label="Booking value" value={eur(m.value)} /></Grid>
    <Grid n={2}>
      <Card title="Bookings by experience"><Donut data={[["Afternoon Tea", s.book.filter(b => b.exp === "Afternoon Tea" && b.status === "Confirmed").length], ["Whiskey Tasting", s.book.filter(b => b.exp === "Whiskey Tasting" && b.status === "Confirmed").length]]} centre={String(m.bookings)} sub="bookings" /></Card>
      <Card title="Capacity used"><Gauge pct={m.util} label={`${m.filled} of ${m.slots} slots filled`} sub={`${m.unfilled} still open across 9 to 22 Nov. Booked value ${eur(m.value)}.`} /></Card></Grid>
    <Card title="Slots by day"><div style={{ display: "flex", gap: 8, alignItems: "flex-end", overflowX: "auto", paddingBottom: 4 }}>
      {[...new Set(s.slots.map(x => x.date))].map(d => (<div key={d} style={{ flex: "1 0 44px", display: "grid", gap: 4, justifyItems: "center" }}>
        {s.slots.filter(x => x.date === d).map(x => <div key={x.time} title={`${x.time} ${x.status}`} style={{ width: "100%", height: 26, borderRadius: 7, background: x.status === "booked" ? "linear-gradient(180deg,#D8B46B,#a8842f)" : x.status === "hold" ? "var(--warn)" : "var(--track)" }} />)}
        <span style={{ fontSize: 10, color: "var(--dim)" }}>{s.slots.find(x => x.date === d)!.day.slice(0, 3)} {d.split(" ")[0]}</span></div>))}</div>
      <div style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--dim)", marginTop: 8 }}><span>Gold: booked</span><span>Amber: hold</span><span>Grey: open</span></div></Card>
    <Card title="Forward gaps">{s.slots.filter(x => x.status === "open").map(x => <span key={x.date + x.time} style={{ display: "inline-block", margin: 3 }}><Pill>{x.day} {x.date} {x.time}</Pill></span>)}</Card></>);
  return (<Card title="Conflicts">{cf.length === 0 && <div style={{ color: "var(--ok)", fontSize: 13 }}>No slot conflicts. Nothing is double-booked.</div>}
    {cf.map(([k, v]) => (<div key={k} style={{ padding: 10, border: "1px solid var(--warn)", borderRadius: 12, marginBottom: 8 }}>
      <b style={{ color: "var(--warn)" }}>Two clients request {k}</b>
      {v.map(e => <div key={e.ref} style={{ fontSize: 12.5, margin: "4px 0" }}>{e.ref} {e.who}: {e.guests} {e.exp.toLowerCase()} guests, {eur(e.value ?? 0)} (tentative)</div>)}
      <div style={{ fontSize: 12, color: "var(--dim)" }}>Suggested alternative: {nextOpenSlot(s, "20 Nov")?.date} {nextOpenSlot(s, "20 Nov")?.time}. Fiona Greene's whiskey group (15:00 slot) is a better fit than the same 12:30 tea slot.</div>
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>{v.map(e => <Btn key={e.ref} onClick={() => act.alternative(e.ref)}>Move {e.ref} to alternative</Btn>)}<Btn primary onClick={() => act.hold(v[0].ref)}>Hold for {v[0].ref}</Btn></div></div>))}
    <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 6 }}>Other checks: 1 request outside standard availability (O'Rourke Family, date TBC) · B-1043 dietary confirmations outstanding · B-1045 whiskey expert not yet confirmed.</div></Card>);
}

const Label = ({ children }: { children: ReactNode }) => <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 3 }}>{children}</div>;
const Chips = ({ items, tone }: { items: string[]; tone?: "ok" | "warn" | "bad" | "dim" }) => <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{items.map(i => <Pill key={i} tone={tone}>{i}</Pill>)}</div>;

function ExperiencesPage({ tab }: { tab: string }) {
  const s = useSpirit();
  if (tab === "Catalogue") {
    const E = [{ key: "Afternoon Tea", name: "Luxury Afternoon Tea", price: "€130", note: "per guest (demo assumption)", about: "Private group hospitality hosted by a member of the Parsons family, premium food and service.", staff: ["Patrick Parsons", "Tina Ramirez", "Mary Kinsella"] },
      { key: "Whiskey Tasting", name: "Deluxe Whiskey & Canapé Tasting", price: "€80", note: "per guest", about: "Curated Irish whiskey, expert-led tasting, canapé pairings.", staff: ["Patrick Parsons", "John Callely", "Mary Kinsella"] }];
    return (<Grid n={2}>{E.map(p => { const bk = s.book.filter(b => b.exp === p.key && b.status === "Confirmed"); return (
      <Card key={p.name} style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, color: "var(--ink)", fontWeight: 600 }}>{p.name}</div>
        <div style={{ margin: "8px 0 4px", display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-1px", color: "var(--ink)" }}>{p.price}</span><span style={{ fontSize: 12, color: "var(--dim)" }}>{p.note}</span></div>
        <div style={{ fontSize: 12.5, lineHeight: 1.6, marginBottom: 12 }}>{p.about}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "12px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div><Label>Confirmed bookings</Label><div style={{ fontSize: 18, color: "var(--ink)", fontWeight: 600 }}>{bk.length}</div></div>
          <div><Label>Booked value</Label><div style={{ fontSize: 18, color: "var(--ink)", fontWeight: 600 }}>{eur(bk.reduce((a, b) => a + b.value, 0))}</div></div>
          <div><Label>Capacity</Label><div style={{ fontSize: 12.5, color: "var(--ink)" }}>6 to 20 guests (minimum configurable)</div></div>
          <div><Label>Duration</Label><div style={{ fontSize: 12.5, color: "var(--ink)" }}>Configurable (not asserted)</div></div></div>
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div><Label>Includes</Label><Chips items={["Welcome", "Heritage introduction", "Food and service"]} tone="ok" /></div>
          <div><Label>Staff</Label><Chips items={p.staff} /></div>
          <div><Label>Requires</Label><Chips items={["Dietary check", "Arrival time", "Venue ready"]} tone="warn" /></div></div>
      </Card>); })}</Grid>);
  }
  if (tab === "Packages") {
    const P = [["Golf + Afternoon Tea", "Afternoon Tea", ["Golf"]], ["Foraging + Afternoon Tea", "Afternoon Tea", ["Foraging"]], ["Whiskey Tasting + Heritage Experience", "Whiskey Tasting", ["Heritage walk"]], ["Bespoke Private Group Experience", "Either base experience", ["Golf", "Fishing on Lough Derg", "Foraging", "Hunting", "Boating"]]] as const;
    return (<><div style={{ fontSize: 12, color: "var(--dim)" }}>Base experience is priced per guest. Optional activities are priced on enquiry, subject to availability and confirmation.</div>
      <Grid n={2}>{P.map(p => (<Card key={p[0]} title={p[0]} style={{ minWidth: 0 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div><Label>Base experience</Label><Pill tone="ok">{p[1]}</Pill></div>
          <div><Label>Optional activity</Label><Chips items={[...p[2]]} /></div>
          <div><Label>Activity price</Label><Pill tone="warn">Price on enquiry</Pill></div></div></Card>))}</Grid></>);
  }
  if (tab === "Itineraries") {
    const T = [["11:00", "Optional golf or local activity", "Partner"], ["12:30", "Arrival and welcome", "Patrick Parsons"], ["12:45", "Heritage introduction", "Conrad Bailey"], ["13:15", "Private afternoon tea", "Tina Ramirez, Mary Kinsella"], ["14:30", "Experience concludes", "Guest Experience Coordinator (mock role)"]];
    return (<Card title="Example guest itinerary (timings are examples only)">
      {T.map((t, i) => (<div key={t[0]} style={{ display: "grid", gridTemplateColumns: "64px 14px 1fr", gap: 12, alignItems: "stretch" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", paddingTop: 8 }}>{t[0]}</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: i === 0 ? "var(--track)" : "var(--accent)", marginTop: 12 }} />{i < T.length - 1 && <span style={{ flex: 1, width: 2, background: "var(--track)" }} />}</div>
        <div style={{ padding: "8px 0 14px" }}><div style={{ fontSize: 13, color: "var(--ink)" }}>{t[1]}</div><div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 2 }}>Lead: {t[2]}</div></div></div>))}</Card>);
  }
  const D = [["Days 1 and 2", "Dublin orientation"], ["Day 3", "Birr Castle heritage day and private tea"], ["Days 4 and 5", "Offaly and Lough Derg activities"], ["Days 6 to 8", "Partner-led cultural stops"], ["Day 9", "Farewell dinner"], ["Day 10", "Departure"]];
  return (<><div style={{ ...card, borderColor: "var(--warn)", color: "var(--ink)", fontSize: 12.5 }}><Pill tone="warn">Concept / Under Development</Pill> Not a live, bookable programme.</div>
    <Card title="Proposed 10-day itinerary (draft)"><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8 }}>
      {D.map(d => <div key={d[0]} className="sob-k" style={{ ...card, padding: "10px 12px", background: "var(--surface-faint)" }}><div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>{d[0]}</div><div style={{ fontSize: 12.5, color: "var(--ink)", marginTop: 4 }}>{d[1]}</div></div>)}</div></Card>
    <Grid n={2}>
      <Card title="Planning" style={{ minWidth: 0 }}><div style={{ display: "grid", gap: 10 }}>
        <div><Label>Audience</Label><div style={{ fontSize: 12.5, color: "var(--ink)" }}>Chinese students and families</div></div>
        <div><Label>Group size</Label><div style={{ fontSize: 12.5, color: "var(--ink)" }}>About 15 (E-2016 Sino-Irish Summer Academy, unpriced)</div></div>
        <div><Label>Accommodation partners</Label><div style={{ fontSize: 12.5, color: "var(--ink)" }}>To be identified (no hotel at Birr Castle)</div></div>
        <div><Label>Activity partners</Label><Chips items={["Golf", "Fishing", "Foraging"]} /></div>
        <div><Label>Model</Label><div style={{ fontSize: 12.5, color: "var(--ink)" }}>Per-student package, not yet defined</div></div></div></Card>
      <Card title="Open questions" style={{ minWidth: 0 }}><Chips items={["Accommodation partner", "Safeguarding", "Visas", "Pricing", "Mandarin-speaking guides"]} tone="warn" /></Card></Grid></>);
}

function OperationsPage({ tab }: { tab: string }) {
  const s = useSpirit(), [ref, setRef] = useState("B-1043"), b = s.book.filter(x => x.status === "Confirmed");
  const done = (r: string) => (s.prep[r] ?? []).filter(Boolean).length, tone = (n: number) => n === 10 ? "ok" : n >= 6 ? "warn" : "bad";
  if (tab === "Today") { const nx = b[0]; return (<>
    <Grid n={2}><Card title="Prep readiness"><Gauge pct={b.length ? b.reduce((x, y) => x + done(y.ref), 0) / (b.length * 10) * 100 : 0} label="Across confirmed bookings" sub={`${b.reduce((x, y) => x + done(y.ref), 0)} of ${b.length * 10} checklist items done`} /></Card>
      <Card title="Readiness by booking"><Columns data={b.map(x => [x.client.split(" ")[0], done(x.ref)] as [string, number])} fmt={n => `${n}/10`} height={70} /></Card></Grid>
    <Grid n={2}>
      <Card title="Today: Friday 6 Nov" style={{ minWidth: 0 }}><div style={{ fontSize: 15, color: "var(--ink)", fontWeight: 600 }}>No events today</div>
        {nx && <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, background: "var(--accent-faint)", border: "1px solid var(--accent-line)" }}>
          <Label>Next event</Label><div style={{ fontSize: 13, color: "var(--ink)" }}>{nx.ref} {nx.client}</div><div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 2 }}>{nx.date} {nx.time} · {nx.guests} guests · {done(nx.ref)}/10 prepared</div></div>}</Card>
      <Card title="Alerts" style={{ minWidth: 0 }}><div style={{ display: "grid", gap: 7 }}>
        {[["Chen Family", "2 dietary requirements unconfirmed"], ["20 Nov 12:30", "Contested by E-2011 and E-2015"], ["B-1043", "Mandarin welcome note not drafted"]].map(a => (
          <div key={a[0]} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 12.5 }}><span style={{ color: "var(--ink)" }}>{a[0]}</span><Pill tone="warn">{a[1]}</Pill></div>))}</div></Card></Grid>
    <Card title="Upcoming arrivals"><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
      {b.slice(0, 4).map(x => <div key={x.ref} className="sob-k" style={{ ...card, padding: "11px 12px", background: "var(--surface-faint)", minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500 }}>{x.client}</div><div style={{ fontSize: 11.5, color: "var(--dim)", margin: "2px 0 8px" }}>{x.date} {x.time} · {x.guests} guests</div>
        <Bar pct={done(x.ref) * 10} color={`var(--${tone(done(x.ref))})`} /><div style={{ fontSize: 11, color: "var(--dim)", marginTop: 4 }}>{done(x.ref)} of 10 prepared</div></div>)}</div></Card></>); }
  if (tab === "Event Prep") { const p = s.prep[ref] ?? [], n = done(ref), cur = b.find(x => x.ref === ref); return (<div className="sob-split" style={{ display: "grid", gridTemplateColumns: "minmax(0,.8fr) minmax(0,1.2fr)", gap: 12, alignItems: "start" }}>
    <Card title="Confirmed bookings" style={{ minWidth: 0 }}><div style={{ display: "grid", gap: 6 }}>{b.map(x => { const on = x.ref === ref, k = done(x.ref); return (
      <div key={x.ref} className="sob-k" onClick={() => setRef(x.ref)} style={{ padding: "10px 12px", borderRadius: 14, cursor: "pointer", border: "1px solid " + (on ? "var(--accent-line)" : "var(--border)"), background: on ? "var(--accent-faint)" : "transparent" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--ink)" }}><span>{x.client}</span><Pill tone={tone(k)}>{k}/10</Pill></div>
        <div style={{ fontSize: 11, color: "var(--dim)", margin: "2px 0 7px" }}>{x.ref} · {x.date} · {x.guests} guests</div><Bar pct={k * 10} color={`var(--${tone(k)})`} /></div>); })}</div></Card>
    <Card style={{ minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div><div style={{ fontSize: 15, color: "var(--ink)", fontWeight: 600 }}>{cur?.client ?? ref}</div><div style={{ fontSize: 11.5, color: "var(--dim)" }}>{ref}{cur ? ` · ${cur.date} ${cur.time} · ${cur.exp}` : ""}</div></div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.5px" }}>{n}/10</div><div style={{ fontSize: 10.5, color: "var(--faint)" }}>checklist</div></div></div>
      <div style={{ margin: "10px 0 8px" }}><Bar pct={n * 10} color={`var(--${tone(n)})`} /></div>
      {PREP_ITEMS.map((it, i) => (<label key={it} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 2px", fontSize: 12.5, cursor: "pointer", borderTop: "1px solid var(--border)", color: p[i] ? "var(--dim)" : "var(--ink)", textDecoration: p[i] ? "line-through" : "none" }}>
        <input type="checkbox" style={{ accentColor: "#D8B46B", width: 15, height: 15 }} checked={!!p[i]} onChange={() => act.prep(ref, i)} />{it}</label>))}</Card></div>); }
  if (tab === "Team") { const T = [["Patrick Parsons", "Host / Lord Oxmantown", 1], ["Tina Ramirez", "Culinary", 1], ["Mary Kinsella", "Culinary", 1], ["John Callely", "Whiskey Expert", 1], ["Conrad Bailey", "Estate Guide", 1],
    ["Guest Experience Coordinator", "Mock role", 0], ["Sales & Partnerships Coordinator", "Mock role", 0], ["Marketing Coordinator", "Mock role", 0]] as const;
    return (<><div style={{ fontSize: 12, color: "var(--dim)" }}>Public website contributors. Not verified employee records.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>{T.map(t => (
        <div key={t[0]} className="sob-k" style={{ ...card, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <Avatar name={t[0]} size={38} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500 }}>{t[0]}</div><div style={{ fontSize: 11.5, color: "var(--dim)", margin: "1px 0 5px" }}>{t[1]}</div><Pill tone={t[2] ? "ok" : "dim"}>{t[2] ? "Public" : "Demo only"}</Pill></div></div>))}</div></>); }
  const R = [["Event preparation template", "10-point checklist per confirmed booking"], ["Arrival procedure", "Welcome, coats, host introduction"], ["Guest communication", "Draft only; human approval before sending"], ["Dietary request check", "Confirm 3 days before arrival"], ["Team handover", "Culinary and guide briefing the day before"], ["Post-event", "Mark complete, request feedback, draft referral invite"]];
  return (<Grid n={3}>{R.map(r => <div key={r[0]} className="sob-k" style={{ ...card, minWidth: 0 }}><div style={{ fontSize: 13.5, color: "var(--ink)", fontWeight: 600, marginBottom: 6 }}>{r[0]}</div><div style={{ fontSize: 12.5, lineHeight: 1.6 }}>{r[1]}</div></div>)}</Grid>);
}

function MarketingPage({ tab }: { tab: string }) {
  const s = useSpirit(), m = metrics(s);
  if (tab === "Overview") return (<><Grid n={5}><Kpi label="Direct enquiries" value={String(m.total - s.enq.filter(e => e.source === "Travel agent").length)} hint={`of ${m.total}`} /><Kpi label="Agent-driven" value={String(s.enq.filter(e => e.source === "Travel agent").length)} />{["Ireland", "US", "China"].map(k => <Kpi key={k} label={k} value={String(s.enq.filter(e => e.market === k).length)} hint="enquiries" />)}</Grid>
    <Grid n={2}>
      <Card title="Enquiries by market"><Donut data={["Ireland", "US", "China"].map(k => [k, s.enq.filter(e => e.market === k).length] as [string, number])} centre={String(m.total)} sub="enquiries" /></Card>
      <Card title="Value by market"><Columns data={["Ireland", "US", "China"].map(k => [k, s.enq.filter(e => e.market === k).reduce((a, e) => a + (e.value ?? 0), 0)] as [string, number])} fmt={n => "€" + (n / 1000).toFixed(1) + "k"} /></Card></Grid>
    <Card title="Leads requiring attention">E-2012 Li Wei (Mandarin reply to approve) · E-2013 O'Rourke (qualify) · E-2017 Harris (new). All analytics are illustrative mock data.</Card></>);
  if (tab === "Campaigns") return (<Grid n={3}>{[["Ireland", "Private celebrations, heritage enthusiasts, corporate groups, cultural clubs, Chinese communities in Dublin"], ["United States", "Visitors already planning Ireland trips, luxury advisers, ancestry tourism, tailor-made itineraries"], ["Chinese market", "Residents in Ireland, family groups, parents visiting students, inbound operators, Mandarin-speaking cultural audiences"]].map(c => <Card key={c[0]} title={c[0]}>{c[1]}<div style={{ marginTop: 8 }}><Pill>Draft campaign</Pill></div></Card>)}</Grid>);
  if (tab === "Content Studio") return (<Card title="Stories of Birr: editorial calendar">{s.content.map(c => (<div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
    <div><b style={{ color: "var(--ink)" }}>{c.title}</b><div style={{ fontSize: 12, color: "var(--dim)" }}>{c.channel} · {c.audience} · {c.date} · {c.owner}</div><div style={{ fontSize: 12.5, marginTop: 3 }}>{c.preview}</div></div>
    <div style={{ display: "flex", gap: 6, alignItems: "start" }}><Pill tone={c.approved ? "ok" : "warn"}>{c.status}</Pill><Btn disabled={c.approved} onClick={() => act.approveContent(c.id)}>Approve</Btn></div></div>))}
    <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 8 }}>No automatic publishing to external accounts.</div></Card>);
  if (tab === "SEO & GEO") return (<Card title="Illustrative opportunities (no verified rankings)"><Table head={["Topic", "Landing page", "Task"]} rows={[["Luxury afternoon tea in Ireland", "/luxury-afternoon-tea", "Metadata review"], ["Private castle dining in Ireland", "New page", "Content brief"], ["Birr Castle private hospitality", "/", "Internal linking"], ["Luxury heritage experiences, County Offaly", "New page", "Content brief"], ["Irish castle experiences for American travellers", "New page", "GEO answer-ready FAQ"], ["Mandarin-language Irish heritage experiences", "New page", "Bilingual review"]]} /></Card>);
  if (tab === "Market Segments") return (<Grid n={3}>{[["Irish domestic", "Celebrations, culture. Buys direct, word of mouth. Tea.", "Barrier: awareness"], ["US inbound luxury", "Heritage, ancestry. Buys through agents. Tea + whiskey.", "Barrier: agent reliance"], ["Chinese domestic and inbound", "Family, student visits. WeChat and referrals. Patrick speaks Chinese.", "Barrier: language, channels"]].map(c => <Card key={c[0]} title={c[0]}>{c[1]}<br /><span style={{ color: "var(--dim)" }}>{c[2]}</span></Card>)}</Grid>);
  return (<Card title="Attribution (mock tracking; real integration required)"><Table head={["Source", "Enquiries", "Converted"]} rows={[["Travel agents", 7, 2], ["Organic / direct search", 5, 2], ["Referrals", 4, 2], ["Social", 2, 0]]} /></Card>);
}

function Strip() {
  const s = useSpirit(), m = metrics(s), cf = conflicts(s).length;
  return (
    <div style={{ ...card, display: "flex", flexWrap: "wrap", gap: "14px 28px", alignItems: "center", padding: "14px 18px", background: "linear-gradient(100deg,rgba(168,40,58,.42),rgba(216,180,107,.07) 70%,var(--surface))", borderColor: "var(--accent-line)" }}>
      {[["Confirmed", eur(m.value)], ["Bookings", `${m.bookings} · ${m.guests} guests`], ["Open pipeline", eur(m.pipeline)], ["Slots filled", `${m.filled} of ${m.slots}`]].map(([k, val]) => (
        <div key={k}><div style={{ fontSize: 10.5, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase" }}>{k}</div><div style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{val}</div></div>))}
      <div style={{ flex: "1 1 220px", minWidth: 200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 6 }}><span>9 to 22 Nov capacity</span>{cf > 0 && <span style={{ color: "var(--warn)" }}>{cf} conflict</span>}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(16,1fr)", gap: 3 }}>
          {s.slots.map((x, i) => <div key={i} title={`${x.day} ${x.date} ${x.time}`} style={{ height: 14, borderRadius: 4, background: x.status === "booked" ? "var(--accent)" : x.status === "hold" ? "var(--warn)" : "var(--track)", opacity: x.status === "open" ? .9 : 1 }} />)}
        </div>
      </div>
    </div>
  );
}

const BLURB: Record<string, string> = {
  Sales: "Turn enquiries from agents, direct visitors and referrals into confirmed paid experiences.",
  Bookings: "Every private group, every session, nothing double-booked.",
  Experiences: "What Spirit of Birr sells, how it is packaged and what the guest receives.",
  Operations: "Prepare, staff and deliver every confirmed event.",
  Marketing: "Reach Ireland, the US and Chinese-speaking guests directly, not only through agents."
};

export default function Module({ v }: { v: any }) {
  const page: string = v.modPage, tab: string = v.modTab;
  const go = (t: string) => v.setModTab?.(t);
  return (
    <div style={{ padding: "18px 22px 30px", display: "flex", flexDirection: "column", gap: 10, animation: "pageIn .5s var(--ease) both" }}>
      <style>{CSS}</style>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap" }}>
        <div><h1 style={{ margin: 0, fontSize: 30, fontWeight: 500, letterSpacing: "-.8px" }}>{page}<span style={{ color: "var(--dim)", fontSize: 15, fontWeight: 400, marginLeft: 12 }}>{tab}</span></h1>
          <div style={{ fontSize: 13, color: "var(--dim)", marginTop: 4, maxWidth: 560 }}>{BLURB[page]}</div></div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--faint)" }}>Demo data · Fri 6 Nov 2026</span></div>
      <Strip />
      {page === "Sales" && <SalesPage tab={tab} go={go} />}
      {page === "Bookings" && <BookingsPage tab={tab} />}
      {page === "Experiences" && <ExperiencesPage tab={tab} />}
      {page === "Operations" && <OperationsPage tab={tab} />}
      {page === "Marketing" && <MarketingPage tab={tab} />}
    </div>
  );
}
