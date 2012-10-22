// ==UserScript==
// @name           RedMineBoost
// @namespace      a
// @include        http://redmine.csgbox.com*
// @include        http://pm.csgbox.com*
// @include        http://redmine-dev.csgbox.com*
// @author         Pawel 'lord_t' Maruszczyk
// @version        22.0
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @grant GM_deleteValue
// ==/UserScript==
    
//============================================================================================

var ver = 'redminebooster.version.22';

//== local GM storage 4 chrm
if (typeof GM_deleteValue == 'undefined') {  
GM_addStyle = function(css){var style = document.createElement('style'); style.textContent = css; document.getElementsByTagName('head')[0].appendChild(style);};
GM_deleteValue = function(name){localStorage.removeItem(name);};
GM_getValue = function(name,defaultValue){ var value = localStorage.getItem(name); if (!value) {return defaultValue;} var type = value[0]; value = value.substring(1); switch (type) { case 'b': return value == 'true'; case 'n': return Number(value); default: return value; } };
//GM_log=function(message){console.log(message);};
//GM_openInTab = function(url) { return window.open(url, "_blank");};
//GM_registerMenuCommand=function(name, funk){};
GM_setValue = function(name, value){value = (typeof value)[0] + value; localStorage.setItem(name, value);};
}

//for settings
function getStoredValue(setingName, defau) {
	
	if (typeof GM_getValue(setingName) != 'undefined' && GM_getValue(setingName) !== null) { 
		return GM_getValue(setingName);
	} else {
		return defau;
	}
	
}

//settings
var nameFirst 		= getStoredValue('snf', true);
var fixedHeader		= getStoredValue('sfh', true);
var colouredHeader	= getStoredValue('sch', true);
var mediumAvatars 	= getStoredValue('sma', false);
var fullName		= getStoredValue('sfn', false);
var subtaskAsCtrlN	= getStoredValue('sns', true);
var subtaskCollpsd	= getStoredValue('ssc', false);
var timeLogsRemovd	= getStoredValue('tlr', true);
var savingComEdits	= getStoredValue('sce', false);
var newHistFotrmat	= getStoredValue('nhf', true);

//colors
var memoryKey = 'colors2';
function getStoredColor(taskid) {

	var colors;
	taskid = taskid.split('#')[1];
	
	try {
		colors = JSON.parse(getStoredValue(memoryKey, undefined));
	} catch (e) {
		colors = false;
	}
	
	return colors && colors['#'+taskid];
}

function storeColor(taskid, color) {
	
	var colors;
	try {
		colors = JSON.parse(getStoredValue(memoryKey, undefined));
	} catch (e) {
		colors = false;
	}
	if (!colors) {
		colors = {};
	}
	
	colors[taskid] = color;
	GM_setValue(memoryKey, JSON.stringify(colors));
	//console.log(GM_getValue(memoryKey), JSON.stringify(colors));
}

//functions
function getElementsByClassName (cn,ctx) {
    var arr = []; 
	ctx = ctx || document;
    var els = ctx.getElementsByTagName("*");
    var exp = new RegExp("^(.* )?"+cn+"( .*)?$", "g");
    for (var i = 0; i < els.length; i++ ){
        if (exp.test(els[i].className)){
            arr.push(els[i]);
        }
    }
  return arr;
}

function getById(i) {
    return document.getElementById(i);
}

function createElement(e) {
    return document.createElement(e);
}
function replacePL(s) {
    return s.replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/ż/g,'z').replace(/ź/g,'z');
}
function MD5(s) {function L(b,a){return(b<<a)|(b>>>(32-a))}function K(k,b){var F,a,d,x,c;d=(k&2147483648);x=(b&2147483648);F=(k&1073741824);a=(b&1073741824);c=(k&1073741823)+(b&1073741823);if(F&a){return(c^2147483648^d^x)}if(F|a){if(c&1073741824){return(c^3221225472^d^x)}else{return(c^1073741824^d^x)}}else{return(c^d^x)}}function r(a,c,b){return(a&c)|((~a)&b)}function q(a,c,b){return(a&b)|(c&(~b))}function p(a,c,b){return(a^c^b)}function n(a,c,b){return(c^(a|(~b)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(k){var G;var d=k.length;var c=d+8;var b=(c-(c%64))/64;var F=(b+1)*16;var H=Array(F-1);var a=0;var x=0;while(x<d){G=(x-(x%4))/4;a=(x%4)*8;H[G]=(H[G]|(k.charCodeAt(x)<<a));x++}G=(x-(x%4))/4;a=(x%4)*8;H[G]=H[G]|(128<<a);H[F-2]=d<<3;H[F-1]=d>>>29;return H}function B(c){var b="",d="",k,a;for(a=0;a<=3;a++){k=(c>>>(a*8))&255;d="0"+k.toString(16);b=b+d.substr(d.length-2,2)}return b}function J(b){b=b.replace(/\r\n/g,"\n");var a="";for(var k=0;k<b.length;k++){var d=b.charCodeAt(k);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()}

function getCsgMail(name, name1st) {

	if (name.indexOf('@') > -1) {
		return name;
	}

    var n = name;
    if (!name1st) {
		n = n.split(' ').reverse().join(' ');
    }
    
    return replacePL(n.replace(' ','.').toLowerCase()).replace(/[^\.a-z]/g,'') + '@cantstopgames.com';
    
}

function getGravatar(mail, size) {
    size = size || 18;
    return 'http://www.gravatar.com/avatar/' + MD5(mail)+ '?rating=PG&size=' + size;
}

function showSaving() {
	var saving  = createElement('div'),
		th		= createElement('img');
	th.className		= 'rmSavingThrob';
	th.src 				= '/images/loading.gif';
	saving.id  			= 'rmSaving';
	saving.appendChild(th);
	saving.appendChild(document.createTextNode('Saving...'));
	document.body.appendChild(saving);
}

function getSubtaskIndent(tr) {

	var r = parseInt( tr.className.substr( tr.className.indexOf('idnt-')+5, 1), 10);
	if (isNaN(r)) {
		r = 0;
	}
	return r;
}

function isFirstChildOfSecond(c,p) {
		//console.log('--------');
	while (c.parentNode) {
		//console.log(c.parentNode, p);
		if (c.parentNode == p) {
			return true;
		} else if (c.parentNode == document.body) {
			return false;
		}
		
		c = c.parentNode;
	}
	return false;
}

// /functions

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToARGB(s){

    s += '123456123456';
    i = hashCode(s);
    return ((i>>24)&0xFF).toString(16) + 
           ((i>>16)&0xFF).toString(16) + 
           ((i>>8)&0xFF).toString(16);// + 
           //(i&0xFF).toString(16);
}


try {

    var s = createElement('div'), v;
    document.body.appendChild(s);
    v = '<style type="text/css">';
	//v += 'tr.issue.idnt-2 td.subject:before{content:"<div>asd</div>";display:block;}';
	v += '.rmCell{width:14px;color:black;text-shadow:-1px -1px #fff;cursor:auto;}.rmCollapse{cursor:pointer;}';
	v += '#rmSaving{border-bottom: 1px solid gray;position:fixed; top:0; left:0px; width:100%;line-height:30px; height:30px; text-align:center; background:white; z-index:1002;}';
	v += '#rmSaving img{margin-right:10px;}';
    v += '.rmServerOffline.rmNewVersionAvailable{display:none !important;} ';
    v += '.rmNewVersionAvailable{display:block !important;font-weight:bold;margin:0 30px;} ';
	v += '#top-menu .rmNewVersionAvailable a {color:red;background:white;}';
    v += '.rmbPreview{width:500px;position:fixed;left:300px;top:20px;display:none; z-index:1100;}';
    v += 'input[type="button"].butSelected{background-color:CornflowerBlue;}';
    v += '.dnone, .rmColorBoxA > div.dnone{display:none;} .dblock{display:block;}';
    v += '.asi{background-repeat:no-repeat;padding:0 2px 0 18px;width: 115px;height:21px; text-align:left;} .rmAsi2{width:115px;}';
    v += '.rmBlocker, .rmDuplikat, .rmTestDevWait{color:red; position:absolute; top:5px; left:158px; -webkit-transform: rotate(-20deg); -moz-transform: rotate(-20deg);} .rmDuplikat{left:240px; color:green;} .rmTestDevWait{left:304px; color:blue; width:165px;}';
    v += '.rmH2Improved{position:relative;width:30%;}';
    v += '#rmFixed{position:fixed;left:0;top:350px;width:16px; height:300px;}';
    v += '#rmFixed > div{width:300px;text-align:center;color:black; position:absolute; top:140px; left:-144px; font-size:15px;-webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg);}';
    v += '.rmListAvatar, .rmListAvatarMedium{height:20px;float:left;background:no-repeat; padding-left:22px; width:115px; text-align:left;}';
    v += '.rmListAvatarMedium{height:28px; padding-left:34px; width:100px;line-height: 14px;}';
	v += '.rmSave{margin:4px;cursor:pointer; background:#44617F; width:220px; border:1px solid #fff; height:20px;text-align:center;line-height:20px;}';
	v += '.rmButtonSwitcher{cursor:pointer;color:#2A5685;}';
	v += '#context-menu{z-index:1005 !important;}';
	v += '.rmNew{color:red;background:white;}';
	
	if (fullName && !mediumAvatars) {
		v += '.rmListAvatar{width:160px;}';
	}
	
	v += '.assigned_to{padding:0;} .folder{height:30px;} .folder > a{border:0 !important; height:29px;}';
    v += '.rmSetSwitch{float:right;margin-right:0.5em; font-weight:bold; cursor:pointer; position:relative;} .rmSetSwitch:hover{text-decoration:underline;} .rmOpened{text-decoration:none !important;}';
    v += '.rmSettings{cursor:auto; font-family:Courier;border-top:1px solid #fff; font-size:13px;top:0px;left:-150px; position:absolute; width:604px;  background:#2C4056; }';
    v += '.optOn, .optOff { cursor:pointer;}';
    v += '.optOn .on, .optOff .off{display:inline;} .optOn .off, .optOff .on{display:none;}';
    v += '#header{position: relative; z-index:1000;} #top-menu{position: relative; z-index:1001;}';
    v += '.rmColorBoxA:hover > div{text-decoration:underline;} .rmColorBoxA > div{display:inline-block;} .rmColorBoxA {position:relative;cursor:pointer;}';
    v += '.rmColorBox{position:relative;border:1px solid gray; width:11px; height:11px;top:3px; margin-right:4px;}';
    v += '.rmColorPicker{background:white;width:240px;outline:1px solid black;position:absolute; top:0px; right:0px; border:10px solid white;}';
    v += '.rmColorPicker > div{float:left;}.divPaltteColor{width:30px; height:40px;border:0; float:left;}';
    v += '#context-menu a.rmColorBoxA{padding:1px 0 1px 3px;}';
    v += '#context-menu a.rmColorBoxA:hover > div.rmColorPicker{display:inline-block;}';
    
    if (fixedHeader) {
		v += '#quick-search{padding-right:17px;}';
		v += '#account{padding-right:11px;}';
        v += '#wrapper2{padding-top:87px;}';
        v += '#top-menu{position: fixed !important; top:0em;width:99%;}';
        v += '#header{position: fixed !important; top:1.6em;width:99%;border-bottom:6px solid #eee;} ';
    }
    
	if (newHistFotrmat) {
		v += '#history h4{width:230px; float:left; margin:0; padding:0;}';
		v += '#history .journal{margin:0; padding:0; }';
		v += '#history .details{width:auto; margin:0; padding:0 0 0 240px;}';
        v += '#history h4 img.gravatar{border:#eee solid; border-width:0 1px 1px 1px; margin:0 0 1px; float:left;}';
        v += '#history h4 .rmHistoryDiv{ float:left; margin-left:7px; width: 170px;}';
        v += '#history h4 .rmHistoryDiv .rmDate{color:#444;} #history h4 div .rmDate:hover{color:#C61A1A;}';
        v += '#history h4 a.journal-link{float:right;color:white;} #history div:hover h4 a.journal-link:hover{color:#C61A1A;}';
        v += '#history > div.rmHistoryDivOdd h4 a.journal-link{color:#eee;}';
        v += '#history div:hover h4 a.journal-link{color:#2A5685;}';
        v += '#history > div:hover,#history > div.rmHistoryDivOdd:hover {background:#ddd; }';
        v += '#history p {margin-bottom:0; margin-top:0; padding-bottom:12px;}';
        v += '#history > div{min-height:36px; border-top:1px solid #eee;}';
        v += '#history > div.rmHistoryShort{border-top:0;}';
        v += '#history > div.rmHistoryDivOdd{background:#eee;}';
        v += '#history .journal .wiki{padding-left:225px;}';
        v += '#history .rmHistoryShort h4 img{height:28px; opacity:0.5;margin: 0 2px; border:0;}';
        v += '#history .rmHistoryShort .rmArchiver{display:none;}';
        v += '#history div.wiki pre{margin-left:225px;}';
		v += '#history blockquote{margin-left: 250px;} #history div.rmHistoryDivOdd blockquote,#history > div:hover blockquote{border-color:#bbb;}';
		v += '#history blockquote blockquote{margin-left:10px;} #history blockquote p {padding-left:10px;}';
    }
	
    v += '</style>';
    s.innerHTML = v;

} catch (e) {console.log(e);}

//doklejanie id ticketa do tytulu i do tagu title
try {

    var c = getById('content'),
        numb, //used also in binding colors
        type = c.getElementsByTagName('h2')[0].innerHTML,
        subj = c.getElementsByTagName('h3')[0],
        titl = document.getElementsByTagName('title')[0];

    type = type.split(' ');
    numb = type[1] || '';

    if ( isNaN(parseInt( numb.substring(1), 10 )) ) {
        numb = '';
    }

	if (subj) {	subj.innerHTML = numb + ' ' + subj.innerHTML.replace("'",'`'); }
    if (titl) {	titl.innerHTML = numb + ' ' + titl.innerHTML; }
    
} catch(e) {console.log(e);}

//wyswietlanie obrazkow jako ~miniatury
try {

    var hrefs    = document.getElementsByTagName('a'),
        imghrefs = [], i, j;
            
    for (i = 0; i < hrefs.length; ++i) {
        if (hrefs[i].href.match(/\.png|\.jpg|\.jpeg|\.gif|\.PNG|\.JPG|\.JPEG|\.GIF/) ) {
            imghrefs.push(hrefs[i]);
        }
    }

    for (j = 0; j < imghrefs.length; ++j) {

        var tmp = createElement('img'),
            aEl = imghrefs[j];
            
        tmp.src = aEl.href;
        tmp.className = 'rmbPreview';
            
        aEl.parentNode.style.position = 'relative';
        aEl.parentNode.insertBefore(tmp, aEl);
        
        aEl.addEventListener('mouseover', function(){this.previousElementSibling.style.display = 'block';}, false);
        aEl.addEventListener('mouseout',  function(){this.previousElementSibling.style.display = 'none';}, false);

    }
    
} catch (e) {console.log(e);}

//skroty
try {
    
    var SPECIAL_KEYS 	= {shift:0, ctrl:0, alt:0},
        updateDiv   	= getById('update'),
        searchField 	= getById('q');

    function showEdit(withMore) {

        if (updateDiv) {
		
			if (withMore) {
				var more = getById('issue_description_and_toolbar');
				more.style.display = 'block';
			}
			
			updateDiv.style.display = 'block';
			window.scrollTo(0, parseInt(updateDiv.offsetTop - 100,10));

			return false;
		}
		
		return true;
    }
    
function KeyCheckUp(e) {

    if (e.keyCode == 16 ||
        e.keyCode == 17 ||
        e.keyCode == 18
    ) {
    
        switch (e.keyCode) {
            case 16: SPECIAL_KEYS.shift = 0; break;
            case 17: SPECIAL_KEYS.ctrl  = 0; break;
            case 18: SPECIAL_KEYS.alt   = 0; break;
        }
        
    }
    return;
    
}
   
function searchForCommentAndSaveOne() {

	if (savingComEdits) {
	
		var res = false;
		
		try {
		
			var history = getById('history').getElementsByTagName('form');
		
			//if there is more than one don`t know which save
			if (history.length == 1) {
				
				var form = history[0];
				form.submit();
				
				res = true;
			
			}
			
		} catch (e) {
			res = false;
		}

	} else {
		res = false;
	}
	
	return res;
	
}  
	
function KeyCheckDown(e) {

    var path    = [],
        el      = e.target;
        
    do {
        path.unshift(el.nodeName + (el.className ? ' .' + el.className : '') + ' #' + el.id);
    } while ((el.nodeName.toLowerCase() != 'body') && (el = el.parentNode));

    path = path.join(" ");
    //console.log(path);

	SPECIAL_KEYS.meta 	= 0 + e.metaKey;
	SPECIAL_KEYS.ctrl 	= 0 + e.ctrlKey;
	SPECIAL_KEYS.alt 	= 0 + e.altKey;
	SPECIAL_KEYS.shift 	= 0 + e.shiftaKey;
    
    if (!SPECIAL_KEYS.shift && !SPECIAL_KEYS.ctrl && !SPECIAL_KEYS.alt) {
        if (path.indexOf('update') > -1             ||
            path.indexOf('new-relation-form') > -1  ||
            path.indexOf('INPUT') > -1      ||
            path.indexOf('TEXTAREA') > -1   ||
            path.indexOf('notes') > -1      ||
            path.indexOf('query_name') > -1 ||
            path.indexOf('my_account_form') > -1
        ) {
            return;
        }
        
    }

    var keyShortcut = '' + String.fromCharCode(e.keyCode).replace(' ','').toLowerCase();
   
    //numbers detect
	
    if ( (e.keyCode >= 48 && e.keyCode < 57 ) ||
         (e.keyCode >= 96 && e.keyCode < 105)
    ) {
        keyShortcut = 'number';
    }
    
    keyShortcut += (SPECIAL_KEYS.shift? '+SHIFT' : '') + (SPECIAL_KEYS.ctrl? '+CTRL' : '') + (SPECIAL_KEYS.alt? '+ALT' : '') + (SPECIAL_KEYS.meta? '+META' : '');

    switch (keyShortcut) {
    
        case 'e':   if (updateDiv) {
                        showEdit(0);
                    } else {
                        
                        //edycja wiki
                        if (document.body.className.indexOf('controller-wiki') > -1) {
                            location.href = getElementsByClassName('icon-edit')[0].href;
                        } else if (document.body.className.indexOf('controller-issues') > -1) {
                            location.href = getElementsByClassName('icon-edit')[0].href;
                        }
                        
                    }
                    
                    break;
		case 'c':   if (updateDiv) {
		
                        showEdit(0);
						getById('notes').focus();
						//.focus();
						
                    }
                    
                    break;
        case 'm':   showEdit(1);  break;
        case 'n':   location.href = getElementsByClassName('new-issue')[0].href;  break;
        case 'r':   
                    var relation = getById('new-relation-form');
            
                    relation.style.display = 'block';
                    window.scrollTo(0 ,parseInt(relation.offsetTop,10) - 130);
                    
                    setTimeout(function() {
                        getById('relation_issue_to_id').focus();
                    }, 10);
                    
                    break;
                    
        case 'number':  
                        var code = e.keyCode;
                        if (code > 96) {
                            code -= 48;
                        }
                        
                        searchField.focus();
                        if (searchField.value === "") {
                            searchField.value = String.charFromCode(code);
                        }
                        
                        break;
        
        case 's+CTRL':
        case 's+META':
			
			//first try to save comment
			var saveComment = searchForCommentAndSaveOne();
			
			if (!saveComment) {
				try { getById('issue-form').submit(); showSaving(); } catch (e) {console.log(e);}
				try { getById('move_form').submit();  showSaving(); } catch (e) {console.log(e);}
			}

        break;        
		case 'n+CTRL':
		case 'n+META':
		
			if (subtaskAsCtrlN) {
				var newSub = getById('issue_tree').getElementsByTagName('a')[0];
				location.href = newSub.href;
			}
			
        break;
        default:
        //console.log(33);
            //shortcut not captured
            return true;
    }
    
    e.preventDefault();
    e.stopPropagation();
  
    
}
////window.addEventListener('keyup',   KeyCheckUp, false);
////window.addEventListener('keydown', KeyCheckDown, false);

document.onkeyup= KeyCheckUp;
document.onkeydown = function(e) {KeyCheckDown(e);};

} catch (e) {console.log(e);}

//fix  scroll to when fixed header is turned on
try {
	
	if (fixedHeader) {
	
		var elems = getElementsByClassName('icon-edit');
		for (var i = 0, ci = elems.length; i < ci; ++i) {
			elems[i].onclick = function(){return showEdit(0);};
		}
	
	}
	
} catch(e) {console.log(e);}

//update checker
try {

    var updateUrl   = 'http://hrabstwo.net/hornet/js/' + ver,
		aliveUrl    = 'http://hrabstwo.net/hornet/js/redminebooster.alive.gif',
        fileUrl     = 'http://hrabstwo.net/hornet/js/redmineboost.user.js',
        scr         = createElement('div');
        
    getById('top-menu').appendChild(scr);

    scr.innerHTML = '<div class="dnone">' +
					'<a href="' + fileUrl + '">Download RedmineBoost update (click & install)!</a></div>' +
					'<img class="dnone" src="' + aliveUrl  + '" onerror="this.parentNode.firstChild.className+=\' rmServerOffline\';" >' +
					'<img class="dnone" src="' + updateUrl + '" onerror="this.parentNode.firstChild.className+=\' rmNewVersionAvailable\';" >';

}catch(e){console.log(e);}

//order selects
try {

function orderSelect(selectElemID) {

    var alphabet = '&>AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻaąbcćdeęfghijklłmnńoóprsśtuwxyz',
        se = document.getElementById(selectElemID),
        op,
        oa  = [];
        
	if (se) {
		op = se.getElementsByTagName('option');
	}
		
    for (var i in op) {
        if (op[i].nodeName) {
            oa.push(op[i]);
        }
    }
    
    oa.sort(function(a, b) {
        
        var index = !nameFirst + 0,
            aa = a.innerHTML.split(' ')[index] || '',
            bb = b.innerHTML.split(' ')[index] || '';
        
        for (var i = 0, ca = aa.length, cb = bb.length ; i<ca && i <cb; ++i) {
        
            if ( alphabet.indexOf(aa[i]) != alphabet.indexOf(bb[i]) ) {
                return alphabet.indexOf(aa[i]) - alphabet.indexOf(bb[i]);
            }
        }
        
    });
    
    for (var i in oa) {
    
        try {
            
            if (!nameFirst) {
                oa[i].innerHTML = oa[i].innerHTML.split(' ').reverse().join(' ');
            }
            
        } catch(e){}
            
		if (oa[i].innerHTML.indexOf('RTT') > -1) {
			oa[i].parentNode.removeChild(oa[i]);
		} else {
			se.appendChild(oa[i]);
		}
        
    }

}

} catch(e){console.log(e);}

// buttons
var allButtonsGlob = {};
try{

    function cutName(name, revert) {
		
        var tmp, tmp2;
		
		if (name.match(/>>/)) {
			return name;
		}
		
        tmp = name.split(' ');
        
        if (revert) {
            tmp.reverse();
        }
        
        if (tmp.length < 2) {
            return name;
        }
        
        tmp2 = tmp[1].substring(0,2);
        tmp[1] =  ( (tmp2 == 'Ch' ) ? tmp[1].substring(0,2) : tmp[1].substring(0,1) )+ '.';
        
        return tmp.join(' ');
    }

    function select2button(selectIDDD, avatars) {
        
		try{
		
        ////
        var swch        = createElement('span'),
            userid      = getById('loggedas').getElementsByTagName('a')[0].innerHTML,
            selme       = getById(selectIDDD),
            GM_key      = selectIDDD + '_gm_key';
            
		} catch (e) {console.log(e);}
	
        allButtonsGlob[selectIDDD]  = GM_getValue(GM_key);

        //switcher
		swch.className = 'rmButtonSwitcher';
        swch.title     = 'list / buttons';
        swch.innerHTML = allButtonsGlob[selectIDDD] == 1 ? ' [ ]' : ' [#]';
        swch.onclick = (function(selectIDDD, allButtonsGlob) { 
        
            return function() {

                allButtonsGlob[selectIDDD] = !allButtonsGlob[selectIDDD];
                buttonize(selectIDDD, allButtonsGlob[selectIDDD]);
                GM_setValue(GM_key, allButtonsGlob[selectIDDD]);

                swch.innerHTML = allButtonsGlob[selectIDDD] == 1 ? ' [ ]' : ' [#]';
                
            };
			
        })(selectIDDD,allButtonsGlob);
        
        if (selme) {
			selme.previousElementSibling.appendChild(swch);
		}

        function buttonize(selectID, onlyme) {
        
            var contName = selectID + '_cont',
                selme = getById(selectID),
                cont  = getById(contName);
            
            if (typeof onlyme == 'undefined') {
                onlyme = false;
            }
			
			if (!selme) {
				return;
			}
                
            if (!cont) {
            
                cont 	= createElement('span');
                cont.id = contName;
                for (var i = 0; i < selme.childNodes.length; ++i) {
                
                    var opt = selme.childNodes[i], 
						el,
						optVal;
						
                    if (opt.nodeName != 'OPTION') {
                        continue;
                    }
                
                    el = createElement('input');
                    
					optVal = opt.innerHTML.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
					
                    el.type  = 'button';
                    el.title = (selectID == 'issue_assigned_to_id') ? optVal : '';
                    el.value = (selectID == 'issue_assigned_to_id') ? cutName(optVal) : optVal;
                    el.rel   = opt.value;
                    
                    if (avatars && opt.innerHTML !== '') {
                    
						if (optVal.match(/<</)) {
							optVal = userid;
						}
						
                        el.className = 'asi';
                        el.style.cssText = 'background-image:url(' + getGravatar( getCsgMail(optVal, nameFirst) ) + ')';
    
                    } else if (opt.innerHTML === '') {
                        
                        el.className = 'rmAsi2';
                    
                    }
                    
                    if (opt.selected) {
                        el.className += ' butSelected';
                    }
                    
                    cont.appendChild(el);

                }
                
                selme.parentNode.appendChild(cont);
                selme.parentNode.onclick = function (e) {
					
                     if (e.target.nodeName == 'INPUT') {
            
                        for (var i = 0; i < cont.childNodes.length; ++i) {
                            if (cont.childNodes[i].value !== '') {
                                cont.childNodes[i].className =  avatars ? 'asi' : '';
                            } else if (cont.childNodes[i].className.indexOf('rmAsi2') > -1) {
                                cont.childNodes[i].className =  'rmAsi2';
                            }
                        }

                        for (var i = 0; i < selme.childNodes.length; ++i) {
                            
							if (selme.childNodes[i].nodeName != 'OPTION') {
								continue;
							}
							
                            if (selme.childNodes[i].value == e.target.rel) {
							
                                selme.childNodes[i].selected = "selected";
                                e.target.className += ' butSelected';
								
                            } else {
                                selme.childNodes[i].removeAttribute('selected');
                            }
                            
                        }
                        
                    }
                    
                };
                
            }
        
            if (!onlyme) {
                selme.className = 'dnone';
            } else {
                selme.className = '';
                cont.parentNode.removeChild(cont);
            }
            
        }
        
		
        buttonize(selectIDDD, allButtonsGlob[selectIDDD]);
        
    }
    
    function s2b() {
    
		orderSelect('issue_assigned_to_id');
	
        //select2button('issue_done_ratio');
        select2button('issue_status_id');
        select2button('issue_priority_id');
        select2button('issue_assigned_to_id',1);
        
        //procent wykonania - button 100%
        var but100 = createElement('input'),
            sel100 = getById('issue_done_ratio');
			
        if (sel100) {
		
			but100.type  = 'button';
			but100.value = '100%';
			but100.onclick = function(){
				sel100.childNodes[sel100.childNodes.length-1].selected = "selected";
			};
			sel100.parentNode.appendChild(but100);
			
		}	
        
    }
    
    s2b();
    
	//additional selects change while changing tracker (in new issue)
	var iti = getById('issue_tracker_id');
	if (iti) {
	
		iti.onchange = function() {
			setTimeout(s2b, 900);
		};
		
    }
	
}catch(e){console.log(e);}

//test if is blocked, duplicated or test_dev_wait
try {

    var isBlocked   	= false,
        isDuplicate 	= false,
        isTestDevWait 	= false,
        rels 			= getById('relations'),
		h2 				= getById('content').getElementsByTagName('h2')[0],
		dp;
		
	if (rels) {
		
		var trs = rels.getElementsByTagName('tr'),
			a,
		    tds;
			
		for (var i = 0, ci = trs.length; i < ci; i++) {
			
			tds = trs[i].getElementsByTagName('td');
			a   = tds[1].getElementsByTagName('a')[0];
			
			if (tds[1].innerHTML.match(/.*(blocked by|zablokowane przez).*/) &&
				a.className.indexOf('closed') == -1
			) {
				isBlocked = true;
			}
			
			if (tds[1].innerHTML.match(/.*(duplicates|duplikuje).*/)) {
				isDuplicate = true;
			}
		
		}
			
		if (isBlocked) {
			
			var bl = createElement('div');
			dp = createElement('div');
			h2.className = 'rmH2Improved';
			h2.appendChild(bl);
			bl.className = 'rmBlocker';
			bl.innerHTML = 'BLOCKED!';
			
		}
		
		if (isDuplicate) {
			
			dp = createElement('div');
			h2.className = 'rmH2Improved';
			h2.appendChild(dp);
			dp.className = 'rmDuplikat';
			dp.innerHTML = 'DUPLICATE';
			
		}
		
	}
	
	//suspended status
	var status = document.getElementsByTagName('td'),
		cs = status.length;
			
	for (var q = 0; q < cs; ++q) {
	
		var parentQth = status[q].parentNode.getElementsByTagName('th');
		if (status[q].className == 'status' && parentQth.length) {
		
			if (status[q].innerHTML.match(/.*(suspended).*/i) ) {
			
				isTestDevWait = true;
				break;
				
			}
		
		}
		
	}
		
	if (isTestDevWait) {
		
		dp = createElement('div');
		h2.className = 'rmH2Improved';
		h2.appendChild(dp);
		dp.className = 'rmTestDevWait';
		dp.innerHTML = 'SUSPENDED';
		
	}

} catch(e){console.log(e);}

//add colored box with name of project
try {
    
	if (colouredHeader) {
	
		var proj = getById('quick-search').getElementsByTagName('option'),
			hd   = getById('header'),
			hdmargin 	= createElement('div'),
			fii  		= createElement('div');
			
		hdmargin.className = 'rmHdmargin';
		hd.appendChild(hdmargin);
			
		for (var i = 0, ci = proj.length; i < ci; ++i) {
			
			if (proj[i].selected && proj[i].value !== '') {
				
				fii.innerHTML = proj[i].innerHTML;
				hd.style = '';
				hd.style.backgroundColor = '#'+ intToARGB(fii.innerHTML);
				//-alert(MD5(fii.innerHTML));
				break;
				
			}
			
		}
		
	}

} catch(e){console.log(e);}

//avatars on issues list & assignee modifications && collapsing nested tasks
try {

    var preissues 	= getElementsByClassName('issues'),
		collapsable	= [],
        issues 		= [],
        td 			= [];
        
    for (var i in preissues) {
        
        if (preissues[i].nodeName.toLowerCase() == 'table') {
            issues.push(preissues[i]); 
        }
        
    }
    
	//avatars
	try {
	
		//-for (var j in issues) {
		
			var col = /*issues[j].*/getElementsByClassName('assigned_to');
			for (var k in col) {
			
				var ahr = col[k].getElementsByTagName('a'),
					dv,
					name;
					
				if (ahr[0]) {
				
					name = ahr[0].firstChild.textContent;
					dv = createElement('div');
					dv.className = 'rmListAvatar' + (mediumAvatars ? 'Medium' : '');
					dv.style = '';
					
					if (fullName) {
						if (mediumAvatars) {
							dv.innerHTML = name.replace(/\s/, '<br>');
						} else {
							dv.innerHTML = name;
						}
					} else {
						dv.innerHTML = cutName(name, !nameFirst );
					}

					dv.style.backgroundImage = 'url(' + getGravatar( getCsgMail(name,1), mediumAvatars ? 28 : 20 ) + ')';
					ahr[0].innerHTML = '';
					ahr[0].appendChild(dv);
				
				}
				
			}
		//-}
		
    } catch(e){console.log('avatars', e);}
    
	//collapsing nested tasks
	try{
	
		var lastGroupColor = [],
			lastGroupIndex = 0,
			curGroupIndex  = 0;
			
		for (var k in issues) {
		
			var tb,
				withTHead,
				tbody = issues[k].getElementsByTagName('tbody'),
				thead = issues[k].getElementsByTagName('thead');
				
			if (thead.length) {
				break; //as return
			} else {
			
				tb 			= issues[k].rows;
				withTHead 	= false;
				
			}
		
			for (var u = 0, cu = tb.length; u < cu; ++u) {
				
				if (tb[u] && 
					tb[u].nodeName && 
					tb[u].nodeName.toLowerCase() == 'tr'
				) {
				
					var cell 	= tb[u].insertCell(1),
						taskno = /*tb[u].*/getElementsByClassName('subject', tb[u])[0].getElementsByTagName('a')[0].innerHTML;
					
					cell.className = 'rmCell';
					curGroupIndex = getSubtaskIndent(tb[u]);
					
					var md5_1 = getStoredColor(taskno);
						
					if (taskno.toLowerCase().indexOf('group') 	> -1 ||
						taskno.toLowerCase().indexOf('feature') > -1
					) {
					
						if (curGroupIndex > lastGroupIndex+1) {
							lastGroupColor = [];
						} else if (curGroupIndex == lastGroupIndex) {
							lastGroupColor.shift();
						}						
					
						var m5 = md5_1 || '#' + MD5(taskno).substring(0,6);
						lastGroupColor.unshift(m5);
						lastGroupIndex = curGroupIndex;
						cell.innerHTML = '-';
						cell.className += ' rmCollapse rmGOpen';
						cell.style.background = lastGroupColor[0];
						
						if (subtaskCollpsd) {
							collapsable.unshift(tb[u]);
						}
						
					} else {
						
						if (curGroupIndex == lastGroupIndex) {
							lastGroupColor.shift();
						}		
					
						if (curGroupIndex >= lastGroupIndex) {
							var m5 = md5_1 || lastGroupColor[0];
							cell.style.background = m5;
						}
						
					}
					
				}
				
			}
			
		}
		
	} catch(e){console.log('collapsing nested tasks', e);}	
	
	function changeRowsState(startRow, idntClassIndex, close) {
	
		try {
		
			var n,
				lastParentIsOpen = [(startRow.getElementsByTagName('td')[1].className.indexOf('rmGOpen') == -1) || !close],
				lastParentIndex;
	
			while (n = startRow.nextSibling) {
			
				startRow = n;
				if (n.nodeName.toLowerCase() != 'tr') {
					continue;
					
				} else if (n.className.indexOf('idnt-') > -1) {

					//get idnt index
					var ii 			= getSubtaskIndent(n),
						td1			= n.getElementsByTagName('td')[1].className,
						isCollapseRow 	= td1.indexOf('rmCollapse') > -1,
						isOpenRow 		= td1.indexOf('rmGOpen') 	> -1; 		//is open = has class rmGOpen
					
					if (ii <= lastParentIndex) {
						lastParentIsOpen.shift();
					}
					
					if (isCollapseRow) {
						lastParentIsOpen.unshift(isOpenRow);
						lastParentIndex  = ii;
					}
				
					
					if (ii == idntClassIndex && ii != 1) {break;}
					
					//if row has grater or equal indent than current - only descendants and ~siblings~
					if (ii >= idntClassIndex ) {
						
						if ((isCollapseRow 
							&& lastParentIsOpen[1] == true 
							)
							|| //it is group
							(					//it is not a group &&parent is open
								!isCollapseRow &&
								lastParentIsOpen[0] == true
							)
						) {
							
							//if element is visible
							if (!n.style.display) {
								n.style.display = 'none';
							} else if (!close) {
								n.style.display = '';
							}
							
						}
						
					} else {
						break;
					}
					
				} else {
					break;
				}
				
			}
			
		}catch(e){console.log('changeRowsState',e);}
		
	}
	
	function collapsing (e) {
	
		try{
	
			var tg 	 = e.target,
				cn 	 = tg.className,
				close = (cn.indexOf('rmGOpen') > -1);
			
			if (cn.indexOf('rmCell') > -1) {
			
				if (cn.indexOf('rmCollapse') > -1) {
				 
					if (close) {
						tg.className = cn.replace('rmGOpen','');
						tg.innerHTML = '+';
					} else {
						tg.className += ' rmGOpen';
						tg.innerHTML = '-';
					}
				
					//subtaski
					if (tg.parentNode.className.indexOf('idnt-') > -1 ) {
						changeRowsState(
							e.target.parentNode, 
							getSubtaskIndent(tg.parentNode),
							close
						)
					} 
					//top task
					else {
						changeRowsState(e.target.parentNode, 1, close)
					}
					
				}
			
				e.stopPropagation();
			}
		
		}catch(e){console.log('collapsing', e);}
	
	}
	
	document.body.addEventListener('click', collapsing, false);
	
	//collapse by default
	if (subtaskCollpsd) {
	
		for (var k in collapsable) {
			collapsable[k].getElementsByTagName('td')[1].click();
		}
		
	}
	

} catch (e) {console.log('avatars in list & collapsing', e);}

//hiding time loging
try{

	if (timeLogsRemovd && document.body.className.indexOf('controller-timelog') == -1) {
		var lt = getById('time_entry_comments');
		lt.parentNode.parentNode.style.display = 'none';
	}

} catch (e) {console.log('hiding time logging', e);}

//improved history log
try{

	if (newHistFotrmat) {

		var hist = getById('history'),
			h4s  = hist.getElementsByTagName('h4'),
			imgs = hist.getElementsByTagName('img'),
			as, dva, lastMan, curMan;
			
		for (var i = 0, ci = imgs.length; i < ci; ++i) {
			
			if (h4s[i]) {
			
				h4s[i].innerHTML = h4s[i].innerHTML.replace(/Updated by|Uaktualnione przez/i, '');
				
				dva = createElement('div');
				dva.className = 'rmHistoryDiv';
				as = h4s[i].getElementsByTagName('a');
				
				curMan = as[as.length - 2].innerHTML;
				if (lastMan == curMan) {
					h4s[i].parentNode.className += ' rmHistoryShort '+ (i%2? 'rmHistoryDivOdd': '');
				} else {
					lastMan = curMan;
				}
				h4s[i].parentNode.className += (i%2? ' rmHistoryDivOdd': '');
				
				as[as.length - 1].className = 'rmDate';
				as[as.length - 2].className = 'rmArchiver';
				
				dva.appendChild(as[as.length - 2]);
				dva.lastChild.appendChild(createElement('br'));
				dva.appendChild(as[as.length - 1]);
				dva.appendChild(as[as.length - 1]);
				dva.appendChild(h4s[i].lastChild);
				dva.appendChild(as[as.length - 1]);
				
				h4s[i].appendChild(dva);
				
			}
			
			imgs[i].src = imgs[i].src.replace('&size=24', '&size=30');
			
		}
	
	}

} catch (e) {console.log('improved history log', e);}

//binding colors to tasks
try {
	
	var CCC = ['#510000','#840000','#B70000','#EA0000','#515100','#848400','#B7B700','#EAEA00','#512800','#844200','#B75B00','#EA7500','#010B6D','#0D527A','#1271A8','#406CFF'];
	if (document.body.className.indexOf('controller-issues') > -1) {
		
		var cmenu = getElementsByClassName('contextual', getById('content'))[0];
		if (cmenu) {
		
			var wtextColor = createElement('div'),
				wcolor  = createElement('div'),
				wtext   = createElement('a'),
				wselect = createElement('div');
	
			wtextColor.innerHTML = 'Color';
			wcolor.className 	= "rmColorBox";
			wtext.className  	= "rmColorBoxA";
			wselect.className  	= "rmColorPicker dnone";
		
			var tmpWC = getStoredColor(numb);
			if (tmpWC) {
				wcolor.style.backgroundColor = tmpWC;
			}
		
			wtext.onclick = function() {
			
				if (wselect.className.indexOf('dnone') > -1) {
					wselect.className = wselect.className.replace('dnone','');
				} else {
					wselect.className += 'dnone';
				}
				
			}
		
			for (var i = 0; i < CCC.length; ++i) {
			
				var tmp = createElement('div');
				tmp.className = 'divPaltteColor';
				tmp.style.backgroundColor = CCC[i];
				wselect.appendChild(tmp);
				tmp.onclick = function() {
					
					var ctm = getById('context-menu');
					if (ctm && ctm.style.display == 'none') {
						//from top menu
						wcolor.style.backgroundColor = this.style.backgroundColor;
						storeColor(
							numb,
							this.style.backgroundColor
						);
					} else {
						//from right click menu
						var selected = getElementsByClassName('context-menu-selection'), nu;
						
						for (var i = 0, ci = selected.length; i < ci; ++i) {
							nu = parseInt(selected[i].className.match(/issue-[0-9]+/)[0].split('-')[1], 10);
							storeColor(
								'#' + nu,
								this.style.backgroundColor
							);
							selected[i].className = selected[i].className.replace('context-menu-selection','');
						}
						
					}
					
				}
				
			}
		
			wtext.appendChild(wcolor);
			wtext.appendChild(wtextColor);
			wtext.appendChild(wselect);
			cmenu.appendChild(wtext);
		} // /if cmenu
	}

	//hook to right mouse key
	var scr = createElement('script'),
		clk = createElement('button');
	scr.type="text/javascript";
	scr.innerHTML = 'window.parseStylesheets = function(){document.getElementById("cmOnclicker").onclick();}';
	
	clk.id = 'cmOnclicker';
	clk.onclick=function(){
		var contextMenu = getById('context-menu'),
			ul = contextMenu.getElementsByTagName('ul')[0],
			li = createElement('li');
			
		li.appendChild(wtext);
		ul.appendChild(li);
	}
	
	//
	document.body.appendChild(clk);
	document.body.appendChild(scr);
	
} catch (e) {console.log('binding colors to tasks', e);}

//script panel
try {

    var rmSW     = createElement('div'),
        rmSetts  = createElement('div'), 
        menuUl   = getById('top-menu').getElementsByTagName('ul')[1];
        
    rmSW.className = 'rmSetSwitch';
    rmSW.innerHTML = 'RedmineBoost settings';
    rmSW.onclick   = function(e) {
        
        if (e.target.className == 'rmSettings') {
            return;
        }

        if (rmSetts.className.indexOf('dnone') > -1) {
		
            rmSetts.className = rmSetts.className.replace('dnone','');
            this.className += ' rmOpened';
			document.body.onmousemove = function(e) {
				if (!isFirstChildOfSecond(e.target, rmSW) &&
					e.target != rmSW
				) {
					rmSetts.click();
				}
			};
			
        } else {
		
			document.body.onmousemove = function(){};
            rmSetts.className += ' dnone';
            this.className = this.className.replace('rmOpened','');
			
        }
        
    };
    
    rmSetts.className = 'rmSettings dnone';
	
	
    menuUl.parentNode.insertBefore(rmSW, menuUl);
    
    //opts
    var opts = [
        {setName: 'snf', description: 'Short surname (affect sorting)', defau:true},
        {setName: 'sfh', description: 'Use floating header', 			defau:true},
        {setName: 'sch', description: 'Coloured header', 				defau:true},
        {setName: 'sma', description: 'Use medium avatars in list', 	defau:false},
        {setName: 'sfn', description: 'Full name in tasks` list', 		defau:false},
        {setName: 'sns', description: 'New subtask by CTRL+N', 			defau:true},
        {setName: 'ssc', description: 'Subtasks collapsed by default', 	defau:false},
        {setName: 'tlr', description: 'Remove time logs in edit', 		defau:true},
        {setName: 'sce', description: 'CTRL+S with comments edits (see /1)', 	defau:false},
        {setName: 'nhf', description: 'Short & fancy history layout', 	defau:true, nevv: true},
		{description: '[save button]'},
		{description: ''},
		{description: '* * Other features * * *'},
		{description: 'Going to search while typing numbers'},
		{description: 'Ticket no. added to tag title (browser tab name)'},
		{description: 'Ticket no. added to title of ticket'},
		{description: 'Apostrophe to backtick (`) in title of ticket'},
		{description: 'Shortcuts. Look at [shortcut_keys] clues'},
		{description: 'Button 100% in Done'},
		{description: 'Selects to buttons option'},
		{description: 'Sorting by polish in Assignee'},
		{description: 'Fancy information about blocking & duplicates'},
		{description: 'Fancy information about suspended status', nevv: true},
		{description: 'Avatars in tasks lists'},
		{description: 'Thumbnails of images'},
		{description: 'Checking availability of new versions'},
		{description: 'Collapsing groups in subtasks list'},
		{description: '/1 Comment edit has higher priority than ticket update'},
		{description: '&nbsp;&nbsp;&nbsp;To save com. edit with shortcut you can`t have 2+ opened edits'}
		
    ];
	
    //add options to settings
    for (var o in opts) {
        
        var pos = createElement('div'),
			nev = '';
			
		if (opts[o].nevv) {
			nev = '&nbsp;<span class="rmNew">new!</span>';
		}
        
		if (typeof opts[o].setName != 'undefined') {
		
			pos.className = typeof GM_getValue(opts[o].setName) == 'undefined' ? 
								( opts[o].defau ? 'optOn' : 'optOff' ) : 
								( GM_getValue(opts[o].setName) ? 'optOn' : 'optOff' );
								
			pos.innerHTML = '<span class="on">[#]</span><span class="off">[ ]</span><span> ' + opts[o].description + '</span>' + nev;
			pos.onclick   = (function(setname) {
				return function(e) {
				
					e.stopPropagation();
				
					var curVal = (this.className == 'optOn');
					GM_setValue(setname, !curVal);
					this.className = !curVal ? 'optOn' : 'optOff';
					return false;
					
				};
			})(opts[o].setName);
			
		} else if (opts[o].description == '[save button]') {

			pos.className  = 'rmSave';
			pos.innerHTML  = 'Save (will reload page!)';
			pos.onclick	= function(){ location.href = location.href; };
			
		} else if (opts[o].description == '') {
			pos.innerHTML = '<span class="on">&nbsp;<span>';
		} else {
			pos.innerHTML = '<span class="on"> * </span><span>' + opts[o].description + '</span>' + nev;
		}
        
        rmSetts.appendChild(pos);
        
    }
    
    
    
    //
    rmSW.appendChild(rmSetts);

} catch(e) {console.log(e);}

//adding shortcuts
try {

    function addShortcutTo(key, element) {//or selector

        if (typeof element == 'undefined' || element === null) {
            return;
        }
    
        var elems = [];
        if (typeof element == 'string') {
            
            if ( element.indexOf('.') === 0) {
                elems = getElementsByClassName(element.substring(1));
            }
            
        } else {
            
            if (!element.length) {
                elems = [element];
            }
            
        }
        
        for (var i = 0, ci = elems.length; i < ci; ++i) {
		
			if ( elems[i].nodeName.toLowerCase() == 'input' ) {
				elems[i].value += ' [' + key + ']';
			} else {
				elems[i].innerHTML += ' [' + key + ']';
			}
			
        }

    }

    addShortcutTo('e','.icon-edit');
    addShortcutTo('n','.new-issue');
    try{addShortcutTo('r', getById('relations').getElementsByTagName('strong')[0]); }catch(e){}
    try{addShortcutTo('m', getById('issue_description_and_toolbar').parentNode.getElementsByTagName('label')[0]); }catch(e){}
	try{addShortcutTo('c', getById('issue-form').getElementsByTagName('fieldset')[2].getElementsByTagName('legend')[0]); }catch(e){}
	
	var bclass 	= document.body.className;
    try{ 
		var ii = getById('issue-form').getElementsByTagName('input');
			
		if (bclass.indexOf('action-new') 	> -1 ||
			bclass.indexOf('action-create') > -1
		) {
			addShortcutTo('ctrl+s', ii[ii.length-2]); 
		} else {
			addShortcutTo('ctrl+s', ii[ii.length-1]);
		}
	}catch(e){}
	
	try{ 
		var mm = getById('move_form').getElementsByTagName('input');
		addShortcutTo('ctrl+s', mm[mm.length-2]); 
	}catch(e){}
	
    try{
		if (subtaskAsCtrlN) {
			addShortcutTo('ctrl+n', getById('issue_tree').getElementsByTagName('strong')[0]);
		}
	}catch(e){}

}catch(e){console.log(e);}


