// GANTI dengan URL Web App Apps Script (berakhiran /exec)
const API = "https://script.google.com/macros/s/AKfycbxRWxAYOndxirEghecZhbhGKm3VkbUhzYypxYeQxUKMsM_uu3S78kTehCQWwfrNUN9W5Q/exec";
const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let S = null;
async function api(p) {
  try { return await (await fetch(API + "?" + new URLSearchParams(p))).json(); }
  catch (e) { return { ok: false, error: "Gagal terhubung ke server" }; }
}
function frame() {
  document.body.insertAdjacentHTML("afterbegin", `<i class="star s1"></i><i class="star s2"></i><header><img src="logo.png" alt="" onerror="this.remove()"><div><b>BPH HMTG “GEA” ITB</b><i>Periode 2026</i></div></header>`);
  document.body.insertAdjacentHTML("beforeend", `<footer>#MSDAGEA2026</footer><div id="modal" class="modal hide" onclick="if(event.target===this)this.classList.add('hide')"><div id="mbody"></div></div>`);
}
function renderInfo(s) {
  $("#info").innerHTML = `<h2>${esc(s.judul)}</h2><div class="info">` + s.info.map(([a, b]) => `<div><span>${esc(a)}</span><p style="margin:0">${esc(b)}</p></div>`).join("") + "</div>";
}
const CLS = { "ONTIME": "ok", "TELAT": "late", "TIDAK HADIR": "no" };
function renderStats(s) {
  $("#stats").innerHTML = Object.keys(CLS).map(k => `<button class="stat ${CLS[k]}" onclick="showList('${k}')"><b>${s.counts[k]}</b><small>${k}</small></button>`).join("");
}
function showList(k) {
  const l = S.members.filter(m => m.status === k);
  $("#mbody").innerHTML = `<h2 style="color:#FFD21F;margin-top:0">${k} (${l.length})</h2>` +
    (l.map(m => `<div class="row">${esc(m.nama)}${m.alasan ? `<small>Alasan: ${esc(m.alasan)}</small>` : ""}</div>`).join("") || "<p>Belum ada.</p>") +
    `<button class="go" onclick="$('#modal').classList.add('hide')">Tutup</button>`;
  $("#modal").classList.remove("hide");
}
function say(el, t, bad) { el.innerHTML = `<div class="msg ${bad ? "e" : "g"}">${esc(t)}</div>`; }
