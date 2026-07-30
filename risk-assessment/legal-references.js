(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
  if(root) root.RiskLegalReferences=api;
})(typeof self!=="undefined"?self:this,function(){
  "use strict";

  const ALDAR_REFERENCE="ALDAR OSH-MS Rev.08 (May 2025), Appendix 5";

  const COP_TITLES={
    "1.0":"Hazardous Materials",
    "2.0":"Personal Protective Equipment",
    "8.0":"Formwork",
    "14.0":"Manual Handling and Ergonomics",
    "15.0":"Workplace Lighting",
    "23.0":"Working at Height",
    "27.0":"Confined Spaces",
    "28.0":"Hot Work Operations",
    "29.0":"Excavation Work",
    "34.0":"Safe Use of Lifting Equipment and Lifting Accessories",
    "35.0":"Portable Power Tools",
    "36.0":"Safe Use of Plant and Equipment",
    "37.0":"Ladders and Stepladders",
    "44.0":"Traffic Management and Logistics",
    "47.0":"Electrical Safety"
  };

  const RULES=[
    {pattern:/confined\s*space/i,refs:["27.0","2.0"]},
    {pattern:/working at height|work at height|roof|scaffold|meWp|mobile scaffolding|fall from height/i,refs:["23.0","2.0"]},
    {pattern:/ladder|access and egress/i,refs:["37.0","2.0"]},
    {pattern:/excavat|trial pit|secant pil|sheet pil|shoring|trench/i,refs:["29.0","20.0","2.0"]},
    {pattern:/lifting|crane|hoist|rigg|sling|tackle|material delivery vehicle|tipping operation/i,refs:["34.0","2.0"]},
    {pattern:/weld|hot work|gas cutting|brazing|torch/i,refs:["28.0","2.0"]},
    {pattern:/chemical|paint|waterproof|fuel|hazardous substance|msds|sds/i,refs:["1.0","2.0"]},
    {pattern:/power tool|angle grinder|grinder|pneumatic tool|drill|cutting tool/i,refs:["35.0","2.0"]},
    {pattern:/plant|equipment|machin|generator|compressor|roller|compaction|wetmix|asphalt|vehicle parking|machine guarding/i,refs:["36.0","2.0"]},
    {pattern:/traffic|road transport|road diversion|vehicle movement|man,?\s*machine interface|survey work/i,refs:["44.0","2.0"]},
    {pattern:/manual handling|ergonomic|display screen|workstation|file cabinet|office equipment|expectant mother|stress/i,refs:["14.0","2.0"]},
    {pattern:/formwork|shuttering|column|wall|falsework/i,refs:["8.0","23.0","2.0"]},
    {pattern:/electric|substation|electrocution|illumination/i,refs:["47.0","15.0","2.0"]},
    {pattern:/welfare|hygiene|canteen|pantry|heat|sun|adverse weather|noise|dust|waste|emergency|lone working|security/i,refs:["11.0","2.0"]},
    {pattern:/ppe|personal protective equipment/i,refs:["2.0"]}
  ];

  function unique(values){
    return [...new Set(values.filter(Boolean))];
  }

  function extractExistingCopNumbers(controls){
    const text=(Array.isArray(controls)?controls:[String(controls||"")]).join(" ");
    const refs=[];
    text.split(/(?<=[.;])\s+/).forEach(sentence=>{
      if(!/ADOSH/i.test(sentence)) return;
      (sentence.match(/\b\d+\.\d+\b/g)||[]).forEach(number=>refs.push(number));
    });
    return unique(refs);
  }

  function inferCopNumbers(activity,hazards,controls){
    const existing=extractExistingCopNumbers(controls);
    if(existing.length) return existing;

    const activityText=String(activity||"");
    const primaryRule=RULES.find(rule=>rule.pattern.test(activityText));
    if(primaryRule) return unique(primaryRule.refs);

    const hazardText=(Array.isArray(hazards)?hazards:[String(hazards||"")]).join(" ");
    const refs=[];
    RULES.forEach(rule=>{
      if(rule.pattern.test(hazardText)) refs.push(...rule.refs);
    });
    if(!refs.length) refs.push("2.0");
    return unique(refs);
  }

  function formatCop(number){
    const title=COP_TITLES[number];
    return `ADOSH-SF CoP ${number}${title?` - ${title}`:""}`;
  }

  function requiredReferenceLines(activity,hazards,controls){
    const numbers=inferCopNumbers(activity,hazards,controls);
    return [
      `Reference: ${numbers.map(formatCop).join("; ")}.`,
      `Reference: ${ALDAR_REFERENCE}.`
    ];
  }

  function withRequiredReferences(activity,hazards,controls){
    const source=(Array.isArray(controls)?controls:[String(controls||"")])
      .map(value=>String(value||"").trim())
      .filter(Boolean)
      .filter(value=>!/^Reference:\s*(?:ADOSH|ALDAR)/i.test(value));
    return [...source,...requiredReferenceLines(activity,hazards,source)];
  }

  return {
    ALDAR_REFERENCE,
    COP_TITLES,
    inferCopNumbers,
    requiredReferenceLines,
    withRequiredReferences
  };
});
