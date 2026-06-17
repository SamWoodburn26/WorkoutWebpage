let pendingAiWorkout = null;

function getAllExercisesForCategory(categoryId) {
  const category = getCategory(categoryId);
  if (!category) return [];

  const seen = new Set();
  category.workouts.forEach((workout) => {
    workout.exercises.forEach((ex) => seen.add(ex));
  });
  return [...seen];
}

function initAiWorkout(categoryId) {
  const generateBtn = document.getElementById("ai-generate-btn");
  const preview = document.getElementById("ai-preview");
  if (!generateBtn || !preview) return;

  generateBtn.addEventListener("click", () => requestAiWorkout(categoryId));

  preview.addEventListener("click", (e) => {
    if (e.target.closest("[data-ai-approve]")) {
      approveAiWorkout(categoryId);
    } else if (e.target.closest("[data-ai-retry]")) {
      pendingAiWorkout = null;
      preview.hidden = true;
      requestAiWorkout(categoryId);
    } else if (e.target.closest("[data-ai-discard]")) {
      discardAiWorkout();
    }
  });
}

async function requestAiWorkout(categoryId) {
  const category = getCategory(categoryId);
  const status = document.getElementById("ai-status");
  const preview = document.getElementById("ai-preview");
  const generateBtn = document.getElementById("ai-generate-btn");

  if (!category || !status || !preview || !generateBtn) return;

  generateBtn.disabled = true;
  status.textContent = "Generating workout with Ollama…";
  status.className = "ai-workout__status ai-workout__status--loading";
  preview.hidden = true;
  pendingAiWorkout = null;

  try {
    const res = await fetch("/api/generate-workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId,
        title: category.title,
        exercises: getAllExercisesForCategory(categoryId),
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Generation failed");

    pendingAiWorkout = data.exercises;
    status.textContent = "Review the workout below. Save it only if you approve.";
    status.className = "ai-workout__status ai-workout__status--success";
    renderAiPreview(data.exercises);
    preview.hidden = false;
  } catch (err) {
    status.textContent = err.message;
    status.className = "ai-workout__status ai-workout__status--error";
  } finally {
    generateBtn.disabled = false;
  }
}

function renderAiPreview(exercises) {
  const preview = document.getElementById("ai-preview");
  if (!preview) return;

  const list = exercises
    .map((ex) => `<li>${escapeHtml(ex)}</li>`)
    .join("");

  preview.innerHTML = `
    <div class="workout-card workout-card--ai">
      <div class="workout-card__header">
        <p class="workout-card__number">AI-generated workout</p>
        <p class="workout-card__quote">Review before saving — nothing is stored until you approve.</p>
      </div>
      <ul class="workout-card__exercises">${list}</ul>
      <div class="ai-workout__actions">
        <button class="btn-primary" type="button" data-ai-approve>Approve &amp; save</button>
        <button class="btn-secondary" type="button" data-ai-retry>Try again</button>
        <button class="btn-ghost" type="button" data-ai-discard>Discard</button>
      </div>
    </div>
  `;
}

function approveAiWorkout(categoryId) {
  if (!pendingAiWorkout?.length) return;

  addWorkout(categoryId, pendingAiWorkout);

  const status = document.getElementById("ai-status");
  const preview = document.getElementById("ai-preview");
  const category = getCategory(categoryId);

  document.getElementById("category-count").textContent = category.workouts.length;
  renderWorkoutList(category);
  renderCategoryExport(categoryId);

  pendingAiWorkout = null;
  preview.hidden = true;
  status.textContent = "Workout saved! It will appear in the random rotation.";
  status.className = "ai-workout__status ai-workout__status--success";
}

function discardAiWorkout() {
  pendingAiWorkout = null;
  const preview = document.getElementById("ai-preview");
  const status = document.getElementById("ai-status");
  if (preview) preview.hidden = true;
  if (status) {
    status.textContent = "Workout discarded.";
    status.className = "ai-workout__status";
  }
}
