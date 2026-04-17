// ==========================================
// TEMPLATE ENGINE | WEBSITEBREED
// ==========================================
// Leest window.SITE_CONFIG en vult alle pagina's dynamisch.

document.addEventListener("DOMContentLoaded", () => {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isHome = page === "" || page === "index.html";
  const currentYear = new Date().getFullYear();

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const asText = (value, fallback = "") => (typeof value === "string" ? value : fallback);
  const withHash = (value, fallback = "#FF0101") => {
    const raw = asText(value, fallback).trim();
    if (!raw) return fallback;
    return raw.startsWith("#") ? raw : `#${raw}`;
  };

  function hexToRgb(hex) {
    const normalized = withHash(hex).replace("#", "");
    if (normalized.length !== 6) return "255, 1, 1";
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  function shadeColor(hex, percent) {
    const normalized = withHash(hex).replace("#", "");
    if (normalized.length !== 6) return "#e00000";
    const amt = Math.max(-100, Math.min(100, percent)) / 100;
    const toChannel = (index) => {
      const base = parseInt(normalized.slice(index, index + 2), 16);
      const next = Math.round(base + (amt >= 0 ? (255 - base) * amt : base * amt));
      return Math.max(0, Math.min(255, next)).toString(16).padStart(2, "0");
    };
    return `#${toChannel(0)}${toChannel(2)}${toChannel(4)}`;
  }

  function setText(selector, value) {
    if (!value) return;
    $$(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function setHtml(selector, value) {
    if (!value) return;
    $$(selector).forEach((el) => {
      el.innerHTML = value;
    });
  }

  function setHref(selector, value) {
    if (!value) return;
    $$(selector).forEach((el) => {
      el.setAttribute("href", value);
    });
  }

  function setDisplay(selector, shouldShow) {
    $$(selector).forEach((el) => {
      el.style.display = shouldShow ? "" : "none";
    });
  }

  function escapeHtml(value) {
    return asText(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getPhoneHref() {
    const link = asText(config.contact?.telefoonLink).replace(/\s+/g, "");
    if (!link) return "";
    return link.startsWith("tel:") ? link : `tel:${link}`;
  }

  function getEmailHref() {
    const email = asText(config.contact?.email);
    return email ? `mailto:${email}` : "";
  }

  function applyColors() {
    const root = document.documentElement;
    const primary = withHash(config.visueel?.kleurPrimair, "#FF0101");
    const secondary = withHash(config.visueel?.kleurSecundair, "#1a1a1a");
    const accent = withHash(config.visueel?.kleurAccent, "#f9f9f9");
    const text = withHash(config.visueel?.kleurTekst, "#222222");
    const bg = withHash(config.visueel?.kleurAchtergrond, "#ffffff");

    root.style.setProperty("--brand-primary", primary);
    root.style.setProperty("--brand-primary-hover", shadeColor(primary, -10));
    root.style.setProperty("--brand-primary-rgb", hexToRgb(primary));
    root.style.setProperty("--brand-dark", secondary);
    root.style.setProperty("--brand-dark-rgb", hexToRgb(secondary));
    root.style.setProperty("--brand-accent", text);
    root.style.setProperty("--brand-light-bg", accent);
    root.style.setProperty("--brand-white", bg);

    document.body.style.backgroundColor = bg;
    document.body.style.color = text;

    const dynamicStyles = document.createElement("style");
    dynamicStyles.innerHTML = `
      .service-card:hover::before { background: ${shadeColor(primary, 80)} !important; }
      .service-card:hover .service-card__icon { background: ${primary} !important; border-color: ${primary} !important; }
      .project-card:hover .project-card__btn { background: ${primary} !important; }
      .project-card:hover .project-card__content { background: ${primary} !important; }
    `;
    document.head.appendChild(dynamicStyles);

    $$('svg circle[stroke="#FF0101"], svg circle[stroke="#ff0101"]').forEach((el) => el.setAttribute("stroke", primary));
    $$('svg path[fill="#FF0101"], svg path[fill="#ff0101"]').forEach((el) => el.setAttribute("fill", primary));
  }

  function applySeo() {
    const bedrijfsnaam = asText(config.bedrijfsnaam, "Bedrijf");
    const branche = asText(config.branche, "Bouwbedrijf");
    const stad = asText(config.stad, "");

    if (isHome) {
      if (config.seo?.title) document.title = config.seo.title;
      if (config.seo?.description) {
        const meta = $('meta[name="description"]');
        if (meta) meta.setAttribute("content", config.seo.description);
      }
    } else {
      const pageLabelMap = {
        "over-ons.html": "Over Ons",
        "diensten.html": "Diensten",
        "projecten.html": "Projecten",
        "contact.html": "Contact"
      };
      const label = pageLabelMap[page] || "Pagina";
      document.title = `${label} | ${bedrijfsnaam} ${branche}`;
      const meta = $('meta[name="description"]');
      if (meta) {
        const cityPart = stad ? ` in ${stad}` : "";
        meta.setAttribute(
          "content",
          `${label} van ${bedrijfsnaam}${cityPart}. ${branche} voor renovatie, verbouwing en onderhoud.`
        );
      }
    }

    if (config.seo?.canonical) {
      let canonical = $('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", config.seo.canonical);
    }
  }

  function applyFaviconAndLogo() {
    const bedrijfsnaam = asText(config.bedrijfsnaam, "Bedrijf");
    const voorletter = asText(config.voorletter, bedrijfsnaam.charAt(0).toUpperCase());
    const primary = withHash(config.visueel?.kleurPrimair, "#FF0101");
    const useTextFallback = !!config.visueel?.logoTekstFallback;
    const logoPad = asText(config.visueel?.logoPad);
    const logoPadPrefooter = asText(config.visueel?.logoPadPrefooter) || logoPad;
    const faviconPad = asText(config.visueel?.faviconPad);

    const favicon = $('link[rel="icon"]');
    if (favicon) {
      if (faviconPad) {
        favicon.setAttribute("href", faviconPad);
      } else {
        const inlineSvg = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='${encodeURIComponent(primary)}' width='100' height='100' rx='10'/><text x='50' y='68' text-anchor='middle' font-size='55' font-weight='bold'>${encodeURIComponent(voorletter)}</text></svg>`;
        favicon.setAttribute("href", inlineSvg);
      }
    }

    const logoTextNodes = $$(".header__logo-text, .prefooter__logo-text");
    logoTextNodes.forEach((el) => {
      el.textContent = bedrijfsnaam;
    });

    if (!useTextFallback) {
      if (logoPad) {
        $$(".header__logo").forEach((logoWrap) => {
          const icon = $(".header__logo-icon", logoWrap);
          if (icon) {
            icon.innerHTML = `<img src="${logoPad}" alt="${escapeHtml(bedrijfsnaam)} logo" style="width:100%;height:100%;object-fit:contain;">`;
          }
        });
      }
      if (logoPadPrefooter) {
        $$(".prefooter__logo").forEach((logoWrap) => {
          const icon = $(".prefooter__logo-icon", logoWrap);
          if (icon) {
            icon.innerHTML = `<img src="${logoPadPrefooter}" alt="${escapeHtml(bedrijfsnaam)} logo" style="width:100%;height:100%;object-fit:contain;">`;
          }
        });
      }
    }
  }

  function applyGlobalTextAndLinks() {
    const bedrijfsnaam = asText(config.bedrijfsnaam);
    const branche = asText(config.branche);
    const slogan = asText(config.slogan);
    const telefoon = asText(config.contact?.telefoon);
    const email = asText(config.contact?.email);
    const city = asText(config.stad);

    if (bedrijfsnaam) {
      setText(".header__logo-text, .prefooter__logo-text", bedrijfsnaam);
      setText(".about__director-title", `Directeur van ${bedrijfsnaam}`);
      
      const footerCopy = $(".footer__copyright");
      if (footerCopy) {
        // Explicitly add BV in the footer, as requested
        const displayText = `${bedrijfsnaam} BV ${branche}`.trim();
        footerCopy.innerHTML = `Copyright &copy; ${currentYear} ${escapeHtml(displayText)} | KvK: 14111596 | <a href="privacyverklaring.html">Privacyverklaring</a>`;
      }

      // Add "Built by Nextshape" to the right of the copyright
      const footerBottom = $(".footer__bottom");
      if (footerBottom) {
        let builtBy = $(".footer__built", footerBottom);
        if (!builtBy) {
          builtBy = document.createElement("div");
          builtBy.className = "footer__built";
          footerBottom.appendChild(builtBy);
        }
        builtBy.innerHTML = `Built by <a href="https://nextshape.nl" target="_blank" rel="noopener">Next Shape</a>`;
      }
    }

    if (telefoon) {
      setText(".header__phone-num", telefoon);
      $$('a[href^="tel:"]').forEach((a) => {
        a.setAttribute("href", getPhoneHref());
      });
    }

    if (email) {
      $$('a[href^="mailto:"]').forEach((a) => {
        a.setAttribute("href", getEmailHref());
      });
    }

    const infoText = $(".footer__text");
    if (infoText && slogan) {
      infoText.textContent = `${bedrijfsnaam} | ${slogan}. Actief in ${city} en omgeving.`;
    }

    if (config.cta?.primaryLabel) {
      setText(".prefooter .btn-primary .btn-text", config.cta.primaryLabel);
    }
    if (config.cta?.primaryLink) {
      setHref(".prefooter .btn-primary", config.cta.primaryLink);
    }
  }

  function renderHeroAndAbout() {
    if (config.hero?.titel) setHtml(".hero__heading", config.hero.titel);
    if (config.hero?.subtitel) setText(".hero__text", config.hero.subtitel);

    const heroBg = $(".hero__slide[data-slide='0'] .hero__bg");
    if (heroBg && config.visueel?.heroAfbeelding) {
      const heroImg = heroBg.querySelector('img');
      if (heroImg) heroImg.src = config.visueel.heroAfbeelding;
    }

    const aboutImageMain = $(".about__image img");
    if (aboutImageMain && config.visueel?.overOnsAfbeelding) {
      aboutImageMain.src = config.visueel.overOnsAfbeelding;
    }

    const historyImage = $("#history .history__image-wrap img");
    if (historyImage && config.visueel?.geschiedenisAfbeelding) {
      historyImage.src = config.visueel.geschiedenisAfbeelding;
    }

    if (config.overOns?.titel) {
      const aboutTitle = $(".about .section-title");
      if (aboutTitle) aboutTitle.innerHTML = config.overOns.titel;
    }

    if (config.overOns?.tekst) {
      const aboutText = $(".about__desc");
      if (aboutText) aboutText.textContent = config.overOns.tekst;
    }
  }

  function renderStats() {
    const stats = Array.isArray(config.hero?.stats) ? config.hero.stats : [];
    if (!stats.length) return;

    const numberEls = $$(".stat-box .stat-number");
    const suffixEls = $$(".stat-box .stat-suffix");
    const plusEls = $$(".stat-box .stat-plus");
    const labelEls = $$(".stat-box .stat-label");

    stats.slice(0, numberEls.length).forEach((item, index) => {
      const match = asText(item.waarde).match(/^(\d+(?:[.,]\d+)?)(.*)$/);
      const rawNumber = match ? match[1].replace(",", ".") : "0";
      const rawSuffix = match ? match[2].trim() : "";
      const hasPlusInValue = rawSuffix.includes("+");
      const hasPercentInValue = rawSuffix.includes("%");
      const plusSymbol = hasPlusInValue ? "+" : hasPercentInValue ? "%" : "";
      const suffix = rawSuffix.replace(/[+%]/g, "").trim();
      const count = parseFloat(rawNumber) || 0;
      numberEls[index].setAttribute("data-count", String(Math.round(count)));
      numberEls[index].textContent = "0";
      if (suffixEls[index]) suffixEls[index].textContent = suffix || "";
      if (plusEls[index]) plusEls[index].textContent = plusSymbol;
      if (labelEls[index]) labelEls[index].textContent = asText(item.label, "");
    });
  }

  function renderServices() {
    if (!Array.isArray(config.diensten) || !config.diensten.length) return;

    const serviceCards = $$(".service-card");
    if (!serviceCards.length) return;

    config.diensten.forEach((dienst, index) => {
      const card = serviceCards[index];
      if (!card) return;

      const icon = $("i.fi", card);
      const title = $(".service-card__title", card);
      const text = $(".service-card__text", card);
      const link = card.tagName.toLowerCase() === "a" ? card : $(".btn-icon", card);

      if (icon) icon.className = `fi ${asText(dienst.icon, "fi-rr-edit-alt")}`;
      if (title) title.textContent = asText(dienst.titel);
      if (text) text.textContent = asText(dienst.tekst);
      if (link && link.tagName.toLowerCase() === "a") {
        link.setAttribute("href", "diensten.html");
      }
    });
  }

  function renderProjects() {
    if (!Array.isArray(config.projecten) || !config.projecten.length) return;

    const mapped = config.projecten.map((project, index) => ({
      titel: asText(project.titel, `Project ${index + 1}`),
      plaats: asText(project.plaats, config.stad),
      afbeelding: asText(project.afbeelding, config.visueel?.projectAfbeeldingen?.[index] || config.visueel?.heroAfbeelding || ""),
      beschrijving: asText(project.beschrijving, `Project in ${asText(project.plaats, config.stad)}.`)
    }));

    if (isHome) {
      const cards = $$("#projects .project-card");
      cards.forEach((card, index) => {
        const item = mapped[index % mapped.length];
        const img = $(".project-card__image img", card);
        const title = $(".project-card__title", card);
        const desc = $(".project-card__desc", card);
        if (img) {
          img.src = item.afbeelding;
          img.alt = item.titel;
        }
        if (title) title.textContent = item.titel;
        if (desc) desc.textContent = item.beschrijving || item.plaats;
      });
    }

    if (page === "projecten.html") {
      const cards = $$(".projects--grid .project-card");
      cards.forEach((card, index) => {
        const item = mapped[index % mapped.length];
        const img = $(".project-card__image img", card);
        const title = $(".project-card__title", card);
        const desc = $(".project-card__desc", card);
        if (img) {
          img.src = item.afbeelding;
          img.alt = item.titel;
        }
        if (title) title.textContent = item.titel;
        if (desc) desc.textContent = item.beschrijving || item.plaats;
      });
    }
  }

  function renderReviews() {
    if (!Array.isArray(config.reviews) || !config.reviews.length) return;

    const slides = $$(".testimonials__item");
    slides.forEach((slide, index) => {
      const review = config.reviews[index % config.reviews.length];
      const text = $(".testimonials__text", slide);
      const name = $(".testimonials__author-name", slide);
      const role = $(".testimonials__author-role", slide);

      if (text) text.textContent = asText(review.tekst);
      if (name) name.textContent = asText(review.naam, "Klant");
      if (role) role.textContent = `Beoordeling: ${asText(String(review.score || 5))}/5`;
    });
  }

  function renderContact() {
    const addressParts = [];
    if (config.contact?.adres) addressParts.push(config.contact.adres);
    
    const cityPart = `${config.contact?.postcode || ""} ${config.contact?.plaats || ""}`.trim();
    if (cityPart && cityPart !== config.contact?.adres) {
      addressParts.push(cityPart);
    }
    
    if (config.contact?.land) addressParts.push(config.contact.land);
    
    const addressLine = addressParts.join("<br>");

    // Target the footer contact column specifically
    const contactHeader = $$(".footer__heading").find(h => h.textContent.trim() === "Contact");
    const footerContactList = contactHeader ? contactHeader.nextElementSibling : null;
    
    if (footerContactList) {
      const footerSpans = $$("span", footerContactList);
      if (footerSpans[0] && addressLine) {
        footerSpans[0].innerHTML = addressLine;
      }
      if (footerSpans[1] && config.contact?.telefoon) {
        footerSpans[1].textContent = config.contact.telefoon;
      }
      if (footerSpans[2] && config.contact?.email) {
        footerSpans[2].textContent = config.contact.email;
      }
    }

    const contactCard = $(".contact-info-card");
    if (contactCard) {
      contactCard.innerHTML = `
        <h3>Contactgegevens</h3>
        <div class="contact-info-item">
          <div class="contact-info-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div><strong>Adres</strong><br>${addressLine || "-"}</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path>
            </svg>
          </div>
          <div><strong>Telefoon</strong><br>${escapeHtml(config.contact?.telefoon || "-")}</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div><strong>E-mail</strong><br>${escapeHtml(config.contact?.email || "-")}</div>
        </div>
      `;
    }
  }

  function renderSocials() {
    const socialWrap = $(".footer__socials");
    if (!socialWrap) return;

    const socials = [
      { label: "Facebook", url: asText(config.socials?.facebook) },
      { label: "Instagram", url: asText(config.socials?.instagram) },
      { label: "LinkedIn", url: asText(config.socials?.linkedin) }
    ].filter((item) => item.url);

    if (!socials.length) {
      socialWrap.innerHTML = '<a href="#" rel="noopener">Facebook</a><a href="#" rel="noopener">LinkedIn</a>';
      return;
    }

    socialWrap.innerHTML = socials
      .map((item) => `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.label)}</a>`)
      .join("");
  }

  function applyDemoToggles() {
    const demo = config.demo || {};
    setDisplay("#testimonials, .testimonials", demo.toonReviews !== false);
    setDisplay("#projects, .projects", demo.toonProjecten !== false);
    setDisplay(".footer__socials", demo.toonSocials !== false);

    // Demo badge bewust uitgeschakeld.
  }

  function applyPageSpecificLabels() {
    const map = {
      "over-ons.html": "Over Ons",
      "diensten.html": "Diensten",
      "projecten.html": "Projecten",
      "contact.html": "Contact"
    };
    const pageTitle = $(".page-banner__title");
    if (pageTitle && map[page]) pageTitle.textContent = map[page];
  }

  applyColors();
  applySeo();
  applyFaviconAndLogo();
  applyGlobalTextAndLinks();
  if (isHome) {
    renderHeroAndAbout();
  }
  renderStats();
  renderServices();
  renderProjects();
  renderReviews();
  renderContact();
  renderSocials();
  applyDemoToggles();
  applyPageSpecificLabels();
});
