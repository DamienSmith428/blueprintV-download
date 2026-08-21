// blueprintV frontend — app.js
// Handles file upload, options, API calls, progress, and result rendering.

(function () {
  'use strict';

  // ── Config — UPDATE THIS after deploying your Render service ──────────────
  // Replace the URL below with your actual Render web service URL.
  // Example: 'https://blueprintv-api.onrender.com'
  const API_BASE = window.BLUEPRINTV_API || 'https://blueprintv-hosted-source.onrender.com';

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const dropzone      = document.getElementById('dropzone');
  const fileInput     = document.getElementById('fileInput');
  const fileInfo      = document.getElementById('fileInfo');
  const fileName      = document.getElementById('fileName');
  const fileSize      = document.getElementById('fileSize');
  const fileClear     = document.getElementById('fileClear');
  const btnGenerate   = document.getElementById('btnGenerate');
  const progressWrap  = document.getElementById('progressWrap');
  const progressFill  = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const results       = document.getElementById('results');
  const resultsTitle  = document.getElementById('resultsTitle');
  const resultsList   = document.getElementById('resultsList');
  const btnDownload   = document.getElementById('btnDownload');
  const errorBanner   = document.getElementById('errorBanner');
  const errorMsg      = document.getElementById('errorMsg');
  const errorClose    = document.getElementById('errorClose');

  const templateSizeEl = document.getElementById('templateSize');
  const liverySlotsEl  = document.getElementById('liverySlots');
  const patchCarcolsEl = document.getElementById('patchCarcols');
  const patchCarvarEl  = document.getElementById('patchCarvar');

  let selectedFile = null;

  // ── Drop zone ──────────────────────────────────────────────────────────────
  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) setFile(file);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) setFile(fileInput.files[0]);
  });

  fileClear.addEventListener('click', clearFile);

  function setFile(file) {
    if (!file.name.toLowerCase().endsWith('.zip')) {
      showError('Only .zip files are accepted. Please zip your FiveM resource folder first.');
      return;
    }
    selectedFile = file;
    fileName.textContent = file.name;
    fileSize.textContent = formatBytes(file.size);
    fileInfo.hidden = false;
    hideError();
    results.hidden = true;
  }

  function clearFile() {
    selectedFile = null;
    fileInput.value = '';
    fileInfo.hidden = true;
    results.hidden  = true;
    hideError();
  }

  // ── Generate ───────────────────────────────────────────────────────────────
  btnGenerate.addEventListener('click', async () => {
    if (!selectedFile) return;

    hideError();
    results.hidden = true;
    setProgress(0, 'Uploading…');
    progressWrap.hidden = false;
    btnGenerate.disabled = true;
    progressFill.classList.add('indeterminate');

    const formData = new FormData();
    formData.append('resource',     selectedFile);
    formData.append('templateSize', templateSizeEl.value);
    formData.append('liverySlots',  liverySlotsEl.value);
    formData.append('patchCarcols', patchCarcolsEl.checked ? 'true' : 'false');
    formData.append('patchCarvar',  patchCarvarEl.checked  ? 'true' : 'false');

    try {
      setProgress(null, 'Processing resource…');

      const res  = await fetch(`${API_BASE}/api/process`, {
        method : 'POST',
        body   : formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`);
      }

      renderResults(data);

    } catch (err) {
      console.error(err);
      showError(err.message || 'Something went wrong. Check your connection and try again.');
    } finally {
      progressFill.classList.remove('indeterminate');
      progressWrap.hidden  = true;
      btnGenerate.disabled = false;
    }
  });

  // ── Results rendering ──────────────────────────────────────────────────────
  function renderResults(data) {
    resultsList.innerHTML = '';

    const ok  = data.vehicles.filter(v => v.success).length;
    const bad = data.vehicles.length - ok;
    resultsTitle.textContent = `Results — ${ok} succeeded${bad ? ', ' + bad + ' failed' : ''}`;

    for (const v of data.vehicles) {
      const item = document.createElement('div');
      item.className = `result-item ${v.success ? 'success' : 'fail'}`;

      const logText = v.log ? v.log.join('\n') : '';
      const logColoured = logText
        .replace(/✔/g,  '<span style="color:#00d264">✔</span>')
        .replace(/✖/g,  '<span style="color:#ff5050">✖</span>')
        .replace(/⚠/g,  '<span style="color:#ffc832">⚠</span>');

      item.innerHTML = `
        <div class="result-header">
          <span class="result-status">${v.success ? '✔' : '✖'}</span>
          <span class="result-name">${escapeHtml(v.modelName)}</span>
          <span class="result-toggle">▾</span>
        </div>
        <div class="result-log">${logColoured || '(no log)'}</div>`;

      item.querySelector('.result-header').addEventListener('click', () => {
        item.classList.toggle('open');
      });

      resultsList.appendChild(item);
    }

    // Wire up download button
    const downloadUrl = `${API_BASE}${data.downloadUrl}`;
    btnDownload.href = downloadUrl;
    btnDownload.setAttribute('download', '');

    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Progress helpers ───────────────────────────────────────────────────────
  function setProgress(pct, label) {
    if (pct !== null) {
      progressFill.classList.remove('indeterminate');
      progressFill.style.width = pct + '%';
    }
    progressLabel.textContent = label;
  }

  // ── Error helpers ──────────────────────────────────────────────────────────
  function showError(msg) {
    errorMsg.textContent = msg;
    errorBanner.hidden = false;
  }

  function hideError() {
    errorBanner.hidden = true;
    errorMsg.textContent = '';
  }

  errorClose.addEventListener('click', hideError);

  // ── Utilities ──────────────────────────────────────────────────────────────
  function formatBytes(bytes) {
    if (bytes < 1024)       return bytes + ' B';
    if (bytes < 1048576)    return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ── API connectivity check ─────────────────────────────────────────────────
  // Quietly ping /health so Render's free-tier instance wakes up early.
  fetch(`${API_BASE}/health`).catch(() => { /* ignore — just a warm-up */ });

}());
