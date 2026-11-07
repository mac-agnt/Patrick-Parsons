/* Demo data and pure helpers for the Pulse prototype (Spirit of Birr). */

const INK="var(--ink)", BODY="var(--body)", DIM="var(--dim)", FAINT="var(--faint)";
const LIME="var(--accent)", GREEN="var(--ok)", AMBER="var(--warn)", RED="var(--bad)", NEUTRAL="var(--neutral)";
const MONO="var(--mono)";

const ICONS = {
  navHome:"M12 3.2 3.6 9.1v10a1.5 1.5 0 0 0 1.5 1.5h13.8a1.5 1.5 0 0 0 1.5-1.5v-10L12 3.2Z M8.9 13.1h2l1-2.6 1.5 5 1.1-2.4h1.6",
  navAgents:"M12 2.4v2.3 M12 2.4a.9.9 0 1 0 0-.02 M8.2 6.5h7.6A2.2 2.2 0 0 1 18 8.7v5.1a2.2 2.2 0 0 1-2.2 2.2H8.2A2.2 2.2 0 0 1 6 13.8V8.7a2.2 2.2 0 0 1 2.2-2.2Z M9.9 10.6v1.4 M14.1 10.6v1.4 M6 10h-1.9 M18 10h1.9 M9.2 18.6h5.6 M9.2 21.2h5.6",
  navDash:"M4 5.6h7.2v5.1H4V5.6Z M13.6 5.6H20v8.6h-6.4V5.6Z M4 13.1h7.2v5.3H4v-5.3Z M13.6 16.6H20v1.8h-6.4v-1.8Z",
  navWork:"M9.4 4.4h5.2a1.4 1.4 0 0 1 1.4 1.4v1.1h2.4A1.6 1.6 0 0 1 20 8.5v9.1a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 17.6V8.5a1.6 1.6 0 0 1 1.6-1.6H8V5.8a1.4 1.4 0 0 1 1.4-1.4Z M8 6.9h8 M9.6 13.3l1.8 1.8 3.4-3.6",
  navRecords:"M12 3.6c3.9 0 7 1.1 7 2.5S15.9 8.6 12 8.6 5 7.5 5 6.1 8.1 3.6 12 3.6Z M5 6.1v5.7c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6.1 M5 11.8v5.7c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5.7",
  navActivity:"M4.6 4.6h14.8A1.6 1.6 0 0 1 21 6.2v11.6a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 17.8V6.2a1.6 1.6 0 0 1 1.6-1.6Z M6 12.4h2.2l1.5-4.1 2.3 8 1.9-5.4 1.2 1.5H18",
  navAdmin:"M12 2.9 5 5.6v5.9c0 4 2.8 7.1 7 8.6 4.2-1.5 7-4.6 7-8.6V5.6L12 2.9Z M12 8.6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z M8.8 16.3a3.6 3.6 0 0 1 6.4 0",
  helios:"M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.8L3 21l1.9-4.9A8.3 8.3 0 0 1 4 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z M8 12h1.6l1.2-2.6 1.6 5 1.4-2.4H16",
  inbox:"M3 13h4l1.5 3h7l1.5-3h4 M3 13l2.4-7A2 2 0 0 1 7.3 4.6h9.4a2 2 0 0 1 1.9 1.4L21 13v4.4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V13Z",
  work:"M6 4.6h12a1.6 1.6 0 0 1 1.6 1.6v12.2A1.6 1.6 0 0 1 18 20H6a1.6 1.6 0 0 1-1.6-1.6V6.2A1.6 1.6 0 0 1 6 4.6Z M8.4 10.4l1.9 1.9 3.9-3.9 M8.4 15.6h7.2",
  approvals:"M12 3.6 19.5 6v6.1c0 4-3.1 6.9-7.5 8.3-4.4-1.4-7.5-4.3-7.5-8.3V6L12 3.6Z M9.2 12.2l2 2 3.6-3.7",
  insights:"M4.5 19.5V13 M9.7 19.5V7.5 M14.9 19.5v-8 M20 19.5V5",
  people:"M12 12.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M5 20.2c.9-3.1 3.6-4.9 7-4.9s6.1 1.8 7 4.9",
  orgs:"M4.5 20V6.4A1.4 1.4 0 0 1 5.9 5h6.2a1.4 1.4 0 0 1 1.4 1.4V20 M13.5 10.5h4.6A1.4 1.4 0 0 1 19.5 12v8 M3 20h18 M7.5 8.5h2.5 M7.5 12h2.5 M7.5 15.5h2.5",
  teams:"M9 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 12Z M16.5 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z M2.6 19.6c.8-2.8 3.2-4.4 6.4-4.4s5.6 1.6 6.4 4.4 M17 15.4c2.2.4 3.7 1.8 4.3 4.2",
  locations:"M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z M12 12.8a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  visits:"M8 4v3 M16 4v3 M4.5 9.5h15 M6.4 6h11.2A1.9 1.9 0 0 1 19.5 8v10a1.9 1.9 0 0 1-1.9 1.9H6.4A1.9 1.9 0 0 1 4.5 18V8A1.9 1.9 0 0 1 6.4 6Z M9 13.5l1.6 1.6 3.4-3.4",
  autos:"M18.5 8.5A5 5 0 0 0 8.9 7.3 3.8 3.8 0 0 0 6 14.6 M8 17.5l3.2 3.2 M11.2 20.7l3.2-3.2 M11.2 20.7V9.6",
  health:"M3 12.5h3.4l2-5 3 10 2.2-5H21",
  modules:"M6.6 4.4h10.8a2.2 2.2 0 0 1 2.2 2.2v10.8a2.2 2.2 0 0 1-2.2 2.2H6.6a2.2 2.2 0 0 1-2.2-2.2V6.6a2.2 2.2 0 0 1 2.2-2.2Z M4.4 9.6h15.2 M9.6 19.6V9.6",
  agents:"M8.5 3.6h7A2.4 2.4 0 0 1 17.9 6v5.6a2.4 2.4 0 0 1-2.4 2.4h-7A2.4 2.4 0 0 1 6.1 11.6V6a2.4 2.4 0 0 1 2.4-2.4Z M9.6 8.2h.01 M14.4 8.2h.01 M12 14v2.6 M7.6 20.4h8.8 M12 16.6c-2.4 0-4.4 1.7-4.4 3.8h8.8c0-2.1-2-3.8-4.4-3.8Z",
  dash:"M4.4 4.4h6v6h-6v-6Z M13.6 4.4h6v3.6h-6V4.4Z M13.6 11.6h6v8h-6v-8Z M4.4 14h6v5.6h-6V14Z",
  files:"M5 7.2a1.8 1.8 0 0 1 1.8-1.8h3l1.8 2.2h5.6A1.8 1.8 0 0 1 19 9.4v7.4a1.8 1.8 0 0 1-1.8 1.8H6.8A1.8 1.8 0 0 1 5 16.8V7.2Z",
  pulseLine:"M2.5 12.5h3.6l2.1-6.4 3.2 12.2 2.6-8.4 1.8 2.6h5.7",
  records:"M6.4 3.6h7.4l4.2 4.2v12.6H6.4V3.6Z M13.4 3.8v4.2h4.2 M9 12.4h6 M9 16h4",
  tree:"M4.5 6h5 M4.5 12h5 M4.5 18h5 M12.5 6h7 M12.5 12h7 M12.5 18h7",
  graph:"M7 7.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z M17.6 10.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z M9.4 21.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z M8.6 6.4l7.6 2.6 M15.8 11.4l-5.6 5.2",
  bell:"M6 8.5a6 6 0 0 1 12 0c0 6.5 2.6 8.5 2.6 8.5H3.4S6 15 6 8.5Z M10.3 20.5a1.94 1.94 0 0 0 3.4 0"
};

/* Ontology stays first and is never removed (PulseLogic enforces this too). */
const REC_SECTIONS = [
  {id:"ontology", label:"Ontology", blurb:"How every record connects: entities, predicates and the paths between them."},
  {id:"files", label:"Files", blurb:"Documents, contracts and certificates — indexed where Helios can read them."},
  {id:"contacts", label:"Contacts", blurb:"Every person the business deals with, staff and external."}
];

const CONTACTS = [
  ["Patrick Parsons","Host / Lord Oxmantown","","Spirit of Birr","staff","var(--accent)"],
  ["Tina Ramirez","Culinary","","Spirit of Birr","staff","#e6c78a"],
  ["Mary Kinsella","Culinary","","Spirit of Birr","staff","#a8e0c0"],
  ["John Callely","Whiskey Expert","","Spirit of Birr","staff","#c8b4f0"],
  ["Conrad Bailey","Estate Guide","","Spirit of Birr","staff","#9fd6f0"],
  ["Avery Brooks","US travel planner","","E-2011","prospect","#e2a08c"],
  ["Li Wei","Dublin Chinese Alumni","","E-2012","prospect","#e2a08c"],
  ["Boston Heritage Travel","Travel agent","","E-2014","partner","#e6c78a"],
  ["Chen Family Reunion","Guest group","","B-1043","guest","#a8e0c0"]
];

const FILE_TREE = [
  {type:"folder", id:"f-bk", name:"Bookings", depth:0},
  {type:"file", id:"fl-1", name:"B-1043 Chen Family Reunion — booking summary.pdf", depth:1, parent:"f-bk", indexed:true,
   path:"Bookings / B-1043", title:"B-1043 Chen Family Reunion",
   facts:[["TYPE","Demo summary"],["DATE","12 Nov 2026"],["GUESTS","14"],["VALUE","€1,820"]],
   body:["Afternoon tea for 14 guests, 12 November, 12:30. Mandarin-language welcome note requested.",
     "Two dietary requirements are unconfirmed. Culinary team: Tina Ramirez and Mary Kinsella. Estate guide: Conrad Bailey.",
     "Preparation is 6 of 10 complete."],
   links:[["Chen Family Reunion","org"],["Afternoon Tea","workflow"]]},
  {type:"file", id:"fl-2", name:"B-1035 Ashford Travel Group — completion note.pdf", depth:1, parent:"f-bk", indexed:true,
   path:"Bookings / B-1035", title:"B-1035 Ashford Travel Group",
   facts:[["TYPE","Demo summary"],["COMPLETED","22 Oct 2026"],["GUESTS","12"],["VALUE","€1,560"]],
   body:["Completed afternoon tea for 12 guests. Feedback request is awaiting approval.",
     "A referral invitation is drafted and has not been sent."],
   links:[["Ashford Travel Group","org"],["Post-visit feedback and referral","workflow"]]},
  {type:"folder", id:"f-sales", name:"Sales", depth:0},
  {type:"file", id:"fl-3", name:"E-2014 Boston Heritage Travel — proposal.pdf", depth:1, parent:"f-sales", indexed:true,
   path:"Sales / E-2014", title:"E-2014 Boston Heritage Travel proposal",
   facts:[["TYPE","Demo proposal"],["SENT","30 Oct 2026"],["GUESTS","18"],["VALUE","€2,340"]],
   body:["Proposal for 18 afternoon tea guests at €130 per guest (demo assumption).",
     "No reply yet. A follow-up is drafted and needs approval before sending."],
   links:[["Boston Heritage Travel","org"],["Enquiry follow-up","workflow"]]},
  {type:"file", id:"fl-4", name:"E-2012 Li Wei — enquiry notes.pdf", depth:1, parent:"f-sales", indexed:false,
   path:"Sales / E-2012", title:"E-2012 Li Wei",
   facts:[["TYPE","Demo notes"],["PROPOSED","27 Nov 2026"],["GUESTS","20"],["VALUE","€2,600"]],
   body:["Dublin Chinese Alumni group. Private afternoon tea. Mandarin communication requested.",
     "Not indexed, so the assistant cannot answer from it yet."],
   links:[["Li Wei","person"]]},
  {type:"folder", id:"f-content", name:"Stories of Birr", depth:0},
  {type:"file", id:"fl-5", name:"Stories of Birr — editorial calendar.xlsx", depth:1, parent:"f-content", indexed:true,
   path:"Content / Calendar", title:"Stories of Birr editorial calendar",
   facts:[["TYPE","Demo calendar"],["ITEMS","6"],["PUBLISHING","Manual only"],["OWNER","Patrick Parsons"]],
   body:["Six draft stories across Instagram, website and a Mandarin-language draft. Nothing is published automatically."],
   links:[["Content Studio","area"]]}
];

const ONTO_NODES = [
  ["Guest","entity",500,300,1,"Customers and suppliers. Balances arrive from the ledger through the record spine."],
  ["Enquiry","entity",300,190,1,"One entity for staff and external contacts, scoped by role rather than split in two."],
  ["Experience","entity",700,190,1,"Multi-branch as a business concept: locations plus the location permission scope."],
  ["Team Member","entity",250,430,1,"Teams are records, so the team scope on a grant resolves against them."],
  ["Task","entity",690,430,1,"Work, whatever it is attached to. Queues are one permission-filtered query."],
  ["Campaign","entity",850,320,0,"A request and its steps. Each decision is written as the person who made it."],
  ["Quote","ledger",390,95,0,"Read through the spine — the wholesale ledger stays the source of truth."],
  ["Booking","ledger",620,95,0,"Purchase and sales orders, linked to the organisation that raised them."],
  ["Itinerary","module",860,470,0,"Contributed by site-visits, with its own table, predicate and tools."],
  ["Feedback","entity",140,300,0,"Documents against any record. Indexed pages are what Helios can read."],
  ["requests","predicate",395,240,0,"Person → Organisation."],
  ["for","predicate",605,240,0,"Organisation → Location."],
  ["assigned to","predicate",360,370,0,"Person → Team."],
  ["relates to","predicate",600,370,0,"Task → anything."],
  ["produces","predicate",140,372,0,"File → anything."]
];

const ONTO_EDGES = [
  [500,300,300,190],[500,300,700,190],[500,300,250,430],[500,300,690,430],
  [500,300,850,320],[500,300,390,95],[500,300,620,95],[500,300,140,300],
  [300,190,250,430],[700,190,860,470],[690,430,850,320],[690,430,860,470],
  [300,190,140,300],[390,95,620,95]
];

const REC_TEMPLATES = [
  ["Field sheet","Records","Labelled fields in a grid — the default for a person, organisation or location.",
   "M5 5.5h14v13H5v-13Z M5 10h14 M12 10v8.5","grid"],
  ["Contact card","Records","A portrait, key fields and every linked record in one compact panel.",
   "M12 11.5a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z M5.5 19c.8-3 3.3-4.7 6.5-4.7s5.7 1.7 6.5 4.7","card"],
  ["Directory","Records","A sortable table of many records at once, built for lists.",
   "M4.5 6.5h15 M4.5 12h15 M4.5 17.5h15 M4.5 6.5h.01 M4.5 12h.01 M4.5 17.5h.01","rows"],
  ["Timeline","Case work","Ordered events with who did what and when. Good for a case or a claim.",
   "M12 3.5v17 M12 7.5h6 M12 13h-6 M12 18h6","timeline"],
  ["Kanban board","Case work","Cards in columns by status. For anything that moves through stages.",
   "M5 5h4.5v14H5V5Z M9.75 5h4.5v9h-4.5V5Z M14.5 5H19v6h-4.5V5Z","kanban"],
  ["Checklist","Case work","Ticked steps in order, with an owner and a due date on each.",
   "M5 6.5h2l1.4 1.4L11 5.5 M5 12.5h2l1.4 1.4 2.6-2.4 M5 18.5h2l1.4 1.4 2.6-2.4 M15 6.5h4 M15 12.5h4 M15 18.5h4","checklist"],
  ["Ledger","Finance","Rows and running totals. For anything with amounts and dates.",
   "M4 6h16 M4 12h16 M4 18h16 M9 3.5v17","ledger"],
  ["Invoice","Finance","Line items, totals and a status — built to be sent, not just stored.",
   "M7 3.5h10v17H7v-17Z M9.5 8h5 M9.5 11.5h5 M9.5 15h3","invoice"],
  ["Document","Notes","Long-form text with linked records pulled out down the side.",
   "M7 3.5h7l5 5v12H7v-17Z M14 3.7v5h5 M10 13h6 M10 16.5h4","document"],
  ["Gallery","Notes","A wall of images and files with a caption on each — for a site or a job.",
   "M4.5 6h6v6h-6V6Z M13.5 6h6v6h-6V6Z M4.5 14h6v4h-6v-4Z M13.5 14h6v4h-6v-4Z","gallery"],
  ["Map & locations","Ops","A pinboard of places, with the record's fields beside each pin.",
   "M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z M12 12.8a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z","map"],
  ["Schedule","Ops","A calendar of bookings against this record, with recurring rules.",
   "M8 4v3 M16 4v3 M4.5 9.5h15 M6.4 6h11.2A1.9 1.9 0 0 1 19.5 8v10a1.9 1.9 0 0 1-1.9 1.9H6.4A1.9 1.9 0 0 1 4.5 18V8A1.9 1.9 0 0 1 6.4 6Z","schedule"]
];
const REC_TEMPLATE_CATS = ["All","Records","Case work","Finance","Notes","Ops"];

/* ---- admin hub ---- */
/* ---- admin hub: 13 settings areas in five groups ---- */
const PEOPLE = [
  ["Patrick Parsons","Host / Lord Oxmantown","","Birr Castle","active","Admin","2 min ago"],
  ["Tina Ramirez","Culinary","","Birr Castle","active","Standard","1 h ago"],
  ["Mary Kinsella","Culinary","","Birr Castle","active","Standard","3 h ago"],
  ["John Callely","Whiskey Expert","","Birr Castle","active","Standard","Yesterday"],
  ["Conrad Bailey","Estate Guide","","Birr Castle","active","Standard","Yesterday"],
  ["Sales & Partnerships Coordinator","Mock role, demo only","","—","active","Manager","Demo"],
  ["Guest Experience Coordinator","Mock role, demo only","","—","active","Manager","Demo"],
  ["Marketing Coordinator","Mock role, demo only","","—","active","Standard","Demo"]
];
const ROLE_LEVELS = ["Admin","Manager","Standard","External"];
const PERM_KEYS = [["view","View records"],["edit","Edit records"],["approve","Approve payments"]];
const GRANT_DEFS = [
  ["view","View records","Read anything in scope"],
  ["edit","Edit records","Create and change records"],
  ["approve","Approve decisions","Say yes to parked work"],
  ["pay","Release payments","Send money out"],
  ["export","Export data","Download and share out"],
  ["agents","Manage agents","Create and grant agents"],
  ["settings","Change settings","Modules, roles, integrations"],
  ["audit","Read the audit log","Every action, everyone"]
];
const ROLE_SCOPES = ["All records","Their location","Assigned only"];
const DEFAULT_PERMS = {Admin:{view:true,edit:true,approve:true}, Manager:{view:true,edit:true,approve:true},
  Standard:{view:true,edit:true,approve:false}, External:{view:true,edit:false,approve:false}};
const INTEGRATIONS = [
  {name:"Spirit of Birr website", blurb:"Existing public site. Pulse does not read or write it yet.", tint:DIM, status:"integration planned", statusKind:"warn",
   glyph:"M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z M3.5 12h17 M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z",
   lastSync:"Not connected", usage:"Requires discovery", auth:"—", scopes:[]},
  {name:"Website enquiry form", blurb:"Would route new enquiries into Sales. Demo data stands in today.", tint:DIM, status:"demo only", statusKind:"warn",
   glyph:"M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z M3.5 12h17 M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z",
   lastSync:"Not connected", usage:"Demo only", auth:"—", scopes:[]},
  {name:"Business email", blurb:"Provider unknown. Drafts stay inside Pulse until approved.", tint:DIM, status:"requires discovery", statusKind:"off",
   glyph:"M4 7.2 12 13 20 7.2 M4 7.2v10.6h16V7.2 M4 7.2 8.5 4h7L20 7.2",
   lastSync:"Not connected", usage:"Provider unknown", auth:"—", scopes:[]},
  {name:"Calendar", blurb:"Provider unknown. Booking calendar is local demo state.", tint:DIM, status:"requires discovery", statusKind:"off",
   glyph:"M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z M3.5 12h17 M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z",
   lastSync:"Not connected", usage:"Provider unknown", auth:"—", scopes:[]},
  {name:"Web analytics", blurb:"Not verified. All analytics shown are illustrative.", tint:DIM, status:"not connected", statusKind:"off",
   glyph:"M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z M3.5 12h17 M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z",
   lastSync:"Not connected", usage:"Not verified", auth:"—", scopes:[]},
  {name:"Marketing platforms", blurb:"No advertising or social accounts connected. No auto-publishing.", tint:DIM, status:"not connected", statusKind:"off",
   glyph:"M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z M3.5 12h17 M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z",
   lastSync:"Not connected", usage:"None", auth:"—", scopes:[]},
  {name:"Payment provider", blurb:"None selected. No payments are taken in Pulse.", tint:DIM, status:"not selected", statusKind:"off",
   glyph:"M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z M3.5 12h17 M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z",
   lastSync:"Not connected", usage:"None", auth:"—", scopes:[]}
];

/* Background catalogue. Each entry is pure CSS so a tile is the real thing at
   thumbnail size, not a picture of it. */
const BG_DEFS = [
  {id:"bloom", name:"Bloom", cat:"Signature",
   css:"background:radial-gradient(60% 48% at 50% 34%, var(--accent-faint), transparent 72%), radial-gradient(44% 38% at 16% 84%, rgba(255,255,255,.05), transparent 70%)",
   thumb:"background:radial-gradient(62% 58% at 46% 34%, var(--accent-soft), transparent 74%), radial-gradient(50% 46% at 82% 84%, rgba(255,255,255,.08), transparent 72%), var(--surface-2)"},
  {id:"mist", name:"Mist", cat:"Signature",
   css:"background:radial-gradient(52% 44% at 24% 22%, rgba(255,255,255,.07), transparent 70%), radial-gradient(56% 46% at 80% 76%, rgba(255,255,255,.05), transparent 72%)",
   thumb:"background:radial-gradient(58% 52% at 24% 22%, rgba(255,255,255,.16), transparent 72%), radial-gradient(60% 54% at 82% 78%, rgba(255,255,255,.10), transparent 74%), var(--surface-2)"},
  {id:"grid", name:"Grid", cat:"Signature",
   css:"background-image:linear-gradient(var(--border) 1px, transparent 1px),linear-gradient(90deg, var(--border) 1px, transparent 1px);background-size:56px 56px;mask-image:radial-gradient(62% 56% at 50% 46%, #000, transparent 78%);-webkit-mask-image:radial-gradient(62% 56% at 50% 46%, #000, transparent 78%)",
   thumb:"background-color:var(--surface-2);background-image:linear-gradient(var(--border-strong) 1px, transparent 1px),linear-gradient(90deg, var(--border-strong) 1px, transparent 1px);background-size:14px 14px"},
  {id:"none", name:"None", cat:"Signature", css:"", thumb:"background:var(--surface-2)"},

  {id:"aurora", name:"Aurora", cat:"Gradient",
   css:"background:radial-gradient(70% 52% at 18% 8%, var(--bloom-a), transparent 66%), radial-gradient(64% 48% at 84% 22%, var(--bloom-b), transparent 68%), radial-gradient(70% 60% at 50% 104%, var(--bloom-c), transparent 70%);filter:blur(24px)",
   thumb:"background:radial-gradient(72% 60% at 16% 6%, var(--bloom-a), transparent 68%), radial-gradient(66% 54% at 86% 24%, var(--bloom-b), transparent 70%), radial-gradient(74% 66% at 50% 108%, var(--bloom-c), transparent 72%), var(--surface-2)"},
  {id:"horizon", name:"Horizon", cat:"Gradient",
   css:"background:linear-gradient(180deg, transparent 0%, var(--accent-faint) 58%, transparent 100%), radial-gradient(90% 40% at 50% 72%, var(--accent-soft), transparent 70%)",
   thumb:"background:linear-gradient(180deg, var(--surface-2) 0%, var(--accent-faint) 58%, var(--surface-2) 100%), radial-gradient(90% 44% at 50% 74%, var(--accent-soft), transparent 70%)"},
  {id:"dusk", name:"Dusk", cat:"Gradient",
   css:"background:linear-gradient(200deg, var(--bloom-c) -10%, transparent 46%), linear-gradient(20deg, var(--bloom-b) -10%, transparent 52%);opacity:.5",
   thumb:"background:linear-gradient(200deg, var(--bloom-c) -12%, transparent 48%), linear-gradient(20deg, var(--bloom-b) -12%, transparent 54%), var(--surface-2)"},
  {id:"ember", name:"Ember", cat:"Gradient",
   css:"background:radial-gradient(60% 70% at 84% 96%, var(--bloom-a), transparent 64%), radial-gradient(50% 60% at 10% 96%, var(--bloom-c), transparent 66%)",
   thumb:"background:radial-gradient(64% 76% at 84% 100%, var(--bloom-a), transparent 66%), radial-gradient(54% 66% at 8% 100%, var(--bloom-c), transparent 68%), var(--surface-2)"},

  {id:"mesh", name:"Mesh", cat:"Abstract",
   css:"background-image:radial-gradient(var(--border-strong) 1px, transparent 1px);background-size:22px 22px;mask-image:radial-gradient(70% 62% at 50% 46%, #000, transparent 76%);-webkit-mask-image:radial-gradient(70% 62% at 50% 46%, #000, transparent 76%)",
   thumb:"background-color:var(--surface-2);background-image:radial-gradient(var(--border-strong) 1px, transparent 1px);background-size:8px 8px"},
  {id:"contour", name:"Contour", cat:"Abstract",
   css:"background:repeating-radial-gradient(circle at 30% 110%, transparent 0 22px, var(--border) 22px 23px);mask-image:radial-gradient(80% 70% at 40% 80%, #000, transparent 78%);-webkit-mask-image:radial-gradient(80% 70% at 40% 80%, #000, transparent 78%)",
   thumb:"background:repeating-radial-gradient(circle at 26% 116%, var(--surface-2) 0 9px, var(--border-strong) 9px 10px)"},
  {id:"weave", name:"Weave", cat:"Abstract",
   css:"background:repeating-linear-gradient(48deg, transparent 0 16px, var(--border) 16px 17px), repeating-linear-gradient(-48deg, transparent 0 16px, var(--border) 16px 17px);opacity:.7",
   thumb:"background-color:var(--surface-2);background-image:repeating-linear-gradient(48deg, transparent 0 7px, var(--border-strong) 7px 8px), repeating-linear-gradient(-48deg, transparent 0 7px, var(--border-strong) 7px 8px)"},
  {id:"halo", name:"Halo", cat:"Abstract",
   css:"background:repeating-radial-gradient(circle at 50% 50%, transparent 0 46px, var(--accent-line) 46px 47px);mask-image:radial-gradient(60% 60% at 50% 50%, #000, transparent 72%);-webkit-mask-image:radial-gradient(60% 60% at 50% 50%, #000, transparent 72%)",
   thumb:"background:repeating-radial-gradient(circle at 50% 50%, var(--surface-2) 0 11px, var(--accent-line) 11px 12px)"},
  {id:"drift", name:"Drift", cat:"Abstract",
   css:"background:conic-gradient(from 210deg at 32% 38%, var(--bloom-b), transparent 38%), conic-gradient(from 20deg at 76% 70%, var(--bloom-a), transparent 34%);filter:blur(30px);opacity:.6",
   thumb:"background:conic-gradient(from 210deg at 32% 38%, var(--bloom-b), transparent 38%), conic-gradient(from 20deg at 76% 70%, var(--bloom-a), transparent 34%), var(--surface-2)"},
  {id:"scan", name:"Scanlines", cat:"Abstract",
   css:"background:repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 7px);mask-image:linear-gradient(180deg, #000, transparent 88%);-webkit-mask-image:linear-gradient(180deg, #000, transparent 88%)",
   thumb:"background-color:var(--surface-2);background-image:repeating-linear-gradient(0deg, var(--border-strong) 0 1px, transparent 1px 5px)"}
];

const THEMES = [
  {id:"dark", label:"Dark", group:"Dark", bg:"#0b0c0b", surface:"#1a1c19", ink:"#f2f3ef", accent:"#c8f04b"},
  {id:"indigo", label:"Indigo", group:"Dark", bg:"#0a0b13", surface:"#1a1b26", ink:"#f0f1fa", accent:"#8b93ff"},
  {id:"slate", label:"Slate", group:"Dark", bg:"#100e0c", surface:"#211c17", ink:"#f4f0ea", accent:"#e8a14a"},
  {id:"plum", label:"Plum", group:"Dark", bg:"#100a10", surface:"#20151f", ink:"#f6eef4", accent:"#f077b0"},
  {id:"ember", label:"Ember", group:"Dark", bg:"#0b0b0b", surface:"#1c1714", ink:"#f7f3ef", accent:"#f4561a"},
  {id:"harbour", label:"Harbour", group:"Dark", bg:"#0b0e10", surface:"#13171a", ink:"#f3f5f4", accent:"#5ee79a"},
  {id:"cargo", label:"Cargo", group:"Dark", bg:"#0a0a0a", surface:"#1a1c1a", ink:"#f2f5f2", accent:"#4ade80"},
  {id:"ocean", label:"Ocean", group:"Dark", bg:"#080e12", surface:"#141f25", ink:"#eaf4f8", accent:"#4fd4d0"},
  {id:"graphite", label:"Graphite", group:"Dark", bg:"#111112", surface:"#212124", ink:"#f4f4f5", accent:"#f4f4f5"},
  {id:"light", label:"Cream", group:"Light", bg:"#f4f2ed", surface:"#ffffff", ink:"#16181c", accent:"#0071e3"},
  {id:"warm", label:"Warm paper", group:"Light", bg:"#faf5ec", surface:"#fffdf9", ink:"#2a2016", accent:"#c9683f"},
  {id:"mist", label:"Mist", group:"Light", bg:"#eef1f4", surface:"#ffffff", ink:"#141e20", accent:"#0e9f6e"},
  {id:"sand", label:"Sand", group:"Light", bg:"#f6f1e6", surface:"#fffdf7", ink:"#221d12", accent:"#7d5fd6"}
];

const ADMIN_ICONS = {
  people:"M12 12.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M5 20.2c.9-3.1 3.6-4.9 7-4.9s6.1 1.8 7 4.9",
  teams:"M9 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 12Z M16.5 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z M2.6 19.6c.8-2.8 3.2-4.4 6.4-4.4s5.6 1.6 6.4 4.4 M17 15.4c2.2.4 3.7 1.8 4.3 4.2",
  structure:"M4.5 20V6.4A1.4 1.4 0 0 1 5.9 5h6.2a1.4 1.4 0 0 1 1.4 1.4V20 M13.5 10.5h4.6A1.4 1.4 0 0 1 19.5 12v8 M3 20h18 M7.5 8.5h2.5 M7.5 12h2.5",
  shield:"M12 3.6 19.5 6v6.1c0 4-3.1 6.9-7.5 8.3-4.4-1.4-7.5-4.3-7.5-8.3V6L12 3.6Z M9.2 12.2l2 2 3.6-3.7",
  agent:"M2 12h4l2.5-6 3.5 12 3-8 2 2h5",
  flow:"M18.5 8.5A5 5 0 0 0 8.9 7.3 3.8 3.8 0 0 0 6 14.6 M8 17.5l3.2 3.2 M11.2 20.7l3.2-3.2 M11.2 20.7V9.6",
  plug:"M9 3.5v5 M15 3.5v5 M6.5 8.5h11v3a5.5 5.5 0 0 1-11 0v-3Z M12 17v3.5",
  modules:"M6.6 4.4h10.8a2.2 2.2 0 0 1 2.2 2.2v10.8a2.2 2.2 0 0 1-2.2 2.2H6.6a2.2 2.2 0 0 1-2.2-2.2V6.6a2.2 2.2 0 0 1 2.2-2.2Z M4.4 9.6h15.2 M9.6 19.6V9.6",
  health:"M3 12.5h3.4l2-5 3 10 2.2-5H21",
  lock:"M6.5 10.5h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19v-7a1.5 1.5 0 0 1 1.5-1.5Z M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3",
  audit:"M8 3.5h8l3.5 3.5v13a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 6 3.5h2Z M9 12h6 M9 16h4",
  brand:"M12 3.5 14.6 9l6.4.6-4.8 4.2 1.4 6.2-5.6-3.3-5.6 3.3 1.4-6.2L3 9.6 9.4 9 12 3.5Z",
  bell:"M6 8.5a6 6 0 0 1 12 0c0 6.5 2.6 8.5 2.6 8.5H3.4S6 15 6 8.5Z M10.3 20.5a1.94 1.94 0 0 0 3.4 0",
  data:"M4.5 7.5c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3Z M4.5 7.5v9c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-9 M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"
};

const ADMIN_CARDS = [
  {id:"people", group:"ORGANISATION", title:"People & access", icon:"people", tint:"#6ad0f0",
   blurb:"Invite, suspend and offboard the people who use Pulse.",
   tags:["48 people","6 teams","3 locations"], badge:"3 waiting", badgeKind:"warn",
   footer:"Last login checked 4 minutes ago", action:"Review 3 invites",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Add, invite or remove employees","",""],["Create teams and departments","6 teams"],["Assign managers","4 reporting lines"],
     ["Set locations","Birr Castle"],["Suspend accounts","2 suspended"],["View last login","48 people tracked"]]},
  {id:"teams", group:"ORGANISATION", title:"Roles & permissions", icon:"shield", tint:"var(--accent)",
   blurb:"Permission templates, and exactly what each person can reach.",
   tags:["4 roles","64 permissions","3 scopes"],
   heroLabel:"THE QUESTION THIS ANSWERS", heroAction:"Show me what someone can access",
   heroText:"Pick a person and see every record, action and export they can reach — resolved through their grants, not guessed from the menus.",
   footer:"Preview Pulse as another user", action:"Open preview",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Create permission templates","4 in use"],["View, edit, export and delete access","per permission"],
     ["Restrict by team, location or record owner","3 scopes"],["Set approval limits","€10,000 threshold"],["Preview Pulse as another user",""]]},
  {id:"structure", group:"ORGANISATION", title:"Company structure", icon:"structure", tint:"#f0c04b",
   blurb:"Who reports to whom, where they work and when.",
   tags:["3 locations","Europe/Dublin","EUR"],
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Company details","Spirit of Birr"],["Departments","5"],["Teams","6"],["Locations","3"],
     ["Reporting lines","4"],["Working hours","08:00–17:30, Mon–Fri"],["Holidays","Irish public holidays"],
     ["Default currency and timezone","EUR · Europe/Dublin"]]},

  {id:"agents", group:"CONTROL", title:"Agents & AI controls", icon:"agent", tint:"var(--accent)",
   blurb:"What agents may read, what they may do, and where they must stop.",
   tags:["7 agents","318 actions today","€0.62 spent"],
   heroLabel:"GLOBAL CONTROL", heroAction:"Pause every agent",
   heroText:"One switch stops every agent immediately. Anything mid-run finishes its current step and then holds.",
   footer:"Write and external tools always need a yes", action:"Review limits",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Create approved agent roles","7 approved"],["Control which data agents can read","by permission"],
     ["Control which actions agents can take","read · write · external"],["Set approval requirements","all write tools", true],
     ["Set spending and usage limits","€40/month cap"],["Manage agent memory and retention","90 days"]]},
  {id:"wf", group:"CONTROL", title:"Workflow controls", icon:"flow", tint:"#9d8cf5",
   blurb:"The guardrails, not the builder — that lives under Work.",
   tags:["Managers only","2 approval rules","Retry twice"],
   footer:"Building workflows happens in Work", action:"Open Work",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Who can create workflows","Managers only"],["Maximum autonomy","proposes, never sends", true],
     ["Approval rules","2 configured"],["Failure handling","retry twice, then notify"],
     ["Usage limits","500 runs/day"],["Global pause","all workflows", true],["Default notification settings","inbox only"]]},
  {id:"notif", group:"CONTROL", title:"Notifications", icon:"bell", tint:"#f0994b",
   blurb:"Which events reach people, on which channel, and when not to.",
   tags:["Inbox","WhatsApp","Quiet 19:00–07:00"],
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Which events trigger notifications","14 of 21 events"],["Email","", true],["WhatsApp","", true],
     ["Mobile push","", false],["In-app","", true],["Escalation rules","after 4 hours unread"],
     ["Quiet hours","19:00–07:00"],["Daily and weekly summaries","07:00 daily"]]},

  {id:"integrations", group:"SYSTEMS", title:"Integrations", icon:"plug", tint:"#6ad0f0",
   blurb:"Email, accounting, CRM and messaging — and which way data flows.",
   tags:["0 live","7 planned or unknown"], badge:"Demo only", badgeKind:"warn",
   footer:"No live integrations. All data is mock.", action:"Review systems",
   listLabel:"CONNECTIONS",
   rows:[["Website","integration planned"],["Enquiry form","demo only"],["Email","requires discovery"],["Calendar","requires discovery"],
     ["Analytics","not verified"],["Marketing platforms","not connected"],["Payments","not selected"]]},
  {id:"modules", group:"SYSTEMS", title:"Modules & configuration", icon:"modules", tint:"#f0c04b",
   blurb:"Turn modules on, and make Pulse speak the business's own words.",
   tags:["3 installed","1 available","2 renamed terms"],
   heroLabel:"TERMINOLOGY", heroAction:"Edit terminology",
   heroText:"Organisation reads as Merchant, and Task reads as Job, everywhere in the interface — including what Helios says back to you.",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Enable or disable modules","3 installed"],["Rename business terminology","2 overridden"],
     ["Create custom fields","9 fields"],["Configure statuses","6 sets"],["Edit record types","7 types"],
     ["Set required information","per record type"],["Manage form layouts","4 layouts"]]},
  {id:"health", group:"SYSTEMS", title:"Data health", icon:"health", tint:"#e2705c",
   blurb:"What is wrong with the data, how bad it is, and the fix.",
   tags:["7 issue types","231 records affected"], badge:"74 duplicates", badgeKind:"bad",
   footer:"Last scanned 12 minutes ago", action:"Fix 3 automatically",
   listLabel:"ISSUES FOUND",
   trend:[312,289,274,256,248,241,231],
   bySeverity:[["High","137",RED],["Medium","59",AMBER],["Low","35",DIM]],
   issues:[["Duplicate records","74","high","Merge on matching name and VAT number","Fix automatically"],
     ["Missing required fields","62","high","4 organisations have no billing email","Fix automatically"],
     ["Failed imports","18","medium","Re-check the 9 Nov enquiry import","Retry"],
     ["Out-of-date information","41","medium","Not touched in over 18 months","Review"],
     ["Missing confirmations","2","high","Chen Family dietary requirements","Review"],
     ["Unmatched records","23","low","Invoices with no organisation attached","Review"],
     ["Records needing review","12","low","Flagged by an agent as inconsistent","Review"]],
   rows:[]},

  {id:"security", group:"GOVERNANCE", title:"Security", icon:"lock", tint:"#8fa6ff",
   blurb:"Sign-in, sessions, devices and the keys that reach the API.",
   tags:["SSO on","2FA enforced","3 API keys"], badge:"2 advisories", badgeKind:"warn",
   footer:"2 security recommendations open", action:"Review",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Single sign-on","Google Workspace", true],["Two-factor authentication","enforced", true],
     ["Login policies","30-day session"],["Active sessions","51"],["Approved devices","44"],
     ["IP restrictions","off", false],["Security alerts","on", true],["API keys","3 active"],
     ["Data retention rules","7 years"]]},
  {id:"audit", group:"GOVERNANCE", title:"Audit log", icon:"audit", tint:"#9d8cf5",
   blurb:"A locked history of who changed what. Searchable, exportable, never editable.",
   tags:["Append-only","7-year retention"],
   footer:"Nobody can edit or delete entries", action:"Export",
   listLabel:"WHAT IS RECORDED",
   rows:[["Permission changes","41 this month"],["Employee access","118"],["Data exports","9"],
     ["Integration changes","6"],["Agent actions","2,140"],["Deleted records","3"],["Admin changes","27"]]},
  {id:"datamgmt", group:"GOVERNANCE", title:"Data management", icon:"data", tint:"#5fe0a8",
   blurb:"Import, export, restore and — carefully — delete.",
   tags:["Backup 02:00","30-day restore"],
   footer:"Last backup completed 02:00 today", action:"Run backup",
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Import data","CSV only (demo)"],["Export data","full or per module"],["Backup status","healthy · 02:00 daily"],
     ["Restore previous versions","30 days available"],["Merge records","74 candidates"],
     ["Data retention","7 years"],["Delete company data","requires two admins"]]},

  {id:"brand", group:"EXPERIENCE", title:"Branding", icon:"brand", tint:"var(--accent)",
   blurb:"Logo, accent colour, templates and how agents appear.",
   tags:["Lime accent","2 templates"],
   listLabel:"WHAT YOU CONTROL HERE",
   rows:[["Company logo","spirit-of-birr-crest.png"],["Pulse accent colour","oklch(0.86 0.19 118)"],
     ["Email templates","3"],["Document templates","2"],["Agent appearance","12 faces · 6 shells"],
     ["Customer-facing portal branding","on", true]]},
  {id:"appearance", group:"EXPERIENCE", title:"Appearance & themes", icon:"brand", tint:"#6ad0f0",
   blurb:"Pick a light or dark theme for how Pulse looks to you.",
   tags:["8 themes","4 dark","4 light"],
   listLabel:"THEMES", rows:[]}
];

const ADMIN_GROUPS = [
  ["ORGANISATION", "repeat(3,1fr)"],
  ["CONTROL", "repeat(3,1fr)"],
  ["SYSTEMS", "repeat(3,1fr)"],
  ["GOVERNANCE", "repeat(3,1fr)"],
  ["EXPERIENCE", "repeat(3,1fr)"]
];

/* ---- activity feeds ---- */
const SRC_TINT = {Gmail:"#f07a9d", Pulse:"var(--accent)", Sage:"#6ad0f0", WhatsApp:"#5fe0a8",
  HubSpot:"#f0994b", Xero:"#8fa6ff", Agent:"var(--accent)"};
const SRC_ABBR = {Gmail:"GM", Pulse:"PL", Sage:"SG", WhatsApp:"WA", HubSpot:"HS", Xero:"XR", Agent:"AI"};

const DATA_EVENTS = [
  ["Booking request received","Li Wei asked for a private afternoon tea for 20 on 27 Nov (mock event).","Web form (demo)","E-2012","Pulse","completed"],
  ["Quote generated","Draft quote Q-2014: 18 guests, €2,340.","Lead Concierge","E-2014","Agent","completed"],
  ["Guest requirements updated","Two dietary requirements added to Chen Family Reunion.","Guest Care","B-1043","Pulse","completed"],
  ["Enquiry received","O'Rourke Family, 10 guests, afternoon tea.","Web form (demo)","E-2013","Pulse","completed"],
  ["Booking confirmed","Pacific Heritage Travel, 19 guests, whiskey tasting, 19 Nov.","Patrick Parsons","B-1046","Pulse","completed"],
  ["Booking conflict detected","E-2011 and E-2015 both request Fri 20 Nov 12:30.","Booking Coordinator","20 Nov 12:30","Agent","failed"]
];

const PEOPLE_EVENTS = [
  ["Staff preparation task completed","Venue checklist ticked for B-1041.","Mary Kinsella","B-1041","Pulse","completed"],
  ["Host assigned","Patrick Parsons assigned to B-1042.","Patrick Parsons","B-1042","Pulse","completed"],
  ["Proposal reviewed","Boston Heritage proposal checked before follow-up.","Patrick Parsons","E-2014","Pulse","completed"],
  ["Menu notes updated","Afternoon tea menu notes for the Chen Family.","Tina Ramirez","B-1043","Pulse","completed"],
  ["Whiskey expert confirmation","John Callely to confirm B-1045.","John Callely","B-1045","Pulse","awaiting"],
  ["Referral message awaiting approval","Ashford Travel Group referral invitation, draft only.","Guest Care","B-1035","Pulse","awaiting"]
];

const AI_EVENTS = [
  ["Booking Coordinator checked 16 slots","10 unfilled, one conflict on 20 Nov.","Booking Coordinator","9 to 22 Nov","Agent","working"],
  ["Lead Concierge classified 3 enquiries","O'Rourke, Harris, Sino-Irish Summer Academy.","Lead Concierge","3 enquiries","Agent","working"],
  ["Partner Outreach drafted a follow-up","Boston Heritage Travel, needs your approval.","Partner Outreach","E-2014","Agent","awaiting"],
  ["Campaign draft created","Mandarin-language introduction for Chinese residents in Ireland.","Audience Strategist","Chinese market","Agent","working"],
  ["Guest Care drafted a feedback request","Ashford Travel Group, awaiting approval.","Guest Care","B-1035","Agent","awaiting"],
  ["Revenue Analyst updated forecast","Confirmed €10,920, priced pipeline €12,100.","Revenue Analyst","Revenue","Agent","completed"],
  ["Ops Watchdog flagged dietary gap","Two requirements unconfirmed on B-1043.","Ops Watchdog","B-1043","Agent","failed"],
  ["Briefing posted the morning brief","Six bookings, ten open slots, one conflict.","Briefing","Patrick Parsons","Agent","completed"]
];

const STREAM_DEFS = [
  {id:"data", title:"New data", sub:"Information entering Pulse", pool:DATA_EVENTS, every:3200,
   tint:"#6ad0f0", icon:"M4.5 7.5c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3Z M4.5 7.5v9c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-9 M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"},
  {id:"people", title:"Employee activity", sub:"Decisions people made", pool:PEOPLE_EVENTS, every:6400,
   tint:"#f0c04b", icon:"M12 12.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z M5 20.2c.9-3.1 3.6-4.9 7-4.9s6.1 1.8 7 4.9"},
  {id:"ai", title:"AI activity", sub:"Agents at work", pool:AI_EVENTS, every:4600,
   tint:"var(--accent)", icon:"M2 12h4l2.5-6 3.5 12 3-8 2 2h5"}
];

const NAV = [
  {label:"Home", icon:"helios", page:"Home"},
  {label:"Agents", icon:"navAgents", page:"Agents"},
  {label:"Sales", icon:"pulseLine", page:"Sales"},
  {label:"Bookings", icon:"navWork", page:"Bookings"},
  {label:"Experiences", icon:"navRecords", page:"Experiences"},
  {label:"Operations", icon:"navWork", page:"Operations"},
  {label:"Marketing", icon:"navDash", page:"Marketing"},
  {label:"Dashboard", icon:"navDash", page:"Dashboard", dot:true},
  {label:"Work", icon:"navWork", page:"Work"},
  {label:"Records", icon:"navRecords", page:"Records"},
  {label:"Activity", icon:"pulseLine", page:"Activity", dot:true}
];

/* Inbox items follow the real InboxItem shape: what happened, why it matters, what I can do. */
const ITEMS = {
  sync:{kind:"Alert", importance:"critical", icon:ICONS.health, age:"1h",
    title:"20 Nov 12:30 requested by two groups",
    why:"Avery Brooks (E-2011, 16 tea guests, €2,080) and Fiona Greene (E-2015, 12 whiskey guests, €960) both want Fri 20 Nov 12:30. Both are tentative.",
    detail:"Nothing is double-booked. Whiskey Tasting fits the 15:00 session; the tea group keeps 12:30. Approving drafts the alternative for your review; nothing is sent.",
    actionLabel:"Propose alternative", secondaryLabel:"Hold for Avery", group:"Alerts",
    fields:[{k:"Provider",v:"bookings.conflicts"},{k:"Requests",v:"E-2011, E-2015"},{k:"Slot",v:"Fri 20 Nov 12:30"}],
    history:[{when:"Today 09:02",text:"Conflict detected by Ops Watchdog"}]},
  po:{kind:"Approval", importance:"high", icon:ICONS.approvals, age:"3h",
    title:"Boston Heritage Travel follow-up due (E-2014)",
    why:"18 guests, afternoon tea, €2,340. Proposal sent 30 Oct with no reply.",
    detail:"Lead Concierge drafted a short follow-up. External messages need your approval before anything goes out.",
    actionLabel:"Approve draft", secondaryLabel:"Edit", group:"Approvals",
    fields:[{k:"Enquiry",v:"E-2014"},{k:"Value",v:"€2,340"},{k:"Guests",v:"18"},{k:"Source",v:"Travel agent"}],
    history:[{when:"30 Oct",text:"Proposal sent"},{when:"Today",text:"Follow-up due"}]},
  visit:{kind:"Task", importance:"high", icon:ICONS.visits, age:"2h",
    title:"Chen Family: confirm two dietary requirements",
    why:"B-1043, 12 Nov, 14 guests, €1,820. A Mandarin-language welcome note is also requested.",
    detail:"Preparation is 6 of 10. Culinary team (Tina Ramirez, Mary Kinsella) need dietary details before the 12th.",
    actionLabel:"Open checklist", secondaryLabel:"Reassign", group:"Work",
    fields:[{k:"Booking",v:"B-1043"},{k:"Guests",v:"14"},{k:"Date",v:"12 Nov"},{k:"Value",v:"€1,820"}],
    history:[{when:"Today 08:40",text:"Flagged by Ops Watchdog"}]},
  auto:{kind:"Alert", importance:"normal", icon:ICONS.autos, age:"Yesterday",
    title:"Li Wei: bilingual reply awaiting approval (E-2012)",
    why:"20 guests, private afternoon tea, €2,600, proposed 27 Nov. Mandarin requested.",
    detail:"Guest Care drafted English and Mandarin versions. Bilingual review recommended before sending.",
    actionLabel:"Review draft", secondaryLabel:"Snooze", group:"Automations",
    fields:[{k:"Enquiry",v:"E-2012"},{k:"Guests",v:"20"},{k:"Value",v:"€2,600"},{k:"Date",v:"27 Nov"}],
    history:[{when:"Yesterday",text:"Booking request received"}]},
  task:{kind:"Task", importance:"normal", icon:ICONS.work, age:"Thu",
    title:"Ashford Travel Group: feedback and referral drafts (B-1035)",
    why:"Completed 22 Oct, 12 tea guests, €1,560. Feedback request awaiting approval; referral invitation drafted, not sent.",
    detail:"Approving queues a feedback request. Referral invite stays draft until you release it.",
    actionLabel:"Approve feedback", secondaryLabel:"Hold referral", group:"Work",
    fields:[{k:"Booking",v:"B-1035"},{k:"Guests",v:"12"},{k:"Value",v:"€1,560"}],
    history:[{when:"22 Oct",text:"Experience completed"}]}
};
const ORDER = ["sync","po","visit","auto","task"];

const ANSWERS = {
  gaps:{tool:"bookings_capacity", effect:"read",
    text:"Ten of your sixteen bookable slots between 9 and 22 November are unfilled (6 of 16 confirmed, 37.5%). Confirmed value is €10,920 across 99 guests. The 20 November 12:30 slot is contested by two tentative requests.",
    cols:["Date","Session","Status","Note"],
    rows:[["Tue 17 Nov","12:30","Open","Whiskey fits 15:00"],["Thu 12 Nov","15:00","Open","Chen Family 12:30 same day"],["Fri 20 Nov","12:30","Contested","E-2011 vs E-2015"]],
    actions:[["Open Bookings capacity",0],["Resolve 20 Nov conflict",1]]},
  bookings:{tool:"bookings_find", effect:"read",
    text:"Six confirmed group experiences, 99 guests, €10,920 quoted value (synthetic demo data). Next up is Sarah Mitchell Group on Monday 9 November, 12 guests.",
    cols:["Ref","Client","Date","Guests","Value"],
    rows:[["B-1041","Sarah Mitchell Group","9 Nov","12","€1,560"],["B-1042","Emerald Corporate Group","10 Nov","16","€2,080"],["B-1043","Chen Family Reunion","12 Nov","14","€1,820"],["B-1044","Harper Ireland Journey","13 Nov","18","€2,340"]],
    actions:[["Open upcoming bookings",0]]},
  chase:{tool:"sales_email_draft", effect:"write", confirm:true,
    confirmSummary:"Send one follow-up to Boston Heritage Travel on E-2014 (18 afternoon tea guests, €2,340, proposal sent 30 Oct).",
    text:"Drafted. External messages need your approval, so nothing has gone out. The stored draft is replayed exactly as written when you confirm.",
    actions:[["Confirm and send",1],["Edit draft",0]]},
  chen:{tool:"operations_prep", effect:"read",
    text:"Chen Family Reunion (B-1043, 12 Nov, 14 guests, €1,820) is 6 of 10 prepared. Two dietary requirements are unconfirmed and the Mandarin welcome note has not been drafted.",
    cols:["Item","Status","Owner"],
    rows:[["Dietary requirements (2)","Unconfirmed","Tina Ramirez"],["Mandarin welcome note","Not drafted","Patrick Parsons"],["Venue ready","Pending","Conrad Bailey"]],
    actions:[["Open event prep",1],["Draft Mandarin note",0]]},
  china:{tool:"marketing_segments", effect:"read",
    text:"Chinese market: Li Wei (E-2012, 20 guests, €2,600, 27 Nov, Mandarin requested) is the live lead. Chen Family is already booked. The 10-day student programme (E-2016) is a concept, unpriced and not bookable.",
    cols:["Ref","Prospect","Guests","Value"],
    rows:[["E-2012","Li Wei / Dublin Chinese Alumni","20","€2,600"],["E-2016","Sino-Irish Summer Academy","15","Unpriced"],["B-1043","Chen Family Reunion","14","€1,820"]],
    actions:[["Open Chinese campaigns",0]]},
  fallback:{tool:"core_search", effect:"read",
    text:"I can answer that from the Spirit of Birr demo records: bookings, enquiries, capacity, operations and marketing. Try asking which dates need more bookings.",
    actions:[["Show unfilled sessions",0]]}
};

// Turns a plain-English filter name into a full dashboard area — the "primitive
// vibe-coding" bit: no real backend, just a seeded generator so the same phrase
// always produces the same numbers, with direction and vocabulary nudged by
// keywords in the text (expansion/growth trends up, risk/issue trends down, a
// region/cost/people/ops/customer word picks which metrics show).
function synthesizeCustomArea(name){
  const trimmed = (name || "").trim();
  if (!trimmed) return null;
  let seed = 0;
  for (let i = 0; i < trimmed.length; i++) seed = (seed * 31 + trimmed.charCodeAt(i)) >>> 0;
  const rnd = (n) => (((seed >>> (n % 24)) ^ (seed << ((n * 7) % 13))) >>> 0) % 997 / 997;
  const low = trimmed.toLowerCase();
  const has = (...words) => words.some(w => low.indexOf(w) > -1);
  const growth = has("expansion","growth","launch","scale","pilot","new site","open","opening","grow");
  const risk = has("risk","issue","delay","problem","complaint","fault","incident","churn","decline");
  const dir = risk ? -1 : (growth ? 1 : (rnd(2) > 0.45 ? 1 : -1));

  let vocab = "generic";
  if (has("scotland","ireland","wales","england","region","dublin","belfast","cork","galway","london","glasgow","edinburgh"))
    vocab = "region";
  else if (has("cost","spend","budget","saving","margin")) vocab = "cost";
  else if (has("staff","hiring","team","recruit","headcount")) vocab = "people";
  else if (has("supplier","stock","inventory","warehouse","fleet")) vocab = "ops";
  else if (has("customer","client","retention","account")) vocab = "customer";

  const V = {
    region:   {labels:["New enquiries","Orders won","Revenue","Site coverage"], unit:"EUR — 30 DAYS"},
    cost:     {labels:["Spend","Cost per job","Savings found","Budget used"], unit:"EUR — 30 DAYS"},
    people:   {labels:["Headcount","Open roles","Time to hire","Retention"], unit:"PEOPLE"},
    ops:      {labels:["Stock cover","Lead time","Stockouts","Reorders raised"], unit:"DAYS"},
    customer: {labels:["Active accounts","Repeat rate","Churn","NPS"], unit:"ACCOUNTS"},
    generic:  {labels:["Volume","Rate","Cost","Coverage"], unit:"ACTIVITY — 30 DAYS"}
  }[vocab];

  const months = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
  let v0 = 40 + Math.floor(rnd(1) * 220);
  const chart = months.map((m, i) => {
    v0 = Math.max(8, Math.round(v0 * (1 + dir * (0.03 + rnd(i + 3) * 0.07))));
    return [m, v0, String(v0)];
  });
  const metrics = V.labels.map((label, i) => {
    const val = 20 + Math.floor(rnd(i + 5) * 400);
    const pct = 2 + Math.round(rnd(i + 9) * 18);
    const up = dir > 0 ? rnd(i + 12) > 0.25 : rnd(i + 12) > 0.7;
    const bars = [0,1,2,3,4,5,6,7,8].map(k => 0.3 + rnd(i * 3 + k) * 0.7);
    return [label, i === 1 ? pct + "%" : String(val), (up ? "+" : "\u2212") + pct + (i === 1 ? "pt" : "%"), up ? "up" : "down", "vs last month", bars];
  });
  const capName = trimmed.replace(/\b\w/g, c => c.toUpperCase());
  const split = [
    [capName + " \u2014 direct", String(Math.round(v0 * 0.5)), "48%", 1],
    ["Existing pipeline", String(Math.round(v0 * 0.3)), "31%", 0],
    ["Everything else", String(Math.round(v0 * 0.2)), "21%", 0]
  ];
  const table = [1,2,3].map(w => [capName + " \u2014 week " + w, String(20 + Math.floor(rnd(20 + w) * 200)),
    (dir > 0 ? "+" : "\u2212") + (3 + Math.floor(rnd(23 + w) * 14)) + "%", "Auto-tagged from records mentioning \u201c" + low + "\u201d"]);
  table.push(["Everything else", String(20 + Math.floor(rnd(30) * 200)), "\u2014", "Baseline"]);
  return {
    id: trimmed, label: capName, color: "var(--accent)", owner: "CUSTOM FILTER",
    description: "Generated from \u201c" + trimmed + "\u201d \u2014 a plain-English filter, not a registered metric set. Refine it and Pulse will tighten this up.",
    kind: "columns", chartTitle: capName + " over time", chartUnit: V.unit,
    chart, splitTitle: "Where \u201c" + low + "\u201d shows up", split,
    tableCols: ["Item","Value","Change","Note"], table,
    metrics, legend: [capName, "Pipeline", "Other"]
  };
}

function pickAnswer(q){
  const s = q.toLowerCase();
  if (/chen|prepare|arrival|dietary/.test(s)) return ANSWERS.chen;
  if (/follow|draft|email|send|agent/.test(s)) return ANSWERS.chase;
  if (/chinese|china|mandarin|li wei/.test(s)) return ANSWERS.china;
  if (/unfilled|gap|empty|capacity|slot|date|available|priorit/.test(s)) return ANSWERS.gaps;
  if (/booking|next week|upcoming|confirmed/.test(s)) return ANSWERS.bookings;
  return ANSWERS.fallback;
}

const ORGS = [
  ["Boston Heritage Travel","Travel agent","€2,340","Proposal sent","open"],
  ["Pacific Heritage Travel","Travel agent","€1,520","B-1046","active"],
  ["Harper Ireland Journey","Travel agent","€2,340","B-1044","active"],
  ["Celtic Luxury Tours","Destination management","€1,520","E-2018","open"],
  ["Ashford Travel Group","Destination management","€1,560","B-1035","completed"],
  ["Dublin Cultural Society","Cultural organisation","€1,600","B-1045","active"]
];
const TEAMS = [
  ["Hosting","1 member","Patrick Parsons","bookings:view, quotes:approve"],
  ["Culinary","2 members","Tina Ramirez","operations:prep"],
  ["Experience delivery","2 members","Conrad Bailey","operations:prep"],
  ["Sales & marketing","2 mock roles","Patrick Parsons","sales:view, marketing:draft"]
];
const LOCATIONS = [
  ["Birr Castle","Birr, Co. Offaly","Private hospitality","active"],
  ["Lough Derg","Optional activity","Fishing, subject to confirmation","price on enquiry"],
  ["Local golf","Optional activity","Subject to availability","price on enquiry"]
];

const AGENT_DEFS = [
  {id:"fill", name:"Fortnight fill", shape:"rim-capsule", tint:"#2a1216", state:"working", group:true,
   members:["briefing","booking","revenue"], role:"Briefing, Booking Coordinator and Revenue Analyst working the 9 to 22 Nov gaps",
   when:"09:12", preview:"booking coordinator: 20 Nov needs a decision.",
   thread:[
     {kind:"stamp", text:"Today 09:04"},
     {kind:"routine", text:"Ran routine", routine:"Fortnight capacity review"},
     {kind:"agent", from:"booking", text:"ten of sixteen slots are still open. the 20 November 12:30 slot has two tentative requests on it."},
     {kind:"agent", from:"revenue", text:"filling the open slots at the demo average would add roughly €1,800 to €2,100 per booking. confirmed value today is €10,920."},
     {kind:"agent", from:"briefing", text:"so it is one decision: keep Avery Brooks on 12:30 and move Fiona Greene to the 15:00 whiskey session."},
     {kind:"user", text:"do that, draft only"},
     {kind:"agent", from:"booking", text:"drafted both messages. sending needs your approval."}
   ]},
  {id:"briefing", name:"Briefing", shape:"crown-pebble", tint:"#191c1f", state:"complete", role:"Reads the whole business every morning and tells you what matters",
   when:"08:02", preview:"six bookings, ten open slots, one conflict.",
   thread:[
     {kind:"stamp", text:"Today 08:00"},
     {kind:"routine", text:"Ran routine", routine:"Morning briefing"},
     {kind:"agent", text:"morning briefing:", lines:[
       {k:"Bookings", v:"6 confirmed · 99 guests · €10,920"},
       {k:"Capacity", v:"10 of 16 slots unfilled (9 to 22 Nov)"},
       {k:"Conflict", v:"E-2011 and E-2015 both want Fri 20 Nov 12:30"},
       {k:"Prep", v:"Chen Family: 2 dietary requirements to confirm"}]},
     {kind:"agent", text:"two things need you today: the 20 November slot, and the Chen Family dietary details."},
     {kind:"user", text:"remind me monday about Avery"},
     {kind:"agent", text:"done. task created for Monday 9 November against E-2011."}
   ]},
  {id:"ops", name:"Ops Watchdog", shape:"shield", tint:"#2b1b1e", state:"attention", role:"Watches booking conflicts, preparation gaps, dietary details and arrivals",
   when:"08:40", preview:"chen family dietary details still unconfirmed.",
   thread:[
     {kind:"stamp", text:"Today 08:40"},
     {kind:"agent", text:"B-1043 Chen Family Reunion is 6 of 10 prepared. two dietary requirements are unconfirmed and the Mandarin welcome note is not drafted."},
     {kind:"user", text:"who owns dietary"},
     {kind:"agent", text:"Tina Ramirez on the culinary side. i have not messaged anyone."}
   ]},
  {id:"lead", name:"Lead Concierge", shape:"executive-capsule", tint:"#2a2118", state:"waiting", role:"Organises enquiries, suggests replies, classifies interest and proposes qualification questions",
   when:"Yesterday", preview:"three new enquiries sorted. replies drafted, nothing sent.",
   thread:[
     {kind:"stamp", text:"Yesterday 16:40"},
     {kind:"agent", text:"three new enquiries: O'Rourke Family (tea, 10), Harris Family (tea, 10), Sino-Irish Summer Academy (programme concept, unpriced). qualification questions are drafted for each."},
     {kind:"user", text:"what do we ask the academy"},
     {kind:"agent", text:"group size, ages, accommodation, dates and budget. it stays a concept until those are known."}
   ]},
  {id:"booking", name:"Booking Coordinator", shape:"low-dome", tint:"#241b2e", state:"working", role:"Suggests slots, builds booking summaries, spots conflicts and prepares confirmations",
   when:"09:02", preview:"conflict on fri 20 nov 12:30.",
   thread:[
     {kind:"stamp", text:"Today 09:02"},
     {kind:"agent", text:"two tentative requests share Fri 20 Nov 12:30: Avery Brooks (E-2011, 16 tea guests, €2,080) and Fiona Greene (E-2015, 12 whiskey guests, €960). nothing is double-booked."},
     {kind:"agent", text:"suggestion: Fiona to 15:00 on the same day or Tue 17 Nov 15:00."}
   ]},
  {id:"audience", name:"Audience Strategist", shape:"control-cube", tint:"#16241f", state:"thinking", role:"Reads lead sources and suggests Ireland, US and Chinese market opportunities",
   when:"Mon", preview:"seven of eighteen enquiries came through agents.",
   thread:[
     {kind:"stamp", text:"Monday 11:20"},
     {kind:"agent", text:"agents drove 7 of 18 enquiries, organic and direct 5, referrals 4, social 2 (synthetic). the gap is direct US and Mandarin-language reach."}
   ]},
  {id:"guest", name:"Guest Care", shape:"offset-pebble", tint:"#191c1f", state:"working", role:"Prepares welcome notes, feedback requests, referral follow-ups and bilingual drafts",
   when:"Yesterday", preview:"ashford feedback request awaiting approval.",
   thread:[
     {kind:"stamp", text:"Yesterday 17:30"},
     {kind:"agent", text:"B-1035 Ashford Travel Group (completed 22 Oct, 12 guests, €1,560): feedback request is ready and a referral invitation is drafted. neither is sent."},
     {kind:"user", text:"and the chen welcome"},
     {kind:"agent", text:"English and Mandarin drafts are ready. i recommend a bilingual review before it goes."}
   ]},
  {id:"partner", name:"Partner Outreach", shape:"crown-pebble", tint:"#1b2430", state:"waiting", role:"Tracks agent opportunities, prepares follow-ups and flags inactive partners",
   when:"Today", preview:"boston heritage follow-up is due.",
   thread:[
     {kind:"stamp", text:"Today 07:30"},
     {kind:"agent", text:"Boston Heritage Travel (E-2014, 18 guests, €2,340): proposal sent 30 October, no reply. follow-up drafted."},
     {kind:"agent", text:"Shamrock DMC (E-2010) went quiet after two follow-ups and is marked lost."}
   ]},
  {id:"revenue", name:"Revenue Analyst", shape:"low-dome", tint:"#2a2118", state:"complete", role:"Tracks quoted and confirmed value, utilisation, upsells and forecast scenarios",
   when:"Mon", preview:"€10,920 confirmed, €12,100 priced pipeline.",
   thread:[
     {kind:"stamp", text:"Monday 08:15"},
     {kind:"agent", text:"confirmed €10,920 (tea €7,800, whiskey €3,120). priced open pipeline €12,100. the programme concept is unpriced and excluded. targets of 6 to 8 bookings a week are goals, not current performance."}
   ]}
];

const KPI_DEFS = {
  revenue:{label:"Confirmed booking value", value:"€10,920", delta:"6 bookings", dir:"up", hint:"9 to 22 Nov, quoted", hero:true},
  cash:{label:"Guests confirmed", value:"99", delta:"+14", dir:"up", hint:"Chen Family added"},
  overdue:{label:"Unfilled slots", value:"10 of 16", delta:"37.5% used", dir:"down", hint:"9 to 22 Nov"},
  margin:{label:"Enquiry to booking", value:"33.3%", delta:"6 of 18", dir:"up", hint:"30 days"},
  jobs:{label:"Open enquiries", value:"8", delta:"€12,100", dir:"up", hint:"priced pipeline"},
  nps:{label:"Direct enquiries", value:"11 of 18", delta:"agents 7", dir:"up", hint:"illustrative"},
  pipeline:{label:"Priced pipeline", value:"€12,100", delta:"7 priced", dir:"up", hint:"excl. programme concept"},
  utilisation:{label:"Prep complete", value:"29%", delta:"Chen 6/10", dir:"down", hint:"confirmed events"}
};

const ASPECT_DEFS = [
  {id:"executive", label:"Executive", color:"var(--accent)", owner:"PATRICK PARSONS", description:"Confirmed bookings, pipeline and forward capacity at a glance. Demo data.",
   kind:"columns", chartTitle:"Confirmed booking value by week", chartUnit:"EUR",
   chart:[["9 Nov",1560,"€1.6k"],["10 Nov",2080,"€2.1k"],["12 Nov",1820,"€1.8k"],["13 Nov",2340,"€2.3k"],["16 Nov",1600,"€1.6k"],["19 Nov",1520,"€1.5k"],["20 Nov",0,"€0"],["23 Nov",0,"€0"]],
   splitTitle:"Slots, 9 to 22 Nov",
   split:[["Confirmed","6","37.5%",1],["Unfilled","10","62.5%",0]],
   tableCols:["Ref","Client","Date","Value"],
   table:[["B-1041","Sarah Mitchell Group","9 Nov","€1,560"],["B-1042","Emerald Corporate Group","10 Nov","€2,080"],["B-1043","Chen Family Reunion","12 Nov","€1,820"],["B-1044","Harper Ireland Journey","13 Nov","€2,340"],["B-1045","Dublin Cultural Society","16 Nov","€1,600"],["B-1046","Pacific Heritage Travel","19 Nov","€1,520"]],
   metrics:[["Confirmed value","€10,920","6 bookings","up","quoted",[.3,.4,.5,.6,.7,.8,.9,.95,1]],
     ["Priced pipeline","€12,100","7 priced","up","open",[.4,.5,.45,.6,.55,.7,.65,.8,.85]],
     ["Guests","99","6 groups","up","confirmed",[.3,.4,.5,.55,.6,.7,.78,.9,1]],
     ["Utilisation","37.5%","6 of 16","down","slots",[.4,.4,.42,.4,.38,.4,.38,.38,.375]]]},
  {id:"sales", label:"Sales Funnel", color:"#e6c78a", owner:"SALES & PARTNERSHIPS (MOCK)", description:"Where the 18 enquiries came from and how many became bookings. Synthetic.",
   kind:"funnel", funnel:[["Enquiries","18","30 days",18],["Qualified or beyond","14","78%",14],["Proposal sent","9","50%",9],["Confirmed","6","33.3% of enquiries",6]], chartTitle:"Enquiries by source", chartUnit:"COUNT",
   chart:[["Agents",7,"7"],["Organic",5,"5"],["Referral",4,"4"],["Social",2,"2"]],
   splitTitle:"Direct vs agent",
   split:[["Direct channels","11","61%",1],["Travel agents","7","39%",0]],
   tableCols:["Source","Enquiries","Booked","Lost"],
   table:[["Travel agents","7","2","2"],["Organic / direct","5","2","1"],["Referral","4","2","0"],["Social","2","0","1"]],
   metrics:[["Enquiries","18","30 days","up","all sources",[.3,.4,.5,.6,.6,.7,.8,.9,1]],
     ["Open","8","€12,100","up","priced",[.5,.5,.6,.6,.7,.7,.8,.8,.85]],
     ["Conversion","33.3%","6 of 18","up","enquiry to booking",[.4,.45,.5,.5,.55,.6,.6,.65,.7]],
     ["Lost","4","closed","down","no booking",[.5,.5,.45,.5,.45,.4,.4,.4,.4]]]},
  {id:"occupancy", label:"Occupancy", color:"#9fd6f0", owner:"PATRICK PARSONS", description:"Bookable slots, confirmed slots and the forward gaps. Demo assumption: Mon, Tue, Thu, Fri, two sessions.",
   kind:"stacked", legend:["Confirmed","Unfilled"], stacked:[["9 Nov",[1,1]],["10 Nov",[1,1]],["12 Nov",[1,1]],["13 Nov",[1,1]],["16 Nov",[1,1]],["17 Nov",[0,2]],["19 Nov",[1,1]],["20 Nov",[0,2]]], chartTitle:"Slots by day",
   chart:[["Mon",2,"2"],["Tue",1,"1"],["Thu",2,"2"],["Fri",1,"1"]],
   splitTitle:"By experience",
   split:[["Afternoon Tea","4","67%",1],["Whiskey Tasting","2","33%",0]],
   tableCols:["Gap","Session","Note"],
   table:[["Tue 17 Nov","12:30 and 15:00","Both open"],["Fri 20 Nov","12:30","Contested E-2011 / E-2015"],["Fri 20 Nov","15:00","Open"],["Thu 12 Nov","15:00","Open"]],
   metrics:[["Bookable","16","9 to 22 Nov","up","slots",[.5,.5,.5,.5,.5,.5,.5,.5,.5]],
     ["Confirmed","6","slots","up","booked",[.2,.3,.4,.5,.55,.6,.7,.8,.9]],
     ["Unfilled","10","slots","down","open",[.9,.8,.7,.7,.65,.6,.6,.6,.6]],
     ["Utilisation","37.5%","6 of 16","up","of slots",[.2,.25,.3,.32,.34,.36,.37,.375,.375]]]},
  {id:"revenue", label:"Revenue", color:"#7fd8a4", owner:"REVENUE ANALYST", description:"Confirmed booking value, priced pipeline and scenarios. Projections are not results.",
   kind:"area", chartTitle:"Cumulative confirmed value", chartUnit:"EUR",
   chart:[["9 Nov",1560,"€1.6k"],["10 Nov",3640,"€3.6k"],["12 Nov",5460,"€5.5k"],["13 Nov",7800,"€7.8k"],["16 Nov",9400,"€9.4k"],["19 Nov",10920,"€10.9k"]],
   splitTitle:"By experience",
   split:[["Afternoon Tea","€7,800","71%",1],["Whiskey Tasting","€3,120","29%",0]],
   tableCols:["Scenario","Bookings","Value","Basis"],
   table:[["Confirmed","6","€10,920","Booked"],["Plus priced pipeline","13","€23,020","Hypothetical"],["Fill 8 open slots at average","14","about €25,000","Projection"]],
   metrics:[["Tea value","€7,800","60 guests","up","confirmed",[.3,.4,.5,.6,.7,.8,.9,.95,1]],
     ["Whiskey value","€3,120","39 guests","up","confirmed",[.2,.3,.4,.5,.6,.7,.8,.9,1]],
     ["Average booking","€1,820","per booking","up","confirmed",[.6,.6,.62,.6,.64,.62,.66,.64,.65]],
     ["Priced pipeline","€12,100","7 open","up","not confirmed",[.4,.5,.45,.6,.55,.7,.65,.8,.85]]]},
  {id:"guest", label:"Guest Experience", color:"#e2705c", owner:"GUEST EXPERIENCE (MOCK)", description:"Preparation, guest communications, dietary requests and the feedback and referral workflow.",
   kind:"rows", rows:[["B-1041 Sarah Mitchell","8 of 10",80],["B-1042 Emerald Corporate","6 of 10",60],["B-1043 Chen Family","6 of 10",60],["B-1044 Harper Ireland","3 of 10",30],["B-1045 Dublin Cultural","2 of 10",20],["B-1046 Pacific Heritage","1 of 10",10]], chartTitle:"Preparation by booking", chartUnit:"COUNT",
   chart:[["B-1041",8,"8"],["B-1042",6,"6"],["B-1043",6,"6"],["B-1044",3,"3"],["B-1045",2,"2"],["B-1046",1,"1"]],
   splitTitle:"Post-visit workflow",
   split:[["Feedback awaiting approval","1","B-1035",1],["Referral drafted, not sent","1","B-1035",0]],
   tableCols:["Item","Booking","Status","Owner"],
   table:[["Dietary requirements (2)","B-1043","Unconfirmed","Tina Ramirez"],["Mandarin welcome note","B-1043","Not drafted","Patrick Parsons"],["Feedback request","B-1035","Awaiting approval","Guest Care"],["Referral invitation","B-1035","Draft only","Patrick Parsons"]],
   metrics:[["Prep complete","26 of 60","items","up","across 6 events",[.2,.25,.3,.35,.4,.42,.43,.43,.43]],
     ["Dietary open","2","B-1043","down","to confirm",[.5,.5,.6,.6,.7,.7,.7,.7,.7]],
     ["Feedback","1","pending","up","approval",[.2,.2,.2,.3,.3,.3,.4,.4,.4]],
     ["Referrals","1","drafted","up","not sent",[.1,.1,.1,.2,.2,.2,.3,.3,.3]]]}
];

const FILTER_GROUPS = [
  {title:"AREA", items:["Executive","Sales Funnel","Occupancy","Revenue","Guest Experience"]},
  {title:"SPINE", items:["Experience","Team","Guest","Partner","Market"]},
  {title:"TIME", items:["This week","This month","This quarter","Year to date"]}
];

const OPS_DEFS = [
  {id:"o1", name:"Morning briefing", kind:"report", owner:"Briefing", ownerKind:"agent", initials:"BR",
   trigger:"Weekdays, 07:00", triggerKind:"schedule", next:"Tomorrow", last:"Sent to Patrick", status:"healthy", rate:99, on:true,
   what:"Summarises confirmed bookings, open slots, conflicts and preparation gaps into one page.",
   why:"Patrick wants one central view without opening five tools.",
   saved:"demo estimate",
   steps:[["Trigger","Every weekday at 07:00"],["Find","Bookings, slots, enquiries"],["Check","Flag conflicts and prep gaps"],["Draft","Write the briefing"],["Send","Deliver to Patrick (draft only for external)"]],
   runs:[["Today 07:00","14s","ok","1 recipient","mock"],["Yesterday 07:00","12s","ok","1 recipient","mock"]]},
  {id:"o2", name:"Enquiry follow-up", kind:"automation", owner:"Lead Concierge", ownerKind:"agent", initials:"LC",
   trigger:"New enquiry", triggerKind:"event", next:"Event-based", last:"3 drafts waiting", status:"approval", rate:96, on:true,
   what:"Classifies a new enquiry, drafts a reply and the qualification questions, then parks it for approval.",
   why:"Replies to enquiries should go out within hours, not days.",
   saved:"demo estimate",
   steps:[["Trigger","An enquiry arrives"],["Classify","Tea, whiskey or programme concept"],["Draft","First reply and qualification questions"],["Approval","Patrick reviews","gate"],["Send","Email the prospect"]],
   runs:[["Today 09:10","6s","ok","3 drafted","mock"],["Yesterday 16:40","7s","ok","1 drafted","mock"]]},
  {id:"o3", name:"Event preparation checklist", kind:"routine", owner:"Ops Watchdog", ownerKind:"agent", initials:"OW",
   trigger:"Booking confirmed", triggerKind:"event", next:"Event-based", last:"B-1043 flagged", status:"healthy", rate:97, on:true,
   what:"Creates the 10-point checklist for every confirmed booking and flags gaps 3 days before arrival.",
   why:"Staff need advance visibility of every guest.",
   saved:"demo estimate",
   steps:[["Trigger","A booking is confirmed"],["Create","10-point checklist"],["Assign","Host and team"],["Check","Dietary and arrival time"],["Alert","Flag open items"]],
   runs:[["Today 08:40","9s","ok","B-1043 flagged","mock"],["Yesterday 08:40","8s","ok","no gaps","mock"]]},
  {id:"o4", name:"Post-visit feedback and referral", kind:"automation", owner:"Guest Care", ownerKind:"agent", initials:"GC",
   trigger:"Experience completed", triggerKind:"event", next:"Event-based", last:"B-1035 awaiting approval", status:"approval", rate:92, on:true,
   what:"Drafts a feedback request and a referral invitation after a completed experience.",
   why:"Referrals and repeat business should be systematic.",
   saved:"demo estimate",
   steps:[["Trigger","Experience marked complete"],["Draft","Feedback request"],["Draft","Referral invitation"],["Approval","Patrick reviews","gate"],["Send","Email the guest"]],
   runs:[["22 Oct 18:00","11s","ok","2 drafts","mock"]]}
];

const OPS_FILTERS = [
  ["all","All"], ["routine","Agent routines"], ["automation","Automations"],
  ["report","Scheduled reports"], ["task","Recurring tasks"], ["approval","Needs approval"], ["failed","Failed"]
];

const WORK_SECTIONS = [
  {id:"tasks", label:"Tasks", blurb:"Everything assigned to you or your team, in one permission-filtered list.",
   views:["All tasks","Due tasks","Review","Done"], filters:["Due date","Any status","Anyone","Any due date"]},
  {id:"approvals", label:"Approvals", blurb:"Requests and their steps. Every decision is written as the person who made it.",
   views:["Awaiting you","Awaiting others","Decided"], filters:["Raised date","Any value","Anyone"]},
  {id:"workflows", label:"Workflows", blurb:"Automations and agent routines — what runs on its own, and who owns it.",
   views:[], filters:[]},
  {id:"schedules", label:"Schedules", blurb:"The team calendar: when recurring work fires and what it costs the week.",
   views:[], filters:[]}
];

const WORK_TASKS = [
  {id:"w1", title:"Follow up with Avery Brooks (E-2011)", status:"In progress", priority:"High", who:"PP", due:"Due Mon 9 Nov", late:false, client:"E-2011", day:"Today", mins:"30 mins", view:"Due tasks"},
  {id:"w2", title:"Confirm Chen Family dietary details (B-1043)", status:"In progress", priority:"High", who:"TR", due:"Due today", late:false, client:"B-1043", day:"Today", mins:"30 mins", view:"Due tasks"},
  {id:"w3", title:"Draft Mandarin welcome message (B-1043)", status:"Not started", priority:"High", who:"PP", due:"Due Mon 9 Nov", late:false, client:"B-1043", day:"Today", mins:"30 mins", view:"All tasks"},
  {id:"w4", title:"Review Boston Heritage proposal (E-2014)", status:"Review", priority:"High", who:"SP", due:"Follow-up due today", late:false, client:"E-2014", day:"Today", mins:"30 mins", view:"Review"},
  {id:"w5", title:"Resolve competing 20 November requests", status:"Not started", priority:"High", who:"PP", due:"Due Mon 9 Nov", late:false, client:"E-2011 / E-2015", day:"Today", mins:"30 mins", view:"All tasks"},
  {id:"w6", title:"Prepare next week's guest programme", status:"Not started", priority:"Medium", who:"GE", due:"Due Fri", late:false, client:"B-1041 to B-1044", day:"Today", mins:"30 mins", view:"All tasks"},
  {id:"w7", title:"Approve Stories of Birr content", status:"Review", priority:"Medium", who:"PP", due:"Due Mon 9 Nov", late:false, client:"Content Studio", day:"Today", mins:"30 mins", view:"Review"},
  {id:"w8", title:"Review availability gaps (10 unfilled slots)", status:"Not started", priority:"Medium", who:"SP", due:"Due Fri", late:false, client:"Capacity", day:"Today", mins:"30 mins", view:"All tasks"}
];

const WORKFLOWS = [
  {name:"Morning briefing", state:"live", trigger:"schedule · weekdays 07:00",
   actions:[["briefing.compose","read"],["notify.inbox","write"]], lastRun:"Today 07:00",
   result:"ok", resultKind:"ok", runSummary:"14 ok",
   runs:["ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok"]},
  {name:"Enquiry follow-up", state:"live", trigger:"event · enquiry.created",
   actions:[["enquiry.classify","read"],["email.draft","write"]], lastRun:"Today 09:10",
   result:"3 drafts awaiting approval", resultKind:"warn", runSummary:"12 ok · 2 partial",
   runs:["ok","ok","partial","ok","ok","ok","partial","ok","ok","ok","ok","ok","ok","ok"]},
  {name:"Event preparation checklist", state:"live", trigger:"event · booking.confirmed",
   actions:[["prep.create","write"],["notify.inbox","write"]], lastRun:"Today 08:40",
   result:"ok", resultKind:"ok", runSummary:"6 ok",
   runs:["idle","idle","ok","ok","ok","idle","ok","ok","ok","idle","ok","ok","ok","ok"]},
  {name:"Website enquiry form sync", state:"failing", trigger:"not connected",
   actions:[["website.form","external"]], lastRun:"Never",
   result:"Integration planned. Demo only.", resultKind:"bad", runSummary:"not connected",
   runs:["idle","idle","idle","idle","idle","idle","idle","idle","idle","idle","idle","idle","idle","idle"]}
];

const SCHEDULES = [
  {id:"s1", name:"Morning briefing", cadence:"Every weekday · 07:00", next:"Mon 07:00", owner:"Briefing", on:true, day:1},
  {id:"s2", name:"Enquiry follow-up review", cadence:"Daily · 09:00", next:"Mon 09:00", owner:"Lead Concierge", on:true, day:1},
  {id:"s3", name:"Dietary confirmation check", cadence:"3 days before arrival", next:"Mon 9 Nov", owner:"Ops Watchdog", on:true, day:1},
  {id:"s4", name:"Partner outreach round", cadence:"Thursdays · 10:00", next:"Thu 10:00", owner:"Partner Outreach", on:true, day:3},
  {id:"s5", name:"Weekly revenue and capacity review", cadence:"Fridays · 16:00", next:"Fri 16:00", owner:"Revenue Analyst", on:true, day:4}
];

const WIDGET_DEFS = [["inbox","Action inbox"],["work","My work"],["activity","Activity"],["kpi","Today's numbers"],["visits","Upcoming experiences"]];
const WORK_WIDGETS = [
  {id:"queue", label:"My queue", value:"8", hint:"assigned to you", icon:"work", queue:"mine"},
  {id:"late", label:"Due today", value:"2", hint:"Chen dietary, Boston", icon:"health", queue:"overdue"},
  {id:"unassigned", label:"Unassigned", value:"1", hint:"nobody owns it yet", icon:"teams", queue:"unassigned"},
  {id:"week", label:"Next 7 days", value:"4", hint:"bookings this week", icon:"visits", queue:"upcoming"}
];
const PERSONALITIES = ["Straight-talking","Warm","Formal","Dry"];
const ANSWER_STYLES = ["Short answers","Show the working","Ask before acting"];
/* Every context source and every registered tool the agent could be granted —
   the builder shows the whole catalogue, grouped, rather than a sample. */
const CONTEXT_DEFS = [
  ["Organisations","records","Accounts, limits, payment behaviour"],
  ["People","records","Contacts and internal staff"],
  ["Files","records","Indexed documents and certificates"],
  ["Tasks","work","Queues, owners, due dates"],
  ["Site visits","work","Bookings, installers, outcomes"],
  ["Approvals","work","What is waiting on a decision"],
  ["Invoices","money","Issued, paid, past due"],
  ["Quotes","money","Sent, accepted, expired"],
  ["Payments","money","Receipts and allocations"],
  ["Activity log","system","Every event, agent and human"],
  ["Modules","system","What this client has installed"],
  ["Insights","system","Saved metrics and trends"]
];
const CONTEXT_SOURCES = CONTEXT_DEFS.map(c => c[0]);
const SKILL_DEFS = [
  ["Search records","read"],["Summarise activity","read"],["Read invoices","read"],
  ["Read bookings","read"],["Check permissions","read"],
  ["Draft email","write"],["Create task","write"],["Update record","write"],
  ["Hold slot","write"],["Raise approval","write"],
  ["Send email","external"],["Publish content","external"]
];
/* The two questions the agent asks back once it knows the job. */
const TRAIN_PHASES = [
  ["Reading the whole ontology", "4,820 records"],
  ["Learning how this business words things", "organisation → merchant"],
  ["Researching the trade-supply domain", "12 sources"],
  ["Writing its own system prompt", "1,240 tokens"]
];
const BRIEF_QUESTIONS = [
  {title:"What should it cover?", sub:"Pick as many as you like — we can refine later.",
   options:[["Calendar","Meetings and what is coming up"],["Email","Unread and actionable inbox items"],
            ["Records","Accounts that moved since yesterday"],["Money","Cash, overdue and anything at risk"],
            ["Something else","Tell me in the next message"]]},
  {title:"When should it land?", sub:"One is enough to start.",
   options:[["Every morning 07:30","Before the yard opens"],["Weekdays 08:00","Monday to Friday only"],
            ["Only when something changes","Event-driven, no noise"],["On demand","When you ask for it"]]}
];
/* The words under a name, keyed to the same state the face lights with. */
const STATE_LABELS = {working:"working", thinking:"thinking", waiting:"waiting on you",
  complete:"up to date", attention:"needs you", idle:"idle"};

const FACE_SHAPES = [
  ["crown-pebble","Pebble"],["executive-capsule","Executive"],["shield","Shield"],
  ["glass-visor","Visor"],["control-cube","Control cube"],["low-dome","Low dome"],
  ["offset-pebble","Offset pebble"],["rim-capsule","Capsule"],["wide-eyed","Wide-eyed"],
  ["precision-brow","Precision brow"],["tall-unit","Tall unit"],["soft-asymmetric","Soft asymmetric"]
];
/* Shell colours only, deliberately desaturated so none of them reads as a
   state. Each is a pair: the deep shell for light themes and its pale partner
   for dark ones (the eyes take the other). The status light carries the state. */
const FACE_TINTS = [
  ["#191c1f","Graphite","#e3e6e8"],["#1b2430","Slate","#d3dde9"],["#241b2e","Aubergine","#ddd4ea"],
  ["#2a2118","Bronze","#eadccb"],["#16241f","Pine","#d1e4da"],["#2b1b1e","Oxblood","#eed5d7"]
];

/* ---- ontology graph: generation, Dijkstra traversal, canvas render ---- */
const CLUSTERS = [
  ["Organisations", "#c8f04b", 0.00, 0.62, 46],
  ["People",        "#6ad0f0", 0.90, 0.70, 52],
  ["Files",         "#b06cf0", 1.75, 0.66, 58],
  ["Tasks",         "#f0c04b", 2.55, 0.72, 44],
  ["Invoices",      "#f0567f", 3.35, 0.60, 38],
  ["Site visits",   "#5fe0a8", 4.15, 0.70, 40],
  ["Locations",     "#f0803a", 4.95, 0.64, 30],
  ["Approvals",     "#5f7cf0", 5.65, 0.72, 34]
];

function mulberry(seed){
  return function(){
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Hub-and-spoke clusters around a dense phyllotaxis core, in unit space
   (-1..1 on both axes) so the layout is resolution independent. */
const _hexCache = {};
function hexRGB(hex){
  if (_hexCache[hex]) return _hexCache[hex];
  const h = hex.replace("#", "");
  const v = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  _hexCache[hex] = v;
  return v;
}


function buildGraph(){
  const rnd = mulberry(20260902);
  const nodes = [], edges = [], adj = [];
  const add = (x, y, z, r, cluster, kind) => {
    nodes.push({x, y, z, r, cluster, kind}); adj.push([]); return nodes.length - 1;
  };
  const link = (a, b) => {
    const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, dz = nodes[a].z - nodes[b].z;
    const w = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.004;
    const id = edges.length;
    edges.push({a, b, w});
    adj[a].push([b, w, id]); adj[b].push([a, w, id]);
  };

  // the core is a filled sphere on a Fibonacci lattice, not a disc
  const CORE = 880, coreIds = [];
  for (let i = 0; i < CORE; i++){
    const t = (i + 0.5) / CORE;
    const phi = Math.acos(1 - 2 * t);
    const theta = i * 2.39996;
    const shell = 0.16 + 0.28 * Math.pow(rnd(), 0.5);
    const grade = rnd();
    coreIds.push(add(
      Math.sin(phi) * Math.cos(theta) * shell * 1.04,
      Math.cos(phi) * shell * 0.96,
      Math.sin(phi) * Math.sin(theta) * shell,
      grade < 0.06 ? 3.4 + rnd() * 1.4 : grade < 0.3 ? 2.1 + rnd() * 0.7 : 1.0 + rnd() * 0.8, 0, "core"));
  }
  // lattice neighbours plus a mesh of chords, so the sphere reads as a volume
  for (let i = 1; i < coreIds.length; i++){
    link(coreIds[i], coreIds[i - 1]);
    if (i >= 13) link(coreIds[i], coreIds[i - 13]);
    if (i >= 21 && i % 2 === 0) link(coreIds[i], coreIds[i - 21]);
    if (i >= 34 && i % 3 === 0) link(coreIds[i], coreIds[i - 34]);
    if (i >= 55 && i % 4 === 0) link(coreIds[i], coreIds[i - 55]);
    if (i >= 89 && i % 5 === 0) link(coreIds[i], coreIds[i - 89]);
    if (i % 6 === 0) link(coreIds[i], coreIds[Math.floor(rnd() * coreIds.length)]);
  }

  // a mid shell between the nucleus and the lobes: the layer that makes it
  // read as a network rather than a ball with satellites
  const MID = 560, midIds = [];
  for (let i = 0; i < MID; i++){
    const t = (i + 0.5) / MID;
    const phi = Math.acos(1 - 2 * t), theta = i * 2.39996 + 0.7;
    const d = 0.52 + 0.16 * Math.pow(rnd(), 0.6);
    const g2 = rnd();
    midIds.push(add(
      Math.sin(phi) * Math.cos(theta) * d * 1.02,
      Math.cos(phi) * d * 0.96,
      Math.sin(phi) * Math.sin(theta) * d,
      g2 < 0.05 ? 2.6 + rnd() * 1.0 : g2 < 0.3 ? 1.6 + rnd() * 0.6 : 0.8 + rnd() * 0.7, 0, "core"));
  }
  for (let i = 0; i < midIds.length; i++){
    if (i >= 1) link(midIds[i], midIds[i - 1]);
    if (i >= 17) link(midIds[i], midIds[i - 17]);
    if (i >= 29 && i % 2 === 0) link(midIds[i], midIds[i - 29]);
    // radial spokes tying the shell to the nucleus
    if (i % 2 === 0) link(midIds[i], coreIds[Math.floor(rnd() * coreIds.length)]);
    if (i % 9 === 0) link(midIds[i], coreIds[Math.floor(rnd() * coreIds.length)]);
  }

  // clusters ride a sphere: each hub gets its own latitude as well as longitude
  const hubs = [], clusterLeaves = [];
  const onSphere = (lon, lat, d0) => { const d = d0 * 1.22;
    return [Math.cos(lat) * Math.cos(lon) * d * 1.02, Math.sin(lat) * d * 0.96, Math.cos(lat) * Math.sin(lon) * d]; };
  CLUSTERS.forEach((c, ci) => {
    const [, , ang, dist, leaves] = c;
    const lat = (ci % 2 ? 1 : -1) * (0.26 + rnd() * 0.5);
    const wob = 1.06 + rnd() * 0.16;
    const hp = onSphere(ang, lat, dist * wob);
    const hub = add(hp[0], hp[1], hp[2], 5.4, ci, "hub");
    hubs.push(hub);
    const mine = [];
    clusterLeaves.push(mine);
    for (let k = 0; k < 3; k++) link(hub, coreIds[Math.floor(rnd() * coreIds.length)]);
    for (let k = 0; k < 5; k++) link(hub, midIds[Math.floor(rnd() * midIds.length)]);

    const subs = 5 + Math.floor(rnd() * 4);
    const subIds = [];
    for (let s = 0; s < subs; s++){
      const sa = ang + (rnd() - 0.5) * 0.52, sl = lat + (rnd() - 0.5) * 0.3;
      const sd = dist + 0.08 + rnd() * 0.18;
      const sp = onSphere(sa, sl, sd);
      const sub = add(sp[0], sp[1], sp[2], 3.2, ci, "sub");
      subIds.push(sub);
      link(sub, hub);
      if (s > 0 && rnd() < 0.7) link(sub, subIds[s - 1]);
      const fan = Math.floor((leaves * 7.4) / subs);
      const spread = 0.17 + rnd() * 0.2;
      let prev = -1;
      for (let l = 0; l < fan; l++){
        const la = sa + (rnd() - 0.5) * spread * 2 + (rnd() - 0.5) * 0.06;
        const ll = sl + (rnd() - 0.5) * spread * 1.1;
        const ld = sd + 0.03 + Math.pow(rnd(), 0.8) * 0.17;
        const lp = onSphere(la, ll, ld);
        const lg = rnd();
        const leaf = add(lp[0], lp[1], lp[2],
          lg < 0.08 ? 2.8 + rnd() * 1.2 : lg < 0.34 ? 1.8 + rnd() * 0.6 : 1.0 + rnd() * 0.7, ci, "leaf");
        link(leaf, sub);
        mine.push(leaf);
        if (rnd() < 0.14) link(leaf, hub);
        if (prev >= 0 && rnd() < 0.34) link(leaf, prev);
        if (rnd() < 0.16) link(leaf, midIds[Math.floor(rnd() * midIds.length)]);
        prev = leaf;
      }
    }
  });
  // far satellites hanging off the outer leaves
  CLUSTERS.forEach((c, ci) => {
    const [, , ang, dist] = c;
    for (let s = 0; s < 7; s++){
      const sa = ang + (rnd() - 0.5) * 1.5, sl = (rnd() - 0.5) * 1.3;
      const sd = dist + 0.42 + rnd() * 0.22;
      const ap = onSphere(sa, sl, sd);
      const anchor = add(ap[0], ap[1], ap[2], 2.4, ci, "sub");
      link(anchor, hubs[ci]);
      const n = 14 + Math.floor(rnd() * 18);
      for (let l = 0; l < n; l++){
        const la = sa + (rnd() - 0.5) * 0.9, ll = sl + (rnd() - 0.5) * 0.7;
        const ld = sd + 0.02 + Math.pow(rnd(), 0.8) * 0.18;
        const p = onSphere(la, ll, ld);
        const leaf = add(p[0], p[1], p[2], 0.8 + rnd() * 0.9, ci, "leaf");
        link(leaf, anchor);
        clusterLeaves[ci].push(leaf);
      }
    }
  });

  // two hub rings and long chords across the sphere
  hubs.forEach((h, i) => {
    link(h, hubs[(i + 1) % hubs.length]);
    link(h, hubs[(i + 2) % hubs.length]);
    if (i % 3 === 0) link(h, hubs[(i + 4) % hubs.length]);
  });
  // neighbouring clusters share records, so their leaves cross-link
  for (let ci = 0; ci < clusterLeaves.length; ci++){
    const a = clusterLeaves[ci], b = clusterLeaves[(ci + 1) % clusterLeaves.length];
    const n = 26 + Math.floor(rnd() * 16);
    for (let k = 0; k < n; k++){
      link(a[Math.floor(rnd() * a.length)], b[Math.floor(rnd() * b.length)]);
    }
    // and a good number reach right across to the far side
    for (let k = 0; k < 12; k++){
      const far = clusterLeaves[(ci + 3) % clusterLeaves.length];
      link(a[Math.floor(rnd() * a.length)], far[Math.floor(rnd() * far.length)]);
    }
    for (let k = 0; k < 8; k++){
      const far = clusterLeaves[(ci + 4) % clusterLeaves.length];
      link(a[Math.floor(rnd() * a.length)], far[Math.floor(rnd() * far.length)]);
    }
  }

  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, minZ = 1e9, maxZ = -1e9;
  for (const n of nodes){
    if (n.x < minX) minX = n.x; if (n.x > maxX) maxX = n.x;
    if (n.y < minY) minY = n.y; if (n.y > maxY) maxY = n.y;
    if (n.z < minZ) minZ = n.z; if (n.z > maxZ) maxZ = n.z;
  }
  const bounds = {minX, maxX, minY, maxY, cx:(minX + maxX) / 2, cy:(minY + maxY) / 2,
    cz:(minZ + maxZ) / 2, w:maxX - minX, h:maxY - minY, d:maxZ - minZ,
    radius: Math.max(maxX - minX, maxY - minY, maxZ - minZ) / 2,
    reach: nodes.reduce((m, n) => Math.max(m, Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z)), 0)};
  return {nodes, edges, adj, hubs, coreIds, bounds};
}

export {
  INK,
  BODY,
  DIM,
  FAINT,
  LIME,
  GREEN,
  AMBER,
  RED,
  NEUTRAL,
  MONO,
  ICONS,
  REC_SECTIONS,
  CONTACTS,
  FILE_TREE,
  ONTO_NODES,
  ONTO_EDGES,
  REC_TEMPLATES,
  REC_TEMPLATE_CATS,
  PEOPLE,
  ROLE_LEVELS,
  PERM_KEYS,
  GRANT_DEFS,
  ROLE_SCOPES,
  DEFAULT_PERMS,
  INTEGRATIONS,
  BG_DEFS,
  THEMES,
  ADMIN_ICONS,
  ADMIN_CARDS,
  ADMIN_GROUPS,
  SRC_TINT,
  SRC_ABBR,
  DATA_EVENTS,
  PEOPLE_EVENTS,
  AI_EVENTS,
  STREAM_DEFS,
  NAV,
  ITEMS,
  ORDER,
  ANSWERS,
  synthesizeCustomArea,
  pickAnswer,
  ORGS,
  TEAMS,
  LOCATIONS,
  AGENT_DEFS,
  KPI_DEFS,
  ASPECT_DEFS,
  FILTER_GROUPS,
  OPS_DEFS,
  OPS_FILTERS,
  WORK_SECTIONS,
  WORK_TASKS,
  WORKFLOWS,
  SCHEDULES,
  WIDGET_DEFS,
  WORK_WIDGETS,
  PERSONALITIES,
  ANSWER_STYLES,
  CONTEXT_DEFS,
  CONTEXT_SOURCES,
  SKILL_DEFS,
  TRAIN_PHASES,
  BRIEF_QUESTIONS,
  STATE_LABELS,
  FACE_SHAPES,
  FACE_TINTS,
  CLUSTERS,
  mulberry,
  _hexCache,
  hexRGB,
  buildGraph
};
