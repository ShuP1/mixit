!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=67)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(17)("wks"),o=n(12),i=n(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=!n(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(6),o=n(16);t.exports=n(3)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(11),o=n(30),i=n(15),u=Object.defineProperty;e.f=n(3)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(0),o=n(5),i=n(2),u=n(12)("src"),s=n(40),a=(""+s).split("toString");n(10).inspectSource=function(t){return s.call(t)},(t.exports=function(t,e,n,s){var c="function"==typeof n;c&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(c&&(i(n,u)||o(n,u,t[e]?""+t[e]:a.join(String(e)))),t===r?t[e]=n:s?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||s.call(this)})},function(t,e,n){var r=n(45),o=n(21);t.exports=function(t){return r(o(t))}},function(t,e){var n=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(34),o=n(23);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(0),o=n(10),i=n(5),u=n(8),s=n(32),a=function(t,e,n){var c,l,f,p,v=t&a.F,d=t&a.G,h=t&a.S,y=t&a.P,m=t&a.B,g=d?r:h?r[e]||(r[e]={}):(r[e]||{}).prototype,b=d?o:o[e]||(o[e]={}),_=b.prototype||(b.prototype={});for(c in d&&(n=e),n)f=((l=!v&&g&&void 0!==g[c])?g:n)[c],p=m&&l?s(f,r):y&&"function"==typeof f?s(Function.call,f):f,g&&u(g,c,f,t&a.U),b[c]!=f&&i(b,c,p),y&&_[c]!=f&&(_[c]=f)};r.core=o,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(10),o=n(0),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(18)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!1},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(6).f,o=n(2),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(17)("keys"),o=n(12);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(11),o=n(50),i=n(23),u=n(22)("IE_PROTO"),s=function(){},a=function(){var t,e=n(31)("iframe"),r=i.length;for(e.style.display="none",n(51).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(34),o=n(23).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(24),o=n(16),i=n(9),u=n(15),s=n(2),a=n(30),c=Object.getOwnPropertyDescriptor;e.f=n(3)?c:function(t,e){if(t=i(t),e=u(e,!0),a)try{return c(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(0),o=n(2),i=n(19),u=n(63),s=n(15),a=n(4),c=n(26).f,l=n(27).f,f=n(6).f,p=n(65).trim,v=r.Number,d=v,h=v.prototype,y="Number"==i(n(25)(h)),m="trim"in String.prototype,g=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){var n,r,o,i=(e=m?e.trim():p(e,3)).charCodeAt(0);if(43===i||45===i){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+e}for(var u,a=e.slice(2),c=0,l=a.length;c<l;c++)if((u=a.charCodeAt(c))<48||u>o)return NaN;return parseInt(a,r)}}return+e};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof v&&(y?a(function(){h.valueOf.call(n)}):"Number"!=i(n))?u(new d(g(e)),n,v):g(e)};for(var b,_=n(3)?c(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;_.length>w;w++)o(d,b=_[w])&&!o(v,b)&&f(v,b,l(d,b));v.prototype=h,h.constructor=v,n(8)(r,"Number",v)}},function(t,e,n){t.exports=!n(3)&&!n(4)(function(){return 7!=Object.defineProperty(n(31)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(7),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(41);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){e.f=n(1)},function(t,e,n){var r=n(2),o=n(9),i=n(46)(!1),u=n(22)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),a=0,c=[];for(n in s)n!=u&&r(s,n)&&c.push(n);for(;e.length>a;)r(s,n=e[a++])&&(~i(c,n)||c.push(n));return c}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){"use strict";var r=n(54),o=n(55),i=n(28),u=n(9);t.exports=n(56)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(21);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(0),o=n(2),i=n(3),u=n(14),s=n(8),a=n(42).KEY,c=n(4),l=n(17),f=n(20),p=n(12),v=n(1),d=n(33),h=n(43),y=n(44),m=n(49),g=n(11),b=n(7),_=n(9),w=n(15),S=n(16),x=n(25),k=n(52),O=n(27),E=n(6),C=n(13),N=O.f,j=E.f,P=k.f,T=r.Symbol,M=r.JSON,A=M&&M.stringify,I=v("_hidden"),L=v("toPrimitive"),K={}.propertyIsEnumerable,F=l("symbol-registry"),D=l("symbols"),R=l("op-symbols"),U=Object.prototype,$="function"==typeof T,V=r.QObject,B=!V||!V.prototype||!V.prototype.findChild,G=i&&c(function(){return 7!=x(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=N(U,e);r&&delete U[e],j(t,e,n),r&&t!==U&&j(U,e,r)}:j,z=function(t){var e=D[t]=x(T.prototype);return e._k=t,e},H=$&&"symbol"==typeof T.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof T},W=function(t,e,n){return t===U&&W(R,e,n),g(t),e=w(e,!0),g(n),o(D,e)?(n.enumerable?(o(t,I)&&t[I][e]&&(t[I][e]=!1),n=x(n,{enumerable:S(0,!1)})):(o(t,I)||j(t,I,S(1,{})),t[I][e]=!0),G(t,e,n)):j(t,e,n)},q=function(t,e){g(t);for(var n,r=y(e=_(e)),o=0,i=r.length;i>o;)W(t,n=r[o++],e[n]);return t},J=function(t){var e=K.call(this,t=w(t,!0));return!(this===U&&o(D,t)&&!o(R,t))&&(!(e||!o(this,t)||!o(D,t)||o(this,I)&&this[I][t])||e)},X=function(t,e){if(t=_(t),e=w(e,!0),t!==U||!o(D,e)||o(R,e)){var n=N(t,e);return!n||!o(D,e)||o(t,I)&&t[I][e]||(n.enumerable=!0),n}},Y=function(t){for(var e,n=P(_(t)),r=[],i=0;n.length>i;)o(D,e=n[i++])||e==I||e==a||r.push(e);return r},Q=function(t){for(var e,n=t===U,r=P(n?R:_(t)),i=[],u=0;r.length>u;)!o(D,e=r[u++])||n&&!o(U,e)||i.push(D[e]);return i};$||(s((T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===U&&e.call(R,n),o(this,I)&&o(this[I],t)&&(this[I][t]=!1),G(this,t,S(1,n))};return i&&B&&G(U,t,{configurable:!0,set:e}),z(t)}).prototype,"toString",function(){return this._k}),O.f=X,E.f=W,n(26).f=k.f=Y,n(24).f=J,n(36).f=Q,i&&!n(18)&&s(U,"propertyIsEnumerable",J,!0),d.f=function(t){return z(v(t))}),u(u.G+u.W+u.F*!$,{Symbol:T});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)v(Z[tt++]);for(var et=C(v.store),nt=0;et.length>nt;)h(et[nt++]);u(u.S+u.F*!$,"Symbol",{for:function(t){return o(F,t+="")?F[t]:F[t]=T(t)},keyFor:function(t){if(!H(t))throw TypeError(t+" is not a symbol!");for(var e in F)if(F[e]===t)return e},useSetter:function(){B=!0},useSimple:function(){B=!1}}),u(u.S+u.F*!$,"Object",{create:function(t,e){return void 0===e?x(t):q(x(t),e)},defineProperty:W,defineProperties:q,getOwnPropertyDescriptor:X,getOwnPropertyNames:Y,getOwnPropertySymbols:Q}),M&&u(u.S+u.F*(!$||c(function(){var t=T();return"[null]"!=A([t])||"{}"!=A({a:t})||"{}"!=A(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(b(e)||void 0!==t)&&!H(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!H(e))return e}),r[1]=e,A.apply(M,r)}}),T.prototype[L]||n(5)(T.prototype,L,T.prototype.valueOf),f(T,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){t.exports=n(17)("native-function-to-string",Function.toString)},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(12)("meta"),o=n(7),i=n(2),u=n(6).f,s=0,a=Object.isExtensible||function(){return!0},c=!n(4)(function(){return a(Object.preventExtensions({}))}),l=function(t){u(t,r,{value:{i:"O"+ ++s,w:{}}})},f=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!a(t))return"F";if(!e)return"E";l(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!a(t))return!0;if(!e)return!1;l(t)}return t[r].w},onFreeze:function(t){return c&&f.NEED&&a(t)&&!i(t,r)&&l(t),t}}},function(t,e,n){var r=n(0),o=n(10),i=n(18),u=n(33),s=n(6).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:u.f(t)})}},function(t,e,n){var r=n(13),o=n(36),i=n(24);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,s=n(t),a=i.f,c=0;s.length>c;)a.call(t,u=s[c++])&&e.push(u);return e}},function(t,e,n){var r=n(19);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(9),o=n(47),i=n(48);t.exports=function(t){return function(e,n,u){var s,a=r(e),c=o(a.length),l=i(u,c);if(t&&n!=n){for(;c>l;)if((s=a[l++])!=s)return!0}else for(;c>l;l++)if((t||l in a)&&a[l]===n)return t||l||0;return!t&&-1}}},function(t,e,n){var r=n(35),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(35),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(19);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(6),o=n(11),i=n(13);t.exports=n(3)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),s=u.length,a=0;s>a;)r.f(t,n=u[a++],e[n]);return t}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(9),o=n(26).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},function(t,e,n){for(var r=n(37),o=n(13),i=n(8),u=n(0),s=n(5),a=n(28),c=n(1),l=c("iterator"),f=c("toStringTag"),p=a.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=o(v),h=0;h<d.length;h++){var y,m=d[h],g=v[m],b=u[m],_=b&&b.prototype;if(_&&(_[l]||s(_,l,p),_[f]||s(_,f,m),a[m]=p,g))for(y in r)_[y]||i(_,y,r[y],!0)}},function(t,e,n){var r=n(1)("unscopables"),o=Array.prototype;null==o[r]&&n(5)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r=n(18),o=n(14),i=n(8),u=n(5),s=n(28),a=n(57),c=n(20),l=n(58),f=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,n,d,h,y,m){a(n,e,d);var g,b,_,w=function(t){if(!p&&t in O)return O[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",x="values"==h,k=!1,O=t.prototype,E=O[f]||O["@@iterator"]||h&&O[h],C=E||w(h),N=h?x?w("entries"):C:void 0,j="Array"==e&&O.entries||E;if(j&&(_=l(j.call(new t)))!==Object.prototype&&_.next&&(c(_,S,!0),r||"function"==typeof _[f]||u(_,f,v)),x&&E&&"values"!==E.name&&(k=!0,C=function(){return E.call(this)}),r&&!m||!p&&!k&&O[f]||u(O,f,C),s[e]=C,s[S]=v,h)if(g={values:x?C:w("values"),keys:y?C:w("keys"),entries:N},m)for(b in g)b in O||i(O,b,g[b]);else o(o.P+o.F*(p||k),e,g);return g}},function(t,e,n){"use strict";var r=n(25),o=n(16),i=n(20),u={};n(5)(u,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(2),o=n(38),i=n(22)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){"use strict";var r=n(60),o={};o[n(1)("toStringTag")]="z",o+""!="[object z]"&&n(8)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){var r=n(19),o=n(1)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:i?r(e):"Object"==(u=r(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){var r=n(38),o=n(13);n(62)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(14),o=n(10),i=n(4);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){var r=n(7),o=n(64).set;t.exports=function(t,e,n){var i,u=e.constructor;return u!==n&&"function"==typeof u&&(i=u.prototype)!==n.prototype&&r(i)&&o&&o(t,i),t}},function(t,e,n){var r=n(7),o=n(11),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n(32)(Function.call,n(27).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},function(t,e,n){var r=n(14),o=n(21),i=n(4),u=n(66),s="["+u+"]",a=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),l=function(t,e,n){var o={},s=i(function(){return!!u[t]()||"​"!="​"[t]()}),a=o[t]=s?e(f):u[t];n&&(o[n]=a),r(r.P+r.F*s,"String",o)},f=l.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(a,"")),2&e&&(t=t.replace(c,"")),t};t.exports=l},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.showEmpty||t.hasNews||!t.isSetup,expression:"showEmpty || hasNews || !isSetup"}],staticClass:"nextcloud-news"},[n("service-header",{attrs:{emit:t.emit},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("Nextcloud News"),t.hasNews?n("span",{staticClass:"note"},[t._v(" ("+t._s(t.news.get().length)+")")]):t._e()]},proxy:!0},{key:"settings",fn:function(){return[n("setting-int",{attrs:{id:"update",title:"Update interval",value:t.update},on:{change:t.saveOptionCouple}}),n("setting-int",{attrs:{id:"buffer",title:"Buffer size",value:t.buffer},on:{change:t.saveOptionCouple}}),n("setting-boolean",{attrs:{id:"showEmpty",title:"Show empty",value:t.showEmpty},on:{change:t.saveOptionCouple}})]},proxy:!0}])}),n("loadable-block",{staticClass:"unreaded",attrs:{loadable:t.news},scopedSlots:t._u([{key:"success",fn:function(){return t._l(t.news.get(),function(e){return n("div",{staticClass:"news"},[n("a",{attrs:{href:e.url,target:"_blank"}},[n("from-now",{staticClass:"date",attrs:{date:1e3*e.pubDate,now:t.now}})],1),n("span",{staticClass:"read",on:{click:function(n){return n.stopPropagation(),t.makeRead(e.id)}}},[t._v("👁")]),n("span",{staticClass:"title",on:{click:function(t){t.stopPropagation(),e.open=!e.open}}},[t._v(t._s(e.author)+" ─ "+t._s(e.title))]),e.open&&e.body?n("div",{staticClass:"content"},[t._v(t._s(e.body))]):t._e()])})},proxy:!0},{key:"error",fn:function(){return[n("form",{on:{submit:function(e){return e.preventDefault(),t.makeAuth(e)}}},[n("p",[n("label",{attrs:{for:"server"}},[t._v("Server:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newServer,expression:"newServer"}],attrs:{id:"server",required:""},domProps:{value:t.newServer},on:{input:function(e){e.target.composing||(t.newServer=e.target.value)}}})]),n("p",[n("label",{attrs:{for:"username"}},[t._v("Username:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newUsername,expression:"newUsername"}],attrs:{id:"username",required:""},domProps:{value:t.newUsername},on:{input:function(e){e.target.composing||(t.newUsername=e.target.value)}}})]),n("p",[n("label",{attrs:{for:"token"}},[t._v("Token:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newToken,expression:"newToken"}],attrs:{id:"token",required:""},domProps:{value:t.newToken},on:{input:function(e){e.target.composing||(t.newToken=e.target.value)}}})]),n("p",[n("input",{attrs:{type:"submit",value:"Connect"}})])])]},proxy:!0}])})],1)};r._withStripped=!0;n(39),n(53),n(37),n(59),n(61),n(29);function o(t,e,n,r,o,i,u,s){var a,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),u?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},c._ssrRegister=a):o&&(a=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var l=c.render;c.render=function(t,e){return a.call(e),l(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,a):[a]}return{exports:t,options:c}}var i=o({props:{emit:{type:Function,default:void 0}},methods:{emitError:function(t){this.emit("error",t)},saveOptions:function(t){this.emit("saveAll",t),this.$nextTick(function(){this.$forceUpdate()})},saveOption:function(t,e){this.saveOptionCouple({key:t,value:e})},saveOptionCouple:function(t){this.emit("save",t),this.$nextTick(function(){this.$forceUpdate()})},catchEmit:function(t){var e=this;return t.catch(function(t){throw e.emitError(t),t})}}},void 0,void 0,!1,null,null,null);i.options.__file="src/core/serviceEmiter.vue";var u=i.exports;function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.reset()}var e,n,r;return e=t,(n=[{key:"get",value:function(){return this.data}},{key:"isSuccess",value:function(){return this.loaded&&null==this.error}},{key:"display",value:function(){return this.loaded?this.error||this.data:"Loading..."}},{key:"reset",value:function(){this.loaded=!1,this.data=void 0,this.error=void 0,this.loadingMore=!1}},{key:"success",value:function(t){this.loaded=!0,this.data=t||{}}},{key:"fail",value:function(t){this.loaded=!0,this.error=t||"Failed"}},{key:"load",value:function(t,e){var n=this;(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&this.reset(),t.then(function(t){return n.success(e(t))}).catch(function(t){throw n.fail(t),t})}},{key:"loadMore",value:function(t,e){var n=this;this.loadingMore=!0,t.then(function(t){e(t,n.data,n),n.loadingMore=!1})}}])&&s(e.prototype,n),r&&s(e,r),t}(),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loadable-block"},[t.loadable.isSuccess()?t._t("success",[t._v(t._s(t.get))]):t.loadable.error?t._t("error",[t._v(t._s(t.loadable.error))]):t._t("loading",[n("div",{staticClass:"service-loader"})])],2)};c._withStripped=!0;var l=o({props:{loadable:a},computed:{get:function(){return this.loadable.get()}}},c,[],!1,null,null,null);l.options.__file="src/core/loadable/loadableBlock.vue";var f=l.exports,p=function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{staticClass:"loadable-inline"},[t.loadable.isSuccess()?t._t("success",[t._v(t._s(t.get))]):t.loadable.error?t._t("error",[t._v(t._s(t.loadable.error))]):t._t("loading",[t._v("Loading...")])],2)};p._withStripped=!0;var v=o({props:{loadable:a},computed:{get:function(){return this.loadable.get()}}},p,[],!1,null,null,null);v.options.__file="src/core/loadable/loadableInline.vue";var d=v.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"service-header"},[n("div",{staticClass:"title",on:{click:function(e){t.showSettings=!t.showSettings}}},[t._t("title")],2),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showSettings,expression:"showSettings"}],staticClass:"settings"},[n("input",{staticClass:"position",on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:t.onMove("x",-1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:t.onMove("x",1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])?null:"button"in e&&0!==e.button?null:e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:t.onMove("y",-1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])?null:"button"in e&&2!==e.button?null:e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:t.onMove("y",1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:e.altKey?e.ctrlKey||e.shiftKey||e.metaKey?null:t.onMove("h",-1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:e.altKey?e.ctrlKey||e.shiftKey||e.metaKey?null:t.onMove("h",1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])?null:"button"in e&&0!==e.button?null:e.altKey?e.ctrlKey||e.shiftKey||e.metaKey?null:t.onMove("w",-1):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])?null:"button"in e&&2!==e.button?null:e.altKey?e.ctrlKey||e.shiftKey||e.metaKey?null:t.onMove("w",1):null}]}}),t._t("settings")],2)])};h._withStripped=!0;var y=o({props:{emit:{type:Function,default:void 0}},data:function(){return{showSettings:!1}},methods:{onMove:function(t,e){this.emit("move",{type:t,direction:e})}}},h,[],!1,null,null,null);y.options.__file="src/core/serviceHeader.vue";var m=y.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"setting"},[n("label",{attrs:{for:t.id}},[t._v(t._s(t.title)+":")]),n("input",{attrs:{id:t.id,type:"checkbox"},domProps:{checked:t.value},on:{change:function(e){return e.stopPropagation(),t.sendChange(e.target.checked)}}})])};g._withStripped=!0;var b=o({props:{id:{type:String,default:void 0},title:{type:String,default:void 0}},methods:{sendChange:function(t){this.$emit("change",{key:this.id,value:t})}}},void 0,void 0,!1,null,null,null);b.options.__file="src/core/input/baseSetting.vue";var _=b.exports,w=o({extends:_,props:{value:Boolean}},g,[],!1,null,null,null);w.options.__file="src/core/input/settingBoolean.vue";var S=w.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"setting"},[n("label",{attrs:{for:t.id}},[t._v(t._s(t.title)+":")]),n("input",{attrs:{id:t.id,type:"number",step:"1"},domProps:{value:t.value},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.sendChange(parseInt(e.target.value))}}})])};x._withStripped=!0;var k=o({extends:_,props:{value:{type:Number,default:1}}},x,[],!1,null,null,null);k.options.__file="src/core/input/settingInt.vue";var O=k.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"setting"},[n("label",{attrs:{for:t.id}},[t._v(t._s(t.title)+":")]),n("input",{attrs:{id:t.id,type:"text"},domProps:{value:t.value},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendChange(e.target.value)}}})])};E._withStripped=!0;var C=o({extends:_,props:{value:{type:String,default:void 0}}},E,[],!1,null,null,null);C.options.__file="src/core/input/settingString.vue";var N=C.exports,j=o({components:{loadableBlock:f,loadableInline:d,serviceHeader:m,settingBoolean:S,settingInt:O,settingString:N},extends:u},void 0,void 0,!1,null,null,null);j.options.__file="src/core/baseService.vue";var P=j.exports,T=function(){var t=this.$createElement;return(this._self._c||t)("span",[this._v(this._s(this.timeSince))])};T._withStripped=!0;var M={created:function(){var t=this;setInterval(function(){t.now=Date.now()},3e4)},data:function(){return{now:Date.now()}}},A=o({mixins:[{props:{now:{type:Number|Date,default:Date.now}}}],props:{date:{type:Date,default:Date.now}},computed:{timeSince:function(){var t=Math.floor((this.now-new Date(this.date))/1e3),e=Math.floor(t/31536e3);return e>1?e+" years":(e=Math.floor(t/2592e3))>1?e+" months":(e=Math.floor(t/86400))>1?e+" days":(e=Math.floor(t/3600))>1?e+" hours":(e=Math.floor(t/60))>1?e+" minutes":Math.floor(t)+" seconds"}}},T,[],!1,null,null,null);A.options.__file="src/core/fromNow.vue";var I=A.exports,L={last:function(t){return t[t.length-1]},getIndex:function(t,e){for(var n=t.length-1;n>=0;n--)if(e(t[n]))return n;return t.length},removeAt:function(t,e){t.splice(e,1)},removeFirst:function(t,e){this.removeAt(t,this.getIndex(t,e))},pushAll:function(t,e){t.push.apply(t,e)},clear:function(t){t.splice(0,t.length)},for:function(t,e){for(var n=0;n<t.length;n++)e(t[n],n,t)}};function K(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var F=o({name:"NextcloudNews",components:{fromNow:I},extends:P,mixins:[M],props:{server:{type:String,default:void 0},username:{type:String,default:void 0},token:{type:String,default:void 0},timeout:{default:5e3,type:Number},buffer:{default:-1,type:Number},update:{default:300,type:Number},showEmpty:{default:!1,type:Boolean}},data:function(){return{rest:axios.create({baseURL:"https://".concat(this.server,"/index.php/apps/news/api/v1-2/"),timeout:this.timeout,headers:{Authorization:"Basic "+btoa(this.username+":"+this.token)}}),news:new a,newServer:this.server,newUsername:this.username,newToken:this.token}},computed:{hasNews:function(){return this.news.isSuccess()&&this.news.get().length>0},isSetup:function(){return this.server&&this.username&&this.token}},created:function(){this.init()},methods:{loadData:function(){this.news.load(this.catchEmit(this.rest.get("/items",{params:{batchSize:this.buffer,type:3,getRead:!1}})),function(t){return t.data.items.map(function(t){return t.open=!1,t})})},removeNews:function(t){L.removeFirst(this.news.get(),function(e){return e.id===t})},makeRead:function(t){var e=this;this.catchEmit(this.rest.put("/items/".concat(t,"/read"))).then(function(){return e.removeNews(t)})},init:function(){this.isSetup?(this.loadData(),this.update>0&&setInterval(this.loadData,1e3*this.update)):this.news.fail("First connection")},makeAuth:function(){var t=this;this.catchEmit(axios.get("https://".concat(this.newServer,"/index.php/apps/news/api/v1-2/folders"),{headers:{Authorization:"Basic "+btoa(this.newUsername+":"+this.newToken)},timeout:this.timeout})).then(function(){t.saveOptions(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){K(t,e,n[e])})}return t}({},t.$props,{server:t.newServer,token:t.newToken,username:t.newUsername})),t.init()})}}},r,[],!1,null,null,null);F.options.__file="src/nextcloud-news/main.vue";var D=F.exports;Vue.component(D.name,D)}]);