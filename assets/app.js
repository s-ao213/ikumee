const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function initApp(role){
  const prefix=role==='requester'?'依頼者':'サポーター';
  const show=id=>{$$('.screen').forEach(x=>x.classList.remove('active'));$('#'+id)?.classList.add('active');scrollTo(0,0)};
  window.go=show;
  window.appMode='normal';
  const login=$('#loginForm');
  login?.addEventListener('submit',e=>{e.preventDefault();const id=$('#loginId').value.trim(),pw=$('#loginPassword').value; if(id==='test'&&pw==='password123'){sessionStorage.setItem('ikumee-'+role,'1');show(role==='requester'?'onboarding':'home')}else{$('#loginError').textContent='IDまたはパスワードが違います。'}});
  $('#togglePassword')?.addEventListener('click',()=>{const x=$('#loginPassword');x.type=x.type==='password'?'text':'password';$('#togglePassword').textContent=x.type==='password'?'表示':'隠す'});
  $$('.chip').forEach(c=>c.addEventListener('click',()=>{c.classList.toggle('selected');if(c.dataset.single){$$(`.chip[data-single="${c.dataset.single}"]`).filter(x=>x!==c).forEach(x=>x.classList.remove('selected'))}}));
  $$('.nav-btn').forEach(b=>b.addEventListener('click',()=>{$$('.nav-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
  if(role==='requester'){$$('#home .nav-btn')[2]?.addEventListener('click',()=>show('requestHistory'))}
  $('#matched .action-grid .secondary-btn')?.addEventListener('click',()=>openChat('matched'));
  window.logout=()=>{sessionStorage.removeItem('ikumee-'+role);document.body.classList.remove('simple-mode');show('login')};
  window.startMatching=()=>{show('matching');setTimeout(()=>{if($('#matching')?.classList.contains('active'))show(window.appMode==='simple'?'simpleMatched':'matched')},2200)};
  window.acceptRequest=()=>show('matched');
  window.openCancel=(back='matching')=>{window.cancelBack=back;show('cancel')};
  window.finishCancel=()=>{const reason=$('input[name="cancelReason"]:checked');if(!reason){$('#cancelError').textContent='キャンセル理由を選んでください。';return}show('cancelled')};
  window.selectMode=mode=>{window.pendingMode=mode;$$('.mode-card').forEach(card=>{const selected=card.dataset.mode===mode;card.classList.toggle('selected',selected);card.setAttribute('aria-pressed',String(selected))})};
  window.ageChanged=()=>{const age=$('#ageGroup')?.value||'';selectMode(age==='teens'||age==='60plus'?'simple':'normal')};
  window.chooseMode=mode=>{window.appMode=mode||window.pendingMode||'normal';document.body.classList.toggle('simple-mode',window.appMode==='simple');show(window.appMode==='simple'?'seniorHome':'home')};
  window.goHome=()=>show(window.appMode==='simple'?'seniorHome':'home');
  window.setSeniorTime=()=>{const el=$('#seniorTime');if(!el)return;const d=new Date(),pad=n=>String(n).padStart(2,'0');el.value=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`};
  window.openChat=back=>{window.chatBack=back||'matched';show(role==='requester'&&window.appMode==='simple'?'simpleChat':'chat')};
  window.closeChat=()=>show(window.chatBack||'matched');
  window.sendChatMessage=(inputId,listId)=>{const input=$('#'+inputId),list=$('#'+listId);if(!input||!list||!input.value.trim())return;const bubble=document.createElement('div');bubble.className='chat-row chat-row--mine';const message=document.createElement('div');message.className='chat-bubble';message.textContent=input.value.trim();bubble.appendChild(message);list.appendChild(bubble);input.value='';list.scrollTop=list.scrollHeight};
  window.previewChatImage=(input,listId)=>{const file=input.files?.[0],list=$('#'+listId);if(!file||!list)return;const row=document.createElement('div');row.className='chat-row chat-row--mine';const bubble=document.createElement('div');bubble.className='chat-bubble chat-image';const image=document.createElement('img');image.alt='選択した画像';image.src=URL.createObjectURL(file);bubble.appendChild(image);row.appendChild(bubble);list.appendChild(row);list.scrollTop=list.scrollHeight;input.value=''};
  document.title=`IKUMEE | ${prefix}`;
}
