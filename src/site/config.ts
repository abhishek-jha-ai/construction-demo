/**
 * YDY Professional Construction LLC — site configuration.
 *
 * Everything customer-specific lives in `src/site/` (this file, `theme.css`,
 * and `assets/`). Components under `src/components/` only read from here, so
 * going to production means editing this folder — not the components.
 *
 * Launch checklist:
 *   1. mode: 'production'
 *   2. contact.phone / contact.whatsapp / contact.email — verified values
 *   3. lead.endpoint — the real form handler (Formspree, CRM webhook, etc.)
 *   4. Replace concept imagery with YDY project photos and set `verified: true`
 *   5. seo.url — the live domain
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/icons';

import heroKitchen from './assets/hero-kitchen.png';
import kitchenIsland from './assets/projects/kitchen-island.png';
import primaryBath from './assets/projects/primary-bath.png';
import flooringOpenPlan from './assets/projects/flooring-open-plan.png';
import flooringLiving from './assets/projects/flooring-living.png';

export type SiteMode = 'demo' | 'production';

export interface SiteImage {
  src: ImageMetadata;
  alt: string;
  /** true only for photos of YDY's own completed work, approved by YDY. */
  verified: boolean;
}

export interface Project {
  title: string;
  category: string;
  /** Only shown when the image is verified — never attach a location to concept art. */
  location?: string;
  image: SiteImage;
}

export const site = {
  mode: 'demo' as SiteMode,

  brand: {
    legalName: 'YDY Professional Construction LLC',
    wordmark: { primary: 'YDY', secondary: 'Construction' },
    /** Optional logo file; when absent the text wordmark is used. */
    logo: null as ImageMetadata | null,
  },

  seo: {
    title: 'YDY Construction — Kitchen, Bath & Flooring | Clearwater, FL',
    description:
      'Kitchen remodeling, bathroom remodeling and flooring installation in Clearwater and surrounding areas. Request a free estimate from YDY Professional Construction.',
    url: 'https://example.com',
    locale: 'en_US',
  },

  contact: {
    /** E.164 without "+", e.g. '17275550123'. Left empty until verified. */
    phone: '',
    whatsapp: '',
    email: '',
    serviceArea: 'Clearwater & surrounding areas',
    region: 'Clearwater, FL',
  },

  lead: {
    /** Production form handler. Ignored in demo mode. */
    endpoint: '',
    projectTypes: ['Kitchen', 'Bathroom', 'Flooring', 'Whole home', 'Other'],
    whatsappGreeting: "Hi YDY, I'd like a free estimate for my project.",
    demoNotice: 'Demo — lead form will be connected at launch.',
    demoWhatsappNotice: 'Demo — WhatsApp chat will be connected at launch.',
  },

  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Process', href: '#process' },
  ],

  hero: {
    eyebrow: 'Kitchen & Bath Contractor',
    headline: ['Beautiful Spaces.', 'Built for', 'Real Life.'],
    /** Index of the headline line to render in the accent color. */
    accentLine: 2,
    body: 'Kitchen remodeling, bathroom remodeling and flooring installation — with quality craftsmanship and clear communication from first visit to final walkthrough.',
    primaryCta: 'Get Free Estimate',
    secondaryCta: 'Chat on WhatsApp',
    image: {
      src: heroKitchen,
      alt: 'Bright white kitchen with a marble waterfall island and brass pendant lights',
      verified: false,
    } satisfies SiteImage,
  },

  /** Only facts YDY has confirmed. No ratings, counts, awards or years. */
  trust: [
    { icon: 'shieldCheck', label: 'Licensed & Insured' },
    { icon: 'award', label: 'Quality Craftsmanship' },
    { icon: 'mapPin', label: 'Serving Clearwater & surrounding areas' },
  ] satisfies { icon: IconName; label: string }[],

  services: {
    eyebrow: 'What we do',
    title: 'Remodeling, done right.',
    items: [
      {
        icon: 'kitchen',
        title: 'Kitchen Remodeling',
        body: 'Cabinets, counters, backsplash and layout — built around how you cook and live.',
        projectType: 'Kitchen',
      },
      {
        icon: 'bath',
        title: 'Bathroom Remodeling',
        body: 'Showers, tile, vanities and fixtures for a bathroom that’s beautiful and practical.',
        projectType: 'Bathroom',
      },
      {
        icon: 'flooring',
        title: 'Flooring Installation',
        body: 'Tile, hardwood, luxury vinyl and more — professionally installed.',
        projectType: 'Flooring',
      },
      {
        icon: 'home',
        title: 'Complete Home Upgrades',
        body: 'From a single room refresh to a coordinated, whole-home renovation.',
        projectType: 'Whole home',
      },
    ] satisfies { icon: IconName; title: string; body: string; projectType: string }[],
  },

  projects: {
    eyebrow: 'Our work',
    title: 'Real Projects. Real Results.',
    intro: 'A look at the kitchens, bathrooms and floors we build.',
    /** Shown in demo mode while any gallery image is unverified. */
    conceptNotice:
      'Preview layout — images shown are concept visuals, not completed YDY projects. YDY’s own project photography replaces them at launch.',
    items: [
      {
        title: 'Kitchen Remodel',
        category: 'Kitchen',
        image: {
          src: kitchenIsland,
          alt: 'Kitchen with navy island, marble waterfall countertop and upholstered bar stools',
          verified: false,
        },
      },
      {
        title: 'Primary Bathroom',
        category: 'Bathroom',
        image: {
          src: primaryBath,
          alt: 'Marble bathroom with glass walk-in shower, freestanding tub and brass fixtures',
          verified: false,
        },
      },
      {
        title: 'Wide-Plank Flooring',
        category: 'Flooring',
        image: {
          src: flooringOpenPlan,
          alt: 'Light oak wide-plank floors running through an open living room and kitchen',
          verified: false,
        },
      },
      {
        title: 'Open-Plan Upgrade',
        category: 'Whole home',
        image: {
          src: flooringLiving,
          alt: 'Open-plan living area and kitchen with oak flooring and a marble island',
          verified: false,
        },
      },
    ] satisfies Project[],
  },

  process: {
    eyebrow: 'Our process',
    title: 'From idea to finished space.',
    steps: [
      { icon: 'phone', title: 'Get in Touch', body: 'Call, text or message us on WhatsApp and tell us about your project.' },
      { icon: 'calendar', title: 'Free Consultation', body: 'We talk through your goals, review options and provide a clear estimate.' },
      { icon: 'ruler', title: 'Design & Plan', body: 'We help you choose materials and finishes, and set a timeline that works for you.' },
      { icon: 'key', title: 'Build & Enjoy', body: 'We handle the work with care and attention to detail. You enjoy the result.' },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },

  finalCta: {
    title: 'Ready to Transform Your Space?',
    body: 'Get a free estimate and design consultation. Five quick fields — no long forms.',
    primaryCta: 'Get Free Estimate',
    secondaryCta: 'Chat on WhatsApp',
    image: {
      src: heroKitchen,
      alt: '',
      verified: false,
    } satisfies SiteImage,
  },

  credit: {
    label: 'Demo concept by Sudo Programmer',
    email: 'help@SudoProgrammer.com',
  },
};

export const isDemo = site.mode === 'demo';

/** Links that would contact the business. Null in demo mode or when unconfigured. */
export const liveLinks = {
  whatsapp:
    !isDemo && site.contact.whatsapp
      ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.lead.whatsappGreeting)}`
      : null,
  phone: !isDemo && site.contact.phone ? `tel:+${site.contact.phone}` : null,
  email: !isDemo && site.contact.email ? `mailto:${site.contact.email}` : null,
  leadEndpoint: !isDemo && site.lead.endpoint ? site.lead.endpoint : null,
};
