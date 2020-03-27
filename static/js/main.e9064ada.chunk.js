(this["webpackJsonpinfection-simulator"]=this["webpackJsonpinfection-simulator"]||[]).push([[0],{118:function(e,t,a){e.exports=a(207)},206:function(e,t,a){},207:function(e,t,a){"use strict";a.r(t);var n,i=a(0),r=a.n(i),c=a(6),l=a(81),o=a(21),s=function(e,t,a){var n=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2));return n>=a?null:[(t.y-e.y)/n,-(t.x-e.x)/n]};!function(e){e[e.healthy=0]="healthy",e[e.infected=1]="infected",e[e.cured=2]="cured"}(n||(n={}));var m=function(e){for(var t,a,n=e.length;0!==n;)a=Math.floor(Math.random()*n),t=e[n-=1],e[n]=e[a],e[a]=t;return e},u=function(e,t){var a,i=0,r=0,c=0,l=0,o=0,u=!1,h=!1,d=[],f=0,p=e.dotSize/2,y=document.getElementById("canvas"),g=y.getContext("2d");if(y.width=e.canvasWidth,y.height=e.canvasHeight+e.chartHeight,y.style.width="".concat(e.canvasWidth/2,"px"),y.style.height="".concat((e.canvasHeight+e.chartHeight)/2,"px"),!g)throw new Error("No context!");var v=[];v=function(e,t){for(var a=[],i=function(t){var i,r=0,c=0;do{r=e.dotSize/2+Math.random()*e.canvasWidth-e.dotSize,c=e.dotSize/2+Math.random()*e.canvasHeight-e.dotSize}while(a.some((function(t){return a=t,n={x:r,y:c},i=e.dotSize,Math.sqrt(Math.pow(a.x-n.x,2)+Math.pow(a.y-n.y,2))<=i+4;var a,n,i})));a.push({x:r,y:c,state:n.healthy,stationary:!1,speedVec:(i=2*Math.random()*Math.PI,[Math.cos(i),Math.sin(i)])})},r=0;r<t.numberOfDots;r++)i();for(var c=m(a),l=0;l<t.stationaryPercentAtStart/100*c.length;l++)c[l].stationary=!0,c[l].speedVec=[0,0];for(var o=m(c).sort((function(e,t){return e.stationary&&!t.stationary?1:e.stationary&&t.stationary?0:-1})),s=0;s<t.infectedDotsAtStart;s++)o[s].state=n.infected;return o}(e,t);var E=function m(h){if(g.clearRect(0,0,e.canvasWidth,e.canvasHeight+e.chartHeight),g.fillStyle="rgba(0,0,0,0.025)",g.fillRect(0,e.canvasHeight,e.canvasWidth,e.chartHeight),!u){g.save();for(var y=0;y<v.length;y++){var E=v[y];g.fillStyle=E.state===n.infected?"orangered":E.state===n.cured?"limegreen":"#bbb",g.beginPath(),g.arc(E.x,E.y,p+1,0,2*Math.PI),g.fill()}g.font="20px Source Sans Pro",g.fillStyle="rgba(0,0,0,0.2)",g.fillRect(0,e.canvasHeight,e.canvasWidth,1),g.fillStyle="rgba(0,0,0,0.15)",g.fillRect(0,e.canvasHeight+e.chartHeight/2,e.canvasWidth,1),g.fillText(Math.round(v.length/2).toFixed(0),8,e.canvasHeight+e.chartHeight/2-8),g.fillRect(0,e.canvasHeight+e.chartHeight/4,e.canvasWidth,1),g.fillText(Math.round(.75*v.length).toFixed(0),8,e.canvasHeight+e.chartHeight/4-8),g.fillRect(0,e.canvasHeight+.75*e.chartHeight,e.canvasWidth,1),g.fillText(Math.round(.25*v.length).toFixed(0),8,e.canvasHeight+.75*e.chartHeight-8),g.fillStyle="rgba(0,0,0,0.4)",g.fillRect(0,e.canvasHeight+(100-t.medicalCapacityPercent)/100*e.chartHeight,e.canvasWidth,1),g.fillText("Supposed medical capacity",64,e.canvasHeight+(100-t.medicalCapacityPercent)/100*e.chartHeight-8);for(var b=0;b<Math.min(d.length,e.canvasWidth/e.chartBarWidth);b++){var w=e.canvasWidth-(b+1)*e.chartBarWidth,x=d[b][0]/v.length*e.chartHeight,S=d[b][1]/v.length*e.chartHeight;g.fillStyle="rgba(255,0,0,0.3)",g.fillRect(w,e.canvasHeight+e.chartHeight-x,e.chartBarWidth,x),g.fillStyle="rgba(100,255,100,0.3)",g.fillRect(w,e.canvasHeight+e.chartHeight-S,e.chartBarWidth,S)}g.restore(),function(a){for(var i=0;i<v.length;i++){var r=v[i];if(r.state!==n.infected||r.infectionTime||(r.infectionTime=a),r.infectionTime&&a-r.infectionTime>1e3*t.timeToCure&&(r.infectionTime=void 0,r.state=n.cured),!r.stationary){r.x=r.x+r.speedVec[0]*e.dotVelocity,r.y=r.y+r.speedVec[1]*e.dotVelocity,v[i].x<p&&(v[i].x=p,v[i].speedVec[0]=-v[i].speedVec[0]),v[i].x>e.canvasWidth-p&&(v[i].x=e.canvasWidth-p,v[i].speedVec[0]=-v[i].speedVec[0]),v[i].y<p&&(v[i].y=p,v[i].speedVec[1]=-v[i].speedVec[1]),v[i].y>e.canvasHeight-p&&(v[i].y=e.canvasHeight-p,v[i].speedVec[1]=-v[i].speedVec[1]);for(var c=0;c<v.length;c++){var l=v[c];if(i!==c){var o=s(v[i],v[c],e.dotSize);if(null!==o){r.state===n.infected&&l.state===n.healthy&&(l.state=n.infected),l.state===n.infected&&r.state===n.healthy&&(r.state=n.infected),r.stationary||(r.x=r.x-r.speedVec[0]*e.dotVelocity,r.y=r.y-r.speedVec[1]*e.dotVelocity);var m=r.speedVec,u=l.speedVec,h=[m[0]-u[0],m[1]-u[1]],d=(b=h)[0]*(w=o)[0]+b[1]*w[1],f=[o[0]*d,o[1]*d],y=[h[0]-f[0],h[1]-f[1]];if(!r.stationary){r.speedVec[0]=r.speedVec[0]-(l.stationary?2:1)*y[0],r.speedVec[1]=r.speedVec[1]-(l.stationary?2:1)*y[1];var g=Math.sqrt(Math.pow(r.speedVec[0],2)+Math.pow(r.speedVec[1],2));r.speedVec[0]/=g,r.speedVec[1]/=g}if(!l.stationary){l.speedVec[0]=l.speedVec[0]+(r.stationary?2:1)*y[0],l.speedVec[1]=l.speedVec[1]+(r.stationary?2:1)*y[1];var E=Math.sqrt(Math.pow(l.speedVec[0],2)+Math.pow(l.speedVec[1],2));l.speedVec[0]/=E,l.speedVec[1]/=E}}}}}}var b,w}(h),c=v.filter((function(e){return e.state===n.healthy})).length,l=v.filter((function(e){return e.state===n.infected})).length,o=v.filter((function(e){return e.state===n.cured})).length,h-f>50&&(f=h,d.unshift([l,o])),l>i&&(i=l),r=100*i/v.length,a&&a(),window.requestAnimationFrame(m)}};return{start:function(){h||(h=!0,window.requestAnimationFrame(E))},stop:function(){u=!0},onUpdate:function(e){a=e},getState:function(){return{numHealthy:c,numInfected:l,numCured:o,peakInfected:i,peakInfectedPercent:r}}}},h=a(82),d=a(211),f=a(216),p=a(217),y=a(212),g=a(214),v=a(50),E=a(210),b=a(215),w=a(213),x={stationaryPercentAtStart:95,infectedDotsAtStart:3,timeToCure:14,numberOfDots:200,medicalCapacityPercent:25},S=[{stationaryPercentAtStart:95,infectedDotsAtStart:3,timeToCure:14,numberOfDots:200,medicalCapacityPercent:25},{stationaryPercentAtStart:5,infectedDotsAtStart:3,timeToCure:14,numberOfDots:200,medicalCapacityPercent:25}],H=d.a.Title,V=d.a.Paragraph,C=function(e){var t=e.simulationConfig,a=e.setSimulationConfig,n=e.field,i=e.max,c=e.min,l=e.suffix,o=e.readonly;return r.a.createElement(f.a,{gutter:16},r.a.createElement(p.a,{span:16},r.a.createElement(y.a,{value:t[n],min:c,max:i,tipFormatter:function(e){return"".concat(e).concat(l||"")},style:{width:"100%"},onChange:function(e){a(Object(h.a)(t,(function(t){t[n]=e||1})))}})),r.a.createElement(p.a,{span:8},r.a.createElement(g.a,{value:t[n],min:c,max:i,readOnly:o,style:{width:"100%"},formatter:function(e){return"".concat(e).concat(l||"")},onChange:function(e){a(Object(h.a)(t,(function(t){t[n]=e||1})))}})))};var j=function(){var e=Object(i.useState)(),t=Object(o.a)(e,2),a=t[0],n=t[1],c=Object(i.useState)(),s=Object(o.a)(c,2),m=s[0],h=s[1],d=Object(i.useState)({dotSize:8,dotVelocity:1.4,canvasWidth:1200,canvasHeight:800,chartHeight:300,chartBarWidth:.5}),y=Object(o.a)(d,1)[0],g=Object(i.useState)(),j=Object(o.a)(g,2),M=j[0],O=j[1],P=Object(i.useState)(x),T=Object(o.a)(P,2),W=T[0],I=T[1],k=r.a.useCallback((function(e){a&&a.stop();var t=u(Object(l.a)({},y),Object(l.a)({},e||W));e&&I(e),O(e||W),n(t),t.start()}),[a,W,y]),A=r.a.useCallback((function(){if(a){var e=a.getState();h(e)}}),[a]);Object(i.useEffect)((function(){var e=setInterval((function(){A()}),1e3);return function(){return clearInterval(e)}}),[A]),Object(i.useEffect)((function(){k()}),[]);var D=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("div",null,"Population count"," ",r.a.createElement(v.a,{overlay:"Set how many people will live in your population."},r.a.createElement(w.a,null))),r.a.createElement(C,{min:10,max:500,field:"numberOfDots",simulationConfig:W,setSimulationConfig:I})),r.a.createElement(E.a,null),r.a.createElement("div",null,r.a.createElement("div",null,"Percent of stationary (self-isolating) people"," ",r.a.createElement(v.a,{overlay:'This percentage of people will not move in your population. They can be "visited" by other persons, but will remain stationary.'},r.a.createElement(w.a,null))),r.a.createElement(C,{min:0,max:100,field:"stationaryPercentAtStart",simulationConfig:W,setSimulationConfig:I,suffix:"%"})),r.a.createElement(E.a,null),r.a.createElement("div",null,r.a.createElement("div",null,"Time to get cured (in seconds)"," ",r.a.createElement(v.a,{overlay:'Starting from the moment of infection, every person will become "cured" after this amount of time - which means that he will not transmit the infection and cannot be infected anymore.'},r.a.createElement(w.a,null))),r.a.createElement(C,{min:1,max:30,field:"timeToCure",simulationConfig:W,setSimulationConfig:I,suffix:" s"})),r.a.createElement(E.a,null),r.a.createElement("div",null,r.a.createElement("div",null,"Initially infected population"," ",r.a.createElement(v.a,{overlay:"This number of people will have be infected from the beginning."},r.a.createElement(w.a,null))),r.a.createElement(C,{min:1,max:W.numberOfDots,field:"infectedDotsAtStart",simulationConfig:W,setSimulationConfig:I,readonly:!0,suffix:" / ".concat(W.numberOfDots)})));return r.a.createElement("div",null,r.a.createElement(f.a,{justify:"center",align:"middle"},r.a.createElement(p.a,{md:20,xs:24},r.a.createElement(f.a,{justify:"center"},r.a.createElement(p.a,{md:16,xs:22},r.a.createElement(f.a,{justify:"center"},r.a.createElement(H,null,"Infection & social distancing simulator"),r.a.createElement(V,{type:"secondary"},"COVID-19 pandemic is no joke. Every day, people are dying in many countries across the world."," ",r.a.createElement("strong",null,"One of the most commonly applied countermeasures in almost every place is some form of social distancing, which results in reduced human interactions and decrease of virus spread."," "),"Social distancing takes many forms: voluntary staying at home or forced curfews. Still, it turns out to be the best form of infection prevention."),r.a.createElement(V,null,'The application below allows you to simulate a virtual society, where certain portion of inhbitants is stationary (isolated), while the rest is moving. Each dot is a "person" that might be infected or not. An infected person will transmit the disease upon "bumping" into other healthy person. People are getting better with time, which means they can\'t be infected anymore after some time.'),r.a.createElement(V,null,"Play with it a little and see for yourself,"," ",r.a.createElement("strong",null,"how important is staying in place")," - and how it affects the virus spread."),r.a.createElement(f.a,{gutter:[16,8]},r.a.createElement(p.a,null,r.a.createElement(b.a,{onClick:function(){return k(S[0])}},r.a.createElement("span",null,"Run scenario with"," ",r.a.createElement("span",{className:"intent-success"},"high")," social distancing"))),r.a.createElement(p.a,null,r.a.createElement(b.a,{onClick:function(){return k(S[1])}},r.a.createElement("span",null,"Run scenario with"," ",r.a.createElement("span",{className:"intent-danger"},"low")," social distancing")))),r.a.createElement(E.a,null)))),r.a.createElement(f.a,{justify:"center",gutter:24,align:"middle",style:{height:60}},m&&r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{className:"indicator i-healthy"},"Healthy: ",m.numHealthy),r.a.createElement(p.a,{className:"indicator i-infected"},"Infected: ",m.numInfected),r.a.createElement(p.a,{className:"indicator i-cured"},"Cured: ",null===m||void 0===m?void 0:m.numCured))),r.a.createElement(f.a,{justify:"center",gutter:16,align:"middle",style:{height:60}},m&&r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{className:"small-indicator i-peak-infected"},"Peak infected: ",m.peakInfected," (",null===m||void 0===m?void 0:m.peakInfectedPercent.toFixed(2)," %)"))))),r.a.createElement(f.a,{justify:"center"},r.a.createElement(p.a,{xs:22,md:20},r.a.createElement(f.a,{gutter:16},r.a.createElement(p.a,{className:"wrap-controls"},D),r.a.createElement(p.a,{className:"wrap-canvas"},r.a.createElement(f.a,{justify:"center"},r.a.createElement(b.a,{type:"primary",danger:M!==W,onClick:function(){return k()}},a?M===W?"Restart simulation using current settings":"Apply new settings and restart simulation":"Start simulation")),r.a.createElement(f.a,{justify:"center",className:"canvas-holder"},r.a.createElement("div",{className:"canvas-line-tooltip"},r.a.createElement(v.a,{overlay:"This line marks hypothetical limit of the hospitals\u2019 ability to cure people"},r.a.createElement(w.a,{style:{fontSize:"12px"}}))),r.a.createElement("canvas",{id:"canvas",style:{width:y.canvasWidth/2,height:(y.canvasHeight+y.chartHeight)/2}})))))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(f.a,{justify:"center",align:"middle"},r.a.createElement(p.a,{span:20},r.a.createElement(f.a,{justify:"center"},r.a.createElement(E.a,null),r.a.createElement(p.a,{span:16},r.a.createElement(f.a,{justify:"center"},r.a.createElement(V,null,"\xa92020 Hubert Zub. Licensed under MIT License."," ",r.a.createElement("a",{href:"https://github.com/hzub/infection-simulator/"},"Repository"))))))))};a(205),a(206);c.render(i.createElement(j,null),document.getElementById("root"))}},[[118,1,2]]]);
//# sourceMappingURL=main.e9064ada.chunk.js.map