document.getElementById('year').textContent = new Date().getFullYear();

// Conteggio visite totali (dato pubblico di GoatCounter, tracciato dallo script count.js)
(function () {
  const totalEl = document.getElementById('visits-total');
  if (!totalEl) return;

  fetch('https://gdncreations.goatcounter.com/counter/TOTAL.json')
    .then(r => {
      if (!r.ok) throw new Error('bad response');
      return r.json();
    })
    .then(data => {
      // data.count è tipo "1,234" già formattato da GoatCounter
      totalEl.textContent = data.count || '—';
    })
    .catch(() => { totalEl.textContent = 'n/d'; });
})();
