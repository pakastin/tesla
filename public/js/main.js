!function(){"use strict";function t(){this.velocity=0,this.y=0,this.throttling=!1,this.braking=!1}function i(t){return 38===t.which?void(s.throttling=!0):40===t.which?void(s.velocity>0||s.braking?s.braking=!0:s.reversing=!0):void 0}function e(t){return 38===t.which?void(s.throttling=!1):40===t.which?(s.braking=!1,void(s.reversing=!1)):void 0}function n(){var t=Date.now(),i=t-r;requestAnimationFrame(n),s.velocityChange(i),r=t,s.y<-window.innerHeight/2-60?s.y=window.innerHeight/2+60:s.y>window.innerHeight/2+60&&(s.y=-window.innerHeight/2-60),o.textContent=(s.velocity>0?s.velocity/.24|0:0)+" km/h",h.style.transform="translate(0, "+s.y+"px)"}t.prototype.velocityChange=function(t){this.throttling&&this.braking||(this.throttling?(this.velocity+=10/3/t,this.velocity>62.4&&(this.velocity=62.4)):this.reversing?(this.velocity-=5/3/t,this.velocity<-6&&(this.velocity=-6)):this.braking?this.velocity>0&&(this.velocity-=5/t,this.velocity<0&&(this.velocity=0)):this.velocity>0?(this.velocity-=.3/t,this.velocity<0&&(this.velocity=0)):this.velocity<0&&(this.velocity+=.3/t,this.velocity>0&&(this.velocity=0))),this.y-=this.velocity};var o=document.createElement("p"),h=document.createElement("div"),c=document.createElement("div"),s=new t;for(h.id="tesla",c.classList.add("graphics");document.body.firstChild;)document.body.removeChild(document.body.firstChild);h.appendChild(c),document.body.appendChild(o),document.body.appendChild(h),window.addEventListener("keydown",i),window.addEventListener("keyup",e);var r=0;requestAnimationFrame(n)}();