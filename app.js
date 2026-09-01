// Adding a new top-level tab: add an entry here + a matching <section id="page-{id}">
// in index.html. The nav and routing below are driven entirely by this array.
const pages = [
  { id: "home", label: "About" },
  { id: "portfolio", label: "Portfolio" },
];

// Adding a new portfolio category: add an entry here (with placeholder items) and
// it will automatically appear in the sidebar — no other changes needed.
const portfolioCategories = [
  {
    id: "web-development",
    label: "Web Development",
    description: "Placeholder description for web development projects.",
    items: [
      { title: "Project Placeholder 1", summary: "Short placeholder summary of this project." },
      { title: "Project Placeholder 2", summary: "Short placeholder summary of this project." },
      { title: "Project Placeholder 3", summary: "Short placeholder summary of this project." },
    ],
  },
  {
    id: "design",
    label: "Design",
    description: "Placeholder description for design work.",
    items: [
      { title: "Design Placeholder 1", summary: "Short placeholder summary of this piece." },
      { title: "Design Placeholder 2", summary: "Short placeholder summary of this piece." },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    description: "Placeholder description for writing samples.",
    items: [
      { title: "Writing Placeholder 1", summary: "Short placeholder summary of this piece." },
    ],
  },
];

const siteNav = document.getElementById("site-nav");
const categoryList = document.getElementById("category-list");
const categoryTitle = document.getElementById("category-title");
const categoryDescription = document.getElementById("category-description");
const projectGrid = document.getElementById("project-grid");

function renderNav(activePageId) {
  siteNav.innerHTML = "";
  pages.forEach((page) => {
    const link = document.createElement("a");
    link.href = `#${page.id}`;
    link.className = "nav-link" + (page.id === activePageId ? " active" : "");
    link.textContent = page.label;
    siteNav.appendChild(link);
  });
}

function renderCategorySidebar(activeCategoryId) {
  categoryList.innerHTML = "";
  portfolioCategories.forEach((category) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button" + (category.id === activeCategoryId ? " active" : "");
    button.textContent = category.label;
    button.addEventListener("click", () => {
      window.location.hash = `portfolio/${category.id}`;
    });
    li.appendChild(button);
    categoryList.appendChild(li);
  });
}

function renderCategoryContent(category) {
  categoryTitle.textContent = category.label;
  categoryDescription.textContent = category.description;
  projectGrid.innerHTML = "";
  category.items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-card-media"><span>Image placeholder</span><span class="card-arrow" aria-hidden="true">↗</span></div>
      <div class="project-card-body">
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
    `;
    projectGrid.appendChild(card);
  });
}

function showPage(pageId) {
  pages.forEach((page) => {
    document.getElementById(`page-${page.id}`).classList.toggle("active", page.id === pageId);
  });
}

function route() {
  const hash = window.location.hash.replace(/^#/, "") || "home";
  const [pageId, categoryId] = hash.split("/");
  const activePageId = pages.some((page) => page.id === pageId) ? pageId : "home";

  renderNav(activePageId);
  showPage(activePageId);

  if (activePageId === "portfolio") {
    const activeCategory =
      portfolioCategories.find((category) => category.id === categoryId) ||
      portfolioCategories[0];
    renderCategorySidebar(activeCategory.id);
    renderCategoryContent(activeCategory);
  }
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  route();
});
