(this.webpackJsonplasertank=this.webpackJsonplasertank||[]).push([[0],{29:function(e,t,n){e.exports=n(49)},38:function(e,t,n){},39:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a,c,r=n(0),i=n.n(r),o=n(15),l=n.n(o),s=n(10),u=(n(38),n(39),n(8)),O=n(3),b=n(7),d=n(2),h=n(14),f=function(e){return(e<16?"0":"")+e.toString(16)},j=function(e){var t=function(e){var t=Math.floor(Math.cbrt(e));if(t>255)return[255,255,255];var n=[t,t,t];return 0===(e-=t*t*t)?n:(n[0]+=1,e<=t*t?n:(n[1]+=1,e<=2*t*t+t?n:(n[2]+=1,n)))}(e),n=Object(d.map)(t,(function(e){var t=[],n=0;if((e-=1)>0)for(var a=255/e;n<255;)t.push(Math.floor(n)),n+=a;return t.push(255),t})),a=[];return Object(d.each)(n[0],(function(e){Object(d.each)(n[1],(function(t){Object(d.each)(n[2],(function(n){a.push("".concat(f(e)).concat(f(t)).concat(f(n)))}))}))})),a},v=n(9),_=n(4),A=n(1),R=n(5),y=n(6);!function(e){e[e.FLAG=1]="FLAG",e[e.DIRT=2]="DIRT",e[e.WATER=3]="WATER",e[e.MOVABLE_BLOCK_WATER=4]="MOVABLE_BLOCK_WATER",e[e.ICE=5]="ICE",e[e.THIN_ICE=6]="THIN_ICE",e[e.TANK_MOVER_N=7]="TANK_MOVER_N",e[e.TANK_MOVER_S=8]="TANK_MOVER_S",e[e.TANK_MOVER_E=9]="TANK_MOVER_E",e[e.TANK_MOVER_W=10]="TANK_MOVER_W",e[e.TUNNEL=11]="TUNNEL"}(a||(a={})),function(e){e[e.BRICKS=32]="BRICKS",e[e.SOLID_BLOCK=33]="SOLID_BLOCK",e[e.CRYSTAL_BLOCK=34]="CRYSTAL_BLOCK",e[e.MOVABLE_BLOCK=35]="MOVABLE_BLOCK",e[e.ANTI_TANK_N=36]="ANTI_TANK_N",e[e.ANTI_TANK_S=37]="ANTI_TANK_S",e[e.ANTI_TANK_W=38]="ANTI_TANK_W",e[e.ANTI_TANK_E=39]="ANTI_TANK_E",e[e.ANTI_TANK_DEAD_N=40]="ANTI_TANK_DEAD_N",e[e.ANTI_TANK_DEAD_S=41]="ANTI_TANK_DEAD_S",e[e.ANTI_TANK_DEAD_W=42]="ANTI_TANK_DEAD_W",e[e.ANTI_TANK_DEAD_E=43]="ANTI_TANK_DEAD_E",e[e.MIRROR_NW=44]="MIRROR_NW",e[e.MIRROR_NE=45]="MIRROR_NE",e[e.MIRROR_SE=46]="MIRROR_SE",e[e.MIRROR_SW=47]="MIRROR_SW",e[e.ROTARY_MIRROR_NW=48]="ROTARY_MIRROR_NW",e[e.ROTARY_MIRROR_NE=49]="ROTARY_MIRROR_NE",e[e.ROTARY_MIRROR_SE=50]="ROTARY_MIRROR_SE",e[e.ROTARY_MIRROR_SW=51]="ROTARY_MIRROR_SW"}(c||(c={}));var N=function(e,t){return e.x===t.x&&e.y===t.y},T=function(e,t){if(e.x!==t.x||e.y!==t.y){if(e.x===t.x)return e.y>t.y?"N":"S";if(e.y===t.y)return e.x>t.x?"W":"E"}return null},p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];(null===e.laser||n)&&(e.laser=t,N(t,e.tank)&&(e.status="FAIL"))},E=function(e,t){var n=e.x,a=e.y,c=Object(d.get)(t,"".concat(a,".").concat(n));return!(!c||c.object)},g=function(e){var t=e.x,n=e.y,a=e.direction;return{N:{x:t,y:n-1,direction:a},S:{x:t,y:n+1,direction:a},E:{x:t+1,y:n,direction:a},W:{x:t-1,y:n,direction:a}}[a]},m=function(){function e(){Object(O.a)(this,e),this.css=""}return Object(b.a)(e,[{key:"handleLeaving",value:function(e,t){}},{key:"handleMove",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=e.board,c=e.pending,r=a[t.y][t.x];if(n||(n=g(t)),r.object&&E(n,a)){var i=Object(d.get)(a,[n.y,n.x]);i.object=r.object,delete r.object,c.push({from:t,to:n})}}}],[{key:"getBackgroundClass",value:function(e){var t;return(t={},Object(y.a)(t,a.FLAG,ee),Object(y.a)(t,a.DIRT,q),Object(y.a)(t,a.WATER,te),Object(y.a)(t,a.MOVABLE_BLOCK_WATER,$),Object(y.a)(t,a.ICE,ne),Object(y.a)(t,a.THIN_ICE,ae),Object(y.a)(t,a.TANK_MOVER_N,ce),Object(y.a)(t,a.TANK_MOVER_S,re),Object(y.a)(t,a.TANK_MOVER_E,oe),Object(y.a)(t,a.TANK_MOVER_W,ie),Object(y.a)(t,a.TUNNEL,Z),t)[e]}},{key:"getObstacleClass",value:function(e){var t;return(t={},Object(y.a)(t,c.BRICKS,I),Object(y.a)(t,c.SOLID_BLOCK,L),Object(y.a)(t,c.CRYSTAL_BLOCK,J),Object(y.a)(t,c.MOVABLE_BLOCK,M),Object(y.a)(t,c.ANTI_TANK_N,K),Object(y.a)(t,c.ANTI_TANK_S,S),Object(y.a)(t,c.ANTI_TANK_W,x),Object(y.a)(t,c.ANTI_TANK_E,w),Object(y.a)(t,c.ANTI_TANK_DEAD_N,W),Object(y.a)(t,c.ANTI_TANK_DEAD_S,D),Object(y.a)(t,c.ANTI_TANK_DEAD_W,C),Object(y.a)(t,c.ANTI_TANK_DEAD_E,B),Object(y.a)(t,c.MIRROR_NW,V),Object(y.a)(t,c.MIRROR_NE,Y),Object(y.a)(t,c.MIRROR_SE,F),Object(y.a)(t,c.MIRROR_SW,U),Object(y.a)(t,c.ROTARY_MIRROR_NW,z),Object(y.a)(t,c.ROTARY_MIRROR_NE,H),Object(y.a)(t,c.ROTARY_MIRROR_SE,G),Object(y.a)(t,c.ROTARY_MIRROR_SW,P),t)[e]}},{key:"getBackground",value:function(e){return new(this.getBackgroundClass(e.background))}},{key:"getObstacle",value:function(e){return e.object?new(this.getObstacleClass(e.object)):null}},{key:"checkLaser",value:function(e){var t=e.laser,n=e.tank,a=e.board;if(t){var c,r=g(t),i=Object(d.get)(a,[r.y,r.x]);if(i)if(e.laser=r,N(r,n))e.status="FAIL";else null===(c=this.getObstacle(i))||void 0===c||c.handleLaser(e,r);else e.laser=null}}},{key:"checkPending",value:function(e){var t=this,n=e.board,a=e.pending;"FAIL"!==e.status&&(e.pending=[],Object(d.each)(a,(function(a){var c=a.from,r=a.to,i=Object(d.get)(n,[r.y,r.x]);if(t.getBackground(i).handleLanding(e,c,r),c){var o=Object(d.get)(n,[c.y,c.x]);o.object||t.getBackground(o).handleLeaving(e,c)}return"FAIL"!==e.status})))}},{key:"checkTank",value:function(e){var t=e.board,n=e.tank;t[n.y][n.x].object||"FAIL"===e.status||(this.checkFire(e),this.getBackground(t[n.y][n.x]).handleTank(e,!1))}},{key:"checkFire",value:function(e){var t=this,n=e.board,a=e.tank;n[a.y][a.x].object||"FAIL"===e.status||Object(d.each)(["E","S","W","N"],(function(c){return function(e,t,n){for(var a=g(t);a.x<se&&a.y<se&&a.x>=0&&a.y>=0&&!1!==n(e[a.y][a.x],a);)a=g(a)}(n,Object(u.a)({},a,{direction:c}),(function(n,a){var c;return null===(c=t.getObstacle(n))||void 0===c?void 0:c.sawTank(e,a)})),"FAIL"!==e.status}))}},{key:"moveTank",value:function(t,n){var c=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=t.board,i=t.tank,o=r[n.y][n.x],l=e.getBackground(o);E(n,t.board)&&(t.prevTank=Object(u.a)({},i),i.x=n.x,i.y=n.y,t.rendering=!0,o.background===a.TUNNEL&&l.handleTankMove(t),e.checkFire(t),c&&l.handleTank(t,!1))}},{key:"getObstacleCss",value:function(e){var t;return null===(t=this.getObstacle(e))||void 0===t?void 0:t.css}},{key:"getBackgroundCss",value:function(e){var t;return null===(t=this.getBackground(e))||void 0===t?void 0:t.css}}]),e}(),k=function(e){function t(){return Object(O.a)(this,t),Object(_.a)(this,Object(A.a)(t).apply(this,arguments))}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLaser",value:function(e,t){e.laser=null}},{key:"sawTank",value:function(e,t){return!1}}]),t}(m),I=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="BRICKS",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLaser",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleLaser",this).call(this,e,n),delete e.board[n.y][n.x].object}}]),t}(k),L=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="SOLID_BLOCK",n}return Object(R.a)(t,e),t}(k),M=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="MOVABLE_BLOCK",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLaser",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleLaser",this).call(this,e,n),this.handleMove(e,n)}}]),t}(k),K=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_N",n.dead=c.ANTI_TANK_DEAD_N,n.dead_direction="S",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLaser",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleLaser",this).call(this,e,n),n.direction===this.dead_direction?e.board[n.y][n.x].object=this.dead:this.handleMove(e,n)}},{key:"sawTank",value:function(e,n){var a=e.tank,c=function(e){return{N:"S",S:"N",W:"E",E:"W"}[e]}(this.dead_direction);return T(n,a)===c&&p(e,g(Object(u.a)({},n,{direction:c}))),Object(v.a)(Object(A.a)(t.prototype),"sawTank",this).call(this,e,n)}}]),t}(k),S=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_S",n.dead=c.ANTI_TANK_DEAD_S,n.dead_direction="N",n}return Object(R.a)(t,e),t}(K),w=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_E",n.dead=c.ANTI_TANK_DEAD_E,n.dead_direction="W",n}return Object(R.a)(t,e),t}(K),x=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ANTI_TANK_W",n.dead=c.ANTI_TANK_DEAD_W,n.dead_direction="E",n}return Object(R.a)(t,e),t}(K),W=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_N",n}return Object(R.a)(t,e),t}(k),D=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_S",n}return Object(R.a)(t,e),t}(k),C=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_W",n}return Object(R.a)(t,e),t}(k),B=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="ANTI_TANK_DEAD_E",n}return Object(R.a)(t,e),t}(k),V=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_NW",n.directions=["N","W"],n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLaser",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleLaser",this).call(this,e,n),-1!==this.directions.indexOf(n.direction)?this.hitBack(e,n):this.hitMirror(e,n)}},{key:"getFireDirections",value:function(){var e={N:"S",S:"N",W:"E",E:"W"};return[e[this.directions[0]],e[this.directions[1]]]}},{key:"hitBack",value:function(e,t){this.handleMove(e,t)}},{key:"hitMirror",value:function(e,t){var n=this.getFireDirections(),a=this.directions[1-n.indexOf(t.direction)];p(e,Object(u.a)({},t,{direction:a}),!0)}}]),t}(k),Y=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_NE",n.directions=["N","E"],n}return Object(R.a)(t,e),t}(V),F=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_SE",n.directions=["S","E"],n}return Object(R.a)(t,e),t}(V),U=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="MIRROR_SW",n.directions=["S","W"],n}return Object(R.a)(t,e),t}(V),z=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_NW",n.directions=["N","W"],n.next_direction=c.ROTARY_MIRROR_NE,n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"hitBack",value:function(e,t){e.board[t.y][t.x].object=this.next_direction}}]),t}(V),H=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_NE",n.directions=["N","E"],n.next_direction=c.ROTARY_MIRROR_SE,n}return Object(R.a)(t,e),t}(z),G=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_SE",n.directions=["S","E"],n.next_direction=c.ROTARY_MIRROR_SW,n}return Object(R.a)(t,e),t}(z),P=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).css="ROTARY_MIRROR_SW",n.directions=["S","W"],n.next_direction=c.ROTARY_MIRROR_NW,n}return Object(R.a)(t,e),t}(z),J=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="CRYSTAL_BLOCK",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLaser",value:function(e,t){}}]),t}(k),X=function(e){function t(){return Object(O.a)(this,t),Object(_.a)(this,Object(A.a)(t).apply(this,arguments))}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLanding",value:function(e,t,n){}},{key:"handleTank",value:function(e,t){console.log(this,"handleTank",Object(u.a)({},e.tank))}},{key:"handleTankMove",value:function(e){console.log(this,"handleTankMove",Object(u.a)({},e.tank))}},{key:"shouldSkip",value:function(e,t){return!1}}]),t}(m),q=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="DIRT",n}return Object(R.a)(t,e),t}(X),$=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="MOVABLE_BLOCK_WATER",n}return Object(R.a)(t,e),t}(X),Q=function(e,t){return e.background===a.TUNNEL&&t.background===a.TUNNEL&&e.color===t.color},Z=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="TUNNEL",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLanding",value:function(e,n,a){Object(v.a)(Object(A.a)(t.prototype),"handleLanding",this).call(this,e,n,a);var c=e.board,r=c[a.y][a.x],i=!0;Object(d.each)(c,(function(e,t){return Object(d.each)(e,(function(e,n){if(Q(e,r)&&!N(a,{x:n,y:t,direction:"N"})&&!e.object)return e.object=r.object,delete r.object,i=!1})),i})),i&&e.pendingTunnels.push(a)}},{key:"handleTankMove",value:function(e){Object(v.a)(Object(A.a)(t.prototype),"handleTankMove",this).call(this,e);var n=e.board,a=e.tank,c=n[a.y][a.x],r=!0;Object(d.each)(n,(function(e,t){return Object(d.each)(e,(function(e,n){if(Q(e,c)&&!N(a,{x:n,y:t,direction:"N"})&&!e.object)return a.x=n,a.y=t,r=!1})),r})),r&&e.pendingTunnels.push(Object(u.a)({},a))}},{key:"handleLeaving",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleLeaving",this).call(this,e,n);var a=e.board,c=e.tank,r=e.pendingTunnels,i=Object(d.findIndex)(r,(function(e){var t=e.x,c=e.y;return Q(a[c][t],a[n.y][n.x])}));if(i>-1){var o=r.splice(i,1)[0];if(!N(o,n)){var l=a[o.y][o.x];if(l.object)Object(d.get)(a,[n.y,n.x]).object=l.object,delete l.object;else N(c,o)&&m.moveTank(e,n)}}}}]),t}(X),ee=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="FLAG",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleTank",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleTank",this).call(this,e,n),e.status="WIN"}}]),t}(X),te=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="WATER",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLanding",value:function(e,n,r){Object(v.a)(Object(A.a)(t.prototype),"handleLanding",this).call(this,e,n,r);var i=e.board[r.y][r.x];i.object===c.MOVABLE_BLOCK&&(i.background=a.MOVABLE_BLOCK_WATER),delete i.object}},{key:"handleTank",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleTank",this).call(this,e,n),e.status="FAIL"}}]),t}(X),ne=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="ICE",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLanding",value:function(e,n,a){Object(v.a)(Object(A.a)(t.prototype),"handleLanding",this).call(this,e,n,a);var c=T(n,a);c&&this.handleMove(e,a,g(Object(u.a)({},a,{direction:c})))}},{key:"handleTank",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleTank",this).call(this,e,n);var a=e.tank,c=e.prevTank,r=T(c,a);if(r){var i=g(Object(u.a)({},a,{direction:r}));m.moveTank(e,i,this.shouldSkip(e,i))}}},{key:"shouldSkip",value:function(e,n){var a=Object(d.get)(e.board,[n.y,n.x]),c=m.getBackground(a);return!Boolean(a.object)&&!(c instanceof t)}}]),t}(X),ae=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="THIN_ICE",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleLanding",value:function(e,n,c){Object(v.a)(Object(A.a)(t.prototype),"handleLanding",this).call(this,e,n,c),e.board[c.y][c.x].background=a.WATER}}]),t}(ne),ce=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_N",n.direction="N",n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"handleTank",value:function(e,n){Object(v.a)(Object(A.a)(t.prototype),"handleTank",this).call(this,e,n),m.moveTank(e,g(Object(u.a)({},e.tank,{direction:this.direction})))}}]),t}(X),re=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_S",n.direction="S",n}return Object(R.a)(t,e),t}(ce),ie=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_W",n.direction="W",n}return Object(R.a)(t,e),t}(ce),oe=function(e){function t(){var e,n;Object(O.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(_.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(c)))).css="TANK_MOVER_E",n.direction="E",n}return Object(R.a)(t,e),t}(ce),le={0:{background:a.DIRT},2:{background:a.FLAG},3:{background:a.WATER},4:{object:c.SOLID_BLOCK},5:{object:c.MOVABLE_BLOCK},6:{object:c.BRICKS},7:{object:c.ANTI_TANK_N},8:{object:c.ANTI_TANK_E},9:{object:c.ANTI_TANK_S},10:{object:c.ANTI_TANK_W},11:{object:c.MIRROR_NW},12:{object:c.MIRROR_NE},13:{object:c.MIRROR_SE},14:{object:c.MIRROR_SW},15:{background:a.TANK_MOVER_N},16:{background:a.TANK_MOVER_E},17:{background:a.TANK_MOVER_S},18:{background:a.TANK_MOVER_W},19:{object:c.CRYSTAL_BLOCK},20:{object:c.ROTARY_MIRROR_NW},21:{object:c.ROTARY_MIRROR_NE},22:{object:c.ROTARY_MIRROR_SE},23:{object:c.ROTARY_MIRROR_SW},24:{background:a.ICE},25:{background:a.THIN_ICE}},se=16,ue=new(function(){function e(){Object(O.a)(this,e),this.record=[],this.history=[]}return Object(b.a)(e,[{key:"save",value:function(e,t){var n=e.board,a=e.tank,c=e.prevTank,r=e.laser,i=e.pending,o=e.pendingTunnels,l=e.status,s=e.levelIndex;this.record.push(t),this.history.push({board:n,tank:a,prevTank:c,laser:r,pending:i,pendingTunnels:o,status:l,levelIndex:s})}}]),e}()),Oe={board:Object(d.range)(0,se).map((function(){return Object(d.range)(0,se).map((function(){return{background:a.DIRT}}))})),tank:{x:0,y:0,direction:"N"},prevTank:{x:0,y:0,direction:"N"},laser:null,pending:[],pendingTunnels:[],status:"PLAYING",levelIndex:0,timer:0,rendering:!1,levels:[]},be=Object(h.b)({name:"game",initialState:Oe,reducers:{loadLevels:function(e,t){var n=t.payload,a=n.levels,c=n.levelIndex;e.levels=a,localStorage.setItem("levels",JSON.stringify(a)),be.caseReducers.loadLevel(e,he(c))},loadLevel:function(e,t){var n=e.board,c=e.tank,r=e.prevTank,i=e.levels,o=t.payload,l=Object(d.get)(i,[o]);if(l){e.levelIndex=o,localStorage.setItem("levelIndex",JSON.stringify(o));var s=j(9);s.shift(),l.board.forEach((function(e,t){return e.forEach((function(e,i){if(1===e)c.x=t,c.y=i,r.x=t,r.y=i,n[i][t]={background:a.DIRT};else if(e>63&&e<72)n[i][t]={color:s[e-64],background:a.TUNNEL};else{var o=le[e];o||console.log(e),n[i][t]=Object(u.a)({background:a.DIRT},o)}}))})),e.timer+=1,e.status="PLAYING"}},undo:function(e){return Object(u.a)({},e,{},ue.history.pop(),{timer:e.timer+1})},moveTank:function(e,t){var n=e.tank,a=t.payload;n.direction===a?m.moveTank(e,g(n),!0):(n.direction=a,e.prevTank=Object(u.a)({},n)),e.timer+=1,e.rendering=!0},fireTank:function(e){var t=e.tank;e.laser||(e.laser=t),be.caseReducers.renderFrame(e)},renderFrame:function(e){e.rendering=!1,m.checkLaser(e),m.checkPending(e),m.checkTank(e),e.timer+=1,e.rendering="FAIL"!==e.status&&(e.rendering||Boolean(e.laser)||e.pending.length>0)}}}),de=be.actions,he=de.loadLevel,fe=de.loadLevels,je=de.undo,ve=de.renderFrame,_e=de.moveTank,Ae=de.fireTank,Re=function(e){return function(t,n){var a=n().game,c=a.tank,r=a.board,i=a.status,o=a.pending,l=a.laser,s=a.levelIndex;if("UNDO"===e)t(je());else if("NEXT_LEVEL"===e)t(he(s+1));else if("PREV_LEVEL"===e)t(he(s-1));else if(0===o.length&&!l&&"PLAYING"===i){var u=g(c);"FIRE"===e?(ue.save(a,e),t(Ae())):function(e){return["N","S","W","E"].includes(e)}(e)&&(c.direction===e?E(u,r)&&(ue.save(a,e),t(_e(e))):t(_e(e)))}}},ye=be.reducer,Ne=n(21),Te=n.n(Ne),pe=n(26),Ee=n(17),ge=(n(47),i.a.memo((function(e){var t=e.tile,n=e.tileSize;return i.a.createElement("div",{style:{width:n,height:n},className:["board-object",m.getBackgroundCss(t)].filter(Boolean).join(" ")},t.background===a.TUNNEL&&i.a.createElement("div",{style:{background:"transparent",borderRadius:"50%",border:"".concat(n/8,"px solid #").concat(t.color),boxSizing:"border-box"}}),t.object&&i.a.createElement("div",{className:m.getObstacleCss(t)}))}))),me=i.a.memo((function(e){var t=e.row,n=e.tileSize;return i.a.createElement("div",{className:"row"},Object(d.map)(t,(function(e,t){return i.a.createElement(ge,{key:t,tile:e,tileSize:n})})))})),ke=function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(_.a)(this,Object(A.a)(t).call(this,e))).state={limit:0},n.boardRef=i.a.createRef(),n.interval=void 0,Object(d.bindAll)(Object(Ee.a)(n),["handleResize"]),n}return Object(R.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",this.handleResize);var t=["bg0","bg1","bg2"];this.interval=setInterval(Object(pe.a)(Te.a.mark((function n(){var a,c,r;return Te.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:(a=e.boardRef.current)&&(c=a.querySelectorAll([".ANTI_TANK_N",".ANTI_TANK_E",".ANTI_TANK_S",".ANTI_TANK_W",".TANK_MOVER_N",".TANK_MOVER_S",".TANK_MOVER_W",".TANK_MOVER_E",".FLAG",".WATER"].join(", ")),r=t.shift()||"",c.forEach((function(e){var n;(n=e.classList).remove.apply(n,t),e.classList.add(r)})),t.push(r));case 2:case"end":return n.stop()}}),n)}))),600),this.handleResize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize),clearInterval(this.interval)}},{key:"handleResize",value:function(){if(this.boardRef.current){var e,t=this.boardRef.current,n=t.offsetWidth,a=t.offsetHeight;this.setState({limit:null!==(e=Object(d.min)([n,a]))&&void 0!==e?e:0})}}},{key:"shouldComponentUpdate",value:function(e,t){return t.limit!==this.state.limit||e.game.timer!==this.props.game.timer}},{key:"render",value:function(){var e=this.props.game,t=this.state.limit,n=e.board,a=e.tank,c=e.laser,r=Math.floor(t/(se+2)),o={width:r,height:r};return i.a.createElement("div",{ref:this.boardRef,className:"Board"},i.a.createElement("div",null,Object(d.map)(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"],(function(e,t){return i.a.createElement("div",{key:t,style:{width:r,display:"inline-block"}},e)}))),i.a.createElement("div",{style:{width:r*se,height:r*se,margin:"0 auto"}},Object(d.map)(n,(function(e,t){return i.a.createElement(me,{key:t,row:e,tileSize:r})})),Object(d.map)(Object(d.range)(se),(function(e){return i.a.createElement("div",{key:e,style:{position:"absolute",verticalAlign:"center",lineHeight:"".concat(r,"px"),left:-r,top:e*r}},e+1)})),i.a.createElement("div",{className:"tank TANK_".concat(a.direction),style:Object(u.a)({left:a.x*r,top:a.y*r},o)}),c&&i.a.createElement("div",{className:"laser ".concat(c.direction),style:["N","S"].includes(c.direction)?Object(u.a)({left:c.x*r+(r/2-2),top:c.y*r},o,{width:4}):Object(u.a)({left:c.x*r,top:c.y*r+(r/2-1)},o,{height:4})})),i.a.createElement("div",null,Object(d.map)(Object(d.range)(0,16),(function(e){return i.a.createElement("div",{key:e,style:{width:r,display:"inline-block"}},e+1)}))))}}]),t}(i.a.Component),Ie=function(){var e=Object(s.c)((function(e){return e.game})),t=Object(s.b)(),n=e.status,a=e.levelIndex,c=Object(d.debounce)((function(){return t(ve())}),10);return Object(r.useEffect)((function(){var e=function(e){var n={ArrowUp:"N",ArrowDown:"S",ArrowLeft:"W",ArrowRight:"E",u:"UNDO",U:"UNDO"," ":"FIRE"}[e.key];n&&t(Re(n))};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[t]),Object(r.useEffect)((function(){e.rendering&&c()}),[c,e]),Object(r.useEffect)((function(){"WIN"===n&&t(he(a+1))}),[t,a,n]),i.a.createElement(ke,{game:e})},Le=n(28),Me=n(27),Ke=(n(48),function(){var e=Object(s.b)(),t=Object(r.useState)(null),n=Object(Me.a)(t,2),a=n[0],c=n[1],o=function(t){var n=new FileReader;n.onload=function(t){var n,a,c;(null===(n=t.target)||void 0===n?void 0:n.result)&&e((c=null===(a=t.target)||void 0===a?void 0:a.result,function(e){var t={board:256,levelName:31,hint:256,author:31,scoreDifficulty:2},n=Object(d.sum)(Object.values(t)),a=Object(d.map)(Object(d.range)(Math.floor(c.byteLength/n)),(function(e){var a=n*e,r={};return Object(d.map)(t,(function(e,t){r[t]=c.slice(a,a+e),a+=e})),{board:Object(d.chunk)(Array.from(new Uint8Array(r.board)),16),levelName:String.fromCharCode.apply(null,Array.from(new Uint8Array(r.levelName))),hint:String.fromCharCode.apply(null,Array.from(new Uint8Array(r.hint))),author:String.fromCharCode.apply(null,Array.from(new Uint8Array(r.author))),scoreDifficulty:new Uint16Array(r.scoreDifficulty)[0]}}));e(fe({levels:a,levelIndex:0}))}))},n.readAsArrayBuffer(t)};return i.a.createElement("div",{className:"MenuBar"},Object(d.map)([{name:"Game",items:[{render:function(){return i.a.createElement("div",null,i.a.createElement("label",null,"Open Data File",i.a.createElement("input",{id:"fileInput",type:"file",style:{display:"none"},onChange:function(e){var t=e.currentTarget.files;(null===t||void 0===t?void 0:t.length)&&o(t[0]),c(null)}})))}}]},{name:"Options",items:[{name:"Animation"}]},{name:"Editor",onClick:function(){c(null)}},{name:"Help",items:[{name:"About"}]}],(function(e,t){var n=e.name,r=Object(Le.a)(e,["name"]);return i.a.createElement("div",Object.assign({key:t,className:"MenuBarItem ".concat(n===(null===a||void 0===a?void 0:a.menu.name)?"active ":""),onClick:function(t){var n=t.currentTarget,r=n.offsetTop,i=n.offsetHeight,o=n.offsetLeft;c(a?null:{menu:e,top:r+i,left:o})},onMouseEnter:function(t){var n=t.currentTarget,r=n.offsetTop,i=n.offsetHeight,o=n.offsetLeft;a&&c({menu:e,top:r+i,left:o})}},r),n)})),i.a.createElement("ul",{className:"Menu",style:(null===a||void 0===a?void 0:a.menu.items)?{top:a.top,left:a.left}:{display:"none"}},Object(d.map)(null===a||void 0===a?void 0:a.menu.items,(function(e,t){var n=e.name,a=e.render;return i.a.createElement("li",{key:t},a?a():n)}))))}),Se=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.game})),n=t.levelIndex,a=t.levels,c=ue.record,r=Object(d.get)(a,[n]),o=Object(d.filter)(c,(function(e){return"FIRE"===e})).length,l=c.length-o;return i.a.createElement("div",{className:"control-panel"},i.a.createElement("div",{className:"info",style:{position:"relative"}},r&&i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{position:"absolute",top:"16%",left:"24%",height:"8%",width:"52%",textAlign:"center",color:"#0df90a"}},n+1),i.a.createElement("div",{style:{position:"absolute",top:"39%",left:"5%",height:"8%",width:"90%",textAlign:"center",color:"#0df90a",fontSize:"".concat(Object(d.max)([.225/r.levelName.length,1.7]),"vw")}},r.levelName),i.a.createElement("div",{style:{position:"absolute",top:"59%",left:"5%",height:"8%",width:"90%",textAlign:"center",color:"#0df90a"}},r.author),i.a.createElement("div",{style:{position:"absolute",top:"82%",left:"11%",height:"8%",width:"32%",textAlign:"center",color:"#0df90a"}},l),i.a.createElement("div",{style:{position:"absolute",top:"82%",left:"58%",height:"8%",width:"32%",textAlign:"center",color:"#0df90a"}},o),i.a.createElement("div",null))),i.a.createElement("div",{className:"control"},Object(d.map)([[{name:"Undo",cmd:"UNDO"},{name:"Hint",cmd:"HINT",onClick:function(){(null===r||void 0===r?void 0:r.hint)&&alert(null===r||void 0===r?void 0:r.hint)}}],[{name:"Save Position",cmd:""}],[{name:"Restore Position",cmd:""}],[{name:"New",cmd:""},{name:"Restart",cmd:""}],[{name:"Load Level",cmd:""}],[{name:"<< Level",cmd:"PREV_LEVEL"},{name:"Level >>",cmd:"NEXT_LEVEL"}]],(function(t,n){return i.a.createElement("div",{key:n},Object(d.map)(t,(function(t,n){var a=t.name,c=t.cmd,r=t.onClick;return i.a.createElement("div",{key:n,onClick:function(t){r?r(t):c&&e(Re(c))}},a)})))}))))},we=function(){var e=Object(s.b)();return Object(r.useEffect)((function(){try{var t,n,a=JSON.parse(null!==(t=localStorage.getItem("levels"))&&void 0!==t?t:""),c=JSON.parse(null!==(n=localStorage.getItem("levelIndex"))&&void 0!==n?n:"0");a&&e(fe({levels:a,levelIndex:c}))}catch(r){alert("failed to load levels: ".concat(r))}}),[e]),i.a.createElement("div",{className:"App"},i.a.createElement(Ke,null),i.a.createElement("div",{className:"main"},i.a.createElement(Ie,null),i.a.createElement(Se,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var xe=n(11),We=Object(xe.combineReducers)({game:ye}),De=Object(h.a)({reducer:We});l.a.render(i.a.createElement(s.a,{store:De},i.a.createElement(we,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[29,1,2]]]);
//# sourceMappingURL=main.ba4e91d3.chunk.js.map