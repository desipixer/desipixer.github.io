/* JS */ gapi.loaded_0(function(_){var window=this;
var vf,bc,wf,Te,ia,la;_.b=function(a){return function(){return _.aa[a].apply(this,arguments)}};_._DumpException=function(a){throw a;};_.aa=[];vf="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,f){if(f.get||f.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[c]=f.value)};bc="undefined"!=typeof window&&window===this?this:"undefined"!=typeof window.global&&null!=window.global?window.global:this;
wf=function(a,c){if(c){var f=bc;a=a.split(".");for(var g=0;g<a.length-1;g++){var h=a[g];h in f||(f[h]={});f=f[h]}a=a[a.length-1];g=f[a];c=c(g);c!=g&&null!=c&&vf(f,a,{configurable:!0,writable:!0,value:c})}};Te=function(a,c,f){if(null==a)throw new TypeError("The 'this' value for String.prototype."+f+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+f+" must not be a regular expression");return a+""};
wf("String.prototype.repeat",function(a){return a?a:function(a){var c=Te(this,null,"repeat");if(0>a||1342177279<a)throw new window.RangeError("Invalid count value");a|=0;for(var g="";a;)if(a&1&&(g+=c),a>>>=1)c+=c;return g}});wf("String.prototype.startsWith",function(a){return a?a:function(a,f){var c=Te(this,a,"startsWith");a+="";var h=c.length,l=a.length;f=Math.max(0,Math.min(f|0,c.length));for(var n=0;n<l&&f<h;)if(c[f++]!=a[n++])return!1;return n>=l}});_.na=_.na||{};_.D=this;
_.kf=function(a){return void 0!==a};
_.da=function(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var f=Object.prototype.toString.call(a);if("[object Window]"==f)return"object";if("[object Array]"==f||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==f||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof a.call)return"object";return c};_.ea=function(a){return"array"==_.da(a)};_.fa=function(a){return"string"==typeof a};_.oa="closure_uid_"+(1E9*Math.random()>>>0);ia=function(a,c,f){return a.call.apply(a.bind,arguments)};
la=function(a,c,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var f=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(f,g);return a.apply(c,f)}}return function(){return a.apply(c,arguments)}};_.H=function(a,c,f){_.H=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:la;return _.H.apply(null,arguments)};_.pa=Date.now||function(){return+new Date};
_.J=function(a,c){function f(){}f.prototype=c.prototype;a.T=c.prototype;a.prototype=new f;a.prototype.constructor=a;a.yc=function(a,f,l){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return c.prototype[f].apply(a,g)}};
_.L=window.osapi=window.osapi||{};_.google=window.google||{};
window.___jsl=window.___jsl||{};
(window.___jsl.cd=window.___jsl.cd||[]).push({gwidget:{parsetags:"explicit"},appsapi:{plus_one_service:"/plus/v1"},client:{rms:"migrated"},csi:{rate:.01},poshare:{hangoutContactPickerServer:"https://plus.google.com"},gappsutil:{required_scopes:["https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/plus.people.recommended"],display_on_page_ready:!1},appsutil:{required_scopes:["https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/plus.people.recommended"],display_on_page_ready:!1},
"oauth-flow":{authUrl:"https://accounts.google.com/o/oauth2/auth",proxyUrl:"https://accounts.google.com/o/oauth2/postmessageRelay",redirectUri:"postmessage"},iframes:{sharebox:{params:{json:"&"},url:":socialhost:/:session_prefix:_/sharebox/dialog"},plus:{url:":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"},":socialhost:":"https://apis.google.com",":im_socialhost:":"https://plus.googleapis.com",domains_suggest:{url:"https://domains.google.com/suggest/flow"},card:{params:{s:"#",userid:"&"},
url:":socialhost:/:session_prefix:_/hovercard/internalcard"},":signuphost:":"https://plus.google.com",":gplus_url:":"https://plus.google.com",plusone:{url:":socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1"},plus_share:{url:":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1"},plus_circle:{url:":socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1"},plus_followers:{url:":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"},configurator:{url:":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"},
appcirclepicker:{url:":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},page:{url:":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"},person:{url:":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"},community:{url:":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"},follow:{url:":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"},commentcount:{url:":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"},comments:{url:":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1"},
youtube:{url:":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1"},reportabuse:{url:":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1"},additnow:{url:":socialhost:/additnow/additnow.html"},udc_webconsentflow:{url:"https://myaccount.google.com/webconsent?usegapi=1"},":source:":"1p"},poclient:{update_session:"google.updateSessionCallback"},"googleapis.config":{methods:{"pos.plusones.list":!0,"pos.plusones.get":!0,"pos.plusones.insert":!0,"pos.plusones.delete":!0,"pos.plusones.getSignupState":!0},
requestCache:{enabled:!0},versions:{pos:"v1"},rpc:"/rpc",root:"https://content.googleapis.com","root-1p":"https://clients6.google.com",sessionCache:{enabled:!0},transport:{isProxyShared:!0},xd3:"/static/proxy.html",developerKey:"AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ",auth:{useInterimAuth:!1}},report:{apis:["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.client\\..*"],rate:1E-4}});

window.___jsl=window.___jsl||{};(window.___jsl.cd=window.___jsl.cd||[]).push({gwidget:{parsetags:"onload"},iframes:{":source:":"3p"},client:{rms:""}});
/*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
_.Mu=function(a,c){a=a.split(".");var f=_.D;a[0]in f||!f.execScript||f.execScript("var "+a[0]);for(var g;a.length&&(g=a.shift());)!a.length&&_.kf(c)?f[g]=c:f=f[g]?f[g]:f[g]={}};_.ta=window;_.ua=window.document;_.Ha=_.ta.location;_.Ia=/\[native code\]/;_.Ka=function(a,c,f){return a[c]=a[c]||f};_.r=function(){var a;if((a=Object.create)&&_.Ia.test(a))a=a(null);else{a={};for(var c in a)a[c]=void 0}return a};_.Qa=function(a,c){return Object.prototype.hasOwnProperty.call(a,c)}; _.Sl=function(a,c){a=a||{};for(var f in a)_.Qa(a,f)&&(c[f]=a[f])};_.Ua=_.Ka(_.ta,"gapi",{});
_.e=function(a,c,f){var g=new RegExp("([#].*&|[#])"+c+"=([^&#]*)","g");c=new RegExp("([?#].*&|[?#])"+c+"=([^&#]*)","g");if(a=a&&(g.exec(a)||c.exec(a)))try{f=(0,window.decodeURIComponent)(a[2])}catch(h){}return f};_.Xa=new RegExp(/^/.source+/([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source+/(\/\/[^\/?#]*)?/.source+/([^?#]*)?/.source+/(\?([^#]*))?/.source+/(#((#|[^#])*))?/.source+/$/.source);
_.Za=new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source+/%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,"g");_.ba=function(){return _.ta.location.origin||_.ta.location.protocol+"//"+_.ta.location.host};_.lc=new RegExp(/\/?\??#?/.source+"("+/[\/?#]/i.source+"|"+/[\uD800-\uDBFF]/i.source+"|"+/%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source+"|"+/%[0-9a-f]?/i.source+")$","i");
_.La=function(a,c,f){_.ra(a,c,f,"add","at")};_.ra=function(a,c,f,g,h){if(a[g+"EventListener"])a[g+"EventListener"](c,f,!1);else if(a[h+"tachEvent"])a[h+"tachEvent"]("on"+c,f)};_.bb=_.Ka(_.ta,"___jsl",_.r());_.Ka(_.bb,"I",0);_.Ka(_.bb,"hel",10);var ya,za,Aa,Ba,Da,Ea;ya=function(a){var c=window.___jsl=window.___jsl||{};c[a]=c[a]||[];return c[a]};za=function(a){var c=window.___jsl=window.___jsl||{};c.cfg=!a&&c.cfg||{};return c.cfg};Aa=function(a){return"object"===typeof a&&/\[native code\]/.test(a.push)};Ba=function(a,c){if(c)for(var f in c)c.hasOwnProperty(f)&&(a[f]&&c[f]&&"object"===typeof a[f]&&"object"===typeof c[f]&&!Aa(a[f])&&!Aa(c[f])?Ba(a[f],c[f]):c[f]&&"object"===typeof c[f]?(a[f]=Aa(c[f])?[]:{},Ba(a[f],c[f])):a[f]=c[f])};
Da=function(a){if(a&&!/^\s+$/.test(a)){for(;0==a.charCodeAt(a.length-1);)a=a.substring(0,a.length-1);var c;try{c=window.JSON.parse(a)}catch(f){}if("object"===typeof c)return c;try{c=(new Function("return ("+a+"\n)"))()}catch(f){}if("object"===typeof c)return c;try{c=(new Function("return ({"+a+"\n})"))()}catch(f){}return"object"===typeof c?c:{}}};
Ea=function(a){za(!0);var c=window.___gcfg,f=ya("cu");if(c&&c!==window.___gu){var g={};Ba(g,c);f.push(g);window.___gu=c}var c=ya("cu"),h=window.document.scripts||window.document.getElementsByTagName("script")||[],g=[],l=[];l.push.apply(l,ya("us"));for(var n=0;n<h.length;++n)for(var q=h[n],t=0;t<l.length;++t)q.src&&0==q.src.indexOf(l[t])&&g.push(q);0==g.length&&0<h.length&&h[h.length-1].src&&g.push(h[h.length-1]);for(h=0;h<g.length;++h)g[h].getAttribute("gapi_processed")||(g[h].setAttribute("gapi_processed",
!0),(l=g[h])?(n=l.nodeType,l=3==n||4==n?l.nodeValue:l.textContent||l.innerText||l.innerHTML||""):l=void 0,(l=Da(l))&&c.push(l));a&&(g={},Ba(g,a),f.push(g));g=ya("cd");a=0;for(c=g.length;a<c;++a)Ba(za(),g[a]);g=ya("ci");a=0;for(c=g.length;a<c;++a)Ba(za(),g[a]);a=0;for(c=f.length;a<c;++a)Ba(za(),f[a])};_.P=function(a,c){if(!a)return za();a=a.split("/");for(var f=za(),g=0,h=a.length;f&&"object"===typeof f&&g<h;++g)f=f[a[g]];return g===a.length&&void 0!==f?f:c}; _.Fa=function(a,c){var f=a;if("string"===typeof a){var g=f={};a=a.split("/");for(var h=0,l=a.length;h<l-1;++h)var n={},g=g[a[h]]=n;g[a[h]]=c}Ea(f)};
var Ga=function(){var a=window.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),_.Ka(_.bb,"ci",[]).push(a),window.__GOOGLEAPIS=void 0)};Ga&&Ga();Ea();_.Mu("gapi.config.get",_.P);_.Mu("gapi.config.update",_.Fa);
(function(){function a(a,c){if(!(a<f)&&g)if(2===a&&g.warn)g.warn(c);else if(3===a&&g.error)try{g.error(c)}catch(n){}else g.log&&g.log(c)}var c=function(c){a(1,c)};_.Lb=function(c){a(2,c)};_.sa=function(c){a(3,c)};_.Fc=function(){};c.INFO=1;c.WARNING=2;c.NONE=4;var f=1,g=window.console?window.console:window.opera?window.opera.postError:void 0;return c})();

_.R=_.R||{};
_.R=_.R||{};(function(){var a=[];_.R.du=function(c){a.push(c)};_.R.XX=function(){for(var c=0,f=a.length;c<f;++c)a[c]()}})();
_.cb=function(a){return!!a&&"object"===typeof a&&_.Ia.test(a.push)};_.Sc=function(a,c){var f=_.Ka(_.bb,"watt",_.r());_.Ka(f,a,c)};_.R=_.R||{};
(function(){var a=null;_.R.dc=function(c){var f="undefined"===typeof c;if(null!==a&&f)return a;var g={};c=c||window.location.href;var h=c.indexOf("?"),l=c.indexOf("#");c=(-1===l?c.substr(h+1):[c.substr(h+1,l-h-1),"&",c.substr(l+1)].join("")).split("&");for(var h=window.decodeURIComponent?window.decodeURIComponent:window.unescape,l=0,n=c.length;l<n;++l){var q=c[l].indexOf("=");if(-1!==q){var t=c[l].substring(0,q),q=c[l].substring(q+1),q=q.replace(/\+/g," ");try{g[t]=h(q)}catch(v){}}}f&&(a=g);return g}; _.R.dc()})();
_.Mu("gadgets.util.getUrlParameters",_.R.dc);
_.Kd=window.console;_.kd=function(a){_.Kd&&_.Kd.log&&_.Kd.log(a)};_.ke=function(){};
_.Pb=function(){var a=window.gadgets&&window.gadgets.config&&window.gadgets.config.get;a&&_.Fa(a());return{register:function(a,f,g){g&&g(_.P())},get:function(a){return _.P(a)},update:function(a,f){if(f)throw"Config replacement is not supported";_.Fa(a)},kc:function(){}}}();
_.Mu("gadgets.config.register",_.Pb.register);_.Mu("gadgets.config.get",_.Pb.get);_.Mu("gadgets.config.init",_.Pb.kc);_.Mu("gadgets.config.update",_.Pb.update);
var ye=function(a){return 10>a?"0"+a:a},Ed={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Nd=function(a){var c,f,g;c=/[\"\\\x00-\x1f\x7f-\x9f]/g;if(void 0!==a){switch(typeof a){case "string":return c.test(a)?'"'+a.replace(c,function(a){var c=Ed[a];if(c)return c;c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"':'"'+a+'"';case "number":return(0,window.isFinite)(a)?String(a):"null";case "boolean":case "null":return String(a);case "object":if(!a)return"null";
c=[];if("number"===typeof a.length&&!a.propertyIsEnumerable("length")){g=a.length;for(f=0;f<g;f+=1)c.push(Nd(a[f])||"null");return"["+c.join(",")+"]"}for(f in a)!/___$/.test(f)&&_.Qa(a,f)&&"string"===typeof f&&(g=Nd(a[f]))&&c.push(Nd(f)+":"+g);return"{"+c.join(",")+"}"}return""}},me=function(a){if(!a)return!1;if(/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))try{return eval("("+
a+")")}catch(c){}return!1},Qe=!1,af;try{Qe=!!window.JSON&&'["a"]'===window.JSON.stringify(["a"])&&"a"===window.JSON.parse('["a"]')[0]}catch(a){}af=function(a){try{return window.JSON.parse(a)}catch(c){return!1}};_.mf=Qe?window.JSON.stringify:Nd;_.of=Qe?af:me;af||(Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",ye(this.getUTCMonth()+1),"-",ye(this.getUTCDate()),"T",ye(this.getUTCHours()),":",ye(this.getUTCMinutes()),":",ye(this.getUTCSeconds()),"Z"].join("")});

_.Mu("gadgets.json.stringify",_.mf);_.Mu("gadgets.json.parse",_.of);_.e(_.ta.location.href,"rpctoken")&&_.La(_.ua,"unload",function(){});
var Qb;_.Ma=function(){var a=_.ua.readyState;return"complete"===a||"interactive"===a&&-1==window.navigator.userAgent.indexOf("MSIE")};_.Wa=function(a){if(_.Ma())a();else{var c=!1,f=function(){if(!c)return c=!0,a.apply(this,arguments)};_.ta.addEventListener?(_.ta.addEventListener("load",f,!1),_.ta.addEventListener("DOMContentLoaded",f,!1)):_.ta.attachEvent&&(_.ta.attachEvent("onreadystatechange",function(){_.Ma()&&f.apply(this,arguments)}),_.ta.attachEvent("onload",f))}};Qb=Qb||{};Qb.Km=null; Qb.bm=null;Qb.FM=null;Qb.frameElement=null;
Qb=Qb||{};
Qb.Lj||(Qb.Lj=function(){function a(a){"undefined"!=typeof window.addEventListener?window.addEventListener("message",a,!1):"undefined"!=typeof window.attachEvent&&window.attachEvent("onmessage",a);window.___jsl=window.___jsl||{};var c=window.___jsl;c.RPMQ=c.RPMQ||[];c.RPMQ.push(a)}function c(a){var c=(0,_.of)(a.data);if(c&&c.f){(0,_.Fc)("gadgets.rpc.receive("+window.name+"): "+a.data);var g=_.T.$d(c.f);h&&("undefined"!==typeof a.origin?a.origin!==g:a.domain!==/^.+:\/\/([^:]+).*/.exec(g)[1])?_.sa("Invalid rpc message origin. "+
g+" vs "+(a.origin||"")):f(c,a.origin)}}var f,g,h=!0;return{Kk:function(){return"wpm"},jga:function(){return!0},kc:function(l,n){_.Pb.register("rpc",null,function(a){"true"===String((a&&a.rpc||{}).disableForceSecure)&&(h=!1)});f=l;g=n;a(c);g("..",!0);return!0},sf:function(a){g(a,!0);return!0},call:function(a,c,f){var g=_.T.$d(a),h=_.T.dk(a);g?window.setTimeout(function(){var a=(0,_.mf)(f);(0,_.Fc)("gadgets.rpc.send("+window.name+"): "+a);h.postMessage(a,g)},0):".."!=a&&_.sa("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message"); return!0}}}());
Qb=Qb||{};
Qb.Uf||(Qb.Uf=function(){function a(a,c){Ca[c]=Ca[c]||function(){a.apply({},arguments)}}function c(){if(null===F&&window.document.body&&t){var a=t+"?cb="+Math.random()+"&origin="+S+"&jsl=1",f=window.document.createElement("div");f.style.height="1px";f.style.width="1px";a='<object height="1" width="1" id="___xpcswf" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+a+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+a+
'" height="1" width="1"></embed></object>';window.document.body.appendChild(f);f.innerHTML=a;F=f.firstChild}++E;null!==I&&(null!==F||50<=E)?window.clearTimeout(I):I=window.setTimeout(c,100)}function f(){ka[".."]||(q(".."),K++,50<=K&&null!==U?(window.clearTimeout(U),U=null):U=window.setTimeout(f,100))}function g(){if(null!==F&&F.setup)for(;0<z.length;){var a=z.shift(),c=a.Qs;F.setup(a.ve,".."===c?_.T.lh:c,".."===c?"INNER":"OUTER")}null!==I&&window.clearTimeout(I);I=null}function h(){ka[".."]||null!==
U||(U=window.setTimeout(f,100))}function l(a,c,f){c=_.T.$d(a);var g=_.T.Wd(a);F["sendMessage_"+(".."===a?_.T.lh:a)+"_"+g+"_"+(".."===a?"INNER":"OUTER")].call(F,(0,_.mf)(f),c);return!0}function n(a,c){var f=(0,_.of)(a);(a=f._scr)?(A(a,!0),ka[a]=!0,".."!==a&&q(a,!0)):window.setTimeout(function(){w(f,c)},0)}function q(a,c){var f=_.T.lh,g={};g._scr=c?"..":f;g._pnt=f;l(a,0,g)}var t=null,v=!1,w=null,A=null,F=null,z=[],I=null,E=0,K=0,U=null,ka={},S=window.location.protocol+"//"+window.location.host,Ca;window.___jsl=
window.___jsl||{};Ca=window.___jsl._fm={};_.Pb.register("rpc",null,function(a){v&&(t=a&&a.rpc&&a.rpc.commSwf||"//xpc.googleusercontent.com/gadgets/xpc.swf")});a(g,"ready");a(h,"setupDone");a(n,"receiveMessage");return{Kk:function(){return"flash"},jga:function(){return!0},kc:function(a,c){w=a;A=c;return v=!0},sf:function(a,f){z.push({ve:f,Qs:a});null===F&&null===I&&(I=window.setTimeout(c,100));return!0},call:l,Vo:n,Sia:g,Tia:h}}());
if(window.gadgets&&window.gadgets.rpc)"undefined"!=typeof _.T&&_.T||(_.T=window.gadgets.rpc,_.T.config=_.T.config,_.T.register=_.T.register,_.T.unregister=_.T.unregister,_.T.Am=_.T.registerDefault,_.T.aB=_.T.unregisterDefault,_.T.Fk=_.T.forceParentVerifiable,_.T.call=_.T.call,_.T.Rk=_.T.getRelayUrl,_.T.Xg=_.T.setRelayUrl,_.T.Wg=_.T.setAuthToken,_.T.tf=_.T.setupReceiver,_.T.Wd=_.T.getAuthToken,_.T.mj=_.T.removeReceiver,_.T.Qk=_.T.getRelayChannel,_.T.ym=_.T.receive,_.T.zm=_.T.receiveSameDomain,_.T.Pq=
_.T.getOrigin,_.T.$d=_.T.getTargetOrigin,_.T.dk=_.T._getTargetWin,_.T.Uo=_.T._parseSiblingId);else{_.T=function(){function a(a,c){if(!Ta[a]){var f=fc;c||(f=te);Ta[a]=f;c=Ya[a]||[];for(var g=0;g<c.length;++g){var h=c[g];h.t=ka[a];f.call(a,h.f,h)}Ya[a]=[]}}function c(){function a(){Go=!0}Ho||("undefined"!=typeof window.addEventListener?window.addEventListener("unload",a,!1):"undefined"!=typeof window.attachEvent&&window.attachEvent("onunload",a),Ho=!0)}function f(a,f,g,h,l){ka[f]&&ka[f]===g||(_.sa("Invalid gadgets.rpc token. "+
ka[f]+" vs "+g),ok(f,2));l.onunload=function(){ja[f]&&!Go&&(ok(f,1),_.T.mj(f))};c();h=(0,_.of)((0,window.decodeURIComponent)(h))}function g(c,f){if(c&&"string"===typeof c.s&&"string"===typeof c.f&&c.a instanceof Array)if(ka[c.f]&&ka[c.f]!==c.t&&(_.sa("Invalid gadgets.rpc token. "+ka[c.f]+" vs "+c.t),ok(c.f,2)),"__ack"===c.s)window.setTimeout(function(){a(c.f,!0)},0);else{c.c&&(c.callback=function(a){_.T.call(c.f,(c.g?"legacy__":"")+"__cb",null,c.c,a)});if(f){var g=h(f);c.origin=f;var l=c.r,n;try{n=
h(l)}catch($B){}l&&n==g||(l=f);c.referer=l}f=(E[c.s]||E[""]).apply(c,c.a);c.c&&"undefined"!==typeof f&&_.T.call(c.f,"__cb",null,c.c,f)}}function h(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);-1==a.indexOf("://")&&(a=window.location.protocol+"//"+a);var c=a.substring(a.indexOf("://")+3),f=c.indexOf("/");-1!=f&&(c=c.substring(0,f));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==
a)throw Error("Pa");var f="",g=c.indexOf(":");if(-1!=g){var h=c.substring(g+1),c=c.substring(0,g);if("http"===a&&"80"!==h||"https"===a&&"443"!==h)f=":"+h}return a+"://"+c+f}function l(a){if("/"==a.charAt(0)){var c=a.indexOf("|");return{id:0<c?a.substring(1,c):a.substring(1),origin:0<c?a.substring(c+1):null}}return null}function n(a){if("undefined"===typeof a||".."===a)return window.parent;var c=l(a);if(c)return window.top.frames[c.id];a=String(a);return(c=window.frames[a])?c:(c=window.document.getElementById(a))&&
c.contentWindow?c.contentWindow:null}function q(a,c){if(!0!==ja[a]){"undefined"===typeof ja[a]&&(ja[a]=0);var f=n(a);".."!==a&&null==f||!0!==fc.sf(a,c)?!0!==ja[a]&&10>ja[a]++?window.setTimeout(function(){q(a,c)},500):(Ta[a]=te,ja[a]=!0):ja[a]=!0}}function t(a){(a=K[a])&&"/"===a.substring(0,1)&&(a="/"===a.substring(1,2)?window.document.location.protocol+a:window.document.location.protocol+"//"+window.document.location.host+a);return a}function v(a,c,f){c&&!/http(s)?:\/\/.+/.test(c)&&(0==c.indexOf("//")?
c=window.location.protocol+c:"/"==c.charAt(0)?c=window.location.protocol+"//"+window.location.host+c:-1==c.indexOf("://")&&(c=window.location.protocol+"//"+c));K[a]=c;"undefined"!==typeof f&&(U[a]=!!f)}function w(a,c){c=c||"";ka[a]=String(c);q(a,c)}function A(a){a=(a.passReferrer||"").split(":",2);If=a[0]||"none";wh=a[1]||"origin"}function F(c){"true"===String(c.useLegacyProtocol)&&(fc=Qb.FM||te,fc.kc(g,a))}function z(a,c){function f(f){f=f&&f.rpc||{};A(f);var g=f.parentRelayUrl||"",g=h(rw.parent||
c)+g;v("..",g,"true"===String(f.useLegacyProtocol));F(f);w("..",a)}!rw.parent&&c?f({}):_.Pb.register("rpc",null,f)}function I(a,c,f){if(".."===a)z(f||rw.rpctoken||rw.ifpctok||"",c);else a:{var g=null;if("/"!=a.charAt(0)){if(!_.R)break a;g=window.document.getElementById(a);if(!g)throw Error("h`"+a);}g=g&&g.src;c=c||_.T.Pq(g);v(a,c);c=_.R.dc(g);w(a,f||c.rpctoken)}}var E={},K={},U={},ka={},S=0,Ca={},ja={},rw={},Ta={},Ya={},If=null,wh=null,nk=window.top!==window.self,Yw=window.name,ok=function(){},pk=
window.console,Io=pk&&pk.log&&function(a){pk.log(a)}||function(){},te=function(){function a(a){return function(){Io(a+": call ignored")}}return{getCode:function(){return"noop"},isParentVerifiable:function(){return!0},init:a("init"),setup:a("setup"),call:a("call")}}();_.R&&(rw=_.R.dc());var Go=!1,Ho=!1,fc=function(){if("flash"==rw.rpctx)return Qb.Uf;if("rmr"==rw.rpctx)return Qb.Km;var a="function"===typeof window.postMessage?Qb.Lj:"object"===typeof window.postMessage?Qb.Lj:window.ActiveXObject?Qb.Uf?
Qb.Uf:Qb.bm?Qb.bm:Qb.FM:0<window.navigator.userAgent.indexOf("WebKit")?Qb.Km:"Gecko"===window.navigator.product?Qb.frameElement:Qb.FM;a||(a=te);return a}();E[""]=function(){Io("Unknown RPC service: "+this.s)};E.__cb=function(a,c){var f=Ca[a];f&&(delete Ca[a],f.call(this,c))};return{config:function(a){"function"===typeof a.Mm&&(ok=a.Mm)},register:function(a,c){if("__cb"===a||"__ack"===a)throw Error("i");if(""===a)throw Error("j");E[a]=c},unregister:function(a){if("__cb"===a||"__ack"===a)throw Error("k");
if(""===a)throw Error("l");delete E[a]},Am:function(a){E[""]=a},aB:function(){delete E[""]},Fk:function(){},call:function(a,c,f,g){a=a||"..";var h="..";".."===a?h=Yw:"/"==a.charAt(0)&&(h=_.T.Pq(window.location.href),h="/"+Yw+(h?"|"+h:""));++S;f&&(Ca[S]=f);var n={s:c,f:h,c:f?S:0,a:Array.prototype.slice.call(arguments,3),t:ka[a],l:!!U[a]},q;a:if("bidir"===If||"c2p"===If&&".."===a||"p2c"===If&&".."!==a){q=window.location.href;var t="?";if("query"===wh)t="#";else if("hash"===wh)break a;t=q.lastIndexOf(t);
t=-1===t?q.length:t;q=q.substring(0,t)}else q=null;q&&(n.r=q);if(".."===a||null!=l(a)||window.document.getElementById(a))(q=Ta[a])||null===l(a)||(q=fc),0===c.indexOf("legacy__")&&(q=fc,n.s=c.substring(8),n.c=n.c?n.c:S),n.g=!0,n.r=h,q?(U[a]&&(q=Qb.FM),!1===q.call(a,h,n)&&(Ta[a]=te,fc.call(a,h,n))):Ya[a]?Ya[a].push(n):Ya[a]=[n]},Rk:t,Xg:v,Wg:w,tf:I,Wd:function(a){return ka[a]},mj:function(a){delete K[a];delete U[a];delete ka[a];delete ja[a];delete Ta[a]},Qk:function(){return fc.Kk()},ym:function(a,
c){4<a.length?fc.Vo(a,g):f.apply(null,a.concat(c))},zm:function(a){a.a=Array.prototype.slice.call(a.a);window.setTimeout(function(){g(a)},0)},Pq:h,$d:function(a){var c=t(a);a=c?c:(c=l(a))?c.origin:".."==a?rw.parent:window.document.getElementById(a).src;return h(a)},kc:function(){!1===fc.kc(g,a)&&(fc=te);nk?I(".."):_.Pb.register("rpc",null,function(a){a=a.rpc||{};A(a);F(a)})},dk:n,Uo:l,Iia:"__ack",lh:Yw||"..",Pia:0,Oia:1,Nia:2}}();_.T.kc()};
_.T.config({Mm:function(a){throw Error("m`"+a);}});_.Fc=_.ke;_.Mu("gadgets.rpc.config",_.T.config);_.Mu("gadgets.rpc.register",_.T.register);_.Mu("gadgets.rpc.unregister",_.T.unregister);_.Mu("gadgets.rpc.registerDefault",_.T.Am);_.Mu("gadgets.rpc.unregisterDefault",_.T.aB);_.Mu("gadgets.rpc.forceParentVerifiable",_.T.Fk);_.Mu("gadgets.rpc.call",_.T.call);_.Mu("gadgets.rpc.getRelayUrl",_.T.Rk);_.Mu("gadgets.rpc.setRelayUrl",_.T.Xg);_.Mu("gadgets.rpc.setAuthToken",_.T.Wg);_.Mu("gadgets.rpc.setupReceiver",_.T.tf);_.Mu("gadgets.rpc.getAuthToken",_.T.Wd); _.Mu("gadgets.rpc.removeReceiver",_.T.mj);_.Mu("gadgets.rpc.getRelayChannel",_.T.Qk);_.Mu("gadgets.rpc.receive",_.T.ym);_.Mu("gadgets.rpc.receiveSameDomain",_.T.zm);_.Mu("gadgets.rpc.getOrigin",_.T.Pq);_.Mu("gadgets.rpc.getTargetOrigin",_.T.$d);

_.R=_.R||{};_.R.Ee=function(a,c,f,g){"undefined"!=typeof a.addEventListener?a.addEventListener(c,f,g):"undefined"!=typeof a.attachEvent?a.attachEvent("on"+c,f):_.Lb("cannot attachBrowserEvent: "+c)};_.R.Vr=function(a){var c=window;c.removeEventListener?c.removeEventListener("mousemove",a,!1):c.detachEvent?c.detachEvent("onmousemove",a):_.Lb("cannot removeBrowserEvent: mousemove")};

_.Tb=function(){function a(){h[0]=1732584193;h[1]=4023233417;h[2]=2562383102;h[3]=271733878;h[4]=3285377520;w=v=0}function c(a){for(var c=n,f=0;64>f;f+=4)c[f/4]=a[f]<<24|a[f+1]<<16|a[f+2]<<8|a[f+3];for(f=16;80>f;f++)a=c[f-3]^c[f-8]^c[f-14]^c[f-16],c[f]=(a<<1|a>>>31)&4294967295;a=h[0];for(var g=h[1],l=h[2],q=h[3],t=h[4],v,w,f=0;80>f;f++)40>f?20>f?(v=q^g&(l^q),w=1518500249):(v=g^l^q,w=1859775393):60>f?(v=g&l|q&(g|l),w=2400959708):(v=g^l^q,w=3395469782),v=((a<<5|a>>>27)&4294967295)+v+t+w+c[f]&4294967295,
t=q,q=l,l=(g<<30|g>>>2)&4294967295,g=a,a=v;h[0]=h[0]+a&4294967295;h[1]=h[1]+g&4294967295;h[2]=h[2]+l&4294967295;h[3]=h[3]+q&4294967295;h[4]=h[4]+t&4294967295}function f(a,f){if("string"===typeof a){a=(0,window.unescape)((0,window.encodeURIComponent)(a));for(var g=[],h=0,n=a.length;h<n;++h)g.push(a.charCodeAt(h));a=g}f||(f=a.length);g=0;if(0==v)for(;g+64<f;)c(a.slice(g,g+64)),g+=64,w+=64;for(;g<f;)if(l[v++]=a[g++],w++,64==v)for(v=0,c(l);g+64<f;)c(a.slice(g,g+64)),g+=64,w+=64}function g(){var a=[],
g=8*w;56>v?f(q,56-v):f(q,64-(v-56));for(var n=63;56<=n;n--)l[n]=g&255,g>>>=8;c(l);for(n=g=0;5>n;n++)for(var t=24;0<=t;t-=8)a[g++]=h[n]>>t&255;return a}for(var h=[],l=[],n=[],q=[128],t=1;64>t;++t)q[t]=0;var v,w;a();return{reset:a,update:f,digest:g,Of:function(){for(var a=g(),c="",f=0;f<a.length;f++)c+="0123456789ABCDEF".charAt(Math.floor(a[f]/16))+"0123456789ABCDEF".charAt(a[f]%16);return c}}};
_.Vb=function(){function a(a){var c=_.Tb();c.update(a);return c.Of()}var c=window.crypto;if(c&&"function"==typeof c.getRandomValues)return function(){var a=new window.Uint32Array(1);c.getRandomValues(a);return Number("0."+a[0])};var f=_.P("random/maxObserveMousemove");null==f&&(f=-1);var g=0,h=Math.random(),l=1,n=1E6*(window.screen.width*window.screen.width+window.screen.height),q=function(a){a=a||window.event;var c=a.screenX+a.clientX<<16,c=c+(a.screenY+a.clientY),c=(new Date).getTime()%1E6*c;l=
l*c%n;0<f&&++g==f&&_.R.Vr(q)};0!=f&&_.R.Ee(window,"mousemove",q,!1);var t=a(window.document.cookie+"|"+window.document.location+"|"+(new Date).getTime()+"|"+h);return function(){var c=l,c=c+(0,window.parseInt)(t.substr(0,20),16);t=a(t);return c/(n+Math.pow(16,20))}}();
_.Mu("shindig.random",_.Vb);
});
// Google Inc.
