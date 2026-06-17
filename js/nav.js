const NAV_ITEMS = [
  { label: "Home", href: "index.html", id: "home" },
  { label: "Push", href: "push.html", id: "push" },
  { label: "Pull", href: "pull.html", id: "pull" },
  { label: "Legs", href: "legs.html", id: "legs" },
  { label: "Abs", href: "abs.html", id: "abs" },
];

function renderNav(activePage) {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  const links = NAV_ITEMS.map(
    (item) =>
      `<li><a href="${item.href}" class="navbar__links${
        activePage === item.id ? " navbar__links--active" : ""
      }">${item.label}</a></li>`
  ).join("");

  nav.innerHTML = `
    <div class="navbar__container">
      <a href="index.html" class="navbar__logo">Workouts</a>
      <button class="navbar__toggle" id="mobile-menu" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <ul class="navbar__menu">
        ${links}
        <li>
          <a href="https://music.apple.com/us/playlist/gym/pl.u-2aoqPqDH8qbgyW"
             class="navbar__cta" target="_blank" rel="noopener noreferrer">Gym Music</a>
        </li>
      </ul>
    </div>
  `;

  initMobileMenu();
}

function initMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");
  if (!menu || !menuLinks) return;

  menu.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });

  menuLinks.addEventListener("click", () => {
    menu.classList.remove("is-active");
    menuLinks.classList.remove("active");
  });
}
