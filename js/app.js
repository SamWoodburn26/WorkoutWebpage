function initHomePage() {
  renderNav("home");
  initStats();
  initQuoteTicker();
  initCategoryCards();
  initGlobalExport();
}

function initStats() {
  const categories = getCategories();
  const totalEl = document.getElementById("stat-total");
  if (totalEl) totalEl.textContent = getTotalWorkouts();

  Object.entries(categories).forEach(([id, cat]) => {
    const el = document.getElementById(`stat-${id}`);
    if (el) el.textContent = cat.workouts.length;
  });
}

function initCategoryCards() {
  const grid = document.getElementById("category-grid");
  if (!grid) return;

  const categories = getCategories();
  grid.innerHTML = Object.values(categories)
    .map(
      (cat) => `
      <a href="${cat.page}" class="category-card">
        <span class="category-card__count">${cat.workouts.length} workouts</span>
        <h2 class="category-card__title">${escapeHtml(cat.title)}</h2>
        <p class="category-card__tagline">${escapeHtml(cat.tagline.split("\n")[0])}</p>
        <span class="category-card__cta">View workouts →</span>
      </a>
    `
    )
    .join("");
}

function initQuoteTicker() {
  const track = document.getElementById("quote-track");
  const featured = document.getElementById("featured-quote");
  if (!track || !featured) return;

  const doubled = [...MOTIVATIONAL_QUOTES, ...MOTIVATIONAL_QUOTES];
  track.innerHTML = doubled
    .map((q) => `<span class="quote-ticker__item">${escapeHtml(q)}</span>`)
    .join("");

  let index = 0;
  featured.textContent = MOTIVATIONAL_QUOTES[0];

  setInterval(() => {
    index = (index + 1) % MOTIVATIONAL_QUOTES.length;
    featured.style.opacity = "0";
    setTimeout(() => {
      featured.textContent = MOTIVATIONAL_QUOTES[index];
      featured.style.opacity = "1";
    }, 300);
  }, 5000);
}

function initGlobalExport() {
  const section = document.getElementById("export-section");
  if (!section || !hasCustomWorkouts()) return;

  const exportCode = exportAllCustomJs();
  section.hidden = false;

  const textarea = section.querySelector(".export-panel__code");
  const feedback = section.querySelector(".export-panel__feedback");
  if (textarea) textarea.value = exportCode;

  section.addEventListener("click", async (e) => {
    const copyBtn = e.target.closest("[data-copy-export]");
    if (!copyBtn || !textarea?.value) return;

    const ok = await copyToClipboard(textarea.value);
    if (feedback) {
      feedback.textContent = ok
        ? "Copied! Paste into js/workouts.js, then save the file."
        : "Copy failed — select the text and copy manually.";
      feedback.className = `export-panel__feedback${ok ? " export-panel__feedback--success" : " export-panel__feedback--error"}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", initHomePage);
