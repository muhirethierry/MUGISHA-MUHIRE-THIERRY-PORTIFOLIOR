(function(){
  var root=document.documentElement;
  document.getElementById('yr').textContent=new Date().getFullYear();
  document.querySelectorAll('.photo img').forEach(function(img){
    function gone(){img.remove()}
    img.addEventListener('error',gone);
    if(img.complete&&img.naturalWidth===0) gone();
  });
  function save(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function load(k){try{return localStorage.getItem(k)}catch(e){return null}}

  var form=document.getElementById('contact-form'),stat=document.getElementById('form-status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(form);
    var subject=d.get('subject')+' - message from '+d.get('name');
    var body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\n\n'+d.get('message');
    window.location.href='mailto:muhirethierry@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    stat.textContent='Opening your email app. If nothing opens, write to me at muhirethierry@gmail.com.';
  });

  var btns=document.querySelectorAll('.picker button');
  function setAccent(c){
    root.style.setProperty('--accent',c);
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.c===c)});
  }
  btns.forEach(function(b){b.addEventListener('click',function(){setAccent(b.dataset.c);save('accent',b.dataset.c)})});
  var a=load('accent'); if(a) setAccent(a);

  var t=load('theme'); if(t) root.setAttribute('data-theme',t);
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
    var next=dark?'light':'dark';
    root.setAttribute('data-theme',next); save('theme',next);
  });
})();