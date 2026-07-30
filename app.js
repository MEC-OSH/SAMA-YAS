const translations={
en:{home:"Home",about:"About OSH",performance:"Performance",reports:"Safety Reports",documents:"OSH Documents",news:"News",gallery:"Gallery",emergency:"Emergency",contact:"Contact",adminLogin:"Admin Login",heroTitle:"Building Safely. Protecting Every Life.",heroSub:"MEC OSH Department, Sama Yas Residential Development",aboutTitle:"A prevention-led safety culture",mission:"Mission",missionText:"To protect every person involved in the Sama Yas Residential Development through proactive risk management, competent supervision, effective consultation and strict compliance with ALDAR OSHMS, ADOSH-SF and UAE legal requirements.",vision:"Vision",visionText:"To achieve Zero Harm by creating a workplace where safe decisions are embedded in every activity, every day and at every level.",objectives:"Objectives",objectivesText:"Prevent injuries and occupational illness, maintain legal compliance, strengthen workforce competence, close findings promptly, improve contractor performance and continuously enhance the OSH management system.",roles:"Roles & Responsibilities",rolesText:"The OSH Department plans, advises, inspects, trains, monitors and reports. Management provides resources, supervisors enforce controls, and every worker has the authority and duty to stop unsafe work.",livePerformance:"Live cumulative OSH performance",manpower:"Total Manpower",manhours:"Man-Hours",liveCounter:"Live UAE working-time counter",ltiDays:"LTI-Free Days",trainingSessions:"Training Sessions",personnelTrained:"Personnel Trained",trainingHours:"Training Hours",inductions:"OSH Inductions",meetings:"OSH Meetings",audits:"OSH Audits",inspections:"OSH Inspections",reviews:"Procedure Reviews",drills:"Emergency Drills",reportTrend:"Safety observation trend analysis",unsafeActs:"Unsafe Acts",unsafeConditions:"Unsafe Conditions",goodPractices:"Good Practices",reportConcern:"Report a Safety Concern",whatsappConcern:"Report a Safety Concern on WhatsApp",category:"Category",trackReport:"Track a Report",library:"Public document library",newsTitle:"OSH news and announcements",galleryTitle:"OSH photo gallery",emergencyTitle:"Emergency information"},
ar:{home:"الرئيسية",about:"عن السلامة والصحة المهنية",performance:"الأداء",reports:"تقارير السلامة",documents:"وثائق السلامة",news:"الأخبار",gallery:"المعرض",emergency:"الطوارئ",contact:"اتصل بنا",adminLogin:"دخول المسؤول",heroTitle:"نبني بأمان. نحمي كل حياة.",heroSub:"قسم السلامة والصحة المهنية في مشروع سما ياس السكني",aboutTitle:"ثقافة سلامة قائمة على الوقاية",mission:"الرسالة",missionText:"حماية جميع العاملين في مشروع سما ياس من خلال الإدارة الاستباقية للمخاطر والإشراف الفعّال والالتزام بمتطلبات الدار وADOSH والقوانين الإماراتية.",vision:"الرؤية",visionText:"تحقيق هدف صفر ضرر من خلال ترسيخ القرارات الآمنة في كل نشاط وكل يوم وعلى جميع المستويات.",objectives:"الأهداف",objectivesText:"منع الإصابات والأمراض المهنية وتعزيز الكفاءة وإغلاق الملاحظات وتحسين أداء المقاولين والتطوير المستمر لنظام السلامة.",roles:"الأدوار والمسؤوليات",rolesText:"يقوم قسم السلامة بالتخطيط والمشورة والتفتيش والتدريب والمتابعة والتقارير، وتوفر الإدارة الموارد ويطبق المشرفون الضوابط ويحق لكل عامل إيقاف العمل غير الآمن.",livePerformance:"الأداء التراكمي المباشر",manpower:"إجمالي القوى العاملة",manhours:"ساعات العمل",liveCounter:"عداد مباشر وفق وقت العمل في الإمارات",ltiDays:"أيام بدون إصابة مضيعة للوقت",trainingSessions:"جلسات التدريب",personnelTrained:"الأشخاص المدربون",trainingHours:"ساعات التدريب",inductions:"تعريف السلامة",meetings:"اجتماعات السلامة",audits:"تدقيقات السلامة",inspections:"تفتيشات السلامة",reviews:"مراجعات الإجراءات",drills:"تمارين الطوارئ",reportTrend:"تحليل اتجاه ملاحظات السلامة",unsafeActs:"الأفعال غير الآمنة",unsafeConditions:"الظروف غير الآمنة",goodPractices:"الممارسات الجيدة",reportConcern:"الإبلاغ عن ملاحظة سلامة",whatsappConcern:"الإبلاغ عبر واتساب",category:"الفئة",trackReport:"تتبع التقرير",library:"مكتبة الوثائق العامة",newsTitle:"أخبار وإعلانات السلامة",galleryTitle:"معرض صور السلامة",emergencyTitle:"معلومات الطوارئ"}};
let lang="en";
document.getElementById("langBtn").addEventListener("click",()=>{lang=lang==="en"?"ar":"en";document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.getElementById("langBtn").textContent=lang==="en"?"العربية":"English";document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.textContent=translations[lang][k]})});
document.querySelector(".menu-btn").addEventListener("click",()=>document.querySelector(".links").classList.toggle("open"));

const baseline=2568386, baselineDate=new Date("2026-07-23T17:00:00+04:00");
let manpower=1500;
function workingSecondsBetween(start,end){
  let total=0, d=new Date(start);
  d.setUTCHours(20,0,0,0); // midnight UAE represented as prior-day 20:00 UTC
  while(d<end){
    const uae=new Date(d.getTime()+4*3600000);
    const day=uae.getUTCDay();
    if(day>=1&&day<=6){
      const blocks=[[8,13],[14,17]];
      for(const [a,b] of blocks){
        const s=new Date(Date.UTC(uae.getUTCFullYear(),uae.getUTCMonth(),uae.getUTCDate(),a-4));
        const e=new Date(Date.UTC(uae.getUTCFullYear(),uae.getUTCMonth(),uae.getUTCDate(),b-4));
        const lo=Math.max(start.getTime(),s.getTime()), hi=Math.min(end.getTime(),e.getTime());
        if(hi>lo)total+=(hi-lo)/1000;
      }
    }
    d=new Date(d.getTime()+86400000);
  }
  return total;
}
function updateManhours(){const now=new Date();const sec=now>baselineDate?workingSecondsBetween(baselineDate,now):0;const hours=baseline+(sec/3600)*manpower;document.getElementById("manhours").textContent=Math.floor(hours).toLocaleString("en-US")}
function updateLti(){const start=new Date("2026-05-12T00:00:00+04:00"),now=new Date();document.getElementById("ltiDays").textContent=Math.max(0,Math.floor((now-start)/86400000)+1)}
updateManhours();updateLti();setInterval(updateManhours,1000);

const reportCategories = ['Housekeeping & General Workplace Amenities', 'Traffic Management & Logistics', 'Working at Height', 'Scaffolding/Ladder', 'Personal Protective Equipment', 'Electrical Safety', 'Hand Tools', 'Excavations', 'Lifting Equipment and Lifting Accessories', 'Portable Power Tools', 'Plant and Equipment', 'Confined Space', 'Hot Work Operations', 'Compressed Air and Gases', 'Manual Handling', 'Welfare Facilities', 'Hazardous Substances', 'Machine Guarding', 'Storage Arrangements', 'Barricading of Hazards', 'Access and Egress', 'Permit to Work', 'Safety Signage & Signals', 'Falsework/Formwork', 'Waste Management', 'First Aid Case', 'Near Miss Incident', 'Property Damage', 'Lost Time Injury'];
const catSelect = document.getElementById("reportCategory");
if (catSelect) {
  reportCategories.forEach(name => catSelect.add(new Option(name, name)));
}

const docs=[
["OSH Plan","Project Occupational Safety and Health Plan"],
["Procedure","Emergency Response Procedure"],
["MSRA","Work at Height MSRA"],
["Legal Register","UAE OSH Legal Register"],
["Risk Register","Project Risk Register"],
["OSH Policy","MEC Occupational Safety and Health Policy"],
["OSH Campaign","Beat the Heat Campaign Pack"],
["Training","Work at Height Training Presentation"],
["Organization Chart","Project OSH Organization Chart"],
["Signages","Mandatory PPE Signage Pack"],
["Forms","Incident Notification Form"],
["Checklist","Scaffold Inspection Checklist"]
];
const docGrid=document.getElementById("documentGrid"),filter=document.getElementById("docFilter");
[...new Set(docs.map(d=>d[0]))].forEach(x=>filter.add(new Option(x,x)));
function renderDocs(){const q=document.getElementById("docSearch").value.toLowerCase(),f=filter.value;docGrid.innerHTML="";docs.filter(d=>(f==="all"||d[0]===f)&&d[1].toLowerCase().includes(q)).forEach(d=>{const el=document.createElement("article");el.className="doc-card";el.innerHTML=`<span class="tag">${d[0]}</span><h3>${d[1]}</h3><div class="doc-actions"><button data-view="${d[1]}">View</button><a href="#" download>Download</a></div>`;docGrid.appendChild(el)});document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{document.getElementById("viewerTitle").textContent=b.dataset.view;document.getElementById("viewer").classList.add("open")}))}
renderDocs();document.getElementById("docSearch").addEventListener("input",renderDocs);filter.addEventListener("change",renderDocs);
document.querySelector(".viewer-close").onclick=()=>document.getElementById("viewer").classList.remove("open");

const reportModal=document.getElementById("reportModal");document.getElementById("openReport").onclick=()=>reportModal.classList.add("open");document.querySelector(".modal-close").onclick=()=>reportModal.classList.remove("open");
document.getElementById("reportForm").addEventListener("submit",e=>{e.preventDefault();const ref="SY-"+Date.now().toString().slice(-8);const reports=JSON.parse(localStorage.getItem("sy_reports")||"[]");reports.push({ref,status:"New",date:new Date().toISOString(),closureDate:"",...Object.fromEntries(new FormData(e.target).entries())});localStorage.setItem("sy_reports",JSON.stringify(reports));document.getElementById("reportMsg").textContent=`Submitted successfully. Reference: ${ref}`;e.target.reset()});
document.getElementById("trackBtn").onclick=()=>{const ref=document.getElementById("trackRef").value.trim(),r=JSON.parse(localStorage.getItem("sy_reports")||"[]").find(x=>x.ref===ref);document.getElementById("trackResult").textContent=r?`Status: ${r.status}${r.closureDate?` | Closure date: ${r.closureDate}`:""}`:"Reference not found."};
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();const ref="ENQ-"+Date.now().toString().slice(-8);const list=JSON.parse(localStorage.getItem("sy_enquiries")||"[]");list.push({ref,status:"New",date:new Date().toISOString(),...Object.fromEntries(new FormData(e.target).entries())});localStorage.setItem("sy_enquiries",JSON.stringify(list));document.getElementById("contactMsg").textContent=`Enquiry received. Reference: ${ref}`;e.target.reset()});

function slider(sel,item,prev,next,ms){let idx=0;const items=[...document.querySelectorAll(item)];const show=n=>{items.forEach((x,i)=>x.classList.toggle("active",i===n));idx=n};document.querySelector(prev).onclick=()=>show((idx-1+items.length)%items.length);document.querySelector(next).onclick=()=>show((idx+1)%items.length);setInterval(()=>show((idx+1)%items.length),ms)}
slider(".slideshow",".slide",".slide-prev",".slide-next",3000);slider(".award-slider",".award",".award-prev",".award-next",3000);

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
