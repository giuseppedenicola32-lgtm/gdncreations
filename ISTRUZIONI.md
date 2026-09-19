# Istruzioni: pubblicare www.gdncreations.com gratis con GitHub Pages

Questi file compongono il sito statico (HTML/CSS/JS). Segui questi passi per pubblicarlo gratuitamente sul tuo dominio, registrato su Aruba.

## 1. Crea il repository su GitHub

1. Vai su https://github.com/new
2. Nome repository: `gdncreations` (o quello che preferisci)
3. Visibilità: **Public** (necessario per GitHub Pages gratuito su account personale)
4. Non aggiungere README, .gitignore o licenza (li aggiungiamo noi)
5. Crea il repository

## 2. Carica i file

Dalla cartella che hai ricevuto (`gdncreations-site`), da terminale:

```bash
cd gdncreations-site
git init
git add .
git commit -m "Primo commit sito GDN Creations"
git branch -M main
git remote add origin https://github.com/giuseppedenicola32-lgtm/gdncreations.git
git push -u origin main
```

In alternativa, puoi trascinare i file direttamente nella pagina del repository su github.com ("Add file" → "Upload files").

Il file `CNAME` (contenente `www.gdncreations.com`) deve restare nella **root** del repository: è quello che dice a GitHub Pages quale dominio personalizzato usare.

## 3. Attiva GitHub Pages

1. Nel repository, vai su **Settings → Pages**
2. In "Build and deployment" → Source: **Deploy from a branch**
3. Branch: **main**, cartella **/ (root)** → Save
4. Dopo qualche minuto il sito sarà raggiungibile su `https://giuseppedenicola32-lgtm.github.io/gdncreations/`
5. Nello stesso pannello, sotto "Custom domain", inserisci `www.gdncreations.com` e salva (GitHub rigenera/mantiene il file CNAME automaticamente)
6. Spunta **Enforce HTTPS** (potrebbe richiedere qualche minuto/ora prima di essere disponibile, dopo aver configurato il DNS al punto 4)

## 4. Configura il DNS su Aruba

Accedi al pannello di gestione DNS di Aruba per il dominio `gdncreations.com` (Area Clienti Aruba → Domini → gdncreations.com → Gestione DNS) e imposta questi record:

**Per il sottodominio www (quello richiesto):**

| Tipo  | Nome | Valore                          |
|-------|------|----------------------------------|
| CNAME | www  | `giuseppedenicola32-lgtm.github.io.` |

**Per far funzionare anche il dominio senza www (gdncreations.com → redirect automatico a www):**

| Tipo | Nome | Valore          |
|------|------|-----------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

(Questi sono gli indirizzi IP ufficiali di GitHub Pages, sempre gli stessi per tutti gli utenti.)

Nota: su Aruba il pannello DNS a volte non permette un CNAME sulla radice del dominio (`@`) insieme ad altri record — per questo la radice usa i record A e solo `www` usa il CNAME. Questa è la configurazione standard consigliata da GitHub.

La propagazione DNS può richiedere da pochi minuti fino a 24-48 ore.

## 5. Verifica

- `https://www.gdncreations.com` → deve mostrare il sito
- `https://gdncreations.com` → deve reindirizzare automaticamente a www
- Il lucchetto HTTPS deve comparire nel browser una volta che GitHub ha emesso il certificato (automatico, tramite Let's Encrypt)

## Aggiornare il sito in futuro

Modifica i file in locale, poi:

```bash
git add .
git commit -m "Aggiornamento contenuti"
git push
```

Il sito si aggiorna automaticamente in 1-2 minuti.
