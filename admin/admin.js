"use strict";
const db=window.mecSupabase; const ADMIN_EMAIL="muhammed.shamil@mecemirates.com";
const $=id=>document.getElementById(id); const setStatus=(id,text)=>{$(id).textContent=text||""};
function safeName(name){return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/-+/g,"-");}
function publicUrl(bucket,path){return db.storage.from(bucket).getPublicUrl(path).data.publicUrl;}
function storagePath(url,bucket){const marker=`/storage/v1/object/public/${bucket}/`;return url?.includes(marker)?decodeURIComponent(url.split(marker)[1]):null;}
async function requireAdmin(session){const email=session?.user?.email?.toLowerCase();if(email!==ADMIN_EMAIL){if(session)await db.auth.signOut();throw new Error("This account is not authorised for the MEC OSH Admin Dashboard.");}}
async function showApp(session){await requireAdmin(session);$("loginView").hidden=true;$("adminApp").hidden=false;$("adminIdentity").textContent=session.user.email;await loadAll();}
async function initialise(){
  const url = new URL(window.location.href);
  const authError =
    url.searchParams.get("error_description") ||
    new URLSearchParams(window.location.hash.replace(/^#/, "")).get("error_description");

  if(authError){
    setStatus("loginStatus", decodeURIComponent(authError.replace(/\+/g, " ")));
    history.replaceState({}, document.title, window.location.pathname);
  }

  const {data:{session}, error} = await db.auth.getSession();
  if(error){
    setStatus("loginStatus", error.message);
    return;
  }
  if(session){
    try{
      await showApp(session);
    }catch(e){
      setStatus("loginStatus", e.message);
    }
  }
}

$("signIn").onclick=async()=>{
  const password=$("password").value;
  if(!password){
    setStatus("loginStatus","Enter your password.");
    return;
  }

  setStatus("loginStatus","Signing in…");
  $("signIn").disabled=true;

  const {data,error}=await db.auth.signInWithPassword({
    email:ADMIN_EMAIL,
    password
  });

  $("signIn").disabled=false;

  if(error){
    setStatus("loginStatus",error.message);
    return;
  }

  try{
    await showApp(data.session);
    setStatus("loginStatus","");
  }catch(e){
    setStatus("loginStatus",e.message);
  }
};

$("password").addEventListener("keydown",event=>{
  if(event.key==="Enter") $("signIn").click();
});

db.auth.onAuthStateChange(async(event,session)=>{
  if(event==="SIGNED_IN" && session && $("adminApp").hidden){
    try{
      await showApp(session);
    }catch(e){
      setStatus("loginStatus",e.message);
    }
  }
});

$("signOut").onclick=async()=>{await db.auth.signOut();location.reload();};location.reload();};
document.querySelectorAll("[data-panel]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));$(b.dataset.panel).classList.add("active")});

async function loadAll(){await Promise.all([loadSettings(),loadReports(),loadDocuments(),loadNews(),loadGallery(),loadLocations(),loadHolidays(),loadEnquiries()]);}
async function loadSettings(){const {data,error}=await db.from("settings").select("*").eq("id",1).maybeSingle();if(error)throw error;const s=data||{};$("dashManpower").textContent=Number(s.manpower||0).toLocaleString();$("dashManhours").textContent=Number(s.baseline_manhours||0).toLocaleString();
const map={pManpower:s.manpower,pBaseline:s.baseline_manhours,pBaselineAt:s.baseline_at?new Date(s.baseline_at).toISOString().slice(0,16):"",pAdjustment:s.manhour_adjustment||0,pWorkStart:s.work_start?.slice(0,5),pLunchStart:s.lunch_start?.slice(0,5),pLunchEnd:s.lunch_end?.slice(0,5),pWorkEnd:s.work_end?.slice(0,5),pLastLti:s.last_lti_date,pTrainingSessions:s.training_sessions,pPersonnelTrained:s.personnel_trained,pTrainingHours:s.training_hours,pInductions:s.osh_inductions,pMeetings:s.osh_meetings,pAudits:s.osh_audits,pInspections:s.osh_inspections,pReviews:s.procedure_reviews,pDrills:s.emergency_drills};for(const [id,v] of Object.entries(map))if(v!==undefined&&v!==null)$(id).value=v;$("pPaused").checked=Boolean(s.counter_paused);}
$("performanceForm").onsubmit=async e=>{e.preventDefault();setStatus("performanceStatus","Saving…");const payload={id:1,manpower:Number($("pManpower").value),baseline_manhours:Number($("pBaseline").value),baseline_at:new Date($("pBaselineAt").value).toISOString(),manhour_adjustment:Number($("pAdjustment").value||0),counter_paused:$("pPaused").checked,work_start:$("pWorkStart").value,lunch_start:$("pLunchStart").value,lunch_end:$("pLunchEnd").value,work_end:$("pWorkEnd").value,last_lti_date:$("pLastLti").value,training_sessions:Number($("pTrainingSessions").value||0),personnel_trained:Number($("pPersonnelTrained").value||0),training_hours:Number($("pTrainingHours").value||0),osh_inductions:Number($("pInductions").value||0),osh_meetings:Number($("pMeetings").value||0),osh_audits:Number($("pAudits").value||0),osh_inspections:Number($("pInspections").value||0),procedure_reviews:Number($("pReviews").value||0),emergency_drills:Number($("pDrills").value||0)};const {error}=await db.from("settings").upsert(payload);setStatus("performanceStatus",error?error.message:"Saved. Public figures will update on refresh.");if(!error)await loadSettings();};

let reportRows=[];async function loadReports(){const {data,error}=await db.from("safety_reports").select("*").order("created_at",{ascending:false});if(error)throw error;reportRows=data||[];$("dashReports").textContent=reportRows.filter(r=>r.status!=="Closed").length;const list=$("reportList");list.innerHTML=reportRows.length?"":"<p>No reports submitted yet.</p>";for(const r of reportRows){const d=document.createElement("div");d.className=`data-item ${r.urgency==="Critical"?"critical":""}`;d.innerHTML=`<strong>${r.reference}</strong> | ${r.report_type} | ${r.category}<br><span class="small">${new Date(r.created_at).toLocaleString()} | ${r.location||""} ${r.location_details||""} | ${r.urgency||""}</span><p>${r.description||""}</p><label>Status<select class="report-status"><option>New</option><option>Under Review</option><option>Action Required</option><option>Closed</option></select></label><label>Admin remarks<textarea class="report-remarks">${r.admin_remarks||""}</textarea></label><div class="row-actions"><button class="primary save-report">Save</button>${r.photo_url?'<button class="primary view-photo">View Photo</button>':""}</div>`;d.querySelector(".report-status").value=r.status;d.querySelector(".save-report").onclick=async()=>{const status=d.querySelector(".report-status").value;const payload={status,admin_remarks:d.querySelector(".report-remarks").value,updated_at:new Date().toISOString(),closure_date:status==="Closed"?(r.closure_date||new Date().toISOString().slice(0,10)):null};const {error}=await db.from("safety_reports").update(payload).eq("id",r.id);if(error)alert(error.message);else loadReports();};d.querySelector(".view-photo")?.addEventListener("click",async()=>{const {data,error}=await db.storage.from("report-photos").createSignedUrl(r.photo_url,3600);if(error)alert(error.message);else window.open(data.signedUrl,"_blank","noopener")});list.appendChild(d);}}
$("exportExcel").onclick=()=>{const headers=["Report ID","Date","Report Type","Category","Location","Urgency","Status","Description","Photo Path","Closure Date","Admin Remarks"];const csv=[headers,...reportRows.map(r=>[r.reference,r.created_at,r.report_type,r.category,`${r.location||""} ${r.location_details||""}`,r.urgency,r.status,r.description,r.photo_url,r.closure_date,r.admin_remarks])].map(row=>row.map(v=>`"${String(v||"").replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="sama-yas-safety-reports.csv";a.click();URL.revokeObjectURL(a.href);};

async function upload(bucket,file,prefix){if(!file||!file.size)return null;if(file.size>50*1024*1024)throw new Error("File exceeds 50 MB.");const path=`${prefix}/${Date.now()}-${safeName(file.name)}`;const {error}=await db.storage.from(bucket).upload(path,file,{contentType:file.type,upsert:false});if(error)throw error;return {path,url:publicUrl(bucket,path)};}
async function loadDocuments(){const {data,error}=await db.from("documents").select("*").order("created_at",{ascending:false});if(error)throw error;const list=$("documentList");list.innerHTML=data?.length?"":"<p>No uploaded documents.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`<strong>${r.title_en}</strong> <span class="small">${r.category}</span><div class="row-actions"><a class="primary" href="${r.file_url}" target="_blank">Open</a><button class="danger">Delete</button></div>`;d.querySelector(".danger").onclick=async()=>{if(!confirm("Delete this document permanently?"))return;const paths=[storagePath(r.file_url,"documents"),storagePath(r.preview_url,"documents")].filter(Boolean);if(paths.length)await db.storage.from("documents").remove(paths);const {error}=await db.from("documents").delete().eq("id",r.id);if(error)alert(error.message);else loadDocuments();};list.appendChild(d);});}
$("documentForm").onsubmit=async e=>{e.preventDefault();setStatus("documentStatus","Uploading…");try{const file=await upload("documents",$("docFile").files[0],$("docCategory").value);const preview=await upload("documents",$("docPreview").files[0],`${$("docCategory").value}/previews`);const {error}=await db.from("documents").insert({category:$("docCategory").value,title_en:$("docTitleEn").value,title_ar:$("docTitleAr").value||null,file_url:file.url,preview_url:preview?.url||null});if(error)throw error;e.target.reset();setStatus("documentStatus","Uploaded.");loadDocuments();}catch(err){setStatus("documentStatus",err.message)}};

async function loadNews(){const {data,error}=await db.from("news").select("*").order("created_at",{ascending:false});if(error)throw error;const list=$("newsList");list.innerHTML=data?.length?"":"<p>No news items.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`<strong>${r.title_en}</strong> <span class="small">${r.published?"Published":"Unpublished"}${r.pinned?" | Pinned":""}</span><p>${r.summary_en||""}</p><button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{if(!confirm("Delete this news item?"))return;const {error}=await db.from("news").delete().eq("id",r.id);if(error)alert(error.message);else loadNews();};list.appendChild(d);});}
$("newsForm").onsubmit=async e=>{e.preventDefault();setStatus("newsStatus","Saving…");try{const image=await upload("gallery",$("newsImage").files[0],"news");const attachment=await upload("documents",$("newsAttachment").files[0],"news-attachments");const payload={title_en:$("newsTitleEn").value,title_ar:$("newsTitleAr").value||null,summary_en:$("newsSummaryEn").value||null,summary_ar:$("newsSummaryAr").value||null,details_en:$("newsDetailsEn").value||null,details_ar:$("newsDetailsAr").value||null,image_url:image?.url||null,attachment_url:attachment?.url||null,published:$("newsPublished").checked,pinned:$("newsPinned").checked};const {error}=await db.from("news").insert(payload);if(error)throw error;e.target.reset();$("newsPublished").checked=true;setStatus("newsStatus","Saved.");loadNews();}catch(err){setStatus("newsStatus",err.message)}};

async function loadGallery(){const {data,error}=await db.from("gallery").select("*").order("sort_order").order("created_at",{ascending:false});if(error)throw error;const list=$("galleryList");list.innerHTML=data?.length?"":"<p>No gallery images.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`<img class="preview-thumb" src="${r.image_url}" alt=""><br><strong>${r.title_en}</strong> <span class="small">${r.gallery_type}</span><br><button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{if(!confirm("Delete this image?"))return;const path=storagePath(r.image_url,"gallery");if(path)await db.storage.from("gallery").remove([path]);const {error}=await db.from("gallery").delete().eq("id",r.id);if(error)alert(error.message);else loadGallery();};list.appendChild(d);});}
$("galleryForm").onsubmit=async e=>{e.preventDefault();setStatus("galleryStatus","Uploading…");try{const image=await upload("gallery",$("galleryFile").files[0],$("galleryType").value==="Award"?"awards":"photos");const {error}=await db.from("gallery").insert({gallery_type:$("galleryType").value,title_en:$("galleryTitleEn").value,title_ar:$("galleryTitleAr").value||null,image_url:image.url,sort_order:Number($("galleryOrder").value||0)});if(error)throw error;e.target.reset();setStatus("galleryStatus","Uploaded.");loadGallery();}catch(err){setStatus("galleryStatus",err.message)}};

async function loadLocations(){const {data,error}=await db.from("site_locations").select("*").order("sort_order");if(error)throw error;const list=$("locationList");list.innerHTML="";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`${r.name_en} <button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{const {error}=await db.from("site_locations").delete().eq("id",r.id);if(error)alert(error.message);else loadLocations();};list.appendChild(d);});}
$("locationForm").onsubmit=async e=>{e.preventDefault();const {error}=await db.from("site_locations").insert({name_en:$("locationNameEn").value,name_ar:$("locationNameAr").value||null});setStatus("locationStatus",error?error.message:"Added.");if(!error){e.target.reset();loadLocations();}};
async function loadHolidays(){const {data,error}=await db.from("holidays").select("*").order("holiday_date");if(error)throw error;const list=$("holidayList");list.innerHTML="";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`${r.holiday_date} | ${r.name_en} <button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{const {error}=await db.from("holidays").delete().eq("id",r.id);if(error)alert(error.message);else loadHolidays();};list.appendChild(d);});}
$("holidayForm").onsubmit=async e=>{e.preventDefault();const {error}=await db.from("holidays").insert({holiday_date:$("holidayDate").value,name_en:$("holidayNameEn").value,name_ar:$("holidayNameAr").value||null});setStatus("holidayStatus",error?error.message:"Added.");if(!error){e.target.reset();loadHolidays();}};

async function loadEnquiries(){const {data,error}=await db.from("enquiries").select("*").order("created_at",{ascending:false});if(error)throw error;const list=$("enquiryList");list.innerHTML=data?.length?"":"<p>No enquiries.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";const subject=encodeURIComponent(`Re: ${r.subject} [${r.reference}]`),body=encodeURIComponent(`Dear ${r.name||"Sir/Madam"},\n\n\n\nRegards,\nMEC OSH Department`);d.innerHTML=`<strong>${r.reference}</strong> | ${r.name||""} | ${r.email||""}<p>${r.subject||""}</p><p>${r.message||""}</p><label>Status<select><option>New</option><option>In Progress</option><option>Replied</option><option>Closed</option></select></label><div class="row-actions"><button class="primary save-enquiry">Save Status</button><a class="primary" href="mailto:${r.email}?subject=${subject}&body=${body}">Reply by Email</a></div>`;d.querySelector("select").value=r.status;d.querySelector(".save-enquiry").onclick=async()=>{const {error}=await db.from("enquiries").update({status:d.querySelector("select").value}).eq("id",r.id);if(error)alert(error.message);else loadEnquiries();};list.appendChild(d);});}
initialise();