// G‑Bonk website – main scripts

// Toggle navigation on mobile
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }

  // De wallet‑connecties zijn verwijderd. Er worden daarom geen
  // event‑listeners meer geregistreerd voor [data-wallet].

  // Mascot assistant click handler
  const mascot = document.getElementById('mascot');
  if (mascot) {
    mascot.addEventListener('click', () => {
      alert("Hi! I'm G‑Bonk, your friendly guide. Need help? Use the menu above to explore the site.");
    });
  }

  // Initialise the dynamic starfield background
  initStarfield();
  // Set up section reveal animations
  initReveal();
  // Set up parallax effect on hero images
  initParallax();
});

/**
 * Attempts to connect to a wallet based on the selected provider.
 * For Phantom/Trust Wallet/Solflare we use their respective APIs when available;
 * otherwise a new tab is opened to take the user to the download page. This is
 * a simple implementation for demonstration purposes – in production you
 * should implement comprehensive error handling.
 *
 * @param {string} provider - name of the wallet (phantom | trust | solflare | binance)
 */
async function connectWallet(provider) {
  try {
    switch (provider) {
      case 'phantom': {
        // Phantom injects a provider at window.phantom.solana and window.solana.
        // Detect using the recommended API from the Phantom docs.
        const providerObj = window.phantom?.solana || window.solana;
        if (providerObj && providerObj.isPhantom) {
          // Attempt connection via Phantom adapter. Some versions expose
          // connect(); others require a JSON‑RPC request.
          if (typeof providerObj.connect === 'function') {
            await providerObj.connect();
          } else if (typeof providerObj.request === 'function') {
            await providerObj.request({ method: 'connect' });
          }
        } else {
          // Fallback: open Phantom download page
          window.open('https://phantom.app', '_blank');
        }
        break;
      }
      case 'trust': {
        // Trust Wallet injects window.trustwallet when installed
        const { trustwallet } = window;
        if (trustwallet && typeof trustwallet.connect === 'function') {
          await trustwallet.connect();
        } else {
          window.open('https://trustwallet.com/download', '_blank');
        }
        break;
      }
      case 'solflare': {
        const { solflare } = window;
        if (solflare && typeof solflare.connect === 'function') {
          await solflare.connect();
        } else {
          window.open('https://solflare.com', '_blank');
        }
        break;
      }
      case 'binance': {
        // Binance Wallet on Solana networks isn't supported; open download page
        window.open('https://www.binance.com/en/wallet', '_blank');
        break;
      }
      default:
        console.warn('Unknown wallet provider:', provider);
    }
  } catch (err) {
    console.error('Failed to connect wallet:', err);
  }
}

/**
 * Creates a subtle animated starfield on the background canvas. Stars drift
 * slowly across the screen and wrap around the edges. This function
 * automatically resizes the canvas to fill the viewport and runs on
 * `DOMContentLoaded` via the call above. If no canvas element exists, the
 * function safely returns.
 */
function initStarfield() {
  const canvas = document.getElementById('backgroundCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const stars = [];
  const numStars = 100;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // When resizing, reposition existing stars within new bounds
    stars.forEach(star => {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    });
  }
  resize();
  window.addEventListener('resize', resize);

  // Initialise stars with random positions, velocities and sizes
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // Velocities are small to create gentle drifting
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.5
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;
      // Wrap around edges
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
      // Draw star
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(update);
  }
  update();
}

/**
 * Reveals sections with a fade‑in and slide‑up animation when they enter the viewport.
 * Sections are hidden by default via CSS and receive the `.visible` class when
 * intersecting. Once visible, they are no longer observed.
 */
function initReveal() {
  const sections = document.querySelectorAll('.section');
  if (!('IntersectionObserver' in window)) {
    // Fallback: immediately show all sections if IntersectionObserver is unsupported
    sections.forEach(sec => sec.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * Applies a subtle parallax effect to images inside hero sections. Images translate
 * vertically at a slower rate than the page scroll, creating depth. The function
 * calculates a base offset for each image and updates the transform on scroll
 * and resize.
 */
function initParallax() {
  const heroImages = document.querySelectorAll('.hero img');
  if (heroImages.length === 0) return;
  // Speed determines how slow the images move relative to the scroll (lower is slower).
  const speed = 0.2;
  function update() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    heroImages.forEach(img => {
      img.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
  update();
  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);
}