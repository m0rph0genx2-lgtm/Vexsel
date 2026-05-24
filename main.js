const servicesGrid = document.getElementById("servicesGrid");
const worksGrid = document.getElementById("worksGrid");
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

document.getElementById("year").textContent = new Date().getFullYear();

const SITE_EMAIL = "m0rph0genx6@gmail.com";

function openLightbox() {
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function openWorkLightbox(w) {
  lightboxImg.alt = w.title;
  lightboxCaption.textContent = `${w.title} — ${w.material}, ${w.operations}`;
  openLightbox();
  lightboxImg.onload = () => {
    lightboxImg.onload = null;
  };
  lightboxImg.src = w.image;
}

function renderServices() {
  servicesGrid.innerHTML = SERVICES.map(
    (s) => `
    <article class="service-card">
      <div class="service-card__icon" aria-hidden="true">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`
  ).join("");
}

function renderWorks() {
  worksGrid.innerHTML = WORKS.map((w, i) => {
    const id = `work-${i}`;
    const imgClass =
      w.imageFit === "contain" ? "work-card__img work-card__img--contain" : "work-card__img";
    return `
    <article class="work-card" data-index="${i}" tabindex="0" role="button" aria-label="Открыть: ${w.title}">
      <div class="work-card__img-wrap">
        <img class="${imgClass}" id="${id}" src="${w.image}" alt="${w.title}" loading="lazy" />
        <div class="work-card__fallback">Добавьте фото: ${w.image}</div>
      </div>
      <div class="work-card__body">
        <h3>${w.title}</h3>
        <dl>
          <dt>Материал</dt><dd>${w.material}</dd>
          <dt>Операции</dt><dd>${w.operations}</dd>
          <dt>Отрасль</dt><dd>${w.industry}</dd>
        </dl>
      </div>
    </article>`;
  }).join("");

  worksGrid.querySelectorAll(".work-card__img").forEach((img) => {
    img.addEventListener("load", () => img.classList.add("loaded"));
    if (img.complete && img.naturalWidth > 0) img.classList.add("loaded");
  });

  worksGrid.querySelectorAll(".work-card").forEach((card) => {
    const open = (e) => {
      if (e.target.closest(".work-card__body")) return;
      const w = WORKS[Number(card.dataset.index)];
      if (!w) return;
      openWorkLightbox(w);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  const body = [
    `Компания: ${data.company}`,
    `Контакт: ${data.name}`,
    `Email: ${data.email}`,
    `Телефон: ${data.phone || "—"}`,
    "",
    data.message,
  ].join("\n");

  const mailto = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent("Заявка с сайта — " + data.company)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  formNote.textContent = "Открыт почтовый клиент для отправки на " + SITE_EMAIL + ".";
  formNote.classList.add("success");
});

const lightboxBackdrop = document.getElementById("lightboxBackdrop");

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

renderServices();
renderWorks();
