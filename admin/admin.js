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

$("signOut").onclick=async()=>{await db.auth.signOut();location.reload();};
document.querySelectorAll("[data-panel]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));$(b.dataset.panel).classList.add("active")});

async function loadAll(){await Promise.all([loadSettings(),loadReports(),loadTrendAdmin(),loadDocuments(),loadTrainingVideos(),loadNews(),loadContactSettings(),loadTeamMembers(),loadGallery(),loadLocations(),loadHolidays(),loadEnquiries()]);}
async function loadSettings(){const {data,error}=await db.from("settings").select("*").eq("id",1).maybeSingle();if(error)throw error;const s=data||{};$("dashManpower").textContent=Number(s.manpower||0).toLocaleString();$("dashManhours").textContent=Number(s.baseline_manhours||0).toLocaleString();
const map={pManpower:s.manpower,pBaseline:s.baseline_manhours,pBaselineAt:s.baseline_at?new Date(s.baseline_at).toISOString().slice(0,16):"",pAdjustment:s.manhour_adjustment||0,pWorkStart:s.work_start?.slice(0,5),pLunchStart:s.lunch_start?.slice(0,5),pLunchEnd:s.lunch_end?.slice(0,5),pWorkEnd:s.work_end?.slice(0,5),pLastLti:s.last_lti_date,pTrainingSessions:s.training_sessions,pPersonnelTrained:s.personnel_trained,pTrainingHours:s.training_hours,pInductions:s.osh_inductions,pMeetings:s.osh_meetings,pAudits:s.osh_audits,pInspections:s.osh_inspections,pReviews:s.procedure_reviews,pDrills:s.emergency_drills};for(const [id,v] of Object.entries(map))if(v!==undefined&&v!==null)$(id).value=v;$("pPaused").checked=Boolean(s.counter_paused);}
$("performanceForm").onsubmit=async e=>{e.preventDefault();setStatus("performanceStatus","Saving…");const payload={id:1,manpower:Number($("pManpower").value),baseline_manhours:Number($("pBaseline").value),baseline_at:new Date($("pBaselineAt").value).toISOString(),manhour_adjustment:Number($("pAdjustment").value||0),counter_paused:$("pPaused").checked,work_start:$("pWorkStart").value,lunch_start:$("pLunchStart").value,lunch_end:$("pLunchEnd").value,work_end:$("pWorkEnd").value,last_lti_date:$("pLastLti").value,training_sessions:Number($("pTrainingSessions").value||0),personnel_trained:Number($("pPersonnelTrained").value||0),training_hours:Number($("pTrainingHours").value||0),osh_inductions:Number($("pInductions").value||0),osh_meetings:Number($("pMeetings").value||0),osh_audits:Number($("pAudits").value||0),osh_inspections:Number($("pInspections").value||0),procedure_reviews:Number($("pReviews").value||0),emergency_drills:Number($("pDrills").value||0)};const {error}=await db.from("settings").upsert(payload);setStatus("performanceStatus",error?error.message:"Saved. Public figures will update on refresh.");if(!error)await loadSettings();};

let reportRows=[];async function loadReports(){const {data,error}=await db.from("safety_reports").select("*").order("created_at",{ascending:false});if(error)throw error;reportRows=data||[];$("dashReports").textContent=reportRows.filter(r=>r.status!=="Closed").length;const list=$("reportList");list.innerHTML=reportRows.length?"":"<p>No reports submitted yet.</p>";for(const r of reportRows){const d=document.createElement("div");d.className=`data-item ${r.urgency==="Critical"?"critical":""}`;d.innerHTML=`<strong>${r.reference}</strong> | ${r.report_type} | ${r.category}<br><span class="small">${new Date(r.created_at).toLocaleString()} | ${r.location||""} ${r.location_details||""} | ${r.urgency||""}</span><p>${r.description||""}</p><label>Status<select class="report-status"><option>New</option><option>Under Review</option><option>Action Required</option><option>Closed</option></select></label><label>Admin remarks<textarea class="report-remarks">${r.admin_remarks||""}</textarea></label><div class="row-actions"><button class="primary save-report" type="button">Save</button>${r.photo_url?'<button class="primary view-photo" type="button">View Photo</button>':""}<button class="danger delete-report" type="button">Delete Report</button></div>`;d.querySelector(".report-status").value=r.status;d.querySelector(".save-report").onclick=async()=>{const status=d.querySelector(".report-status").value;const payload={status,admin_remarks:d.querySelector(".report-remarks").value,updated_at:new Date().toISOString(),closure_date:status==="Closed"?(r.closure_date||new Date().toISOString().slice(0,10)):null};const {error}=await db.from("safety_reports").update(payload).eq("id",r.id);if(error)alert(error.message);else {await loadReports();await loadTrendAdmin();}};d.querySelector(".view-photo")?.addEventListener("click",async()=>{const {data,error}=await db.storage.from("report-photos").createSignedUrl(r.photo_url,3600);if(error)alert(error.message);else window.open(data.signedUrl,"_blank","noopener")});
d.querySelector(".delete-report").onclick=async()=>{
  const confirmed=confirm(`Permanently delete safety report ${r.reference}?\n\nThis action cannot be undone.`);
  if(!confirmed)return;

  const deleteButton=d.querySelector(".delete-report");
  deleteButton.disabled=true;
  deleteButton.textContent="Deleting…";

  try{
    let photoWarning="";

    if(r.photo_url){
      const {error:photoError}=await db.storage
        .from("report-photos")
        .remove([r.photo_url]);

      if(photoError){
        photoWarning=`\n\nThe report was deleted, but its photo could not be removed: ${photoError.message}`;
      }
    }

    const {error:deleteError}=await db
      .from("safety_reports")
      .delete()
      .eq("id",r.id);

    if(deleteError)throw deleteError;

    alert(`Safety report ${r.reference} was permanently deleted.${photoWarning}`);
    await loadReports();
    await loadTrendAdmin();
  }catch(error){
    deleteButton.disabled=false;
    deleteButton.textContent="Delete Report";
    alert(`Unable to delete the report: ${error.message}`);
  }
};
list.appendChild(d);}}

function downloadExcelBlob(blob,fileName){
  const link=document.createElement("a");
  const url=URL.createObjectURL(blob);
  link.href=url;
  link.download=fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}

async function imageBlobToPngDataUrl(blob,maxWidth=720,maxHeight=540){
  const objectUrl=URL.createObjectURL(blob);

  try{
    const image=await new Promise((resolve,reject)=>{
      const element=new Image();
      element.onload=()=>resolve(element);
      element.onerror=()=>reject(new Error("The report photo could not be processed."));
      element.src=objectUrl;
    });

    const scale=Math.min(1,maxWidth/image.naturalWidth,maxHeight/image.naturalHeight);
    const width=Math.max(1,Math.round(image.naturalWidth*scale));
    const height=Math.max(1,Math.round(image.naturalHeight*scale));
    const canvas=document.createElement("canvas");
    canvas.width=width;
    canvas.height=height;

    const context=canvas.getContext("2d");
    context.fillStyle="#ffffff";
    context.fillRect(0,0,width,height);
    context.drawImage(image,0,0,width,height);

    return {
      dataUrl:canvas.toDataURL("image/png",0.9),
      width,
      height
    };
  }finally{
    URL.revokeObjectURL(objectUrl);
  }
}

async function getReportPhotoForExcel(photoPath){
  if(!photoPath)return null;

  const {data,error}=await db.storage
    .from("report-photos")
    .createSignedUrl(photoPath,600);

  if(error)throw error;

  const response=await fetch(data.signedUrl);
  if(!response.ok)throw new Error(`Photo download failed (${response.status}).`);

  return imageBlobToPngDataUrl(await response.blob());
}

function excelDateValue(value){
  if(!value)return "";
  const date=new Date(value);
  return Number.isNaN(date.getTime())?String(value):date;
}

$("exportExcel").onclick=async()=>{
  const button=$("exportExcel");
  const status=$("exportExcelStatus");

  if(!window.ExcelJS){
    alert("Excel export library did not load. Check the internet connection and refresh the Admin Dashboard.");
    return;
  }

  button.disabled=true;
  status.textContent="Preparing Excel workbook…";

  try{
    const workbook=new ExcelJS.Workbook();
    workbook.creator="MEC OSH Department";
    workbook.lastModifiedBy=ADMIN_EMAIL;
    workbook.created=new Date();
    workbook.modified=new Date();

    const worksheet=workbook.addWorksheet("Safety Reports",{
      views:[{state:"frozen",ySplit:4}]
    });

    worksheet.mergeCells("A1:K1");
    worksheet.getCell("A1").value="SAMA YAS RESIDENTIAL DEVELOPMENT";
    worksheet.getCell("A1").font={bold:true,size:18,color:{argb:"FFFFFFFF"}};
    worksheet.getCell("A1").fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF111111"}};
    worksheet.getCell("A1").alignment={horizontal:"center",vertical:"middle"};
    worksheet.getRow(1).height=30;

    worksheet.mergeCells("A2:K2");
    worksheet.getCell("A2").value="MEC OSH Department - Safety Reports Register";
    worksheet.getCell("A2").font={bold:true,size:13,color:{argb:"FF000000"}};
    worksheet.getCell("A2").fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFFFD400"}};
    worksheet.getCell("A2").alignment={horizontal:"center",vertical:"middle"};
    worksheet.getRow(2).height=24;

    worksheet.mergeCells("A3:K3");
    worksheet.getCell("A3").value=`Exported: ${new Date().toLocaleString("en-GB",{timeZone:"Asia/Dubai"})} UAE time`;
    worksheet.getCell("A3").font={italic:true,color:{argb:"FF555555"}};
    worksheet.getCell("A3").alignment={horizontal:"right"};

    const headers=[
      "Report ID",
      "Date",
      "Report Type",
      "Category",
      "Location",
      "Urgency",
      "Status",
      "Description",
      "Photo",
      "Closure Date",
      "Admin Remarks"
    ];

    const headerRow=worksheet.getRow(4);
    headerRow.values=headers;
    headerRow.height=30;
    headerRow.eachCell(cell=>{
      cell.font={bold:true,color:{argb:"FFFFFFFF"}};
      cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF1A1A1A"}};
      cell.alignment={horizontal:"center",vertical:"middle",wrapText:true};
      cell.border={
        top:{style:"thin",color:{argb:"FF888888"}},
        left:{style:"thin",color:{argb:"FF888888"}},
        bottom:{style:"thin",color:{argb:"FF888888"}},
        right:{style:"thin",color:{argb:"FF888888"}}
      };
    });

    worksheet.columns=[
      {key:"reference",width:18},
      {key:"created",width:20},
      {key:"type",width:20},
      {key:"category",width:32},
      {key:"location",width:28},
      {key:"urgency",width:13},
      {key:"status",width:17},
      {key:"description",width:42},
      {key:"photo",width:22},
      {key:"closure",width:16},
      {key:"remarks",width:36}
    ];

    for(let index=0;index<reportRows.length;index++){
      const report=reportRows[index];
      const rowNumber=index+5;
      const row=worksheet.getRow(rowNumber);

      status.textContent=`Preparing report ${index+1} of ${reportRows.length}…`;

      row.values=[
        report.reference||"",
        excelDateValue(report.created_at),
        report.report_type||"",
        report.category||"",
        `${report.location||""}${report.location_details?` - ${report.location_details}`:""}`,
        report.urgency||"",
        report.status||"",
        report.description||"",
        report.photo_url?"Loading photo…":"No photo",
        report.closure_date?excelDateValue(report.closure_date):"",
        report.admin_remarks||""
      ];

      row.height=82;
      row.alignment={vertical:"top",wrapText:true};

      row.eachCell((cell,columnNumber)=>{
        cell.border={
          top:{style:"thin",color:{argb:"FFD0D0D0"}},
          left:{style:"thin",color:{argb:"FFD0D0D0"}},
          bottom:{style:"thin",color:{argb:"FFD0D0D0"}},
          right:{style:"thin",color:{argb:"FFD0D0D0"}}
        };
        if(index%2===1){
          cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFF7F7F7"}};
        }
        if([1,2,3,6,7,9,10].includes(columnNumber)){
          cell.alignment={horizontal:"center",vertical:"middle",wrapText:true};
        }
      });

      row.getCell(2).numFmt="dd/mm/yyyy hh:mm";
      row.getCell(10).numFmt="dd/mm/yyyy";

      const urgencyColors={
        Low:"FFDCFCE7",
        Medium:"FFFEF3C7",
        High:"FFFED7AA",
        Critical:"FFFECACA"
      };
      if(urgencyColors[report.urgency]){
        row.getCell(6).fill={
          type:"pattern",
          pattern:"solid",
          fgColor:{argb:urgencyColors[report.urgency]}
        };
        row.getCell(6).font={bold:true};
      }

      if(report.status==="Closed"){
        row.getCell(7).fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFBBF7D0"}};
      }

      if(report.photo_url){
        try{
          const photo=await getReportPhotoForExcel(report.photo_url);
          if(photo){
            const imageId=workbook.addImage({
              base64:photo.dataUrl,
              extension:"png"
            });

            const maxWidth=118;
            const maxHeight=88;
            const scale=Math.min(maxWidth/photo.width,maxHeight/photo.height);
            const imageWidth=Math.max(1,Math.round(photo.width*scale));
            const imageHeight=Math.max(1,Math.round(photo.height*scale));

            worksheet.addImage(imageId,{
              tl:{col:8.12,row:rowNumber-1+0.10},
              ext:{width:imageWidth,height:imageHeight},
              editAs:"oneCell"
            });
            row.getCell(9).value="";
          }
        }catch(photoError){
          row.getCell(9).value="Photo unavailable";
          row.getCell(9).note=photoError.message;
        }
      }
    }

    worksheet.autoFilter="A4:K4";
    worksheet.getColumn(9).alignment={horizontal:"center",vertical:"middle"};

    worksheet.pageSetup={
      orientation:"landscape",
      paperSize:9,
      fitToPage:true,
      fitToWidth:1,
      fitToHeight:0,
      margins:{
        left:0.25,
        right:0.25,
        top:0.5,
        bottom:0.5,
        header:0.2,
        footer:0.2
      }
    };

    worksheet.headerFooter.oddFooter="MEC OSH Department | Page &P of &N";

    status.textContent="Creating Excel file…";
    const buffer=await workbook.xlsx.writeBuffer();
    const dateStamp=new Date().toISOString().slice(0,10);
    downloadExcelBlob(
      new Blob([buffer],{
        type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      `sama-yas-safety-reports-${dateStamp}.xlsx`
    );

    status.textContent=`Excel exported with ${reportRows.length} report${reportRows.length===1?"":"s"} and embedded photos.`;
  }catch(error){
    console.error(error);
    status.textContent="Export failed.";
    alert(`Unable to export Excel: ${error.message}`);
  }finally{
    button.disabled=false;
  }
};

async function upload(bucket,file,prefix){if(!file||!file.size)return null;if(file.size>50*1024*1024)throw new Error("File exceeds 50 MB.");const path=`${prefix}/${Date.now()}-${safeName(file.name)}`;const {error}=await db.storage.from(bucket).upload(path,file,{contentType:file.type,upsert:false});if(error)throw error;return {path,url:publicUrl(bucket,path)};}

let trendAdminRows=[];

function toLocalDateTimeInput(value){
  if(!value)return "";
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return "";

  const parts=new Intl.DateTimeFormat("en-CA",{
    timeZone:"Asia/Dubai",
    year:"numeric",
    month:"2-digit",
    day:"2-digit",
    hour:"2-digit",
    minute:"2-digit",
    hour12:false
  }).formatToParts(date);

  const values=Object.fromEntries(parts.map(part=>[part.type,part.value]));
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}

function trendCount(value){
  const number=Number(value);
  return Number.isFinite(number)&&number>=0?Math.round(number):0;
}

function renderTrendAdminRows(){
  const tbody=$("trendAdminRows");
  tbody.innerHTML="";

  trendAdminRows.forEach((row,index)=>{
    const tr=document.createElement("tr");
    tr.dataset.index=String(index);
    tr.innerHTML=`<td>${row.category}</td>
      <td><input class="trend-ua-open" type="number" min="0" step="1" value="${trendCount(row.unsafe_act_open_count)}"></td>
      <td><input class="trend-ua-closed" type="number" min="0" step="1" value="${trendCount(row.unsafe_act_closed_count)}"></td>
      <td><input class="trend-uc-open" type="number" min="0" step="1" value="${trendCount(row.unsafe_condition_open_count)}"></td>
      <td><input class="trend-uc-closed" type="number" min="0" step="1" value="${trendCount(row.unsafe_condition_closed_count)}"></td>`;
    tbody.appendChild(tr);
  });
}

async function loadTrendAdmin(){
  const [{data:rows,error:rowsError},{data:config,error:configError}]=await Promise.all([
    db.from("safety_trend_baseline")
      .select("category,sort_order,unsafe_act_open_count,unsafe_act_closed_count,unsafe_condition_open_count,unsafe_condition_closed_count")
      .order("sort_order")
      .order("category"),
    db.from("safety_trend_config")
      .select("baseline_cutoff")
      .eq("id",1)
      .maybeSingle()
  ]);

  if(rowsError)throw rowsError;
  if(configError)throw configError;

  trendAdminRows=rows||[];
  renderTrendAdminRows();

  if(config?.baseline_cutoff){
    $("trendBaselineCutoff").value=toLocalDateTimeInput(config.baseline_cutoff);
  }
}

$("reloadTrendData").onclick=async()=>{
  setStatus("trendAdminStatus","Reloading…");
  try{
    await loadTrendAdmin();
    setStatus("trendAdminStatus","Trend data reloaded.");
  }catch(error){
    setStatus("trendAdminStatus",error.message);
  }
};

$("trendAdminForm").onsubmit=async event=>{
  event.preventDefault();
  setStatus("trendAdminStatus","Saving trend data…");

  try{
    const cutoffValue=$("trendBaselineCutoff").value;
    if(!cutoffValue)throw new Error("Select the baseline cutoff date and time.");

    const payload=[...document.querySelectorAll("#trendAdminRows tr")].map((tr,index)=>{
      const source=trendAdminRows[index];
      const uaOpen=trendCount(tr.querySelector(".trend-ua-open").value);
      const uaClosed=trendCount(tr.querySelector(".trend-ua-closed").value);
      const ucOpen=trendCount(tr.querySelector(".trend-uc-open").value);
      const ucClosed=trendCount(tr.querySelector(".trend-uc-closed").value);

      return {
        category:source.category,
        sort_order:source.sort_order??index+1,
        unsafe_act_open_count:uaOpen,
        unsafe_act_closed_count:uaClosed,
        unsafe_condition_open_count:ucOpen,
        unsafe_condition_closed_count:ucClosed,
        unsafe_act_count:uaOpen+uaClosed,
        unsafe_condition_count:ucOpen+ucClosed,
        open_count:uaOpen+ucOpen,
        closed_count:uaClosed+ucClosed,
        updated_at:new Date().toISOString()
      };
    });

    const [{error:baselineError},{error:configError}]=await Promise.all([
      db.from("safety_trend_baseline").upsert(payload,{onConflict:"category"}),
      db.from("safety_trend_config").upsert({
        id:1,
        baseline_cutoff:new Date(cutoffValue).toISOString(),
        updated_at:new Date().toISOString()
      },{onConflict:"id"})
    ]);

    if(baselineError)throw baselineError;
    if(configError)throw configError;

    await loadTrendAdmin();
    setStatus("trendAdminStatus","Trend Analysis data saved. The public graph will refresh automatically.");
  }catch(error){
    setStatus("trendAdminStatus",error.message);
  }
};


async function loadDocuments(){const {data,error}=await db.from("documents").select("*").order("created_at",{ascending:false});if(error)throw error;const list=$("documentList");list.innerHTML=data?.length?"":"<p>No uploaded documents.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`<strong>${r.title_en}</strong> <span class="small">${r.category}</span><div class="row-actions"><a class="primary" href="${r.file_url}" target="_blank">Open</a><button class="danger">Delete</button></div>`;d.querySelector(".danger").onclick=async()=>{if(!confirm("Delete this document permanently?"))return;const paths=[storagePath(r.file_url,"documents"),storagePath(r.preview_url,"documents")].filter(Boolean);if(paths.length)await db.storage.from("documents").remove(paths);const {error}=await db.from("documents").delete().eq("id",r.id);if(error)alert(error.message);else loadDocuments();};list.appendChild(d);});}
$("documentForm").onsubmit=async e=>{e.preventDefault();setStatus("documentStatus","Uploading…");try{const file=await upload("documents",$("docFile").files[0],$("docCategory").value);const preview=await upload("documents",$("docPreview").files[0],`${$("docCategory").value}/previews`);const {error}=await db.from("documents").insert({category:$("docCategory").value,title_en:$("docTitleEn").value,title_ar:$("docTitleAr").value||null,file_url:file.url,preview_url:preview?.url||null});if(error)throw error;e.target.reset();setStatus("documentStatus","Uploaded.");loadDocuments();}catch(err){setStatus("documentStatus",err.message)}};


async function loadTrainingVideos(){
  const {data,error}=await db
    .from("gallery")
    .select("*")
    .eq("gallery_type","Training Awareness Video")
    .order("sort_order")
    .order("created_at",{ascending:false});

  if(error) throw error;

  const list=$("trainingVideoList");
  list.innerHTML=data?.length?"":"<p>No training videos uploaded.</p>";

  (data||[]).forEach(r=>{
    const item=document.createElement("div");
    item.className="data-item";
    item.innerHTML=`<video class="preview-video" controls preload="metadata">
      <source src="${r.image_url}">
    </video>
    <br><strong>${r.title_en}</strong>
    <span class="small">Sort order: ${r.sort_order||0}</span>
    <div class="row-actions">
      <a class="primary" href="${r.image_url}" target="_blank" rel="noopener">Open Video</a>
      <button class="danger" type="button">Delete</button>
    </div>`;

    item.querySelector(".danger").onclick=async()=>{
      if(!confirm("Delete this training video?")) return;

      const path=storagePath(r.image_url,"gallery");
      if(path) await db.storage.from("gallery").remove([path]);

      const {error}=await db.from("gallery").delete().eq("id",r.id);
      if(error) alert(error.message);
      else loadTrainingVideos();
    };

    list.appendChild(item);
  });
}

$("trainingVideoForm").onsubmit=async event=>{
  event.preventDefault();
  setStatus("trainingVideoStatus","Uploading…");

  try{
    const selectedFile=$("trainingVideoFile").files[0];
    const externalUrl=$("trainingVideoUrl").value.trim();

    if(!selectedFile && !externalUrl){
      throw new Error("Select a video file or enter a direct video URL.");
    }

    let videoUrl=externalUrl;

    if(selectedFile){
      if(!selectedFile.type.startsWith("video/")){
        throw new Error("Please select a valid video file.");
      }
      const uploaded=await upload("gallery",selectedFile,"training-videos");
      videoUrl=uploaded.url;
    }else{
      new URL(externalUrl);
    }

    const {error}=await db.from("gallery").insert({
      gallery_type:"Training Awareness Video",
      title_en:$("trainingVideoTitleEn").value,
      title_ar:$("trainingVideoTitleAr").value||null,
      image_url:videoUrl,
      sort_order:Number($("trainingVideoOrder").value||0)
    });

    if(error) throw error;

    event.target.reset();
    $("trainingVideoOrder").value="0";
    setStatus("trainingVideoStatus","Video published.");
    loadTrainingVideos();
  }catch(error){
    setStatus("trainingVideoStatus",error.message);
  }
};

async function loadNews(){const {data,error}=await db.from("news").select("*").order("created_at",{ascending:false});if(error)throw error;const list=$("newsList");list.innerHTML=data?.length?"":"<p>No news items.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`<strong>${r.title_en}</strong> <span class="small">${r.published?"Published":"Unpublished"}${r.pinned?" | Pinned":""}</span><p>${r.summary_en||""}</p><button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{if(!confirm("Delete this news item?"))return;const {error}=await db.from("news").delete().eq("id",r.id);if(error)alert(error.message);else loadNews();};list.appendChild(d);});}
$("newsForm").onsubmit=async e=>{e.preventDefault();setStatus("newsStatus","Saving…");try{const image=await upload("gallery",$("newsImage").files[0],"news");const attachment=await upload("documents",$("newsAttachment").files[0],"news-attachments");const payload={title_en:$("newsTitleEn").value,title_ar:$("newsTitleAr").value||null,summary_en:$("newsSummaryEn").value||null,summary_ar:$("newsSummaryAr").value||null,details_en:$("newsDetailsEn").value||null,details_ar:$("newsDetailsAr").value||null,image_url:image?.url||null,attachment_url:attachment?.url||null,published:$("newsPublished").checked,pinned:$("newsPinned").checked};const {error}=await db.from("news").insert(payload);if(error)throw error;e.target.reset();$("newsPublished").checked=true;setStatus("newsStatus","Saved.");loadNews();}catch(err){setStatus("newsStatus",err.message)}};



let contactSettingsRow=null;

function contactAdminImageUrl(url){
  if(!url)return "../assets/muhammed-shamil-contact.webp";
  if(/^https?:\/\//i.test(url)||url.startsWith("data:")||url.startsWith("blob:")){
    return url;
  }
  return `../${url.replace(/^\/+/,"")}`;
}

async function loadContactSettings(){
  const {data,error}=await db
    .from("contact_settings")
    .select("*")
    .eq("id",1)
    .maybeSingle();

  if(error)throw error;

  contactSettingsRow=data||{
    id:1,
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

  const values={
    contactNameEn:contactSettingsRow.name_en,
    contactNameAr:contactSettingsRow.name_ar,
    contactDesignationEn:contactSettingsRow.designation_en,
    contactDesignationAr:contactSettingsRow.designation_ar,
    contactProjectEn:contactSettingsRow.project_en,
    contactProjectAr:contactSettingsRow.project_ar,
    contactLocationEn:contactSettingsRow.location_en,
    contactLocationAr:contactSettingsRow.location_ar,
    contactPhoneLabelEn:contactSettingsRow.phone_label_en,
    contactPhoneLabelAr:contactSettingsRow.phone_label_ar,
    contactAdminEmail:contactSettingsRow.email,
    contactAdminPhone:contactSettingsRow.phone
  };

  Object.entries(values).forEach(([id,value])=>{
    if($(id))$(id).value=value||"";
  });

  $("contactAdminPreview").src=contactAdminImageUrl(contactSettingsRow.photo_url);
  $("contactAdminPhoto").value="";
}

$("contactAdminPhoto").addEventListener("change",event=>{
  const file=event.target.files[0];
  if(!file){
    $("contactAdminPreview").src=contactAdminImageUrl(contactSettingsRow?.photo_url);
    return;
  }

  if(!file.type.startsWith("image/")){
    event.target.value="";
    alert("Select a valid image file.");
    return;
  }

  $("contactAdminPreview").src=URL.createObjectURL(file);
});

$("contactSettingsForm").onsubmit=async event=>{
  event.preventDefault();
  setStatus("contactSettingsStatus","Saving…");

  try{
    const newPhoto=$("contactAdminPhoto").files[0];
    let photoUrl=contactSettingsRow?.photo_url||"assets/muhammed-shamil-contact.webp";
    let uploadedPhotoPath=null;

    if(newPhoto){
      if(!newPhoto.type.startsWith("image/")){
        throw new Error("Select a valid image file.");
      }

      const uploaded=await upload("gallery",newPhoto,"contact");
      photoUrl=uploaded.url;
      uploadedPhotoPath=uploaded.path;
    }

    const payload={
      id:1,
      name_en:$("contactNameEn").value.trim(),
      name_ar:$("contactNameAr").value.trim()||null,
      designation_en:$("contactDesignationEn").value.trim(),
      designation_ar:$("contactDesignationAr").value.trim()||null,
      project_en:$("contactProjectEn").value.trim(),
      project_ar:$("contactProjectAr").value.trim()||null,
      location_en:$("contactLocationEn").value.trim(),
      location_ar:$("contactLocationAr").value.trim()||null,
      email:$("contactAdminEmail").value.trim(),
      phone_label_en:$("contactPhoneLabelEn").value.trim(),
      phone_label_ar:$("contactPhoneLabelAr").value.trim()||null,
      phone:$("contactAdminPhone").value.trim(),
      photo_url:photoUrl,
      updated_at:new Date().toISOString()
    };

    const {error}=await db
      .from("contact_settings")
      .upsert(payload,{onConflict:"id"});

    if(error){
      if(uploadedPhotoPath){
        await db.storage.from("gallery").remove([uploadedPhotoPath]);
      }
      throw error;
    }

    const oldPhotoPath=storagePath(contactSettingsRow?.photo_url,"gallery");
    if(newPhoto&&oldPhotoPath&&oldPhotoPath!==uploadedPhotoPath){
      await db.storage.from("gallery").remove([oldPhotoPath]);
    }

    await loadContactSettings();
    setStatus(
      "contactSettingsStatus",
      "Contact section saved. The public website will update on refresh."
    );
  }catch(error){
    setStatus("contactSettingsStatus",error.message);
  }
};

async function loadTeamMembers(){
  const {data,error}=await db
    .from("team_members")
    .select("*")
    .order("sort_order")
    .order("created_at",{ascending:true});

  if(error)throw error;

  const list=$("teamMemberList");
  list.innerHTML=data?.length?"":"<p>No team members added.</p>";

  (data||[]).forEach(member=>{
    const card=document.createElement("div");
    card.className="data-item team-member-admin-card";

    card.innerHTML=`<img class="team-member-admin-photo"
                         src="${member.photo_url}"
                         alt="${member.name_en}">
      <div class="team-member-admin-fields">
        <label>English name
          <input class="member-name-en" value="${member.name_en||""}">
        </label>
        <label>Arabic name
          <input class="member-name-ar" value="${member.name_ar||""}">
        </label>
        <label>English designation
          <input class="member-designation-en" value="${member.designation_en||""}">
        </label>
        <label>Arabic designation
          <input class="member-designation-ar" value="${member.designation_ar||""}">
        </label>
        <label>Sort order
          <input class="member-sort-order" type="number" value="${member.sort_order||0}">
        </label>
        <label>
          <input class="member-active" type="checkbox" ${member.active?"checked":""}>
          Show on public website
        </label>
        <div class="team-member-admin-actions">
          <button class="primary save-team-member" type="button">Save Changes</button>
          <button class="danger delete-team-member" type="button">Delete</button>
        </div>
      </div>`;

    card.querySelector(".save-team-member").onclick=async()=>{
      const saveButton=card.querySelector(".save-team-member");
      saveButton.disabled=true;
      saveButton.textContent="Saving…";

      const {error}=await db.from("team_members").update({
        name_en:card.querySelector(".member-name-en").value.trim(),
        name_ar:card.querySelector(".member-name-ar").value.trim()||null,
        designation_en:card.querySelector(".member-designation-en").value.trim(),
        designation_ar:card.querySelector(".member-designation-ar").value.trim()||null,
        sort_order:Number(card.querySelector(".member-sort-order").value||0),
        active:card.querySelector(".member-active").checked,
        updated_at:new Date().toISOString()
      }).eq("id",member.id);

      saveButton.disabled=false;
      saveButton.textContent="Save Changes";

      if(error)alert(error.message);
      else{
        alert("Team member updated.");
        loadTeamMembers();
      }
    };

    card.querySelector(".delete-team-member").onclick=async()=>{
      if(!confirm(`Delete ${member.name_en}?`))return;

      const photoPath=storagePath(member.photo_url,"gallery");
      if(photoPath){
        await db.storage.from("gallery").remove([photoPath]);
      }

      const {error}=await db.from("team_members").delete().eq("id",member.id);
      if(error)alert(error.message);
      else loadTeamMembers();
    };

    list.appendChild(card);
  });
}

$("teamMemberForm").onsubmit=async event=>{
  event.preventDefault();
  setStatus("teamMemberStatus","Uploading…");

  try{
    const photo=$("teamPhoto").files[0];
    if(!photo)throw new Error("Select a profile photo.");
    if(!photo.type.startsWith("image/"))throw new Error("Select a valid image file.");

    const uploaded=await upload("gallery",photo,"team-members");

    const {error}=await db.from("team_members").insert({
      name_en:$("teamNameEn").value.trim(),
      name_ar:$("teamNameAr").value.trim()||null,
      designation_en:$("teamDesignationEn").value.trim(),
      designation_ar:$("teamDesignationAr").value.trim()||null,
      photo_url:uploaded.url,
      sort_order:Number($("teamSortOrder").value||0),
      active:$("teamActive").checked
    });

    if(error)throw error;

    event.target.reset();
    $("teamSortOrder").value="0";
    $("teamActive").checked=true;
    setStatus("teamMemberStatus","Team member added.");
    loadTeamMembers();
  }catch(error){
    setStatus("teamMemberStatus",error.message);
  }
};

async function loadGallery(){
  const {data,error}=await db
    .from("gallery")
    .select("*")
    .neq("gallery_type","Training Awareness Video")
    .order("sort_order")
    .order("created_at",{ascending:false});

  if(error)throw error;

  const list=$("galleryList");
  list.innerHTML=data?.length?"":"<p>No gallery media.</p>";

  (data||[]).forEach(r=>{
    const d=document.createElement("div");
    d.className="data-item";

    const isVideo=r.gallery_type==="OSH Gallery Video";
    const preview=isVideo
      ? `<video class="preview-video" controls preload="metadata"><source src="${r.image_url}"></video>`
      : `<img class="preview-thumb" src="${r.image_url}" alt="">`;

    d.innerHTML=`${preview}<br>
      <strong>${r.title_en}</strong>
      <span class="small">${r.gallery_type}</span><br>
      <button class="danger" type="button">Delete</button>`;

    d.querySelector(".danger").onclick=async()=>{
      if(!confirm(`Delete this ${isVideo?"video":"image"}?`))return;
      const path=storagePath(r.image_url,"gallery");
      if(path)await db.storage.from("gallery").remove([path]);
      const {error}=await db.from("gallery").delete().eq("id",r.id);
      if(error)alert(error.message);
      else loadGallery();
    };

    list.appendChild(d);
  });
}
$("galleryForm").onsubmit=async e=>{
  e.preventDefault();
  setStatus("galleryStatus","Uploading…");

  try{
    const file=$("galleryFile").files[0];
    if(!file)throw new Error("Select a photo or video file.");

    const galleryType=$("galleryType").value;
    const isVideo=galleryType==="OSH Gallery Video";

    if(isVideo&&!file.type.startsWith("video/")){
      throw new Error("Select a valid video file for OSH Gallery Video.");
    }

    if(!isVideo&&!file.type.startsWith("image/")){
      throw new Error("Select a valid image file for this option.");
    }

    const folder=galleryType==="Award"
      ?"awards"
      :isVideo
        ?"osh-gallery-videos"
        :"photos";

    const media=await upload("gallery",file,folder);

    const {error}=await db.from("gallery").insert({
      gallery_type:galleryType,
      title_en:$("galleryTitleEn").value,
      title_ar:$("galleryTitleAr").value||null,
      image_url:media.url,
      sort_order:Number($("galleryOrder").value||0)
    });

    if(error)throw error;

    e.target.reset();
    $("galleryOrder").value="0";
    setStatus("galleryStatus",isVideo?"Video uploaded to OSH Gallery.":"Image uploaded.");
    loadGallery();
  }catch(err){
    setStatus("galleryStatus",err.message);
  }
};

async function loadLocations(){const {data,error}=await db.from("site_locations").select("*").order("sort_order");if(error)throw error;const list=$("locationList");list.innerHTML="";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`${r.name_en} <button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{const {error}=await db.from("site_locations").delete().eq("id",r.id);if(error)alert(error.message);else loadLocations();};list.appendChild(d);});}
$("locationForm").onsubmit=async e=>{e.preventDefault();const {error}=await db.from("site_locations").insert({name_en:$("locationNameEn").value,name_ar:$("locationNameAr").value||null});setStatus("locationStatus",error?error.message:"Added.");if(!error){e.target.reset();loadLocations();}};
async function loadHolidays(){const {data,error}=await db.from("holidays").select("*").order("holiday_date");if(error)throw error;const list=$("holidayList");list.innerHTML="";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";d.innerHTML=`${r.holiday_date} | ${r.name_en} <button class="danger">Delete</button>`;d.querySelector(".danger").onclick=async()=>{const {error}=await db.from("holidays").delete().eq("id",r.id);if(error)alert(error.message);else loadHolidays();};list.appendChild(d);});}
$("holidayForm").onsubmit=async e=>{e.preventDefault();const {error}=await db.from("holidays").insert({holiday_date:$("holidayDate").value,name_en:$("holidayNameEn").value,name_ar:$("holidayNameAr").value||null});setStatus("holidayStatus",error?error.message:"Added.");if(!error){e.target.reset();loadHolidays();}};

async function loadEnquiries(){const {data,error}=await db.from("enquiries").select("*").order("created_at",{ascending:false});if(error)throw error;const list=$("enquiryList");list.innerHTML=data?.length?"":"<p>No enquiries.</p>";(data||[]).forEach(r=>{const d=document.createElement("div");d.className="data-item";const subject=encodeURIComponent(`Re: ${r.subject} [${r.reference}]`),body=encodeURIComponent(`Dear ${r.name||"Sir/Madam"},\n\n\n\nRegards,\nMEC OSH Department`);d.innerHTML=`<strong>${r.reference}</strong> | ${r.name||""} | ${r.email||""}<p>${r.subject||""}</p><p>${r.message||""}</p><label>Status<select><option>New</option><option>In Progress</option><option>Replied</option><option>Closed</option></select></label><div class="row-actions"><button class="primary save-enquiry">Save Status</button><a class="primary" href="mailto:${r.email}?subject=${subject}&body=${body}">Reply by Email</a></div>`;d.querySelector("select").value=r.status;d.querySelector(".save-enquiry").onclick=async()=>{const {error}=await db.from("enquiries").update({status:d.querySelector("select").value}).eq("id",r.id);if(error)alert(error.message);else loadEnquiries();};list.appendChild(d);});}
initialise();