(function(r,d){typeof exports=="object"&&typeof module<"u"?module.exports=d(require("vue")):typeof define=="function"&&define.amd?define(["vue"],d):(r=typeof globalThis<"u"?globalThis:r||self,r["sm-vue"]=d(r.Vue))})(this,function(r){"use strict";var d=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Y(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var H=1/0,q="[object Symbol]",Q=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,X=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,k="\\ud800-\\udfff",ee="\\u0300-\\u036f\\ufe20-\\ufe23",te="\\u20d0-\\u20f0",x="\\u2700-\\u27bf",y="a-z\\xdf-\\xf6\\xf8-\\xff",re="\\xac\\xb1\\xd7\\xf7",se="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",oe="\\u2000-\\u206f",ne=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",_="A-Z\\xc0-\\xd6\\xd8-\\xde",ie="\\ufe0e\\ufe0f",w=re+se+oe+ne,h="['’]",j="["+w+"]",v="["+ee+te+"]",B="\\d+",ae="["+x+"]",$="["+y+"]",O="[^"+k+w+B+x+y+_+"]",ce="\\ud83c[\\udffb-\\udfff]",le="(?:"+v+"|"+ce+")",ue="[^"+k+"]",E="(?:\\ud83c[\\udde6-\\uddff]){2}",S="[\\ud800-\\udbff][\\udc00-\\udfff]",m="["+_+"]",de="\\u200d",C="(?:"+$+"|"+O+")",me="(?:"+m+"|"+O+")",A="(?:"+h+"(?:d|ll|m|re|s|t|ve))?",L="(?:"+h+"(?:D|LL|M|RE|S|T|VE))?",T=le+"?",z="["+ie+"]?",pe="(?:"+de+"(?:"+[ue,E,S].join("|")+")"+z+T+")*",fe=z+T+pe,be="(?:"+[ae,E,S].join("|")+")"+fe,he=RegExp(h,"g"),ge=RegExp(v,"g"),ke=RegExp([m+"?"+$+"+"+A+"(?="+[j,m,"$"].join("|")+")",me+"+"+L+"(?="+[j,m+C,"$"].join("|")+")",m+"?"+C+"+"+A,m+"+"+L,B,be].join("|"),"g"),xe=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,ye={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"ss"},_e=typeof d=="object"&&d&&d.Object===Object&&d,we=typeof self=="object"&&self&&self.Object===Object&&self,je=_e||we||Function("return this")();function ve(e,t,s,a){var c=-1,n=e?e.length:0;for(a&&n&&(s=e[++c]);++c<n;)s=t(s,e[c],c,e);return s}function Be(e){return e.match(Q)||[]}function $e(e){return function(t){return e==null?void 0:e[t]}}var Oe=$e(ye);function Ee(e){return xe.test(e)}function Se(e){return e.match(ke)||[]}var Ce=Object.prototype,Ae=Ce.toString,R=je.Symbol,I=R?R.prototype:void 0,U=I?I.toString:void 0;function Le(e){if(typeof e=="string")return e;if(Re(e))return U?U.call(e):"";var t=e+"";return t=="0"&&1/e==-H?"-0":t}function Te(e){return function(t){return ve(Me(Ie(t).replace(he,"")),e,"")}}function ze(e){return!!e&&typeof e=="object"}function Re(e){return typeof e=="symbol"||ze(e)&&Ae.call(e)==q}function M(e){return e==null?"":Le(e)}function Ie(e){return e=M(e),e&&e.replace(X,Oe).replace(ge,"")}var Ue=Te(function(e,t,s){return e+(s?"-":"")+t.toLowerCase()});function Me(e,t,s){return e=M(e),t=s?void 0:t,t===void 0?Ee(e)?Se(e):Be(e):e.match(t)||[]}var Ne=Ue;const Fe=Y(Ne),f={default:{_packs:{missile:5,"super-missile":5,"power-bomb":5}},varia:{},nature:{_packs:{missile:5,"super-missile":3,"power-bomb":2},"x-ray":"beam-burst"},vitality:{_packs:{missile:2,"super-missile":1,"power-bomb":1}},ascent:{"spring-ball":"boost-ball",draygon:"weapons-tank","x-ray":"shinespark"}},g=(e,t)=>{const s=e.__vccOpts||e;for(const[a,c]of t)s[a]=c;return s},Pe=e=>Fe(e.toLowerCase().replace("'","")),N=[["energy-tank","reserve-tank","missile","super-missile","power-bomb"],["charge-beam","ice-beam","wave-beam","spazer-beam","plasma-beam"],["morph-ball","varia-suit","spring-ball","hi-jump-boots","space-jump"],["bomb","gravity-suit","ridley","speed-booster","screw-attack"],["grappling-beam","kraid","phantoon","draygon","x-ray"]],F=[["cwisp","morph-ball","bomb","spring-ball"],["hi-jump-boots","speed-booster","space-jump","screw-attack"],["varia-suit","ridley","gravity-suit"],["kraid","phantoon","draygon"]],Ze=[["cwisp","morph-ball","bomb","spring-ball","varia-suit"],["hi-jump-boots","speed-booster","space-jump","screw-attack","gravity-suit"]],Ge=N[0],P=(e,t,s=2)=>!e||typeof e!="number"?null:(t?e*t:e).toString().padStart(s,0).split("").map(c=>`smi-number -number-${c}`),Ve=(e,t)=>["ridley","draygon","phantoon","kraid"].includes(e)?[`sm-g4-head -${e}`,t&&"-inactive"]:[`sm-item -${e}`,!t&&"-has-not"],Z={"kill kraid":!0,"kill phantoon":!0,"kill draygon":!0,"kill ridley":!0,kraid:!0,phantoon:!0,draygon:!0,ridley:!0},De=e=>e.map(t=>t.filter(s=>!Z[s])),We={props:{inventory:Object,controlled:Boolean,mode:String,rows:Array,world:String,objectives:Object,width:Number,objective_order:Array},emits:["add-item","toggle-item","toggle-objective"],data(){return{targets:{}}},computed:{vanilla_objectives(){return!Object.keys(this.objectives||{}).find(t=>!Z[t])},row_slugs(){if(this.rows)return this.rows;let e=N.map(s=>s.slice());const t=f[this.world];return this.mode==="cwisp"?this.vanilla_objectives?e=F.map(s=>s.slice()):Object.keys(this.objectives||{}).length<=6?e=F:e=Ze.map(s=>s.slice()):this.mode==="compact"&&(e[4].pop(),e[4].shift(),e.shift()),t&&(e=e.map(s=>s.map(a=>t[a]||a))),this.vanilla_objectives||(e=De(e)),e},columns(){return Object.keys(this.objectives||{}).length>15?6:this.row_slugs[0].length},prepped_rows(){var s,a;const e=f[this.world]||f.default,t=this.row_slugs.map(c=>c.map(n=>{var l;const i=this.inventory[n];return{slug:n,numbers:P(i,(l=e._packs)==null?void 0:l[n]),attrs:{class:[Ve(n,i),i>99&&"-three-digits"],id:`grid-tracker__${n}`}}}));if(!this.vanilla_objectives){const c=Object.keys(this.objectives||{}),{columns:n}=this;this.mode||t[3].push(...t.pop());let i=t.findIndex(l=>l.length<t[0].length);for(i===-1&&(i=t.length);c.length>0;){for(;((s=t[i])==null?void 0:s.length)>=n;)i++;t[i]||t.push([]);const l=c.shift(),p=Pe(l);let u;(a=this.objective_order)!=null&&a.includes(l)&&(u=this.objective_order.indexOf(l)+1),t[i].push({slug:l,type:"objective",numbers:P(u,1,1),target:this.targets[l],attrs:{class:`smv-objective -${p} -${this.objectives[l]?"in":""}active`,id:`grid-tracker__${p}`}})}}return t},style(){const{width:e}=this;if(!e)return{};const t=this.columns+2*.2+(this.columns-1)*.1;return{fontSize:`${e/t}px`}}},methods:{click(e,{slug:t,type:s}={}){if(s==="objective")this.objectives[t]===void 0?console.error("trying to toggle non-existant objective"):e.shiftKey||e.ctrlKey?this.targets[t]=!this.targets[t]:this.$emit("toggle-objective",t);else if(Ge.includes(t)){const a=e.shiftKey||e.ctrlKey?-1:1;!this.controlled&&this.$emit("add-item",t,a)}else!this.controlled&&this.$emit("toggle-item",t)}}},Ke=["onClick"],Je={key:3,class:"fa fa-crosshairs _targeted"};function Ye(e,t,s,a,c,n){const i=r.resolveComponent("sm-cwisp-tracker");return r.openBlock(),r.createElementBlock("div",{class:r.normalizeClass(`grid-tracker smi-tracker ${s.controlled?"-controlled":""}`),style:r.normalizeStyle(n.style)},[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(n.prepped_rows,(l,p)=>(r.openBlock(),r.createElementBlock("div",{key:p,class:"grid-tracker__row"},[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(l,u=>(r.openBlock(),r.createElementBlock("div",{key:u.slug,class:"grid-tracker__cell"},[u.slug==="cwisp"?(r.openBlock(),r.createBlock(i,{key:0,inventory:s.inventory,onToggleItem:b=>!s.controlled&&e.$emit("toggle-item",b)},null,8,["inventory","onToggleItem"])):(r.openBlock(),r.createElementBlock("div",r.mergeProps({key:1},u.attrs,{onClick:b=>n.click(b,u)}),null,16,Ke)),u.numbers?(r.openBlock(),r.createElementBlock("div",{key:2,class:r.normalizeClass(`grid-tracker__numbers -length-${u.numbers.length}`)},[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(u.numbers,(b,nt)=>(r.openBlock(),r.createElementBlock("div",{key:nt,class:r.normalizeClass(b)},null,2))),128))],2)):u.target?(r.openBlock(),r.createElementBlock("i",Je)):r.createCommentVNode("",!0)]))),128))]))),128))],6)}const G=g(We,[["render",Ye]]),o={item:e=>({class:e}),group:(e,t)=>[`pause-inventory__group -group-${e}`,t],number:e=>o.item(`smi-number -number-${e}`),numbers:(e,t)=>e.toString().padStart(t,0).split("").map(o.number)};o.separator=o.item("flex-grow");const V=e=>Array(e||0).fill().map((t,s)=>s),D=(e,t)=>({name:"energy-tanks",children:V(e).map(()=>o.item("smi -ietank")),class:o.group("energy-tanks",t)}),W=e=>({name:e,class:o.group(e),children:[o.item("smi -"+e)]}),He={beams:["charge","ice","wave","spazer","plasma"].map(e=>e+"-beam"),suits:["varia-suit","gravity-suit"],misc:["morph-ball","bomb","spring-ball","screw-attack"],boots:["hi-jump-boots","space-jump","speed-booster"]},qe=["missile","super-missile","power-bomb","grappling-beam","x-ray"],Qe={props:{inventory:Object,controlled:Boolean,world:String,width:Number},emits:["add-item","toggle-item"],computed:{wrapper_class(){return["pause-inventory smi-pause-screen",this.controlled&&"-controlled",this.inventory["super-missile"]>99&&"-high-super-missile",this.inventory["power-bomb"]>99&&"-high-power-bomb"]},groups(){const e=[...this.energy_tanks,this.hud_items,this.reserve_tanks,this.energy_text,...this.pack_numbers,...this.item_groups,...this.pack_controls];return this.inventory["reserve-tank"]&&(e.push(W("auto")),e.push(W("reserve_text"))),e},hud_items(){return{name:"hud-items",class:o.group("hud-items"),children:qe.map(e=>({class:["smi -i"+e,this.inventory[e]||"-inactive"],onclick:()=>this.$emit("toggle-item",e)}))}},pack_numbers(){const e=f[this.world]||f.default;return["missile","super-missile","power-bomb"].map(t=>{var a;const s=this.inventory[t]*(((a=e._packs)==null?void 0:a[t])||1);return{name:t,class:o.group(t),children:o.numbers(s||0,t==="missile"?3:2)}})},pack_controls(){return["missile","super-missile","power-bomb","energy-tank","reserve-tank"].map(t=>({name:`${t} controls`,class:o.group(t+"-controls"),children:[{class:"_plus",onclick:()=>this.$emit("add-item",t,1)},{class:"_minus",onclick:()=>this.$emit("add-item",t,-1)}]}))},energy_tanks(){const e=this.inventory["energy-tank"];return[D(Math.min(e,7)),D(Math.max(e-7,0),"-top")]},reserve_tanks(){const e=this.inventory["reserve-tank"],s=[...V(Math.floor(e)).map(()=>o.item("smi -ireserve")),o.separator];return e>0&&(100*e).toString().split("").forEach(c=>s.push(o.item(`smi-reserve-number -number-${c}`))),{name:"reserve-tanks",class:o.group("reserve-tanks"),children:s}},energy_text(){return{name:"energy-text",class:o.group("energy-text"),children:[o.item("smi -energy"),o.separator,o.number(9),o.number(9)]}},item_groups(){return Object.entries(He).map(([e,t])=>({name:e,class:o.group(e),children:t.map(s=>({class:[`smi-pause-item -${s}`,this.inventory[s]||"-inactive"],onclick:()=>this.$emit("toggle-item",s)}))}))},style(){return this.width&&{"--inventory-px":`${this.width/256}px`}}}};function Xe(e,t,s,a,c,n){return r.openBlock(),r.createElementBlock("div",{class:r.normalizeClass(n.wrapper_class),style:r.normalizeStyle(n.style)},[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(n.groups,i=>(r.openBlock(),r.createElementBlock("div",{key:i.name,class:r.normalizeClass(i.class)},[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(i.children,(l,p)=>(r.openBlock(),r.createElementBlock("div",r.mergeProps({key:p},l),null,16))),128))],2))),128))],6)}const K=g(Qe,[["render",Xe]]),et=["charge-beam","wave-beam","ice-beam","spazer-beam","plasma-beam"],tt={props:{inventory:Object},emits:["toggle-item"],computed:{beams(){return et.map(e=>({id:e,class:[`sm-cwisp__cell -${e}`,this.inventory[e]?"-active":"-inactive"]}))}}},rt={class:"sm-cwisp"},st=["onClick"];function ot(e,t,s,a,c,n){return r.openBlock(),r.createElementBlock("div",rt,[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(n.beams,i=>(r.openBlock(),r.createElementBlock("div",{class:r.normalizeClass(i.class),onClick:l=>e.$emit("toggle-item",i.id),key:i.id},null,10,st))),128))])}const J=g(tt,[["render",ot]]);return{GridTracker:G,PauseTracker:K,CwispTracker:J,install(e){e.component("SmGridTracker",G),e.component("SmPauseTracker",K),e.component("SmCwispTracker",J)}}});
