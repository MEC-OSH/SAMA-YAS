
(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
  else root.RiskDocx=api;
})(typeof window!=="undefined"?window:globalThis,function(){
  "use strict";

  const encoder=new TextEncoder();

  function xml(value=""){
    return String(value).replace(/[<>&'"]/g,char=>({
      "<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"
    })[char]);
  }

  function u16(value){
    const bytes=new Uint8Array(2);
    new DataView(bytes.buffer).setUint16(0,value,true);
    return bytes;
  }

  function u32(value){
    const bytes=new Uint8Array(4);
    new DataView(bytes.buffer).setUint32(0,value>>>0,true);
    return bytes;
  }

  function join(chunks){
    const length=chunks.reduce((total,chunk)=>total+chunk.length,0);
    const result=new Uint8Array(length);
    let offset=0;
    chunks.forEach(chunk=>{
      result.set(chunk,offset);
      offset+=chunk.length;
    });
    return result;
  }

  const crcTable=(()=>{
    const table=new Uint32Array(256);
    for(let number=0;number<256;number++){
      let crc=number;
      for(let bit=0;bit<8;bit++){
        crc=(crc&1)?(0xedb88320^(crc>>>1)):(crc>>>1);
      }
      table[number]=crc>>>0;
    }
    return table;
  })();

  function crc32(bytes){
    let crc=0xffffffff;
    for(const byte of bytes){
      crc=crcTable[(crc^byte)&0xff]^(crc>>>8);
    }
    return (crc^0xffffffff)>>>0;
  }

  function dosTimeDate(date=new Date()){
    const year=Math.max(1980,date.getFullYear());
    const time=(date.getHours()<<11)|(date.getMinutes()<<5)|(date.getSeconds()>>1);
    const day=((year-1980)<<9)|((date.getMonth()+1)<<5)|date.getDate();
    return {time,day};
  }

  function makeZip(entries){
    const localParts=[];
    const centralParts=[];
    let localOffset=0;
    const stamp=dosTimeDate();

    entries.forEach(entry=>{
      const name=encoder.encode(entry.name);
      const data=typeof entry.data==="string"?encoder.encode(entry.data):entry.data;
      const checksum=crc32(data);
      const flags=0x0800;

      const localHeader=join([
        u32(0x04034b50),u16(20),u16(flags),u16(0),
        u16(stamp.time),u16(stamp.day),u32(checksum),
        u32(data.length),u32(data.length),u16(name.length),u16(0),name
      ]);

      localParts.push(localHeader,data);

      const centralHeader=join([
        u32(0x02014b50),u16(20),u16(20),u16(flags),u16(0),
        u16(stamp.time),u16(stamp.day),u32(checksum),
        u32(data.length),u32(data.length),u16(name.length),
        u16(0),u16(0),u16(0),u16(0),u32(0),u32(localOffset),name
      ]);

      centralParts.push(centralHeader);
      localOffset+=localHeader.length+data.length;
    });

    const centralDirectory=join(centralParts);
    const end=join([
      u32(0x06054b50),u16(0),u16(0),
      u16(entries.length),u16(entries.length),
      u32(centralDirectory.length),u32(localOffset),u16(0)
    ]);

    return join([...localParts,centralDirectory,end]);
  }

  function levelFromRating(rating){
    const value=Number(rating)||0;
    if(value>=15) return "Extreme Risk";
    if(value>=8) return "High Risk";
    if(value>=4) return "Moderate Risk";
    return "Low Risk";
  }

  function levelStyle(level){
    if(level==="Extreme Risk") return {fill:"C00000",text:"FFFFFF"};
    if(level==="High Risk") return {fill:"FF0000",text:"FFFFFF"};
    if(level==="Moderate Risk") return {fill:"FFC000",text:"000000"};
    return {fill:"00B050",text:"000000"};
  }

  function run(text,{bold=false,size=15,color="000000"}={}){
    const preserve=/^\s|\s$/.test(String(text))?' xml:space="preserve"':"";
    return `<w:r><w:rPr>${bold?"<w:b/>":""}<w:sz w:val="${size}"/><w:szCs w:val="${size}"/><w:color w:val="${color}"/></w:rPr><w:t${preserve}>${xml(text)}</w:t></w:r>`;
  }

  function paragraph(text="",options={}){
    const align=options.align?`<w:jc w:val="${options.align}"/>`:"";
    const spacing=`<w:spacing w:before="${options.before||0}" w:after="${options.after??40}" w:line="${options.line||220}" w:lineRule="auto"/>`;
    return `<w:p><w:pPr>${align}${spacing}${options.keepNext?"<w:keepNext/>":""}</w:pPr>${run(text,options)}</w:p>`;
  }

  function listParagraphs(items,options={}){
    const values=Array.isArray(items)?items:[String(items||"")];
    if(!values.length) return paragraph("",options);
    return values.map(item=>paragraph(`• ${item}`,options)).join("");
  }

  function cell(content,width,options={}){
    const fill=options.fill?`<w:shd w:val="clear" w:color="auto" w:fill="${options.fill}"/>`:"";
    const vertical=options.vertical?`<w:vAlign w:val="${options.vertical}"/>`:"<w:vAlign w:val=\"center\"/>";
    const margin=options.margin||60;
    const margins=`<w:tcMar><w:top w:w="${margin}" w:type="dxa"/><w:left w:w="${margin}" w:type="dxa"/><w:bottom w:w="${margin}" w:type="dxa"/><w:right w:w="${margin}" w:type="dxa"/></w:tcMar>`;
    let body="";

    if(Array.isArray(content)){
      body=listParagraphs(content,{
        size:options.size||14,
        color:options.color||"000000",
        after:25,
        line:210
      });
    }else{
      body=paragraph(content??"",{
        bold:options.bold||false,
        align:options.align,
        size:options.size||14,
        color:options.color||"000000",
        after:options.after??20,
        line:options.line||210
      });
    }

    return `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${fill}${vertical}${margins}</w:tcPr>${body}</w:tc>`;
  }

  function row(cells,{header=false}={}){
    const properties=header
      ?"<w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>"
      :"";
    return `<w:tr>${properties}${cells.join("")}</w:tr>`;
  }

  function table(rows,widths){
    return `<w:tbl>
      <w:tblPr>
        <w:tblW w:w="0" w:type="auto"/>
        <w:tblLayout w:type="fixed"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="5" w:color="000000"/>
          <w:left w:val="single" w:sz="5" w:color="000000"/>
          <w:bottom w:val="single" w:sz="5" w:color="000000"/>
          <w:right w:val="single" w:sz="5" w:color="000000"/>
          <w:insideH w:val="single" w:sz="4" w:color="000000"/>
          <w:insideV w:val="single" w:sz="4" w:color="000000"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid>${widths.map(width=>`<w:gridCol w:w="${width}"/>`).join("")}</w:tblGrid>
      ${rows.join("")}
    </w:tbl>`;
  }

  function infoTable(details){
    const widths=[2100,3500,2100,3500,2100,3500];
    const values=[
      ["Employer","ALDAR Properties"],
      ["PMC","Hill International"],
      ["Consultant","Mott MacDonald"],
      ["Project",details.projectName||"Sama Yas Residential Development"],
      ["Contractor","Masri Engineering & Contracting, MEC S.A.L."],
      ["Assessment Title",details.title||"Project Risk Assessment"],
      ["Location",details.location||""],
      ["Assessment Date",details.date||""],
      ["Prepared By",details.preparedBy||""],
      ["Reviewed By",details.reviewedBy||""],
      ["Approved By",details.approvedBy||""],
      ["Reference",details.reference||"YAPLR-BW-MEC-ZZ-ZZ-XX-RR-HS-00026"],
    ];

    const rows=[];
    for(let index=0;index<values.length;index+=3){
      const group=values.slice(index,index+3);
      while(group.length<3) group.push(["",""]);
      rows.push(row(group.flatMap(pair=>[
        cell(pair[0],2100,{bold:true,fill:"D9D9D9",size:15}),
        cell(pair[1],3500,{size:15})
      ])));
    }
    return table(rows,widths);
  }

  function riskTable(activities){
    const widths=[480,1750,2850,600,600,700,1000,6900,600,600,700,1000];
    const headers=[
      "S/N","Activity Element","Significant Potential Hazards",
      "P","S","R","Risk Level",
      "Action to be Taken to Reduce the Risk",
      "Revised P","Revised S","Revised R","Residual Risk"
    ];

    const rows=[
      row(headers.map((heading,index)=>
        cell(heading,widths[index],{
          bold:true,align:"center",fill:"BFBFBF",size:13
        })
      ),{header:true})
    ];

    activities.forEach((activity,index)=>{
      const initialRating=Number(activity.probability)*Number(activity.severity);
      const revisedRating=Number(activity.revisedProbability)*Number(activity.revisedSeverity);
      const initialLevel=levelFromRating(initialRating);
      const residualLevel=levelFromRating(revisedRating);
      const initialColours=levelStyle(initialLevel);
      const residualColours=levelStyle(residualLevel);

      rows.push(row([
        cell(String(index+1),widths[0],{align:"center",size:13}),
        cell(activity.activity,widths[1],{size:13}),
        cell(activity.hazards,widths[2],{size:13,vertical:"top"}),
        cell(String(activity.probability),widths[3],{align:"center",size:13}),
        cell(String(activity.severity),widths[4],{align:"center",size:13}),
        cell(String(initialRating),widths[5],{align:"center",size:13}),
        cell(initialLevel,widths[6],{
          align:"center",bold:true,size:13,
          fill:initialColours.fill,color:initialColours.text
        }),
        cell(activity.controls,widths[7],{size:13,vertical:"top"}),
        cell(String(activity.revisedProbability),widths[8],{align:"center",size:13}),
        cell(String(activity.revisedSeverity),widths[9],{align:"center",size:13}),
        cell(String(revisedRating),widths[10],{align:"center",size:13}),
        cell(residualLevel,widths[11],{
          align:"center",bold:true,size:13,
          fill:residualColours.fill,color:residualColours.text
        })
      ]));
    });

    return table(rows,widths);
  }

  function riskMatrix(){
    const widths=[2800,2500,9000];
    const levels=[
      ["15 - 25","Extreme Risk","Absolutely unacceptably high. The activity or process should not proceed in its current form.","C00000","FFFFFF"],
      ["8 - 12","High Risk","Unacceptably high. Modify the activity to include remedial planning and action, supported by a detailed OSH risk assessment.","FF0000","FFFFFF"],
      ["4 - 6","Moderate Risk","Acceptable only when managed As Low as Reasonably Practicable (ALARP), subject to management and/or modification.","FFC000","000000"],
      ["1 - 3","Low Risk","Acceptable without further action unless escalation of risk is possible.","00B050","000000"]
    ];
    const rows=[
      row([
        cell("Rating",widths[0],{bold:true,align:"center",fill:"BFBFBF"}),
        cell("Risk Level",widths[1],{bold:true,align:"center",fill:"BFBFBF"}),
        cell("Required Action",widths[2],{bold:true,align:"center",fill:"BFBFBF"})
      ],{header:true})
    ];
    levels.forEach(level=>{
      rows.push(row([
        cell(level[0],widths[0],{bold:true,align:"center"}),
        cell(level[1],widths[1],{bold:true,align:"center",fill:level[3],color:level[4]}),
        cell(level[2],widths[2])
      ]));
    });
    return table(rows,widths);
  }

  function createRiskAssessmentDocx(details){
    const activities=Array.isArray(details.activities)?details.activities:[];
    if(!activities.length) throw new Error("At least one activity is required.");

    const documentXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:body>
        ${paragraph("PROJECT RISK ASSESSMENT",{bold:true,align:"center",size:32,after:80})}
        ${paragraph("SAMA YAS RESIDENTIAL DEVELOPMENT",{bold:true,align:"center",size:23,after:140})}
        ${infoTable(details)}
        ${paragraph("",{after:70})}
        ${paragraph("Risk Assessment Register",{bold:true,size:22,after:80,keepNext:true})}
        ${riskTable(activities)}
        ${paragraph("",{after:80})}
        ${paragraph("Risk Grading Matrix",{bold:true,size:21,after:70,keepNext:true})}
        ${riskMatrix()}
        ${paragraph("",{after:60})}
        ${paragraph("Important: This generated document must be reviewed, amended where necessary, communicated to the affected workforce, and approved by competent project personnel before work starts.",{bold:true,size:15,color:"C00000",after:60})}
        ${paragraph("Source library and legal references: MEC Sama Yas Risk Register; applicable ADOSH-SF Codes of Practice; ALDAR OSH-MS Rev.08 (May 2025), Appendix 5.",{size:14,color:"555555",after:20})}
        <w:sectPr>
          <w:pgSz w:w="23811" w:h="16838" w:orient="landscape"/>
          <w:pgMar w:top="360" w:right="360" w:bottom="360" w:left="360" w:header="180" w:footer="180" w:gutter="0"/>
        </w:sectPr>
      </w:body>
    </w:document>`;

    const stylesXml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:docDefaults>
        <w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:rPrDefault>
        <w:pPrDefault><w:pPr><w:spacing w:after="40" w:line="220" w:lineRule="auto"/></w:pPr></w:pPrDefault>
      </w:docDefaults>
      <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
    </w:styles>`;

    const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
      <Default Extension="xml" ContentType="application/xml"/>
      <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
      <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
      <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
      <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
    </Types>`;

    const relationships=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
      <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
      <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
    </Relationships>`;

    const documentRelationships=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
    </Relationships>`;

    const timestamp=new Date().toISOString();
    const core=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <dc:title>${xml(details.title||"Project Risk Assessment")}</dc:title>
      <dc:creator>${xml(details.preparedBy||"MEC OSH Department")}</dc:creator>
      <cp:lastModifiedBy>${xml(details.preparedBy||"MEC OSH Department")}</cp:lastModifiedBy>
      <dcterms:created xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:created>
      <dcterms:modified xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:modified>
    </cp:coreProperties>`;

    const app=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
      <Application>MEC OSH Risk Assessment Generator</Application>
      <Company>Masri Engineering &amp; Contracting, MEC S.A.L.</Company>
    </Properties>`;

    return makeZip([
      {name:"[Content_Types].xml",data:contentTypes},
      {name:"_rels/.rels",data:relationships},
      {name:"docProps/core.xml",data:core},
      {name:"docProps/app.xml",data:app},
      {name:"word/document.xml",data:documentXml},
      {name:"word/styles.xml",data:stylesXml},
      {name:"word/_rels/document.xml.rels",data:documentRelationships}
    ]);
  }

  function safeFilename(value){
    return String(value||"Risk Assessment")
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g," ")
      .replace(/\s+/g," ")
      .trim()
      .replace(/\s/g,"_")
      .slice(0,80)||"Risk_Assessment";
  }

  function downloadRiskAssessmentDocx(details){
    const bytes=createRiskAssessmentDocx(details);
    const blob=new Blob([bytes],{
      type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    const link=document.createElement("a");
    const date=details.date||new Date().toISOString().slice(0,10);
    link.href=URL.createObjectURL(blob);
    link.download=`${safeFilename(details.title)}_${date}.docx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  }

  return {createRiskAssessmentDocx,downloadRiskAssessmentDocx,levelFromRating};
});
