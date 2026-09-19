document.getElementById('year').textContent = new Date().getFullYear();

// Contatore visite (giornaliere e totali) tramite CounterAPI (servizio gratuito, no login)
(function () {
  const WORKSPACE = "gdncreations-com";
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const totalEl = document.getElementById('visits-total');
  const todayEl = document.getElementById('visits-today');
  if (!totalEl && !todayEl) return;

  function bump(counterName, el) {
    if (!el) return;
    fetch(`https://api.counterapi.dev/v1/${WORKSPACE}/${counterName}/up`)
      .then(r => {
        if (!r.ok) throw new Error("bad response");
        return r.json();
      })
      .then(data => {
        const value = data.count ?? data.value ?? data.data?.up_count;
        el.textContent = (value ?? "—").toLocaleString ? value.toLocaleString('it-IT') : value;
      })
      .catch(() => { el.textContent = "n/d"; });
  }

  bump("total", totalEl);
  bump(`giorno-${today}`, todayEl);
})();
