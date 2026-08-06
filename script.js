(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};

  const whatsappLink = (message) => {
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    return number
      ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
      : "#contact";
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

  /* Brand-only update: replace the existing plain SANKALP text with the
     approved JSW logo mark and SANKALP wordmark. No page content changes. */
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
    wordmark.innerHTML = `
      <img class="brand-logo-mark" src="assets/images/jsw-logo-mark.svg" alt="JSW logo">
      <img class="brand-sankalp-wordmark" src="assets/images/sankalp-wordmark.svg" alt="SANKALP — a product of Jesan Steel Works">
    `;
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappLink(
      link.dataset.whatsappMessage ||
        "Hello SANKALP, I would like to enquire about your steel furniture."
    );
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

      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      const status = enquiryForm.querySelector(".form-status");
      if (status) status.textContent = "Opening WhatsApp with your enquiry…";
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
})();
