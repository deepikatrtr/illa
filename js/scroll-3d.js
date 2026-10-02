/**
 * ILAA INDIA - 3D Perspective & Scroll Animation Engine
 * Silky smooth 60fps/120fps hardware-accelerated motion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const heroImg = document.querySelector('.hero-bg-img img');
  const heroTitle = document.querySelector('.hero-main-title');
  const heroSide = document.querySelector('.hero-side-paragraph');
  const kineticTracks = document.querySelectorAll('.kinetic-3d-track');
  const floatingBadges = document.querySelectorAll('.floating-3d-badge');
  const orbitalSatellites = document.querySelectorAll('.orb-img');
  const tiltCards = document.querySelectorAll('.tilt-3d-card, .basis-block, .abonement-card, .service-strip-item, .insta-item-exact');

  let ticking = false;
  let lastScrollY = window.scrollY;

  // 1. Scroll-Driven 3D Transformations Loop
  function update3DScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // A. Hero 3D Parallax & Depth Break
    if (heroImg && scrollY < windowHeight * 1.5) {
      const heroProgress = scrollY / windowHeight;
      heroImg.style.transform = `translate3d(0, ${scrollY * 0.32}px, -${heroProgress * 80}px) scale(${1 + heroProgress * 0.12}) rotateX(${heroProgress * 6}deg)`;
      
      if (heroTitle) {
        heroTitle.style.transform = `translate3d(0, ${scrollY * -0.15}px, 35px) rotateX(${heroProgress * -4}deg)`;
      }
      if (heroSide) {
        heroSide.style.transform = `translate3d(0, ${scrollY * -0.1}px, 25px)`;
      }
    }

    // B. Kinetic Floating 3D Text Tracks
    kineticTracks.forEach((track, index) => {
      const rect = track.parentElement.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const speed = (index % 2 === 0 ? 0.35 : -0.35);
        const offset = (windowHeight - rect.top) * speed;
        track.style.transform = `translate3d(${offset}px, 0, 15px) rotateX(10deg)`;
      }
    });

    // C. Floating 3D Badges
    floatingBadges.forEach((badge, index) => {
      const speed = parseFloat(badge.getAttribute('data-speed') || (0.15 + index * 0.08));
      const rotSpeed = (index % 2 === 0 ? 1 : -1) * 0.05;
      const yPos = scrollY * speed;
      const rot = scrollY * rotSpeed;
      badge.style.transform = `translate3d(0, ${yPos}px, 45px) rotateZ(${rot}deg)`;
    });

    // D. Orbital Celestial Arena 3D Satellite & Stage Motion
    const orbitalStage = document.querySelector('.orbital-celestial-stage');
    if (orbitalStage) {
      const rect = orbitalStage.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const centerProgress = (windowHeight / 2 - (rect.top + rect.height / 2)) / (windowHeight / 2);
        
        const centerArch = orbitalStage.querySelector('.orbital-hero-center-arch');
        if (centerArch) {
          centerArch.style.transform = `translate3d(0, ${centerProgress * -16}px, 50px) scale(${1 + (1 - Math.abs(centerProgress)) * 0.03})`;
        }

        const ringOuter = orbitalStage.querySelector('.orbital-orbit-ring');
        if (ringOuter) {
          ringOuter.style.transform = `scale(${1 + centerProgress * 0.05}) rotate(${scrollY * 0.08}deg)`;
        }

        const ringInner = orbitalStage.querySelector('.orbital-orbit-ring-inner');
        if (ringInner) {
          ringInner.style.transform = `scale(${1 - centerProgress * 0.04}) rotate(${scrollY * -0.12}deg)`;
        }

        const nodeTopRight = orbitalStage.querySelector('.node-top-right');
        if (nodeTopRight) {
          nodeTopRight.style.transform = `translate3d(${centerProgress * 28}px, ${centerProgress * -36}px, 45px)`;
        }

        const nodeLeftCapsule = orbitalStage.querySelector('.node-left-capsule');
        if (nodeLeftCapsule) {
          nodeLeftCapsule.style.transform = `translate3d(${centerProgress * -38}px, ${centerProgress * 24}px, 55px)`;
        }

        const nodeRightCircle = orbitalStage.querySelector('.node-right-circle');
        if (nodeRightCircle) {
          nodeRightCircle.style.transform = `translate3d(${centerProgress * 32}px, ${centerProgress * 28}px, 40px)`;
        }

        const nodeBottomLeft = orbitalStage.querySelector('.node-bottom-left');
        if (nodeBottomLeft) {
          nodeBottomLeft.style.transform = `translate3d(${centerProgress * -26}px, ${centerProgress * 34}px, 35px)`;
        }
      }
    }

    // E. 3D Tilt & Float on Section Elements Entering Viewport
    tiltCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const cardCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const diff = (cardCenter - screenCenter) / (windowHeight / 2);
        
        // Gentle 3D perspective rotation while scrolling
        const tiltX = Math.max(-12, Math.min(12, diff * -8));
        card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) translateZ(${Math.max(0, (1 - Math.abs(diff)) * 25)}px)`;
      }
    });

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestScrollTick() {
    if (!ticking) {
      requestAnimationFrame(update3DScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestScrollTick, { passive: true });
  requestScrollTick();

  // 2. Interactive 3D Cursor Tilt on Cards & Orbital Arena (Desktop)
  if (window.matchMedia('(hover: hover)').matches) {
    // Orbital Arena Mouse Parallax
    const orbitalArena = document.querySelector('.orbital-arena-wrapper');
    if (orbitalArena) {
      orbitalArena.addEventListener('mousemove', (e) => {
        const rect = orbitalArena.getBoundingClientRect();
        const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        const satellites = orbitalArena.querySelectorAll('.orbital-satellite');
        satellites.forEach((sat, i) => {
          const depth = (i + 1) * 7;
          sat.style.transform = `translate3d(${normX * -depth}px, ${normY * -depth}px, ${depth * 2}px)`;
        });

        const centerArch = orbitalArena.querySelector('.orbital-hero-center-arch');
        if (centerArch) {
          centerArch.style.transform = `perspective(1000px) rotateX(${normY * -6}deg) rotateY(${normX * 6}deg) scale(1.02)`;
        }
      });

      orbitalArena.addEventListener('mouseleave', () => {
        const satellites = orbitalArena.querySelectorAll('.orbital-satellite');
        satellites.forEach(sat => {
          sat.style.transform = '';
        });
        const centerArch = orbitalArena.querySelector('.orbital-hero-center-arch');
        if (centerArch) {
          centerArch.style.transform = '';
        }
      });
    }

    document.querySelectorAll('.abonement-card, .service-strip-item, .about-pillar-card, .service-comprehensive-card, .sanctuary-location-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
      });
    });

    // 3. Instagram 3D Cylinder Interactive Mouse Sway & Parallax
    const instaStage = document.querySelector('.insta-3d-stage');
    const instaCylinder = document.getElementById('instaCylinder');
    if (instaStage && instaCylinder) {
      // Dynamic 3D Continuous Curved Carousel Engine
      class Curved3DCylinderCarousel {
        constructor(stage, cylinder) {
          this.stage = stage;
          this.cylinder = cylinder;
          this.cards = Array.from(cylinder.querySelectorAll('.insta-3d-card'));
          if (!this.stage || !this.cylinder || this.cards.length === 0) return;

          this.totalCards = this.cards.length;
          this.cardSpacing = 210;
          this.scrollPos = 0;
          this.targetScrollPos = 0;
          this.autoSpeed = 0.5; // Smooth slow auto-glide
          this.isPaused = false;
          this.isDragging = false;
          this.startX = 0;
          this.startScroll = 0;
          this.hoveredCard = null;

          this.init();
        }

        init() {
          this.updateSpacing();
          window.addEventListener('resize', () => this.updateSpacing());

          // Hover interactions
          this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
              this.isPaused = true;
              this.hoveredCard = card;
            });
            card.addEventListener('mouseleave', () => {
              this.isPaused = false;
              this.hoveredCard = null;
            });
          });

          // Mouse / Touch Dragging
          this.stage.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.clientX;
            this.startScroll = this.targetScrollPos;
          });

          window.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
              const diff = this.startX - e.clientX;
              this.targetScrollPos = this.startScroll + diff * 1.25;
            }
          });

          window.addEventListener('mouseup', () => {
            this.isDragging = false;
          });

          this.stage.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
            this.startScroll = this.targetScrollPos;
          }, { passive: true });

          window.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
              const diff = this.startX - e.touches[0].clientX;
              this.targetScrollPos = this.startScroll + diff * 1.25;
            }
          }, { passive: true });

          window.addEventListener('touchend', () => {
            this.isDragging = false;
          });

          // Mouse Wheel Horizontal Scroll
          this.stage.addEventListener('wheel', (e) => {
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (Math.abs(delta) > 5) {
              this.targetScrollPos += delta * 0.8;
            }
          }, { passive: true });

          // Prev / Next Navigation Buttons
          const prevBtn = document.getElementById('instaPrevBtn');
          const nextBtn = document.getElementById('instaNextBtn');
          if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
              e.preventDefault();
              this.targetScrollPos -= this.cardSpacing * 1.5;
            });
          }
          if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
              e.preventDefault();
              this.targetScrollPos += this.cardSpacing * 1.5;
            });
          }

          // Start 60fps render loop
          this.render();
        }

        updateSpacing() {
          const firstCard = this.cards[0];
          if (firstCard) {
            const rect = firstCard.getBoundingClientRect();
            this.cardSpacing = Math.max(130, rect.width * 0.94);
          }
        }

        render() {
          if (!this.isPaused && !this.isDragging) {
            this.targetScrollPos += this.autoSpeed;
          }

          // Smooth interpolation
          this.scrollPos += (this.targetScrollPos - this.scrollPos) * 0.09;

          const stageRect = this.stage.getBoundingClientRect();
          const halfWidth = stageRect.width / 2;
          const totalTrackWidth = this.cardSpacing * this.totalCards;

          this.cards.forEach((card, index) => {
            // Position along the continuous looping track
            let offset = (index * this.cardSpacing) - (this.scrollPos % totalTrackWidth);

            // Wrap smoothly so cards cycle from one end to the other indefinitely
            while (offset < -totalTrackWidth / 2) offset += totalTrackWidth;
            while (offset > totalTrackWidth / 2) offset -= totalTrackWidth;

            // Normalized position: -1.2 (left edge) to 0 (center) to +1.2 (right edge)
            const norm = offset / (halfWidth * 0.70);

            if (Math.abs(norm) < 1.65) {
              card.style.display = 'block';
              card.style.opacity = Math.max(0, 1 - (Math.abs(norm) - 1.25) * 2.5);

              if (this.hoveredCard === card) {
                card.style.transform = `translate3d(${offset}px, -4px, 45px) rotateY(0deg) scale(1.04)`;
                card.style.zIndex = '50';
              } else {
                // Natural Parabolic 3D Cylinder Curve without over-zooming
                const rotY = Math.max(-48, Math.min(48, -norm * 44));
                const tz = -(norm * norm) * 35 + 10;
                const ty = (norm * norm) * 12;
                const zIndex = Math.round(30 - Math.abs(norm) * 10);

                card.style.transform = `translate3d(${offset}px, ${ty}px, ${tz}px) rotateY(${rotY}deg) scale(1)`;
                card.style.zIndex = zIndex;
              }
            } else {
              card.style.display = 'none';
            }
          });

          requestAnimationFrame(() => this.render());
        }

      }

      new Curved3DCylinderCarousel(instaStage, instaCylinder);
    }
  }
});


