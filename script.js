// ============================================================
// KNOWLEDGE BASE
// ============================================================
const symptoms = [
  { code: 'B1',  text: 'Tidak ada gambar tertampil di monitor' },
  { code: 'B2',  text: 'Terdapat garis horizontal / vertikal ditengah monitor' },
  { code: 'B3',  text: 'Tidak ada tampilan awal bios' },
  { code: 'B4',  text: 'Muncul pesan order pada bios (isi pesan selalu berbeda tergantung pada kondisi tertentu)' },
  { code: 'B5',  text: 'Alarm bios berbunyi' },
  { code: 'B6',  text: 'Terdengar suara aneh pada HDD' },
  { code: 'B7',  text: 'Sering terjadi hang/crash saat menjalankan aplikasi' },
  { code: 'B8',  text: 'Selalu Scandisk ketika booting' },
  { code: 'B9',  text: 'Muncul pesan error saat menjalankan game atau aplikasi grafis' },
  { code: 'B10', text: 'Device driver informasi tidak terdeteksi dalam device manager, meski driver telah di install' },
  { code: 'B11', text: 'Tiba-tiba OS melakukan restart otomatis' },
  { code: 'B12', text: 'Keluarnya blue screen pada OS Windows (isi pesan selalu berbeda tergantung pada kondisi tertentu)' },
  { code: 'B13', text: 'Suara tetap tidak keluar meskipun driver dan setting device telah dilakukan sesuai petunjuk' },
  { code: 'B14', text: 'Muncul pesan error saat menjalankan aplikasi audio' },
  { code: 'B15', text: 'Muncul pesan error saat pertama OS di load dari HDD' },
  { code: 'B16', text: 'Tidak ada tanda-tanda dari sebagian/seluruh perangkat bekerja (semua kipas pendingin tidak berpular)' },
  { code: 'B17', text: 'Tiba-tiba mati tanpa sebab' },
  { code: 'B18', text: 'Muncul pesan pada windows, bahwa windows kekurangan virtual memori' },
  { code: 'B19', text: 'Aplikasi berjalan dengan lambat, respon yang lambat terhadap inputan' },
  { code: 'B20', text: 'Kinerja grafis terasa sangat berat (biasanya dlm game dan manipulasi gambar)' },
  { code: 'B21', text: 'Device tidak terdeteksi dalam bios' },
  { code: 'B22', text: 'Informasi deteksi yang salah dalam bios' },
  { code: 'B23', text: 'Hanya sebagian perangkat yang bekerja' },
  { code: 'B24', text: 'Sebagian/seluruh karakter inputan mati' },
  { code: 'B25', text: 'Pointer mouse tidak merespon gerakan mouse' },
];

const damageTypes = {
  A1:  'MONITOR RUSAK',
  A2:  'MEMORI RUSAK',
  A3:  'HDD RUSAK',
  A4:  'VGA RUSAK',
  A5:  'SOUND CARD RUSAK',
  A6:  'OS BERMASALAH',
  A7:  'APLIKASI RUSAK',
  A8:  'PSU RUSAK',
  A9:  'PROSESOR RUSAK',
  A10: 'MEMORY KURANG (PERLU UPGRADE MEMORY)',
  A11: 'MEMORY VGA KURANG (PERLU UPGRADE VGA)',
  A12: 'CLOCK PROSESOR KURANG TINGGI (PERLU UPGRADE PROSESOR)',
  A13: 'KABEL IDE RUSAK',
  A14: 'KURANG DAYA PADA PSU (PERLU UPGRADE PSU)',
  A15: 'PERANGKAT USB RUSAK',
  A16: 'KEYBOARD RUSAK',
  A17: 'MOUSE RUSAK',
};

// Rule 1:  B1, B2           → A1  (Monitor Rusak)
// Rule 2:  B3,B4,B5,B11,B12 → A2  (Memori Rusak)
// Rule 3:  B6,B7,B8,B10,B21,B22 → A3 (HDD Rusak)
// Rule 4:  B1,B3,B5,B9,B10,B12,B13 → A4 (VGA Rusak)
// Rule 5:  B10,B13,B14      → A5  (Sound Card Rusak)
// Rule 6:  B11,B15          → A6  (OS Bermasalah)
// Rule 7:  B7,B12           → A7  (Aplikasi Rusak)
// Rule 8:  B16,B17          → A8  (PSU Rusak)
// Rule 9:  B1,B3,B4,B5      → A9  (Prosesor Rusak)
// Rule 10: B18,B19          → A10 (Memory Kurang)
// Rule 11: B9,B20           → A11 (Memory VGA Kurang)
// Rule 12: B19              → A12 (Clock Prosesor Kurang)
// Rule 13: B21              → A13 (Kabel IDE Rusak)
// Rule 14: B5,B23           → A14 (Kurang Daya PSU)
// Rule 15: B10              → A15 (Perangkat USB Rusak)
// Rule 16: B10,B24          → A16 (Keyboard Rusak)
// Rule 17: B10,B25          → A17 (Mouse Rusak)
const rules = [
  { id: 1,  IF: ['B1', 'B2'],                              THEN: 'A1' },
  { id: 2,  IF: ['B3', 'B4', 'B5', 'B11', 'B12'],         THEN: 'A2' },
  { id: 3,  IF: ['B6', 'B7', 'B8', 'B10', 'B21', 'B22'],  THEN: 'A3' },
  { id: 4,  IF: ['B1', 'B3', 'B5', 'B9', 'B10', 'B12', 'B13'], THEN: 'A4' },
  { id: 5,  IF: ['B10', 'B13', 'B14'],                     THEN: 'A5' },
  { id: 6,  IF: ['B11', 'B15'],                            THEN: 'A6' },
  { id: 7,  IF: ['B7', 'B12'],                             THEN: 'A7' },
  { id: 8,  IF: ['B16', 'B17'],                            THEN: 'A8' },
  { id: 9,  IF: ['B1', 'B3', 'B4', 'B5'],                 THEN: 'A9' },
  { id: 10, IF: ['B18', 'B19'],                            THEN: 'A10' },
  { id: 11, IF: ['B9', 'B20'],                             THEN: 'A11' },
  { id: 12, IF: ['B19'],                                   THEN: 'A12' },
  { id: 13, IF: ['B21'],                                   THEN: 'A13' },
  { id: 14, IF: ['B5', 'B23'],                             THEN: 'A14' },
  { id: 15, IF: ['B10'],                                   THEN: 'A15' },
  { id: 16, IF: ['B10', 'B24'],                            THEN: 'A16' },
  { id: 17, IF: ['B10', 'B25'],                            THEN: 'A17' },
];

// ============================================================
// INIT — wait for DOM to be ready
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

  // Build symptom checkboxes
  const listEl = document.getElementById('symptomList');
  symptoms.forEach(function (s) {
    const label = document.createElement('label');
    label.className = 'symptom-item';
    label.innerHTML =
      '<input type="checkbox" value="' + s.code + '">' +
      '<div class="custom-check"></div>' +
      '<span class="symptom-code">' + s.code + '</span>' +
      '<span class="symptom-text">' + s.text + '</span>';

    const cb = label.querySelector('input');
    cb.addEventListener('change', function () {
      label.classList.toggle('checked', cb.checked);
      evaluate();
    });

    listEl.appendChild(label);
  });

  // Build rule reference table
  const rtb = document.getElementById('ruleTableBody');
  rules.forEach(function (r) {
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="td-rule">RULE ' + r.id + '</td>' +
      '<td class="td-if">' + r.IF.join(', ') + '</td>' +
      '<td class="td-then">' + r.THEN + ' — ' + damageTypes[r.THEN] + '</td>';
    rtb.appendChild(tr);
  });

  // Initial state
  showEmpty();
});

// ============================================================
// INFERENCE ENGINE — Forward Chaining
// ============================================================
function evaluate() {
  const checkedInputs = document.querySelectorAll('#symptomList input:checked');
  const checked = Array.from(checkedInputs).map(function (i) { return i.value; });

  // Update chip counter
  const chip = document.getElementById('countChip');
  chip.textContent = checked.length + ' dipilih';

  if (checked.length === 0) {
    showEmpty();
    return;
  }

  const fired = [];
  const firedRuleIds = [];

  rules.forEach(function (r) {
    // Rule fires only when ALL conditions in IF are satisfied
    const matched = r.IF.every(function (cond) {
      return checked.indexOf(cond) !== -1;
    });
    if (matched) {
      if (fired.indexOf(r.THEN) === -1) fired.push(r.THEN);
      firedRuleIds.push(r.id);
    }
  });

  if (fired.length === 0) {
    showNoResult(checked.length);
  } else {
    showResults(fired, firedRuleIds);
  }
}

// ── UI state helpers ──────────────────────────────────────────

function showEmpty() {
  setStatus('waiting', 'Menunggu Input');
  document.getElementById('resultBody').innerHTML =
    '<div class="empty-state">' +
      '<div class="empty-icon">🖥️</div>' +
      '<div class="empty-text">Centang gejala yang terdeteksi untuk memulai diagnosis.</div>' +
    '</div>';
  document.getElementById('rulesMatched').style.display = 'none';
}

function showNoResult(n) {
  setStatus('no-match', n + ' gejala — belum ada rule yang cocok');
  document.getElementById('resultBody').innerHTML =
    '<div class="empty-state">' +
      '<div class="empty-icon">🔍</div>' +
      '<div class="empty-text">Belum ada aturan yang cocok sepenuhnya.<br>Coba tambah gejala lain.</div>' +
    '</div>';
  document.getElementById('rulesMatched').style.display = 'none';
}

function showResults(fired, firedRuleIds) {
  setStatus('matched', fired.length + ' kerusakan terdeteksi');

  const bodyEl = document.getElementById('resultBody');
  bodyEl.innerHTML = fired.map(function (code) {
    const matchedRuleLabels = rules
      .filter(function (r) { return r.THEN === code && firedRuleIds.indexOf(r.id) !== -1; })
      .map(function (r) { return 'Rule ' + r.id; })
      .join(', ');

    return '<div class="damage-item">' +
      '<div class="damage-badge">' + code + '</div>' +
      '<div class="damage-info">' +
        '<div class="damage-name">' + damageTypes[code] + '</div>' +
        '<div class="damage-rule-ref">via ' + matchedRuleLabels + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  const rulesMatchedEl = document.getElementById('rulesMatched');
  rulesMatchedEl.style.display = 'block';
  document.getElementById('rulesList').innerHTML = firedRuleIds.map(function (id) {
    return '<span class="rule-tag">RULE ' + id + '</span>';
  }).join('');
}

function setStatus(state, label) {
  const dot = document.getElementById('statusIndicator');
  dot.className = 'status-indicator ' + state;
  document.getElementById('statusLabel').textContent = label;
}

// ── Controls ──────────────────────────────────────────────────

function resetAll() {
  document.querySelectorAll('#symptomList input').forEach(function (cb) {
    cb.checked = false;
    cb.closest('.symptom-item').classList.remove('checked');
  });
  document.getElementById('countChip').textContent = '0 dipilih';
  showEmpty();
}

function toggleKB() {
  const wrap = document.getElementById('kbTable');
  const btn  = document.getElementById('kbToggleBtn');
  wrap.classList.toggle('open');
  btn.classList.toggle('open');
}