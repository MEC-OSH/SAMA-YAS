const translations={
en:{home:"Home",about:"About OSH",performance:"Performance",reports:"Safety Reports",documents:"OSH Documents",trainingVideos:"Training Awareness Videos",trainingVideosTitle:"Watch, learn and work safely",news:"News",gallery:"Gallery",emergency:"Emergency",contact:"Contact",adminLogin:"Admin Login",heroTitle:"Building Safely. Protecting Every Life.",heroSub:"MEC OSH Department, Sama Yas Residential Development",aboutTitle:"A prevention-led safety culture",mission:"Mission",missionText:"To protect every person involved in the Sama Yas Residential Development through proactive risk management, competent supervision, effective consultation and strict compliance with ALDAR OSHMS, ADOSH-SF and UAE legal requirements.",vision:"Vision",visionText:"To achieve Zero Harm by creating a workplace where safe decisions are embedded in every activity, every day and at every level.",objectives:"Objectives",objectivesText:"Prevent injuries and occupational illness, maintain legal compliance, strengthen workforce competence, close findings promptly, improve contractor performance and continuously enhance the OSH management system.",roles:"Roles & Responsibilities",rolesText:"The OSH Department plans, advises, inspects, trains, monitors and reports. Management provides resources, supervisors enforce controls, and every worker has the authority and duty to stop unsafe work.",livePerformance:"Live cumulative OSH performance",manpower:"Total Manpower",manhours:"Man-Hours",liveCounter:"Live UAE working-time counter",ltiDays:"LTI-Free Days",trainingSessions:"Training Sessions",personnelTrained:"Personnel Trained",trainingHours:"Training Hours",inductions:"OSH Inductions",meetings:"OSH Meetings",audits:"OSH Audits",inspections:"OSH Inspections",reviews:"Procedure Reviews",drills:"Emergency Drills",reportTrend:"Safety observation trend analysis",unsafeActs:"Unsafe Acts",unsafeConditions:"Unsafe Conditions",goodPractices:"Good Practices",reportConcern:"Report a Safety Concern",whatsappConcern:"Report a Safety Concern on WhatsApp",category:"Category",trackReport:"Track a Report",library:"Public document library",newsTitle:"OSH news and announcements",galleryTitle:"OSH photo gallery",emergencyTitle:"Emergency information"},
ar:{home:"الرئيسية",about:"عن السلامة والصحة المهنية",performance:"الأداء",reports:"تقارير السلامة",documents:"وثائق السلامة",trainingVideos:"فيديوهات التدريب والتوعية",trainingVideosTitle:"شاهد وتعلم واعمل بأمان",news:"الأخبار",gallery:"المعرض",emergency:"الطوارئ",contact:"اتصل بنا",adminLogin:"دخول المسؤول",heroTitle:"نبني بأمان. نحمي كل حياة.",heroSub:"قسم السلامة والصحة المهنية في مشروع سما ياس السكني",aboutTitle:"ثقافة سلامة قائمة على الوقاية",mission:"الرسالة",missionText:"حماية جميع العاملين في مشروع سما ياس من خلال الإدارة الاستباقية للمخاطر والإشراف الفعّال والالتزام بمتطلبات الدار وADOSH والقوانين الإماراتية.",vision:"الرؤية",visionText:"تحقيق هدف صفر ضرر من خلال ترسيخ القرارات الآمنة في كل نشاط وكل يوم وعلى جميع المستويات.",objectives:"الأهداف",objectivesText:"منع الإصابات والأمراض المهنية وتعزيز الكفاءة وإغلاق الملاحظات وتحسين أداء المقاولين والتطوير المستمر لنظام السلامة.",roles:"الأدوار والمسؤوليات",rolesText:"يقوم قسم السلامة بالتخطيط والمشورة والتفتيش والتدريب والمتابعة والتقارير، وتوفر الإدارة الموارد ويطبق المشرفون الضوابط ويحق لكل عامل إيقاف العمل غير الآمن.",livePerformance:"الأداء التراكمي المباشر",manpower:"إجمالي القوى العاملة",manhours:"ساعات العمل",liveCounter:"عداد مباشر وفق وقت العمل في الإمارات",ltiDays:"أيام بدون إصابة مضيعة للوقت",trainingSessions:"جلسات التدريب",personnelTrained:"الأشخاص المدربون",trainingHours:"ساعات التدريب",inductions:"تعريف السلامة",meetings:"اجتماعات السلامة",audits:"تدقيقات السلامة",inspections:"تفتيشات السلامة",reviews:"مراجعات الإجراءات",drills:"تمارين الطوارئ",reportTrend:"تحليل اتجاه ملاحظات السلامة",unsafeActs:"الأفعال غير الآمنة",unsafeConditions:"الظروف غير الآمنة",goodPractices:"الممارسات الجيدة",reportConcern:"الإبلاغ عن ملاحظة سلامة",whatsappConcern:"الإبلاغ عبر واتساب",category:"الفئة",trackReport:"تتبع التقرير",library:"مكتبة الوثائق العامة",newsTitle:"أخبار وإعلانات السلامة",galleryTitle:"معرض صور السلامة",emergencyTitle:"معلومات الطوارئ"}};
let lang="en";
document.getElementById("langBtn").addEventListener("click",()=>{lang=lang==="en"?"ar":"en";document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.getElementById("langBtn").textContent=lang==="en"?"العربية":"English";document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.textContent=translations[lang][k]})});

const menuButton=document.querySelector(".menu-btn");
const menuLinks=document.querySelector(".links");
const drawerClose=document.querySelector(".drawer-close");
const menuBackdrop=document.querySelector(".menu-backdrop");

function setMainMenu(open){
  menuLinks?.classList.toggle("open",open);
  document.body.classList.toggle("menu-open",open);
  menuButton?.setAttribute("aria-expanded",String(open));
  if(menuBackdrop) menuBackdrop.hidden=!open;
}

menuButton?.addEventListener("click",()=>{
  setMainMenu(!menuLinks?.classList.contains("open"));
});
drawerClose?.addEventListener("click",()=>setMainMenu(false));
menuBackdrop?.addEventListener("click",()=>setMainMenu(false));

document.querySelectorAll(".links a").forEach(link=>{
  link.addEventListener("click",()=>setMainMenu(false));
});

document.getElementById("langBtn")?.addEventListener("click",()=>{
  setMainMenu(false);
});

document.getElementById("headerOpenReport")?.addEventListener("click",()=>{
  setMainMenu(false);
});

document.addEventListener("keydown",event=>{
  if(event.key==="Escape") setMainMenu(false);
});



const db = window.mecSupabase;

const DEFAULT_ADMIN_EMAIL = "muhammed.shamil@mecemirates.com";

function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g, character => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  })[character]);
}


let performance = {
  manpower: 1500,
  baseline_manhours: 2568386,
  baseline_at: "2026-07-23T17:00:00+04:00",
  last_lti_date: "2026-05-11",
  work_start: "08:00",
  lunch_start: "13:00",
  lunch_end: "14:00",
  work_end: "17:00",
  counter_paused: false,
  manhour_adjustment: 0
};
let holidays = new Set();
let remoteDocuments = [];

const reportCategories = [
  "Housekeeping & General Workplace Amenities","Traffic Management & Logistics","Working at Height",
  "Scaffolding/Ladder","Personal Protective Equipment","Electrical Safety","Hand Tools","Excavations",
  "Lifting Equipment and Lifting Accessories","Portable Power Tools","Plant and Equipment","Confined Space",
  "Hot Work Operations","Compressed Air and Gases","Manual Handling","Welfare Facilities","Hazardous Substances",
  "Machine Guarding","Storage Arrangements","Barricading of Hazards","Access and Egress","Permit to Work",
  "Safety Signage & Signals","Falsework/Formwork","Waste Management","First Aid Case","Near Miss Incident",
  "Property Damage","Lost Time Injury"
];
const catSelect = document.getElementById("reportCategory");
if (catSelect) reportCategories.forEach(name => catSelect.add(new Option(name, name)));

const placeholderDocs = [
  {category:"OSH Plan",title_en:"Project Occupational Safety and Health Plan"},
  {category:"Procedure",title_en:"Emergency Response Procedure"},
  {category:"MSRA",title_en:"Work at Height MSRA"},
  {category:"Legal Register",title_en:"UAE OSH Legal Register"},
  {category:"Risk Register",title_en:"Project Risk Register"},
  {category:"OSH Policy",title_en:"MEC Occupational Safety and Health Policy"},
  {category:"OSH Campaign",title_en:"Beat the Heat Campaign Pack"},
  {category:"Training",title_en:"Work at Height Training Presentation"},
  {category:"Organization Chart",title_en:"Project OSH Organization Chart"},
  {category:"Signages",title_en:"Mandatory PPE Signage Pack"},
  {category:"Forms",title_en:"Incident Notification Form"},
  {category:"Checklist",title_en:"Scaffold Inspection Checklist"}
];

function setText(id, value, decimals = false) {
  const el = document.getElementById(id);
  if (!el || value === null || value === undefined) return;
  const n = Number(value);
  el.textContent = Number.isFinite(n)
    ? n.toLocaleString("en-US", decimals ? {minimumFractionDigits:2, maximumFractionDigits:2} : {maximumFractionDigits:0})
    : value;
}

function uaeDateParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone:"Asia/Dubai", year:"numeric", month:"2-digit", day:"2-digit",
    hour:"2-digit", minute:"2-digit", second:"2-digit", hourCycle:"h23", weekday:"short"
  }).formatToParts(date);
  return Object.fromEntries(parts.map(p => [p.type,p.value]));
}

function minutesFromTime(value, fallback) {
  const match = String(value || fallback).match(/^(\d{1,2}):(\d{2})/);
  return match ? Number(match[1])*60 + Number(match[2]) : 0;
}

function workingSecondsBetween(start, end) {
  if (end <= start || performance.counter_paused) return 0;
  let total = 0;
  let cursor = new Date(start);
  cursor.setUTCHours(20,0,0,0); // UAE midnight
  const start1=minutesFromTime(performance.work_start,"08:00");
  const end1=minutesFromTime(performance.lunch_start,"13:00");
  const start2=minutesFromTime(performance.lunch_end,"14:00");
  const end2=minutesFromTime(performance.work_end,"17:00");
  while (cursor < end) {
    const p=uaeDateParts(cursor);
    const dateKey=`${p.year}-${p.month}-${p.day}`;
    const dayIndex={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[p.weekday];
    if (dayIndex>=1 && dayIndex<=6 && !holidays.has(dateKey)) {
      for (const [a,b] of [[start1,end1],[start2,end2]]) {
        const dayStart=Date.UTC(Number(p.year),Number(p.month)-1,Number(p.day),0,0,0)-4*3600000;
        const s=dayStart+a*60000, e=dayStart+b*60000;
        const lo=Math.max(start.getTime(),s), hi=Math.min(end.getTime(),e);
        if (hi>lo) total+=(hi-lo)/1000;
      }
    }
    cursor=new Date(cursor.getTime()+86400000);
  }
  return total;
}

function updateCounters() {
  const baselineDate=new Date(performance.baseline_at);
  const seconds=workingSecondsBetween(baselineDate,new Date());
  const value=Number(performance.baseline_manhours)+(seconds/3600)*Number(performance.manpower)+Number(performance.manhour_adjustment||0);
  setText("manhours",Math.floor(value));
  const start=new Date(`${performance.last_lti_date}T00:00:00+04:00`);
  const startNext=new Date(start.getTime()+86400000);
  const todayParts=uaeDateParts(new Date());
  const todayUaeMidnight=new Date(`${todayParts.year}-${todayParts.month}-${todayParts.day}T00:00:00+04:00`);
  const days=Math.max(0,Math.floor((todayUaeMidnight-startNext)/86400000)+1);
  setText("ltiDays",days);
}

async function loadLiveSettings() {
  try {
    const [{data:row,error},{data:holidayRows}] = await Promise.all([
      db.from("settings").select("*").eq("id",1).maybeSingle(),
      db.from("holidays").select("holiday_date").eq("active",true)
    ]);
    if (error) throw error;
    if (row) performance={...performance,...row};
    holidays=new Set((holidayRows||[]).map(x=>x.holiday_date));
    setText("manpower",performance.manpower);
    setText("trainingSessions",performance.training_sessions);
    setText("personnelTrained",performance.personnel_trained);
    setText("trainingHours",performance.training_hours,true);
    setText("oshInductions",performance.osh_inductions);
    setText("oshMeetings",performance.osh_meetings);
    setText("oshAudits",performance.osh_audits);
    setText("oshInspections",performance.osh_inspections);
    setText("procedureReviews",performance.procedure_reviews);
    setText("emergencyDrills",performance.emergency_drills);
    updateCounters();
  } catch (error) {
    console.warn("Using built-in performance values:", error.message);
    updateCounters();
  }
}
setInterval(updateCounters,1000);

const docGrid=document.getElementById("documentGrid");
const docFilter=document.getElementById("docFilter");
function documentTitle(d){ return lang==="ar" && d.title_ar ? d.title_ar : d.title_en; }
function renderDocuments(){
  if(!docGrid || !docFilter) return;
  const q=(document.getElementById("docSearch")?.value||"").toLowerCase();
  const f=docFilter.value;
  const source=remoteDocuments.length?remoteDocuments:placeholderDocs;
  docGrid.innerHTML="";
  source.filter(d=>(f==="all"||d.category===f)&&documentTitle(d).toLowerCase().includes(q)).forEach(d=>{
    const title=documentTitle(d);
    const el=document.createElement("article");
    el.className="doc-card";
    el.dataset.liveDocumentCategory=d.category||"";
    const canOpen=Boolean(d.preview_url||d.file_url);
    el.innerHTML=`<span class="tag">${d.category}</span><h3>${title}</h3><div class="doc-actions"><button ${canOpen?"":"disabled"} data-view-url="${d.preview_url||d.file_url||""}" data-view-title="${title}">View</button><a class="${d.file_url?"":"disabled-link"}" href="${d.file_url||"#"}" ${d.file_url?'target="_blank" rel="noopener" download':''}>Download</a></div>`;
    docGrid.appendChild(el);
  });
  document.querySelectorAll("[data-view-url]").forEach(b=>b.addEventListener("click",()=>{
    const frame=document.getElementById("documentViewerFrame");
    document.getElementById("viewerTitle").textContent=b.dataset.viewTitle;
    frame.src=b.dataset.viewUrl;
    document.getElementById("viewer").classList.add("open");
  }));
}
async function loadDocuments(){
  try{
    const {data,error}=await db.from("documents").select("*").order("created_at",{ascending:false});
    if(error) throw error; remoteDocuments=data||[];
  }catch(error){ console.warn("Documents not loaded:",error.message); }
  const cats=[...new Set((remoteDocuments.length?remoteDocuments:placeholderDocs).map(d=>d.category))];
  if(docFilter){docFilter.innerHTML='<option value="all">All sections</option>';cats.forEach(x=>docFilter.add(new Option(x,x)));}
  renderDocuments();
}
document.getElementById("docSearch")?.addEventListener("input",renderDocuments);
docFilter?.addEventListener("change",renderDocuments);
document.querySelector(".viewer-close")?.addEventListener("click",()=>{document.getElementById("viewer").classList.remove("open");document.getElementById("documentViewerFrame").src="";});


document.querySelectorAll(".document-filter-button").forEach(button=>{
  button.addEventListener("click",()=>{
    const category=button.dataset.documentCategory;
    document.querySelectorAll("[data-live-document-category]").forEach(card=>{
      card.hidden=category && card.dataset.liveDocumentCategory!==category;
    });
    document.getElementById("liveDocuments")?.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

async function loadNews(){
  const grid=document.getElementById("newsGrid"); if(!grid) return;
  try{
    const {data,error}=await db.from("news").select("*").eq("published",true).order("pinned",{ascending:false}).order("created_at",{ascending:false});
    if(error) throw error; if(!data?.length) return;
    grid.innerHTML="";
    data.forEach(n=>{
      const title=lang==="ar"&&n.title_ar?n.title_ar:n.title_en;
      const summary=lang==="ar"&&n.summary_ar?n.summary_ar:n.summary_en;
      const article=document.createElement("article");
      article.innerHTML=`${n.image_url?`<img class="news-image" src="${n.image_url}" alt="${title}">`:""}<span>${n.pinned?"Pinned":"OSH News"}</span><h3>${title}</h3><p>${summary||""}</p>${n.attachment_url?`<a href="${n.attachment_url}" target="_blank" rel="noopener">Open attachment</a>`:""}`;
      grid.appendChild(article);
    });
  }catch(error){console.warn("News not loaded:",error.message);}
}

function safeFileName(name){return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-");}
function uniqueReference(prefix){return `${prefix}-${new Date().toISOString().slice(2,10).replaceAll("-","")}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;}

const reportModal=document.getElementById("reportModal");
document.getElementById("openReport")?.addEventListener("click",()=>reportModal.classList.add("open"));
document.querySelector(".modal-close")?.addEventListener("click",()=>reportModal.classList.remove("open"));



const safetyTrendBaseline = [
  {category:"Housekeeping & General Workplace Amenities",unsafe_act_count:3,unsafe_condition_count:55,open_count:0,closed_count:0},
  {category:"Traffic Management & Logistics",unsafe_act_count:0,unsafe_condition_count:9,open_count:0,closed_count:0},
  {category:"Working at Height",unsafe_act_count:2,unsafe_condition_count:34,open_count:0,closed_count:0},
  {category:"Scaffolding/Ladder",unsafe_act_count:6,unsafe_condition_count:48,open_count:0,closed_count:0},
  {category:"Personal Protective Equipment",unsafe_act_count:9,unsafe_condition_count:2,open_count:0,closed_count:0},
  {category:"Electrical Safety",unsafe_act_count:1,unsafe_condition_count:21,open_count:0,closed_count:0},
  {category:"Hand Tools",unsafe_act_count:5,unsafe_condition_count:6,open_count:0,closed_count:0},
  {category:"Excavations",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0},
  {category:"Lifting Equipment and Lifting Accessories",unsafe_act_count:0,unsafe_condition_count:7,open_count:0,closed_count:0},
  {category:"Portable Power Tools",unsafe_act_count:3,unsafe_condition_count:20,open_count:0,closed_count:0},
  {category:"Plant and Equipment",unsafe_act_count:1,unsafe_condition_count:7,open_count:0,closed_count:0},
  {category:"Confined Space",unsafe_act_count:0,unsafe_condition_count:2,open_count:0,closed_count:0},
  {category:"Hot Work Operations",unsafe_act_count:0,unsafe_condition_count:9,open_count:0,closed_count:0},
  {category:"Compressed Air and Gases",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0},
  {category:"Manual Handling",unsafe_act_count:2,unsafe_condition_count:2,open_count:0,closed_count:0},
  {category:"Welfare Facilities",unsafe_act_count:0,unsafe_condition_count:11,open_count:0,closed_count:0},
  {category:"Hazardous Substances",unsafe_act_count:0,unsafe_condition_count:4,open_count:0,closed_count:0},
  {category:"Machine Guarding",unsafe_act_count:0,unsafe_condition_count:8,open_count:0,closed_count:0},
  {category:"Storage Arrangements",unsafe_act_count:2,unsafe_condition_count:17,open_count:0,closed_count:0},
  {category:"Barricading of Hazards",unsafe_act_count:6,unsafe_condition_count:23,open_count:0,closed_count:0},
  {category:"Access and Egress",unsafe_act_count:2,unsafe_condition_count:13,open_count:0,closed_count:0},
  {category:"Permit to Work",unsafe_act_count:0,unsafe_condition_count:4,open_count:0,closed_count:0},
  {category:"Safety Signage & Signals",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0},
  {category:"Falsework/Formwork",unsafe_act_count:1,unsafe_condition_count:15,open_count:0,closed_count:0},
  {category:"Waste Management",unsafe_act_count:0,unsafe_condition_count:10,open_count:0,closed_count:0},
  {category:"First Aid Case",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0},
  {category:"Near Miss Incident",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0},
  {category:"Property Damage",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0},
  {category:"Lost Time Injury",unsafe_act_count:0,unsafe_condition_count:0,open_count:0,closed_count:0}
];

function trendNumber(value){
  const number=Number(value);
  return Number.isFinite(number)?number:0;
}

function niceTrendMaximum(rows,fields){
  const largest=Math.max(1,...rows.flatMap(row=>fields.map(field=>trendNumber(row[field]))));
  const interval=largest<=10?2:largest<=30?5:10;
  return Math.ceil(largest/interval)*interval;
}

function renderGroupedTrendChart(containerId,rows,series){
  const container=document.getElementById(containerId);
  if(!container) return;

  const width=Math.max(1280,rows.length*62+120);
  const height=510;
  const margin={top:46,right:28,bottom:190,left:58};
  const chartWidth=width-margin.left-margin.right;
  const chartHeight=height-margin.top-margin.bottom;
  const max=niceTrendMaximum(rows,series.map(item=>item.field));
  const tickCount=6;
  const categoryWidth=chartWidth/rows.length;
  const barWidth=Math.min(18,Math.max(10,categoryWidth*.27));
  const gap=4;

  const grid=Array.from({length:tickCount+1},(_,index)=>{
    const value=Math.round(max*index/tickCount);
    const y=margin.top+chartHeight-(value/max)*chartHeight;
    return `<line x1="${margin.left}" y1="${y}" x2="${width-margin.right}" y2="${y}" class="trend-grid-line"/>
      <text x="${margin.left-10}" y="${y+4}" text-anchor="end" class="trend-axis-number">${value}</text>`;
  }).join("");

  const bars=rows.map((row,index)=>{
    const center=margin.left+categoryWidth*index+categoryWidth/2;
    const totalBars=series.length*barWidth+(series.length-1)*gap;
    const start=center-totalBars/2;

    const rowBars=series.map((item,seriesIndex)=>{
      const value=trendNumber(row[item.field]);
      const barHeight=max?value/max*chartHeight:0;
      const x=start+seriesIndex*(barWidth+gap);
      const y=margin.top+chartHeight-barHeight;
      const labelY=Math.max(margin.top+12,y-6);
      return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="1" fill="${item.color}">
                <title>${escapeHtml(row.category)}: ${escapeHtml(item.label)} ${value}</title>
              </rect>
              <text x="${x+barWidth/2}" y="${labelY}" text-anchor="middle" class="trend-value-label">${value}</text>`;
    }).join("");

    const labelX=center+4;
    const labelY=margin.top+chartHeight+14;
    return `${rowBars}
      <text x="${labelX}" y="${labelY}" transform="rotate(90 ${labelX} ${labelY})" class="trend-category-label">${escapeHtml(row.category)}</text>`;
  }).join("");

  container.innerHTML=`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="${width}" height="${height}" fill="#fff"/>
    ${grid}
    <line x1="${margin.left}" y1="${margin.top+chartHeight}" x2="${width-margin.right}" y2="${margin.top+chartHeight}" class="trend-axis-line"/>
    ${bars}
  </svg>`;
}

function updateTrendSummary(rows){
  const totals=rows.reduce((sum,row)=>({
    unsafeActs:sum.unsafeActs+trendNumber(row.unsafe_act_count),
    unsafeConditions:sum.unsafeConditions+trendNumber(row.unsafe_condition_count),
    open:sum.open+trendNumber(row.open_count),
    closed:sum.closed+trendNumber(row.closed_count)
  }),{unsafeActs:0,unsafeConditions:0,open:0,closed:0});

  setText("trendUnsafeActs",totals.unsafeActs);
  setText("trendUnsafeConditions",totals.unsafeConditions);
  setText("trendOpenReports",totals.open);
  setText("trendClosedReports",totals.closed);
}

function renderSafetyTrend(rows){
  updateTrendSummary(rows);
  renderGroupedTrendChart("unsafeConditionTrendChart",rows,[
    {field:"unsafe_act_count",label:"Unsafe Act",color:"#0aa34f"},
    {field:"unsafe_condition_count",label:"Unsafe Condition",color:"#f11212"}
  ]);
  renderGroupedTrendChart("openClosedTrendChart",rows,[
    {field:"open_count",label:"Open",color:"#f59e0b"},
    {field:"closed_count",label:"Closed",color:"#0aa34f"}
  ]);
}

async function loadSafetyTrend(){
  const status=document.getElementById("trendUpdateStatus");
  try{
    const {data,error}=await db.rpc("get_public_safety_trend");
    if(error) throw error;
    const rows=(data&&data.length)?data:safetyTrendBaseline;
    renderSafetyTrend(rows);
    if(status){
      const updated=new Intl.DateTimeFormat("en-GB",{
        timeZone:"Asia/Dubai",hour:"2-digit",minute:"2-digit",second:"2-digit"
      }).format(new Date());
      status.textContent=`Live data updated automatically at ${updated} UAE time`;
    }
  }catch(error){
    renderSafetyTrend(safetyTrendBaseline);
    if(status){
      status.textContent="Showing the current baseline. Run TREND_ANALYSIS_SETUP.sql to activate live automatic updates.";
    }
    console.warn("Safety trend RPC unavailable:",error.message);
  }
}

const cameraPhotoInput=document.getElementById("cameraPhoto");
const galleryPhotoInput=document.getElementById("galleryPhoto");
const reportPhotoPreviewWrap=document.getElementById("reportPhotoPreviewWrap");
const reportPhotoPreview=document.getElementById("reportPhotoPreview");
const removeReportPhotoButton=document.getElementById("removeReportPhoto");
let reportPhotoPreviewUrl=null;

function clearReportPhotoPreview(){
  if(reportPhotoPreviewUrl){
    URL.revokeObjectURL(reportPhotoPreviewUrl);
    reportPhotoPreviewUrl=null;
  }
  if(reportPhotoPreview) reportPhotoPreview.removeAttribute("src");
  reportPhotoPreviewWrap?.classList.add("hidden");
}

function showReportPhotoPreview(file){
  clearReportPhotoPreview();
  if(!(file instanceof File) || !file.size) return;
  reportPhotoPreviewUrl=URL.createObjectURL(file);
  if(reportPhotoPreview) reportPhotoPreview.src=reportPhotoPreviewUrl;
  reportPhotoPreviewWrap?.classList.remove("hidden");
}

cameraPhotoInput?.addEventListener("change",()=>{
  if(cameraPhotoInput.files?.length){
    if(galleryPhotoInput) galleryPhotoInput.value="";
    showReportPhotoPreview(cameraPhotoInput.files[0]);
  }
});

galleryPhotoInput?.addEventListener("change",()=>{
  if(galleryPhotoInput.files?.length){
    if(cameraPhotoInput) cameraPhotoInput.value="";
    showReportPhotoPreview(galleryPhotoInput.files[0]);
  }
});

removeReportPhotoButton?.addEventListener("click",()=>{
  if(cameraPhotoInput) cameraPhotoInput.value="";
  if(galleryPhotoInput) galleryPhotoInput.value="";
  clearReportPhotoPreview();
});

document.getElementById("reportForm")?.addEventListener("submit",async event=>{
  event.preventDefault(); const form=event.currentTarget; const msg=document.getElementById("reportMsg");
  const button=form.querySelector('button[type="submit"]'); button.disabled=true; msg.textContent="Submitting…";
  try{
    const fd=new FormData(form); const ref=uniqueReference("SY"); let photoPath=null;
    const cameraPhoto=document.getElementById("cameraPhoto")?.files?.[0];
    const galleryPhoto=document.getElementById("galleryPhoto")?.files?.[0];
    const photo=cameraPhoto || galleryPhoto;
    if(photo instanceof File && photo.size){
      if(photo.size>50*1024*1024) throw new Error("Photo exceeds the 50 MB limit.");
      photoPath=`${ref}/${Date.now()}-${safeFileName(photo.name)}`;
      const {error:uploadError}=await db.storage.from("report-photos").upload(photoPath,photo,{contentType:photo.type,upsert:false});
      if(uploadError) throw uploadError;
    }
    const payload={reference:ref,report_type:fd.get("type"),category:fd.get("category"),location:fd.get("location"),location_details:fd.get("locationDetails")||null,urgency:fd.get("urgency"),description:fd.get("description"),photo_url:photoPath,status:"New"};
    const {error}=await db.from("safety_reports").insert(payload); if(error) throw error;
    msg.textContent=`Submitted successfully. Reference: ${ref}`; form.reset(); clearReportPhotoPreview(); await loadSafetyTrend();
  }catch(error){msg.textContent=`Submission failed: ${error.message}`;}
  finally{button.disabled=false;}
});

document.getElementById("trackBtn")?.addEventListener("click",async()=>{
  const ref=document.getElementById("trackRef").value.trim(); const result=document.getElementById("trackResult");
  if(!ref){result.textContent="Enter a reference number.";return;} result.textContent="Checking…";
  try{
    const {data,error}=await db.rpc("track_safety_report",{p_reference:ref}); if(error) throw error;
    const row=data?.[0]; result.textContent=row?`Status: ${row.current_status}${row.closure_date?` | Closure date: ${row.closure_date}`:""}`:"Reference not found.";
  }catch(error){result.textContent=`Unable to track report: ${error.message}`;}
});

document.getElementById("contactForm")?.addEventListener("submit",async event=>{
  event.preventDefault(); const form=event.currentTarget; const msg=document.getElementById("contactMsg");
  const button=form.querySelector('button[type="submit"]'); button.disabled=true; msg.textContent="Sending…";
  try{
    const fd=new FormData(form); const ref=uniqueReference("ENQ");
    const payload={reference:ref,name:fd.get("name"),company:fd.get("company")||null,mobile:fd.get("mobile"),email:fd.get("email"),subject:fd.get("subject"),message:fd.get("message"),status:"New"};
    const {error}=await db.from("enquiries").insert(payload); if(error) throw error;
    msg.textContent=`Enquiry received. Reference: ${ref}`; form.reset();
  }catch(error){msg.textContent=`Unable to send enquiry: ${error.message}`;}
  finally{button.disabled=false;}
});



async function loadTrainingVideos(){
  const grid=document.getElementById("trainingVideoGrid");
  if(!grid) return;

  try{
    const {data,error}=await db
      .from("gallery")
      .select("*")
      .eq("gallery_type","Training Awareness Video")
      .order("sort_order",{ascending:true})
      .order("created_at",{ascending:false});

    if(error) throw error;
    if(!data?.length) return;

    grid.innerHTML=data.map(item=>{
      const title=lang==="ar"&&item.title_ar?item.title_ar:item.title_en;
      return `<article class="training-video-card">
        <video controls preload="metadata" playsinline>
          <source src="${escapeHtml(item.image_url)}">
          Your browser does not support embedded video.
        </video>
        <div class="training-video-copy">
          <span>OSH Awareness</span>
          <h3>${escapeHtml(title)}</h3>
        </div>
      </article>`;
    }).join("");
  }catch(error){
    console.warn("Training videos not loaded:",error.message);
  }
}

async function loadGallery(){
  const galleryGrid=document.getElementById("galleryGrid");
  const slideshow=document.querySelector("#gallery .slideshow");
  const awardSlider=document.getElementById("awardSlider");

  if(!galleryGrid || !slideshow || !awardSlider) return;

  try{
    const {data,error}=await db
      .from("gallery")
      .select("*")
      .order("sort_order",{ascending:true})
      .order("created_at",{ascending:false});

    if(error) throw error;
    if(!data?.length) return;

    const photos=data.filter(item=>item.gallery_type==="Photo Gallery");
    const awards=data.filter(item=>item.gallery_type==="Award");

    if(photos.length){
      const photoGroups=[];
      const groupCount=Math.ceil(photos.length/3);

      for(let groupIndex=0;groupIndex<groupCount;groupIndex++){
        const group=[];
        for(let offset=0;offset<3;offset++){
          group.push(photos[(groupIndex*3+offset)%photos.length]);
        }
        photoGroups.push(group);
      }

      slideshow.innerHTML=photoGroups.map((group,index)=>{
        const cards=group.map(item=>{
          const title=lang==="ar"&&item.title_ar?item.title_ar:item.title_en;
          return `<article class="photo-slide-card">
            <img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(title)}" loading="lazy">
            <h3>${escapeHtml(title)}</h3>
          </article>`;
        }).join("");

        return `<div class="photo-group ${index===0?"active":""}">${cards}</div>`;
      }).join("")+
      '<button class="slide-prev" type="button" aria-label="Previous three gallery photos">‹</button>'+
      '<button class="slide-next" type="button" aria-label="Next three gallery photos">›</button>';

      galleryGrid.innerHTML=photos.map(item=>{
        const title=lang==="ar"&&item.title_ar?item.title_ar:item.title_en;
        return `<figure>
          <img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(title)}" loading="lazy">
          <figcaption>${escapeHtml(title)}</figcaption>
        </figure>`;
      }).join("");
    }

    if(awards.length){
      const awardGroups=[];
      const groupCount=Math.ceil(awards.length/3);

      for(let groupIndex=0;groupIndex<groupCount;groupIndex++){
        const group=[];
        for(let offset=0;offset<3;offset++){
          group.push(awards[(groupIndex*3+offset)%awards.length]);
        }
        awardGroups.push(group);
      }

      awardSlider.innerHTML=awardGroups.map((group,index)=>{
        const cards=group.map(item=>{
          const title=lang==="ar"&&item.title_ar?item.title_ar:item.title_en;
          return `<article class="award-card">
            <img class="award-image" src="${escapeHtml(item.image_url)}" alt="${escapeHtml(title)}" loading="lazy">
            <h3>${escapeHtml(title)}</h3>
          </article>`;
        }).join("");

        return `<div class="award-group ${index===0?"active":""}">${cards}</div>`;
      }).join("")+
      '<button class="award-prev" type="button" aria-label="Previous three awards">‹</button>'+
      '<button class="award-next" type="button" aria-label="Next three awards">›</button>';
    }
  }catch(error){
    console.warn("Gallery not loaded:",error.message);
  }
}

function slider(item,prev,next,ms){let idx=0;const items=[...document.querySelectorAll(item)];if(!items.length)return;const show=n=>{items.forEach((x,i)=>x.classList.toggle("active",i===n));idx=n};document.querySelector(prev)?.addEventListener("click",()=>show((idx-1+items.length)%items.length));document.querySelector(next)?.addEventListener("click",()=>show((idx+1)%items.length));setInterval(()=>show((idx+1)%items.length),ms);}



const emergencyCallModal=document.getElementById("emergencyCallModal");
const openEmergencyCallButton=document.getElementById("openEmergencyCall");
const closeEmergencyCallButton=document.getElementById("closeEmergencyCall");

function openEmergencyCallPopup(){
  if(!emergencyCallModal) return;
  emergencyCallModal.hidden=false;
  document.body.classList.add("emergency-popup-open");
  closeEmergencyCallButton?.focus();
}

function closeEmergencyCallPopup(){
  if(!emergencyCallModal) return;
  emergencyCallModal.hidden=true;
  document.body.classList.remove("emergency-popup-open");
  openEmergencyCallButton?.focus();
}

openEmergencyCallButton?.addEventListener("click",openEmergencyCallPopup);
closeEmergencyCallButton?.addEventListener("click",closeEmergencyCallPopup);

document.querySelectorAll("[data-close-emergency]").forEach(element=>{
  element.addEventListener("click",closeEmergencyCallPopup);
});

document.addEventListener("keydown",event=>{
  if(event.key==="Escape" && emergencyCallModal && !emergencyCallModal.hidden){
    closeEmergencyCallPopup();
  }
});

loadLiveSettings();
loadDocuments();
loadNews();
loadTrainingVideos();
loadSafetyTrend();
setInterval(loadSafetyTrend,30000);
loadGallery().finally(()=>{
  slider(".photo-group",".slide-prev",".slide-next",4000);
  slider(".award-group",".award-prev",".award-next",4000);
});

const organizationChartViewer = document.getElementById("organizationChartViewer");
const openOrganizationChart = document.getElementById("openOrganizationChart");
const viewOrganizationChart = document.getElementById("viewOrganizationChart");
const closeOrganizationChart = document.getElementById("closeOrganizationChart");

function showOrganizationChart() {
  if (!organizationChartViewer) return;
  organizationChartViewer.classList.add("open");
  organizationChartViewer.setAttribute("aria-hidden", "false");
}

function hideOrganizationChart() {
  if (!organizationChartViewer) return;
  organizationChartViewer.classList.remove("open");
  organizationChartViewer.setAttribute("aria-hidden", "true");
}

if (openOrganizationChart) openOrganizationChart.addEventListener("click", showOrganizationChart);
if (viewOrganizationChart) viewOrganizationChart.addEventListener("click", showOrganizationChart);
if (closeOrganizationChart) closeOrganizationChart.addEventListener("click", hideOrganizationChart);
if (organizationChartViewer) {
  organizationChartViewer.addEventListener("click", event => {
    if (event.target === organizationChartViewer) hideOrganizationChart();
  });
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideOrganizationChart();
});

const headerOpenReport = document.getElementById("headerOpenReport");
if (headerOpenReport && reportModal) {
  headerOpenReport.addEventListener("click", () => {
    reportModal.classList.add("open");
    reportModal.setAttribute("aria-hidden", "false");
  });
}

const certificateViewer = document.getElementById("certificateViewer");
const certificateViewerImage = document.getElementById("certificateViewerImage");
const certificateViewerTitle = document.getElementById("certificateViewerTitle");
const closeCertificateViewer = document.getElementById("closeCertificateViewer");

document.querySelectorAll(".certificate-image-button").forEach(button => {
  button.addEventListener("click", () => {
    if (!certificateViewer || !certificateViewerImage || !certificateViewerTitle) return;
    certificateViewerImage.src = button.dataset.certificateImage;
    certificateViewerImage.alt = button.dataset.certificateTitle;
    certificateViewerTitle.textContent = button.dataset.certificateTitle;
    certificateViewer.classList.add("open");
    certificateViewer.setAttribute("aria-hidden", "false");
  });
});

function hideCertificateViewer() {
  if (!certificateViewer) return;
  certificateViewer.classList.remove("open");
  certificateViewer.setAttribute("aria-hidden", "true");
}

if (closeCertificateViewer) {
  closeCertificateViewer.addEventListener("click", hideCertificateViewer);
}
if (certificateViewer) {
  certificateViewer.addEventListener("click", event => {
    if (event.target === certificateViewer) hideCertificateViewer();
  });
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideCertificateViewer();
});
