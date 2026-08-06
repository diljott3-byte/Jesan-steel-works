(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};

  ["about.css", "contact.css"].forEach((href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = href;
      document.head.appendChild(stylesheet);
    }
  });

  const whatsappLink = (message) => {
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    const text = String(message || "").trim();
    if (!number) return "#contact";
    return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  };

  const openWhatsApp = (message) => {
    const url = whatsappLink(message);
    if (url.startsWith("https://")) {
      window.location.assign(url);
    }
  };

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  setText("[data-brand-name]", config.brandName);
  setText("[data-parent-brand]", config.parentBrand);
  setText("[data-established-year]", config.establishedYear);
  setText("[data-location]", config.location);
  setText("[data-phone-display]", config.phoneDisplay);
  setText("[data-showroom-address]", config.showroomAddress);

  const brandStyle = document.createElement("style");
  brandStyle.textContent = `
    .wordmark.brand-image-lockup {
      flex-direction: row;
      align-items: center;
      gap: 10px;
      min-width: 238px;
    }
    .brand-image-lockup .brand-logo-mark {
      width: 48px;
      height: 48px;
      flex: 0 0 48px;
      object-fit: contain;
    }
    .brand-image-lockup .brand-sankalp-wordmark {
      width: 178px;
      height: auto;
      object-fit: contain;
    }
    .wordmark-footer.brand-image-lockup {
      min-width: 0;
    }
    .wordmark-footer.brand-image-lockup .brand-logo-mark {
      width: 54px;
      height: 54px;
      flex-basis: 54px;
    }
    .wordmark-footer.brand-image-lockup .brand-sankalp-wordmark {
      width: 205px;
    }
    @media (max-width: 760px) {
      .wordmark.brand-image-lockup { min-width: 0; gap: 7px; }
      .brand-image-lockup .brand-logo-mark {
        width: 39px;
        height: 39px;
        flex-basis: 39px;
      }
      .brand-image-lockup .brand-sankalp-wordmark { width: 142px; }
    }
  `;
  document.head.appendChild(brandStyle);

  document.querySelectorAll(".wordmark").forEach((wordmark) => {
    wordmark.classList.add("brand-image-lockup");
    if (!wordmark.querySelector(".brand-logo-mark")) {
      wordmark.innerHTML = `
        <img class="brand-logo-mark" src="assets/images/jsw-logo-mark.svg" alt="JSW logo">
        <img class="brand-sankalp-wordmark" src="assets/images/sankalp-wordmark.svg" alt="SANKALP — a product of Jesan Steel Works">
      `;
    }
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappLink(
      link.dataset.whatsappMessage ||
        "Hello SANKALP, I would like to enquire about your steel furniture."
    );
  });

  document.querySelectorAll("[data-phone-display]").forEach((element) => {
    if (element.closest("a[data-call-link]")) return;
    const callLink = document.createElement("a");
    callLink.className = "inline-phone-link";
    callLink.setAttribute("data-call-link", "");
    element.replaceWith(callLink);
    callLink.appendChild(element);
  });

  document.querySelectorAll("[data-call-link]").forEach((link) => {
    link.href = `tel:${config.phoneNumber || ""}`;
    link.setAttribute(
      "aria-label",
      `Call SANKALP at ${config.phoneDisplay || config.phoneNumber || ""}`
    );
  });

  document.querySelectorAll("[data-map-link]").forEach((link) => {
    link.href = config.showroomMapUrl || "#contact";
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.classList.remove("is-open");
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const open = !navigation.classList.contains("is-open");
      menuToggle.classList.toggle("is-open", open);
      navigation.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const enquiryForm = document.querySelector(".enquiry-form");
  const interestButtons = Array.from(
    document.querySelectorAll("[data-product-interest]")
  );
  let selectedInterest =
    interestButtons.find((button) => button.classList.contains("selected"))
      ?.dataset.productInterest || "Designer Almirahs";

  const selectInterest = (name) => {
    selectedInterest = name;
    interestButtons.forEach((button) => {
      const selected = button.dataset.productInterest === name;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  interestButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectInterest(button.dataset.productInterest || "Designer Almirahs");
      if (button.matches(".collection-content button")) {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(enquiryForm);
      const name = String(form.get("name") || "").trim();
      const phone = String(form.get("phone") || "").trim();
      const note = String(form.get("message") || "").trim();
      const message = [
        `Hello SANKALP, I am interested in ${selectedInterest}.`,
        name && `Name: ${name}`,
        phone && `Phone: ${phone}`,
        note && `Requirement: ${note}`,
      ]
        .filter(Boolean)
        .join("\n");

      const submitButton = enquiryForm.querySelector(".whatsapp-send-button");
      const status = enquiryForm.querySelector(".form-status");
      submitButton?.classList.add("is-sending");
      if (status) status.textContent = "Sending your enquiry to WhatsApp…";
      window.setTimeout(() => openWhatsApp(message), 160);
    });
  }

  const processSection = document.querySelector(".infra-process");
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8%" }
      );
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  if (processSection) {
    const updateProgress = () => {
      const rect = processSection.getBoundingClientRect();
      const travel = rect.height + window.innerHeight * 0.2;
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.72 - rect.top) / travel)
      );
      processSection.style.setProperty("--process-progress", String(progress));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const contactForm = document.querySelector(".contact-enquiry-form");
  const productCombobox = document.querySelector("[data-product-combobox]");

  if (contactForm && productCombobox) {
    const searchInput = productCombobox.querySelector('[name="productSearch"]');
    const hiddenProduct = productCombobox.querySelector('[name="selectedProduct"]');
    const optionsPanel = productCombobox.querySelector(".product-options");
    const optionButtons = Array.from(
      productCombobox.querySelectorAll("[data-product-value]")
    );
    const noResults = productCombobox.querySelector(".product-no-results");
    const toggleButton = productCombobox.querySelector(".product-toggle");

    const setFieldError = (name, message) => {
      const field = contactForm.querySelector(`[name="${name}"]`)?.closest(
        ".premium-field"
      );
      const error = contactForm.querySelector(`[data-error-for="${name}"]`);
      field?.classList.toggle("has-error", Boolean(message));
      if (error) error.textContent = message;
    };

    const openOptions = () => {
      optionsPanel.hidden = false;
      productCombobox.classList.add("is-open");
      searchInput.setAttribute("aria-expanded", "true");
    };

    const closeOptions = () => {
      optionsPanel.hidden = true;
      productCombobox.classList.remove("is-open");
      searchInput.setAttribute("aria-expanded", "false");
    };

    const filterOptions = () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;
      optionButtons.forEach((button) => {
        const visible = button.dataset.productValue
          .toLowerCase()
          .includes(query);
        button.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (noResults) noResults.hidden = visibleCount > 0;
    };

    const chooseProduct = (value) => {
      searchInput.value = value;
      hiddenProduct.value = value;
      optionButtons.forEach((button) => {
        const selected = button.dataset.productValue === value;
        button.setAttribute("aria-selected", String(selected));
      });
      setFieldError("selectedProduct", "");
      closeOptions();
    };

    searchInput.addEventListener("focus", () => {
      openOptions();
      filterOptions();
    });

    searchInput.addEventListener("input", () => {
      hiddenProduct.value = "";
      openOptions();
      filterOptions();
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOptions();
      if (event.key === "Enter") {
        const firstVisible = optionButtons.find((button) => !button.hidden);
        if (firstVisible && optionsPanel.hidden === false) {
          event.preventDefault();
          chooseProduct(firstVisible.dataset.productValue || "");
        }
      }
    });

    toggleButton?.addEventListener("click", () => {
      if (optionsPanel.hidden) {
        openOptions();
        filterOptions();
        searchInput.focus();
      } else {
        closeOptions();
      }
    });

    optionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        chooseProduct(button.dataset.productValue || "");
      });
    });

    document.addEventListener("click", (event) => {
      if (!productCombobox.contains(event.target)) closeOptions();
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = contactForm.querySelector('[name="contactName"]');
      const phoneInput = contactForm.querySelector('[name="contactPhone"]');
      const status = contactForm.querySelector(".contact-form-status");
      const name = nameInput.value.trim();
      const phone = phoneInput.value.replace(/\D/g, "");
      const product = hiddenProduct.value.trim();

      setFieldError(
        "contactName",
        name.length >= 2 ? "" : "Please enter your name."
      );
      setFieldError(
        "contactPhone",
        /^\d{10}$/.test(phone) ? "" : "Enter a valid 10-digit mobile number."
      );
      setFieldError(
        "selectedProduct",
        product ? "" : "Please search for or select a product."
      );

      if (name.length < 2 || !/^\d{10}$/.test(phone) || !product) {
        if (status) status.textContent = "Please complete the highlighted fields.";
        return;
      }

      const message = [
        "*NEW PRODUCT ENQUIRY | SANKALP*",
        "——————————————",
        `*Customer name:* ${name}`,
        `*Contact number:* +91 ${phone}`,
        `*Product required:* ${product}`,
        "——————————————",
        "Please share available designs, customization options, pricing and delivery details.",
      ].join("\n");

      const submitButton = contactForm.querySelector(".whatsapp-send-button");
      submitButton?.classList.add("is-sending");
      if (status) status.textContent = "Sending your enquiry to WhatsApp…";
      window.setTimeout(() => openWhatsApp(message), 160);
    });
  }

})();
