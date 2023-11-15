import{j as e,C as s,B as a}from"./MultiEvent.stories-5139bf91.js";import{M as l,C as o}from"./index-de82169d.js";import{u as i}from"./index-dc1d5b46.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-51aaaac5.js";import"../sb-preview/runtime.js";import"./index-772e0a79.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function r(t){const n=Object.assign({h1:"h1",p:"p",strong:"strong",a:"a",h2:"h2",ul:"ul",li:"li",h3:"h3",code:"code",pre:"pre"},i(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:s}),`
`,e.jsx(n.h1,{id:"multi-event-calendar",children:"Multi Event Calendar"}),`
`,e.jsxs(n.p,{children:["This is a simple React calendar component (with ",e.jsx(n.strong,{children:"monthly"})," view only) that is suitable to display multiple events per day."]}),`
`,e.jsxs(n.p,{children:["For a live demo visit ",e.jsx(n.a,{href:"https://mehrizi.github.io/multi-event",target:"_blank",rel:"nofollow noopener noreferrer",children:"mehrizi.github.io/multi-event"})]}),`
`,e.jsx(n.h2,{id:"key-features",children:"key features:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Multi calendar system support"}),`
`,e.jsx(n.li,{children:"RTL support"}),`
`,e.jsx(n.li,{children:"Weekends are configurable"}),`
`,e.jsx(n.li,{children:"Week start is configurable"}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.h3,{id:"peer-dependencies",children:"Peer dependencies:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"React (I assume you already have react installed to use a React component!)"}),`
`,e.jsxs(n.li,{children:["Luxon which we use as date adapter: ",e.jsx(n.code,{children:"npm i luxon --save"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"install-the-package",children:"Install the package"}),`
`,e.jsxs(n.p,{children:["To install the package via npm simply run the following in root of your project: ",e.jsx("br",{}),`\r
`,e.jsx(n.code,{children:"npm i multi-event-calendar --save"})]}),`
`,e.jsx(n.h3,{id:"how-to-use",children:"How to use"}),`
`,e.jsxs(n.p,{children:["It is important to remember that ",e.jsx(n.code,{children:"<MultiEvent>"}),` Component fills the parent width. It adjusts the height acoordingly.\r
In this example the width is fixed to 300px`]}),`
`,e.jsx(o,{of:a,Source:!0,layout:"padded"}),`
`,e.jsx(n.p,{children:"The Following code is simplest way of integrating the calendar"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-JSX",children:`import { DateTime } from "luxon";\r
import {MultiEvent,Calendar,YearBar} from 'multi-event-calendar';\r
\r
let events =[{\r
    time: DateTime.now(), // return a luson object\r
    title: "Some event title", \r
    color: "#cab" //some color hex\r
    // Your event might have other attributes but these 3 are must\r
 }]\r
\r
<MultiEvent events={events}>\r
    <YearBar />\r
    <Calendar />\r
</MultiEvent>
`})})]})}function f(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(r,t)})):r(t)}export{f as default};
//# sourceMappingURL=MultiEvent-c8aec34e.js.map
