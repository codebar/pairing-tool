(this["webpackJsonppairing-tool"]=this["webpackJsonppairing-tool"]||[]).push([[0],{197:function(e,n){},209:function(e,n,t){},210:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t.n(c),r=t(31),i=t.n(r),o=t(20),d=t(38),u={},l=Object(d.b)({name:"toggles",initialState:u,reducers:{overrideToggle:function(e,n){n.payload.toggle in e&&(e[n.payload.toggle]="true"===n.payload.value)}}}),s=l.reducer,b=l.actions.overrideToggle,p={languages:[{name:"HTML",alias:[],exclusions:[]},{name:"CSS",alias:[],exclusions:[]},{name:"JS",alias:["javascript","typescript"],exclusions:[]},{name:"Python",alias:[],exclusions:[]},{name:"Ruby",alias:[],exclusions:[]},{name:"SQL",alias:[],exclusions:[]},{name:"Java",alias:[],exclusions:["javascript"]},{name:"PHP",alias:[],exclusions:[]},{name:"Other",alias:[],exclusions:[]}]},g=Object(d.b)({name:"configuration",initialState:p,reducers:{}}).reducer,f=function(e){return e.configuration.languages.map((function(e){return e.name}))},j=t(103),A=t(129),h=t(21),O=t(130),x=t(131),v=t.n(x),m=t(16),y=t(133),w=t.n(y),k=function(e,n){return n.reduce((function(n,t){var c=t.name,a=[c.toLowerCase()].concat(Object(m.a)(t.alias.map((function(e){return e.toLowerCase()})))),r=t.exclusions.map((function(e){return e.toLowerCase()})),i=e.toLowerCase().split(" "),o=!n.includes(c),d=i.reduce((function(e,n){var t=a.some((function(e){return n.includes(e)})),c=r.every((function(e){return!n.includes(e)}));return e||t&&c}),!1);return o&&d?[].concat(Object(m.a)(n),[c]):n}),[])},S=function(e,n){return{name:e.Name,role:"Student",new:"true"===e["New attendee"],tutorial:e.Tutorial,notes:e.Note,languages:k("".concat(e.Note," ").concat(e.Tutorial),n)}},C=function(e,n){return{name:e.Name,role:"Coach",new:"true"===e["New attendee"],skills:e.Skills,notes:e.Note,languages:k("".concat(e.Note," ").concat(e.Skills),n)}},E={parse:function(e,n){return w.a.parse(e,{header:!0}).data.reduce((function(e,t){switch(t.Role){case"Student":return[].concat(Object(m.a)(e),[S(t,n)]);case"Coach":return[].concat(Object(m.a)(e),[C(t,n)]);default:return e}}),[])}},J={students:[],coaches:[]},I=Object(d.b)({name:"pairings",initialState:J,reducers:{resetPairings:function(e){e.students=[],e.coaches=[]},addPeopleForPairings:function(e,n){var t=n.payload,c=[].concat(e.students.map((function(e){return e.id}))).concat(e.coaches.map((function(e){return e.id}))),a=function(e,n){return e.filter((function(e){return!n.includes(e.id)}))},r=function(e){return e.map((function(e){return{id:e.id,name:e.name,languages:e.languages,group:0}}))};e.students=e.students.concat(r(a(t.students,c))),e.coaches=e.coaches.concat(r(a(t.coaches,c)))},moveCoachToGroup:function(e,n){var t=n.payload,c=e.coaches.findIndex((function(e){return e.id===t.coachId}));e.coaches[c]=Object(h.a)(Object(h.a)({},e.coaches[c]),{},{group:t.groupId})},moveStudentToGroup:function(e,n){var t=n.payload,c=e.students.findIndex((function(e){return e.id===t.studentId}));e.students[c]=Object(h.a)(Object(h.a)({},e.students[c]),{},{group:t.groupId})}}}),B=I.reducer,Q=I.actions,H=Q.addPeopleForPairings,R=Q.moveCoachToGroup,T=Q.moveStudentToGroup,Z=Q.resetPairings,D=function(e){return e.pairings.students.filter((function(e){return 0===e.group}))},P=function(e){return e.pairings.coaches.filter((function(e){return 0===e.group}))},N=function(e){return U(K(e.pairings,f(e),L(M(F(e.pairings,"students"),F(e.pairings,"coaches")))))},U=function(e){return e.sort((function(e,n){return e.id>n.id?1:-1}))},K=function(e,n,t){var c=function(n,t){return n[t].map((function(n){return e[t].find((function(e){return e.id===n.id})).languages||[]}))};return t.map((function(e){var t=c(e,"students").concat(c(e,"coaches")),a=t.length>0?n.reduce((function(e,n){return t.every((function(e){return e.includes(n)}))?[].concat(Object(m.a)(e),[n]):e}),[]):[];return Object(h.a)(Object(h.a)({},e),{},{languages:a})}))},L=function(e){var n=e.map((function(e){return e.id})).reduce((function(e,n){return n>e?n:e}),0)+1;return[].concat(Object(m.a)(e),[{id:n,students:[],coaches:[],languages:[]}])},M=function(e,n){return e.concat(n).reduce((function(e,n){var t=e.findIndex((function(e){return e.id===n.id}));return t>-1?[].concat(Object(m.a)(G(e,t)),[{id:e[t].id,students:[].concat(Object(m.a)(e[t].students),Object(m.a)(n.students)),coaches:[].concat(Object(m.a)(e[t].coaches),Object(m.a)(n.coaches)),languages:[]}]):[].concat(Object(m.a)(e),[n])}),[])},F=function(e,n){return e[n].filter((function(e){return e.group>0})).reduce((function(e,t){var c={id:t.id,name:t.name},a=e.findIndex((function(e){return e.id===t.group}));if(a>-1){var r=e[a],i={id:r.id,students:r.students||[],coaches:r.coaches||[],languages:r.languages||[]};return i[n]=[].concat(Object(m.a)(r[n]),[c]),[].concat(Object(m.a)(G(e,a)),[i])}var o={id:t.group,students:[],coaches:[],languages:[]};return o[n]=[c],[].concat(Object(m.a)(e),[o])}),[])},G=function(e,n){return[].concat(Object(m.a)(e.slice(0,n)),Object(m.a)(e.slice(n+1)))},z=["id","attendance"],W={list:[],nextId:1,readyForPairing:!1},Y=Object(d.b)({name:"attendees",initialState:W,reducers:{addAttendee:function(e,n){e.list.some((function(e){e.id,e.attendance;var t=Object(O.a)(e,z);return v()(t,n.payload)}))||(e.list.push(Object(h.a)({id:e.nextId,attendance:!1},n.payload)),e.nextId+=1)},updateAttendeeName:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload.id})),c=e.list[t];e.list[t]=Object(h.a)(Object(h.a)({},c),{},{name:n.payload.name})},updateAttendeeNotes:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload.id})),c=e.list[t];e.list[t]=Object(h.a)(Object(h.a)({},c),{},{notes:n.payload.notes})},updateAttendeeSkills:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload.id})),c=e.list[t];e.list[t]=Object(h.a)(Object(h.a)({},c),{},{skills:n.payload.skills})},updateAttendeeTutorial:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload.id})),c=e.list[t];e.list[t]=Object(h.a)(Object(h.a)({},c),{},{tutorial:n.payload.tutorial})},toggleAttendance:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload})),c=e.list[t];e.list[t]=Object(h.a)(Object(h.a)({},c),{},{attendance:!c.attendance})},toggleRole:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload})),c=e.list[t],a="Student"===c.role?"Coach":"Student";e.list[t]=Object(h.a)(Object(h.a)({},c),{},{role:a})},toggleLanguage:function(e,n){var t=e.list.findIndex((function(e){return e.id===n.payload.id})),c=e.list[t],a=c.languages.includes(n.payload.language)?c.languages.filter((function(e){return e!==n.payload.language})):c.languages.concat(n.payload.language);e.list[t]=Object(h.a)(Object(h.a)({},c),{},{languages:a})},readyForPairing:function(e){e.readyForPairing=!0},reviewAttendeesAgain:function(e){e.readyForPairing=!1}}}),X=Y.reducer,q=Y.actions,V=q.addAttendee,_=q.updateAttendeeName,$=q.updateAttendeeNotes,ee=q.updateAttendeeSkills,ne=q.updateAttendeeTutorial,te=q.toggleAttendance,ce=q.toggleRole,ae=q.toggleLanguage,re=q.readyForPairing,ie=q.reviewAttendeesAgain,oe=function(e){return e.attendees.list},de=function(e){return function(e){return e.attendees.list.filter((function(e){return"Student"===e.role}))}(e).filter((function(e){return!0===e.attendance}))},ue=function(e){return function(e){return e.attendees.list.filter((function(e){return"Coach"===e.role}))}(e).filter((function(e){return!0===e.attendance}))},le=function(e){return e.attendees.list.length>0},se=function(e){return e.attendees.readyForPairing},be={toggles:u,configuration:p,attendees:W,pairings:J};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var pe,ge,fe,je,Ae,he,Oe,xe,ve,me,ye,we,ke,Se,Ce,Ee,Je,Ie,Be,Qe,He,Re,Te,Ze,De,Pe,Ne,Ue,Ke,Le,Me,Fe,Ge,ze=t(15),We=t(36),Ye=t(136),Xe=t.n(Ye),qe=t(79),Ve=t.n(qe),_e=t(2),$e=We.a.div(pe||(pe=Object(ze.a)(["\n  padding: 5px 20px;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #1b1e21;\n  color: white;\n  border-bottom: 1px solid grey;\n  box-shadow: 2px 2px 2px 2px lightgrey;\n"]))),en=We.a.div(ge||(ge=Object(ze.a)(["\n  img {\n    width: 50px;\n    height: 50px;\n  }\n"]))),nn=We.a.div(fe||(fe=Object(ze.a)(["\n  span {\n    font-size: 24px;\n    font-weight: bold;\n    font-family: Roboto, serif;\n  }\n"]))),tn=We.a.div(je||(je=Object(ze.a)(["\n  svg {\n    font-size: 40px;\n    color: white;\n    padding-right: 10px;\n  }\n"]))),cn=function(e){return Object(_e.jsx)("a",{href:"https://github.com/codebar/pairing-tool/blob/main/doc/UserManual.md",target:"_blank",rel:"noreferrer",children:e.children})},an=function(e){return Object(_e.jsx)("a",{href:"https://github.com/codebar/pairing-tool/issues/new/choose",target:"_blank",rel:"noreferrer",children:e.children})},rn=function(){return Object(_e.jsxs)($e,{children:[Object(_e.jsx)(en,{children:Object(_e.jsx)("img",{alt:"Codebar",src:"data:image/png;base64,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"})}),Object(_e.jsx)(nn,{children:Object(_e.jsx)("span",{children:"Pairing Tool"})}),Object(_e.jsxs)(tn,{children:[Object(_e.jsx)(cn,{children:Object(_e.jsx)(Ve.a,{})}),Object(_e.jsx)(an,{children:Object(_e.jsx)(Xe.a,{})})]})]})},on=t(17),dn=t(277),un=t(6),ln=Object(on.b)(Ae||(Ae=Object(ze.a)(["\n  width: 300px;\n  margin: 0 auto !important;\n  span {\n    margin: 0 !important;\n  }\n"]))),sn=function(){var e=Object(o.b)(),n=Object(c.useRef)(null);return Object(un.c)(un.a,{children:[Object(un.b)("input",{hidden:!0,type:"file",accept:"*.csv",ref:n,onChange:function(n){var t,c=n.target.files;c&&c.length&&e((t=c[0],function(){var e=Object(A.a)(Object(j.a)().mark((function e(n,c){var a,r;return Object(j.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.text();case 3:a=e.sent,i=c(),r=i.configuration.languages.map((function(e){return{name:e.name,alias:e.alias,exclusions:e.exclusions}})),E.parse(a,r).forEach((function(e){return n(V(e))})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}var i}),e,null,[[0,8]])})));return function(n,t){return e.apply(this,arguments)}}()))}}),Object(un.b)(dn.a,{css:ln,variant:"contained",color:"primary",onClick:function(){return n.current.click()},children:"Upload CSV"})]})},bn=t.p+"static/media/pairingCsvImg.d0d3fc48.png",pn=Object(on.b)(he||(he=Object(ze.a)(["\n  display:flex;\n  flex-flow: column nowrap;\n  margin: 0 auto;\n  width: 800px;\n\n  span {\n    font-size: 18px;\n    font-weight: bold;\n    margin: 40px auto 10px auto;\n  }\n\n  img {\n    width: 798px;\n    height: 160px;\n    margin-bottom: 40px;\n    border: 1px solid grey;\n    border-radius: 10px;\n  }\n"]))),gn=function(){return Object(un.c)("div",{css:pn,children:[Object(un.b)("span",{children:"Step 1: Download the pairing CSV from the workshop page"}),Object(un.b)("img",{alt:"Pairing CSV",src:bn}),Object(un.b)("span",{children:"And click on this button to select and upload the CSV file"}),Object(un.b)(sn,{})]})},fn=t(10),jn=t(270),An=t(275),hn=t(281),On=t(279),xn=t(278),vn=t(274),mn=Object(on.b)(Oe||(Oe=Object(ze.a)(["\n  margin: 48px 20px 20px 20px;\n  padding: 20px;\n  border: 1px solid #8d8d8d;\n  display: flex;\n  flex-flow: column nowrap;\n  text-align: left;\n"]))),yn=Object(on.b)(xe||(xe=Object(ze.a)(["\n  margin-bottom: 20px;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-between;\n  align-items: center;\n"]))),wn={HTML:"#DC4B26",CSS:"#026DB3",JS:"#E8A22A",Python:"#F8D248",Ruby:"#A21401",SQL:"#30638B",Java:"#E52B29",PHP:"#7300E2",Other:"#111111"},kn=function(e){var n=e.attendee,t=Object(o.c)(f),a=Object(c.useState)(""),r=Object(fn.a)(a,2),i=r[0],d=r[1],u=Object(c.useState)(!1),l=Object(fn.a)(u,2),s=l[0],b=l[1],p=Object(c.useState)(""),g=Object(fn.a)(p,2),j=g[0],A=g[1],h=Object(c.useState)(""),O=Object(fn.a)(h,2),x=O[0],v=O[1],y=Object(c.useState)(""),w=Object(fn.a)(y,2),k=w[0],S=w[1],C=Object(c.useState)(""),E=Object(fn.a)(C,2),J=E[0],I=E[1],B=Object(c.useState)([]),Q=Object(fn.a)(B,2),H=Q[0],R=Q[1],T=Object(o.b)();Object(c.useEffect)((function(){d(n.name),b(n.attendance),A(n.role),v(n.notes),S(void 0!==n.skills?n.skills:""),I(void 0!==n.tutorial?n.tutorial:""),R(n.languages)}),[n.name,n.attendance,n.role,n.notes,n.skills,n.tutorial,n.languages]);var Z=Object(un.b)(jn.a,{css:Object(on.b)(ve||(ve=Object(ze.a)(["flex-grow: 2;"]))),label:"Name",value:i,onChange:function(e){return d(e.target.value)},onBlur:function(){return T(_({id:n.id,name:i}))}}),D=Object(un.b)(An.a,{label:"Attendance",labelPlacement:"top",control:Object(un.b)(hn.a,{name:"attendance",color:"primary",checked:s,onChange:function(){b(!s),T(te(n.id))}})}),P=Object(un.b)(On.a,{component:"fieldset",children:Object(un.c)(xn.a,{"aria-label":"role",name:"role",value:j,onChange:function(e){A(e.target.value),T(ce(n.id))},children:[Object(un.b)(An.a,{label:"Student",value:"Student",control:Object(un.b)(vn.a,{})}),Object(un.b)(An.a,{label:"Coach",value:"Coach",control:Object(un.b)(vn.a,{})})]})}),N=Object(un.b)(jn.a,{label:"Notes",fullWidth:!0,multiline:!0,maxRows:2,value:x,onChange:function(e){return v(e.target.value)},onBlur:function(){return T($({id:n.id,notes:x}))}}),U=Object(un.b)(jn.a,{label:"Skills",fullWidth:!0,multiline:!0,maxRows:2,value:k,onChange:function(e){return S(e.target.value)},onBlur:function(){return T(ee({id:n.id,skills:k}))}}),K=Object(un.b)(jn.a,{label:"Tutorial",fullWidth:!0,value:J,onChange:function(e){return I(e.target.value)},onBlur:function(){return T(ne({id:n.id,tutorial:J}))}}),L=Object(un.b)("div",{css:Object(on.b)(me||(me=Object(ze.a)(["padding: 20px 0; text-align: left;"]))),children:t.map((function(e){return Object(un.b)(dn.a,{style:(t=wn[e],c=H.includes(e),c?{color:"white",backgroundColor:t,"&:hover":{backgroundColor:t}}:{color:t,backgroundColor:"transparent","&:hover":{backgroundColor:"transparent"}}),variant:"contained",onClick:function(){if(H.includes(e)){var t=H.indexOf(e);R([].concat(Object(m.a)(H.slice(0,t)),Object(m.a)(H.slice(t+1))))}else R([].concat(Object(m.a)(H),[e]));T(ae({id:n.id,language:e}))},children:e},e);var t,c}))});return Object(un.c)("div",{css:mn,children:[Object(un.c)("div",{css:yn,children:[Z,D,P]}),Object(un.b)("div",{css:yn,children:N}),Object(un.b)("div",{css:yn,children:U}),Object(un.b)("div",{css:yn,children:K}),Object(un.b)("div",{css:yn,children:L})]})},Sn=t(140),Cn=t.n(Sn),En=t.p+"static/media/newbie.e578ead4.png",Jn=function(e,n){var t={textAlign:"left",padding:"10px 15px",marginBottom:"3px",border:"1px solid #8d8d8d",cursor:"default",display:"flex",flexFlow:"row nowrap",alignItems:"center","&:hover":{borderColor:"#97ced2",boxShadow:"0 0 10px 4px #97ced2"}};return e&&(t.border="1px solid #4e96d0",t.boxShadow="0 0 10px 4px #4e96d0"),t.backgroundColor=n?"#8ab67c":"#c2c3c9",t},In=Object(on.b)(ye||(ye=Object(ze.a)(["\n  width: 30px;\n  height: 24px;\n  padding-right: 15px;\n"]))),Bn=function(e){var n={width:"24px",height:"24px",paddingRight:"15px"};return e||(n.opacity=0),n},Qn=Object(on.b)(we||(we=Object(ze.a)(["\n  line-height: 24px;\n  padding-right: 15px;\n"]))),Hn=function(e){var n=e.attendee,t=e.selected,c=e.onClick;return Object(un.c)("div",{style:Jn(t,n.attendance),onClick:c,children:[Object(un.b)("img",{style:Bn(n.new),src:En,alt:"First Timer"}),"Student"===n.role&&Object(un.b)(Ve.a,{css:In,alt:"Student"}),"Coach"===n.role&&Object(un.b)(Cn.a,{css:In,alt:"Coach"}),Object(un.b)("span",{css:Qn,children:n.name})]})},Rn=t(282),Tn=t(265),Zn=t(266),Dn=Object(on.b)(ke||(ke=Object(ze.a)(["\n  display: flex;\n  flex-direction: column;"]))),Pn=Object(on.b)(Se||(Se=Object(ze.a)(["\n  display: flex;\n  flex-direction: column;\n  &>span {\n    font-size: 18px;\n    font-weight: bold;\n    line-height: 36px;\n  }\n  .UpdateAttendeesStepDone {\n    width: 300px;\n    margin: 0 auto;\n  }"]))),Nn=Object(on.b)(Ce||(Ce=Object(ze.a)(["\n  display: flex;\n  flex-flow: row nowrap;\n  padding: 1%;\n\n  .Students,\n  .Coaches {\n    width: 50%;\n\n    .AddNew {\n      display: flex;\n      flex-flow: row nowrap;\n      justify-content: space-around;\n      width: 90%;\n      margin: 0 auto;\n      .AddNewName {\n        margin: 0 30px;\n      }\n    }\n  }"]))),Un=function(){var e=Object(c.useState)(void 0),n=Object(fn.a)(e,2),t=n[0],a=n[1],r=Object(o.c)(oe),i=Object(o.b)(),d=Object(un.b)("div",{"aria-label":"New Attendee",onClick:function(){return i(V({name:"",role:"Student",languages:[],attendance:!0}))},children:Object(un.b)(Rn.a,{children:Object(un.b)(Tn.a,{})})}),u=Object(un.b)(un.a,{children:r.slice().reverse().map((function(e){return Object(un.b)(Hn,{attendee:e,selected:void 0!==t&&t.id===e.id,onClick:function(){return function(e){void 0===t||t.id!==e.id?a(e):a(void 0)}(e)}},e.id)}))});return Object(un.c)("div",{css:Dn,children:[Object(un.c)("div",{css:Pn,children:[Object(un.b)("span",{children:"Step 2: Update attendance, skills and add new students or coaches"}),Object(un.b)(dn.a,{className:"UpdateAttendeesStepDone",variant:"contained",color:"primary",endIcon:Object(un.b)(Zn.a,{}),onClick:function(){return i((function(e,n){var t=n();e(re()),e(H({students:de(t),coaches:ue(t)}))}))},children:"Continue to pairings"})]}),Object(un.c)("div",{css:Nn,children:[Object(un.c)("div",{className:"Attendees",children:[d,u]}),void 0!==t&&Object(un.b)(kn,{attendee:t})]})]})},Kn=t(268),Ln=t(147),Mn="Student",Fn="Coach",Gn=t(141),zn=function(){return function(e,n){var t=Yn(D(n()),P(n())),c=Object(Gn.hopcroftKarp)(t);Object.entries(c).filter((function(e){var n=Object(fn.a)(e,2);n[0];return null!==n[1]})).forEach((function(t){var c,a=Object(fn.a)(t,2),r=a[0],i=a[1];return Wn(e,parseInt(r),parseInt(i),(c=n(),Math.max.apply(Math,Object(m.a)(c.pairings.students.map((function(e){return e.group}))).concat(Object(m.a)(c.pairings.coaches.map((function(e){return e.group})))))+1))}))}},Wn=function(e,n,t,c){e(T({studentId:n,groupId:c})),e(R({coachId:t,groupId:c}))},Yn=function(e,n){var t={};return e.forEach((function(e){return t[e.id]=Xn(e,n)})),t},Xn=function(e,n){var t=new Set(e.languages);return n.filter((function(e){return Object(m.a)(new Set(e.languages)).filter((function(e){return t.has(e)})).length>0})).map((function(e){return e.id}))},qn=t(271),Vn=t(143),_n=t.n(Vn),$n=function(e){var n=e.attendee,t=e.type,c=Object(qn.a)((function(){return{type:t,item:{id:n.id}}}),[n,t]),a=Object(fn.a)(c,2),r=(a[0],a[1]);return Object(_e.jsx)("div",{ref:r,style:{cursor:"move",margin:"10px"},children:Object(_e.jsx)(dn.a,{style:{backgroundColor:"whitesmoke","&:hover":{backgroundColor:"whitesmoke"}},variant:"outlined",endIcon:Object(_e.jsx)(_n.a,{}),children:n.name})})},et=t(283),nt=t(284),tt=Object(on.b)(Ee||(Ee=Object(ze.a)(["\n  padding: 5px 10px 5px 16px !important;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-between;\n  align-items: center;\n"]))),ct={HTML:"#DC4B26",CSS:"#026DB3",JS:"#E8A22A",Python:"#F8D248",Ruby:"#A21401",SQL:"#30638B",Java:"#E52B29",PHP:"#7300E2",Other:"#111111"},at=function(e){var n=e.data,t=e.type,c=Object(o.c)(f);return Object(un.b)(et.a,{css:Object(on.b)(Je||(Je=Object(ze.a)(["margin-bottom: 5px;"]))),children:Object(un.c)(nt.a,{css:tt,children:[Object(un.b)("section",{children:c.map((function(e){return Object(un.b)(dn.a,{style:(t=ct[e],c=n.languages.includes(e),c?{color:"white",backgroundColor:t,"&:hover":{backgroundColor:t}}:{color:t,backgroundColor:"transparent","&:hover":{backgroundColor:"transparent"}}),variant:"contained",children:e});var t,c}))}),Object(un.b)($n,{attendee:n,type:t})]})})},rt=t(272),it=Object(on.b)(Ie||(Ie=Object(ze.a)(["\n  background-color: #e0e0e0;\n  border: 5px dashed #c8c8c8;\n  border-radius: 10px;\n  padding: 10px;\n  &.IsOver {\n    background-color: aquamarine;\n  }\n"]))),ot=function(e){var n=e.groupId,t=e.children,c=Object(o.b)(),a=Object(rt.a)((function(){return{accept:Mn,drop:function(e){return c(T({studentId:e.id,groupId:n}))},collect:function(e){return{isOver:!!e.isOver()}}}}),[n]),r=Object(fn.a)(a,2),i=r[0].isOver,d=r[1];return Object(un.b)("div",{ref:d,className:"StudentDropzone ".concat(!0===i?"IsOver":""),css:it,children:t})},dt=Object(on.b)(Be||(Be=Object(ze.a)(["\n  background-color: #e0e0e0;\n  border: 5px dashed #c8c8c8;\n  border-radius: 10px;\n  padding: 10px;\n  &.IsOver {\n    background-color: aquamarine;\n  }\n"]))),ut=function(e){var n=e.groupId,t=e.children,c=Object(o.b)(),a=Object(rt.a)((function(){return{accept:Fn,drop:function(e){return c(R({coachId:e.id,groupId:n}))},collect:function(e){return{isOver:!!e.isOver()}}}}),[n]),r=Object(fn.a)(a,2),i=r[0].isOver,d=r[1];return Object(un.b)("div",{ref:d,className:"CoachDropzone ".concat(!0===i?"IsOver":""),css:dt,children:t})},lt=t(146),st=t.n(lt),bt=t(145),pt=t.n(bt),gt=t(269),ft=Object(on.b)(Qe||(Qe=Object(ze.a)(["\n  display: flex;\n  flex-direction: column;\n  &>span {\n    font-size: 18px;\n    font-weight: bold;\n    line-height: 36px;\n  }\n  &>button {\n    width: 300px;\n    margin: 15px auto;\n  }\n"]))),jt=Object(on.b)(He||(He=Object(ze.a)(["\n  padding: 10px;\n  border: 1px dashed #4e555b;\n  border-radius: 10px;\n  display: flex;\n  flex-flow: row wrap;\n  margin-bottom: 10px;\n\n  & > * {\n    width: 45%;\n    overflow: hidden;\n  }\n"]))),At=function(){var e=Object(o.c)(D),n=Object(o.c)(P),t=Object(o.c)(N),c=Object(o.b)();return Object(un.b)(Kn.a,{backend:Ln.a,children:Object(un.c)("div",{css:Object(on.b)(Re||(Re=Object(ze.a)(["display: flex; flex-direction: column;"]))),children:[Object(un.c)("div",{css:ft,children:[Object(un.b)("span",{children:"Step 3: Start organising the pairs by dragging the names of the participants to groups"}),Object(un.b)(gt.a,{title:"CAREFUL! THIS RESET THE PAIRS :(",placement:"right",children:Object(un.b)(dn.a,{variant:"contained",color:"primary",startIcon:Object(un.b)(pt.a,{}),onClick:function(){return c((function(e){e(Z()),e(ie())}))},children:"Review attendance and skills"})}),Object(un.b)(dn.a,{variant:"contained",color:"secondary",endIcon:Object(un.b)(st.a,{}),onClick:function(){return c(zn())},children:"Auto-Assign Pairs"})]}),Object(un.c)("div",{css:Object(on.b)(Te||(Te=Object(ze.a)(["display: flex;flex-flow: row nowrap;padding: 1%;"]))),children:[Object(un.c)("div",{css:Object(on.b)(Ze||(Ze=Object(ze.a)(["display: flex;flex-direction: column;width: 60%;"]))),children:[Object(un.b)("h4",{children:"Students"}),Object(un.c)(ot,{groupId:0,children:[e.map((function(e){return Object(un.b)(at,{data:e,type:Mn})})),0===e.length&&Object(un.b)("span",{css:Object(on.b)(De||(De=Object(ze.a)(["padding:10px; color: #757575;"]))),children:"Drag a student here"})]}),Object(un.b)("h4",{children:"Coaches"}),Object(un.c)(ut,{groupId:0,children:[n.map((function(e){return Object(un.b)(at,{data:e,type:Fn})})),0===n.length&&Object(un.b)("span",{css:Object(on.b)(Pe||(Pe=Object(ze.a)(["padding:10px; color: #757575;"]))),children:"Drag a coach here"})]})]}),Object(un.c)("div",{css:Object(on.b)(Ne||(Ne=Object(ze.a)(["display: flex; flex-direction: column; width: 40%; padding: 20px;"]))),children:[Object(un.b)("h4",{children:"Pairs"}),t.map((function(e){return Object(un.c)("div",{css:jt,children:[Object(un.c)(ot,{groupId:e.id,children:[e.students.map((function(e){return Object(un.b)($n,{attendee:e,type:Mn})})),0===e.students.length&&Object(un.b)("span",{css:Object(on.b)(Ue||(Ue=Object(ze.a)(["padding:10px; color: #757575;"]))),children:"Drag a student here"})]}),Object(un.c)(ut,{groupId:e.id,children:[e.coaches.map((function(e){return Object(un.b)($n,{attendee:e,type:Fn})})),0===e.coaches.length&&Object(un.b)("span",{css:Object(on.b)(Ke||(Ke=Object(ze.a)(["padding:10px; color: #757575;"]))),children:"Drag a coach here"})]}),Object(un.b)("div",{css:Object(on.b)(Le||(Le=Object(ze.a)(["width: 100%; padding: 10px;"]))),children:e.languages.map((function(e){return Object(un.b)(dn.a,{variant:"contained",color:"primary",children:e})}))})]})}))]})]})]})})},ht=function(){var e=Object(o.c)(le),n=Object(o.c)(se);return Object(_e.jsxs)("div",{className:"PairingTool",children:[!n&&!e&&Object(_e.jsx)(gn,{}),!n&&e&&Object(_e.jsx)(Un,{}),n&&Object(_e.jsx)(At,{})]})},Ot=We.a.div(Me||(Me=Object(ze.a)(["\n  height: 100vh;\n  text-align: center;\n  background-color: #fdfaf6;\n  display: grid;\n  grid-template:\n          'header' 60px\n          'content' 1fr\n          / 1fr;\n"]))),xt=We.a.div(Fe||(Fe=Object(ze.a)(["\n  grid-area: header;\n"]))),vt=We.a.div(Ge||(Ge=Object(ze.a)(["\n  grid-area: content;\n  overflow: auto;\n"]))),mt=function(){return Object(_e.jsxs)(Ot,{children:[Object(_e.jsx)(xt,{children:Object(_e.jsx)(rn,{})}),Object(_e.jsx)(vt,{children:Object(_e.jsx)(ht,{})})]})},yt=(t(209),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be;return Object(d.a)({reducer:{toggles:s,configuration:g,attendees:X,pairings:B},preloadedState:e})}());new URLSearchParams(window.location.search).forEach((function(e,n){return yt.dispatch(b({toggle:n,value:e}))})),i.a.render(Object(_e.jsx)(a.a.StrictMode,{children:Object(_e.jsx)(o.a,{store:yt,children:Object(_e.jsx)(mt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[210,1,2]]]);
//# sourceMappingURL=main.f2c16711.chunk.js.map