(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{16:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(17),u=n.n(a),o=n(18),i=n(3),s=n(0);var l=function(e){return Object(s.jsxs)("div",{children:["filter shown with",Object(s.jsx)("input",{onChange:function(t){return e.setFilter(t.target.value)},value:e.filter})]})};var d=function(e){return Object(s.jsxs)("form",{onSubmit:e.addNumber,children:[Object(s.jsxs)("div",{children:["name:",Object(s.jsx)("input",{onChange:e.handleNameChange,value:e.newName})]}),Object(s.jsxs)("div",{children:["number:",Object(s.jsx)("input",{onChange:e.handleNumberChange,value:e.newNumber})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=n(5),b=n.n(j),f="/api/persons",h=function(){return b.a.get(f).then((function(e){return e.data}))},m=function(e){return b.a.post(f,e).then((function(e){return e.data}))},O=function(e,t){return b.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},g=function(e){return b.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))};var v=function(e){return Object(s.jsx)("div",{children:Object(s.jsx)("ul",{children:e.persons.filter((function(t){return t.name.toLowerCase().includes(e.filter.toLowerCase())})).map((function(t,n){return Object(s.jsxs)("li",{children:[t.name," ",t.number," ",Object(s.jsx)("button",{onClick:function(){return function(t){console.log(t),window.confirm("Delete ".concat(t.name,"?"))&&g(t.id).then((function(){e.getData(),e.setMessage("Deleted ".concat(t.name)),setTimeout((function(){e.setMessage(null)}),5e3)})).catch((function(n){e.setErrorMessage("Information of ".concat(t.name," has already been removed from the server")),e.getData(),setTimeout((function(){e.setErrorMessage(null)}),5e3)}))}(t)},children:"delete"})]},t.id)}))})})};n(16);var x=function(e){var t=e.message;return null===t?null:Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"message",children:t})})};var p=function(e){var t=e.errorMessage;return null===t?null:Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"error",children:t})})},w=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(""),u=Object(i.a)(a,2),j=u[0],b=u[1],f=Object(c.useState)(""),g=Object(i.a)(f,2),w=g[0],N=g[1],M=Object(c.useState)(""),C=Object(i.a)(M,2),D=C[0],S=C[1],k=Object(c.useState)(null),y=Object(i.a)(k,2),E=y[0],T=y[1],B=Object(c.useState)(null),F=Object(i.a)(B,2),I=F[0],J=F[1];Object(c.useEffect)((function(){L()}),[]);var L=function(){h().then((function(e){console.log("getData",e),r(e)}))};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"PhoneBook"}),Object(s.jsx)(x,{message:E}),Object(s.jsx)(p,{errorMessage:I}),Object(s.jsx)(l,{filter:D,setFilter:S}),Object(s.jsx)("h2",{children:"add a new"}),Object(s.jsx)(d,{addNumber:function(e){var t={name:j,id:(n.length>0?Math.max.apply(Math,Object(o.a)(n.map((function(e){return e.id})))):0)+1,number:w};if(n.find((function(e){return e.name===j}))){var c=n.find((function(e){return e.name===j}));e.preventDefault(),window.confirm("".concat(j," is already added to phonebook, replace the old number with a new one?"))&&(console.log(c),O(c.id,t).then((function(){L(),T("Updated ".concat(t.name)),setTimeout((function(){T(null)}),5e3)}))),b(""),N("")}else e.preventDefault(),m(t).then((function(e){L(),b(""),N(""),T("Added ".concat(t.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(e){console.log(e.response.data),J(e.response.data.error),setTimeout((function(){J(null)}),5e3)}))},handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){N(e.target.value)},newName:j,newNumber:w}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(v,{persons:n,filter:D,getData:L,setMessage:T,setErrorMessage:J})]})};u.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(w,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.62b191ec.chunk.js.map