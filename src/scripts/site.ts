/** Progressive enhancement: header state, reveals, estimate dialog, demo notices, lightbox. */

const $ = <T extends Element>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

/* Header shadow once the page scrolls */
const header = $<HTMLElement>('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Scroll reveal */
const revealTargets = $$<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

/* Toast (demo notices) */
const toast = $<HTMLElement>('[data-toast]');
let toastTimer: number | undefined;
function showToast(message: string) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => (toast.hidden = true), 300);
  }, 3600);
}

document.addEventListener('click', (event) => {
  const trigger = (event.target as Element).closest<HTMLElement>('[data-demo-notice]');
  if (trigger) showToast(trigger.dataset.demoNotice ?? '');
});

/* Estimate dialog */
const dialog = $<HTMLDialogElement>('[data-estimate]');
const form = $<HTMLFormElement>('[data-estimate-form]');
const result = $<HTMLElement>('[data-estimate-result]');
const formError = $<HTMLElement>('[data-form-error]');
const uploadInput = $<HTMLInputElement>('[data-upload-input]');
const uploadLabel = $<HTMLElement>('[data-upload-label]');
const uploadDefault = uploadLabel?.textContent ?? '';

function resetEstimate() {
  if (!form || !result) return;
  form.reset();
  form.hidden = false;
  result.hidden = true;
  if (formError) formError.hidden = true;
  if (uploadLabel) uploadLabel.textContent = uploadDefault;
}

if (dialog && form && result) {
  document.addEventListener('click', (event) => {
    const opener = (event.target as Element).closest<HTMLElement>('[data-open-estimate]');
    if (!opener) return;
    resetEstimate();
    const type = opener.dataset.projectType;
    if (type) {
      const radio = $$<HTMLInputElement>('input[name="projectType"]', form).find((r) => r.value === type);
      if (radio) radio.checked = true;
    }
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  });

  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
  });

  $$('[data-estimate-close]', dialog).forEach((btn) => btn.addEventListener('click', () => dialog.close()));

  // Click on the backdrop closes the dialog
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  uploadInput?.addEventListener('change', () => {
    const count = uploadInput.files?.length ?? 0;
    if (uploadLabel) uploadLabel.textContent = count ? `${count} photo${count > 1 ? 's' : ''} selected` : uploadDefault;
  });

  const showResult = () => {
    form.hidden = true;
    result.hidden = false;
    result.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Demo mode: never transmit or store anything.
    if (form.dataset.mode === 'demo') {
      form.reset();
      showResult();
      return;
    }

    // Production without a configured endpoint: never pretend it was sent.
    if (!form.getAttribute('action')) {
      if (formError) formError.hidden = false;
      return;
    }

    const submit = $<HTMLButtonElement>('button[type="submit"]', form);
    if (submit) submit.disabled = true;
    if (formError) formError.hidden = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      showResult();
    } catch {
      if (formError) formError.hidden = false;
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

/* Gallery lightbox */
const lightbox = $<HTMLDialogElement>('[data-lightbox]');
const cards = $$<HTMLButtonElement>('[data-lightbox-index]');
if (lightbox && cards.length) {
  const img = $<HTMLImageElement>('[data-lightbox-img]', lightbox)!;
  const title = $<HTMLElement>('[data-lightbox-title]', lightbox)!;
  const meta = $<HTMLElement>('[data-lightbox-meta]', lightbox)!;
  const badge = $<HTMLElement>('[data-lightbox-badge]', lightbox)!;
  let current = 0;

  const show = (index: number) => {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    img.src = card.dataset.fullSrc ?? '';
    img.alt = card.dataset.alt ?? '';
    title.textContent = card.dataset.title ?? '';
    meta.textContent = card.dataset.meta ?? '';
    badge.hidden = !card.hasAttribute('data-concept');
  };

  cards.forEach((card, i) =>
    card.addEventListener('click', () => {
      show(i);
      lightbox.showModal();
      document.documentElement.style.overflow = 'hidden';
    }),
  );

  lightbox.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    cards[current]?.focus();
  });
  $('[data-lightbox-close]', lightbox)?.addEventListener('click', () => lightbox.close());
  $('[data-lightbox-prev]', lightbox)?.addEventListener('click', () => show(current - 1));
  $('[data-lightbox-next]', lightbox)?.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // Swipe on touch devices
  let startX = 0;
  lightbox.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
}
