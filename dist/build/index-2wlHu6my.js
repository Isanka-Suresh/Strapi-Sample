import{dK as V,d6 as de,au as me,j as s,U as ue,r as w,a as be,V as p,v as he}from"./strapi-D80N3CN5.js";import{P as c}from"./index-D25Sf11e.js";import{c as pe,C as fe}from"./index-uHA1uuM4.js";const ke=V`
  .ck-word-count {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    padding-block: 0.2rem;
    font-size: 1.4rem;
  }

  .ck-editor__main {
    --ck-font-face: "Source Sans Pro", system-ui, Roboto, "Helvetica Neue", "Helvetica", Arial, sans-serif;
    color: var(--ck-color-editor-base-text);
    font-family: var(--ck-font-face);

    * {
      font: revert;
      margin: revert;
    }

    h1 {
      font-size: 3.2rem;
      margin-bottom: 0.6em;
      font-weight: 400;
    }

    h2 {
      font-size: 2.688rem;
      margin-bottom: 0.4em;
      font-weight: 400;
    }

    h3 {
      font-size: 2.176rem;
      margin-bottom: 0.2em;
      font-weight: 400;
    }

    h4 {
      font-size: 1.84rem;
      margin-bottom: 0.1em;
      font-weight: 400;
    }

    p {
      font-size: 1.6rem;
      line-height: 1.6em;
      margin-bottom: 0.8em;
    }

    figcaption {
      background-color: var(--ck-color-image-caption-background);
      caption-side: bottom;
      color: var(--ck-color-image-caption-text);
      display: table-caption;
      font-size: 1.2rem;
      outline-offset: -1px;
      padding: 0.6em;
      word-break: break-word;
    }

    .image figcaption {
      font-size: 1.2rem;
    }

    blockquote {
    }

    .table {
      font-size: 1.6rem;
    }

    code {
      font-size: 1.4rem;
    }

    ul.todo-list {
      list-style: none;
      margin: revert;
      color: revert;
      font-family: revert;
      margin-left: 2rem;
    }

    ul,
    ol {
      font-size: 1.6rem;
      list-style: initial;
      margin-left: 2rem;
    }

    ol {
      list-style: decimal;
    }

    sub {
      vertical-align: sub
    }

    sup {
      vertical-align: super
    }

    // higher specificity needed
    .ck.ck-content.ck-editor__editable {
      line-height: initial;
      min-height: 12.5rem;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;

      // so it's more Strapi alike
      &.ck-focused:not(.ck-editor__nested-editable) {
        border: 1px solid rgb(73, 69, 255);
        box-shadow: rgb(73 69 255) 0 0 0 0.125rem;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        transition-property: border-color, box-shadow;
        transition-duration: 0.2s;
      }
    }
  }
`,Ce=V`
`,we=V`
  .ck {
    --ck-color-toolbar-background: rgb(24, 24, 38);
    --ck-color-text: rgb(165, 165, 186);
    --ck-color-editor-base-text: rgb(255, 255, 255);
    --ck-color-toolbar-border: rgb(74, 74, 106);
    --ck-color-base-border: rgb(74, 74, 106);
    --ck-color-base-background: rgb(33, 33, 52);
    --ck-color-button-default-background: rgb(33, 33, 52);
    --ck-color-list-button-hover-background: rgb(24, 24, 38);
    --ck-color-button-default-hover-background: rgb(33, 33, 52);
    --ck-color-button-on-background: rgb(33, 33, 52);
    --ck-color-button-on-hover-background: rgb(33, 33, 52);
    --ck-color-button-default-active-background: rgb(33, 33, 52);
  }
  .ck-word-count {
    color: rgb(165, 165, 186)
  }
`,ve=o=>{let e=null;switch(o){case"dark":e=we;break;case"light":e=Ce;break}return de`
    ${ke}
    ${e}
  `},{Plugin:xe}=window.CKEDITOR,{ButtonView:Te}=window.CKEDITOR,ye='<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.3.6a.9.9 0 100 1.8h15.311a.9.9 0 100-1.8H4.301zm17.1 3.7A1.6 1.6 0 0123 5.9v15.5a1.6 1.6 0 01-1.6 1.6H2.6A1.601 1.601 0 011 21.4V8 5.915C1 5.03 1.716 4.3 2.6 4.3h18.8zM5.032 19.18h14.336l-3.136-3.205-1.792 1.831-4.032-4.12-5.376 5.494zm13.44-8.697c0 1.282-.985 2.289-2.24 2.289-1.254 0-2.24-1.007-2.24-2.29 0-1.281.986-2.288 2.24-2.288 1.255 0 2.24 1.007 2.24 2.289z"></path></svg>';class v extends xe{strapiToggle=null;static get pluginName(){return"strapiMediaLib"}init(){this.editor.ui.componentFactory.add("strapiMediaLib",()=>{const t=new Te;return t.set({label:"Media Library",icon:ye,tooltip:!0}),t.on("execute",this.toggle.bind(this)),t})}connect(e){if(typeof e!="function")throw new Error("Input parameter for toogle should be a function");this.strapiToggle=e}toggle(){if(typeof this.strapiToggle!="function")throw new Error("Strapi media library toggle function not connected. Use connect function first");this.strapiToggle()}}const Ie="1.1.2",x=pe("strapi",{version:Ie}),{Plugin:Le}=window.CKEDITOR;class Se extends Le{static get pluginName(){return"MaximumLength"}static get requires(){return["WordCount"]}init(){const e=this.editor,t=e.plugins.get("WordCount"),i=e.config.get("maximumLength.characters");let n=!1;e.model.document.registerPostFixer(g=>{const a=t.characters,r=this._calculateExcessRange(i,a);r?n?g.updateMarker("maximumLengthExcess",{range:r,usingOperation:!1}):(g.addMarker("maximumLengthExcess",{range:r,usingOperation:!1}),n=!0):n&&(g.removeMarker("maximumLengthExcess"),n=!1)}),e.conversion.for("editingDowncast").markerToHighlight({model:"maximumLengthExcess",view:{classes:"ck-maximum-length-excess"}})}_calculateExcessRange(e,t){if(e>t)return null;const i=this.editor,g=i.model.createRangeIn(i.model.document.getRoot()).getWalker({singleCharacters:!0,direction:"backward"});let a=t,r,l;for(const u of g)if(u.type=="text"&&(r||(r=u.previousPosition),a--,a<e))return l=u.previousPosition,i.model.createRange(l,r)}}const{Alignment:Ee,Autoformat:T,Bold:y,Italic:I,Underline:Re,Strikethrough:ze,Code:_e,Subscript:Pe,Superscript:Me,BlockQuote:Q,CodeBlock:J,Essentials:L,FontSize:He,FontFamily:Ae,FontColor:Fe,FontBackgroundColor:Oe,FindAndReplace:je,Heading:S,HorizontalLine:Be,HtmlEmbed:De,Image:E,ImageCaption:R,ImageStyle:z,ImageToolbar:_,ImageUpload:P,ImageResize:Ke,Indent:M,IndentBlock:Ne,Link:H,LinkImage:X,List:A,ListProperties:We,TodoList:Ve,Markdown:$e,MediaEmbed:Y,Paragraph:F,PasteFromOffice:O,RemoveFormat:Ge,SpecialCharacters:Ue,SpecialCharactersEssentials:qe,Table:j,TableToolbar:B,TableProperties:Qe,TableCellProperties:Je,TableColumnResize:D,TableCaption:K,WordCount:N,Highlight:Xe}=window.CKEDITOR,W={light:{plugins:[T,y,I,L,S,E,R,z,_,P,M,H,A,F,O,j,B,D,K,N,v,x],toolbar:["undo","redo","|","heading","|","bold","italic","|","link","strapiMediaLib","insertTable","|","bulletedList","numberedList"],heading:{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h1",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h2",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h3",title:"Heading 3",class:"ck-heading_heading3"},{model:"heading4",view:"h4",title:"Heading 4",class:"ck-heading_heading4"}]},image:{toolbar:["imageStyle:inline","imageStyle:block","imageStyle:side","|","toggleImageCaption","imageTextAlternative"]},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells","|","toggleTableCaption"]},link:{decorators:{openInNewTab:{mode:"manual",label:"Open in a new tab",attributes:{target:"_blank",rel:"noopener noreferrer"}}}}},standard:{plugins:[T,y,I,Q,J,L,S,E,R,z,_,P,M,H,X,A,Y,F,O,j,B,D,K,N,v,x],toolbar:["undo","redo","|","heading","|","bold","italic","|","link","strapiMediaLib","mediaEmbed","blockQuote","insertTable","codeBlock","|","bulletedList","numberedList","outdent","indent"],heading:{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h1",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h2",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h3",title:"Heading 3",class:"ck-heading_heading3"},{model:"heading4",view:"h4",title:"Heading 4",class:"ck-heading_heading4"}]},image:{toolbar:["imageStyle:inline","imageStyle:block","imageStyle:side","|","toggleImageCaption","imageTextAlternative","|","linkImage"]},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells","|","toggleTableCaption"]},link:{decorators:{openInNewTab:{mode:"manual",label:"Open in a new tab",attributes:{target:"_blank",rel:"noopener noreferrer"}}}}},rich:{plugins:[Ee,T,y,I,Re,ze,_e,Pe,Me,Q,J,L,He,Ae,Fe,Oe,je,S,Be,De,E,R,z,_,P,Ke,M,Ne,H,X,A,We,Ve,Y,F,O,Ge,Ue,qe,j,B,Qe,Je,D,K,N,Xe,v,x],toolbar:{items:["undo","redo","|","findAndReplace","selectAll","|","heading","|","fontSize","fontFamily","fontColor","fontBackgroundColor","|","bold","italic","underline","strikethrough","superscript","subscript","code","removeFormat","-","link","strapiMediaLib","mediaEmbed","insertTable","horizontalLine","blockQuote","codeBlock","htmlEmbed","specialCharacters","highlight","|","alignment","|","bulletedList","numberedList","todoList","outdent","indent"],shouldNotGroupWhenFull:!0},heading:{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h1",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h2",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h3",title:"Heading 3",class:"ck-heading_heading3"},{model:"heading4",view:"h4",title:"Heading 4",class:"ck-heading_heading4"}]},list:{properties:{styles:!0,startIndex:!0,reversed:!0}},image:{resizeUnit:"%",resizeOptions:[{name:"resizeImage:original",value:null,icon:"original"},{name:"resizeImage:25",value:"25",icon:"small"},{name:"resizeImage:50",value:"50",icon:"medium"},{name:"resizeImage:75",value:"75",icon:"large"}],toolbar:["imageStyle:inline","imageStyle:block","imageStyle:side","|","toggleImageCaption","imageTextAlternative","|","linkImage","|","resizeImage:25","resizeImage:50","resizeImage:75","resizeImage:original"]},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells","|","tableCellProperties","tableProperties","|","toggleTableCaption"]},fontSize:{options:[9,11,13,"default",17,19,21,27,35],supportAllValues:!1},fontFamily:{options:["default","Arial, Helvetica Neue, Helvetica, Source Sans Pro, sans-serif","Courier New, Courier, monospace","Georgia, serif","Lucida Sans Unicode, Lucida Grande, sans-serif","Tahoma, Geneva, sans-serif","Times New Roman, Times, serif","Trebuchet MS, Helvetica, sans-serif","Verdana, Geneva, sans-serif","Roboto, Roboto Black, Roboto Medium, Roboto Light, sans-serif"],supportAllValues:!0},fontColor:{columns:5,documentColors:10},fontBackgroundColor:{columns:5,documentColors:10},link:{decorators:{openInNewTab:{mode:"manual",label:"Open in a new tab",attributes:{target:"_blank",rel:"noopener noreferrer"}}}}}};class Ye{constructor(e){this.fieldConfig=e}getEditorConfig(){const e=this._getBaseConfig(),t=this.fieldConfig.maxLength,i=this.fieldConfig.options.output,n=this.fieldConfig.licenseKey;return e.licenseKey=n,i==="Markdown"&&e.plugins.push($e),t&&(e.plugins.push(Se),e.maximumLength={characters:t}),e}_getBaseConfig(){const e=this.fieldConfig.options.preset;switch(e){case"light":return W.light;case"standard":return W.standard;case"rich":return W.rich;default:throw new Error("Invalid preset name "+e)}}}function Ze(o){return o&&o.startsWith("/")?`${window.strapi.backendURL}${o}`:o}const ee=({isOpen:o=!1,onChange:e=()=>{},onToggle:t=()=>{}})=>{const{components:i}=me("library",a=>a),n=i["media-library"],g=a=>{const r=a.map(l=>({alt:l.alternativeText||l.name,url:Ze(l.url),mime:l.mime}));e(r)};return o?s.jsx(n,{onClose:t,onSelectAssets:g}):null};ee.propTypes={isOpen:c.bool,onChange:c.func,onToggle:c.func};function Z(o){const e={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};for(const t in e){const i=e[t];o=o.replaceAll(t,i)}return o}const et=localStorage.getItem("STRAPI_THEME")||"light",tt=ve(et),ot=o=>{const{attribute:e,name:t,disabled:i,labelAction:n,required:g,description:a,error:r,intlLabel:l}=o,{onChange:u,value:te}=ue(t),[f,oe]=w.useState(!1),{formatMessage:$}=be(),{maxLengthCharacters:G,licenseKey:ie,...ne}=e.options,ae=new Ye({options:ne,maxLength:G,licenseKey:ie}).getEditorConfig(),U=w.useRef(null),[re,le]=w.useState(!1),q=window.CKEDITOR?.ClassicEditor,k=()=>le(d=>!d),se=d=>{let m="";d.map(h=>{if(h.mime.includes("image")){const ce=Z(h.url),ge=Z(h.alt);m+=`<img src="${ce}" alt="${ge}" />`}});const b=f.data.processor.toView(m),C=f.data.toModel(b);f.model.insertContent(C),k()};return q?s.jsxs(p.Root,{name:t,id:t,error:r,hint:a&&$(a),children:[s.jsxs(he,{spacing:1,alignItems:"normal",style:{flexDirection:"column"},children:[s.jsx(p.Label,{action:n,required:g,children:l?$(l):t}),s.jsx(tt,{}),s.jsx(fe,{editor:q,data:te??"",onReady:d=>{i&&d.enableReadOnlyMode("strapi-ckeditor");const m=d.plugins.get("WordCount");U.current.appendChild(m.wordCountContainer),d.plugins.get("strapiMediaLib").connect(k),oe(d)},onChange:(d,m)=>{const b=m.getData();u({target:{name:t,value:b}}),m.plugins.get("WordCount").characters>G&&console.log("Too long")},config:ae}),s.jsx("div",{ref:U}),s.jsx(p.Hint,{}),s.jsx(p.Error,{})]}),s.jsx(ee,{isOpen:re,onChange:se,onToggle:k})]}):null};ot.propTypes={attribute:c.object.isRequired,name:c.string.isRequired,description:c.object,disabled:c.bool,error:c.string,labelAction:c.object,required:c.bool};export{ot as CKEditorInput};
