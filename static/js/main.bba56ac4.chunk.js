(this.webpackJsonplasertank=this.webpackJsonplasertank||[]).push([[0],{29:function(e,t,n){e.exports=n(49)},38:function(e,t,n){},40:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a,c,r=n(0),i=n.n(r),o=n(15),l=n.n(o),u=n(11),s=(n(38),n(2)),O=(n(40),n(8)),b=n(3),d=n(7),f=n(14),h=function(e){return(e<16?"0":"")+e.toString(16)},j=function(e){var t=function(e){var t=Math.floor(Math.cbrt(e));if(t>255)return[255,255,255];var n=[t,t,t];return 0===(e-=t*t*t)?n:(n[0]+=1,e<=t*t?n:(n[1]+=1,e<=2*t*t+t?n:(n[2]+=1,n)))}(e),n=Object(s.map)(t,(function(e){var t=[],n=0;if((e-=1)>0)for(var a=255/e;n<255;)t.push(Math.floor(n)),n+=a;return t.push(255),t})),a=[];return Object(s.each)(n[0],(function(e){Object(s.each)(n[1],(function(t){Object(s.each)(n[2],(function(n){a.push("".concat(h(e)).concat(h(t)).concat(h(n)))}))}))})),a},v=n(12),_=n(4),R=n(1),A=n(5),y=n(6);!function(e){e[e.FLAG=1]="FLAG",e[e.DIRT=2]="DIRT",e[e.WATER=3]="WATER",e[e.MOVABLE_BLOCK_WATER=4]="MOVABLE_BLOCK_WATER",e[e.ICE=5]="ICE",e[e.THIN_ICE=6]="THIN_ICE",e[e.TANK_MOVER_N=7]="TANK_MOVER_N",e[e.TANK_MOVER_S=8]="TANK_MOVER_S",e[e.TANK_MOVER_E=9]="TANK_MOVER_E",e[e.TANK_MOVER_W=10]="TANK_MOVER_W",e[e.TUNNEL=11]="TUNNEL"}(a||(a={})),function(e){e[e.BRICKS=32]="BRICKS",e[e.SOLID_BLOCK=33]="SOLID_BLOCK",e[e.CRYSTAL_BLOCK=34]="CRYSTAL_BLOCK",e[e.MOVABLE_BLOCK=35]="MOVABLE_BLOCK",e[e.ANTI_TANK_N=36]="ANTI_TANK_N",e[e.ANTI_TANK_S=37]="ANTI_TANK_S",e[e.ANTI_TANK_W=38]="ANTI_TANK_W",e[e.ANTI_TANK_E=39]="ANTI_TANK_E",e[e.ANTI_TANK_DEAD_N=40]="ANTI_TANK_DEAD_N",e[e.ANTI_TANK_DEAD_S=41]="ANTI_TANK_DEAD_S",e[e.ANTI_TANK_DEAD_W=42]="ANTI_TANK_DEAD_W",e[e.ANTI_TANK_DEAD_E=43]="ANTI_TANK_DEAD_E",e[e.MIRROR_NW=44]="MIRROR_NW",e[e.MIRROR_NE=45]="MIRROR_NE",e[e.MIRROR_SE=46]="MIRROR_SE",e[e.MIRROR_SW=47]="MIRROR_SW",e[e.ROTARY_MIRROR_NW=48]="ROTARY_MIRROR_NW",e[e.ROTARY_MIRROR_NE=49]="ROTARY_MIRROR_NE",e[e.ROTARY_MIRROR_SE=50]="ROTARY_MIRROR_SE",e[e.ROTARY_MIRROR_SW=51]="ROTARY_MIRROR_SW"}(c||(c={}));var N=function(e,t){return e.x===t.x&&e.y===t.y},E=function(e,t){var n=e.x,a=e.y,c=Object(s.get)(t,"".concat(a,".").concat(n));return!(!c||c.object)},T=function(e){var t=e.x,n=e.y,a=e.direction;return{N:{x:t,y:n-1,direction:a},S:{x:t,y:n+1,direction:a},E:{x:t+1,y:n,direction:a},W:{x:t-1,y:n,direction:a}}[a]},p=function(){function e(){Object(b.a)(this,e),this.css=""}return Object(d.a)(e,[{key:"handleMove",value:function(e,t){}},{key:"handleEmpty",value:function(e,t){}}],[{key:"getBackground",value:function(e){var t;return new((t={},Object(y.a)(t,a.FLAG,Q),Object(y.a)(t,a.DIRT,J),Object(y.a)(t,a.WATER,Z),Object(y.a)(t,a.MOVABLE_BLOCK_WATER,X),Object(y.a)(t,a.ICE,ee),Object(y.a)(t,a.THIN_ICE,te),Object(y.a)(t,a.TANK_MOVER_N,ne),Object(y.a)(t,a.TANK_MOVER_S,ae),Object(y.a)(t,a.TANK_MOVER_E,re),Object(y.a)(t,a.TANK_MOVER_W,ce),Object(y.a)(t,a.TUNNEL,$),t)[e.background])}},{key:"getObstacle",value:function(e){var t;return e.object?new((t={},Object(y.a)(t,c.BRICKS,I),Object(y.a)(t,c.SOLID_BLOCK,g),Object(y.a)(t,c.CRYSTAL_BLOCK,G),Object(y.a)(t,c.MOVABLE_BLOCK,k),Object(y.a)(t,c.ANTI_TANK_N,M),Object(y.a)(t,c.ANTI_TANK_S,K),Object(y.a)(t,c.ANTI_TANK_W,S),Object(y.a)(t,c.ANTI_TANK_E,L),Object(y.a)(t,c.ANTI_TANK_DEAD_N,x),Object(y.a)(t,c.ANTI_TANK_DEAD_S,w),Object(y.a)(t,c.ANTI_TANK_DEAD_W,W),Object(y.a)(t,c.ANTI_TANK_DEAD_E,D),Object(y.a)(t,c.MIRROR_NW,C),Object(y.a)(t,c.MIRROR_NE,B),Object(y.a)(t,c.MIRROR_SE,V),Object(y.a)(t,c.MIRROR_SW,F),Object(y.a)(t,c.ROTARY_MIRROR_NW,Y),Object(y.a)(t,c.ROTARY_MIRROR_NE,U),Object(y.a)(t,c.ROTARY_MIRROR_SE,H),Object(y.a)(t,c.ROTARY_MIRROR_SW,z),t)[e.object]):null}},{key:"handleMove",value:function(e,t,n){var a=e.board,c=Object(s.get)(a,[n.y,n.x]);if(c){this.getBackground(c).handleMove(e,n);var r=Object(s.get)(a,[t.y,t.x]);(null===r||void 0===r?void 0:r.object)||this.getBackground(r).handleEmpty(e,t)}}},{key:"handleFire",value:function(e,t){var n,a=Object(s.get)(e.board,[t.y,t.x]);a&&(null===(n=this.getObstacle(a))||void 0===n||n.handleFire(e,t))}},{key:"checkTank",value:function(e){var t=this,n=e.board,a=e.tank;n[a.y][a.x].object||(Object(s.each)(["N","W","E","S"],(function(c){!function(e,t,n){for(var a=T(t);a.x<oe&&a.y<oe&&a.x>=0&&a.y>=0&&!1!==n(e[a.y][a.x],a);)a=T(a)}(n,Object(O.a)({},a,{direction:c}),(function(n,a){var c;return null===(c=t.getObstacle(n))||void 0===c?void 0:c.checkTank(e,a)}))})),this.getBackground(n[a.y][a.x]).handleTank(e,a))}},{key:"getObstacleCss",value:function(e){var t;return null===(t=this.getObstacle(e))||void 0===t?void 0:t.css}},{key:"getBackgroundCss",value:function(e){var t;return null===(t=this.getBackground(e))||void 0===t?void 0:t.css}}]),e}(),m=function(e){function t(){return Object(b.a)(this,t),Object(_.a)(this,Object(R.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleFire",value:function(e,t){e.laser=null}},{key:"checkTank",value:function(e,t){return!1}}]),t}(p),I=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="BRICKS",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleFire",value:function(e,n){Object(v.a)(Object(R.a)(t.prototype),"handleFire",this).call(this,e,n),delete e.board[n.y][n.x].object}}]),t}(m),g=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="SOLID_BLOCK",n}return Object(A.a)(t,e),t}(m),k=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="MOVABLE_BLOCK",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleFire",value:function(e,n){Object(v.a)(Object(R.a)(t.prototype),"handleFire",this).call(this,e,n),e.next.push({cmd:n.direction,start:n})}}]),t}(m),M=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_N",n.dead=c.ANTI_TANK_DEAD_N,n.dead_direction="S",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleFire",value:function(e,n){Object(v.a)(Object(R.a)(t.prototype),"handleFire",this).call(this,e,n),n.direction===this.dead_direction?e.board[n.y][n.x].object=this.dead:e.next.push({cmd:n.direction,start:n})}},{key:"checkTank",value:function(e,n){var a=e.tank,c=e.laser,r=function(e){return{N:"S",S:"N",W:"E",E:"W"}[e]}(this.dead_direction);return null===c&&function(e,t){if(e.x!==t.x||e.y!==t.y){if(e.x===t.x)return e.y>t.y?"N":"S";if(e.y===t.y)return e.x>t.x?"W":"E"}return null}(n,a)===r&&function(e,t){null===e.laser&&(e.laser=t)}(e,T(Object(O.a)({},n,{direction:r}))),Object(v.a)(Object(R.a)(t.prototype),"checkTank",this).call(this,e,n)}}]),t}(m),K=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_S",n.dead=c.ANTI_TANK_DEAD_S,n.dead_direction="N",n}return Object(A.a)(t,e),t}(M),L=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_E",n.dead=c.ANTI_TANK_DEAD_E,n.dead_direction="W",n}return Object(A.a)(t,e),t}(M),S=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_W",n.dead=c.ANTI_TANK_DEAD_W,n.dead_direction="E",n}return Object(A.a)(t,e),t}(M),x=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_N",n}return Object(A.a)(t,e),t}(m),w=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_S",n}return Object(A.a)(t,e),t}(m),W=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_W",n}return Object(A.a)(t,e),t}(m),D=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_E",n}return Object(A.a)(t,e),t}(m),C=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_NW",n.directions=["N","W"],n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleFire",value:function(e,n){Object(v.a)(Object(R.a)(t.prototype),"handleFire",this).call(this,e,n),-1!==this.directions.indexOf(n.direction)?this.hitBack(e,n):this.hitMirror(e,n)}},{key:"getFireDirections",value:function(){var e={N:"S",S:"N",W:"E",E:"W"};return[e[this.directions[0]],e[this.directions[1]]]}},{key:"hitBack",value:function(e,t){e.next.push({cmd:t.direction,start:t})}},{key:"hitMirror",value:function(e,t){var n=this.getFireDirections(),a=this.directions[1-n.indexOf(t.direction)];e.laser=Object(O.a)({},t,{direction:a})}}]),t}(m),B=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_NE",n.directions=["N","E"],n}return Object(A.a)(t,e),t}(C),V=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_SE",n.directions=["S","E"],n}return Object(A.a)(t,e),t}(C),F=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_SW",n.directions=["S","W"],n}return Object(A.a)(t,e),t}(C),Y=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_NW",n.directions=["N","W"],n.next_direction=c.ROTARY_MIRROR_NE,n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"hitBack",value:function(e,t){e.board[t.y][t.x].object=this.next_direction}}]),t}(C),U=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_NE",n.directions=["N","E"],n.next_direction=c.ROTARY_MIRROR_SE,n}return Object(A.a)(t,e),t}(Y),H=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_SE",n.directions=["S","E"],n.next_direction=c.ROTARY_MIRROR_SW,n}return Object(A.a)(t,e),t}(Y),z=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_SW",n.directions=["S","W"],n.next_direction=c.ROTARY_MIRROR_NW,n}return Object(A.a)(t,e),t}(Y),G=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="CRYSTAL_BLOCK",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleFire",value:function(e,t){}}]),t}(m),P=function(e){function t(){return Object(b.a)(this,t),Object(_.a)(this,Object(R.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleTank",value:function(e,t){}}]),t}(p),J=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="DIRT",n}return Object(A.a)(t,e),t}(P),X=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="MOVABLE_BLOCK_WATER",n}return Object(A.a)(t,e),t}(P),q=function(e,t){return e.background===a.TUNNEL&&t.background===a.TUNNEL&&e.color===t.color},$=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="TUNNEL",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleMove",value:function(e,t){var n=e.board,a=e.tank,c=e.pendingTunnels,r=n[t.y][t.x],i=N(t,a),o=!0;Object(s.each)(n,(function(e,n){return Object(s.each)(e,(function(e,c){if(q(e,r)&&!N(t,{x:c,y:n,direction:"N"})&&!e.object)return r.object?(e.object=r.object,delete r.object,o=!1):i&&(a.x=c,a.y=n,o=!1),o})),o})),o&&c.push(t)}},{key:"handleEmpty",value:function(e,n){Object(v.a)(Object(R.a)(t.prototype),"handleEmpty",this).call(this,e,n);var a=e.board,c=e.pendingTunnels,r=Object(s.findIndex)(c,(function(e){var t=e.x,c=e.y;return q(a[c][t],a[n.y][n.x])}));if(r>-1){var i=c.splice(r,1)[0];N(i,n)||this.handleMove(e,i)}}}]),t}(P),Q=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="FLAG",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleMove",value:function(e,t){var n=e.tank;n.x===t.x&&n.y===t.y&&(e.status="WIN")}}]),t}(P),Z=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="WATER",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleMove",value:function(e,t){var n=e.board,r=e.tank,i=t.x,o=t.y,l=n[o][i];l.object===c.MOVABLE_BLOCK&&(l.background=a.MOVABLE_BLOCK_WATER),delete l.object,r.x===i&&r.y===o&&(e.status="FAIL")}}]),t}(P),ee=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="ICE",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleMove",value:function(e,t){e.next.push({cmd:t.direction,start:t})}}]),t}(P),te=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="THIN_ICE",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleMove",value:function(e,n){Object(v.a)(Object(R.a)(t.prototype),"handleMove",this).call(this,e,n),e.board[n.y][n.x].background=a.WATER}}]),t}(ee),ne=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_N",n.direction="N",n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"handleTank",value:function(e,t){var n=t.x,a=t.y,c=e.tank,r=T(Object(O.a)({},t,{direction:this.direction}));c.x===n&&c.y===a&&E(r,e.board)&&e.next.push({cmd:this.direction,start:t})}}]),t}(p),ae=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_S",n.direction="S",n}return Object(A.a)(t,e),t}(ne),ce=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_W",n.direction="W",n}return Object(A.a)(t,e),t}(ne),re=function(e){function t(){var e,n;Object(b.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_E",n.direction="E",n}return Object(A.a)(t,e),t}(ne),ie={0:{background:a.DIRT},2:{background:a.FLAG},3:{background:a.WATER},4:{object:c.SOLID_BLOCK},5:{object:c.MOVABLE_BLOCK},6:{object:c.BRICKS},7:{object:c.ANTI_TANK_N},8:{object:c.ANTI_TANK_E},9:{object:c.ANTI_TANK_S},10:{object:c.ANTI_TANK_W},11:{object:c.MIRROR_NW},12:{object:c.MIRROR_NE},13:{object:c.MIRROR_SE},14:{object:c.MIRROR_SW},15:{background:a.TANK_MOVER_N},16:{background:a.TANK_MOVER_E},17:{background:a.TANK_MOVER_S},18:{background:a.TANK_MOVER_W},19:{object:c.CRYSTAL_BLOCK},20:{object:c.ROTARY_MIRROR_NW},21:{object:c.ROTARY_MIRROR_NE},22:{object:c.ROTARY_MIRROR_SE},23:{object:c.ROTARY_MIRROR_SW},24:{background:a.ICE},25:{background:a.THIN_ICE}},oe=16,le=function(e){return["N","S","W","E"].includes(e)},ue=new(function(){function e(){Object(b.a)(this,e),this.record=[],this.history=[]}return Object(d.a)(e,[{key:"save",value:function(e,t){var n=e.board,a=e.tank,c=e.laser,r=e.status,i=e.pendingTunnels;this.record.push(t),this.history.push({board:n,tank:a,laser:c,status:r,pendingTunnels:i})}}]),e}()),se={board:Object(s.range)(0,oe).map((function(){return Object(s.range)(0,oe).map((function(){return{background:a.DIRT}}))})),tank:{x:0,y:0,direction:"N"},laser:null,status:"PLAYING",pendingTunnels:[],timer:0,next:[],levels:[],levelIndex:0},Oe=Object(f.b)({name:"game",initialState:se,reducers:{loadLevels:function(e,t){e.levels=t.payload,localStorage.setItem("levels",JSON.stringify(t.payload)),Oe.caseReducers.loadLevel(e,de(0))},loadLevel:function(e,t){var n=e.tank,c=e.board,r=e.levels,i=t.payload,o=Object(s.get)(r,[i]);if(o){var l=j(9);l.shift(),e.levelIndex=i,o.board.forEach((function(e,t){return e.forEach((function(e,r){if(1===e)n.x=t,n.y=r,c[r][t]={background:a.DIRT};else if(e>63&&e<72)c[r][t]={color:l[e-64],background:a.TUNNEL};else{var i=ie[e];i||console.log(e),c[r][t]=Object(O.a)({background:a.DIRT},i)}}))})),e.timer+=1,e.status="PLAYING"}},changeDirection:function(e,t){e.tank.direction=t.payload},move:function(e,t){var n=t.payload,a=n.x,c=n.y,r=T(t.payload),i=e.tank,o=e.board;E(r,o)&&(o[c][a].object?(o[r.y][r.x].object=o[c][a].object,delete o[c][a].object):i.x===a&&i.y===c&&(i.x=r.x,i.y=r.y),p.handleMove(e,t.payload,r))},fire:function(e,t){var n=e.tank,a=e.board,c=t.payload.start,r=c.x,i=c.y;Object(s.get)(a,[i,r])?N(c,n)?e.status="FAIL":(e.laser=c,p.handleFire(e,c)):e.laser=null},startCycle:function(e){e.next=[]},finishCycle:function(e){var t=e.tank;p.checkTank(e);var n=e.laser;if(n)if(N(n,t))e.status="FAIL";else{var a=T(n);e.next.push({cmd:"FIRE",start:a})}e.timer+=1},undo:function(e){return Object(O.a)({},e,{},ue.history.pop(),{timer:e.timer+1})},moveTank:function(e,t){var n=e.tank,a=t.payload;if(n.direction===a){var c=Object(O.a)({},n),r=T(n);n.x=r.x,n.y=r.y,p.handleMove(e,c,r),p.checkTank(e)}else n.direction=a;e.timer+=1},renderFrame:function(e,t){var n=e.tank,a=e.board,c=e.next;e.next=[],(null===t||void 0===t?void 0:t.payload)&&c.push(t.payload),c.forEach((function(t){var c=t.cmd,r=t.start,i=r.x,o=r.y;if(le(c)){var l={x:i,y:o,direction:c},u=T(l);E(u,a)&&(a[o][i].object?(a[u.y][u.x].object=a[o][i].object,delete a[o][i].object):N(n,l)&&(n.x=u.x,n.y=u.y),p.handleMove(e,l,u))}else if("FIRE"===c){Object(s.get)(a,[o,i])?N(r,n)?e.status="FAIL":(e.laser=Object(O.a)({},r),p.handleFire(e,e.laser)):e.laser=null}})),p.checkTank(e);var r=e.laser;if(r)if(N(r,n))e.status="FAIL";else{var i=T(r);e.next.push({cmd:"FIRE",start:i})}e.timer+=1}}}),be=Oe.actions,de=be.loadLevel,fe=be.loadLevels,he=(be.move,be.fire,be.undo),je=(be.changeDirection,be.startCycle,be.finishCycle,be.renderFrame),ve=be.moveTank,_e=function(e){return function(t,n){var a=n().game,c=a.tank,r=a.board,i=a.status,o=a.next,l=a.levelIndex;if("UNDO"===e)t(he());else if("NEXT_LEVEL"===e)t(de(l+1));else if("PREV_LEVEL"===e)t(de(l-1));else if(0===o.length&&"PLAYING"===i){var u=T(c);"FIRE"===e?(ue.save(a,e),t(je({cmd:e,start:u}))):le(e)&&(c.direction===e?E(u,r)&&(ue.save(a,e),t(ve(e))):t(ve(e)))}}},Re=Oe.reducer,Ae=n(21),ye=n.n(Ae),Ne=n(26),Ee=n(17),Te=(n(47),i.a.memo((function(e){var t=e.tile,n=e.tileSize;return i.a.createElement("div",{style:{width:n,height:n},className:["board-object",p.getBackgroundCss(t)].filter(Boolean).join(" ")},t.background===a.TUNNEL&&i.a.createElement("div",{style:{background:"transparent",borderRadius:"50%",border:"".concat(n/8,"px solid #").concat(t.color),boxSizing:"border-box"}}),t.object&&i.a.createElement("div",{className:p.getObstacleCss(t)}))}))),pe=i.a.memo((function(e){var t=e.row,n=e.tileSize;return i.a.createElement("div",{className:"row"},Object(s.map)(t,(function(e,t){return i.a.createElement(Te,{key:t,tile:e,tileSize:n})})))})),me=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(_.a)(this,Object(R.a)(t).call(this,e))).state={limit:0},n.boardRef=i.a.createRef(),n.interval=void 0,Object(s.bindAll)(Object(Ee.a)(n),["handleResize"]),n}return Object(A.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",this.handleResize);var t=["bg0","bg1","bg2"];this.interval=setInterval(Object(Ne.a)(ye.a.mark((function n(){var a,c,r;return ye.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:(a=e.boardRef.current)&&(c=a.querySelectorAll([".ANTI_TANK_N",".ANTI_TANK_E",".ANTI_TANK_S",".ANTI_TANK_W",".TANK_MOVER_N",".TANK_MOVER_S",".TANK_MOVER_W",".TANK_MOVER_E",".FLAG",".WATER"].join(", ")),r=t.shift()||"",c.forEach((function(e){var n;(n=e.classList).remove.apply(n,t),e.classList.add(r)})),t.push(r));case 2:case"end":return n.stop()}}),n)}))),600),this.handleResize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize),clearInterval(this.interval)}},{key:"handleResize",value:function(){if(this.boardRef.current){var e,t=this.boardRef.current,n=t.offsetWidth,a=t.offsetHeight;this.setState({limit:null!==(e=Object(s.min)([n,a]))&&void 0!==e?e:0})}}},{key:"shouldComponentUpdate",value:function(e,t){return e.game.timer!==this.props.game.timer||t.limit!==this.state.limit}},{key:"render",value:function(){var e=this.props.game,t=this.state.limit,n=e.board,a=e.tank,c=e.laser,r=Math.floor(t/(oe+2)),o={width:r,height:r};return i.a.createElement("div",{ref:this.boardRef,className:"Board"},i.a.createElement("div",null,Object(s.map)(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"],(function(e){return i.a.createElement("div",{style:{width:r,display:"inline-block"}},e)}))),i.a.createElement("div",{style:{width:r*oe,height:r*oe,margin:"0 auto"}},Object(s.map)(n,(function(e,t){return i.a.createElement(pe,{key:t,row:e,tileSize:r})})),Object(s.map)(Object(s.range)(oe),(function(e){return i.a.createElement("div",{style:{position:"absolute",verticalAlign:"center",lineHeight:"".concat(r,"px"),left:-r,top:e*r}},e+1)})),i.a.createElement("div",{className:"tank TANK_".concat(a.direction),style:Object(O.a)({left:a.x*r,top:a.y*r},o)}),c&&i.a.createElement("div",{className:"laser ".concat(c.direction),style:["N","S"].includes(c.direction)?Object(O.a)({left:c.x*r+(r/2-2),top:c.y*r},o,{width:4}):Object(O.a)({left:c.x*r,top:c.y*r+(r/2-1)},o,{height:4})})))}}]),t}(i.a.Component),Ie=function(){var e=Object(u.c)((function(e){return e.game})),t=Object(u.b)(),n=e.next,a=e.status,c=e.levelIndex,o=Object(s.debounce)((function(){return t(je(null))}),10);return Object(r.useEffect)((function(){var e=function(e){var n={ArrowUp:"N",ArrowDown:"S",ArrowLeft:"W",ArrowRight:"E",u:"UNDO",U:"UNDO"," ":"FIRE"}[e.key];n&&t(_e(n))};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[t]),Object(r.useEffect)((function(){n.length>0&&"FAIL"!==a&&o()}),[o,n,a]),Object(r.useEffect)((function(){"WIN"===a&&t(de(c+1))}),[t,c,a]),i.a.createElement(me,{game:e})},ge=n(28),ke=n(27),Me=(n(48),function(){var e=Object(u.b)(),t=Object(r.useState)(null),n=Object(ke.a)(t,2),a=n[0],c=n[1],o=function(t){var n=new FileReader;n.onload=function(t){var n,a,c,r;(console.log(null===(n=t.target)||void 0===n?void 0:n.result),null===(a=t.target)||void 0===a?void 0:a.result)&&e((r=null===(c=t.target)||void 0===c?void 0:c.result,function(e){var t={board:256,levelName:31,hint:256,author:31,scoreDifficulty:2},n=Object(s.sum)(Object.values(t)),a=Object(s.map)(Object(s.range)(Math.floor(r.byteLength/n)),(function(e){var a=n*e,c={};return Object(s.map)(t,(function(e,t){c[t]=r.slice(a,a+e),a+=e})),{board:Object(s.chunk)(Array.from(new Uint8Array(c.board)),16),levelName:String.fromCharCode.apply(null,Array.from(new Uint8Array(c.levelName))),hint:String.fromCharCode.apply(null,Array.from(new Uint8Array(c.hint))),author:String.fromCharCode.apply(null,Array.from(new Uint8Array(c.author))),scoreDifficulty:new Uint16Array(c.scoreDifficulty)[0]}}));e(fe(a))}))},n.readAsArrayBuffer(t)};return i.a.createElement("div",{className:"MenuBar"},Object(s.map)([{name:"Game",items:[{render:function(){return i.a.createElement("div",null,i.a.createElement("label",null,"Open Data File",i.a.createElement("input",{id:"fileInput",type:"file",style:{display:"none"},onChange:function(e){var t=e.currentTarget.files;(null===t||void 0===t?void 0:t.length)&&o(t[0]),c(null)}})))}}]},{name:"Options",items:[{name:"Animation"}]},{name:"Editor",onClick:function(){c(null)}},{name:"Help",items:[{name:"About"}]}],(function(e,t){var n=e.name,r=Object(ge.a)(e,["name"]);return i.a.createElement("div",Object.assign({key:t,className:"MenuBarItem ".concat(n===(null===a||void 0===a?void 0:a.menu.name)?"active ":""),onClick:function(t){var n=t.currentTarget,r=n.offsetTop,i=n.offsetHeight,o=n.offsetLeft;c(a?null:{menu:e,top:r+i,left:o})},onMouseEnter:function(t){var n=t.currentTarget,r=n.offsetTop,i=n.offsetHeight,o=n.offsetLeft;a&&c({menu:e,top:r+i,left:o})}},r),n)})),i.a.createElement("ul",{className:"Menu",style:(null===a||void 0===a?void 0:a.menu.items)?{top:a.top,left:a.left}:{display:"none"}},Object(s.map)(null===a||void 0===a?void 0:a.menu.items,(function(e,t){var n=e.name,a=e.render;return i.a.createElement("li",{key:t},a?a():n)}))))}),Ke=function(){var e=Object(u.b)();return Object(r.useEffect)((function(){var t=localStorage.getItem("levels");t&&e(fe(JSON.parse(t)))}),[e]),i.a.createElement("div",{className:"App"},i.a.createElement(Me,null),i.a.createElement("div",{className:"main"},i.a.createElement(Ie,null),i.a.createElement("div",{className:"control-panel"},i.a.createElement("div",{className:"info"}),i.a.createElement("div",{className:"control"},Object(s.map)([[{name:"Undo",cmd:"UNDO"},{name:"Hint",cmd:"HINT"}],[{name:"Save Position",cmd:""}],[{name:"Restore Position",cmd:""}],[{name:"New",cmd:""},{name:"Restart",cmd:""}],[{name:"Load Level",cmd:""}],[{name:"<< Level",cmd:"PREV_LEVEL"},{name:"Level >>",cmd:"NEXT_LEVEL"}]],(function(t,n){return i.a.createElement("div",{key:n},Object(s.map)(t,(function(t,n){var a=t.name,c=t.cmd;return i.a.createElement("div",{key:n,onClick:function(){c&&e(_e(c))}},a)})))}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Le=n(9),Se=Object(Le.combineReducers)({game:Re}),xe=Object(f.a)({reducer:Se});l.a.render(i.a.createElement(u.a,{store:xe},i.a.createElement(Ke,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[29,1,2]]]);
//# sourceMappingURL=main.bba56ac4.chunk.js.map