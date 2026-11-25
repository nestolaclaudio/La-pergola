/*
 * Configurazione avvisi straordinari.
 * date: YYYY-MM-DD; status: "open" (apertura) oppure "closed" (chiusura).
 * Per non mostrare l'avviso, imposta enabled su false.
 */
const ANNOUNCEMENT_CONFIG = {
  enabled: true,
  delayMs: 2000,
  activeFrom: "2026-12-19", // Primo giorno in cui il pop-up può comparire (YYYY-MM-DD).
  activeUntil: "2027-01-07", // Ultimo giorno di attività, incluso (YYYY-MM-DD).
  period: { start: "2026-12-20", end: "2027-01-07" },
  regularOpenWeekdays: [0, 1, 2, 3, 4, 5, 6], // Tutti i giorni, salvo chiusure straordinarie.
  events: [
    { date: "2026-12-21", status: "closed", hours: "Chiuso" },
    { date: "2026-12-22", status: "closed", hours: "Chiuso" },
    { date: "2026-12-23", status: "closed", hours: "Chiuso" },
    { date: "2026-12-24", status: "closed", hours: "Chiuso" },
    { date: "2026-12-25", status: "closed", hours: "Chiuso", note: "Buon Natale!" },
    { date: "2026-12-31", status: "closed", hours: "Chiuso" },
    { date: "2027-01-07", status: "closed", hours: "Chiuso" },
    // { date: "2026-12-27", status: "open", hours: "18:30–23:00", note: "Apertura straordinaria" }
  ]
};

(() => {
  const dialog = document.getElementById("announcement-dialog");
  if (!dialog || !ANNOUNCEMENT_CONFIG.enabled || !ANNOUNCEMENT_CONFIG.events.length) return;

  const calendar = dialog.querySelector("[data-announcement-calendar]");
  const closeButton = dialog.querySelector(".announcement-close");
  const confirmButton = dialog.querySelector("[data-announcement-confirm]");
  const sessionKey = "laPergolaAnnouncementShown";
  const language = () => document.documentElement.lang === "en" ? "en" : "it";
  const copy = (value) => typeof value === "string" ? value : (value?.[language()] || value?.it || "");
  const todayInItaly = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date());
    const part = type => parts.find(item => item.type === type).value;
    return part("year") + "-" + part("month") + "-" + part("day");
  };

  function render() {
    const en = language() === "en";
    dialog.querySelector("[data-announcement-title]").textContent = en ? "Christmas holidays" : "Festività natalizie";
    dialog.querySelector("[data-announcement-description]").textContent = en
      ? "Christmas holiday calendar."
      : "Calendario delle festività natalizie.";
    dialog.querySelector("[data-announcement-legend]").textContent = en
      ? "✓ Open   × Closed"
      : "✓ Aperto   × Chiuso";
    confirmButton.textContent = en ? "GOT IT" : "HO CAPITO";
    closeButton.setAttribute("aria-label", en ? "Close notice" : "Chiudi avviso");
    calendar.replaceChildren();
    const events = ANNOUNCEMENT_CONFIG.events
      .filter(event => /^\d{4}-\d{2}-\d{2}$/.test(event.date) && ["open", "closed"].includes(event.status))
      .sort((a, b) => a.date.localeCompare(b.date));
    const startParts = ANNOUNCEMENT_CONFIG.period.start.split("-").map(Number);
    const endParts = ANNOUNCEMENT_CONFIG.period.end.split("-").map(Number);
    const startDate = new Date(Date.UTC(startParts[0], startParts[1] - 1, startParts[2]));
    const endDate = new Date(Date.UTC(endParts[0], endParts[1] - 1, endParts[2]));
    const periodEvents = events.filter(event => event.date >= ANNOUNCEMENT_CONFIG.period.start && event.date <= ANNOUNCEMENT_CONFIG.period.end);
    const formatDate = (year, month, day) => new Intl.DateTimeFormat(en ? "en-GB" : "it-IT", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
    }).format(new Date(Date.UTC(year, month - 1, day)));
    const weekdayFormatter = new Intl.DateTimeFormat(en ? "en" : "it", { weekday: "short", timeZone: "UTC" });
    const periodStartLabel = new Intl.DateTimeFormat(en ? "en-GB" : "it-IT", { day: "numeric", month: "long", timeZone: "UTC" }).format(startDate);
    const periodEndLabel = new Intl.DateTimeFormat(en ? "en-GB" : "it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(endDate);
    const section = document.createElement("section");
    section.className = "announcement-month";
    const heading = document.createElement("h3");
    heading.id = "announcement-title";
    heading.textContent = (en ? "From " : "Dal ") + periodStartLabel + (en ? " to " : " al ") + periodEndLabel;
    section.append(heading);

    const grid = document.createElement("div");
    grid.className = "announcement-calendar-grid";
    grid.setAttribute("role", "grid");
    grid.setAttribute("aria-label", heading.textContent);
    for (let index = 0; index < 7; index++) {
      const weekday = document.createElement("span");
      weekday.textContent = weekdayFormatter.format(new Date(Date.UTC(2024, 0, index + 1)));
      weekday.setAttribute("aria-hidden", "true");
      grid.append(weekday);
    }
    const offset = (startDate.getUTCDay() + 6) % 7;
    for (let blank = 0; blank < offset; blank++) {
      const empty = document.createElement("span");
      empty.className = "announcement-day is-empty";
      empty.setAttribute("aria-hidden", "true");
      grid.append(empty);
    }
    const eventsByDate = new Map(periodEvents.map(event => [event.date, event]));
    for (let dayDate = new Date(startDate); dayDate <= endDate; dayDate.setUTCDate(dayDate.getUTCDate() + 1)) {
      const dateKey = dayDate.toISOString().slice(0, 10);
      const year = dayDate.getUTCFullYear(), month = dayDate.getUTCMonth() + 1, day = dayDate.getUTCDate();
      const event = eventsByDate.get(dateKey);
      const status = event?.status || (ANNOUNCEMENT_CONFIG.regularOpenWeekdays.includes(dayDate.getUTCDay()) ? "open" : "regular-closed");
      const cell = document.createElement("span");
      cell.className = "announcement-day is-" + status;
      cell.setAttribute("role", "gridcell");
      const number = document.createElement("span");
      number.textContent = String(day);
      cell.append(number);
      if (status !== "regular-closed") {
        const marker = document.createElement("span");
        marker.className = "announcement-day-marker";
        marker.setAttribute("aria-hidden", "true");
        marker.textContent = status === "closed" ? "\u00D7" : "\u2713";
        cell.append(marker);
      }
      const statusText = status === "closed" || status === "regular-closed" ? (en ? "Closed" : "Chiuso") : (en ? "Open" : "Aperto");
      const label = formatDate(year, month, day) + " \u2014 " + statusText + (event?.hours ? ", " + copy(event.hours) : "") + (event?.note ? ", " + copy(event.note) : "");
      cell.setAttribute("aria-label", label);
      cell.setAttribute("title", label);
      grid.append(cell);
    }
    section.append(grid);
    calendar.append(section);
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  closeButton.addEventListener("click", closeDialog);
  confirmButton.addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("cancel", event => {
    event.preventDefault();
    closeDialog();
  });
  document.getElementById("language-toggle")?.addEventListener("click", () => {
    window.setTimeout(render, 0);
  });

  let alreadyShown = false;
  try { alreadyShown = sessionStorage.getItem(sessionKey) === "1"; } catch (error) { /* Storage may be unavailable. */ }
  if (alreadyShown) return;
  const today = todayInItaly();
  if ((ANNOUNCEMENT_CONFIG.activeFrom && today < ANNOUNCEMENT_CONFIG.activeFrom) ||
      (ANNOUNCEMENT_CONFIG.activeUntil && today > ANNOUNCEMENT_CONFIG.activeUntil)) return;

  render();
  window.setTimeout(() => {
    if (dialog.open) return;
    try { sessionStorage.setItem(sessionKey, "1"); } catch (error) { /* The notice still works without storage. */ }
    dialog.showModal();
  }, Math.max(0, Number(ANNOUNCEMENT_CONFIG.delayMs) || 0));
})();
