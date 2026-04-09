'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const clickedText = this.innerHTML.toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (clickedText === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }

    this.classList.add("active");
    window.scrollTo(0, 0);

  });
}

// certification modal
const certData = {
  dl: {
    title: "Deep Learning Specialization",
    issuer: "Coursera — Andrew Ng",
    img: "./assets/images/icon-dev.svg",
    desc: "A 5-course specialization covering neural networks, hyperparameter tuning, CNNs, sequence models, and NLP. Includes hands-on projects built in TensorFlow.",
    tags: ["Neural Networks", "CNNs", "RNNs", "TensorFlow", "NLP", "Hyperparameter Tuning"],
    link: "YOUR_COURSERA_CERTIFICATE_LINK"
  },
  ml: {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online — Andrew Ng",
    img: "./assets/images/icon-app.svg",
    desc: "A 3-course program covering supervised learning, unsupervised learning, recommender systems, and reinforcement learning with real-world Python projects.",
    tags: ["Supervised Learning", "Clustering", "Decision Trees", "Scikit-Learn", "Reinforcement Learning"],
    link: "YOUR_STANFORD_CERTIFICATE_LINK"
  },
  cs50: {
    title: "CS50x — Harvard University",
    issuer: "Harvard Online (edX)",
    img: "./assets/images/icon-design.svg",
    desc: "Harvard's introduction to Computer Science covering abstraction, algorithms, data structures, web development and problem-solving using C, Python, SQL and JavaScript.",
    tags: ["C", "Python", "SQL", "HTML/CSS", "JavaScript", "Algorithms", "Data Structures"],
    link: "YOUR_CS50_CERTIFICATE_LINK"
  }
};

const certItems = document.querySelectorAll("[data-cert-item]");
const certModalContainer = document.querySelector("[data-cert-modal-container]");
const certModalClose = document.querySelector("[data-cert-modal-close]");
const certOverlay = document.querySelector("[data-cert-overlay]");

const certModalFunc = function () {
  certModalContainer.classList.toggle("active");
};

for (let i = 0; i < certItems.length; i++) {
  certItems[i].addEventListener("click", function () {
    const key = this.dataset.cert;
    const cert = certData[key];

    document.getElementById("certModalTitle").innerHTML = cert.title;
    document.getElementById("certModalIssuer").innerHTML = cert.issuer;
    document.getElementById("certModalImg").src = cert.img;
    document.getElementById("certModalDesc").innerHTML = cert.desc;
    document.getElementById("certModalLink").href = cert.link;

    const tagsEl = document.getElementById("certModalTags");
    tagsEl.innerHTML = cert.tags.map(t => `<span>${t}</span>`).join("");

    certModalFunc();
  });
}

certModalClose.addEventListener("click", certModalFunc);
certOverlay.addEventListener("click", certModalFunc);

// ===== GALLERY LIGHTBOX =====
function openLightbox(figure) {
  const img = figure.querySelector("img");
  document.getElementById("lightbox-img").src = img.src;
  document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

// Close with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});

// ===== CERTIFICATE MODAL =====
function openCert(card) {
  const type = card.getAttribute("data-cert-type");
  const src  = card.getAttribute("data-cert-src");

  const modal   = document.getElementById("certModal");
  const img     = document.getElementById("certModalImg");
  const iframe  = document.getElementById("certModalIframe");

  // Reset both
  img.style.display    = "none";
  iframe.style.display = "none";
  img.src    = "";
  iframe.src = "";

  if (type === "image") {
    img.src = src;
    img.style.display = "block";
    modal.classList.add("active");

  } else if (type === "pdf") {
    iframe.src = src;
    iframe.style.display = "block";
    modal.classList.add("active");

  } else if (type === "link") {
    // Opens in new tab for external URLs
    window.open(src, "_blank");
  }
}

function closeCertModal(event) {
  // Close only if clicking backdrop or close button
  if (!event || event.target === document.getElementById("certModal") || event.currentTarget.classList.contains("cert-modal-close")) {
    document.getElementById("certModal").classList.remove("active");
    document.getElementById("certModalIframe").src = "";
    document.getElementById("certModalImg").src = "";
  }
}

// Close with Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeCertModal();
});