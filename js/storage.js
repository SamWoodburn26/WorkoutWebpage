const STORAGE_KEY = "workoutWebpage_custom";

function loadCustomWorkouts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCustomWorkouts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCategories() {
  const custom = loadCustomWorkouts();
  const merged = {};

  Object.entries(DEFAULT_CATEGORIES).forEach(([id, category]) => {
    const defaults = category.workouts.map((w) => ({ ...w, custom: false }));
    const added = (custom[id] || []).map((w) => ({ ...w, custom: true }));
    merged[id] = { ...category, workouts: [...defaults, ...added] };
  });

  return merged;
}

function getCategory(id) {
  return getCategories()[id] || null;
}

function addWorkout(categoryId, exercises) {
  const custom = loadCustomWorkouts();
  if (!custom[categoryId]) custom[categoryId] = [];
  custom[categoryId].push({ exercises, custom: true });
  saveCustomWorkouts(custom);
}

function removeCustomWorkout(categoryId, index) {
  const custom = loadCustomWorkouts();
  if (!custom[categoryId] || !custom[categoryId][index]) return;
  custom[categoryId].splice(index, 1);
  if (custom[categoryId].length === 0) delete custom[categoryId];
  saveCustomWorkouts(custom);
}

function getTotalWorkouts() {
  return Object.values(getCategories()).reduce(
    (sum, cat) => sum + cat.workouts.length,
    0
  );
}

function pickRandomQuote() {
  return MOTIVATIONAL_QUOTES[
    Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
  ];
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function hasCustomWorkouts() {
  const custom = loadCustomWorkouts();
  return Object.values(custom).some((workouts) => workouts.length > 0);
}

function formatWorkoutAsJs(workout) {
  const exercises = workout.exercises.map((e) => JSON.stringify(e)).join(", ");
  return `      { exercises: [${exercises}] },`;
}

function exportCategoryJs(categoryId) {
  const custom = loadCustomWorkouts()[categoryId] || [];
  if (custom.length === 0) return "";

  const category = DEFAULT_CATEGORIES[categoryId];
  const lines = [
    `// Paste into DEFAULT_CATEGORIES.${categoryId}.workouts in js/workouts.js`,
    `// Category: ${category?.title || categoryId}`,
    "",
  ];
  custom.forEach((workout) => lines.push(formatWorkoutAsJs(workout)));
  return lines.join("\n");
}

function exportAllCustomJs() {
  const custom = loadCustomWorkouts();
  const entries = Object.entries(custom).filter(([, workouts]) => workouts.length > 0);
  if (entries.length === 0) return "";

  const lines = [
    "// Paste into js/workouts.js — add each block to the matching category's workouts array",
    "",
  ];

  entries.forEach(([id, workouts]) => {
    const category = DEFAULT_CATEGORIES[id];
    lines.push(`// ── ${id} (${category?.title || id}) ──`);
    workouts.forEach((workout) => lines.push(formatWorkoutAsJs(workout)));
    lines.push("");
  });

  return lines.join("\n").trimEnd();
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}
