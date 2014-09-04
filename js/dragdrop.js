(function(e){"use strict";function n(t,n){var r=e.touchable?"touchstart":"mousedown",i=t.offset();this.opts=n||{},this.ctx=this.opts.context||t,this.pos={left:i.left,top:i.top},this.opts.selector?t.on(r,this.opts.selector,e.proxy(this.start,this)):t.on(r,e.proxy(this.start,this))}function r(){return t&&(t.drag(),window.requestAnimationFrame(r)),!1}var t;n.prototype={constructor:n,start:function(n){var i,s;t||(this.curEl=e(n.currentTarget),i=this.curEl.offset(),this.curEl.data(i),this.setRevert(i),this.setZIndex(1),this.opts.start&&this.opts.start.call(this.ctx,this.curEl),this.curEl.trigger("draggable:start",[n,this.curEl]),this.setPosition(n),t=this,r()),n.preventDefault(),n.stopPropagation()},stop:function(e){t&&(e.el=this.curEl,this.setZIndex(-1),this.opts.stop&&this.opts.stop.call(this.ctx,this.curEl),this.curEl.trigger("draggable:end",[e,this.curEl]),r(),t=null),e.preventDefault(),e.stopPropagation()},drag:function(){this.curEl.css(this.pos),this.opts.drag&&this.opts.drag.call(this.ctx,this.curEl)},setPosition:function(t){var n=e.getPos(t),r=this.curEl.height(),i=this.curEl.width(),s=this.findOffset();this.pos={left:n.x-i/s,top:n.y-r/s},t.preventDefault(),t.stopPropagation()},setRevert:function(e){this.opts.revert&&!this.curEl.data("revert")&&this.curEl.data({rtop:e.top,rleft:e.left,revert:this.opts.revert})},findOffset:function(){var e=this.curEl.data("width"),t=this.curEl.width();return e>t?2*e/t:2*t/e},setZIndex:function(e){var t=parseInt(this.curEl.css("z-index"),10);this.curEl.css("z-index",t+e)}},e.fn.draggable=function(t){return this.each(function(){var r=e(this),i=r.data("draggable");i||(i=new n(r,t),r.data("draggable",i))})},e(function(){e(document).on("mousemove touchmove mouseup touchend",function(e){if(!t)return;switch(e.type){case"mousemove":case"touchmove":t.setPosition(e);break;case"mouseup":case"touchend":t.stop(e)}e.preventDefault(),e.stopPropagation()})})})(Zepto),function(e){"use strict";function t(e,t){this.el=e,this.opts=t||{},this.ctx=this.opts.context||this.el}function n(n){var i,s,o=n.el;o&&(s=e.getPos(n),i=r(n,s),i?i.drop(n,s):o.data("revert")&&t.prototype.revert(o)),n.preventDefault(),n.stopPropagation()}function r(t,n){var r,i,s=t.el;return s.css({display:"none"}),i=e.elementFromPoint(n.x,n.y),s.css({display:"block"}),e(i).data("droppable")}t.prototype.drop=function(t,n){var r=!0,i=e(t.el);this.opts.drop&&(r&=this.opts.drop.call(this.ctx,t,i,this.el,n)),r&&this.el.trigger("droppable:drop",[t,i,this.el,n]),!r&&i.data("revert")&&this.revert(i)},t.prototype.revert=function(t){var n=t.data("rleft"),r=t.data("rtop"),i=t.data("revert");e.isFunction(i)&&i.call(t),t.css({left:n,top:r})},e.fn.droppable=function(n){return this.each(function(){var r=e(this),i=r.data("droppable");i||(i=new t(r,n),r.data("droppable",i))})},e(function(){e(document).on("mouseup touchend",n)})}(Zepto),function(e){function s(s,u){var a=s[i],f=a&&t[a];if(u===undefined)return f||o(s);if(f){if(u in f)return f[u];var l=r(u);if(l in f)return f[l]}return n.call(e(s),u)}function o(n,s,o){var a=n[i]||(n[i]=++e.uuid),f=t[a]||(t[a]=u(n));return s!==undefined&&(f[r(s)]=o),f}function u(t){var n={};return e.each(t.attributes,function(e,t){t.name.indexOf("data-")===0&&(n[r(t.name.replace("data-",""))]=t.value)}),n}var t={},n=e.fn.data,r=e.zepto.camelize,i=e.expando="Zepto"+ +(new Date);e.fn.data=function(t,n){return n===undefined?e.isPlainObject(t)?this.each(function(n,r){e.each(t,function(e,t){o(r,e,t)})}):this.length===0?undefined:s(this[0],t):this.each(function(){o(this,t,n)})},e.fn.removeData=function(n){return typeof n=="string"&&(n=n.split(/\s+/)),this.each(function(){var s=this[i],o=s&&t[s];o&&e.each(n,function(){delete o[r(this)]})})}}(Zepto),function(e){"use strict";var t=navigator.userAgent.match(/PhantomJS/);e.touchable=function(){return"ontouchstart"in window&&!t}(),e.getPos=function(t){var n={},r;return e.touchable?(r=t.targetTouches.length?t.targetTouches[0]:t.changedTouches[0],n={x:r.pageX,y:r.pageY}):n={x:t.pageX,y:t.pageY},n};var n=document;e.elementFromPoint=function(e,t){var r=!1,i=window.pageYOffset,s=window.pageXOffset,o=window.innerHeight,u=window.innerWidth;return i>0?r=!n.elementFromPoint(0,i+o-1):s>0&&(r=!n.elementFromPoint(s+u-1,0)),r?n.elementFromPoint(e-s,t-i):n.elementFromPoint(e,t)},window.requestAnimationFrame=function(e,t){while(e--&&!(t=window["oR0msR0mozR0webkitR0r".split(0)[e]+"equestAnimationFrame"]));return t||function(e){setTimeout(e,15)}}(5)}(Zepto);