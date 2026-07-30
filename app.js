const translations={
en:{home:"Home",about:"About OSH",performance:"Performance",reports:"Safety Reports",documents:"OSH Documents",news:"News",gallery:"Gallery",emergency:"Emergency",contact:"Contact",adminLogin:"Admin Login",heroTitle:"Building Safely. Protecting Every Life.",heroSub:"MEC OSH Department, Sama Yas Residential Development",aboutTitle:"A prevention-led safety culture",mission:"Mission",missionText:"To protect every person involved in the Sama Yas Residential Development through proactive risk management, competent supervision, effective consultation and strict compliance with ALDAR OSHMS, ADOSH-SF and UAE legal requirements.",vision:"Vision",visionText:"To achieve Zero Harm by creating a workplace where safe decisions are embedded in every activity, every day and at every level.",objectives:"Objectives",objectivesText:"Prevent injuries and occupational illness, maintain legal compliance, strengthen workforce competence, close findings promptly, improve contractor performance and continuously enhance the OSH management system.",roles:"Roles & Responsibilities",rolesText:"The OSH Department plans, advises, inspects, trains, monitors and reports. Management provides resources, supervisors enforce controls, and every worker has the authority and duty to stop unsafe work.",livePerformance:"Live cumulative OSH performance",manpower:"Total Manpower",manhours:"Man-Hours",liveCounter:"Live UAE working-time counter",ltiDays:"LTI-Free Days",trainingSessions:"Training Sessions",personnelTrained:"Personnel Trained",trainingHours:"Training Hours",inductions:"OSH Inductions",meetings:"OSH Meetings",audits:"OSH Audits",inspections:"OSH Inspections",reviews:"Procedure Reviews",drills:"Emergency Drills",reportTrend:"Safety observation trend analysis",unsafeActs:"Unsafe Acts",unsafeConditions:"Unsafe Conditions",goodPractices:"Good Practices",reportConcern:"Report a Safety Concern",whatsappConcern:"Report a Safety Concern on WhatsApp",category:"Category",trackReport:"Track a Report",library:"Public document library",newsTitle:"OSH news and announcements",galleryTitle:"OSH photo gallery",emergencyTitle:"Emergency information"},
ar:{home:"الرئيسية",about:"عن السلامة والصحة المهنية",performance:"الأداء",reports:"تقارير السلامة",documents:"وثائق السلامة",news:"الأخبار",gallery:"المعرض",emergency:"الطوارئ",contact:"اتصل بنا",adminLogin:"دخول المسؤول",heroTitle:"نبني بأمان. نحمي كل حياة.",heroSub:"قسم السلامة والصحة المهنية في مشروع سما ياس السكني",aboutTitle:"ثقافة سلامة قائمة على الوقاية",mission:"الرسالة",missionText:"حماية جميع العاملين في مشروع سما ياس من خلال الإدارة الاستباقية للمخاطر والإشراف الفعّال والالتزام بمتطلبات الدار وADOSH والقوانين الإماراتية.",vision:"الرؤية",visionText:"تحقيق هدف صفر ضرر من خلال ترسيخ القرارات الآمنة في كل نشاط وكل يوم وعلى جميع المستويات.",objectives:"الأهداف",objectivesText:"منع الإصابات والأمراض المهنية وتعزيز الكفاءة وإغلاق الملاحظات وتحسين أداء المقاولين والتطوير المستمر لنظام السلامة.",roles:"الأدوار والمسؤوليات",rolesText:"يقوم قسم السلامة بالتخطيط والمشورة والتفتيش والتدريب والمتابعة والتقارير، وتوفر الإدارة الموارد ويطبق المشرفون الضوابط ويحق لكل عامل إيقاف العمل غير الآمن.",livePerformance:"الأداء التراكمي المباشر",manpower:"إجمالي القوى العاملة",manhours:"ساعات العمل",liveCounter:"عداد مباشر وفق وقت العمل في الإمارات",ltiDays:"أيام بدون إصابة مضيعة للوقت",trainingSessions:"جلسات التدريب",personnelTrained:"الأشخاص المدربون",trainingHours:"ساعات التدريب",inductions:"تعريف السلامة",meetings:"اجتماعات السلامة",audits:"تدقيقات السلامة",inspections:"تفتيشات السلامة",reviews:"مراجعات الإجراءات",drills:"تمارين الطوارئ",reportTrend:"تحليل اتجاه ملاحظات السلامة",unsafeActs:"الأفعال غير الآمنة",unsafeConditions:"الظروف غير الآمنة",goodPractices:"الممارسات الجيدة",reportConcern:"الإبلاغ عن ملاحظة سلامة",whatsappConcern:"الإبلاغ عبر واتساب",category:"الفئة",trackReport:"تتبع التقرير",library:"مكتبة الوثائق العامة",newsTitle:"أخبار وإعلانات السلامة",galleryTitle:"معرض صور السلامة",emergencyTitle:"معلومات الطوارئ"}};
let lang="en";
document.getElementById("langBtn").addEventListener("click",()=>{lang=lang==="en"?"ar":"en";document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.getElementById("langBtn").textContent=lang==="en"?"العربية":"English";document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.textContent=translations[lang][k]})});
document.querySelector(".menu-btn").addEventListener("click",()=>document.querySelector(".links").classList.toggle("open"));


const db = window.mecSupabase;
const DEFAULT_ADMIN_EMAIL = "muhammed.shamil@mecemirates.com";

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
    const el=document.createElement("article"); el.className="doc-card";
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

document.getElementById("reportForm")?.addEventListener("submit",async event=>{
  event.preventDefault(); const form=event.currentTarget; const msg=document.getElementById("reportMsg");
  const button=form.querySelector('button[type="submit"]'); button.disabled=true; msg.textContent="Submitting…";
  try{
    const fd=new FormData(form); const ref=uniqueReference("SY"); let photoPath=null;
    const photo=fd.get("photo");
    if(photo instanceof File && photo.size){
      if(photo.size>50*1024*1024) throw new Error("Photo exceeds the 50 MB limit.");
      photoPath=`${ref}/${Date.now()}-${safeFileName(photo.name)}`;
      const {error:uploadError}=await db.storage.from("report-photos").upload(photoPath,photo,{contentType:photo.type,upsert:false});
      if(uploadError) throw uploadError;
    }
    const payload={reference:ref,report_type:fd.get("type"),category:fd.get("category"),location:fd.get("location"),location_details:fd.get("locationDetails")||null,urgency:fd.get("urgency"),description:fd.get("description"),photo_url:photoPath,status:"New"};
    const {error}=await db.from("safety_reports").insert(payload); if(error) throw error;
    msg.textContent=`Submitted successfully. Reference: ${ref}`; form.reset();
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

function slider(item,prev,next,ms){let idx=0;const items=[...document.querySelectorAll(item)];if(!items.length)return;const show=n=>{items.forEach((x,i)=>x.classList.toggle("active",i===n));idx=n};document.querySelector(prev)?.addEventListener("click",()=>show((idx-1+items.length)%items.length));document.querySelector(next)?.addEventListener("click",()=>show((idx+1)%items.length));setInterval(()=>show((idx+1)%items.length),ms);}
slider(".slide",".slide-prev",".slide-next",3000);slider(".award",".award-prev",".award-next",3000);

loadLiveSettings(); loadDocuments(); loadNews();

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
