(function(){
  var root=document.documentElement;
  /* background: drifting dots joined by faint lines, drawn in the accent colour */
  var cv=document.getElementById('bg'),ctx=cv.getContext('2d'),W,H,dpr,P=[],mouse={x:-999,y:-999};
  var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function rgb(){
    var h=getComputedStyle(root).getPropertyValue('--accent').trim().replace('#','');
    if(h.length===3) h=h.replace(/./g,'$&$&');
    var n=parseInt(h,16); return (n>>16&255)+','+(n>>8&255)+','+(n&255);
  }
  function size(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    W=innerWidth; H=innerHeight;
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.min(70,Math.round(W*H/16000));
    P=[]; for(var i=0;i<n;i++) P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45,r:1.5+Math.random()*2});
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    var c=rgb(),i,j,p,q,dx,dy,d;
    for(i=0;i<P.length;i++){
      p=P[i];
      if(!still){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1;
        if(p.y<0||p.y>H) p.vy*=-1;
        dx=p.x-mouse.x; dy=p.y-mouse.y; d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){p.x+=dx/d*1.2; p.y+=dy/d*1.2;}
      }
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fillStyle='rgba('+c+',.45)'; ctx.fill();
      for(j=i+1;j<P.length;j++){
        q=P[j]; dx=p.x-q.x; dy=p.y-q.y; d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle='rgba('+c+','+(.22*(1-d/140))+')'; ctx.lineWidth=1; ctx.stroke();}
      }
    }
    if(!still) requestAnimationFrame(frame);
  }
  size(); frame();
  addEventListener('resize',function(){size(); if(still) frame();});
  addEventListener('pointermove',function(e){mouse.x=e.clientX; mouse.y=e.clientY;});
  addEventListener('pointerleave',function(){mouse.x=mouse.y=-999;});
})();