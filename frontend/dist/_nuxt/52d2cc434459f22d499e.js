(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{733:function(t,e,n){var content=n(734);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(15).default)("97d4060c",content,!0,{sourceMap:!1})},734:function(t,e,n){(t.exports=n(14)(!1)).push([t.i,".theme--light.v-radio--is-disabled label{color:rgba(0,0,0,.38)}.theme--light.v-radio--is-disabled .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-radio--is-disabled label{color:hsla(0,0%,100%,.5)}.theme--dark.v-radio--is-disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.v-radio{align-items:center;display:flex;height:auto;margin-right:16px;outline:none}.v-radio--is-disabled{pointer-events:none}",""])},764:function(t,e,n){"use strict";n.r(e);n(112),n(113),n(22),n(91);var r=n(28),o=n(150),l=n.n(o),c=n(714),d=new l.a(l.a.givenProvider),v=c.abi,h=c.networks[5777].address,f=d.eth.Contract(v,h),m=window.web3.eth.accounts[0],_={components:{},data:function(){return{price:0,totalEntryNumber:0,depositedAmount:0,judgeMessage:"You can win",introducer:"",numbers1_500:[{num:1,soldout:!1},{num:2,soldout:!0},{num:3,soldout:!1},{num:4,soldout:!1}]}},created:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var i,e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.refresh();case 2:return t.next=4,this.getContractBalance();case 4:this.depositedAmount=t.sent,i=0;case 6:if(!(i<50)){t.next=15;break}return t.next=9,this.getNumber(i);case 9:e=t.sent,console.log(e),this.numbers1_500.push(e);case 12:i++,t.next=6;break;case 15:console.log(this.numbers1_500);case 16:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:{getPrice:function(){return this.price},buy:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n,r,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(window.web3.eth.accounts),console.log(this.introducer),""===this.introducer?(console.log("--"),e=f.methods.buy().encodeABI()):(console.log("++"),e=f.methods.buyWithIntroducer(this.introducer).encodeABI()),t.next=5,this.getTxCount(m);case 5:return n=t.sent,r=this.makeRowTx(e,n),window.web3.eth.sendTransaction(r,function(t,e){t&&(console.error(t),console.log(e))}),t.next=10,f.events.Buy();case 10:o=t.sent,console.log(o),f.events.Buy().on("data",function(t){var data=t.returnValues;console.log(t),console.log(data[0]),console.log(data[1]),console.log(data[2]),console.log(data[3])}).on("error",console.error);case 13:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getTxCount:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(address){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.eth.getTransactionCount(address);case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),makeRowTx:function(t,e){return{from:m,to:h,gasPrice:d.utils.toHex(3e10),gasLimit:d.utils.toHex(5e6),nonce:"0x"+e.toString(16),value:1e15,data:t,chainId:42}},refresh:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getTicketPrice();case 2:return t.next=4,this.getTotalEntries();case 4:return t.next=6,this.getDepositedAmount();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getTicketPrice:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.methods.getPrice().call();case 2:e=t.sent,this.price=void 0===e||""===e?0:e.toNumber()/1e18;case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),totalQuantity:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.methods.getTotalQuantity().call();case 2:return e=t.sent,console.log(e.toNumber()/1e18),this.judgeMessage="You can get 3ST PRIZE(0.001ETH)",t.abrupt("return",e);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getTotalEntries:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.methods.getEntries().call();case 2:return e=t.sent,this.totalEntryNumber=e.length,t.abrupt("return",e);case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getDepositedAmount:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),getContractBalance:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.methods.getBalance().call();case 2:return e=t.sent,console.log(e.toNumber()/1e18),t.abrupt("return",e.toNumber()/1e18);case 5:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),getNumber:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.methods.getNunber(e).call();case 2:return n=t.sent,t.abrupt("return",{num:e,soldout:n});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()}},y=n(77),x=n(215),k=n.n(x),w=n(207),C=n(713),A=n(761),R=n(712),V=n(767),S=n(723),T=n(205),E=n(206),O=(n(37),n(92),n(151),n(733),n(114)),j=n(729),B=n(20),I=n(143),D=n(0).a.extend({name:"rippleable",directives:{Ripple:I.a},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(data.staticClass="v-input--selection-controls__ripple",data.directives=data.directives||[],data.directives.push({name:"ripple",value:{center:!0}}),data.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",data)):null},onChange:function(){}}}),$=n(16),N=n(727),F=n(730),P=N.a.extend({name:"selectable",mixins:[D,F.a],model:{prop:"inputValue",event:"change"},props:{color:{type:String,default:"accent"},id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(t){return{lazyValue:t.inputValue}},computed:{computedColor:function(){return this.isActive?this.color:this.validationState},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,input=this.internalValue;return this.isMultiple?!!Array.isArray(input)&&input.some(function(n){return t.valueComparator(n,e)}):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,input):Boolean(input):this.valueComparator(input,this.trueValue)},isDirty:function(){return this.isActive}},watch:{inputValue:function(t){this.lazyValue=t}},methods:{genLabel:function(){if(!this.hasLabel)return null;var label=N.a.options.methods.genLabel.call(this);return label.data.on={click:this.onChange},label},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-label":this.label,"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.id,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(!this.isDisabled){var e=this.value,input=this.internalValue;if(this.isMultiple){Array.isArray(input)||(input=[]);var n=input.length;(input=input.filter(function(n){return!t.valueComparator(n,e)})).length===n&&input.push(e)}else input=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(input,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(input,e)?null:e:!input;this.validate(!0,input),this.internalValue=input}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),L=n(86),K=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var e in source)Object.prototype.hasOwnProperty.call(source,e)&&(t[e]=source[e])}return t};var M={name:"v-radio",mixins:[B.a,D,Object(L.a)("radio","v-radio","v-radio-group"),$.a],inheritAttrs:!1,props:{color:{type:String,default:"accent"},disabled:Boolean,label:String,onIcon:{type:String,default:"$vuetify.icons.radioOn"},offIcon:{type:String,default:"$vuetify.icons.radioOff"},readonly:Boolean,value:null},data:function(){return{isActive:!1,isFocused:!1,parentError:!1}},computed:{computedData:function(){return this.setTextColor(!this.parentError&&this.isActive&&this.color,{staticClass:"v-radio",class:K({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses)})},computedColor:function(){return this.isActive?this.color:this.radio.validationState||!1},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},hasState:function(){return this.isActive||!!this.radio.validationState},isDisabled:function(){return this.disabled||!!this.radio.disabled},isReadonly:function(){return this.readonly||!!this.radio.readonly}},mounted:function(){this.radio.register(this)},beforeDestroy:function(){this.radio.unregister(this)},methods:{genInput:function(){for(var t,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return(t=P.options.methods.genInput).call.apply(t,[this].concat(function(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)}(n)))},genLabel:function(){return this.$createElement(j.a,{on:{click:this.onChange},attrs:{for:this.id},props:{color:this.radio.validationState||"",dark:this.dark,focused:this.hasState,light:this.light}},this.$slots.label||this.label)},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("radio",K({name:this.radio.name||!!this.radio._uid&&"v-radio-"+this.radio._uid,value:this.value},this.$attrs)),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(O.a,this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isDisabled||this.isActive&&this.radio.mandatory||this.$emit("change",this.value)},onKeydown:function(){}},render:function(t){return t("div",this.computedData,[this.genRadio(),this.genLabel()])}},Y=n(762),H=n(763),component=Object(y.a)(_,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-flex",{attrs:{md12:""}},[n("div",{staticClass:"text-xs-center"},[n("p",{staticClass:"display-2"},[t._v("DREAM TICKETS")]),t._v(" "),n("p",[t._v("You can buy a ticket per "),n("span",{staticClass:"title font-weight-bold font-italic"},[t._v(t._s(t.price))]),t._v(" Ether")]),t._v(" "),n("v-text-field",{attrs:{label:"Please input your introducer (Not Required)"},model:{value:t.introducer,callback:function(e){t.introducer=e},expression:"introducer"}}),t._v(" "),n("p",[t._v("You can choose your favorite number below boxies.")]),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("0001 - 0500")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),n("v-card",[n("v-card-title",[t._v("Select Ticket Number")]),t._v(" "),n("v-divider"),t._v(" "),n("v-card-text",{staticStyle:{height:"300px"}},[n("v-radio-group",{attrs:{column:""},model:{value:t.dialogm1,callback:function(e){t.dialogm1=e},expression:"dialogm1"}},t._l(t.numbers1_500,function(t,e){return n("div",{key:e},[n("v-radio",{attrs:{label:t.num,value:t.num,disabled:t.soldout}})],1)}),0)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(e){t.dialog=!1}}},[t._v("CANCEL")]),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(e){t.dialog=!1}}},[t._v("OK")])],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("0501 - 1000")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("1001 - 1500")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("1501 - 2000")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("2001 - 2500")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-divider"),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("2501 - 3000")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("3001 - 3500")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("3501 - 4000")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("4001 - 4500")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:"primary",dark:""}},r),[t._v("4501 - 5000")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}}),t._v(" "),n("v-divider"),t._v(" "),n("p",[t._v("Your select number is  "),n("span",{staticClass:"headline font-weight-bold font-italic"},[t._v("  "+t._s(t.totalEntryNumber)+"  ")]),t._v(" Are you sure?")]),t._v(" "),n("v-btn",{on:{click:function(e){return t.buy()}}},[t._v("BUY TICKET")]),t._v(" "),n("v-divider"),t._v(" "),n("v-divider"),t._v(" "),n("p",[t._v("We have been accepted "),n("span",{staticClass:"headline font-weight-bold font-italic"},[t._v(t._s(t.totalEntryNumber))]),t._v(" entries until now!!")]),t._v(" "),n("p",[t._v("And now, we have collected "),n("span",{staticClass:"headline font-weight-bold font-italic"},[t._v(t._s(t.depositedAmount))]),t._v(" Ether!!")]),t._v(" "),n("p",[t._v("Let's try your destiny!")]),t._v(" "),n("v-btn",{on:{click:function(e){return t.$router.push("/")}}},[t._v("BACK TO TOP")])],1)])],1)},[],!1,null,null,null);e.default=component.exports;k()(component,{VBtn:w.a,VCard:C.a,VCardActions:A.a,VCardText:A.b,VCardTitle:R.a,VDialog:V.a,VDivider:S.a,VFlex:T.a,VLayout:E.a,VRadio:M,VRadioGroup:Y.a,VTextField:H.a})}}]);