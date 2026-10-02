/* Shazia's Mehendi — vanilla JS */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const NS = 'http://www.w3.org/2000/svg';

  /* =====================================================
     SETTINGS
  ===================================================== */

  const WHATSAPP = '916291805617';

  /* Gallery Images */
  const PHOTOS = [
  { src: 'assets/mehendi-1.webp', alt: "Shazia's Mehendi design" },
  { src: 'assets/mehendi-2.webp', alt: "Mehendi design" },
  { src: 'assets/mehendi-3.webp', alt: "Traditional mehendi design" },
  { src: 'assets/mehendi-4.webp', alt: "Detailed mehendi artwork" },
  { src: 'assets/mehendi-5.webp', alt: "Mehendi artwork" },
  { src: 'assets/mehendi-6.webp', alt: "Mehendi design" }
];

  /* =====================================================
     NAVBAR
  ===================================================== */

  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#menu');

  const handleScroll = () => {
    if (nav) {
      nav.classList.toggle('sc', scrollY > 30);
    }
  };

  addEventListener('scroll', handleScroll, {
    passive: true
  });

  handleScroll();

  const setMenu = (open) => {
    if (!menu || !burger) return;

    menu.classList.toggle('open', open);

    burger.setAttribute(
      'aria-expanded',
      String(open)
    );

    burger.setAttribute(
      'aria-label',
      open ? 'Close menu' : 'Open menu'
    );
  };

  if (burger && menu) {
    burger.addEventListener('click', () => {
      setMenu(!menu.classList.contains('open'));
    });

    $$('a', menu).forEach((link) => {
      link.addEventListener('click', () => {
        setMenu(false);
      });
    });
  }

  /* =====================================================
     MANDALA ART
  ===================================================== */

  const createMandala = (petals) => {

    const svg = document.createElementNS(NS, 'svg');

    svg.setAttribute(
      'viewBox',
      '0 0 400 400'
    );

    let html = `
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
      >
    `;

    for (let i = 0; i < petals; i++) {

      html += `
        <g transform="rotate(${i * 360 / petals} 200 200)">

          <path
            d="
              M200 60
              C178 100 178 140 200 170
              C222 140 222 100 200 60Z
            "
          />

          <path
            d="
              M200 190
              C188 215 188 235 200 250
              C212 235 212 215 200 190Z
            "
            opacity=".7"
          />

          <circle
            cx="200"
            cy="38"
            r="3"
          />

        </g>
      `;
    }

    html += `

        <circle
          cx="200"
          cy="200"
          r="22"
        />

        <circle
          cx="200"
          cy="200"
          r="8"
          stroke="#B99552"
        />

        <circle
          cx="200"
          cy="200"
          r="168"
          stroke="#B99552"
          opacity=".7"
        />

      </g>
    `;

    svg.innerHTML = html;

    return svg;
  };

  $$('.mandala').forEach((mandala) => {

    const petals =
      Number(mandala.dataset.petals) || 12;

    mandala.appendChild(
      createMandala(petals)
    );

  });

  /* =====================================================
     SIGNATURE DRAWING
  ===================================================== */

  const petalGroup = $('#petals');

  if (petalGroup) {

    for (let i = 0; i < 12; i++) {

      const path =
        document.createElementNS(NS, 'path');

      path.setAttribute(
        'pathLength',
        '1'
      );

      path.setAttribute(
        'd',
        `
        M200 50
        C176 90 176 126 200 154
        C224 126 224 90 200 50Z
        `
      );

      path.setAttribute(
        'transform',
        `rotate(${i * 30} 200 200)`
      );

      petalGroup.appendChild(path);
    }
  }

  $$('#draw [pathLength]').forEach(
    (element, index) => {

      element.style.setProperty(
        '--d',
        `${index * 0.18}s`
      );

    }
  );

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  $$('.rv').forEach(
    (element, index) => {

      element.style.setProperty(
        '--d',
        `${(index % 3) * 0.1}s`
      );

    }
  );

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('in');

          if (entry.target.id === 'draw') {
            entry.target.classList.add('go');
          }

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.2
      }
    );

  $$('.rv').forEach((element) => {
    observer.observe(element);
  });

  const draw = $('#draw');

  if (draw) {
    observer.observe(draw);
  }

  /* =====================================================
     CUSTOM CURSOR
  ===================================================== */

  if (fine && !reduce) {

    const dot = $('.cur.d');
    const ring = $('.cur.r');

    if (dot && ring) {

      let x = 0;
      let y = 0;

      let ringX = 0;
      let ringY = 0;

      addEventListener(
        'mousemove',
        (event) => {

          x = event.clientX;
          y = event.clientY;

          dot.style.transform =
            `translate(${x}px, ${y}px)`;

        },
        {
          passive: true
        }
      );

      const animateCursor = () => {

        ringX += (x - ringX) * 0.18;
        ringY += (y - ringY) * 0.18;

        ring.style.transform =
          `translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(
          animateCursor
        );
      };

      animateCursor();

      document.addEventListener(
        'mouseover',
        (event) => {

          const interactive =
            event.target.closest(
              'a, button, .tile, select'
            );

          ring.classList.toggle(
            'big',
            Boolean(interactive)
          );

        }
      );
    }
  }

  /* =====================================================
     GALLERY
     ONLY IMAGES — NO VIEW TEXT
  ===================================================== */

  const mason = $('#mason');

  if (mason) {

    PHOTOS.forEach((photo, index) => {

      const button =
        document.createElement('button');

      button.className = 'tile';

      button.type = 'button';

      button.setAttribute(
        'aria-label',
        photo.alt
      );

      /*
       * IMPORTANT:
       * Only the image is inserted.
       * No "View" text.
       * No placeholder text.
       * No overlay text.
       */

      button.innerHTML = `
        <img
          src="${photo.src}"
          alt="${photo.alt}"
          loading="lazy"
          decoding="async"
        >
      `;

     

      mason.appendChild(button);

    });

  }

  /* =====================================================
     LIGHTBOX
  ===================================================== */

  const lightbox = $('#lb');
  const lightboxImage = $('#lbi');

  let currentImage = 0;
  let lastFocusedElement = null;

  const showImage = (index) => {

    if (!lightboxImage) return;

    currentImage =
      (index + PHOTOS.length) %
      PHOTOS.length;

    const photo =
      PHOTOS[currentImage];

    lightboxImage.innerHTML = `
      <img
        src="${photo.src}"
        alt="${photo.alt}"
      >
    `;

    /* Restart animation */

    lightboxImage.style.animation = 'none';

    void lightboxImage.offsetWidth;

    lightboxImage.style.animation = '';

  };

  const openLightbox = (index) => {

    if (!lightbox) return;

    lastFocusedElement =
      document.activeElement;

    lightbox.hidden = false;

    showImage(index);

    document.body.style.overflow =
      'hidden';

    const closeButton = $('#lbx');

    if (closeButton) {
      closeButton.focus();
    }

  };

  const closeLightbox = () => {

    if (!lightbox) return;

    lightbox.hidden = true;

    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }

  };

  const closeButton = $('#lbx');
  const previousButton = $('#lbp');
  const nextButton = $('#lbnx');

  if (closeButton) {

    closeButton.addEventListener(
      'click',
      closeLightbox
    );

  }

  if (previousButton) {

    previousButton.addEventListener(
      'click',
      () => {

        showImage(
          currentImage - 1
        );

      }
    );

  }

  if (nextButton) {

    nextButton.addEventListener(
      'click',
      () => {

        showImage(
          currentImage + 1
        );

      }
    );

  }

  if (lightbox) {

    lightbox.addEventListener(
      'click',
      (event) => {

        if (event.target === lightbox) {
          closeLightbox();
        }

      }
    );

  }

  /* Keyboard Lightbox */

  addEventListener(
    'keydown',
    (event) => {

      if (
        !lightbox ||
        lightbox.hidden
      ) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {

        showImage(
          currentImage - 1
        );

      }

      if (event.key === 'ArrowRight') {

        showImage(
          currentImage + 1
        );

      }

    }
  );

  /* =====================================================
     MOBILE SWIPE LIGHTBOX
  ===================================================== */

  let swipeStartX = 0;

  if (lightbox) {

    lightbox.addEventListener(
      'touchstart',
      (event) => {

        swipeStartX =
          event.touches[0].clientX;

      },
      {
        passive: true
      }
    );

    lightbox.addEventListener(
      'touchend',
      (event) => {

        const swipeEndX =
          event.changedTouches[0].clientX;

        const difference =
          swipeEndX - swipeStartX;

        if (
          Math.abs(difference) > 50
        ) {

          if (difference < 0) {

            showImage(
              currentImage + 1
            );

          } else {

            showImage(
              currentImage - 1
            );

          }

        }

      },
      {
        passive: true
      }
    );

  }

  /* =====================================================
     ENQUIRY BUTTONS
  ===================================================== */

  $$('.pick').forEach((button) => {

    button.addEventListener(
      'click',
      () => {

        const form = $('#enq');

        if (
          form &&
          form.elements.t
        ) {

          form.elements.t.value =
            button.dataset.type || '';

        }

      }
    );

  });

  /* =====================================================
     ENQUIRY FORM
  ===================================================== */

  const form = $('#enq');

  if (form) {

    const rules = {

      n: (value) =>
        value.trim().length > 1 ||
        'Enter your name.',

      p: (value) =>
        /^[+]?[\d\s-]{10,14}$/.test(
          value.trim()
        ) ||
        'Enter a valid phone number.',

      t: (value) =>
        Boolean(value) ||
        'Choose an enquiry type.'

    };

    form.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();

        let valid = true;

        Object.entries(rules).forEach(
          ([name, validation]) => {

            const input =
              form.elements[name];

            if (!input) return;

            const result =
              validation(input.value);

            const message =
              result === true
                ? ''
                : result;

            input.classList.toggle(
              'bad',
              Boolean(message)
            );

            input.setAttribute(
              'aria-invalid',
              String(Boolean(message))
            );

            const error =
              input.parentElement
                ?.querySelector('em');

            if (error) {
              error.textContent =
                message;
            }

            if (message) {
              valid = false;
            }

          }
        );

        const output = $('#ok');

        if (!valid) {

          if (output) {
            output.hidden = true;
          }

          const firstError =
            form.querySelector('.bad');

          if (firstError) {
            firstError.focus();
          }

          return;
        }

        const enquiryType =
          form.elements.t?.value || '';

        const name =
          form.elements.n?.value || '';

        const date =
          form.elements.d?.value ||
          'not specified';

        const message =
          form.elements.m?.value || '';

        const whatsappMessage = `
Hello, I'd like to enquire about ${enquiryType}.

Name: ${name}
Preferred Date: ${date}

${message}
        `.trim();

        const whatsappButton =
          $('#wa2');

        if (whatsappButton) {

          whatsappButton.href =
            `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              whatsappMessage
            )}`;

        }

        if (output) {

          output.hidden = false;

          output.scrollIntoView({
            block: 'nearest',
            behavior: reduce
              ? 'auto'
              : 'smooth'
          });

        }

      }
    );

  }

})();