(this["webpackJsonppractice-contact-list"]=this["webpackJsonppractice-contact-list"]||[]).push([[0],{178:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(33),s=a.n(n),i=a(29),r=a.n(i),l=a(39),o=a(54),j=a(47);a(86),a(179);j.a.initializeApp({apiKey:"AIzaSyAi2X6R2sYpAfFa2O9gPX_J04107naHYTM",authDomain:"practice-contact-list.firebaseapp.com",databaseURL:"https://practice-contact-list-default-rtdb.firebaseio.com",projectId:"practice-contact-list",storageBucket:"practice-contact-list.appspot.com",messagingSenderId:"473645827389",appId:"1:473645827389:web:abd3068e5de9e5d07df154",measurementId:"G-P9DT8WWE12"});var m=j.a.auth(),u=function(){var e=new j.a.auth.GoogleAuthProvider;m.signInWithPopup(e).then((function(e){})).catch((function(e){console.error(e)}))},d=j.a,b=a(16),f=a(2),O=Object(c.createContext)();function x(){return Object(c.useContext)(O)}var h=function(e){var t=Object(c.useState)(null),a=Object(b.a)(t,2),n=a[0],s=a[1],i=Object(c.useState)(!1),o=Object(b.a)(i,2),j=o[0],u=o[1];Object(c.useEffect)((function(){return m.onAuthStateChanged(function(){var e=Object(l.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var d={currentUser:n,simulateLogin:j,toggleSimLog:function(){u(!j)},logout:function(){return m.signOut()}};return Object(f.jsx)(O.Provider,{value:d,children:e.children})},p=a(19),v=a(31),N=a(80),g=a(62),L=a(40);var y=function(){var e=x(),t=e.currentUser,a=e.logout,c=e.simulateLogin,n=e.toggleSimLog,s=function(){var e=Object(l.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();return Object(f.jsx)(L.a,{className:"my-3",children:Object(f.jsxs)(N.a,{className:"d-flex justify-content-between",children:[Object(f.jsxs)(g.a.Item,{className:"d-flex align-items-center",children:[Object(f.jsx)(o.b,{to:"/home",children:Object(f.jsx)(p.a,{className:"btn-dark",children:Object(f.jsx)("i",{className:"fas fa-dragon"})})}),Object(f.jsx)("h1",{className:"d-inline-block mx-3 my-0",children:"Contact List"})]}),Object(f.jsxs)(g.a.Item,{className:"d-flex align-items-center",children:[Object(f.jsx)("h5",{className:"d-inline-block mx-3 my-0",children:t&&t.email}),Object(f.jsxs)(v.a,{children:[!t&&Object(f.jsx)(p.a,{onClick:n,className:"".concat(c?"btn-secondary":"btn-primary"),children:"".concat(c?"Simulate Logout":"Simulate Login")}),Object(f.jsxs)(p.a,{onClick:u,children:[Object(f.jsx)("i",{className:"fab fa-google"})," ",Object(f.jsx)("i",{className:"fas fa-sign-in-alt"})]}),t&&Object(f.jsx)(p.a,{onClick:s,className:"btn-secondary",children:Object(f.jsx)("i",{className:"fas fa-sign-out-alt"})})]})]})]})})},F=a(12),C=(a(98),a(30)),w=a(79),k=a.n(w),S=a(26);function E(e){var t=d.firestore().collection("contacts"),a=Object(c.useRef)(null),n=Object(c.useRef)(null),s=Object(c.useRef)(null),i=Object(c.useState)({nameFirst:e.defaultNameFirst,nameLast:e.defaultNameLast,email:e.defaultEmail}),o=Object(b.a)(i,2),j=o[0],m=o[1],u=Object(c.useState)(!1),O=Object(b.a)(u,2),x=O[0],h=O[1],N=Object(c.useState)({nameFirst:null,nameLast:null,email:null}),g=Object(b.a)(N,2),L=g[0],y=g[1],F=function(e){return!!(j[e]&&j[e].length>0)},w=function(){var e={},t=!0;return F("nameFirst")?e.nameFirst="":(e.nameFirst="Missing Input",t=!1),F("nameLast")?e.nameLast="":(e.nameLast="Missing Input",t=!1),j.email&&k.a.isEmail(j.email)?e.email="":(e.email="Invalid Email Address",t=!1),y({nameFirst:e.nameFirst,nameLast:e.nameLast,email:e.email}),t},E=function(){var c=Object(l.a)(r.a.mark((function c(i){return r.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:if(i.preventDefault(),!w()){c.next=15;break}if(console.log("validated"),"edit"!==e.formType){c.next=9;break}return c.next=6,t.doc(e.id).set({nameFirst:j.nameFirst,nameLast:j.nameLast,email:j.email}).catch((function(e){return console.error(e)}));case 6:e.cancelEdit(),c.next=15;break;case 9:return c.next=11,t.doc().set({nameFirst:j.nameFirst,nameLast:j.nameLast,email:j.email,timestamp:(new Date).getTime()}).catch((function(e){console.error(e)}));case 11:m({nameFirst:"",nameLast:"",email:""}),a.current.value="",n.current.value="",s.current.value="";case 15:return h(!0),c.abrupt("return");case 17:case"end":return c.stop()}}),c)})));return function(e){return c.apply(this,arguments)}}();return Object(f.jsxs)(S.a,{onSubmit:E,className:"p-3 container",children:[Object(f.jsxs)("div",{className:"row p-3",children:[Object(f.jsxs)(S.a.Group,{className:"col",children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(f.jsx)(S.a.Label,{children:"First Name"}),Object(f.jsx)("div",{className:"text-danger",children:x?L.nameFirst:""})]}),Object(f.jsx)(S.a.Control,{className:"".concat(""!==L.nameFirst&&x?"is-invalid":""),ref:a,type:"text",placeholder:"First Name",value:j.nameFirst,onChange:function(e){return m(Object(C.a)(Object(C.a)({},j),{},{nameFirst:e.target.value}))}})]}),Object(f.jsxs)(S.a.Group,{className:"col",children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(f.jsx)(S.a.Label,{children:"Last Name"}),Object(f.jsx)("div",{className:"text-danger",children:x?L.nameLast:""})]}),Object(f.jsx)(S.a.Control,{className:"".concat(""!==L.nameLast&&x?"is-invalid":""),ref:n,type:"text",placeholder:"Last Name",value:j.nameLast,onChange:function(e){return m(Object(C.a)(Object(C.a)({},j),{},{nameLast:e.target.value}))}})]})]}),Object(f.jsx)("div",{className:"row p-3 pt-0",children:Object(f.jsxs)(S.a.Group,{className:"pt-0",children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(f.jsx)(S.a.Label,{children:"Email"}),Object(f.jsx)("div",{className:"text-danger",children:x?L.email:""})]}),Object(f.jsx)(S.a.Control,{className:"".concat(""!==L.email&&x?"is-invalid":""),ref:s,type:"email",placeholder:"Email",value:j.email,onChange:function(e){return m(Object(C.a)(Object(C.a)({},j),{},{email:e.target.value}))}})]})}),Object(f.jsxs)("div",{className:"d-flex p-3 justify-content-end",children:["add"===e.formType&&Object(f.jsx)(p.a,{type:"submit",className:"btn-success",children:Object(f.jsx)("i",{className:"fas fa-user-plus"})}),"edit"===e.formType&&Object(f.jsxs)(v.a,{children:[Object(f.jsx)(p.a,{className:"btn-secondary",onClick:e.cancelEdit,children:Object(f.jsx)("i",{className:"fas fa-window-close"})}),Object(f.jsx)(p.a,{type:"submit",className:"btn-success",children:Object(f.jsx)("i",{className:"fas fa-user-check"})})]})]})]})}var I=a(46);function T(e){var t=d.firestore().collection("contacts"),a=x(),n=a.currentUser,s=a.simulateLogin,i=Object(c.useState)(!1),r=Object(b.a)(i,2),l=r[0],o=r[1],j=Object(c.useState)(e.nameFirst),m=Object(b.a)(j,2),u=(m[0],m[1]),O=Object(c.useState)(e.nameLast),h=Object(b.a)(O,2),N=(h[0],h[1]),g=Object(c.useState)(e.email),y=Object(b.a)(g,2),F=(y[0],y[1]),C=Object(c.useState)({nameFirst:"",nameLast:"",email:""}),w=Object(b.a)(C,2);w[0],w[1];return Object(f.jsx)(L.a,{className:"mt-3",children:Object(f.jsxs)(I.a,{className:"p-2",children:[!l&&Object(f.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:[e.nameFirst," ",e.nameLast]}),Object(f.jsx)("div",{children:e.email})]}),Object(f.jsx)("div",{className:"ml-3",children:(n||s)&&Object(f.jsxs)(v.a,{children:[Object(f.jsx)(p.a,{onClick:function(){o(!0)},children:Object(f.jsx)("i",{className:"fas fa-user-edit"})}),Object(f.jsx)(p.a,{onClick:function(){return a=e.id,void t.doc(a).delete().catch((function(e){return console.error(e)}));var a},className:"btn-danger",children:Object(f.jsx)("i",{className:"fas fa-user-slash"})})]})})]}),l&&Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"text-center pt-5",children:"Editing Contact"}),Object(f.jsx)(E,{formType:"edit",cancelEdit:function(){o(!1),u(e.nameFirst),N(e.nameLast),F(e.email)},defaultNameFirst:e.nameFirst,defaultNameLast:e.nameLast,defaultEmail:e.email,id:e.id})]})]})})}var A=a(36);function G(e){var t=d.firestore().collection("contacts"),a=x(),n=a.currentUser,s=a.simulateLogin,i=Object(c.useState)([]),r=Object(b.a)(i,2),l=r[0],o=r[1],j=Object(c.useState)("timestamp"),m=Object(b.a)(j,2),u=m[0],O=m[1],h=Object(c.useState)(!0),N=Object(b.a)(h,2),g=N[0],y=N[1];Object(c.useEffect)((function(){t.onSnapshot((function(e){console.log("effect ran");var t=[];e.forEach((function(e){var a=e.data();a.id=e.id,t.push(a)})),o(t)}))}),[]);var F=function(e){console.log("sorting");var t=[];for(var a in e)t.push(Object(C.a)({},e[a]));return 0===t.length?t:g?"string"===typeof t[0][u]?t.sort((function(e,t){return e[u].toLowerCase()>t[u].toLowerCase()?1:-1})):t.sort((function(e,t){return e[u]>t[u]?1:-1})):"string"===typeof t[0][u]?t.sort((function(e,t){return e[u].toLowerCase()<t[u].toLowerCase()?1:-1})):t.sort((function(e,t){return e[u]<t[u]?1:-1}))}(l).map((function(e){return Object(f.jsx)(T,{id:e.id,email:e.email,nameFirst:e.nameFirst,nameLast:e.nameLast,timestamp:e.timestamp},e.id)}));return Object(f.jsxs)(L.a,{children:[(n||s)&&Object(f.jsxs)(I.a,{children:[Object(f.jsx)("div",{className:"text-center pt-5",children:"Add Contact"}),Object(f.jsx)(E,{formType:"add"})]}),Object(f.jsxs)(I.a,{className:"mt-5 pb-3",children:[!(n||s)&&Object(f.jsx)("p",{className:"m-4 mb-0 text-muted",children:"Log in with Google or Simulate Login to edit Contact List"}),Object(f.jsx)("div",{className:"m-4 mb-0 d-flex justify-content-end",children:Object(f.jsxs)(A.a,{as:v.a,children:[Object(f.jsxs)(p.a,{className:"btn-secondary btn-sm",onClick:function(){y(!g)},children:[g&&Object(f.jsx)("i",{className:"fas fa-sort-up"}),!g&&Object(f.jsx)("i",{className:"fas fa-sort-down"})]}),Object(f.jsxs)(A.a.Toggle,{split:!0,variant:"info",children:["Sort ",Object(f.jsxs)("span",{className:"text-capitalize",children:[u," "]})]}),Object(f.jsxs)(A.a.Menu,{children:[Object(f.jsx)(A.a.Item,{onClick:function(){O("timestamp")},children:"Timestamp"}),Object(f.jsx)(A.a.Item,{onClick:function(){O("nameFirst")},children:"First Name"}),Object(f.jsx)(A.a.Item,{onClick:function(){O("nameLast")},children:"Last Name"}),Object(f.jsx)(A.a.Item,{onClick:function(){O("email")},children:"Email"})]})]})}),Object(f.jsx)("div",{className:"p-2",children:F})]})]})}var P=function(){return Object(f.jsx)(o.a,{children:Object(f.jsxs)(h,{children:[Object(f.jsx)(y,{}),Object(f.jsx)(G,{}),Object(f.jsx)(F.c,{children:Object(f.jsx)(F.a,{path:"/home",exact:!0})})]})})};s.a.render(Object(f.jsx)(P,{}),document.getElementById("root"))}},[[178,1,2]]]);
//# sourceMappingURL=main.d4f73389.chunk.js.map