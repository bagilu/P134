(() => {
  'use strict';
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const MAX_FALLEN = 10;
  const ui = {
    area: document.querySelector('#game-area'), targets: document.querySelector('#targets-layer'), shots: document.querySelector('#shots-layer'), fallen: document.querySelector('#fallen-layer'),
    score: document.querySelector('#score'), level: document.querySelector('#level'), mode: document.querySelector('#mode-label'), fallenCount: document.querySelector('#fallen-count'), high: document.querySelector('#high-score'), message: document.querySelector('#game-message'),
    intro: document.querySelector('#intro-panel'), result: document.querySelector('#result-panel'), start: document.querySelector('#start-button'), restart: document.querySelector('#restart-button'), beginner: document.querySelector('#beginner-button'), advanced: document.querySelector('#advanced-button'),
    resultScore: document.querySelector('#result-score'), resultDestroyed: document.querySelector('#result-destroyed'), resultFallen: document.querySelector('#result-fallen')
  };
  let state, frameId, lastFrame, lastSpawn, selectedMode = 'beginner';
  const savedHigh = Number(localStorage.getItem('P134-high-score') || 0);
  ui.high.textContent = savedHigh;

  function freshState() { return { active:false, score:0, fallen:0, targets:[], bag:[], lastLetter:'', high:savedHigh, mode:selectedMode }; }
  function difficulty() { const level = Math.floor(state.score / 5) + 1; if (state.mode === 'beginner') return { level, spawnMs: Math.max(650, 1300 - (level - 1) * 110), fallMs: Math.max(5700, 7200 - (level - 1) * 150) }; return { level, spawnMs: Math.max(450, 1000 - (level - 1) * 150), fallMs: Math.max(4500, 5700 - (level - 1) * 200) }; }
  function drawNextLetter() {
    if (!state.bag.length) { state.bag = [...LETTERS].sort(() => Math.random() - .5); if (state.bag[state.bag.length - 1] === state.lastLetter) [state.bag[0],state.bag[state.bag.length - 1]] = [state.bag[state.bag.length - 1],state.bag[0]]; }
    const letter = state.bag.pop(); state.lastLetter = letter; return letter;
  }
  function updateHud() { const d = difficulty(); ui.score.textContent = state.score; ui.level.textContent = d.level; ui.mode.textContent = state.mode === 'beginner' ? '新手' : '進階'; ui.fallenCount.textContent = `${state.fallen} / ${MAX_FALLEN}`; ui.high.textContent = state.high; }
  function spawnTarget(now) {
    const d = difficulty(); const letter = drawNextLetter(); let x, tries = 0;
    do { x = 8 + Math.random() * 84; tries++; } while (tries < 8 && state.targets.some(t => Math.abs(t.x - x) < 9 && t.y < 20));
    const el = document.createElement('div'); el.className = 'target'; el.textContent = letter; el.style.left = `${x}%`; el.style.top = '-58px'; ui.targets.append(el);
    state.targets.push({ letter, x, y:-58, speed:(ui.area.clientHeight - 48 + 58) / d.fallMs, el }); lastSpawn = now;
  }
  function addFallen(letter) {
    const el = document.createElement('div'); el.className = 'fallen'; el.textContent = letter;
    const index = state.fallen - 1, slot = index % 12, row = Math.floor(index / 12); el.style.left = `${5 + slot * 8.2}%`; el.style.bottom = `${48 + row * 23}px`; el.style.setProperty('--tilt', `${-12 + Math.random()*24}deg`); ui.fallen.append(el);
  }
  function fireAt(target) {
    const shot = document.createElement('div'); shot.className = 'shot'; ui.shots.append(shot);
    const startX = ui.area.clientWidth / 2, startY = ui.area.clientHeight - 75;
    const endX = target.x / 100 * ui.area.clientWidth, endY = target.y + 27;
    // A cubic Bézier path makes the energy bolt lift off first, then curve into its target.
    const c1X = startX, c1Y = startY - 130;
    const c2X = endX + (startX - endX) * .35, c2Y = endY + 82;
    const duration = Math.min(360, Math.max(220, Math.hypot(endX-startX,endY-startY) * .52));
    const started = performance.now();
    const point = (a,b,c,d,t) => (1-t)**3*a + 3*(1-t)**2*t*b + 3*(1-t)*t*t*c + t**3*d;
    const animate = now => { const t = Math.min(1,(now-started)/duration); const x = point(startX,c1X,c2X,endX,t), y = point(startY,c1Y,c2Y,endY,t); const nx = point(startX,c1X,c2X,endX,Math.min(1,t+.015)), ny = point(startY,c1Y,c2Y,endY,Math.min(1,t+.015)); const angle = Math.atan2(ny-y,nx-x) * 180 / Math.PI + 90; shot.style.left = `${x}px`; shot.style.top = `${y}px`; shot.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`; if (t < 1) requestAnimationFrame(animate); else { shot.remove(); target.el.classList.add('hit'); setTimeout(() => target.el.remove(), 280); } };
    requestAnimationFrame(animate);
  }
  function handleKey(event) {
    if (!state.active || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.toUpperCase(); if (!/^[A-Z]$/.test(key)) return;
    event.preventDefault(); const eligible = state.targets.filter(t => t.letter === key); if (!eligible.length) { ui.message.textContent = `目前沒有 ${key}；請繼續專注目標。`; return; }
    const target = eligible.reduce((lowest,t) => t.y > lowest.y ? t : lowest); state.targets = state.targets.filter(t => t !== target); fireAt(target); state.score++; state.high = Math.max(state.high, state.score); localStorage.setItem('P134-high-score', state.high); updateHud(); ui.message.textContent = `命中 ${key}！`;
  }
  function tick(now) {
    if (!state.active) return; const elapsed = Math.min(40, now - lastFrame); lastFrame = now; const d = difficulty();
    if (now - lastSpawn >= d.spawnMs) spawnTarget(now);
    const floor = ui.area.clientHeight - 48;
    for (const target of [...state.targets]) { target.y += ((ui.area.clientHeight - 48 + 58) / d.fallMs) * elapsed; target.el.style.top = `${target.y}px`; if (target.y + 54 >= floor) { state.targets = state.targets.filter(t => t !== target); target.el.remove(); state.fallen++; addFallen(target.letter); updateHud(); ui.message.textContent = `${target.letter} 掉到底部了。`; if (state.fallen >= MAX_FALLEN) { endGame(); return; } } }
    frameId = requestAnimationFrame(tick);
  }
  function startGame() { cancelAnimationFrame(frameId); state = freshState(); ui.targets.replaceChildren(); ui.shots.replaceChildren(); ui.fallen.replaceChildren(); ui.intro.classList.add('hidden'); ui.result.classList.add('hidden'); state.active = true; lastFrame = performance.now(); lastSpawn = lastFrame - 1000; updateHud(); ui.message.textContent = '開始！直接以鍵盤輸入落下字母。'; ui.area.focus(); frameId = requestAnimationFrame(tick); }
  function endGame() { state.active = false; cancelAnimationFrame(frameId); ui.resultScore.textContent = state.score; ui.resultDestroyed.textContent = state.score; ui.resultFallen.textContent = state.fallen; ui.result.classList.remove('hidden'); ui.message.textContent = `本局結束：${state.fallen} 個字母掉到底部。`; }
  function selectMode(mode) { selectedMode = mode; ui.beginner.classList.toggle('selected', mode === 'beginner'); ui.advanced.classList.toggle('selected', mode === 'advanced'); if (!state.active) { state.mode = mode; updateHud(); } }
  state = freshState(); updateHud(); ui.beginner.addEventListener('click', () => selectMode('beginner')); ui.advanced.addEventListener('click', () => selectMode('advanced')); ui.start.addEventListener('click', startGame); ui.restart.addEventListener('click', startGame); window.addEventListener('keydown', handleKey);
})();
