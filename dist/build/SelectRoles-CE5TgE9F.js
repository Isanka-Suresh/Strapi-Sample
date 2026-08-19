import{y as p,a as d,f4 as g,j as e,f5 as u,d as f,cm as m,cc as h,U as x,V as i,bx as j,by as b,f6 as y,h as C,f7 as M}from"./strapi-DzSX-_7k.js";import{u as k}from"./useAdminRoles-DqbZTbyg.js";const v=({children:a,target:t})=>{const{toggleNotification:n}=p(),{formatMessage:o}=d(),{copy:r}=g(),l=o({id:"app.component.CopyToClipboard.label",defaultMessage:"Copy to clipboard"}),c=async s=>{s.preventDefault(),await r(t)&&n({type:"info",message:o({id:"notification.link-copied"})})};return e.jsx(u,{endAction:e.jsx(f,{label:l,variant:"ghost",onClick:c,children:e.jsx(m,{})}),title:t,titleEllipsis:!0,subtitle:a,icon:e.jsx("span",{style:{fontSize:32},children:"✉️"}),iconBackground:"neutral100"})},w=({registrationToken:a})=>{const{formatMessage:t}=d(),n=`${window.location.origin}${h()}/auth/register?registrationToken=${a}`;return e.jsx(v,{target:n,children:t({id:"app.components.Users.MagicLink.connect",defaultMessage:"Copy and share this link to give access to this user"})})},A=({disabled:a})=>{const{isLoading:t,roles:n}=k(),{formatMessage:o}=d(),{value:r=[],onChange:l,error:c}=x("roles");return e.jsxs(i.Root,{error:c,hint:o({id:"app.components.Users.ModalCreateBody.block-title.roles.description",defaultMessage:"A user can have one or several roles"}),name:"roles",required:!0,children:[e.jsx(i.Label,{children:o({id:"app.components.Users.ModalCreateBody.block-title.roles",defaultMessage:"User's roles"})}),e.jsx(j,{disabled:a,onChange:s=>{l("roles",s)},placeholder:o({id:"app.components.Select.placeholder",defaultMessage:"Select"}),startIcon:t?e.jsx(B,{}):void 0,value:r.map(s=>s.toString()),withTags:!0,children:n.map(s=>e.jsx(b,{value:s.id.toString(),children:o({id:`global.${s.code}`,defaultMessage:s.name})},s.id))}),e.jsx(i.Error,{}),e.jsx(i.Hint,{})]})},L=M`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,S=C.div`
  animation: ${L} 2s infinite linear;
`,B=()=>e.jsx(S,{children:e.jsx(y,{})});export{w as M,A as S,v as a};
