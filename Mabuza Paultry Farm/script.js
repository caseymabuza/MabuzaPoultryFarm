 /* ── PRELOADER ─────────────────────────────────────────── */
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
      }, 1800);
    });

    /* ── NAVBAR SCROLL ─────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ── HAMBURGER ─────────────────────────────────────────── */
    const ham  = document.getElementById('hamburger');
    const mMenu = document.getElementById('mobile-menu');
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mMenu.classList.toggle('open');
    });
    function closeMobile() {
      ham.classList.remove('open');
      mMenu.classList.remove('open');
    }

    /* ── SCROLL REVEAL ─────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    /* ── BACK TO TOP ───────────────────────────────────────── */
    const backTop = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    /* ── COUNT-UP ANIMATION ────────────────────────────────── */
    function animateCount(el, target) {
      const suffix = target >= 1000 ? 'K+' : target === 14 ? 'yr' : '+';
      const displayTarget = target >= 1000 ? Math.round(target / 1000) : target;
      let current = 0;
      const step = Math.ceil(displayTarget / 50);
      const timer = setInterval(() => {
        current = Math.min(current + step, displayTarget);
        el.textContent = current + suffix;
        if (current >= displayTarget) clearInterval(timer);
      }, 30);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.target);
          animateCount(e.target, target);
          statsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-num[data-target]').forEach(el => statsObserver.observe(el));

    /* ── MODAL ─────────────────────────────────────────────── */
    const overlay = document.getElementById('modal-overlay');
    function openModal(product) {
      const sel = document.getElementById('f-product');
      if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === product) { sel.selectedIndex = i; break; }
        }
      }
      document.getElementById('modal-form-wrap').style.display = '';
      document.getElementById('form-success').style.display = 'none';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    function submitForm() {
      const name  = document.getElementById('f-name').value.trim();
      const phone = document.getElementById('f-phone').value.trim();
      if (!name || !phone) { alert('Please fill in your name and phone number.'); return; }
      document.getElementById('modal-form-wrap').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }

    /* ── SMOOTH ANCHOR SCROLL ─────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });

    /* ── PRODUCT CARD RIPPLE ──────────────────────────────── */
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        ripple.style.cssText = `
          position:absolute;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;
          width:0;height:0;border-radius:50%;background:rgba(200,134,10,.15);
          transform:translate(-50%,-50%);animation:rippleAnim .6s ease-out forwards;pointer-events:none;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });

    /* inject ripple keyframe */
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      @keyframes rippleAnim {
        to { width: 400px; height: 400px; opacity: 0; }
      }
    `;
    document.head.appendChild(rippleStyle);