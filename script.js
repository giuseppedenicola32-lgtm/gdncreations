document.getElementById('year').textContent = new Date().getFullYear();

// Contatore visite (giornaliere e totali) tramite CountAPI (servizio gratuito, no login)
(function () {
  const NAMESPACE = "gdncreations-com";
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const totalEl = document.getElementById('visits-total');
  const todayEl = document.getElementById('visits-today');
  if (!totalEl && !todayEl) return;

  fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/total`)
    .then(r => r.json())
    .then(data => { if (totalEl) totalEl.textContent = data.value.toLocaleString('it-IT'); })
    .catch(() => { if (totalEl) totalEl.textContent = "—"; });

  fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/day-${today}`)
    .then(r => r.json())
    .then(data => { if (todayEl) todayEl.textContent = data.value.toLocaleString('it-IT'); })
    .catch(() => { if (todayEl) todayEl.textContent = "—"; });
})();
