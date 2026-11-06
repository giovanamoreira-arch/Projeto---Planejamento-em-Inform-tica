
// Instagram oficial da City Máquinas
const instagramLink = "https://www.instagram.com/citymaquinas/";

// Botão principal de contato
const instagramButton = document.getElementById("instagramLink");

instagramButton.href = instagramLink;

// Atualiza o ano automaticamente
document.getElementById("year").textContent = new Date().getFullYear();

// Menu responsivo
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

// Modal: abre ao clicar/tocar em um card de produto
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalApplication = document.getElementById("modalApplication");
const modalNote = document.getElementById("modalNote");
const productInstagram = document.getElementById("productInstagram");

let lastFocusedElement = null;

function openProductModal(card) {
  lastFocusedElement = card;

  const product = card.dataset.product;

  modalTitle.textContent = product;
  modalDescription.textContent = card.dataset.description;
  modalCategory.textContent = card.dataset.category;
  modalApplication.textContent = card.dataset.application;
  modalNote.textContent = card.dataset.note;

  // Direciona para o Instagram da City Máquinas
  productInstagram.href = instagramLink;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  modal.querySelector(".modal-close").focus();
}

function closeProductModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Eventos dos cards de produtos
document.querySelectorAll(".product-trigger").forEach((card) => {
  card.addEventListener("click", () => openProductModal(card));
});

// Fechar modal ao clicar no botão ou fora da janela
modal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProductModal);
});

// Fechar modal ao pressionar ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeProductModal();
  }
});
// Início e voltar ao topo
document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});
