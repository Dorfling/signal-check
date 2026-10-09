'use strict';
const main = document.querySelector('#main');
let question = 0;
let answers = [];
let completedAt;
let activeBadgeName = '';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const score = () => answers.reduce((total, answer, i) => total + Number(answer === SCENARIOS[i].correct), 0);
function getRating(points) {
  if (points === 8) return {title:'Human Firewall', message:'Eight smart decisions. You spotted the traps, recognised the reasonable requests and kept client data in its lane.'};
  if (points >= 6) return {title:'Signal Sentinel', message:'Your radar is working well. A few subtle clues are worth another look — especially when a request feels familiar.'};
  if (points >= 4) return {title:'Sharp Spotter', message:'A solid start. The explanations below will help you turn those close calls into confident decisions.'};
  return {title:'Signal Scout', message:'You have started building your radar. Revisit the clues below: a pause and an independent check can change the outcome.'};
}
function focusTitle() {
  window.scrollTo({top:0, behavior:'instant'});
  main.querySelector('h1,h2')?.focus({preventScroll:true});
}
function showHome() {
  main.innerHTML = `<section class="hero"><div><div class="eyebrow">A SMALL QUIZ. A SHARPER RADAR.</div><h1>Good instincts.<br>Better <span class="accent">decisions.</span></h1><p class="lead">The payment run is waiting. Your phone is buzzing. That email looks almost right.</p><p class="lead">Can you spot the signal in the noise? Take eight everyday cyber decisions for a spin.</p><button class="primary" id="start">Let’s check your radar <span aria-hidden="true">↗</span></button><p class="micro">About 5–7 minutes · No sign-up · A badge at the finish</p></div><div class="hero-art" aria-hidden="true"><div class="floating-tag">Trust your pause.</div><div class="desk-card"><div class="desk-top"><i></i><i></i><i></i></div><div class="desk-content"><div class="art-label">ONE NEW MESSAGE</div><div class="art-subject">“Quick favour before<br>the payment run…”</div><div class="fake-line"></div><div class="fake-line short"></div><div class="fake-line"></div><div class="art-choice">Looks familiar. Is it safe? <span>↗</span></div></div></div><img class="art-shield" src="./icon.svg" alt=""><div class="floating-tag bottom">Keep the coffee. Skip the compromise.</div></div></section><section class="intro-strip" aria-label="How it works"><div><b>01 / Look closer</b><span>Inspect the message and reveal extra clues.</span></div><div><b>02 / Make the call</b><span>Choose the best next action. Learn immediately.</span></div><div><b>03 / Claim your badge</b><span>Add a name or nickname and download your PNG.</span></div></section><div class="topics" aria-label="Topics"><span>Phishing</span><span>Teams</span><span>QR codes</span><span>Payment fraud</span><span>MFA</span><span>AI &amp; client data</span></div>`;
  document.querySelector('#start').addEventListener('click', () => { question=0; answers=[]; activeBadgeName=''; showQuestion(); });
}
function showQuestion() {
  const s = SCENARIOS[question];
  main.innerHTML = `<div class="progress-row"><span>SCENARIO ${question+1} OF ${SCENARIOS.length}</span><span>${score()} correct so far</span></div><div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${SCENARIOS.length}" aria-valuenow="${question}">${SCENARIOS.map((_,i)=>`<i class="${i<question?'done':i===question?'current':''}"></i>`).join('')}</div><section class="question-head"><div class="eyebrow">${escapeHTML(s.topic)}</div><h2 tabindex="-1">${escapeHTML(s.title)}</h2><p class="lead">${escapeHTML(s.intro)}</p></section><div class="play-grid"><section class="artifact" aria-label="Fictional scenario evidence"><div class="artifact-bar"><span>${escapeHTML(s.app)}</span><span>SIMULATION</span></div><div class="artifact-content"><div class="sender-row"><div class="avatar" aria-hidden="true">${{email:'@',meeting:'T',qr:'Q',invoice:'R',phone:'✓',ai:'AI',portal:'↗',incident:'!'}[s.kind]}</div><div><b>${escapeHTML(s.sender)}</b><small>${escapeHTML(s.address)}</small></div></div><h3>${escapeHTML(s.subject)}</h3><p class="message-body">${escapeHTML(s.body)}</p>${s.kind==='qr'?`<div class="qr-art" aria-hidden="true">${'<i></i>'.repeat(81)}</div>`:''}<div class="mock-action">${escapeHTML(s.action)}</div><div class="destination">${escapeHTML(s.destination)}</div></div><div class="inspect"><span>LOOK CLOSER</span>${s.clues.map((c,i)=>`<button class="clue-button" data-clue="${i}" aria-expanded="false" aria-controls="clue-${i}">${escapeHTML(c.label)} <span aria-hidden="true">+</span></button>`).join('')}</div>${s.clues.map((c,i)=>`<p class="clue-text" id="clue-${i}" hidden>${escapeHTML(c.text)}</p>`).join('')}</section><section aria-label="Choose your best next action"><p class="answer-label">WHAT WOULD YOU DO?</p><div class="choices">${s.options.map((o,i)=>`<button class="choice" data-answer="${i}"><span class="choice-letter" aria-hidden="true">${'ABC'[i]}</span><span>${escapeHTML(o)}</span></button>`).join('')}</div><div id="feedback"></div><p class="quiz-note">One point per scenario. Clues are free — use them.</p></section></div>`;
  main.querySelectorAll('[data-clue]').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(`clue-${button.dataset.clue}`).hidden=expanded;
    button.querySelector('span').textContent=expanded?'+':'−';
  }));
  main.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => submitAnswer(Number(button.dataset.answer))));
  focusTitle();
}
function submitAnswer(answer) {
  if (answers.length !== question) return;
  const s = SCENARIOS[question];
  answers.push(answer);
  const correct = answer === s.correct;
  main.querySelectorAll('[data-answer]').forEach(button => {
    const index = Number(button.dataset.answer);
    button.disabled = true;
    button.classList.add(index===s.correct?'correct':index===answer?'incorrect':'unselected');
    if (index===s.correct) button.querySelector('.choice-letter').textContent='✓';
    else if (index===answer) button.querySelector('.choice-letter').textContent='×';
  });
  const feedback = document.querySelector('#feedback');
  feedback.innerHTML = `<div class="feedback ${correct?'':'missed'}" tabindex="-1" role="region" aria-label="Answer feedback"><span class="result-label">${correct?'GOOD CALL · +1 POINT':'A USEFUL CATCH · 0 POINTS'}</span><h3>${escapeHTML(s.verdict)}</h3><p>${escapeHTML(s.explanation)}</p><p class="takeaway">${escapeHTML(s.takeaway)}</p><button class="primary" id="next">${question===SCENARIOS.length-1?'See my result':'Next scenario'} <span aria-hidden="true">→</span></button></div>`;
  feedback.firstElementChild.focus({preventScroll:true});
  feedback.scrollIntoView({block:'nearest',behavior:'instant'});
  document.querySelector('#next').addEventListener('click', () => {
    question++;
    if (question < SCENARIOS.length) showQuestion();
    else {completedAt=new Date();showResults();}
  }, {once:true});
}
function showResults() {
  const points=score(); const rating=getRating(points);
  main.innerHTML = `<section class="results"><div class="result-grid"><div><div class="eyebrow">RADAR CHECK COMPLETE</div><div class="result-score"><strong>${points}</strong><span>/ ${SCENARIOS.length} smart calls</span></div><h2 tabindex="-1">${rating.title}<span class="brand-dot">.</span></h2><p class="lead">${rating.message}</p><p class="lead">The habit to take back to your desk: <strong>pause, verify through a known route, then act.</strong></p><p class="micro">${Math.round(points/SCENARIOS.length*100)}% · First answer to each scenario counts · All eight completed</p><div class="result-actions"><button class="secondary" id="review-button">Review my decisions ↓</button><button class="secondary" id="restart">Try again ↗</button></div><p class="status" role="status" id="download-status"></p></div><div class="badge-box"><canvas id="badge" width="1200" height="760" role="img" aria-label="Signal Check badge: ${rating.title}, ${points} out of 8. Add an optional name below."></canvas><div class="badge-form"><label for="badge-name">Name or nickname on your badge <span class="brand-light">(optional)</span></label><input id="badge-name" type="text" maxlength="40" autocomplete="off" placeholder="e.g. Naledi" aria-describedby="name-privacy"><p class="privacy-note" id="name-privacy">Created on your device. Nothing is submitted. Leave blank for “Cyber-aware consultant”. Only share a name you’re comfortable sharing.</p><button class="primary" id="download">Download my PNG badge <span aria-hidden="true">↓</span></button><p class="privacy-note">Send the downloaded image to your quiz organiser in Teams. There is no automatic score collection.</p></div></div></div><details class="review" id="review"><summary>Your eight decisions &amp; the takeaways</summary><div class="review-list">${SCENARIOS.map((s,i)=>`<article class="review-card"><small>${i+1} / ${escapeHTML(s.topic)} · ${answers[i]===s.correct?'CORRECT':'REVISIT'}</small><h3>${escapeHTML(s.title)}</h3><p><b>Your choice:</b> ${escapeHTML(s.options[answers[i]])}</p>${answers[i]!==s.correct?`<p><b>Best action:</b> ${escapeHTML(s.options[s.correct])}</p>`:''}<p>${escapeHTML(s.explanation)}</p><strong>${escapeHTML(s.takeaway)}</strong></article>`).join('')}</div></details></section>`;
  const input=document.querySelector('#badge-name'); input.value=activeBadgeName;
  input.addEventListener('input', () => {activeBadgeName=input.value;drawBadge();});
  document.querySelector('#download').addEventListener('click', downloadBadge);
  document.querySelector('#review-button').addEventListener('click', () => {
    const review=document.querySelector('#review');review.open=true;review.querySelector('summary').focus();review.scrollIntoView({block:'start',behavior:'instant'});
  });
  document.querySelector('#restart').addEventListener('click', () => {question=0;answers=[];activeBadgeName='';showQuestion();});
  drawBadge(); focusTitle();
}
function roundedRect(ctx,x,y,w,h,r,fill) {ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function badgeName() { return activeBadgeName.replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g,'').trim() || 'Cyber-aware consultant'; }
function drawBadge() {
  const canvas=document.querySelector('#badge');const ctx=canvas.getContext('2d');
  const points=score();const rating=getRating(points);const name=badgeName();
  ctx.clearRect(0,0,1200,760);
  roundedRect(ctx,0,0,1200,760,28,'#202b42');
  ctx.strokeStyle='#48516a';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(25,25,1150,710,20);ctx.stroke();
  ctx.save();ctx.beginPath();ctx.roundRect(0,0,1200,760,28);ctx.clip();
  ctx.strokeStyle='#364159';ctx.lineWidth=2;[160,225,290].forEach(r=>{ctx.beginPath();ctx.arc(1050,145,r,0,Math.PI*2);ctx.stroke();});ctx.restore();
  ctx.textAlign='left';ctx.fillStyle='#b8eccd';ctx.font='700 26px system-ui';ctx.fillText('signalcheck.',70,87);
  ctx.font='600 15px system-ui';ctx.fillStyle='#c5ccda';ctx.fillText('THE ERP CYBER CHALLENGE',70,129);
  ctx.fillStyle='#b8eccd';ctx.beginPath();ctx.moveTo(1010,78);ctx.lineTo(1085,107);ctx.lineTo(1085,167);ctx.bezierCurveTo(1085,210,1010,258,1010,258);ctx.bezierCurveTo(1010,258,935,210,935,167);ctx.lineTo(935,107);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#202b42';ctx.lineWidth=13;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(979,158);ctx.lineTo(1000,179);ctx.lineTo(1044,132);ctx.stroke();
  ctx.fillStyle='#a9b4c9';ctx.font='700 17px system-ui';ctx.fillText('RADAR CHECK COMPLETE',70,219);
  ctx.fillStyle='#fff';ctx.font='800 76px system-ui';ctx.fillText(rating.title,66,310);
  let fontSize=46;ctx.font=`600 ${fontSize}px system-ui`;
  while(ctx.measureText(name).width>1010&&fontSize>18){fontSize--;ctx.font=`600 ${fontSize}px system-ui`;}
  ctx.fillStyle='#dce3ef';ctx.fillText(name,70,385);
  roundedRect(ctx,70,424,355,94,18,'#b8eccd');ctx.fillStyle='#202b42';ctx.font='800 43px system-ui';ctx.fillText(`${points} / 8`,95,482);ctx.font='600 16px system-ui';ctx.fillText('SMART CALLS',252,478);
  ctx.fillStyle='#fff';ctx.font='500 22px system-ui';ctx.fillText('Pause. Verify. Then act.',70,576);
  ctx.strokeStyle='#48516a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(70,620);ctx.lineTo(1130,620);ctx.stroke();
  ctx.fillStyle='#c5ccda';ctx.font='500 17px system-ui';
  const date=completedAt.toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric',timeZone:'Africa/Johannesburg'});
  ctx.fillText(`Completed ${date} · ${Math.round(points/8*100)}%`,70,662);
  ctx.font='400 14px system-ui';ctx.fillStyle='#a9b4c9';ctx.fillText('An awareness challenge, not a professional certification.',70,698);
  ctx.textAlign='right';ctx.fillText('dorfling.github.io/signal-check',1130,698);
  canvas.setAttribute('aria-label',`Signal Check badge for ${name}: ${rating.title}, ${points} out of 8, completed ${date}.`);
}
function downloadBadge() {
  const status=document.querySelector('#download-status');
  document.querySelector('#badge').toBlob(blob=>{
    if(!blob){status.textContent='Your browser could not create the PNG. Try another current browser.';return;}
    const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='signal-check-badge.png';document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),30000);
    status.textContent='Your PNG is ready. Check Downloads; on mobile, save the image or use your browser’s share menu.';
  },'image/png');
}
showHome();
