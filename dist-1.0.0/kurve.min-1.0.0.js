var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},kurve;!function(e){function t(e){setTimeout(e,0)}var n=function(){function e(){}return e}();e.Error=n;var o;!function(e){e[e.Pending=0]="Pending",e[e.ResolutionInProgress=1]="ResolutionInProgress",e[e.Resolved=2]="Resolved",e[e.Rejected=3]="Rejected"}(o||(o={}));var r=function(){function e(e,t,n){this._dispatcher=e,this._successCB=t,this._errorCB=n,this.result=new i(e)}return e.prototype.resolve=function(e,t){var n=this;return"function"!=typeof this._successCB?void this.result.resolve(e):void(t?this._dispatcher(function(){return n._dispatchCallback(n._successCB,e)}):this._dispatchCallback(this._successCB,e))},e.prototype.reject=function(e,t){var n=this;return"function"!=typeof this._errorCB?void this.result.reject(e):void(t?this._dispatcher(function(){return n._dispatchCallback(n._errorCB,e)}):this._dispatchCallback(this._errorCB,e))},e.prototype._dispatchCallback=function(e,t){var n;try{n=e(t),this.result.resolve(n)}catch(o){return void this.result.reject(o)}},e}(),i=function(){function e(e){this._stack=[],this._state=o.Pending,this._dispatcher=e?e:t,this.promise=new s(this)}return e.prototype.DispatchDeferred=function(e){setTimeout(e,0)},e.prototype.then=function(e,t){if("function"!=typeof e&&"function"!=typeof t)return this.promise;var n=new r(this._dispatcher,e,t);switch(this._state){case o.Pending:case o.ResolutionInProgress:this._stack.push(n);break;case o.Resolved:n.resolve(this._value,!0);break;case o.Rejected:n.reject(this._error,!0)}return n.result.promise},e.prototype.resolve=function(e){return this._state!==o.Pending?this:this._resolve(e)},e.prototype._resolve=function(e){var t,n=this,r=typeof e,i=!0;try{if(null===e||"object"!==r&&"function"!==r||"function"!=typeof(t=e.then))this._state=o.ResolutionInProgress,this._dispatcher(function(){n._state=o.Resolved,n._value=e;var t,r=n._stack.length;for(t=0;r>t;t++)n._stack[t].resolve(e,!1);n._stack.splice(0,r)});else{if(e===this.promise)throw new TypeError("recursive resolution");this._state=o.ResolutionInProgress,t.call(e,function(e){i&&(i=!1,n._resolve(e))},function(e){i&&(i=!1,n._reject(e))})}}catch(s){i&&this._reject(s)}return this},e.prototype.reject=function(e){return this._state!==o.Pending?this:this._reject(e)},e.prototype._reject=function(e){var t=this;return this._state=o.ResolutionInProgress,this._dispatcher(function(){t._state=o.Rejected,t._error=e;var n=t._stack.length,r=0;for(r=0;n>r;r++)t._stack[r].reject(e,!1);t._stack.splice(0,n)}),this},e}();e.Deferred=i;var s=function(){function e(e){this._deferred=e}return e.prototype.then=function(e,t){return this._deferred.then(e,t)},e.prototype.fail=function(e){return this._deferred.then(void 0,e)},e}();e.Promise=s,function(e){e[e.v1=1]="v1",e[e.v2=2]="v2"}(e.EndPointVersion||(e.EndPointVersion={}));var a=e.EndPointVersion,c=function(){function e(e,t,n,o,r){this.id=e,this.scopes=t,this.resource=n,this.token=o,this.expiry=r}return Object.defineProperty(e.prototype,"isExpired",{get:function(){return this.expiry<=new Date((new Date).getTime()+6e4)},enumerable:!0,configurable:!0}),e.prototype.hasScopes=function(e){var t=this;return this.scopes?e.every(function(e){return t.scopes.some(function(t){return e===t})}):!1},e}(),h=function(){function e(e){var t=this;this.tokenStorage=e,this.cachedTokens={},e&&e.getAll().forEach(function(e){var n=e.id,o=e.scopes,r=e.resource,i=e.token,s=e.expiry,a=new c(n,o,r,i,new Date(s));a.isExpired?t.tokenStorage.remove(a.id):t.cachedTokens[a.id]=a})}return e.prototype.add=function(e){this.cachedTokens[e.id]=e,this.tokenStorage&&this.tokenStorage.add(e.id,e)},e.prototype.getForResource=function(e){var t=this.cachedTokens[e];return t&&t.isExpired?(this.remove(e),null):t},e.prototype.getForScopes=function(e){for(var t in this.cachedTokens){var n=this.cachedTokens[t];if(n.hasScopes(e)){if(!n.isExpired)return n;this.remove(t)}}return null},e.prototype.clear=function(){this.cachedTokens={},this.tokenStorage&&this.tokenStorage.clear()},e.prototype.remove=function(e){this.tokenStorage&&this.tokenStorage.remove(e),delete this.cachedTokens[e]},e}(),u=function(){function e(){}return e}();e.IdToken=u;var l=function(){function e(e){var t=this;this.policy="",this.clientId=e.clientId,this.tokenProcessorUrl=e.tokenProcessingUri,this.version=e.version?e.version:a.v1,this.tokenCache=new h(e.tokenStorage),window.addEventListener("message",function(e){if("id_token"===e.data.type)if(e.data.error){var o=new n;o.text=e.data.error,t.loginCallback(o)}else if(t.state!==e.data.state){var r=new n;r.statusText="Invalid state",t.loginCallback(r)}else t.decodeIdToken(e.data.token),t.loginCallback(null);else if("access_token"===e.data.type)if(e.data.error){var o=new n;o.text=e.data.error,t.getTokenCallback(null,o)}else{var i=e.data.token,s=document.getElementById("tokenIFrame");if(s.parentNode.removeChild(s),e.data.state!==t.state){var r=new n;r.statusText="Invalid state",t.getTokenCallback(null,r)}else t.getTokenCallback(i,null)}})}return e.prototype.checkForIdentityRedirect=function(){function e(e){var t=window.location.href.indexOf(e);if(0>t)return null;var n=window.location.href.indexOf("&",t+e.length);return window.location.href.substring(t,n>0?n:window.location.href.length)}function t(e){var t=e||window.location.search||"",n=[],o={};if(t=t.replace(/.*?\?/,""),t.length){n=t.split("&");for(var r in n){var i=n[r].split("=")[0];i.length&&("undefined"==typeof o[i]&&(o[i]=[]),o[i].push(n[r].split("=")[1]))}}return o}var n=(t(window.location.href),e("#id_token=")),o=e("#access_token");if(n){return this.decodeIdToken(n),this.loginCallback&&this.loginCallback(null),!0}if(o)throw"Should not get here.  This should be handled via the iframe approach.";return!1},e.prototype.decodeIdToken=function(e){var t=this,n=this.base64Decode(e.substring(e.indexOf(".")+1,e.lastIndexOf("."))),o=JSON.parse(n),r=new Date(new Date("01/01/1970 0:0 UTC").getTime()+1e3*parseInt(o.exp));this.idToken=new u,this.idToken.FullToken=o,this.idToken.Token=e,this.idToken.Expiry=r,this.idToken.UPN=o.upn,this.idToken.TenantId=o.tid,this.idToken.FamilyName=o.family_name,this.idToken.GivenName=o.given_name,this.idToken.Name=o.name,this.idToken.PreferredUsername=o.preferred_username;var i=r.getTime()-(new Date).getTime()-3e5;this.refreshTimer=setTimeout(function(){t.renewIdToken()},i)},e.prototype.decodeAccessToken=function(e,t,n){var o=this.base64Decode(e.substring(e.indexOf(".")+1,e.lastIndexOf("."))),r=JSON.parse(o),i=new Date(new Date("01/01/1970 0:0 UTC").getTime()+1e3*parseInt(r.exp)),s=t||n.join(" "),a=new c(s,n,t,e,i);this.tokenCache.add(a)},e.prototype.getIdToken=function(){return this.idToken},e.prototype.isLoggedIn=function(){return this.idToken?this.idToken.Expiry>new Date:!1},e.prototype.renewIdToken=function(){clearTimeout(this.refreshTimer),this.login(function(){})},e.prototype.getCurrentEndPointVersion=function(){return this.version},e.prototype.getAccessTokenAsync=function(e){var t=new i;return this.getAccessToken(e,function(e,n){e?t.reject(e):t.resolve(n)}),t.promise},e.prototype.getAccessToken=function(e,t){var o=this;if(this.version!==a.v1){var r=new n;return r.statusText="Currently this identity class is using v2 OAuth mode. You need to use getAccessTokenForScopes() method",void t(r)}var i=this.tokenCache.getForResource(e);if(i)return t(null,i.token);this.getTokenCallback=function(n,r){r?t(r):(o.decodeAccessToken(n,e),t(null,n))},this.nonce="token"+this.generateNonce(),this.state="token"+this.generateNonce();var s=document.createElement("iframe");s.style.display="none",s.id="tokenIFrame",s.src=this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&resource="+encodeURIComponent(e)+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&state="+encodeURIComponent(this.state)+"&version="+encodeURIComponent(this.version.toString())+"&nonce="+encodeURIComponent(this.nonce)+"&op=token",document.body.appendChild(s)},e.prototype.getAccessTokenForScopesAsync=function(e,t){void 0===t&&(t=!1);var n=new i;return this.getAccessTokenForScopes(e,t,function(e,t){t?n.reject(t):n.resolve(e)}),n.promise},e.prototype.getAccessTokenForScopes=function(e,t,o){var r=this;if(this.version!==a.v2){var i=new n;return i.statusText="Dynamic scopes require v2 mode. Currently this identity class is using v1",void o(null,i)}var s=this.tokenCache.getForScopes(e);if(s)return o(s.token,null);if(this.getTokenCallback=function(n,i){i?t||!i.text?o(null,i):i.text.indexOf("AADSTS65001")>=0?r.getAccessTokenForScopes(e,!0,r.getTokenCallback):o(null,i):(r.decodeAccessToken(n,null,e),o(n,null))},this.nonce="token"+this.generateNonce(),this.state="token"+this.generateNonce(),t)window.open(this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&scopes="+encodeURIComponent(e.join(" "))+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&version="+encodeURIComponent(this.version.toString())+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce)+"&op=token","_blank");else{var c=document.createElement("iframe");c.style.display="none",c.id="tokenIFrame",c.src=this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&scopes="+encodeURIComponent(e.join(" "))+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&version="+encodeURIComponent(this.version.toString())+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce)+"&login_hint="+encodeURIComponent(this.idToken.PreferredUsername)+"&domain_hint="+encodeURIComponent("9188040d-6c67-4c5b-b112-36a304b66dad"===this.idToken.TenantId?"consumers":"organizations")+"&op=token",document.body.appendChild(c)}},e.prototype.loginAsync=function(e){var t=new i;return this.login(function(e){e?t.reject(e):t.resolve(null)},e),t.promise},e.prototype.login=function(e,t){if(this.loginCallback=e,t||(t={}),t.policy&&(this.policy=t.policy),t.scopes&&this.version===a.v1){var o=new n;return o.text="Scopes can only be used with OAuth v2.",void e(o)}if(t.policy&&!t.tenant){var o=new n;return o.text="In order to use policy (AAD B2C) a tenant must be specified as well.",void e(o)}this.state="login"+this.generateNonce(),this.nonce="login"+this.generateNonce();var r=this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce)+"&version="+encodeURIComponent(this.version.toString())+"&op=login&p="+encodeURIComponent(this.policy);t.tenant&&(r+="&tenant="+encodeURIComponent(t.tenant)),this.version===a.v2&&(t.scopes||(t.scopes=[]),t.scopes.indexOf("profile")<0&&t.scopes.push("profile"),t.scopes.indexOf("openid")<0&&t.scopes.push("openid"),r+="&scopes="+encodeURIComponent(t.scopes.join(" "))),window.open(r,"_blank")},e.prototype.loginNoWindowAsync=function(e){var t=new i;return this.loginNoWindow(function(e){e?t.reject(e):t.resolve(null)},e),t.promise},e.prototype.loginNoWindow=function(e,t){this.loginCallback=e,this.state="clientId="+this.clientId+"&tokenProcessorUrl="+this.tokenProcessorUrl,this.nonce=this.generateNonce();var n=this.checkForIdentityRedirect();if(!n){var o=t?t:window.location.href.split("#")[0],r="https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token&client_id="+encodeURIComponent(this.clientId)+"&redirect_uri="+encodeURIComponent(o)+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce);window.location.href=r}},e.prototype.logOut=function(){this.tokenCache.clear();var e="https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri="+encodeURI(window.location.href);window.location.href=e},e.prototype.base64Decode=function(e){var t,n,o,r,i={},s=0,a=0,c="",h=String.fromCharCode,u=e.length,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(t=0;64>t;t++)i[l.charAt(t)]=t;for(o=0;u>o;o++)for(n=i[e.charAt(o)],s=(s<<6)+n,a+=6;a>=8;)((r=s>>>(a-=8)&255)||u-2>o)&&(c+=h(r));return c},e.prototype.generateNonce=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;32>n;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},e}();e.Identity=l;var d=function(){function e(e){this.req=null,this.accessToken=null,this.KurveIdentity=null,this.defaultResourceID="https://graph.microsoft.com",this.baseUrl="https://graph.microsoft.com/v1.0",e.defaultAccessToken?this.accessToken=e.defaultAccessToken:this.KurveIdentity=e.identity}return Object.defineProperty(e.prototype,"me",{get:function(){return new W(this,this.baseUrl)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"users",{get:function(){return new F(this,this.baseUrl)},enumerable:!0,configurable:!0}),e.prototype.Get=function(e,t,o){console.log("GET",e,o);var r=new i;return this.get(e,function(e,o){var i=JSON.parse(o);if(i.error){var s=new n;return s.other=i.error,void r.reject(s)}r.resolve(new y(i,t))},null,o),r.promise},e.prototype.GetCollection=function(e,t,o,r){console.log("GET collection",e,r);var s=new i;return this.get(e,function(e,r){var i=JSON.parse(r);if(i.error){var a=new n;return a.other=i.error,void s.reject(a)}s.resolve(new m(i,t,o))},null,r),s.promise},e.prototype.Post=function(e,t,n,o){console.log("POST",t,o);var r=new i;return r.promise},e.prototype.get=function(e,t,n,o){var r=this,i=new XMLHttpRequest;n&&(i.responseType=n),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?t(null,n?i.response:i.responseText):t(r.generateError(i)))},i.open("GET",e),this.addAccessTokenAndSend(i,function(e){e&&t(e)},o)},e.prototype.post=function(e,t,n,o,r){},e.prototype.generateError=function(e){var t=new n;return t.status=e.status,t.statusText=e.statusText,""===e.responseType||"text"===e.responseType?t.text=e.responseText:t.other=e.response,t},e.prototype.addAccessTokenAndSend=function(e,t,n){this.accessToken?(e.setRequestHeader("Authorization","Bearer "+this.accessToken),e.send()):n?this.KurveIdentity.getAccessTokenForScopes(n,!1,function(n,o){o?t(o):(e.setRequestHeader("Authorization","Bearer "+n),e.send(),t(null))}):this.KurveIdentity.getAccessToken(this.defaultResourceID,function(n,o){n?t(n):(e.setRequestHeader("Authorization","Bearer "+o),e.send(),t(null))})},e}();e.Graph=d;var p=function(){function e(){}return e.rootUrl="https://graph.microsoft.com/",e.General={OpenId:"openid",OfflineAccess:"offline_access"},e.User={Read:e.rootUrl+"User.Read",ReadAll:e.rootUrl+"User.Read.All",ReadWrite:e.rootUrl+"User.ReadWrite",ReadWriteAll:e.rootUrl+"User.ReadWrite.All",ReadBasicAll:e.rootUrl+"User.ReadBasic.All"},e.Contacts={Read:e.rootUrl+"Contacts.Read",ReadWrite:e.rootUrl+"Contacts.ReadWrite"},e.Directory={ReadAll:e.rootUrl+"Directory.Read.All",ReadWriteAll:e.rootUrl+"Directory.ReadWrite.All",AccessAsUserAll:e.rootUrl+"Directory.AccessAsUser.All"},e.Group={ReadAll:e.rootUrl+"Group.Read.All",ReadWriteAll:e.rootUrl+"Group.ReadWrite.All",AccessAsUserAll:e.rootUrl+"Directory.AccessAsUser.All"},e.Mail={Read:e.rootUrl+"Mail.Read",ReadWrite:e.rootUrl+"Mail.ReadWrite",Send:e.rootUrl+"Mail.Send"},e.Calendars={Read:e.rootUrl+"Calendars.Read",ReadWrite:e.rootUrl+"Calendars.ReadWrite"},e.Files={Read:e.rootUrl+"Files.Read",ReadAll:e.rootUrl+"Files.Read.All",ReadWrite:e.rootUrl+"Files.ReadWrite",ReadWriteAppFolder:e.rootUrl+"Files.ReadWrite.AppFolder",ReadWriteSelected:e.rootUrl+"Files.ReadWrite.Selected"},e.Tasks={ReadWrite:e.rootUrl+"Tasks.ReadWrite"},e.People={Read:e.rootUrl+"People.Read",ReadWrite:e.rootUrl+"People.ReadWrite"},e.Notes={Create:e.rootUrl+"Notes.Create",ReadWriteCreatedByApp:e.rootUrl+"Notes.ReadWrite.CreatedByApp",Read:e.rootUrl+"Notes.Read",ReadAll:e.rootUrl+"Notes.Read.All",ReadWriteAll:e.rootUrl+"Notes.ReadWrite.All"},e}();e.Scopes=p;var f=function(e,t){return e?e+(t?"&"+t:""):t},v=function(){function e(e){var t=this;this.query=e,this.toString=function(){return t.query},this.odata=function(e){return t.query=f(t.query,e),t},this.select=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return t.odata("$select="+e.join(","))},this.expand=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return t.odata("$expand="+e.join(","))},this.filter=function(e){return t.odata("$filter="+e)},this.orderby=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return t.odata("$orderby="+e.join(","))},this.top=function(e){return t.odata("$top="+e)},this.skip=function(e){return t.odata("$skip="+e)}}return e}();e.OData=v;var g=function(e,t){var n=t&&t.toString();return e+(n?"?"+n:"")},y=function(){function e(e,t){this.raw=e,this.self=t}return Object.defineProperty(e.prototype,"item",{get:function(){return this.raw},enumerable:!0,configurable:!0}),e}();e.Singleton=y;var m=function(){function e(e,t,n){this.raw=e,this.self=t,this.next=n;var o=this.raw["@odata.nextLink"];o?this.next.nextLink=o:this.next=void 0}return Object.defineProperty(e.prototype,"items",{get:function(){return this.raw.value?this.raw.value:[this.raw]},enumerable:!0,configurable:!0}),e}();e.Collection=m;var k=function(){function e(e,t){var n=this;this.graph=e,this.path=t,this.scopesForV2=function(e){return n.graph.KurveIdentity&&n.graph.KurveIdentity.getCurrentEndPointVersion()===a.v2?e:null},this.pathWithQuery=function(e,t){return void 0===t&&(t=""),g(n.path+t,e)}}return e}();e.Node=k;var R=function(e){function t(){var t=this;e.apply(this,arguments),this.pathWithQuery=function(e,n){return void 0===n&&(n=""),t._nextLink||g(t.path+n,e)}}return __extends(t,e),Object.defineProperty(t.prototype,"nextLink",{set:function(e){this._nextLink=e},enumerable:!0,configurable:!0}),t}(k);e.CollectionNode=R;var w=function(e){function t(n,o,r,i){var s=this;void 0===o&&(o=""),e.call(this,n,o+(i?"/"+i:"")),this.context=r,this.GetAttachment=function(e){return s.graph.Get(s.pathWithQuery(e),s,s.scopesForV2(t.scopes[s.context]))}}return __extends(t,e),t.scopes={messages:[p.Mail.Read],events:[p.Calendars.Read]},t}(k);e.Attachment=w;var U=function(e){function t(n,o,r){var i=this;void 0===o&&(o=""),e.call(this,n,o+"/attachments"),this.context=r,this.$=function(e){return new w(i.graph,i.path,i.context,e)},this.GetAttachments=function(e){return i.graph.GetCollection(i.pathWithQuery(e),i,new t(i.graph,null,i.context),i.scopesForV2(w.scopes[i.context]))}}return __extends(t,e),t}(R);e.Attachments=U;var C=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+(o?"/"+o:"")),this.GetMessage=function(e){return r.graph.Get(r.pathWithQuery(e),r,[p.Mail.Read])},this.SendMessage=function(e){return r.graph.Post(null,r.pathWithQuery(e,"/microsoft.graph.sendMail"),r,r.scopesForV2([p.Mail.Send]))}}return __extends(t,e),Object.defineProperty(t.prototype,"attachments",{get:function(){return new U(this.graph,this.path,"messages")},enumerable:!0,configurable:!0}),t}(k);e.Message=C;var _=function(e){function t(n,o){var r=this;void 0===o&&(o=""),e.call(this,n,o+"/messages"),this.$=function(e){return new C(r.graph,r.path,e)},this.GetMessages=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,new t(r.graph),r.scopesForV2([p.Mail.Read]))},this.CreateMessage=function(e,t){return r.graph.Post(e,r.pathWithQuery(t),r,r.scopesForV2([p.Mail.ReadWrite]))}}return __extends(t,e),t}(R);e.Messages=_;var T=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+(o?"/"+o:"")),this.GetEvent=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([p.Calendars.Read]))}}return __extends(t,e),Object.defineProperty(t.prototype,"attachments",{get:function(){return new U(this.graph,this.path,"events")},enumerable:!0,configurable:!0}),t}(k);e.Event=T;var I=function(e){function t(n,o){var r=this;void 0===o&&(o=""),e.call(this,n,o+"/events"),this.$=function(e){return new T(r.graph,r.path,e)},this.GetEvents=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,new t(r.graph),r.scopesForV2([p.Calendars.Read]))}}return __extends(t,e),t}(R);e.Events=I;var b=function(e){function t(n,o){var r=this;void 0===o&&(o=""),e.call(this,n,o+"/calendarView"),this.dateRange=function(e,t){return"startDateTime="+e.toISOString()+"&endDateTime="+t.toISOString()},this.GetCalendarView=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,new t(r.graph),[p.Calendars.Read])}}return __extends(t,e),t}(R);e.CalendarView=b;var A=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+(o?"/"+o:"")),this.GetMailFolder=function(e){return r.graph.Get(r.pathWithQuery(e),r,[p.Mail.Read])}}return __extends(t,e),t}(k);e.MailFolder=A;var x=function(e){function t(n,o){var r=this;void 0===o&&(o=""),e.call(this,n,o+"/mailFolders"),this.$=function(e){return new A(r.graph,r.path,e)},this.GetMailFolders=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,new t(r.graph),r.scopesForV2([p.Mail.Read]))}}return __extends(t,e),t}(R);e.MailFolders=x;var P=function(e){function t(n,o,r){var i=this;void 0===o&&(o=""),e.call(this,n,o+"/photo"),this.context=r,this.GetPhotoProperties=function(e){return i.graph.Get(i.pathWithQuery(e),i,i.scopesForV2(t.scopes[i.context]))},this.GetPhotoImage=function(e){return i.graph.Get(i.pathWithQuery(e,"/$value"),i,i.scopesForV2(t.scopes[i.context]))}}return __extends(t,e),t.scopes={user:[p.User.ReadBasicAll],group:[p.Group.ReadAll],contact:[p.Contacts.Read]},t}(k);e.Photo=P;var S=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/manager"),this.GetManager=function(e){return o.graph.Get(o.pathWithQuery(e),o,o.scopesForV2([p.User.ReadAll]))}}return __extends(t,e),t}(k);e.Manager=S;var W=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,o?n+"/"+o:n+"/me"),this.graph=t,this.GetUser=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([p.User.Read]))}}return __extends(t,e),Object.defineProperty(t.prototype,"messages",{get:function(){return new _(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"events",{get:function(){return new I(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"calendarView",{get:function(){return new b(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mailFolders",{get:function(){return new x(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"photo",{get:function(){return new P(this.graph,this.path,"user")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"manager",{get:function(){return new S(this.graph,this.path)},enumerable:!0,configurable:!0}),t}(k);e.User=W;var F=function(e){function t(n,o){var r=this;void 0===o&&(o=""),e.call(this,n,o+"/users"),this.$=function(e){return new W(r.graph,r.path,e)},this.GetUsers=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,new t(r.graph),[p.User.Read])}}return __extends(t,e),t}(R);e.Users=F}(kurve||(kurve={}));