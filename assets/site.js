(function(){
  /* Hero cycle ring: four phases on a 28-day ring, a slow orbiting marker and a breathing glow. */
  var c=document.getElementById('ring');
  if(c){
    var ctx=c.getContext('2d');
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var phases=[[1,5,'#E0719B'],[6,12,'#4FBF9C'],[13,15,'#E7B455'],[16,28,'#9B8BDB']];
    var size=0,dpr=1;
    function resize(){var r=c.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);size=r.width;c.width=r.width*dpr;c.height=r.width*dpr;}
    function ang(d){return (d-1)/28*Math.PI*2-Math.PI/2}
    function draw(t){
      if(!size)resize();
      ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,size,size);
      var cx=size/2,cy=size/2,R=size*0.38,w=Math.max(10,size*0.045);
      var breath=reduce?0.5:(Math.sin(t/1000*Math.PI*2/6)+1)/2; /* one breath every 6 seconds */
      /* soft halo */
      var g=ctx.createRadialGradient(cx,cy,R*0.2,cx,cy,R*1.35);
      g.addColorStop(0,'rgba(240,141,182,'+(0.10+0.08*breath)+')');g.addColorStop(1,'rgba(240,141,182,0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R*1.35,0,Math.PI*2);ctx.fill();
      /* inner guide circles */
      ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
      [0.72,0.56].forEach(function(k){ctx.beginPath();ctx.arc(cx,cy,R*k*(1+0.02*breath),0,Math.PI*2);ctx.stroke();});
      /* day ticks */
      for(var d=1;d<=28;d++){var a=ang(d+0.5);var r1=R+w*0.95,r2=R+w*0.95+(d%7===1?10:5);ctx.strokeStyle='rgba(255,255,255,'+(d%7===1?0.35:0.16)+')';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);ctx.stroke();}
      /* phase arcs */
      ctx.lineCap='round';
      phases.forEach(function(p){
        ctx.save();ctx.shadowColor=p[2];ctx.shadowBlur=14+10*breath;
        ctx.strokeStyle=p[2];ctx.lineWidth=w;ctx.beginPath();
        ctx.arc(cx,cy,R,ang(p[0])+0.07,ang(p[1]+1)-0.07);ctx.stroke();ctx.restore();
      });
      /* orbiting marker: one cycle every 56 seconds */
      var day=reduce?9:((t/2000)%28)+1;
      var ma=ang(day);var mx=cx+Math.cos(ma)*R,my=cy+Math.sin(ma)*R;
      ctx.fillStyle='#FFFFFF';ctx.shadowColor='rgba(255,255,255,.9)';ctx.shadowBlur=18;
      ctx.beginPath();ctx.arc(mx,my,w*0.62,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      ctx.fillStyle='#1D1024';ctx.beginPath();ctx.arc(mx,my,w*0.28,0,Math.PI*2);ctx.fill();
      var lbl=document.getElementById('ring-day');if(lbl)lbl.textContent='Day '+Math.floor(day);
      var ph=document.getElementById('ring-phase');if(ph){var dd=Math.floor(day);ph.textContent=dd<=5?'Menstrual':dd<=12?'Follicular':dd<=15?'Ovulatory':'Luteal';}
      if(!reduce)requestAnimationFrame(draw);
    }
    window.addEventListener('resize',function(){resize();if(reduce)draw(0);});
    resize();requestAnimationFrame(draw);
  }

  /* Sub-nav: highlight the section in view */
  var links=[].slice.call(document.querySelectorAll('.subnav a[href^="#"]'));
  if(links.length&&'IntersectionObserver' in window){
    var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on')});var a=map[e.target.id];if(a){a.classList.add('on');a.scrollIntoView({block:'nearest',inline:'nearest'});}}})},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el);});
  }

  /* Copy buttons */
  [].slice.call(document.querySelectorAll('[data-copy]')).forEach(function(b){
    b.addEventListener('click',function(){var el=document.getElementById(b.getAttribute('data-copy'));var txt=el.innerText;
      var done=function(){var o=b.textContent;b.textContent='Copied';setTimeout(function(){b.textContent=o},1600)};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,function(){sel(el)})}else{sel(el)}});
  });
  function sel(el){var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r);}
})();
