import{r,j as t,c as g,u as m,L as x,a as j,H as f,b as v,P as N,A as y}from"./index-C6cnCfjt.js";const w="_input_wrapper_1f13h_1",q="_input_1f13h_1",C="_invalid_1f13h_39",E="_icon_1f13h_45",o={input_wrapper:w,input:q,invalid:C,icon:E},S=r.forwardRef(function({isValid:e=!0,className:a,...n},c){return t.jsxs("div",{className:o.input_wrapper,children:[t.jsx("input",{ref:c,className:g(o.input,a,{[o.invalid]:e}),...n}),t.jsx("img",{src:"search-icon.png",alt:"иконка поиска",className:o.icon})]})}),F="_card_1ltqi_1",L="_header_1ltqi_17",b="_img_1ltqi_25",P="_addToCart_1ltqi_41",T="_price_1ltqi_75",$="_currency_1ltqi_107",k="_rating_1ltqi_115",A="_footer_1ltqi_143",M="_title_1ltqi_151",R="_description_1ltqi_161",i={card:F,header:L,img:b,addToCart:P,price:T,currency:$,rating:k,footer:A,title:M,description:R};function D(s){const e=m();function a(n){n.preventDefault(),e(j.add(s.id))}return t.jsx(x,{to:`/product/${s.id}`,children:t.jsxs("div",{className:i.card,children:[t.jsxs("div",{className:i.header,children:[t.jsx("img",{className:i.img,src:s.image}),t.jsxs("div",{className:i.price,children:[s.price,t.jsx("span",{className:i.currency,children:" ₽"})]}),t.jsx("button",{className:i.addToCart,onClick:a,children:t.jsx("img",{src:"cart-button-icon.png",alt:"Добавить в корзину"})}),t.jsxs("div",{className:i.rating,children:[s.rating," ",t.jsx("img",{src:"star-icon.png",alt:"Иконка звезды"})]})]}),t.jsxs("div",{className:i.footer,children:[t.jsx("div",{className:i.title,children:s.title}),t.jsx("div",{className:i.description,children:s.description})]})]})})}const H="_wrapper_1rkze_1",I={wrapper:H},z=({products:s})=>t.jsx("div",{className:I.wrapper,children:s.map(e=>t.jsx(D,{id:e.id,price:e.price,description:e.ingredients.join(", "),image:e.image,rating:e.rating,title:e.name},e.id))}),B=({})=>{const[s,e]=r.useState([]),[a,n]=r.useState(!1),[c,u]=r.useState(""),[l,p]=r.useState(""),h=async _=>{try{n(!0);const{data:d}=await v.get(`${N}/products`,{params:{name:_}});e(d)}catch(d){d instanceof y&&u(d.message)}finally{n(!1)}};return r.useEffect(()=>{h(l)},[l]),t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[t.jsx(f,{children:"Меню"}),t.jsx(S,{placeholder:"Введите блюдо или состав",value:l,onChange:_=>p(_.target.value)})]}),a&&t.jsx(t.Fragment,{children:" loading..."}),c&&t.jsx(t.Fragment,{children:c}),!a&&s.length>0&&t.jsx(z,{products:s}),!a&&s.length===0&&t.jsx("p",{children:"Ничего не найдено по запросу"})]})};export{B as default};
