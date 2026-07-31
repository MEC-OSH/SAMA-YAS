const translations={
en:{home:"Home",about:"About OSH",performance:"Performance",reports:"Safety Reports",documents:"OSH Documents",trainingVideos:"Training Awareness Videos",trainingVideosTitle:"Watch, learn and work safely",news:"News",gallery:"Gallery",emergency:"Emergency",contact:"Contact",adminLogin:"Admin Login",heroTitle:"Building Safely. Protecting Every Life.",heroSub:"MEC OSH Department, Sama Yas Residential Development",aboutTitle:"A prevention-led safety culture",mission:"Mission",missionText:"To protect every person involved in the Sama Yas Residential Development through proactive risk management, competent supervision, effective consultation and strict compliance with ALDAR OSHMS, ADOSH-SF and UAE legal requirements.",vision:"Vision",visionText:"To achieve Zero Harm by creating a workplace where safe decisions are embedded in every activity, every day and at every level.",objectives:"Objectives",objectivesText:"Prevent injuries and occupational illness, maintain legal compliance, strengthen workforce competence, close findings promptly, improve contractor performance and continuously enhance the OSH management system.",roles:"Roles & Responsibilities",rolesText:"The OSH Department plans, advises, inspects, trains, monitors and reports. Management provides resources, supervisors enforce controls, and every worker has the authority and duty to stop unsafe work.",livePerformance:"Live cumulative OSH performance",manpower:"Total Manpower",manhours:"Man-Hours",liveCounter:"Live UAE working-time counter",ltiDays:"LTI-Free Days",trainingSessions:"Training Sessions",personnelTrained:"Personnel Trained",trainingHours:"Training Hours",inductions:"OSH Inductions",meetings:"OSH Meetings",audits:"OSH Audits",inspections:"OSH Inspections",reviews:"Procedure Reviews",drills:"Emergency Drills",reportTrend:"Safety observation trend analysis",unsafeActs:"Unsafe Acts",unsafeConditions:"Unsafe Conditions",goodPractices:"Good Practices",reportConcern:"Report a Safety Concern",whatsappConcern:"Report a Safety Concern on WhatsApp",category:"Category",trackReport:"Track a Report",library:"Public document library",newsTitle:"OSH news and announcements",galleryTitle:"OSH Gallery",emergencyTitle:"Emergency information"},
ar:{home:"الرئيسية",about:"عن السلامة والصحة المهنية",performance:"الأداء",reports:"تقارير السلامة",documents:"وثائق السلامة",trainingVideos:"فيديوهات التدريب والتوعية",trainingVideosTitle:"شاهد وتعلم واعمل بأمان",news:"الأخبار",gallery:"المعرض",emergency:"الطوارئ",contact:"اتصل بنا",adminLogin:"دخول المسؤول",heroTitle:"نبني بأمان. نحمي كل حياة.",heroSub:"قسم السلامة والصحة المهنية في مشروع سما ياس السكني",aboutTitle:"ثقافة سلامة قائمة على الوقاية",mission:"الرسالة",missionText:"حماية جميع العاملين في مشروع سما ياس من خلال الإدارة الاستباقية للمخاطر والإشراف الفعّال والالتزام بمتطلبات الدار وADOSH والقوانين الإماراتية.",vision:"الرؤية",visionText:"تحقيق هدف صفر ضرر من خلال ترسيخ القرارات الآمنة في كل نشاط وكل يوم وعلى جميع المستويات.",objectives:"الأهداف",objectivesText:"منع الإصابات والأمراض المهنية وتعزيز الكفاءة وإغلاق الملاحظات وتحسين أداء المقاولين والتطوير المستمر لنظام السلامة.",roles:"الأدوار والمسؤوليات",rolesText:"يقوم قسم السلامة بالتخطيط والمشورة والتفتيش والتدريب والمتابعة والتقارير، وتوفر الإدارة الموارد ويطبق المشرفون الضوابط ويحق لكل عامل إيقاف العمل غير الآمن.",livePerformance:"الأداء التراكمي المباشر",manpower:"إجمالي القوى العاملة",manhours:"ساعات العمل",liveCounter:"عداد مباشر وفق وقت العمل في الإمارات",ltiDays:"أيام بدون إصابة مضيعة للوقت",trainingSessions:"جلسات التدريب",personnelTrained:"الأشخاص المدربون",trainingHours:"ساعات التدريب",inductions:"تعريف السلامة",meetings:"اجتماعات السلامة",audits:"تدقيقات السلامة",inspections:"تفتيشات السلامة",reviews:"مراجعات الإجراءات",drills:"تمارين الطوارئ",reportTrend:"تحليل اتجاه ملاحظات السلامة",unsafeActs:"الأفعال غير الآمنة",unsafeConditions:"الظروف غير الآمنة",goodPractices:"الممارسات الجيدة",reportConcern:"الإبلاغ عن ملاحظة سلامة",whatsappConcern:"الإبلاغ عبر واتساب",category:"الفئة",trackReport:"تتبع التقرير",library:"مكتبة الوثائق العامة",newsTitle:"أخبار وإعلانات السلامة",galleryTitle:"معرض صور السلامة",emergencyTitle:"معلومات الطوارئ"}};
let lang=localStorage.getItem("mecLanguage")==="ar"?"ar":"en";


function applyLanguage(){
  const dictionary=translations[lang]||translations.en;

  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.body.classList.toggle("arabic-language",lang==="ar");

  document.querySelectorAll("[data-i18n]").forEach(element=>{
    const key=element.dataset.i18n;
    if(dictionary[key]!==undefined){
      element.textContent=dictionary[key];
    }
  });

  const languageButton=document.getElementById("topLangBtn");
  if(languageButton){
    languageButton.textContent=lang==="en"?"العربية":"English";
    languageButton.setAttribute(
      "aria-label",
      lang==="en"?"Switch website to Arabic":"Switch website to English"
    );
  }

  const menuLanguageButton=document.getElementById("langBtn");
  if(menuLanguageButton){
    menuLanguageButton.textContent=lang==="en"?"العربية":"English";
  }

  document.title=lang==="ar"
    ?"قسم السلامة والصحة المهنية | مشروع سما ياس"
    :"MEC OSH Department | Sama Yas Residential Development";

  if(typeof renderDocuments==="function"){
    renderDocuments();
  }
  if(typeof loadTeamMembers==="function"){
    loadTeamMembers();
  }
  if(typeof renderContactSettings==="function"){
    renderContactSettings();
  }
}

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


document.getElementById("topLangBtn")?.addEventListener("click",()=>{
  lang=lang==="en"?"ar":"en";
  localStorage.setItem("mecLanguage",lang);
  applyLanguage();
});

document.getElementById("topOpenReport")?.addEventListener("click",()=>{
  const modal=document.getElementById("reportModal");
  if(modal){
    modal.classList.add("open");
    modal.removeAttribute("hidden");
  }
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


const contactFallback={
  name_en:"Muhammed Shamil",
  name_ar:"محمد شامل",
  designation_en:"Sr. OSH Officer",
  designation_ar:"مسؤول أول للسلامة والصحة المهنية",
  project_en:"Sama Yas Residential Development",
  project_ar:"مشروع سما ياس السكني",
  location_en:"Yas Island, Abu Dhabi, UAE",
  location_ar:"جزيرة ياس، أبوظبي، الإمارات العربية المتحدة",
  email:"muhammed.shamil@mecemirates.com",
  phone_label_en:"Admin Shamil:",
  phone_label_ar:"المسؤول شامل:",
  phone:"+971 58 512 5005",
  photo_url:"assets/muhammed-shamil-contact.webp"
};

let contactSettingsData={...contactFallback};

function contactText(englishField,arabicField){
  if(lang==="ar"&&contactSettingsData[arabicField]){
    return contactSettingsData[arabicField];
  }
  return contactSettingsData[englishField]||"";
}

function contactTelephoneLink(number){
  const cleaned=String(number||"").replace(/[^\d+]/g,"");
  return cleaned.startsWith("+")?cleaned:`+${cleaned.replace(/^\+/,"")}`;
}

function renderContactSettings(){
  const name=contactText("name_en","name_ar");
  const designation=contactText("designation_en","designation_ar");
  const project=contactText("project_en","project_ar");
  const location=contactText("location_en","location_ar");
  const phoneLabel=contactText("phone_label_en","phone_label_ar");

  setText("contactName",name);
  setText("contactDesignation",designation);
  setText("contactProject",project);
  setText("contactLocation",location);
  setText("contactPhoneLabel",phoneLabel);

  const photo=document.getElementById("contactPhoto");
  if(photo){
    photo.src=contactSettingsData.photo_url||contactFallback.photo_url;
    photo.alt=`${name}, ${designation}`;
  }

  const email=document.getElementById("contactEmail");
  if(email){
    email.textContent=contactSettingsData.email||contactFallback.email;
    email.href=`mailto:${contactSettingsData.email||contactFallback.email}`;
  }

  const phone=document.getElementById("contactPhone");
  if(phone){
    const display=contactSettingsData.phone||contactFallback.phone;
    phone.textContent=display;
    phone.href=`tel:${contactTelephoneLink(display)}`;
  }
}

async function loadContactSettings(){
  try{
    const {data,error}=await db
      .from("contact_settings")
      .select("*")
      .eq("id",1)
      .maybeSingle();

    if(error)throw error;
    if(data)contactSettingsData={...contactFallback,...data};
  }catch(error){
    console.warn("Using built-in Contact details:",error.message);
  }

  renderContactSettings();
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
{"category": "Housekeeping & General Workplace Amenities", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 36, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 188},
{"category": "Traffic Management & Logistics", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 23, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 51},
{"category": "Working at Height", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 104, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 89},
{"category": "Scaffolding/Ladder", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 111, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 195},
{"category": "Personal Protective Equipment", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 87, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 16},
{"category": "Electrical Safety", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 29, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 49},
{"category": "Hand Tools", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 23, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 25},
{"category": "Excavations", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 4, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 3},
{"category": "Lifting Equipment and Lifting Accessories", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 31, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 45},
{"category": "Portable Power Tools", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 32, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 49},
{"category": "Plant and Equipment", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 20, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 32},
{"category": "Confined Space", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 1, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 8},
{"category": "Hot Work Operations", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 41, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 41},
{"category": "Compressed Air and Gases", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 0, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 9},
{"category": "Manual Handling", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 17, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 9},
{"category": "Welfare Facilities", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 28, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 39},
{"category": "Hazardous Substances", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 0, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 20},
{"category": "Machine Guarding", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 5, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 8},
{"category": "Storage Arrangements", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 22, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 115},
{"category": "Barricading of Hazards", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 62, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 112},
{"category": "Access and Egress", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 56, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 78},
{"category": "Permit to Work", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 20, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 14},
{"category": "Safety Signage & Signals", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 14, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 14},
{"category": "Falsework/Formwork", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 96, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 112},
{"category": "Waste Management", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 15, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 66},
{"category": "First Aid Case", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 4, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 2},
{"category": "Near Miss Incident", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 0, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 0},
{"category": "Property Damage", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 0, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 0},
{"category": "Lost Time Injury", "unsafe_act_open_count": 0, "unsafe_act_closed_count": 0, "unsafe_condition_open_count": 0, "unsafe_condition_closed_count": 1}
];

function trendNumber(value){
  const number=Number(value);
  return Number.isFinite(number)?number:0;
}

function niceTrendMaximum(rows,fields){
  const largest=Math.max(
    1,
    ...rows.flatMap(row=>fields.map(field=>trendNumber(row[field])))
  );
  const interval=largest<=10?2:largest<=30?5:10;
  return Math.ceil(largest/interval)*interval;
}

function renderGroupedTrendChart(containerId,rows,series){
  const container=document.getElementById(containerId);
  if(!container)return;

  const width=Math.max(1500,rows.length*76+130);
  const height=535;
  const margin={top:50,right:28,bottom:195,left:60};
  const chartWidth=width-margin.left-margin.right;
  const chartHeight=height-margin.top-margin.bottom;
  const max=niceTrendMaximum(rows,series.map(item=>item.field));
  const tickCount=6;
  const categoryWidth=chartWidth/rows.length;
  const gap=3;
  const barWidth=Math.min(
    14,
    Math.max(7,(categoryWidth-18-(series.length-1)*gap)/series.length)
  );

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
      const labelY=Math.max(margin.top+12,y-5);

      return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="1" fill="${item.color}">
        <title>${escapeHtml(row.category)}: ${escapeHtml(item.label)} ${value}</title>
      </rect>
      <text x="${x+barWidth/2}" y="${labelY}" text-anchor="middle" class="trend-value-label">${value}</text>`;
    }).join("");

    const labelX=center+4;
    const labelY=margin.top+chartHeight+14;

    return `${rowBars}
      <text x="${labelX}" y="${labelY}"
            transform="rotate(90 ${labelX} ${labelY})"
            class="trend-category-label">${escapeHtml(row.category)}</text>`;
  }).join("");

  container.innerHTML=`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="${width}" height="${height}" fill="#fff"/>
    ${grid}
    <line x1="${margin.left}" y1="${margin.top+chartHeight}"
          x2="${width-margin.right}" y2="${margin.top+chartHeight}"
          class="trend-axis-line"/>
    ${bars}
  </svg>`;
}

function updateTrendSummary(rows){
  const totals=rows.reduce((sum,row)=>({
    uaOpen:sum.uaOpen+trendNumber(row.unsafe_act_open_count),
    uaClosed:sum.uaClosed+trendNumber(row.unsafe_act_closed_count),
    ucOpen:sum.ucOpen+trendNumber(row.unsafe_condition_open_count),
    ucClosed:sum.ucClosed+trendNumber(row.unsafe_condition_closed_count)
  }),{uaOpen:0,uaClosed:0,ucOpen:0,ucClosed:0});

  setText("trendUaOpen",totals.uaOpen);
  setText("trendUaClosed",totals.uaClosed);
  setText("trendUcOpen",totals.ucOpen);
  setText("trendUcClosed",totals.ucClosed);
}

function renderSafetyTrend(rows){
  updateTrendSummary(rows);

  renderGroupedTrendChart("safetyStatusTrendChart",rows,[
    {field:"unsafe_act_open_count",label:"Unsafe Act Open",color:"#f59e0b"},
    {field:"unsafe_act_closed_count",label:"Unsafe Act Closed",color:"#0aa34f"},
    {field:"unsafe_condition_open_count",label:"Unsafe Condition Open",color:"#ef1717"},
    {field:"unsafe_condition_closed_count",label:"Unsafe Condition Closed",color:"#2563eb"}
  ]);
}

async function loadSafetyTrend(){
  const status=document.getElementById("trendUpdateStatus");

  try{
    const {data,error}=await db.rpc("get_public_safety_trend");
    if(error)throw error;

    const requiredFields=[
      "unsafe_act_open_count",
      "unsafe_act_closed_count",
      "unsafe_condition_open_count",
      "unsafe_condition_closed_count"
    ];

    const hasValidFourSeriesData=
      Array.isArray(data) &&
      data.length>0 &&
      data.every(row=>requiredFields.every(field=>Object.prototype.hasOwnProperty.call(row,field)));

    const rows=hasValidFourSeriesData?data:safetyTrendBaseline;
    renderSafetyTrend(rows);

    if(status){
      const updated=new Intl.DateTimeFormat("en-GB",{
        timeZone:"Asia/Dubai",
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
      }).format(new Date());

      status.textContent=`Live data updated automatically at ${updated} UAE time`;
    }
  }catch(error){
    renderSafetyTrend(safetyTrendBaseline);

    if(status){
      status.textContent="Current cumulative trend data displayed.";
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



let teamCarouselIndex=0;
let teamCarouselTimer=null;
let teamCarouselMemberCount=0;
const TEAM_VISIBLE_COUNT=4;
const TEAM_SLIDE_INTERVAL=1000;

function teamDisplayText(member,englishField,arabicField){
  if(lang==="ar"&&member[arabicField])return member[arabicField];
  return member[englishField]||"";
}

function teamCardStep(){
  const track=document.getElementById("teamCarouselTrack");
  const firstCard=track?.querySelector(".team-member-card");
  if(!firstCard)return 0;

  const styles=getComputedStyle(track);
  const gap=parseFloat(styles.columnGap||styles.gap||0);
  return firstCard.getBoundingClientRect().width+gap;
}

function positionTeamCarousel(animate=true){
  const track=document.getElementById("teamCarouselTrack");
  if(!track)return;

  track.style.transition=animate
    ?"transform .55s cubic-bezier(.22,.75,.23,1)"
    :"none";

  track.style.transform=`translateX(-${teamCarouselIndex*teamCardStep()}px)`;

  document.querySelectorAll("#teamCarouselDots button").forEach((button,index)=>{
    const active=index===teamCarouselIndex%Math.max(teamCarouselMemberCount,1);
    button.classList.toggle("active",active);
    button.setAttribute("aria-current",active?"true":"false");
  });
}

function moveTeamCarousel(direction=1){
  if(teamCarouselMemberCount<=TEAM_VISIBLE_COUNT)return;

  teamCarouselIndex+=direction;

  if(direction<0&&teamCarouselIndex<0){
    teamCarouselIndex=teamCarouselMemberCount-1;
    positionTeamCarousel(false);
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        teamCarouselIndex-=1;
        positionTeamCarousel(true);
      });
    });
    return;
  }

  positionTeamCarousel(true);
}

function restartTeamCarousel(){
  clearInterval(teamCarouselTimer);

  if(teamCarouselMemberCount<=TEAM_VISIBLE_COUNT)return;

  teamCarouselTimer=setInterval(()=>{
    moveTeamCarousel(1);
  },TEAM_SLIDE_INTERVAL);
}

function renderTeamMembers(members){
  const carousel=document.getElementById("teamCarousel");
  const track=document.getElementById("teamCarouselTrack");
  const dots=document.getElementById("teamCarouselDots");
  const previous=document.getElementById("teamCarouselPrev");
  const next=document.getElementById("teamCarouselNext");

  if(!carousel||!track||!dots||!previous||!next)return;

  clearInterval(teamCarouselTimer);
  teamCarouselIndex=0;
  teamCarouselMemberCount=members?.length||0;

  if(!teamCarouselMemberCount){
    track.innerHTML=`<div class="team-empty-state">
      <div class="team-empty-icon" aria-hidden="true">👥</div>
      <h3>OSH Team profiles will appear here</h3>
      <p>Add team members through the Admin Dashboard.</p>
    </div>`;

    dots.innerHTML="";
    previous.hidden=true;
    next.hidden=true;
    track.style.transform="translateX(0)";
    return;
  }

  const repeatedMembers=teamCarouselMemberCount>TEAM_VISIBLE_COUNT
    ? [...members,...members.slice(0,TEAM_VISIBLE_COUNT)]
    : members;

  track.innerHTML=repeatedMembers.map((member,index)=>{
    const name=teamDisplayText(member,"name_en","name_ar");
    const designation=teamDisplayText(member,"designation_en","designation_ar");
    const cloneClass=index>=teamCarouselMemberCount?" team-member-clone":"";

    return `<article class="team-member-card${cloneClass}">
      <div class="team-member-card-inner">
        <div class="team-member-photo-wrap">
          <img class="team-member-photo"
               src="${escapeHtml(member.photo_url)}"
               alt="${escapeHtml(name)}"
               loading="lazy">
        </div>
        <div class="team-member-copy">
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(designation)}</p>
        </div>
      </div>
    </article>`;
  }).join("");

  dots.innerHTML=teamCarouselMemberCount>TEAM_VISIBLE_COUNT
    ? members.map((_,index)=>
        `<button type="button"
                 aria-label="Show team member position ${index+1}"
                 class="${index===0?"active":""}"
                 aria-current="${index===0?"true":"false"}"></button>`
      ).join("")
    :"";

  previous.hidden=teamCarouselMemberCount<=TEAM_VISIBLE_COUNT;
  next.hidden=teamCarouselMemberCount<=TEAM_VISIBLE_COUNT;

  previous.onclick=()=>{
    moveTeamCarousel(-1);
    restartTeamCarousel();
  };

  next.onclick=()=>{
    moveTeamCarousel(1);
    restartTeamCarousel();
  };

  dots.querySelectorAll("button").forEach((button,index)=>{
    button.onclick=()=>{
      teamCarouselIndex=index;
      positionTeamCarousel(true);
      restartTeamCarousel();
    };
  });

  track.ontransitionend=()=>{
    if(teamCarouselIndex>=teamCarouselMemberCount){
      teamCarouselIndex=0;
      positionTeamCarousel(false);
    }
  };

  carousel.onmouseenter=()=>clearInterval(teamCarouselTimer);
  carousel.onmouseleave=restartTeamCarousel;
  carousel.onfocusin=()=>clearInterval(teamCarouselTimer);
  carousel.onfocusout=restartTeamCarousel;

  positionTeamCarousel(false);
  restartTeamCarousel();
}

async function loadTeamMembers(){
  try{
    const {data,error}=await db
      .from("team_members")
      .select("*")
      .eq("active",true)
      .order("sort_order",{ascending:true})
      .order("created_at",{ascending:true});

    if(error)throw error;
    renderTeamMembers(data||[]);
  }catch(error){
    console.warn("OSH team profiles not loaded:",error.message);
    renderTeamMembers([]);
  }
}

window.addEventListener("resize",()=>{
  if(teamCarouselMemberCount){
    positionTeamCarousel(false);
  }
});

async function loadGallery(){
  const slideshow=document.querySelector("#gallery .slideshow");
  const awardSlider=document.getElementById("awardSlider");

  if(!slideshow || !awardSlider) return;

  try{
    const {data,error}=await db
      .from("gallery")
      .select("*")
      .order("sort_order",{ascending:true})
      .order("created_at",{ascending:false});

    if(error) throw error;
    if(!data?.length) return;

    const photos=data.filter(item=>
      item.gallery_type==="Photo Gallery" ||
      item.gallery_type==="OSH Gallery Video"
    );
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
          const isVideo=item.gallery_type==="OSH Gallery Video";
          const media=isVideo
            ? `<video class="gallery-slide-video" controls preload="metadata" playsinline>
                 <source src="${escapeHtml(item.image_url)}">
                 Your browser does not support embedded video.
               </video>`
            : `<img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(title)}" loading="lazy">`;

          return `<article class="photo-slide-card ${isVideo?"video-card":""}">
            ${media}
            <h3>${escapeHtml(title)}</h3>
          </article>`;
        }).join("");

        return `<div class="photo-group ${index===0?"active":""}">${cards}</div>`;
      }).join("")+
      '<button class="slide-prev" type="button" aria-label="Previous three gallery photos">‹</button>'+
      '<button class="slide-next" type="button" aria-label="Next three gallery photos">›</button>';
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

function slider(item,prev,next,ms){
  let idx=0;
  const items=[...document.querySelectorAll(item)];
  if(!items.length)return;

  const pauseVideos=container=>{
    container?.querySelectorAll("video").forEach(video=>{
      video.pause();
    });
  };

  const show=n=>{
    items.forEach((element,i)=>{
      if(i!==n)pauseVideos(element);
      element.classList.toggle("active",i===n);
    });
    idx=n;
  };

  document.querySelector(prev)?.addEventListener("click",()=>{
    show((idx-1+items.length)%items.length);
  });

  document.querySelector(next)?.addEventListener("click",()=>{
    show((idx+1)%items.length);
  });

  setInterval(()=>{
    const activeVideo=items[idx]?.querySelector("video:not([paused])");
    const playing=[...(items[idx]?.querySelectorAll("video")||[])]
      .some(video=>!video.paused&&!video.ended);
    if(!playing)show((idx+1)%items.length);
  },ms);
}



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

applyLanguage();
loadContactSettings();
loadLiveSettings();
loadDocuments();
loadNews();
loadTrainingVideos();
loadTeamMembers();
renderSafetyTrend(safetyTrendBaseline);
loadSafetyTrend();
setInterval(loadSafetyTrend,30000);
loadGallery().finally(()=>{
  slider(".photo-group",".slide-prev",".slide-next",4000);
  slider(".award-group",".award-prev",".award-next",4000);
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
