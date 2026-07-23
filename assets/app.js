const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function initApp(role){
  const prefix=role==='requester'?'依頼者':'サポーター';
  const show=id=>{$$('.screen').forEach(x=>x.classList.remove('active'));$('#'+id)?.classList.add('active');scrollTo(0,0)};
  window.go=show;
  const login=$('#loginForm');
  login?.addEventListener('submit',e=>{e.preventDefault();const id=$('#loginId').value.trim(),pw=$('#loginPassword').value; if(id==='test'&&pw==='password123'){sessionStorage.setItem('ikumee-'+role,'1');show('home')}else{$('#loginError').textContent='IDまたはパスワードが違います。'}});
  $('#togglePassword')?.addEventListener('click',()=>{const x=$('#loginPassword');x.type=x.type==='password'?'text':'password';$('#togglePassword').textContent=x.type==='password'?'表示':'隠す'});
  $$('.chip').forEach(c=>c.addEventListener('click',()=>{c.classList.toggle('selected');if(c.dataset.single){$$(`.chip[data-single="${c.dataset.single}"]`).filter(x=>x!==c).forEach(x=>x.classList.remove('selected'))}}));
  $$('.nav-btn').forEach(b=>b.addEventListener('click',()=>{$$('.nav-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
  window.logout=()=>{sessionStorage.removeItem('ikumee-'+role);show('login')};
  window.startMatching=()=>{show('matching');setTimeout(()=>{if($('#matching')?.classList.contains('active'))show('matched')},2200)};
  window.acceptRequest=()=>show('matched');
  document.title=`IKUMEE | ${prefix}`;
}
