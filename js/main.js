/**
 * ILAA INDIA - Master Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const mobileToggles = document.querySelectorAll('.header-mobile-toggle, #mobileToggle, .mobile-toggle-btn');
  
  mobileToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      let mobileDrawer = document.getElementById('mobileNavDrawer');
      if (!mobileDrawer) {
        mobileDrawer = document.createElement('div');
        mobileDrawer.id = 'mobileNavDrawer';
        mobileDrawer.innerHTML = `
          <div class="mobile-drawer-inner">
            <div class="mobile-drawer-top">
              <span class="mobile-drawer-brand">ILAA INDIA</span>
              <button class="mobile-drawer-close" id="closeMobileDrawer" aria-label="Close Menu">&times;</button>
            </div>
            <ul class="mobile-drawer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="mobile-drawer-contact">
              <a href="https://wa.me/919994591902" target="_blank" rel="noopener">WhatsApp Chat</a>
              <a href="tel:+919994591902">+91 99945 91902</a>
              <button class="btn-mova-cta open-booking-modal" style="width: 100%; margin-top: 1rem;">Reserve Ritual</button>
            </div>
          </div>
        `;
        document.body.appendChild(mobileDrawer);

        document.getElementById('closeMobileDrawer').addEventListener('click', () => {
          mobileDrawer.classList.remove('active');
        });

        mobileDrawer.addEventListener('click', (evt) => {
          if (evt.target === mobileDrawer) {
            mobileDrawer.classList.remove('active');
          }
        });

        mobileDrawer.querySelectorAll('.open-booking-modal').forEach(b => {
          b.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
          });
        });
      }
      mobileDrawer.classList.toggle('active');
    });
  });

  // 2. Active Navigation Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-left-nav a, .nav-link, .hero-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 2b. Sessions Carousel Arrows Navigation
  const prevBtn = document.getElementById('sessionsPrevBtn');
  const nextBtn = document.getElementById('sessionsNextBtn');
  const sessionsTrack = document.getElementById('sessionsTrack');
  const scrollContainer = document.getElementById('sessionsScrollContainer');

  if (prevBtn && nextBtn && sessionsTrack) {
    prevBtn.addEventListener('click', () => {
      sessionsTrack.style.animationPlayState = 'paused';
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: -260, behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      sessionsTrack.style.animationPlayState = 'paused';
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 260, behavior: 'smooth' });
      }
    });
  }

  // 3. Booking Modal Controls
  const bookingModal = document.getElementById('bookingModal');
  const openModalButtons = document.querySelectorAll('.open-booking-modal');
  const closeModalButton = document.getElementById('closeBookingModal');

  const openModal = (treatmentName = '') => {
    if (!bookingModal) return;
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (treatmentName) {
      const selectElem = document.getElementById('treatmentSelect');
      if (selectElem) {
        for (let i = 0; i < selectElem.options.length; i++) {
          if (selectElem.options[i].text.toLowerCase().includes(treatmentName.toLowerCase())) {
            selectElem.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  const closeModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const treatment = btn.getAttribute('data-treatment') || '';
      openModal(treatment);
    });
  });

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // 4. WhatsApp Booking Form Submission
  const bookingForm = document.getElementById('appointmentForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('bookingName')?.value || '';
      const phone = document.getElementById('bookingPhone')?.value || '';
      const treatment = document.getElementById('treatmentSelect')?.value || 'Foot Reflexology';
      const date = document.getElementById('bookingDate')?.value || 'As soon as available';
      const timeSlot = document.getElementById('bookingTime')?.value || 'Morning';
      const notes = document.getElementById('bookingNotes')?.value || '';

      const message = `Hello ILAA India Spa,\n\nI would like to book a session:\n• Name: ${name}\n• Phone: ${phone}\n• Treatment: ${treatment}\n• Date: ${date}\n• Preferred Time: ${timeSlot}${notes ? `\n• Special Notes: ${notes}` : ''}\n\nPlease confirm availability. Thank you!`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=919994591902&text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }

  // 5. Interactive Reflexology Foot Map
  const zoneButtons = document.querySelectorAll('.zone-button');
  const zoneTitle = document.getElementById('zoneTitle');
  const zoneTarget = document.getElementById('zoneTarget');
  const zoneDescription = document.getElementById('zoneDescription');
  const zoneBenefits = document.getElementById('zoneBenefits');

  const zoneData = {
    toes: {
      title: "Head, Brain & Sinuses",
      target: "Zone 1: Toes & Forefoot",
      desc: "Each toe contains crucial meridian endpoints and reflex zones linked to the cerebral cortex, sinuses, eyes, and inner ear. Precise pressure here dispels mental fog and relieves tension headaches.",
      benefits: "Alleviates migraines, clears nasal congestion, regulates sleep cycles, and calms cognitive overwhelm."
    },
    ball: {
      title: "Heart, Chest & Lungs",
      target: "Zone 2: Ball of the Foot",
      desc: "Corresponds directly to the cardiovascular and respiratory systems. Stimulating this thoracic area promotes deep diaphragmatic breathing and releases trapped somatic anxiety.",
      benefits: "Expands lung capacity, releases chest tightness, normalizes resting heart rate, and lowers stress hormones."
    },
    arch: {
      title: "Digestive Organs & Solar Plexus",
      target: "Zone 3: Medial Arch",
      desc: "The inner arch reflects the stomach, liver, pancreas, intestines, and the central nervous core (solar plexus). Rhythmic thumb-walking along the arch restores digestive balance.",
      benefits: "Improves gut motility, aids nutrient absorption, relieves acid reflux, and soothes abdominal cramps."
    },
    heel: {
      title: "Lower Back, Pelvis & Sciatic Nerve",
      target: "Zone 4: Calcaneus / Heel",
      desc: "The heel bears the body's physical weight and reflexively mirrors the pelvic girdle, lumbar spine, and sciatic nerve pathways. Deep sustained compression softens chronic structural tension.",
      benefits: "Eases lower back soreness, soothes sciatic nerve discomfort, improves posture, and strengthens core stability."
    }
  };

  zoneButtons.forEach(button => {
    button.addEventListener('click', () => {
      zoneButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const zoneKey = button.getAttribute('data-zone');
      const data = zoneData[zoneKey];

      if (data && zoneTitle && zoneTarget && zoneDescription && zoneBenefits) {
        zoneTitle.textContent = data.title;
        zoneTarget.textContent = data.target;
        zoneDescription.textContent = data.desc;
        zoneBenefits.textContent = data.benefits;
      }
    });
  });

  // 6. FAQ Accordion (Common Questions & Editorial Split)
  const commonFaqRows = document.querySelectorAll('.common-faq-row');
  if (commonFaqRows.length > 0) {
    commonFaqRows.forEach(row => {
      row.addEventListener('click', (e) => {
        // Prevent link triggers if clicking inside
        if (e.target.tagName === 'A') return;
        
        const isActive = row.classList.contains('active');

        // Close all other rows
        commonFaqRows.forEach(other => {
          if (other !== row) {
            other.classList.remove('active');
          }
        });

        // Toggle clicked row
        if (isActive) {
          row.classList.remove('active');
        } else {
          row.classList.add('active');
        }
      });
    });
  }

  // Editorial Split FAQ Accordion (for contact.html / inner pages)
  const editorialFaqHeaders = document.querySelectorAll('.editorial-faq-header, .faq-question');
  editorialFaqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.editorial-faq-item, .faq-item');
      if (!item) return;
      const isEditorial = item.classList.contains('editorial-faq-item');
      const answer = item.querySelector('.editorial-faq-answer, .faq-answer');
      const isActive = item.classList.contains('active');

      const parentList = item.parentElement;
      if (parentList) {
        parentList.querySelectorAll('.editorial-faq-item, .faq-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAnswer = other.querySelector('.editorial-faq-answer, .faq-answer');
            if (otherAnswer && !isEditorial) otherAnswer.style.maxHeight = null;
          }
        });
      }

      if (!isActive) {
        item.classList.add('active');
        if (answer && !isEditorial) answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      } else {
        item.classList.remove('active');
        if (answer && !isEditorial) answer.style.maxHeight = null;
      }
    });
  });

  // 7. Treatment Filter on Services Page
  const filterBtns = document.querySelectorAll('.treatment-filter-btn');
  const treatmentCards = document.querySelectorAll('.treatment-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      treatmentCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Services Sub-Navigation Scrollspy & Active Tab Sync
  const subnavLinks = document.querySelectorAll('.services-subnav-link');
  const subnavSections = Array.from(subnavLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  }).filter(Boolean);

  if (subnavLinks.length > 0 && subnavSections.length > 0) {
    const updateActiveSubnav = () => {
      const scrollPos = window.scrollY + 120;
      let currentSectionId = '';

      subnavSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (!currentSectionId && window.scrollY < subnavSections[0].offsetTop) {
        currentSectionId = subnavSections[0].getAttribute('id');
      }

      if (currentSectionId) {
        subnavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', updateActiveSubnav, { passive: true });
    updateActiveSubnav();
  }

  // 9. Scroll-Driven 3 Services Stack Effect (One by One on Mouse Scroll)
  const stackCards = document.querySelectorAll('.service-stack-card');
  if (stackCards.length > 0) {
    let ticking = false;

    const updateStackingEffects = () => {
      const windowHeight = window.innerHeight;
      
      stackCards.forEach((card, idx) => {
        const nextCard = stackCards[idx + 1];
        
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const targetTop = 95 + (idx + 1) * 26;
          
          // When next card approaches this card's sticky top
          const distance = nextRect.top - targetTop;
          const overlapThreshold = windowHeight * 0.45;
          
          if (distance < overlapThreshold && distance > 0) {
            const factor = 1 - (distance / overlapThreshold);
            const scale = 1 - (factor * 0.05);
            const brightness = 1 - (factor * 0.35);
            card.style.transform = `scale(${scale.toFixed(3)})`;
            card.style.filter = `brightness(${brightness.toFixed(3)})`;
          } else if (distance <= 0) {
            card.style.transform = 'scale(0.95)';
            card.style.filter = 'brightness(0.65)';
          } else {
            card.style.transform = 'scale(1)';
            card.style.filter = 'brightness(1)';
          }
        }
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateStackingEffects);
        ticking = true;
      }
    }, { passive: true });

    updateStackingEffects();
  }

  // 10. Scroll-Driven 50/50 Basis Split 3 Services Sequence (One by One on Mouse Scroll)
  const basisTrack = document.getElementById('basisScrollTrack');
  const leftLayers = document.querySelectorAll('.basis-layer-left');
  const rightLayers = document.querySelectorAll('.basis-layer-right');
  const stepButtons = document.querySelectorAll('.basis-step-btn');
  const dynamicBookBtn = document.getElementById('basisDynamicBookBtn');

  const treatmentNames = ['Foot Reflexology', 'Massage Therapy', 'Manicure & Pedicure'];

  if (basisTrack && leftLayers.length > 0 && rightLayers.length > 0) {
    let currentIdx = -1;
    let ticking = false;

    const setServiceIndex = (idx) => {
      if (idx === currentIdx) return;
      currentIdx = idx;

      leftLayers.forEach((layer, i) => {
        if (i === idx) {
          layer.classList.add('active');
        } else {
          layer.classList.remove('active');
        }
      });

      rightLayers.forEach((layer, i) => {
        if (i === idx) {
          layer.classList.add('active');
        } else {
          layer.classList.remove('active');
        }
      });

      stepButtons.forEach((btn, i) => {
        if (i === idx) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      if (dynamicBookBtn && treatmentNames[idx]) {
        dynamicBookBtn.setAttribute('data-treatment', treatmentNames[idx]);
      }
    };

    const updateBasisScrollProgress = () => {
      const rect = basisTrack.getBoundingClientRect();
      const trackHeight = basisTrack.offsetHeight;
      const windowHeight = window.innerHeight;

      const maxScroll = trackHeight - windowHeight;
      if (maxScroll <= 0) {
        ticking = false;
        return;
      }

      if (rect.top > 30) {
        setServiceIndex(0);
        ticking = false;
        return;
      }

      if (rect.bottom < windowHeight - 30) {
        setServiceIndex(2);
        ticking = false;
        return;
      }

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      let targetIdx = 0;
      if (progress < 0.35) {
        targetIdx = 0;
      } else if (progress < 0.70) {
        targetIdx = 1;
      } else {
        targetIdx = 2;
      }

      setServiceIndex(targetIdx);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateBasisScrollProgress);
        ticking = true;
      }
    }, { passive: true });

    // Step Indicator Click Support
    stepButtons.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const trackDocTop = basisTrack.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
        const trackHeight = basisTrack.offsetHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = trackHeight - windowHeight;
        
        let targetScroll = trackDocTop + 5;
        if (idx === 1) targetScroll = trackDocTop + (maxScroll * 0.48);
        if (idx === 2) targetScroll = trackDocTop + (maxScroll * 0.88);

        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        setServiceIndex(idx);
      });
    });

    updateBasisScrollProgress();
  }

  // ==========================================================================
  // 11. MULTI-DIRECTIONAL SCROLL-TRIGGERED REVEAL ENGINE (ALL PAGES & SECTIONS)
  // ==========================================================================

  const assignDirectionalReveals = () => {
    // 1. TOP: Eyebrows, Sub-titles, Badges, Category Tags
    document.querySelectorAll(`
      .services-strip-eyebrow,
      .orbital-quote-eyebrow,
      .why-choose-eyebrow,
      .about-eyebrow-tag,
      .featured-in-badge,
      .services-subnav-container,
      .about-slate-mid-label,
      .section-badge,
      .gallery-filter-bar,
      .how-arch-lead-tag
    `).forEach(el => el.classList.add('reveal-top'));

    // 2. LEFT: Left Columns, Left Story Text, Left Benefit Boxes, Contact Info Panels
    document.querySelectorAll(`
      .orbital-side-card:first-of-type,
      .why-left-col,
      .about-slate-left-col,
      .about-reviews-left-col,
      .touch-left-col,
      .how-arch-lead-col,
      .contact-sanctuary-card:nth-child(odd),
      .hero-bottom-content > div:first-child,
      .about-slate-intro-text,
      .about-viera-hero-title,
      .services-section-header-left,
      .service-strip-left
    `).forEach(el => el.classList.add('reveal-left'));

    // 3. RIGHT: Right Columns, Right Benefit Boxes, Right Booking Form, Radiant Portraits
    document.querySelectorAll(`
      .orbital-side-card:last-of-type,
      .why-right-col,
      .about-slate-right-col,
      .about-reviews-portrait-box,
      .touch-right-col,
      .contact-sanctuary-card:nth-child(even),
      .hero-side-paragraph,
      .about-viera-hero-actions,
      .service-strip-right
    `).forEach(el => el.classList.add('reveal-right'));

    // 4. ZOOM: Organic Image Masks, Celestial Stage, Masonry Photos, Center Images
    document.querySelectorAll(`
      .orbital-celestial-stage,
      .why-center-image-wrap,
      .about-slate-portrait-card,
      .gallery-masonry-item,
      .why-botanical-leaf,
      .about-fashion-card,
      .orbital-hero-center-arch
    `).forEach(el => el.classList.add('reveal-zoom'));

    // 5. BOTTOM: Headlines, Paragraphs, Stacking Cards, Pricing Cards, Ritual Cards, Arches, Testimonials
    document.querySelectorAll(`
      .services-headline-exact,
      .orbital-main-quote,
      .why-choose-title,
      .about-slate-mega-title,
      .about-reviews-heading,
      .services-strip-sub,
      .why-choose-sub,
      .about-reviews-subtext,
      .service-strip-box,
      .services-price-card,
      .treatment-card-item,
      .basis-pillar-card,
      .about-slate-tall-card,
      .how-arch-step-col,
      .section-master-cta,
      .services-testimonial-card-box,
      .testimonials-clean-container,
      .common-faq-row,
      .editorial-faq-item,
      .sanctuary-location-card,
      .about-review-single-card
    `).forEach(el => {
      if (!el.classList.contains('reveal-left') && 
          !el.classList.contains('reveal-right') && 
          !el.classList.contains('reveal-top') && 
          !el.classList.contains('reveal-zoom')) {
        el.classList.add('reveal-bottom');
      }
    });
  };

  assignDirectionalReveals();

  // B. Reliable Scroll-Triggered IntersectionObserver
  const allRevealElements = document.querySelectorAll(`
    .reveal-left,
    .reveal-right,
    .reveal-top,
    .reveal-bottom,
    .reveal-zoom,
    [data-reveal]
  `);

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    allRevealElements.forEach(el => revealObserver.observe(el));
  } else {
    allRevealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // B. 3D Kinetic Floating Text & Parallax Images on Scroll
  const kineticTracks = document.querySelectorAll('.kinetic-3d-track');
  const heroImages = document.querySelectorAll('.hero-bg-img img, .about-viera-hero-bg img');
  const orbitalSatellites = document.querySelectorAll('.orbital-satellite');
  const centerOrganicImg = document.querySelector('.why-center-image-wrap');

  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let animFrameId = null;

  const handle3DScroll = () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // 1. Kinetic 3D Marquee Track dynamic tilt & translation
    kineticTracks.forEach((track, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      const xOffset = (currentScrollY * 0.25 * dir) % 1000;
      const tiltAngle = Math.max(-12, Math.min(12, scrollVelocity * 0.4));
      track.style.transform = `perspective(1000px) rotateX(${8 + tiltAngle * 0.2}deg) rotateY(${-4 + dir * 3}deg) translate3d(${xOffset}px, 0, 15px)`;
    });

    // 2. Parallax 3D Depth on Hero Images
    heroImages.forEach(img => {
      if (currentScrollY < window.innerHeight) {
        const yTranslate = currentScrollY * 0.28;
        const scale = 1.04 + (currentScrollY * 0.00015);
        img.style.transform = `translate3d(0, ${yTranslate}px, 0) scale(${scale.toFixed(4)})`;
      }
    });

    // 3. Orbital Satellites 3D gentle float based on scroll position
    if (orbitalSatellites.length > 0) {
      orbitalSatellites.forEach((sat, idx) => {
        const speed = 0.04 * (idx + 1);
        const yOffset = (currentScrollY * speed) % 30;
        sat.style.transform = `translate3d(0, ${-yOffset}px, ${idx * 6}px)`;
      });
    }

    // 4. Center Fluid Organic Image subtle 3D hover on scroll
    if (centerOrganicImg) {
      const rect = centerOrganicImg.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const relativeProgress = (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2);
        const rotY = relativeProgress * -6;
        const rotX = relativeProgress * 4;
        centerOrganicImg.style.transform = `perspective(1000px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateZ(15px)`;
      }
    }

    animFrameId = null;
  };

  window.addEventListener('scroll', () => {
    if (!animFrameId) {
      animFrameId = window.requestAnimationFrame(handle3DScroll);
    }
  }, { passive: true });

  // Initial trigger
  handle3DScroll();

  // C. Interactive 3D Cursor Tilt on Cards
  const tiltCards = document.querySelectorAll(`
    .service-strip-box,
    .basis-pillar-card,
    .about-slate-tall-card,
    .treatment-card-item,
    .gallery-masonry-item
  `);

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // max 6deg tilt
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) translateY(0)';
    });
  });

});

// Direct Contact Form Submit Handler
function handleDirectSubmit(e) {
  if (e) e.preventDefault();
  
  const name = document.getElementById('directName')?.value || '';
  const contactInfo = document.getElementById('directPhone')?.value || '';
  const messageText = document.getElementById('directTreatment')?.value || '';

  const message = `Hello ILAA India Sanctuary,\n\nI am reaching out via the website contact form:\n• Name: ${name}\n• Contact / Email: ${contactInfo}\n• Inquiry / Message: ${messageText}\n\nPlease get in touch with me. Thank you!`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=919994591902&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

