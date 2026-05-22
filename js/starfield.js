const sf = document.getElementById('starfield');

for (let i = 0; i < 300; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const dur = 1.5 + Math.random() * 3;
  const drift = 20 + Math.random() * 40;
  const minOp = 0.1 + Math.random() * 0.3;
  s.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 150 - 50}%;
    width: ${1 + Math.random() * 2}px;
    height: ${1 + Math.random() * 2}px;
    --dur: ${dur}s;
    --drift: ${drift}s;
    --min-op: ${minOp};
    animation: twinkle ${dur}s ease-in-out infinite alternate, drift ${drift}s linear infinite;
    animation-delay: -${Math.random() * dur}s, -${Math.random() * drift}s;
  `;
  sf.appendChild(s);
}

const meteorCount = 3;

function createMeteor(index) {
  const m = document.createElement('div');
  m.className = 'meteor';
  const speed = 0.5 + Math.random() * 6;
  
  let top, left;
  if (Math.random() < 0.5) {
    top = -15 + Math.random() * 5;
    left = Math.random() * 100;
  } else {
    top = Math.random() * 100;
    left = -15 + Math.random() * 5;
  }
  
  m.style.cssText = `
    top: ${top}%;
    left: ${left}%;
    --speed: ${speed}s;
    animation: shoot ${speed}s linear forwards;
  `;
  
  sf.appendChild(m);
  
  setTimeout(() => {
    m.remove();
    createMeteor(index);
  }, speed * 1000);
}

for (let i = 0; i < meteorCount; i++) {
  setTimeout(() => createMeteor(i), i * 2000);
}