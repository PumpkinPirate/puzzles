import{_ as g,o as n,c as o,a as l,F as d,r as u,l as h,t as _,d as v,e as f}from"./index.2f9819d6.js";var z="/puzzles/assets/bear.79b2a302.png",b="/puzzles/assets/snake.a08a1154.png",w="/puzzles/assets/crown.52c75c7c.png",U="/puzzles/assets/seal.ffac2e14.png",k="/puzzles/assets/bat.20fbb6f9.png",B="/puzzles/assets/straight.b21f08d3.png",x="/puzzles/assets/mountain.d52dd26b.png",S="/puzzles/assets/butterfly.3cb392da.png",$="/puzzles/assets/lobster.ca401419.png",y="/puzzles/assets/hexagon.55352df2.png",C="/puzzles/assets/hook.fa11df2b.png",L="/puzzles/assets/L.a30b7eaf.png",c=[{name:"Straight",weight:4,image:B},{name:"L",weight:8,image:L},{name:"Crown",weight:9,image:w},{name:"Mountian",weight:15,image:x},{name:"Bear",weight:15,image:z},{name:"Bat",weight:4,image:k},{name:"Seal",weight:11,image:U},{name:"Lobster",weight:9,image:$},{name:"Hook",weight:15,image:C},{name:"Hexagon",weight:4,image:y},{name:"Butterfly",weight:7,image:S},{name:"Snake",weight:4,image:b}],H=c.map(e=>e.weight).reduce((e,a)=>e+a,0);function N(){var e=Math.random()*H,a=0;for(const t of c)if(a+=t.weight,a>e)return t}const V={name:"ShieldBoard",data(){return{pieces:[]}},methods:{generate(){this.pieces.unshift(N())},remove(e){this.pieces.splice(e,1)}}},F={class:"wrapper"},M=["onClick"],D=["src"];function E(e,a,t,p,i,r){return n(),o("div",F,[l("button",{onClick:a[0]||(a[0]=(...s)=>r.generate&&r.generate(...s))},"Generate"),(n(!0),o(d,null,u(i.pieces,(s,m)=>(n(),o("p",{onClick:q=>r.remove(m)},[h(_(s.name)+" ",1),l("img",{src:s.image,class:"piece"},null,8,D)],8,M))),256))])}var G=g(V,[["render",E],["__scopeId","data-v-0a3574b0"]]);const I={name:"Home",components:{ShieldBoard:G}},T={class:"puzzle"};function j(e,a,t,p,i,r){const s=v("ShieldBoard");return n(),o("div",T,[f(s)])}var J=g(I,[["render",j]]);export{J as default};