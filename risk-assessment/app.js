
"use strict";

const register=Array.isArray(window.RISK_REGISTER)?window.RISK_REGISTER:[];
const state={activities:[],editingIndex:null};
const draftKey="mec-osh-risk-assessment-draft-v2-legal-references";
const legalReferences=window.RiskLegalReferences;

const byId=id=>document.getElementById(id);

const probabilityLabels={
  1:"1 - Rare",
  2:"2 - Possible",
  3:"3 - Likely",
  4:"4 - Often",
  5:"5 - Frequent / Almost Certain"
};

const severityLabels={
  1:"1 - Insignificant",
  2:"2 - Minor",
  3:"3 - Moderate",
  4:"4 - Major",
  5:"5 - Catastrophic"
};

function levelFromRating(rating){
  return RiskDocx.levelFromRating(Number(rating));
}

function levelColours(level){
  if(level==="Extreme Risk") return {background:"#c00000",color:"#fff"};
  if(level==="High Risk") return {background:"#ff0000",color:"#fff"};
  if(level==="Moderate Risk") return {background:"#ffc000",color:"#000"};
  return {background:"#00b050",color:"#000"};
}

function setBadge(element,level){
  const colours=levelColours(level);
  element.textContent=level;
  element.style.background=colours.background;
  element.style.color=colours.color;
}

function fillRatingSelect(select,labels){
  select.innerHTML=Object.entries(labels)
    .map(([value,label])=>`<option value="${value}">${label}</option>`)
    .join("");
}

function listToTextarea(items){
  return (items||[]).map(item=>`• ${item}`).join("\n");
}

function textareaToList(value){
  const text=String(value||"").replace(/•/g,"\n•");
  const result=[];
  let current="";

  text.split(/\r?\n/).forEach(raw=>{
    const line=raw.trim();
    if(!line) return;

    if(line.startsWith("•")){
      if(current) result.push(current.trim());
      current=line.slice(1).trim();
    }else if(current){
      current+=" "+line;
    }else{
      current=line;
    }
  });

  if(current) result.push(current.trim());
  return result.filter(Boolean);
}

function calculateRatings(){
  const rating=Number(byId("probability").value)*Number(byId("severity").value);
  const revised=Number(byId("revisedProbability").value)*Number(byId("revisedSeverity").value);

  byId("riskRating").value=rating;
  byId("revisedRiskRating").value=revised;
  setBadge(byId("riskLevel"),levelFromRating(rating));
  setBadge(byId("residualRiskLevel"),levelFromRating(revised));
}

function buildOptions(items,selectedId=null){
  const select=byId("activitySelect");
  const options=[
    '<option value="">Select an activity from the risk register</option>',
    ...items.map(item=>`<option value="${item.id}">${item.id}. ${item.activity}</option>`),
    '<option value="custom">Custom Activity</option>'
  ];
  select.innerHTML=options.join("");

  if(selectedId!==null&&[...select.options].some(option=>option.value===String(selectedId))){
    select.value=String(selectedId);
  }
}

function loadActivity(id){
  if(id==="custom"){
    clearBuilder(false);
    byId("activitySelect").value="custom";
    byId("activityName").focus();
    return;
  }

  const activity=register.find(item=>String(item.id)===String(id));
  if(!activity) return;

  byId("activityName").value=activity.activity;
  byId("hazards").value=listToTextarea(activity.hazards);
  byId("probability").value=String(activity.probability);
  byId("severity").value=String(activity.severity);
  byId("controls").value=listToTextarea(legalReferences.withRequiredReferences(activity.activity,activity.hazards,activity.controls));
  byId("revisedProbability").value=String(activity.revisedProbability);
  byId("revisedSeverity").value=String(activity.revisedSeverity);
  calculateRatings();
  byId("builderStatus").textContent=`Activity ${activity.id} loaded from the risk register.`;
}

function clearBuilder(resetSelect=true){
  if(resetSelect) byId("activitySelect").value="";
  byId("activityName").value="";
  byId("hazards").value="";
  byId("probability").value="4";
  byId("severity").value="3";
  byId("controls").value="";
  byId("revisedProbability").value="1";
  byId("revisedSeverity").value="3";
  state.editingIndex=null;
  byId("addActivity").textContent="Add Activity";
  byId("cancelEdit").classList.add("hidden");
  byId("builderStatus").textContent="";
  calculateRatings();
}

function activityFromBuilder(){
  const activity=byId("activityName").value.trim();
  const hazards=textareaToList(byId("hazards").value);
  const rawControls=textareaToList(byId("controls").value);
  const controls=legalReferences.withRequiredReferences(activity,hazards,rawControls);

  if(!activity) throw new Error("Enter or select an activity.");
  if(!hazards.length) throw new Error("Add at least one significant potential hazard.");
  if(!controls.length) throw new Error("Add at least one control measure.");

  return {
    activity,
    hazards,
    probability:Number(byId("probability").value),
    severity:Number(byId("severity").value),
    controls,
    revisedProbability:Number(byId("revisedProbability").value),
    revisedSeverity:Number(byId("revisedSeverity").value)
  };
}

function saveDraft(){
  const details={
    title:byId("assessmentTitle").value,
    projectName:byId("projectName").value,
    location:byId("assessmentLocation").value,
    date:byId("assessmentDate").value,
    preparedBy:byId("preparedBy").value,
    reviewedBy:byId("reviewedBy").value,
    approvedBy:byId("approvedBy").value,
    reference:byId("referenceNumber").value,
    activities:state.activities.map(item=>({
      ...item,
      controls:legalReferences.withRequiredReferences(item.activity,item.hazards,item.controls)
    }))
  };
  localStorage.setItem(draftKey,JSON.stringify(details));
}

function restoreDraft(){
  try{
    const saved=JSON.parse(localStorage.getItem(draftKey)||"null");
    if(!saved) return;

    byId("assessmentTitle").value=saved.title||"Project Risk Assessment";
    byId("projectName").value=saved.projectName||"Sama Yas Residential Development";
    byId("assessmentLocation").value=saved.location||"Yas Island, Abu Dhabi, UAE";
    byId("assessmentDate").value=saved.date||new Date().toISOString().slice(0,10);
    byId("preparedBy").value=saved.preparedBy||"MEC OSH Department";
    byId("reviewedBy").value=saved.reviewedBy||"";
    byId("approvedBy").value=saved.approvedBy||"";
    byId("referenceNumber").value=saved.reference||"YAPLR-BW-MEC-ZZ-ZZ-XX-RR-HS-00026";
    state.activities=(Array.isArray(saved.activities)?saved.activities:[]).map(item=>({
      ...item,
      controls:legalReferences.withRequiredReferences(item.activity,item.hazards,item.controls)
    }));
  }catch(error){
    console.warn("Draft could not be restored:",error);
  }
}

function riskPill(level){
  const colours=levelColours(level);
  return `<span class="row-risk" style="background:${colours.background};color:${colours.color}">${level}</span>`;
}

function renderActivities(){
  const body=byId("assessmentRows");
  const count=state.activities.length;
  byId("addedCount").textContent=`${count} ${count===1?"activity":"activities"}`;

  if(!count){
    body.innerHTML='<tr><td colspan="5" class="empty-row">No activities added yet.</td></tr>';
    saveDraft();
    return;
  }

  body.innerHTML=state.activities.map((item,index)=>{
    const rating=item.probability*item.severity;
    const revised=item.revisedProbability*item.revisedSeverity;
    return `<tr>
      <td>${index+1}</td>
      <td><strong>${escapeHtml(item.activity)}</strong><br><small>${item.hazards.length} hazards · ${item.controls.length} controls</small></td>
      <td>${riskPill(levelFromRating(rating))}<br><small>P${item.probability} × S${item.severity} = ${rating}</small></td>
      <td>${riskPill(levelFromRating(revised))}<br><small>P${item.revisedProbability} × S${item.revisedSeverity} = ${revised}</small></td>
      <td>
        <div class="row-actions">
          <button class="secondary" type="button" data-edit="${index}">Edit</button>
          <button class="danger" type="button" data-delete="${index}">Delete</button>
        </div>
      </td>
    </tr>`;
  }).join("");

  body.querySelectorAll("[data-edit]").forEach(button=>{
    button.addEventListener("click",()=>editActivity(Number(button.dataset.edit)));
  });

  body.querySelectorAll("[data-delete]").forEach(button=>{
    button.addEventListener("click",()=>{
      const index=Number(button.dataset.delete);
      if(!confirm(`Delete activity ${index+1}?`)) return;
      state.activities.splice(index,1);
      renderActivities();
    });
  });

  saveDraft();
}

function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g,char=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[char]);
}

function editActivity(index){
  const item=state.activities[index];
  if(!item) return;

  state.editingIndex=index;
  byId("activitySelect").value="";
  byId("activityName").value=item.activity;
  byId("hazards").value=listToTextarea(item.hazards);
  byId("probability").value=String(item.probability);
  byId("severity").value=String(item.severity);
  byId("controls").value=listToTextarea(item.controls);
  byId("revisedProbability").value=String(item.revisedProbability);
  byId("revisedSeverity").value=String(item.revisedSeverity);
  byId("addActivity").textContent="Update Activity";
  byId("cancelEdit").classList.remove("hidden");
  byId("builderStatus").textContent=`Editing activity ${index+1}.`;
  calculateRatings();
  document.querySelector(".activity-builder").scrollIntoView({behavior:"smooth",block:"start"});
}

function documentDetails(){
  return {
    title:byId("assessmentTitle").value.trim()||"Project Risk Assessment",
    projectName:byId("projectName").value.trim()||"Sama Yas Residential Development",
    location:byId("assessmentLocation").value.trim(),
    date:byId("assessmentDate").value,
    preparedBy:byId("preparedBy").value.trim(),
    reviewedBy:byId("reviewedBy").value.trim(),
    approvedBy:byId("approvedBy").value.trim(),
    reference:byId("referenceNumber").value.trim(),
    activities:state.activities
  };
}

fillRatingSelect(byId("probability"),probabilityLabels);
fillRatingSelect(byId("revisedProbability"),probabilityLabels);
fillRatingSelect(byId("severity"),severityLabels);
fillRatingSelect(byId("revisedSeverity"),severityLabels);
buildOptions(register);
byId("activityCount").textContent=String(register.length);
byId("assessmentDate").value=new Date().toISOString().slice(0,10);

restoreDraft();
renderActivities();
clearBuilder();

byId("activitySelect").addEventListener("change",event=>loadActivity(event.target.value));

byId("activitySearch").addEventListener("input",event=>{
  const query=event.target.value.trim().toLowerCase();
  const selected=byId("activitySelect").value;
  const filtered=query
    ?register.filter(item=>
      item.activity.toLowerCase().includes(query)
      ||item.hazards.some(hazard=>hazard.toLowerCase().includes(query))
    )
    :register;
  buildOptions(filtered,selected);
});

["probability","severity","revisedProbability","revisedSeverity"].forEach(id=>{
  byId(id).addEventListener("change",calculateRatings);
});

byId("addActivity").addEventListener("click",()=>{
  try{
    const activity=activityFromBuilder();

    if(state.editingIndex===null){
      state.activities.push(activity);
      byId("builderStatus").textContent="Activity added to the assessment.";
    }else{
      state.activities[state.editingIndex]=activity;
      byId("builderStatus").textContent="Activity updated.";
    }

    renderActivities();
    const message=byId("builderStatus").textContent;
    clearBuilder();
    byId("builderStatus").textContent=message;
  }catch(error){
    byId("builderStatus").textContent=error.message;
  }
});

byId("cancelEdit").addEventListener("click",()=>clearBuilder());
byId("clearActivity").addEventListener("click",()=>clearBuilder());

byId("clearAssessment").addEventListener("click",()=>{
  if(!state.activities.length) return;
  if(!confirm("Remove all activities from this assessment?")) return;
  state.activities=[];
  state.editingIndex=null;
  renderActivities();
  clearBuilder();
  byId("documentStatus").textContent="All activities cleared.";
});

byId("generateWord").addEventListener("click",()=>{
  try{
    if(!state.activities.length){
      throw new Error("Add at least one activity before generating the Word file.");
    }
    saveDraft();
    RiskDocx.downloadRiskAssessmentDocx(documentDetails());
    byId("documentStatus").textContent="Word file generated successfully.";
  }catch(error){
    byId("documentStatus").textContent=error.message;
  }
});

[
  "assessmentTitle","projectName","assessmentLocation","assessmentDate",
  "preparedBy","reviewedBy","approvedBy","referenceNumber"
].forEach(id=>byId(id).addEventListener("change",saveDraft));

calculateRatings();
