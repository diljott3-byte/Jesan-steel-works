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
