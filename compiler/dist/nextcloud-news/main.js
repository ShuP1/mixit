!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=71)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(7),o=n(32),i=n(15),u=Object.defineProperty;e.f=n(1)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(17)("wks"),o=n(12),i=n(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(2),o=n(16);t.exports=n(1)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(0),o=n(6),i=n(4),u=n(12)("src"),s=n(44),a=(""+s).split("toString");n(11).inspectSource=function(t){return s.call(t)},(t.exports=function(t,e,n,s){var c="function"==typeof n;c&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(c&&(i(n,u)||o(n,u,t[e]?""+t[e]:a.join(String(e)))),t===r?t[e]=n:s?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||s.call(this)})},function(t,e,n){var r=n(49),o=n(21);t.exports=function(t){return r(o(t))}},function(t,e){var n=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=n)},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(36),o=n(23);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(0),o=n(11),i=n(6),u=n(9),s=n(34),a=function(t,e,n){var c,f,l,p,v=t&a.F,d=t&a.G,h=t&a.S,y=t&a.P,m=t&a.B,g=d?r:h?r[e]||(r[e]={}):(r[e]||{}).prototype,b=d?o:o[e]||(o[e]={}),_=b.prototype||(b.prototype={});for(c in d&&(n=e),n)l=((f=!v&&g&&void 0!==g[c])?g:n)[c],p=m&&f?s(l,r):y&&"function"==typeof l?s(Function.call,l):l,g&&u(g,c,l,t&a.U),b[c]!=l&&i(b,c,p),y&&_[c]!=l&&(_[c]=l)};r.core=o,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(8);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(11),o=n(0),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(18)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!1},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(2).f,o=n(4),i=n(3)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(17)("keys"),o=n(12);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(7),o=n(54),i=n(23),u=n(22)("IE_PROTO"),s=function(){},a=function(){var t,e=n(33)("iframe"),r=i.length;for(e.style.display="none",n(55).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(36),o=n(23).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(24),o=n(16),i=n(10),u=n(15),s=n(4),a=n(32),c=Object.getOwnPropertyDescriptor;e.f=n(1)?c:function(t,e){if(t=i(t),e=u(e,!0),a)try{return c(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){"use strict";var r=n(57),o=n(58),i=n(29),u=n(10);t.exports=n(59)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(0),o=n(4),i=n(19),u=n(64),s=n(15),a=n(5),c=n(26).f,f=n(27).f,l=n(2).f,p=n(66).trim,v=r.Number,d=v,h=v.prototype,y="Number"==i(n(25)(h)),m="trim"in String.prototype,g=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){var n,r,o,i=(e=m?e.trim():p(e,3)).charCodeAt(0);if(43===i||45===i){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+e}for(var u,a=e.slice(2),c=0,f=a.length;c<f;c++)if((u=a.charCodeAt(c))<48||u>o)return NaN;return parseInt(a,r)}}return+e};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof v&&(y?a(function(){h.valueOf.call(n)}):"Number"!=i(n))?u(new d(g(e)),n,v):g(e)};for(var b,_=n(1)?c(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;_.length>S;S++)o(d,b=_[S])&&!o(v,b)&&l(v,b,f(d,b));v.prototype=h,h.constructor=v,n(9)(r,"Number",v)}},function(t,e,n){"use strict";var r=n(0),o=n(4),i=n(1),u=n(14),s=n(9),a=n(46).KEY,c=n(5),f=n(17),l=n(20),p=n(12),v=n(3),d=n(35),h=n(47),y=n(48),m=n(53),g=n(7),b=n(8),_=n(10),S=n(15),w=n(16),x=n(25),O=n(56),k=n(27),E=n(2),j=n(13),P=k.f,N=E.f,C=O.f,T=r.Symbol,I=r.JSON,M=I&&I.stringify,L=v("_hidden"),A=v("toPrimitive"),F={}.propertyIsEnumerable,R=f("symbol-registry"),D=f("symbols"),$=f("op-symbols"),U=Object.prototype,V="function"==typeof T,G=r.QObject,z=!G||!G.prototype||!G.prototype.findChild,B=i&&c(function(){return 7!=x(N({},"a",{get:function(){return N(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=P(U,e);r&&delete U[e],N(t,e,n),r&&t!==U&&N(U,e,r)}:N,H=function(t){var e=D[t]=x(T.prototype);return e._k=t,e},W=V&&"symbol"==typeof T.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof T},q=function(t,e,n){return t===U&&q($,e,n),g(t),e=S(e,!0),g(n),o(D,e)?(n.enumerable?(o(t,L)&&t[L][e]&&(t[L][e]=!1),n=x(n,{enumerable:w(0,!1)})):(o(t,L)||N(t,L,w(1,{})),t[L][e]=!0),B(t,e,n)):N(t,e,n)},J=function(t,e){g(t);for(var n,r=y(e=_(e)),o=0,i=r.length;i>o;)q(t,n=r[o++],e[n]);return t},X=function(t){var e=F.call(this,t=S(t,!0));return!(this===U&&o(D,t)&&!o($,t))&&(!(e||!o(this,t)||!o(D,t)||o(this,L)&&this[L][t])||e)},Y=function(t,e){if(t=_(t),e=S(e,!0),t!==U||!o(D,e)||o($,e)){var n=P(t,e);return!n||!o(D,e)||o(t,L)&&t[L][e]||(n.enumerable=!0),n}},K=function(t){for(var e,n=C(_(t)),r=[],i=0;n.length>i;)o(D,e=n[i++])||e==L||e==a||r.push(e);return r},Q=function(t){for(var e,n=t===U,r=C(n?$:_(t)),i=[],u=0;r.length>u;)!o(D,e=r[u++])||n&&!o(U,e)||i.push(D[e]);return i};V||(s((T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===U&&e.call($,n),o(this,L)&&o(this[L],t)&&(this[L][t]=!1),B(this,t,w(1,n))};return i&&z&&B(U,t,{configurable:!0,set:e}),H(t)}).prototype,"toString",function(){return this._k}),k.f=Y,E.f=q,n(26).f=O.f=K,n(24).f=X,n(38).f=Q,i&&!n(18)&&s(U,"propertyIsEnumerable",X,!0),d.f=function(t){return H(v(t))}),u(u.G+u.W+u.F*!V,{Symbol:T});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)v(Z[tt++]);for(var et=j(v.store),nt=0;et.length>nt;)h(et[nt++]);u(u.S+u.F*!V,"Symbol",{for:function(t){return o(R,t+="")?R[t]:R[t]=T(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in R)if(R[e]===t)return e},useSetter:function(){z=!0},useSimple:function(){z=!1}}),u(u.S+u.F*!V,"Object",{create:function(t,e){return void 0===e?x(t):J(x(t),e)},defineProperty:q,defineProperties:J,getOwnPropertyDescriptor:Y,getOwnPropertyNames:K,getOwnPropertySymbols:Q}),I&&u(u.S+u.F*(!V||c(function(){var t=T();return"[null]"!=M([t])||"{}"!=M({a:t})||"{}"!=M(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(b(e)||void 0!==t)&&!W(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!W(e))return e}),r[1]=e,M.apply(I,r)}}),T.prototype[A]||n(6)(T.prototype,A,T.prototype.valueOf),l(T,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){t.exports=!n(1)&&!n(5)(function(){return 7!=Object.defineProperty(n(33)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(8),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(45);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){e.f=n(3)},function(t,e,n){var r=n(4),o=n(10),i=n(50)(!1),u=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),a=0,c=[];for(n in s)n!=u&&r(s,n)&&c.push(n);for(;e.length>a;)r(s,n=e[a++])&&(~i(c,n)||c.push(n));return c}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){for(var r=n(28),o=n(13),i=n(9),u=n(0),s=n(6),a=n(29),c=n(3),f=c("iterator"),l=c("toStringTag"),p=a.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=o(v),h=0;h<d.length;h++){var y,m=d[h],g=v[m],b=u[m],_=b&&b.prototype;if(_&&(_[f]||s(_,f,p),_[l]||s(_,l,m),a[m]=p,g))for(y in r)_[y]||i(_,y,r[y],!0)}},function(t,e,n){var r=n(21);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(62),o={};o[n(3)("toStringTag")]="z",o+""!="[object z]"&&n(9)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){var r=n(40),o=n(13);n(63)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){"use strict";var r=n(7);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){t.exports=n(17)("native-function-to-string",Function.toString)},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(12)("meta"),o=n(8),i=n(4),u=n(2).f,s=0,a=Object.isExtensible||function(){return!0},c=!n(5)(function(){return a(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++s,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!a(t))return"F";if(!e)return"E";f(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!a(t))return!0;if(!e)return!1;f(t)}return t[r].w},onFreeze:function(t){return c&&l.NEED&&a(t)&&!i(t,r)&&f(t),t}}},function(t,e,n){var r=n(0),o=n(11),i=n(18),u=n(35),s=n(2).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:u.f(t)})}},function(t,e,n){var r=n(13),o=n(38),i=n(24);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,s=n(t),a=i.f,c=0;s.length>c;)a.call(t,u=s[c++])&&e.push(u);return e}},function(t,e,n){var r=n(19);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(10),o=n(51),i=n(52);t.exports=function(t){return function(e,n,u){var s,a=r(e),c=o(a.length),f=i(u,c);if(t&&n!=n){for(;c>f;)if((s=a[f++])!=s)return!0}else for(;c>f;f++)if((t||f in a)&&a[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(37),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(37),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(19);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(2),o=n(7),i=n(13);t.exports=n(1)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),s=u.length,a=0;s>a;)r.f(t,n=u[a++],e[n]);return t}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(10),o=n(26).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(3)("unscopables"),o=Array.prototype;null==o[r]&&n(6)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r=n(18),o=n(14),i=n(9),u=n(6),s=n(29),a=n(60),c=n(20),f=n(61),l=n(3)("iterator"),p=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,n,d,h,y,m){a(n,e,d);var g,b,_,S=function(t){if(!p&&t in k)return k[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",x="values"==h,O=!1,k=t.prototype,E=k[l]||k["@@iterator"]||h&&k[h],j=E||S(h),P=h?x?S("entries"):j:void 0,N="Array"==e&&k.entries||E;if(N&&(_=f(N.call(new t)))!==Object.prototype&&_.next&&(c(_,w,!0),r||"function"==typeof _[l]||u(_,l,v)),x&&E&&"values"!==E.name&&(O=!0,j=function(){return E.call(this)}),r&&!m||!p&&!O&&k[l]||u(k,l,j),s[e]=j,s[w]=v,h)if(g={values:x?j:S("values"),keys:y?j:S("keys"),entries:P},m)for(b in g)b in k||i(k,b,g[b]);else o(o.P+o.F*(p||O),e,g);return g}},function(t,e,n){"use strict";var r=n(25),o=n(16),i=n(20),u={};n(6)(u,n(3)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(4),o=n(40),i=n(22)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(19),o=n(3)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:i?r(e):"Object"==(u=r(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){var r=n(14),o=n(11),i=n(5);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){var r=n(8),o=n(65).set;t.exports=function(t,e,n){var i,u=e.constructor;return u!==n&&"function"==typeof u&&(i=u.prototype)!==n.prototype&&r(i)&&o&&o(t,i),t}},function(t,e,n){var r=n(8),o=n(7),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n(34)(Function.call,n(27).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},function(t,e,n){var r=n(14),o=n(21),i=n(5),u=n(67),s="["+u+"]",a=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),f=function(t,e,n){var o={},s=i(function(){return!!u[t]()||"​"!="​"[t]()}),a=o[t]=s?e(l):u[t];n&&(o[n]=a),r(r.P+r.F*s,"String",o)},l=f.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(a,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var r=n(2).f,o=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in o||n(1)&&r(o,"name",{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},function(t,e,n){"use strict";n(70);var r=n(7),o=n(43),i=n(1),u=/./.toString,s=function(t){n(9)(RegExp.prototype,"toString",t,!0)};n(5)(function(){return"/a/b"!=u.call({source:"a",flags:"b"})})?s(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?o.call(t):void 0)}):"toString"!=u.name&&s(function(){return u.call(this)})},function(t,e,n){n(1)&&"g"!=/./g.flags&&n(2).f(RegExp.prototype,"flags",{configurable:!0,get:n(43)})},function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.unreaded.length>0||!t.server||!t.token||!t.username,expression:"unreaded.length > 0 || !server || !token || !username"}],staticClass:"nextcloud-news"},[n("service-header",{scopedSlots:t._u([{key:"title",fn:function(){return[t._v("Nextcloud News")]},proxy:!0},{key:"settings",fn:function(){return[n("setting-int",{attrs:{id:"update",title:"Update interval",value:t.update},on:{change:t.setOptionCouple}}),n("setting-int",{attrs:{id:"buffer",title:"Buffer size",value:t.buffer},on:{change:t.setOptionCouple}})]},proxy:!0}])}),n("div",{staticClass:"unreaded"},t._l(t.unreaded,function(e){return n("div",{staticClass:"news"},[n("a",{attrs:{href:e.url,target:"_blank"}},[n("from-now",{staticClass:"date",attrs:{date:1e3*e.pubDate,now:t.now}})],1),n("span",{staticClass:"read",on:{click:function(n){return n.stopPropagation(),t.makeRead(e.id)}}},[t._v("👁")]),n("span",{staticClass:"title",on:{click:function(t){t.stopPropagation(),e.open=!e.open}}},[t._v(t._s(e.author)+" ─ "+t._s(e.title))]),e.open&&e.body?n("div",{staticClass:"content"},[t._v(t._s(e.body))]):t._e()])}),0),t.server?t._e():n("div",{staticClass:"auth"},[n("form",{on:{submit:function(e){return e.preventDefault(),t.setServer(e)}}},[n("p",[n("label",{attrs:{for:"server"}},[t._v("Server:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newServer,expression:"newServer"}],attrs:{id:"server",required:""},domProps:{value:t.newServer},on:{input:function(e){e.target.composing||(t.newServer=e.target.value)}}})]),n("p",[n("label",{attrs:{for:"username"}},[t._v("Username:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newUsername,expression:"newUsername"}],attrs:{id:"username",required:""},domProps:{value:t.newUsername},on:{input:function(e){e.target.composing||(t.newUsername=e.target.value)}}})]),n("p",[n("label",{attrs:{for:"token"}},[t._v("Token:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newToken,expression:"newToken"}],attrs:{id:"token",required:""},domProps:{value:t.newToken},on:{input:function(e){e.target.composing||(t.newToken=e.target.value)}}})]),t._m(0)])])],1)};r._withStripped=!0;n(31),n(39),n(28),n(41),n(42),n(30),n(68),n(69);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i={methods:{saveOptions:function(t){this.$emit("save",t)},setOption:function(t,e){var n=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){o(t,e,n[e])})}return t}({},this.$props);n[t]=e,this.saveOptions(n)},setOptionCouple:function(t){this.setOption(t.name,t.value)}}},u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"service-header"},[n("div",{staticClass:"title",on:{click:function(e){t.showSettings=!t.showSettings}}},[t._t("title")],2),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showSettings,expression:"showSettings"}],staticClass:"settings"},[t._t("settings")],2)])};u._withStripped=!0;function s(t,e,n,r,o,i,u,s){var a,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),u?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},c._ssrRegister=a):o&&(a=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var f=c.render;c.render=function(t,e){return a.call(e),f(t,e)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,a):[a]}return{exports:t,options:c}}var a=s({data:function(){return{showSettings:!1}}},u,[],!1,null,null,null);a.options.__file="src/core/serviceHeader.vue";var c=a.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"setting"},[n("label",{attrs:{for:t.id}},[t._v(t._s(t.title)+":")]),n("input",{attrs:{id:t.id,type:"checkbox"},domProps:{checked:t.value},on:{change:function(e){return e.stopPropagation(),t.sendChange(e.target.checked)}}})])};f._withStripped=!0;var l=s({props:{id:String,title:String},methods:{sendChange:function(t){this.$emit("change",{name:this.id,value:t})}}},void 0,void 0,!1,null,null,null);l.options.__file="src/core/input/baseSetting.vue";var p=l.exports,v=s({extends:p,props:{value:Boolean}},f,[],!1,null,null,null);v.options.__file="src/core/input/settingBoolean.vue";var d=v.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"setting"},[n("label",{attrs:{for:t.id}},[t._v(t._s(t.title)+":")]),n("input",{attrs:{id:t.id,type:"number",step:"1"},domProps:{value:t.value},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.sendChange(parseInt(e.target.value))}}})])};h._withStripped=!0;var y=s({extends:p,props:{value:Number}},h,[],!1,null,null,null);y.options.__file="src/core/input/settingInt.vue";var m=y.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"setting"},[n("label",{attrs:{for:t.id}},[t._v(t._s(t.title)+":")]),n("input",{attrs:{id:t.id,type:"text"},domProps:{value:t.value},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendChange(e.target.value)}}})])};g._withStripped=!0;var b=s({extends:p,props:{value:String}},g,[],!1,null,null,null);b.options.__file="src/core/input/settingString.vue";var _=s({mixins:[{methods:{emitError:function(t){this.$emit("error",t.toString())}}},i],components:{serviceHeader:c,settingBoolean:d,settingInt:m,settingString:b.exports}},void 0,void 0,!1,null,null,null);_.options.__file="src/core/baseService.vue";var S=_.exports,w=function(){var t=this.$createElement;return(this._self._c||t)("span",[this._v(this._s(this.timeSince))])};w._withStripped=!0;var x={created:function(){var t=this;setInterval(function(){t.now=Date.now()},3e4)},data:function(){return{now:Date.now()}}},O=s({mixins:[{props:{now:{type:Number|Date,default:Date.now}}}],props:["date"],computed:{timeSince:function(){var t=Math.floor((this.now-new Date(this.date))/1e3),e=Math.floor(t/31536e3);return e>1?e+" years":(e=Math.floor(t/2592e3))>1?e+" months":(e=Math.floor(t/86400))>1?e+" days":(e=Math.floor(t/3600))>1?e+" hours":(e=Math.floor(t/60))>1?e+" minutes":Math.floor(t)+" seconds"}}},w,[],!1,null,null,null);function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}O.options.__file="src/core/fromNow.vue";var E=s({name:"nextcloud-news",extends:S,mixins:[x],components:{fromNow:O.exports},props:{server:String,username:String,token:String,timeout:{default:5e3,type:Number},buffer:{default:-1,type:Number},update:{default:300,type:Number}},data:function(){return{rest:axios.create({baseURL:"https://".concat(this.server,"/index.php/apps/news/api/v1-2/"),timeout:this.timeout,headers:{Authorization:"Basic "+btoa(this.username+":"+this.token)}}),unreaded:[],now:Date.now(),newServer:this.server,newUsername:this.username,newToken:this.token}},methods:{loadData:function(){var t=this;this.rest.get("/items",{params:{batchSize:this.buffer,type:3,getRead:!1}}).then(function(e){return t.unreaded=e.data.items.map(function(t){return t.open=!1,t})}).catch(this.emitError)},removeNews:function(t){for(var e=this.unreaded.length-1;e>=0;e--)if(this.unreaded[e].id===t){this.unreaded.splice(e,1);break}},makeRead:function(t){var e=this;this.rest.put("/items/".concat(t,"/read")).then(function(){return e.removeNews(t)}).catch(this.emitError)},setServer:function(){var t=this;axios.get("https://".concat(this.newServer,"/index.php/apps/news/api/v1-2/folders"),{headers:{Authorization:"Basic "+btoa(this.newUsername+":"+this.newToken)},timeout:this.timeout}).then(function(){return t.saveOptions(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){k(t,e,n[e])})}return t}({},t.$props,{server:t.newServer,token:t.newToken,username:t.newUsername}))}).catch(this.emitError)}},created:function(){this.server&&(this.loadData(),this.update>0&&setInterval(this.loadData,1e3*this.update))}},r,[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("input",{attrs:{type:"submit",value:"Connect"}})])}],!1,null,null,null);E.options.__file="src/nextcloud-news/main.vue";var j=E.exports;Vue.component(j.name,j)}]);