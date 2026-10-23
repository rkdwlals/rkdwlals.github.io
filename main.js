// 작업 타임라인 (트랙 뷰)
// 날짜는 "YYYY-MM" 형식. end가 없으면 한 달짜리 클립으로 그립니다.
// target은 클릭했을 때 이동할 섹션 id입니다.
const RANGE = { from: "2023-01", to: "2026-12" };
const NOW = "2026-10";

const LANES = [
  { key: "sound", name: "사운드", color: "var(--sound)", items: [
    { label: "로비 BGM", start: "2024-10", end: "2024-11", target: "nursing" },
    { label: "로스트아크 SFX", start: "2025-12", target: "lostark" },
    { label: "ZZZ SFX", start: "2026-09", target: "zzz" },
  ]},
  { key: "game", name: "게임 개발", color: "var(--game)", items: [
    { label: "파이썬 횡스크롤", start: "2023-05", target: "pygame" },
    { label: "room: 404", start: "2023-10", end: "2023-12", target: "room404" },
    { label: "가상병실 콘텐츠", start: "2024-05", end: "2024-12", target: "nursing" },
    { label: "래그돌 클라이밍", start: "2024-06", target: "ragdoll" },
    { label: "Invite", start: "2024-07", end: "2024-10", target: "invite" },
    { label: "멀티플레이 FPS", start: "2024-12", target: "fps" },
    { label: "VR 퀴즈", start: "2024-12", target: "vrquiz" },
    { label: "GitDesk", start: "2025-06", target: "gitdesk" },
    { label: "Parry Paws", start: "2025-12", target: "porta" },
    { label: "LLM–WFC", start: "2026-10", target: "llmwfc" },
  ]},
  { key: "research", name: "연구", color: "var(--research)", items: [
    { label: "메타버스공간정보연구실", start: "2023-05", end: "2025-07", target: "research" },
    { label: "ETRI 위탁과제", start: "2023-05", end: "2023-11", target: "research" },
    { label: "졸음 방지", start: "2023-10", end: "2023-12", target: "sleep" },
    { label: "직캠 모듈", start: "2025-05", end: "2025-06", target: "facecam" },
    { label: "ETRI 위탁과제", start: "2024-06", end: "2024-11", target: "research" },
    { label: "Immervis Lab", start: "2025-10", end: "2026-08", target: "research" },
  ]},
  { key: "activity", name: "활동", color: "var(--activity)", items: [
    { label: "LG U+ QA", start: "2023-07", target: "lgu" },
    { label: "학생회장", start: "2025-02", end: "2026-03", target: "council" },
    { label: "SW프런티어", start: "2025-04", end: "2025-10", target: "research" },
    { label: "사운드과정 수료", start: "2026-09", target: "research" },
  ]},
];

const toIndex = (ym) => { const [y, m] = ym.split("-").map(Number); return y * 12 + (m - 1); };
const R0 = toIndex(RANGE.from);
const SPAN = toIndex(RANGE.to) - R0 + 1;
const pct = (i) => ((i - R0) / SPAN) * 100;

// 겹치는 클립은 아래 줄로 내립니다.
function pack(items) {
  const rows = [];
  const sorted = [...items].sort((a, b) => toIndex(a.start) - toIndex(b.start));
  for (const it of sorted) {
    const s = toIndex(it.start);
    const e = toIndex(it.end || it.start) + 1;
    const need = Math.ceil(it.label.length * 0.75) + 1;
    const nearEnd = !it.end && ((s - R0) / SPAN) > 0.85;
    const from = nearEnd ? e - need : s;
    const minEnd = nearEnd ? e : s + Math.max(e - s, need);
    let row = rows.findIndex((r) => r <= from);
    if (row === -1) { row = rows.length; rows.push(0); }
    rows[row] = minEnd;
    it._row = row; it._s = s; it._e = e;
  }
  return rows.length;
}

function waveSVG(seed) {
  let x = seed * 9301 + 49297, d = "M0 13";
  for (let i = 0; i <= 60; i++) {
    x = (x * 9301 + 49297) % 233280;
    const h = 2 + (x / 233280) * 9;
    d += ` L${i * 4} ${13 - h} L${i * 4 + 2} ${13 + h}`;
  }
  return `<svg class="wave" viewBox="0 0 240 26" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" stroke="#fff" stroke-width="1" fill="none"/></svg>`;
}

function build() {
  const root = document.getElementById("trackView");
  if (!root) return;
  const years = [];
  for (let y = Number(RANGE.from.slice(0, 4)); y <= Number(RANGE.to.slice(0, 4)); y++) {
    const left = pct(toIndex(`${y}-01`));
    years.push(`<div class="year" style="left:${left}%;width:${(12 / SPAN) * 100}%">${y}</div>`);
  }
  const grids = years.map((_, i) => `<div class="grid" style="left:${(i * 12 / SPAN) * 100}%"></div>`).join("");
  let html = `<div class="ruler"><div></div><div class="years">${years.join("")}</div></div>`;
  let seed = 1;
  for (const lane of LANES) {
    const rows = pack(lane.items);
    const height = rows * 32 + 10;
    const clips = lane.items.map((it) => {
      const left = pct(it._s);
      const width = Math.max(((it._e - it._s) / SPAN) * 100, 0);
      const point = !it.end;
      const nearEnd = point && left > 85;
      const pos = nearEnd ? `right:${100 - pct(it._s + 1)}%;` : `left:${left}%;`;
      const style = `${pos}top:${it._row * 32 + 8}px;${point ? "" : `min-width:${width}%;`}`;
      const range = it.end ? `${it.start} ~ ${it.end}` : it.start;
      return `<a class="clip${point ? " point" : ""}" href="#${it.target}" style="${style}" title="${it.label} (${range})">${point ? "" : waveSVG(seed++)}<span>${it.label}</span></a>`;
    }).join("");
    html += `<div class="lane" style="--lane:${lane.color}"><div class="lane-name">${lane.name}</div><div class="lane-body" style="height:${height}px">${grids}${clips}</div></div>`;
  }
  root.innerHTML = html;
  const nowLeft = pct(toIndex(NOW) + 0.5);
  const ph = document.createElement("div");
  ph.className = "playhead";
  ph.style.left = `calc(96px + (100% - 96px) * ${nowLeft / 100})`;
  root.appendChild(ph);
}
build();

// 좁은 화면에서는 최근 작업이 먼저 보이도록 오른쪽 끝으로 맞춥니다.
const scroller = document.querySelector(".track-scroll");
if (scroller && scroller.scrollWidth > scroller.clientWidth) {
  scroller.scrollLeft = scroller.scrollWidth;
}
