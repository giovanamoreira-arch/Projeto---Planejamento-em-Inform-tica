// PERSONALIZAÇÃO: substitua pelo WhatsApp oficial da City Máquinas.
// Formato: código do país + DDD + número, somente números.
// Exemplo fictício: 5511999999999
const whatsappNumber = "5511999999999";

const makeWhatsAppUrl = (message) => {
  if (!whatsappNumber || whatsappNumber === "5511999999999") return "https://wa.me/";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const whatsappLink = document.getElementById("whatsappLink");
const generalMessage = "Olá! Gostaria de informações sobre os produtos da City Máquinas.";
whatsappLink.href = makeWhatsAppUrl(generalMessage);
whatsappLink.addEventListener("click", (event) => {
  if (whatsappNumber === "5511999999999") {
    event.preventDefault();
    alert("Configure o número oficial do WhatsApp no arquivo js/script.js antes de publicar o site.");
  }
});

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

// Modal: abre ao clicar/tocar em um card de produto.
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalApplication = document.getElementById("modalApplication");
const modalNote = document.getElementById("modalNote");
const productWhatsapp = document.getElementById("productWhatsapp");
let lastFocusedElement = null;

function openProductModal(card) {
  lastFocusedElement = card;
  const product = card.dataset.product;
  modalTitle.textContent = product;
  modalDescription.textContent = card.dataset.description;
  modalCategory.textContent = card.dataset.category;
  modalApplication.textContent = card.dataset.application;
  modalNote.textContent = card.dataset.note;

  const message = `Olá! Gostaria de consultar informações e disponibilidade sobre: ${product}.`;
  productWhatsapp.href = makeWhatsAppUrl(message);
  productWhatsapp.onclick = (event) => {
    if (whatsappNumber === "5511999999999") {
      event.preventDefault();
      alert("Configure o número oficial do WhatsApp no arquivo js/script.js antes de publicar o site.");
    }
  };

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeProductModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".product-trigger").forEach((card) => {
  card.addEventListener("click", () => openProductModal(card));
});

modal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProductModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeProductModal();
  }
});
