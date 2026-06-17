function initCategoryPage(categoryId) {
  const category = getCategory(categoryId);
  if (!category) {
    window.location.href = "index.html";
    return;
  }

  renderNav(categoryId);
  renderCategoryHeader(category);
  renderWorkoutList(category);
  renderCategoryExport(categoryId);
  bindCategoryEvents(categoryId);
  initAiWorkout(categoryId);
}

function renderCategoryHeader(category) {
  document.title = `${category.title} — Workouts`;

  const titleEl = document.getElementById("category-title");
  const taglineEl = document.getElementById("category-tagline");
  const countEl = document.getElementById("category-count");
  const btnEl = document.getElementById("generate-btn");

  if (titleEl) titleEl.textContent = category.title;
  if (countEl) countEl.textContent = category.workouts.length;
  if (btnEl) btnEl.textContent = category.buttonLabel;

  if (taglineEl) {
    if (category.taglineHtml) {
      taglineEl.innerHTML = category.tagline.replace(/\n/g, "<br>");
      taglineEl.classList.add("category-page__tagline--left");
    } else {
      taglineEl.textContent = category.tagline;
    }
  }
}

function renderWorkout(categoryId) {
  const category = getCategory(categoryId);
  const container = document.getElementById("workout-output");
  if (!category || !container || category.workouts.length === 0) return;

  const index = Math.floor(Math.random() * category.workouts.length);
  const workout = category.workouts[index];
  const quote = pickRandomQuote();

  const exercisesHtml = workout.exercises
    .map((ex) => `<li>${escapeHtml(ex)}</li>`)
    .join("");

  container.innerHTML = `
    <div class="workout-card">
      <div class="workout-card__header">
        <p class="workout-card__number">Workout ${index + 1}</p>
        <p class="workout-card__quote">"${escapeHtml(quote)}"</p>
      </div>
      <ul class="workout-card__exercises">${exercisesHtml}</ul>
    </div>
  `;
}

function renderWorkoutList(category) {
  const list = document.getElementById("workout-list");
  if (!list) return;

  const custom = loadCustomWorkouts()[category.id] || [];

  if (custom.length === 0) {
    list.innerHTML = `<p class="workout-list__empty">No custom workouts yet. Add one below!</p>`;
    return;
  }

  list.innerHTML = custom
    .map(
      (workout, i) => `
      <div class="workout-list__item">
        <div class="workout-list__info">
          <strong>Custom workout ${i + 1}</strong>
          <span>${workout.exercises.length} exercise${workout.exercises.length === 1 ? "" : "s"}</span>
        </div>
        <button class="btn-ghost btn-ghost--danger" data-remove="${i}" type="button">Remove</button>
      </div>
    `
    )
    .join("");
}

function renderCategoryExport(categoryId) {
  const panel = document.getElementById("export-panel");
  if (!panel) return;

  const custom = loadCustomWorkouts()[categoryId] || [];
  const exportCode = exportCategoryJs(categoryId);

  if (custom.length === 0) {
    panel.hidden = true;
    return;
  }

  panel.hidden = false;
  const textarea = panel.querySelector(".export-panel__code");
  const feedback = panel.querySelector(".export-panel__feedback");
  if (textarea) textarea.value = exportCode;
  if (feedback) feedback.textContent = "";
}

function bindCategoryEvents(categoryId) {
  const generateBtn = document.getElementById("generate-btn");
  const form = document.getElementById("add-workout-form");
  const list = document.getElementById("workout-list");

  generateBtn?.addEventListener("click", () => renderWorkout(categoryId));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const textarea = document.getElementById("exercises-input");
    const feedback = document.getElementById("form-feedback");
    const raw = textarea.value.trim();

    if (!raw) {
      feedback.textContent = "Enter at least one exercise.";
      feedback.className = "form-feedback form-feedback--error";
      return;
    }

    const exercises = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    addWorkout(categoryId, exercises);
    textarea.value = "";
    feedback.textContent = "Workout saved! It will appear in the random rotation.";
    feedback.className = "form-feedback form-feedback--success";

    const category = getCategory(categoryId);
    document.getElementById("category-count").textContent = category.workouts.length;
    renderWorkoutList(category);
    renderCategoryExport(categoryId);
  });

  list?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;

    const index = parseInt(btn.dataset.remove, 10);
    removeCustomWorkout(categoryId, index);

    const category = getCategory(categoryId);
    document.getElementById("category-count").textContent = category.workouts.length;
    renderWorkoutList(category);
    renderCategoryExport(categoryId);
  });

  const exportPanel = document.getElementById("export-panel");
  exportPanel?.addEventListener("click", async (e) => {
    const copyBtn = e.target.closest("[data-copy-export]");
    if (!copyBtn) return;

    const textarea = exportPanel.querySelector(".export-panel__code");
    const feedback = exportPanel.querySelector(".export-panel__feedback");
    if (!textarea?.value) return;

    const ok = await copyToClipboard(textarea.value);
    if (feedback) {
      feedback.textContent = ok
        ? "Copied! Paste into js/workouts.js, then save the file."
        : "Copy failed — select the text and copy manually.";
      feedback.className = `export-panel__feedback${ok ? " export-panel__feedback--success" : " export-panel__feedback--error"}`;
    }
  });
}
