const translations={
en:{home:"Home",about:"About OSH",performance:"Performance",reports:"Safety Reports",documents:"OSH Documents",trainingVideos:"Training Awareness Videos",trainingVideosTitle:"Watch, learn and work safely",news:"News",gallery:"Gallery",emergency:"Emergency",contact:"Contact",adminLogin:"Admin Login",heroTitle:"Building Safely. Protecting Every Life.",heroSub:"MEC OSH Department, Sama Yas Residential Development",aboutTitle:"A prevention-led safety culture",mission:"Mission",missionText:"To protect every person involved in the Sama Yas Residential Development through proactive risk management, competent supervision, effective consultation and strict compliance with ALDAR OSHMS, ADOSH-SF and UAE legal requirements.",vision:"Vision",visionText:"To achieve Zero Harm by creating a workplace where safe decisions are embedded in every activity, every day and at every level.",objectives:"Objectives",objectivesText:"Prevent injuries and occupational illness, maintain legal compliance, strengthen workforce competence, close findings promptly, improve contractor performance and continuously enhance the OSH management system.",roles:"Roles & Responsibilities",rolesText:"The OSH Department plans, advises, inspects, trains, monitors and reports. Management provides resources, supervisors enforce controls, and every worker has the authority and duty to stop unsafe work.",livePerformance:"Live cumulative OSH performance",performanceClickHint:"Select any performance card to view last week, this week and cumulative figures.",performanceDetails:"Performance Details",asOfLastWeek:"As of Last Week",thisWeek:"This Week",cumulative:"Cumulative",performanceDetailNote:"Weekly figures are maintained by the MEC OSH Admin. Cumulative figures update from the live performance counter.",manpower:"Total Manpower",manhours:"Man-Hours",liveCounter:"",ltiDays:"LTI-Free Days",trainingSessions:"Training Sessions",personnelTrained:"Personnel Trained",trainingHours:"Training Hours",inductions:"OSH Inductions",meetings:"OSH Meetings",audits:"OSH Audits",inspections:"OSH Inspections",reviews:"Procedure Reviews",drills:"Emergency Drills",reportTrend:"Safety observation trend analysis",unsafeActs:"Unsafe Acts",unsafeConditions:"Unsafe Conditions",goodPractices:"Good Practices",reportConcern:"Report a Safety Concern",whatsappConcern:"Report a Safety Concern on WhatsApp",category:"Category",trackReport:"Track a Report",library:"Document Library",newsTitle:"OSH news and announcements",teamTitle:"Meet Our OSH Team",teamClient:"Client",teamPMC:"PMC",teamConsultant:"Consultant",teamMainContractor:"Main Contractor",galleryTitle:"OSH Gallery",emergencyTitle:"Emergency information"},
ar:{home:"الرئيسية",about:"عن السلامة والصحة المهنية",performance:"الأداء",reports:"تقارير السلامة",documents:"وثائق السلامة",trainingVideos:"فيديوهات التدريب والتوعية",trainingVideosTitle:"شاهد وتعلم واعمل بأمان",news:"الأخبار",gallery:"المعرض",emergency:"الطوارئ",contact:"اتصل بنا",adminLogin:"دخول المسؤول",heroTitle:"نبني بأمان. نحمي كل حياة.",heroSub:"قسم السلامة والصحة المهنية في مشروع سما ياس السكني",aboutTitle:"ثقافة سلامة قائمة على الوقاية",mission:"الرسالة",missionText:"حماية جميع العاملين في مشروع سما ياس من خلال الإدارة الاستباقية للمخاطر والإشراف الفعّال والالتزام بمتطلبات الدار وADOSH والقوانين الإماراتية.",vision:"الرؤية",visionText:"تحقيق هدف صفر ضرر من خلال ترسيخ القرارات الآمنة في كل نشاط وكل يوم وعلى جميع المستويات.",objectives:"الأهداف",objectivesText:"منع الإصابات والأمراض المهنية وتعزيز الكفاءة وإغلاق الملاحظات وتحسين أداء المقاولين والتطوير المستمر لنظام السلامة.",roles:"الأدوار والمسؤوليات",rolesText:"يقوم قسم السلامة بالتخطيط والمشورة والتفتيش والتدريب والمتابعة والتقارير، وتوفر الإدارة الموارد ويطبق المشرفون الضوابط ويحق لكل عامل إيقاف العمل غير الآمن.",livePerformance:"الأداء التراكمي المباشر",performanceClickHint:"اختر أي بطاقة أداء لعرض بيانات الأسبوع الماضي وهذا الأسبوع والإجمالي التراكمي.",performanceDetails:"تفاصيل الأداء",asOfLastWeek:"حتى نهاية الأسبوع الماضي",thisWeek:"هذا الأسبوع",cumulative:"الإجمالي التراكمي",performanceDetailNote:"يتم تحديث البيانات الأسبوعية بواسطة مسؤول السلامة في MEC، بينما يتم تحديث القيم التراكمية من عداد الأداء المباشر.",manpower:"إجمالي القوى العاملة",manhours:"ساعات العمل",liveCounter:"عداد مباشر وفق وقت العمل في الإمارات",ltiDays:"أيام بدون إصابة مضيعة للوقت",trainingSessions:"جلسات التدريب",personnelTrained:"الأشخاص المدربون",trainingHours:"ساعات التدريب",inductions:"تعريف السلامة",meetings:"اجتماعات السلامة",audits:"تدقيقات السلامة",inspections:"تفتيشات السلامة",reviews:"مراجعات الإجراءات",drills:"تمارين الطوارئ",reportTrend:"تحليل اتجاه ملاحظات السلامة",unsafeActs:"الأفعال غير الآمنة",unsafeConditions:"الظروف غير الآمنة",goodPractices:"الممارسات الجيدة",reportConcern:"الإبلاغ عن ملاحظة سلامة",whatsappConcern:"الإبلاغ عبر واتساب",category:"الفئة",trackReport:"تتبع التقرير",library:"مكتبة الوثائق العامة",newsTitle:"أخبار وإعلانات السلامة",teamTitle:"تعرف على فريق السلامة والصحة المهنية",teamClient:"العميل",teamPMC:"مدير المشروع",teamConsultant:"الاستشاري",teamMainContractor:"المقاول الرئيسي",galleryTitle:"معرض صور السلامة",emergencyTitle:"معلومات الطوارئ"}};
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
  if(typeof refreshPerformanceStatsLanguage==="function"){
    refreshPerformanceStatsLanguage();
  }else if(typeof refreshPerformancePopupLanguage==="function"){
    refreshPerformancePopupLanguage();
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


const documentLibraryLink=document.getElementById("openDocumentLibrary");
const documentPasswordModal=document.getElementById("documentPasswordModal");
const documentPasswordForm=document.getElementById("documentPasswordForm");
const documentPasswordInput=document.getElementById("documentPasswordInput");
const documentPasswordError=document.getElementById("documentPasswordError");
const documentPasswordSubmit=document.getElementById("documentPasswordSubmit");
const closeDocumentPasswordButton=document.getElementById("closeDocumentPassword");
const documentLibraryModal=document.getElementById("documents");
const closeDocumentLibraryButton=document.getElementById("closeDocumentLibrary");

function openDocumentPassword(){
  setMainMenu(false);

  if(documentPasswordModal){
    documentPasswordModal.hidden=false;
    documentPasswordModal.setAttribute("aria-hidden","false");
    document.body.classList.add("document-modal-open");
  }

  if(documentPasswordInput){
    documentPasswordInput.value="";
    setTimeout(()=>documentPasswordInput.focus(),50);
  }

  if(documentPasswordError){
    documentPasswordError.textContent="";
  }
}

function closeDocumentPassword(){
  if(documentPasswordModal){
    documentPasswordModal.hidden=true;
    documentPasswordModal.setAttribute("aria-hidden","true");
  }

  if(!documentLibraryModal||documentLibraryModal.hidden){
    document.body.classList.remove("document-modal-open");
  }
}

function openProtectedDocumentLibrary(){
  closeDocumentPassword();

  if(documentLibraryModal){
    documentLibraryModal.hidden=false;
    documentLibraryModal.setAttribute("aria-hidden","false");
    document.body.classList.add("document-modal-open");
  }

  document.getElementById("docSearch")?.focus();
  if(typeof renderDocuments==="function"){
    renderDocuments();
  }
}

function closeProtectedDocumentLibrary(){
  if(documentLibraryModal){
    documentLibraryModal.hidden=true;
    documentLibraryModal.setAttribute("aria-hidden","true");
  }

  const viewer=document.getElementById("viewer");
  if(viewer?.classList.contains("open")){
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden","true");
    const frame=document.getElementById("documentViewerFrame");
    if(frame)frame.src="";
  }

  document.body.classList.remove("document-modal-open");
  documentLibraryLink?.focus();
}

documentLibraryLink?.addEventListener("click",event=>{
  event.preventDefault();
  openDocumentPassword();
});

documentPasswordForm?.addEventListener("submit",async event=>{
  event.preventDefault();

  const candidate=documentPasswordInput?.value||"";
  if(!candidate)return;

  if(documentPasswordSubmit){
    documentPasswordSubmit.disabled=true;
    documentPasswordSubmit.textContent="Checking…";
  }

  if(documentPasswordError){
    documentPasswordError.textContent="";
  }

  try{
    const {data,error}=await db.rpc(
      "verify_document_library_password",
      {candidate_password:candidate}
    );

    if(error)throw error;

    if(data===true){
      openProtectedDocumentLibrary();
      return;
    }

    if(documentPasswordError){
      documentPasswordError.textContent="Incorrect password. Please try again.";
    }
    documentPasswordInput?.select();
  }catch(error){
    console.warn("Document password verification failed:",error.message);

    if(documentPasswordError){
      documentPasswordError.textContent=
        "Password verification is temporarily unavailable. Contact MEC OSH Admin.";
    }
  }finally{
    if(documentPasswordSubmit){
      documentPasswordSubmit.disabled=false;
      documentPasswordSubmit.textContent="Open Library";
    }
  }
});

closeDocumentPasswordButton?.addEventListener("click",closeDocumentPassword);
closeDocumentLibraryButton?.addEventListener("click",closeProtectedDocumentLibrary);

documentPasswordModal?.addEventListener("click",event=>{
  if(event.target===documentPasswordModal){
    closeDocumentPassword();
  }
});

documentLibraryModal?.addEventListener("click",event=>{
  if(event.target===documentLibraryModal){
    closeProtectedDocumentLibrary();
  }
});

function protectDocumentHash(){
  if(location.hash==="#documents"){
    history.replaceState(null,"",location.pathname+location.search);
    openDocumentPassword();
  }
}

window.addEventListener("hashchange",protectDocumentHash);
protectDocumentHash();


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





const teamPhotoModal=document.getElementById("teamPhotoModal");
const teamPhotoModalImage=document.getElementById("teamPhotoModalImage");
const teamPhotoModalName=document.getElementById("teamPhotoModalName");
const teamPhotoModalDesignation=document.getElementById(
  "teamPhotoModalDesignation"
);
const closeTeamPhotoModalButton=document.getElementById(
  "closeTeamPhotoModal"
);
let activeTeamPhotoTrigger=null;

function pauseAllTeamCarousels(){
  if(typeof teamCarouselStates==="undefined")return;

  teamCarouselStates.forEach(state=>{
    if(state?.timer){
      clearInterval(state.timer);
      state.timer=null;
    }
  });
}

function resumeAllTeamCarousels(){
  if(typeof restartStakeholderCarousel!=="function")return;

  document.querySelectorAll(".stakeholder-team-carousel").forEach(carousel=>{
    restartStakeholderCarousel(carousel);
  });
}

function openTeamPhotoModal(trigger){
  if(!teamPhotoModal||!trigger)return;

  activeTeamPhotoTrigger=trigger;
  const photo=trigger.dataset.teamPhoto||"";
  const name=trigger.dataset.teamName||"OSH Team Member";
  const designation=trigger.dataset.teamDesignation||"";

  if(teamPhotoModalImage){
    teamPhotoModalImage.src=photo;
    teamPhotoModalImage.alt=name;
  }

  if(teamPhotoModalName){
    teamPhotoModalName.textContent=name;
  }

  if(teamPhotoModalDesignation){
    teamPhotoModalDesignation.textContent=designation;
  }

  pauseAllTeamCarousels();
  teamPhotoModal.hidden=false;
  teamPhotoModal.setAttribute("aria-hidden","false");
  document.body.classList.add("team-photo-popup-open");

  setTimeout(()=>closeTeamPhotoModalButton?.focus(),30);
}

function closeTeamPhotoModal(){
  if(!teamPhotoModal)return;

  teamPhotoModal.hidden=true;
  teamPhotoModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("team-photo-popup-open");

  if(teamPhotoModalImage){
    teamPhotoModalImage.removeAttribute("src");
  }

  resumeAllTeamCarousels();
  activeTeamPhotoTrigger?.focus();
  activeTeamPhotoTrigger=null;
}

document.addEventListener("click",event=>{
  const trigger=event.target.closest(".team-member-photo-button");
  if(trigger){
    openTeamPhotoModal(trigger);
  }
});

closeTeamPhotoModalButton?.addEventListener(
  "click",
  closeTeamPhotoModal
);

teamPhotoModal?.addEventListener("click",event=>{
  if(event.target===teamPhotoModal){
    closeTeamPhotoModal();
  }
});


const galleryPhotoModal=document.getElementById("galleryPhotoModal");
const galleryPhotoModalImage=document.getElementById(
  "galleryPhotoModalImage"
);
const galleryPhotoModalTitle=document.getElementById(
  "galleryPhotoModalTitle"
);
const galleryPhotoModalType=document.getElementById(
  "galleryPhotoModalType"
);
const closeGalleryPhotoModalButton=document.getElementById(
  "closeGalleryPhotoModal"
);
let activeGalleryPhotoTrigger=null;

function openGalleryPhotoModal(trigger){
  if(!galleryPhotoModal||!trigger)return;

  activeGalleryPhotoTrigger=trigger;

  const imageUrl=trigger.currentSrc||trigger.src||"";
  const title=trigger.dataset.galleryTitle||trigger.alt||"Gallery Photo";
  const type=trigger.dataset.galleryType||"Gallery";

  if(galleryPhotoModalImage){
    galleryPhotoModalImage.src=imageUrl;
    galleryPhotoModalImage.alt=title;
  }

  if(galleryPhotoModalTitle){
    galleryPhotoModalTitle.textContent=title;
  }

  if(galleryPhotoModalType){
    galleryPhotoModalType.textContent=type;
  }

  galleryPhotoModal.hidden=false;
  galleryPhotoModal.setAttribute("aria-hidden","false");
  document.body.classList.add("gallery-photo-popup-open");

  setTimeout(()=>closeGalleryPhotoModalButton?.focus(),30);
}

function closeGalleryPhotoModal(){
  if(!galleryPhotoModal)return;

  galleryPhotoModal.hidden=true;
  galleryPhotoModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("gallery-photo-popup-open");

  if(galleryPhotoModalImage){
    galleryPhotoModalImage.removeAttribute("src");
  }

  activeGalleryPhotoTrigger?.focus();
  activeGalleryPhotoTrigger=null;
}

document.addEventListener("click",event=>{
  const image=event.target.closest(".gallery-popup-image");
  if(image){
    openGalleryPhotoModal(image);
  }
});

document.addEventListener("keydown",event=>{
  if(event.key!=="Enter"&&event.key!==" ")return;

  const image=event.target.closest(".gallery-popup-image");
  if(!image)return;

  event.preventDefault();
  openGalleryPhotoModal(image);
});

closeGalleryPhotoModalButton?.addEventListener(
  "click",
  closeGalleryPhotoModal
);

galleryPhotoModal?.addEventListener("click",event=>{
  if(event.target===galleryPhotoModal){
    closeGalleryPhotoModal();
  }
});

document.addEventListener("keydown",event=>{
  if(event.key!=="Escape")return;

  setMainMenu(false);

  if(documentPasswordModal&&!documentPasswordModal.hidden){
    closeDocumentPassword();
    return;
  }

  if(documentLibraryModal&&!documentLibraryModal.hidden){
    closeProtectedDocumentLibrary();
    return;
  }

  if(performanceDetailModal&&!performanceDetailModal.hidden){
    closePerformanceDetail();
    return;
  }

  if(teamPhotoModal&&!teamPhotoModal.hidden){
    closeTeamPhotoModal();
    return;
  }

  if(galleryPhotoModal&&!galleryPhotoModal.hidden){
    closeGalleryPhotoModal();
    return;
  }

  if(trendChartModal&&!trendChartModal.hidden){
    closeTrendChartModal();
  }
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


const performanceMetricConfig={};
let performanceStatsRows=[];
let performanceStatsByKey=new Map();
let performanceWeeklyData={lastWeek:{},thisWeek:{}};
let activePerformanceMetric=null;
let activePerformanceCard=null;

const performanceDetailModal=document.getElementById("performanceDetailModal");
const closePerformanceDetailButton=document.getElementById("closePerformanceDetail");

const performanceStatsFallback=[
  {stat_key:"manpower",title_en:"Total Manpower",title_ar:"إجمالي القوى العاملة",last_week:1500,this_week:0,cumulative:1500,decimals:0,sort_order:10,calculation_mode:"manual",active:true},
  {stat_key:"manhours",title_en:"Man-Hours",title_ar:"ساعات العمل",last_week:2568386,this_week:0,cumulative:2568386,decimals:0,sort_order:20,calculation_mode:"live_manhours",active:true},
  {stat_key:"ltiDays",title_en:"LTI-Free Days",title_ar:"أيام دون إصابة مضيعة للوقت",last_week:0,this_week:0,cumulative:0,decimals:0,sort_order:30,calculation_mode:"live_lti_days",active:true},
  {stat_key:"trainingSessions",title_en:"Training Sessions",title_ar:"جلسات التدريب",last_week:1773,this_week:0,cumulative:1773,decimals:0,sort_order:40,calculation_mode:"manual",active:true},
  {stat_key:"personnelTrained",title_en:"Personnel Trained",title_ar:"الأفراد المدربون",last_week:39442,this_week:0,cumulative:39442,decimals:0,sort_order:50,calculation_mode:"manual",active:true},
  {stat_key:"trainingHours",title_en:"Training Hours",title_ar:"ساعات التدريب",last_week:18433.55,this_week:0,cumulative:18433.55,decimals:2,sort_order:60,calculation_mode:"manual",active:true},
  {stat_key:"oshInductions",title_en:"OSH Inductions",title_ar:"تعريفات السلامة والصحة المهنية",last_week:2238,this_week:0,cumulative:2238,decimals:0,sort_order:70,calculation_mode:"manual",active:true},
  {stat_key:"oshMeetings",title_en:"OSH Meetings",title_ar:"اجتماعات السلامة والصحة المهنية",last_week:73,this_week:0,cumulative:73,decimals:0,sort_order:80,calculation_mode:"manual",active:true},
  {stat_key:"oshAudits",title_en:"OSH Audits",title_ar:"تدقيقات السلامة والصحة المهنية",last_week:7,this_week:0,cumulative:7,decimals:0,sort_order:90,calculation_mode:"manual",active:true},
  {stat_key:"oshInspections",title_en:"OSH Inspections",title_ar:"تفتيشات السلامة والصحة المهنية",last_week:167,this_week:0,cumulative:167,decimals:0,sort_order:100,calculation_mode:"manual",active:true},
  {stat_key:"procedureReviews",title_en:"Procedure Reviews",title_ar:"مراجعات الإجراءات",last_week:64,this_week:0,cumulative:64,decimals:0,sort_order:110,calculation_mode:"manual",active:true},
  {stat_key:"emergencyDrills",title_en:"Emergency Drills",title_ar:"تمارين الطوارئ",last_week:6,this_week:0,cumulative:6,decimals:0,sort_order:120,calculation_mode:"manual",active:true}
];

function normalizedWeeklyPerformanceData(value){
  if(!value||typeof value!=="object"||Array.isArray(value))return {};
  return value;
}

function performanceElementId(statKey){
  return `performance-value-${String(statKey).replace(/[^a-zA-Z0-9_-]/g,"-")}`;
}

function performanceTitle(stat){
  if(lang==="ar"&&stat.title_ar)return stat.title_ar;
  return stat.title_en||"OSH Statistic";
}

function performanceDisplayNumber(metricKey,value){
  const config=performanceMetricConfig[metricKey]||{decimals:0};
  const number=Number(value);

  if(!Number.isFinite(number))return "—";

  return number.toLocaleString("en-US",{
    minimumFractionDigits:Number(config.decimals||0),
    maximumFractionDigits:Number(config.decimals||0)
  });
}

function performanceLegacyCumulative(statKey,originalValue){
  const legacy={
    manpower:performance.manpower,
    manhours:Number(performance.baseline_manhours||0)+Number(performance.manhour_adjustment||0),
    trainingSessions:performance.training_sessions,
    personnelTrained:performance.personnel_trained,
    trainingHours:performance.training_hours,
    oshInductions:performance.osh_inductions,
    oshMeetings:performance.osh_meetings,
    oshAudits:performance.osh_audits,
    oshInspections:performance.osh_inspections,
    procedureReviews:performance.procedure_reviews,
    emergencyDrills:performance.emergency_drills
  };

  const value=legacy[statKey];
  return value===undefined||value===null?originalValue:value;
}

function buildFallbackPerformanceStats(){
  return performanceStatsFallback.map(stat=>({
    ...stat,
    last_week:Object.prototype.hasOwnProperty.call(
      performanceWeeklyData.lastWeek,
      stat.stat_key
    )
      ? performanceWeeklyData.lastWeek[stat.stat_key]
      : performanceLegacyCumulative(stat.stat_key,stat.last_week),
    this_week:Object.prototype.hasOwnProperty.call(
      performanceWeeklyData.thisWeek,
      stat.stat_key
    )
      ? performanceWeeklyData.thisWeek[stat.stat_key]
      : stat.this_week,
    cumulative:performanceLegacyCumulative(stat.stat_key,stat.cumulative)
  }));
}

function currentPerformanceMetricValue(metricKey){
  const config=performanceMetricConfig[metricKey];
  const element=config?document.getElementById(config.elementId):null;
  if(!element)return 0;

  const number=Number(
    element.textContent.replace(/,/g,"").replace(/[^\d.-]/g,"")
  );
  return Number.isFinite(number)?number:0;
}

function performanceWeeklyValue(group,metricKey,fallback){
  const values=performanceWeeklyData[group]||{};
  if(Object.prototype.hasOwnProperty.call(values,metricKey)){
    const number=Number(values[metricKey]);
    if(Number.isFinite(number))return number;
  }
  return fallback;
}

function bindPerformanceCard(card){
  card.addEventListener("click",()=>openPerformanceDetail(card));
  card.addEventListener("keydown",event=>{
    if(event.key==="Enter"||event.key===" "){
      event.preventDefault();
      openPerformanceDetail(card);
    }
  });
}

function renderPerformanceStats(rows){
  const grid=document.getElementById("performanceStatsGrid");
  if(!grid)return;

  performanceStatsRows=(rows||[])
    .filter(row=>row.active!==false)
    .sort((a,b)=>Number(a.sort_order||0)-Number(b.sort_order||0));

  performanceStatsByKey=new Map(
    performanceStatsRows.map(row=>[row.stat_key,row])
  );

  performanceWeeklyData={lastWeek:{},thisWeek:{}};

  Object.keys(performanceMetricConfig).forEach(key=>{
    delete performanceMetricConfig[key];
  });

  if(!performanceStatsRows.length){
    grid.innerHTML='<p class="performance-stats-empty">No active performance statistics.</p>';
    return;
  }

  grid.innerHTML=performanceStatsRows.map(stat=>{
    const key=stat.stat_key;
    const elementId=performanceElementId(key);
    const decimals=Math.max(0,Math.min(4,Number(stat.decimals||0)));

    performanceMetricConfig[key]={elementId,decimals};
    performanceWeeklyData.lastWeek[key]=Number(stat.last_week||0);
    performanceWeeklyData.thisWeek[key]=Number(stat.this_week||0);

    const liveLabel=stat.calculation_mode==="live_lti_days"
      ? '<small>Live daily counter</small>'
      :"";

    return `<div class="stat performance-stat-card"
                 data-performance-key="${escapeHtml(key)}"
                 role="button"
                 tabindex="0"
                 aria-haspopup="dialog">
      <label class="performance-stat-title">${escapeHtml(performanceTitle(stat))}</label>
      <strong id="${escapeHtml(elementId)}">${performanceDisplayNumber(key,stat.cumulative)}</strong>
      ${liveLabel}
    </div>`;
  }).join("");

  grid.querySelectorAll(".performance-stat-card").forEach(bindPerformanceCard);
  updateCounters();
}

function refreshPerformanceStatsLanguage(){
  document.querySelectorAll(".performance-stat-card").forEach(card=>{
    const stat=performanceStatsByKey.get(card.dataset.performanceKey);
    const label=card.querySelector(".performance-stat-title");
    if(stat&&label)label.textContent=performanceTitle(stat);
  });
  refreshPerformancePopupLanguage();
}

function refreshPerformancePopupLanguage(){
  if(!activePerformanceMetric||!activePerformanceCard)return;
  const title=activePerformanceCard.querySelector("label")?.textContent
    ||"OSH Performance";
  setText("performanceDetailTitle",title);
}

function refreshOpenPerformanceDetail(){
  if(!activePerformanceMetric||!performanceDetailModal||
     performanceDetailModal.hidden)return;

  const cumulative=currentPerformanceMetricValue(activePerformanceMetric);
  const lastWeek=performanceWeeklyValue(
    "lastWeek",
    activePerformanceMetric,
    cumulative
  );
  const thisWeek=performanceWeeklyValue(
    "thisWeek",
    activePerformanceMetric,
    0
  );

  const lastWeekElement=document.getElementById("performanceLastWeekValue");
  const thisWeekElement=document.getElementById("performanceThisWeekValue");
  const cumulativeElement=document.getElementById("performanceCumulativeValue");

  if(lastWeekElement){
    lastWeekElement.textContent=performanceDisplayNumber(
      activePerformanceMetric,
      lastWeek
    );
  }

  if(thisWeekElement){
    thisWeekElement.textContent=performanceDisplayNumber(
      activePerformanceMetric,
      thisWeek
    );
  }

  if(cumulativeElement){
    cumulativeElement.textContent=performanceDisplayNumber(
      activePerformanceMetric,
      cumulative
    );
  }
}

function openPerformanceDetail(card){
  activePerformanceCard=card;
  activePerformanceMetric=card.dataset.performanceKey;

  refreshPerformancePopupLanguage();
  refreshOpenPerformanceDetail();

  if(performanceDetailModal){
    performanceDetailModal.hidden=false;
    performanceDetailModal.setAttribute("aria-hidden","false");
    document.body.classList.add("performance-popup-open");
  }

  setTimeout(()=>closePerformanceDetailButton?.focus(),30);
}

function closePerformanceDetail(){
  if(performanceDetailModal){
    performanceDetailModal.hidden=true;
    performanceDetailModal.setAttribute("aria-hidden","true");
  }
  document.body.classList.remove("performance-popup-open");
  activePerformanceCard?.focus();
  activePerformanceMetric=null;
  activePerformanceCard=null;
}

closePerformanceDetailButton?.addEventListener(
  "click",
  closePerformanceDetail
);

performanceDetailModal?.addEventListener("click",event=>{
  if(event.target===performanceDetailModal){
    closePerformanceDetail();
  }
});

function updateCounters() {
  const baselineDate=new Date(performance.baseline_at);
  const seconds=workingSecondsBetween(baselineDate,new Date());

  const displayedManpower=currentPerformanceMetricValue("manpower");
  const configuredManpower=Number(
    performanceStatsByKey.get("manpower")?.cumulative
    ??performance.manpower
    ??0
  );
  const activeManpower=displayedManpower>0
    ? displayedManpower
    : configuredManpower;

  const value=
    Number(performance.baseline_manhours)
    +(seconds/3600)*activeManpower
    +Number(performance.manhour_adjustment||0);

  setText(
    performanceMetricConfig.manhours?.elementId,
    Math.floor(value)
  );
  const start=new Date(`${performance.last_lti_date}T00:00:00+04:00`);
  const startNext=new Date(start.getTime()+86400000);
  const todayParts=uaeDateParts(new Date());
  const todayUaeMidnight=new Date(`${todayParts.year}-${todayParts.month}-${todayParts.day}T00:00:00+04:00`);
  const days=Math.max(0,Math.floor((todayUaeMidnight-startNext)/86400000)+1);
  setText(performanceMetricConfig.ltiDays?.elementId,days);
  refreshOpenPerformanceDetail();
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

  const documentAdminEmail=document.getElementById("documentAdminEmail");
  if(documentAdminEmail){
    const displayEmail=contactSettingsData.email||contactFallback.email;
    documentAdminEmail.textContent=displayEmail;
    documentAdminEmail.href=`mailto:${displayEmail}`;
  }

  const documentAdminPhone=document.getElementById("documentAdminPhone");
  if(documentAdminPhone){
    const displayPhone=contactSettingsData.phone||contactFallback.phone;
    documentAdminPhone.textContent=displayPhone;
    documentAdminPhone.href=`tel:${contactTelephoneLink(displayPhone)}`;
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
    const [settingsResult,holidayResult,statsResult]=await Promise.all([
      db.from("settings").select("*").eq("id",1).maybeSingle(),
      db.from("holidays").select("holiday_date").eq("active",true),
      db.from("performance_stats")
        .select("*")
        .eq("active",true)
        .order("sort_order",{ascending:true})
        .order("created_at",{ascending:true})
    ]);

    if(settingsResult.error)throw settingsResult.error;

    if(settingsResult.data){
      performance={...performance,...settingsResult.data};
      performanceWeeklyData={
        lastWeek:normalizedWeeklyPerformanceData(
          settingsResult.data.performance_last_week
        ),
        thisWeek:normalizedWeeklyPerformanceData(
          settingsResult.data.performance_this_week
        )
      };
    }

    holidays=new Set(
      (holidayResult.data||[]).map(item=>item.holiday_date)
    );

    if(statsResult.error){
      console.warn(
        "Using built-in performance statistics:",
        statsResult.error.message
      );
      renderPerformanceStats(buildFallbackPerformanceStats());
    }else{
      renderPerformanceStats(
        statsResult.data?.length
          ? statsResult.data
          : buildFallbackPerformanceStats()
      );
    }

    updateCounters();
  } catch (error) {
    console.warn("Using built-in performance values:",error.message);
    renderPerformanceStats(buildFallbackPerformanceStats());
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

    if(docFilter&&category){
      const categoryExists=[...docFilter.options].some(
        option=>option.value===category
      );

      if(categoryExists){
        docFilter.value=category;
        renderDocuments();
      }
    }

    document.getElementById("documentGrid")?.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });
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

function renderGroupedTrendChart(containerId,rows,series,options={}){
  const container=document.getElementById(containerId);
  if(!container)return;

  const compact=Boolean(options.compact);
  const width=Math.max(
    compact?920:1500,
    rows.length*(compact?48:76)+(compact?105:130)
  );
  const height=compact?360:535;
  const margin=compact
    ? {top:38,right:18,bottom:142,left:48}
    : {top:50,right:28,bottom:195,left:60};
  const chartWidth=width-margin.left-margin.right;
  const chartHeight=height-margin.top-margin.bottom;
  const max=niceTrendMaximum(rows,series.map(item=>item.field));
  const tickCount=compact?5:6;
  const categoryWidth=chartWidth/rows.length;
  const gap=compact?2:3;
  const barWidth=Math.min(
    compact?10:14,
    Math.max(compact?5:7,(categoryWidth-(compact?12:18)-(series.length-1)*gap)/series.length)
  );

  const grid=Array.from({length:tickCount+1},(_,index)=>{
    const value=Math.round(max*index/tickCount);
    const y=margin.top+chartHeight-(value/max)*chartHeight;
    return `<line x1="${margin.left}" y1="${y}" x2="${width-margin.right}" y2="${y}" class="trend-grid-line"/>
      <text x="${margin.left-8}" y="${y+4}" text-anchor="end" class="trend-axis-number">${value}</text>`;
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
      const labelY=Math.max(margin.top+10,y-4);

      return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="1" fill="${item.color}">
        <title>${escapeHtml(row.category)}: ${escapeHtml(item.label)} ${value}</title>
      </rect>
      <text x="${x+barWidth/2}" y="${labelY}" text-anchor="middle" class="trend-value-label">${value}</text>`;
    }).join("");

    const labelX=center+3;
    const labelY=margin.top+chartHeight+12;

    return `${rowBars}
      <text x="${labelX}" y="${labelY}"
            transform="rotate(90 ${labelX} ${labelY})"
            class="trend-category-label">${escapeHtml(row.category)}</text>`;
  }).join("");

  container.classList.toggle("compact-rendered-trend",compact);
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

let latestSafetyTrendRows=safetyTrendBaseline.map(row=>({...row}));

function renderSafetyTrend(rows){
  latestSafetyTrendRows=(rows||safetyTrendBaseline).map(row=>({...row}));
  updateTrendSummary(latestSafetyTrendRows);

  renderGroupedTrendChart("unsafeActTrendChart",latestSafetyTrendRows,[
    {
      field:"unsafe_act_open_count",
      label:"Unsafe Act Open",
      color:"#f59e0b"
    },
    {
      field:"unsafe_act_closed_count",
      label:"Unsafe Act Closed",
      color:"#0aa34f"
    }
  ],{compact:true});

  renderGroupedTrendChart("unsafeConditionTrendChart",latestSafetyTrendRows,[
    {
      field:"unsafe_condition_open_count",
      label:"Unsafe Condition Open",
      color:"#ef1717"
    },
    {
      field:"unsafe_condition_closed_count",
      label:"Unsafe Condition Closed",
      color:"#2563eb"
    }
  ],{compact:true});
}


const trendChartModal=document.getElementById("trendChartModal");
const trendChartModalTitle=document.getElementById("trendChartModalTitle");
const trendChartModalEyebrow=document.getElementById("trendChartModalEyebrow");
const trendChartModalLegend=document.getElementById("trendChartModalLegend");
const closeTrendChartModalButton=document.getElementById("closeTrendChartModal");
let activeTrendChartTrigger=null;

function trendChartDetails(type){
  if(type==="unsafe-condition"){
    return {
      eyebrow:"Unsafe Condition Analysis",
      title:"Unsafe Condition: Open vs Closed",
      aria:"Enlarged Unsafe Condition Open and Closed observations by category",
      legend:`<span><i class="legend-uc-open"></i> Open</span>
        <span><i class="legend-uc-closed"></i> Closed</span>`,
      series:[
        {field:"unsafe_condition_open_count",label:"Unsafe Condition Open",color:"#ef1717"},
        {field:"unsafe_condition_closed_count",label:"Unsafe Condition Closed",color:"#2563eb"}
      ]
    };
  }

  return {
    eyebrow:"Unsafe Act Analysis",
    title:"Unsafe Act: Open vs Closed",
    aria:"Enlarged Unsafe Act Open and Closed observations by category",
    legend:`<span><i class="legend-ua-open"></i> Open</span>
      <span><i class="legend-ua-closed"></i> Closed</span>`,
    series:[
      {field:"unsafe_act_open_count",label:"Unsafe Act Open",color:"#f59e0b"},
      {field:"unsafe_act_closed_count",label:"Unsafe Act Closed",color:"#0aa34f"}
    ]
  };
}

function openTrendChartModal(type,trigger){
  if(!trendChartModal)return;

  activeTrendChartTrigger=trigger||null;
  const details=trendChartDetails(type);

  if(trendChartModalEyebrow)trendChartModalEyebrow.textContent=details.eyebrow;
  if(trendChartModalTitle)trendChartModalTitle.textContent=details.title;
  if(trendChartModalLegend)trendChartModalLegend.innerHTML=details.legend;

  const canvas=document.getElementById("trendChartPopupCanvas");
  if(canvas)canvas.setAttribute("aria-label",details.aria);

  renderGroupedTrendChart(
    "trendChartPopupCanvas",
    latestSafetyTrendRows,
    details.series,
    {compact:false}
  );

  trendChartModal.hidden=false;
  trendChartModal.setAttribute("aria-hidden","false");
  document.body.classList.add("trend-chart-popup-open");
  setTimeout(()=>closeTrendChartModalButton?.focus(),30);
}

function closeTrendChartModal(){
  if(!trendChartModal)return;

  trendChartModal.hidden=true;
  trendChartModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("trend-chart-popup-open");
  activeTrendChartTrigger?.focus();
  activeTrendChartTrigger=null;
}

document.querySelectorAll("[data-trend-popup]").forEach(panel=>{
  panel.addEventListener("click",()=>{
    openTrendChartModal(panel.dataset.trendPopup,panel);
  });

  panel.addEventListener("keydown",event=>{
    if(event.key!=="Enter"&&event.key!==" ")return;
    event.preventDefault();
    openTrendChartModal(panel.dataset.trendPopup,panel);
  });
});

closeTrendChartModalButton?.addEventListener("click",closeTrendChartModal);

trendChartModal?.addEventListener("click",event=>{
  if(event.target===trendChartModal)closeTrendChartModal();
});

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
    const payload={
      reference:ref,
      reporter_name:(fd.get("reporterName")||"").trim()||null,
      reporter_designation:(fd.get("reporterDesignation")||"").trim()||null,
      report_type:fd.get("type"),
      category:fd.get("category"),
      location:fd.get("location"),
      location_details:fd.get("locationDetails")||null,
      urgency:fd.get("urgency"),
      description:fd.get("description"),
      photo_url:photoPath,
      status:"New"
    };
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




const TEAM_GROUPS=["Client","PMC","Consultant","Main Contractor"];
const TEAM_SLIDE_INTERVAL=2000;
const teamCarouselStates=new Map();

function teamDisplayText(member,englishField,arabicField){
  if(lang==="ar"&&member[arabicField])return member[arabicField];
  return member[englishField]||"";
}

function teamCarouselStep(carousel){
  const track=carousel.querySelector(".team-carousel-track");
  const firstCard=track?.querySelector(".team-member-card");
  if(!firstCard)return 0;

  const trackStyles=getComputedStyle(track);
  const gap=parseFloat(trackStyles.columnGap||trackStyles.gap||0);
  return firstCard.getBoundingClientRect().width+gap;
}

function positionStakeholderCarousel(carousel,animate=true){
  const state=teamCarouselStates.get(carousel);
  const track=carousel.querySelector(".team-carousel-track");
  if(!state||!track)return;

  track.style.transition=animate
    ?"transform .55s cubic-bezier(.22,.75,.23,1)"
    :"none";

  track.style.transform=`translateX(-${state.index*teamCarouselStep(carousel)}px)`;

  carousel.querySelectorAll(".team-carousel-dots button").forEach((button,index)=>{
    const active=index===state.index%Math.max(state.count,1);
    button.classList.toggle("active",active);
    button.setAttribute("aria-current",active?"true":"false");
  });
}

function moveStakeholderCarousel(carousel,direction=1){
  const state=teamCarouselStates.get(carousel);
  if(!state||state.count<=state.visible)return;

  if(direction<0){
    if(state.index<=0){
      state.index=state.count;
      positionStakeholderCarousel(carousel,false);
    }
    requestAnimationFrame(()=>{
      state.index-=1;
      positionStakeholderCarousel(carousel,true);
    });
    return;
  }

  state.index+=1;
  positionStakeholderCarousel(carousel,true);
}

function restartStakeholderCarousel(carousel){
  const state=teamCarouselStates.get(carousel);
  if(!state)return;

  clearInterval(state.timer);
  state.timer=null;

  if(state.count<=state.visible)return;

  state.timer=setInterval(()=>{
    moveStakeholderCarousel(carousel,1);
  },TEAM_SLIDE_INTERVAL);
}

function emptyTeamMarkup(group){
  return `<div class="team-empty-state">
    <div class="team-empty-icon" aria-hidden="true">👥</div>
    <h4>No ${escapeHtml(group)} team members added</h4>
    <p>Add people through Admin Dashboard → OSH Team.</p>
  </div>`;
}

function renderStakeholderCarousel(carousel,members){
  const group=carousel.dataset.teamGroup;
  const visible=Math.max(1,Number(carousel.dataset.visible||4));
  const track=carousel.querySelector(".team-carousel-track");
  const dots=carousel.querySelector(".team-carousel-dots");
  const previous=carousel.querySelector(".team-carousel-prev");
  const next=carousel.querySelector(".team-carousel-next");

  if(!track||!dots||!previous||!next)return;

  const oldState=teamCarouselStates.get(carousel);
  if(oldState?.timer)clearInterval(oldState.timer);

  const state={index:0,count:members.length,visible,timer:null};
  teamCarouselStates.set(carousel,state);
  carousel.style.setProperty("--team-visible",visible);
  carousel.classList.toggle("single-team-member",members.length===1);
  carousel.classList.toggle(
    "partial-team-group",
    members.length>1&&members.length<visible
  );

  if(!members.length){
    track.innerHTML=emptyTeamMarkup(group);
    dots.innerHTML="";
    previous.hidden=true;
    next.hidden=true;
    track.style.transform="translateX(0)";
    return;
  }

  const repeatedMembers=members.length>visible
    ? [...members,...members.slice(0,visible)]
    : members;

  track.innerHTML=repeatedMembers.map((member,index)=>{
    const name=teamDisplayText(member,"name_en","name_ar");
    const designation=teamDisplayText(member,"designation_en","designation_ar");
    const cloneClass=index>=members.length?" team-member-clone":"";

    return `<article class="team-member-card${cloneClass}">
      <div class="team-member-card-inner">
        <div class="team-member-photo-wrap">
          <button class="team-member-photo-button"
                  type="button"
                  data-team-photo="${escapeHtml(member.photo_url)}"
                  data-team-name="${escapeHtml(name)}"
                  data-team-designation="${escapeHtml(designation)}"
                  aria-label="Enlarge photo of ${escapeHtml(name)}">
            <img class="team-member-photo"
                 src="${escapeHtml(member.photo_url)}"
                 alt="${escapeHtml(name)}"
                 loading="lazy">
            <span class="team-photo-zoom-hint" aria-hidden="true">⌕</span>
          </button>
        </div>
        <div class="team-member-copy">
          <h4>${escapeHtml(name)}</h4>
          <p>${escapeHtml(designation)}</p>
        </div>
      </div>
    </article>`;
  }).join("");

  dots.innerHTML=members.length>visible
    ? members.map((_,index)=>
        `<button type="button"
                 aria-label="Show ${escapeHtml(group)} team position ${index+1}"
                 class="${index===0?"active":""}"
                 aria-current="${index===0?"true":"false"}"></button>`
      ).join("")
    :"";

  previous.hidden=members.length<=visible;
  next.hidden=members.length<=visible;

  previous.onclick=()=>{
    moveStakeholderCarousel(carousel,-1);
    restartStakeholderCarousel(carousel);
  };

  next.onclick=()=>{
    moveStakeholderCarousel(carousel,1);
    restartStakeholderCarousel(carousel);
  };

  dots.querySelectorAll("button").forEach((button,index)=>{
    button.onclick=()=>{
      state.index=index;
      positionStakeholderCarousel(carousel,true);
      restartStakeholderCarousel(carousel);
    };
  });

  track.ontransitionend=()=>{
    if(state.index>=state.count){
      state.index=0;
      positionStakeholderCarousel(carousel,false);
    }
  };

  carousel.onmouseenter=()=>{
    if(state.timer)clearInterval(state.timer);
  };
  carousel.onmouseleave=()=>restartStakeholderCarousel(carousel);
  carousel.onfocusin=()=>{
    if(state.timer)clearInterval(state.timer);
  };
  carousel.onfocusout=()=>restartStakeholderCarousel(carousel);

  positionStakeholderCarousel(carousel,false);
  restartStakeholderCarousel(carousel);
}

function renderTeamMembers(members){
  document.querySelectorAll(".stakeholder-team-carousel").forEach(carousel=>{
    const group=carousel.dataset.teamGroup;
    const groupMembers=members.filter(member=>
      (member.stakeholder_group||"Main Contractor")===group
    );
    renderStakeholderCarousel(carousel,groupMembers);
  });
}

async function loadTeamMembers(){
  try{
    const {data,error}=await db
      .from("team_members")
      .select("*")
      .eq("active",true)
      .order("stakeholder_group",{ascending:true})
      .order("sort_order",{ascending:true})
      .order("created_at",{ascending:true});

    if(error)throw error;
    renderTeamMembers(data||[]);
  }catch(error){
    console.warn("OSH stakeholder teams not loaded:",error.message);
    renderTeamMembers([]);
  }
}

window.addEventListener("resize",()=>{
  document.querySelectorAll(".stakeholder-team-carousel").forEach(carousel=>{
    const state=teamCarouselStates.get(carousel);
    if(state)positionStakeholderCarousel(carousel,false);
  });
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
            : `<img class="gallery-popup-image"
                    src="${escapeHtml(item.image_url)}"
                    alt="${escapeHtml(title)}"
                    data-gallery-title="${escapeHtml(title)}"
                    data-gallery-type="OSH Gallery"
                    role="button"
                    tabindex="0"
                    loading="lazy">`;

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
            <img class="award-image gallery-popup-image"
                 src="${escapeHtml(item.image_url)}"
                 alt="${escapeHtml(title)}"
                 data-gallery-title="${escapeHtml(title)}"
                 data-gallery-type="Award Gallery"
                 role="button"
                 tabindex="0"
                 loading="lazy">
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
